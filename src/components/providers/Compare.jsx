import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";

import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
  Divider,
  CardMedia,
} from "@mui/material";

import { useLocation } from "react-router-dom"; // Import useLocation from react-router-dom

function Compare() {
  const location = useLocation(); // Use useLocation to get the state
  const { compares } = location.state; // Retrieve the compares array from state
  const [hoveredPair, setHoveredPair] = useState(null);

  const handleMouseEnter = (pair) => {
    setHoveredPair(pair);
  };

  const handleMouseLeave = () => {
    setHoveredPair(null);
  };
  const theme = useTheme();
  return (
    <>
      <Container
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "40px",
          backgroundColor: theme.palette.background.default,
        }}
      >
        {/* Enhanced Header Section */}
        <Box
          sx={{
            textAlign: "center",
            mb: 5,
            py: 4,
            background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            border: "1px solid rgba(0,0,0,0.05)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 4,
            },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              fontFamily: "Poppins",
              fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
              color: "#2c3e50",
              mb: 2,
            }}
          >
            🔍 Loan Provider Comparison
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Poppins",
              fontWeight: 400,
              color: "#7f8c8d",
              fontSize: { xs: "1rem", sm: "1.1rem" },
            }}
          >
            Compare {compares.length} providers side by side to make the best
            choice
          </Typography>
        </Box>

        {/* Comparison Cards Grid */}
        <Grid
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
          }}
          container
          spacing={4}
        >
          {compares.map((product, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: "100vh",
                  position: "relative",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  overflow: "hidden",
                  borderRadius: "20px",
                  background: "#ffffff",
                  border: "2px solid #e9ecef",
                  transform: hoveredPair === index ? "scale(1.02)" : "scale(1)",
                  boxShadow:
                    hoveredPair === index
                      ? "0 20px 40px rgba(47, 62, 227, 0.15)"
                      : "0 8px 24px rgba(0, 0, 0, 0.08)",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 6,
                    background:
                      index === 0
                        ? "linear-gradient(90deg, #2f3ee3, #2f3ee3)"
                        : index === 1
                        ? "linear-gradient(90deg, #2f3ee3, #2f3ee3)"
                        : "linear-gradient(90deg, #2f3ee3, #2f3ee3)",
                    zIndex: 1,
                  },
                }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Best Choice Badge */}
                {index === 0 && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 20,
                      right: -10,
                      backgroundColor: "#edc531",
                      color: "white",
                      borderRadius: "25px 0 0 25px",
                      px: 3,
                      py: 1,
                      transform: "rotate(0deg)",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      fontFamily: "Poppins",
                      zIndex: 2,
                      boxShadow: "0 4px 12px rgba(40, 167, 69, 0.3)",
                    }}
                  >
                    🏆 BEST CHOICE
                  </Box>
                )}

                {/* Logo Section */}
                <Box
                  sx={{
                    p: 3,
                    backgroundColor: "#f8f9fa",
                    textAlign: "center",
                    position: "relative",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="120"
                    image={product.homeimage}
                    alt={product.title}
                    sx={{
                      objectFit: "contain",
                      borderRadius: "12px",
                      filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.1))",
                    }}
                  />
                </Box>

                {/* Header Info */}
                <CardContent sx={{ pb: 2 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      fontFamily: "Poppins",
                      color: "#2c3e50",
                      textAlign: "center",
                      mb: 2,
                      fontSize: { xs: "1.2rem", sm: "1.4rem" },
                    }}
                  >
                    {product.title}
                  </Typography>

                  {/* Interest Rate Highlight */}
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 2,
                      backgroundColor: "#e7f3ff",
                      borderRadius: "12px",
                      border: "1px solid #2f3ee3",
                      mb: 3,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#6c757d",
                        fontSize: "0.9rem",
                        fontFamily: "Poppins",
                        mb: 0.5,
                      }}
                    >
                      Interest Rate
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 600,
                        fontSize: "1.6rem",
                        color: "#2f3ee3",
                        fontFamily: "Poppins",
                      }}
                    >
                      {product.interest_rate}
                    </Typography>
                  </Box>
                </CardContent>

                {/* Detailed Information */}
                <CardContent sx={{ pt: 0 }}>
                  {/* Key Features Grid */}
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "Poppins",
                        fontWeight: 600,
                        color: "#495057",
                        mb: 2,
                        fontSize: "1.1rem",
                      }}
                    >
                      📋 Key Details
                    </Typography>

                    {/* Charges */}
                    <Box
                      sx={{
                        p: 2,
                        mb: 2,
                        backgroundColor: "#fff3cd",
                        borderRadius: "8px",
                        border: "1px solid #ffeaa7",
                        height: "4vh",
                        flexDirection: "row",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: "Poppins",
                          fontWeight: 500,
                          color: "#856404",
                          fontSize: "0.85rem",
                          mb: 0.5,
                        }}
                      >
                        💰 Processing Charges
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontFamily: "Poppins",
                          fontWeight: 600,
                          color: "#495057",
                        }}
                      >
                        {product.charges}
                      </Typography>
                    </Box>

                    {/* Documents Required */}
                    <Box
                      sx={{
                        p: 2,
                        mb: 2,
                        backgroundColor: "#d4edda",
                        borderRadius: "8px",
                        border: "1px solid #c3e6cb",
                        height: "4vh",
                        flexDirection: "row",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: "Poppins",
                          fontWeight: 500,
                          color: "#155724",
                          fontSize: "0.85rem",
                          mb: 0.5,
                        }}
                      >
                        📄 Documents Required
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontFamily: "Poppins",
                          fontWeight: 600,
                          color: "#495057",
                        }}
                      >
                        {product.document_required}
                      </Typography>
                    </Box>

                    {/* Minimum KYC */}
                    <Box
                      sx={{
                        p: 2,
                        mb: 2,
                        backgroundColor: "#e2e3f0",
                        borderRadius: "8px",
                        border: "1px solid #c8ccd4",
                        height: "4vh",
                        flexDirection: "row",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: "Poppins",
                          fontWeight: 500,
                          color: "#383d47",
                          fontSize: "0.85rem",
                          mb: 0.5,
                        }}
                      >
                        🔐 Minimum KYC
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontFamily: "Poppins",
                          fontWeight: 600,
                          color: "#495057",
                        }}
                      >
                        {product.minimum_kyc}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Descriptions Section */}
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "Poppins",
                        fontWeight: 600,
                        color: "#495057",
                        mb: 2,
                        fontSize: "1.1rem",
                      }}
                    >
                      📝 About This Loan
                    </Typography>

                    {/* Short Description */}
                    <Box
                      sx={{
                        p: 2,
                        mb: 2,
                        backgroundColor: "#f8f9fa",
                        borderRadius: "8px",
                        border: "1px solid #dee2e6",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: "Poppins",
                          fontWeight: 500,
                          color: "#6c757d",
                          fontSize: "0.85rem",
                          mb: 0.5,
                        }}
                      >
                        Quick Overview
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: "Poppins",
                          color: "#495057",
                          lineHeight: 1.5,
                        }}
                      >
                        {product.short_description}
                      </Typography>
                    </Box>

                    {/* Long Description */}
                    <Box
                      sx={{
                        p: 2,
                        backgroundColor: "#f8f9fa",
                        borderRadius: "8px",
                        border: "1px solid #dee2e6",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: "Poppins",
                          fontWeight: 500,
                          color: "#6c757d",
                          fontSize: "0.85rem",
                          mb: 0.5,
                        }}
                      >
                        Detailed Information
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: "Poppins",
                          color: "#495057",
                          lineHeight: 1.5,
                        }}
                      >
                        {product.long_description}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Quick Stats */}
                  <Box
                    sx={{
                      mt: 3,
                      p: 2,
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      borderRadius: "12px",
                      color: "white",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "Poppins",
                        fontWeight: 600,
                        textAlign: "center",
                        mb: 1,
                      }}
                    >
                      ⭐ Provider Rating
                    </Typography>
                    <Box
                      sx={{ display: "flex", justifyContent: "center", gap: 1 }}
                    >
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Typography key={star} sx={{ fontSize: "1.2rem" }}>
                          {star <= (index === 0 ? 5 : index === 1 ? 4 : 3)
                            ? "⭐"
                            : "☆"}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Summary Comparison Table */}
        {compares.length > 1 && (
          <Box
            sx={{
              mt: 6,
              p: 4,
              backgroundColor: "#ffffff",
              borderRadius: "20px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
              border: "1px solid #e9ecef",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontFamily: "Poppins",
                fontWeight: 600,
                color: "#2c3e50",
                textAlign: "center",
                mb: 3,
              }}
            >
              📊 Quick Comparison Summary
            </Typography>

            <Box sx={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f8f9fa" }}>
                    <th
                      style={{
                        padding: "12px",
                        textAlign: "left",
                        fontFamily: "Poppins",
                        fontWeight: 600,
                      }}
                    >
                      Feature
                    </th>
                    {compares.map((product, index) => (
                      <th
                        key={index}
                        style={{
                          padding: "12px",
                          textAlign: "center",
                          fontFamily: "Poppins",
                          fontWeight: 600,
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
                        padding: "12px",
                        fontFamily: "Poppins",
                        fontWeight: 500,
                        backgroundColor: "#f8f9fa",
                      }}
                    >
                      Interest Rate
                    </td>
                    {compares.map((product, index) => (
                      <td
                        key={index}
                        style={{
                          padding: "12px",
                          textAlign: "center",
                          fontFamily: "Poppins",
                          color: "#2f3ee3",
                          fontWeight: 600,
                        }}
                      >
                        {product.interest_rate}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "12px",
                        fontFamily: "Poppins",
                        fontWeight: 500,
                        backgroundColor: "#f8f9fa",
                      }}
                    >
                      Processing Charges
                    </td>
                    {compares.map((product, index) => (
                      <td
                        key={index}
                        style={{
                          padding: "12px",
                          textAlign: "center",
                          fontFamily: "Poppins",
                        }}
                      >
                        {product.charges}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "12px",
                        fontFamily: "Poppins",
                        fontWeight: 500,
                        backgroundColor: "#f8f9fa",
                      }}
                    >
                      Minimum KYC
                    </td>
                    {compares.map((product, index) => (
                      <td
                        key={index}
                        style={{
                          padding: "12px",
                          textAlign: "center",
                          fontFamily: "Poppins",
                        }}
                      >
                        {product.minimum_kyc}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </Box>
          </Box>
        )}
      </Container>
    </>
  );
}

export default Compare;
