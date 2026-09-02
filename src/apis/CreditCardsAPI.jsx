const ENV = import.meta.env;

const BANKKARO_BASE = ENV.VITE_BANKKARO_BASE_URL;
const BANKKARO_KEY = ENV.VITE_BANKKARO_API_KEY;

let directToken = null;
let directExpires = 0;

async function getDirectBankKaroToken() {
  if (directToken && Date.now() < directExpires - 60000) return directToken;
  try {
    const res = await fetch(`${BANKKARO_BASE}/partner/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "x-api-key": BANKKARO_KEY }),
    });
    const d = await res.json();
    if (d.status === "success" && d.data?.jwttoken) {
      directToken = d.data.jwttoken;
      directExpires = d.data.expiresAt ? new Date(d.data.expiresAt).getTime() : Date.now() + 3600000;
      return directToken;
    }
  } catch (e) {
    console.error("Direct Bankkaro token error:", e);
  }
  return null;
}

let cachedCardsData = null;
let cardsCacheTime = 0;
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

export const getCreditCards = async (params = {}) => {
  const hasFilterParams = Object.keys(params).length > 0;
  const now = Date.now();

  // If no specific server filters requested and cache is valid, return cached cards immediately
  if (!hasFilterParams && cachedCardsData && now - cardsCacheTime < CACHE_TTL) {
    return cachedCardsData;
  }

  // Check sessionStorage for cached catalog
  if (!hasFilterParams && !cachedCardsData) {
    try {
      const stored = sessionStorage.getItem("f2_cached_cards");
      const storedTime = sessionStorage.getItem("f2_cached_cards_time");
      if (stored && storedTime && now - parseInt(storedTime) < CACHE_TTL) {
        cachedCardsData = JSON.parse(stored);
        cardsCacheTime = parseInt(storedTime);
        return cachedCardsData;
      }
    } catch (e) {
      // ignore storage errors
    }
  }

  const queryString = new URLSearchParams(params).toString();
  const baseUrl = ENV.VITE_BASE_URL || "/api/v1";

  try {
    const response = await fetch(`${baseUrl}/credit-cards${queryString ? `?${queryString}` : ""}`);
    if (response.ok) {
      const json = await response.json();
      if (json.data && Array.isArray(json.data)) {
        if (!hasFilterParams) {
          cachedCardsData = json.data;
          cardsCacheTime = Date.now();
          try {
            sessionStorage.setItem("f2_cached_cards", JSON.stringify(json.data));
            sessionStorage.setItem("f2_cached_cards_time", String(cardsCacheTime));
          } catch (e) {}
        }
        return json.data;
      }
    }
  } catch (e) {
    console.warn("Backend /credit-cards error, falling back to direct BankKaro:", e);
  }

  // Direct BankKaro fallback
  try {
    const token = await getDirectBankKaroToken();
    if (token) {
      const res = await fetch(`${BANKKARO_BASE}/partner/cardgenius/v2/cards`, {
        headers: { "partner-token": token },
      });
      const json = await res.json();
      let cards = json.data?.cards || json.data || [];
      if (!hasFilterParams && cards.length > 0) {
        cachedCardsData = cards;
        cardsCacheTime = Date.now();
        try {
          sessionStorage.setItem("f2_cached_cards", JSON.stringify(cards));
          sessionStorage.setItem("f2_cached_cards_time", String(cardsCacheTime));
        } catch (e) {}
      }
      return cards;
    }
  } catch (err) {
    console.error("Failed to fetch cards directly:", err);
  }
  return cachedCardsData || [];
};

export const getCardByAlias = async (alias) => {
  const cleanAlias = (alias || "").toLowerCase().trim();

  // 1. Instantly check memory cache
  if (cachedCardsData) {
    const found = cachedCardsData.find(
      (c) =>
        (c.card_alias && c.card_alias.toLowerCase() === cleanAlias) ||
        (c.seo_alias && c.seo_alias.toLowerCase() === cleanAlias) ||
        String(c.id) === cleanAlias ||
        (c.name && c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === cleanAlias)
    );
    if (found) return found;
  }

  // 2. Otherwise load cards (which populates cache) and find
  const allCards = await getCreditCards();
  const found = allCards.find(
    (c) =>
      (c.card_alias && c.card_alias.toLowerCase() === cleanAlias) ||
      (c.seo_alias && c.seo_alias.toLowerCase() === cleanAlias) ||
      String(c.id) === cleanAlias ||
      (c.name && c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === cleanAlias)
  );
  return found || null;
};

export const trackCardClick = async (cardData, customerId = null) => {
  const baseUrl = ENV.VITE_BASE_URL || "/api/v1";
  const clickId = `f2_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;
  let finalTrackingUrl = (cardData.network_url || "").trim();
  if (finalTrackingUrl) {
    finalTrackingUrl = finalTrackingUrl
      .replace(/\{click_id\}/g, clickId)
      .replace(/\{user_id\}/g, customerId ? String(customerId) : "guest");
  }

  let campaignId = cardData.campaign_id || null;
  if (!campaignId && cardData.network_url) {
    const match = cardData.network_url.match(/campaign_id=([^&]+)/);
    if (match) campaignId = match[1];
  }

  try {
    const res = await fetch(`${baseUrl}/credit-cards/track-click`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        card_id: cardData.id,
        card_name: cardData.name,
        card_alias: cardData.card_alias || cardData.seo_alias || "",
        campaign_id: campaignId,
        network_url: finalTrackingUrl,
        customer_id: customerId,
        card_type: cardData.card_type,
        bank_name: cardData.bank_name,
        card_tags: cardData.tags?.map((t) => t.name).join(","),
        joining_fee_text: cardData.joining_fee_text,
        commissionable: cardData.commissionable,
      }),
    });
    if (res.ok) {
      const json = await res.json();
      if (json.tracking_url) return json;
    }
  } catch (e) {
    console.warn("Click tracking error:", e);
  }

  return { click_id: clickId, tracking_url: finalTrackingUrl };
};

