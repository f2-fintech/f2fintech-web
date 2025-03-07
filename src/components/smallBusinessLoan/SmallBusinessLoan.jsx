import React from "react";

import { Box, Container, Typography,  } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Calculator from "../calculator/Calculator";
import Apply from "../apply/Apply";
import Advantages from "../../components/advantages/Advantages";
import Eligibility from "../../components/eligibility/Eligibility";
import { bLadvantagesData } from "../data/Data.jsx";

const SmallBusinessLoan = () => {
  // Scroll to the section when the component mounts
const theme = useTheme ();
  return (
    <>
     <Box
  sx={{
    
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: { xs: "20px", sm: "30px", md: "40px" },
    borderRadius: "10px",
    margin: { xs: "20px auto", sm: "30px auto", md: "40px auto" },
    maxWidth: "97%",
    flexDirection: { xs: "column", md: "row" },
    textAlign: { xs: "center", md: "start" },
  }}
>

  <Container
    sx={{
      flex: 1,
      paddingLeft: { xs: "0", md: "20px" },
      textAlign: "justify",
    }}
  >
    <Typography
      id="about-small-business-loans"
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
      About Our Small Business Loans
    </Typography>
    <Typography
      component="h5"
      sx={{
        fontSize: { xs: "1rem", sm: "1.2rem", md: "1.3rem" },
        lineHeight: 1.6,
        fontFamily: "Poppins",
        marginBottom: "20px",
        textAlign: "justify",
        padding: "10px",
        borderRadius: "10px",
      }}
    >
      Our small business loans are designed to help you grow and expand your
      business effortlessly. With quick approval processes and minimal
      documentation, you can get up to ₹20 lakhs in just 5 minutes.
    </Typography>
    <Typography
      component="h5"
      sx={{
        fontSize: { xs: "1rem", sm: "1.2rem", md: "1.3rem" },
        lineHeight: 1.6,
        fontFamily: "Poppins",
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
        marginBottom: "20px",
        textAlign: "justify",
        padding: "10px",
        borderRadius: "10px",
      }}
    >
      Apply now and take your small business to new heights.
    </Typography>
  </Container>  <Box
    sx={{
      flex: 1,
      display: "flex",
      justifyContent: "center",
      marginBottom: { xs: "20px", md: "0" },
    }}
  >
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
</Box>


      <Calculator />
      <Apply />
      <Advantages advantagesData={bLadvantagesData} />
      <Eligibility />
    </>
  );
};

export default SmallBusinessLoan;
