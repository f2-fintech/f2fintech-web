import { axiosInstance } from "./config/axiosConfig";
import axios from "axios";
import { toast } from "react-toastify";

const DIGITAP_CLIENT_ID = "65741267";
const DIGITAP_SECRET = "Vjq4yaYmiN49dP9oi6sFM54OeKD0FAMi";
const DIGITAP_AUTH = btoa(`${DIGITAP_CLIENT_ID}:${DIGITAP_SECRET}`);

const BEFISC_PRODUCTION_KEY = "SW9EY2DHB6HVOB6"; // Production Key from senior
const BEFISC_STAGING_KEY = "K8NKC53B38B29YQ"; // Staging Key

/**
 * Helper to convert Base64 string to Blob URL and trigger direct download
 */
export const downloadBase64PDF = (base64Data, fileName = "Experian_Credit_Report.pdf") => {
  try {
    const cleanBase64 = base64Data.replace(/^data:application\/pdf;base64,/, "").trim();
    const byteCharacters = atob(cleanBase64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });
    const blobUrl = URL.createObjectURL(blob);

    // Auto-trigger direct PDF download
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return blobUrl;
  } catch (err) {
    console.error("Error creating PDF blob:", err);
    return `data:application/pdf;base64,${base64Data}`;
  }
};

/**
 * Initiate a CIBIL report request via Digitap / Experian Bureau.
 * @param {Object} payload - { firstName, lastName, mobile, dob, pan, gender, email, pincode, idType, idNumber, refId }
 */
