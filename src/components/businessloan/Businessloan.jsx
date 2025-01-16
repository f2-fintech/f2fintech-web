import React from "react";

import { Box, Container, Typography } from "@mui/material";
import Eligibility from "../../components/eligibility/Eligibility";
import Calculator from "../calculator/Calculator";
import Advantages from "../../components/advantages/Advantages";
import { bLadvantagesData } from "../data/Data.jsx";

const Businessloan = () => {
  // Scroll to the section when the component mounts
  // React.useEffect(() => {
  //   const hash = window.location.hash;
  //   if (hash) {
  //     const element = document.getElementById(hash.substring(1));
  //     if (element) {
  //       element.scrollIntoView({ behavior: "smooth" });
  //     }
  //   }
  // }, []);

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
        }}
      >
        <Container sx={{ flex: 1, paddingRight: "20px", textAlign: "justify" }}>
          <Typography
            id="about-business-loans"
            component="h2"
            sx={{
              fontFamily: "DM sans",
              fontSize: "2.5vw",
              fontWeight: 650,
              marginBottom: "20px",
              marginLeft: "12px",
              color: "#fffff",
              textShadow: "-1px 1px 5px rgba(0, 0, 0, 0.5)",
              padding: "10px 0",
              textAlign: "start",
            }}
          >
            About Our Business Loans
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
            Our business loans are designed to help you grow and expand your
            business effortlessly. With quick approval processes and minimal
            documentation, you can get up to ₹30 lakhs in just 5 minutes.
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
            Apply now and take your business to new heights.
          </Typography>
        </Container>
        <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <img
            src="/Business78.gif"
            alt="Business Loan"
            style={{
              width: "60%",
              maxWidth: "500px",
              height: "auto",
              borderRadius: "10px",
            }}
          />
        </Box>
      </Box>
      <Advantages advantagesData={bLadvantagesData} />
      <Calculator />
      <Eligibility />
    </>
  );
};

export default Businessloan;
