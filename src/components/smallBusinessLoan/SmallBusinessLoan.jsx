"use client";

import { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Divider,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckCircleIcon,
  Person as PersonIcon,
  AccountBalance as AccountBalanceIcon,
  Calculate as CalculateIcon,
  Download as DownloadIcon,
  Home as HomeIcon,
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ButtonComp from "../common/button/Button";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3244e6",
    },
    secondary: {
      main: "#3244e6",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

const LAPPage = () => {
  const [propertyValue, setPropertyValue] = useState(5000000);
  const [desiredLoanAmount, setDesiredLoanAmount] = useState(3000000);
  const [tenure, setTenure] = useState(180); // 15 years in months
  const [interestRate, setInterestRate] = useState(9.5);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
  });

  // Calculator functions
  const calculateEMI = (principal, rate, tenure) => {
    const monthlyRate = rate / (12 * 100);
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
      (Math.pow(1 + monthlyRate, tenure) - 1);
    return Math.round(emi);
  };

  const calculateLTV = (loanAmount, propertyValue) => {
    return ((loanAmount / propertyValue) * 100).toFixed(1);
  };

  const emi = calculateEMI(desiredLoanAmount, interestRate, tenure);
  const totalAmount = emi * tenure;
  const totalInterest = totalAmount - desiredLoanAmount;
  const ltv = calculateLTV(desiredLoanAmount, propertyValue);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const lenders = [
    { name: "HDFC Bank", specialty: "High LTV programs" },
    { name: "ICICI Bank", specialty: "Faster legal & technical" },
    { name: "Axis Bank", specialty: "Flexible tenure" },
    { name: "SBI", specialty: "Competitive rates for salaried" },
    { name: "Kotak Mahindra Bank", specialty: "Quick processing" },
  ];

  const faqs = [
    {
      question: "What is LTV and how is it decided?",
      answer:
        "LTV (Loan to Value) is the percentage of your property value that you can borrow. Most lenders offer 50-70% LTV depending on property type, location, and your profile. Residential properties typically get higher LTV than commercial properties.",
    },
    {
      question: "Can I get LAP on a rented/let-out property?",
      answer:
        "Yes, most lenders accept rented properties for LAP. The rental income can also be considered for eligibility calculation. You'll need rental agreements and income proof from tenants along with standard documentation.",
    },
    {
      question: "Can co-owners apply jointly?",
      answer:
        "Yes, all co-owners of the property can apply jointly for LAP. This can increase loan eligibility as combined income is considered. All co-owners need to be co-applicants and provide their income documents.",
    },
    {
      question: "What are typical legal/technical checks?",
      answer:
        "Lenders conduct legal verification of property documents (title, approvals, NOCs) and technical valuation by approved agencies. This includes checking for any legal disputes, proper approvals, and current market value assessment.",
    },
    {
      question: "How is my EMI affected by prepayment?",
      answer:
        "Prepayments reduce your principal outstanding, which can either reduce EMI (keeping tenure same) or reduce tenure (keeping EMI same). Most lenders allow free prepayments for floating rate LAPs. Check prepayment charges for fixed rate loans.",
    },
  ];

  const lapFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <title>Loan Against Property | Up to ₹10 Crore | F2 Fintech</title>
        <meta
          name="description"
          content="Unlock the value of your property with a loan against property (LAP) from F2 Fintech. Get up to ₹10 crore at low interest rates with flexible repayment options."
        />
        <meta name="keywords" content="loan against property, LAP, property loan, mortgage loan india" />
        <link rel="canonical" href="https://f2fintech.com/loan-against-property" />
        <meta property="og:title" content="Loan Against Property | Up to ₹10 Crore | F2 Fintech" />
        <meta property="og:description" content="Unlock the value of your property with a loan against property (LAP) from F2 Fintech. Get up to ₹10 crore at low interest rates with flexible repayment options." />
        <meta property="og:url" content="https://f2fintech.com/loan-against-property" />
        <script type="application/ld+json">{JSON.stringify(lapFaqSchema)}</script>
      </Helmet>
      <Box sx={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
        {/* Hero Section */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #3244e6 0%, #3244e6 100%)",
            color: "white",
            py: {
              xs: 5,
              md: 8,
            },
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "1.8rem", md: "3.5rem" },
                    fontWeight: 700,
                    mb: 2,
                    fontFamily: "Poppins",
                  }}
                >
                  Loan Against Property — Unlock the Value of Your Asset
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    mb: { xs: 2, sm: 4 },
                    opacity: 0.9,
                    fontWeight: 400,
                    lineHeight: 1.6,
                    fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.15rem" },
                    textAlign: { xs: "center", sm: "left" },
                    px: { xs: 2, sm: 0 }, // adds side padding on small screens
                  }}
                >
                  Raise funds for business, education, or consolidation at
                  competitive rates.
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "center", sm: "flex-start" },
                    justifyContent: { xs: "center", sm: "flex-start" },
                    gap: { xs: 2, sm: 2.5 },
                    flexWrap: "wrap",
                    width: "100%",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() =>
                      (window.location.href = "/eligibility-criteria")
                    }
                    sx={{
                      bgcolor: "#fdb723",
                      color: "#FFFFFF",
                      fontWeight: "500",
                      "&:hover": { bgcolor: "#f3ae21", color: "white" },
                      px: { xs: 2, sm: 3 },
                      py: { xs: 1, sm: 1.5 },
                      fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                      borderRadius: 6,
                      textTransform: "none",
                      height: { xs: "6.3", sm: "2.5rem", md: "6.3" },
                      fontFamily: "Poppins",
                      width: { xs: "100%", sm: "auto" },
                      minWidth: { xs: "100%", sm: "220px" },
                    }}
                    fullWidth={false}
                  >
                    {" "}
                    Check Eligibility{" "}
                  </Button>

                  <Box
                    sx={{
                      border: "2px solid white",
                      borderRadius: 6,
                      width: { xs: "100%", sm: "auto" },
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    <ButtonComp props={{ width: "100%" }} />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    width: { xs: "300px", sm: "350px", md: "400px" },
                    height: { xs: "300px", sm: "350px", md: "400px" },
                    margin: "0 auto",
                  }}
                >
                  <iframe
                    style={{
                      width: "100%",
                      height: "100%",
                      border: 0,
                    }}
                    src="https://lottie.host/embed/a0d0bc4f-fccc-48ab-bd56-5e3a667f59fd/k3WGQ5D59A.lottie"
                  />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* About LAP Section */}
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontWeight: 650,
              mb: 6,
              textAlign: "center",
              color: theme.palette.secondary.main,
            }}
          >
            About LAP
          </Typography>

          <Grid container spacing={4}>
            {/* Who it's for */}
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  height: "100%",
                  boxShadow:
                    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                  borderRadius: "20px",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <PersonIcon
                    sx={{ fontSize: "3rem", color: "#3244e6", mb: 2 }}
                  />
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                    Who it's for
                  </Typography>
                  <List dense>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon
                          sx={{ fontSize: "1rem", color: "green" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="Property owners needing large-ticket funds without selling assets" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* When to choose */}
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  height: "100%",
                  boxShadow:
                    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                  borderRadius: "20px",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <HomeIcon
                    sx={{ fontSize: "3rem", color: "#3244e6", mb: 2 }}
                  />
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                    When to choose
                  </Typography>
                  <List dense>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon
                          sx={{ fontSize: "1rem", color: "green" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="You want lower rates than unsecured loans" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon
                          sx={{ fontSize: "1rem", color: "green" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="You need longer tenure and higher amounts" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* Key Features */}
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  height: "100%",
                  boxShadow:
                    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                  borderRadius: "20px",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <AccountBalanceIcon
                    sx={{ fontSize: "3rem", color: "#3244e6", mb: 2 }}
                  />
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                    Key features
                  </Typography>
                  <List dense>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon
                          sx={{ fontSize: "1rem", color: "green" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="LTV typically 50–70% of property value" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon
                          sx={{ fontSize: "1rem", color: "green" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="Tenure up to 15–20 years" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon
                          sx={{ fontSize: "1rem", color: "green" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="Residential/commercial properties accepted (lender-specific)" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Eligibility & Documents */}
          <Grid spacing={4} sx={{ mt: 4, height: "auto" }}>
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 3,
                  boxShadow: 2,
                  height: "100%",
                  borderRadius: "20px",
                  mb: 5,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 600, mb: 3, color: "#3244e6" }}
                >
                  Eligibility snapshot
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: "green" }} />
                    </ListItemIcon>
                    <ListItemText primary="Clear title, acceptable property valuation" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: "green" }} />
                    </ListItemIcon>
                    <ListItemText primary="Repayment capacity per income/financials" />
                  </ListItem>
                </List>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 3,
                  boxShadow: 2,
                  height: "100%",
                  borderRadius: "20px",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 600, mb: 3, color: "#3244e6" }}
                >
                  Documents
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: "green" }} />
                    </ListItemIcon>
                    <ListItemText primary="KYC, income docs" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: "green" }} />
                    </ListItemIcon>
                    <ListItemText primary="Property chain documents, valuation report (lender initiated), tax receipts" />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Container>

        {/* Calculator Section */}
        <Box sx={{ py: { xs: 3, md: 8 } }}>
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              sx={{
                textAlign: "center",
                mb: { xs: 3, md: 6 },
                fontWeight: 650,
                fontSize: { xs: "1.8rem", md: "3.5rem" },
                color: "#3244e6",
              }}
            >
              <CalculateIcon sx={{ mr: 2, fontSize: "inherit" }} />
              Calculator
            </Typography>

            <Paper
              sx={{
                p: 4,
                boxShadow:
                  "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                borderRadius: "20px",
              }}
            >
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Property Value (₹)"
                    type="number"
                    value={propertyValue}
                    onChange={(e) => setPropertyValue(Number(e.target.value))}
                    sx={{ mb: 3 }}
                  />
                  <TextField
                    fullWidth
                    label="Desired Loan Amount (₹)"
                    type="number"
                    value={desiredLoanAmount}
                    onChange={(e) =>
                      setDesiredLoanAmount(Number(e.target.value))
                    }
                    sx={{ mb: 3 }}
                  />
                  <TextField
                    fullWidth
                    label="Interest Rate (% p.a.)"
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    sx={{ mb: 3 }}
                  />
                  <TextField
                    fullWidth
                    label="Tenure (months)"
                    type="number"
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card
                    sx={{
                      backgroundColor: "#e3f2fd",
                      p: 3,
                      mb: 3,
                      borderRadius: "20px",
                    }}
                  >
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                      LAP Calculation
                    </Typography>
                    <Typography variant="h4" sx={{ color: "#3244e6", mb: 1 }}>
                      ₹{emi.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      EMI / month
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body1">LTV: {ltv}%</Typography>
                    <Typography variant="body1">
                      Total Interest: ₹{totalInterest.toLocaleString()}
                    </Typography>
                    <Typography variant="body1">
                      Total Payable: ₹{totalAmount.toLocaleString()}
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          </Container>
        </Box>

        {/* Partner Lenders */}
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              mb: { xs: 3, md: 6 },
              fontWeight: 650,
              fontSize: { xs: "1.8rem", md: "3.5rem" },
              color: "#3244e6",
            }}
          >
            Partner lenders (examples)
          </Typography>

          <Grid container spacing={3}>
            {lenders.map((lender, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={index}
                sx={{ textAlign: "center" }}
              >
                <Box
                  sx={{
                    p: 3,
                    border: "1px solid #e0e0e0",
                    borderRadius: 2,
                    backgroundColor: "white",
                    "&:hover": {
                      boxShadow: 3,
                      borderColor: "#3244e6",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: "#3244e6" }}
                  >
                    {lender.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {lender.specialty}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Download Brochure */}
        <Box sx={{ py: { xs: 3, md: 6 } }}>
          <Container maxWidth="lg">
            <Card
              sx={{
                p: 4,
                textAlign: "center",
                boxShadow:
                  "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                borderRadius: "20px",
              }}
            >
              <DownloadIcon
                sx={{ fontSize: "4rem", color: "#3244e6", mb: 2 }}
              />
              <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
                Download brochure
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 4, color: "text.secondary" }}
              >
                LAP Guide — eligibility, LTV, documents, and rate tips.
              </Typography>

              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>

              <Button
                component="a"
                href="https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/assets/loan-against-property.pdf"
                download="https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/assets/loan-against-property.pdf"
                variant="contained"
                size="large"
                sx={{ mt: 3, px: 6 }}
                startIcon={<DownloadIcon />}
              >
                Download Brochure
              </Button>
            </Card>
          </Container>
        </Box>

        {/* FAQ Section */}
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              mb: { xs: 3, md: 6 },
              fontWeight: 650,
              fontSize: { xs: "1.8rem", md: "3.5rem" },
              color: "#3244e6",
            }}
          >
            FAQs — LAP
          </Typography>

          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              sx={{
                mb: { xs: 1.5, sm: 2 },
                boxShadow: { xs: 1, sm: 2 },
                borderRadius: { xs: 2, sm: 1 },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  backgroundColor: "#f8f9fa",
                  py: { xs: 1.5, sm: 2 },
                  px: { xs: 2, sm: 3 },
                  "& .MuiAccordionSummary-content": {
                    my: { xs: 0.5, sm: 1 },
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 500,
                    fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
                    lineHeight: { xs: 1.4, sm: 1.6 },
                  }}
                >
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  px: { xs: 2, sm: 3 },
                  py: { xs: 2, sm: 3 },
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: 1.7,
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                  }}
                >
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>

        {/* CTA Section */}
        <Box
          sx={{
            backgroundColor: "#3244e6",
            color: "white",
            py: { xs: 4, sm: 5, md: 6 },
            textAlign: "center",
            marginBottom: "1px",
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              sx={{
                mb: { xs: 2, sm: 3 },
                fontWeight: 600,
                fontSize: { xs: "1.75rem", sm: "2.25rem", md: "3rem" },
                lineHeight: { xs: 1.3, sm: 1.4, md: 1.5 },
              }}
            >
              Ready to Unlock Your Property's Value?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: { xs: 3, sm: 4 },
                opacity: 0.9,
                fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                lineHeight: { xs: 1.4, sm: 1.5 },
                px: { xs: 1, sm: 0 },
              }}
            >
              Get competitive LAP rates and access funds without selling your
              asset
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: { xs: 2, sm: 2 },
                justifyContent: "center",
                flexWrap: "wrap",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                maxWidth: { xs: "400px", sm: "none" },
                margin: "0 auto",
              }}
            >
              <Button
                variant="contained"
                onClick={() => (window.location.href = "/eligibility-criteria")}
                sx={{
                  bgcolor: "#fdb723",
                  color: "#FFFFFF",
                  fontWeight: "500",
                  "&:hover": {
                    bgcolor: "#f3ae21",
                    color: "white",
                  },
                  px: { xs: 3, sm: 4 },
                  py: { xs: 1.5, sm: 1.5 },
                  fontSize: {
                    xs: "1rem",
                    sm: "1rem",
                    md: "1.1rem",
                  },
                  borderRadius: 6,
                  textTransform: "none",
                  height: { xs: "48px", sm: "52px" },
                  fontFamily: "Poppins",
                  width: { xs: "100%", sm: "auto" },
                  minWidth: { xs: "100%", sm: "220px", md: "240px" },
                  order: { xs: 1, sm: 1 },
                }}
                fullWidth={false}
              >
                Check Eligibility
              </Button>
              <Box
                sx={{
                  border: "2px solid white",
                  borderRadius: 30,
                  width: { xs: "100%", sm: "auto" },
                  order: { xs: 2, sm: 2 },
                }}
              >
                <ButtonComp />
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default LAPPage;
