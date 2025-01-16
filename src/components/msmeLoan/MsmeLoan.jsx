import React from "react";

import { Box, Container, Typography } from "@mui/material";

import Calculator from "../calculator/Calculator";
import Eligibility from "../../components/eligibility/Eligibility";
import Advantages from "../../components/advantages/Advantages";
import { bLadvantagesData } from "../data/Data.jsx";

const MsmeLoan = () => {
  // Scroll to the section when the component mounts

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "40px",
          backgroundColor: "#0000",
          borderRadius: "10px",
          margin: "40px auto",
          maxWidth: "100%",
          // boxShadow: "0 8px 16px #8a8a8a",
          // transition: "transform 0.3s ease",
          // "&:hover": {
          //   transform: "scale(1.05)",
          // },
        }}
      >
        <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <img
            src="/businessabout.gif"
            alt="MSME Loan"
            style={{
              width: "100%",
              maxWidth: "500px",
              height: "auto",
              borderRadius: "10px",
            }}
          />
        </Box>
        <Container sx={{ flex: 1, paddingLeft: "20px", textAlign: "justify" }}>
          <Typography
            id="about-msme-loans"
            component="h2"
            sx={{
              fontFamily: "DM sans",
              fontSize: "2.5vw",
              fontWeight: 650,
              marginBottom: "20px",
              marginLeft: "12px",
              color: "white",
              textShadow: "-1px 1px 5px rgba(0, 0, 0, 0.5)",
              padding: "10px 0",
              textAlign: "start",
            }}
          >
            About Our MSME Loans
          </Typography>
          <Typography
            component="h5"
            sx={{
              fontSize: "1.3rem",
              lineHeight: 1.6,
              fontFamily: "Poppins",
              color: "white",
              marginBottom: "20px",
              textAlign: "justify",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            Our MSME loans are tailored to support the growth and expansion of
            small and medium-sized enterprises. With fast approval processes and
            minimal documentation, you can get up to ₹50 lakhs in just 10
            minutes.
          </Typography>
          <Typography
            component="h5"
            sx={{
              fontSize: "1.3rem",
              lineHeight: 1.6,
              fontFamily: "Poppins",
              color: "white",
              marginBottom: "20px",
              textAlign: "justify",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            Whether you need funds for inventory, equipment, or working capital,
            we provide flexible loan options to meet your specific needs.
          </Typography>
          <Typography
            component="h5"
            sx={{
              fontSize: "1.3rem",
              lineHeight: 1.6,
              fontFamily: "Poppins",
              color: "white",
              marginBottom: "20px",
              textAlign: "justify",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            Apply now and elevate your MSME to new heights.
          </Typography>
        </Container>
      </Box>
      <Advantages advantagesData={bLadvantagesData} />
      <Calculator />
      <Eligibility />
    </>
  );
};

export default MsmeLoan;
