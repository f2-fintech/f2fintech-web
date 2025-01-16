import React from "react";

import { Box, Container, Typography } from "@mui/material";

import Calculator from "../calculator/Calculator";
import Apply from "../apply/Apply";
import Advantages from "../../components/advantages/Advantages";
import Eligibility from "../../components/eligibility/Eligibility";
import { bLadvantagesData } from "../data/Data.jsx";

const SmallBusinessLoan = () => {
  // Scroll to the section when the component mounts

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "40px",
          backgroundColor: "#000000 ",
          borderRadius: "10px",
          margin: "40px auto",
          maxWidth: "97%",
        }}
      >
        <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <img
            src="/smallbusiness.gif"
            alt="Small Business Loan"
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
            id="about-small-business-loans"
            component="h2"
            sx={{
              fontSize: "2.5vw",
              fontWeight: 650,

              marginBottom: "20px",
              marginLeft: "12px",
              color: "#ffffff",
              fontFamily: "DM sans",
              // textShadow: "-1px 1px 5px rgba(0, 0, 0, 0.5)",
              padding: "10px 0",
              textAlign: "start",
            }}
          >
            About Our Small Business Loans
          </Typography>
          <Typography
            component="h5"
            sx={{
              fontSize: "1.3rem",
              lineHeight: 1.6,
              color: "white",
              fontFamily: "Poppins",
              marginBottom: "20px",
              textAlign: "justify",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            Our small business loans are designed to help you grow and expand
            your business effortlessly. With quick approval processes and
            minimal documentation, you can get up to ₹20 lakhs in just 5
            minutes.
          </Typography>
          <Typography
            component="h5"
            sx={{
              fontSize: "1.3rem",
              lineHeight: 1.6,
              color: "white",
              fontFamily: "Poppins",
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
              color: "white",
              fontFamily: "Poppins",
              marginBottom: "20px",
              textAlign: "justify",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            Apply now and take your small business to new heights.
          </Typography>
        </Container>
      </Box>

      <Calculator />
      <Apply />
      <Advantages advantagesData={bLadvantagesData} />
      <Eligibility />
    </>
  );
};

export default SmallBusinessLoan;
