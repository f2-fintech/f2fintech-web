import React from "react";

import { Box, Container, Typography } from "@mui/material";

import Calculator from "../calculator/Calculator";
import Advantages from "../../components/advantages/Advantages";
import { bLadvantagesData } from "../data/Data.jsx";
import Apply from "../apply/Apply";
import LendingPartners from "../lendingpartners/Lendingpartners";
import Eligibility from "../../components/eligibility/Eligibility";

const ECommerceBusinessLoan = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "40px",
          backgroundColor: "#000000",
          fontFamily: "DM sans",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          borderRadius: "10px",
          margin: "40px auto",
          maxWidth: "97%",
        }}
      >
        <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <img
            src="/ecommerse.gif"
            alt="ECommerce Business Loan"
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
            id="about-ecommerce-business-loans"
            component="h2"
            sx={{
              fontSize: "2.5vw",
              fontWeight: 650,
              marginBottom: "20px",
              marginLeft: "12px",
              color: "#ffffff",
              fontFamily: "Poppins",
              padding: "10px 0",
              textAlign: "start",
            }}
          >
            About Our E-Commerce Business Loans
          </Typography>
          <Typography
            component="h5"
            sx={{
              fontSize: "1.3rem",
              lineHeight: 1.6,
              color: "#ffffff",
              fontFamily: "Poppins",
              marginBottom: "20px",
              textAlign: "justify",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            Our e-commerce business loans are designed to help online
            entrepreneurs grow and expand their businesses effortlessly. With
            quick approval processes and minimal documentation, you can get up
            to ₹40 lakhs in just 5 minutes.
          </Typography>
          <Typography
            component="h5"
            sx={{
              fontSize: "1.3rem",
              lineHeight: 1.6,
              color: "#ffffff",
              fontFamily: "Poppins",
              marginBottom: "20px",
              textAlign: "justify",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            Whether you need funds for inventory, marketing, or working capital,
            we provide flexible loan options to meet your specific needs.
          </Typography>
          <Typography
            component="h5"
            sx={{
              fontSize: "1.3rem",
              lineHeight: 1.6,
              color: "#ffffff",
              fontFamily: "Poppins",
              marginBottom: "20px",
              textAlign: "justify",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            Apply now and take your e-commerce business to new heights.
          </Typography>
        </Container>
      </Box>
      <Advantages advantagesData={bLadvantagesData} />
      <Calculator />
      <Apply />
      <LendingPartners />
      <Eligibility />
    </>
  );
};

export default ECommerceBusinessLoan;
