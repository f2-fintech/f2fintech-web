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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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

const HomeLoanPage = () => {
  const [loanAmount, setLoanAmount] = useState(2500000)
  const [tenure, setTenure] = useState(240) // 20 years in months
  const [interestRate, setInterestRate] = useState(8.5)
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

  const emi = calculateEMI(loanAmount, interestRate, tenure)
  const totalAmount = emi * tenure
  const totalInterest = totalAmount - loanAmount

  // Generate amortization table (first 12 months for display)
  const generateAmortizationTable = () => {
    const monthlyRate = interestRate / (12 * 100)
    let balance = loanAmount
    const table = []

    for (let i = 1; i <= Math.min(12, tenure); i++) {
      const interestPayment = balance * monthlyRate
      const principalPayment = emi - interestPayment
      balance = balance - principalPayment

      table.push({
        month: i,
        emi: emi,
        principal: Math.round(principalPayment),
        interest: Math.round(interestPayment),
        balance: Math.round(balance),
      })
    }
    return table
  }

  const amortizationTable = generateAmortizationTable()

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const downloadCSV = () => {
    // Generate full amortization table for CSV
    const monthlyRate = interestRate / (12 * 100)
    let balance = loanAmount
    let csvContent = "Month,EMI,Principal,Interest,Balance\n"

    for (let i = 1; i <= tenure; i++) {
      const interestPayment = balance * monthlyRate
      const principalPayment = emi - interestPayment
      balance = balance - principalPayment

      csvContent += `${i},${emi},${Math.round(principalPayment)},${Math.round(interestPayment)},${Math.round(balance)}\n`
    }

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "home-loan-amortization.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const lenders = [
    { name: "SBI Home Loans", specialty: "Competitive salaried rates" },
    { name: "HDFC Home Loans", specialty: "Doorstep service" },
    { name: "LIC Housing", specialty: "Long tenure flexibility" },
    { name: "PNB Housing", specialty: "Quick sanction TAT" },
    { name: "ICICI Home Loans", specialty: "Balance transfer specialists" },
  ]

  const faqs = [
    {
      question: "How much can I borrow against my income?",
      answer:
        "Typically, you can borrow up to 80-90% of the property value. Your loan eligibility is calculated based on your income, existing obligations, and FOIR (typically 40-50% of net income). Higher income and good credit score can increase eligibility.",
    },
    {
      question: "What is FOIR and how does it affect me?",
      answer:
        "FOIR (Fixed Obligation to Income Ratio) is the percentage of your monthly income that goes towards loan EMIs. Most lenders prefer FOIR below 40-50%. Lower FOIR means higher loan eligibility and better interest rates.",
    },
    {
      question: "Balance transfer vs top-up — when to use?",
      answer:
        "Balance transfer helps reduce EMI with lower interest rates from a new lender. Top-up provides additional funds at home loan rates (lower than personal loans). Use BT for rate reduction, top-up for additional funding needs.",
    },
    {
      question: "What documents are needed for property verification?",
      answer:
        "Property documents include Agreement to Sell, Chain of Title, Approved Building Plan, NOC from Builder/Society, Property Tax receipts, and Encumbrance Certificate. Legal and technical verification is mandatory.",
    },
    {
      question: "Typical time for sanction and disbursal?",
      answer:
        "Home loan sanction typically takes 7-15 days with complete documentation. Disbursal happens in stages - after agreement execution, construction milestones, and final completion. Ready property loans disburse faster than under-construction.",
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
                  Home Loans Made Affordable
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
                  Compare offers from leading banks and save on your EMI.
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
                    src="https://lottie.host/embed/07f58b66-eda7-4afe-a174-fa858c3098c1/0fZ7lsQHJ2.lottie"
                  />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* About Home Loans Section */}
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
            About Home Loans
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
                      <ListItemText primary="Salaried and self-employed buying a new home" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon sx={{ fontSize: "1rem", color: "green" }} />
                      </ListItemIcon>
                      <ListItemText primary="Home construction or renovation projects" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon sx={{ fontSize: "1rem", color: "green" }} />
                      </ListItemIcon>
                      <ListItemText primary="Balance transfer to reduce EMI or top-up" />
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
                      <ListItemText primary="You want lowest possible rate with long tenure" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon sx={{ fontSize: "1rem", color: "green" }} />
                      </ListItemIcon>
                      <ListItemText primary="You're doing balance transfer to reduce EMI" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon sx={{ fontSize: "1rem", color: "green" }} />
                      </ListItemIcon>
                      <ListItemText primary="Need top-up for additional funding" />
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
                    Key Features
                  </Typography>
                  <List dense>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon sx={{ fontSize: "1rem", color: "green" }} />
                      </ListItemIcon>
                      <ListItemText primary="Ticket sizes from ₹10L to ₹5Cr+ (property value dependent)" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon sx={{ fontSize: "1rem", color: "green" }} />
                      </ListItemIcon>
                      <ListItemText primary="Tenure up to 30 years" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon sx={{ fontSize: "1rem", color: "green" }} />
                      </ListItemIcon>
                      <ListItemText primary="BT + Top-up available" />
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
                  Eligibility Snapshot
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: "green" }} />
                    </ListItemIcon>
                    <ListItemText primary="Income stability, FOIR norms (typically ≤ 40–50% of net income)" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: "green" }} />
                    </ListItemIcon>
                    <ListItemText primary="Property legal/technical clearance" />
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
                    <ListItemText primary="KYC, income docs (salary slips/ITR), bank statements" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: "green" }} />
                    </ListItemIcon>
                    <ListItemText primary="Property documents: Agreement to sell, chain of title, NOC, etc." />
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
              Home Loan Calculator
            </Typography>

            <Paper sx={{ p: 4, boxShadow: 3 }}>
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
                      EMI Calculation
                    </Typography>
                    <Typography variant="h4" sx={{ color: "#3244e6", mb: 1 }}>
                      ₹{emi.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      EMI / month
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body1">Total Interest: ₹{totalInterest.toLocaleString()}</Typography>
                    <Typography variant="body1">Total Payable: ₹{totalAmount.toLocaleString()}</Typography>
                  </Card>
                  <Button variant="outlined" onClick={downloadCSV} startIcon={<DownloadIcon />} fullWidth>
                    Download Amortization CSV
                  </Button>
                </Grid>
              </Grid>

              {/* Amortization Table Preview */}
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Amortization Table
                </Typography>
                <TableContainer component={Paper}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Month</TableCell>
                        <TableCell align="right">EMI (₹)</TableCell>
                        <TableCell align="right">Principal (₹)</TableCell>
                        <TableCell align="right">Interest (₹)</TableCell>
                        <TableCell align="right">Balance (₹)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {amortizationTable.map((row) => (
                        <TableRow key={row.month}>
                          <TableCell>{row.month}</TableCell>
                          <TableCell align="right">{row.emi.toLocaleString()}</TableCell>
                          <TableCell align="right">{row.principal.toLocaleString()}</TableCell>
                          <TableCell align="right">{row.interest.toLocaleString()}</TableCell>
                          <TableCell align="right">{row.balance.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
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
            Partner Lenders
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
                Download Brochure
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
                Home Loan Handbook — save lakhs via balance transfer and rate hacks.
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
                href="/assets/home-loan-handbook.pdf"
                download="Home-Loan-Handbook.pdf"
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
              textAlign: "center",
              mb: 6,
              fontWeight: 650,
              color: "#3244e6",
            }}
          >
            FAQs — Home Loan (unique)
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
              Ready for Your Dream Home?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Get the best home loan rates and make your homeownership dreams come true
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

export default HomeLoanPage
