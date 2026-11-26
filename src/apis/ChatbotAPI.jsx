import { axiosInstance } from "./config/axiosConfig";

const GUEST_TOKEN_STORAGE_KEY = "f2_chatbot_guest_token";
const SESSION_ID_STORAGE_KEY = "f2_chatbot_session_id";

function getAuthHeaders(extraHeaders = {}) {
  const headers = { ...extraHeaders };
  try {
    const rawCustomer = localStorage.getItem("customerInfo");
    if (rawCustomer) {
      const parsed = JSON.parse(rawCustomer);
      if (parsed?.token) {
        headers["x-access-token"] = parsed.token;
        headers.Authorization = `Bearer ${parsed.token}`;
      }
    }
    const guestToken = localStorage.getItem(GUEST_TOKEN_STORAGE_KEY);
    if (guestToken) {
      headers["x-chatbot-session-token"] = guestToken;
    }
  } catch {
    // Ignore storage access errors in restricted environments
  }
  return headers;
}

function handleApiResponse(res) {
  if (!res) {
    throw new Error("Empty server response.");
  }
  if (res.status === 404 || res.status >= 400 || res.data?.success === false) {
    const err = new Error(res.data?.error || res.data?.message || `Request failed (${res.status})`);
    err.status = res.status;
    err.data = res.data;
    throw err;
  }
  return res.data;
}

async function execApi(promise) {
  try {
    const res = await promise;
    return handleApiResponse(res);
  } catch (err) {
    if (err?.response) {
      const wrapped = new Error(
        err.response.data?.error || err.response.data?.message || err.message || "Request failed"
      );
      wrapped.status = err.response.status;
      wrapped.data = err.response.data;
      throw wrapped;
    }
    throw err;
  }
}

export function getStoredChatbotSession() {
  try {
    return {
      sessionId: localStorage.getItem(SESSION_ID_STORAGE_KEY) || null,
      guestToken: localStorage.getItem(GUEST_TOKEN_STORAGE_KEY) || null,
    };
  } catch {
    return { sessionId: null, guestToken: null };
  }
}

export function storeChatbotSession({ sessionId, guestToken }) {
  try {
    if (sessionId) localStorage.setItem(SESSION_ID_STORAGE_KEY, sessionId);
    if (guestToken) localStorage.setItem(GUEST_TOKEN_STORAGE_KEY, guestToken);
  } catch {
    // Ignore storage write failures
  }
}

export function clearStoredChatbotSession() {
  try {
    localStorage.removeItem(SESSION_ID_STORAGE_KEY);
    localStorage.removeItem(GUEST_TOKEN_STORAGE_KEY);
  } catch {
    // Ignore
  }
}

