"use client"

import { useState } from "react"
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
} from "@mui/material"
import {
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckCircleIcon,
  Person as PersonIcon,
  AccountBalance as AccountBalanceIcon,
  Calculate as CalculateIcon,
  Download as DownloadIcon,
  Home as HomeIcon,
} from "@mui/icons-material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import ButtonComp from "../common/button/Button"

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
})

const LAPPage = () => {
  const [propertyValue, setPropertyValue] = useState(5000000)
  const [desiredLoanAmount, setDesiredLoanAmount] = useState(3000000)
  const [tenure, setTenure] = useState(180) // 15 years in months
  const [interestRate, setInterestRate] = useState(9.5)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
  })

  // Calculator functions
  const calculateEMI = (principal, rate, tenure) => {
    const monthlyRate = rate / (12 * 100)
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1)
    return Math.round(emi)
  }

  const calculateLTV = (loanAmount, propertyValue) => {
    return ((loanAmount / propertyValue) * 100).toFixed(1)
  }

  const emi = calculateEMI(desiredLoanAmount, interestRate, tenure)
  const totalAmount = emi * tenure
  const totalInterest = totalAmount - desiredLoanAmount
  const ltv = calculateLTV(desiredLoanAmount, propertyValue)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const lenders = [
    { name: "HDFC Bank", specialty: "High LTV programs" },
    { name: "ICICI Bank", specialty: "Faster legal & technical" },
    { name: "Axis Bank", specialty: "Flexible tenure" },
    { name: "SBI", specialty: "Competitive rates for salaried" },
    { name: "Kotak Mahindra Bank", specialty: "Quick processing" },
  ]

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
  ]

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
        {/* Hero Section */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #3244e6 0%, #3244e6 100%)",
            color: "white",
            py: 8,
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
                    fontSize: { xs: "2.5rem", md: "3.5rem" },
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
                    mb: 4,
                    opacity: 0.9,
                    fontWeight: 400,
                    lineHeight: 1.6,
                  }}
                >
                  Raise funds for business, education, or consolidation at competitive rates.
                </Typography>
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
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
                      px: { xs: 2, sm: 3 },
                      py: { xs: 1, sm: 1.5 },
                      fontSize: {
                        xs: "0.9rem",
                        sm: "1rem",
                        md: "1.1rem",
                      },
                      borderRadius: 6,
                      textTransform: "none",
                      height: { xs: "6.3", sm: "2.5rem", md: "6.3" },
                      fontFamily: "Poppins",
                      width: { xs: "100%", sm: "auto" },
                      minWidth: { xs: "100%", sm: "220px" },
                    }}
                    fullWidth={false}
                  >
                    Check Eligibility
                  </Button>
                  <div style={{ border: "2px solid white", borderRadius: 30 }}>
                    <ButtonComp props={{ width: "100%" }} />
                  </div>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ textAlign: "center" }}>
                  <iframe
                    style={{ width: "400px", height: "400px", border: 0 }}
                    src="https://lottie.host/embed/a0d0bc4f-fccc-48ab-bd56-5e3a667f59fd/k3WGQ5D59A.lottie"
                  />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* About LAP Section */}
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
            About LAP
          </Typography>

          <Grid container spacing={4}>
            {/* Who it's for */}
            <Grid item xs={12} md={4}>
              <Card sx={{ height: "100%", boxShadow: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <PersonIcon sx={{ fontSize: "3rem", color: "#3244e6", mb: 2 }} />
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                    Who it's for
                  </Typography>
                  <List dense>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon sx={{ fontSize: "1rem", color: "green" }} />
                      </ListItemIcon>
                      <ListItemText primary="Property owners needing large-ticket funds without selling assets" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* When to choose */}
            <Grid item xs={12} md={4}>
              <Card sx={{ height: "100%", boxShadow: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <HomeIcon sx={{ fontSize: "3rem", color: "#3244e6", mb: 2 }} />
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                    When to choose
                  </Typography>
                  <List dense>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon sx={{ fontSize: "1rem", color: "green" }} />
                      </ListItemIcon>
                      <ListItemText primary="You want lower rates than unsecured loans" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon sx={{ fontSize: "1rem", color: "green" }} />
                      </ListItemIcon>
                      <ListItemText primary="You need longer tenure and higher amounts" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* Key Features */}
            <Grid item xs={12} md={4}>
              <Card sx={{ height: "100%", boxShadow: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <AccountBalanceIcon sx={{ fontSize: "3rem", color: "#3244e6", mb: 2 }} />
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                    Key features
                  </Typography>
                  <List dense>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon sx={{ fontSize: "1rem", color: "green" }} />
                      </ListItemIcon>
                      <ListItemText primary="LTV typically 50–70% of property value" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon sx={{ fontSize: "1rem", color: "green" }} />
                      </ListItemIcon>
                      <ListItemText primary="Tenure up to 15–20 years" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon sx={{ fontSize: "1rem", color: "green" }} />
                      </ListItemIcon>
                      <ListItemText primary="Residential/commercial properties accepted (lender-specific)" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Eligibility & Documents */}
          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, boxShadow: 2, height: "100%" }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: "#3244e6" }}>
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
              <Paper sx={{ p: 3, boxShadow: 2, height: "100%" }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: "#3244e6" }}>
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
        <Box sx={{ backgroundColor: "#f0f7ff", py: 8 }}>
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              sx={{
                textAlign: "center",
                mb: 6,
                fontWeight: 650,
                color: "#3244e6",
              }}
            >
              <CalculateIcon sx={{ mr: 2, fontSize: "inherit" }} />
              Calculator (LAP)
            </Typography>

            <Paper sx={{ p: 4, boxShadow: 3 }}>
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
                    onChange={(e) => setDesiredLoanAmount(Number(e.target.value))}
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
                  <Card sx={{ backgroundColor: "#e3f2fd", p: 3, mb: 3 }}>
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
                    <Typography variant="body1">Total Interest: ₹{totalInterest.toLocaleString()}</Typography>
                    <Typography variant="body1">Total Payable: ₹{totalAmount.toLocaleString()}</Typography>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          </Container>
        </Box>

        {/* Partner Lenders */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              mb: 6,
              fontWeight: 650,
              color: "#3244e6",
            }}
          >
            Partner lenders (examples)
          </Typography>

          <Grid container spacing={3}>
            {lenders.map((lender, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ height: "100%", boxShadow: 2, "&:hover": { boxShadow: 4 } }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: "#3244e6" }}>
                      {lender.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {lender.specialty}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Download Brochure */}
        <Box sx={{ backgroundColor: "#f0f7ff", py: 6 }}>
          <Container maxWidth="lg">
            <Card sx={{ p: 4, textAlign: "center", boxShadow: 3 }}>
              <DownloadIcon sx={{ fontSize: "4rem", color: "#3244e6", mb: 2 }} />
              <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
                Download brochure
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
                LAP Guide — eligibility, LTV, documents, and rate tips.
              </Typography>

              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={3}>
                  <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleInputChange} />
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
                  <TextField fullWidth label="Phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField fullWidth label="City" name="city" value={formData.city} onChange={handleInputChange} />
                </Grid>
              </Grid>

              <Button
                component="a"
                href="/assets/lap-guide.pdf"
                download="LAP-Guide.pdf"
                variant="contained"
                size="large"
                sx={{ mt: 3, px: 6 }}
                startIcon={<DownloadIcon />}
              >
                Email PDF + save lead
              </Button>
            </Card>
          </Container>
        </Box>

        {/* FAQ Section */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              mb: 6,
              fontWeight: 650,
              color: "#3244e6",
            }}
          >
            FAQs — LAP (unique)
          </Typography>

          {faqs.map((faq, index) => (
            <Accordion key={index} sx={{ mb: 2, boxShadow: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: "#f8f9fa" }}>
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
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
            py: 6,
            textAlign: "center",
            marginBottom: "1px",
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="h3" sx={{ mb: 3, fontWeight: 600 }}>
              Ready to Unlock Your Property's Value?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Get competitive LAP rates and access funds without selling your asset
            </Typography>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
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
                  px: { xs: 2, sm: 3 },
                  py: { xs: 1, sm: 1.5 },
                  fontSize: {
                    xs: "0.9rem",
                    sm: "1rem",
                    md: "1.1rem",
                  },
                  borderRadius: 6,
                  textTransform: "none",
                  height: { xs: "6.3", sm: "2.5rem", md: "6.3" },
                  fontFamily: "Poppins",
                  width: { xs: "100%", sm: "auto" },
                  minWidth: { xs: "100%", sm: "220px" },
                }}
                fullWidth={false}
              >
                Check Eligibility
              </Button>
              <div style={{ border: "2px solid white", borderRadius: 30 }}>
                <ButtonComp />
              </div>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default LAPPage
