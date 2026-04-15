"use client";
import React, { useState, useEffect } from "react";

import {
  Box,
  Typography,
  Container,
  Button,
  IconButton,
  Avatar,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { styled, keyframes } from "@mui/system";
import {
  Phone,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import SendQueryDialog from "./SendQueryDialog";

/* ─────────── Keyframes ─────────── */
const fadeInUpConstant = keyframes`
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const pulseGlow = keyframes`
  0% { filter: drop-shadow(0 0 8px rgba(255,255,255,0.1)); }
  50% { filter: drop-shadow(0 0 20px rgba(255,255,255,0.3)); }
  100% { filter: drop-shadow(0 0 8px rgba(255,255,255,0.1)); }
`;

const float = keyframes`
  0% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-8px) scale(1.03); }
  100% { transform: translateY(0px) scale(1); }
`;

// Floating Button Component
const FloatingCallButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  backgroundColor: "#10b981",
  color: "#fff",
  width: 60,
  height: 60,
  borderRadius: "50%",
  boxShadow: "0 4px 20px rgba(16, 185, 129, 0.4)",
  animation: "pulse 2s ease-in-out infinite, float 4s ease-in-out infinite",
  zIndex: 1000,
  "&:hover": {
    backgroundColor: "#059669",
    transform: "scale(1.1)",
  },
  transition: "all 0.3s ease",
  "@keyframes pulse": {
    "0%": { boxShadow: "0 0 0 0 rgba(16, 185, 129, 0.7)" },
    "70%": { boxShadow: "0 0 0 10px rgba(16, 185, 129, 0)" },
    "100%": { boxShadow: "0 0 0 0 rgba(16, 185, 129, 0)" },
  },
  "@keyframes float": {
    "0%": { transform: "translateY(0px)" },
    "50%": { transform: "translateY(-10px)" },
    "100%": { transform: "translateY(0px)" },
  },
}));

const MainHeading = styled(Typography)(({ theme }) => ({
  fontSize: "4.5rem",
  fontWeight: 700,
  lineHeight: 1.1,
  letterSpacing: "-.02em",
  color: "#1f2937",
  textAlign: "center",
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down("lg")]: {
    fontSize: "3.8rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "3rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "2.2rem",
    lineHeight: 1.2,
  },
  [theme.breakpoints.down("xs")]: {
    fontSize: "1.8rem",
  },
}));

const HighlightedText = styled("span")(({ theme }) => ({
  color: "#10b981", // Green color from image
}));

const SaaSStarterLanding = () => {
  const theme = useTheme();

  const [sendQueryAnchorEl, setSendQueryAnchorEl] = React.useState(null);
  const openSendQuery = Boolean(sendQueryAnchorEl);

  // Carousel State & Logic
  const [currentImg, setCurrentImg] = useState(0);
  const backgroundImages = [
    "/new/og_pitch.png",
    "/new/10.png",
    "/new/1.png",
    "/new/4.png",
    "/new/7.png",
    "/new/6.png",
    "/new/2.png",
    "/new/3image.png",
    "/new/8.png",
    "/new/9.png",
    "/new/5.png",
  ];

  const teamLogos = {
    1: "/logo-founders.png",
    2: "/logo-sales.png",
    3: "/logo-sales.png",
    4: "/logo-sales.png",
    5: "/logo-sales.png",
    6: "/logo-sales.png",
    7: "/logo-hr.png",
    8: "/logo-it.png",
    9: "/logo-marketing.png",
    10: "/logo-credit.png",
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [backgroundImages.length]);

  const handleSendQueryClick = (event) => {
    setSendQueryAnchorEl(event.currentTarget);
  };
  const handleSendQueryClose = () => {
    setSendQueryAnchorEl(null);
  };

  const handleCallButtonClick = () => {
    // Detect if the user is on a mobile device
    const isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

    if (isMobile) {
      // Mobile: Open phone dialer
      window.location.href = "tel:+14388010973";
    } else {
      // Desktop/Laptop: Redirect to WhatsApp
      window.open("https://wa.me/918810600135", "_blank");
    }
  };

  const handleNext = () => {
    setCurrentImg((prev) => (prev + 1) % backgroundImages.length);
  };

  const handlePrev = () => {
    setCurrentImg((prev) => (prev === 0 ? backgroundImages.length - 1 : prev - 1));
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: { xs: "auto", md: "100vh" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        overflow: "hidden",
        backgroundColor: "#f4faff",
        backgroundImage: "radial-gradient(at 50% 50%, #f4faff 0%, #eef6ff 100%)",
        pb: { xs: 10, md: 8 },
      }}
    >
      {/* ── TOP: Shark Tank Hero Banner ──___ */}
      <Box
        sx={{
          width: "100%",
          position: "relative",
          animation: `${fadeInUpConstant} 1s ease-out 0.3s both`,
          mb: { xs: 4, md: 6 },
        }}
      >
        {/* Main Banner Card */}
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 24px 80px rgba(0,0,0,0.15)",
            aspectRatio: { xs: "1.4/1", sm: "16/9", md: "21/9", lg: "25/7" },
            borderRadius: { xs: "0px", md: "0 0 40px 40px" },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* Left Section (20% on Desktop) - Enhanced Logo Section */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flex: { md: "0 0 22%" },
              background: "#000", // Stable black floor
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
              borderRight: "1px solid rgba(255,255,255,0.15)",
              // Blue gradient overlay
              "&::after": {
                content: '""',
                position: "absolute",
                inset: 0,
                background: "linear-gradient(135deg, #3244e6 0%, #2835b3 100%)",
                opacity: currentImg === 0 ? 0 : 1,
                transition: "opacity 1s ease-in-out",
                zIndex: 0
              },
              "&::before": {
                content: '""',
                position: "absolute",
                top: "-50%",
                left: "-50%",
                width: "200%",
                height: "200%",
                background: "radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, transparent 70%)",
                animation: `${shimmer} 12s linear infinite`,
                opacity: currentImg === 0 ? 0 : 1,
                transition: "opacity 1s ease",
                zIndex: 1
              }
            }}
          >
            {/* Shark Tank Logo */}
            <Box
              component="img"
              src="/SharkTankIndia1.jpg"
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                objectFit: "contain",
                p: 0,
                opacity: currentImg === 0 ? 1 : 0,
                transition: "opacity 1s cubic-bezier(0.4, 0, 0.2, 1)", // Fade only to prevent revealing background
                zIndex: 5,
                animation: currentImg === 0 ? `${float} 6s ease-in-out infinite` : "none",
              }}
            />
            {/* F2 Fintech White Logo - Visibility Fixed */}
            <Box
              component="img"
              src={teamLogos[currentImg] || "/f2fintech-team-logo.png"}
              sx={{
                position: "absolute",
                width: "110%",
                height: "110%",
                objectFit: "contain",
                p: 1,
                opacity: currentImg !== 0 ? 1 : 0,
                mixBlendMode: "screen", // Ensure black background from generated images is transparent
                transition: "all 1s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: currentImg !== 0 ? "scale(1)" : "scale(0.8) translateY(20px)",
                zIndex: currentImg !== 0 ? 1 : 0,
              }}
            />
          </Box>

          {/* Right Section (70% on Desktop) - Background Image Carousel */}
          <Box
            sx={{
              flex: 1,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {backgroundImages.map((img, idx) => (
              <Box
                key={img}
                sx={{
                  position: "absolute",
                  inset: 0,
                  opacity: currentImg === idx ? 1 : 0,
                  transition: "opacity 1.5s ease-in-out, transform 12s linear",
                  transform: currentImg === idx ? "scale(1.05)" : "scale(1)",
                  zIndex: 0,
                  // ── Desktop & tablet: classic cover background ──
                  backgroundImage: { sm: `url('${img}')`, xs: "none" },
                  backgroundSize: "cover",
                  backgroundPosition: "center 20%",
                  filter: "brightness(1.05) contrast(1.05) saturate(1.1)",
                  // ── Mobile only: flex container for the img ──
                  display: { xs: "flex", sm: "block" },
                  alignItems: { xs: "center", sm: "unset" },
                  justifyContent: { xs: "center", sm: "unset" },
                  backgroundColor: { xs: "#fff", sm: "transparent" },
                }}
              >
                {/* Mobile-only img tag so the full image shows without cropping */}
                <Box
                  component="img"
                  src={img}
                  alt={`carousel-${idx}`}
                  sx={{
                    display: { xs: "block", sm: "none" },
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    objectPosition: "center",
                    filter: "brightness(1.05) contrast(1.05) saturate(1.1)",
                  }}
                />
              </Box>
            ))}

            {/* Navigation Buttons */}
            <IconButton
              onClick={handlePrev}
              sx={{
                position: "absolute",
                left: 10,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 10,
                color: "#fff",
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.25)",
                  transform: "translateY(-50%) scale(1.1)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <ChevronLeft size={24} />
            </IconButton>

            <IconButton
              onClick={handleNext}
              sx={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 10,
                color: "#fff",
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.25)",
                  transform: "translateY(-50%) scale(1.1)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <ChevronRight size={24} />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            mx: "auto",
          }}
        >
          {/* Badges Container */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "column" },
              alignItems: "center",
              justifyContent: "center",
              gap: { xs: 2, md: 4 },
              mb: 4,
              mt: 2,
              animation: "fadeInUp 0.8s ease-out forwards",
              "@keyframes fadeInUp": {
                from: { opacity: 0, transform: "translateY(20px)" },
                to: { opacity: 1, transform: "translateY(0)" },
              },
            }}
          >
            {/* Incubated Badge */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 1.5, sm: 2.5 },
                background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 58, 138, 0.9) 100%)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(56, 189, 248, 0.3)",
                borderRadius: "50px",
                px: { xs: 2.5, sm: 4.5 },
                py: 1.8,
                boxShadow: "0 20px 50px -12px rgba(15, 23, 42, 0.5)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                  transform: "translateY(-4px) scale(1.02)",
                  boxShadow: "0 20px 40px -10px rgba(37, 99, 235, 0.25)",
                  border: "1.5px solid rgba(37, 99, 235, 0.4)",
                  "&::after": {
                    transform: "translateX(100%)",
                    transition: "transform 0.6s ease-in-out",
                  }
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: "-100%",
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                  transform: "translateX(-100%)",
                }
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  color: "#f8fafc",
                  fontWeight: 700,
                  fontSize: { xs: "0.9rem", sm: "1.15rem" },
                  fontFamily: "Poppins",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  letterSpacing: "0.02em"
                }}
              >
                <span style={{ color: "#38bdf8" }}>✨</span> Startup Incubated with
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  background: "#fff",
                  borderRadius: "30px",
                  p: 0.5,
                  px: 1.5,
                  boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)"
                }}
              >
                <Box
                  component="img"
                  src="/iiml.jpeg"
                  sx={{
                    height: { xs: 20, sm: 28 },
                    width: "auto",
                    transition: "all 0.3s ease",
                    "&:hover": { transform: "scale(1.1)" }
                  }}
                />
                <Box
                  sx={{ width: "1px", height: "16px", background: "rgba(0,0,0,0.1)" }}
                />
                <Box
                  component="img"
                  src="/startuplogo.jpeg"
                  sx={{
                    height: { xs: 20, sm: 28 },
                    width: "auto",
                    transition: "all 0.3s ease",
                    "&:hover": { transform: "scale(1.1)" }
                  }}
                />
              </Box>
            </Box>

            {/* Shark Tank Badge */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1.5,
                py: 0.55,
                borderRadius: "50px",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "translateY(-2px)",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >



              </Box>


            </Box>

          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              width: "100%",
              mb: 4,
            }}
          >
            {/* Eyebrow Label */}
            <Typography
              sx={{
                fontSize: { xs: "0.8rem", sm: "0.95rem" },
                fontWeight: 700,
                color: "#3244e6",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                mb: 2,
                animation: `${fadeInUpConstant} 0.8s ease-out 0.1s both`,
                opacity: 0,
              }}
            >
              🚀 Tired of Loan Delays?
            </Typography>

            {/* Main Primary Heading */}
            <MainHeading
              variant="h1"
              id="voice-summary-heading"
              sx={{
                animation: `${fadeInUpConstant} 0.8s ease-out 0.2s both`,
                opacity: 0,
                fontFamily: "'Outfit', 'Inter', sans-serif",
                mb: 2.5,
                lineHeight: 1,
                fontWeight: 800,
              }}
            >
              Break Free Today
            </MainHeading>

            {/* Benefit Highlighting Sub-heading */}
            <Typography
              sx={{
                fontSize: { xs: "1.3rem", sm: "1.8rem", md: "2.4rem" },
                fontWeight: 800,
                lineHeight: 1.2,
                mb: 3,
                background: "linear-gradient(135deg, #3244e6 0%, #10b981 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: `${fadeInUpConstant} 0.8s ease-out 0.3s both`,
                opacity: 0,
                maxWidth: "900px",
                mx: "auto",
                px: 2,
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.05))",
                letterSpacing: "-0.01em"
              }}
            >
              Unlock same-day approvals, killer rates <br /> and plans built for your hustle.
            </Typography>

            {/* Community Proof Indicator */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                animation: `${fadeInUpConstant} 0.8s ease-out 0.4s both`,
                opacity: 0,
                background: "rgba(16, 185, 129, 0.08)",
                px: 2.5,
                py: 0.8,
                borderRadius: "50px",
                border: "1px solid rgba(16, 185, 129, 0.2)",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "0.85rem", sm: "1rem" },
                  color: "#065f46",
                  fontWeight: 600,
                  fontFamily: "Poppins",
                }}
              >
                🤝 10,000+ Indians already did
              </Typography>
            </Box>
          </Box>
          {/* Subheading Badge for "Phygital" */}
          <Typography
            sx={{
              fontSize: { xs: "0.9rem", sm: "1.2rem", md: "1.4rem" },
              fontWeight: 700,
              color: "#fff",
              px: { xs: 2.5, sm: 4 },
              py: { xs: 1, sm: 1.5 },
              borderRadius: "50px",
              mb: { xs: 2, sm: 4 },
              fontFamily: "Poppins",
              display: "inline-block",
              background: "linear-gradient(135deg, #3244e6 0%, #10b981 100%)",
              boxShadow: "0 8px 25px rgba(50, 68, 230, 0.35)",
              letterSpacing: "0.5px",
              animation: "fadeInUp 0.8s ease-out 0.4s forwards",
              opacity: 0,
            }}
          >
            ✨ Grab Your Loan Edge Today
          </Typography>

          {/* Description */}
          <Typography
            variant="body1"
            id="voice-summary-content"
            sx={{
              fontSize: { xs: "1.1rem", sm: "1.25rem" },
              color: "#4b5563",
              fontFamily: "Poppins",
              width: "100%",
              mb: 5,
              lineHeight: 1.7,
              animation: "fadeInUp 0.8s ease-out 0.6s forwards",
              opacity: 0,
            }}
          >
            Unlock your full financial potential with ease. Explore a wide
            range of trusted lending services designed to fit your unique
            needs. Discover smarter borrowing solutions tailored just for you.
          </Typography>


          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4, alignItems: "center", justifyContent: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box sx={{ display: "flex" }}>
                <Avatar
                  sx={{
                    bgcolor: "#10b981",
                    width: 32,
                    height: 32,
                    border: "2px solid #fff",
                  }}
                />
                <Avatar
                  sx={{
                    bgcolor: "#3b82f6",
                    width: 32,
                    height: 32,
                    border: "2px solid #fff",
                    ml: -1,
                  }}
                />
                <Avatar
                  sx={{
                    bgcolor: "#a855f7",
                    width: 32,
                    height: 32,
                    border: "2px solid #fff",
                    ml: -1,
                  }}
                />
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Users size={20} style={{ color: "#10b981" }} />
              <Box>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, fontFamily: "Poppins" }}
                >
                  40+ Lender’s offerings
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", fontFamily: "Poppins", fontSize: { xs: "0.7rem", sm: ".8rem", fontWeight: 600 }, }}
                >
                  Available 24/7
                </Typography>
              </Box>
            </Box>

            {/* Buttons */}

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: { xs: 1.5, sm: 2 },
                width: "100%",
                maxWidth: { sm: "80%", md: "100%" },
                mx: "auto",
                my: { xs: 1, sm: 0 },
              }}
            >
              {/* Row for Eligibility and Send Query */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "center",
                  alignItems: "center",
                  gap: { xs: 1.5, sm: 2 },
                  width: "100%",
                }}
              >
                {/* Eligibility Check Button */}
                <Button
                  variant="contained"
                  onClick={() =>
                  (window.location.href =
                    "https://finwise-eligibility.netlify.app/")
                  }
                  sx={{
                    bgcolor: "#fdb723",
                    color: "#FFFFFF",
                    fontWeight: "500",
                    "&:hover": {
                      bgcolor: "#f3ae21",
                      color: "white",
                    },
                    px: { xs: 2, sm: 3 },
                    py: { xs: 1, sm: 1.5 },
                    fontSize: {
                      xs: "0.9rem",
                      sm: "1rem",
                      md: "1.1rem",
                    },
                    borderRadius: 6,
                    textTransform: "none",
                    height: { xs: "6.3", sm: "2.5rem", md: "6.3" },
                    fontFamily: "Poppins",
                    width: { xs: "100%", sm: "auto" },
                    minWidth: { xs: "100%", sm: "220px" },
                  }}
                  fullWidth={false}
                >
                  Check Eligibility
                </Button>

                {/* Send Query Button */}
                <Button
                  variant="outlined"
                  onClick={handleSendQueryClick}
                  sx={{
                    borderColor: "#352acbff",
                    color: "#352acbff",
                    fontWeight: "500",
                    "&:hover": {
                      borderColor: "#352acbff",
                      bgcolor: "rgba(53, 42, 203, 0.04)",
                    },
                    px: { xs: 2, sm: 3 },
                    py: { xs: 1, sm: 1.5 },
                    fontSize: {
                      xs: "0.9rem",
                      sm: "1rem",
                      md: "1.1rem",
                    },
                    borderRadius: 6,
                    textTransform: "none",
                    height: { xs: "6.3", sm: "2.5rem", md: "6.3" },
                    fontFamily: "Poppins",
                    width: { xs: "100%", sm: "auto" },
                    minWidth: { xs: "100%", sm: "220px" },
                  }}
                  fullWidth={false}
                >
                  Send Query
                </Button>
              </Box>

              {/* ButtonComp below */}
              <Box sx={{ width: { xs: "100%", sm: "auto", md: "50%" } }}>
                <Button
                  component={Link}
                  to="/application-form"
                  sx={{
                    bgcolor: "#3244e6",
                    color: "#FFFFFF",
                    fontWeight: "400",
                    "&:hover": {
                      bgcolor: "#2835b3",
                      color: "white",
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 20px rgba(50, 68, 230, 0.3)",
                    },
                    px: { xs: 3, sm: 1 },
                    py: { xs: 1.5, sm: .5 },
                    fontSize: {
                      xs: "0.95rem",
                      sm: "1.05rem",
                      md: "1.15rem",
                    },
                    borderRadius: "50px",
                    textTransform: "none",
                    fontFamily: "Poppins",
                    width: "70%",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 15px rgba(50, 68, 230, 0.2)",
                  }}
                >
                  Apply Now
                </Button>
              </Box>

              <SendQueryDialog
                anchorEl={sendQueryAnchorEl}
                open={openSendQuery}
                handleClose={handleSendQueryClose}
              />
            </Box>
          </Box>
        </Box>

        {/* Floating Call Button */}
        <FloatingCallButton
          onClick={handleCallButtonClick}
          sx={{
            position: "fixed",
            bottom: { xs: "90px", sm: "90px", md: "100px" },
            right: { xs: "28px", sm: "25px", md: "25px" },
            zIndex: 2000,
            width: { xs: 50, sm: 60 },
            height: { xs: 50, sm: 60 },
          }}
        >
          <Phone size={24} />
        </FloatingCallButton>
      </Container >
    </Box >
  );
};

export default SaaSStarterLanding;
