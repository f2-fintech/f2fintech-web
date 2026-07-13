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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SpeedIcon from "@mui/icons-material/Speed";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CloseIcon from "@mui/icons-material/Close";
import VerifiedIcon from "@mui/icons-material/Verified";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CheckIcon from "@mui/icons-material/Check";
import { toast } from "react-toastify";
import { postRealtor } from "../../apis/RealtorAPI";

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
  "G20 Panel Member",
  "NPCI Registered",
  "TRAI Compliant",
  "Seen on Shark Tank India Season 5",
];

export default function Realtor() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  // State for Apply Now Modal
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

  const handleOpenModal = (e) => {
    if (e) e.preventDefault();
    setOpenApplyModal(true);
  };

  const handleCloseModal = () => {
    setOpenApplyModal(false);
    setFormData({ name: "", email: "", mobile: "", gender: "", age: "", companyGst: "" });
    setErrors({});
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
        company_gst: formData.companyGst.trim() || null,
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

  const glassBg = isDark ? "rgba(30, 41, 59, 0.45)" : "rgba(255, 255, 255, 0.82)";

  const sectionCard = {
    background: glassBg,
    backdropFilter: "blur(14px)",
    borderRadius: "24px",
    border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(50,68,230,0.09)"}`,
    boxShadow: isDark
      ? "0 12px 32px rgba(0,0,0,0.22)"
      : "0 12px 32px rgba(50,68,230,0.04)",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      transform: "translateY(-6px)",
      boxShadow: isDark
        ? "0 22px 48px rgba(0,0,0,0.35)"
        : "0 22px 48px rgba(50,68,230,0.08)",
    },
  };

  return (
    <Box sx={{ minHeight: "100vh", pb: { xs: 8, md: 12 }, background: isDark ? "#0b0f19" : "#f8fafc" }}>
      {/* HERO SECTION */}
      <Box
        sx={{
          background: isDark
            ? "radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%), #0f172a"
            : "radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 40%), radial-gradient(circle at 20% 80%, rgba(56, 189, 248, 0.18) 0%, transparent 50%), linear-gradient(135deg, #2c3ce3 0%, #1d2ebd 100%)",
          pt: { xs: 14, md: 8 },
          pb: { xs: 10, md: 14 },
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
            backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            opacity: 0.8,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Chip
            label="Realtor Partner Program"
            sx={{
              mb: 3,
              background: "rgba(255,255,255,0.12)",
              color: "#fff",
              fontFamily: "'Verdana', sans-serif",
              fontWeight: 600,
              letterSpacing: 1,
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.22)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          />
          <Typography
            variant="h1"
            sx={{
              fontFamily: "'Verdana', sans-serif",
              fontWeight: 800,
              fontSize: { xs: "2.4rem", md: "3.8rem", lg: "4.2rem" },
              color: "#fff",
              lineHeight: 1.15,
              mb: 2.5,
            }}
          >
            Empower Your Deals with
            <br />
            <Box
              component="span"
              sx={{
                background: "linear-gradient(90deg, #38bdf8 0%, #3b82f6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 850,
              }}
            >
              F2 Realtor Partnership
            </Box>
          </Typography>
          <Typography
            sx={{
              fontFamily: "'Verdana', sans-serif",
              fontSize: { xs: "1.05rem", md: "1.25rem" },
              color: "rgba(255,255,255,0.85)",
              mb: 5,
              maxWidth: 650,
              lineHeight: 1.6,
            }}
          >
            Accelerate real estate transaction closures. Gain access to 40+ lending partners,
            rapid loan processing, and highly attractive referral income.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2.5}>
            <Button
              variant="contained"
              size="large"
              startIcon={<WhatsAppIcon />}
              href="https://wa.me/918860600555"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                background: "linear-gradient(135deg,#25D366,#128C7E)",
                color: "#fff",
                fontFamily: "'Verdana', sans-serif",
                fontWeight: 700,
                borderRadius: "50px",
                px: 4.5,
                py: 1.8,
                fontSize: "1.02rem",
                textTransform: "none",
                boxShadow: "0 10px 25px -5px rgba(37,211,102,0.45)",
                "&:hover": {
                  background: "linear-gradient(135deg,#128C7E,#25D366)",
                  transform: "translateY(-3px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              WhatsApp Us: +91 8860600555
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={handleOpenModal}
              sx={{
                color: "#fff",
                borderColor: "rgba(255,255,255,0.45)",
                borderWidth: "2px",
                fontFamily: "'Verdana', sans-serif",
                fontWeight: 600,
                borderRadius: "50px",
                px: 4.5,
                py: 1.8,
                fontSize: "1.02rem",
                textTransform: "none",
                "&:hover": {
                  borderColor: "#fff",
                  borderWidth: "2px",
                  background: "rgba(255,255,255,0.12)",
                  transform: "translateY(-3px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Apply Now
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* 3 PREMIUM USP CARDS */}
      <Container maxWidth="lg" sx={{ mt: -8, position: "relative", zIndex: 2 }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                p: 3,
                height: "100%",
                borderRadius: "20px",
                textAlign: "center",
                background: isDark ? "rgba(30, 41, 59, 0.9)" : "#fff",
                border: "1px solid rgba(50, 68, 230, 0.15)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                transition: "transform 0.3s",
                "&:hover": { transform: "translateY(-5px)" }
              }}
            >
              <CardContent>
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
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, fontFamily: "'Verdana', sans-serif" }}>
                  40+ Lending Partners
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "'Verdana', sans-serif" }}>
                  Access a wide network of national banks and premium NBFCs to ensure higher approval rates.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                p: 3,
                height: "100%",
                borderRadius: "20px",
                textAlign: "center",
                background: isDark ? "rgba(30, 41, 59, 0.9)" : "#fff",
                border: "1px solid rgba(50, 68, 230, 0.15)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                transition: "transform 0.3s",
                "&:hover": { transform: "translateY(-5px)" }
              }}
            >
              <CardContent>
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
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, fontFamily: "'Verdana', sans-serif" }}>
                  Referral Income Opportunities
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "'Verdana', sans-serif" }}>
                  Maximize your revenue by earning lucrative commissions on every successful loan disbursement.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                p: 3,
                height: "100%",
                borderRadius: "20px",
                textAlign: "center",
                background: isDark ? "rgba(30, 41, 59, 0.9)" : "#fff",
                border: "1px solid rgba(50, 68, 230, 0.15)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                transition: "transform 0.3s",
                "&:hover": { transform: "translateY(-5px)" }
              }}
            >
              <CardContent>
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
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, fontFamily: "'Verdana', sans-serif" }}>
                  Home Loan Under 24 Hours
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "'Verdana', sans-serif" }}>
                  Fast-track your buyers{"'"} loans with approvals delivered in under 24 hours.
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
            sx={{ fontFamily: "'Verdana', sans-serif", fontWeight: 800, fontSize: { xs: "2rem", md: "2.8rem" }, mb: 2, color: isDark ? "#fff" : "#0f172a" }}
          >
            Problems Realtors Face -{" "}
            <Box component="span" sx={{ color: "#3244e6" }}>And How We Solve Them</Box>
          </Typography>
          <Typography
            align="center"
            sx={{ fontFamily: "'Verdana', sans-serif", color: "text.secondary", mb: 6, fontSize: "1.05rem", maxWidth: 600, mx: "auto" }}
          >
            Say goodbye to deal cancellations and coordination bottlenecks.
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card sx={{
                ...sectionCard,
                height: "100%",
                border: `1px solid ${isDark ? "rgba(239, 68, 68, 0.2)" : "rgba(239, 68, 68, 0.15)"}`,
                boxShadow: "0 10px 25px rgba(239,68,68,0.02)",
                "&:hover": {
                  ...sectionCard["&:hover"],
                  borderColor: "rgba(239, 68, 68, 0.4)",
                }
              }}>
                <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                  <Stack direction="row" alignItems="center" spacing={1.5} mb={4}>
                    <Box sx={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#ff4d4d,#ef4444)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <HighlightOffIcon sx={{ color: "#fff", fontSize: 24 }} />
                    </Box>
                    <Typography sx={{ fontFamily: "'Verdana', sans-serif", fontWeight: 700, fontSize: "1.25rem", color: "#ef4444" }}>
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
                        <Typography sx={{ fontFamily: "'Verdana', sans-serif", fontSize: "0.95rem", fontWeight: 500, color: isDark ? "rgba(255,255,255,0.9)" : "#475569" }}>{p}</Typography>
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
                border: `1px solid ${isDark ? "rgba(16, 185, 129, 0.2)" : "rgba(16, 185, 129, 0.15)"}`,
                boxShadow: "0 10px 25px rgba(16,185,129,0.02)",
                "&:hover": {
                  ...sectionCard["&:hover"],
                  borderColor: "rgba(16, 185, 129, 0.4)",
                }
              }}>
                <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                  <Stack direction="row" alignItems="center" spacing={1.5} mb={4}>
                    <Box sx={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#10b981,#059669)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <CheckCircleOutlineIcon sx={{ color: "#fff", fontSize: 24 }} />
                    </Box>
                    <Typography sx={{ fontFamily: "'Verdana', sans-serif", fontWeight: 700, fontSize: "1.25rem", color: "#10b981" }}>
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
                        <Typography sx={{ fontFamily: "'Verdana', sans-serif", fontSize: "0.95rem", fontWeight: 500, color: isDark ? "rgba(255,255,255,0.9)" : "#475569" }}>{s}</Typography>
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* LOAN PRODUCTS SECTION */}
        <Box sx={{ mb: { xs: 10, md: 14 } }}>
          <Typography
            variant="h2"
            align="center"
            sx={{ fontFamily: "'Verdana', sans-serif", fontWeight: 800, fontSize: { xs: "2rem", md: "2.8rem" }, mb: 2, color: isDark ? "#fff" : "#0f172a" }}
          >
            Our Real Estate{" "}
            <Box component="span" sx={{ color: "#3244e6" }}>Financial Products</Box>
          </Typography>
          <Typography
            align="center"
            sx={{ fontFamily: "'Verdana', sans-serif", color: "text.secondary", mb: 6, fontSize: "1.05rem", maxWidth: 600, mx: "auto" }}
          >
            Flexible products tailored to meet all buyers{"'"} and developers{"'"} funding requirements.
          </Typography>
          <Grid container spacing={3}>
            {products.map((product, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Card sx={{
                  ...sectionCard,
                  height: "100%",
                  "&:hover": {
                    ...sectionCard["&:hover"],
                    borderColor: "rgba(50, 68, 230, 0.3)",
                  }
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{
                      width: 50,
                      height: 50,
                      borderRadius: "12px",
                      background: isDark ? "rgba(50, 68, 230, 0.15)" : "rgba(50, 68, 230, 0.08)",
                      color: "#3244e6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2.5,
                      "& svg": { fontSize: 28 }
                    }}>
                      {product.icon}
                    </Box>
                    <Typography sx={{ fontFamily: "'Verdana', sans-serif", fontWeight: 700, fontSize: "1.1rem", mb: 1.5, color: isDark ? "#fff" : "#1e293b" }}>
                      {product.title}
                    </Typography>
                    <Typography sx={{ fontFamily: "'Verdana', sans-serif", fontSize: "0.9rem", color: "text.secondary", lineHeight: 1.6 }}>
                      {product.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* TIMELINE STEPS SECTION */}
        <Box sx={{ mb: { xs: 10, md: 14 } }}>
          <Typography
            variant="h2"
            align="center"
            sx={{ fontFamily: "'Verdana', sans-serif", fontWeight: 800, fontSize: { xs: "2rem", md: "2.8rem" }, mb: 2, color: isDark ? "#fff" : "#0f172a" }}
          >
            Steps to Become a{" "}
            <Box component="span" sx={{ color: "#3244e6" }}>Realtor Partner</Box>
          </Typography>
          <Typography align="center" sx={{ fontFamily: "'Verdana', sans-serif", color: "text.secondary", mb: 6, fontSize: "1.05rem", maxWidth: 600, mx: "auto" }}>
            Get started rapidly in 4 simple steps.
          </Typography>
          <Grid container spacing={4}>
            {steps.map((step, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Card sx={{
                  ...sectionCard,
                  height: "100%",
                  textAlign: "center",
                  p: 1.5,
                  "&:hover": {
                    ...sectionCard["&:hover"],
                    borderColor: "rgba(50, 68, 230, 0.3)",
                  }
                }}>
                  <CardContent>
                    <Box sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #3244e6, #10b981)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 3,
                      boxShadow: "0 8px 20px rgba(50, 68, 230, 0.3)",
                      border: "4px solid rgba(255,255,255,0.1)",
                    }}>
                      <Typography sx={{ fontFamily: "'Verdana', sans-serif", fontWeight: 800, fontSize: "1.15rem", color: "#fff" }}>
                        {step.number}
                      </Typography>
                    </Box>
                    <Typography sx={{ fontFamily: "'Verdana', sans-serif", fontWeight: 700, fontSize: "1.1rem", mb: 1.5, color: isDark ? "#fff" : "#1e293b" }}>
                      {step.title}
                    </Typography>
                    <Typography sx={{ fontFamily: "'Verdana', sans-serif", fontSize: "0.9rem", color: "text.secondary", lineHeight: 1.65 }}>
                      {step.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* PROJECT ELIGIBILITY SECTION */}
        <Grid container spacing={4} sx={{ mb: { xs: 10, md: 14 } }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: { xs: 2, md: 4 } }}>
              <Typography variant="h3" sx={{ fontFamily: "'Verdana', sans-serif", fontWeight: 800, fontSize: { xs: "1.8rem", md: "2.4rem" }, mb: 3, color: isDark ? "#fff" : "#0f172a" }}>
                Eligibility of Projects We Fund
              </Typography>
              <Typography sx={{ fontFamily: "'Verdana', sans-serif", color: "text.secondary", mb: 4, lineHeight: 1.6 }}>
                We coordinate and process financing for residential and commercial developments complying with major regulatory criteria.
              </Typography>
              <Stack spacing={2}>
                {eligibility.map((el, idx) => (
                  <Box key={idx} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box sx={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: isDark ? "rgba(56, 189, 248, 0.15)" : "rgba(50, 68, 230, 0.08)",
                      color: isDark ? "#38bdf8" : "#3244e6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    }}>
                      <CheckIcon sx={{ fontSize: 16 }} />
                    </Box>
                    <Typography sx={{ fontFamily: "'Verdana', sans-serif", fontWeight: 600, color: isDark ? "rgba(255,255,255,0.9)" : "#334155" }}>
                      {el}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Grid>

          {/* COMPLIANCE & SAFETY BADGES */}
          <Grid item xs={12} md={6}>
            <Card sx={{
              ...sectionCard,
              p: { xs: 3, md: 5 },
              height: "100%",
              background: isDark ? "rgba(30, 41, 59, 0.3)" : "rgba(255, 255, 255, 0.7)",
            }}>
              <CardContent>
                <Typography variant="h3" sx={{ fontFamily: "'Verdana', sans-serif", fontWeight: 800, fontSize: { xs: "1.8rem", md: "2.2rem" }, mb: 1.5, color: isDark ? "#fff" : "#0f172a" }}>
                  Compliance & Safety
                </Typography>
                <Typography sx={{ fontFamily: "'Verdana', sans-serif", color: "text.secondary", mb: 4, fontSize: "0.95rem" }}>
                  Backed by robust regulatory frameworks and industry partnerships.
                </Typography>
                <Grid container spacing={2}>
                  {compliances.map((comp, idx) => (
                    <Grid item xs={12} sm={6} key={idx}>
                      <Box sx={{
                        p: 2,
                        borderRadius: "14px",
                        border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
                        background: isDark ? "rgba(255,255,255,0.02)" : "#fff",
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5
                      }}>
                        <VerifiedIcon sx={{ color: "#3244e6", fontSize: 20 }} />
                        <Typography sx={{ fontFamily: "'Verdana', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: isDark ? "#cbd5e1" : "#1e293b" }}>
                          {comp}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
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
            ? "radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 80%), rgba(30, 41, 59, 0.3)"
            : "radial-gradient(circle at 50% 50%, rgba(50, 68, 230, 0.05) 0%, transparent 80%), rgba(255, 255, 255, 0.9)",
        }}>
          <CardContent>
            <Typography variant="h3" sx={{ fontFamily: "'Verdana', sans-serif", fontWeight: 800, fontSize: { xs: "1.8rem", md: "2.4rem" }, mb: 2, color: isDark ? "#fff" : "#0f172a" }}>
              Ready to Accelerate Your Deals?
            </Typography>
            <Typography sx={{ fontFamily: "'Verdana', sans-serif", color: "text.secondary", mb: 4, fontSize: "1.05rem", maxWidth: 550, mx: "auto", lineHeight: 1.6 }}>
              Onboard today as an F2 Realtor Partner and offer your buyers the best-in-market financing.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2.5} justifyContent="center" alignItems="center">
              <Button
                variant="contained"
                size="large"
                startIcon={<WhatsAppIcon />}
                href="https://wa.me/918860600555"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  background: "linear-gradient(135deg,#25D366,#128C7E)",
                  color: "#fff",
                  fontFamily: "'Verdana', sans-serif",
                  fontWeight: 700,
                  borderRadius: "50px",
                  px: 5,
                  py: 1.8,
                  fontSize: "1.02rem",
                  textTransform: "none",
                  boxShadow: "0 10px 25px -5px rgba(37,211,102,0.4)",
                  "&:hover": {
                    background: "linear-gradient(135deg,#128C7E,#25D366)",
                    transform: "translateY(-3px)",
                  },
                  transition: "all 0.3s ease"
                }}
              >
                WhatsApp Us: +91 8860600555
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={handleOpenModal}
                sx={{
                  color: isDark ? "#38bdf8" : "#3244e6",
                  borderColor: isDark ? "#38bdf8" : "#3244e6",
                  borderWidth: "2px",
                  fontFamily: "'Verdana', sans-serif",
                  fontWeight: 700,
                  borderRadius: "50px",
                  px: 5,
                  py: 1.8,
                  fontSize: "1.02rem",
                  textTransform: "none",
                  "&:hover": {
                    borderWidth: "2px",
                    borderColor: isDark ? "#38bdf8" : "#3244e6",
                    background: isDark ? "rgba(56, 189, 248, 0.1)" : "rgba(50, 68, 230, 0.08)",
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

      {/* APPLY NOW MODAL DIALOG */}
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
            boxShadow: "0 24px 48px rgba(0,0,0,0.45)",
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
              fontFamily: "'Verdana', sans-serif",
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
          <Typography variant="subtitle2" sx={{ fontFamily: "'Verdana', sans-serif", color: "text.secondary", fontWeight: 500, fontSize: "0.85rem", mt: 0.5 }}>
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
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
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
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
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
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
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
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
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
                    <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
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
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
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
                  fontFamily: "'Verdana', sans-serif",
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
    </Box>
  );
}
