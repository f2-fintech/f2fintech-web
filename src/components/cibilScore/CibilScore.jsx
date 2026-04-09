import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Divider,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { axiosInstance } from "../../apis/config/axiosConfig";
import { styled } from "@mui/material/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SpeedIcon from "@mui/icons-material/Speed";
import { toast } from "react-toastify";
import { Utility } from "../utility";

// Generate 15 char refid, easy to identify and read (e.g. CBL-030426-A1X9)
const generateRefId = () => {
  const date = new Date();
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = String(date.getFullYear()).slice(-2);

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomPart = "";
  for (let i = 0; i < 4; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return `CBL-${d}${m}${y}-${randomPart}`;
};

// Styled Components
const ModernButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%)",
  color: "white",
  fontWeight: 600,
  fontSize: "1rem",
  padding: "12px 24px",
  borderRadius: "8px",
  textTransform: "none",
  boxShadow: "0 4px 14px 0 rgba(13, 110, 253, 0.39)",
  "&:hover": {
    background: "linear-gradient(135deg, #0a58ca 0%, #084298 100%)",
  },
}));

const ScoreBox = styled(Box)(({ theme, scorecolor }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(4),
  borderRadius: "16px",
  background: `linear-gradient(135deg, ${scorecolor}15 0%, ${scorecolor}05 100%)`,
  border: `2px solid ${scorecolor}30`,
  marginTop: theme.spacing(3),
}));

