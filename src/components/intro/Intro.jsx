"use client";

import { Box, Typography, Container, Button, Avatar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { styled, keyframes } from "@mui/system";
import { Phone, Users } from "lucide-react";
import ButtonComp from "../common/button/Button";

/* ─────────── Keyframes ─────────── */
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const blobFloat = keyframes`
  0%, 100% { transform: translateY(0px) scale(1); }
  50%       { transform: translateY(-18px) scale(1.04); }
`;

const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const pulse = keyframes`
  0%   { box-shadow: 0 0 0 0 rgba(250, 79, 109, 0.55); }
  70%  { box-shadow: 0 0 0 12px rgba(250, 79, 109, 0); }
  100% { box-shadow: 0 0 0 0 rgba(250, 79, 109, 0); }
`;

const floatBtn = keyframes`
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-10px); }
`;

/* ─────────── Styled helpers ─────────── */
const Blob = styled(Box)(({ size = 420, top, left, right, bottom, color1, color2, delay = "0s" }) => ({
  position: "absolute",
  width: size,
  height: size,
  borderRadius: "62% 38% 54% 46% / 48% 62% 38% 52%",
  background: `radial-gradient(circle at 40% 40%, ${color1}, ${color2})`,
  opacity: 0.18,
  top,
  left,
  right,
  bottom,
  filter: "blur(1px)",
  animation: `${blobFloat} 7s ease-in-out infinite`,
  animationDelay: delay,
  zIndex: 0,
  pointerEvents: "none",
}));

const GlassBadge = styled(Box)(() => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  background: "rgba(255,255,255,0.72)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  border: "1px solid rgba(255,255,255,0.9)",
  borderRadius: 50,
  padding: "8px 20px",
  boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
  cursor: "default",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
  },
}));

const FloatingCallButton = styled(Box)(() => ({
  position: "fixed",
  bottom: 100,
  right: 28,
  zIndex: 2000,
  width: 56,
  height: 56,
  borderRadius: "50%",
  background: "linear-gradient(135deg, #FA4F6D, #BC3F7C)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  cursor: "pointer",
  boxShadow: "0 6px 24px rgba(250, 79, 109, 0.45)",
  animation: `${pulse} 2.5s ease-in-out infinite, ${floatBtn} 4s ease-in-out infinite`,
  transition: "transform 0.2s ease",
  "&:hover": { transform: "scale(1.12)" },
}));

