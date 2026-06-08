import React, { useState } from "react";
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
  Chip,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Menu,
  Divider,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckCircleIcon,
  LocalHospital as LocalHospitalIcon,
  AccountBalance as AccountBalanceIcon,
  Calculate as CalculateIcon,
  Download as DownloadIcon,
  Business as BusinessIcon,
  MonetizationOn as MonetizationOnIcon,
  ArrowDropDown as ArrowDropDownIcon,
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

const DoctorLoanPage = () => {
  const [calculatorMode, setCalculatorMode] = useState("emi");
  const [loanAmount, setLoanAmount] = useState(500000);
  const [tenure, setTenure] = useState(24);
  const [interestRate, setInterestRate] = useState(12);
  const [odLimit, setOdLimit] = useState(1000000);
  const [utilization, setUtilization] = useState(50);
  const [brochureAnchorEl, setBrochureAnchorEl] = useState(null);
  const brochureMenuOpen = Boolean(brochureAnchorEl);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    registration: "",
    experience: "",
  });

  const handleBrochureClick = (event) => {
    setBrochureAnchorEl(event.currentTarget);
  };

  const handleBrochureClose = () => {
    setBrochureAnchorEl(null);
  };

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
    { name: 'Bajaj Finserv', specialty: 'Equipment finance, quick documentation' },
    { name: 'Tata Capital', specialty: 'OD lines for doctors' },
    { name: 'Cholamandalam', specialty: 'Flexible repayment structures' },
    { name: 'ABFL', specialty: 'Higher ticket size for practice upgrade' },
    { name: 'Godrej Finance', specialty: 'Equipment loans' },
    { name: 'Credit Saison', specialty: 'Digital onboarding for WC' },
    { name: 'SMFG Credit', specialty: 'Affordable monthly cost' }
  ];

  const faqs = [
    {
      question: "What's the difference between OD and term EMI?",
      answer:
        "OD (Overdraft) allows you to withdraw funds as needed and pay interest only on the utilized amount, while EMI requires fixed monthly payments regardless of usage. OD is ideal for working capital needs with fluctuating requirements.",
    },
    {
      question: "Can I get 100% financing for medical equipment?",
      answer:
        "Yes, many lenders offer up to 100% financing for medical equipment to registered practitioners. The exact percentage depends on the equipment type, your profile, and lender policies.",
    },
    {
      question: "How is eligibility calculated for fresh practitioners?",
      answer:
        "Fresh practitioners with 1-3 years of experience are evaluated based on their medical registration, educational qualifications, practice setup, and projected income rather than historical financial data.",
    },
    {
      question: "What documents prove my practice?",
      answer:
        "Medical registration certificate, clinic lease agreement, patient appointment records, billing software data, and utility bills of the practice location serve as proof of your medical practice.",
    },
    {
      question: "What's the typical time to disbursal for doctor loans?",
      answer:
        "Doctor loans typically get disbursed within 7-15 working days due to faster KYC processes for registered medical practitioners and streamlined documentation requirements.",
    },
  ];

  const doctorLoanFaqSchema = {
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
        <title>Doctor Loan | Professional Loan for Doctors | F2 Fintech</title>
        <meta
          name="description"
          content="Special doctor loans for medical professionals to set up clinics, buy equipment, or expand practice. Competitive rates, minimal documentation, and fast approval."
        />
        <meta name="keywords" content="doctor loan, medical professional loan, clinic loan, equipment loan for doctors" />
        <link rel="canonical" href="https://f2fintech.com/doctor-loan" />
        <meta property="og:title" content="Doctor Loan | Professional Loan for Doctors | F2 Fintech" />
        <meta property="og:description" content="Special doctor loans for medical professionals to set up clinics, buy equipment, or expand practice. Competitive rates, minimal documentation, and fast approval." />
        <meta property="og:url" content="https://f2fintech.com/doctor-loan" />
        <script type="application/ld+json">{JSON.stringify(doctorLoanFaqSchema)}</script>
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
                  Doctor Loans — Tailored for Medical Professionals
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
                    px: { xs: 2, sm: 0 },
                  }}
                >
                  Clinic expansion, equipment purchase, or working capital with
                  special doctor programs.
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
                    src="https://lottie.host/embed/24157fa8-57e2-4c2b-ba6a-be2de132b959/qWtt3tKag0.lottie"
                  ></iframe>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* About Doctor Loans Section */}
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
            About Our Doctor Loans
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
                      <ListItemText primary="MBBS/MD/BDS and other registered practitioners" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon
                          sx={{ fontSize: "1rem", color: "green" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="Individual doctors, clinics, polyclinics" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon
                          sx={{ fontSize: "1rem", color: "green" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="Diagnostic centers" />
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
                      <ListItemText primary="Funding equipment, clinic setup, interiors" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon
                          sx={{ fontSize: "1rem", color: "green" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="Working capital requirements" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon
                          sx={{ fontSize: "1rem", color: "green" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="Special pricing/terms for doctors" />
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
                    Key Features
                  </Typography>
                  <List dense>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon
                          sx={{ fontSize: "1rem", color: "green" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="₹2,00,000 to ₹75,00,000 (higher with collateral)" />
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
                      <ListItemText primary="Overdraft lines available" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon
                          sx={{ fontSize: "1rem", color: "green" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="Faster KYC for practitioners" />
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
                  Eligibility Snapshot
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: "green" }} />
                    </ListItemIcon>
                    <ListItemText primary="Valid medical registration" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: "green" }} />
                    </ListItemIcon>
                    <ListItemText primary="Minimum experience (1–3 years)" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: "green" }} />
                    </ListItemIcon>
                    <ListItemText primary="Credit history in good standing" />
                  </ListItem>
                </List>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 3,
                  boxShadow:
                    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                  borderRadius: "20px",
                  height: "100%",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 600, mb: 3, color: "#3244e6" }}
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
                    <ListItemText primary="Medical Council Registration Certificate" />
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
                    <ListItemText primary="Income proof / ITRs" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: "green" }} />
                    </ListItemIcon>
                    <ListItemText primary="Equipment performa invoice (if applicable)" />
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
                color: "#3244e6",
                fontSize: { xs: "1.8rem", md: "3.5rem" },
              }}
            >
              <CalculateIcon sx={{ mr: 2, fontSize: "inherit" }} />
              Doctor Loan Calculator
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
                        boxShadow:
                          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
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
                Doctor Loan Handbook
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 4, color: "text.secondary" }}
              >
                OD vs EMI, eligibility, and best practice offers.
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
                variant="contained"
                size="large"
                sx={{ mt: 3, px: 6 }}
                startIcon={<DownloadIcon />}
                endIcon={<ArrowDropDownIcon />}
                onClick={handleBrochureClick}
                aria-controls={brochureMenuOpen ? 'brochure-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={brochureMenuOpen ? 'true' : undefined}
              >
                Download Brochure
              </Button>
              <Menu
                id="brochure-menu"
                anchorEl={brochureAnchorEl}
                open={brochureMenuOpen}
                onClose={handleBrochureClose}
                MenuListProps={{
                  'aria-labelledby': 'brochure-button',
                }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <MenuItem
                  component="a"
                  href="https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/assets/ca-proposal-F2.pdf"
                  download="https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/assets/CA-Loan-Proposal.pdf"
                  onClick={handleBrochureClose}
                  sx={{ gap: 1 }}
                >
                  <DownloadIcon fontSize="small" />
                  CA Loan Proposal
                </MenuItem>
                <MenuItem
                  component="a"
                  href="https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/assets/doctor-loan-proposal.pdf"
                  download="https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/assets/doctor-loan-proposal.pdf"
                  onClick={handleBrochureClose}
                  sx={{ gap: 1 }}
                >
                  <DownloadIcon fontSize="small" />
                  Doctors Loan Proposal
                </MenuItem>
              </Menu>
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
            Frequently Asked Questions
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
              Ready to Grow Your Practice?
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
              Get pre-approved in minutes with our doctor-focused loan programs
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

export default DoctorLoanPage;
