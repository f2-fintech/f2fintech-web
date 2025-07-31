import React from "react";
import { Box, Typography, Button, Container, useTheme } from "@mui/material";

const CareersSection = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #f5f7ff 0%, #f0f4ff 100%)",
        "&:before": {
          content: '""',
          position: "absolute",
          top: -50,
          right: 100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "rgba(50, 68, 230, 0.08)",
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              mb: 3,
              background: "linear-gradient(90deg, #000 0%, #000 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              fontWeight: 700,
              fontFamily: "Poppins, sans-serif",
              fontSize: {
                xs: "1.875rem",
                md: "3.25rem",
              },
              lineHeight: 1.2,
            }}
          >
            Grow{" "}
            <span
              style={{
                color: "#3244e6",
              }}
            >
              With Us
            </span>
          </Typography>

          <Typography
            variant="h3"
            sx={{
              mb: 4,
              color: "#3244e6",
              fontWeight: 600,
              fontFamily: "urbanist, sans-serif",
              fontSize: { xs: "1.5rem", sm: "1.8rem", md: "1.7rem" },
              lineHeight: 1.3,
            }}
          >
            Explore Careers at F2 Fintech
          </Typography>
          {/* Modern Card Container */}
          <Box
            sx={{
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(12px)",
              borderRadius: "24px",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              p: { xs: 3, md: 6 },
              width: "100%",
              maxWidth: "900px",
              height: "auto",
              boxShadow: "0 20px 40px rgba(50, 68, 230, 0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 25px 50px rgba(50, 68, 230, 0.15)",
              },
            }}
          >
            {/* Decorative Elements */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "10s0%",
                overflow: "hidden",
                borderRadius: "24px",
                zIndex: -1,
              }}
            />
            {/* Main Content */}
            <Typography
              variant="h3"
              sx={{
                mb: 3,
                color: "#444",
                fontWeight: 400,
                fontFamily: "verdana, sans-serif",
                fontSize: { xs: "16px", sm: "18px" },
                lineHeight: 1.4,
                maxWidth: "800px",
                mx: "auto",
              }}
            >
              Join a fast-growing fintech company that's revolutionizing
              financial access through innovation and technology.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mb: 6,
                fontWeight: 400,
                color: "#444",
                maxWidth: "600px",
                mx: "auto",
                fontFamily: "verdana, sans-serif",
                fontSize: { xs: "16px", sm: "18px" },
                lineHeight: 1.4,
              }}
            >
              We're building a team of passionate individuals who want to make a
              real impact in the financial world. Your journey starts here.
            </Typography>

            {/* Animated Button */}
            <Button
              variant="contained"
              size="large"
              href="https://f2fintech-ats.netlify.app/f2fintech/all-posted-jobs"
              target="_blank"
              sx={{
                borderRadius: "30px",
                background: theme.palette.secondary.main,
                color: "#fff",
                fontWeight: 600,
                fontSize: { xs: "1rem", md: "1.1rem" },
                px: { xs: 5, md: 3.5 },
                py: { xs: 1.5, md: 1.5 },
                textTransform: "none",
                boxShadow: "0 10px 20px rgba(50, 68, 230, 0.3)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                fontFamily: "Poppins, sans-serif",
                position: "relative",
                overflow: "hidden",
                "&:before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: -"100%",
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                  transition: "0.5s",
                },
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 15px 30px rgba(50, 68, 230, 0.4)",
                  background: theme.palette.secondary.main,

                  "&:before": {
                    left: "100%",
                  },
                },
              }}
            >
              View Open Positions
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CareersSection;
