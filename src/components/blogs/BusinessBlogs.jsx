import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  List,
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

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
`;

const BusinessBlogs = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const primaryBlue = "#3a49d6";
  const secondaryBlue = "#2d3db5";
  const lightBlue = "#f4faff";
  const accentBlue = "#10b981";
  const accentGreen = "#10b981";

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
    <Box sx={{ minHeight: "100vh", bgcolor: "#f4faff", backgroundImage: "radial-gradient(at 50% 50%, #f4faff 0%, #eef6ff 100%)", fontFamily: "'Poppins', sans-serif" }}>
      {/* Hero Section */}
      <Box
        sx={{
          py: { xs: 6, md: 10 },
          background: "linear-gradient(135deg, rgba(50, 68, 230, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)",
          borderBottom: "1px solid rgba(50, 68, 230, 0.08)",
        }}
      >
        <Container>
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
                  BUSINESS FINANCING GUIDE 2025
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
                  Complete Guide to{" "}
                  <Box component="span" sx={{ color: accentGreen }}>
                    Business Loans
                  </Box>{" "}
                  in India
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#4b5563",
                    mb: 4,
                    lineHeight: 1.6,
                    fontSize: "1.25rem",
                    maxWidth: "600px",
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 500,
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
                  src="/F2 finetch.png"
                  alt="Business Loans"
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
        {/* Introduction */}
        <Box sx={{ mb: 8, animation: `${fadeInUp} 1s ease-out 0.1s both` }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: "16px",
              border: "1px solid rgba(50, 68, 230, 0.08)",
              bgcolor: "rgba(255, 255, 255, 0.85)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "#4b5563",
                lineHeight: 1.8,
                fontSize: "1.05rem",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
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
              fontWeight: 800,
              color: "#1f2937",
              mb: 4,
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontFamily: "'Outfit', 'Poppins', sans-serif",
            }}
          >
            What Is a Business Loan?
          </Typography>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  width: { xs: "100%", md: "80%" },
                  height: 300,
                  backgroundImage: 'url("/F2 fintechh.png")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 12px 35px rgba(0,0,0,0.06)",
                  border: "1px solid rgba(50, 68, 230, 0.1)",
                }}
              >
                <AccountBalance sx={{ fontSize: 120, color: primaryBlue, opacity: 0.15 }} />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h6"
                sx={{
                  color: "#4b5563",
                  lineHeight: 1.8,
                  fontSize: "1.05rem",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500,
                }}
              >
                A business loan enables companies to access capital with a
                structured repayment plan. These loans serve various purposes
                including expanding operations, purchasing equipment, managing
                working capital, and acquiring other businesses or assets.
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Button
                  variant="outlined"
                  sx={{
                    color: primaryBlue,
                    borderColor: "rgba(50, 68, 230, 0.3)",
                    px: 4,
                    py: 1.2,
                    borderRadius: "30px",
                    textTransform: "none",
                    fontWeight: 600,
                    fontFamily: "'Poppins', sans-serif",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      bgcolor: "rgba(50, 68, 230, 0.05)",
                      borderColor: secondaryBlue,
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(50, 68, 230, 0.1)",
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
              fontWeight: 800,
              color: "#1f2937",
              mb: 2,
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontFamily: "'Outfit', 'Poppins', sans-serif",
            }}
          >
            Types of Business Loans in India
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#6b7280",
              mb: 6,
              fontSize: "1.1rem",
              fontWeight: 500,
              fontFamily: "'Poppins', sans-serif",
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
                    border: "1px solid rgba(50, 68, 230, 0.08)",
                    borderRadius: "16px",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    bgcolor: "rgba(255, 255, 255, 0.85)",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: `0 15px 35px ${alpha(primaryBlue, 0.08)}`,
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
                          fontWeight: 700,
                          color: "#1f2937",
                          fontSize: "1.2rem",
                          fontFamily: "'Outfit', 'Poppins', sans-serif",
                        }}
                      >
                        {loan.title}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#6b7280",
                        lineHeight: 1.6,
                        fontSize: "0.95rem",
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 500,
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
              fontWeight: 800,
              color: "#1f2937",
              mb: 6,
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontFamily: "'Outfit', 'Poppins', sans-serif",
            }}
          >
            Key Benefits
          </Typography>

          <Grid container spacing={4}>
            {benefits.map((benefit, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Box display="flex" alignItems="flex-start">
                  <CheckCircle sx={{ color: "#10b981", mr: 2, mt: 0.5 }} />
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#4b5563",
                      lineHeight: 1.6,
                      fontSize: "1.05rem",
                      fontWeight: 500,
                      fontFamily: "'Poppins', sans-serif",
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
              fontWeight: 800,
              color: "#1f2937",
              mb: 2,
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontFamily: "'Outfit', 'Poppins', sans-serif",
            }}
          >
            Interest Rates (2025)
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#6b7280",
              mb: 6,
              fontSize: "1.1rem",
              fontWeight: 500,
              fontFamily: "'Poppins', sans-serif",
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
                    border: "1px solid rgba(50, 68, 230, 0.08)",
                    borderRadius: "16px",
                    bgcolor: "rgba(255, 255, 255, 0.85)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      borderColor: primaryBlue,
                      transform: "translateY(-4px)",
                      boxShadow: `0 12px 30px ${alpha(primaryBlue, 0.08)}`,
                    },
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#3244e6",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      mb: 1,
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    {rate.type}
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      color: primaryBlue,
                      fontWeight: 800,
                      fontSize: "1.8rem",
                      mb: 1,
                      fontFamily: "'Outfit', 'Poppins', sans-serif",
                    }}
                  >
                    {rate.rate}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#6b7280",
                      fontSize: "0.85rem",
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 500,
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
              fontWeight: 800,
              color: "#1f2937",
              mb: 4,
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontFamily: "'Outfit', 'Poppins', sans-serif",
            }}
          >
            Pro Tips for Success
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
            {tips.map((tip, index) => (
              <Chip
                key={index}
                label={tip}
                sx={{
                  bgcolor: "rgba(50, 68, 230, 0.06)",
                  color: primaryBlue,
                  border: "1px solid rgba(50, 68, 230, 0.15)",
                  fontSize: "0.95rem",
                  height: "auto",
                  py: 1,
                  px: 2,
                  borderRadius: "30px",
                  fontWeight: 600,
                  fontFamily: "'Poppins', sans-serif",
                  transition: "all 0.3s ease",
                  "& .MuiChip-label": {
                    px: 1,
                    py: 0.5,
                  },
                  "&:hover": {
                    bgcolor: "rgba(50, 68, 230, 0.12)",
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
              borderRadius: "20px",
              background: "linear-gradient(135deg, #3244e6 0%, #10b981 100%)",
              color: "white",
              boxShadow: "0 20px 50px rgba(50, 68, 230, 0.2)",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                mb: 3,
                fontSize: { xs: "1.8rem", md: "2.5rem" },
                fontFamily: "'Outfit', 'Poppins', sans-serif",
              }}
            >
              Ready to Scale Your Business?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                lineHeight: 1.8,
                fontSize: "1.05rem",
                mb: 4,
                opacity: 0.9,
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
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
              onClick={() => navigate("/application-form")}
              sx={{
                bgcolor: "white",
                color: "#3a49d6",
                px: 5,
                py: 1.5,
                borderRadius: "30px",
                textTransform: "none",
                fontWeight: 700,
                fontSize: "1.1rem",
                fontFamily: "'Poppins', sans-serif",
                boxShadow: "0 10px 25px rgba(255, 255, 255, 0.15)",
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: "#f0f4ff",
                  transform: "translateY(-2px)",
                  boxShadow: "0 12px 30px rgba(255, 255, 255, 0.3)",
                },
              }}
            >
              Start Your Application
            </Button>
          </Paper>
        </Box>

        {/* Footer */}
        <Box sx={{ mt: 8, py: 4, borderTop: "1px solid rgba(50, 68, 230, 0.1)" }}>
          <Box
            display="flex"
            flexWrap="wrap"
            gap={1.5}
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
            ))}
          </Box>
          <Typography variant="body2" textAlign="center" sx={{ fontFamily: "'Poppins', sans-serif", color: "#6b7280", fontWeight: 500 }}>
            © 2025 F2 Fintech. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default BusinessBlogs;
