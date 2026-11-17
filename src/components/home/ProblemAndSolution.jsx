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
  fontFamily: "Poppins, sans-serif",
  fontSize: "3rem",
  fontWeight: 650,
  lineHeight: 1.1,
  letterSpacing: "-0.04em",
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down("md")]: {
    fontSize: "1.6rem",
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
    background: "rgba(50, 68, 230, 0.15)",
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
    <Box sx={{ py: 0, background: "#f1f8ff" }}>
      {/* ── SOLUTION SECTION ── */}
      <Box
        sx={{
          py: 6,
          color: "#1e293b",
        }}
      >
        <Container maxWidth="lg">
          {/* Section header - slides in from RIGHT */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            sx={{ textAlign: "center", mb: 8 }}
          >
            <SectionTitle variant="h2" sx={{ color: "#1e293b", mb: 2 }}>
              F2 Fintech is your{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #384aff 0%, #384aff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "inline-block",
                }}
              >
                one‑stop loan partner
              </span>
            </SectionTitle>
            <Typography
              sx={{
                maxWidth: "800px",
                mx: "auto",
                fontSize: "1.1rem",
                color: "#475569",
                fontFamily: "Poppins",
              }}
            >
              We connect you with 40+ lenders, pre‑screen you, and show you clear, comparable
              offers; so you spend less time navigating complexity and more time growing. Everything from
              application to KYC to disbursement is handled in one place, with full transparency
              at every step.
            </Typography>
          </Box>

          {/* Funnel Steps - alternate left / right slide-in */}
          <Box
            component={motion.div}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 4, md: 0 },
              alignItems: "center",
              mt: 6,
              p: 6,
              borderRadius: "40px",
              background: "#ffffff",
              border: "1px solid rgba(50, 68, 230, 0.1)",
              boxShadow: "0 20px 40px rgba(50, 68, 230, 0.06)",
            }}
          >
            {[
              { icon: <FileText size={32} />, label: "Apply", color: "#3244e6", dir: -1 },
              { icon: <Search size={32} />, label: "Compare", color: "#10b981", dir: 1 },
              { icon: <CircleCheck size={32} />, label: "Verify", color: "#f59e0b", dir: -1 },
              { icon: <CornerRightDown size={32} />, label: "Disburse", color: "#0ea5e9", dir: 1 },
            ].map((step, index) => (
              <FunnelStep
                key={index}
                component={motion.div}
                variants={{
                  hidden: { opacity: 0, x: step.dir * 90, scale: 0.85 },
                  show: {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    transition: { type: "spring", stiffness: 180, damping: 22 },
                  },
                }}
                whileHover={{
                  scale: 1.12,
                  filter: "brightness(1.2)",
                  transition: { type: "spring", stiffness: 400, damping: 10 },
                }}
              >
                <StepIcon
                  color={step.color}
                  sx={{
                    "&:hover": {
                      boxShadow: `0 0 30px ${step.color}80`,
                    },
                  }}
                >
                  {step.icon}
                </StepIcon>
                <Typography
                  sx={{
                    fontWeight: 800,
                    mt: 2,
                    fontSize: "1.1rem",
                    letterSpacing: "0.05em",
                    color: "#1e293b",
                  }}
                >
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
              fontFamily: "'Poppins', sans-serif",
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
