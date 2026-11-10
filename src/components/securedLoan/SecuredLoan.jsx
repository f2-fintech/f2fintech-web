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
  InputAdornment,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import PercentOutlinedIcon from "@mui/icons-material/PercentOutlined";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import FolderSharedOutlinedIcon from "@mui/icons-material/FolderSharedOutlined";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import API from "../../apis";

const BRAND_BLUE = "#3244e6";
const BRAND_HOVER = "#2434b8";
const TEXT_DARK = "#0F172A";
const TEXT_MUTED = "#64748B";
const BORDER_COLOR = "#E2E8F0";

const STEPS = [
  { label: "Personal Info", desc: "Identity & KYC", icon: PersonOutlineOutlinedIcon },
  { label: "Employment", desc: "Income & Work", icon: WorkOutlineOutlinedIcon },
  { label: "Loan Details", desc: "Property & Amount", icon: AccountBalanceOutlinedIcon },
  { label: "Documents", desc: "Aadhaar Upload", icon: FolderSharedOutlinedIcon },
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
    fontFamily: "'Poppins', sans-serif",
    borderRadius: "14px",
    backgroundColor: "#FFFFFF",
    transition: "all 0.2s ease-in-out",
    "& fieldset": {
      borderColor: "#E2E8F0",
      borderWidth: "1.5px",
    },
    "&:hover fieldset": {
      borderColor: BRAND_BLUE,
    },
    "&.Mui-focused": {
      backgroundColor: "#FFFFFF",
      "& fieldset": {
        borderColor: BRAND_BLUE,
        borderWidth: "2px",
      },
      boxShadow: "0 0 0 4px rgba(50, 68, 230, 0.08)",
    },
  },
  "& .MuiInputLabel-root": {
    fontFamily: "'Poppins', sans-serif",
    fontSize: "0.88rem",
    color: "#64748B",
    "&.Mui-focused": {
      color: BRAND_BLUE,
      fontWeight: 600,
    },
  },
  "& .MuiInputBase-input": {
    fontFamily: "'Poppins', sans-serif",
    fontSize: "0.95rem",
    color: TEXT_DARK,
    fontWeight: 500,
  },
};

