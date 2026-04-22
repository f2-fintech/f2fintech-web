import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Alert,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CircularProgress,
  Chip,
} from "@mui/material";
import useCreateLeadsInfo from "../../apis/EligibilityLeadsInfo";
import { useNavigate } from "react-router-dom";

// 🏦 CIBIL Eligibility Mapping with extended bank information
const bankDetails = {
  HDFC: {
    logo: "/hdfc.png",
    minInterest: 8.5,
    maxInterest: 12.5,
    minTenure: 12,
    maxTenure: 84,
  },
  ICICI: {
    logo: "/icici.png",
    minInterest: 8.7,
    maxInterest: 13.0,
    minTenure: 12,
    maxTenure: 72,
  },
  Axis: {
    logo: "eligibility_axis.png",
    minInterest: 8.75,
    maxInterest: 12.75,
    minTenure: 12,
    maxTenure: 60,
  },
  PNB: {
    logo: "eligibility_pnb.png",
    minInterest: 9.2,
    maxInterest: 14.0,
    minTenure: 12,
    maxTenure: 60,
  },
  IDFC: {
    logo: "eligibility_idfc.png",
    minInterest: 9.0,
    maxInterest: 13.5,
    minTenure: 12,
    maxTenure: 60,
  },
  Bajaj: {
    logo: "eligibility_bajaj.png",
    minInterest: 9.5,
    maxInterest: 16.0,
    minTenure: 12,
    maxTenure: 60,
  },
  Tata: {
    logo: "eligibility_tata.png",
    minInterest: 9.75,
    maxInterest: 15.5,
    minTenure: 12,
    maxTenure: 60,
  },
  Chola: {
    logo: "eligibility_chola.png",
    minInterest: 10.0,
    maxInterest: 16.5,
    minTenure: 12,
    maxTenure: 48,
  },
  "L&T": {
    logo: "eligibility_L&T.png",
    minInterest: 9.8,
    maxInterest: 15.75,
    minTenure: 12,
    maxTenure: 60,
  },
  Godrej: {
    logo: "eligibility_godrej.png",
    minInterest: 10.2,
    maxInterest: 15.8,
    minTenure: 12,
    maxTenure: 48,
  },
  NBFCs: {
    logo: "eligibility_nbfc.png",
    minInterest: 10.5,
    maxInterest: 18.0,
    minTenure: 6,
    maxTenure: 48,
  },
  Fintechs: {
    logo: "eligibility_fintech.png",
    minInterest: 11.0,
    maxInterest: 20.0,
    minTenure: 3,
    maxTenure: 36,
  },
  LendingKart: {
    logo: "eligibility_lendingkart.png",
    minInterest: 11.5,
    maxInterest: 19.5,
    minTenure: 3,
    maxTenure: 36,
  },
  KreditBee: {
    logo: "eligibility_kreditbee.png",
    minInterest: 12.0,
    maxInterest: 21.0,
    minTenure: 3,
    maxTenure: 24,
  },
  PaySense: {
    logo: "eligibility_paysense.png",
    minInterest: 12.5,
    maxInterest: 22.0,
    minTenure: 3,
    maxTenure: 24,
  },
};

// 🏦 CIBIL Eligibility Mapping
const cibilEligibilityMap = [
  { minScore: 750, banks: ["HDFC", "ICICI", "Axis"] },
  { minScore: 725, banks: ["PNB", "NBFCs"] },
  { minScore: 720, banks: ["IDFC"] },
  { minScore: 700, banks: ["Bajaj", "Tata", "Chola", "L&T", "Godrej"] },
  {
    minScore: 685,
    banks: ["NBFCs", "Fintechs", "LendingKart", "KreditBee", "PaySense"],
  },
];

const API_BASE_URL = "http://localhost:8080/api/v1"; // 🔥 change if needed

