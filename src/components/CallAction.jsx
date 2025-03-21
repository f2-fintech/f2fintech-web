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
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: "white",
        width: "90%",
        margin: "auto",
        // height: "42vh",
        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
        marginTop: "2vh",
        flexDirection: { xs: "column", sm: "row" }, // Stacks elements on mobile, side-by-side on larger screens
        padding: { xs: "20px", sm: "40px" }, // Adjusts padding for smaller screens
      }}
    >
      {/* Left Section */}
      <Box
        sx={{
          textAlign: { xs: "center", sm: "left" }, // Center text on small screens, left-align on larger screens
          marginBottom: { xs: "20px", sm: "0" }, // Adds space below the left section on mobile
        }}
      >
        <Typography variant="h1" fontWeight="bold" fontFamily="Poppins">
          Ready to get started?
        </Typography>
        <Typography
          variant="h3"
          sx={{
            lineHeight: "1.4",
            fontSize: { xs: "16px", sm: "18px" },
            marginTop: "25px",
          }}
        >
          Elevate your borrowing journey and unlock smarter, simpler lending
          solutions with F2Fintech. Your Gateway To Financial Empowerment.
        </Typography>
      </Box>

      <Box display="flex" alignItems="center" gap={2}>
        <Box
          component="img"
          src="/skecth1.svg" // Example arrow image, replace with your actual image
          alt="Arrow"
          sx={{
            width: { xs: "60px", sm: "80px" },
            height: { xs: "60px", sm: "80px" },
          }}
        />
      </Box>
      <Box
        sx={{
          width: {
            md: "20vw",
            sm: "60vw",
          },
        }}
      >
        <ButtonComp />
      </Box>
    </Box>
  );
};

export default CallToAction;
