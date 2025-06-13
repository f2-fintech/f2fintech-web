import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
  Divider,
  CardMedia,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TimerIcon from "@mui/icons-material/Timer";
import HighlightIcon from "@mui/icons-material/Highlight";

import logo1 from "/HDFC.png"; // Replace with actual logo paths
import logo2 from "/bajaj.jpg"; // Replace with actual logo paths
import logo3 from "/chola.png"; // Replace with actual logo paths

const products = [
  {
    id: 1,
    name: "HDFC",
    logo: logo1,
    ROI: "8.5%",
    fees: "₹1,000",
    tenure: "5 years",
    highlight: "Low interest rate",
    additionalInfo:
      "Amidst the bustling city, where the cacophony of traffic blends with the chatter of street vendors and the distant hum of construction, a solitary figure stands at the intersection, contemplating the ",
  },
  {
    id: 2,
    name: "BAJAJ",
    logo: logo2,
    ROI: "9.0%",
    fees: "₹1,500",
    tenure: "4 years",
    highlight: "No processing fee for first year",
    additionalInfo:
      "Amidst the bustling city, where the cacophony of traffic blends with the chatter of street vendors and the distant hum of construction, a solitary figure stands at the intersection, contemplating the ",
  },
  {
    id: 3,
    name: "CHOLA",
    logo: logo3,
    ROI: "8.0%",
    fees: "₹2,000",
    tenure: "3 years",
    highlight: "Quick approval process",
    additionalInfo:
      "Amidst the bustling city, where the cacophony of traffic blends with the chatter of street vendors and the distant hum of construction, a solitary figure stands at the intersection, contemplating the ",
  },
  {
    id: 4,
    repayment: "Monthly, Quarterly",
    charges: "₹500 processing fee",
    minimumKYC: "Aadhaar, PAN Card",
    DocumentRequired: "yes",
    description:
      "Loan Provider 4 offers flexible repayment options and requires minimal KYC for application.",
  },
  {
    id: 5,
    repayment: "Monthly, Bi-Monthly",
    charges: "₹600 processing fee",
    minimumKYC: "Aadhaar, Voter ID",
    DocumentRequired: "No",
    description:
      "Loan Provider 5 has lower penalties for late payment and offers easy repayment options.",
  },
  {
    id: 6,
    repayment: "Monthly, Semi-Annual",
    charges: "₹700 processing fee",
    minimumKYC: "Aadhaar, Passport",
    DocumentRequired: "No",
    description:
      "Loan Provider 6 is known for its excellent customer service and offers various repayment options.",
  },
];

function LoanProviderComparisonPage() {
  const [hoveredPair, setHoveredPair] = useState(null);

  const handleMouseEnter = (pair) => {
    setHoveredPair(pair);
  };

  const handleMouseLeave = () => {
    setHoveredPair(null);
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href="http://localhost:5173/providers" />
      </Helmet>
      <Container
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          background:
            "linear-gradient(to right, rgba(0, 235, 219, 0.5), rgba(189, 113, 236, 0.5))",
          borderRadius: "0% 100% 0% 100% / 0% 100% 0% 100%",
          padding: "40px",
        }}
      >
        <Box my={4}>
          {/* <Typography variant="h4" align="center" gutterBottom style={{ fontWeight: 'bold', color: '#1d29d8' }}>
                    Loan Provider Comparison
                </Typography> */}
        </Box>
        <Grid container spacing={4}>
          {products.slice(0, 3).map((product, index) => (
            <Grid item xs={12} md={4} key={product.id}>
              <Card
                style={{
                  position: "relative",
                  transition:
                    "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  overflow: "hidden",
                  backgroundColor: "rgba(255, 255, 255, 1)", // Opaque background
                  color: "black",
                  padding: "16px",
                  transform: hoveredPair === index ? "scale(1.05)" : "scale(1)",
                  boxShadow:
                    hoveredPair === index
                      ? "0 10px 15px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.15)"
                      : "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
                }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.logo}
                  alt={product.name}
                  style={{ objectFit: "contain", padding: "16px" }}
                />
                <CardContent>
                  <Typography
                    variant="h2"
                    gutterBottom
                    style={{ fontWeight: "bold", color: "blue" }}
                  >
                    {product.name}
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <AttachMoneyIcon sx={{ color: "black" }} />
                    <Typography
                      variant="body2"
                      gutterBottom
                      style={{ fontWeight: "bold", color: "black" }}
                      sx={{ marginLeft: 1 }}
                    >
                      ROI: {product.ROI}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <AttachMoneyIcon sx={{ color: "black" }} />
                    <Typography
                      variant="body2"
                      gutterBottom
                      style={{ fontWeight: "bold", color: "black" }}
                      sx={{ marginLeft: 1 }}
                    >
                      Fees & Charge: {product.fees}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <TimerIcon sx={{ color: "black" }} />
                    <Typography
                      variant="body2"
                      gutterBottom
                      style={{ fontWeight: "bold", color: "black" }}
                      sx={{ marginLeft: 1 }}
                    >
                      Tenure: {product.tenure}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <HighlightIcon sx={{ color: "black" }} />
                    <Typography variant="body2" sx={{ marginLeft: 1 }}>
                      Highlight: {product.highlight}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Divider style={{ margin: "0" }} />
        <Grid container spacing={4}>
          {products.slice(3).map((product, index) => (
            <Grid item xs={12} md={4} key={product.id}>
              <Card
                style={{
                  position: "relative",
                  transition:
                    "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  overflow: "hidden",
                  backgroundColor: "rgba(255, 255, 255, 1)", // Opaque background
                  color: "black",
                  padding: "16px",
                  transform: hoveredPair === index ? "scale(1.05)" : "scale(1)",
                  boxShadow:
                    hoveredPair === index
                      ? "0 10px 15px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.15)"
                      : "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
                }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <AttachMoneyIcon sx={{ color: "black" }} />
                    <Typography variant="body2" sx={{ marginLeft: 1 }}>
                      <strong>Charges:</strong> {product.charges}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <InfoIcon sx={{ color: "black" }} />
                    <Typography variant="body2" sx={{ marginLeft: 1 }}>
                      <strong>Minimum KYC:</strong> {product.minimumKYC}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <HighlightIcon sx={{ color: "black" }} />
                    <Typography variant="body2" sx={{ marginLeft: 1 }}>
                      <strong>DocumentRequired:</strong>{" "}
                      {product.DocumentRequired}
                    </Typography>
                  </Box>
                  <Box mt={1}>
                    <Typography variant="body2">
                      <strong>Description:</strong> {product.description}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default LoanProviderComparisonPage;