export const submitCardLead = async (leadData) => {
  const baseUrl = ENV.VITE_BASE_URL || "/api/v1";
  try {
    const res = await fetch(`${baseUrl}/credit-cards/create-lead`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(leadData),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.error("Lead submission error:", e);
  }
  return { status: "Success", tracking_url: leadData.tracking_url || leadData.network_url };
};

export const calculateCardSpends = async (spendPayload) => {
  const baseUrl = ENV.VITE_BASE_URL || "/api/v1";
  const raw = spendPayload || {};
  const normalized = {
    amazon_spends: parseInt(raw.amazon_spends) || 0,
    flipkart_spends: parseInt(raw.flipkart_spends) || 0,
    other_online_spends: parseInt(raw.other_online_spends) || 0,
    other_offline_spends: parseInt(raw.other_offline_spends) || 0,
    grocery_spends_online: parseInt(raw.grocery_spends_online) || 0,
    offline_grocery: parseInt(raw.offline_grocery) || 0,
    online_food_ordering: parseInt(raw.online_food_ordering) || 0,
    fuel: parseInt(raw.fuel) || 0,
    dining_or_going_out: parseInt(raw.dining_or_going_out) || 0,
    flights_annual: parseInt(raw.flights_annual) || 0,
    hotels_annual: parseInt(raw.hotels_annual) || 0,
    domestic_lounge_usage_quarterly: parseInt(raw.domestic_lounge_usage_quarterly) || 0,
    international_lounge_usage_quarterly: parseInt(raw.international_lounge_usage_quarterly) || 0,
    mobile_phone_bills: parseInt(raw.mobile_phone_bills) || 0,
    electricity_bills: parseInt(raw.electricity_bills) || 0,
    water_bills: parseInt(raw.water_bills) || 0,
    insurance_car_or_bike_annual: parseInt(raw.insurance_car_or_bike_annual) || 0,
    insurance_health_annual: parseInt(raw.insurance_health_annual) || 0,
    life_insurance: parseInt(raw.life_insurance) || 0,
    rent: parseInt(raw.rent) || 0,
    school_fees: parseInt(raw.school_fees) || 0,
  };

  try {
    const res = await fetch(`${baseUrl}/credit-cards/calculate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(normalized),
    });
    if (res.ok) {
      const json = await res.json();
      return json.data;
    }
  } catch (e) {
    console.warn("Backend calculate error, trying direct:", e);
  }

  try {
    const token = await getDirectBankKaroToken();
    if (token) {
      const res = await fetch(`${BANKKARO_BASE}/partner/cardgenius/v2/calculate`, {
        method: "POST",
        headers: {
          "partner-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(normalized),
      });
      const json = await res.json();
      return json.data || json;
    }
  } catch (err) {
    console.error("Direct calculation error:", err);
  }
  return null;
};

export const checkCardEligibility = async (payload) => {
  const baseUrl = ENV.VITE_BASE_URL || "/api/v1";
  let normalizedEmpStatus = "salaried";
  if (payload.empStatus) {
    const lower = String(payload.empStatus).toLowerCase().replace(/[\s-]+/g, "_");
    if (lower.includes("self") || lower.includes("business")) {
      normalizedEmpStatus = "self_employed";
    } else {
      normalizedEmpStatus = "salaried";
    }
  }

  const reqBody = {
    pincode: String(payload.pincode || "").trim(),
    inhandIncome: String(payload.inhandIncome || "0").trim(),
    empStatus: normalizedEmpStatus,
  };

  try {
    const res = await fetch(`${baseUrl}/credit-cards/eligibility`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqBody),
    });
    if (res.ok) {
      const json = await res.json();
      return json.data;
    }
  } catch (e) {
    console.warn("Backend eligibility error, trying direct:", e);
  }

  try {
    const token = await getDirectBankKaroToken();
    if (token) {
      const res = await fetch(`${BANKKARO_BASE}/partner/cardgenius/eligiblity`, {
        method: "POST",
        headers: {
          "partner-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      });
      const json = await res.json();
      return json.data || json;
    }
  } catch (err) {
    console.error("Direct eligibility error:", err);
  }
  return null;
};

/**
 * Fetch all credit card customer leads (Admin only)
 */
export const getCreditCardLeads = async (params = {}) => {
  const baseUrl = ENV.VITE_BASE_URL || "/api/v1";
  const query = new URLSearchParams(params).toString();
  try {
    const res = await fetch(`${baseUrl}/credit-cards/leads${query ? `?${query}` : ""}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      const json = await res.json();
      return json;
    }
  } catch (err) {
    console.error("Fetch credit card leads error:", err);
  }
  return null;
};

