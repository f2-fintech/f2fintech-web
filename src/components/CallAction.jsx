import React from "react";
import { Box, Typography, Button, Link } from "@mui/material";
import ButtonComp from "./common/button/Button";
// import ButtonComp from "./common/button/Button";

const CallToAction = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(-45deg, #8217c3, #8217c3)",
        borderRadius: "20px",
        padding: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: "white",
        width: "90%",
        margin: "auto",
        height: "42vh",
        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
        marginTop: "15vh",
      }}
    >
      {/* Left Section */}
      <Box>
        <Typography variant="h1" fontWeight="bold" fontFamily="Poppins">
          Ready to get started?
        </Typography>
        <Typography
          variant="h3"
          sx={{ lineHeight: "1.4", fontSize: "18px", marginTop: "25px" }}
        >
          Elevate your borrowing journey and unlock smarter, simpler lending
          solutions with F2Fintech – your gateway to financial empowerment.
        </Typography>
      </Box>

      {/* Right Section - Button with Arrow */}
      <Box display="flex" alignItems="center" gap={2}>
        {/* Hand-drawn arrow image (optional) */}
        <Box
          component="img"
          src="/skecth1.svg" // Example arrow image, replace with your actual image
          alt="Arrow"
          sx={{ width: 80, height: 80 }}
        />
        {/* <Button 
        sx={{
          position: "relative",
          display: "inline-block",
          overflow: "hidden",
          padding: {
            xs: "0.3rem 1rem",
            sm: "0.5rem 1.5rem",
            md: "0.6rem 2rem",
          },
          width: { xs: "100%", sm: "0vw", md: "13vw" },
          borderRadius: "30px",
          color: "#000",
          fontFamily: "Poppins",
          fontWeight: "500",
          fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
          lineHeight: "1.5rem",
          textTransform: "none",
          border: "none",
          cursor: "pointer",
          backgroundColor: "white",
          "&:hover": {
            color: "#000",
          },
          "::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: "100%",
            width: "100%",
            height: "100%",
            backgroundColor: "#fff",
            transition: "left 0.4s ease",
            zIndex: -0,
          },
          "&:hover::before": {
            left: 0,
          },
          zIndex: 1,
        }}
      >
        <Link
          to="/application-form"
          style={{
            textDecoration: "none",
            color: "inherit",
            position: "relative",
            zIndex: 1,
            display: "inline-block",
          }}
        >
          Apply Now
        </Link>
      </Button> */}

        <ButtonComp />
      </Box>
    </Box>
  );
};

export default CallToAction;
