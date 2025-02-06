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
    padding: { xs: "20px", sm: "30px", md: "40px" },
    backgroundColor: "#0000",
    borderRadius: "10px",
    margin: { xs: "20px auto", sm: "30px auto", md: "40px auto" },
    maxWidth: "100%",
    flexDirection: { xs: "column", md: "row" },
    textAlign: { xs: "center", md: "start" },
  }}
>  <Container
    sx={{
      flex: 1,
      paddingLeft: { xs: "0", md: "20px" },
      textAlign: "justify",
    }}
  >
    <Typography
      id="about-msme-loans"
      component="h2"
      sx={{
        fontFamily: "DM sans",
        fontSize: { xs: "6vw", sm: "4vw", md: "2.5vw" },
        fontWeight: 650,
        marginBottom: "20px",
        marginLeft: { xs: "0", md: "12px" },
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
        fontSize: { xs: "1rem", sm: "1.2rem", md: "1.3rem" },
        lineHeight: 1.6,
        fontFamily: "Poppins",
        color: "white",
        marginBottom: "20px",
        textAlign: "justify",
        padding: "10px",
        borderRadius: "10px",
      }}
    >
      Our MSME loans are tailored to support the growth and expansion of small
      and medium-sized enterprises. With fast approval processes and minimal
      documentation, you can get up to ₹50 lakhs in just 10 minutes.
    </Typography>
    <Typography
      component="h5"
      sx={{
        fontSize: { xs: "1rem", sm: "1.2rem", md: "1.3rem" },
        lineHeight: 1.6,
        fontFamily: "Poppins",
        color: "white",
        marginBottom: "20px",
        textAlign: "justify",
        padding: "10px",
        borderRadius: "10px",
      }}
    >
      Whether you need funds for inventory, equipment, or working capital, we
      provide flexible loan options to meet your specific needs.
    </Typography>
    <Typography
      component="h5"
      sx={{
        fontSize: { xs: "1rem", sm: "1.2rem", md: "1.3rem" },
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
  <Box
    sx={{
      flex: 1,
      display: "flex",
      justifyContent: "center",
      marginBottom: { xs: "20px", md: "0",
       },
    }}
  >
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

</Box>

      <Advantages advantagesData={bLadvantagesData} />
      <Calculator />
      <Eligibility />
    </>
  );
};

export default MsmeLoan;
