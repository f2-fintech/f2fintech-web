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
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          padding: { xs: "20px", sm: "30px", md: "40px" },
          backgroundColor: "#000000",
          borderRadius: "10px",
          margin: { xs: "20px auto", md: "40px auto" },
          maxWidth: "97%",
        }}
      >
        <Container
          sx={{
            flex: 1,
            paddingLeft: { xs: "0px", sm: "10px", md: "20px" },
            textAlign: "justify",
          }}
        >
          <Typography
            id="about-unsecured-loans"
            component="h2"
            sx={{
              fontSize: { xs: "6vw", sm: "4vw", md: "2.5vw" },
              fontWeight: 650,
              marginBottom: "20px",
              marginLeft: { xs: "0px", md: "12px" },
              color: "#ffffff",
              fontFamily: "DM sans",
              padding: "10px 0",
              textAlign: { xs: "center", md: "start" },
            }}
          >
            About Our Unsecured Loans
          </Typography>
          <Typography
            component="h5"
            sx={{
              fontSize: { xs: "1rem", sm: "1.2rem", md: "1.3rem" },
              lineHeight: 1.6,
              color: "#ffffff",
              fontFamily: "Poppins",
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
              fontSize: { xs: "1rem", sm: "1.2rem", md: "1.3rem" },
              lineHeight: 1.6,
              color: "#ffffff",
              fontFamily: "Poppins",
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
              fontSize: { xs: "1rem", sm: "1.2rem", md: "1.3rem" },
              lineHeight: 1.6,
              color: "#ffffff",
              fontFamily: "Poppins",
              marginBottom: "20px",
              textAlign: "justify",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            Apply now and get the financial support you need without any hassle.
          </Typography>
        </Container>{" "}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            marginBottom: { xs: "20px", md: "0px" },
          }}
        >
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
      </Box>

      <Apply />
      <Advantages advantagesData={bLadvantagesData} />
      <Eligibility />
      <Calculator />
    </>
  );
};

export default UnsecuredLoan;
