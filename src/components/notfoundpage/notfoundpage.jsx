import React from "react";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import image from "/404page.gif";
// import caltheme from "/caltheme.png";
import { useTheme } from "@mui/material/styles";
import { Helmet } from "react-helmet-async";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/"); 
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Page Not Found - F2 Fintech</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: theme.palette.bg.black,
        height: {
          xs: "75vh",
          sm: "85vh",
          md: "100vh",
        },
        display: "flex",
        flexDirection: { xs: "column", md: "row" }, // Stack on small screens, row on larger
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* text content left */}
      <Box
        sx={{
          height: "90%",
          width: { xs: "100%", md: "50%" }, // Full width on mobile, 50% on larger screens
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            mt: { xs: 0, md: -15 },
            ml: { xs: 0, md: 25 },
            height: "auto",
            width: { xs: "80%", md: "35vw" },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "10vw", md: "4vw" }, // Adjust font size for mobile
              background: "linear-gradient(to right, #ffffff, #333333)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "Poppins",
              fontWeight: "550",
            }}
          >
            OOPS!
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "6vw", md: "2.5vw" }, // Adjust for smaller screens
              background: "linear-gradient(to right, #ffffff, #333333)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "Poppins",
              fontWeight: "550",
              mb: 1.5,
            }}
          >
            Page not found!
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "10vw", md: "4vw" },
              background: "linear-gradient(to right, #ffffff, #333333)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "Poppins",
              fontWeight: "550",
              lineHeight: "3rem",
              mb: 1.5,
            }}
          >
            404
          </Typography>
          <Button
          onClick={handleBackToHome}
            sx={{
              width: { xs: "52%", sm:'40%',  md: "13vw" }, // Responsive width
              borderRadius: "30px",
              padding: "0.5rem 1.5rem",
              color: theme.palette.whitetext.white,
              fontSize: { xs: "4vw", md: "1.1vw", sm:'2vh' }, // Adjust font size
              height:{sm:'6vh', md:'inherit', xs:'inherit' },
              fontFamily: "Poppins",
              fontWeight: "500",
              lineHeight: "1.5rem",
              textTransform: "none",
              border: "none",
              cursor: "pointer",
              backgroundColor: theme.palette.secondary.main,
              "&:hover": {
                color: "#818181",
                backgroundColor: theme.palette.secondary.main,
              },
            }}
          >
            Back to home
          </Button>
        </Box>
      </Box>
      {/* image section right */}
      <Box
        sx={{
          height: "90%",
          width: { xs: "100%", md: "50%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: {
            xs: "0vh",
            sm: "0vh",
            md: "30vh",
          },
        }}
      >
        <img
          src="/404page.gif"
          alt="404 not found"
          style={{ width: isMobile ? "70%" : "60%", maxWidth: "500px" }}
        />
      </Box>
    </Box>
    </>
  );
};

export default NotFoundPage;