export const ChatbotAPI = {
  async initOrResumeSession({ sessionId, language, forceNew = false } = {}) {
    const stored = forceNew ? {} : getStoredChatbotSession();
    const data = await execApi(
      axiosInstance.post(
        "/chatbot/session",
        {
          sessionId: forceNew ? undefined : sessionId || stored.sessionId,
          guestToken: stored.guestToken || undefined,
          language,
        },
        { headers: getAuthHeaders() }
      )
    );
    storeChatbotSession({ sessionId: data.sessionId, guestToken: data.guestToken });
    return data;
  },

  async sendMessage({ sessionId, message, language }) {
    return execApi(
      axiosInstance.post(
        "/chatbot/message",
        { sessionId, message, language },
        { headers: getAuthHeaders() }
      )
    );
  },

  async submitFeedback({ sessionId, messageId, rating, comment }) {
    return execApi(
      axiosInstance.post(
        "/chatbot/feedback",
        { sessionId, messageId, rating, comment },
        { headers: getAuthHeaders() }
      )
    );
  },

  async getFormConfig(loanType = "all") {
    return execApi(
      axiosInstance.get(`/chatbot/form-config/${encodeURIComponent(loanType)}`, {
        headers: getAuthHeaders(),
      })
    );
  },

  async calculateRepayment(payload) {
    return execApi(
      axiosInstance.post("/chatbot/calculate-repayment", payload, {
        headers: getAuthHeaders(),
      })
    );
  },

  async compareLoans(payload) {
    return execApi(
      axiosInstance.post("/chatbot/compare", payload, {
        headers: getAuthHeaders(),
      })
    );
  },

  async recommendLoans(payload) {
    return execApi(
      axiosInstance.post("/chatbot/recommend", payload, {
        headers: getAuthHeaders(),
      })
    );
  },

  async updateApplicationDraft({ sessionId, fields }) {
    return execApi(
      axiosInstance.post(
        "/chatbot/application/draft",
        { sessionId, fields },
        { headers: getAuthHeaders() }
      )
    );
  },

  async uploadApplicationDocument({ sessionId, docType, file }) {
    const formData = new FormData();
    formData.append("sessionId", sessionId);
    formData.append("docType", docType);
    formData.append("document", file);
    // Let browser set multipart boundary automatically
    return execApi(
      axiosInstance.post("/chatbot/application/upload-document", formData, {
        headers: getAuthHeaders(),
      })
    );
  },

  async getApplicationReview(sessionId) {
    return execApi(
      axiosInstance.get(
        `/chatbot/application/review?sessionId=${encodeURIComponent(sessionId)}`,
        { headers: getAuthHeaders() }
      )
    );
  },

  async submitApplication({ sessionId, confirmSubmission = true, idempotencyKey }) {
    const data = await execApi(
      axiosInstance.post(
        "/chatbot/application/submit",
        { sessionId, confirmSubmission, idempotencyKey },
        { headers: getAuthHeaders() }
      )
    );
    if (data?.token && data?.customerId) {
      try {
        if (!localStorage.getItem("customerInfo")) {
          localStorage.setItem(
            "customerInfo",
            JSON.stringify({ id: data.customerId, token: data.token })
          );
        }
      } catch {
        // Ignore storage write failures
      }
    }
    return data;
  },

  async sendOtp({ identifier, sessionId }) {
    return execApi(
      axiosInstance.post(
        "/chatbot/auth/send-otp",
        { identifier, sessionId },
        { headers: getAuthHeaders() }
      )
    );
  },

  async verifyOtp({ identifier, otp, sessionId }) {
    const data = await execApi(
      axiosInstance.post(
        "/chatbot/auth/verify-otp",
        { identifier, otp, sessionId },
        { headers: getAuthHeaders() }
      )
    );
    if (data?.token && data?.customer) {
      try {
        localStorage.setItem(
          "customerInfo",
          JSON.stringify({
            id: data.customer.id,
            name: data.customer.name,
            email: data.customer.email,
            role: data.customer.role,
            token: data.token,
          })
        );
      } catch {
        // Ignore storage write failures
      }
    }
    return data;
  },

  async getApplicationStatus({ sessionId, applicationNo }) {
    const qs = new URLSearchParams();
    if (sessionId) qs.set("sessionId", sessionId);
    if (applicationNo) qs.set("applicationNo", applicationNo);
    return execApi(
      axiosInstance.get(`/chatbot/application/status?${qs.toString()}`, {
        headers: getAuthHeaders(),
      })
    );
  },

  async updateApplicationDetails({ sessionId, applicationId, updates }) {
    return execApi(
      axiosInstance.patch(
        "/chatbot/application/details",
        { sessionId, applicationId, updates },
        { headers: getAuthHeaders() }
      )
    );
  },

  async escalateSupport({ sessionId, title, description, contactInfo }) {
    return execApi(
      axiosInstance.post(
        "/chatbot/support/escalate",
        { sessionId, title, description, contactInfo },
        { headers: getAuthHeaders() }
      )
    );
  },

  // --- Admin Endpoints ---
  async adminListKnowledge(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return execApi(
      axiosInstance.get(`/chatbot/admin/knowledge${qs ? `?${qs}` : ""}`, {
        headers: getAuthHeaders(),
      })
    );
  },

  async adminCreateKnowledge(payload) {
    return execApi(
      axiosInstance.post("/chatbot/admin/knowledge", payload, {
        headers: getAuthHeaders(),
      })
    );
  },

  async adminUpdateKnowledge(id, payload) {
    return execApi(
      axiosInstance.put(`/chatbot/admin/knowledge/${id}`, payload, {
        headers: getAuthHeaders(),
      })
    );
  },

  async adminApproveKnowledge(id) {
    return execApi(
      axiosInstance.post(
        `/chatbot/admin/knowledge/${id}/approve`,
        {},
        { headers: getAuthHeaders() }
      )
    );
  },

  async adminArchiveKnowledge(id) {
    return execApi(
      axiosInstance.post(
        `/chatbot/admin/knowledge/${id}/archive`,
        {},
        { headers: getAuthHeaders() }
      )
    );
  },

  async adminListCatalog() {
    return execApi(
      axiosInstance.get("/chatbot/admin/catalog", {
        headers: getAuthHeaders(),
      })
    );
  },

  async adminUpsertCatalog(payload, id = null) {
    return execApi(
      id
        ? axiosInstance.put(`/chatbot/admin/catalog/${id}`, payload, {
            headers: getAuthHeaders(),
          })
        : axiosInstance.post("/chatbot/admin/catalog", payload, {
            headers: getAuthHeaders(),
          })
    );
  },

  async adminApproveCatalog(id) {
    return execApi(
      axiosInstance.post(
        `/chatbot/admin/catalog/${id}/approve`,
        {},
        { headers: getAuthHeaders() }
      )
    );
  },

  async adminListFormConfigs() {
    return execApi(
      axiosInstance.get("/chatbot/admin/form-configs", {
        headers: getAuthHeaders(),
      })
    );
  },

  async adminUpdateFormConfig(loanType, payload) {
    return execApi(
      axiosInstance.put(`/chatbot/admin/form-configs/${encodeURIComponent(loanType)}`, payload, {
        headers: getAuthHeaders(),
      })
    );
  },

  async adminGetAnalytics(days = 30) {
    return execApi(
      axiosInstance.get(`/chatbot/admin/analytics?days=${encodeURIComponent(days)}`, {
        headers: getAuthHeaders(),
      })
    );
  },
};

