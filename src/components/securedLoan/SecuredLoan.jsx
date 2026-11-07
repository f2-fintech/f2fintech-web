import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  MenuItem,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  InputAdornment,
  Chip,
  Divider,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../apis";

const STEPS = [
  "Personal Information",
  "Employment & Income",
  "Loan & Property Details",
  "Document Upload",
];

const RESIDENTIAL_STATUS_OPTIONS = ["Resident Indian", "NRI", "PIO"];
const APPLICANT_CATEGORY_OPTIONS = [
  "SALARIED",
  "SELF EMPLOYED PROFESSIONAL",
  "SELF EMPLOYED NON PROFESSIONAL",
];
const APPLICANT_TYPE_OPTIONS = ["individual", "Corporate"];
const LOAN_TYPE_OPTIONS = ["New Loan", "Balance Transfer", "Top-Up"];
const LOAN_PURPOSE_OPTIONS = [
  "HOME PURCHASE",
  "CONSTRUCTION",
  "BUSINESS NEEDS",
  "PLOT PURCHASE",
  "RENOVATION",
  "OTHERS",
];
const PROPERTY_TYPE_OPTIONS = ["RESIDENTIAL", "COMMERCIAL", "INDUSTRIAL", "PLOT"];
const LOAN_TENURE_OPTIONS = ["5", "10", "15", "20", "25", "30"];

const INITIAL_STATE = {
  // Step 1
  firstName: "",
  middleName: "",
  lastName: "",
  mobileNo: "",
  emailId: "",
  aadhaarNo: "",
  panNo: "",
  residentialStatus: "Resident Indian",
  // Step 2
  applicantCategory: "SALARIED",
  applicantType: "individual",
  companyName: "",
  grossSalary: "",
  // Step 3
  expectedLoanAmount: "",
  loanTenure: "15",
  loanType: "New Loan",
  loanPurpose: "HOME PURCHASE",
  typeOfProperty: "RESIDENTIAL",
  propertyIdentified: "TRUE",
  projectPropertyName: "",
  zipCode: "",
  city: "",
};

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#204ed8" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#204ed8", borderWidth: 2 },
  },
};

