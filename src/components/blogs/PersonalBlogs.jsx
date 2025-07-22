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
  Paper,
  Chip,
  Avatar,
  Button,
  useTheme,
  alpha,
} from "@mui/material";
import { keyframes } from "@mui/system";
import { Helmet } from "react-helmet-async";
import {
  Person,
  CalendarToday,
  Schedule,
  CheckCircle,
  CreditCard,
} from "@mui/icons-material";

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;
const slideInLeft = keyframes`
  from { opacity: 0; transform: translateX(-50px); }
  to { opacity: 1; transform: translateX(0); }
`;
const slideInRight = keyframes`
  from { opacity: 0; transform: translateX(50px); }
  to { opacity: 1; transform: translateX(0); }
`;

const PersonalLoanBlog = () => {
  const theme = useTheme();
  const primaryBlue = "#0078D4";
  const lightBlue = "#F3F9FF";
  const contentSections = [
    {
      title: "💡 What is a Personal Loan?",
      img: "/blogs7.png",
      animation: fadeInUp,
      description: [
        "A personal loan is money you borrow all at once from a lender and agree to pay back in regular monthly installments. Most personal loans are unsecured, meaning you don’t need to provide collateral like your house or car.",
        "You typically get a fixed interest rate and a fixed repayment term—helping you manage your budget easily.",
      ],
    },
    {
      title: "🎯 Common Uses of Personal Loans",
      animation: slideInLeft,
      list: [
        "Medical emergencies",
        "Debt consolidation",
        "Home renovations",
        "Weddings & celebrations",
        "Education or certifications",
      ],
    },
    {
      title: "📌 Types of Personal Loans",
      img: "/blogs8.png",
      animation: slideInRight,
      list: [
        "🛡 Unsecured Loan – No collateral, based on credit score",
        "🏠 Secured Loan – Backed by assets like gold or FD",
        "💍 Wedding Loan – Covers event-related expenses",
        "✈️ Travel Loan – Finances domestic/international trips",
        "🏥 Medical Loan – For health emergencies",
        "🏚 Home Renovation – Painting, upgrades, etc.",
        "📘 Education Loan (short-term) – For skill training",
      ],
    },
    {
      title: "💳 Personal Loan vs Credit Card",
      img: "/blogs9.png",
      animation: fadeInUp,
      list: [
        "Personal Loan: Lump sum disbursed upfront, fixed EMI",
        "Credit Card: Revolving credit, flexible payments",
        "Loan = Lower interest for large expenses",
        "Card = Better for short‑term purchases",
      ],
    },
    {
      title: "📋 Things to Consider Before Borrowing",
      animation: slideInLeft,
      list: [
        "Check your credit score",
        "Review your monthly budget",
        "Compare lenders & offers",
        "Understand terms & fine print",
        "Evaluate alternatives like saving or family help",
      ],
    },
    {
      title: "✅ Final Thoughts",
      animation: slideInRight,
      description: [
        "Personal loans can be a smart choice if used responsibly. Always borrow only what you need, compare terms, and make sure you can repay on time.",
        "When in doubt, consult a financial advisor to ensure you're making the right decision for your future.",
      ],
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#FAFAFA" }}>
      <Helmet>{/* ...your existing SEO meta tags... */}</Helmet>

      {/* Hero */}
      <Box
        sx={{
          bgcolor: "white",
          py: { xs: 6, md: 10 },
          background: `linear-gradient(135deg, ${lightBlue} 0%, white 100%)`,
        }}
      >
        <Container maxWidth="xl">
          <Grid container alignItems="center" spacing={4}>
            <Grid item xs={12} md={8}>
              <Box sx={{ animation: `${fadeInUp} 1s ease-out` }}>
                <Typography
                  variant="overline"
                  sx={{
                    color: primaryBlue,
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    letterSpacing: 1,
                  }}
                >
                  PERSONAL FINANCE GUIDE 2025
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 700,
                    color: "#1A1A1A",
                    mb: 3,
                    fontSize: { xs: "2.5rem", md: "3.5rem" },
                    lineHeight: 1.2,
                  }}
                >
                  Beginner’s Guide to{" "}
                  <Box component="span" sx={{ color: primaryBlue }}>
                    Personal Loans
                  </Box>
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#666",
                    maxWidth: "600px",
                    mb: 4,
                    lineHeight: 1.6,
                    fontSize: "1.25rem",
                  }}
                >
                  Learn how personal loans work, when to use them, and how they
                  compare to credit cards in 2025.
                </Typography>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar sx={{ bgcolor: primaryBlue }}>
                    <Person />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" fontWeight="600">
                      Finance Team
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                      <CalendarToday sx={{ fontSize: 14, color: "#666" }} />
                      <Typography variant="body2" color="#666">
                        January 21, 2025
                      </Typography>
                      <Schedule sx={{ fontSize: 14, color: "#666", ml: 2 }} />
                      <Typography variant="body2" color="#666">
                        8 min read
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  animation: `${slideInRight} 1s ease-out 0.2s both`,
                  textAlign: "center",
                }}
              >
                <Box
                  sx={{
                    width: 300,
                    height: 200,
                    bgcolor: primaryBlue,
                    borderRadius: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    boxShadow: "0 10px 30px rgba(0,120,212,0.2)",
                  }}
                >
                  <CreditCard sx={{ fontSize: 80, color: "white" }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 8 } }}>
        {contentSections.map((sec, idx) => (
          <Box
            key={idx}
            sx={{
              mb: 8,
              animation: `${sec.animation} 1s ease-out ${
                0.2 + idx * 0.1
              }s both`,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                color: primaryBlue,
                fontWeight: 700,
                mb: 4,
                fontSize: { xs: "2rem", md: "2.5rem" },
              }}
            >
              {sec.title}
            </Typography>

            {sec.img && (
              <Box
                component="img"
                src={sec.img}
                alt={sec.title}
                sx={{
                  width: { xs: "100%", md: "80%" },
                  mx: "auto",
                  mb: 4,
                  borderRadius: 2,
                  boxShadow: theme.shadows[4],
                }}
              />
            )}

            {sec.description && (
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 4 },
                  mb: 4,
                  borderRadius: 2,
                  border: "1px solid #E1E1E1",
                  bgcolor: "white",
                }}
              >
                {sec.description.map((line, i2) => (
                  <Typography
                    key={i2}
                    variant="h6"
                    sx={{ mt: i2 ? 2 : 0, color: "#1A1A1A", lineHeight: 1.7 }}
                  >
                    {line}
                  </Typography>
                ))}
              </Paper>
            )}

            {sec.list && (
              <Grid container spacing={3}>
                {sec.list.map((item, i3) => (
                  <Grid item xs={12} md={6} key={i3}>
                    <Card
                      sx={{
                        p: 3,
                        height: "100%",
                        border: "1px solid #E1E1E1",
                        borderRadius: 2,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: `0 8px 25px ${alpha(primaryBlue, 0.15)}`,
                          borderColor: primaryBlue,
                        },
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="body1"
                          sx={{ fontSize: "1.1rem", color: "#333" }}
                        >
                          • {item}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        ))}

        <Divider sx={{ my: 6 }} />
        <Box
          display="flex"
          justifyContent="center"
          flexWrap="wrap"
          gap={1}
          sx={{ mb: 3 }}
        >
          {["#PersonalLoan", "#SmartBorrowing", "#LoanTips", "#F2Fintech"].map(
            (tag, i) => (
              <Chip
                key={i}
                label={tag}
                size="small"
                sx={{ bgcolor: alpha(primaryBlue, 0.1), color: primaryBlue }}
              />
            )
          )}
        </Box>
        <Typography variant="body2" textAlign="center" color="text.secondary">
          © 2025 F2Fintech. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default PersonalLoanBlog;
