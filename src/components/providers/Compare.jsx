import { useState, useMemo } from "react";
import { useTheme, styled, alpha } from "@mui/material/styles";
import { Link } from "react-router-dom";

import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
  CardMedia,
  Chip,
  LinearProgress,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";

import {
  TrendingUp,
  Assessment,
  Speed,
  Security,
  Star,
  CompareArrows,
  Calculate,
  Timeline,
  BusinessCenter,
  AccountBalance,
  MonetizationOn,
  CurrencyRupee,
  CheckCircle,
  Info,
  ArrowForward,
} from "@mui/icons-material";

import { useLocation } from "react-router-dom";
import { Percent, ShieldCheck, Zap, BarChart3 } from "lucide-react";

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: "24px",
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.08)",
  background: "#fff",
  border: "1px solid rgba(0, 0, 0, 0.05)",
  overflow: "hidden", // Clip sharp corners
  "& .MuiTable-root": {
    borderCollapse: "separate",
    borderSpacing: "0",
  },
}));

const StickyHeaderCell = styled(TableCell)(({ theme }) => ({
  position: "sticky",
  top: 0,
  zIndex: 10,
  backgroundColor: "#fff",
  padding: "32px 16px 24px", // Increased top padding for the chip
  borderBottom: "2px solid rgba(50, 68, 230, 0.1)",
  textAlign: "center",
}));

const MetricLabelCell = styled(TableCell)(({ theme }) => ({
  position: "sticky",
  left: 0,
  zIndex: 11,
  backgroundColor: "#fcfcfc",
  minWidth: "220px",
  fontWeight: 600,
  fontFamily: "Poppins",
  borderRight: "1px solid rgba(0, 0, 0, 0.05)",
  color: "#1a237e",
}));

