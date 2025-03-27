import React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import { keyframes, styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";
// Floating animation
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;
// Pulse animation for special elements
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
`;
const FloatingImage = styled("img")({
  animation: `${float} 4s ease-in-out infinite`,
  transition: "all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
});
const OTPSucess = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: theme.palette.background.default,
        padding: { xs: 2, md: 4 },
        transition: "background 0.5s ease",
        "&:hover": {
          background: theme.palette.background.default,
        },
      }}
    >
      <Grid
        container
        sx={{
          maxWidth: 1200,
          margin: "0 auto",
          backgroundColor: "white",
          borderRadius: 4,
          boxShadow: "0 20px 40px rgba(0, 114, 255, 0.15)",
          overflow: "hidden",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 20px 40px rgba(0, 114, 255, 0.15)",
            transform: "translateY(-5px)",
          },
        }}
      >
        {/* Left Side - Text Content */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            padding: { xs: 4, md: 6 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            transition: "all 0.3s ease",
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: theme.palette.secondary.main,
              fontWeight: 800,
              mb: 3,
              fontFamily: "Urbanist",
              fontSize: { xs: "2rem", md: "2.5rem" },
              lineHeight: 1.2,
            }}
          >
            Fintech
          </Typography>
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              sx={{
                color: "#333",
                fontWeight: 900,
                mb: 1,
                fontSize: { xs: "1.5rem", md: "2rem" },
                transition: "all 0.3s ease",
                fontFamily: "Urbanist",
              }}
            >
              Diagnosis: Hunger.
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: "#333",
                fontWeight: 900,
                fontSize: { xs: "1.5rem", md: "2rem" },
                transition: "all 0.3s ease",
                fontFamily: "Urbanist",
                "&:hover": {},
              }}
            >
              Prescription: Free snack & coffee!
            </Typography>
          </Box>
          <Box
            sx={{
              borderLeft: "3px solid #2c3ce3",
              pl: 3,
              mb: 4,
              py: 1,
              transition: "all 0.3s ease",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "#666",
                mb: 1,
                fontSize: "1.3rem",
                fontWeight: 500,
                fontFamily: "Urbanist",
                transition: "all 0.3s ease",
              }}
            >
              Your financial health matters too!
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#666",
                fontSize: "1.3rem",
                fontWeight: 500,
                transition: "all 0.3s ease",
                fontFamily: "Urbanist",
              }}
            >
              Enjoy your coffee while we secure your future.
            </Typography>
          </Box>
        </Grid>
        {/* Right Side - Image */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 4,
            backgroundColor: theme.palette.background.default,
            transition: "all 0.3s ease",
          }}
        >
          <FloatingImage
            src="/coffe2.png"
            alt="FinTech Illustration"
            sx={{
              maxWidth: "100%",
              height: "auto",
              maxHeight: 400,
              "&:hover": {
                transform: "scale(1) rotate(-20deg)",
                filter: "drop-shadow(0 15px 25px rgba(0, 114, 255, 0.2))",
              },
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default OTPSucess;
