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
  Divider,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckCircleIcon,
  Person as PersonIcon,
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

const PersonalLoanPage = () => {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [tenure, setTenure] = useState(24);
  const [interestRate, setInterestRate] = useState(15);
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

  const emi = calculateEMI(loanAmount, interestRate, tenure);
  const totalAmount = emi * tenure;
  const totalInterest = totalAmount - loanAmount;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const lenders = [
    { name: "HDFC Bank", specialty: "Fast disbursal for existing customers" },
    { name: "ICICI Bank", specialty: "Flexible tenure up to 6 years" },
    { name: "Axis Bank", specialty: "Minimal paperwork" },
    { name: "Kotak Bank", specialty: "Attractive balance transfer options" },
    { name: "Bajaj Finserv", specialty: "Same-day personal loans" },
  ];

  const faqs = [
    {
      question: "How soon can I get the money?",
      answer:
        "With complete documentation and good credit profile, personal loans can be disbursed within 24-48 hours. Some lenders offer same-day disbursal for existing customers with pre-approved limits.",
    },
    {
      question: "Will this affect my credit score?",
      answer:
        "Yes, applying for a personal loan involves a hard credit inquiry which may temporarily impact your score. However, timely repayments will improve your credit score over time.",
    },
    {
      question: "What if I prepay? Are there charges?",
      answer:
        "Most lenders allow prepayment after 6-12 months with charges ranging from 2-5% of the outstanding amount. Some banks offer zero prepayment charges after a certain period.",
    },
    {
      question: "Can I apply if I'm self-employed?",
      answer:
        "Yes, self-employed individuals can apply with ITRs, bank statements, and business proof. Income assessment may require additional documentation compared to salaried applicants.",
    },
    {
      question: "What's the minimum income to qualify?",
      answer:
        "Minimum income requirements vary by lender, typically ranging from ₹20,000 to ₹30,000 per month for salaried individuals. Self-employed applicants may need higher income proof.",
    },
  ];

  return (
    <ThemeProvider theme={theme}>
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
                  Personal Loans Made Simple
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
                  Quick approvals, minimal paperwork, and competitive rates for
                  planned and unplanned needs.
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
                <Box sx={{ textAlign: "center" }}>
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
                      src="https://lottie.host/embed/e03d0891-85d8-4978-8cb1-75ebd444555c/mkH2p6J9E6.lottie"
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* About Personal Loans Section */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
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
            About Our Personal Loans
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
                      <ListItemText primary="Salaried professionals and self-employed individuals" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon
                          sx={{ fontSize: "1rem", color: "green" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="Urgent expenses (medical, travel), weddings, education" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon
                          sx={{ fontSize: "1rem", color: "green" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="Big purchases and lifestyle needs" />
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
                      <ListItemText primary="You need unsecured funds (no collateral)" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon
                          sx={{ fontSize: "1rem", color: "green" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="You want predictable EMIs with flexible tenure" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon
                          sx={{ fontSize: "1rem", color: "green" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="Quick access to funds without lengthy procedures" />
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
                      <ListItemText primary="Loan amount: ₹50,000 to ₹40,00,000" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon
                          sx={{ fontSize: "1rem", color: "green" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="Tenure: 12–72 months" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon
                          sx={{ fontSize: "1rem", color: "green" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="Rate range (indicative): 10.5%–24% p.a." />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon
                          sx={{ fontSize: "1rem", color: "green" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="Disbursal: as fast as same-day with select lenders" />
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
                    <ListItemText primary="Age 21–60, stable income, bureau score typically ≥ 700" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: "green" }} />
                    </ListItemIcon>
                    <ListItemText primary="Minimum net monthly income threshold per lender (e.g., ₹20k–₹30k)" />
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
                    <ListItemText primary="PAN, Aadhaar, Address proof" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: "green" }} />
                    </ListItemIcon>
                    <ListItemText primary="Bank statements (3–6 months)" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: "green" }} />
                    </ListItemIcon>
                    <ListItemText primary="Salary slips (last 3), employment proof" />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Container>

        {/* Calculator Section */}
        <Box sx={{ py: 8 }}>
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              sx={{
                textAlign: "center",
                mb: 6,
                fontWeight: 650,
                fontSize: { xs: "1.8rem", md: "3.5rem" },
                color: "#3244e6",
              }}
            >
              <CalculateIcon sx={{ mr: 2, fontSize: "inherit" }} />
              Personal Loan EMI Calculator
            </Typography>

            <Paper sx={{ p: 4, boxShadow: 3, borderRadius: "20px" }}>
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
                    label="Interest Rate (% p.a.)"
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
                      EMI / month
                    </Typography>
                    <Divider sx={{ my: 2 }} />
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

        {/* Partner Lenders cmplt */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              fontSize: { xs: "1.8rem", md: "3.5rem" },
              mb: 6,
              fontWeight: 650,
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
        <Box sx={{ py: 6 }}>
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
                Get the Personal Loan Guide
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 4, color: "text.secondary" }}
              >
                Eligibility, documents, and tips to reduce your interest.
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
                href="/newassets/personal-loan-proposal.pdf"
                download="personal-loan-proposal.pdf"
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
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "1.8rem", md: "3.5rem" },
              textAlign: "center",
              mb: 6,
              fontWeight: 650,
              color: "#3244e6",
            }}
          >
            FAQs — Personal Loan
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
              Ready for Your Personal Loan?
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
              Get instant pre-approval and competitive rates for all your
              financial needs
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

export default PersonalLoanPage;
