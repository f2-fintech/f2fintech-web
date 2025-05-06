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
import { image } from "@cloudinary/url-gen/qualifiers/source";
// import {icici.png} from "../../../public/icici.png"

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
      console.log("Clicked bank:", bankName);
      navigate(`/application-form?id=${borrower}`, {
        state: { selectedBank: bankName },
      });
    } catch (err) {
      console.error("Failed to update lead or navigate:", err);
    }
  };

  console.log("cibil", borrower);
  useEffect(() => {
    const fetchCibil = async () => {
      if (!borrower) return;
      setLoading(true);
      const result = await getLeadCibilScore(borrower);
      console.log("result", result);
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
        bgcolor: "#fff",
        boxShadow: 4,
        borderRadius: 3,
        mt: 4,
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        fontWeight={600}
        sx={{ color: "#2f3ee3" }}
      >
        Step 3: Available Loan Offers
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mt: 3 }}>
          {error}
        </Alert>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 3,
              p: 2,
              bgcolor: "#eef1ff",
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ mr: 2, color: "#2f3ee3", fontWeight: 600 }}
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
              sx={{ fontSize: "1.1rem", fontWeight: "bold", py: 2, px: 1 }}
            />
          </Box>

          {eligibleBanks.length === 0 ? (
            <Alert severity="warning" sx={{ mb: 2, bgcolor: "#fff8e1" }}>
              No eligible offers found based on your CIBIL score.
            </Alert>
          ) : (
            <>
              <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
                Based on your credit profile, you're eligible for loans from the
                following institutions:
              </Typography>

              <Grid container spacing={2}>
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
                          height: "90%", // 🔥 slightly smaller height
                          transition: "transform 0.2s, box-shadow 0.2s",
                          "&:hover": {
                            transform: "scale(1.03)",
                            boxShadow: 6,
                            bgcolor: "#f5f7ff",
                          },
                          borderRadius: 2,
                          boxShadow: 2,
                          bgcolor: "#ffffff", // 🔥 add a little internal padding to shrink content
                        }}
                      >
                        <CardActionArea
                          onClick={() => handleBankClick(bank)}
                          sx={{ height: "100%" }}
                        >
                          <CardMedia
                            component="img"
                            height="120" // 🔥 reduce image height
                            image={
                              details.logo ||
                              details.image ||
                              "/bank-logos/default.png"
                            }
                            alt={`${bank} logo`}
                            sx={{
                              objectFit: "contain",
                              p: 1, // 🔥 reduce padding inside image
                              bgcolor: "#f5f5f5",
                            }}
                          />
                          <CardContent sx={{ p: 1 }}>
                            {" "}
                            {/* 🔥 make card content padding smaller */}
                            <Typography
                              variant="h6"
                              component="div"
                              fontWeight={600}
                              fontSize="1rem"
                              sx={{ color: "#2f3ee3" }}
                            >
                              {bank}
                            </Typography>
                            <Box sx={{ mt: 1 }}>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                fontSize="0.8rem"
                              >
                                Interest Rate:
                              </Typography>
                              <Typography
                                variant="body1"
                                fontWeight={500}
                                fontSize="0.9rem"
                                sx={{ color: "#2f3ee3" }}
                              >
                                {details.minInterest}% - {details.maxInterest}%
                              </Typography>
                            </Box>
                            <Box sx={{ mt: 0.5 }}>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                fontSize="0.8rem"
                              >
                                Loan Tenure:
                              </Typography>
                              <Typography
                                variant="body1"
                                fontWeight={500}
                                fontSize="0.9rem"
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
