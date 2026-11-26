import { axiosInstance } from "./config/axiosConfig";
import { generateExperianPdfBlobUrl } from "../components/cibilScore/experianPdfHelper";

const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const MOBILE_REGEX = /^[0-9]{10}$/;

/**
 * Helper to convert Base64 string to Blob URL and trigger direct download.
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
 * Initiate a CIBIL report request via backend TimbleGlance Experian_Bureau_V2 module.
 * Credentials remain safely on the server.
 * Mandatory fields: name, pan, mobile.
 */
export const initiateCibilRequest = async (payload) => {
  const firstName = String(payload.firstName || "").trim();
  const lastName = String(payload.lastName || "").trim();
  const name = String(payload.name || `${firstName} ${lastName}`)
    .trim()
    .replace(/\s+/g, " ");
  const mobile = String(payload.mobile || "").trim();
  const pan = String(payload.pan || "").trim().toUpperCase();
  const email = String(payload.email || "").trim();
  const refId = String(payload.refId || "f2_" + Date.now()).replace(/[^a-zA-Z0-9]/g, "");

  if (!name || name.length < 2) {
    throw new Error("Full name is required.");
  }
  if (!PAN_REGEX.test(pan)) {
    throw new Error("Valid 10-character PAN number is required (e.g. ABCDE1234F).");
  }
  if (!MOBILE_REGEX.test(mobile)) {
    throw new Error("Valid 10-digit mobile number is required.");
  }

  try {
    const res = await axiosInstance.post("/digitap/cibil-report", {
      name,
      firstName,
      lastName,
      mobile,
      pan,
      email,
      refId,
      consent_acceptance: "Yes",
    });

    if (res.data?.success) {
      if (res.data.redirectUrl) {
        return {
          status: 200,
          data: {
            ...res.data,
            redirectUrl: res.data.redirectUrl,
            creditScore: res.data.creditScore ?? null,
            isLocalBlob: false,
          },
        };
      }

      if (res.data.pdfBase64) {
        const blobUrl = downloadBase64PDF(
          res.data.pdfBase64,
          `Experian_Credit_Report_${mobile}.pdf`
        );
        return {
          status: 200,
          data: {
            ...res.data,
            redirectUrl: blobUrl,
            creditScore: res.data.creditScore ?? null,
            isLocalBlob: true,
          },
        };
      }

      if (res.data.reportData && Object.keys(res.data.reportData).length > 0) {
        const { blobUrl } = generateExperianPdfBlobUrl(res.data.reportData, {
          name,
          pan,
          mobile,
          creditScore: res.data.creditScore ?? null,
          transactionId: res.data.transactionId || refId,
        });
        return {
          status: 200,
          data: {
            ...res.data,
            redirectUrl: blobUrl,
            creditScore: res.data.creditScore ?? null,
            isLocalBlob: true,
          },
        };
      }
    }

    if (res.data?.message) {
      throw new Error(res.data.message);
    }
  } catch (err) {
    const errMsg = err?.response?.data?.message || err?.response?.data?.error || err.message;
    console.error("CIBIL report request error:", errMsg);
    throw new Error(
      errMsg || "Could not retrieve report from Bureau. Please check details and try again."
    );
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
