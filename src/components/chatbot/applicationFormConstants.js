export const LOAN_TYPES_BY_CATEGORY = {
  unsecured: [
    { value: "personal loan", label: "Personal Loan", labelHi: "पर्सनल लोन" },
    { value: "business loan", label: "Business Loan", labelHi: "बिज़नेस लोन" },
    { value: "professional loan", label: "Professional / Doctor Loan", labelHi: "प्रोफेशनल / डॉक्टर लोन" },
    { value: "education loan", label: "Education Loan", labelHi: "एजुकेशन लोन" },
    { value: "just inquiry", label: "Just Inquiry", labelHi: "केवल पूछताछ" },
  ],
  secured: [
    { value: "home loan", label: "Home Loan", labelHi: "होम लोन" },
    { value: "lap", label: "LAP (Loan Against Property)", labelHi: "लोन अगेंस्ट प्रॉपर्टी (LAP)" },
    { value: "auto loan", label: "Auto Loan", labelHi: "ऑटो लोन" },
    { value: "machinery loan", label: "Machinery Loan", labelHi: "मशीनरी लोन" },
  ],
};

export const TENURE_OPTIONS_BY_CATEGORY = {
  secured: [
    "5 Years",
    "8 Years",
    "10 Years",
    "15 Years",
    "20 Years",
    "25 Years",
    "30 Years",
  ],
  unsecured: [
    "1 Year",
    "2 Years",
    "3 Years",
    "4 Years",
    "5 Years",
    "6 Years",
    "7 Years",
    "8 Years",
  ],
};

export const AMOUNT_PRESETS = [
  { label: "₹2 Lakh", value: "200000" },
  { label: "₹5 Lakh", value: "500000" },
  { label: "₹10 Lakh", value: "1000000" },
  { label: "₹25 Lakh", value: "2500000" },
  { label: "₹50 Lakh", value: "5000000" },
  { label: "₹1 Cr", value: "10000000" },
];

export const PREFIX_OPTIONS = [
  { value: "mr", label: "Mr." },
  { value: "miss", label: "Miss" },
  { value: "mrs", label: "Mrs." },
  { value: "dr", label: "Dr." },
  { value: "ca", label: "CA" },
];

export const EMPLOYMENT_OPTIONS = [
  { value: "salaried", label: "Salaried", labelHi: "वेतनभोगी (Salaried)" },
  { value: "business", label: "Business", labelHi: "व्यापार (Business)" },
  { value: "professional", label: "Professional", labelHi: "प्रोफेशनल (Doctor/CA)" },
  { value: "self_employed", label: "Self Employed", labelHi: "स्व-रोज़गार" },
];

export const LEAD_TYPE_OPTIONS = [
  { value: "notion", label: "Notion" },
  { value: "Dialler", label: "Dialler" },
  { value: "field visit", label: "Field visit" },
  { value: "sourcer", label: "Sourcer" },
  { value: "channel partner", label: "Channel partner" },
  { value: "ref from customer", label: "Ref from customer" },
  { value: "left employee follow up", label: "Left employee follow up" },
];

export const CASE_TYPE_OPTIONS = [
  { value: "fresh", label: "Fresh", desc: "New loan application" },
  { value: "top_up", label: "Top Up", desc: "Enhance existing loan" },
];

export const BUSINESS_ENTITY_OPTIONS = [
  { value: "sole_proprietorship", label: "Sole Proprietorship" },
  { value: "private_limited", label: "Private Limited" },
  { value: "llp", label: "LLP" },
  { value: "partnership", label: "Partnership" },
  { value: "huf", label: "HUF" },
];

export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

export const AUTO_DECIDE_PROVIDER = "Let F2 Fintech decide your lender";

export function normalizeLoanTypeValue(raw) {
  if (!raw) return "";
  const s = String(raw).toLowerCase().trim().replace(/[-_]+/g, " ");
  if (s === "lap" || s.includes("loan against property")) return "lap";
  if (s.includes("doctor") || s.includes("professional")) return "professional loan";
  if (s.includes("personal")) return "personal loan";
  if (s.includes("business") || s.includes("msme")) return "business loan";
  if (s.includes("home")) return "home loan";
  if (s.includes("education")) return "education loan";
  if (s.includes("auto") || s.includes("car")) return "auto loan";
  if (s.includes("machinery") || s.includes("equipment")) return "machinery loan";
  if (s.includes("inquiry")) return "just inquiry";
  return s;
}

export function getLoanCategoryFromType(loanType) {
  const normalized = normalizeLoanTypeValue(loanType);
  if (["home loan", "lap", "auto loan", "machinery loan"].includes(normalized)) {
    return "secured";
  }
  if (
    [
      "personal loan",
      "business loan",
      "professional loan",
      "doctor",
      "education loan",
      "just inquiry",
    ].includes(normalized)
  ) {
    return "unsecured";
  }
  return "";
}

export function getLoanTypeLabel(loanType, language = "en") {
  const normalized = normalizeLoanTypeValue(loanType);
  const all = [...LOAN_TYPES_BY_CATEGORY.unsecured, ...LOAN_TYPES_BY_CATEGORY.secured];
  const found = all.find((item) => item.value === normalized);
  if (!found) return loanType || "";
  return language === "hi" ? found.labelHi : found.label;
}

export function normalizeTenureOption(rawTenure, category) {
  if (!rawTenure || !category) return "";
  const options = TENURE_OPTIONS_BY_CATEGORY[category] || [];
  if (options.length === 0) return String(rawTenure);
  const trimmed = String(rawTenure).trim();
  const exact = options.find((opt) => opt.toLowerCase() === trimmed.toLowerCase());
  if (exact) return exact;

  const num = parseFloat(trimmed.replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(num) || num <= 0) return "";
  const years = /month|mo\b/i.test(trimmed)
    ? Math.max(1, Math.round(num / 12))
    : Math.max(1, Math.round(num));

  return options.reduce((best, candidate) => {
    const bestDiff = Math.abs(parseInt(best, 10) - years);
    const candDiff = Math.abs(parseInt(candidate, 10) - years);
    return candDiff < bestDiff ? candidate : best;
  }, options[0]);
}

export function formatINR(val) {
  const num = Number(val);
  if (!Number.isFinite(num) || num <= 0) return "";
  return `₹${Math.round(num).toLocaleString("en-IN")}`;
}

export function calculateAgeYears(dobStr) {
  if (!dobStr) return null;
  const d = new Date(dobStr);
  if (Number.isNaN(d.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - d.getFullYear();
  const m = today.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < d.getDate())) {
    age -= 1;
  }
  return age;
}

