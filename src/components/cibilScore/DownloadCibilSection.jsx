import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

// Icons
import AssessmentIcon from "@mui/icons-material/Assessment";
import ShieldIcon from "@mui/icons-material/Shield";
import SpeedIcon from "@mui/icons-material/Speed";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import DownloadIcon from "@mui/icons-material/Download";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// ─── Animations ───────────────────────────────────────────────────────────────
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
`;

// ─── Styled Components ─────────────────────────────────────────────────────────
const SectionWrapper = styled(Box)(({ theme }) => ({
  background: theme.palette.mode === "dark"
    ? "linear-gradient(135deg, #0a0e1a 0%, #0d1a35 100%)"
    : "linear-gradient(135deg, #f0f7ff 0%, #eef2ff 50%, #f5f0ff 100%)",
  padding: "80px 0",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "-80px",
    right: "-80px",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(13, 110, 253, 0.08) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "-60px",
    left: "-60px",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(99, 179, 237, 0.06) 0%, transparent 70%)",
    pointerEvents: "none",
  },
}));

const BenefitCard = styled(Card)(({ theme }) => ({
  borderRadius: "20px",
  border: "1px solid rgba(13, 110, 253, 0.1)",
  background: theme.palette.mode === "dark"
    ? "rgba(255,255,255,0.04)"
    : "#ffffff",
  boxShadow: "0 4px 24px rgba(13, 110, 253, 0.06)",
  transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
  cursor: "default",
  height: "100%",
  animation: `${fadeUp} 0.6s ease both`,
  "&:hover": {
    transform: "translateY(-10px) scale(1.01)",
    boxShadow: "0 24px 48px rgba(13, 110, 253, 0.14)",
    border: "1px solid rgba(13, 110, 253, 0.28)",
  },
}));

const CTAButton = styled(Button)(() => ({
  background: "linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%)",
  color: "white",
  fontWeight: 700,
  fontSize: "1rem",
  padding: "14px 32px",
  borderRadius: "50px",
  textTransform: "none",
  letterSpacing: "0.3px",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "linear-gradient(135deg, #0a58ca 0%, #084298 100%)",
    transform: "translateX(4px)",
    boxShadow: "0 12px 30px rgba(13, 110, 253, 0.4)",
  },
}));

// ─── Benefits Data ─────────────────────────────────────────────────────────────
const BENEFITS = [
  {
    icon: <AssessmentIcon sx={{ fontSize: 38, color: "#0d6efd" }} />,
    iconBg: "linear-gradient(135deg, #e8f0fe, #dbeafe)",
    title: "Official CIBIL Report",
    desc: "Authentic credit report from Experian — India's trusted bureau. Valid for all bank and loan applications.",
    badge: "Experian Powered",
    badgeColor: "#0d6efd",
  },
  {
    icon: <SpeedIcon sx={{ fontSize: 38, color: "#00c853" }} />,
    iconBg: "linear-gradient(135deg, #e8f5e9, #d1fae5)",
    title: "Instant Delivery",
    desc: "Your PDF report link is generated in seconds. No waiting, no appointments, no paperwork.",
    badge: "Seconds",
    badgeColor: "#00c853",
  },
  {
    icon: <ShieldIcon sx={{ fontSize: 38, color: "#f59e0b" }} />,
    iconBg: "linear-gradient(135deg, #fff8e1, #fef3c7)",
    title: "Bank-Grade Security",
    desc: "All data is encrypted with 256-bit SSL. Your PAN and personal details are never stored or sold.",
    badge: "256-bit SSL",
    badgeColor: "#f59e0b",
  },
  {
    icon: <TrendingUpIcon sx={{ fontSize: 38, color: "#e91e63" }} />,
    iconBg: "linear-gradient(135deg, #fce4ec, #fee2e2)",
    title: "Full Credit Analysis",
    desc: "See your score, active loans, payment history, EMI details, and credit utilisation — all in one place.",
    badge: "Comprehensive",
    badgeColor: "#e91e63",
  },
  {
    icon: <DownloadIcon sx={{ fontSize: 38, color: "#9c27b0" }} />,
    iconBg: "linear-gradient(135deg, #f3e5f5, #ede9fe)",
    title: "Downloadable PDF",
    desc: "Save and share your credit report as a PDF. Perfect for home loan, personal loan, or any credit application.",
    badge: "PDF Format",
    badgeColor: "#9c27b0",
  },
  {
    icon: <CurrencyRupeeIcon sx={{ fontSize: 38, color: "#00bcd4" }} />,
    iconBg: "linear-gradient(135deg, #e0f7fa, #cffafe)",
    title: "Only ₹50",
    desc: "One transparent fee — no hidden charges, no subscription traps. Pay once and download your report.",
    badge: "₹50 Flat",
    badgeColor: "#00bcd4",
  },
];

// ─── Component ─────────────────────────────────────────────────────────────────
const DownloadCibilSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  return (
    <SectionWrapper>
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* ── Section Header ─────────────────────────────────────────────── */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Box sx={{ animation: `${float} 3s ease-in-out infinite`, display: "inline-block", mb: 2 }}>
            <AssessmentIcon sx={{ fontSize: 48, color: "#0d6efd" }} />
          </Box>
          <Chip
            label="New Feature"
            sx={{
              display: "block",
              width: "fit-content",
              mx: "auto",
              mb: 2,
              bgcolor: "rgba(13,110,253,0.1)",
              color: "#0d6efd",
              border: "1px solid rgba(13,110,253,0.25)",
              fontWeight: 700,
              fontSize: "0.75rem",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          />
          <Typography
            variant={isMobile ? "h4" : "h3"}
            fontWeight={800}
            gutterBottom
            sx={{
              background: "linear-gradient(135deg, #1a1a2e 0%, #0d6efd 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: theme.palette.mode === "dark" ? "white" : "transparent",
            }}
          >
            Download Free CIBIL Report
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 580, mx: "auto", lineHeight: 1.7, fontWeight: 400 }}
          >
            Get your official Experian credit report instantly. Know exactly where you stand
            financially before applying for any loan or credit card.
          </Typography>

          {/* Price badge */}
          <Box sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            mt: 3,
            px: 3, py: 1.5,
            borderRadius: "50px",
            background: "linear-gradient(135deg, #0d6efd15, #0a58ca10)",
            border: "1px solid rgba(13,110,253,0.2)",
          }}>
            <CurrencyRupeeIcon sx={{ color: "#0d6efd", fontSize: 20 }} />
            <Typography variant="h6" fontWeight={800} sx={{ color: "#0d6efd" }}>
              50 Only
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
              · One-time payment · No subscription
            </Typography>
          </Box>
        </Box>

        {/* ── Benefits Grid ──────────────────────────────────────────────── */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {BENEFITS.map((benefit, i) => (
            <Grid item xs={12} sm={6} md={4} key={i} sx={{ animationDelay: `${i * 0.1}s` }}>
              <BenefitCard elevation={0}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 2 }}>
                    <Box sx={{
                      minWidth: 64, height: 64,
                      borderRadius: "16px",
                      background: benefit.iconBg,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      {benefit.icon}
                    </Box>
                    <Box>
                      <Chip
                        label={benefit.badge}
                        size="small"
                        sx={{
                          mb: 0.5,
                          bgcolor: `${benefit.badgeColor}18`,
                          color: benefit.badgeColor,
                          fontWeight: 700,
                          fontSize: "0.65rem",
                          height: "20px",
                        }}
                      />
                      <Typography variant="h6" fontWeight={700} sx={{ lineHeight: 1.3 }}>
                        {benefit.title}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {benefit.desc}
                  </Typography>
                </CardContent>
              </BenefitCard>
            </Grid>
          ))}
        </Grid>

        {/* ── Quick Steps ─────────────────────────────────────────────────── */}
        <Box sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 4,
          mb: 6,
          background: theme.palette.mode === "dark"
            ? "rgba(13,110,253,0.08)"
            : "linear-gradient(135deg, rgba(13,110,253,0.04), rgba(10,88,202,0.06))",
          border: "1px solid rgba(13,110,253,0.12)",
        }}>
          <Typography variant="h6" fontWeight={700} textAlign="center" gutterBottom>
            It's as simple as 3 steps
          </Typography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1 }}>
            {[
              { emoji: "📝", step: "Fill Details", desc: "Name, Mobile, DOB" },
              { emoji: "💳", step: "Pay ₹50", desc: "UPI / Card / NetBanking" },
              { emoji: "📥", step: "Download PDF", desc: "Instant Experian link" },
            ].map((item, i) => (
              <Grid item xs={12} sm={4} key={i}>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent={{ xs: "flex-start", sm: "center" }}>
                  <Typography variant="h4">{item.emoji}</Typography>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={700}>{item.step}</Typography>
                    <Typography variant="caption" color="text.secondary">{item.desc}</Typography>
                  </Box>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <Box sx={{ textAlign: "center" }}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center" alignItems="center">
            <CTAButton
              id="download-cibil-cta"
              size="large"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate("/download-cibil")}
            >
              Get My CIBIL Report for ₹50
            </CTAButton>
            <Stack direction="row" spacing={1} alignItems="center">
              <CheckCircleIcon sx={{ color: "#00c853", fontSize: 16 }} />
              <Typography variant="body2" color="text.secondary">
                4.8/5 rated · 10,000+ reports served
              </Typography>
            </Stack>
          </Stack>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 2 }}>
            Powered by Experian India · Authorized Credit Bureau Partner
          </Typography>
        </Box>
      </Container>
    </SectionWrapper>
  );
};

export default DownloadCibilSection;
