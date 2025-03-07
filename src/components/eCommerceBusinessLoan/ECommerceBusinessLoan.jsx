import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Calculator from "../calculator/Calculator";
import Advantages from "../../components/advantages/Advantages";
import { bLadvantagesData } from "../data/Data.jsx";
import Apply from "../apply/Apply";
import LendingPartners from "../lendingpartners/Lendingpartners";
import Eligibility from "../../components/eligibility/Eligibility";

const ECommerceBusinessLoan = () => {
  const theme = useTheme ();
  return (
    <>
     <Box
  sx={{
    display: "flex",
    flexDirection: { xs: "column", md: "row" }, // Stack in mobile, row in desktop
    alignItems: "center",
    justifyContent: "space-between",
    padding: { xs: "20px", md: "40px" }, // Adjust padding for smaller screens
    fontFamily: "DM sans",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    borderRadius: "10px",
    margin: { xs: "20px auto", md: "40px auto" }, // Adjust margin for mobile
    maxWidth: "97%",
  }}
>
  <Container
    sx={{
      flex: 1,
      paddingLeft: { xs: "10px", md: "20px" }, // Reduce left padding on mobile
      textAlign: "justify",
    }}
  >
    <Typography
      id="about-ecommerce-business-loans"
      component="h2"
      sx={{
        fontFamily: "Poppins",
        fontSize: { xs: "6vw", sm: "4vw", md: "2.5vw" },
        fontWeight: 650,
        marginBottom: "20px",
        marginLeft: "12px",
        padding: "10px 0",
        textAlign: "start",
        color: theme.palette.secondary.main
      }}
    >
      About Our E-Commerce Business Loans
    </Typography>
    <Typography
      component="h5"
      sx={{
        fontSize: { xs: "1rem", md: "1.3rem" }, // Adjust font size for mobile
        lineHeight: 1.6,
         fontFamily: "Poppins",
        marginBottom: "20px",
        textAlign: "justify",
        padding: "10px",
        borderRadius: "10px",
      }}
    >
      Our e-commerce business loans are designed to help online entrepreneurs
      grow and expand their businesses effortlessly. With quick approval
      processes and minimal documentation, you can get up to ₹40 lakhs in just
      5 minutes.
    </Typography>
    <Typography
      component="h5"
      sx={{
        fontSize: { xs: "1rem", md: "1.3rem" },
        lineHeight: 1.6,
         fontFamily: "Poppins",
        marginBottom: "20px",
        textAlign: "justify",
        padding: "10px",
        borderRadius: "10px",
      }}
    >
      Whether you need funds for inventory, marketing, or working capital, we
      provide flexible loan options to meet your specific needs.
    </Typography>
    <Typography
      component="h5"
      sx={{
        fontSize: { xs: "1rem", md: "1.3rem" },
        lineHeight: 1.6,
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
  <Box
    sx={{
      flex: 1,
      display: "flex",
      justifyContent: "center",
      marginTop: { xs: "20px", md: "0" }, // Add space above image on mobile
    }}
  >
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
