"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  Paper,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Slider,
  InputAdornment,
  FilledInput,
  Chip,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckCircleIcon,
  WorkOutline as WorkOutlineIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ButtonComp from "../common/button/Button";

const theme = createTheme({
  palette: {
    primary: { main: "#3244e6" },
    secondary: { main: "#3244e6" },
  },
  typography: { fontFamily: "'Poppins', sans-serif" },
});

const MAX_AMOUNT = 5000000;
const MAX_TENURE = 84;
const PRIMARY = "#3244e6";
const TEAL = "#3DC8BA";

const sliderSx = {
  color: PRIMARY,
  height: 8,
  padding: "13px 0",
  "& .MuiSlider-rail": { backgroundColor: "#E2E5FF", opacity: 1 },
  "& .MuiSlider-track": { backgroundColor: PRIMARY, border: "none" },
  "& .MuiSlider-thumb": {
    width: 24, height: 24,
    backgroundColor: "#fff",
    border: `2px solid ${PRIMARY}`,
    boxShadow: "0 0 0 4px rgba(50, 68, 230, 0.1)",
    "&::before": { display: "none" },
    "&:hover, &.Mui-active": { boxShadow: "0 0 0 8px rgba(50, 68, 230, 0.2)" },
  },
};

const inputSx = (width = 130) => ({
  width,
  background: "#fff",
  borderRadius: "8px",
  border: "1.5px solid #EAEAEA",
  "& input": { padding: "7px 10px", fontWeight: 700, fontSize: "1.05rem", color: PRIMARY, textAlign: "right" },
});

function DonutChart({ principal, interestAmt, total, size = 220 }) {
  const r = size * 0.35, sw = size * 0.07, circ = 2 * Math.PI * r;
  const safe = total > 0 ? total : 1;
  const pDash = (principal / safe) * circ, iDash = (interestAmt / safe) * circ;
  const cx = size / 2, cy = size / 2;
  return (
    <Box sx={{ position: "relative", width: size, height: size, mx: "auto" }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)", display: "block" }}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#F1F3F9" strokeWidth={sw} />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={PRIMARY} strokeWidth={sw} strokeDasharray={`${Math.max(0, pDash - 2)} ${circ}`} strokeLinecap="butt" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={TEAL} strokeWidth={sw} strokeDasharray={`${Math.max(0, iDash - 2)} ${circ}`} strokeDashoffset={-pDash} strokeLinecap="butt" />
      </svg>
      <Box sx={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", px: 1 }}>
        <Typography sx={{ fontSize: "0.75rem", color: "text.secondary", fontWeight: 500, textTransform: "uppercase", letterSpacing: 0.5 }}>Total Payable</Typography>
        <Typography sx={{ fontSize: "1.15rem", fontWeight: 700, color: "#1e293b", mt: 0.5 }}>
          {"\u20B9"}{Number(total).toLocaleString("en-IN")}
        </Typography>
      </Box>
    </Box>
  );
}

function SliderRow({ label, value, min, max, step, minLabel, maxLabel, onChange, onInputChange, adornStart, adornEnd, inputWidth = 140 }) {
  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5, flexWrap: "wrap", gap: 1 }}>
        <Typography sx={{ fontWeight: 600, fontSize: "1rem", color: "#1e293b" }}>{label}</Typography>
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
      <Slider value={typeof value === "string" ? parseFloat(value) || 0 : value} min={min} max={max} step={step} onChange={onChange} aria-label={label} sx={sliderSx} />
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.2 }}>
        <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 500 }}>{minLabel}</Typography>
        <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 500 }}>{maxLabel}</Typography>
      </Box>
    </Box>
  );
}

