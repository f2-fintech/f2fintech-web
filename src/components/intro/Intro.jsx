"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  IconButton,
  Avatar,
  Dialog,
  DialogContent,
  Fade,
} from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import { styled, keyframes } from "@mui/system";
import {
  Phone,
  Users,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  BadgeCheck,
  Zap,
  Star,
  X,
  Play,
  MapPinPlusInsideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import SendQueryDialog from "./SendQueryDialog";


/* ─────────── Keyframes ─────────── */
const fadeInUpConstant = keyframes`
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
`;



// Floating Button Component
const FloatingCallButton = styled(IconButton)(({ theme }) => ({
  position: "fixed",
  backgroundColor: "#10b981",
  color: "#fff",
  width: 65,
  height: 65,
  borderRadius: "50%",
  boxShadow: "0 4px 20px rgba(16, 185, 129, 0.4)",
  animation: "pulse 2s ease-in-out infinite, float 4s ease-in-out infinite",
  zIndex: 2000,
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#059669",
    transform: "scale(1.1)",
  },
  [theme.breakpoints.down("md")]: {
    width: 60,
    height: 60,
  },
  [theme.breakpoints.down("sm")]: {
    width: 55,
    height: 55,
  },
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

const FloatingVideoButton = styled(Box)(({ theme }) => ({
  position: "fixed",
  bottom: "90px",
  right: "8px",
  width: "120px",
  height: "180px",
  borderRadius: "16px",
  overflow: "hidden",
  backgroundColor: "#000",
  boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
  cursor: "pointer",
  zIndex: 1500,
  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
  border: "2px solid rgba(255, 255, 255, 0.1)",
  "&::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)",
    pointerEvents: "none"
  },
  "&:hover": {
    transform: "scale(1.05) translateY(-5px)",
    boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    "& .play-icon": {
      opacity: 1,
      transform: "translate(-50%, -50%) scale(1.1)",
    }
  },
  [theme.breakpoints.down("lg")]: {
    bottom: "150px",
    right: "25px",
  },
  [theme.breakpoints.down("md")]: {
    width: "110px",
    height: "165px",
    bottom: "140px",
    right: "25px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "90px",
    height: "135px",
    bottom: "125px",
    right: "20px",
  }
}));

const VideoPreview = styled("video")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const PlayOverlay = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  backdropFilter: "blur(4px)",
  borderRadius: "50%",
  width: "44px",
  height: "44px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  opacity: 0.8,
  transition: "all 0.3s ease",
  zIndex: 2,
});

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



