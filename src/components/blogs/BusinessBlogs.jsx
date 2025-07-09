import React from "react";
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
  Card,
  CardContent,
  Chip,
  Paper,
  useTheme,
  alpha,
} from "@mui/material";
import { keyframes } from "@mui/system";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const BusinessBlogs = () => {
  const theme = useTheme();

  const gradientBg = "linear-gradient(90deg, #7C3AED 0%, #9F7AEA 100%)";
  const lightGradientBg = "linear-gradient(135deg, #f8f4ff 0%, #ffffff 100%)";

  const Section = ({ title, children, delay = 0 }) => (
    <Box
      my={4}
      sx={{
        animation: `${fadeIn} 0.8s ease-out ${delay}s both`,
      }}
    >
      {title && (
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          sx={{
            background: gradientBg,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            mb: 2,
          }}
        >
          {title}
        </Typography>
      )}
      <Typography
        variant="body1"
        component="div"
        color="text.secondary"
        sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}
      >
        {children}
      </Typography>
    </Box>
  );

  const loanTypes = [
    {
      title: "Term Loans",
      desc: "Single disbursement for long-term investments",
      icon: "💰",
    },
    {
      title: "Working Capital",
      desc: "Daily operational expenses coverage",
      icon: "⚡",
    },
    {
      title: "Equipment Financing",
      desc: "Secured against equipment purchases",
      icon: "🔧",
    },
    {
      title: "Line of Credit",
      desc: "Pay interest only on used amount",
      icon: "💳",
    },
    {
      title: "Microloans",
      desc: "Small loans with minimal documentation",
      icon: "📊",
    },
    {
      title: "Invoice Financing",
      desc: "Borrow against unpaid invoices",
      icon: "📋",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: lightGradientBg,
        pb: 4,
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          background: gradientBg,
          backgroundSize: "200% 200%",
          animation: `${gradientShift} 4s ease infinite`,
          color: "white",
          py: 8,
          mb: 4,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
            sx={{ animation: `${fadeIn} 1s ease-out` }}
          >
            🧾 Complete Guide to Business Loans
          </Typography>
          <Typography
            variant="h5"
            textAlign="center"
            sx={{
              opacity: 0.9,
              animation: `${fadeIn} 1s ease-out 0.2s both`,
            }}
          >
            Everything Indian entrepreneurs need to know about business
            financing in 2025
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Section delay={0.1}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 3,
              background: "rgba(255,255,255,0.8)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Typography paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
              Running and growing a business often requires more than just hard
              work and vision—you need funding at the right time. In this guide,
              we simplify everything you need to know about business loans,
              tailored to the Indian business landscape.
            </Typography>
          </Paper>
        </Section>

        <Section
          title={
            <Box
              component="span"
              sx={{
                display: "flex",
                fontSize: "3rem",
                fontWeight: "bold",
                color: "#007bff",
                justifyContent: "center",
                p: 6,
              }}
            >
              🏦 What Is a Business Loan?
            </Box>
          }
          delay={0.2}
        >
          <Box
            component="img"
            src="/blogs3.png"
            alt="What is a Business Loan"
            sx={{
              width: { xs: "100%", md: "80%" },
              borderRadius: 3,
              mb: 3,
              boxShadow: (theme) => theme.shadows[4],
              transition: "all 0.3s ease",
              mx: "auto",
              display: "block",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: (theme) => theme.shadows[8],
              },
            }}
          />
          <Typography
            paragraph
            sx={{
              fontSize: "1.1rem",
              lineHeight: 1.7,
              textAlign: "center",
              color: "blue",
            }}
          >
            A business loan enables businesses to access capital with a
            repayment obligation. These loans are used for expanding operations,
            buying equipment, managing working capital, and acquiring other
            businesses.
          </Typography>
        </Section>

        <Section
          title={
            <Box
              component="span"
              sx={{
                display: "flex",
                fontSize: "3rem",
                fontWeight: "bold",
                color: "#007bff",
                justifyContent: "center",
                p: 6,
              }}
            >
              🌐 Types of Business Loans in India
            </Box>
          }
          delay={0.3}
        >
          <Box
            component="img"
            src="/blogs1.png"
            alt="Types of Business Loans"
            sx={{
              width: { xs: "100%", md: "80%" },
              borderRadius: 3,
              mb: 3,
              boxShadow: (theme) => theme.shadows[4],
              transition: "all 0.3s ease",
              mx: "auto",
              display: "block",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: (theme) => theme.shadows[8],
              },
            }}
          />
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {loanTypes.map((loan, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: theme.shadows[8],
                    },
                    borderRadius: 2,
                    border: `1px solid ${alpha("#7C3AED", 0.1)}`,
                  }}
                >
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={1}>
                      <Typography variant="h6" sx={{ mr: 1 }}>
                        {loan.icon}
                      </Typography>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{ fontSize: "1.2rem" }}
                      >
                        {loan.title}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: "1rem", lineHeight: 1.6 }}
                    >
                      {loan.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Section>

        <Section
          title={
            <Box
              component="span"
              sx={{
                display: "flex",
                fontSize: "3rem",
                fontWeight: "bold",
                color: "#007bff",
                justifyContent: "center",
                p: 6,
              }}
            >
              ✅ Key Benefits
            </Box>
          }
          delay={0.4}
        >
          <List
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {[
              "Immediate access to capital without giving up ownership",
              "Tax benefits: Interest is often tax-deductible",
              "Customized loan options for different business needs",
              "Build business credit with consistent repayments",
            ].map((benefit, index) => (
              <ListItem key={index} sx={{ py: 0.5 }}>
                <ListItemText
                  primary={benefit}
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: "1.05rem",
                      color: "text.secondary",
                      lineHeight: 1.6,
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Section>

        <Section
          title={
            <Box
              component="span"
              sx={{
                display: "flex",
                fontSize: "3rem",
                fontWeight: "bold",
                color: "#007bff",
                justifyContent: "center",
                p: 6,
              }}
            >
              📈 Interest Rates (2025)
            </Box>
          }
          delay={0.5}
        >
          <Box
            component="img"
            src="/blogs2.png"
            alt="Interest Rates"
            sx={{
              width: { xs: "100%", md: "80%" },
              borderRadius: 3,
              mb: 3,
              boxShadow: (theme) => theme.shadows[4],
              transition: "all 0.3s ease",
              mx: "auto",
              display: "block",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: (theme) => theme.shadows[8],
              },
            }}
          />
          <Grid container spacing={3}>
            {[
              { type: "Term Loans", rate: "9% – 16%" },
              { type: "Working Capital", rate: "10% – 18%" },
              { type: "Equipment Loans", rate: "8.5% – 15%" },
              { type: "Microloans", rate: "12% – 22%" },
            ].map((rate, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 2,
                    textAlign: "center",
                    borderRadius: 2,
                    background: alpha("#7C3AED", 0.05),
                    border: `1px solid ${alpha("#7C3AED", 0.1)}`,
                  }}
                >
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="primary"
                    sx={{ fontSize: "1rem" }}
                  >
                    {rate.type}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#7C3AED",
                      fontWeight: "bold",
                      fontSize: "1.3rem",
                    }}
                  >
                    {rate.rate}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Section>

        <Section title="🔎 Pro Tips" delay={0.6}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {[
              "Select the right loan type",
              "Avoid applying to many lenders at once",
              "Calculate total borrowing cost",
              "Read all fine print carefully",
            ].map((tip, index) => (
              <Chip
                key={index}
                label={tip}
                sx={{
                  background: alpha("#7C3AED", 0.1),
                  color: "#7C3AED",
                  fontSize: "1rem",
                  height: "auto",
                  "&:hover": { background: alpha("#7C3AED", 0.2) },
                }}
              />
            ))}
          </Box>
        </Section>

        <Section title="⚡ Final Thoughts" delay={0.7}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
              background: gradientBg,
              color: "white",
            }}
          >
            <Typography paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
              A well-planned business loan can play a vital role in scaling
              operations and improving your business's financial health. As we
              move into 2025, digital lending makes it easier than ever to
              secure the right business loan for your goals.
            </Typography>
          </Paper>
        </Section>

        <Divider sx={{ my: 4 }} />
        <Typography
          variant="h6"
          display="block"
          textAlign="center"
          color="text.secondary"
        >
          #BusinessLoans #EntrepreneurshipIndia #LoanGuide #F2Fintech
        </Typography>
      </Container>
    </Box>
  );
};

export default BusinessBlogs;
