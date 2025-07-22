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
  Button,
  Avatar,
  useTheme,
  alpha,
} from "@mui/material";
import { keyframes } from "@mui/system";
import { Helmet } from "react-helmet-async";
import {
  AccountBalance,
  History,
  Warning,
  CreditCard,
  TrendingUp,
  Speed,
  CompareArrows,
  Psychology,
  Gavel,
  ContactSupport,
  Person,
  CalendarToday,
  Schedule,
  CheckCircle,
  Error,
} from "@mui/icons-material";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const OverDraftBlog = () => {
  const theme = useTheme();

  const primaryBlue = "#0078D4";
  const secondaryBlue = "#106EBE";
  const lightBlue = "#F3F9FF";
  const accentBlue = "#0F6CBD";

  const overdraftTypes = [
    {
      title: "✅ Authorized Overdraft",
      desc: "Pre-approved limit with controlled interest rates",
      icon: <CheckCircle sx={{ fontSize: 28, color: "#00B74A" }} />,
      features: ["Pre-approved limit", "Interest on used amount only"],
    },
    {
      title: "❌ Unauthorized Overdraft",
      desc: "Exceeds approved limits with high penalties",
      icon: <Error sx={{ fontSize: 28, color: "#FF4444" }} />,
      features: ["Exceeds approved limit", "High penalties and interest"],
    },
  ];

  const overdraftReasons = [
    "Emergency expenses (hospital, repair, travel)",
    "Auto-debits or EMIs before salary",
    "ATM withdrawals without checking balance",
  ];

  const preventionTips = [
    "Set up real-time alerts",
    "Track EMIs and debits",
    "Keep a buffer balance",
  ];

  const advantages = [
    "Instant cash access",
    "No collateral required",
    "Interest only on what you use",
  ];

  const risks = [
    "High interest (up to 20%)",
    "Credit score damage",
    "Risk of a debt trap",
  ];

  const smartUsageTips = [
    "Set alerts and track activity",
    "Repay fast to reduce interest",
    "Avoid frequent use",
    "Compare multiple lenders for best rates",
    "Can I repay this quickly?",
    "Is this a real emergency?",
  ];

  const bankingOptions = [
    {
      bank: "ICICI",
      feature: "Overdraft on salary/FD",
      rate: "10% - 15%",
    },
    {
      bank: "HDFC",
      feature: "Flexible limits",
      rate: "12% - 16%",
    },
    {
      bank: "SBI",
      feature: "MSMEs & Pensioners",
      rate: "10% - 14%",
    },
    {
      bank: "PNB",
      feature: "Business overdrafts",
      rate: "11% - 17%",
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          Overdraft Facility in India 2025 | Meaning, Uses & Interest
        </title>
        <meta
          name="description"
          content="Understand overdraft facility in India. Learn its meaning, types, interest rates, benefits & how to use it effectively for personal or business needs."
        />
        <meta
          name="keywords"
          content="overdraft, overdraft facility India, overdraft interest rate, personal overdraft, business overdraft, overdraft vs loan, secured overdraft, unsecured overdraft"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="F2 Fintech" />
        <link rel="canonical" href="https://yourdomain.com/overdraft-blogs" />
        <meta
          property="og:title"
          content="Overdraft Facility in India 2025 | Meaning, Uses & Interest"
        />
        <meta
          property="og:description"
          content="Explore overdraft facility: definition, types, usage tips, and how it compares to loans in 2025. Great for short-term credit needs."
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:image"
          content="https://yourdomain.com/images/overdraft-cover.png"
        />
        <meta
          property="og:url"
          content="https://yourdomain.com/overdraft-blogs"
        />
      </Helmet>

      <Box sx={{ minHeight: "100vh", bgcolor: "#FAFAFA" }}>
        {/* Hero Section */}
        <Box
          sx={{
            bgcolor: "white",
            py: { xs: 6, md: 10 },
            background: `linear-gradient(135deg, ${lightBlue} 0%, white 100%)`,
          }}
        >
          <Container maxWidth="xl">
            <Grid container spacing={4} alignItems="center">
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
                    FINANCIAL GUIDE 2025
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
                    💳 Overdraft Facility:{" "}
                    <Box component="span" sx={{ color: primaryBlue }}>
                      Backup or Trap?
                    </Box>
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#666",
                      mb: 4,
                      lineHeight: 1.6,
                      fontSize: "1.25rem",
                      maxWidth: "600px",
                    }}
                  >
                    Everything Indians should know about overdrafts and how to
                    use them wisely in 2025
                  </Typography>
                  <Box display="flex" alignItems="center" gap={2} mb={4}>
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
                      fontSize: "5rem",
                    }}
                  >
                    🔍
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Main Content */}
        <Container maxWidth="xl" sx={{ py: { xs: 4, md: 8 } }}>
          {/* What is Overdraft */}
          <Box
            sx={{ mb: 8, animation: `${slideInLeft} 1s ease-out 0.2s both` }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "#1A1A1A",
                mb: 4,
                fontSize: { xs: "2rem", md: "2.5rem" },
              }}
            >
              🔍 What is an Overdraft?
            </Typography>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    width: "100%",
                    height: 300,
                    bgcolor: lightBlue,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: `2px solid ${alpha(primaryBlue, 0.1)}`,
                  }}
                >
                  <AccountBalance sx={{ fontSize: 120, color: primaryBlue }} />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#1A1A1A",
                    lineHeight: 1.7,
                    fontSize: "1.1rem",
                    mb: 3,
                  }}
                >
                  An overdraft allows you to withdraw more than you currently
                  have in your account, up to a pre-set limit. It acts like a
                  temporary financial cushion useful in emergencies like:
                </Typography>
                <List>
                  {[
                    "Unexpected medical bills",
                    "Last-minute purchases",
                    "Delayed salary credits",
                  ].map((item, index) => (
                    <ListItem key={index} sx={{ py: 0.5 }}>
                      <ListItemText
                        primary={`• ${item}`}
                        primaryTypographyProps={{
                          fontSize: "1rem",
                          color: "#666",
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
                <Typography
                  variant="body1"
                  sx={{ color: "#666", mt: 2, fontStyle: "italic" }}
                >
                  But remember, overdrafts come at a cost—in the form of
                  interest and fees.
                </Typography>
              </Grid>
            </Grid>
          </Box>

          {/* History Section */}
          <Box sx={{ mb: 8, animation: `${fadeInUp} 1s ease-out 0.1s both` }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 2,
                border: "1px solid #E1E1E1",
                bgcolor: "white",
              }}
            >
              <Box display="flex" alignItems="center" mb={2}>
                <History sx={{ fontSize: 32, color: primaryBlue, mr: 2 }} />
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 600,
                    color: "#1A1A1A",
                    fontSize: { xs: "1.5rem", md: "2rem" },
                  }}
                >
                  🏛 A Peek into History
                </Typography>
              </Box>
              <Typography
                variant="h6"
                sx={{
                  color: "#1A1A1A",
                  lineHeight: 1.7,
                  fontSize: "1.1rem",
                }}
              >
                The concept began in 1728 when the Royal Bank of Scotland
                allowed a merchant, William Hogg, to withdraw money before
                depositing it.
              </Typography>
            </Paper>
          </Box>

          {/* Why Does Overdraft Happen */}
          <Box
            sx={{ mb: 8, animation: `${slideInRight} 1s ease-out 0.3s both` }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "#1A1A1A",
                mb: 2,
                fontSize: { xs: "2rem", md: "2.5rem" },
              }}
            >
              💡 Why Does Overdraft Happen?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "#666",
                mb: 6,
                fontSize: "1.1rem",
                fontWeight: 400,
              }}
            >
              Common scenarios and prevention strategies
            </Typography>

            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
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
                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: "#1A1A1A",
                        fontSize: "1.2rem",
                        mb: 2,
                      }}
                    >
                      Common Reasons
                    </Typography>
                    <List>
                      {overdraftReasons.map((reason, index) => (
                        <ListItem key={index} sx={{ py: 0.5 }}>
                          <ListItemText
                            primary={`• ${reason}`}
                            primaryTypographyProps={{
                              fontSize: "1rem",
                              color: "#666",
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    height: "100%",
                    border: "1px solid #E1E1E1",
                    borderRadius: 2,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: `0 8px 25px ${alpha("#00B74A", 0.15)}`,
                      borderColor: "#00B74A",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: "#1A1A1A",
                        fontSize: "1.2rem",
                        mb: 2,
                      }}
                    >
                      Prevention Tips
                    </Typography>
                    <List>
                      {preventionTips.map((tip, index) => (
                        <ListItem key={index} sx={{ py: 0.5 }}>
                          <CheckCircle
                            sx={{ color: "#00B74A", mr: 1, fontSize: 20 }}
                          />
                          <ListItemText
                            primary={tip}
                            primaryTypographyProps={{
                              fontSize: "1rem",
                              color: "#666",
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>

          {/* Types of Overdrafts */}
          <Box sx={{ mb: 8, animation: `${fadeInUp} 1s ease-out 0.4s both` }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "#1A1A1A",
                mb: 2,
                fontSize: { xs: "2rem", md: "2.5rem" },
              }}
            >
              💰 Types of Overdrafts
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "#666",
                mb: 6,
                fontSize: "1.1rem",
                fontWeight: 400,
              }}
            >
              Understanding authorized vs unauthorized overdrafts
            </Typography>

            <Grid container spacing={4}>
              {overdraftTypes.map((type, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card
                    sx={{
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
                    <CardContent sx={{ p: 3 }}>
                      <Box display="flex" alignItems="center" mb={2}>
                        {type.icon}
                        <Typography
                          variant="h6"
                          sx={{
                            ml: 2,
                            fontWeight: 600,
                            color: "#1A1A1A",
                            fontSize: "1.2rem",
                          }}
                        >
                          {type.title}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "#666",
                          lineHeight: 1.6,
                          fontSize: "1rem",
                          mb: 2,
                        }}
                      >
                        {type.desc}
                      </Typography>
                      <List>
                        {type.features.map((feature, idx) => (
                          <ListItem key={idx} sx={{ py: 0.5 }}>
                            <ListItemText
                              primary={`• ${feature}`}
                              primaryTypographyProps={{
                                fontSize: "0.9rem",
                                color: "#666",
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Advantages and Risks */}
          <Box
            sx={{ mb: 8, animation: `${slideInLeft} 1s ease-out 0.5s both` }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: "#00B74A",
                    mb: 4,
                    fontSize: { xs: "1.8rem", md: "2.2rem" },
                  }}
                >
                  ✅ Overdraft Advantages
                </Typography>
                <List>
                  {advantages.map((advantage, index) => (
                    <ListItem key={index} sx={{ py: 1 }}>
                      <CheckCircle sx={{ color: "#00B74A", mr: 2 }} />
                      <ListItemText
                        primary={advantage}
                        primaryTypographyProps={{
                          fontSize: "1.1rem",
                          fontWeight: 500,
                          color: "#1A1A1A",
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: "#FF4444",
                    mb: 4,
                    fontSize: { xs: "1.8rem", md: "2.2rem" },
                  }}
                >
                  ⚠ Watch Out for These Risks
                </Typography>
                <List>
                  {risks.map((risk, index) => (
                    <ListItem key={index} sx={{ py: 1 }}>
                      <Warning sx={{ color: "#FF4444", mr: 2 }} />
                      <ListItemText
                        primary={risk}
                        primaryTypographyProps={{
                          fontSize: "1.1rem",
                          fontWeight: 500,
                          color: "#1A1A1A",
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          </Box>

          {/* Banking Options */}
          <Box sx={{ mb: 8, animation: `${fadeInUp} 1s ease-out 0.6s both` }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "#1A1A1A",
                mb: 2,
                fontSize: { xs: "2rem", md: "2.5rem" },
              }}
            >
              📊 Overdraft in Indian Banking
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "#666",
                mb: 6,
                fontSize: "1.1rem",
                fontWeight: 400,
              }}
            >
              Current rates and options from major banks
            </Typography>

            <Grid container spacing={3}>
              {bankingOptions.map((bank, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      textAlign: "center",
                      border: `2px solid ${alpha(primaryBlue, 0.1)}`,
                      borderRadius: 2,
                      bgcolor: lightBlue,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        borderColor: primaryBlue,
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: primaryBlue,
                        fontWeight: 600,
                        fontSize: "1.2rem",
                        mb: 1,
                      }}
                    >
                      {bank.bank}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#666",
                        fontSize: "0.9rem",
                        mb: 1,
                      }}
                    >
                      {bank.feature}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color: primaryBlue,
                        fontWeight: 700,
                        fontSize: "1.1rem",
                      }}
                    >
                      {bank.rate}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                mt: 4,
                borderRadius: 2,
                border: "1px solid #E1E1E1",
                bgcolor: "white",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#1A1A1A",
                  fontSize: "1.1rem",
                  mb: 1,
                }}
              >
                Interest Rates: 10% – 18%
              </Typography>
              <Typography variant="body1" sx={{ color: "#666" }}>
                ✅ Cheaper than credit cards | ❌ Costlier than personal loans
              </Typography>
            </Paper>
          </Box>

          {/* Overdraft vs Personal Loan */}
          <Box
            sx={{ mb: 8, animation: `${slideInRight} 1s ease-out 0.7s both` }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "#1A1A1A",
                mb: 6,
                fontSize: { xs: "2rem", md: "2.5rem" },
              }}
            >
              🌍 Overdraft vs. Personal Loan: Key Differences
            </Typography>

            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    height: "100%",
                    border: `2px solid ${primaryBlue}`,
                    borderRadius: 2,
                    bgcolor: lightBlue,
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box display="flex" alignItems="center" mb={2}>
                      <CreditCard sx={{ color: primaryBlue, mr: 2 }} />
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: primaryBlue,
                          fontSize: "1.3rem",
                        }}
                      >
                        Overdraft
                      </Typography>
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#1A1A1A",
                        lineHeight: 1.6,
                        fontSize: "1rem",
                      }}
                    >
                      Flexible repayment, interest on used amount
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    height: "100%",
                    border: `2px solid ${secondaryBlue}`,
                    borderRadius: 2,
                    bgcolor: "white",
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box display="flex" alignItems="center" mb={2}>
                      <TrendingUp sx={{ color: secondaryBlue, mr: 2 }} />
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: secondaryBlue,
                          fontSize: "1.3rem",
                        }}
                      >
                        Personal Loan
                      </Typography>
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#1A1A1A",
                        lineHeight: 1.6,
                        fontSize: "1rem",
                      }}
                    >
                      Fixed EMI, full interest
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>

          {/* Smart Usage Tips */}
          <Box
            sx={{ mb: 8, animation: `${slideInLeft} 1s ease-out 0.8s both` }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "#1A1A1A",
                mb: 6,
                fontSize: { xs: "2rem", md: "2.5rem" },
              }}
            >
              🧠 How to Use Your Overdraft Smartly
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {smartUsageTips.map((tip, index) => (
                <Chip
                  key={index}
                  label={tip}
                  sx={{
                    bgcolor: "white",
                    color: primaryBlue,
                    border: `1px solid ${primaryBlue}`,
                    fontSize: "1rem",
                    height: "auto",
                    py: 1,
                    px: 2,
                    borderRadius: 1,
                    "& .MuiChip-label": {
                      px: 1,
                      py: 0.5,
                    },
                    "&:hover": {
                      bgcolor: alpha(primaryBlue, 0.05),
                      transform: "translateY(-1px)",
                    },
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Regulatory Push */}
          <Box sx={{ mb: 8, animation: `${fadeInUp} 1s ease-out 0.9s both` }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 2,
                border: "1px solid #E1E1E1",
                bgcolor: "white",
              }}
            >
              <Box display="flex" alignItems="center" mb={3}>
                <Gavel sx={{ fontSize: 32, color: primaryBlue, mr: 2 }} />
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 600,
                    color: "#1A1A1A",
                    fontSize: { xs: "1.5rem", md: "2rem" },
                  }}
                >
                  📈 Regulatory Push Toward Clarity
                </Typography>
              </Box>
              <Typography
                variant="h6"
                sx={{
                  color: "#1A1A1A",
                  lineHeight: 1.7,
                  fontSize: "1.1rem",
                  mb: 2,
                }}
              >
                RBI (India) and FCA (UK) mandate:
              </Typography>
              <List>
                {[
                  "Simplified interest disclosures",
                  "Transparent fee breakdowns",
                ].map((mandate, index) => (
                  <ListItem key={index} sx={{ py: 0.5 }}>
                    <ListItemText
                      primary={`• ${mandate}`}
                      primaryTypographyProps={{
                        fontSize: "1rem",
                        color: "#666",
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Box>

          {/* Final Thoughts */}
          <Box sx={{ mb: 8, animation: `${fadeInUp} 1s ease-out 1s both` }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 4, md: 6 },
                borderRadius: 2,
                border: "1px solid #E1E1E1",
                bgcolor: "#fdfdfd",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: primaryBlue,
                  mb: 3,
                  fontSize: { xs: "1.8rem", md: "2.2rem" },
                }}
              >
                💬 Final Thoughts
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "1.1rem",
                  color: "#333",
                  lineHeight: 1.7,
                  mb: 2,
                }}
              >
                Overdrafts can be a great short-term financial tool, but only
                when used responsibly. Treat it as a backup for emergencies—not
                a regular habit.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "1.1rem",
                  color: "#333",
                  lineHeight: 1.7,
                  fontStyle: "italic",
                }}
              >
                Always ask:{" "}
                <strong>
                  “Do I really need this right now, and can I repay quickly?”
                </strong>
              </Typography>
            </Paper>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default OverDraftBlog;
