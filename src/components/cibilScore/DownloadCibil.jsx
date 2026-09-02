import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Stack,
  CircularProgress,
  Chip,
  Divider,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slider,
  Tooltip,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  Collapse,
  Alert,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
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
import StarIcon from "@mui/icons-material/Star";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import DownloadIcon from "@mui/icons-material/Download";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PieChartIcon from "@mui/icons-material/PieChart";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import DescriptionIcon from "@mui/icons-material/Description";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { openCibilPayment } from "../../utils/razorpay";
import {
  initiateCibilRequest,
  saveCibilApplicationRecord,
  initiatePayuPayment,
  verifyPayuPayment,
} from "../../apis/CibilDownloadAPI";
import { Utility } from "../utility";
import AdminCibilDashboardModal from "./AdminCibilDashboardModal";
import "../creditCards/CreditCards.css";

// ─── Animations ───────────────────────────────────────────────────────────────
const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(50, 68, 230, 0.4); }
  50% { box-shadow: 0 0 0 16px rgba(50, 68, 230, 0); }
`;

const floatAnim = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
`;

// ─── Styled Components matching /cards UI ──────────────────────────────────────
const CategoryPill = styled(Box)(({ active, theme }) => ({
  padding: "8px 20px",
  borderRadius: "25px",
  fontSize: "0.88rem",
  fontWeight: active ? 700 : 600,
  cursor: "pointer",
  whiteSpace: "nowrap",
  transition: "all 0.25s ease",
  border: active
    ? "1px solid #3244e6"
    : theme.palette.mode === "dark"
    ? "1px solid rgba(255, 255, 255, 0.15)"
    : "1px solid #e2e8f0",
  background: active
    ? "linear-gradient(135deg, #3244e6 0%, #1d2ebd 100%)"
    : theme.palette.mode === "dark"
    ? "rgba(255, 255, 255, 0.06)"
    : "#ffffff",
  color: active
    ? "#ffffff"
    : theme.palette.mode === "dark"
    ? "#ffffff"
    : "#475569",
  boxShadow: active ? "0 4px 14px rgba(50, 68, 230, 0.3)" : "none",
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  "&:hover": {
    transform: "translateY(-2px)",
    background: active
      ? "linear-gradient(135deg, #3244e6 0%, #1d2ebd 100%)"
      : theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.15)"
      : "#f1f5f9",
  },
}));

const ActionButton = styled(Button)(() => ({
  background: "linear-gradient(135deg, #3244e6 0%, #1d2ebd 100%) !important",
  color: "#ffffff !important",
  fontWeight: 700,
  fontSize: "0.95rem",
  borderRadius: "12px",
  padding: "12px 24px",
  textTransform: "none",
  boxShadow: "0 4px 15px rgba(50, 68, 230, 0.25)",
  transition: "all 0.25s ease",
  "&, & *": {
    color: "#ffffff !important",
  },
  "&:hover": {
    background: "linear-gradient(135deg, #1d2ebd 0%, #0f1c99 100%) !important",
    transform: "translateY(-2px)",
    boxShadow: "0 8px 25px rgba(50, 68, 230, 0.35)",
  },
}));

// ─── Available CIBIL & Credit Bureau Report Packages ──────────────────────────
const CIBIL_PACKAGES = [
  {
    id: "experian-full",
    bureau: "Experian",
    bureauLogo: "⚡ Experian V3",
    title: "Official Experian Credit Report",
    badge: "Most Popular",
    badgeColor: "#3244e6",
    price: 50,
    originalPrice: 499,
    turnaround: "Instant Download (PDF)",
    description: "Comprehensive 24+ page credit report with score analytics, loan history, defaults, inquiry logs & bureau remarks.",
    features: [
      "Official 3-digit Experian Credit Score (300-900)",
      "Detailed Active & Closed Loan/Credit Card History",
      "Overdue Payments & Settlement Flag Tracker",
      "Credit Utilization & Debt-to-Income insights",
      "Instant PDF Download Link directly from Experian",
    ],
    accentColor: "#3244e6",
    category: "all",
  },
  {
    id: "cibil-health",
    bureau: "CIBIL / Multi-Bureau",
    bureauLogo: "🛡️ Credit Health Check",
    title: "Comprehensive Credit Health Analysis",
    badge: "Recommended",
    badgeColor: "#10b981",
    price: 50,
    originalPrice: 599,
    turnaround: "Instant Download (PDF)",
    description: "Detailed evaluation of factors affecting your loan approval odds with score improvement advisory.",
    features: [
      "In-depth payment punctuality breakdown (35% factor)",
      "Credit mix analysis (Secured vs Unsecured loans)",
      "High-risk inquiry detection & alerts",
      "Actionable recommendations to boost score to 750+",
      "Bank loan pre-qualification eligibility indicator",
    ],
    accentColor: "#10b981",
    category: "health",
  },
  {
    id: "loan-eligibility",
    bureau: "Loan Pre-Approval",
    bureauLogo: "🏦 Bank Ready Report",
    title: "Bank Loan Approval Scorecard",
    badge: "Instant Approval",
    badgeColor: "#f59e0b",
    price: 50,
    originalPrice: 799,
    turnaround: "Instant Download (PDF)",
    description: "Verify your bank eligibility for Home Loans, Personal Loans, Business Loans & Premium Credit Cards.",
    features: [
      "Bank underwriting risk grade & approval odds",
      "Maximum loan eligibility amount estimate",
      "Recommended interest rate tier preview",
      "Clean credit certificate verification for lenders",
      "Direct Experian partner bureau PDF download",
    ],
    accentColor: "#f59e0b",
    category: "loan",
  },
];

const CATEGORY_TABS = [
  { label: "All Reports", value: "all", icon: AssessmentIcon },
  { label: "Experian V3 Report", value: "experian", icon: SpeedIcon },
  { label: "Credit Health Check", value: "health", icon: TrendingUpIcon },
  { label: "Loan Pre-Approval Score", value: "loan", icon: AccountBalanceIcon },
];

const SCORE_FACTORS = [
  { name: "Payment History", weight: 35, desc: "On-time EMI & card payments have the highest positive impact on your score.", color: "#10b981" },
  { name: "Credit Utilization", weight: 30, desc: "Keep total credit card usage under 30% of total card limit.", color: "#3244e6" },
  { name: "Credit Age & History", weight: 15, desc: "Older credit lines prove stability and responsible borrowing.", color: "#8b5cf6" },
  { name: "Credit Type Mix", weight: 10, desc: "A balanced blend of secured loans (home/car) and unsecured cards.", color: "#f59e0b" },
  { name: "Recent Inquiries", weight: 10, desc: "Avoid multiple simultaneous loan applications within short spans.", color: "#ef4444" },
];

