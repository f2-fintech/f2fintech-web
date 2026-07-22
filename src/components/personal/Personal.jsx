"use client";

import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
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
  Slider,
  InputAdornment,
  FilledInput,
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
    fontFamily: "'Poppins', sans-serif",
  },
});

const MIN_AMOUNT = 50000;
const MAX_AMOUNT = 5000000; // 50 Lakh
const MIN_TENURE = 12;
const MAX_TENURE = 72; // 6 years
const MIN_RATE = 10.5;
const MAX_RATE = 24.0;

const PRIMARY = "#3244e6";
const TEAL = "#3DC8BA";

const sliderSx = {
  color: PRIMARY,
  height: 8,
  padding: "13px 0",
  "& .MuiSlider-rail": { backgroundColor: "#E2E5FF", opacity: 1 },
  "& .MuiSlider-track": { backgroundColor: PRIMARY, border: "none" },
  "& .MuiSlider-thumb": {
    width: 24,
    height: 24,
    backgroundColor: "#fff",
    border: `2px solid ${PRIMARY}`,
    boxShadow: "0 0 0 4px rgba(50, 68, 230, 0.1)",
    "&::before": {
      display: "none",
    },
    "&:hover, &.Mui-active": {
      boxShadow: "0 0 0 8px rgba(50, 68, 230, 0.2)",
    },
  },
};

const inputSx = (width = 130) => ({
  width,
  background: "#fff",
  borderRadius: "8px",
  border: "1.5px solid #EAEAEA",
  "& input": {
    padding: "7px 10px",
    fontWeight: 700,
    fontSize: "1.05rem",
    color: PRIMARY,
    textAlign: "right",
  },
});

function DonutChart({ principal, interestAmt, total, size = 220 }) {
  const r = size * 0.35;
  const sw = size * 0.07;
  const circ = 2 * Math.PI * r;
  const safe = total > 0 ? total : 1;
  const pDash = (principal / safe) * circ;
  const iDash = (interestAmt / safe) * circ;
  const cx = size / 2;
  const cy = size / 2;

  return (
    <Box sx={{ position: "relative", width: size, height: size, mx: "auto" }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: "rotate(-90deg)", display: "block" }}
      >
        {/* grey background ring */}
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke="#F1F3F9"
          strokeWidth={sw}
        />
        {/* principal arc */}
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke={PRIMARY}
          strokeWidth={sw}
          strokeDasharray={`${Math.max(0, pDash - 2)} ${circ}`}
          strokeLinecap="butt"
        />
        {/* interest arc */}
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke={TEAL}
          strokeWidth={sw}
          strokeDasharray={`${Math.max(0, iDash - 2)} ${circ}`}
          strokeDashoffset={-pDash}
          strokeLinecap="butt"
        />
      </svg>
      {/* center label */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 1,
        }}
      >
        <Typography sx={{ fontSize: "0.75rem", color: "text.secondary", fontWeight: 500, textTransform: "uppercase", letterSpacing: 0.5 }}>
          Total Payable
        </Typography>
        <Typography
          sx={{
            fontSize: size > 250 ? "1.4rem" : "1.15rem",
            fontWeight: 700,
            color: "#1e293b",
            mt: 0.5,
          }}
        >
          ₹{Number(total).toLocaleString("en-IN")}
        </Typography>
      </Box>
    </Box>
  );
}

function SliderRow({ label, value, min, max, step, minLabel, maxLabel, onChange, onInputChange, adornStart, adornEnd, inputWidth = 140 }) {
  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5, flexWrap: "wrap", gap: 1 }}>
        <Typography sx={{ fontWeight: 600, fontSize: "1rem", color: "#1e293b" }}>
          {label}
        </Typography>
        <FilledInput
          value={value === 0 ? "" : value}
          onChange={onInputChange}
          disableUnderline
          startAdornment={adornStart && <InputAdornment position="start" sx={{ color: PRIMARY, fontWeight: 600, mr: 0.5 }}>{adornStart}</InputAdornment>}
          endAdornment={adornEnd && <InputAdornment position="end" sx={{ color: "#555", ml: 0.5, fontSize: "0.9rem" }}>{adornEnd}</InputAdornment>}
          inputProps={{ "aria-label": label, style: { textAlign: "right", padding: "7px 8px" } }}
          sx={inputSx(inputWidth)}
        />
      </Box>
      <Slider
        value={typeof value === 'string' ? (parseFloat(value) || 0) : value}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
        aria-label={label}
        sx={sliderSx}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.2 }}>
        <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 500 }}>{minLabel}</Typography>
        <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 500 }}>{maxLabel}</Typography>
      </Box>
    </Box>
  );
}

