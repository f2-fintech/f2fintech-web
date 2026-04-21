import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  Divider,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import {
  FileText,
  Search,
  CircleCheck,
  CornerRightDown,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Clock,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";
import { customersdata } from "../data/Data.jsx";

/* ─────────── Styled Components ─────────── */
const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "'Outfit', sans-serif",
  fontWeight: 800,
  fontSize: "2.5rem",
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down("md")]: {
    fontSize: "2rem",
  },
}));

const FunnelStep = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(1),
  flex: 1,
  position: "relative",
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&::after": {
    content: '""',
    position: "absolute",
    top: "30%",
    right: "-10%",
    width: "20%",
    height: "2px",
    background: "rgba(255, 255, 255, 0.2)",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  "&:last-child::after": {
    display: "none",
  },
}));

const StepIcon = styled(Box)(({ theme, color }) => ({
  width: "72px",
  height: "72px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: color || theme.palette.primary.main,
  color: "#fff",
  boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  zIndex: 1,
  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
}));

const TestimonialCard = styled(Card)(({ theme }) => ({
  height: "100%",
  borderRadius: "20px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
  border: "1px solid rgba(0,0,0,0.05)",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

const ProblemPoint = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  borderRadius: "16px",
  background: "rgba(239, 68, 68, 0.04)",
  borderLeft: "4px solid #3a49d6",
}));

const ProblemAndSolution = () => {
  const theme = useTheme();

  return (
    <Box sx={{ py: 0 }}>
      {/* ── PROBLEM SECTION ── */}
      <Box sx={{ py: 10, background: "#fff", position: "relative" }}>
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <AlertCircle size={20} color="#3a49d6" />
                <Typography sx={{ color: "#3a49d6", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "1.9rem" }}>
                  The Reality
                </Typography>
              </Box>
              <SectionTitle variant="h2" sx={{ color: "#1e293b" }}>
                Why getting a loan still feels stressful
              </SectionTitle>

              <ProblemPoint>
                <Box sx={{ mt: 0.5 }}>
                  <Typography sx={{ fontWeight: 800, color: "#3a49d6" }}>01</Typography>
                </Box>
                <Typography sx={{ color: "#475569", fontFamily: "Poppins" }}>
                  Endless forms, unclear timelines, and no real visibility on which lender is best for your specific profile.
                </Typography>
              </ProblemPoint>

              <ProblemPoint>
                <Box sx={{ mt: 0.5 }}>
                  <Typography sx={{ fontWeight: 800, color: "#3a49d6" }}>02</Typography>
                </Box>
                <Typography sx={{ color: "#475569", fontFamily: "Poppins" }}>
                  Multiple calls, repeated KYC, and long waits; just to know if you’ll even get the loan.
                </Typography>
              </ProblemPoint>

              <ProblemPoint>
                <Box sx={{ mt: 0.5 }}>
                  <Typography sx={{ fontWeight: 800, color: "#3a49d6" }}>03</Typography>
                </Box>
                <Typography sx={{ color: "#475569", fontFamily: "Poppins" }}>
                  No clear advice on how much to borrow, how long the tenure should be, or what rate to expect.
                </Typography>
              </ProblemPoint>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/paperwork_stress_blue.png"
                sx={{
                  width: "100%",
                  maxWidth: "500px",
                  display: "block",
                  mx: "auto",
                  filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.1))"
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ── SOLUTION SECTION ── */}
      <Box sx={{ py: 6, background: "linear-gradient(135deg, #3244e6 0%, #1e293b 100%)", color: "#fff" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1, mb: 2, px: 2, py: 0.5, borderRadius: "50px", background: "#fff" }}>
              <TrendingUp size={18} color="#10b981" />
              <Typography sx={{ color: "#3a49d6", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "1.5rem" }}>
                The Solution
              </Typography>
            </Box>
            <SectionTitle variant="h2" sx={{ color: "#fff", mb: 2 }}>
              F2 Fintech is your one‑stop loan partner
            </SectionTitle>
            <Typography sx={{ maxWidth: "800px", mx: "auto", fontSize: "1.1rem", opacity: 0.9, fontFamily: "Poppins" }}>
              We connect you with 40+ lenders, pre‑screen you, and show you clear, comparable offers; so you spend less time stressing and more time growing. Everything from application to KYC to disbursement is handled in one place, with full transparency at every step.
            </Typography>
          </Box>

          {/* Funnel Visual */}
          <Box
            component={motion.div}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 4, md: 0 },
              alignItems: "center",
              mt: 6,
              p: 6,
              borderRadius: "40px",
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.15)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.15)"
            }}
          >
            {[
              { icon: <FileText size={32} />, label: "Apply", color: "#3244e6" },
              { icon: <Search size={32} />, label: "Compare", color: "#10b981" },
              { icon: <CircleCheck size={32} />, label: "Verify", color: "#f59e0b" },
              { icon: <CornerRightDown size={32} />, label: "Disburse", color: "#0ea5e9" }
            ].map((step, index) => (
              <FunnelStep
                key={index}
                component={motion.div}
                variants={{
                  hidden: { opacity: 0, scale: 0.5, y: 30 },
                  show: {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 260,
                      damping: 20
                    }
                  }
                }}
                whileHover={{
                  scale: 1.1,
                  filter: "brightness(1.2)",
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
              >
                <StepIcon
                  color={step.color}
                  sx={{
                    "&:hover": {
                      boxShadow: `0 0 30px ${step.color}80`,
                    }
                  }}
                >
                  {step.icon}
                </StepIcon>
                <Typography sx={{ fontWeight: 800, mt: 2, fontSize: "1.1rem", letterSpacing: "0.05em" }}>
                  {step.label}
                </Typography>
              </FunnelStep>
            ))}
          </Box>
        </Container>
        {/* ── CALL TO ACTION ── */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 6,
            width: "100%",
          }}
        >
          <Button
            component={Link}
            to="/application-form"
            sx={{
              bgcolor: "#3244e6",
              color: "#FFFFFF",
              fontWeight: "500",
              "&:hover": {
                bgcolor: "#2c3ce3",
                color: "white",
                transform: "translateY(-4px)",
                boxShadow: "0 10px 25px rgba(50, 68, 230, 0.4)",
              },
              px: { xs: 5, sm: 10 },
              py: { xs: 1.8, sm: 1 },
              fontSize: {
                xs: "1rem",
                sm: "1.1rem",
              },
              borderRadius: "50px",
              textTransform: "none",
              fontFamily: "'Outfit', sans-serif",
              transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              boxShadow: "0 8px 20px rgba(50, 68, 230, 0.3)",
            }}
          >
            Apply Now
            <ArrowRight size={20} style={{ marginLeft: "12px" }} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProblemAndSolution;