const ProfessionalLoanPage = () => {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [tenure, setTenure] = useState(36);
  const [interestRate, setInterestRate] = useState(12.5);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", profession: "", city: "" });

  const calculateEMI = (principal, rate, months) => {
    if (!principal || !rate || !months) return 0;
    const r = rate / (12 * 100);
    return Math.round((principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1)) || 0;
  };

  const numericRate = typeof interestRate === "string" ? parseFloat(interestRate) || 0 : interestRate;
  const emi = calculateEMI(loanAmount, numericRate, tenure);
  const totalAmount = emi * tenure;
  const totalInterest = Math.max(0, totalAmount - loanAmount);

  const handleAmountInput = (e) => { const n = parseInt(e.target.value.replace(/[^0-9]/g, ""), 10) || 0; setLoanAmount(Math.min(n, MAX_AMOUNT)); };
  const handleTenureInput = (e) => { const n = parseInt(e.target.value.replace(/[^0-9]/g, ""), 10) || 0; setTenure(Math.min(n, MAX_TENURE)); };
  const handleRateInput = (e) => { const v = e.target.value; if (v === "") { setInterestRate(0); return; } if (v.endsWith(".")) { setInterestRate(v); return; } const n = parseFloat(v); if (!isNaN(n)) setInterestRate(Math.min(n, 50)); };
  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); window.location.href = "/application-form"; };

  const professions = ["Doctors (MBBS / BDS / MD)", "Chartered Accountants (CA)", "Architects", "Engineers & Consultants", "Company Secretaries (CS)", "Cost Accountants (CMA)", "Lawyers", "Management Consultants"];

  const eligibilityItems = [
    "Registered Indian professional with valid licence or degree",
    "Age: 25 to 65 years (varies by lender)",
    "Minimum 2 years of professional experience or practice vintage",
    "Annual income: \u20B93 lakh or above (varies by lender and amount requested)",
    "CIBIL score of 700 or above recommended",
    "Self-employed professionals: ITR + bank statements as income proof",
    "Salaried professionals: salary slips + Form 16",
  ];

  const documents = [
    "Identity proof: Aadhaar card, PAN card, or passport",
    "Address proof: utility bill, rental agreement, or Aadhaar",
    "Qualification proof: degree certificate or professional registration",
    "Income proof: last 2 years ITR with computation (self-employed) or last 3 salary slips + Form 16 (salaried)",
    "Bank statements: last 6\u201312 months (primary account)",
    "Practice proof: clinic/office lease, professional registration certificate",
    "Passport-size photographs",
  ];

  const lenders = [
    { name: "HDFC Bank", specialty: "Fast disbursal for professionals", logo: "/hdfc.svg" },
    { name: "ICICI Bank", specialty: "Flexible tenure up to 6 years", logo: "/icici.svg" },
    { name: "Bajaj Finserv", specialty: "Pre-approved limits", logo: "/bajaj.webp" },
    { name: "Tata Capital", specialty: "High limits for senior professionals", logo: "/tata_capital.svg" },
    { name: "IDFC First Bank", specialty: "Competitive rates", logo: "/eligibility_idfc.webp" },
  ];

  const faqs = [
    { question: "What is a professional loan?", answer: "A professional loan is a collateral-free credit product for qualified professionals \u2014 doctors, CAs, architects, engineers, lawyers, and consultants. Lenders offer higher limits and competitive rates based on your qualification and income stability, without requiring physical assets as security." },
    { question: "What is the difference between a professional loan and a personal loan?", answer: "A professional loan targets qualified professionals with recognised degrees, often offering higher loan limits, lower rates, and simpler documentation. A personal loan is broadly available to salaried and self-employed individuals. If you are a doctor, CA, or architect, you may qualify for better terms under a professional loan." },
    { question: "Can fresh professionals with under 2 years of experience apply?", answer: "Some lenders \u2014 particularly for doctors and CAs \u2014 offer professional loans to fresh practitioners, assessed on qualification, registration, and projected income. Eligibility and terms vary significantly by lender. Contact F2 Fintech to check your specific eligibility." },
    { question: "What CIBIL score is needed?", answer: "Most lenders require a minimum CIBIL score of 700. Some may accept 680+ for established professionals with strong income. A higher score typically results in better rates and higher approved amounts." },
    { question: "How much can I borrow?", answer: "Professional loan amounts typically range from \u20B91 lakh to \u20B950 lakh, depending on your income, credit profile, professional vintage, and lender policy. Senior professionals with higher income and clean credit history may qualify for higher limits." },
    { question: "What documents are required?", answer: "Typically: identity proof (Aadhaar/PAN), address proof, professional qualification certificate, last 2 years ITR or salary slips, 6\u201312 months bank statements, and professional registration certificate. Requirements vary by lender and applicant type." },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>

        {/* Hero Section with VISIBLE H1 */}
        <Box component="section" sx={{ background: "linear-gradient(135deg, #1a237e 0%, #3244e6 60%, #3DC8BA 100%)", color: "white", py: { xs: 6, md: 10 }, position: "relative", overflow: "hidden" }}>
          <Box sx={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
          <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={7}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2, opacity: 0.8 }}>
                  <Typography component={Link} to="/" sx={{ color: "rgba(255,255,255,0.8)", textDecoration: "none", fontSize: "0.85rem" }}>Home</Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>{"\u203A"}</Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.8)", fontSize: "0.85rem" }}>Professional Loan</Typography>
                </Box>
                <Typography variant="h1" sx={{ fontSize: { xs: "1.8rem", sm: "2.4rem", md: "3rem" }, fontWeight: 800, lineHeight: 1.2, mb: 2, color: "white" }}>
                  Professional Loan in India
                </Typography>
                <Typography variant="h2" sx={{ fontSize: { xs: "1rem", sm: "1.2rem", md: "1.35rem" }, fontWeight: 500, mb: 3, color: "rgba(255,255,255,0.9)", lineHeight: 1.5 }}>
                  Collateral-free financing for doctors, CAs, architects, engineers &amp; consultants — up to {"\u20B9"}50 lakh
                </Typography>
                <Typography sx={{ mb: 4, color: "rgba(255,255,255,0.8)", fontSize: { xs: "0.9rem", md: "1rem" }, maxWidth: 560, lineHeight: 1.7 }}>
                  F2 Fintech connects qualified professionals with personalised loan offers from leading banks and NBFCs across India. Compare lenders and apply — 100% paperless.
                </Typography>
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <Button variant="contained" component={Link} to="/eligibility-checker" sx={{ bgcolor: "white", color: PRIMARY, fontWeight: 700, px: 3, py: 1.5, borderRadius: "30px", textTransform: "none" }}>Check Eligibility</Button>
                  <Button variant="outlined" component={Link} to="/application-form" sx={{ borderColor: "white", color: "white", fontWeight: 600, px: 3, py: 1.5, borderRadius: "30px", textTransform: "none" }}>Apply Now</Button>
                </Box>
                <Box sx={{ display: "flex", gap: 3, mt: 4, flexWrap: "wrap" }}>
                  {[{ label: "Up to \u20B950 Lakh", sub: "Loan Amount" }, { label: "From 10.5% p.a.", sub: "Indicative Rate*" }, { label: "12\u201384 Months", sub: "Tenure" }].map(s => (
                    <Box key={s.label} sx={{ textAlign: "center" }}>
                      <Typography sx={{ fontWeight: 700, fontSize: { xs: "1rem", md: "1.2rem" }, color: "white" }}>{s.label}</Typography>
                      <Typography sx={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.7)" }}>{s.sub}</Typography>
                    </Box>
                  ))}
                </Box>
                <Typography sx={{ mt: 1.5, fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", fontStyle: "italic" }}>
                  * Indicative only. Actual rates depend on your profile, lender, and loan terms. Not a guaranteed offer.
                </Typography>
              </Grid>
              <Grid item xs={12} md={5}>
                <Card sx={{ borderRadius: 3, p: 2.5, background: "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.2)" }}>
                  <Typography sx={{ fontWeight: 700, fontSize: "1rem", color: "white", mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                    <WorkOutlineIcon sx={{ fontSize: "1.2rem" }} /> Eligible Professions
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {professions.map(p => (
                      <Chip key={p} label={p} sx={{ backgroundColor: "rgba(255,255,255,0.15)", color: "white", fontSize: "0.78rem", fontWeight: 500, border: "1px solid rgba(255,255,255,0.25)" }} />
                    ))}
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* What Is a Professional Loan */}
        <Box component="section" sx={{ py: { xs: 5, md: 8 }, background: "#fff" }}>
          <Container maxWidth="lg">
            <Typography variant="h2" sx={{ fontSize: { xs: "1.5rem", md: "2rem" }, fontWeight: 700, color: "#1e293b", mb: 2 }}>What Is a Professional Loan?</Typography>
            <Typography sx={{ color: "#475569", lineHeight: 1.8, mb: 2.5, fontSize: { xs: "0.95rem", md: "1.05rem" }, maxWidth: 820 }}>
              A professional loan is a collateral-free credit product available to qualified and practising professionals in India — doctors, chartered accountants, architects, engineers, lawyers, and management consultants. Unlike standard personal loans, these are underwritten based on your qualification, registration, income stability, and repayment capacity rather than physical assets.
            </Typography>
            <Typography sx={{ color: "#475569", lineHeight: 1.8, mb: 3, fontSize: { xs: "0.95rem", md: "1.05rem" }, maxWidth: 820 }}>
              Lenders recognise professionals as lower risk due to stable, verifiable income. Professional loans often offer higher limits (up to {"\u20B9"}50 lakh), competitive rates, and flexible repayment periods compared to general personal loans. The primary difference versus a business loan is that the funds are for professional or personal purposes — not for registered business entities.
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {[{label: "Doctor Loan", path: "/doctor-loan"}, {label: "Personal Loan", path: "/personal-loan"}, {label: "Business Loan", path: "/business-loan"}].map(l => (
                <Button key={l.label} component={Link} to={l.path} variant="outlined" sx={{ borderRadius: "30px", textTransform: "none", fontWeight: 600, color: PRIMARY, borderColor: PRIMARY }}>{l.label} {"\u2192"}</Button>
              ))}
            </Box>
          </Container>
        </Box>

        {/* Eligibility & Documents */}
        <Box component="section" sx={{ py: { xs: 5, md: 8 }, background: "#f8f9fa" }}>
          <Container maxWidth="lg">
            <Grid container spacing={5}>
              <Grid item xs={12} md={6}>
                <Typography variant="h2" sx={{ fontSize: { xs: "1.5rem", md: "1.8rem" }, fontWeight: 700, color: "#1e293b", mb: 3 }}>Eligibility Criteria</Typography>
                <List disablePadding>
                  {eligibilityItems.map(item => (
                    <ListItem key={item} disablePadding sx={{ alignItems: "flex-start", mb: 1.5 }}>
                      <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}><CheckCircleIcon sx={{ color: PRIMARY, fontSize: "1.1rem" }} /></ListItemIcon>
                      <ListItemText primary={item} primaryTypographyProps={{ sx: { color: "#475569", fontSize: "0.95rem", lineHeight: 1.6 } }} />
                    </ListItem>
                  ))}
                </List>
                <Box sx={{ mt: 3, p: 2, background: "#fff3cd", borderRadius: 2, border: "1px solid #ffc107" }}>
                  <Typography sx={{ fontSize: "0.85rem", color: "#856404" }}>
                    <strong>Note:</strong> Eligibility criteria, minimum income, and documentation requirements vary by lender. F2 Fintech will match you with lenders whose criteria align with your profile.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h3" sx={{ fontSize: { xs: "1.3rem", md: "1.5rem" }, fontWeight: 700, color: "#1e293b", mb: 3 }}>Documents Required</Typography>
                <List disablePadding>
                  {documents.map(doc => (
                    <ListItem key={doc} disablePadding sx={{ alignItems: "flex-start", mb: 1.5 }}>
                      <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}><CheckCircleIcon sx={{ color: TEAL, fontSize: "1.1rem" }} /></ListItemIcon>
                      <ListItemText primary={doc} primaryTypographyProps={{ sx: { color: "#475569", fontSize: "0.95rem", lineHeight: 1.6 } }} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* EMI Calculator */}
        <Box component="section" sx={{ py: { xs: 5, md: 8 }, background: "#fff" }}>
          <Container maxWidth="lg">
            <Typography variant="h2" sx={{ fontSize: { xs: "1.5rem", md: "1.8rem" }, fontWeight: 700, color: "#1e293b", mb: 1 }}>Professional Loan EMI Calculator</Typography>
            <Typography sx={{ color: "#64748b", mb: 4, fontSize: "0.95rem" }}>Estimate your monthly EMI. Actual EMI depends on lender terms and your approved interest rate.</Typography>
            <Grid container spacing={4} alignItems="flex-start">
              <Grid item xs={12} md={7}>
                <Paper sx={{ p: { xs: 2.5, md: 4 }, borderRadius: 3, border: "1px solid #e2e8f0", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
                  <SliderRow label="Loan Amount" value={loanAmount} min={100000} max={MAX_AMOUNT} step={50000} minLabel={"\u20B91 Lakh"} maxLabel={"\u20B950 Lakh"} adornStart={"\u20B9"} onChange={(_, v) => setLoanAmount(v)} onInputChange={handleAmountInput} inputWidth={160} />
                  <SliderRow label="Tenure" value={tenure} min={12} max={MAX_TENURE} step={6} minLabel="12 months" maxLabel="84 months" adornEnd="Mo" onChange={(_, v) => setTenure(v)} onInputChange={handleTenureInput} />
                  <SliderRow label="Interest Rate" value={interestRate} min={10.5} max={22} step={0.25} minLabel="10.5%" maxLabel="22%" adornEnd="%" onChange={(_, v) => setInterestRate(v)} onInputChange={handleRateInput} />
                </Paper>
              </Grid>
              <Grid item xs={12} md={5}>
                <Box sx={{ p: { xs: 2.5, md: 3.5 }, borderRadius: 3, background: "linear-gradient(135deg, #f0f3ff 0%, #e8f8f7 100%)", border: "1px solid #e2e8f0" }}>
                  <DonutChart principal={loanAmount} interestAmt={totalInterest} total={totalAmount} size={180} />
                  <Divider sx={{ my: 2.5 }} />
                  {[
                    { label: "Monthly EMI", value: `\u20B9${emi.toLocaleString("en-IN")}`, color: PRIMARY, bold: true },
                    { label: "Principal Amount", value: `\u20B9${loanAmount.toLocaleString("en-IN")}`, color: "#1e293b" },
                    { label: "Total Interest", value: `\u20B9${totalInterest.toLocaleString("en-IN")}`, color: TEAL },
                    { label: "Total Payable", value: `\u20B9${totalAmount.toLocaleString("en-IN")}`, color: "#1e293b" },
                  ].map(row => (
                    <Box key={row.label} sx={{ display: "flex", justifyContent: "space-between", mb: 1.2, alignItems: "center" }}>
                      <Typography sx={{ color: "#64748b", fontSize: "0.9rem" }}>{row.label}</Typography>
                      <Typography sx={{ fontWeight: row.bold ? 800 : 600, color: row.color, fontSize: row.bold ? "1.15rem" : "0.95rem" }}>{row.value}</Typography>
                    </Box>
                  ))}
                  <Typography sx={{ mt: 2, fontSize: "0.72rem", color: "#94a3b8", fontStyle: "italic" }}>
                    Illustrative calculation only. Not an approved loan offer.
                  </Typography>
                  <Button fullWidth variant="contained" component={Link} to="/application-form" sx={{ mt: 2.5, bgcolor: PRIMARY, borderRadius: "30px", textTransform: "none", fontWeight: 700, py: 1.2 }} endIcon={<ArrowForwardIcon />}>
                    Apply Now
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Lending Partners */}
        <Box component="section" sx={{ py: { xs: 5, md: 7 }, background: "#f8f9fa" }}>
          <Container maxWidth="lg">
            <Typography variant="h2" sx={{ fontSize: { xs: "1.4rem", md: "1.8rem" }, fontWeight: 700, color: "#1e293b", mb: 1, textAlign: "center" }}>Our Lending Partners</Typography>
            <Typography sx={{ color: "#64748b", mb: 4, textAlign: "center", maxWidth: 600, mx: "auto", fontSize: "0.95rem" }}>F2 Fintech works with leading banks and NBFCs to find the best professional loan offer for your profile.</Typography>
            <Grid container spacing={3} justifyContent="center">
              {lenders.map(lender => (
                <Grid item xs={6} sm={4} md={2.4} key={lender.name}>
                  <Card sx={{ borderRadius: 2, p: 2, textAlign: "center", border: "1px solid #e2e8f0", boxShadow: "none", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 1 }}>
                    <Box component="img" src={lender.logo} alt={`${lender.name} professional loan`} sx={{ height: 36, maxWidth: "100%", objectFit: "contain" }} loading="lazy" />
                    <Typography sx={{ fontWeight: 600, fontSize: "0.78rem", color: "#334155" }}>{lender.name}</Typography>
                    <Typography sx={{ fontSize: "0.7rem", color: "#64748b" }}>{lender.specialty}</Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Lead Form */}
        <Box component="section" sx={{ py: { xs: 5, md: 8 }, background: `linear-gradient(135deg, ${PRIMARY} 0%, #1a237e 100%)` }}>
          <Container maxWidth="md">
            <Typography variant="h2" sx={{ fontSize: { xs: "1.5rem", md: "2rem" }, fontWeight: 700, color: "white", mb: 1, textAlign: "center" }}>Get a Personalised Professional Loan Quote</Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.8)", mb: 4, textAlign: "center", fontSize: "0.95rem" }}>Fill in your details and a loan advisor will get in touch within one business day.</Typography>
            <Card sx={{ p: { xs: 3, md: 4 }, borderRadius: 3, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid container spacing={2.5}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth required label="Full Name" name="name" value={formData.name} onChange={handleInputChange} variant="outlined" inputProps={{ "aria-label": "Full Name", maxLength: 80, autoComplete: "name" }} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth required label="Mobile Number" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} variant="outlined" inputProps={{ "aria-label": "Mobile Number", maxLength: 10, autoComplete: "tel" }} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Email Address" name="email" type="email" value={formData.email} onChange={handleInputChange} variant="outlined" inputProps={{ "aria-label": "Email Address", autoComplete: "email" }} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="City" name="city" value={formData.city} onChange={handleInputChange} variant="outlined" inputProps={{ "aria-label": "City", maxLength: 50, autoComplete: "address-level2" }} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Your Profession (e.g., Doctor, CA, Architect)" name="profession" value={formData.profession} onChange={handleInputChange} variant="outlined" inputProps={{ "aria-label": "Your Profession", maxLength: 80 }} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography sx={{ fontSize: "0.78rem", color: "#64748b", mb: 2 }}>
                      By submitting, you consent to F2 Fintech contacting you for loan assistance. Your information is protected per our{" "}
                      <Link to="/privacy-policy" style={{ color: PRIMARY }}>Privacy Policy</Link>. Submission is not a guarantee of loan approval.
                    </Typography>
                    <ButtonComp type="submit" fullWidth label="Get My Professional Loan Quote" />
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Container>
        </Box>

        {/* FAQ */}
        <Box component="section" sx={{ py: { xs: 5, md: 8 }, background: "#fff" }}>
          <Container maxWidth="lg">
            <Typography variant="h2" sx={{ fontSize: { xs: "1.5rem", md: "1.8rem" }, fontWeight: 700, color: "#1e293b", mb: 4 }}>Frequently Asked Questions</Typography>
            {faqs.map(faq => (
              <Accordion key={faq.question} sx={{ mb: 1.5, borderRadius: "8px !important", border: "1px solid #e2e8f0", boxShadow: "none", "&:before": { display: "none" } }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: PRIMARY }} />}>
                  <Typography sx={{ fontWeight: 600, color: "#1e293b", fontSize: { xs: "0.9rem", md: "1rem" } }}>{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ color: "#475569", lineHeight: 1.7, fontSize: "0.95rem" }}>{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Container>
        </Box>

        {/* Related Links */}
        <Box component="section" sx={{ py: { xs: 5, md: 7 }, background: "#f0f3ff" }}>
          <Container maxWidth="lg">
            <Typography variant="h2" sx={{ fontSize: { xs: "1.3rem", md: "1.6rem" }, fontWeight: 700, color: "#1e293b", mb: 3 }}>Explore Related Products</Typography>
            <Grid container spacing={2}>
              {[
                { title: "Doctor Loan", desc: "Specialized financing for MBBS, BDS, and medical professionals", path: "/doctor-loan" },
                { title: "Personal Loan", desc: "Fast loans for salaried and self-employed individuals", path: "/personal-loan" },
                { title: "Business Loan", desc: "Collateral-free MSME loans up to \u20B950 lakh", path: "/business-loan" },
                { title: "Check CIBIL Score", desc: "Check your credit score for free", path: "/check-cibil-score" },
              ].map(item => (
                <Grid item xs={12} sm={6} md={3} key={item.title}>
                  <Card component={Link} to={item.path} sx={{ display: "block", textDecoration: "none", p: 2.5, borderRadius: 2, border: "1px solid #c7d2fe", boxShadow: "none", height: "100%" }}>
                    <Typography sx={{ fontWeight: 700, color: PRIMARY, mb: 1, fontSize: "1rem" }}>{item.title}</Typography>
                    <Typography sx={{ color: "#64748b", fontSize: "0.85rem", lineHeight: 1.5 }}>{item.desc}</Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

      </Box>
    </ThemeProvider>
  );
};

export default ProfessionalLoanPage;
