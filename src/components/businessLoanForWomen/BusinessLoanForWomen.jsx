import { Box, Container, Typography } from "@mui/material";

import Calculator from "../calculator/Calculator";
import Advantages from "../../components/advantages/Advantages";
import { bLadvantagesData } from "../data/Data.jsx";
import LendingPartners from "../lendingpartners/Lendingpartners";
import Eligibility from "../../components/eligibility/Eligibility";

const BusinessLoanForWomen = () => {
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
            src="/businesswomen.gif"
            alt="Business Loan For Women"
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
            id="about-business-loans-for-women"
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
            About Our Business Loans for Women
          </Typography>
          <Typography
            component="h5"
            sx={{
              fontSize: "1.3rem",
              lineHeight: 1.6,
              color: "#ffffff",
              fontFamily:'Poppins',
              marginBottom: "20px",
              textAlign: "justify",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            Our business loans for women are designed to help female
            entrepreneurs grow and expand their businesses effortlessly. With
            quick approval processes and minimal documentation, you can get up
            to ₹30 lakhs in just 5 minutes.
          </Typography>
          <Typography
            component="h5"
            sx={{
              fontSize: "1.3rem",
              lineHeight: 1.6,
              color: "#ffffff",
              fontFamily:'Poppins',
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
              color: "#ffffff",
              fontFamily:'Poppins',
              marginBottom: "20px",
              textAlign: "justify",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            Apply now and take your business to new heights.
          </Typography>
        </Container>
      </Box>

      <Calculator />
      <Advantages advantagesData={bLadvantagesData} />
      <LendingPartners />
      <Eligibility />
    </>
  );
};

export default BusinessLoanForWomen;
