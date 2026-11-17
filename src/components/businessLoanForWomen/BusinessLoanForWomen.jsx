import { Box, Container, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Calculator from "../calculator/Calculator";
import Advantages from "../../components/advantages/Advantages";
import { bLadvantagesData } from "../data/Data.jsx";
import LendingPartners from "../lendingpartners/Lendingpartners";
import Eligibility from "../../components/eligibility/Eligibility";
import { Helmet } from "react-helmet-async";

const BusinessLoanForWomen = () => {
  const theme = useTheme();
  return (
    <>
      <Helmet>
        <title></title>
        <meta name="Name" content=" " />
        <link rel="canonical" href="https://f2fintech.com/business-loan-for-women" />
      </Helmet>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          padding: { xs: "20px", sm: "30px", md: "40px" },
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
            id="about-business-loans-for-women"
            component="h2"
            sx={{
              fontFamily: "Poppins",
              fontSize: { xs: "6vw", sm: "4vw", md: "2.5vw" },
              fontWeight: 650,
              marginBottom: "20px",
              marginLeft: "12px",
              padding: "10px 0",
              textAlign: "start",
              color: theme.palette.secondary.main,
            }}
          >
            About Our Business Loans for Women
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
            Our business loans for women are designed to help female
            entrepreneurs grow and expand their businesses effortlessly. With
            tailored credit solutions and minimal documentation, you can get up
            to ₹30 lakhs in just 5 minutes.
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
            Whether you need funds for inventory, equipment, or working capital,
            we provide flexible loan options to meet your specific needs.
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
            Apply now and take your business to new heights.
          </Typography>
        </Container>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            marginTop: { xs: "20px", md: "0px" },
          }}
        >
          <img
            src="/businesswomen.gif"
            alt="Business Loan For Women illustration"
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
      <Advantages advantagesData={bLadvantagesData} />
      <LendingPartners />
      <Eligibility />
    </>
  );
};

export default BusinessLoanForWomen;
