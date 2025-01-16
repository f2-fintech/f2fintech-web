import React from "react";

import { Box, Container, Typography } from "@mui/material";

import Calculator from "../calculator/Calculator";
import Eligibility from "../../components/eligibility/Eligibility";
import Advantages from "../../components/advantages/Advantages";
import { bLadvantagesData } from "../data/Data.jsx";
import Apply from "../apply/Apply";

const UnsecuredLoan = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "40px",
          backgroundColor: "#000000",
         
          borderRadius: "10px",
          margin: "40px auto",
          maxWidth: "97%",
         
        }}
      >
        <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <img
            src="/ubusiness78.gif"
            alt="Unsecured Loan"
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
            id="about-unsecured-loans"
            component="h2"
            sx={{
              fontSize: "2.5vw",
              fontWeight: 650,
              marginBottom: "20px",
              marginLeft: "12px",
              color: "#ffffff",
              fontFamily:'DM sans',
              padding: "10px 0",
              textAlign: "start",
            }}
          >
            About Our Unsecured Loans
          </Typography>
          <Typography
            component="h5"
            sx={{
              fontSize: "1.3rem",
              lineHeight: 1.6,
              color: "#ffffff",
              fontFamily:'poppins',
              marginBottom: "20px",
              textAlign: "justify",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            Our unsecured loans are designed to help you meet your financial
            needs without the need for collateral. With quick approval processes
            and minimal documentation, you can get up to ₹25 lakhs in just 5
            minutes.
          </Typography>
          <Typography
            component="h5"
            sx={{
              fontSize: "1.3rem",
              lineHeight: 1.6,
              color: "#ffffff",
              fontFamily:'poppins',
              marginBottom: "20px",
              textAlign: "justify",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            Whether you need funds for personal use, medical expenses, or any
            other urgent requirement, we provide flexible loan options to meet
            your specific needs.
          </Typography>
          <Typography
            component="h5"
            sx={{
              fontSize: "1.3rem",
              lineHeight: 1.6,
              color: "#ffffff",
              fontFamily:'poppins',
              marginBottom: "20px",
              textAlign: "justify",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            Apply now and get the financial support you need without any hassle.
          </Typography>
        </Container>
      </Box>
      <Apply />
      <Advantages advantagesData={bLadvantagesData} />
      <Eligibility />
      <Calculator />
    </>
  );
};

export default UnsecuredLoan;
