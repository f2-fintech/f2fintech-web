import React from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  Card,
  useTheme,
  useMediaQuery
} from "@mui/material";
import {
  Stethoscope,
  User,
  Briefcase,
  Home as HomeIcon,
  Building,
  TrendingUp,
  Zap,
  BadgeCheck,
  Eye,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const SEGMENTS = [
  {
    title: "Doctor Loan",
    subtitle: "Healthcare Professionals",
    description: "Specialized high-value funding for clinics, diagnostic equipment, and medical practices with competitive rates.",
    route: "/doctor-loan",
    icon: Stethoscope,
    color: "#0d9488", // Teal
    bgLight: "rgba(13, 148, 136, 0.08)"
  },
  {
    title: "Personal Loan",
    subtitle: "Salaried & Self-Employed",
    description: "Collateral-free personal financing for weddings, travel, home renovation, or unexpected medical expenses.",
    route: "/personal-loan",
    icon: User,
    color: "#3b82f6", // Blue
    bgLight: "rgba(59, 130, 246, 0.08)"
  },
  {
    title: "Business Loan",
    subtitle: "MSMEs & Enterprises",
    description: "Expand your operations, manage working capital, or purchase inventory with customizable business financing.",
    route: "/business-loan",
    icon: Briefcase,
    color: "#10b981", // Emerald
    bgLight: "rgba(16, 185, 129, 0.08)"
  },
  {
    title: "Home Loan",
    subtitle: "Housing Finance",
    description: "Long-term home loans at affordable rates for buying, building, or renovating your dream residential space.",
    route: "/home-loan",
    icon: HomeIcon,
    color: "#f59e0b", // Amber
    bgLight: "rgba(245, 158, 11, 0.08)"
  },
  {
    title: "Loan Against Property",
    subtitle: "Secured Funding",
    description: "Leverage your residential or commercial real estate equity to secure low-interest capital for any need.",
    route: "/loan-against-property",
    icon: Building,
    color: "#6366f1", // Indigo
    bgLight: "rgba(99, 102, 241, 0.08)"
  }
];

const SegmentSelectorSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 10 },
        background: "linear-gradient(180deg, #f4faff 0%, #ffffff 100%)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Background decorative glows */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "-10%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(58, 73, 214, 0.05) 0%, transparent 70%)",
          filter: "blur(50px)",
          zIndex: 0,
          pointerEvents: "none"
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "10%",
          right: "-10%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 70%)",
          filter: "blur(50px)",
          zIndex: 0,
          pointerEvents: "none"
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Section Header */}
        <Box sx={{ textAlign: "center", mb: { xs: 5, md: 8 } }}>
          <Typography
            sx={{
              fontSize: { xs: "0.8rem", sm: "0.95rem" },
              fontWeight: 700,
              color: "#3a49d6",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              mb: 1.5,
              fontFamily: "Poppins, sans-serif"
            }}
          >
            Tailored Lending Solutions
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 850,
              fontFamily: "Poppins, Poppins, sans-serif",
              color: "#1f2937",
              letterSpacing: "-0.03em",
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              lineHeight: 1.1,
              mb: 2
            }}
          >
            Select Your Business Segment
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              fontFamily: "Poppins, sans-serif",
              fontSize: { xs: "0.95rem", sm: "1.05rem" },
              fontWeight: 500,
              maxWidth: "700px",
              mx: "auto"
            }}
          >
            Explore customized financial options structured explicitly for your segment. Calculate your limits and view custom resources.
          </Typography>
        </Box>

        {/* Grid Layout of Segment Cards */}
        <Grid container spacing={isMobile ? 2.5 : 4} justifyContent="center">
          {SEGMENTS.map((segment, index) => {
            const IconComponent = segment.icon;
            return (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  component={Link}
                  to={segment.route}
                  sx={{
                    textDecoration: "none",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRadius: "24px",
                    border: "1px solid rgba(0, 0, 0, 0.06)",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.01)",
                    background: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(12px)",
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "4px",
                      backgroundColor: segment.color,
                      opacity: 0,
                      transition: "opacity 0.3s ease"
                    },
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: `0 16px 36px ${segment.bgLight.replace("0.08", "0.18")}`,
                      borderColor: segment.color,
                      background: "#ffffff",
                      "&::after": {
                        opacity: 1
                      },
                      "& .eye-icon": {
                        color: segment.color,
                        transform: "scale(1.15)"
                      },
                      "& .arrow-icon": {
                        transform: "translateX(6px)",
                        color: segment.color
                      },
                      "& .icon-wrapper": {
                        transform: "scale(1.15) rotate(8deg)",
                        backgroundColor: segment.color,
                        color: "#fff"
                      }
                    }
                  }}
                >
                  <Box sx={{ p: { xs: 3, md: 3.5 } }}>
                    {/* Header: Icon + Category Tags */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2.5 }}>
                      <Box
                        className="icon-wrapper"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 48,
                          height: 48,
                          borderRadius: "14px",
                          backgroundColor: segment.bgLight,
                          color: segment.color,
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                        }}
                      >
                        <IconComponent size={24} />
                      </Box>
                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontFamily: "Poppins",
                            fontWeight: 700,
                            color: segment.color,
                            fontSize: "0.75rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em"
                          }}
                        >
                          {segment.subtitle}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            fontFamily: "Poppins, Poppins",
                            fontWeight: 700,
                            color: "#1f2937",
                            lineHeight: 1.25,
                            fontSize: "1.15rem"
                          }}
                        >
                          {segment.title}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Description Text */}
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#4b5563",
                        fontFamily: "Poppins",
                        fontSize: "0.85rem",
                        lineHeight: 1.6,
                        fontWeight: 400
                      }}
                    >
                      {segment.description}
                    </Typography>
                  </Box>

                  {/* Card Action Footer */}
                  <Box
                    sx={{
                      px: { xs: 3, md: 3.5 },
                      pb: { xs: 3, md: 3.5 },
                      pt: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      gap: 1
                    }}
                  >
                    <Typography
                      variant="button"
                      sx={{
                        fontFamily: "Poppins",
                        fontWeight: 650,
                        fontSize: "0.8rem",
                        textTransform: "none",
                        color: "#1f2937"
                      }}
                    >
                      View
                    </Typography>
                    <Eye
                      size={16}
                      className="eye-icon"
                      style={{ transition: "all 0.3s ease", color: "#9ca3af" }}
                    />
                    <ArrowRight
                      size={16}
                      className="arrow-icon"
                      style={{ transition: "all 0.3s ease", color: "#9ca3af" }}
                    />
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default SegmentSelectorSection;