const CibilScore = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleDownload = () => {
    if (!result) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(result, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "Credit_Report.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const initialValues = {
    name: "",
    mobile: "",
    document_id: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .matches(/^[a-zA-Z\s]+$/, "Only alphabets are allowed"),
    mobile: Yup.string()
      .required("Mobile number is required")
      .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),
    document_id: Yup.string()
      .required("PAN is required")
      .matches(/^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/, "Invalid PAN format (e.g. ABCDE1234F)"),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    setResult(null);

    const refId = generateRefId();

    const payload = {
      refid: refId,
      name: values.name.trim(),
      mobile: values.mobile,
      document_id: values.document_id.toUpperCase(),
    };

    try {
      const response = await axiosInstance.post(
        "/check-cibil",
        { payload },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("CIBIL API Response:", response.data);

      if (response.data) {
        setResult(response.data);
      } else {
        toast.error("Failed to fetch credit score.");
      }
    } catch (error) {
      console.error("Error fetching credit score:", error);
      toast.error(error?.response?.data?.message || "An error occurred while fetching the score.");
    } finally {
      setLoading(false);
    }
  };

  const renderResult = () => {
    if (!result) return null;
    console.log(result, 'this is it')
    // Determine the color based on a generic success/score field if available
    // CIBIL scores range from 300-900.
    // If the API returns a structured score, we'll try to extract it. Otherwise fallback.
    const getScoreData = () => {
      let extractedScore = null;
      let statusText = "Score Details";

      if (result.score) extractedScore = result.score;
      else if (result.data && result.data.score) extractedScore = result.data.score;
      else if (result.data && result.data.cCRResponse && result.data.cCRResponse.score) extractedScore = result.data.cCRResponse.score;

      // Extract error if present
      let isError = false;
      let errorMsg = "";

      if (result.data?.cCRResponse?.cIRReportDataLst?.[0]?.error) {
        isError = true;
        errorMsg = result.data.cCRResponse.cIRReportDataLst[0].error.errorDesc;
      }

      if (isError) {
         return { score: "N/A", color: "#f44336", statusText: errorMsg || "Credit Report Not Found" };
      }

      if (extractedScore) {
        let color = "#4caf50";
        if (extractedScore >= 750) {
          color = "#4caf50"; // Green for Excellent
          statusText = "Excellent";
        } else if (extractedScore >= 650) {
          color = "#ff9800"; // Orange for Fair
          statusText = "Good";
        } else {
          color = "#f44336"; // Red for Poor
          statusText = "Needs Improvement";
        }
        return { score: extractedScore, color, statusText };
      }

      return { score: "Received", color: "#0d6efd", statusText: "API Verification Successful" };
    };

    const { score, color, statusText } = getScoreData();

    return (
      <ScoreBox scorecolor={color}>
        <SpeedIcon sx={{ fontSize: 60, color: color, mb: 2 }} />
        <Typography variant="h3" fontWeight="bold" sx={{ color }}>
          {score}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
          {statusText}
        </Typography>
      </ScoreBox>
    );
  };

  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh", pt: 12, pb: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="flex-start">
          {/* Left Panel */}
          <Grid item xs={12} md={6}>
            <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ color: "#1a1a1a", fontSize: { xs: "2rem", md: "2.5rem" } }}>
              Check Free Credit Score & CIBIL Report
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4, fontSize: "1.1rem" }}>
              Compare your credit score across all 4 credit bureaus, including CIBIL. Get your free credit score instantly...
            </Typography>

            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mt: 4, mb: 3 }}>
              Why Check Credit Score here?
            </Typography>

            <Stack spacing={2} sx={{ mb: 5 }}>
              {[
                "Check Credit Score from All 4 Bureaus",
                "Track Credit Score Seamlessly Every Month",
                "Read Credit Report in Multiple Languages"
              ].map((text, idx) => (
                <Box key={idx} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box sx={{
                    bgcolor: "#e8f5e9",
                    borderRadius: "50%",
                    display: "flex",
                    p: 0.5
                  }}>
                    <CheckCircleIcon sx={{ color: "#4caf50", fontSize: 20 }} />
                  </Box>
                  <Typography variant="body1" fontWeight={500} sx={{
                    bgcolor: "#e4ecfc",
                    px: 2,
                    py: 1,
                    borderRadius: "20px",
                    color: "#1a1a1a",
                    border: "1px solid #d0deff"
                  }}>
                    {text}
                  </Typography>
                </Box>
              ))}
            </Stack>

            {/* Stats card mock */}
            <Card variant="outlined" sx={{ borderRadius: 3, borderColor: "#e0e0e0", mt: 4 }}>
              <CardContent>
                <Grid container spacing={2} textAlign="center">
                  <Grid item xs={4}>
                    <Typography variant="h6" fontWeight="bold" color="primary">4.5/5</Typography>
                    <Typography variant="body2" color="text.secondary">Reviews</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h6" fontWeight="bold">5.7Cr+</Typography>
                    <Typography variant="body2" color="text.secondary">Satisfied Customers</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h6" fontWeight="bold">800+</Typography>
                    <Typography variant="body2" color="text.secondary">Cities</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Panel - Form */}
          <Grid item xs={12} md={6}>
            <Card elevation={4} sx={{ borderRadius: 4, p: { xs: 2, md: 4 } }}>
              <CardContent>
                {result ? (
                  <Box textAlign="center">
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                      Your Credit Report Card
                    </Typography>
                    {renderResult()}
                    <Stack direction={{ xs: "column", sm: "row"}} spacing={2} justifyContent="center" sx={{ mt: 4 }}>
                      <ModernButton 
                        onClick={handleDownload}
                        sx={{ borderRadius: "8px" }}
                      >
                        Download Report (.json)
                      </ModernButton>
                      <Button
                        variant="outlined"
                        onClick={() => setResult(null)}
                        sx={{ textTransform: "none", borderRadius: "8px", padding: "12px 24px", fontWeight: 600, fontSize: "1rem", borderColor: "#0d6efd", color: "#0d6efd", borderWidth: "2px", "&:hover": { borderWidth: "2px" } }}
                      >
                        Check Another Score
                      </Button>
                    </Stack>
                  </Box>
                ) : (
                  <>
                    <Box sx={{ bgcolor: "#f1f6ff", p: 2, borderRadius: 2, mb: 4 }}>
                      <Typography variant="h6" fontWeight="bold" color="#0d6efd" align="center">
                        Let's Get Started
                      </Typography>
                    </Box>

                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ errors, touched, values, handleChange, handleBlur }) => (
                        <Form>
                          <Stack spacing={3}>
                            <TextField
                              fullWidth
                              label="Name (As per PAN)"
                              name="name"
                              value={values.name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.name && Boolean(errors.name)}
                              helperText={touched.name && errors.name}
                              variant="outlined"
                            />

                            <TextField
                              fullWidth
                              label="Mobile Number"
                              name="mobile"
                              value={values.mobile}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.mobile && Boolean(errors.mobile)}
                              helperText={touched.mobile && errors.mobile}
                              variant="outlined"
                              inputProps={{ maxLength: 10 }}
                            />

                            <TextField
                              fullWidth
                              label="PAN Number"
                              name="document_id"
                              value={values.document_id}
                              onChange={(e) => {
                                e.target.value = e.target.value.toUpperCase();
                                handleChange(e);
                              }}
                              onBlur={handleBlur}
                              error={touched.document_id && Boolean(errors.document_id)}
                              helperText={touched.document_id && errors.document_id}
                              variant="outlined"
                              inputProps={{ style: { textTransform: "uppercase" }, maxLength: 10 }}
                            />

                            <Typography variant="caption" color="text.secondary" align="justify">
                              I have read and agree to Credit Score Terms of Use and hereby appoint F2 Fintech as my authorised representative to receive my credit information.
                            </Typography>

                            <ModernButton
                              type="submit"
                              fullWidth
                              disabled={loading}
                              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                            >
                              {loading ? "Fetching Score..." : "Get Free Credit Score →"}
                            </ModernButton>
                          </Stack>
                        </Form>
                      )}
                    </Formik>

                    <Box sx={{ mt: 4, textAlign: "center" }}>
                      <Typography variant="caption" color="text.secondary" display="block">
                        Powered by 4 Credit Bureaus
                      </Typography>
                      <Box sx={{ mt: 1, display: "flex", justifyContent: "center", gap: 2 }}>
                        {/* Placeholder text instead of logos if no logos present */}
                        <Typography variant="caption" fontWeight="bold" color="#666">CIBIL</Typography>
                        <Divider orientation="vertical" flexItem />
                        <Typography variant="caption" fontWeight="bold" color="#666">Experian</Typography>
                        <Divider orientation="vertical" flexItem />
                        <Typography variant="caption" fontWeight="bold" color="#666">Equifax</Typography>
                      </Box>
                    </Box>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CibilScore;
