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
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { postDsa } from "../../apis/DsaAPI";

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

  // State for Apply Now Modal
  const [openApplyModal, setOpenApplyModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    age: "",
  });
  const [errors, setErrors] = useState({});

  const handleOpenModal = (e) => {
    if (e) e.preventDefault();
    setOpenApplyModal(true);
  };

  const handleCloseModal = () => {
    setOpenApplyModal(false);
    setFormData({ name: "", email: "", mobile: "", gender: "", age: "" });
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

  const glassBg = isDark
    ? "rgba(30, 41, 59, 0.45)"
    : "rgba(255, 255, 255, 0.82)";

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
      {/* HERO */}
      <Box
        sx={{
          background: isDark
            ? "radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%), #0f172a"
            : "radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 40%), radial-gradient(circle at 20% 80%, rgba(56, 189, 248, 0.18) 0%, transparent 50%), linear-gradient(135deg, #2c3ce3 0%, #1d2ebd 100%)",
          pt: { xs: 12, md: 8 },
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

        {/* Ambient Glows */}
        <Box
          sx={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "450px",
            height: "450px",
            background: "rgba(255,255,255,0.06)",
            borderRadius: "50%",
            filter: "blur(40px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "-60px",
            left: "-60px",
            width: "350px",
            height: "350px",
            background: "rgba(255,255,255,0.04)",
            borderRadius: "50%",
            filter: "blur(30px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Chip
            label="DSA Partner Program"
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
              animation: "pulseGlow 2.5s infinite ease-in-out",
              "@keyframes pulseGlow": {
                "0%": { boxShadow: "0 0 0 0 rgba(255, 255, 255, 0.4)" },
                "70%": { boxShadow: "0 0 0 10px rgba(255, 255, 255, 0)" },
                "100%": { boxShadow: "0 0 0 0 rgba(255, 255, 255, 0)" }
              }
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
            Your Unfair Advantage
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
              to Become Financially Free
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
            A Platform for Unlimited Growth. Join our growing network of DSAs earning
            higher commissions with faster approvals and dedicated support.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2.5}>
            <Button
              variant="contained"
              size="large"
              startIcon={<WhatsAppIcon />}
              href="https://wa.me/918810600135"
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
                  boxShadow: "0 15px 30px -5px rgba(37,211,102,0.6)",
                },
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              WhatsApp Us: +91 8810600135
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
                  boxShadow: "0 10px 20px -5px rgba(255,255,255,0.2)",
                },
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              Apply Now
            </Button>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pt: { xs: 8, md: 12 } }}>
        {/* PROBLEMS vs SOLUTIONS */}
        <Box sx={{ mb: { xs: 10, md: 14 } }}>
          <Typography
            variant="h2"
            align="center"
            sx={{ fontFamily: "'Verdana', sans-serif", fontWeight: 800, fontSize: { xs: "2rem", md: "2.8rem" }, mb: 2, color: isDark ? "#fff" : "#0f172a" }}
          >
            Problems DSAs Face -{" "}
            <Box component="span" sx={{ color: "#3244e6" }}>And How We Solve Them</Box>
          </Typography>
          <Typography
            align="center"
            sx={{ fontFamily: "'Verdana', sans-serif", color: "text.secondary", mb: 6, fontSize: "1.05rem", maxWidth: 600, mx: "auto" }}
          >
            F2 Fintech was built to eliminate every roadblock you face as a DSA.
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card sx={{
                ...sectionCard,
                height: "100%",
                border: `1px solid ${isDark ? "rgba(239, 68, 68, 0.2)" : "rgba(239, 68, 68, 0.15)"}`,
                boxShadow: isDark
                  ? "0 12px 32px rgba(239, 68, 68, 0.05)"
                  : "0 12px 32px rgba(239, 68, 68, 0.01)",
                "&:hover": {
                  ...sectionCard["&:hover"],
                  boxShadow: isDark
                    ? "0 20px 48px rgba(239, 68, 68, 0.15)"
                    : "0 20px 48px rgba(239, 68, 68, 0.06)",
                  borderColor: "rgba(239, 68, 68, 0.4)",
                }
              }}>
                <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                  <Stack direction="row" alignItems="center" spacing={1.5} mb={4}>
                    <Box sx={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#ff4d4d,#ef4444)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 14px rgba(239, 68, 68, 0.4)" }}>
                      <HighlightOffIcon sx={{ color: "#fff", fontSize: 24 }} />
                    </Box>
                    <Typography sx={{ fontFamily: "'Verdana', sans-serif", fontWeight: 700, fontSize: "1.25rem", color: "#ef4444" }}>
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
                boxShadow: isDark
                  ? "0 12px 32px rgba(16, 185, 129, 0.05)"
                  : "0 12px 32px rgba(16, 185, 129, 0.01)",
                "&:hover": {
                  ...sectionCard["&:hover"],
                  boxShadow: isDark
                    ? "0 20px 48px rgba(16, 185, 129, 0.15)"
                    : "0 20px 48px rgba(16, 185, 129, 0.06)",
                  borderColor: "rgba(16, 185, 129, 0.4)",
                }
              }}>
                <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                  <Stack direction="row" alignItems="center" spacing={1.5} mb={4}>
                    <Box sx={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#10b981,#059669)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 14px rgba(16, 185, 129, 0.4)" }}>
                      <CheckCircleOutlineIcon sx={{ color: "#fff", fontSize: 24 }} />
                    </Box>
                    <Typography sx={{ fontFamily: "'Verdana', sans-serif", fontWeight: 700, fontSize: "1.25rem", color: "#10b981" }}>
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
                        <Typography sx={{ fontFamily: "'Verdana', sans-serif", fontSize: "0.95rem", fontWeight: 500, color: isDark ? "rgba(255,255,255,0.9)" : "#475569" }}>{s}</Typography>
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
            sx={{ fontFamily: "'Verdana', sans-serif", fontWeight: 800, fontSize: { xs: "2rem", md: "2.8rem" }, mb: 2, color: isDark ? "#fff" : "#0f172a" }}
          >
            Steps to Become a{" "}
            <Box component="span" sx={{ color: "#3244e6" }}>DSA Partner</Box>
          </Typography>
          <Typography align="center" sx={{ fontFamily: "'Verdana', sans-serif", color: "text.secondary", mb: 6, fontSize: "1.05rem", maxWidth: 600, mx: "auto" }}>
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
                  "&:hover": {
                    ...sectionCard["&:hover"],
                    borderColor: "rgba(50, 68, 230, 0.3)",
                    boxShadow: isDark
                      ? "0 20px 40px rgba(0,0,0,0.4)"
                      : "0 20px 40px rgba(50,68,230,0.12)",
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
                      <Typography sx={{ fontFamily: "'Verdana', sans-serif", fontWeight: 800, fontSize: "1.15rem", color: "#fff" }}>{step.number}</Typography>
                    </Box>
                    <Typography sx={{ fontFamily: "'Verdana', sans-serif", fontWeight: 700, fontSize: "1.1rem", mb: 1.5, color: isDark ? "#fff" : "#1e293b" }}>{step.title}</Typography>
                    <Typography sx={{ fontFamily: "'Verdana', sans-serif", fontSize: "0.9rem", color: "text.secondary", lineHeight: 1.65 }}>{step.description}</Typography>
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
              : "radial-gradient(circle at 10% 20%, rgba(255,255,255,0.12) 0%, transparent 60%), linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
            borderRadius: "32px",
            border: isDark ? "1px solid rgba(255,255,255,0.06)" : "none",
            py: { xs: 8, md: 10 },
            px: { xs: 3, md: 8 },
            mb: { xs: 10, md: 12 },
            position: "relative",
            overflow: "hidden",
            boxShadow: isDark
              ? "0 25px 60px rgba(0, 0, 0, 0.4)"
              : "0 25px 60px rgba(50, 68, 230, 0.15)",
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
              background: "rgba(255,255,255,0.03)",
              borderRadius: "50%",
              pointerEvents: "none",
            }}
          />
          <Typography variant="h2" align="center" sx={{ fontFamily: "'Verdana', sans-serif", fontWeight: 800, fontSize: { xs: "1.8rem", md: "2.6rem" }, color: "#fff", mb: 1.5 }}>
            Why Partner with F2 Fintech?
          </Typography>
          <Typography align="center" sx={{ fontFamily: "'Verdana', sans-serif", color: "rgba(255,255,255,0.75)", mb: 6, fontSize: "1.05rem", maxWidth: 550, mx: "auto" }}>
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
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: "20px",
                  py: 3,
                  px: 3.5,
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.15)",
                    transform: "translateY(-5px)",
                    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.25)",
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  }
                }}>
                  <Box sx={{
                    color: "#FFD700",
                    display: "flex",
                    p: 1.2,
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.1)",
                    "& svg": { fontSize: 28 }
                  }}>{b.icon}</Box>
                  <Typography sx={{ fontFamily: "'Verdana', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#fff" }}>{b.text}</Typography>
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
            ? "radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 80%), rgba(30, 41, 59, 0.3)"
            : "radial-gradient(circle at 50% 50%, rgba(50, 68, 230, 0.05) 0%, transparent 80%), rgba(255, 255, 255, 0.9)",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(50,68,230,0.08)"}`,
        }}>
          <CardContent>
            <Typography variant="h3" sx={{ fontFamily: "'Verdana', sans-serif", fontWeight: 800, fontSize: { xs: "1.8rem", md: "2.4rem" }, mb: 2, color: isDark ? "#fff" : "#0f172a" }}>
              Ready to Start Earning?
            </Typography>
            <Typography sx={{ fontFamily: "'Verdana', sans-serif", color: "text.secondary", mb: 4, fontSize: "1.05rem", maxWidth: 550, mx: "auto", lineHeight: 1.6 }}>
              Join our growing network of DSA partners and unlock unlimited earning potential.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2.5} justifyContent="center" alignItems="center">
              <Button
                variant="contained"
                size="large"
                startIcon={<WhatsAppIcon />}
                href="https://wa.me/918810600135"
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
                    boxShadow: "0 15px 30px -5px rgba(37,211,102,0.55)",
                  },
                  transition: "all 0.3s ease"
                }}
              >
                WhatsApp Us: +91 8810600135
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

      {/* Apply Now Form Modal */}
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
            Apply for DSA Partner
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              fontFamily: "'Verdana', sans-serif",
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
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                }
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
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                }
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
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                }
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
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    }
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
                  fontFamily: "'Verdana', sans-serif",
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
    </Box>
  );
}