/* ─────────── Main Component ─────────── */
const SaaSStarterLanding = () => {
  const theme = useTheme();

  const handleCallButtonClick = () => {
    const isMobile =
      /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      window.innerWidth <= 768;
    if (isMobile) {
      window.location.href = "tel:+14388010973";
    } else {
      window.open("https://wa.me/918810600135", "_blank");
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: { xs: "auto", md: "100vh" },
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        background: "linear-gradient(160deg, #fdf6ff 0%, #f0f6ff 50%, #fff5f7 100%)",
        fontFamily: "'Poppins', 'Inter', sans-serif",
      }}
    >


      {/* ── Background Blobs ── */}
      <Blob size={500} top="-80px" left="-120px" color1="#4a4fe6ff" color2="#416af3ff" delay="0s" />
      <Blob size={380} top="40px" right="-100px" color1="#3244e6" color2="#10b981" delay="2s" />
      <Blob size={320} bottom="-60px" left="30%" color1="#4a4fe6ff" color2="#416af3ff" delay="1s" />

      {/* ── Hero Section ── */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          pt: { xs: 6, md: 4 },
          pb: { xs: 4, md: 6 },
          position: "relative",
          zIndex: 1,
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", lg: "row" },
              alignItems: "center",
              gap: { xs: 4, lg: 6 },
            }}
          >
            {/* ── LEFT: Text Column ── */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", lg: "flex-start" },
                textAlign: { xs: "center", lg: "left" },
                animation: `${fadeInUp} 0.8s ease-out forwards`,
              }}
            >
              {/* Badges Row */}
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1.5,
                  justifyContent: { xs: "center", lg: "flex-start" },
                  mb: 3,
                }}
              >
                {/* IIM-L / Startup Badge */}
                <GlassBadge>
                  <Box
                    component="img"
                    src="/iiml.jpeg"
                    sx={{ height: 22, width: "auto" }}
                  />
                  <Typography
                    sx={{
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      color: "#2563eb",
                      fontFamily: "Poppins",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Incubated at IIM-L
                  </Typography>
                </GlassBadge>

                <GlassBadge>
                  <Box
                    component="img"
                    src="/startuplogo.jpeg"
                    sx={{ height: 22, width: "auto" }}
                  />
                  <Typography
                    sx={{
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      color: "#10b981",
                      fontFamily: "Poppins",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Startup India
                  </Typography>
                </GlassBadge>
              </Box>

              {/* Shark Tank Pill */}
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  background: "linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,179,0,0.12))",
                  border: "1.5px solid rgba(255,193,7,0.45)",
                  borderRadius: "50px",
                  px: 2.5,
                  py: 0.75,
                  mb: 3,
                  backdropFilter: "blur(8px)",
                  animation: `${fadeInUp} 0.9s ease-out 0.1s both`,
                }}
              >
                <Typography sx={{ fontSize: "0.7rem", color: "rgba(0,0,0,0.7)", fontFamily: "Poppins", fontWeight: 500, whiteSpace: "nowrap" }}>
                  As seen on
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    fontFamily: "Poppins",
                    background: "linear-gradient(90deg, #1a1a1a 0%, #444 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    whiteSpace: "nowrap",
                  }}
                >
                  Shark Tank India
                </Typography>
                <Box
                  sx={{
                    background: "linear-gradient(135deg, #ffd700, #ffb300)",
                    color: "#000",
                    borderRadius: "8px",
                    px: 1,
                    py: 0.25,
                    fontSize: "0.6rem",
                    fontWeight: 800,
                    fontFamily: "Poppins",
                    letterSpacing: "0.5px",
                  }}
                >
                  SEASON 5
                </Box>
              </Box>

              {/* Main Heading */}
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.2rem", sm: "3rem", md: "3.6rem", lg: "4rem" },
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: "-0.03em",
                  color: "#0f0f1a",
                  fontFamily: "'Outfit', 'Poppins', sans-serif",
                  mb: 2,
                  animation: `${fadeInUp} 0.9s ease-out 0.2s both`,
                }}
              >
                Reinventing Lending{" "}
                <Box
                  component="span"
                  sx={{
                    background: "linear-gradient(90deg, #FA4F6D 0%, #BC3F7C 50%, #3244e6 100%)",
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: `${shimmer} 4s linear infinite`,
                  }}
                >
                  — Where India
                </Box>
                <br />
                <Box
                  component="span"
                  sx={{
                    background: "linear-gradient(135deg, #3244e6 0%, #10b981 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Buys, Sells &amp; Scales Loans
                </Box>
              </Typography>

              {/* Phygital Pill */}
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  background: "linear-gradient(135deg, #3244e6 0%, #10b981 100%)",
                  color: "#fff",
                  borderRadius: "50px",
                  px: { xs: 2.5, sm: 3.5 },
                  py: { xs: 1, sm: 1.25 },
                  mb: 3,
                  fontFamily: "Poppins",
                  fontWeight: 700,
                  fontSize: { xs: "0.9rem", sm: "1.05rem" },
                  letterSpacing: "0.3px",
                  boxShadow: "0 10px 30px rgba(50, 68, 230, 0.3)",
                  animation: `${fadeInUp} 0.9s ease-out 0.35s both`,
                }}
              >
                ✨ The First Phygital Marketplace
              </Box>

              {/* Description */}
              <Typography
                sx={{
                  fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                  color: "#4b5563",
                  fontFamily: "Poppins",
                  lineHeight: 1.75,
                  mb: 4,
                  maxWidth: 520,
                  animation: `${fadeInUp} 0.9s ease-out 0.45s both`,
                }}
              >
                Unlock your full financial potential with ease. Explore a wide range of trusted lending services designed to fit your unique needs. Discover smarter borrowing solutions tailored just for you.
              </Typography>

              {/* Social Proof + Buttons */}
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                  alignItems: "center",
                  justifyContent: { xs: "center", lg: "flex-start" },
                  animation: `${fadeInUp} 0.9s ease-out 0.55s both`,
                }}
              >
                {/* Avatar Row */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box sx={{ display: "flex" }}>
                    {["#FA4F6D", "#3244e6", "#10b981"].map((c, i) => (
                      <Avatar
                        key={i}
                        sx={{
                          bgcolor: c,
                          width: 34,
                          height: 34,
                          border: "2px solid #fff",
                          ml: i === 0 ? 0 : -1.2,
                          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        }}
                      />
                    ))}
                  </Box>
                </Box>

                {/* 40+ Lenders */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      background: "linear-gradient(135deg, #FA4F6D, #BC3F7C)",
                      borderRadius: "50%",
                      p: 0.8,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Users size={16} color="#fff" />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontFamily: "Poppins", fontSize: "0.9rem", lineHeight: 1.2 }}>
                      40+ Lender's offerings
                    </Typography>
                    <Typography sx={{ color: "#6b7280", fontFamily: "Poppins", fontSize: "0.75rem" }}>
                      Available 24/7
                    </Typography>
                  </Box>
                </Box>

                {/* CTA Buttons */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 1.5,
                    width: { xs: "100%", sm: "auto" },
                  }}
                >
                  <Box sx={{ width: { xs: "100%", sm: "auto" } }}>
                    <ButtonComp />
                  </Box>

                  <Button
                    variant="contained"
                    onClick={() => (window.location.href = "https://finwise-eligibility.netlify.app/")}
                    sx={{
                      background: "linear-gradient(135deg, #FA4F6D 0%, #BC3F7C 100%)",
                      color: "#fff",
                      fontWeight: 600,
                      px: { xs: 2.5, sm: 3 },
                      py: { xs: 1.2, sm: 1.5 },
                      fontSize: { xs: "0.9rem", sm: "1rem" },
                      borderRadius: "50px",
                      textTransform: "none",
                      fontFamily: "Poppins",
                      width: { xs: "100%", sm: "auto" },
                      minWidth: { xs: "100%", sm: "200px" },
                      boxShadow: "0 8px 28px rgba(250, 79, 109, 0.4)",
                      "&:hover": {
                        background: "linear-gradient(135deg, #e0445f, #a33570)",
                        boxShadow: "0 12px 36px rgba(250, 79, 109, 0.55)",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                    fullWidth={false}
                  >
                    Check Eligibility
                  </Button>
                </Box>
              </Box>
            </Box>

            {/* ── RIGHT: Shark Tank Hero Banner ── */}
            <Box
              sx={{
                flex: { lg: "0 0 50%" },
                width: { xs: "100%", lg: "50%" },
                position: "relative",
                animation: `${fadeInUp} 1s ease-out 0.3s both`,
                mb: "8%",
              }}
            >
              {/* Main Banner Card */}
              <Box
                sx={{
                  position: "relative",
                  borderRadius: { xs: "24px", md: "36px" },
                  overflow: "hidden",
                  boxShadow: "0 24px 80px rgba(0,0,0,0.18)",
                  aspectRatio: "16/9",
                  background: "linear-gradient(135deg, #1a1a2e 0%, #2d1b3d 100%)",
                }}
              >
                {/* Background image – Shark Tank image */}
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: "url('/new/sharktank.jpeg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />

                {/* Overlay gradient for text legibility */}
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(90deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)",
                    zIndex: 1,
                  }}
                />

                {/* Shark Tank Text */}
                <Box
                  sx={{
                    position: "absolute",
                    left: { xs: 20, md: 32 },
                    top: "60%",
                    transform: "translateY(-50%)",
                    zIndex: 2,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "0.8rem", sm: "1rem", md: "1.1rem" },
                      color: "rgba(255,255,255,0.88)",
                      fontFamily: "Poppins",
                      fontWeight: 400,
                      mb: 0.5,
                    }}
                  >
                    As Seen On
                  </Typography>

                  {/* SHARK TANK INDIA – Bold Stylized Text */}
                  <Box>
                    {["SHARK", "TANK", "INDIA"].map((word, i) => (
                      <Typography
                        key={word}
                        sx={{
                          fontSize: { xs: "2rem", sm: "2.8rem", md: "3.4rem" },
                          fontWeight: 900,
                          lineHeight: 1,
                          letterSpacing: "-0.02em",
                          fontFamily: "'Outfit', 'Poppins', sans-serif",
                          color: i === 2 ? "#FFD700" : i === 1 ? "#00BFFF" : "#ffffff",
                          textShadow: "0 2px 16px rgba(0,0,0,0.5)",
                          display: "block",
                          fontStyle: "italic",
                        }}
                      >
                        {word}
                      </Typography>
                    ))}
                  </Box>

                  <Box
                    sx={{
                      mt: 1.2,
                      display: "inline-flex",
                      alignItems: "center",
                      background: "linear-gradient(90deg, #FFD700, #FFB300)",
                      borderRadius: "8px",
                      px: 1.5,
                      py: 0.4,
                    }}
                  >
                    <Typography sx={{ fontSize: "0.65rem", fontWeight: 800, fontFamily: "Poppins", color: "#000", letterSpacing: "1px" }}>
                      SEASON 5
                    </Typography>
                  </Box>
                </Box>

                {/* Right side decorative golden shimmer */}
                <Box
                  sx={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: "55%",
                    // background: "linear-gradient(135deg, rgba(255,215,0,0.08) 0%, rgba(255,150,0,0.15) 100%)",
                    zIndex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* Decorative circles to mimic people silhouette area */}
                  <Box sx={{ display: "flex", gap: 2, alignItems: "flex-end", pb: 2 }}>
                    {[80, 100, 80].map((h, i) => (
                      <Box
                        key={i}
                        sx={{
                          width: { xs: 50, md: 70 },
                          height: { xs: h * 0.6, md: h },
                          borderRadius: "50% 50% 0 0",
                          background: `linear-gradient(180deg, rgba(255,215,0,${0.15 + i * 0.05}) 0%, rgba(255,150,0,0.25) 100%)`,
                          border: "2px solid rgba(255,215,0,0.3)",
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </Box>

              {/* ── Floating Download-App Pill ── */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: { xs: -18, md: -20 },
                  left: { xs: 16, md: 24 },
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  background: "linear-gradient(135deg, #FE747C 0%, #f1845c 100%)",
                  borderRadius: "50px",
                  px: 2.5,
                  py: 1.25,
                  boxShadow: "0 8px 32px rgba(254, 116, 124, 0.45)",
                  zIndex: 10,
                  minWidth: { xs: 220, sm: 260 },
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography sx={{ fontSize: "0.82rem", fontWeight: 700, color: "#fff", fontFamily: "Poppins", lineHeight: 1.2 }}>
                    Start Your Loan Journey
                  </Typography>
                  <Typography sx={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.8)", fontFamily: "Poppins" }}>
                    40+ lenders waiting
                  </Typography>
                </Box>
                <Box
                  sx={{
                    ml: "auto",
                    background: "#fff",
                    color: "#FA4F6D",
                    borderRadius: "50px",
                    px: 1.75,
                    py: 0.5,
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    fontFamily: "Poppins",
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                    "&:hover": { background: "#fff5f5" },
                    transition: "background 0.2s",
                  }}
                  onClick={() => (window.location.href = "https://finwise-eligibility.netlify.app/")}
                >
                  Get Started
                </Box>
              </Box>

              {/* ── Stats floating card (top-right) ── */}
              <Box
                sx={{
                  position: "absolute",
                  top: { xs: -16, md: -20 },
                  right: { xs: 8, md: 16 },
                  background: "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(14px)",
                  borderRadius: "18px",
                  p: { xs: 1.5, md: 2 },
                  boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                  border: "1px solid rgba(255,255,255,0.95)",
                  zIndex: 10,
                  minWidth: 130,
                }}
              >
                <Typography sx={{ fontSize: "1.5rem", fontWeight: 800, fontFamily: "Poppins", color: "#FA4F6D", lineHeight: 1 }}>
                  40+
                </Typography>
                <Typography sx={{ fontSize: "0.7rem", color: "#6b7280", fontFamily: "Poppins", mt: 0.25 }}>
                  Trusted Lenders
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box >

      {/* ── Floating Phone Button ── */}
      < FloatingCallButton onClick={handleCallButtonClick} >
        <Phone size={22} />
      </FloatingCallButton >
    </Box >
  );
};

export default SaaSStarterLanding;
