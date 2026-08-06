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
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import VerifiedIcon from "@mui/icons-material/Verified";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { toast } from "react-toastify";
import { postRealtor, getRealtors } from "../../apis/RealtorAPI";
import PartnerApplicationModal from "../common/PartnerApplicationModal";
import AdminPartnerDashboardModal from "../common/AdminPartnerDashboardModal";
import { Utility } from "../utility";

const problems = [
  "Loan Rejections Affecting Deals",
  "Slow Loan Approvals",
  "Limited Financing Options",
  "Complex Documentation",
  "Poor Loan Coordination",
  "No Referral Income",
];

const solutions = [
  "Better Buyer-Lender Matching",
  "Faster Loan Approvals",
  "Access to 40+ Lenders",
  "Simplified Documentation",
  "Dedicated Loan Support",
  "Referral Income Opportunities",
];

const products = [
  {
    title: "1. Home Loan",
    desc: "Quick home loan solutions with rapid processing to help buyers secure properties seamlessly.",
    icon: <ApartmentIcon />,
  },
  {
    title: "2. LAP (Loan Against Property)",
    desc: "Unlock the value of property with loans designed for high capital requirements and lower interest rates.",
    icon: <AccountBalanceIcon />,
  },
  {
    title: "3. Unsecured Balance Payment Loan",
    desc: "Specialized unsecured loan for balance payment after a secured loan to bridge the transaction gap.",
    icon: <CurrencyRupeeIcon />,
  },
  {
    title: "4. Salaried & Personal Loans",
    desc: "Instant personal and salaried loan products designed to meet personal funding and short-term capital needs.",
    icon: <TrendingUpIcon />,
  },
];

const steps = [
  {
    number: "01",
    title: "Scan & Message us",
    description: "To become a Realtor either scan our website or text us on WhatsApp on the number - 8860600555",
  },
  {
    number: "02",
    title: "Submit VC Documents",
    description: "Provide essential onboarding documents: Aadhaar, PAN, Bank account details, and Company GST.",
  },
  {
    number: "03",
    title: "Onboarding & Training",
    description: "We will initialize the official onboarding and step-by-step training process for your team.",
  },
  {
    number: "04",
    title: "Refer & Earn",
    description: "Start referring client leads, bring the deals, and earn consistent revenue rewards.",
  },
];

const eligibility = [
  "RERA Approved Projects",
  "Autosized Colony Properties",
  "High Rise Buildings",
  "Approved Builder Projects",
  "Approved Map Properties",
];

const compliances = [
  "Delhi Medical Associates",
  "Seen on Shark Tank India Season 5",
  "G20 Panel Member",
  "NPCI Registered",
  "TRAI Compliant",
];

