"use client";

import { useState } from "react";
import { useTheme } from "@mui/material/styles";

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
} from "@mui/icons-material";

import { useLocation } from "react-router-dom";
import { Percent } from "lucide-react";

function Compare() {
  const location = useLocation();
  const { compares } = location.state;
  const [hoveredPair, setHoveredPair] = useState(null);

  const handleMouseEnter = (pair) => {
    setHoveredPair(pair);
  };

  const handleMouseLeave = () => {
    setHoveredPair(null);
  };
  const theme = useTheme();

  const calculateProductivityScore = (product, index) => {
    let score = 85 - index * 10; // Base scoring
    if (product.charges && product.charges.includes("0%")) score += 10;
    if (product.minimum_kyc && product.minimum_kyc.includes("Basic"))
      score += 5;
    return Math.min(score, 100);
  };

  const getApprovalTime = (index) => {
    const times = ["24-48 hours", "2-3 days", "3-5 days"];
    return times[index] || "5-7 days";
  };

  return (
    <>
      <Container
        maxWidth="false"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "40px",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            mb: 4,
            py: 4,
            background: `linear-gradient(135deg, #3244e6, #3244e6, #3244e6)`,
            boxShadow: "0 12px 40px rgba(30,60,114,0.3)",
            borderRadius: { xs: "0px", md: "24px" }, // Optional: remove border radius on mobile
            color: "white",
            position: "relative",
            overflow: "hidden",
            // For mobile full width
            width: "100vw",
            marginLeft: { xs: "calc(-50vw + 50%)", md: 0 },
            // For desktop
            "@media (min-width: 900px)": {
              width: "auto",
              marginLeft: "auto",
            },
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Assessment sx={{ fontSize: 48, mr: 2 }} />
          </Box>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              fontFamily: "Poppins",
              fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.8rem" },
              mb: 1,
            }}
          >
            Smart Loan Comparison Dashboard
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Poppins",
              fontWeight: 400,
              opacity: 0.9,
              fontSize: { xs: "1rem", sm: "1.2rem" },
              mb: 3,
            }}
          >
            AI-Powered Analysis of {compares.length} Premium Providers
          </Typography>

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={4}
            justifyContent="center"
            sx={{ mt: 3 }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, color: "#ffd700" }}
              >
                {Math.round(
                  compares.reduce(
                    (acc, product, index) =>
                      acc + calculateProductivityScore(product, index),
                    0
                  ) / compares.length
                )}
                %
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, color: "#fff" }}>
                Avg. Efficiency Score
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: "#FFf" }}>
                {getApprovalTime(0)}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, color: "#fff" }}>
                > Fastest Approval
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, color: "#ffd700" }}
              >
                $
                {Math.min(
                  ...compares.map((p) =>
                    Number.parseFloat(p.charges?.replace(/[^0-9.]/g, "") || "0")
                  )
                ).toFixed(0)}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, color: "#fff" }}>
                Lowest Processing Fee
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Grid container spacing={3}>
          {compares.map((product, index) => {
            const productivityScore = calculateProductivityScore(
              product,
              index
            );
            const approvalTime = getApprovalTime(index);

            return (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: "auto",
                    minHeight: { xs: "auto", md: "800px" },
                    position: "relative",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    overflow: "hidden",
                    borderRadius: "20px",
                    background:
                      "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
                    border:
                      index === 0 ? "3px solid #4CAF50" : "2px solid #e9ecef",
                    transform: {
                      xs: "translateY(0)",
                      md:
                        hoveredPair === index
                          ? "translateY(-8px)"
                          : "translateY(0)",
                    },
                    boxShadow: {
                      xs:
                        index === 0
                          ? "0 8px 20px rgba(76,175,80,0.15)"
                          : "0 4px 12px rgba(0, 0, 0, 0.06)",
                      md:
                        hoveredPair === index
                          ? "0 25px 50px rgba(0,0,0,0.15)"
                          : index === 0
                          ? "0 15px 35px rgba(76,175,80,0.2)"
                          : "0 8px 24px rgba(0, 0, 0, 0.08)",
                    },
                    // Add full width for mobile only
                    width: { xs: "100%", md: "auto" },
                    mx: { xs: 0, md: "auto" },
                  }}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  {index === 0 && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 15,
                        right: -0,
                        backgroundColor: "#4CAF50",
                        color: "white",
                        borderRadius: "20px 0 0 20px",
                        px: 3,
                        py: 1.5,
                        fontSize: "0.55rem",
                        fontWeight: 700,
                        fontFamily: "Poppins",
                        zIndex: 2,
                        boxShadow: "0 6px 16px rgba(76,175,80,0.4)",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        width: {
                          xs: "20vw",
                          md: "inherit",
                        },
                      }}
                    >
                      <Star sx={{ fontSize: 18 }} />
                      RECOMMENDED
                    </Box>
                  )}

                  <Box
                    sx={{
                      position: "absolute",
                      top: 15,
                      left: 15,
                      backgroundColor:
                        productivityScore >= 90
                          ? "#4CAF50"
                          : productivityScore >= 80
                          ? "#FF9800"
                          : "#757575",
                      color: "white",
                      borderRadius: "12px",
                      px: 2,
                      py: 1,
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      zIndex: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                    }}
                  >
                    <TrendingUp sx={{ fontSize: 16 }} />
                    {productivityScore}% Efficient
                  </Box>

                  {/* Logo Section */}
                  <Box
                    sx={{
                      p: 3,
                      pt: 6,
                      backgroundColor: "#f8f9fa",
                      textAlign: "center",
                      position: "relative",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="100"
                      image={product.homeimage}
                      alt={product.title}
                      sx={{
                        objectFit: "contain",
                        borderRadius: "12px",
                        filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.1))",
                      }}
                    />
                  </Box>

                  <CardContent sx={{ pb: 2 }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        fontFamily: "Poppins",
                        color: "#1a237e",
                        textAlign: "center",
                        mb: 2,
                        fontSize: { xs: "1.3rem", sm: "1.5rem" },
                      }}
                    >
                      {product.title}
                    </Typography>

                    <Paper
                      elevation={0}
                      sx={{
                        textAlign: "center",
                        p: 3,
                        backgroundColor: index === 0 ? "#e8f5e8" : "#e3f2fd",
                        borderRadius: "16px",
                        border: `2px solid ${
                          index === 0 ? "#4CAF50" : "#2196F3"
                        }`,
                        mb: 3,
                        position: "relative",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          mb: 1,
                        }}
                      >
                        <MonetizationOn
                          sx={{
                            color: index === 0 ? "#4CAF50" : "#2196F3",
                            mr: 1,
                          }}
                        />
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#666",
                          fontSize: "0.9rem",
                          fontFamily: "Poppins",
                          mb: 0.5,
                          fontWeight: 500,
                        }}
                      >
                        Interest Rate
                      </Typography>
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 700,
                          fontSize: "2rem",
                          color: index === 0 ? "#4CAF50" : "#2196F3",
                          fontFamily: "Poppins",
                          mb: 1,
                        }}
                      >
                        {product.interest_rate}
                      </Typography>

                      <Chip
                        icon={<Speed />}
                        label={`Approval: ${approvalTime}`}
                        size="small"
                        sx={{
                          backgroundColor: index === 0 ? "#4CAF50" : "#FF9800",
                          color: "white",
                          fontWeight: 600,
                          fontSize: "0.75rem",
                        }}
                      />
                    </Paper>
                  </CardContent>

                  <CardContent sx={{ pt: 0 }}>
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: "Poppins",
                          fontWeight: 700,
                          color: "#1a237e",
                          mb: 2.5,
                          fontSize: "1.1rem",
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <BusinessCenter sx={{ color: "#1a237e" }} />
                        Business Metrics
                      </Typography>

                      {/* Processing Charges */}
                      <Paper
                        elevation={1}
                        sx={{
                          p: 2.5,
                          mb: 2,
                          backgroundColor: "#fff8e1",
                          borderRadius: "12px",
                          border: "1px solid #ffcc02",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Calculate sx={{ color: "#f57c00", fontSize: 20 }} />
                          <Typography
                            variant="body2"
                            sx={{
                              fontFamily: "Poppins",
                              fontWeight: 600,
                              color: "#e65100",
                              fontSize: "0.9rem",
                            }}
                          >
                            Processing Fee
                          </Typography>
                        </Box>
                        <Typography
                          variant="body1"
                          sx={{
                            fontFamily: "Poppins",
                            fontWeight: 700,
                            color: "#1a237e",
                            fontSize: "1rem",
                          }}
                        >
                          {product.charges}
                        </Typography>
                      </Paper>

                      {/* Documents Required */}
                      <Paper
                        elevation={1}
                        sx={{
                          p: 2.5,
                          mb: 2,
                          backgroundColor: "#e8f5e8",
                          borderRadius: "12px",
                          border: "1px solid #4CAF50",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Security sx={{ color: "#2e7d32", fontSize: 20 }} />
                          <Typography
                            variant="body2"
                            sx={{
                              fontFamily: "Poppins",
                              fontWeight: 600,
                              color: "#1b5e20",
                              fontSize: "0.9rem",
                            }}
                          >
                            Documentation
                          </Typography>
                        </Box>
                        <Chip
                          label={product.document_required}
                          size="small"
                          sx={{
                            backgroundColor: "#4CAF50",
                            color: "white",
                            fontWeight: 600,
                            // Responsive sizing
                            fontSize: {
                              xs: "0.65rem",
                              sm: "0.75rem",
                              md: "0.8125rem",
                            },
                            height: { xs: 20, sm: 24, md: 32 },
                            minHeight: { xs: 20, sm: 24, md: 32 },
                            "& .MuiChip-label": {
                              px: { xs: 0.8, sm: 1, md: 1.5 },
                              py: { xs: 0.5, sm: 0.8, md: 1 },
                              fontSize: "inherit", // Inherit from parent
                            },
                          }}
                        />
                      </Paper>

                      {/* Minimum KYC */}
                      <Paper
                        elevation={1}
                        sx={{
                          p: 2.5,
                          mb: 2,
                          backgroundColor: "#f3e5f5",
                          borderRadius: "12px",
                          border: "1px solid #9c27b0",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <AccountBalance
                            sx={{ color: "#7b1fa2", fontSize: 20 }}
                          />
                          <Typography
                            variant="body2"
                            sx={{
                              fontFamily: "Poppins",
                              fontWeight: 600,
                              color: "#4a148c",
                              fontSize: "0.9rem",
                            }}
                          >
                            KYC
                          </Typography>
                        </Box>
                        <Typography
                          variant="body1"
                          sx={{
                            fontFamily: "Poppins",
                            fontWeight: 700,
                            color: "#1a237e",
                            fontSize: "1rem",
                          }}
                        >
                          {product.minimum_kyc}
                        </Typography>
                      </Paper>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: "Poppins",
                          fontWeight: 700,
                          color: "#1a237e",
                          mb: 2,
                          fontSize: "1.1rem",
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <Timeline sx={{ color: "#1a237e" }} />
                        Product Details
                      </Typography>

                      <Paper
                        elevation={0}
                        sx={{
                          p: 3,
                          backgroundColor: "#fafafa",
                          borderRadius: "12px",
                          border: "1px solid #e0e0e0",
                          mb: 2,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontFamily: "Poppins",
                            fontWeight: 600,
                            color: "#1a237e",
                            fontSize: "0.9rem",
                            mb: 1,
                          }}
                        >
                          Executive Summary
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontFamily: "Poppins",
                            color: "#1976d2", // blue accent for highlighting
                            fontWeight: 600, // make it bold
                            lineHeight: 1.6,
                            fontSize: "0.95rem",
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <Percent
                            sx={{ fontSize: "1rem", color: "#1976d2" }}
                          />
                          Interest Rate:{" "}
                          <span style={{ color: "#212121" }}>
                            {product.interest_rate.replace("-", "% – ")}%
                          </span>
                        </Typography>
                      </Paper>

                      <Paper
                        elevation={0}
                        sx={{
                          p: 3,
                          backgroundColor: "#fafafa",
                          borderRadius: "12px",
                          border: "1px solid #e0e0e0",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontFamily: "Poppins",
                            fontWeight: 600,
                            color: "#1a237e",
                            fontSize: "0.9rem",
                            mb: 1,
                          }}
                        >
                          Comprehensive Analysis
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontFamily: "Poppins",
                            color: "#555",
                            fontSize: "0.85rem",
                            mb: 1,
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <CurrencyRupee
                            sx={{ fontSize: "1rem", color: "#1976d2" }}
                          />
                          <span style={{ color: "#757575" }}>
                            Minimum Amount:
                          </span>
                          <span style={{ fontWeight: 600, color: "#212121" }}>
                            {product.min_amount.toLocaleString("en-IN")}
                          </span>
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{
                            fontFamily: "Poppins",
                            color: "#555",
                            fontSize: "0.85rem",
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <CurrencyRupee
                            sx={{ fontSize: "1rem", color: "#388e3c" }}
                          />
                          <span style={{ color: "#757575" }}>
                            Maximum Amount:
                          </span>
                          <span style={{ fontWeight: 600, color: "#212121" }}>
                            {product.max_amount.toLocaleString("en-IN")}
                          </span>
                        </Typography>
                      </Paper>
                    </Box>

                    {/* <Paper
                      elevation={ 2 }
                      sx={ {
                        p: 3,
                        background: `linear-gradient(135deg, ${ index === 0 ? "#4CAF50" : "#2196F3" } 0%, ${ index === 0 ? "#66BB6A" : "#42A5F5" } 100%)`,
                        borderRadius: "16px",
                        color: "white",
                        textAlign: "center",
                      } }
                    >
                      <Typography
                        variant="h6"
                        sx={ {
                          fontFamily: "Poppins",
                          fontWeight: 700,
                          mb: 2,
                        } }
                      >
                        Performance Rating
                      </Typography>

                      <Box sx={ { mb: 2 } }>
                        <LinearProgress
                          variant="determinate"
                          value={ productivityScore }
                          sx={ {
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: "rgba(255,255,255,0.3)",
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "white",
                              borderRadius: 4,
                            },
                          } }
                        />
                        <Typography
                          variant="h4"
                          sx={ {
                            fontWeight: 700,
                            mt: 1,
                            fontFamily: "Poppins",
                          } }
                        >
                          { productivityScore }/100
                        </Typography>
                      </Box>

                      <Box sx={ { display: "flex", justifyContent: "center", gap: 0.5 } }>
                        { [ 1, 2, 3, 4, 5 ].map( ( star ) => (
                          <Star
                            key={ star }
                            sx={ {
                              fontSize: "1.5rem",
                              color: star <= Math.ceil( productivityScore / 20 ) ? "#FFD700" : "rgba(255,255,255,0.3)",
                            } }
                          />
                        ) ) }
                      </Box>
                    </Paper> */}

                    {/* <Button
                      variant="contained"
                      fullWidth
                      sx={ {
                        mt: 3,
                        py: 1.5,
                        backgroundColor: index === 0 ? "#4CAF50" : "#2196F3",
                        borderRadius: "12px",
                        fontWeight: 700,
                        fontSize: "1rem",
                        textTransform: "none",
                        boxShadow: `0 4px 12px rgba(${ index === 0 ? "76,175,80" : "33,150,243" },0.3)`,
                        "&:hover": {
                          backgroundColor: index === 0 ? "#45a049" : "#1976d2",
                          transform: "translateY(-2px)",
                          boxShadow: `0 6px 16px rgba(${ index === 0 ? "76,175,80" : "33,150,243" },0.4)`,
                        },
                      } }
                    >
                      { index === 0 ? "Apply Now - Best Choice" : "Get Details" }
                    </Button> */}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {compares.length > 1 && (
          <Paper
            elevation={3}
            sx={{
              mt: 6,
              p: 4,
              borderRadius: "20px",
              background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
            }}
          >
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <CompareArrows sx={{ fontSize: 48, color: "#1a237e", mb: 2 }} />
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: 700,
                  color: "#1a237e",
                  mb: 1,
                }}
              >
                Executive Comparison Matrix
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#666",
                  fontFamily: "Poppins",
                }}
              >
                Side-by-side analysis for informed decision making
              </Typography>
            </Box>

            <Box sx={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "separate",
                  borderSpacing: "0 8px",
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        padding: "16px",
                        textAlign: "left",
                        fontFamily: "Poppins",
                        fontWeight: 700,
                        backgroundColor: "#1a237e",
                        color: "white",
                        borderRadius: "12px 0 0 12px",
                        fontSize: "1rem",
                      }}
                    >
                      Key Metrics
                    </th>
                    {compares.map((product, index) => (
                      <th
                        key={index}
                        style={{
                          padding: "16px",
                          textAlign: "center",
                          fontFamily: "Poppins",
                          fontWeight: 700,
                          backgroundColor: index === 0 ? "#4CAF50" : "#2196F3",
                          color: "white",
                          borderRadius:
                            index === compares.length - 1
                              ? "0 12px 12px 0"
                              : "0",
                          fontSize: "1rem",
                        }}
                      >
                        {product.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      style={{
                        padding: "16px",
                        fontFamily: "Poppins",
                        fontWeight: 600,
                        backgroundColor: "#f8f9fa",
                        borderRadius: "12px 0 0 12px",
                        color: "#1a237e",
                      }}
                    >
                      Interest Rate
                    </td>
                    {compares.map((product, index) => (
                      <td
                        key={index}
                        style={{
                          padding: "16px",
                          textAlign: "center",
                          fontFamily: "Poppins",
                          color: index === 0 ? "#4CAF50" : "#2196F3",
                          fontWeight: 700,
                          fontSize: "1.1rem",
                          backgroundColor: "white",
                          borderRadius:
                            index === compares.length - 1
                              ? "0 12px 12px 0"
                              : "0",
                        }}
                      >
                        {product.interest_rate.replace("-", "% – ")}%
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "16px",
                        fontFamily: "Poppins",
                        fontWeight: 600,
                        backgroundColor: "#f8f9fa",
                        borderRadius: "12px 0 0 12px",
                        color: "#1a237e",
                      }}
                    >
                      Processing Charges
                    </td>
                    {compares.map((product, index) => (
                      <td
                        key={index}
                        style={{
                          padding: "16px",
                          textAlign: "center",
                          fontFamily: "Poppins",
                          fontWeight: 600,
                          backgroundColor: "white",
                          borderRadius:
                            index === compares.length - 1
                              ? "0 12px 12px 0"
                              : "0",
                        }}
                      >
                        {product.charges}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "16px",
                        fontFamily: "Poppins",
                        fontWeight: 600,
                        backgroundColor: "#f8f9fa",
                        borderRadius: "12px 0 0 12px",
                        color: "#1a237e",
                      }}
                    >
                      Minimum Amount
                    </td>
                    {compares.map((product, index) => (
                      <td
                        key={index}
                        style={{
                          padding: "16px",
                          textAlign: "center",
                          fontFamily: "Poppins",
                          fontWeight: 600,
                          backgroundColor: "white",
                          borderRadius:
                            index === compares.length - 1
                              ? "0 12px 12px 0"
                              : "0",
                        }}
                      >
                        From{" "}
                        <span style={{ marginLeft: "10px" }}>
                          ₹{product.min_amount.toLocaleString("en-IN")}
                        </span>
                        <br />
                        Upto{" "}
                        <span style={{ marginLeft: "10px" }}>
                          ₹{product.max_amount.toLocaleString("en-IN")}
                        </span>
                      </td>
                    ))}
                  </tr>
                  {/* <tr>
                    <td
                      style={ {
                        padding: "16px",
                        fontFamily: "Poppins",
                        fontWeight: 600,
                        backgroundColor: "#f8f9fa",
                        borderRadius: "12px 0 0 12px",
                        color: "#1a237e",
                      } }
                    >
                      Miximum Amount
                    </td>
                    { compares.map( ( product, index ) => (
                      <td
                        key={ index }
                        style={ {
                          padding: "16px",
                          textAlign: "center",
                          fontFamily: "Poppins",
                          fontWeight: 600,
                          backgroundColor: "white",
                          borderRadius: index === compares.length - 1 ? "0 12px 12px 0" : "0",
                        } }
                      >
                        ₹{ product.max_amount.toLocaleString( "en-IN" ) }
                      </td>
                    ) ) }
                  </tr> */}
                  {/* <tr>
                    <td
                      style={ {
                        padding: "16px",
                        fontFamily: "Poppins",
                        fontWeight: 600,
                        backgroundColor: "#f8f9fa",
                        borderRadius: "12px 0 0 12px",
                        color: "#1a237e",
                      } }
                    >
                      Efficiency Score
                    </td>
                    { compares.map( ( product, index ) => (
                      <td
                        key={ index }
                        style={ {
                          padding: "16px",
                          textAlign: "center",
                          fontFamily: "Poppins",
                          fontWeight: 700,
                          fontSize: "1.1rem",
                          color: calculateProductivityScore( product, index ) >= 90 ? "#4CAF50" : "#FF9800",
                          backgroundColor: "white",
                          borderRadius: index === compares.length - 1 ? "0 12px 12px 0" : "0",
                        } }
                      >
                        { calculateProductivityScore( product, index ) }%
                      </td>
                    ) ) }
                  </tr> */}
                </tbody>
              </table>
            </Box>
          </Paper>
        )}
      </Container>
    </>
  );
}

export default Compare;