const SecuredLoan = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [documentFile, setDocumentFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setDocumentFile(e.target.files[0]);
    }
  };

  const handleNext = () => {
    if (!validateStep()) return;
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const validateStep = () => {
    if (activeStep === 0) {
      if (!formData.firstName) { toast.error("First Name is required"); return false; }
      if (!formData.lastName) { toast.error("Last Name is required"); return false; }
      if (!formData.mobileNo || !/^[0-9]{10}$/.test(formData.mobileNo)) {
        toast.error("Valid 10-digit Mobile Number is required"); return false;
      }
    }
    if (activeStep === 2) {
      if (!formData.expectedLoanAmount) { toast.error("Loan Amount is required"); return false; }
      if (!formData.zipCode || !/^[0-9]{6}$/.test(formData.zipCode)) {
        toast.error("Valid 6-digit ZIP code is required"); return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formPayload = new FormData();
      Object.keys(formData).forEach((key) => formPayload.append(key, formData[key]));
      if (documentFile) formPayload.append("document", documentFile);

      const response = await API.SecuredLoanAPI.submitLead(formPayload);
      if (response.data.status === "Success") {
        toast.success("Application submitted successfully! Our team will contact you shortly.");
        setFormData(INITIAL_STATE);
        setDocumentFile(null);
        setActiveStep(0);
      } else {
        toast.error("Failed to submit application. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#1e293b", mb: 1 }}>
          Basic Details
        </Typography>
        <Divider sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField fullWidth label="First Name *" name="firstName" value={formData.firstName} onChange={handleChange} variant="outlined" sx={inputStyle} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField fullWidth label="Middle Name" name="middleName" value={formData.middleName} onChange={handleChange} variant="outlined" sx={inputStyle} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField fullWidth label="Last Name *" name="lastName" value={formData.lastName} onChange={handleChange} variant="outlined" sx={inputStyle} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Mobile Number *" name="mobileNo" value={formData.mobileNo} onChange={handleChange} variant="outlined" sx={inputStyle} inputProps={{ maxLength: 10 }} InputProps={{ startAdornment: <InputAdornment position="start">+91</InputAdornment> }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Email Address" name="emailId" type="email" value={formData.emailId} onChange={handleChange} variant="outlined" sx={inputStyle} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#1e293b", mb: 1, mt: 1 }}>
          KYC Details
        </Typography>
        <Divider sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField fullWidth label="Aadhaar Number" name="aadhaarNo" value={formData.aadhaarNo} onChange={handleChange} variant="outlined" sx={inputStyle} inputProps={{ maxLength: 12 }} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField fullWidth label="PAN Number" name="panNo" value={formData.panNo} onChange={handleChange} variant="outlined" sx={inputStyle} inputProps={{ maxLength: 10, style: { textTransform: "uppercase" } }} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField select fullWidth label="Residential Status" name="residentialStatus" value={formData.residentialStatus} onChange={handleChange} variant="outlined" sx={inputStyle}>
          {RESIDENTIAL_STATUS_OPTIONS.map((o) => <MenuItem key={o} value={o}>{o}</MenuItem>)}
        </TextField>
      </Grid>
    </Grid>
  );

  const renderStep2 = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#1e293b", mb: 1 }}>
          Employment Details
        </Typography>
        <Divider sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField select fullWidth label="Applicant Category" name="applicantCategory" value={formData.applicantCategory} onChange={handleChange} variant="outlined" sx={inputStyle}>
          {APPLICANT_CATEGORY_OPTIONS.map((o) => <MenuItem key={o} value={o}>{o}</MenuItem>)}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField select fullWidth label="Applicant Type" name="applicantType" value={formData.applicantType} onChange={handleChange} variant="outlined" sx={inputStyle}>
          {APPLICANT_TYPE_OPTIONS.map((o) => <MenuItem key={o} value={o}>{o}</MenuItem>)}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Company / Employer Name" name="companyName" value={formData.companyName} onChange={handleChange} variant="outlined" sx={inputStyle} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Gross Monthly Salary / Income" name="grossSalary" type="number" value={formData.grossSalary} onChange={handleChange} variant="outlined" sx={inputStyle} InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }} />
      </Grid>
    </Grid>
  );

  const renderStep3 = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#1e293b", mb: 1 }}>
          Loan Requirements
        </Typography>
        <Divider sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Expected Loan Amount *" name="expectedLoanAmount" type="number" value={formData.expectedLoanAmount} onChange={handleChange} variant="outlined" sx={inputStyle} InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField select fullWidth label="Loan Tenure (Years)" name="loanTenure" value={formData.loanTenure} onChange={handleChange} variant="outlined" sx={inputStyle}>
          {LOAN_TENURE_OPTIONS.map((o) => <MenuItem key={o} value={o}>{o} Years</MenuItem>)}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField select fullWidth label="Loan Type" name="loanType" value={formData.loanType} onChange={handleChange} variant="outlined" sx={inputStyle}>
          {LOAN_TYPE_OPTIONS.map((o) => <MenuItem key={o} value={o}>{o}</MenuItem>)}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField select fullWidth label="Loan Purpose" name="loanPurpose" value={formData.loanPurpose} onChange={handleChange} variant="outlined" sx={inputStyle}>
          {LOAN_PURPOSE_OPTIONS.map((o) => <MenuItem key={o} value={o}>{o}</MenuItem>)}
        </TextField>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#1e293b", mb: 1, mt: 1 }}>
          Property Details
        </Typography>
        <Divider sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField select fullWidth label="Type of Property" name="typeOfProperty" value={formData.typeOfProperty} onChange={handleChange} variant="outlined" sx={inputStyle}>
          {PROPERTY_TYPE_OPTIONS.map((o) => <MenuItem key={o} value={o}>{o}</MenuItem>)}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField select fullWidth label="Property Identified?" name="propertyIdentified" value={formData.propertyIdentified} onChange={handleChange} variant="outlined" sx={inputStyle}>
          <MenuItem value="TRUE">Yes</MenuItem>
          <MenuItem value="FALSE">No</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Project / Property Name" name="projectPropertyName" value={formData.projectPropertyName} onChange={handleChange} variant="outlined" sx={inputStyle} />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField fullWidth label="City" name="city" value={formData.city} onChange={handleChange} variant="outlined" sx={inputStyle} />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField fullWidth label="PIN Code *" name="zipCode" value={formData.zipCode} onChange={handleChange} variant="outlined" sx={inputStyle} inputProps={{ maxLength: 6 }} />
      </Grid>
    </Grid>
  );

  const renderStep4 = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box sx={{
          border: "2px dashed #cbd5e1",
          borderRadius: "16px",
          p: 5,
          textAlign: "center",
          backgroundColor: "#f8faff",
          transition: "all 0.2s ease",
          "&:hover": { borderColor: "#204ed8", backgroundColor: "#eff4ff" },
        }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#1e293b", mb: 1 }}>
            📄 Upload Aadhaar Document
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Accepted formats: PDF, JPG, PNG (max 5MB)
          </Typography>
          <input
            accept="application/pdf,image/jpeg,image/png,image/jpg"
            style={{ display: "none" }}
            id="document-upload"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="document-upload">
            <Button variant="outlined" component="span" sx={{ borderRadius: "10px", px: 4, py: 1.2, borderColor: "#204ed8", color: "#204ed8", fontWeight: 600, "&:hover": { backgroundColor: "#eff4ff" } }}>
              Choose File
            </Button>
          </label>
          {documentFile && (
            <Box sx={{ mt: 2 }}>
              <Chip
                label={`✓ ${documentFile.name}`}
                color="success"
                onDelete={() => setDocumentFile(null)}
                sx={{ maxWidth: "100%", fontSize: "0.85rem" }}
              />
            </Box>
          )}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={0} sx={{ p: 3, backgroundColor: "#fffbf0", border: "1px solid #fcd34d", borderRadius: "12px" }}>
          <Typography variant="body2" sx={{ fontWeight: 600, color: "#92400e", mb: 1 }}>
            ⚠️ Declaration
          </Typography>
          <Typography variant="body2" color="text.secondary">
            I/We hereby authorize F2FINTECH PRIVATE LIMITED and Sammaan Capital to retrieve, use, and store my/our information for the purpose of processing this loan application. The details provided above are true and accurate to the best of my/our knowledge.
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );

  const getStepContent = (step) => {
    switch (step) {
      case 0: return renderStep1();
      case 1: return renderStep2();
      case 2: return renderStep3();
      case 3: return renderStep4();
      default: return null;
    }
  };

  return (
    <Box sx={{ py: 6, backgroundColor: "#f0f4ff", minHeight: "100vh" }}>
      <ToastContainer position="top-right" />
      <Container maxWidth="md">
        {/* Sammaan Capital Partnership Banner */}
        <Paper
          elevation={0}
          sx={{
            mb: 4,
            borderRadius: 3,
            overflow: "hidden",
            border: "1px solid #e2e8f0",
            background: "linear-gradient(135deg, #f8f9ff 0%, #eef2ff 100%)",
            boxShadow: "0 4px 20px rgba(12,29,74,0.08)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: { xs: 3, md: 5 }, py: 2.5, flexWrap: "wrap", gap: 2 }}>

            {/* F2Fintech logo — same as navbar */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <img
                src="/f2Fintechlogo-old.webp"
                alt="F2 Fintech"
                style={{ height: 38, objectFit: "contain" }}
              />
              <Box>
                <Typography sx={{ fontWeight: 700, color: "#0f172a", fontSize: "0.9rem", lineHeight: 1.2 }}>F2 Fintech</Typography>
                <Typography sx={{ color: "#94a3b8", fontSize: "0.68rem" }}>Lending Partner</Typography>
              </Box>
            </Box>

            {/* Center connector */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1, justifyContent: "center" }}>
              <Box sx={{ height: "1px", flex: 1, maxWidth: 50, background: "linear-gradient(to right, transparent, #cbd5e1)" }} />
              <Chip
                label="✕  Powered by"
                size="small"
                sx={{ background: "rgba(12,29,74,0.06)", color: "#475569", fontSize: "0.68rem", fontWeight: 600, border: "1px solid #e2e8f0" }}
              />
              <Box sx={{ height: "1px", flex: 1, maxWidth: 50, background: "linear-gradient(to left, transparent, #cbd5e1)" }} />
            </Box>

            {/* Sammaan Capital actual logo */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <img
                src="/sammaan_capital_logo.png"
                alt="Sammaan Capital"
                style={{ height: 38, objectFit: "contain" }}
              />
              <Box>
                <Typography sx={{ fontWeight: 700, color: "#0f172a", fontSize: "0.9rem", lineHeight: 1.2 }}>Sammaan Capital</Typography>
                <Typography sx={{ color: "#94a3b8", fontSize: "0.68rem" }}>Home Loan Provider</Typography>
              </Box>
            </Box>
          </Box>

          {/* Bottom tag line bar */}
          <Box sx={{ px: { xs: 3, md: 5 }, py: 1.2, background: "#0c1d4a", display: "flex", alignItems: "center", justifyContent: "center", gap: { xs: 2, md: 4 }, flexWrap: "wrap" }}>
            {["🏠 Home Loans", "💰 Competitive Rates", "⚡ Quick Approvals", "🔒 Secure Process"].map((item) => (
              <Typography key={item} sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.7rem", fontWeight: 500 }}>
                {item}
              </Typography>
            ))}
          </Box>
        </Paper>

        {/* Page Title */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 800, color: "#0f172a", mb: 1 }}>
            Secured Loan Application
          </Typography>
          <Typography variant="body1" sx={{ color: "#64748b", maxWidth: 500, mx: "auto" }}>
            Fill out the form below and we'll submit your application directly to Sammaan Capital for processing.
          </Typography>
        </Box>


        <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, border: "1px solid #e2e8f0", boxShadow: "0 4px 30px rgba(0,0,0,0.06)" }}>
          {/* Stepper */}
          <Stepper activeStep={activeStep} sx={{ mb: 5 }}>
            {STEPS.map((label) => (
              <Step key={label}>
                <StepLabel
                  sx={{
                    "& .MuiStepLabel-label": { fontWeight: 600, fontSize: "0.8rem" },
                    "& .MuiStepIcon-root.Mui-active": { color: "#204ed8" },
                    "& .MuiStepIcon-root.Mui-completed": { color: "#204ed8" },
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Step content */}
          <form onSubmit={activeStep === STEPS.length - 1 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
            {getStepContent(activeStep)}

            {/* Navigation buttons */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 5, pt: 3, borderTop: "1px solid #e2e8f0" }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
                sx={{ px: 4, py: 1.3, borderRadius: "10px", fontWeight: 600, textTransform: "none", borderColor: "#cbd5e1", color: "#475569", "&:hover": { borderColor: "#204ed8", color: "#204ed8" } }}
              >
                ← Back
              </Button>

              <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  Step {activeStep + 1} of {STEPS.length}
                </Typography>
                {activeStep < STEPS.length - 1 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ px: 5, py: 1.3, borderRadius: "10px", fontWeight: 700, textTransform: "none", backgroundColor: "#204ed8", boxShadow: "0 4px 15px rgba(32,78,216,0.35)", "&:hover": { backgroundColor: "#1e40af", boxShadow: "0 6px 20px rgba(32,78,216,0.4)" } }}
                  >
                    Continue →
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{ px: 5, py: 1.3, borderRadius: "10px", fontWeight: 700, textTransform: "none", backgroundColor: "#16a34a", boxShadow: "0 4px 15px rgba(22,163,74,0.35)", "&:hover": { backgroundColor: "#15803d" } }}
                  >
                    {loading ? <CircularProgress size={22} color="inherit" /> : "✓ Submit Application"}
                  </Button>
                )}
              </Box>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default SecuredLoan;