export default function Realtor() {
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
    companyGst: "",
  });
  const [errors, setErrors] = useState({});

  // State for Become Realtor Now Modal (New multi-step form)
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
    setFormData({ name: "", email: "", mobile: "", gender: "", age: "", companyGst: "" });
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
        company_gst: (formData.companyGst && formData.companyGst.trim()) || null,
        gender: formData.gender,
        age: parseInt(formData.age, 10),
      };
      await postRealtor(payload);
      toast.success("🎉 Realtor Application Submitted Successfully!");
      handleCloseModal();
    } catch (error) {
      console.error("Realtor submission error:", error);
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
      {/* HERO SECTION */}
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
                label="Realtor Partner Program"
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
                Empower Your Deals with
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
                  Instant Loan Solutions
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
                Never lose a client due to funding delays. Access 40+ lending partners with maximum commissions and fast-track approvals for your buyers.
              </Typography>
              <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="nowrap">
                <Button
                  variant="contained"
                  size="large"
                  component="a"
                  startIcon={<WhatsAppIcon sx={{ color: "#fff", fontSize: isMobile ? "1.2rem" : "1.2rem" }} />}
                  href="https://wa.me/918860600555"
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
                  {isMobile ? "+91 8860600555" : "WhatsApp Us: +91 8860600555"}
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
                  src="/new/realtor13.webp"
                  alt="F2 Realtor Partnership Program"
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
                Skip the Queue and become realtor partner.
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
                  Access a wide network of national banks and premium NBFCs to ensure higher approval rates for property buyers.
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
                  Earn Referral Payouts
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "'Poppins', sans-serif" }}>
                  Boost your real estate revenue with competitive referral commissions on every successful loan disbursement.
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
                  Fast-Track Closings
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "'Poppins', sans-serif" }}>
                  Accelerate property registration by cutting loan sanction timelines with dedicated loan manager support.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* PROBLEMS vs SOLUTIONS SECTION */}
      <Container maxWidth="lg" sx={{ pt: { xs: 8, md: 10 } }}>
        <Box sx={{ mb: { xs: 10, md: 12 } }}>
          <Typography
            variant="h2"
            align="center"
            sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: { xs: "2rem", md: "2.8rem" }, mb: 2, color: isDark ? "#fff" : "#0f172a" }}
          >
            Problems Realtors Face -{" "}
            <Box component="span" sx={{ color: "#3244e6" }}>And How We Solve Them</Box>
          </Typography>
          <Typography
            align="center"
            sx={{ fontFamily: "'Poppins', sans-serif", color: "text.secondary", mb: 6, fontSize: "1.05rem", maxWidth: 600, mx: "auto" }}
          >
            Say goodbye to deal cancellations and coordination bottlenecks.
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
                    <Box sx={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#ff4d4d,#ef4444)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <HighlightOffIcon sx={{ color: "#fff", fontSize: 24 }} />
                    </Box>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "1.25rem", color: "#ef4444" }}>
                      The Bottlenecks
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
                        transition: "transform 0.2s ease",
                        "&:hover": { transform: "translateX(4px)" }
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
                  ? "0 12px 32px rgba(16,185,129,0.05)"
                  : "0 12px 32px rgba(16,185,129,0.01)",
                "&:hover": {
                  ...sectionCard["&:hover"],
                  borderColor: "rgba(16, 185, 129, 0.25)",
                }
              }}>
                <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                  <Stack direction="row" alignItems="center" spacing={1.5} mb={4}>
                    <Box sx={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#10b981,#059669)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <CheckCircleOutlineIcon sx={{ color: "#fff", fontSize: 24 }} />
                    </Box>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "1.25rem", color: "#10b981" }}>
                      The F2 Advantage
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
                        transition: "transform 0.2s ease",
                        "&:hover": { transform: "translateX(4px)" }
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

        {/* PRODUCTS SECTION */}
        <Box sx={{ mb: { xs: 10, md: 12 } }}>
          <Typography
            variant="h2"
            align="center"
            sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: { xs: "2rem", md: "2.8rem" }, mb: 2, color: isDark ? "#fff" : "#0f172a" }}
          >
            F2 Realtor <Box component="span" sx={{ color: "#3244e6" }}>Product Suite</Box>
          </Typography>
          <Typography align="center" sx={{ fontFamily: "'Poppins', sans-serif", color: "text.secondary", mb: 6, fontSize: "1.05rem", maxWidth: 600, mx: "auto" }}>
            Diverse loan offerings customized to boost your buyer closing rate.
          </Typography>
          <Grid container spacing={3}>
            {products.map((prod, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Card sx={{
                  ...sectionCard,
                  height: "100%",
                  p: 1.5,
                  textAlign: "center",
                  background: isDark ? "rgba(30, 41, 59, 0.45)" : "#ffffff",
                  "&:hover": {
                    ...sectionCard["&:hover"],
                    borderColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(50, 68, 230, 0.2)",
                  }
                }}>
                  <CardContent>
                    <Box sx={{
                      width: 56,
                      height: 56,
                      borderRadius: "16px",
                      background: isDark ? "rgba(56, 189, 248, 0.1)" : "rgba(50, 68, 230, 0.08)",
                      color: isDark ? "#38bdf8" : "#3244e6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 2.5,
                      "& svg": { fontSize: 28 }
                    }}>
                      {prod.icon}
                    </Box>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "1.1rem", mb: 1, color: isDark ? "#fff" : "#1e293b" }}>{prod.title}</Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.88rem", color: "text.secondary", lineHeight: 1.6 }}>{prod.desc}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* STEPS SECTION */}
        <Box sx={{ mb: { xs: 10, md: 12 } }}>
          <Typography
            variant="h2"
            align="center"
            sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: { xs: "2rem", md: "2.8rem" }, mb: 2, color: isDark ? "#fff" : "#0f172a" }}
          >
            4 Steps to Join <Box component="span" sx={{ color: "#3244e6" }}>F2 Realtor Network</Box>
          </Typography>
          <Typography align="center" sx={{ fontFamily: "'Poppins', sans-serif", color: "text.secondary", mb: 6, fontSize: "1.05rem", maxWidth: 600, mx: "auto" }}>
            Quick, seamless onboarding to start expanding your earning potential.
          </Typography>
          <Grid container spacing={3}>
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

        {/* ELIGIBILITY & COMPLIANCE GRID */}
        <Grid container spacing={4} sx={{ mb: { xs: 10, md: 12 } }}>
          <Grid item xs={12} md={6}>
            <Card sx={{
              ...sectionCard,
              height: "100%",
              p: { xs: 3, md: 4 },
              background: isDark ? "rgba(30, 41, 59, 0.45)" : "#ffffff",
              "&:hover": {
                ...sectionCard["&:hover"],
                borderColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(50, 68, 230, 0.2)",
              }
            }}>
              <CardContent>
                <Typography variant="h3" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: "1.45rem", mb: 1.5, color: isDark ? "#fff" : "#0f172a" }}>
                  Project Eligibility Criteria
                </Typography>
                <Typography sx={{ fontFamily: "'Poppins', sans-serif", color: "text.secondary", fontSize: "0.9rem", mb: 3 }}>
                  We support a comprehensive array of property classifications for swift funding.
                </Typography>
                <Stack spacing={1.5}>
                  {eligibility.map((item, i) => (
                    <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Box sx={{ width: 24, height: 24, borderRadius: "50%", background: isDark ? "rgba(16, 185, 129, 0.2)" : "rgba(16, 185, 129, 0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <CheckIcon sx={{ color: "#10b981", fontSize: 16 }} />
                      </Box>
                      <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "0.95rem", color: isDark ? "#e2e8f0" : "#334155" }}>
                        {item}
                      </Typography>
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
              p: { xs: 3, md: 4 },
              background: isDark ? "rgba(30, 41, 59, 0.45)" : "#ffffff",
              "&:hover": {
                ...sectionCard["&:hover"],
                borderColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(50, 68, 230, 0.2)",
              }
            }}>
              <CardContent>
                <Typography variant="h3" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: "1.45rem", mb: 1.5, color: isDark ? "#fff" : "#0f172a" }}>
                  Institutional Trust & Recognition
                </Typography>
                <Typography sx={{ fontFamily: "'Poppins', sans-serif", color: "text.secondary", fontSize: "0.9rem", mb: 3 }}>
                  Supported by prestigious industry bodies, regulatory frameworks, and national platforms.
                </Typography>
                <Grid container spacing={1.5}>
                  {compliances.map((comp, i) => {
                    const isLastOdd = compliances.length % 2 !== 0 && i === compliances.length - 1;
                    return (
                      <Grid
                        item
                        xs={12}
                        sm={isLastOdd ? 12 : 6}
                        key={i}
                        sx={{
                          ...(isLastOdd ? { display: "flex", justifyContent: "center" } : {}),
                        }}
                      >
                        <Box sx={{
                          p: 2,
                          borderRadius: "14px",
                          border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
                          background: isDark ? "rgba(255,255,255,0.02)" : "#fff",
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          ...(isLastOdd ? { width: { xs: "100%", sm: "calc(50% - 8px)" } } : {}),
                        }}>
                          <VerifiedIcon sx={{ color: "#3244e6", fontSize: 20 }} />
                          <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: isDark ? "#cbd5e1" : "#1e293b" }}>
                            {comp}
                          </Typography>
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* CTA CARD */}
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
              Ready to Accelerate Your Deals?
            </Typography>
            <Typography sx={{ fontFamily: "'Poppins', sans-serif", color: "text.secondary", mb: 4, fontSize: "1.05rem", maxWidth: 550, mx: "auto", lineHeight: 1.6 }}>
              Onboard today as an F2 Realtor Partner and offer your buyers the best-in-market financing.
            </Typography>
            <Stack direction="row" spacing={1.5} justifyContent="center" alignItems="center" flexWrap="nowrap">
              <Button
                variant="contained"
                size="large"
                component="a"
                startIcon={<WhatsAppIcon sx={{ color: "#fff", fontSize: "1.2rem" }} />}
                href="https://wa.me/918860600555"
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
                {isMobile ? "+91 8860600555" : "WhatsApp Us: +91 8860600555"}
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
            "&:hover": { background: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)" }
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
            Apply for Realtor Partner
          </Typography>
          <Typography variant="subtitle2" sx={{ fontFamily: "'Poppins', sans-serif", color: "text.secondary", fontWeight: 500, fontSize: "0.85rem", mt: 0.5 }}>
            Join our growing network of successful realtors
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

            <TextField
              label="Company GST Number (Optional)"
              name="companyGst"
              value={formData.companyGst}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              placeholder="Enter company GST"
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: "12px" }
              }}
            />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth error={!!errors.gender} variant="outlined">
                  <InputLabel id="realtor-gender-label" shrink>Gender</InputLabel>
                  <Select
                    labelId="realtor-gender-label"
                    label="Gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    displayEmpty
                    sx={{ borderRadius: "12px" }}
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
                  "&:hover": {
                    background: isDark
                      ? "linear-gradient(135deg, #3b82f6, #38bdf8)"
                      : "linear-gradient(135deg, #1d2ebd, #3244e6)",
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

      {/* Become Realtor Now Multi-Step Form Modal */}
      <PartnerApplicationModal
        open={openBecomeModal}
        onClose={handleCloseBecomeModal}
        type="realtor"
        whatsappNumber="918860600555"
        onSubmitApi={postRealtor}
      />

      {/* Admin Dashboard Modal for Realtor Applications */}
      <AdminPartnerDashboardModal
        open={openDashboardModal}
        onClose={() => setOpenDashboardModal(false)}
        title="Realtor Applications Dashboard"
        type="realtor"
        fetchDataApi={getRealtors}
      />
    </Box>
  );
}