const Step3BankOffers = ({ onBack, borrower }) => {
  const { getLeadCibilScore, updateLeadsInfo } = useCreateLeadsInfo();
  const [cibilScore, setCibilScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // ✅ initialize

  const handleBankClick = async (bankName) => {
    try {
      await updateLeadsInfo(borrower, { provider: bankName });
      navigate(`/application-form?id=${borrower}`, {
        state: { selectedBank: bankName },
      });
    } catch (err) {
      console.error("Failed to update lead or navigate:", err);
    }
  };

  useEffect(() => {
    const fetchCibil = async () => {
      if (!borrower) return;
      setLoading(true);
      const result = await getLeadCibilScore(borrower);
      if (result.success) {
        setCibilScore(result.cibilScore);
      } else {
        setError(result.error);
      }
      setLoading(false);
    };

    fetchCibil();
  }, [borrower]);

  // Filter eligible banks based on fetched cibil score
  const eligibleBanks = cibilEligibilityMap
    .filter((criteria) => cibilScore >= criteria.minScore)
    .flatMap((criteria) => criteria.banks)
    // Remove duplicates
    .filter((bank, index, self) => self.indexOf(bank) === index);

  return (
    <Box
      sx={{
        maxWidth: 1000,
        mx: "auto",
        p: 4,
        bgcolor: "#ffffff",
        borderRadius: 2,
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        height: "55vh",
        overflow: "auto",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        fontWeight={600}
        sx={{
          color: "#333",
          fontFamily: "Poppins",
          textAlign: "center",
          mb: 3,
        }}
      >
        Available Loan Offers
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" py={6}>
          <CircularProgress size={40} sx={{ color: "#3244e6" }} />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mt: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 4,
              p: 3,
              bgcolor: "#f8f9fa",
              borderRadius: 2,
              border: "1px solid #e9ecef",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mr: 3,
                color: "#495057",
                fontWeight: 500,
                fontFamily: "Poppins",
              }}
            >
              Your CIBIL Score:
            </Typography>
            <Chip
              label={cibilScore}
              color={
                cibilScore >= 750
                  ? "success"
                  : cibilScore >= 700
                    ? "primary"
                    : "warning"
              }
              sx={{
                fontSize: "1.1rem",
                fontWeight: 600,
                py: 2,
                px: 1,
                minWidth: 80,
              }}
            />
          </Box>

          {eligibleBanks.length === 0 ? (
            <Alert severity="warning" sx={{ mb: 2, borderRadius: 2 }}>
              No eligible offers found based on your CIBIL score.
            </Alert>
          ) : (
            <>
              <Typography
                variant="body1"
                sx={{
                  mb: 3,
                  fontWeight: 400,
                  fontFamily: "Poppins",
                  textAlign: "center",
                  color: "#6c757d",
                }}
              >
                Based on your credit profile, you're eligible for loans from the
                following institutions:
              </Typography>

              <Grid container spacing={3}>
                {eligibleBanks.map((bank, idx) => {
                  const details = bankDetails[bank] || {
                    logo: "/bank-logos/default.png",
                    minInterest: 10,
                    maxInterest: 18,
                    minTenure: 12,
                    maxTenure: 60,
                  };

                  return (
                    <Grid item xs={12} sm={6} md={4} key={idx}>
                      <Card
                        sx={{
                          height: "100%",
                          transition: "all 0.2s ease",
                          "&:hover": {
                            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                            transform: "translateY(-2px)",
                          },
                          borderRadius: 2,
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                          border: "1px solid #e9ecef",
                        }}
                      >
                        <CardActionArea
                          onClick={() => handleBankClick(bank)}
                          sx={{ height: "100%", p: 0 }}
                        >
                          <Box
                            sx={{
                              p: 3,
                              textAlign: "center",
                              bgcolor: "#fafafa",
                            }}
                          >
                            <CardMedia
                              component="img"
                              height="80"
                              image={
                                details.logo ||
                                details.image ||
                                "/bank-logos/default.png"
                              }
                              alt={`${bank} logo`}
                              sx={{
                                objectFit: "contain",
                                mb: 1,
                              }}
                            />
                            <Typography
                              variant="h6"
                              component="div"
                              fontWeight={600}
                              sx={{
                                color: "#333",
                                fontFamily: "Poppins",
                                fontSize: "1.1rem",
                              }}
                            >
                              {bank}
                            </Typography>
                          </Box>

                          <CardContent sx={{ p: 3, pt: 2 }}>
                            <Box sx={{ mb: 2 }}>
                              <Typography
                                variant="body2"
                                color="#6c757d"
                                sx={{
                                  fontSize: "0.85rem",
                                  fontFamily: "Poppins",
                                  mb: 0.5,
                                }}
                              >
                                Interest Rate
                              </Typography>
                              <Typography
                                variant="h6"
                                fontWeight={600}
                                sx={{
                                  color: "#3244e6",
                                  fontFamily: "Poppins",
                                  fontSize: "1rem",
                                }}
                              >
                                {details.minInterest}% - {details.maxInterest}%
                              </Typography>
                            </Box>

                            <Box>
                              <Typography
                                variant="body2"
                                color="#6c757d"
                                sx={{
                                  fontSize: "0.85rem",
                                  fontFamily: "Poppins",
                                  mb: 0.5,
                                }}
                              >
                                Loan Tenure
                              </Typography>
                              <Typography
                                variant="h6"
                                fontWeight={600}
                                sx={{
                                  color: "#495057",
                                  fontFamily: "Poppins",
                                  fontSize: "1rem",
                                }}
                              >
                                {details.minTenure} - {details.maxTenure} months
                              </Typography>
                            </Box>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </>
          )}
        </>
      )}

      {/* <Button onClick={onBack} variant="outlined" fullWidth sx={{ mt: 4 }}>
      Back
    </Button> */}
    </Box>
  );
};

export default Step3BankOffers;
