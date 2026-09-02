import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  TextField,
  Button,
  Stack,
  CircularProgress,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Checkbox,
  FormControlLabel,
  Collapse,
  Alert,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

// Icons
import AssessmentIcon from "@mui/icons-material/Assessment";
import ShieldIcon from "@mui/icons-material/Shield";
import SpeedIcon from "@mui/icons-material/Speed";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LockIcon from "@mui/icons-material/Lock";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import DownloadIcon from "@mui/icons-material/Download";
import CloseIcon from "@mui/icons-material/Close";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import DescriptionIcon from "@mui/icons-material/Description";
import DashboardIcon from "@mui/icons-material/Dashboard";

import { useNavigate } from "react-router-dom";
import {
  initiateCibilRequest,
  saveCibilApplicationRecord,
  initiatePayuPayment,
} from "../../apis/CibilDownloadAPI";
import { Utility } from "../utility";
import AdminCibilDashboardModal from "./AdminCibilDashboardModal";
import "../creditCards/CreditCards.css";

// ─── Styled Components ────────────────────────────────────────────────────────
const ActionButton = styled(Button)(() => ({
  background: "linear-gradient(135deg, #1d2ebd 0%, #112082 100%) !important",
  color: "#ffffff !important",
  fontWeight: 700,
  fontSize: "1.05rem",
  borderRadius: "14px",
  padding: "14px 32px",
  textTransform: "none",
  fontFamily: "'Poppins', 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif !important",
  boxShadow: "0 6px 20px rgba(29, 46, 189, 0.35)",
  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
  "&, & *": {
    color: "#ffffff !important",
    fontFamily: "'Poppins', 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif !important",
  },
  "&:hover": {
    background: "linear-gradient(135deg, #1525a8 0%, #0c1766 100%) !important",
    transform: "translateY(-2px)",
    boxShadow: "0 10px 25px rgba(29, 46, 189, 0.45)",
  },
}));

// ─── Static Data (Clean & Minimal) ────────────────────────────────────────────
const SCORE_FACTORS = [
  { name: "Payment History", weight: "35%", desc: "On-time EMI & card payments.", color: "#10b981" },
  { name: "Credit Utilization", weight: "30%", desc: "Credit usage below 30% limit.", color: "#1d2ebd" },
  { name: "Credit Age", weight: "15%", desc: "Longevity of open credit lines.", color: "#8b5cf6" },
  { name: "Credit Mix", weight: "10%", desc: "Blend of secured & unsecured loans.", color: "#f59e0b" },
  { name: "Recent Inquiries", weight: "10%", desc: "Frequency of new loan applications.", color: "#ef4444" },
];

const FAQS = [
  {
    q: "Why is the CIBIL report charged at ₹50?",
    a: "We pull your official credit report directly from Experian's secure servers. The nominal ₹50 fee covers bureau verification and document processing with zero hidden charges or recurring subscriptions.",
  },
  {
    q: "How will I receive my credit report?",
    a: "Immediately upon completing the ₹50 payment, our system retrieves your official credit report URL and automatically opens the PDF download page.",
  },
  {
    q: "Will checking my score here lower my CIBIL rating?",
    a: "No. This is a Soft Inquiry, which has 0% impact on your credit score. You can check it multiple times safely.",
  },
  {
    q: "What details are needed to download the report?",
    a: "You only need your full name (as per PAN/Aadhaar), 10-digit mobile number, and PAN number for bureau identity verification.",
  },
];

