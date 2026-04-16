import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled, keyframes } from "@mui/system";
import {
  Users,
  Zap,
  ShieldCheck,
  Building2,
  Clock3,
  ChevronRight
} from "lucide-react";

/* ─────────── Keyframes ─────────── */
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

/* ─────────── Styled Components ─────────── */
const GlassCard = styled(Paper)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.8)",
  backdropFilter: "blur(12px)",
  borderRadius: "24px",
  padding: theme.spacing(4),
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.05)",
  "&:hover": {
    transform: "translateY(-10px) scale(1.02)",
    boxShadow: "0 20px 40px rgba(50, 68, 230, 0.12)",
    border: "1px solid rgba(50, 68, 230, 0.2)",
    background: "rgba(255, 255, 255, 0.95)",
  },
}));

const IconWrapper = styled(Box)(({ color }) => ({
  width: "56px",
  height: "56px",
  borderRadius: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "20px",
  background: `linear-gradient(135deg, ${color}15 0%, ${color}30 100%)`,
  color: color,
}));

const trustPoints = [
  {
    title: "40+ Lenders, One Platform",
    desc: "Access competitive rates from India's top banks and NBFCs in one place.",
    icon: <Building2 size={28} />,
    color: "#3244e6",
  },
  {
    title: "Fast, Transparent Process",
    desc: "Digital-first approach ensures you know exactly where your application stands.",
    icon: <Zap size={28} />,
    color: "#10b981",
  },
  {
    title: "Built for Real People",
    desc: "Personalized loan solutions tailored for individuals and growing businesses.",
    icon: <Users size={28} />,
    color: "#f59e0b",
  },
  {
    title: "Trusted by 11,000+ Clients",
    desc: "Join thousands who have successfully secured their financial future with us.",
    icon: <ShieldCheck size={28} />,
    color: "#0ea5e9",
  },
];

const Hook = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: "linear-gradient(180deg, #f8faff 0%, #ffffff 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Accents */}
      <Box
        sx={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: "40%",
          height: "40%",
          background: "radial-gradient(circle, rgba(50, 68, 230, 0.05) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "10%",
          left: "-5%",
          width: "30%",
          height: "30%",
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={6} alignItems="center">
          {/* Main Copy Section */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                animation: `${fadeInUp} 0.8s ease-out forwards`,
              }}
            >
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1.5,
                  px: 2,
                  py: 1,
                  borderRadius: "50px",
                  background: "rgba(50, 68, 230, 0.08)",
                  border: "1px solid rgba(50, 68, 230, 0.15)",
                  mb: 3,
                }}
              >
                <Clock3 size={18} color="#3244e6" />
                <Typography
                  sx={{
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    color: "#3244e6",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Express Approval
                </Typography>
              </Box>

              <Typography
                variant="h2"
                sx={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 800,
                  fontSize: { xs: "2.5rem", sm: "3.2rem", md: "3.8rem" },
                  lineHeight: 1.1,
                  color: "#1e293b",
                  mb: 3,
                  letterSpacing: "-0.02em",
                }}
              >
                Get your loan in{" "}
                <Box
                  component="span"
                  sx={{
                    background: "linear-gradient(135deg, #3244e6 0%, #10b981 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  3 hours.
                </Box>
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  color: "#64748b",
                  lineHeight: 1.6,
                  mb: 5,
                  fontSize: { xs: "1.1rem", md: "1.25rem" },
                  fontWeight: 400,
                  fontFamily: "'Poppins', sans-serif",
                  maxWidth: "540px",
                }}
              >
                No more running from lender to lender. F2 Fintech matches you with the best personal, business, or property loans across 40+ lenders fast, transparent, and hassle‑free.
              </Typography>
            </Box>
          </Grid>

          {/* Cards Section */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              {trustPoints.map((point, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  key={index}
                  sx={{
                    animation: `${fadeInUp} 0.8s ease-out ${0.2 + index * 0.1}s forwards`,
                    opacity: 0,
                  }}
                >
                  <GlassCard elevation={0}>
                    <IconWrapper color={point.color}>{point.icon}</IconWrapper>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 1.5,
                        fontSize: "1.125rem",
                        color: "#1e293b",
                        fontFamily: "'Outfit', sans-serif",
                      }}
                    >
                      {point.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#64748b",
                        lineHeight: 1.6,
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    >
                      {point.desc}
                    </Typography>
                  </GlassCard>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hook;
