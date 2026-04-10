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
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import RefreshIcon from "@mui/icons-material/Refresh";
import { toast } from "react-toastify";
import { Utility } from "../utility";
import CreditReportDisplay from "./CreditReportDisplay";
import { generateCreditReportPDF } from "./CreditReportPDF";

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

const CibilScore = () => {
  const [loading, setLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleDownloadPDF = async () => {
    if (!result) return;
    try {
      setPdfLoading(true);
      await generateCreditReportPDF(result);
      toast.success("Credit Health Report PDF downloaded successfully!");
    } catch (err) {
      console.error("PDF generation error:", err);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setPdfLoading(false);
    }
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

  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh", pt: 12, pb: 8 }}>
      <Container maxWidth={result ? "md" : "lg"}>
        {result ? (
          /* ─── Report View ─── */
          <Box>
            {/* Action buttons */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
              sx={{ mb: 4 }}
            >
              <ModernButton
                onClick={handleDownloadPDF}
                disabled={pdfLoading}
                startIcon={
                  pdfLoading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <PictureAsPdfIcon />
                  )
                }
                sx={{ borderRadius: "10px", px: 4 }}
              >
                {pdfLoading ? "Generating PDF..." : "Download PDF Report"}
              </ModernButton>
              <Button
                variant="outlined"
                onClick={() => setResult(null)}
                startIcon={<RefreshIcon />}
                sx={{
                  textTransform: "none",
                  borderRadius: "10px",
                  padding: "12px 24px",
                  fontWeight: 600,
                  fontSize: "1rem",
                  borderColor: "#0d6efd",
                  color: "#0d6efd",
                  borderWidth: "2px",
                  "&:hover": { borderWidth: "2px", bgcolor: "rgba(13, 110, 253, 0.04)" },
                }}
              >
                Check Another Score
              </Button>
            </Stack>

            {/* Full credit report display */}
            <CreditReportDisplay reportData={result} />
          </Box>
        ) : (
          /* ─── Input Form View ─── */
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
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default CibilScore;
