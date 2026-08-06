import { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SpeedIcon from "@mui/icons-material/Speed";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import VerifiedIcon from "@mui/icons-material/Verified";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { toast } from "react-toastify";
import { postDsa, getDsas } from "../../apis/DsaAPI";
import PartnerApplicationModal from "../common/PartnerApplicationModal";
import AdminPartnerDashboardModal from "../common/AdminPartnerDashboardModal";
import { Utility } from "../utility";

const problems = [
  "Low Commission Earnings",
  "Slow Loan Approvals",
  "Limited Lender Access",
  "Frequent Policy Changes",
  "Manual Documentation",
  "No Lead Tracking System",
  "Delayed Commission Payments",
  "Lack of Backend Support",
];

const solutions = [
  "Higher Commission Structure",
  "Faster Loan Approvals",
  "Access to 40+ Lenders",
  "Dedicated Policy Support",
  "Digital Documentation Process",
  "Real-Time Lead Tracking",
  "Same Day Settlements",
  "Dedicated Relationship Manager",
];

const steps = [
  {
    number: "01",
    title: "Contact Us",
    description:
      "To become a DSA either go to our website or text us on WhatsApp on the number - 8810600135",
  },
  {
    number: "02",
    title: "Submit KYC Documents",
    description:
      "Submit your KYC documents including: Aadhaar, PAN, Bank Account Details & GST",
  },
  {
    number: "03",
    title: "Onboarding & Training",
    description:
      "We will start with the onboarding process and also the training process to set you up for success.",
  },
  {
    number: "04",
    title: "Start Earning",
    description:
      "Start referring, bring the clients, and earn your revenue. Unlimited growth awaits!",
  },
];

const benefits = [
  { icon: <CurrencyRupeeIcon />, text: "Higher Commission Structure" },
  { icon: <AccountBalanceIcon />, text: "40+ Banks & NBFC Partners" },
  { icon: <SpeedIcon />, text: "7 Days Commission Settlements" },
  { icon: <TrendingUpIcon />, text: "Faster Loan Approvals" },
  { icon: <SupportAgentIcon />, text: "Dedicated Support for DSAs" },
  { icon: <TrackChangesIcon />, text: "Real-Time Lead Tracking & Support" },
];

export default function DSA() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // State for Apply Now Modal (Original form)
  const [openApplyModal, setOpenApplyModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    age: "",
  });
  const [errors, setErrors] = useState({});

  // State for Become DSA Now Modal (New multi-step form)
  const [openBecomeModal, setOpenBecomeModal] = useState(false);

  // Admin Dashboard Modal state & customer role check
  const { getLocalStorage } = Utility();
  const customerInfo = getLocalStorage("customerInfo");
  const isAdmin = customerInfo?.role?.toLowerCase() === "admin";
  const [openDashboardModal, setOpenDashboardModal] = useState(false);

  const handleOpenModal = (e) => {
    if (e) e.preventDefault();
    setOpenApplyModal(true);
  };

  const handleCloseModal = () => {
    setOpenApplyModal(false);
    setFormData({ name: "", email: "", mobile: "", gender: "", age: "" });
    setErrors({});
  };

  const handleOpenBecomeModal = (e) => {
    if (e) e.preventDefault();
    setOpenBecomeModal(true);
  };

  const handleCloseBecomeModal = () => {
    setOpenBecomeModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) {
      tempErrors.name = "Name is required";
    } else if (!/^[a-zA-Z\s]{2,}$/.test(formData.name.trim())) {
      tempErrors.name = "Enter a valid name (at least 2 letters)";
    }

    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      tempErrors.email = "Enter a valid email address";
    }

    if (!formData.mobile.trim()) {
      tempErrors.mobile = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile.trim())) {
      tempErrors.mobile = "Enter a valid 10-digit mobile number";
    }

    if (!formData.gender) {
      tempErrors.gender = "Gender is required";
    }

    if (!formData.age) {
      tempErrors.age = "Age is required";
    } else {
      const ageNum = parseInt(formData.age, 10);
      if (isNaN(ageNum) || ageNum < 18 || ageNum > 100) {
        tempErrors.age = "Age must be between 18 and 100";
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fill in all the required fields correctly.");
      return;
    }

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        mobile: formData.mobile.trim(),
        gender: formData.gender,
        age: parseInt(formData.age, 10),
      };
      await postDsa(payload);
      toast.success("🎉 DSA Application Submitted Successfully!");
      handleCloseModal();
    } catch (error) {
      console.error("DSA submission error:", error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  const glassBg = isDark ? "rgba(30, 41, 59, 0.45)" : "#ffffff";

  const sectionCard = {
    background: glassBg,
    backdropFilter: "blur(14px)",
    borderRadius: "24px",
    border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(50,68,230,0.06)"}`,
    boxShadow: isDark
      ? "0 12px 32px rgba(0,0,0,0.22)"
      : "0 12px 32px rgba(50,68,230,0.02)",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      transform: "translateY(-6px)",
      boxShadow: isDark
        ? "0 22px 48px rgba(0,0,0,0.35)"
        : "0 22px 48px rgba(50,68,230,0.06)",
    },
  };

  return (
    <Box sx={{ minHeight: "100vh", pb: { xs: 8, md: 8, lg: 12 }, background: isDark ? "#0b0f19" : "#ffffff" }}>
      {/* HERO */}
      <Box
        sx={{
          minHeight: { xs: "unset", sm: "unset", md: "unset", lg: "calc(100vh - 70px)" },
          display: "flex",
          alignItems: "center",
          background: isDark
            ? "radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%), #0f172a"
            : "radial-gradient(circle at 80% 20%, rgba(50, 68, 230, 0.04) 0%, transparent 45%), radial-gradient(circle at 20% 80%, rgba(50, 68, 230, 0.03) 0%, transparent 45%), #ffffff",
          pt: { xs: 10, sm: 12, md: 14, lg: 10 },
          pb: { xs: 5, sm: 4, md: 5, lg: 12 },
          px: { xs: 2, sm: 4 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative Grid Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: isDark
              ? "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)"
              : "radial-gradient(rgba(50,68,230,0.05) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            opacity: 0.8,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Dashboard Button positioned directly below navbar Apply Now button */}
        {isAdmin && (
          <Box
            sx={{
              position: "absolute",
              top: { xs: 12, md: 16 },
              right: { xs: 16, sm: 24, md: 36, lg: 50 },
              zIndex: 10,
            }}
          >
            <Button
              variant="contained"
              startIcon={<DashboardIcon />}
              onClick={() => setOpenDashboardModal(true)}
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

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1, px: { xs: 2, sm: 4, md: 6 }, width: "100%" }}>

          <Grid container spacing={{ xs: 4, md: 5 }} alignItems="center">
            {/* Left side text column (60%) */}
            <Grid
              item
              xs={12}
              md={7.2}
              sx={{
                flexBasis: { md: "60%" },
                maxWidth: { md: "60%" },
              }}
            >
              <Chip
                label="DSA Partner Program"
                sx={{
                  mb: 1.5,
                  background: isDark ? "rgba(255,255,255,0.12)" : "rgba(50, 68, 230, 0.06)",
                  color: isDark ? "#fff" : "#3244e6",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  letterSpacing: 1,
                  backdropFilter: "blur(12px)",
                  border: isDark ? "1px solid rgba(255,255,255,0.22)" : "1px solid rgba(50, 68, 230, 0.15)",
                  boxShadow: isDark ? "0 4px 12px rgba(0,0,0,0.15)" : "0 4px 12px rgba(50, 68, 230, 0.05)",
                }}
              />
              <Typography
                variant="h1"
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 800,
                  fontSize: { xs: "2rem", sm: "2.6rem", md: "3.1rem", lg: "3.5rem" },
                  color: isDark ? "#fff" : "#0f172a",
                  lineHeight: 1.15,
                  mb: 1.5,
                }}
              >
                Your Unfair Advantage
                <br />
                <Box
                  component="span"
                  sx={{
                    background: isDark
                      ? "linear-gradient(90deg, #38bdf8 0%, #3b82f6 100%)"
                      : "linear-gradient(90deg, #3244e6 0%, #1d2ebd 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: 850,
                  }}
                >
                  to Become Financially Free
                </Box>
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: { xs: "0.95rem", md: "1.1rem" },
                  color: isDark ? "rgba(255,255,255,0.85)" : "#475569",
                  mb: 3,
                  maxWidth: 680,
                  lineHeight: 1.5,
                }}
              >
                A Platform for Unlimited Growth. Join our growing network of DSAs earning
                higher commissions with faster approvals and dedicated support.
              </Typography>
              <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="nowrap">
                <Button
                  variant="contained"
                  size="large"
                  component="a"
                  startIcon={<WhatsAppIcon sx={{ color: "#fff", fontSize: "1.2rem" }} />}
                  href="https://wa.me/918810600135"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    background: isDark
                      ? "linear-gradient(135deg, #38bdf8 0%, #3b82f6 100%)"
                      : "linear-gradient(135deg, #3244e6 0%, #1d2ebd 100%)",
                    color: "#fff",
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 700,
                    borderRadius: "50px",
                    px: isMobile ? 2 : 3.5,
                    py: isMobile ? 1.2 : 1.4,
                    fontSize: isMobile ? "0.85rem" : "0.98rem",
                    textTransform: "none",
                    whiteSpace: "nowrap",
                    flexShrink: 1,
                    minWidth: 0,
                    boxShadow: isDark
                      ? "0 10px 25px -5px rgba(59,130,246,0.4)"
                      : "0 10px 25px -5px rgba(50,68,230,0.3)",
                    "&:hover": {
                      background: isDark
                        ? "linear-gradient(135deg, #3b82f6 0%, #38bdf8 100%)"
                        : "linear-gradient(135deg, #1d2ebd 0%, #3244e6 100%)",
                      transform: "translateY(-3px)",
                      boxShadow: isDark
                        ? "0 15px 30px -5px rgba(59,130,246,0.5)"
                        : "0 15px 30px -5px rgba(50,68,230,0.4)",
                    },
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  {isMobile ? "+91 8810600135" : "WhatsApp Us: +91 8810600135"}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleOpenModal}
                  sx={{
                    color: isDark ? "#fff" : "#1e293b",
                    borderColor: isDark ? "rgba(255,255,255,0.45)" : "rgba(30, 41, 59, 0.45)",
                    borderWidth: "1px",
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    borderRadius: "50px",
                    px: isMobile ? 2 : 3.5,
                    py: isMobile ? 1.2 : 1.4,
                    fontSize: isMobile ? "0.85rem" : "0.98rem",
                    textTransform: "none",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    "&:hover": {
                      borderColor: isDark ? "#fff" : "#3244e6",
                      borderWidth: "1px",
                      background: isDark ? "rgba(255,255,255,0.12)" : "rgba(30, 41, 59, 0.05)",
                      transform: "translateY(-3px)",
                    },
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  Apply Now
                </Button>
              </Stack>
            </Grid>

            {/* Right side image column (40%) */}
            <Grid
              item
              xs={12}
              md={4.8}
              sx={{
                flexBasis: { md: "40%" },
                maxWidth: { md: "40%" },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: { xs: 5, md: 0 },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  maxWidth: { xs: 440, sm: 520, md: "100%" },
                  borderRadius: "28px",
                  overflow: "hidden",
                  boxShadow: isDark
                    ? "0 20px 40px rgba(0,0,0,0.4), 0 0 30px rgba(56, 189, 248, 0.15)"
                    : "0 20px 40px rgba(50, 68, 230, 0.12), 0 0 30px rgba(50, 68, 230, 0.08)",
                  border: isDark
                    ? "1px solid rgba(255,255,255,0.12)"
                    : "1px solid rgba(50, 68, 230, 0.1)",
                  transition: "transform 0.5s ease, box-shadow 0.5s ease",
                  "&:hover": {
                    transform: "translateY(-6px) scale(1.015)",
                    boxShadow: isDark
                      ? "0 28px 50px rgba(0,0,0,0.5), 0 0 40px rgba(56, 189, 248, 0.25)"
                      : "0 28px 50px rgba(50, 68, 230, 0.18), 0 0 40px rgba(50, 68, 230, 0.12)",
                  },
                }}
              >

                <Box
                  component="img"
                  src="/new/dsa221.webp"
                  alt="F2 DSA Partner Program"
                  sx={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* USP CARDS — CTA card on top, 3 feature cards below */}
      <Container maxWidth="xl" sx={{ mt: { xs: 6, md: 6, lg: -8 }, position: "relative", zIndex: 2 }}>

        {/* ── Row 1: Incubated-style CTA banner ── */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: { xs: 4, md: 5 }, mb: { xs: 4, md: 5 } }}>
          <Box
            onClick={handleOpenBecomeModal}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: { xs: 2, sm: 3 },
              px: { xs: 2.5, sm: 3.5, md: 4 },
              py: { xs: 1.2, sm: 1.4 },
              width: "fit-content",
              maxWidth: "100%",
              borderRadius: "100px",
              background: isDark
                ? "linear-gradient(135deg, #1e1b4b 0%, #3730a3 50%, #4338ca 100%)"
                : "linear-gradient(135deg, #1d2ebd 0%, #3244e6 60%, #4f46e5 100%)",
              boxShadow: isDark
                ? "0 16px 40px rgba(67,56,202,0.45), 0 4px 12px rgba(0,0,0,0.3)"
                : "0 16px 40px rgba(50,68,230,0.35), 0 4px 12px rgba(50,68,230,0.15)",
              cursor: "pointer",
              transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                transform: "translateY(-3px) scale(1.01)",
                boxShadow: isDark
                  ? "0 22px 50px rgba(67,56,202,0.55), 0 6px 16px rgba(0,0,0,0.35)"
                  : "0 22px 50px rgba(50,68,230,0.45), 0 6px 16px rgba(50,68,230,0.2)",
              },
            }}
          >
            {/* Left: icon + text */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.18)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <VerifiedIcon sx={{ fontSize: 22, color: "#fff" }} />
              </Box>
              <Typography
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.15rem" },
                  color: "#fff",
                  lineHeight: 1.3,
                  letterSpacing: "-0.01em",
                }}
              >
                Skip the Queue and become DSA partner.
              </Typography>
            </Box>

            {/* Right: Apply Now pill */}
            <Box
              sx={{
                flexShrink: 0,
                background: "#ffffff",
                borderRadius: "100px",
                px: { xs: 2.5, sm: 3 },
                py: { xs: 0.9, sm: 1.1 },
                boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
                transition: "all 0.25s ease",
                "&:hover": { background: "#f0f4ff" },
              }}
            >
              <Typography
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: { xs: "0.82rem", sm: "0.9rem" },
                  color: "#1d2ebd",
                  whiteSpace: "nowrap",
                }}
              >
                Apply Now
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* ── Row 2: 3 feature info cards ── */}
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                p: 3,
                height: "100%",
                borderRadius: "24px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                background: isDark ? "rgba(30, 41, 59, 0.9)" : "#ffffff",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(50,68,230,0.06)"}`,
                boxShadow: isDark
                  ? "0 12px 32px rgba(0,0,0,0.22)"
                  : "0 12px 32px rgba(50,68,230,0.02)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: isDark
                    ? "0 22px 48px rgba(0,0,0,0.35)"
                    : "0 22px 48px rgba(50,68,230,0.06)",
                  borderColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(50, 68, 230, 0.2)",
                }
              }}
            >
              <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    background: "rgba(50, 68, 230, 0.08)",
                    color: "#3244e6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 2.5
                  }}
                >
                  <AccountBalanceIcon sx={{ fontSize: 32 }} />
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, fontFamily: "'Poppins', sans-serif", color: isDark ? "#fff" : "#1e293b", fontSize: "1.2rem" }}>
                  40+ Lending Partners
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "'Poppins', sans-serif" }}>
                  Access a wide network of national banks and premium NBFCs to ensure higher approval rates.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                p: 3,
                height: "100%",
                borderRadius: "24px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                background: isDark ? "rgba(30, 41, 59, 0.9)" : "#ffffff",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(50,68,230,0.06)"}`,
                boxShadow: isDark
                  ? "0 12px 32px rgba(0,0,0,0.22)"
                  : "0 12px 32px rgba(50,68,230,0.02)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: isDark
                    ? "0 22px 48px rgba(0,0,0,0.35)"
                    : "0 22px 48px rgba(50,68,230,0.06)",
                  borderColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(50, 68, 230, 0.2)",
                }
              }}
            >
              <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    background: "rgba(56, 189, 248, 0.08)",
                    color: "#38bdf8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 2.5
                  }}
                >
                  <CurrencyRupeeIcon sx={{ fontSize: 32 }} />
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, fontFamily: "'Poppins', sans-serif", color: isDark ? "#fff" : "#1e293b", fontSize: "1.2rem" }}>
                  Highest Commission Payouts
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "'Poppins', sans-serif" }}>
                  Maximize your revenue with top-tier commission rates and transparent payout cycles.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                p: 3,
                height: "100%",
                borderRadius: "24px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                background: isDark ? "rgba(30, 41, 59, 0.9)" : "#ffffff",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(50,68,230,0.06)"}`,
                boxShadow: isDark
                  ? "0 12px 32px rgba(0,0,0,0.22)"
                  : "0 12px 32px rgba(50,68,230,0.02)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: isDark
                    ? "0 22px 48px rgba(0,0,0,0.35)"
                    : "0 22px 48px rgba(50,68,230,0.06)",
                  borderColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(50, 68, 230, 0.2)",
                }
              }}
            >
              <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    background: "rgba(16, 185, 129, 0.08)",
                    color: "#10b981",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 2.5
                  }}
                >
                  <SpeedIcon sx={{ fontSize: 32 }} />
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, fontFamily: "'Poppins', sans-serif", color: isDark ? "#fff" : "#1e293b", fontSize: "1.2rem" }}>
                  Instant Loan Approvals
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "'Poppins', sans-serif" }}>
                  Fast-track your client loans with streamlined digital processing and dedicated support.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="lg" sx={{ pt: { xs: 8, md: 10 } }}>
        {/* PROBLEMS vs SOLUTIONS */}
        <Box sx={{ mb: { xs: 10, md: 14 } }}>
          <Typography
            variant="h2"
            align="center"
            sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: { xs: "2rem", md: "2.8rem" }, mb: 2, color: isDark ? "#fff" : "#0f172a" }}
          >
            Problems DSAs Face -{" "}
            <Box component="span" sx={{ color: "#3244e6" }}>And How We Solve Them</Box>
          </Typography>
          <Typography
            align="center"
            sx={{ fontFamily: "'Poppins', sans-serif", color: "text.secondary", mb: 6, fontSize: "1.05rem", maxWidth: 600, mx: "auto" }}
          >
            F2 Fintech was built to eliminate every roadblock you face as a DSA.
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card sx={{
                ...sectionCard,
                height: "100%",
                background: isDark ? "rgba(30, 41, 59, 0.45)" : "#ffffff",
                border: `1px solid ${isDark ? "rgba(239, 68, 68, 0.2)" : "rgba(239, 68, 68, 0.08)"}`,
                boxShadow: isDark
                  ? "0 12px 32px rgba(239,68,68,0.05)"
                  : "0 12px 32px rgba(239,68,68,0.01)",
                "&:hover": {
                  ...sectionCard["&:hover"],
                  borderColor: "rgba(239, 68, 68, 0.25)",
                }
              }}>
                <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                  <Stack direction="row" alignItems="center" spacing={1.5} mb={4}>
                    <Box sx={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#ff4d4d,#ef4444)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 14px rgba(239, 68, 68, 0.4)" }}>
                      <HighlightOffIcon sx={{ color: "#fff", fontSize: 24 }} />
                    </Box>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "1.25rem", color: "#ef4444" }}>
                      Common DSA Problems
                    </Typography>
                  </Stack>
                  <Stack spacing={2}>
                    {problems.map((p, i) => (
                      <Box key={i} sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        py: 1.5,
                        px: 2.5,
                        borderRadius: "14px",
                        background: isDark ? "rgba(239,68,68,0.06)" : "rgba(239,68,68,0.02)",
                        border: `1px solid ${isDark ? "rgba(239,68,68,0.15)" : "rgba(239,68,68,0.06)"}`,
                        borderLeft: "4px solid #ef4444",
                        transition: "transform 0.2s ease, background-color 0.2s ease",
                        "&:hover": {
                          transform: "translateX(4px)",
                          background: isDark ? "rgba(239,68,68,0.1)" : "rgba(239,68,68,0.04)"
                        }
                      }}>
                        <HighlightOffIcon sx={{ color: "#ef4444", fontSize: 18, flexShrink: 0 }} />
                        <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.95rem", fontWeight: 500, color: isDark ? "rgba(255,255,255,0.9)" : "#475569" }}>{p}</Typography>
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{
                ...sectionCard,
                height: "100%",
                background: isDark ? "rgba(30, 41, 59, 0.45)" : "#ffffff",
                border: `1px solid ${isDark ? "rgba(16, 185, 129, 0.2)" : "rgba(16, 185, 129, 0.08)"}`,
                boxShadow: isDark
                  ? "0 12px 32px rgba(16, 185, 129, 0.05)"
                  : "0 12px 32px rgba(16, 185, 129, 0.01)",
                "&:hover": {
                  ...sectionCard["&:hover"],
                  borderColor: "rgba(16, 185, 129, 0.25)",
                }
              }}>
                <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                  <Stack direction="row" alignItems="center" spacing={1.5} mb={4}>
                    <Box sx={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#10b981,#059669)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 14px rgba(16, 185, 129, 0.4)" }}>
                      <CheckCircleOutlineIcon sx={{ color: "#fff", fontSize: 24 }} />
                    </Box>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "1.25rem", color: "#10b981" }}>
                      How F2 Fintech Solves Them
                    </Typography>
                  </Stack>
                  <Stack spacing={2}>
                    {solutions.map((s, i) => (
                      <Box key={i} sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        py: 1.5,
                        px: 2.5,
                        borderRadius: "14px",
                        background: isDark ? "rgba(16,185,129,0.06)" : "rgba(16,185,129,0.02)",
                        border: `1px solid ${isDark ? "rgba(16,185,129,0.15)" : "rgba(16,185,129,0.06)"}`,
                        borderLeft: "4px solid #10b981",
                        transition: "transform 0.2s ease, background-color 0.2s ease",
                        "&:hover": {
                          transform: "translateX(4px)",
                          background: isDark ? "rgba(16,185,129,0.1)" : "rgba(16,185,129,0.04)"
                        }
                      }}>
                        <CheckCircleOutlineIcon sx={{ color: "#10b981", fontSize: 18, flexShrink: 0 }} />
                        <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.95rem", fontWeight: 500, color: isDark ? "rgba(255,255,255,0.9)" : "#475569" }}>{s}</Typography>
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* STEPS */}
        <Box sx={{ mb: { xs: 10, md: 14 } }}>
          <Typography
            variant="h2"
            align="center"
            sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: { xs: "2rem", md: "2.8rem" }, mb: 2, color: isDark ? "#fff" : "#0f172a" }}
          >
            Steps to Become a{" "}
            <Box component="span" sx={{ color: "#3244e6" }}>DSA Partner</Box>
          </Typography>
          <Typography align="center" sx={{ fontFamily: "'Poppins', sans-serif", color: "text.secondary", mb: 6, fontSize: "1.05rem", maxWidth: 600, mx: "auto" }}>
            Get started in 4 simple steps and begin earning.
          </Typography>
          <Grid container spacing={4}>
            {steps.map((step, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Card sx={{
                  ...sectionCard,
                  height: "100%",
                  textAlign: "center",
                  p: 1.5,
                  position: "relative",
                  background: isDark ? "rgba(30, 41, 59, 0.45)" : "#ffffff",
                  "&:hover": {
                    ...sectionCard["&:hover"],
                    borderColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(50, 68, 230, 0.2)",
                  }
                }}>
                  <CardContent>
                    <Box sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      background: isDark
                        ? "linear-gradient(135deg, #3244e6, #10b981)"
                        : "linear-gradient(135deg, #3244e6 0%, #1d2ebd 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 3,
                      boxShadow: isDark ? "0 8px 20px rgba(50, 68, 230, 0.3)" : "0 8px 20px rgba(50, 68, 230, 0.15)",
                      border: "4px solid rgba(255,255,255,0.1)",
                    }}>
                      <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: "1.15rem", color: "#fff" }}>{step.number}</Typography>
                    </Box>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "1.1rem", mb: 1.5, color: isDark ? "#fff" : "#1e293b" }}>{step.title}</Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.9rem", color: "text.secondary", lineHeight: 1.65 }}>{step.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* BENEFITS */}
        <Box
          sx={{
            background: isDark
              ? "radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.12) 0%, transparent 60%), linear-gradient(135deg,#0f172a,#1e293b)"
              : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
            borderRadius: "32px",
            border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(50, 68, 230, 0.06)",
            py: { xs: 8, md: 10 },
            px: { xs: 3, md: 8 },
            mb: { xs: 6, md: 6 },
            position: "relative",
            overflow: "hidden",
            boxShadow: isDark
              ? "0 25px 60px rgba(0, 0, 0, 0.4)"
              : "0 20px 40px rgba(50, 68, 230, 0.02)",
          }}
        >
          {/* Subtle Ambient Shapes */}
          <Box
            sx={{
              position: "absolute",
              top: "-50px",
              right: "-50px",
              width: "250px",
              height: "250px",
              background: isDark ? "rgba(255,255,255,0.03)" : "rgba(50, 68, 230, 0.02)",
              borderRadius: "50%",
              pointerEvents: "none",
            }}
          />
          <Typography variant="h2" align="center" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: { xs: "1.8rem", md: "2.6rem" }, color: isDark ? "#fff" : "#0f172a", mb: 1.5 }}>
            Why Partner with F2 Fintech?
          </Typography>
          <Typography align="center" sx={{ fontFamily: "'Poppins', sans-serif", color: isDark ? "rgba(255,255,255,0.75)" : "#475569", mb: 6, fontSize: "1.05rem", maxWidth: 550, mx: "auto" }}>
            Everything you need to build a thriving loan referral business.
          </Typography>
          <Grid container spacing={3.5} justifyContent="center">
            {benefits.map((b, i) => (
              <Grid item xs={12} sm={6} md={4} key={i} sx={{ display: "flex" }}>
                <Box sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2.5,
                  width: "100%",
                  background: isDark ? "rgba(255, 255, 255, 0.08)" : "#ffffff",
                  border: isDark ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid rgba(50, 68, 230, 0.06)",
                  borderRadius: "20px",
                  py: 3,
                  px: 3.5,
                  backdropFilter: "blur(12px)",
                  boxShadow: isDark ? "0 8px 32px rgba(0, 0, 0, 0.15)" : "0 8px 32px rgba(50, 68, 230, 0.02)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    background: isDark ? "rgba(255, 255, 255, 0.15)" : "#ffffff",
                    transform: "translateY(-5px)",
                    boxShadow: isDark ? "0 15px 35px rgba(0, 0, 0, 0.25)" : "0 15px 35px rgba(50, 68, 230, 0.05)",
                    borderColor: isDark ? "rgba(255, 255, 255, 0.3)" : "rgba(50, 68, 230, 0.15)",
                  }
                }}>
                  <Box sx={{
                    color: isDark ? "#FFD700" : "#3244e6",
                    display: "flex",
                    p: 1.2,
                    borderRadius: "12px",
                    background: isDark ? "rgba(255,255,255,0.1)" : "rgba(50, 68, 230, 0.06)",
                    "& svg": { fontSize: 28 }
                  }}>{b.icon}</Box>
                  <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: isDark ? "#fff" : "#1e293b" }}>{b.text}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* CTA */}
        <Card sx={{
          ...sectionCard,
          textAlign: "center",
          py: { xs: 6, md: 8 },
          px: { xs: 3, md: 6 },
          mt: 4,
          background: isDark
            ? "radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 80%), rgba(30, 41, 59, 0.6)"
            : "linear-gradient(135deg, #f0f4ff 0%, #eef2ff 100%)",
          border: isDark
            ? "1px solid rgba(255, 255, 255, 0.12)"
            : "1px solid rgba(50, 68, 230, 0.18)",
          boxShadow: isDark
            ? "0 16px 40px rgba(0, 0, 0, 0.3)"
            : "0 16px 40px rgba(50, 68, 230, 0.08)",
        }}>
          <CardContent>
            <Typography variant="h3" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: { xs: "1.8rem", md: "2.4rem" }, mb: 2, color: isDark ? "#fff" : "#0f172a" }}>
              Ready to Start Earning?
            </Typography>
            <Typography sx={{ fontFamily: "'Poppins', sans-serif", color: "text.secondary", mb: 4, fontSize: "1.05rem", maxWidth: 550, mx: "auto", lineHeight: 1.6 }}>
              Join our growing network of DSA partners and unlock unlimited earning potential.
            </Typography>
            <Stack direction="row" spacing={1.5} justifyContent="center" alignItems="center" flexWrap="nowrap">
              <Button
                variant="contained"
                size="large"
                component="a"
                startIcon={<WhatsAppIcon sx={{ color: "#fff", fontSize: "1.2rem" }} />}
                href="https://wa.me/918810600135"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  background: isDark
                    ? "linear-gradient(135deg, #38bdf8 0%, #3b82f6 100%)"
                    : "linear-gradient(135deg, #3244e6 0%, #1d2ebd 100%)",
                  color: "#fff",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  borderRadius: "50px",
                  px: isMobile ? 2 : 5,
                  py: isMobile ? 1.2 : 1.8,
                  fontSize: isMobile ? "0.85rem" : "1.02rem",
                  textTransform: "none",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  flexShrink: 1,
                  minWidth: isMobile ? "160px" : 0,
                  boxShadow: isDark
                    ? "0 10px 25px -5px rgba(59,130,246,0.4)"
                    : "0 10px 25px -5px rgba(50,68,230,0.3)",
                  "&:hover": {
                    background: isDark
                      ? "linear-gradient(135deg, #3b82f6 0%, #38bdf8 100%)"
                      : "linear-gradient(135deg, #1d2ebd 0%, #3244e6 100%)",
                    transform: "translateY(-3px)",
                    boxShadow: isDark
                      ? "0 15px 30px -5px rgba(59,130,246,0.5)"
                      : "0 15px 30px -5px rgba(50,68,230,0.4)",
                  },
                  transition: "all 0.3s ease"
                }}
              >
                {isMobile ? "+91 8810600135" : "WhatsApp Us: +91 8810600135"}
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={handleOpenModal}
                sx={{
                  color: isDark ? "#fff" : "#1e293b",
                  borderColor: isDark ? "rgba(255,255,255,0.45)" : "rgba(30, 41, 59, 0.45)",
                  borderWidth: "1px",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  borderRadius: "50px",
                  px: isMobile ? 2 : 5,
                  py: isMobile ? 1.2 : 1.8,
                  fontSize: isMobile ? "0.85rem" : "1.02rem",
                  textTransform: "none",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  "&:hover": {
                    borderColor: isDark ? "#fff" : "#3244e6",
                    borderWidth: "1px",
                    background: isDark ? "rgba(255,255,255,0.12)" : "rgba(30, 41, 59, 0.05)",
                    transform: "translateY(-3px)"
                  },
                  transition: "all 0.3s ease"
                }}
              >
                Apply Now
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>

      {/* Apply Now Original Form Modal */}
      <Dialog
        open={openApplyModal}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: {
            background: isDark
              ? "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)"
              : "linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)",
            borderRadius: "24px",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(50,68,230,0.1)"}`,
            boxShadow: isDark
              ? "0 24px 48px rgba(0,0,0,0.45)"
              : "0 24px 48px rgba(50,68,230,0.12)",
            p: 3,
            position: "relative",
            overflow: "visible",
          }
        }}
      >
        <IconButton
          onClick={handleCloseModal}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)",
            background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
            "&:hover": {
              background: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
            }
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogTitle sx={{ p: 0, mb: 2, textAlign: "center" }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 800,
              fontSize: "1.45rem",
              background: isDark
                ? "linear-gradient(90deg, #38bdf8 0%, #3b82f6 100%)"
                : "linear-gradient(90deg, #1e3c72 0%, #2a5298 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Apply for DSA Partner
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              color: "text.secondary",
              fontWeight: 500,
              fontSize: "0.85rem",
              mt: 0.5,
            }}
          >
            Join our network of successful distributors
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ p: 0, overflow: "visible" }}>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2.2 }}>
            <TextField
              label="Name of Applicant"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              error={!!errors.name}
              helperText={errors.name}
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              placeholder="Enter full name"
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                "& .MuiFormHelperText-root": { color: `${theme.palette.error.main} !important` }
              }}
            />

            <TextField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              placeholder="name@example.com"
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                "& .MuiFormHelperText-root": { color: `${theme.palette.error.main} !important` }
              }}
            />

            <TextField
              label="Mobile Number"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              error={!!errors.mobile}
              helperText={errors.mobile}
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              placeholder="10-digit number"
              inputProps={{ maxLength: 10 }}
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                "& .MuiFormHelperText-root": { color: `${theme.palette.error.main} !important` }
              }}
            />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth error={!!errors.gender} variant="outlined">
                  <InputLabel id="gender-label" shrink>Gender</InputLabel>
                  <Select
                    labelId="gender-label"
                    label="Gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    displayEmpty
                    sx={{
                      borderRadius: "12px",
                    }}
                  >
                    <MenuItem value="" disabled>Select Gender</MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                  {errors.gender && (
                    <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5, color: `${theme.palette.error.main} !important` }}>
                      {errors.gender}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleInputChange}
                  error={!!errors.age}
                  helperText={errors.age}
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  placeholder="Min 18"
                  inputProps={{ min: 18, max: 100 }}
                  sx={{
                    "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                    "& .MuiFormHelperText-root": { color: `${theme.palette.error.main} !important` }
                  }}
                />
              </Grid>
            </Grid>

            <DialogActions sx={{ p: 0, mt: 1.5 }}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  background: isDark
                    ? "linear-gradient(135deg, #38bdf8, #3b82f6)"
                    : "linear-gradient(135deg, #3244e6, #1d2ebd)",
                  color: "#fff",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  py: 1.6,
                  borderRadius: "14px",
                  fontSize: "1rem",
                  textTransform: "none",
                  boxShadow: isDark
                    ? "0 8px 20px rgba(56, 189, 248, 0.25)"
                    : "0 8px 20px rgba(50, 68, 230, 0.2)",
                  "&:hover": {
                    background: isDark
                      ? "linear-gradient(135deg, #3b82f6, #38bdf8)"
                      : "linear-gradient(135deg, #1d2ebd, #3244e6)",
                    boxShadow: isDark
                      ? "0 12px 25px rgba(56, 189, 248, 0.35)"
                      : "0 12px 25px rgba(50, 68, 230, 0.3)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Submit Application
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Become DSA Now Multi-Step Form Modal */}
      <PartnerApplicationModal
        open={openBecomeModal}
        onClose={handleCloseBecomeModal}
        type="dsa"
        whatsappNumber="918810600135"
        onSubmitApi={postDsa}
      />

      {/* Admin Dashboard Modal for DSA Applications */}
      <AdminPartnerDashboardModal
        open={openDashboardModal}
        onClose={() => setOpenDashboardModal(false)}
        title="DSA Applications Dashboard"
        type="dsa"
        fetchDataApi={getDsas}
      />
    </Box>
  );
}
