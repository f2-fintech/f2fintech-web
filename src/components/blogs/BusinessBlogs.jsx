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
import {
  TrendingUp,
  Assessment,
  AccountBalance,
  Speed,
  Build,
  CreditCard,
  BarChart,
  Assignment,
  CheckCircle,
  Schedule,
  Person,
  CalendarToday,
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

const BusinessBlogs = () => {
  const theme = useTheme();

  const primaryBlue = "#0078D4";
  const secondaryBlue = "#106EBE";
  const lightBlue = "#F3F9FF";
  const accentBlue = "#0F6CBD";

  const loanTypes = [
    {
      title: "Term Loans",
      desc: "Single disbursement for long-term investments and business expansion",
      icon: <TrendingUp sx={{ fontSize: 28, color: primaryBlue }} />,
    },
    {
      title: "Working Capital",
      desc: "Daily operational expenses coverage for smooth business operations",
      icon: <Speed sx={{ fontSize: 28, color: primaryBlue }} />,
    },
    {
      title: "Equipment Financing",
      desc: "Secured against equipment purchases with competitive rates",
      icon: <Build sx={{ fontSize: 28, color: primaryBlue }} />,
    },
    {
      title: "Line of Credit",
      desc: "Flexible financing - pay interest only on the amount you use",
      icon: <CreditCard sx={{ fontSize: 28, color: primaryBlue }} />,
    },
    {
      title: "Microloans",
      desc: "Small loans with minimal documentation for startups and SMEs",
      icon: <BarChart sx={{ fontSize: 28, color: primaryBlue }} />,
    },
    {
      title: "Invoice Financing",
      desc: "Quick cash flow solution by borrowing against unpaid invoices",
      icon: <Assignment sx={{ fontSize: 28, color: primaryBlue }} />,
    },
  ];

  const benefits = [
    "Immediate access to capital without giving up ownership",
    "Tax benefits: Interest payments are often tax-deductible",
    "Customized loan options tailored for different business needs",
    "Build strong business credit with consistent repayments",
  ];

  const tips = [
    "Compare multiple lenders for best rates",
    "Maintain good credit score",
    "Prepare comprehensive documentation",
    "Calculate total cost of borrowing",
    "Read terms and conditions carefully",
    "Consider collateral requirements",
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#FAFAFA" }}>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: "white",
          py: { xs: 6, md: 10 },
          background: `linear-gradient(135deg, ${lightBlue} 0%, white 100%)`,
        }}
      >
        <Container>
          <Grid container alignItems="center">
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
                  BUSINESS FINANCING GUIDE 2025
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
                  Complete Guide to{" "}
                  <Box component="span" sx={{ color: primaryBlue }}>
                    Business Loans
                  </Box>{" "}
                  in India
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
                  Everything Indian entrepreneurs need to know about business
                  financing, loan types, rates, and application processes.
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
            <Grid>
              <Box
                sx={{
                  animation: `${slideInRight} 1s ease-out 0.2s both`,
                  textAlign: "center",
                }}
              >
                <Box
                  sx={{
                    width: "20vw",
                    height: "30vh",
                    backgroundImage: 'url("/F2 finetch.png")',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    bgcolor: primaryBlue,
                    borderRadius: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    boxShadow: "0 10px 30px rgba(0,120,212,0.2)",
                  }}
                ></Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 8 } }}>
        {/* Introduction */}
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
            <Typography
              variant="h6"
              sx={{
                color: "#1A1A1A",
                lineHeight: 1.7,
                fontSize: "1.1rem",
                mb: 2,
              }}
            >
              Running and growing a business often requires more than just hard
              work and vision—you need the right funding at the right time. In
              this comprehensive guide, we'll walk you through everything you
              need to know about business loans in India's evolving financial
              landscape.
            </Typography>
          </Paper>
        </Box>

        {/* What is a Business Loan */}
        <Box sx={{ mb: 8, animation: `${slideInLeft} 1s ease-out 0.2s both` }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: "#1A1A1A",
              mb: 4,
              fontSize: { xs: "2rem", md: "2.5rem" },
            }}
          >
            What Is a Business Loan?
          </Typography>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  width: "80%",
                  height: 300,
                  backgroundImage: 'url("/F2 fintechh.png")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
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
                }}
              >
                A business loan enables companies to access capital with a
                structured repayment plan. These loans serve various purposes
                including expanding operations, purchasing equipment, managing
                working capital, and acquiring other businesses or assets.
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Button
                  variant="outlined"
                  sx={{
                    color: primaryBlue,
                    borderColor: primaryBlue,
                    px: 3,
                    py: 1,
                    borderRadius: 1,
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": {
                      bgcolor: alpha(primaryBlue, 0.05),
                      borderColor: secondaryBlue,
                    },
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Types of Business Loans */}
        <Box sx={{ mb: 8, animation: `${fadeInUp} 1s ease-out 0.3s both` }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: "#1A1A1A",
              mb: 2,
              fontSize: { xs: "2rem", md: "2.5rem" },
            }}
          >
            Types of Business Loans in India
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
            Choose the right financing option for your business needs
          </Typography>

          <Grid container spacing={4}>
            {loanTypes.map((loan, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
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
                      {loan.icon}
                      <Typography
                        variant="h6"
                        sx={{
                          ml: 2,
                          fontWeight: 600,
                          color: "#1A1A1A",
                          fontSize: "1.2rem",
                        }}
                      >
                        {loan.title}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#666",
                        lineHeight: 1.6,
                        fontSize: "1rem",
                      }}
                    >
                      {loan.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Benefits Section */}
        <Box sx={{ mb: 8, animation: `${slideInRight} 1s ease-out 0.4s both` }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: "#1A1A1A",
              mb: 6,
              fontSize: { xs: "2rem", md: "2.5rem" },
            }}
          >
            Key Benefits
          </Typography>

          <Grid container spacing={4}>
            {benefits.map((benefit, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Box display="flex" alignItems="flex-start">
                  <CheckCircle sx={{ color: "#00B74A", mr: 2, mt: 0.5 }} />
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#1A1A1A",
                      lineHeight: 1.6,
                      fontSize: "1.1rem",
                      fontWeight: 500,
                    }}
                  >
                    {benefit}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Interest Rates */}
        <Box sx={{ mb: 8, animation: `${fadeInUp} 1s ease-out 0.5s both` }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: "#1A1A1A",
              mb: 2,
              fontSize: { xs: "2rem", md: "2.5rem" },
            }}
          >
            Interest Rates (2025)
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
            Current market rates for different loan types
          </Typography>

          <Grid container spacing={3}>
            {[
              {
                type: "Term Loans",
                rate: "9% – 16%",
                desc: "Long-term financing",
              },
              {
                type: "Working Capital",
                rate: "10% – 18%",
                desc: "Short-term needs",
              },
              {
                type: "Equipment Loans",
                rate: "8.5% – 15%",
                desc: "Asset-backed",
              },
              {
                type: "Microloans",
                rate: "12% – 22%",
                desc: "Small businesses",
              },
            ].map((rate, index) => (
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
                    variant="body2"
                    sx={{
                      color: primaryBlue,
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      mb: 1,
                    }}
                  >
                    {rate.type}
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      color: primaryBlue,
                      fontWeight: 700,
                      fontSize: "1.8rem",
                      mb: 1,
                    }}
                  >
                    {rate.rate}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#666",
                      fontSize: "0.85rem",
                    }}
                  >
                    {rate.desc}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Pro Tips */}
        <Box sx={{ mb: 8, animation: `${slideInLeft} 1s ease-out 0.6s both` }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: "#1A1A1A",
              mb: 6,
              fontSize: { xs: "2rem", md: "2.5rem" },
            }}
          >
            Pro Tips for Success
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            {tips.map((tip, index) => (
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

        {/* Final Thoughts */}
        <Box sx={{ animation: `${fadeInUp} 1s ease-out 0.7s both` }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: 2,
              bgcolor: primaryBlue,
              color: "white",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 3,
                fontSize: { xs: "1.8rem", md: "2.2rem" },
              }}
            >
              Ready to Scale Your Business?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                lineHeight: 1.7,
                fontSize: "1.1rem",
                mb: 4,
                opacity: 0.9,
              }}
            >
              A well-planned business loan can be the catalyst for scaling
              operations and improving your business's financial health. As we
              move through 2025, digital lending platforms are making it easier
              than ever to secure the right financing for your entrepreneurial
              goals.
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: "white",
                color: primaryBlue,
                px: 4,
                py: 1.5,
                borderRadius: 1,
                textTransform: "none",
                fontWeight: 700,
                fontSize: "1.1rem",
                "&:hover": {
                  bgcolor: "#F5F5F5",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Start Your Application
            </Button>
          </Paper>
        </Box>

        {/* Footer */}
        <Box sx={{ mt: 8, py: 4, borderTop: "1px solid #E1E1E1" }}>
          <Box
            display="flex"
            flexWrap="wrap"
            gap={1}
            justifyContent="center"
            mb={3}
          >
            {[
              "#BusinessLoans",
              "#EntrepreneurshipIndia",
              "#LoanGuide",
              "#BusinessFinance",
              "#SMELoans",
            ].map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                sx={{
                  bgcolor: alpha(primaryBlue, 0.1),
                  color: primaryBlue,
                  fontSize: "0.85rem",
                  "&:hover": { bgcolor: alpha(primaryBlue, 0.15) },
                }}
              />
            ))}
          </Box>
          <Typography variant="body2" textAlign="center" sx={{ color: "#666" }}>
            © 2025 Business Finance. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default BusinessBlogs;
