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
  Home as HomeIcon,
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
    fontFamily: "'Poppins', sans-serif",
  },
});

const MIN_PROP_VALUE = 1000000;
const MAX_PROP_VALUE = 200000000; // 20 Crore
const MIN_LOAN_AMOUNT = 500000;
const MAX_LOAN_AMOUNT = 100000000; // 10 Crore
const MIN_TENURE = 12;
const MAX_TENURE = 240; // 20 years
const MIN_RATE = 7.0;
const MAX_RATE = 18.0;

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

const LAPPage = () => {
  const [propertyValue, setPropertyValue] = useState(5000000);
  const [desiredLoanAmount, setDesiredLoanAmount] = useState(3000000);
  const [tenure, setTenure] = useState(180);
  const [interestRate, setInterestRate] = useState(9.5);
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

  const calculateLTV = (loanAmount, propVal) => {
    if (!propVal) return "0";
    return ((loanAmount / propVal) * 100).toFixed(1);
  };

  const numericRate = typeof interestRate === "string" ? parseFloat(interestRate) || 0 : interestRate;
  const emi = calculateEMI(desiredLoanAmount, numericRate, tenure);
  const totalAmount = emi * tenure;
  const totalInterest = Math.max(0, totalAmount - desiredLoanAmount);
  const ltv = calculateLTV(desiredLoanAmount, propertyValue);

  const handlePropValueInput = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    const num = val === "" ? 0 : parseInt(val, 10);
    const capped = Math.min(num, MAX_PROP_VALUE);
    setPropertyValue(capped);
    if (desiredLoanAmount > capped) {
      setDesiredLoanAmount(capped);
    }
  };

  const handleAmountInput = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    const num = val === "" ? 0 : parseInt(val, 10);
    setDesiredLoanAmount(Math.min(num, propertyValue));
  };

  const handleTenureInput = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    const num = val === "" ? 0 : parseInt(val, 10);
    setTenure(Math.min(num, 240));
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
      setInterestRate(Math.min(num, 30));
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const lenders = [
    { name: "HDFC Bank", specialty: "High LTV programs", logo: "/hdfc.webp" },
    { name: "ICICI Bank", specialty: "Faster legal & technical check", logo: "/icici.webp" },
    { name: "Axis Bank", specialty: "Flexible tenure", logo: "/axis.webp" },
    { name: "SBI Mortgage", specialty: "Competitive rates for salaried", logo: "/eligibility_nbfc.webp" },
    { name: "Kotak Mahindra Bank", specialty: "Quick digital processing", logo: "/eligibility_idfc.webp" },
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
          Loan Against Property - Unlock the Value of Your Asset
        </Typography>

        {/* Hero Section */}
        <Box
          component="section"
          sx={{
            backgroundImage: {
              xs: "url('/new/LAP-mobile.webp')",
              lg: "url('/new/LAP1.webp')"
            },
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
            py: 0,
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "flex-end",
            minHeight: { xs: "320px", sm: "500px", md: "750px", lg: "450px" },
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
            <Typography variant="h2">Loan Against Property - Unlock the Value of Your Asset</Typography>
            <Typography variant="body1">
              Raise funds for business, education, or consolidation at competitive rates.
            </Typography>
          </Box>

          <Container maxWidth="lg" sx={{ pb: { xs: 1.5, sm: 1.5, md: 1.5 } }}>
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
                    ml: { xs: 0, lg: -10 },
                    mb: { xs: 0, sm: -1, md: 2 },
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

        {/* About LAP Section */}
        <Container component="section" aria-labelledby="about-lap" maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
          <Typography
            variant="h2"
            id="about-lap"
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
                      <ListItemText primary="Property owners needing large funds without selling assets" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon
                          sx={{ fontSize: "1rem", color: "green" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="Businesses seeking working capital against collateral" />
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
                      <ListItemText primary="You want lower rates than unsecured options" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon
                          sx={{ fontSize: "1rem", color: "green" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="You require longer tenure and higher ticket loan sizes" />
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
                      <ListItemText primary="LTV typically 50–70% of market property value" />
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
                      <ListItemText primary="Residential/commercial properties accepted" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Eligibility & Documents */}
          <Grid container spacing={4} sx={{ mt: 4, height: "auto" }}>
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 3,
                  boxShadow: 2,
                  height: "100%",
                  borderRadius: "20px",
                  mb: { xs: 2, md: 5 },
                }}
              >
                <Typography
                  variant="h3"
                  sx={{ fontSize: "1.25rem", fontWeight: 600, mb: 3, color: "#3244e6" }}
                >
                  Eligibility snapshot
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: "green" }} />
                    </ListItemIcon>
                    <ListItemText primary="Clear property title and technical clearance" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: "green" }} />
                    </ListItemIcon>
                    <ListItemText primary="Stable repayment capacity (ITR, business/salaried income)" />
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
                    <ListItemText primary="KYC and standard income proofs" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: "green" }} />
                    </ListItemIcon>
                    <ListItemText primary="Property chain details, valuation checks, and tax receipts" />
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
              LAP EMI Calculator
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
                    label="Property Value"
                    value={propertyValue}
                    min={MIN_PROP_VALUE}
                    max={MAX_PROP_VALUE}
                    step={500000}
                    adornStart="₹"
                    minLabel="₹10 Lakh"
                    maxLabel="₹20 Crore"
                    onChange={(_, v) => {
                      setPropertyValue(v);
                      if (desiredLoanAmount > v) setDesiredLoanAmount(v);
                    }}
                    onInputChange={handlePropValueInput}
                  />

                  <SliderRow
                    label="Desired Loan Amount"
                    value={desiredLoanAmount}
                    min={MIN_LOAN_AMOUNT}
                    max={propertyValue}
                    step={100000}
                    adornStart="₹"
                    minLabel="₹5 Lakh"
                    maxLabel={`Max (₹${(propertyValue / 10000000).toFixed(2)} Cr)`}
                    onChange={(_, v) => setDesiredLoanAmount(Math.min(v, propertyValue))}
                    onInputChange={handleAmountInput}
                  />

                  <SliderRow
                    label="Tenure"
                    value={tenure}
                    min={MIN_TENURE}
                    max={MAX_TENURE}
                    step={12}
                    adornEnd="months"
                    minLabel="12 months"
                    maxLabel="240 months (20 Years)"
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
                    minLabel="7.0% p.a."
                    maxLabel="18.0% p.a."
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
                      Breakdown breakdown
                    </Typography>

                    <DonutChart
                      principal={desiredLoanAmount}
                      interestAmt={totalInterest}
                      total={totalAmount}
                      size={220}
                    />

                    {/* Legend / Breakdown List */}
                    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 1.5 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Box sx={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: PRIMARY, mr: 1.5 }} />
                          <Typography sx={{ color: "text.secondary", fontSize: "0.88rem", fontWeight: 500 }}>Loan Amount</Typography>
                        </Box>
                        <Typography sx={{ fontWeight: 700, color: "#1e293b", fontSize: "0.95rem" }}>
                          ₹{desiredLoanAmount.toLocaleString("en-IN")}
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

                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Box sx={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#e2e8f0", mr: 1.5 }} />
                          <Typography sx={{ color: "text.secondary", fontSize: "0.88rem", fontWeight: 500 }}>LTV Ratio</Typography>
                        </Box>
                        <Typography sx={{ fontWeight: 700, color: "#1e293b", fontSize: "0.95rem" }}>
                          {ltv}%
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
                      Apply for LAP Disbursal
                    </Button>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          </Container>
        </Box>

        {/* Partner Lenders */}
        <Container component="section" aria-labelledby="partner-lenders-heading" maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
          <Typography
            variant="h2"
            id="partner-lenders-heading"
            sx={{
              textAlign: "center",
              fontSize: { xs: "1.8rem", md: "3.5rem" },
              mb: { xs: 3, md: 6 },
              fontWeight: 650,
              color: PRIMARY,
            }}
          >
            Partner Lenders
          </Typography>

          <Grid container spacing={3} sx={{ justifyContent: "center" }}>
            {lenders.map((lender, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box
                  sx={{
                    p: 3,
                    border: "1px solid #eef0fc",
                    borderRadius: "16px",
                    backgroundColor: "white",
                    boxShadow: "0 4px 12px rgba(50, 68, 230, 0.02)",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: "100%",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 8px 24px rgba(50, 68, 230, 0.08)",
                      borderColor: PRIMARY,
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <Box sx={{ height: "55px", display: "flex", alignItems: "center", mb: 2 }}>
                    <img
                      src={lender.logo}
                      alt={lender.name}
                      style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain", mixBlendMode: "multiply" }}
                    />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: "#1e293b", mb: 1, fontSize: "1rem" }}>
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
                    Download LAP Handbook
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "text.secondary", mb: 3, lineHeight: 1.6 }}
                  >
                    Uncover critical insights, standard eligibility rules, essential checklist of documents, and smart technical valuation tips.
                  </Typography>

                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                    {[
                      "Complete eligibility snapshot",
                      "How legal valuation is done",
                      "How prepayments reduce interest burden",
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
                      href="https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/assets/loan-against-property.pdf"
                      download="https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/assets/loan-against-property.pdf"
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
            FAQs - LAP
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
              Apply for a Loan Against Property
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
              Begin your application and receive a structured offer based on your property valuation.
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

export default LAPPage;