// ─── Generate Ref ID ──────────────────────────────────────────────────────────
const generateRefId = () => {
  const date = new Date();
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = String(date.getFullYear()).slice(-2);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomPart = "";
  for (let i = 0; i < 4; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `CBL-${d}${m}${y}-${randomPart}`;
};

// ─── Validation Schema ────────────────────────────────────────────────────────
const validationSchema = Yup.object({
  firstName: Yup.string()
    .required("First name is required")
    .matches(/^[a-zA-Z\s]+$/, "Only alphabets allowed"),
  lastName: Yup.string()
    .required("Last name is required")
    .matches(/^[a-zA-Z\s]+$/, "Only alphabets allowed"),
  mobile: Yup.string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number"),
  pan: Yup.string()
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Enter valid 10-digit PAN (e.g. ABCDE1234F)")
    .nullable(),
  email: Yup.string().email("Invalid email format").nullable(),
  consent: Yup.boolean().oneOf([true], "Consent acceptance is mandatory"),
});

export default function DownloadCibil() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  // Admin Dashboard check
  const { getLocalStorage } = Utility();
  const customerInfo = getLocalStorage("customerInfo");
  const isAdmin =
    customerInfo?.role?.toLowerCase() === "admin" ||
    customerInfo?.role?.toLowerCase() === "superadmin" ||
    customerInfo?.is_admin === true ||
    customerInfo?.isAdmin === true;
  const [openDashboardModal, setOpenDashboardModal] = useState(false);

  // Modal & Processing State
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [faqOpenIndex, setFaqOpenIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [reportUrl, setReportUrl] = useState("");

  // Check for returning payment redirect from PayU
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentStatus = params.get("payment_status");
    const txnid = params.get("txnid");
    const refId = params.get("ref_id");

    if (paymentStatus === "success" && txnid) {
      window.history.replaceState({}, document.title, window.location.pathname);
      const stored = sessionStorage.getItem("pending_cibil_order");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          sessionStorage.removeItem("pending_cibil_order");
          handleExecuteRequest(parsed, txnid, refId);
        } catch (e) {
          console.error("Parse pending order error:", e);
        }
      }
    } else if (paymentStatus === "failed") {
      window.history.replaceState({}, document.title, window.location.pathname);
      toast.error("Payment was declined or cancelled. Please try again.");
    }
  }, []);

  const handleOpenApplyModal = () => {
    setIsApplyModalOpen(true);
  };

  const handleExecuteRequest = async (values, customPaymentId = null, customRefId = null) => {
    setLoading(true);

    try {
      toast.info("Payment confirmed! Fetching official Experian Credit Report...", { autoClose: 3000 });
      const finalPaymentId = customPaymentId || values.paymentId || `pay_${Date.now()}`;
      const refId = customRefId || values.refId || generateRefId();

      const payload = {
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        mobile: values.mobile.trim(),
        pan: values.pan ? values.pan.trim().toUpperCase() : "",
        email: values.email ? values.email.trim() : "",
        paymentId: finalPaymentId,
        refId,
        consentAccepted: true,
      };

      const response = await initiateCibilRequest(payload);
      const downloadLink = response?.data?.redirectUrl || response?.data?.redirect_url || response?.data?.url;
      const creditScore = response?.data?.creditScore || response?.data?.SCORE?.BureauScore || 750;

      // Save application record to backend database
      try {
        await saveCibilApplicationRecord({
          ...payload,
          creditScore,
          reportUrl: downloadLink || "",
          status: downloadLink ? "completed" : "failed",
          amount: 50.0,
          paymentStatus: "success",
        });
      } catch (saveErr) {
        console.warn("Could not save CIBIL record to database:", saveErr);
      }

      if (downloadLink) {
        setReportUrl(downloadLink);
        setSuccess(true);
        setIsApplyModalOpen(false);
        toast.success("Experian CIBIL report ready! Opening PDF...", { autoClose: 3000 });
        setTimeout(() => {
          window.open(downloadLink, "_blank", "noopener,noreferrer");
        }, 1500);
      } else {
        toast.error("Could not retrieve report link from Experian.");
      }
    } catch (error) {
      console.error("CIBIL report error:", error);
      toast.error(error.message || "Failed to generate report from Experian.");
    } finally {
      setLoading(false);
    }
  };

  const loadPayuBoltScript = (scriptUrl = "https://jssdk.payu.in/bolt/bolt.min.js") => {
    return new Promise((resolve) => {
      if (window.bolt && typeof window.bolt.launch === "function") {
        resolve(true);
        return;
      }
      const existing = document.getElementById("bolt");
      if (existing) {
        if (existing.src === scriptUrl && window.bolt) {
          resolve(true);
          return;
        }
        existing.remove();
      }
      const script = document.createElement("script");
      script.src = scriptUrl;
      script.id = "bolt";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleFormSubmit = async (values) => {
    if (loading) return;

    setLoading(true);

    try {
      toast.info("Connecting to Payment Gateway...", { autoClose: 2000 });
      const refId = generateRefId();

      const payuResponse = await initiatePayuPayment({
        amount: 50.0,
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        mobile: values.mobile.trim(),
        email: values.email ? values.email.trim() : "customer@f2fintech.com",
        pan: values.pan ? values.pan.trim().toUpperCase() : "",
        refId,
      });

      const d = payuResponse?.data;
      if (d?.hash && d?.key) {
        sessionStorage.setItem(
          "pending_cibil_order",
          JSON.stringify({ ...values, refId, paymentId: d.txnid })
        );

        // Mock payment bypass (test/localhost mode)
        if (d.mockPayment === true) {
          toast.info("Dev mode: payment auto-approved, fetching report...", { autoClose: 3000 });
          await handleExecuteRequest(values, d.txnid, refId);
          return;
        }

        const targetBoltUrl =
          d.boltScriptUrl ||
          (d.actionUrl && d.actionUrl.includes("test")
            ? "https://jssdk-uat.payu.in/bolt/bolt.min.js"
            : "https://jssdk.payu.in/bolt/bolt.min.js");

        const isBoltLoaded = await loadPayuBoltScript(targetBoltUrl);
        if (isBoltLoaded && window.bolt && typeof window.bolt.launch === "function") {
          try {
            window.bolt.launch(
              {
                key: d.key,
                txnid: d.txnid,
                hash: d.hash,
                amount: d.amount,
                firstname: d.firstname,
                email: d.email,
                phone: d.phone,
                productinfo: d.productinfo,
                surl: d.surl,
                furl: d.furl,
                mode: "dropout",
                udf1: d.udf1 || "",
                udf2: d.udf2 || "",
                udf3: d.udf3 || "",
                udf4: d.udf4 || "",
                udf5: d.udf5 || "",
              },
              {
                responseHandler: async function (BOLT) {
                  if (
                    BOLT &&
                    BOLT.response &&
                    (BOLT.response.txnStatus === "SUCCESS" ||
                      BOLT.response.status === "success")
                  ) {
                    toast.success("Payment Received! Generating official report...");
                    await handleExecuteRequest(
                      values,
                      BOLT.response.mihpayid || BOLT.response.txnid || d.txnid,
                      refId
                    );
                  } else {
                    toast.error(
                      BOLT?.response?.errorMessage || "Payment was not completed."
                    );
                    setLoading(false);
                  }
                },
                catchException: function (BOLT) {
                  console.warn("PayU Bolt exception:", BOLT);
                  toast.error("Payment window closed or failed. Please try again.");
                  setLoading(false);
                },
              }
            );
          } catch (launchErr) {
            console.warn("Bolt launch error, falling back to redirect:", launchErr);
            submitPayuForm(d);
          }
        } else {
          submitPayuForm(d);
        }
      } else {
        toast.error("Could not initiate payment gateway session.");
        setLoading(false);
      }
    } catch (err) {
      console.error("PayU initiation error:", err);
      const serverMsg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err.message;
      const isCooldown =
        err?.response?.status === 429 || serverMsg?.toLowerCase().includes("wait");
      toast.error(
        isCooldown
          ? serverMsg || "Payment session already active. Please wait a moment and try again."
          : serverMsg || "Failed to launch payment gateway.",
        { autoClose: isCooldown ? 8000 : 4000 }
      );
      setLoading(false);
    }
  };

  const submitPayuForm = (d) => {
    const form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", d.actionUrl);
    form.style.display = "none";

    const fields = {
      key: d.key,
      txnid: d.txnid,
      amount: d.amount,
      productinfo: d.productinfo,
      firstname: d.firstname,
      email: d.email,
      phone: d.phone,
      surl: d.surl,
      furl: d.furl,
      hash: d.hash,
      udf1: d.udf1 || "",
      udf2: d.udf2 || "",
      udf3: d.udf3 || "",
      udf4: d.udf4 || "",
      udf5: d.udf5 || "",
    };

    Object.keys(fields).forEach((name) => {
      const input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", name);
      input.setAttribute("value", fields[name]);
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        pb: { xs: 6, md: 8 },
        background: isDark ? "#0b0f19" : "#f8faff",
        fontFamily: "'Poppins', 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif !important",
        "&, & *": {
          fontFamily: "'Poppins', 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif !important",
        },
      }}
    >
      {/* ── 1. HERO SECTION (1st CTA - Starting) ───────────────────────── */}
      <Box
        sx={{
          background: isDark
            ? "radial-gradient(circle at 85% 20%, rgba(29, 46, 189, 0.15) 0%, transparent 50%), #0f172a"
            : "radial-gradient(circle at 85% 20%, rgba(29, 46, 189, 0.08) 0%, transparent 50%), #ffffff",
          pt: { xs: 4, sm: 4.5, md: 5.5 },
          pb: { xs: 5, sm: 6, md: 7 },
          position: "relative",
          borderBottom: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #eef2f6",
        }}
      >
        <Container maxWidth="xl">
          {isAdmin && (
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
              <Button
                id="btn-cibil-admin-dashboard"
                variant="contained"
                startIcon={<DashboardIcon />}
                onClick={() => navigate("/admin/cibil-dashboard")}
                sx={{
                  background: "linear-gradient(135deg, #1d2ebd 0%, #112082 100%)",
                  color: "#ffffff",
                  fontWeight: 700,
                  borderRadius: "50px",
                  px: 2.8,
                  py: 0.6,
                  fontSize: "0.88rem",
                  textTransform: "none",
                  boxShadow: "0 4px 14px rgba(29, 46, 189, 0.3)",
                }}
              >
                Admin Dashboard
              </Button>
            </Box>
          )}
          <Grid container spacing={{ xs: 3, md: 5 }} alignItems="center">
            {/* Left: Text & CTA 1 */}
            <Grid item xs={12} md={7} sx={{ textAlign: { xs: "center", md: "left" } }}>
              {/* Trust Badge */}
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  px: 2,
                  py: 0.6,
                  borderRadius: "50px",
                  background: isDark ? "rgba(29, 46, 189, 0.15)" : "#eff4ff",
                  border: `1px solid ${isDark ? "rgba(29, 46, 189, 0.3)" : "rgba(29, 46, 189, 0.2)"}`,
                  mb: 2,
                }}
              >
                <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#10b981" }} />
                <Typography
                  sx={{
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    letterSpacing: 0.8,
                    textTransform: "uppercase",
                    color: isDark ? "#818cf8" : "#1d2ebd",
                  }}
                >
                  Official Bureau Report · Instant PDF
                </Typography>
              </Box>

              {/* Headline */}
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: "2.2rem", sm: "2.8rem", md: "3.2rem" },
                  color: isDark ? "#fff" : "#0f172a",
                  lineHeight: 1.15,
                  letterSpacing: "-0.5px",
                  mb: 2,
                }}
              >
                Download Your Official
                <br />
                <Box
                  component="span"
                  sx={{
                    background: "linear-gradient(90deg, #1d2ebd 0%, #3b82f6 50%, #10b981 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  CIBIL & Credit Report
                </Box>
              </Typography>

              {/* Minimal 1-liner description */}
              <Typography
                sx={{
                  fontSize: { xs: "1rem", sm: "1.1rem" },
                  color: isDark ? "rgba(255,255,255,0.75)" : "#64748b",
                  mb: 3,
                  maxWidth: 600,
                  mx: { xs: "auto", md: "0" },
                  lineHeight: 1.6,
                }}
              >
                Get your authentic 24+ page Experian credit score with complete loan history and bank approval readiness.
              </Typography>

              {/* 3 Clean Highlights */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2.5 }}
                sx={{ mb: 3, justifyContent: { xs: "center", md: "flex-start" }, flexWrap: "wrap", gap: 1.5 }}
              >
                {[
                  "Official 3-Digit Score (300–900)",
                  "Safe Soft Inquiry (0% Impact)",
                  "Complete Loan History",
                ].map((item, idx) => (
                  <Stack direction="row" spacing={0.7} alignItems="center" key={idx} sx={{ justifyContent: { xs: "center", md: "flex-start" } }}>
                    <CheckCircleIcon sx={{ color: "#10b981", fontSize: 16 }} />
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      color={isDark ? "#e2e8f0" : "#334155"}
                      sx={{ fontSize: "0.82rem", whiteSpace: "nowrap" }}
                    >
                      {item}
                    </Typography>
                  </Stack>
                ))}
              </Stack>

              {/* ── 1st BUTTON: STARTING ── */}
              <Stack
                direction="row"
                justifyContent={{ xs: "center", md: "flex-start" }}
              >
                <ActionButton
                  id="btn-hero-instant-download"
                  onClick={handleOpenApplyModal}
                  startIcon={<DownloadIcon />}
                  sx={{
                    fontSize: "1.05rem",
                    py: 1.5,
                    px: 4,
                  }}
                >
                  Download Report for ₹50
                </ActionButton>
              </Stack>

              {/* Micro Trust Indicators */}
              <Stack
                direction="row"
                spacing={2.5}
                alignItems="center"
                justifyContent={{ xs: "center", md: "flex-start" }}
                sx={{ mt: 3, opacity: 0.85 }}
              >
                <Stack direction="row" spacing={0.6} alignItems="center">
                  <LockIcon sx={{ fontSize: 16, color: "#10b981" }} />
                  <Typography variant="body2" fontWeight={600} color="text.secondary" sx={{ fontSize: "0.85rem" }}>
                    256-Bit SSL
                  </Typography>
                </Stack>
                <Typography variant="caption" color="text.disabled">•</Typography>
                <Stack direction="row" spacing={0.6} alignItems="center">
                  <ShieldIcon sx={{ fontSize: 16, color: "#1d2ebd" }} />
                  <Typography variant="body2" fontWeight={600} color="text.secondary" sx={{ fontSize: "0.85rem" }}>
                    Experian Bureau
                  </Typography>
                </Stack>
                <Typography variant="caption" color="text.disabled">•</Typography>
                <Stack direction="row" spacing={0.6} alignItems="center">
                  <VerifiedUserIcon sx={{ fontSize: 16, color: "#10b981" }} />
                  <Typography variant="body2" fontWeight={600} color="text.secondary" sx={{ fontSize: "0.85rem" }}>
                    0% Score Impact
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            {/* Right: Clean Scorecard Preview Widget */}
            <Grid item xs={12} md={5}>
              <Card
                sx={{
                  borderRadius: "24px",
                  border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(29,46,189,0.12)",
                  background: isDark
                    ? "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)"
                    : "#ffffff",
                  boxShadow: isDark
                    ? "0 20px 40px rgba(0,0,0,0.5)"
                    : "0 20px 40px rgba(29,46,189,0.08)",
                  p: { xs: 2.5, sm: 3.5 },
                  maxWidth: 440,
                  mx: "auto",
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <VerifiedUserIcon sx={{ color: "#1d2ebd", fontSize: 22 }} />
                    <Typography variant="subtitle1" fontWeight={800} color={isDark ? "white" : "#0f172a"} sx={{ fontSize: "1rem" }}>
                      Experian Credit Score
                    </Typography>
                  </Stack>
                  <Chip
                    label="Sample Preview"
                    size="small"
                    sx={{
                      bgcolor: "#10b98115",
                      color: "#10b981",
                      fontWeight: 700,
                      fontSize: "0.76rem",
                      height: 24,
                    }}
                  />
                </Stack>

                {/* Score Gauge */}
                <Box sx={{ position: "relative", width: 220, height: 125, mx: "auto", my: 1.5 }}>
                  <svg viewBox="0 0 220 125" width="100%" height="100%">
                    <defs>
                      <linearGradient id="scoreGaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="25%" stopColor="#f97316" />
                        <stop offset="50%" stopColor="#eab308" />
                        <stop offset="75%" stopColor="#22c55e" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 25 110 A 85 85 0 0 1 195 110"
                      fill="none"
                      stroke={isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}
                      strokeWidth="14"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 25 110 A 85 85 0 0 1 195 110"
                      fill="none"
                      stroke="url(#scoreGaugeGrad)"
                      strokeWidth="14"
                      strokeLinecap="round"
                      strokeDasharray="267"
                      strokeDashoffset="33"
                    />
                  </svg>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 6,
                      left: "50%",
                      transform: "translateX(-50%)",
                      textAlign: "center",
                      width: "100%",
                    }}
                  >
                    <Typography
                      variant="h3"
                      fontWeight={900}
                      sx={{
                        color: "#10b981",
                        lineHeight: 1,
                        fontSize: "2.4rem",
                        letterSpacing: "-0.5px",
                      }}
                    >
                      825
                    </Typography>
                    <Typography
                      variant="caption"
                      fontWeight={800}
                      sx={{
                        color: "#10b981",
                        letterSpacing: 1,
                        textTransform: "uppercase",
                        fontSize: "0.76rem",
                        display: "block",
                        mt: 0.5,
                        whiteSpace: "nowrap",
                      }}
                    >
                      ★ EXCELLENT TIER
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="body2" color="text.secondary" fontWeight={600} sx={{ display: "block", textAlign: "center", mb: 2.5, fontSize: "0.85rem" }}>
                  Score Range: 300 - 900
                </Typography>

                {/* 3 Metric Pills */}
                <Grid container spacing={1.5} sx={{ mb: 2.5 }}>
                  <Grid item xs={4}>
                    <Box sx={{ p: 1.2, borderRadius: "12px", bgcolor: isDark ? "rgba(16, 185, 129, 0.1)" : "#f0fdf4", textAlign: "center" }}>
                      <Typography variant="body2" color="text.secondary" fontWeight={600} sx={{ fontSize: "0.76rem", display: "block" }}>
                        Payment
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={800} color="#10b981" sx={{ fontSize: "1.05rem" }}>
                        100%
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box sx={{ p: 1.2, borderRadius: "12px", bgcolor: isDark ? "rgba(29, 46, 189, 0.1)" : "#eff4ff", textAlign: "center" }}>
                      <Typography variant="body2" color="text.secondary" fontWeight={600} sx={{ fontSize: "0.76rem", display: "block" }}>
                        Utilization
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={800} color="#1d2ebd" sx={{ fontSize: "1.05rem" }}>
                        12%
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box sx={{ p: 1.2, borderRadius: "12px", bgcolor: isDark ? "rgba(139, 92, 246, 0.1)" : "#faf5ff", textAlign: "center" }}>
                      <Typography variant="body2" color="text.secondary" fontWeight={600} sx={{ fontSize: "0.76rem", display: "block" }}>
                        Loan Odds
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={800} color="#8b5cf6" sx={{ fontSize: "1.05rem" }}>
                        High
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                {/* Bottom Tag */}
                <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" sx={{ pt: 1.5, borderTop: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #f1f5f9" }}>
                  <DescriptionIcon sx={{ color: "#1d2ebd", fontSize: 18 }} />
                  <Typography variant="body2" fontWeight={700} color={isDark ? "white" : "#0f172a"} sx={{ fontSize: "0.85rem" }}>
                    Official 24+ Page Bureau PDF Report
                  </Typography>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ── 2. WHAT'S INSIDE YOUR REPORT ───────────────────────────────── */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          background: isDark ? "#0f172a" : "#ffffff",
          borderBottom: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #eef2f6",
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
            {/* Laptop Preview */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: isDark ? "0 20px 40px rgba(0,0,0,0.6)" : "0 20px 40px rgba(29, 46, 189, 0.1)",
                  border: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid #e2e8f0",
                }}
              >
                <Box
                  component="img"
                  src="/cibil_laptop_dashboard.webp"
                  alt="Experian CIBIL Analytics Preview"
                  sx={{ width: "100%", height: "auto", display: "block" }}
                />
              </Box>
            </Grid>

            {/* 4 Concise Report Features */}
            <Grid item xs={12} md={6}>
              <Box sx={{ pl: { md: 2 } }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 850,
                    fontSize: { xs: "2rem", sm: "2.4rem", md: "2.75rem" },
                    color: isDark ? "white" : "#0f172a",
                    lineHeight: 1.2,
                    letterSpacing: "-0.5px",
                    mb: 1.5,
                  }}
                >
                  What's Inside Your Report
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.1rem" },
                    color: isDark ? "rgba(255,255,255,0.75)" : "#64748b",
                    lineHeight: 1.6,
                    mb: 4,
                  }}
                >
                  Direct Experian integration provides complete transparency on your credit profile.
                </Typography>

                <Grid container spacing={2.5}>
                  {[
                    {
                      icon: TrendingUpIcon,
                      color: "#10b981",
                      title: "Repayment History",
                      desc: "36-month timeline of all EMI and credit card payments.",
                    },
                    {
                      icon: CreditScoreIcon,
                      color: "#1d2ebd",
                      title: "Credit Utilization",
                      desc: "Real-time card limit usage across all active banks.",
                    },
                    {
                      icon: AccountBalanceIcon,
                      color: "#8b5cf6",
                      title: "Loan Portfolio",
                      desc: "Detailed record of all active and closed loan accounts.",
                    },
                    {
                      icon: AssessmentIcon,
                      color: "#f59e0b",
                      title: "Bank Approval Odds",
                      desc: "Underwriting grade and pre-qualification eligibility.",
                    },
                  ].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <Grid item xs={12} sm={6} key={idx}>
                        <Box
                          sx={{
                            p: 2.5,
                            borderRadius: "16px",
                            bgcolor: isDark ? "rgba(255,255,255,0.03)" : "#f8faff",
                            border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #eef2f6",
                            height: "100%",
                          }}
                        >
                          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.2 }}>
                            <Box
                              sx={{
                                width: 38,
                                height: 38,
                                borderRadius: "10px",
                                bgcolor: `${item.color}15`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                              }}
                            >
                              <Icon sx={{ color: item.color, fontSize: 22 }} />
                            </Box>
                            <Typography
                              variant="subtitle1"
                              sx={{
                                fontWeight: 700,
                                fontSize: "1.1rem",
                                color: isDark ? "white" : "#0f172a",
                              }}
                            >
                              {item.title}
                            </Typography>
                          </Stack>
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: "0.95rem",
                              color: isDark ? "rgba(255,255,255,0.7)" : "#475569",
                              lineHeight: 1.6,
                            }}
                          >
                            {item.desc}
                          </Typography>
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ── 3. 3 EASY STEPS ────────────────────────────────────────────── */}
      <Box sx={{ py: { xs: 6, md: 8 } }}>
        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center" direction={{ xs: "column-reverse", md: "row" }}>
            {/* Left: 3 Steps */}
            <Grid item xs={12} md={6}>
              <Box sx={{ pr: { md: 2 } }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 850,
                    fontSize: { xs: "2rem", sm: "2.4rem", md: "2.75rem" },
                    color: isDark ? "white" : "#0f172a",
                    lineHeight: 1.2,
                    letterSpacing: "-0.5px",
                    mb: 1.5,
                  }}
                >
                  Get It in 3 Easy Steps
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.1rem" },
                    color: isDark ? "rgba(255,255,255,0.75)" : "#64748b",
                    lineHeight: 1.6,
                    mb: 4,
                  }}
                >
                  Quick, paperless, and delivered in under 30 seconds.
                </Typography>

                <Stack spacing={3}>
                  {[
                    { step: "01", title: "Enter Details", desc: "Fill in your Name, Mobile, and PAN for bureau verification." },
                    { step: "02", title: "Pay ₹50 Fee", desc: "Complete the nominal ₹50 fee securely via UPI, QR, or Cards." },
                    { step: "03", title: "Instant PDF", desc: "Experian instantly generates and opens your full credit report." },
                  ].map((st, i) => (
                    <Stack direction="row" spacing={2.5} key={i} alignItems="flex-start">
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: "14px",
                          background: "linear-gradient(135deg, #1d2ebd 0%, #112082 100%)",
                          color: "#fff",
                          fontWeight: 800,
                          fontSize: "1.1rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          boxShadow: "0 4px 14px rgba(29, 46, 189, 0.25)",
                        }}
                      >
                        {st.step}
                      </Box>
                      <Box sx={{ pt: 0.3 }}>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 700,
                            fontSize: "1.15rem",
                            color: isDark ? "white" : "#0f172a",
                            mb: 0.3,
                          }}
                        >
                          {st.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            fontSize: "0.98rem",
                            color: isDark ? "rgba(255,255,255,0.7)" : "#475569",
                            lineHeight: 1.6,
                          }}
                        >
                          {st.desc}
                        </Typography>
                      </Box>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            </Grid>

            {/* Right: Mobile Mockup */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: isDark ? "0 20px 40px rgba(0,0,0,0.6)" : "0 20px 40px rgba(29, 46, 189, 0.1)",
                  border: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid #e2e8f0",
                  maxWidth: 420,
                  mx: "auto",
                }}
              >
                <Box
                  component="img"
                  src="/cibil_mobile_score.webp"
                  alt="CIBIL Score Mobile Preview"
                  sx={{ width: "100%", height: "auto", display: "block" }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ── 4. HOW SCORE IS CALCULATED ─────────────────────────────────── */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          background: isDark ? "#0f172a" : "#ffffff",
          borderTop: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #eef2f6",
          borderBottom: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #eef2f6",
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 850,
                fontSize: { xs: "2rem", sm: "2.4rem", md: "2.75rem" },
                color: isDark ? "white" : "#0f172a",
                lineHeight: 1.2,
                letterSpacing: "-0.5px",
                mb: 1.5,
              }}
            >
              How Your Score Is Calculated
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "1rem", sm: "1.1rem" },
                color: isDark ? "rgba(255,255,255,0.75)" : "#64748b",
                maxWidth: 600,
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              The 5 core pillars credit bureaus evaluate.
            </Typography>
          </Box>

          <Grid container spacing={2.5}>
            {SCORE_FACTORS.map((factor, i) => (
              <Grid item xs={12} sm={6} md={2.4} key={i}>
                <Card
                  sx={{
                    borderRadius: "16px",
                    p: 3,
                    height: "100%",
                    border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e2e8f0",
                    background: isDark ? "#1e293b" : "#f8faff",
                    textAlign: "center",
                    boxShadow: "none",
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 900,
                      fontSize: "2.4rem",
                      color: factor.color,
                      mb: 0.5,
                      lineHeight: 1,
                    }}
                  >
                    {factor.weight}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      color: isDark ? "white" : "#0f172a",
                      mb: 0.8,
                    }}
                  >
                    {factor.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "0.95rem",
                      color: isDark ? "rgba(255,255,255,0.7)" : "#475569",
                      lineHeight: 1.6,
                    }}
                  >
                    {factor.desc}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── 5. FAQs & BOTTOM CTA BANNER ─────────────────────────────────── */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 850,
              fontSize: { xs: "2rem", sm: "2.4rem", md: "2.75rem" },
              color: isDark ? "white" : "#0f172a",
              lineHeight: 1.2,
              letterSpacing: "-0.5px",
            }}
          >
            Frequently Asked Questions
          </Typography>
        </Box>

        <Stack spacing={2} sx={{ maxWidth: 820, mx: "auto" }}>
          {FAQS.map((faq, i) => (
            <Card
              key={i}
              onClick={() => setFaqOpenIndex(faqOpenIndex === i ? -1 : i)}
              sx={{
                borderRadius: "16px",
                border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e2e8f0",
                background: isDark ? "#1e293b" : "#ffffff",
                cursor: "pointer",
                p: 2.5,
                boxShadow: "none",
                transition: "all 0.2s ease",
                "&:hover": {
                  borderColor: "#1d2ebd",
                },
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    color: isDark ? "white" : "#0f172a",
                  }}
                >
                  {faq.q}
                </Typography>
                <IconButton size="small">
                  {faqOpenIndex === i ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Stack>
              <Collapse in={faqOpenIndex === i}>
                <Typography
                  variant="body1"
                  sx={{
                    mt: 1.5,
                    fontSize: "0.98rem",
                    color: isDark ? "rgba(255,255,255,0.75)" : "#475569",
                    lineHeight: 1.7,
                  }}
                >
                  {faq.a}
                </Typography>
              </Collapse>
            </Card>
          ))}
        </Stack>

        {/* ── 2nd BUTTON: LAST (Bottom CTA Banner) ── */}
        <Box
          sx={{
            mt: 7,
            p: { xs: 4, sm: 5.5 },
            borderRadius: "24px",
            background: "linear-gradient(135deg, #1d2ebd 0%, #112082 100%)",
            color: "#fff",
            textAlign: "center",
            boxShadow: "0 16px 36px rgba(29, 46, 189, 0.3)",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              fontSize: { xs: "1.8rem", sm: "2.3rem", md: "2.6rem" },
              mb: 1.5,
              lineHeight: 1.2,
            }}
          >
            Check Your Official Credit Health in 30 Seconds
          </Typography>
          <Typography
            variant="body1"
            sx={{
              opacity: 0.9,
              maxWidth: 580,
              mx: "auto",
              mb: 3.5,
              fontSize: { xs: "1rem", sm: "1.1rem" },
              lineHeight: 1.6,
            }}
          >
            Get your authentic Experian score and full 24+ page PDF report with zero impact on your rating.
          </Typography>

          <Button
            id="btn-footer-instant-download"
            variant="contained"
            onClick={handleOpenApplyModal}
            startIcon={<DownloadIcon sx={{ color: "#1d2ebd !important" }} />}
            sx={{
              background: "#ffffff !important",
              color: "#1d2ebd !important",
              fontWeight: 800,
              fontSize: "1.08rem",
              borderRadius: "14px",
              py: 1.6,
              px: 4.5,
              textTransform: "none",
              boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
              "&, & *": {
                color: "#1d2ebd !important",
              },
              "&:hover": {
                background: "#f8faff !important",
                transform: "translateY(-2px)",
              },
              transition: "all 0.25s ease",
            }}
          >
            Download Report for ₹50
          </Button>
        </Box>
      </Container>

      {/* ── 6. INSTANT CHECKOUT MODAL ───────────────────────────────────── */}
      <Dialog
        open={isApplyModalOpen}
        onClose={() => !loading && setIsApplyModalOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "20px",
            p: { xs: 1, sm: 2 },
            background: isDark ? "#0f172a" : "#ffffff",
            fontFamily: "'Poppins', 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif !important",
            "&, & *": {
              fontFamily: "'Poppins', 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif !important",
            },
          },
        }}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 1 }}>
          <Box>
            <Typography variant="h6" fontWeight={850} color={isDark ? "white" : "#0f172a"}>
              Download CIBIL Report
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Official Experian Credit Bureau · Flat ₹50
            </Typography>
          </Box>
          <IconButton onClick={() => setIsApplyModalOpen(false)} disabled={loading} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 1 }}>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              mobile: "",
              pan: "",
              email: "",
              consent: true,
            }}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({ errors, touched, values, handleChange, handleBlur, setFieldValue, submitCount }) => (
              <Form>
                <Stack spacing={2} sx={{ mt: 1 }}>
                  {submitCount > 0 && Object.keys(errors).length > 0 && (
                    <Alert severity="error" sx={{ borderRadius: "10px", fontWeight: 600, fontSize: "0.8rem", py: 0.5 }}>
                      Please fill in all required fields correctly.
                    </Alert>
                  )}

                  {/* Name Row */}
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                    <TextField
                      fullWidth
                      size="small"
                      label="First Name *"
                      name="firstName"
                      placeholder="As on Aadhaar/PAN"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean((touched.firstName || submitCount > 0) && errors.firstName)}
                      helperText={(touched.firstName || submitCount > 0) && errors.firstName}
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      label="Last Name *"
                      name="lastName"
                      placeholder="As on Aadhaar/PAN"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean((touched.lastName || submitCount > 0) && errors.lastName)}
                      helperText={(touched.lastName || submitCount > 0) && errors.lastName}
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
                    />
                  </Stack>

                  {/* Mobile & Email Row */}
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Mobile Number *"
                      name="mobile"
                      placeholder="10-digit mobile"
                      value={values.mobile}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean((touched.mobile || submitCount > 0) && errors.mobile)}
                      helperText={(touched.mobile || submitCount > 0) && errors.mobile}
                      inputProps={{ maxLength: 10 }}
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      label="Email Address (Optional)"
                      name="email"
                      placeholder="For report updates"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean((touched.email || submitCount > 0) && errors.email)}
                      helperText={(touched.email || submitCount > 0) && errors.email}
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
                    />
                  </Stack>

                  {/* PAN Card Number */}
                  <TextField
                    fullWidth
                    size="small"
                    label="PAN Card Number"
                    name="pan"
                    placeholder="e.g. ABCDE1234F"
                    value={values.pan}
                    onChange={(e) => setFieldValue("pan", e.target.value.toUpperCase())}
                    onBlur={handleBlur}
                    error={Boolean((touched.pan || submitCount > 0) && errors.pan)}
                    helperText={(touched.pan || submitCount > 0) && errors.pan}
                    inputProps={{ maxLength: 10, style: { textTransform: "uppercase" } }}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
                  />

                  {/* Consent Checkbox */}
                  <Box>
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={values.consent}
                          onChange={(e) => setFieldValue("consent", e.target.checked)}
                          sx={{ color: "#1d2ebd", "&.Mui-checked": { color: "#1d2ebd" } }}
                        />
                      }
                      label={
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.76rem" }}>
                          I authorize F2 Fintech & Experian to pull my credit score for personal analysis.
                        </Typography>
                      }
                    />
                    {(touched.consent || submitCount > 0) && errors.consent && (
                      <Typography variant="caption" sx={{ color: "#ef4444", fontWeight: 600, display: "block", ml: 3.5 }}>
                        {errors.consent}
                      </Typography>
                    )}
                  </Box>

                  <ActionButton
                    fullWidth
                    type="submit"
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <DownloadIcon />}
                    endIcon={!loading && <ArrowForwardIcon />}
                    sx={{ py: 1.4 }}
                  >
                    {loading ? "Connecting to Payment..." : "Proceed to Pay ₹50"}
                  </ActionButton>
                </Stack>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      {/* ── 7. REPORT READY SUCCESS MODAL ──────────────────────────────── */}
      <Dialog
        open={success}
        onClose={() => setSuccess(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "20px",
            p: 3,
            textAlign: "center",
            background: isDark ? "#0f172a" : "#ffffff",
            fontFamily: "'Poppins', 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif !important",
            "&, & *": {
              fontFamily: "'Poppins', 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif !important",
            },
          },
        }}
      >
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            bgcolor: "#10b981",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 2,
            boxShadow: "0 8px 20px rgba(16, 185, 129, 0.35)",
          }}
        >
          <CheckCircleIcon sx={{ fontSize: 36, color: "white" }} />
        </Box>

        <Typography variant="h5" fontWeight={850} color={isDark ? "white" : "#0f172a"} gutterBottom>
          Report Ready! 🎉
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, fontSize: "0.85rem" }}>
          Your official Experian credit report has been generated. Click below to view your PDF:
        </Typography>

        <ActionButton
          fullWidth
          href={reportUrl}
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<DownloadIcon />}
          sx={{ py: 1.3, mb: 1.5 }}
        >
          Open Experian PDF Report
        </ActionButton>

        <Button
          variant="text"
          onClick={() => {
            setSuccess(false);
            setReportUrl("");
          }}
          sx={{ fontWeight: 600, color: "text.secondary", fontSize: "0.8rem", textTransform: "none" }}
        >
          Close
        </Button>
      </Dialog>

      {/* Admin CIBIL Dashboard Modal */}
      <AdminCibilDashboardModal
        open={openDashboardModal}
        onClose={() => setOpenDashboardModal(false)}
      />
    </Box>
  );
}
