import React from "react";
import {
  Box,
  Container,
  Typography,
  List,
  Divider,
  Grid,
  Card,
  CardContent,
  Paper,
  Chip,
  Avatar,
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
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
`;

const PersonalLoanBlog = () => {
  const theme = useTheme();
  const primaryBlue = "#3a49d6";
  const secondaryBlue = "#2d3db5";
  const accentGreen = "#10b981";
  const lightBlue = "#f4faff";
  const contentSections = [
    {
      title: "💡 What is a Personal Loan?",
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
      img: "/personal loan uses -f2fintech.webp",
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
      img: "/Personal loan vs Credit card .webp",
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
    <Box sx={{ minHeight: "100vh", bgcolor: "#f4faff", backgroundImage: "radial-gradient(at 50% 50%, #f4faff 0%, #eef6ff 100%)", fontFamily: "'Poppins', sans-serif" }}>
      <Helmet>
        {/* ...existing SEO meta tags... */}
      </Helmet>

      {/* Hero */}
      <Box
        sx={{
          py: { xs: 6, md: 10 },
          background: "linear-gradient(135deg, rgba(50, 68, 230, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)",
          borderBottom: "1px solid rgba(50, 68, 230, 0.08)",
        }}
      >
        <Container maxWidth="xl">
          <Grid container alignItems="center" spacing={4}>
            <Grid item xs={12} md={8}>
              <Box sx={{ animation: `${fadeInUp} 1s ease-out` }}>
                <Typography
                  variant="overline"
                  sx={{
                    color: "#3244e6",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    letterSpacing: 1.5,
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  PERSONAL FINANCE GUIDE 2025
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    color: "#1f2937",
                    mb: 3,
                    fontSize: { xs: "2.5rem", md: "3.5rem" },
                    lineHeight: 1.2,
                    fontFamily: "'Outfit', 'Poppins', sans-serif",
                  }}
                >
                  Beginner’s Guide to{" "}
                  <Box component="span" sx={{ color: accentGreen }}>
                    Personal Loans
                  </Box>
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#4b5563",
                    maxWidth: "600px",
                    mb: 4,
                    lineHeight: 1.6,
                    fontSize: "1.25rem",
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 500,
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
                    <Typography variant="body2" fontWeight="600" sx={{ fontFamily: "'Poppins', sans-serif", color: "#1f2937" }}>
                      Finance Team
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                      <CalendarToday sx={{ fontSize: 14, color: "#4b5563" }} />
                      <Typography variant="body2" color="#4b5563" sx={{ fontFamily: "'Poppins', sans-serif" }}>
                        January 21, 2025
                      </Typography>
                      <Schedule sx={{ fontSize: 14, color: "#4b5563", ml: 2 }} />
                      <Typography variant="body2" color="#4b5563" sx={{ fontFamily: "'Poppins', sans-serif" }}>
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
                  component="img"
                  src="/personal loan uses -f2fintech.webp"
                  alt="Personal Loans"
                  sx={{
                    width: "100%",
                    maxWidth: 380,
                    height: "auto",
                    borderRadius: "20px",
                    boxShadow: "0 20px 40px rgba(50, 68, 230, 0.12)",
                    animation: `${float} 4s ease-in-out infinite`,
                    border: "1px solid rgba(50, 68, 230, 0.08)",
                  }}
                />
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
              animation: `${sec.animation} 1s ease-out ${0.2 + idx * 0.1
                }s both`,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                color: "#1f2937",
                fontWeight: 800,
                mb: 4,
                fontSize: { xs: "2rem", md: "2.5rem" },
                fontFamily: "'Outfit', 'Poppins', sans-serif",
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
                  display: "block",
                  width: { xs: "100%", md: "80%" },
                  mx: "auto",
                  mb: 4,
                  borderRadius: "16px",
                  boxShadow: "0 12px 35px rgba(0,0,0,0.06)",
                  border: "1px solid rgba(0,0,0,0.05)",
                }}
              />
            )}

            {sec.description && (
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 4 },
                  mb: 4,
                  borderRadius: "16px",
                  border: "1px solid rgba(50, 68, 230, 0.08)",
                  bgcolor: "rgba(255, 255, 255, 0.85)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
                  backdropFilter: "blur(10px)",
                }}
              >
                {sec.description.map((line, i2) => (
                  <Typography
                    key={i2}
                    variant="h6"
                    sx={{
                      mt: i2 ? 2 : 0,
                      color: "#4b5563",
                      lineHeight: 1.8,
                      fontSize: "1.05rem",
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 500,
                    }}
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
                        height: "100%",
                        border: "1px solid rgba(50, 68, 230, 0.08)",
                        borderRadius: "16px",
                        bgcolor: "rgba(255, 255, 255, 0.85)",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: `0 15px 35px ${alpha(primaryBlue, 0.08)}`,
                          borderColor: primaryBlue,
                        },
                      }}
                    >
                      <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
                        <Box display="flex" alignItems="flex-start" gap={1.5}>
                          <CheckCircle sx={{ color: accentGreen, mt: 0.3, fontSize: 20, flexShrink: 0 }} />
                          <Typography
                            variant="body1"
                            sx={{
                              fontSize: "1.05rem",
                              color: "#4b5563",
                              fontFamily: "'Poppins', sans-serif",
                              fontWeight: 500,
                              lineHeight: 1.5,
                            }}
                          >
                            {item}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        ))}

        <Divider sx={{ my: 6, borderColor: "rgba(50, 68, 230, 0.1)" }} />
        <Box
          display="flex"
          justifyContent="center"
          flexWrap="wrap"
          gap={1.5}
          sx={{ mb: 4 }}
        >
          {["#PersonalLoan", "#SmartBorrowing", "#LoanTips", "#F2Fintech"].map(
            (tag, i) => (
              <Chip
                key={i}
                label={tag}
                size="medium"
                sx={{
                  bgcolor: "rgba(50, 68, 230, 0.06)",
                  color: primaryBlue,
                  border: "1px solid rgba(50, 68, 230, 0.12)",
                  fontWeight: 600,
                  fontFamily: "'Poppins', sans-serif",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "rgba(50, 68, 230, 0.12)",
                    transform: "translateY(-1px)",
                  }
                }}
              />
            )
          )}
        </Box>
        <Typography variant="body2" textAlign="center" sx={{ fontFamily: "'Poppins', sans-serif", color: "#6b7280", fontWeight: 500 }}>
          © 2025 F2 Fintech. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default PersonalLoanBlog;