const FAQS = [
  {
    q: "Why is the CIBIL report charged at ₹50?",
    a: "We pull your official credit report directly from Experian's secure servers. The nominal ₹50 fee covers bureau verification and document processing with zero hidden charges or recurring subscriptions.",
  },
  {
    q: "How will I receive my CIBIL / Experian report?",
    a: "Immediately upon completing the ₹50 payment via Razorpay, our system retrieves your official credit report URL and automatically opens the PDF download page.",
  },
  {
    q: "Will checking my credit score here lower my CIBIL score?",
    a: "No! This is considered a 'Soft Inquiry', which has 0% impact on your credit score. You can check it multiple times without any negative effect.",
  },
  {
    q: "What details are required to download the report?",
    a: "You only need your full name (as per Aadhaar/PAN), active 10-digit mobile number, and PAN card number for bureau identity verification.",
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
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Admin Dashboard state & customer role check (identical to /realtor)
  const { getLocalStorage } = Utility();
  const customerInfo = getLocalStorage("customerInfo");
  const isAdmin =
    customerInfo?.role?.toLowerCase() === "admin" ||
    customerInfo?.role?.toLowerCase() === "superadmin" ||
    customerInfo?.is_admin === true ||
    customerInfo?.isAdmin === true;
  const [openDashboardModal, setOpenDashboardModal] = useState(false);

  // State
  const [simulatedScore, setSimulatedScore] = useState(760);
  const [simulatedEmis, setSimulatedEmis] = useState(15000);
  const [simulatedIncome, setSimulatedIncome] = useState(65000);

  // Toggle to require or bypass payment gateway (Set to true to re-enable payment requirement)
  const REQUIRE_PAYMENT_GATEWAY = false;

  // Modal & Step State
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1); // 1 = Details, 2 = Payment Gateway
  const [formDataValues, setFormDataValues] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [upiMode, setUpiMode] = useState("id"); // "id" or "qr"
  const [upiId, setUpiId] = useState("");
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "", name: "" });
  const [selectedBank, setSelectedBank] = useState("HDFC Bank");
  const [selectedPackage, setSelectedPackage] = useState(CIBIL_PACKAGES[0]);
  const [faqOpenIndex, setFaqOpenIndex] = useState(0);

  // Processing state
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

  const handleOpenApplyModal = (pkg = CIBIL_PACKAGES[0]) => {
    setSelectedPackage(pkg);
    setCheckoutStep(1);
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

      // Save application record to backend database for Admin tracking
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

const loadPayuBoltScript = () => {
  return new Promise((resolve) => {
    if (window.bolt && window.bolt.launch) {
      resolve(true);
      return;
    }
    const existing = document.getElementById("bolt");
    if (existing) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.payu.in/bolt/bolt.min.js";
    script.id = "bolt";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

  const handleFormSubmit = async (values) => {
    setLoading(true);
    setFormDataValues(values);

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
        // Save pending order in session storage
        sessionStorage.setItem(
          "pending_cibil_order",
          JSON.stringify({ ...values, refId, paymentId: d.txnid })
        );

        // Try PayU Bolt In-Page Modal First
        const isBoltLoaded = await loadPayuBoltScript();
        if (isBoltLoaded && window.bolt && typeof window.bolt.launch === "function") {
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
        } else {
          // Bolt script failed to load
          toast.error("Payment gateway unavailable. Please refresh and try again.");
          setLoading(false);
        }
      } else {
        toast.error("Could not initiate payment gateway session.");
        setLoading(false);
      }
    } catch (err) {
      console.error("PayU initiation error:", err);
      toast.error(
        err?.response?.data?.message ||
          err.message ||
          "Failed to launch payment gateway."
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
      service_provider: "payu_paisa",
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

  // Simulated Grade
  const getScoreGrade = (s) => {
    if (s >= 750) return { label: "Excellent", color: "#10b981", desc: "Top loan rates & instant card pre-approvals." };
    if (s >= 700) return { label: "Good", color: "#3244e6", desc: "Eligible for most loans with standard terms." };
    if (s >= 650) return { label: "Average", color: "#f59e0b", desc: "May face higher interest rates or documentation." };
    return { label: "Needs Improvement", color: "#ef4444", desc: "High rejection risk. Follow our repair guide." };
  };

  const currentGrade = getScoreGrade(simulatedScore);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        pb: { xs: 8, md: 10 },
        background: isDark ? "#0b0f19" : "#f8faff",
        fontFamily: "'Poppins', 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        "& *": {
          fontFamily: "'Poppins', 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        },
      }}
    >
      {/* ── 1. HERO SECTION ─────────────────────────────────────────────── */}
      <Box
        sx={{
          minHeight: { xs: "auto", md: "560px" },
          display: "flex",
          alignItems: "center",
          background: isDark
            ? "radial-gradient(circle at 85% 20%, rgba(50, 68, 230, 0.2) 0%, transparent 50%), radial-gradient(circle at 15% 85%, rgba(16, 185, 129, 0.12) 0%, transparent 50%), #0f172a"
            : "radial-gradient(circle at 85% 20%, rgba(50, 68, 230, 0.09) 0%, transparent 50%), radial-gradient(circle at 15% 85%, rgba(16, 185, 129, 0.08) 0%, transparent 50%), #ffffff",
          pt: { xs: 4, sm: 6, md: 7 },
          pb: { xs: 6, sm: 7, md: 8 },
          px: { xs: 2, sm: 4 },
          position: "relative",
          zIndex: 5,
        }}
      >
        {/* Dashboard Button positioned directly below navbar (identical to /realtor) */}
        {isAdmin && (
          <Box
            sx={{
              position: "absolute",
              top: { xs: 4, md: 8 },
              right: { xs: 16, sm: 24, md: 36, lg: 50 },
              zIndex: 10,
            }}
          >
            <Button
              id="btn-cibil-admin-dashboard"
              variant="contained"
              startIcon={<DashboardIcon />}
              onClick={() => navigate("/admin/cibil-dashboard")}
              sx={{
                background: isDark
                  ? "linear-gradient(135deg, #38bdf8 0%, #3b82f6 100%)"
                  : "linear-gradient(135deg, #3244e6 0%, #1d2ebd 100%)",
                color: "#ffffff",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                borderRadius: "50px",
                px: 3.5,
                py: 1.1,
                fontSize: "0.92rem",
                textTransform: "none",
                boxShadow: isDark
                  ? "0 8px 20px -4px rgba(59,130,246,0.4)"
                  : "0 8px 20px -4px rgba(50,68,230,0.35)",
                "&:hover": {
                  background: isDark
                    ? "linear-gradient(135deg, #3b82f6 0%, #38bdf8 100%)"
                    : "linear-gradient(135deg, #1d2ebd 0%, #3244e6 100%)",
                  transform: "translateY(-2px)",
                  boxShadow: isDark
                    ? "0 12px 25px -5px rgba(59,130,246,0.5)"
                    : "0 12px 25px -5px rgba(50,68,230,0.45)",
                },
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              Dashboard
            </Button>
          </Box>
        )}

        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
            {/* Left Column: Badge, Title, Subtitle, Bullet list, CTAs */}
            <Grid item xs={12} md={7} sx={{ textAlign: { xs: "center", md: "left" } }}>
              {/* Trust Badge */}
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1.2,
                  px: 2.2,
                  py: 0.8,
                  borderRadius: "50px",
                  background: isDark ? "rgba(50, 68, 230, 0.15)" : "#f0f4ff",
                  border: `1px solid ${isDark ? "rgba(50, 68, 230, 0.3)" : "rgba(50, 68, 230, 0.2)"}`,
                  boxShadow: "0 4px 14px rgba(50, 68, 230, 0.08)",
                  mb: 2.5,
                }}
              >
                <Box sx={{ width: 9, height: 9, borderRadius: "50%", backgroundColor: "#10b981", boxShadow: "0 0 10px #10b981" }} />
                <Typography
                  sx={{
                    fontSize: "0.78rem",
                    fontWeight: 800,
                    letterSpacing: 1.1,
                    textTransform: "uppercase",
                    color: isDark ? "#818cf8" : "#3244e6",
                  }}
                >
                  ⚡ Official Experian Bureau · Instant PDF · Flat ₹50
                </Typography>
              </Box>

              {/* Headline */}
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: "2.2rem", sm: "3rem", md: "3.5rem" },
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
                    background: "linear-gradient(90deg, #3244e6 0%, #6366f1 45%, #10b981 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  CIBIL & Credit Report
                </Box>
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: "0.98rem", sm: "1.1rem" },
                  color: isDark ? "rgba(255,255,255,0.8)" : "#64748b",
                  mb: 3.5,
                  maxWidth: 620,
                  mx: { xs: "auto", md: "0" },
                  lineHeight: 1.6,
                }}
              >
                Get your authentic Experian credit analysis report with complete account history,
                overdue status, and loan approval readiness for just{" "}
                <Box component="span" sx={{ color: "#3244e6", fontWeight: 800 }}>
                  ₹50 only
                </Box>
                . Instant PDF download directly to your device.
              </Typography>

              {/* Feature Highlights Grid */}
              <Grid container spacing={1.5} sx={{ mb: 4, maxWidth: 620, mx: { xs: "auto", md: "0" } }}>
                {[
                  "Official 3-Digit Experian Credit Score (300-900)",
                  "100% Safe Soft Inquiry (0% impact on credit score)",
                  "Complete 24+ Page Bureau Analytics & Loan History",
                  "Bank Pre-Qualification & Loan Approval Odds",
                ].map((feat, i) => (
                  <Grid item xs={12} sm={6} key={i}>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ textAlign: "left" }}>
                      <CheckCircleIcon sx={{ color: "#10b981", fontSize: 19, flexShrink: 0 }} />
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        sx={{ color: isDark ? "rgba(255,255,255,0.9)" : "#334155", fontSize: "0.85rem" }}
                      >
                        {feat}
                      </Typography>
                    </Stack>
                  </Grid>
                ))}
              </Grid>

              {/* Quick Action Buttons */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                justifyContent={{ xs: "center", md: "flex-start" }}
                alignItems="center"
              >
                <ActionButton
                  id="btn-hero-instant-download"
                  onClick={() => handleOpenApplyModal()}
                  startIcon={<DownloadIcon />}
                  sx={{ py: 1.6, px: 4.5, fontSize: "1.05rem" }}
                >
                  Download Report for ₹50
                </ActionButton>
              </Stack>

              {/* Trust markers */}
              <Stack
                direction="row"
                spacing={2.5}
                alignItems="center"
                justifyContent={{ xs: "center", md: "flex-start" }}
                sx={{ mt: 3, opacity: 0.8 }}
              >
                <Stack direction="row" spacing={0.6} alignItems="center">
                  <LockIcon sx={{ fontSize: 16, color: "#10b981" }} />
                  <Typography variant="caption" fontWeight={600} color="text.secondary">
                    256-Bit SSL Encrypted
                  </Typography>
                </Stack>
                <Typography variant="caption" color="text.disabled">•</Typography>
                <Stack direction="row" spacing={0.6} alignItems="center">
                  <ShieldIcon sx={{ fontSize: 16, color: "#3244e6" }} />
                  <Typography variant="caption" fontWeight={600} color="text.secondary">
                    Official Bureau Partner
                  </Typography>
                </Stack>
                <Typography variant="caption" color="text.disabled">•</Typography>
                <Stack direction="row" spacing={0.6} alignItems="center">
                  <VerifiedUserIcon sx={{ fontSize: 16, color: "#10b981" }} />
                  <Typography variant="caption" fontWeight={600} color="text.secondary">
                    0% Score Impact
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            {/* Right Column: Premium Official Credit Scorecard Widget */}
            <Grid item xs={12} md={5}>
              <Card
                sx={{
                  borderRadius: "28px",
                  border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(50,68,230,0.15)",
                  background: isDark
                    ? "linear-gradient(180deg, rgba(30, 41, 59, 0.85) 0%, rgba(15, 23, 42, 0.95) 100%)"
                    : "linear-gradient(180deg, #ffffff 0%, #f8faff 100%)",
                  backdropFilter: "blur(16px)",
                  boxShadow: isDark
                    ? "0 25px 50px -12px rgba(0, 0, 0, 0.6)"
                    : "0 25px 50px -12px rgba(50, 68, 230, 0.18)",
                  p: { xs: 2.5, sm: 3.5 },
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: isDark
                      ? "0 30px 60px -12px rgba(50, 68, 230, 0.25)"
                      : "0 30px 60px -12px rgba(50, 68, 230, 0.25)",
                  },
                }}
              >
                {/* Header: Verified Status */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: "10px",
                        bgcolor: "rgba(50, 68, 230, 0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <VerifiedUserIcon sx={{ color: "#3244e6", fontSize: 18 }} />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" fontWeight={800} color={isDark ? "white" : "#0f172a"}>
                        Experian Credit Score
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: "block", fontSize: "0.7rem", lineHeight: 1 }}>
                        Official V3 Bureau Engine
                      </Typography>
                    </Box>
                  </Stack>
                  <Chip
                    label="Live Preview"
                    size="small"
                    sx={{
                      bgcolor: "#10b98118",
                      color: "#10b981",
                      fontWeight: 800,
                      fontSize: "0.72rem",
                      border: "1px solid rgba(16, 185, 129, 0.3)",
                      height: 24,
                    }}
                  />
                </Stack>

                {/* Circular Score Meter Gauge */}
                <Box sx={{ position: "relative", width: 240, height: 135, mx: "auto", mt: 2, mb: 1.5, overflow: "hidden" }}>
                  <svg viewBox="0 0 200 115" width="100%" height="100%">
                    <defs>
                      <linearGradient id="scoreGaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="30%" stopColor="#f59e0b" />
                        <stop offset="70%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#059669" />
                      </linearGradient>
                    </defs>
                    {/* Background Track */}
                    <path
                      d="M 22 105 A 78 78 0 0 1 178 105"
                      fill="none"
                      stroke={isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}
                      strokeWidth="14"
                      strokeLinecap="round"
                    />
                    {/* Active Gradient Arc */}
                    <path
                      d="M 22 105 A 78 78 0 0 1 178 105"
                      fill="none"
                      stroke="url(#scoreGaugeGrad)"
                      strokeWidth="14"
                      strokeLinecap="round"
                      strokeDasharray="245"
                      strokeDashoffset="32"
                    />
                  </svg>
                  {/* Score Text Overlay inside Gauge */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 4,
                      left: "50%",
                      transform: "translateX(-50%)",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="h2" fontWeight={900} sx={{ color: "#10b981", lineHeight: 0.95, fontSize: "2.6rem" }}>
                      825
                    </Typography>
                    <Typography
                      variant="caption"
                      fontWeight={800}
                      sx={{
                        color: "#10b981",
                        letterSpacing: 1.2,
                        textTransform: "uppercase",
                        fontSize: "0.74rem",
                        display: "block",
                        mt: 0.5,
                      }}
                    >
                      ★ Excellent Tier
                    </Typography>
                  </Box>
                </Box>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontWeight={600}
                  sx={{ display: "block", textAlign: "center", mb: 2.5, letterSpacing: 0.4 }}
                >
                  BUREAU SCORE RANGE: 300 - 900
                </Typography>

                {/* 3 Micro-Metrics Pills */}
                <Grid container spacing={1.2} sx={{ mb: 2.5 }}>
                  <Grid item xs={4}>
                    <Box
                      sx={{
                        p: 1.2,
                        borderRadius: "14px",
                        bgcolor: isDark ? "rgba(16, 185, 129, 0.1)" : "#f0fdf4",
                        border: isDark ? "1px solid rgba(16, 185, 129, 0.2)" : "1px solid #dcfce7",
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ fontSize: "0.68rem", display: "block" }}>
                        Payment History
                      </Typography>
                      <Typography variant="subtitle2" fontWeight={900} color="#10b981">
                        100%
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={4}>
                    <Box
                      sx={{
                        p: 1.2,
                        borderRadius: "14px",
                        bgcolor: isDark ? "rgba(50, 68, 230, 0.1)" : "#f0f4ff",
                        border: isDark ? "1px solid rgba(50, 68, 230, 0.2)" : "1px solid #e0e7ff",
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ fontSize: "0.68rem", display: "block" }}>
                        Card Usage
                      </Typography>
                      <Typography variant="subtitle2" fontWeight={900} color="#3244e6">
                        12%
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={4}>
                    <Box
                      sx={{
                        p: 1.2,
                        borderRadius: "14px",
                        bgcolor: isDark ? "rgba(139, 92, 246, 0.1)" : "#faf5ff",
                        border: isDark ? "1px solid rgba(139, 92, 246, 0.2)" : "1px solid #f3e8ff",
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ fontSize: "0.68rem", display: "block" }}>
                        Loan Odds
                      </Typography>
                      <Typography variant="subtitle2" fontWeight={900} color="#8b5cf6">
                        High (98%)
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                {/* Instant PDF Download Feature Box */}
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: "14px",
                    bgcolor: isDark ? "rgba(255,255,255,0.03)" : "#f8fafc",
                    border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #e2e8f0",
                    display: "flex",
                    alignItems: "center",
                    gap: 1.2,
                    mb: 2.5,
                  }}
                >
                  <DescriptionIcon sx={{ color: "#3244e6", fontSize: 22 }} />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="caption" fontWeight={800} color={isDark ? "white" : "#0f172a"} sx={{ display: "block" }}>
                      Official 24+ Page PDF Report
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.72rem" }}>
                      Complete active loan history & bureau remarks
                    </Typography>
                  </Box>
                  <Chip label="₹50" size="small" sx={{ bgcolor: "#10b981", color: "#fff", fontWeight: 900, height: 22 }} />
                </Box>

                {/* Action CTA Button */}
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => handleOpenApplyModal()}
                  startIcon={<DownloadIcon />}
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    background: "linear-gradient(135deg, #3244e6 0%, #1d2ebd 100%)",
                    borderRadius: "14px",
                    textTransform: "none",
                    fontWeight: 800,
                    fontSize: "0.98rem",
                    py: 1.5,
                    color: "#fff",
                    boxShadow: "0 6px 20px rgba(50, 68, 230, 0.3)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #1d2ebd 0%, #0f1c99 100%)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  Get Exact Experian Score · ₹50
                </Button>

                {/* Security Tagline */}
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block", textAlign: "center", mt: 1.5, fontSize: "0.72rem" }}
                >
                  🔒 Soft Inquiry Only · Zero Impact on Credit Rating
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ── 2. VISUAL SPOTLIGHT 1: DESKTOP BUREAU ANALYTICS SHOWCASE ────── */}
      <Box
        sx={{
          py: { xs: 6, md: 9 },
          background: isDark
            ? "linear-gradient(180deg, #0f172a 0%, #0b0f19 100%)"
            : "linear-gradient(180deg, #ffffff 0%, #f8faff 100%)",
          borderTop: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #eef2f6",
          borderBottom: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #eef2f6",
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
            {/* Left Column: Realistic Laptop Mockup Image */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: "relative",
                  borderRadius: "24px",
                  overflow: "hidden",
                  boxShadow: isDark
                    ? "0 25px 50px -12px rgba(0, 0, 0, 0.7)"
                    : "0 25px 50px -12px rgba(50, 68, 230, 0.15)",
                  border: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid #e2e8f0",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: isDark
                      ? "0 30px 60px -12px rgba(50, 68, 230, 0.25)"
                      : "0 30px 60px -12px rgba(50, 68, 230, 0.22)",
                  },
                }}
              >
                <Box
                  component="img"
                  src="/cibil_laptop_dashboard.webp"
                  alt="Experian CIBIL Analytics Dashboard Preview"
                  sx={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    objectFit: "cover",
                  }}
                />

                {/* Floating Highlight Badge */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 20,
                    left: 20,
                    px: 2,
                    py: 1,
                    borderRadius: "14px",
                    background: isDark ? "rgba(15, 23, 42, 0.85)" : "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(10px)",
                    border: isDark ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(50,68,230,0.15)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                    display: "flex",
                    alignItems: "center",
                    gap: 1.2,
                  }}
                >
                  <SpeedIcon sx={{ color: "#10b981", fontSize: 20 }} />
                  <Typography variant="caption" fontWeight={800} color={isDark ? "white" : "#0f172a"}>
                    Instant 10-Second PDF Retrieval
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Right Column: Key Report Insights */}
            <Grid item xs={12} md={6}>
              <Box sx={{ pl: { md: 2 } }}>
                <Chip
                  label="Official Bureau Insights"
                  size="small"
                  sx={{ bgcolor: "#3244e618", color: "#3244e6", fontWeight: 800, mb: 1.5 }}
                />
                <Typography variant="h3" fontWeight={850} color={isDark ? "white" : "#0f172a"} sx={{ mb: 2, lineHeight: 1.2 }}>
                  Everything Inside Your ₹50 Official Report
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3.5, lineHeight: 1.6 }}>
                  Our direct integration with Experian credit bureau generates your authentic, complete PDF report detailing all loan lines, card records, and underwriting scores.
                </Typography>

                {/* 4 Feature Items */}
                <Stack spacing={2.5}>
                  {[
                    {
                      icon: TrendingUpIcon,
                      color: "#10b981",
                      title: "Repayment Punctuality (35% Factor)",
                      desc: "Complete 36-month month-on-month repayment timeline, delayed EMI alerts, and settlement logs.",
                    },
                    {
                      icon: CreditScoreIcon,
                      color: "#3244e6",
                      title: "Credit Card Limit Utilization (30% Factor)",
                      desc: "Live debt-to-limit ratio analysis across all bank cards to help you stay in the safe under-30% zone.",
                    },
                    {
                      icon: AccountBalanceIcon,
                      color: "#8b5cf6",
                      title: "Active & Closed Loan Portfolio",
                      desc: "Inventory of Home Loans, Personal Loans, Auto Loans, and Credit Cards with principal balances.",
                    },
                    {
                      icon: AssessmentIcon,
                      color: "#f59e0b",
                      title: "Bank Loan Approval Readiness Grade",
                      desc: "Lender risk classification and personalized score recommendations to boost approval odds.",
                    },
                  ].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <Stack direction="row" spacing={2} key={idx} alignItems="flex-start">
                        <Box
                          sx={{
                            width: 44,
                            height: 44,
                            borderRadius: "12px",
                            bgcolor: `${item.color}15`,
                            border: `1px solid ${item.color}30`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <Icon sx={{ color: item.color, fontSize: 22 }} />
                        </Box>
                        <Box>
                          <Typography variant="subtitle2" fontWeight={800} color={isDark ? "white" : "#0f172a"}>
                            {item.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.3, fontSize: "0.86rem", lineHeight: 1.5 }}>
                            {item.desc}
                          </Typography>
                        </Box>
                      </Stack>
                    );
                  })}
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ── 3. VISUAL SPOTLIGHT 2: MOBILE ACCESS & 3 EASY STEPS ─────────── */}
      <Box sx={{ py: { xs: 6, md: 9 } }}>
        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center" direction={{ xs: "column-reverse", md: "row" }}>
            {/* Left Column: 3 Easy Steps */}
            <Grid item xs={12} md={6}>
              <Box sx={{ pr: { md: 2 } }}>
                <Chip
                  label="Quick & Seamless"
                  size="small"
                  sx={{ bgcolor: "#10b98118", color: "#10b981", fontWeight: 800, mb: 1.5 }}
                />
                <Typography variant="h3" fontWeight={850} color={isDark ? "white" : "#0f172a"} sx={{ mb: 2, lineHeight: 1.2 }}>
                  Download In 3 Easy Steps
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
                  No lengthy forms or paperwork required. Get your official bureau report straight to your mobile or laptop in under 30 seconds.
                </Typography>

                <Stack spacing={3}>
                  {[
                    {
                      step: "01",
                      title: "Enter Basic Details",
                      desc: "Fill in your Name, linked 10-digit Mobile Number, and PAN for authentic bureau identification.",
                    },
                    {
                      step: "02",
                      title: "Instant Verification & ₹50 Fee",
                      desc: "Complete the nominal ₹50 bureau processing fee securely via UPI, QR code, Cards, or NetBanking.",
                    },
                    {
                      step: "03",
                      title: "Instant PDF Download",
                      desc: "Experian retrieves your full credit report and automatically opens the downloadable PDF file.",
                    },
                  ].map((st, i) => (
                    <Stack direction="row" spacing={2.5} key={i} alignItems="flex-start">
                      <Box
                        sx={{
                          width: 46,
                          height: 46,
                          borderRadius: "14px",
                          background: "linear-gradient(135deg, #3244e6 0%, #1d2ebd 100%)",
                          color: "#fff",
                          fontWeight: 900,
                          fontSize: "1.1rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 4px 14px rgba(50, 68, 230, 0.3)",
                          flexShrink: 0,
                        }}
                      >
                        {st.step}
                      </Box>
                      <Box>
                        <Typography variant="subtitle1" fontWeight={800} color={isDark ? "white" : "#0f172a"}>
                          {st.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.3, lineHeight: 1.5 }}>
                          {st.desc}
                        </Typography>
                      </Box>
                    </Stack>
                  ))}
                </Stack>

                <Button
                  variant="contained"
                  onClick={() => handleOpenApplyModal()}
                  startIcon={<DownloadIcon sx={{ color: "#ffffff !important" }} />}
                  endIcon={<ArrowForwardIcon sx={{ color: "#ffffff !important" }} />}
                  sx={{
                    mt: 4.5,
                    background: "linear-gradient(135deg, #3244e6 0%, #1d2ebd 100%) !important",
                    color: "#ffffff !important",
                    borderRadius: "12px",
                    px: 4,
                    py: 1.5,
                    fontWeight: 700,
                    textTransform: "none",
                    fontSize: "1rem",
                    boxShadow: "0 4px 15px rgba(50, 68, 230, 0.25)",
                    "&, & *": {
                      color: "#ffffff !important",
                    },
                    "&:hover": {
                      background: "linear-gradient(135deg, #1d2ebd 0%, #0f1c99 100%) !important",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  Download Report Now (₹50)
                </Button>
              </Box>
            </Grid>

            {/* Right Column: Realistic Mobile Phone Mockup Image */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: "relative",
                  borderRadius: "24px",
                  overflow: "hidden",
                  boxShadow: isDark
                    ? "0 25px 50px -12px rgba(0, 0, 0, 0.7)"
                    : "0 25px 50px -12px rgba(50, 68, 230, 0.15)",
                  border: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid #e2e8f0",
                  maxWidth: { xs: "100%", sm: "480px" },
                  mx: "auto",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: isDark
                      ? "0 30px 60px -12px rgba(16, 185, 129, 0.25)"
                      : "0 30px 60px -12px rgba(16, 185, 129, 0.22)",
                  },
                }}
              >
                <Box
                  component="img"
                  src="/cibil_mobile_score.webp"
                  alt="CIBIL Score Mobile Report Preview"
                  sx={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    objectFit: "cover",
                  }}
                />

                {/* Floating Tag */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    px: 1.8,
                    py: 0.8,
                    borderRadius: "12px",
                    background: "rgba(16, 185, 129, 0.9)",
                    backdropFilter: "blur(8px)",
                    color: "#fff",
                    boxShadow: "0 6px 16px rgba(16, 185, 129, 0.35)",
                    display: "flex",
                    alignItems: "center",
                    gap: 0.8,
                  }}
                >
                  <CheckCircleIcon sx={{ fontSize: 16 }} />
                  <Typography variant="caption" fontWeight={800}>
                    Official Experian V3 Score
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ── 4. SCORE FACTORS BREAKDOWN ──────────────────────────────────── */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          background: isDark
            ? "linear-gradient(180deg, #0b0f19 0%, #0f172a 100%)"
            : "linear-gradient(180deg, #f8faff 0%, #ffffff 100%)",
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Chip label="Credit Knowledge" size="small" sx={{ bgcolor: "#3244e618", color: "#3244e6", fontWeight: 700, mb: 1.5 }} />
            <Typography variant="h3" fontWeight={850} color={isDark ? "white" : "#0f172a"}>
              How Your Credit Score Is Calculated
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 620, mx: "auto", mt: 1 }}>
              Understanding the 5 key pillars credit bureaus evaluate when determining your score.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {SCORE_FACTORS.map((factor, i) => (
              <Grid item xs={12} sm={6} md={2.4} key={i}>
                <Card
                  sx={{
                    borderRadius: "20px",
                    p: 3,
                    height: "100%",
                    border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e2e8f0",
                    background: isDark ? "#1e293b" : "#ffffff",
                    textAlign: "center",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                    transition: "all 0.25s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      borderColor: factor.color,
                      boxShadow: `0 12px 28px ${factor.color}20`,
                    },
                  }}
                >
                  <Typography variant="h3" fontWeight={900} sx={{ color: factor.color, mb: 0.5 }}>
                    {factor.weight}%
                  </Typography>
                  <Typography variant="subtitle1" fontWeight={800} sx={{ color: isDark ? "white" : "#0f172a", mb: 1 }}>
                    {factor.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.6, display: "block" }}>
                    {factor.desc}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── 5. FAQ SECTION ──────────────────────────────────────────────── */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Chip label="Got Questions?" size="small" sx={{ bgcolor: "#3244e618", color: "#3244e6", fontWeight: 700, mb: 1.5 }} />
          <Typography variant="h3" fontWeight={850} color={isDark ? "white" : "#0f172a"}>
            Frequently Asked Questions
          </Typography>
        </Box>

        <Stack spacing={2} sx={{ maxWidth: 840, mx: "auto" }}>
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
                transition: "all 0.2s ease",
                "&:hover": {
                  borderColor: "#3244e6",
                },
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle1" fontWeight={700} color={isDark ? "white" : "#0f172a"}>
                  {faq.q}
                </Typography>
                <IconButton size="small">
                  {faqOpenIndex === i ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Stack>
              <Collapse in={faqOpenIndex === i}>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5, lineHeight: 1.7 }}>
                  {faq.a}
                </Typography>
              </Collapse>
            </Card>
          ))}
        </Stack>

        {/* Bottom CTA Banner */}
        <Box
          sx={{
            mt: 7,
            p: { xs: 3, sm: 5 },
            borderRadius: "24px",
            background: "linear-gradient(135deg, #3244e6 0%, #1d2ebd 60%, #0f1c99 100%)",
            color: "#fff",
            textAlign: "center",
            boxShadow: "0 20px 40px rgba(50, 68, 230, 0.3)",
          }}
        >
          <Typography variant="h4" fontWeight={900} sx={{ mb: 1.5 }}>
            Check Your Official Credit Health in 30 Seconds
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: 600, mx: "auto", mb: 3.5 }}>
            Join thousands of smart borrowers who track their official Experian credit score with zero impact on their rating.
          </Typography>
          <Button
            variant="contained"
            onClick={() => handleOpenApplyModal()}
            startIcon={<DownloadIcon />}
            sx={{
              background: "#ffffff",
              color: "#3244e6",
              fontWeight: 800,
              fontSize: "1rem",
              borderRadius: "14px",
              py: 1.6,
              px: 4.5,
              textTransform: "none",
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              "&:hover": {
                background: "#f8faff",
                transform: "translateY(-2px)",
              },
            }}
          >
            Download Report for ₹50 Now
          </Button>
        </Box>
      </Container>

      {/* ── 6. INSTANT CHECKOUT MODAL (₹50 Razorpay) ──────────────────────── */}
      <Dialog
        open={isApplyModalOpen}
        onClose={() => !loading && setIsApplyModalOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "24px",
            p: { xs: 1, sm: 2 },
            background: isDark ? "#0f172a" : "#ffffff",
          },
        }}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 1 }}>
          <Box>
            <Typography variant="h5" fontWeight={850} color={isDark ? "white" : "#0f172a"}>
              Download CIBIL Report
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Official Experian Credit Bureau · Flat ₹50
            </Typography>
          </Box>
          <IconButton onClick={() => setIsApplyModalOpen(false)} disabled={loading}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          {/* Order Summary Banner */}
          <Box
            sx={{
              p: 2,
              borderRadius: "14px",
              background: "linear-gradient(135deg, rgba(50,68,230,0.08) 0%, rgba(16,185,129,0.08) 100%)",
              border: "1px solid rgba(50,68,230,0.15)",
              mb: 3,
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="subtitle2" fontWeight={800} color={isDark ? "white" : "#0f172a"}>
                  {selectedPackage?.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Instant PDF Download Link via Experian
                </Typography>
              </Box>
              <Typography variant="h5" fontWeight={900} color="#10b981">
                ₹50
              </Typography>
            </Stack>
          </Box>

          {checkoutStep === 1 ? (
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
                  <Stack spacing={2}>
                    {/* Error Banner when form submission has errors */}
                    {submitCount > 0 && Object.keys(errors).length > 0 && (
                      <Alert
                        severity="error"
                        sx={{
                          borderRadius: "12px",
                          fontWeight: 600,
                          fontSize: "0.85rem",
                          "& .MuiAlert-message": { width: "100%" },
                        }}
                      >
                        Please fill in all mandatory fields correctly to proceed.
                      </Alert>
                    )}

                    {/* 1. Name Row */}
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ width: "100%" }}>
                      <TextField
                        fullWidth
                        label="First Name *"
                        name="firstName"
                        placeholder="As on Aadhaar/PAN"
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean((touched.firstName || submitCount > 0) && errors.firstName)}
                        helperText={(touched.firstName || submitCount > 0) && errors.firstName}
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                          },
                          "& .MuiFormHelperText-root": {
                            color: "#ef4444 !important",
                            fontWeight: 600,
                            fontSize: "0.75rem",
                          },
                        }}
                      />
                      <TextField
                        fullWidth
                        label="Last Name *"
                        name="lastName"
                        placeholder="As on Aadhaar/PAN"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean((touched.lastName || submitCount > 0) && errors.lastName)}
                        helperText={(touched.lastName || submitCount > 0) && errors.lastName}
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                          },
                          "& .MuiFormHelperText-root": {
                            color: "#ef4444 !important",
                            fontWeight: 600,
                            fontSize: "0.75rem",
                          },
                        }}
                      />
                    </Stack>

                    {/* 2. Mobile & Email */}
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ width: "100%" }}>
                      <TextField
                        fullWidth
                        label="Mobile Number *"
                        name="mobile"
                        placeholder="10-digit linked mobile"
                        value={values.mobile}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean((touched.mobile || submitCount > 0) && errors.mobile)}
                        helperText={(touched.mobile || submitCount > 0) && errors.mobile}
                        inputProps={{ maxLength: 10 }}
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                          },
                          "& .MuiFormHelperText-root": {
                            color: "#ef4444 !important",
                            fontWeight: 600,
                            fontSize: "0.75rem",
                          },
                        }}
                      />
                      <TextField
                        fullWidth
                        label="Email Address (Optional)"
                        name="email"
                        placeholder="For report updates"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean((touched.email || submitCount > 0) && errors.email)}
                        helperText={(touched.email || submitCount > 0) && errors.email}
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                          },
                          "& .MuiFormHelperText-root": {
                            color: "#ef4444 !important",
                            fontWeight: 600,
                            fontSize: "0.75rem",
                          },
                        }}
                      />
                    </Stack>

                    {/* 3. PAN Card Number */}
                    <TextField
                      fullWidth
                      label="PAN Card Number"
                      name="pan"
                      placeholder="e.g. ABCDE1234F"
                      value={values.pan}
                      onChange={(e) => setFieldValue("pan", e.target.value.toUpperCase())}
                      onBlur={handleBlur}
                      error={Boolean((touched.pan || submitCount > 0) && errors.pan)}
                      helperText={(touched.pan || submitCount > 0) && errors.pan}
                      inputProps={{ maxLength: 10, style: { textTransform: "uppercase" } }}
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                        },
                        "& .MuiFormHelperText-root": {
                          color: "#ef4444 !important",
                          fontWeight: 600,
                          fontSize: "0.75rem",
                        },
                      }}
                    />

                    {/* 6. Consent Authorization */}
                    <Box>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={values.consent}
                            onChange={(e) => setFieldValue("consent", e.target.checked)}
                            sx={{ color: "#3244e6", "&.Mui-checked": { color: "#3244e6" } }}
                          />
                        }
                        label={
                          <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.4 }}>
                            I authorize F2 Fintech & Experian Credit Bureau to pull my credit report & history for personal analysis.
                          </Typography>
                        }
                      />
                      {(touched.consent || submitCount > 0) && errors.consent && (
                        <Typography variant="caption" sx={{ color: "#ef4444", fontWeight: 600, display: "block", ml: 4 }}>
                          {errors.consent}
                        </Typography>
                      )}
                    </Box>

                    <ActionButton
                      fullWidth
                      type="submit"
                      disabled={loading}
                      startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <DownloadIcon />}
                      endIcon={!loading && <ArrowForwardIcon />}
                      sx={{ py: 1.5, fontSize: "1.05rem" }}
                    >
                      {loading
                        ? "Connecting to Payment Gateway..."
                        : "Generate & Download CIBIL Report (₹50) →"}
                    </ActionButton>
                  </Stack>
                </Form>
              )}
            </Formik>
          ) : (
            /* ── STEP 2: PAYMENT GATEWAY INTERFACE ── */
            <Box>
              <Box
                sx={{
                  p: 2,
                  borderRadius: "16px",
                  bgcolor: isDark ? "rgba(255,255,255,0.04)" : "#f8fafc",
                  border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #e2e8f0",
                  mb: 2.5,
                }}
              >
                <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ textTransform: "uppercase", letterSpacing: 0.5 }}>
                  Select Payment Method:
                </Typography>

                <Stack spacing={1.5} sx={{ mt: 1.5 }}>
                  {/* ── 1. UPI / QR Option ── */}
                  <Card
                    onClick={() => setPaymentMethod("upi")}
                    sx={{
                      p: 2,
                      borderRadius: "14px",
                      cursor: "pointer",
                      border: paymentMethod === "upi" ? "2px solid #3244e6" : "1px solid #e2e8f0",
                      background: paymentMethod === "upi" ? (isDark ? "rgba(50,68,230,0.15)" : "#f0f4ff") : (isDark ? "#1e293b" : "#fff"),
                      transition: "all 0.2s",
                    }}
                  >
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Typography variant="h5">⚡</Typography>
                        <Box>
                          <Typography variant="subtitle2" fontWeight={800} color={isDark ? "white" : "#0f172a"}>
                            UPI / QR Code
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Google Pay, PhonePe, Paytm, BHIM, Cred
                          </Typography>
                        </Box>
                      </Stack>
                      <Chip label="Instant" size="small" sx={{ bgcolor: "#10b98118", color: "#10b981", fontWeight: 800, height: 22 }} />
                    </Stack>

                    {paymentMethod === "upi" && (
                      <Box sx={{ mt: 2, pt: 1.5, borderTop: "1px dashed rgba(50,68,230,0.3)" }}>
                        {/* Sub tabs: UPI ID vs Scan QR */}
                        <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
                          <Button
                            size="small"
                            variant={upiMode === "id" ? "contained" : "outlined"}
                            onClick={(e) => { e.stopPropagation(); setUpiMode("id"); }}
                            sx={{ borderRadius: "8px", textTransform: "none", py: 0.4, fontSize: "0.8rem", fontWeight: 700 }}
                          >
                            UPI ID / VPA
                          </Button>
                          <Button
                            size="small"
                            variant={upiMode === "qr" ? "contained" : "outlined"}
                            onClick={(e) => { e.stopPropagation(); setUpiMode("qr"); }}
                            sx={{ borderRadius: "8px", textTransform: "none", py: 0.4, fontSize: "0.8rem", fontWeight: 700 }}
                          >
                            Scan QR Code (₹50)
                          </Button>
                        </Stack>

                        {upiMode === "id" ? (
                          <TextField
                            fullWidth
                            size="small"
                            placeholder="Enter your UPI ID (e.g. 9876543210@upi, rahul@okaxis)"
                            value={upiId}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => setUpiId(e.target.value)}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: "10px",
                                background: isDark ? "#0f172a" : "#fff",
                              },
                            }}
                          />
                        ) : (
                          <Box sx={{ textAlign: "center", p: 1.5, bgcolor: isDark ? "#0f172a" : "#fff", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                            <Box
                              component="img"
                              src={`https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=upi://pay?pa=f2fintech@icici%26pn=F2%20Fintech%26am=50.00%26cu=INR%26tn=CIBIL%20Report`}
                              alt="UPI QR Code"
                              sx={{ width: 120, height: 120, borderRadius: "8px", mx: "auto", display: "block" }}
                            />
                            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1, fontWeight: 600 }}>
                              Scan with any UPI App · Amount: ₹50.00
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    )}
                  </Card>

                  {/* ── 2. Debit / Credit Card Option ── */}
                  <Card
                    onClick={() => setPaymentMethod("card")}
                    sx={{
                      p: 2,
                      borderRadius: "14px",
                      cursor: "pointer",
                      border: paymentMethod === "card" ? "2px solid #3244e6" : "1px solid #e2e8f0",
                      background: paymentMethod === "card" ? (isDark ? "rgba(50,68,230,0.15)" : "#f0f4ff") : (isDark ? "#1e293b" : "#fff"),
                      transition: "all 0.2s",
                    }}
                  >
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Typography variant="h5">💳</Typography>
                        <Box>
                          <Typography variant="subtitle2" fontWeight={800} color={isDark ? "white" : "#0f172a"}>
                            Debit / Credit Card
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Visa, Mastercard, RuPay, Maestro
                          </Typography>
                        </Box>
                      </Stack>
                    </Stack>

                    {paymentMethod === "card" && (
                      <Box sx={{ mt: 2, pt: 1.5, borderTop: "1px dashed rgba(50,68,230,0.3)" }} onClick={(e) => e.stopPropagation()}>
                        <Stack spacing={1.5}>
                          <TextField
                            fullWidth
                            size="small"
                            placeholder="Card Number (16 digits)"
                            value={cardDetails.number}
                            onChange={(e) => {
                              const v = e.target.value.replace(/\D/g, "").slice(0, 16);
                              const formatted = v.replace(/(\d{4})(?=\d)/g, "$1 ");
                              setCardDetails({ ...cardDetails, number: formatted });
                            }}
                            inputProps={{ maxLength: 19 }}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: "10px",
                                background: isDark ? "#0f172a" : "#fff",
                              },
                            }}
                          />
                          <Stack direction="row" spacing={1.5}>
                            <TextField
                              fullWidth
                              size="small"
                              placeholder="MM/YY"
                              value={cardDetails.expiry}
                              onChange={(e) => {
                                let v = e.target.value.replace(/\D/g, "").slice(0, 4);
                                if (v.length > 2) v = `${v.slice(0, 2)}/${v.slice(2)}`;
                                setCardDetails({ ...cardDetails, expiry: v });
                              }}
                              inputProps={{ maxLength: 5 }}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: "10px",
                                  background: isDark ? "#0f172a" : "#fff",
                                },
                              }}
                            />
                            <TextField
                              fullWidth
                              size="small"
                              type="password"
                              placeholder="CVV"
                              value={cardDetails.cvv}
                              onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                              inputProps={{ maxLength: 4 }}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: "10px",
                                  background: isDark ? "#0f172a" : "#fff",
                                },
                              }}
                            />
                          </Stack>
                        </Stack>
                      </Box>
                    )}
                  </Card>

                  {/* ── 3. Net Banking Option ── */}
                  <Card
                    onClick={() => setPaymentMethod("netbanking")}
                    sx={{
                      p: 2,
                      borderRadius: "14px",
                      cursor: "pointer",
                      border: paymentMethod === "netbanking" ? "2px solid #3244e6" : "1px solid #e2e8f0",
                      background: paymentMethod === "netbanking" ? (isDark ? "rgba(50,68,230,0.15)" : "#f0f4ff") : (isDark ? "#1e293b" : "#fff"),
                      transition: "all 0.2s",
                    }}
                  >
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Typography variant="h5">🏦</Typography>
                        <Box>
                          <Typography variant="subtitle2" fontWeight={800} color={isDark ? "white" : "#0f172a"}>
                            Net Banking
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            All Major Indian Banks
                          </Typography>
                        </Box>
                      </Stack>
                    </Stack>

                    {paymentMethod === "netbanking" && (
                      <Box sx={{ mt: 2, pt: 1.5, borderTop: "1px dashed rgba(50,68,230,0.3)" }} onClick={(e) => e.stopPropagation()}>
                        <Typography variant="caption" fontWeight={700} color={isDark ? "#94a3b8" : "#475569"} sx={{ display: "block", mb: 1 }}>
                          Popular Banks:
                        </Typography>
                        <Grid container spacing={1} sx={{ mb: 2 }}>
                          {["HDFC Bank", "SBI", "ICICI Bank", "Axis Bank", "Kotak Bank", "PNB"].map((bank) => {
                            const isSelected = selectedBank === bank;
                            return (
                              <Grid item xs={4} key={bank}>
                                <Button
                                  fullWidth
                                  size="small"
                                  onClick={() => setSelectedBank(bank)}
                                  sx={{
                                    borderRadius: "8px",
                                    textTransform: "none",
                                    fontSize: "0.78rem",
                                    fontWeight: 700,
                                    py: 0.8,
                                    border: isSelected ? "2px solid #3244e6" : "1px solid #cbd5e1",
                                    background: isSelected ? "#3244e6" : (isDark ? "#1e293b" : "#ffffff"),
                                    color: isSelected ? "#ffffff !important" : (isDark ? "#ffffff !important" : "#0f172a !important"),
                                    boxShadow: isSelected ? "0 2px 8px rgba(50,68,230,0.3)" : "none",
                                    "&:hover": {
                                      background: isSelected ? "#1d2ebd" : (isDark ? "#334155" : "#f1f5f9"),
                                      borderColor: "#3244e6",
                                    },
                                  }}
                                >
                                  {bank}
                                </Button>
                              </Grid>
                            );
                          })}
                        </Grid>

                        {/* Search Among All Banks */}
                        <Typography variant="caption" fontWeight={700} color={isDark ? "#94a3b8" : "#475569"} sx={{ display: "block", mb: 0.8 }}>
                          Or Search Other Banks:
                        </Typography>
                        <TextField
                          select
                          fullWidth
                          size="small"
                          value={selectedBank}
                          onChange={(e) => setSelectedBank(e.target.value)}
                          SelectProps={{
                            native: true,
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "10px",
                              background: isDark ? "#0f172a" : "#fff",
                              color: isDark ? "#fff" : "#0f172a",
                              fontWeight: 600,
                            },
                          }}
                        >
                          <option value="" disabled>-- Select From All 50+ Indian Banks --</option>
                          {[
                            "HDFC Bank",
                            "State Bank of India (SBI)",
                            "ICICI Bank",
                            "Axis Bank",
                            "Kotak Mahindra Bank",
                            "Punjab National Bank (PNB)",
                            "Bank of Baroda",
                            "Canara Bank",
                            "Union Bank of India",
                            "IndusInd Bank",
                            "Yes Bank",
                            "IDFC FIRST Bank",
                            "Federal Bank",
                            "Central Bank of India",
                            "Indian Bank",
                            "Bank of India",
                            "RBL Bank",
                            "AU Small Finance Bank",
                            "Bandhan Bank",
                            "IDBI Bank",
                            "South Indian Bank",
                            "UCO Bank",
                            "City Union Bank",
                            "Karur Vysya Bank",
                            "Punjab & Sind Bank",
                            "Equitas Small Finance Bank",
                            "Ujjivan Small Finance Bank",
                          ].map((b) => (
                            <option key={b} value={b} style={{ color: "#000", background: "#fff" }}>
                              {b}
                            </option>
                          ))}
                        </TextField>
                      </Box>
                    )}
                  </Card>
                </Stack>
              </Box>

              {/* Order Summary details */}
              <Box sx={{ p: 2, borderRadius: "12px", bgcolor: isDark ? "rgba(255,255,255,0.03)" : "#f8fafc", mb: 2.5, border: "1px solid #e2e8f0" }}>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.8 }}>
                  <Typography variant="body2" color="text.secondary">Name:</Typography>
                  <Typography variant="body2" fontWeight={700}>{formDataValues?.firstName} {formDataValues?.lastName}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.8 }}>
                  <Typography variant="body2" color="text.secondary">Mobile:</Typography>
                  <Typography variant="body2" fontWeight={700}>{formDataValues?.mobile}</Typography>
                </Stack>
                <Divider sx={{ my: 1 }} />
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="subtitle1" fontWeight={800}>Total Payable:</Typography>
                  <Typography variant="h5" fontWeight={900} color="#10b981">₹50.00</Typography>
                </Stack>
              </Box>

              {/* Pay Now Button */}
              <Stack spacing={1.5}>
                <ActionButton
                  fullWidth
                  onClick={handleExecutePayment}
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <CurrencyRupeeIcon />}
                  sx={{ py: 1.5, fontSize: "1.05rem" }}
                >
                  {loading ? "Processing ₹50 Payment..." : "Pay ₹50 & Generate CIBIL Report"}
                </ActionButton>

                <Button
                  variant="text"
                  onClick={() => setCheckoutStep(1)}
                  disabled={loading}
                  sx={{ textTransform: "none", color: "text.secondary", fontWeight: 600 }}
                >
                  ← Edit Customer Details
                </Button>

                <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                  <LockIcon sx={{ fontSize: 14, color: "text.secondary" }} />
                  <Typography variant="caption" color="text.secondary">
                    Secured by 256-bit Bank-Grade Encryption
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          )}
        </DialogContent>
      </Dialog>



      {/* ── 8. REPORT READY SUCCESS MODAL ──────────────────────────────── */}
      <Dialog
        open={success}
        onClose={() => setSuccess(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "24px",
            p: 3,
            textAlign: "center",
            background: isDark ? "#0f172a" : "#ffffff",
          },
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              boxShadow: "0 12px 30px rgba(16, 185, 129, 0.35)",
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 44, color: "white" }} />
          </Box>
        </Box>

        <Typography variant="h4" fontWeight={850} color={isDark ? "white" : "#0f172a"} gutterBottom>
          Report Ready! 🎉
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Your official Experian CIBIL credit report has been generated. If the download didn't start automatically, click the button below:
        </Typography>

        <ActionButton
          fullWidth
          href={reportUrl}
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<DownloadIcon />}
          sx={{ py: 1.5, fontSize: "1.05rem", mb: 2 }}
        >
          Open Experian PDF Report
        </ActionButton>

        <Button
          variant="text"
          onClick={() => {
            setSuccess(false);
            setReportUrl("");
          }}
          sx={{ fontWeight: 600, color: "text.secondary" }}
        >
          Check Another Credit Score
        </Button>
      </Dialog>

      {/* Admin CIBIL Dashboard Modal (Identical modal flow to /realtor) */}
      <AdminCibilDashboardModal
        open={openDashboardModal}
        onClose={() => setOpenDashboardModal(false)}
      />
    </Box>
  );
}