const FAQS = [
  {
    q: "What is a Secured Home Loan?",
    a: "A secured loan is backed by residential, commercial, or plot property collateral, which gives you significantly higher loan amounts (up to ₹10 Crore), longer repayment tenures up to 30 years, and much lower interest rates.",
  },
  {
    q: "How fast is the loan approval through F2 Fintech & Sammaan Capital?",
    a: "Thanks to our direct digital partnership with Sammaan Capital, preliminary sanction approval can be issued within 24 to 48 hours after document verification.",
  },
  {
    q: "Can I transfer my existing home loan balance?",
    a: "Yes! Choose 'Balance Transfer' in Step 3. You can transfer your existing high-interest loan to Sammaan Capital at attractive rates and also apply for a top-up loan.",
  },
  {
    q: "Is my personal data and document safe?",
    a: "100% safe and encrypted. We use bank-grade 256-bit encryption. Your details are shared strictly with Sammaan Capital exclusively for processing your verified loan file.",
  },
];

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
    const formEl = document.getElementById("application-form-card");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
    const formEl = document.getElementById("application-form-card");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const validateStep = () => {
    if (activeStep === 0) {
      if (!formData.firstName) {
        toast.error("First Name is required");
        return false;
      }
      if (!formData.lastName) {
        toast.error("Last Name is required");
        return false;
      }
      if (!formData.mobileNo || !/^[0-9]{10}$/.test(formData.mobileNo)) {
        toast.error("Valid 10-digit Mobile Number is required");
        return false;
      }
    }
    if (activeStep === 2) {
      if (!formData.expectedLoanAmount) {
        toast.error("Loan Amount is required");
        return false;
      }
      if (!formData.zipCode || !/^[0-9]{6}$/.test(formData.zipCode)) {
        toast.error("Valid 6-digit PIN code is required");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formPayload = new FormData();
      Object.keys(formData).forEach((key) =>
        formPayload.append(key, formData[key])
      );
      if (documentFile) formPayload.append("document", documentFile);

      const response = await API.SecuredLoanAPI.submitLead(formPayload);
      if (response.data.status === "Success") {
        toast.success(
          "Application submitted successfully! Our team will contact you shortly."
        );
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

  const renderSectionHeader = (title, subtitle) => (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant="h6"
        sx={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 700,
          color: TEXT_DARK,
          fontSize: { xs: "1.05rem", sm: "1.18rem" },
          display: "flex",
          alignItems: "center",
          gap: 1.2,
        }}
      >
        <Box
          sx={{
            width: 5,
            height: 22,
            borderRadius: 3,
            backgroundColor: BRAND_BLUE,
          }}
        />
        {title}
      </Typography>
      {subtitle && (
        <Typography
          variant="body2"
          sx={{
            fontFamily: "'Poppins', sans-serif",
            color: TEXT_MUTED,
            mt: 0.5,
            fontSize: "0.85rem",
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );

  const renderStep1 = () => (
    <Box>
      {renderSectionHeader("Basic Details", "Provide your full legal name and primary contact details")}
      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="First Name *"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            variant="outlined"
            sx={inputStyle}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Middle Name"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            variant="outlined"
            sx={inputStyle}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Last Name *"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            variant="outlined"
            sx={inputStyle}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Mobile Number *"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
            variant="outlined"
            sx={inputStyle}
            inputProps={{ maxLength: 10 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography
                    sx={{
                      color: BRAND_BLUE,
                      fontWeight: 700,
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "0.9rem",
                    }}
                  >
                    +91
                  </Typography>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email Address"
            name="emailId"
            type="email"
            value={formData.emailId}
            onChange={handleChange}
            variant="outlined"
            sx={inputStyle}
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        {renderSectionHeader("KYC Verification", "Government-issued identity details for fast verification")}
        <Grid container spacing={2.5}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Aadhaar Number"
              name="aadhaarNo"
              value={formData.aadhaarNo}
              onChange={handleChange}
              variant="outlined"
              sx={inputStyle}
              inputProps={{ maxLength: 12 }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="PAN Number"
              name="panNo"
              value={formData.panNo}
              onChange={handleChange}
              variant="outlined"
              sx={inputStyle}
              inputProps={{
                maxLength: 10,
                style: { textTransform: "uppercase" },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              select
              fullWidth
              label="Residential Status"
              name="residentialStatus"
              value={formData.residentialStatus}
              onChange={handleChange}
              variant="outlined"
              sx={inputStyle}
            >
              {RESIDENTIAL_STATUS_OPTIONS.map((o) => (
                <MenuItem
                  key={o}
                  value={o}
                  sx={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {o}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );

  const renderStep2 = () => (
    <Box>
      {renderSectionHeader("Employment & Income", "Help us determine your maximum borrowing capacity")}
      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            label="Applicant Category"
            name="applicantCategory"
            value={formData.applicantCategory}
            onChange={handleChange}
            variant="outlined"
            sx={inputStyle}
          >
            {APPLICANT_CATEGORY_OPTIONS.map((o) => (
              <MenuItem
                key={o}
                value={o}
                sx={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {o}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            label="Applicant Type"
            name="applicantType"
            value={formData.applicantType}
            onChange={handleChange}
            variant="outlined"
            sx={inputStyle}
          >
            {APPLICANT_TYPE_OPTIONS.map((o) => (
              <MenuItem
                key={o}
                value={o}
                sx={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {o}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Company / Employer Name"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            variant="outlined"
            sx={inputStyle}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Gross Monthly Salary / Income"
            name="grossSalary"
            type="number"
            value={formData.grossSalary}
            onChange={handleChange}
            variant="outlined"
            sx={inputStyle}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography
                    sx={{
                      color: BRAND_BLUE,
                      fontWeight: 700,
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    ₹
                  </Typography>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );

  const renderStep3 = () => (
    <Box>
      {renderSectionHeader("Loan Requirements", "Desired financing amount and repayment structure")}
      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Expected Loan Amount *"
            name="expectedLoanAmount"
            type="number"
            value={formData.expectedLoanAmount}
            onChange={handleChange}
            variant="outlined"
            sx={inputStyle}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography
                    sx={{
                      color: BRAND_BLUE,
                      fontWeight: 700,
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    ₹
                  </Typography>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            label="Loan Tenure (Years)"
            name="loanTenure"
            value={formData.loanTenure}
            onChange={handleChange}
            variant="outlined"
            sx={inputStyle}
          >
            {LOAN_TENURE_OPTIONS.map((o) => (
              <MenuItem
                key={o}
                value={o}
                sx={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {o} Years
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            label="Loan Type"
            name="loanType"
            value={formData.loanType}
            onChange={handleChange}
            variant="outlined"
            sx={inputStyle}
          >
            {LOAN_TYPE_OPTIONS.map((o) => (
              <MenuItem
                key={o}
                value={o}
                sx={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {o}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            label="Loan Purpose"
            name="loanPurpose"
            value={formData.loanPurpose}
            onChange={handleChange}
            variant="outlined"
            sx={inputStyle}
          >
            {LOAN_PURPOSE_OPTIONS.map((o) => (
              <MenuItem
                key={o}
                value={o}
                sx={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {o}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        {renderSectionHeader("Property Collateral Details", "Information about the property being financed or pledged")}
        <Grid container spacing={2.5}>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Type of Property"
              name="typeOfProperty"
              value={formData.typeOfProperty}
              onChange={handleChange}
              variant="outlined"
              sx={inputStyle}
            >
              {PROPERTY_TYPE_OPTIONS.map((o) => (
                <MenuItem
                  key={o}
                  value={o}
                  sx={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {o}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Property Identified?"
              name="propertyIdentified"
              value={formData.propertyIdentified}
              onChange={handleChange}
              variant="outlined"
              sx={inputStyle}
            >
              <MenuItem
                value="TRUE"
                sx={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Yes
              </MenuItem>
              <MenuItem
                value="FALSE"
                sx={{ fontFamily: "'Poppins', sans-serif" }}
              >
                No
              </MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Project / Property Name"
              name="projectPropertyName"
              value={formData.projectPropertyName}
              onChange={handleChange}
              variant="outlined"
              sx={inputStyle}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              variant="outlined"
              sx={inputStyle}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="PIN Code *"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              variant="outlined"
              sx={inputStyle}
              inputProps={{ maxLength: 6 }}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );

  const renderStep4 = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box
          sx={{
            border: "2px dashed #93C5FD",
            borderRadius: "20px",
            p: { xs: 4, sm: 6 },
            textAlign: "center",
            backgroundColor: "#F8FAFF",
            transition: "all 0.25s ease-in-out",
            "&:hover": {
              borderColor: BRAND_BLUE,
              backgroundColor: "#EFF4FF",
            },
          }}
        >
          <Box
            sx={{
              width: 72,
              height: 72,
              mx: "auto",
              mb: 2,
              borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(50, 68, 230, 0.15), rgba(50, 68, 230, 0.05))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: BRAND_BLUE,
              boxShadow: "0 8px 20px rgba(50, 68, 230, 0.12)",
            }}
          >
            <CloudUploadOutlinedIcon sx={{ fontSize: 36 }} />
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              color: TEXT_DARK,
              mb: 0.5,
            }}
          >
            Upload Aadhaar / KYC Document
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              color: TEXT_MUTED,
              mb: 3,
            }}
          >
            Accepted formats: PDF, JPG, PNG (Max file size: 5MB)
          </Typography>
          <input
            accept="application/pdf,image/jpeg,image/png,image/jpg"
            style={{ display: "none" }}
            id="document-upload"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="document-upload">
            <Button
              variant="contained"
              component="span"
              startIcon={<CloudUploadOutlinedIcon />}
              sx={{
                fontFamily: "'Poppins', sans-serif",
                borderRadius: "14px",
                px: 4.5,
                py: 1.3,
                backgroundColor: BRAND_BLUE,
                color: "#FFFFFF",
                fontWeight: 600,
                textTransform: "none",
                boxShadow: "0 8px 24px rgba(50, 68, 230, 0.3)",
                "&:hover": {
                  backgroundColor: BRAND_HOVER,
                },
              }}
            >
              Choose File
            </Button>
          </label>
          {documentFile && (
            <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
              <Chip
                icon={<CheckCircleRoundedIcon sx={{ color: "#10B981 !important" }} />}
                label={documentFile.name}
                onDelete={() => setDocumentFile(null)}
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.88rem",
                  py: 2.4,
                  px: 1.5,
                  backgroundColor: "#ECFDF5",
                  color: "#065F46",
                  border: "1.5px solid #A7F3D0",
                  borderRadius: "12px",
                  "& .MuiChip-deleteIcon": {
                    color: "#059669",
                    "&:hover": { color: "#047857" },
                  },
                }}
              />
            </Box>
          )}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            backgroundColor: "#FFFBEB",
            border: "1.5px solid #FDE68A",
            borderRadius: "16px",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              color: "#92400E",
              mb: 1,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <SecurityOutlinedIcon sx={{ fontSize: 20 }} /> Declaration & Consent
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              color: "#78350F",
              lineHeight: 1.6,
              fontSize: "0.85rem",
            }}
          >
            I/We hereby authorize F2FINTECH PRIVATE LIMITED and Sammaan Capital
            to retrieve, use, and store my/our information for the purpose of
            processing this loan application. The details provided above are
            true and accurate to the best of my/our knowledge.
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return renderStep1();
      case 1:
        return renderStep2();
      case 2:
        return renderStep3();
      case 3:
        return renderStep4();
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#F8FAFC",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <ToastContainer position="top-right" autoClose={3500} />

      {/* ─────────────────────────────────────────────────────────────
          1. IMMERSIVE HERO SECTION
          ───────────────────────────────────────────────────────────── */}
      <Box
        sx={{
          position: "relative",
          background: "linear-gradient(135deg, #1e4dd8 0%, #163bb0 55%, #0f2878 100%)",
          color: "#FFFFFF",
          pt: { xs: 5, md: 8 },
          pb: { xs: 12, md: 16 },
          overflow: "hidden",
        }}
      >
        {/* Glow circles & grid pattern */}
        <Box
          sx={{
            position: "absolute",
            top: "-150px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "-100px",
            left: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(61, 200, 186, 0.25) 0%, rgba(61, 200, 186, 0) 70%)",
            filter: "blur(70px)",
            pointerEvents: "none",
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              {/* Badge */}
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  px: 2,
                  py: 0.8,
                  borderRadius: "30px",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  mb: 3,
                }}
              >
                <BoltRoundedIcon sx={{ color: "#FBBF24", fontSize: 18 }} />
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    color: "#FFFFFF",
                    letterSpacing: 0.3,
                  }}
                >
                  Official Co-Lending Partner • Sammaan Capital
                </Typography>
              </Box>

              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 800,
                  fontSize: { xs: "2rem", sm: "2.8rem", md: "3.4rem" },
                  lineHeight: { xs: 1.2, md: 1.15 },
                  color: "#FFFFFF",
                  mb: 2.5,
                }}
              >
                Secured Home Loans{" "}
                <Box
                  component="span"
                  sx={{
                    color: "#F8FAFC",
                  }}
                >
                  Made Effortless.
                </Box>
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: { xs: "0.95rem", sm: "1.1rem" },
                  color: "rgba(255, 255, 255, 0.85)",
                  maxWidth: 580,
                  lineHeight: 1.7,
                  mb: 4,
                }}
              >
                Unlock high-value funding up to <strong>₹10 Crore</strong> against your residential,
                commercial, or plot property with fast digital sanctions from Sammaan Capital.
              </Typography>

              {/* Quick highlight chips */}
              <Box
                sx={{
                  display: "flex",
                  gap: { xs: 2, sm: 3 },
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                {[
                  { value: "8.65%*", label: "Rates Starting From" },
                  { value: "Up to 30 Yrs", label: "Flexible Tenure" },
                  { value: "₹10 Cr", label: "Max Loan Amount" },
                  { value: "48 Hrs", label: "Express Sanction" },
                ].map((item, idx) => (
                  <Box key={idx}>
                    <Typography
                      sx={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 800,
                        fontSize: { xs: "1.2rem", sm: "1.45rem" },
                        color: "#F8FAFC",
                        lineHeight: 1.1,
                      }}
                    >
                      {item.value}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "0.75rem",
                        color: "rgba(255, 255, 255, 0.65)",
                        fontWeight: 500,
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>

            {/* Right Side Partner Box */}
            <Grid item xs={12} md={5}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, sm: 4 },
                  borderRadius: "24px",
                  background: "rgba(255, 255, 255, 0.08)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.16)",
                  boxShadow: "0 20px 50px rgba(0, 0, 0, 0.25)",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    color: "rgba(255, 255, 255, 0.7)",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    mb: 2.5,
                    textAlign: "center",
                  }}
                >
                  Direct Digital Processing
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    p: 2.5,
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    borderRadius: "18px",
                    mb: 3,
                  }}
                >
                  <img
                    src="/f2Fintechlogo-old.webp"
                    alt="F2 Fintech"
                    style={{ height: 68, width: "auto", objectFit: "contain" }}
                  />
                  <Box sx={{ height: 38, width: "1px", backgroundColor: "#CBD5E1" }} />
                  <img
                    src="/sammaan_capital_logo.png"
                    alt="Sammaan Capital"
                    style={{ height: 36, width: "auto", objectFit: "contain" }}
                  />
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                  {[
                    "Direct integration with Sammaan Capital credit engine",
                    "Minimal paperwork & seamless digital Aadhaar KYC",
                    "Dedicated loan specialist assigned to your file",
                    "Zero hidden brokerage or surprise advisory charges",
                  ].map((benefit, idx) => (
                    <Box
                      key={idx}
                      sx={{ display: "flex", alignItems: "flex-start", gap: 1.2 }}
                    >
                      <CheckCircleRoundedIcon
                        sx={{ fontSize: 18, color: "#34D399", mt: 0.3, flexShrink: 0 }}
                      />
                      <Typography
                        sx={{
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: "0.86rem",
                          color: "rgba(255, 255, 255, 0.9)",
                          lineHeight: 1.5,
                        }}
                      >
                        {benefit}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ─────────────────────────────────────────────────────────────
          2. FLOATING FORM CARD (NEGATIVE MARGIN OVERLAP)
          ───────────────────────────────────────────────────────────── */}
      <Container
        maxWidth="md"
        id="application-form-card"
        sx={{
          mt: { xs: -8, md: -10 },
          position: "relative",
          zIndex: 2,
          mb: 8,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 5, md: 6 },
            borderRadius: "28px",
            border: `1px solid ${BORDER_COLOR}`,
            backgroundColor: "#FFFFFF",
            boxShadow:
              "0 25px 60px -15px rgba(15, 23, 42, 0.12), 0 10px 20px -5px rgba(50, 68, 230, 0.05)",
          }}
        >
          {/* Header Inside Card */}
          <Box sx={{ textAlign: "center", mb: { xs: 4, sm: 5 } }}>
            <Chip
              label="Instant Application"
              size="small"
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                backgroundColor: "rgba(50, 68, 230, 0.08)",
                color: BRAND_BLUE,
                fontSize: "0.75rem",
                mb: 1.5,
              }}
            />
            <Typography
              variant="h4"
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 800,
                color: TEXT_DARK,
                fontSize: { xs: "1.5rem", sm: "1.9rem" },
                mb: 1,
              }}
            >
              Loan Application Form
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "'Poppins', sans-serif",
                color: TEXT_MUTED,
                maxWidth: 480,
                mx: "auto",
              }}
            >
              Step {activeStep + 1} of {STEPS.length}: {STEPS[activeStep].label}
            </Typography>
          </Box>

          {/* Stepper with custom pill cards */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(4, 1fr)" },
              gap: 1.5,
              mb: 5,
            }}
          >
            {STEPS.map((step, index) => {
              const isPassed = activeStep > index;
              const isCurrent = activeStep === index;
              const StepIcon = step.icon;

              return (
                <Box
                  key={index}
                  onClick={() => {
                    if (isPassed) setActiveStep(index);
                  }}
                  sx={{
                    p: 1.8,
                    borderRadius: "16px",
                    border: isCurrent
                      ? `2px solid ${BRAND_BLUE}`
                      : isPassed
                      ? "1.5px solid #10B981"
                      : `1.5px solid ${BORDER_COLOR}`,
                    backgroundColor: isCurrent
                      ? "rgba(50, 68, 230, 0.04)"
                      : isPassed
                      ? "rgba(16, 185, 129, 0.04)"
                      : "#FAFAFA",
                    cursor: isPassed ? "pointer" : "default",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: 1.2,
                  }}
                >
                  <Box
                    sx={{
                      width: 38,
                      height: 38,
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: isCurrent
                        ? BRAND_BLUE
                        : isPassed
                        ? "#10B981"
                        : "#E2E8F0",
                      color: isCurrent || isPassed ? "#FFFFFF" : "#64748B",
                      flexShrink: 0,
                    }}
                  >
                    {isPassed ? (
                      <CheckCircleRoundedIcon sx={{ fontSize: 20 }} />
                    ) : (
                      <StepIcon sx={{ fontSize: 20 }} />
                    )}
                  </Box>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      sx={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 700,
                        fontSize: "0.8rem",
                        color: isCurrent ? BRAND_BLUE : TEXT_DARK,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        lineHeight: 1.2,
                      }}
                    >
                      {step.label}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "0.68rem",
                        color: TEXT_MUTED,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {step.desc}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>

          {/* Form Content */}
          <form
            onSubmit={
              activeStep === STEPS.length - 1
                ? handleSubmit
                : (e) => {
                    e.preventDefault();
                    handleNext();
                  }
            }
          >
            {getStepContent(activeStep)}

            {/* Navigation Buttons */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 5,
                pt: 3.5,
                borderTop: `1px solid ${BORDER_COLOR}`,
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
                startIcon={<ArrowBackRoundedIcon />}
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  px: 3.5,
                  py: 1.2,
                  borderRadius: "14px",
                  fontWeight: 600,
                  textTransform: "none",
                  borderColor: "#CBD5E1",
                  color: "#475569",
                  "&:hover": {
                    borderColor: BRAND_BLUE,
                    color: BRAND_BLUE,
                    backgroundColor: "rgba(50, 68, 230, 0.04)",
                  },
                  "&.Mui-disabled": {
                    borderColor: "#E2E8F0",
                    color: "#94A3B8",
                  },
                }}
              >
                Back
              </Button>

              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                {activeStep < STEPS.length - 1 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    endIcon={<ArrowForwardRoundedIcon />}
                    sx={{
                      fontFamily: "'Poppins', sans-serif",
                      px: { xs: 4, sm: 5 },
                      py: 1.3,
                      borderRadius: "14px",
                      fontWeight: 700,
                      textTransform: "none",
                      backgroundColor: BRAND_BLUE,
                      boxShadow: "0 8px 24px rgba(50, 68, 230, 0.35)",
                      "&:hover": {
                        backgroundColor: BRAND_HOVER,
                        boxShadow: "0 10px 28px rgba(50, 68, 230, 0.45)",
                      },
                    }}
                  >
                    Continue to Next Step
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    startIcon={!loading && <CheckCircleRoundedIcon />}
                    sx={{
                      fontFamily: "'Poppins', sans-serif",
                      px: { xs: 4, sm: 5 },
                      py: 1.3,
                      borderRadius: "14px",
                      fontWeight: 700,
                      textTransform: "none",
                      backgroundColor: "#10B981",
                      boxShadow: "0 8px 24px rgba(16, 185, 129, 0.35)",
                      "&:hover": {
                        backgroundColor: "#059669",
                      },
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={22} color="inherit" />
                    ) : (
                      "Submit Application"
                    )}
                  </Button>
                )}
              </Box>
            </Box>
          </form>
        </Paper>
      </Container>

      {/* ─────────────────────────────────────────────────────────────
          3. FEATURE CARDS / WHY CHOOSE SAMMAAN & F2
          ───────────────────────────────────────────────────────────── */}
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Typography
            sx={{
              fontFamily: "'Poppins', sans-serif",
              color: BRAND_BLUE,
              fontWeight: 700,
              fontSize: "0.85rem",
              textTransform: "uppercase",
              letterSpacing: 1.5,
              mb: 1,
            }}
          >
            Why Apply With Us
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 800,
              color: TEXT_DARK,
              fontSize: { xs: "1.6rem", sm: "2.1rem" },
            }}
          >
            The Smarter Way to Finance Your Property
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {[
            {
              icon: PercentOutlinedIcon,
              title: "Industry-Leading Rates",
              desc: "Get competitive interest rates starting from 8.65% with flexible floating and fixed options.",
            },
            {
              icon: SpeedOutlinedIcon,
              title: "Express Digital Sanction",
              desc: "Fast-track processing with online document verification and quick credit assessment in 48 hours.",
            },
            {
              icon: HomeWorkOutlinedIcon,
              title: "High Loan-to-Value",
              desc: "Borrow up to 75% - 80% of property market value for residential, commercial, or plot purchase.",
            },
            {
              icon: VerifiedUserOutlinedIcon,
              title: "Transparent & Safe",
              desc: "Zero hidden charges, clear terms, and continuous tracking through dedicated relationship managers.",
            },
          ].map((feature, idx) => {
            const IconComp = feature.icon;
            return (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3.5,
                    height: "100%",
                    borderRadius: "20px",
                    border: `1px solid ${BORDER_COLOR}`,
                    backgroundColor: "#FFFFFF",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      borderColor: BRAND_BLUE,
                      boxShadow: "0 16px 36px rgba(50, 68, 230, 0.1)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: "14px",
                      backgroundColor: "rgba(50, 68, 230, 0.08)",
                      color: BRAND_BLUE,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2.5,
                    }}
                  >
                    <IconComp sx={{ fontSize: 26 }} />
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 700,
                      color: TEXT_DARK,
                      fontSize: "1.05rem",
                      mb: 1,
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'Poppins', sans-serif",
                      color: TEXT_MUTED,
                      fontSize: "0.85rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {feature.desc}
                  </Typography>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* ─────────────────────────────────────────────────────────────
          4. FREQUENTLY ASKED QUESTIONS (FAQ)
          ───────────────────────────────────────────────────────────── */}
      <Container maxWidth="md" sx={{ mb: 10 }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.8,
              color: BRAND_BLUE,
              mb: 1,
            }}
          >
            <HelpOutlineRoundedIcon sx={{ fontSize: 18 }} />
            <Typography
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: "0.85rem",
                textTransform: "uppercase",
                letterSpacing: 1.2,
              }}
            >
              Got Questions?
            </Typography>
          </Box>
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 800,
              color: TEXT_DARK,
              fontSize: { xs: "1.5rem", sm: "2rem" },
            }}
          >
            Frequently Asked Questions
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {FAQS.map((item, index) => (
            <Accordion
              key={index}
              elevation={0}
              sx={{
                borderRadius: "16px !important",
                border: `1px solid ${BORDER_COLOR}`,
                "&:before": { display: "none" },
                overflow: "hidden",
                transition: "all 0.2s ease",
                "&.Mui-expanded": {
                  borderColor: BRAND_BLUE,
                  boxShadow: "0 8px 24px rgba(50, 68, 230, 0.08)",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: BRAND_BLUE }} />}
                sx={{
                  py: 1.2,
                  px: 2.5,
                  "& .MuiAccordionSummary-content": {
                    my: 1,
                  },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    color: TEXT_DARK,
                    fontSize: "0.98rem",
                  }}
                >
                  {item.q}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 2.5, pb: 2.5, pt: 0 }}>
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    color: TEXT_MUTED,
                    fontSize: "0.88rem",
                    lineHeight: 1.7,
                  }}
                >
                  {item.a}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default SecuredLoan;