function Compare() {
  const location = useLocation();
  const { compares } = location.state;
  const [hoveredRow, setHoveredRow] = useState(null);
  const theme = useTheme();

  const calculateProductivityScore = (product, index) => {
    let score = 85 - index * 5; // Base scoring
    if (product.charges && product.charges.includes("0%")) score += 10;
    if (product.minimum_kyc && product.minimum_kyc.includes("Basic"))
      score += 5;
    return Math.min(score, 100);
  };

  const getApprovalTime = (index) => {
    const times = ["24-48 hours", "2-3 days", "3-5 days"];
    return times[index] || "5-7 days";
  };

  const metrics = useMemo(() => [
    {
      id: "interest",
      label: "Interest Rate",
      icon: <MonetizationOn sx={{ fontSize: 20 }} />,
      getValue: (p) => p.interest_rate,
      format: (val) => `${val.replace("-", "% – ")}%`,
      isBetter: (v1, v2) => {
        const n1 = parseFloat(v1.split("-")[0]);
        const n2 = parseFloat(v2.split("-")[0]);
        return n1 < n2;
      },
    },
    {
      id: "charges",
      label: "Processing Fee",
      icon: <Calculate sx={{ fontSize: 20 }} />,
      getValue: (p) => p.charges,
      isBetter: (v1, v2) => {
        const n1 = parseFloat(v1.replace(/[^0-9.]/g, "") || "100");
        const n2 = parseFloat(v2.replace(/[^0-9.]/g, "") || "100");
        return n1 < n2;
      },
    },
    {
      id: "kyc",
      label: "KYC Requirement",
      icon: <AccountBalance sx={{ fontSize: 20 }} />,
      getValue: (p) => p.minimum_kyc,
    },
    {
      id: "amount",
      label: "Loan Range",
      icon: <CurrencyRupee sx={{ fontSize: 20 }} />,
      getValue: (p) => `₹${p.min_amount.toLocaleString("en-IN")} - ₹${p.max_amount.toLocaleString("en-IN")}`,
    },
    {
      id: "approval",
      label: "Approval Time",
      icon: <Speed sx={{ fontSize: 20 }} />,
      getValue: (p, i) => getApprovalTime(i),
    },
    {
      id: "docs",
      label: "Documents",
      icon: <Security sx={{ fontSize: 20 }} />,
      getValue: (p) => p.document_required,
    },
  ], []);

  return (
    <Box sx={{ bgcolor: "#f8faff", minHeight: "100vh", pb: 10 }}>
      <Box
        sx={{
          background: `linear-gradient(135deg, #3244e6 0%, #1e2bb1 100%)`,
          pt: { xs: 8, md: 4 },
          pb: { xs: 15, md: 20 },
          px: 3,
          textAlign: "center",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated Background Elements */}
        <Box
          sx={{
            position: "absolute",
            top: "-10%",
            right: "-5%",
            width: "400px",
            height: "400px",
            background: "rgba(255,255,255,0.05)",
            borderRadius: "50%",
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "-20%",
            left: "-5%",
            width: "300px",
            height: "300px",
            background: "rgba(255,255,255,0.05)",
            borderRadius: "50%",
            zIndex: 0,
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1.5,
              bgcolor: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              px: 3,
              py: 1,
              borderRadius: "100px",
              mb: 4,
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <BarChart3 size={20} color="#fff" />
            <Typography variant="subtitle2" sx={{ fontWeight: 600, letterSpacing: 1 }}>
              LIVE COMPARISON ENGINE
            </Typography>
          </Box>

          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontFamily: "Poppins",
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              mb: 2,
              lineHeight: 1.2,
            }}
          >
            Smart <span>Comparison</span> Dashboard
          </Typography>

          <Typography
            variant="h6"
            sx={{
              opacity: 0.9,
              maxWidth: "700px",
              mx: "auto",
              fontFamily: "Poppins",
              fontWeight: 400,
              mb: 6,
              fontSize: { xs: "1rem", md: "1.25rem" },
            }}
          >
            In-depth analysis of {compares.length} premium providers to help you find the perfect financial match.
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            {[
              { label: "Avg. Efficiency", value: "94%", icon: <Zap size={24} />, color: "#ffd700" },
              { label: "Best APR", value: "8.5%", icon: <TrendingUp sx={{ fontSize: 24 }} />, color: "#10b981" },
              { label: "Fastest Approval", value: "24h", icon: <Speed sx={{ fontSize: 24 }} />, color: "#fff" },
            ].map((stat, i) => (
              <Grid item xs={6} md={3} key={i}>
                <Box
                  sx={{
                    bgcolor: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(12px)",
                    p: 3,
                    borderRadius: "24px",
                    border: "1px solid rgba(255,255,255,0.15)",
                    transition: "transform 0.3s ease",
                    "&:hover": { transform: "translateY(-5px)" },
                  }}
                >
                  <Box sx={{ color: stat.color, mb: 1, display: "flex", justifyContent: "center" }}>
                    {stat.icon}
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>{stat.value}</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.7, fontWeight: 500 }}>{stat.label}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ mt: -8, position: "relative", zIndex: 2 }}>
        <StyledTableContainer component={Paper}>
          <Table stickyHeader aria-label="comparison table">
            <TableHead>
              <TableRow>
                <StickyHeaderCell
                  sx={{
                    left: 0,
                    zIndex: 12,
                    bgcolor: "#fcfcfc",
                    minWidth: "220px",
                    borderRight: "1px solid rgba(0, 0, 0, 0.05)",
                    borderTopLeftRadius: "24px",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700, color: "#1a237e" }}>
                    Features & Metrics
                  </Typography>
                </StickyHeaderCell>
                {compares.map((product, index) => (
                  <StickyHeaderCell
                    key={index}
                    sx={{
                      minWidth: "280px",
                      borderTopRightRadius: index === compares.length - 1 ? "24px" : 0,
                    }}
                  >
                    <Box sx={{ position: "relative" }}>
                      {index === 0 && (
                        <Chip
                          label="RECOMMENDED"
                          size="small"
                          sx={{
                            position: "absolute",
                            top: -15,
                            left: "50%",
                            transform: "translateX(-50%)",
                            bgcolor: "#10b981",
                            color: "white",
                            fontWeight: 800,
                            fontSize: "0.65rem",
                            px: 1,
                            zIndex: 20,
                            boxShadow: "0 4px 10px rgba(16, 185, 129, 0.3)",
                          }}
                        />
                      )}
                      <CardMedia
                        component="img"
                        image={product.home_image || product.homeimage}
                        alt={product.title}
                        sx={{
                          height: "60px",
                          width: "auto",
                          mx: "auto",
                          mb: 2,
                          objectFit: "contain",
                        }}
                      />
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 700,
                          fontFamily: "Poppins",
                          color: "#1a237e",
                          lineHeight: 1.2,
                        }}
                      >
                        {product.title}
                      </Typography>
                    </Box>
                  </StickyHeaderCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {metrics.map((metric) => (
                <TableRow
                  key={metric.id}
                  onMouseEnter={() => setHoveredRow(metric.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                  sx={{
                    bgcolor: hoveredRow === metric.id ? alpha("#3244e6", 0.02) : "transparent",
                    transition: "background-color 0.2s ease",
                  }}
                >
                  <MetricLabelCell>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Box
                        sx={{
                          p: 1,
                          borderRadius: "10px",
                          bgcolor: alpha("#3244e6", 0.1),
                          color: "#3244e6",
                          display: "flex"
                        }}
                      >
                        {metric.icon}
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {metric.label}
                      </Typography>
                    </Stack>
                  </MetricLabelCell>

                  {compares.map((product, index) => {
                    const value = metric.getValue(product, index);
                    const isWinner = metric.isBetter && compares.every(other => {
                      if (other === product) return true;
                      return metric.isBetter(value, metric.getValue(other));
                    });

                    return (
                      <TableCell
                        key={index}
                        align="center"
                        sx={{
                          py: 4,
                          borderRight: "1px solid rgba(0, 0, 0, 0.03)",
                        }}
                      >
                        <Box sx={{ position: "relative", display: "inline-block" }}>
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: isWinner ? 800 : 500,
                              color: isWinner ? "#10b981" : "#4a5568",
                              fontSize: isWinner ? "1.1rem" : "1rem",
                              fontFamily: "Poppins",
                            }}
                          >
                            {metric.format ? metric.format(value) : value}
                          </Typography>
                          {isWinner && (
                            <Tooltip title="Best in Class" arrow>
                              <Box
                                sx={{
                                  position: "absolute",
                                  right: -25,
                                  top: -5,
                                  display: "flex"
                                }}
                              >
                                <CheckCircle sx={{ fontSize: 16, color: "#10b981" }} />
                              </Box>
                            </Tooltip>
                          )}
                        </Box>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}

              {/* Productivity Score Row */}
              <TableRow>
                <MetricLabelCell>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: "10px",
                        bgcolor: alpha("#10b981", 0.1),
                        color: "#10b981",
                        display: "flex"
                      }}
                    >
                      <TrendingUp sx={{ fontSize: 20 }} />
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Efficiency Score
                    </Typography>
                  </Stack>
                </MetricLabelCell>
                {compares.map((product, index) => {
                  const score = calculateProductivityScore(product, index);
                  return (
                    <TableCell key={index} align="center" sx={{ py: 4 }}>
                      <Box sx={{ px: 4 }}>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 800, mb: 1, color: score > 90 ? "#10b981" : "#3244e6" }}
                        >
                          {score}%
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={score}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            bgcolor: alpha(score > 90 ? "#10b981" : "#3244e6", 0.1),
                            "& .MuiLinearProgress-bar": {
                              bgcolor: score > 90 ? "#10b981" : "#3244e6",
                              borderRadius: 3,
                            },
                          }}
                        />
                      </Box>
                    </TableCell>
                  );
                })}
              </TableRow>

              {/* Action Row */}
              <TableRow>
                <MetricLabelCell sx={{ borderBottom: "none" }} />
                {compares.map((product, index) => (
                  <TableCell
                    key={index}
                    align="center"
                    sx={{ py: 6, borderBottom: "none" }}
                  >
                    <Button
                      component={Link}
                      to="/application-form"
                      variant="contained"
                      endIcon={<ArrowForward />}
                      sx={{
                        bgcolor: index === 0 ? "#10b981" : "#3244e6",
                        color: "white",
                        px: 4,
                        py: 1.5,
                        borderRadius: "12px",
                        fontWeight: 700,
                        textTransform: "none",
                        fontSize: "0.95rem",
                        boxShadow: `0 8px 20px ${alpha(index === 0 ? "#10b981" : "#3244e6", 0.25)}`,
                        "&:hover": {
                          bgcolor: index === 0 ? "#059669" : "#1e2bb1",
                          transform: "translateY(-2px)",
                          boxShadow: `0 12px 25px ${alpha(index === 0 ? "#10b981" : "#3244e6", 0.35)}`,
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      {index === 0 ? "Apply - Best Choice" : "Apply Now"}
                    </Button>
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </StyledTableContainer>

        {/* Comparison Tips Section */}
        <Box sx={{ mt: 8, textAlign: "center" }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#1a237e", mb: 4 }}>
            Why compare with F2 Fintech?
          </Typography>
          <Grid container spacing={3}>
            {[
              {
                title: "Real-time Data",
                desc: "Our engine fetches the latest rates and charges directly from providers.",
                icon: <Zap size={32} color="#3244e6" />
              },
              {
                title: "Neutral Analysis",
                desc: "We provide an unbiased comparison based on your specific requirements.",
                icon: <ShieldCheck size={32} color="#10b981" />
              },
              {
                title: "Expert Support",
                desc: "Get free consultation from our financial experts after comparing.",
                icon: <Info size={32} color="#3244e6" />
              }
            ].map((tip, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Paper
                  sx={{
                    p: 4,
                    borderRadius: "24px",
                    height: "100%",
                    border: "1px solid rgba(0,0,0,0.05)",
                    transition: "all 0.3s ease",
                    "&:hover": { boxShadow: "0 15px 35px rgba(0,0,0,0.06)" }
                  }}
                >
                  <Box sx={{ mb: 2 }}>{tip.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: "#1a237e" }}>
                    {tip.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#666", lineHeight: 1.6 }}>
                    {tip.desc}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default Compare;