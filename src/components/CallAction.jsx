import React from "react";
import { Box, Typography, Button, Link } from "@mui/material";
import ButtonComp from "./common/button/Button";
// import ButtonComp from "./common/button/Button";

const CallToAction = () => {
  return (
    <Box
      sx={{
        background: "#3244e6",
        borderRadius: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: "white",
        flexDirection: { xs: "column", sm: "row" },
        padding: { xs: "20px", sm: "40px" },
        margin: "50px auto",
        width: "70vw",
      }}
    >
      {/* Left Section */}
      <Box
        sx={{
          textAlign: { xs: "center", sm: "left" }, // Center text on small screens, left-align on larger screens
          marginBottom: { xs: "20px", sm: "0" }, // Adds space below the left section on mobile
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: "1.875rem",
              md: "3.25rem",
            },
          }}
          fontWeight="bold"
          fontFamily="Poppins"
        >
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
        <ButtonComp isWhite={true} />
      </Box>
    </Box>
  );
};

export default CallToAction;
