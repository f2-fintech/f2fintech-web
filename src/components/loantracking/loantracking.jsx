import React from "react";
import { Box, Button, Typography, Paper, useTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import LockIcon from "@mui/icons-material/Lock";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const injectStyles = `
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(1deg); }
}
@keyframes pulseGlow {
  0%, 100% { opacity: 0.25; filter: blur(50px); }
  50% { opacity: 0.45; filter: blur(75px); }
}
@keyframes pulseRing {
  0% { transform: scale(0.95); opacity: 0.8; }
  50% { transform: scale(1.1); opacity: 0.4; }
  100% { transform: scale(0.95); opacity: 0.8; }
}
@keyframes rotateSpinner {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

const Loan = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleBackToHome = () => {
    navigate("/");
  };

  const accent = "#3244e6";

  const dummySteps = [
    { label: "Application Submitted", desc: "Your request is registered", status: "completed", icon: <CheckCircleIcon sx={{ color: "#10b981" }} /> },
    { label: "Document Verification", desc: "Reviewing eligibility criteria", status: "active", icon: <RotateRightIcon sx={{ color: accent, animation: "rotateSpinner 2s infinite linear" }} /> },
    { label: "Credit Approval", desc: "Final sanction decision", status: "pending", icon: <LockIcon sx={{ color: "rgba(0,0,0,0.3)" }} /> },
    { label: "Disbursal", desc: "Funds transferred to account", status: "pending", icon: <LockIcon sx={{ color: "rgba(0,0,0,0.3)" }} /> },
  ];

  return (
    <>
      <Helmet>
        <title>Loan Tracker - Coming Soon | F2 Fintech</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <style dangerouslySetInnerHTML={{ __html: injectStyles }} />

      <Box
        sx={{
          backgroundColor: theme.palette.background.default || "#ffffff",
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: { xs: "2rem 1rem", md: "4rem 2rem" },
          position: "relative",
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        {/* Glow Effects */}
        <Box sx={{ position: "absolute", top: "-15%", left: "-10%", width: "45vw", height: "45vw", borderRadius: "50%",
          background: `radial-gradient(circle, ${accent}1c 0%, transparent 70%)`,
          animation: "pulseGlow 8s infinite ease-in-out", pointerEvents: "none", zIndex: 0 }} />
        <Box sx={{ position: "absolute", bottom: "-10%", right: "-10%", width: "45vw", height: "45vw", borderRadius: "50%",
          background: `radial-gradient(circle, ${accent}15 0%, transparent 70%)`,
          animation: "pulseGlow 10s infinite ease-in-out alternate", pointerEvents: "none", zIndex: 0 }} />

        {/* Content Container */}
        <Box
          sx={{
            maxWidth: "1150px",
            width: "100%",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1.1fr 0.9fr" },
            gap: { xs: "2.5rem", lg: "4.5rem" },
            alignItems: "center",
            zIndex: 2,
          }}
        >
          {/* Left Side: Mock Tracker Widget & Teaser Details */}
          <Box
            sx={{
              position: "relative",
              animation: "float 6s infinite ease-in-out",
            }}
          >
            {/* Glassmorphic Mock Card */}
            <Paper
              elevation={0}
              sx={{
                background: "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(50, 68, 230, 0.12)",
                borderRadius: "24px",
                padding: { xs: "1.5rem", sm: "2.5rem" },
                boxShadow: "0 20px 50px rgba(50, 68, 230, 0.06)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Coming Soon Glass Overlay */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "rgba(255, 255, 255, 0.35)",
                  backdropFilter: "blur(4px)",
                  WebkitBackdropFilter: "blur(4px)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 10,
                  transition: "all 0.3s ease",
                }}
              >
                <Box
                  sx={{
                    background: "linear-gradient(135deg, #2c3ce3 0%, #3244e6 100%)",
                    color: "white",
                    padding: "10px 24px",
                    borderRadius: "30px",
                    boxShadow: "0 8px 24px rgba(50, 68, 230, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    mb: 1,
                  }}
                >
                  <HourglassEmptyIcon sx={{ animation: "pulseRing 2s infinite" }} />
                  <Typography sx={{ fontWeight: 700, fontSize: "1rem", letterSpacing: "1.5px", fontFamily: "Poppins" }}>
                    UPCOMING FEATURE
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: "0.85rem",
                    color: "rgba(0,0,0,0.6)",
                    fontWeight: 500,
                    textAlign: "center",
                    maxWidth: "280px",
                    fontFamily: "Poppins",
                    lineHeight: 1.4,
                  }}
                >
                  We are finalising the secure loan integration engine. Stay tuned!
                </Typography>
              </Box>

              {/* Mock Dashboard Headers */}
              <Box sx={{ mb: 4, opacity: 0.6 }}>
                <Typography sx={{ fontSize: "0.8rem", fontWeight: 700, color: accent, letterSpacing: "2px", mb: 1, textTransform: "uppercase" }}>
                  Tracking ID: F2F-89240B
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, color: "black", fontFamily: "Poppins" }}>
                  Personal Loan Status
                </Typography>
              </Box>

              {/* Mock Stepper */}
              <Box sx={{ position: "relative", opacity: 0.7 }}>
                {dummySteps.map((step, idx) => (
                  <Box key={idx} sx={{ display: "flex", gap: "20px", mb: "24px", position: "relative" }}>
                    {/* Step Icon and Line */}
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <Box
                        sx={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          backgroundColor: step.status === "completed" ? "#e6fbf4" : step.status === "active" ? "#eef2ff" : "#f3f4f6",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          zIndex: 2,
                        }}
                      >
                        {step.icon}
                      </Box>
                      {idx < dummySteps.length - 1 && (
                        <Box
                          sx={{
                            width: "2px",
                            flexGrow: 1,
                            backgroundColor: step.status === "completed" ? "#10b981" : "#e5e7eb",
                            minHeight: "40px",
                            my: "4px",
                          }}
                        />
                      )}
                    </Box>
                    {/* Step Text */}
                    <Box sx={{ pt: "4px" }}>
                      <Typography
                        sx={{
                          fontSize: "0.95rem",
                          fontWeight: step.status === "active" ? 700 : 600,
                          color: step.status === "pending" ? "rgba(0,0,0,0.4)" : "black",
                          fontFamily: "Poppins",
                        }}
                      >
                        {step.label}
                      </Typography>
                      <Typography sx={{ fontSize: "0.8rem", color: "rgba(0,0,0,0.4)", mt: "2px", fontFamily: "Poppins" }}>
                        {step.desc}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Box>

          {/* Right Side: Copy/Features list & CTA */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: { xs: "center", lg: "flex-start" }, textAlign: { xs: "center", lg: "left" } }}>
            <Typography
              sx={{
                fontSize: { xs: "0.8rem", sm: "0.9rem" },
                fontWeight: 800,
                color: accent,
                letterSpacing: "4px",
                textTransform: "uppercase",
                mb: 1.5,
                fontFamily: "Poppins",
              }}
            >
              Loan Tracker
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: "2rem", sm: "3rem", lg: "3.5rem" },
                fontWeight: 900,
                color: "black",
                lineHeight: "1.15",
                mb: 3,
                fontFamily: "Poppins",
              }}
            >
              Coming <br />
              <span style={{ color: accent, textShadow: `0 0 40px ${accent}25` }}>Upcoming Soon!</span>
            </Typography>
            <Typography
              sx={{
                color: "rgba(0,0,0,0.6)",
                fontSize: "1rem",
                lineHeight: "1.7",
                mb: 4,
                maxWidth: 480,
                fontFamily: "Poppins",
              }}
            >
              We are building a smart, secure hub where you can track your application milestone-by-milestone, upload documents, and connect directly with credit team members in real-time.
            </Typography>

            {/* Feature Cards Grid */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: "1.5rem",
                width: "100%",
                maxWidth: "500px",
                mb: 5,
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.4)",
                  border: "1px solid rgba(0, 0, 0, 0.05)",
                  padding: "16px",
                  borderRadius: "16px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: { xs: "center", lg: "flex-start" },
                  textAlign: { xs: "center", lg: "left" },
                }}
              >
                <TrendingUpIcon sx={{ color: accent, mb: 1, fontSize: "1.8rem" }} />
                <Typography sx={{ fontWeight: 700, fontSize: "0.95rem", color: "black", mb: 0.5, fontFamily: "Poppins" }}>
                  Milestone Alerts
                </Typography>
                <Typography sx={{ fontSize: "0.75rem", color: "rgba(0,0,0,0.5)", fontFamily: "Poppins", lineHeight: 1.4 }}>
                  Stay updated with live status milestones from submission to disbursal.
                </Typography>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.4)",
                  border: "1px solid rgba(0, 0, 0, 0.05)",
                  padding: "16px",
                  borderRadius: "16px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: { xs: "center", lg: "flex-start" },
                  textAlign: { xs: "center", lg: "left" },
                }}
              >
                <CloudUploadIcon sx={{ color: accent, mb: 1, fontSize: "1.8rem" }} />
                <Typography sx={{ fontWeight: 700, fontSize: "0.95rem", color: "black", mb: 0.5, fontFamily: "Poppins" }}>
                  Document Vault
                </Typography>
                <Typography sx={{ fontSize: "0.75rem", color: "rgba(0,0,0,0.5)", fontFamily: "Poppins", lineHeight: 1.4 }}>
                  Upload requirements securely directly from the tracking dashboard.
                </Typography>
              </Paper>
            </Box>

            {/* Back Button */}
            <Button
              onClick={handleBackToHome}
              startIcon={<ArrowBackIcon />}
              sx={{
                backgroundColor: accent,
                color: "#fff",
                padding: "12px 30px",
                borderRadius: "30px",
                fontSize: "0.95rem",
                fontWeight: "600",
                textTransform: "none",
                fontFamily: "Poppins",
                boxShadow: `0 8px 24px ${accent}33`,
                "&:hover": {
                  backgroundColor: "#2c3ce3",
                  boxShadow: `0 12px 30px ${accent}44`,
                  transform: "translateY(-2px)",
                },
                transition: "all 0.2s ease-in-out",
              }}
            >
              Return to Portal
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Loan;
