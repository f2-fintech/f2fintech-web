import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
  Fade,
  Slide,
} from "@mui/material";
import ChannelPartnerModal from "./ChannelPartnerModal";

export default function ChannelPartners() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const isIpadPro = useMediaQuery(
    "only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (-webkit-min-device-pixel-ratio: 2)"
  );

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#ffffff",
      }}
    >
      {/* Background Elements */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(135deg, #3244e6 0%, #2a38c4 100%)",
          zIndex: 0,
          "&::before": {
            content: '""',
            position: "absolute",
            top: "-30%",
            right: "-15%",
            width: {
              xs: "150px",
              sm: "200px",
              md: isIpadPro ? "220px" : "250px",
            },
            height: {
              xs: "150px",
              sm: "200px",
              md: isIpadPro ? "220px" : "250px",
            },
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: "-20%",
            left: "-8%",
            width: {
              xs: "100px",
              sm: "150px",
              md: isIpadPro ? "160px" : "180px",
            },
            height: {
              xs: "100px",
              sm: "150px",
              md: isIpadPro ? "160px" : "180px",
            },
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.05)",
          },
        }}
      />

      <Box
        sx={{
          background: "linear-gradient(135deg, #3244e6 0%, #2a38c4 100%)",
          minHeight: {
            xs: "60vh",
            sm: "40vh",
            md: isIpadPro ? "50vh" : "70vh",
          },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          p: {
            xs: 2,
            sm: 3,
            md: isIpadPro ? 3 : 4,
          },
          position: "relative",
          zIndex: 1,
          overflow: "hidden",
        }}
      >
        {/* Floating Shapes */}
        <Box
          sx={{
            position: "absolute",
            top: "15%",
            left: "8%",
            width: {
              xs: "40px",
              sm: "50px",
              md: isIpadPro ? "55px" : "60px",
            },
            height: {
              xs: "40px",
              sm: "50px",
              md: isIpadPro ? "55px" : "60px",
            },
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
            animation: "float 6s ease-in-out infinite",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "25%",
            right: "12%",
            width: {
              xs: "30px",
              sm: "35px",
              md: isIpadPro ? "38px" : "40px",
            },
            height: {
              xs: "30px",
              sm: "35px",
              md: isIpadPro ? "38px" : "40px",
            },
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.08)",
            animation: "float 4s ease-in-out infinite 1s",
          }}
        />

        <Container maxWidth="md">
          <Slide in={true} direction="down" timeout={800}>
            <Typography
              fontWeight="bold"
              sx={{
                color: "#fff",
                mb: {
                  xs: 2,
                  sm: 3,
                  md: isIpadPro ? 3 : 4,
                },
                fontFamily: "Poppins, sans-serif",
                fontSize: {
                  xs: "1.8rem",
                  sm: "2.2rem",
                  md: isIpadPro ? "2.4rem" : "2.8rem",
                  lg: "3.2rem",
                },
                lineHeight: 1.2,
                textShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                background: "linear-gradient(45deg, #fff 30%, #f0f4ff 90%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Become Our Channel Partner
            </Typography>
          </Slide>

          <Fade in={true} timeout={1000}>
            <Typography
              variant="h6"
              sx={{
                mb: {
                  xs: 3,
                  sm: 4,
                  md: isIpadPro ? 4 : 5,
                },
                color: "rgba(255, 255, 255, 0.95)",
                fontSize: {
                  xs: "0.95rem",
                  sm: "1.1rem",
                  md: isIpadPro ? "1.15rem" : "1.2rem",
                },
                lineHeight: 1.6,
                maxWidth: "100%",
                mx: "auto",
                fontFamily: "Inter, sans-serif",
                fontWeight: 300,
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                px: {
                  xs: 1,
                  sm: 0,
                },
              }}
            >
              Join hands with{" "}
              <strong
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 600,
                  background:
                    "linear-gradient(45deg, #ffd700 30%, #fff8dc 90%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  WebkitTextFillColor: "transparent",
                }}
              >
                F2 Fintech
              </strong>{" "}
              and unlock new growth opportunities in the financial ecosystem
            </Typography>
          </Fade>

          <Fade in={true} timeout={1200}>
            <Button
              variant="contained"
              onClick={() => setOpen(true)}
              sx={{
                borderRadius: "50px",
                background: "linear-gradient(45deg, #ffffff 0%, #f8faff 100%)",
                color: "#3244e6",
                fontWeight: 700,
                fontSize: {
                  xs: "1rem",
                  sm: "1.1rem",
                  md: isIpadPro ? "1.15rem" : "1.2rem",
                },
                px: {
                  xs: 4,
                  sm: 5,
                  md: isIpadPro ? 5 : 6,
                },
                py: {
                  xs: 1.5,
                  sm: 1.6,
                  md: isIpadPro ? 1.7 : 1.8,
                },
                textTransform: "none",
                boxShadow: "0 8px 25px rgba(255, 255, 255, 0.25)",
                transition: "all 0.3s ease",
                fontFamily: "Poppins, sans-serif",
                "&:hover": {
                  background:
                    "linear-gradient(45deg, #ffffff 0%, #e8edff 100%)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 12px 30px rgba(255, 255, 255, 0.35)",
                },
              }}
            >
              Apply Now
            </Button>
          </Fade>
        </Container>
      </Box>

      {/* Reusable Modal Component */}
      <ChannelPartnerModal open={open} onClose={() => setOpen(false)} />

      {/* Add floating animation */}
      <style>{`
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-15px); }
      }
    `}</style>
    </Box>
  );
}
