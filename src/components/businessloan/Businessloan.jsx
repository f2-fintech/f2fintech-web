"use client";

import { useState } from "react";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckCircleIcon,
  Business as BusinessIcon,
  AccountBalance as AccountBalanceIcon,
  Calculate as CalculateIcon,
  Download as DownloadIcon,
  MonetizationOn as MonetizationOnIcon,
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

const BusinessLoanPage = () => {
  const [calculatorMode, setCalculatorMode] = useState("emi");
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [tenure, setTenure] = useState(24);
  const [interestRate, setInterestRate] = useState(12);
  const [odLimit, setOdLimit] = useState(2000000);
  const [utilization, setUtilization] = useState(60);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    turnover: "",
  });

  // Calculator functions
  const calculateEMI = (principal, rate, tenure) => {
    const monthlyRate = rate / (12 * 100);
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
      (Math.pow(1 + monthlyRate, tenure) - 1);
    return Math.round(emi);
  };

  const calculateODCost = (limit, utilizationPercent, rate) => {
    const utilizedAmount = (limit * utilizationPercent) / 100;
    const monthlyCost = (utilizedAmount * rate) / (12 * 100);
    return Math.round(monthlyCost);
  };

  const emi = calculateEMI(loanAmount, interestRate, tenure);
  const totalAmount = emi * tenure;
  const totalInterest = totalAmount - loanAmount;
  const odCost = calculateODCost(odLimit, utilization, interestRate);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const lenders = [
    { name: "ICICI Bank", specialty: "WC + term loans, digital onboarding" },
    { name: "HDFC Bank", specialty: "Fast SME disbursal, collateral-free" },
    { name: "Axis Bank", specialty: "Supply chain finance, OD lines" },
    { name: "Kotak Bank", specialty: "Equipment finance, flexible terms" },
    { name: "Bajaj Finserv", specialty: "Quick documentation, higher limits" },
    { name: "Tata Capital", specialty: "MSME focused, competitive rates" },
    { name: "L&T Finance", specialty: "Manufacturing, infrastructure loans" },
  ];

  const faqs = [
    {
      question: "What's the difference between WC (OD/CC) and a term loan?",
      answer:
        "Working Capital (OD/CC) provides flexible credit for day-to-day operations with revolving limits and interest only on utilized amounts, while term loans are fixed amounts for specific purposes like equipment or expansion with structured EMI repayment.",
    },
    {
      question: "Do I need collateral for business loans?",
      answer:
        "Unsecured loans up to ₹50,00,000 don't require collateral (lender-dependent). Higher amounts may need security, collateral, or guarantees. Many lenders offer collateral-free options based on business performance and credit profile.",
    },
    {
      question: "How is my business turnover evaluated?",
      answer:
        "Turnover is assessed through GST returns, ITRs, and bank statements. Most lenders require minimum ₹15-25L+ annual turnover with consistent growth patterns and healthy profit margins.",
    },
    {
      question: "Can a startup or newly incorporated business apply?",
      answer:
        "Yes, startups with 1-2 years vintage and established turnover can apply. Some lenders have specific startup-friendly products with relaxed criteria for businesses showing strong growth potential.",
    },
    {
      question: "What factors affect my loan limit and interest rate?",
      answer:
        "Your loan limit depends on turnover, profitability, credit score, business vintage, repayment capacity, and collateral. Interest rates vary based on risk assessment, loan amount, tenure, and your relationship with the lender.",
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
        {/* Hero Section */}
        <Box
          component="section"
          aria-labelledby="business-loan-hero"
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
                  id="business-loan-hero"
                  sx={{
                    fontSize: { xs: "1.8rem", md: "3.5rem" },
                    fontWeight: 700,
                    mb: 2,
                    fontFamily: "Poppins",
                  }}
                >
                  Business Loans — Fuel Your Growth
                </Typography>
                <Typography
                  variant="h6"
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
                  Working capital, equipment purchase, inventory, and expansion
                  with competitive rates.
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
                    src="https://lottie.host/embed/724699b3-2372-4833-8716-f8835c708d1d/ExfSAn9dmh.lottie"
                  />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* About Business Loans Section */}
        <Container component="section" aria-labelledby="about-business-loans" maxWidth="lg" sx={{ py: 8 }}>
          <Typography
            variant="h2"
            id="about-business-loans"
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontWeight: 650,
              mb: 6,
              textAlign: "center",
              color: theme.palette.secondary.main,
            }}
          >
            About Our Business Loans
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
                  <BusinessIcon
                    sx={{ fontSize: "3rem", color: "#3244e6", mb: 2 }}
                  />
                  <Typography variant="h3" sx={{ fontSize: "1.5rem", fontWeight: 600, mb: 2 }}>
                    Who it's for
                  </Typography>
                  <List dense>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon
                          sx={{ fontSize: "1rem", color: "green" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="MSMEs with established operations" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon
                          sx={{ fontSize: "1rem", color: "green" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="Proprietorships, partnerships, companies" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon
                          sx={{ fontSize: "1rem", color: "green" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="Startups with business vintage" />
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
                  <MonetizationOnIcon
                    sx={{ fontSize: "3rem", color: "#3244e6", mb: 2 }}
                  />
                  <Typography variant="h3" sx={{ fontSize: "1.5rem", fontWeight: 600, mb: 2 }}>
                    When to choose
                  </Typography>
                  <List dense>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon
                          sx={{ fontSize: "1rem", color: "green" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="Need working capital for operations" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon
                          sx={{ fontSize: "1rem", color: "green" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="Equipment, machinery, inventory funding" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon
                          sx={{ fontSize: "1rem", color: "green" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="Business expansion, new locations" />
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
                  <Typography variant="h3" sx={{ fontSize: "1.5rem", fontWeight: 600, mb: 2 }}>
                    Key Features
                  </Typography>
                  <List dense>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon
                          sx={{ fontSize: "1rem", color: "green" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="₹5,00,000 to ₹5,00,00,000 (higher with collateral)" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon
                          sx={{ fontSize: "1rem", color: "green" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="Tenure: 12–84 months" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon
                          sx={{ fontSize: "1rem", color: "green" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="OD/CC lines for flexible access" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon
                          sx={{ fontSize: "1rem", color: "green" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="GST-linked fast processing" />
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
                  variant="h3"
                  sx={{ fontSize: "1.25rem", fontWeight: 600, mb: 3, color: "#3244e6" }}
                >
                  Eligibility Snapshot
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: "green" }} />
                    </ListItemIcon>
                    <ListItemText primary="Business vintage: 1-2 years minimum" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: "green" }} />
                    </ListItemIcon>
                    <ListItemText primary="Annual turnover: ₹15-25L+" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: "green" }} />
                    </ListItemIcon>
                    <ListItemText primary="Good credit bureau health" />
                  </ListItem>
                </List>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 3,
                  height: "100%",
                  boxShadow:
                    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                  borderRadius: "20px",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{ fontSize: "1.25rem", fontWeight: 600, mb: 3, color: "#3244e6" }}
                >
                  Required Documents
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: "green" }} />
                    </ListItemIcon>
                    <ListItemText primary="PAN, Aadhaar, Address proof" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: "green" }} />
                    </ListItemIcon>
                    <ListItemText primary="GST returns / ITRs" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: "green" }} />
                    </ListItemIcon>
                    <ListItemText primary="Bank statements (6–12 months)" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: "green" }} />
                    </ListItemIcon>
                    <ListItemText primary="Financials (P&L, Balance Sheet)" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: "green" }} />
                    </ListItemIcon>
                    <ListItemText primary="Equipment proforma (if applicable)" />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Container>

        {/* Calculator Section */}
        <Box component="section" aria-labelledby="calculator-heading" sx={{ py: 8 }}>
          <Container maxWidth="lg">
            <Typography
              variant="h2"
              id="calculator-heading"
              sx={{
                textAlign: "center",
                mb: 6,
                fontSize: { xs: "1.8rem", md: "3.5rem" },
                fontWeight: 650,
                color: "#3244e6",
              }}
            >
              <CalculateIcon sx={{ mr: 2, fontSize: "inherit" }} />
              Business Loan Calculator
            </Typography>

            <Paper
              sx={{
                p: 4,
                boxShadow:
                  "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                borderRadius: "20px",
              }}
            >
              <Box sx={{ mb: 4 }}>
                <FormControl fullWidth>
                  <InputLabel>Calculator Mode</InputLabel>
                  <Select
                    value={calculatorMode}
                    onChange={(e) => setCalculatorMode(e.target.value)}
                    label="Calculator Mode"
                  >
                    <MenuItem value="emi">EMI Calculator</MenuItem>
                    <MenuItem value="od">OD Simulation</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {calculatorMode === "emi" ? (
                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Loan Amount (₹)"
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      sx={{ mb: 3 }}
                    />
                    <TextField
                      fullWidth
                      label="Tenure (months)"
                      type="number"
                      value={tenure}
                      onChange={(e) => setTenure(Number(e.target.value))}
                      sx={{ mb: 3 }}
                    />
                    <TextField
                      fullWidth
                      label="Interest Rate (%)"
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card
                      sx={{
                        backgroundColor: "#e3f2fd",
                        p: 3,
                        borderRadius: "20px",
                      }}
                    >
                      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                        EMI Calculation
                      </Typography>
                      <Typography variant="h4" sx={{ color: "#3244e6", mb: 1 }}>
                        ₹{emi.toLocaleString()}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        Monthly EMI
                      </Typography>
                      <Divider sx={{ my: 2 }} />
                      <Typography variant="body1">
                        Total Amount: ₹{totalAmount.toLocaleString()}
                      </Typography>
                      <Typography variant="body1">
                        Total Interest: ₹{totalInterest.toLocaleString()}
                      </Typography>
                    </Card>
                  </Grid>
                </Grid>
              ) : (
                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="OD Limit (₹)"
                      type="number"
                      value={odLimit}
                      onChange={(e) => setOdLimit(Number(e.target.value))}
                      sx={{ mb: 3 }}
                    />
                    <TextField
                      fullWidth
                      label="Expected Utilization (%)"
                      type="number"
                      value={utilization}
                      onChange={(e) => setUtilization(Number(e.target.value))}
                      sx={{ mb: 3 }}
                    />
                    <TextField
                      fullWidth
                      label="Interest Rate (%)"
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card sx={{ backgroundColor: "#e8f5e8", p: 3 }}>
                      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                        OD Cost Calculation
                      </Typography>
                      <Typography variant="h4" sx={{ color: "#2e7d32", mb: 1 }}>
                        ₹{odCost.toLocaleString()}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        Monthly Interest Cost
                      </Typography>
                      <Divider sx={{ my: 2 }} />
                      <Typography variant="body1">
                        Utilized Amount: ₹
                        {((odLimit * utilization) / 100).toLocaleString()}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ mt: 1, fontStyle: "italic" }}
                      >
                        *Interest charged only on utilized amount
                      </Typography>
                    </Card>
                  </Grid>
                </Grid>
              )}
            </Paper>
          </Container>
        </Box>

        {/* Partner Lenders */}
        <Container component="section" aria-labelledby="partner-lenders-heading" maxWidth="lg" sx={{ py: 8 }}>
          <Typography
            variant="h2"
            id="partner-lenders-heading"
            sx={{
              textAlign: "center",
              mb: 6,
              fontWeight: 650,
              fontSize: { xs: "1.8rem", md: "3.5rem" },
              color: "#3244e6",
            }}
          >
            Partner Lenders
          </Typography>

          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
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
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, mb: 1, color: "#3244e6" }}
                    >
                      {lender.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {lender.specialty}
                    </Typography>
                  </CardContent>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Download Brochure Section */}
        <Box component="section" aria-labelledby="brochure-heading" sx={{ py: 6 }}>
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
              <Typography variant="h2" id="brochure-heading" sx={{ fontSize: "2rem", mb: 2, fontWeight: 600 }}>
                Business Loan Handbook
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 4, color: "text.secondary" }}
              >
                WC vs Term, eligibility, and lender comparison guide.
              </Typography>

              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>

              <Button
                component="a"
                href="/newassets/business-loan-proposal.pdf"
                download="business-loan-proposal.pdf"
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
        <Container component="section" aria-labelledby="faq-heading" maxWidth="lg" sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
          <Typography
            variant="h2"
            id="faq-heading"
            sx={{
              textAlign: "center",
              mb: { xs: 4, sm: 5, md: 6 },
              fontWeight: 650,
              fontSize: { xs: "1.8rem", md: "3.5rem" },
              color: "#3244e6",
            }}
          >
            FAQs — Business Loan
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
              <AccordionDetails>
                <Typography
                  variant="body1"
                  sx={{
                    px: { xs: 2, sm: 3 },
                    py: { xs: 2, sm: 3 },
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
              Ready to Scale Your Business?
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
              Get pre-approved in minutes with our business-focused loan
              programs
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

export default BusinessLoanPage;
