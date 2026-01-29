"use client";

import {
  Box,
  Typography,
  Container,
  Button,
  IconButton,
  Avatar,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/system";
import {
  Phone,
  Users,
} from "lucide-react";
import ButtonComp from "../common/button/Button";

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

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: { xs: "auto", md: "100vh" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: "#f4faff",
        backgroundImage: "radial-gradient(at 50% 50%, #f4faff 0%, #eef6ff 100%)",
        pt: { xs: 12, md: 0 },
        pb: { xs: 10, md: 5 },
      }}
    >
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
                gap: { xs: 1, sm: 2 },
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(37, 99, 235, 0.1)",
                borderRadius: "50px",
                px: { xs: 2, sm: 4 },
                py: 1.5,
                boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                transition: "transform 0.3s ease",
                "&:hover": { transform: "translateY(-2px)" }
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  color: "#2563eb",
                  fontWeight: 500,
                  fontSize: { xs: "0.85rem", sm: "1.1rem" },
                  fontFamily: "Poppins",
                  whiteSpace: "nowrap"
                }}
              >
                Startup Incubated with
              </Typography>
              <Box
                component="img"
                src="/iiml.jpeg"
                sx={{ height: { xs: 20, sm: 28 }, width: "auto" }}
              />

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
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 500,
                    fontSize: { xs: "0.7rem", sm: "0.75rem" },
                    fontFamily: "'Inter', 'Segoe UI', sans-serif",
                    color: "rgba(0, 0, 0, 0.75)",
                    letterSpacing: "0.2px",
                    whiteSpace: "nowrap"
                  }}
                >
                  As seen on
                </Typography>

                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "0.7rem", sm: "0.75rem" },
                    fontFamily: "'Poppins', sans-serif",
                    background: "linear-gradient(90deg, #1a1a1a, #333)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    letterSpacing: "0.3px",
                    whiteSpace: "nowrap"
                  }}
                >
                  Shark Tank India
                </Typography>
              </Box>

              <Box
                sx={{
                  position: "relative",
                  background: "linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 179, 0, 0.1))",
                  color: "rgba(0, 0, 0, 0.85)",
                  borderRadius: "12px",
                  px: 1.25,
                  py: 0.5,
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  border: "1px solid rgba(255, 215, 0, 0.2)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 179, 0, 0.2))",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                  },
                  "&:hover::before": {
                    opacity: 1,
                  },
                }}
              >
                <Box sx={{ position: "relative", zIndex: 1 }}>
                  SEASON - 05
                </Box>
              </Box>
            </Box>

          </Box>
          <div>
            {/* Heading */}
            <MainHeading
              variant="h1"
              sx={{
                animation: "fadeInUp 0.8s ease-out 0.2s forwards",
                opacity: 0,
                fontFamily: "'Outfit', 'Inter', sans-serif",
                mb: 2,
                width: "100%",
              }}
            >
              Reinventing Lending
              <HighlightedText> - Where India</HighlightedText> <br />
              <HighlightedText sx={{ background: "linear-gradient(135deg, #3244e6 0%, #10b981 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Buys, Sells & Scales Loans
              </HighlightedText>
            </MainHeading>
          </div>
          {/* Subheading Badge for "Phygital" */}
          <Typography
            sx={{
              fontSize: { xs: "0.9rem", sm: "1.2rem", md: "1.4rem" },
              fontWeight: 600,
              color: "#3244e6",
              px: 3,
              py: 0.5,
              borderRadius: "50px",
              mb: { xs: 2, sm: 4 },
              fontFamily: "Poppins",
              display: "inline-block",
              width: "100%",
              animation: "fadeInUp 0.8s ease-out 0.4s forwards",
              opacity: 0,
            }}
          >
            The First Phygital Marketplace
          </Typography>

          {/* Description */}
          <Typography
            variant="body1"
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
            needs.Discover smarter borrowing solutions tailored just for you.
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
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "center",
                alignItems: "center",
                gap: { xs: 1.5, sm: 2 }, // smaller gap on mobile
                width: "100%",
                maxWidth: { sm: "80%", md: "100%" }, // control width on different screens
                mx: "auto", // center horizontally
                my: { xs: 1, sm: 0 }, // vertical margin
              }}
            >
              {/* First Button (ButtonComp) */}
              <Box sx={{ width: { xs: "100%", sm: "auto" } }}>
                <ButtonComp />
              </Box>

              {/* Eligibility Check Button */}
              <Button
                variant="contained"
                onClick={
                  () =>
                  (window.location.href =
                    "https://finwise-eligibility.netlify.app/")
                  // ( window.location.href = "http://localhost:3000/" )
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