const PersonalLoanPage = () => {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [tenure, setTenure] = useState(24);
  const [interestRate, setInterestRate] = useState(10.99);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
  });

  // Safe Calculator functions
  const calculateEMI = (principal, rate, tenure) => {
    if (!principal || !rate || !tenure) return 0;
    const monthlyRate = rate / (12 * 100);
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
      (Math.pow(1 + monthlyRate, tenure) - 1);
    return Math.round(emi) || 0;
  };

  const numericRate = typeof interestRate === "string" ? parseFloat(interestRate) || 0 : interestRate;
  const emi = calculateEMI(loanAmount, numericRate, tenure);
  const totalAmount = emi * tenure;
  const totalInterest = Math.max(0, totalAmount - loanAmount);

  const handleAmountInput = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    const num = val === "" ? 0 : parseInt(val, 10);
    setLoanAmount(Math.min(num, 10000000)); // Limit input to max 1 Crore
  };

  const handleTenureInput = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    const num = val === "" ? 0 : parseInt(val, 10);
    setTenure(Math.min(num, 360)); // Limit input to 360 months
  };

  const handleRateInput = (e) => {
    const val = e.target.value;
    if (val === "") {
      setInterestRate(0);
      return;
    }
    if (val.endsWith(".")) {
      setInterestRate(val);
      return;
    }
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setInterestRate(Math.min(num, 50)); // Limit input to 50%
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const lenders = [
    { name: "HDFC Bank", specialty: "Fast disbursal for existing customers", logo: "/hdfc.webp" },
    { name: "ICICI Bank", specialty: "Flexible tenure up to 6 years", logo: "/icici.webp" },
    { name: "Axis Bank", specialty: "Minimal paperwork", logo: "/axis.webp" },
    { name: "IDFC First Bank", specialty: "Attractive balance transfer options", logo: "/eligibility_idfc.webp" },
    { name: "Bajaj Finserv", specialty: "Same-day personal loans", logo: "/bajaj.webp" },
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

  const personalLoanFaqSchema = {
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
        <title>Personal Loan for Chartered Accountants &amp; Salaried Professionals | F2 Fintech</title>
        <meta
          name="description"
          content="Get a personal loan for CAs, salaried professionals, and self-employed individuals across India. Same-day disbursal with Bajaj Finserv, HDFC, ICICI. Rates from 10.5% p.a. Apply online."
        />
        <meta name="keywords" content="personal loan for chartered accountant India, CA loan without collateral India, same day personal loan salaried India, personal loan for salaried professional 2026, personal loan self-employed without ITR, personal loan minimum income 20000 India" />
        <link rel="canonical" href="https://f2fintech.com/personal-loan" />
        <meta property="og:title" content="Personal Loan for Chartered Accountants &amp; Salaried Professionals | F2 Fintech" />
        <meta property="og:description" content="Get a personal loan for CAs, salaried professionals, and self-employed individuals across India. Same-day disbursal with Bajaj Finserv, HDFC, ICICI. Rates from 10.5% p.a. Apply online." />
        <meta property="og:url" content="https://f2fintech.com/personal-loan" />
        <script type="application/ld+json">{JSON.stringify(personalLoanFaqSchema)}</script>
      </Helmet>
      <Box sx={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
        {/* Visually hidden H1 for SEO compliance */}
        <Typography
          variant="h1"
          sx={{
            position: "absolute",
            width: "1px",
            height: "1px",
            padding: 0,
            margin: "-1px",
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            border: 0,
          }}
        >
          Personal Loan for Chartered Accountants, Salaried Professionals &amp; Self-Employed - Same Day Approval India
        </Typography>

        {/* Hero Section */}
        <Box
          component="section"
          sx={{
            backgroundImage: {
              xs: "url('/new/Personal-loans-mobile.webp')",
              lg: "url('/new/PersonalLoan1.webp')"
            },
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
            py: 0,
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "flex-end",
            minHeight: { xs: "320px", sm: "500px", md: "580px", lg: "450px" },
            width: "100%"
          }}
        >
          {/* Visually hidden text for SEO compliance inside Hero Section */}
          <Box
            sx={{
              position: "absolute",
              width: "1px",
              height: "1px",
              padding: 0,
              margin: "-1px",
              overflow: "hidden",
              clip: "rect(0, 0, 0, 0)",
              border: 0,
            }}
          >
            <Typography variant="h2">Personal Loan for CAs &amp; Salaried Professionals - Same Day Disbursal Across India</Typography>
            <Typography variant="body1">
              Personal loans for chartered accountants, salaried professionals, and self-employed individuals. Bajaj Finserv same-day disbursal, HDFC &amp; ICICI competitive rates starting 10.5% p.a.
            </Typography>
          </Box>

          <Container maxWidth="lg" sx={{ pb: { xs: 1.5, sm: 1.5, md: 3 } }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={7}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start", // Left-align on mobile and desktop
                    gap: { xs: 1, sm: 2 }, // Tighter gap on mobile
                    flexWrap: "wrap",
                    width: "100%",
                    ml: { xs: 0, lg: -9 },
                  }}
                >
                  <Button
                    variant="contained"
                    component={Link}
                    to="/eligibility-checker"
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.15)",
                      color: "#FFFFFF",
                      fontWeight: "500",
                      "&:hover": { bgcolor: "rgba(255, 255, 255, 0.25)", color: "white", border: "1.5px solid white" },
                      px: { xs: 1.2, sm: 3 },
                      py: 1,
                      fontSize: { xs: "0.65rem", sm: "0.9rem" },
                      borderRadius: "30px",
                      textTransform: "none",
                      height: { xs: "28px", sm: "40px" },
                      width: "auto",
                      minWidth: { xs: "105px", sm: "180px" },
                      boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.2)",
                      border: "1.5px solid white",
                    }}
                  >
                    Check Eligibility
                  </Button>

                  <Button
                    variant="outlined"
                    component={Link}
                    to="/application-form"
                    sx={{
                      border: "1.5px solid white",
                      bgcolor: "rgba(255, 255, 255, 0.15)",
                      backdropFilter: "blur(4px)",
                      color: "#FFFFFF",
                      fontWeight: "500",
                      "&:hover": {
                        bgcolor: "rgba(255, 255, 255, 0.25)",
                        borderColor: "white",
                        color: "white",
                        border: "1.5px solid white",
                      },
                      px: { xs: 1.2, sm: 3 },
                      py: 1,
                      fontSize: { xs: "0.65rem", sm: "0.9rem" },
                      borderRadius: "30px",
                      textTransform: "none",
                      height: { xs: "28px", sm: "40px" },
                      width: "auto",
                      minWidth: { xs: "80px", sm: "150px" },
                      boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    Apply Now
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
        {/* About Personal Loans Section */}
        <Container component="section" aria-labelledby="about-personal-loans" maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
          <Typography
            variant="h2"
            id="about-personal-loans"
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontWeight: 650,
              mb: 6,
              textAlign: "center",
              color: theme.palette.secondary.main,
            }}
          >
            About Our Personal Loans - For CAs, Salaried &amp; Self-Employed Professionals
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
                      <ListItemText primary="Salaried professionals, chartered accountants &amp; self-employed individuals" />
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
                      <ListItemText primary="Major purchases and planned personal expenses" />
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
          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 3,
                  boxShadow: 2,
                  height: "100%",
                  borderRadius: "20px",
                  mb: { xs: 2, md: 0 },
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
                  variant="h3"
                  sx={{ fontSize: "1.25rem", fontWeight: 600, mb: 3, color: "#3244e6" }}
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
        <Box component="section" aria-labelledby="calculator-heading" sx={{ py: { xs: 4, md: 8 } }}>
          <Container maxWidth="lg">
            <Typography
              variant="h2"
              id="calculator-heading"
              sx={{
                textAlign: "center",
                mb: { xs: 3, md: 6 },
                fontWeight: 650,
                fontSize: { xs: "1.8rem", md: "3rem" },
                color: PRIMARY,
              }}
            >
              <CalculateIcon sx={{ mr: 2, fontSize: "inherit", verticalAlign: "middle" }} />
              Personal Loan EMI Calculator
            </Typography>

            <Paper
              sx={{
                p: { xs: 3, md: 5 },
                boxShadow: "0px 10px 30px rgba(50, 68, 230, 0.06)",
                borderRadius: "24px",
                border: "1px solid #eef0fc",
              }}
            >
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={7}>
                  <SliderRow
                    label="Loan Amount"
                    value={loanAmount}
                    min={MIN_AMOUNT}
                    max={MAX_AMOUNT}
                    step={10000}
                    adornStart="₹"
                    minLabel="₹50 K"
                    maxLabel="₹50 Lakh"
                    onChange={(_, v) => setLoanAmount(v)}
                    onInputChange={handleAmountInput}
                  />

                  <SliderRow
                    label="Tenure"
                    value={tenure}
                    min={MIN_TENURE}
                    max={MAX_TENURE}
                    step={1}
                    adornEnd="months"
                    minLabel="12 months"
                    maxLabel="72 months"
                    onChange={(_, v) => setTenure(v)}
                    onInputChange={handleTenureInput}
                  />

                  <SliderRow
                    label="Interest Rate"
                    value={interestRate}
                    min={MIN_RATE}
                    max={MAX_RATE}
                    step={0.1}
                    adornEnd="% p.a."
                    minLabel="10.5% p.a."
                    maxLabel="24.0% p.a."
                    onChange={(_, v) => setInterestRate(v)}
                    onInputChange={handleRateInput}
                  />
                </Grid>

                <Grid item xs={12} md={5}>
                  <Card
                    sx={{
                      backgroundColor: "#f8f9fe",
                      border: "1px solid #eef0fc",
                      p: { xs: 3, sm: 4 },
                      borderRadius: "20px",
                      boxShadow: "none",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 3,
                    }}
                  >
                    <Typography variant="h5" sx={{ fontWeight: 700, color: "#1e293b", alignSelf: "flex-start", fontSize: "1.25rem" }}>
                      EMI Breakdown
                    </Typography>

                    <DonutChart
                      principal={loanAmount}
                      interestAmt={totalInterest}
                      total={totalAmount}
                      size={220}
                    />

                    {/* Legend / Breakdown List */}
                    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 1.5 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Box sx={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: PRIMARY, mr: 1.5 }} />
                          <Typography sx={{ color: "text.secondary", fontSize: "0.88rem", fontWeight: 500 }}>Principal Amount</Typography>
                        </Box>
                        <Typography sx={{ fontWeight: 700, color: "#1e293b", fontSize: "0.95rem" }}>
                          ₹{loanAmount.toLocaleString("en-IN")}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Box sx={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: TEAL, mr: 1.5 }} />
                          <Typography sx={{ color: "text.secondary", fontSize: "0.88rem", fontWeight: 500 }}>Total Interest</Typography>
                        </Box>
                        <Typography sx={{ fontWeight: 700, color: "#1e293b", fontSize: "0.95rem" }}>
                          ₹{totalInterest.toLocaleString("en-IN")}
                        </Typography>
                      </Box>

                      <Divider sx={{ my: 0.5, borderColor: "#eef0fc" }} />

                      <Box sx={{ width: "100%", textAlign: "center", py: 2, px: 2, backgroundColor: "white", borderRadius: "12px", border: "1px dashed #3244e6" }}>
                        <Typography sx={{ color: "text.secondary", fontSize: "0.78rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, mb: 0.5 }}>
                          Monthly EMI
                        </Typography>
                        <Typography variant="h4" sx={{ color: PRIMARY, fontWeight: 700 }}>
                          ₹{emi.toLocaleString("en-IN")}
                        </Typography>
                      </Box>
                    </Box>

                    <Button
                      variant="contained"
                      component={Link}
                      to="/application-form"
                      fullWidth
                      sx={{
                        py: 1.5,
                        fontWeight: 600,
                        borderRadius: "12px",
                        textTransform: "none",
                        backgroundColor: PRIMARY,
                        boxShadow: `0px 4px 12px ${PRIMARY}25`,
                        "&:hover": {
                          backgroundColor: "#2536c4",
                          boxShadow: `0px 6px 16px ${PRIMARY}40`,
                        }
                      }}
                    >
                      Apply for Instant Disbursal
                    </Button>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          </Container>
        </Box>

        {/* Partner Lenders cmplt */}
        <Container component="section" aria-labelledby="partner-lenders-heading" maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
          <Typography
            variant="h2"
            id="partner-lenders-heading"
            sx={{
              textAlign: "center",
              fontSize: { xs: "1.8rem", md: "3rem" },
              mb: { xs: 3, md: 6 },
              fontWeight: 650,
              color: PRIMARY,
            }}
          >
            Partner Lenders
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              justifyContent: "center",
              alignItems: "stretch",
            }}
          >
            {lenders.map((lender, index) => (
              <Box
                key={index}
                sx={{
                  flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 16px)", md: "1 1 calc(20% - 20px)" },
                  minWidth: { xs: "100%", sm: "240px", md: "180px" },
                  maxWidth: { md: "220px" },
                  p: 3,
                  border: "1px solid #eef0fc",
                  borderRadius: "16px",
                  backgroundColor: "white",
                  boxShadow: "0 4px 12px rgba(50, 68, 230, 0.02)",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 8px 24px rgba(50, 68, 230, 0.08)",
                    borderColor: PRIMARY,
                    transform: "translateY(-4px)",
                    "& img": {
                      transform: "scale(1.05)",
                    },
                    "& .lender-name": {
                      color: PRIMARY,
                    }
                  },
                }}
              >
                <Box
                  sx={{
                    height: "55px",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 1.5,
                  }}
                >
                  <img
                    src={lender.logo}
                    alt={`${lender.name} logo`}
                    style={{
                      maxHeight: "100%",
                      maxWidth: "95%",
                      objectFit: "contain",
                      mixBlendMode: "multiply",
                      transition: "transform 0.3s ease",
                    }}
                  />
                </Box>
                <Typography
                  variant="h6"
                  className="lender-name"
                  sx={{
                    fontWeight: 700,
                    color: "#1e293b",
                    transition: "color 0.2s ease",
                    mb: 1,
                    fontSize: "1rem",
                  }}
                >
                  {lender.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.4 }}>
                  {lender.specialty}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>

        {/* Download Brochure Section */}
        <Box component="section" aria-labelledby="brochure-heading" sx={{ py: { xs: 4, md: 8 } }}>
          <Container maxWidth="lg">
            <Card
              sx={{
                p: { xs: 4, md: 6 },
                boxShadow: "0px 15px 40px rgba(50, 68, 230, 0.08)",
                borderRadius: "24px",
                border: "1px solid #eef0fc",
                background: "linear-gradient(135deg, #ffffff 0%, #f9faff 100%)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Grid container spacing={4} alignItems="center">
                {/* Left side: Guide details */}
                <Grid item xs={12} md={6} sx={{ textAlign: "left" }}>
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 1,
                      px: 2,
                      py: 0.5,
                      borderRadius: "20px",
                      backgroundColor: "#eef0fc",
                      color: PRIMARY,
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      mb: 2,
                    }}
                  >
                    <DownloadIcon sx={{ fontSize: "1rem" }} />
                    Free Handbook
                  </Box>
                  <Typography
                    variant="h2"
                    id="brochure-heading"
                    sx={{
                      fontSize: { xs: "1.75rem", md: "2.25rem" },
                      fontWeight: 700,
                      color: "#1e293b",
                      mb: 2,
                      lineHeight: 1.3,
                    }}
                  >
                    Get the Personal Loan Guide
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "text.secondary", mb: 3, lineHeight: 1.6 }}
                  >
                    Access eligibility criteria, required documents, and strategies to optimise your loan terms.
                  </Typography>

                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                    {[
                      "Complete eligibility checklist",
                      "Required documents reference guide",
                      "Guidance on securing competitive interest rates",
                    ].map((item, idx) => (
                      <Box key={idx} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <CheckCircleIcon sx={{ color: "#10b981", fontSize: "1.25rem" }} />
                        <Typography sx={{ color: "#334155", fontSize: "0.95rem", fontWeight: 500 }}>
                          {item}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Grid>

                {/* Right side: Modern Form */}
                <Grid item xs={12} md={6}>
                  <Box
                    component="form"
                    sx={{
                      backgroundColor: "white",
                      p: { xs: 3, md: 4 },
                      borderRadius: "20px",
                      border: "1px solid #eef0fc",
                      boxShadow: "0px 8px 24px rgba(50, 68, 230, 0.02)",
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        color: "#1e293b",
                        mb: 3,
                        textAlign: "center",
                      }}
                    >
                      Fill details to download
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Full Name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          variant="outlined"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "12px",
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Email Address"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          variant="outlined"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "12px",
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Phone Number"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          variant="outlined"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "12px",
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="City"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          variant="outlined"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "12px",
                            }
                          }}
                        />
                      </Grid>
                    </Grid>

                    <Button
                      component="a"
                      href="https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/assets/personal-loan-proposal.pdf"
                      download="https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/assets/personal-loan-proposal.pdf"
                      variant="contained"
                      fullWidth
                      startIcon={<DownloadIcon />}
                      sx={{
                        mt: 3,
                        py: 1.6,
                        fontWeight: 650,
                        borderRadius: "12px",
                        textTransform: "none",
                        backgroundColor: PRIMARY,
                        boxShadow: `0px 4px 12px ${PRIMARY}20`,
                        "&:hover": {
                          backgroundColor: "#2536c4",
                          boxShadow: `0px 6px 16px ${PRIMARY}35`,
                        }
                      }}
                    >
                      Download Free Handbook (PDF)
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Container>
        </Box>

        {/* FAQ Section */}
        <Container component="section" aria-labelledby="faq-heading" maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
          <Typography
            variant="h2"
            id="faq-heading"
            sx={{
              fontSize: { xs: "1.8rem", md: "3rem" },
              textAlign: "center",
              mb: { xs: 3, md: 6 },
              fontWeight: 650,
              color: PRIMARY,
            }}
          >
            FAQs - Personal Loan
          </Typography>

          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              disableGutters
              elevation={0}
              sx={{
                mb: 2,
                borderRadius: "16px !important",
                border: "1px solid #eef0fc",
                backgroundColor: "white",
                boxShadow: "0 4px 16px rgba(50, 68, 230, 0.02)",
                transition: "all 0.3s ease",
                overflow: "hidden",
                "&::before": {
                  display: "none",
                },
                "&:hover": {
                  borderColor: PRIMARY,
                  boxShadow: "0 8px 24px rgba(50, 68, 230, 0.05)",
                },
                "&.Mui-expanded": {
                  borderColor: PRIMARY,
                  boxShadow: "0 8px 24px rgba(50, 68, 230, 0.06)",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: PRIMARY, fontSize: "1.5rem" }} />}
                sx={{
                  py: 2,
                  px: 4,
                  backgroundColor: "white",
                  transition: "all 0.3s ease",
                  "& .MuiAccordionSummary-content": {
                    my: 0,
                  },
                  "&.Mui-expanded": {
                    "& .faq-question": {
                      color: PRIMARY,
                    }
                  },
                  "&:hover": {
                    backgroundColor: "#f8fafc",
                  }
                }}
              >
                <Typography
                  variant="h3"
                  className="faq-question"
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: "1rem", sm: "1.1rem" },
                    lineHeight: 1.5,
                    color: "#1e293b",
                    transition: "color 0.2s ease",
                  }}
                >
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  px: 4,
                  pb: 3,
                  pt: 0.5,
                  backgroundColor: "white",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: 1.7,
                    fontSize: { xs: "0.88rem", sm: "0.95rem" },
                    color: "#475569",
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
              Apply for a Personal Loan with Confidence
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
              Submit your application and receive a lending decision within hours.
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: { xs: 1.5, sm: 2 },
                justifyContent: "center",
                flexWrap: "wrap",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                width: "100%",
                maxWidth: { xs: "320px", sm: "600px", md: "none" },
                margin: "0 auto",
              }}
            >
              <Button
                variant="contained"
                onClick={() => (window.location.href = "/eligibility-checker")}
                sx={{
                  border: "2px solid white",
                  bgcolor: "rgba(255, 255, 255, 0.15)",
                  color: "#FFFFFF",
                  fontWeight: "500",
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.25)",
                    borderColor: "white",
                    color: "white",
                    border: "2px solid white",
                  },
                  px: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
                  py: { xs: "0.5rem", sm: "0.5rem", md: "0.6rem" },
                  fontSize: {
                    xs: "0.85rem",
                    sm: "0.95rem",
                    md: "1rem",
                  },
                  lineHeight: "1.5",
                  borderRadius: "30px",
                  textTransform: "none",
                  minHeight: { xs: "42px", sm: "44px" },
                  fontFamily: "Poppins",
                  width: { xs: "100%", sm: "auto" },
                  whiteSpace: "nowrap",
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
                  "& > *": {
                    width: { xs: "100%", sm: "auto" },
                  },
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