const SaaSStarterLanding = () => {
  const theme = useTheme();

  const [sendQueryAnchorEl, setSendQueryAnchorEl] = React.useState(null);
  const openSendQuery = Boolean(sendQueryAnchorEl);

  // Video State
  const videos = [
    "https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/assets/f2fin1.mp4",
    "https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/assets/f2fin2.mp4",
    "https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/assets/f2fin3.mp4",
  ];
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentVideoIdx, setCurrentVideoIdx] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [isVideoPreviewVisible, setIsVideoPreviewVisible] = useState(() => {
    try {
      return localStorage.getItem("f2fintech_video_watched") !== "true";
    } catch (e) {
      return true;
    }
  });
  const [isVideoPreviewDismissed, setIsVideoPreviewDismissed] = useState(false);

  // Carousel State & Logic
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isTabScreen = useMediaQuery(theme.breakpoints.between("sm", "lg"));



  // Carousel State & Logic
  const [currentImg, setCurrentImg] = useState(0);

  const desktopImages = [
    "/banners/banner12.webp",
    "/banners/banner123.webp",
    "/banners/3-banner.webp",
    "/banners/2-banner.webp",
    "/banners/1-banner.webp",
  ];

  const mobileImages = [
    "/banners/banner12-mobile.png",
    "/banners/banner123-mobile.png",
    "/banners/3-banner-mobile.png",
    "/banners/2-banner-mobile.png",
    "/banners/1-banner-mobile.png",
  ];

  const tabImages = [
    "/banners/banner12-tab.png",
    "/banners/banner123-tab.png",
    "/banners/3-banner-tab.png",
    "/banners/2-banner-tab.png",
    "/banners/1-banner-tab.png",
  ];

  const backgroundImages = isMobileScreen
    ? mobileImages
    : isTabScreen
      ? tabImages
      : desktopImages;



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
      window.location.href = "tel:+918810600135";
    } else {
      // Desktop/Laptop: Redirect to WhatsApp
      window.open("https://wa.me/918810600135", "_blank");
    }
  };

  const marqueeScroll = keyframes`
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  `;

  const floating = keyframes`
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-5px) rotate(5deg); }
  `;

  const shine = keyframes`
    0% { left: -100%; }
    20% { left: 100%; }
    100% { left: 100%; }
  `;

  const handleNext = () => {
    setCurrentImg((prev) => (prev + 1) % backgroundImages.length);
  };

  const handlePrev = () => {
    setCurrentImg((prev) => (prev === 0 ? backgroundImages.length - 1 : prev - 1));
  };

  const handleVideoClick = () => {
    setSecondsRemaining(15);
    setIsVideoModalOpen(true);
  };

  const handleVideoClose = (event, reason) => {
    if ((reason === "backdropClick" || reason === "escapeKeyDown") && secondsRemaining > 0) {
      return;
    }
    setIsVideoModalOpen(false);
    try {
      localStorage.setItem("f2fintech_video_watched", "true");
    } catch (e) {
      // ignore
    }
    setIsVideoPreviewVisible(false);
  };

  const handleDismissPreview = (event) => {
    event.stopPropagation();
    setIsVideoPreviewDismissed(true);
  };

  const handleNextVideo = () => {
    if (secondsRemaining > 0) return;
    setCurrentVideoIdx((prev) => (prev + 1) % videos.length);
  };

  const handlePrevVideo = () => {
    if (secondsRemaining > 0) return;
    setCurrentVideoIdx((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  // Cycle videos in preview
  useEffect(() => {
    if (isVideoModalOpen) return;
    const timer = setInterval(() => {
      setCurrentVideoIdx((prev) => (prev + 1) % videos.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [isVideoModalOpen, videos.length]);

  // Countdown timer for close/skip lock
  useEffect(() => {
    let timer;
    if (isVideoModalOpen && secondsRemaining > 0) {
      timer = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isVideoModalOpen, secondsRemaining]);



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
          mb: 0,
        }}
      >
        {/* Main Banner Card */}
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 24px 80px rgba(0,0,0,0.15)",
            aspectRatio: { xs: "9/16", sm: "4/3", md: "21/9", lg: "22/7" },
            borderRadius: "0px",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
          }}
        >


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
                  // ── Desktop only (lg+): CSS background-image with cover ──
                  backgroundImage: { lg: `url('${img}')`, xs: "none" },
                  backgroundSize: "cover",
                  backgroundPosition: "center 20%",
                  filter: "brightness(1.05) contrast(1.05) saturate(1.1)",
                  // ── Mobile & Tablet: flex container to fill the image ──
                  alignItems: { xs: "stretch", lg: "unset" },
                  justifyContent: { xs: "center", lg: "unset" },
                  backgroundColor: { xs: "#020b13", lg: "transparent" },
                }}
              >
                {/* Mobile & Tablet img tag - objectFit:contain shows full image without cropping */}
                <Box
                  component="img"
                  src={img}
                  alt={`carousel-${idx}`}
                  sx={{
                    display: { xs: "block", lg: "none" },
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    filter: "brightness(1.05) contrast(1.05) saturate(1.1)",
                  }}
                />
              </Box>
            ))}

            {/* Navigation Buttons - FIXED for mobile alignment and button visibility */}
            <IconButton
              onClick={handlePrev}
              aria-label="previous banner"
              sx={{
                position: "absolute",
                left: 10,
                top: { xs: "50%", sm: "50%" },
                transform: "translateY(-50%)",
                zIndex: 10,
                color: "#fff",
                background: {
                  xs: "rgba(59, 130, 246, 0.25)",
                  sm: "rgba(255, 255, 255, 0.15)"
                },
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                "&:hover": {
                  background: {
                    xs: "rgba(59, 130, 246, 0.35)",
                    sm: "rgba(255, 255, 255, 0.25)"
                  },
                  transform: "translateY(-50%) scale(1.1)",
                },
                "&:active": {
                  transform: "translateY(-50%) scale(0.95)",
                },
                "&:focus": {
                  outline: "none",
                  background: {
                    xs: "rgba(59, 130, 246, 0.25)",
                    sm: "rgba(255, 255, 255, 0.15)"
                  },
                },
                "&:focus-visible": {
                  outline: "none",
                },
                transition: "all 0.3s ease",
              }}
            >
              <ChevronLeft size={24} />
            </IconButton>

            <IconButton
              onClick={handleNext}
              aria-label="next banner"
              sx={{
                position: "absolute",
                right: 10,
                top: { xs: "50%", sm: "50%" },
                transform: "translateY(-50%)",
                zIndex: 10,
                color: "#fff",
                background: {
                  xs: "rgba(59, 130, 246, 0.25)",
                  sm: "rgba(255, 255, 255, 0.15)"
                },
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                "&:hover": {
                  background: {
                    xs: "rgba(59, 130, 246, 0.35)",
                    sm: "rgba(255, 255, 255, 0.25)"
                  },
                  transform: "translateY(-50%) scale(1.1)",
                },
                "&:active": {
                  transform: "translateY(-50%) scale(0.95)",
                },
                "&:focus": {
                  outline: "none",
                  background: {
                    xs: "rgba(59, 130, 246, 0.25)",
                    sm: "rgba(255, 255, 255, 0.15)"
                  },
                },
                "&:focus-visible": {
                  outline: "none",
                },
                transition: "all 0.3s ease",
              }}
            >
              <ChevronRight size={24} />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* ENHANCED TAGLINE MARQUEE */}
      <Box
        sx={{
          width: "100%",
          background: "linear-gradient(90deg, #3a49d6 0%, #1d4ed8 50%, #3a49d6 100%)",
          overflow: "hidden",
          py: { xs: 0.8, md: 1.5 },
          borderTop: "1px solid rgba(255,255,255,0.15)",
          borderBottom: "1px solid rgba(255,255,255,0.15)",
          display: 'flex',
          position: 'relative',
          mb: { xs: 2.5, md: 4 },
          boxShadow: "0 10px 40px rgba(58, 73, 214, 0.25)",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "50%",
            height: "100%",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
            animation: `${shine} 6s infinite ease-in-out`,
            zIndex: 1
          }
        }}
      >
        {/* Floating Background Icons */}
        <Box sx={{ position: 'absolute', left: '10%', top: '20%', opacity: 0.1, color: '#fff', animation: `${floating} 3s infinite ease-in-out` }}>
          <Stethoscope size={isMobileScreen ? 16 : 24} />
        </Box>
        <Box sx={{ position: 'absolute', right: '15%', bottom: '20%', opacity: 0.1, color: '#fff', animation: `${floating} 4s infinite ease-in-out` }}>
          <Zap size={isMobileScreen ? 14 : 20} />
        </Box>
        <Box sx={{ position: 'absolute', left: '40%', bottom: '10%', opacity: 0.08, color: '#fff', animation: `${floating} 5s infinite ease-in-out` }}>
          <Star size={isMobileScreen ? 12 : 18} />
        </Box>

        <Box
          sx={{
            display: "flex",
            width: "max-content",
            animation: `${marqueeScroll} 40s linear infinite`,
            "&:hover": {
              animationPlayState: "paused",
            },
          }}
        >
          {[...Array(4)].map((_, repeat) =>
            [
              {
                icon: <BadgeCheck size={isMobileScreen ? 12 : 16} style={{ color: '#ffcc00' }} />,
                label: <>India&apos;s Leading&nbsp;<span style={{ color: '#ffcc00' }}>Doctor&apos;s Lending Platform</span></>
              },
              {
                icon: <Star size={isMobileScreen ? 12 : 16} style={{ color: '#ffcc00' }} />,
                label: <><span style={{ color: '#ffcc00' }}>11,000+</span>&nbsp;Happy Clients</>
              },
              {
                icon: <Zap size={isMobileScreen ? 12 : 16} style={{ color: '#ffcc00' }} />,
                label: <><span style={{ color: '#ffcc00' }}>1,100+ Cr</span>&nbsp;Loans Disbursed</>
              },
              {
                icon: <BadgeCheck size={isMobileScreen ? 12 : 16} style={{ color: '#ffcc00' }} />,
                label: <><span style={{ color: '#ffcc00' }}>40+</span>&nbsp;Lenders</>
              },
              {
                icon: <MapPinPlusInsideIcon size={isMobileScreen ? 12 : 16} style={{ color: '#ffcc00' }} />,
                label: <><span style={{ color: '#ffcc00' }}>600+</span>&nbsp;Locations Served</>
              },
            ].map((item, j) => (
              <Box key={`${repeat}-${j}`} sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, md: 3 }, px: { xs: 2, md: 4 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {item.icon}
                  <Typography
                    sx={{
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: { xs: "0.75rem", md: "1.05rem" },
                      whiteSpace: "nowrap",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      fontFamily: 'Poppins',
                      textShadow: "0 2px 4px rgba(0,0,0,0.1)"
                    }}
                  >
                    {item.label}
                  </Typography>
                </Box>
                <Box sx={{ color: 'rgba(255, 204, 0, 0.5)', fontSize: { xs: '0.9rem', md: '1.2rem' }, fontWeight: 900 }}>•</Box>
              </Box>
            ))
          )}
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
                <span style={{ color: "#38bdf8" }}></span> Startup Incubated with
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
                  src="/iiml.webp"
                  alt="IIM Lucknow Logo"
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
                  src="/startuplogo.webp"
                  alt="Startup India Logo"
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
              🚀 Access the Right Loan, faster
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
              Smarter Borrowing Starts Here
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
              Access same-day approvals, competitive rates from 10.5% per annum, and financing structured around your goals.
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
                🤝 Trusted by 11,000+ clients across India
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
            ✨ Start Your Application in Under 3 Minutes
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
                p: ".5rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: { xs: 1.5, sm: 2 },
                  width: "100%",
                }}
              >
                {/* Apply Now Button */}
                <Button
                  component={Link}
                  to="/application-form"
                  sx={{
                    bgcolor: "#3a49d6",
                    color: "#FFFFFF",
                    fontWeight: "600",
                    "&:hover": {
                      bgcolor: "#2d3db5",
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 25px rgba(50, 68, 230, 0.4)",
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
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: "0 4px 15px rgba(50, 68, 230, 0.2)",
                  }}
                >
                  Apply Now
                </Button>

                {/* Eligibility Check Button */}
                <Button
                  variant="contained"
                  onClick={() =>
                  (window.location.href =
                    "https://finwise-eligibility.netlify.app/")
                  }
                  sx={{
                    bgcolor: "#3a49d6",
                    color: "#FFFFFF",
                    fontWeight: "600",
                    "&:hover": {
                      bgcolor: "#2d3db5",
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 25px rgba(50, 68, 230, 0.4)",
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
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: "0 4px 15px rgba(50, 68, 230, 0.2)",
                  }}
                  fullWidth={false}
                >
                  Check Eligibility
                </Button>

                {/* Send Query Button */}
                <Button
                  variant="contained"
                  onClick={handleSendQueryClick}
                  sx={{
                    bgcolor: "#3a49d6",
                    color: "#FFFFFF",
                    fontWeight: "600",
                    "&:hover": {
                      bgcolor: "#2d3db5",
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 25px rgba(50, 68, 230, 0.4)",
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
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: "0 4px 15px rgba(50, 68, 230, 0.2)",
                  }}
                  fullWidth={false}
                >
                  Send Query
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
          aria-label="call support"
          sx={{
            bottom: { xs: "40px", md: "50px", lg: "10px" },
            right: { xs: "20px", md: "25px", lg: "30px" },
          }}
        >
          <Phone size={24} />
        </FloatingCallButton>

        {/* Floating Video Preview - Small Box */}
        {isVideoPreviewVisible && !isVideoPreviewDismissed && (
          <FloatingVideoButton onClick={handleVideoClick}>
            {videos.map((video, idx) => (
              <Fade key={video} in={currentVideoIdx === idx} timeout={1000}>
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    display: currentVideoIdx === idx ? "block" : "none",
                  }}
                >
                  <VideoPreview
                    src={video}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </Box>
              </Fade>
            ))}
            <PlayOverlay className="play-icon">
              <Play size={20} fill="currentColor" />
            </PlayOverlay>

            {/* Small close button on the preview card itself */}
            <IconButton
              onClick={handleDismissPreview}
              sx={{
                position: "absolute",
                top: 6,
                right: 6,
                zIndex: 10,
                color: "#fff",
                backgroundColor: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(4px)",
                width: 24,
                height: 24,
                p: 0,
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.7)",
                  transform: "scale(1.1)",
                },
                transition: "all 0.2s ease",
              }}
            >
              <X size={14} />
            </IconButton>
          </FloatingVideoButton>
        )}

        {/* Video Zoom Modal */}
        <Dialog
          open={isVideoModalOpen}
          onClose={handleVideoClose}
          maxWidth="lg"
          fullWidth
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 500 }}
          PaperProps={{
            sx: {
              backgroundColor: "transparent",
              boxShadow: "none",
              overflow: "visible",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
          }}
        >
          <DialogContent
            sx={{
              p: 0,
              position: "relative",
              width: "100%",
              maxWidth: "1000px",
              aspectRatio: "16/9",
              backgroundColor: "#000",
              borderRadius: "20px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            }}
          >
            {secondsRemaining > 0 ? (
              <Box
                sx={{
                  position: "absolute",
                  top: 15,
                  right: 15,
                  zIndex: 10,
                  color: "#fff",
                  backgroundColor: "rgba(0,0,0,0.6)",
                  backdropFilter: "blur(4px)",
                  px: 2,
                  py: 1,
                  borderRadius: "20px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  fontFamily: "Poppins",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                Skip in {secondsRemaining}s
              </Box>
            ) : (
              <IconButton
                onClick={handleVideoClose}
                sx={{
                  position: "absolute",
                  top: 15,
                  right: 15,
                  zIndex: 10,
                  color: "#fff",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  backdropFilter: "blur(4px)",
                  "&:hover": {
                    backgroundColor: "rgba(0,0,0,0.7)",
                    transform: "rotate(90deg)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <X size={24} />
              </IconButton>
            )}

            {/* Navigation Arrows */}
            {secondsRemaining === 0 && (
              <>
                <IconButton
                  onClick={handlePrevVideo}
                  sx={{
                    position: "absolute",
                    left: 20,
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 10,
                    color: "#fff",
                    backgroundColor: "rgba(0,0,0,0.3)",
                    backdropFilter: "blur(4px)",
                    "&:hover": {
                      backgroundColor: "rgba(16, 185, 129, 0.6)",
                      transform: "translateY(-50%) scale(1.1)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <ChevronLeft size={32} />
                </IconButton>

                <IconButton
                  onClick={handleNextVideo}
                  sx={{
                    position: "absolute",
                    right: 20,
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 10,
                    color: "#fff",
                    backgroundColor: "rgba(0,0,0,0.3)",
                    backdropFilter: "blur(4px)",
                    "&:hover": {
                      backgroundColor: "rgba(16, 185, 129, 0.6)",
                      transform: "translateY(-50%) scale(1.1)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <ChevronRight size={32} />
                </IconButton>
              </>
            )}

            <video
              key={videos[currentVideoIdx]}
              src={videos[currentVideoIdx]}
              controls
              autoPlay
              onEnded={handleNextVideo}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />

            {/* Video Selector/Pagination in Modal */}
            <Box
              sx={{
                position: "absolute",
                bottom: 20,
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: 1.5,
                zIndex: 5,
                backgroundColor: "rgba(0,0,0,0.6)",
                px: 2.5,
                py: 1.2,
                borderRadius: "30px",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.15)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                pointerEvents: secondsRemaining > 0 ? "none" : "auto",
                opacity: secondsRemaining > 0 ? 0.5 : 1,
                transition: "opacity 0.3s ease",
              }}
            >
              {videos.map((_, idx) => (
                <Box
                  key={idx}
                  onClick={() => secondsRemaining === 0 && setCurrentVideoIdx(idx)}
                  sx={{
                    width: currentVideoIdx === idx ? 28 : 10,
                    height: 10,
                    borderRadius: "5px",
                    backgroundColor: currentVideoIdx === idx ? "#10b981" : "rgba(255,255,255,0.35)",
                    cursor: secondsRemaining > 0 ? "default" : "pointer",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      backgroundColor: currentVideoIdx === idx ? "#10b981" : "#fff",
                      transform: secondsRemaining > 0 ? "none" : "scale(1.2)",
                    },
                  }}
                />
              ))}
            </Box>
          </DialogContent>
        </Dialog>
      </Container >

    </Box >
  );
};

export default SaaSStarterLanding;