export const initiateCibilRequest = async (payload) => {
  const firstName = String(payload.firstName || "").trim();
  const lastName = String(payload.lastName || "").trim();
  const mobile = String(payload.mobile || "").trim();
  const pan = String(payload.pan || "").trim().toUpperCase();
  const email = String(payload.email || "").trim();
  const dob = String(payload.dob || "").trim();
  const gender = String(payload.gender || "male").toLowerCase();
  const pincode = String(payload.pincode || "").trim();
  const idType = String(payload.idType || "").trim();
  const idNumber = String(payload.idNumber || "").trim();

  // 1. Primary: Call Digitap Experian Credit Analytics API (Returns actual official Experian result_pdf)
  try {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    const d = pad(now.getDate());
    const m = pad(now.getMonth() + 1);
    const y = now.getFullYear();
    const hr = pad(now.getHours());
    const min = pad(now.getMinutes());
    const sec = pad(now.getSeconds());
    const timestamp = `${d}${m}${y}-${hr}:${min}:${sec}`;

    const digitapPayload = {
      otp: "123456",
      device_ip: "98.25.8.188",
      mobile_no: mobile,
      timestamp: timestamp,
      device_type: "web",
      name_lookup: 0,
      first_name: firstName,
      last_name: lastName,
      report_type: "3",
      client_ref_num: String(payload.refId || "test" + Date.now()).replace(/[^a-zA-Z0-9]/g, ""),
      consent_message: "I hereby authorize Experian to pull my credit report for test purpose.",
      consent_acceptance: "Yes",
    };

    if (pan) {
      digitapPayload.pan = pan;
    }
    if (email) {
      digitapPayload.email = email;
    }

    console.log("Calling Digitap API with payload:", digitapPayload);

    const digitapUrl = window.location.hostname === "localhost"
      ? "/digitap-proxy/credit_analytics/request"
      : "https://svc.digitap.ai/credit_analytics/request";

    const digitapRes = await axios.post(digitapUrl, digitapPayload, {
      headers: {
        Authorization: `Basic ${DIGITAP_AUTH}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Digitap API Response:", digitapRes.data);

    // Extract official PDF S3 URL from Digitap
    const pdfUrl =
      digitapRes.data?.result?.result_pdf ||
      digitapRes.data?.data?.result_pdf ||
      digitapRes.data?.result_pdf ||
      digitapRes.data?.data?.url ||
      digitapRes.data?.redirect_url ||
      digitapRes.data?.url;

    const liveScore =
      digitapRes.data?.result?.result_json?.INProfileResponse?.SCORE?.BureauScore ||
      digitapRes.data?.data?.SCORE?.BureauScore ||
      750;

    if (digitapRes.data?.result_code === 102 || digitapRes.data?.message === "no record found") {
      throw new Error("No credit history found on Experian Bureau for this profile (New to Credit / NH). This happens when you have never taken a loan or credit card reported to the bureau yet.");
    }

    if (pdfUrl) {
      console.log("Official Experian PDF URL found:", pdfUrl);
      return {
        status: 200,
        data: {
          redirectUrl: pdfUrl,
          creditScore: liveScore,
          ...digitapRes.data,
        },
      };
    }

    if (digitapRes.data?.message) {
      throw new Error(`Experian Bureau Note: ${digitapRes.data.message}`);
    }
  } catch (digitapErr) {
    if (digitapErr.message && !digitapErr.response) {
      throw digitapErr;
    }
    console.error("Digitap API call error:", digitapErr?.response?.data || digitapErr.message);
    if (digitapErr?.response?.data?.message) {
      throw new Error(digitapErr.response.data.message);
    }
  }

  // 2. Secondary: Call Befisc Bureau(A) V2
  try {
    const smartauthUrl = window.location.hostname === "localhost"
      ? "/smartauth-proxy/JEE4"
      : "https://prod.smartauth.co/JEE4";

    const befiscPayload = {
      name: `${firstName} ${lastName}`.trim(),
      mobile: mobile,
      consent_text: "We confirm obtaining valid customer consent to access/process their name/mobile data. Consent remains valid, informed, and unwithdrawn.",
      consent: "Y",
    };

    const befiscRes = await axios.post(smartauthUrl, befiscPayload, {
      headers: {
        authkey: BEFISC_PRODUCTION_KEY,
        "Content-Type": "application/json",
      },
    });

    if (befiscRes.data?.status === 1 && befiscRes.data?.result) {
      const result = befiscRes.data.result;
      let pdfUrl = null;

      if (result.pdf_report) {
        pdfUrl = downloadBase64PDF(result.pdf_report, `Experian_Report_${mobile}.pdf`);
      } else if (result.url || result.redirect_url) {
        pdfUrl = result.url || result.redirect_url;
      }

      if (pdfUrl) {
        return {
          status: 200,
          data: {
            redirectUrl: pdfUrl,
            creditScore: result.SCORE?.BureauScore || result.credit_score || 750,
            ...befiscRes.data,
          },
        };
      }
    }
  } catch (befiscErr) {
    console.warn("Bureau(A) V2 call error:", befiscErr?.response?.data || befiscErr.message);
  }

  throw new Error("Could not retrieve report from Bureau. Please check details and try again.");
};

/**
 * Save/record CIBIL report generation application to backend database.
 */
export const saveCibilApplicationRecord = async (payload) => {
  try {
    const res = await axiosInstance.post("/record-cibil-application", payload);
    return res.data;
  } catch (err) {
    console.error("Error saving CIBIL application to database:", err);
    return null;
  }
};

/**
 * Fetch all CIBIL applications with search, status filters, and pagination (Admin only).
 */
export const getAllCibilApplications = (params = {}) => {
  return axiosInstance.get("/admin/cibil-applications", { params });
};

/**
 * Fetch specific CIBIL application details by ID (Admin only).
 */
export const getCibilApplicationById = (id) => {
  return axiosInstance.get(`/admin/cibil-applications/${id}`);
};

/**
 * Export CIBIL applications as CSV URL.
 */
export const getCibilExportUrl = () => {
  const baseURL = axiosInstance.defaults.baseURL || "";
  return `${baseURL}/admin/cibil-applications/export`;
};

/**
 * Initiate PayU Payment Gateway checkout session & SHA-512 hash
 */
export const initiatePayuPayment = async (payload) => {
  const res = await axiosInstance.post("/payment/payu/initiate", payload);
  return res.data;
};

/**
 * Verify PayU Payment signature / response
 */
export const verifyPayuPayment = async (payload) => {
  const res = await axiosInstance.post("/payment/payu/verify", payload);
  return res.data;
};


