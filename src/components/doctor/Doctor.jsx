import React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Container, Typography } from "@mui/material";
import Eligibility from "../../components/eligibility/Eligibility";
import Calculator from "../calculator/Calculator";
import Advantages from "../../components/advantages/Advantages";
import { bLadvantagesData } from "../data/Data.jsx";

const DoctorLoan = () => {
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
  const theme = useTheme();
  return (
    <>
     <Box
  sx={{
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    alignItems: "center",
    justifyContent: "space-between",
    padding: { xs: "20px", sm: "30px", md: "40px" },
    backgroundColor: "#0000",
    borderRadius: "10px",
    margin: { xs: "20px auto", md: "40px auto" },
    maxWidth: "100%",
  }}
>
  <Container
    sx={{
      flex: 1,
      paddingRight: { xs: "0", md: "20px" },
      textAlign: "justify",
    }}
  >
    <Typography
      id="about-business-loans"
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
      About Our Doctor Loans
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
      We have been serving the medical community for over a decade, offering
      comprehensive financial solutions designed exclusively for doctors like
      you. We wish to empower every Indian by providing access to financial
      services.
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
      Expand your business and enhance your facilities with Medical Equipment
      Loans designed especially for doctors.
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
      Apply now and take yourself to new heights.
    </Typography>
  </Container>
  <Box
    sx={{
      flex: 1,
      
      display: "flex",
      justifyContent: "center",
      marginTop: { xs: "20px", md: "0" },
    }}
  >
    <img
      src="/drloan.gif"
      alt="Business Loan"
      style={{
        width: "80%",
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

export default DoctorLoan;
