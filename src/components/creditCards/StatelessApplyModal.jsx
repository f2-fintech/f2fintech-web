import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Card,
  CardContent,
  Stack,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import LockIcon from "@mui/icons-material/Lock";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { toast } from "react-toastify";
import { applyStatelessBRE } from "../../apis/CreditCardsAPI";

function getCustomerInfo() {
  try {
    const item = localStorage.getItem("customerInfo");
    return item ? JSON.parse(item) : null;
  } catch (e) {
    return null;
  }
}

export default function StatelessApplyModal({ open, onClose }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const currentUser = getCustomerInfo();

  const [step, setStep] = useState(1); // 1: Form, 2: Offers Results
  const [loading, setLoading] = useState(false);
  const [offers, setOffers] = useState([]);
  const [inEligibleOffers, setInEligibleOffers] = useState([]);

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    dob: "1998-05-15",
    loan_amount_required: "100000",
    employmentStatus: "salaried",
    inhandIncome: "65000",
    salary_recieved_in: "bank",
    company_name: "",
    pincode: "",
    office_pincode: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      setFormData((prev) => ({
        ...prev,
        fullName: currentUser?.name || prev.fullName || "",
        mobile: currentUser?.mobile || prev.mobile || "",
        email: currentUser?.email || prev.email || "",
        pincode: currentUser?.pincode || prev.pincode || "",
        office_pincode: currentUser?.pincode || prev.office_pincode || "",
      }));
      setErrors({});
      setLoading(false);
      setStep(1);
    }
  }, [open, currentUser]);

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile.trim())) {
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
    }
    if (!formData.loan_amount_required || Number(formData.loan_amount_required) < 5000) {
      newErrors.loan_amount_required = "Minimum amount is ₹5,000";
    }
    if (!formData.inhandIncome || Number(formData.inhandIncome) < 10000) {
      newErrors.inhandIncome = "Minimum monthly income is ₹10,000";
    }
    if (!formData.company_name.trim()) {
      newErrors.company_name = "Company / Employer name is required";
    }
    if (!formData.pincode || !/^\d{6}$/.test(formData.pincode.trim())) {
      newErrors.pincode = "Enter a valid 6-digit residence pincode";
    }
    if (!formData.office_pincode || !/^\d{6}$/.test(formData.office_pincode.trim())) {
      newErrors.office_pincode = "Enter a valid 6-digit office pincode";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!validate()) {
      toast.error("Please fill in all mandatory fields correctly.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        full_name: formData.fullName.trim(),
        mobile: formData.mobile.trim(),
        email: formData.email.trim(),
        dob: formData.dob,
        loan_amount_required: Number(formData.loan_amount_required),
        employmentStatus: formData.employmentStatus,
        inhandIncome: Number(formData.inhandIncome),
        salary_recieved_in: formData.salary_recieved_in,
        company_name: formData.company_name.trim(),
        pincode: formData.pincode.trim(),
        office_pincode: formData.office_pincode.trim(),
        fetch_credit_consent: true,
        know_your_credit_score: true,
        loan_tenure: 12,
      };

      const result = await applyStatelessBRE(payload);
      if (result && result.offers && result.offers.length > 0) {
        setOffers(result.offers);
        setInEligibleOffers(result.inEligibleOffers || []);
        setStep(2);
        toast.success(`Found ${result.offers.length} instant pre-approved offers!`);
      } else if (result && result.inEligibleOffers && result.inEligibleOffers.length > 0) {
        setOffers([]);
        setInEligibleOffers(result.inEligibleOffers);
        setStep(2);
        toast.info("No matching lenders found for the provided income and profile criteria.");
      } else {
        toast.warning("No offers currently available. Please adjust your details.");
      }
    } catch (err) {
      console.error("Stateless BRE error:", err);
      toast.error(err.message || "Unable to check eligibility. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: { xs: "16px", sm: "24px" },
          background: isDark ? "#0f172a" : "#ffffff",
          backgroundImage: isDark
            ? "radial-gradient(ellipse at top left, rgba(50, 68, 230, 0.15), transparent 70%)"
            : "radial-gradient(ellipse at top left, rgba(50, 68, 230, 0.05), transparent 70%)",
          boxShadow: isDark
            ? "0 25px 60px rgba(0,0,0,0.7), 0 0 40px rgba(50,68,230,0.15)"
            : "0 25px 60px rgba(50,68,230,0.12), 0 10px 25px rgba(0,0,0,0.05)",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(50,68,230,0.12)"}`,
          overflow: "hidden",
        },
      }}
    >
      {/* Dialog Header */}
      <DialogTitle
        sx={{
          p: { xs: 2, sm: 3 },
          pb: 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: "12px",
              background: "linear-gradient(135deg, #3244e6 0%, #1d2ebd 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              boxShadow: "0 8px 18px rgba(50,68,230,0.3)",
            }}
          >
            <AutoAwesomeIcon fontSize="small" />
          </Box>
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
              <Typography
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 800,
                  fontSize: { xs: "1.1rem", sm: "1.25rem" },
                  color: isDark ? "#fff" : "#0f172a",
                }}
              >
                {step === 1 ? "Instant Pre-Approved Offers" : "Eligible Pre-Approved Offers"}
              </Typography>
              <Chip
                label="Stateless Instant BRE"
                size="small"
                sx={{
                  background: isDark ? "rgba(56, 189, 248, 0.15)" : "rgba(50, 68, 230, 0.1)",
                  color: isDark ? "#38bdf8" : "#3244e6",
                  fontWeight: 700,
                  fontSize: "0.7rem",
                  fontFamily: "'Poppins', sans-serif",
                  border: `1px solid ${isDark ? "rgba(56, 189, 248, 0.3)" : "rgba(50, 68, 230, 0.2)"}`,
                }}
              />
            </Box>
            <Typography
              sx={{
                fontSize: "0.8rem",
                color: isDark ? "#94a3b8" : "#64748b",
                fontFamily: "'Poppins', sans-serif",
                mt: 0.3,
              }}
            >
              {step === 1
                ? "Evaluate pre-approved personal loans & credit cards across top verified lenders with 0 impact on credit score."
                : `Found ${offers.length} pre-approved offer${offers.length === 1 ? "" : "s"} ready for direct application.`}
            </Typography>
          </Box>
        </Box>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: isDark ? "#94a3b8" : "#64748b",
            "&:hover": { background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)" },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      {/* Dialog Body */}
      <DialogContent sx={{ p: { xs: 2, sm: 3.5 } }}>
        {step === 1 ? (
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2.5}>
              {/* Applicant Name */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Full Name (as per PAN)"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  error={!!errors.fullName}
                  helperText={errors.fullName}
                  fullWidth
                  required
                  size="small"
                  inputProps={{ style: { fontFamily: "'Poppins', sans-serif" } }}
                  InputLabelProps={{ style: { fontFamily: "'Poppins', sans-serif" } }}
                />
              </Grid>

              {/* Mobile Number */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Mobile Number"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  error={!!errors.mobile}
                  helperText={errors.mobile}
                  fullWidth
                  required
                  size="small"
                  placeholder="10-digit mobile number"
                  inputProps={{ maxLength: 10, style: { fontFamily: "'Poppins', sans-serif" } }}
                  InputLabelProps={{ style: { fontFamily: "'Poppins', sans-serif" } }}
                />
              </Grid>

              {/* Email Address */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  fullWidth
                  size="small"
                  placeholder="name@example.com"
                  inputProps={{ style: { fontFamily: "'Poppins', sans-serif" } }}
                  InputLabelProps={{ style: { fontFamily: "'Poppins', sans-serif" } }}
                />
              </Grid>

              {/* Date of Birth */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Date of Birth (YYYY-MM-DD)"
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                  error={!!errors.dob}
                  helperText={errors.dob || "Mandatory for Bureau evaluation"}
                  fullWidth
                  required
                  size="small"
                  InputLabelProps={{ shrink: true, style: { fontFamily: "'Poppins', sans-serif" } }}
                  inputProps={{ style: { fontFamily: "'Poppins', sans-serif" } }}
                />
              </Grid>

              {/* Loan / Card Limit Required */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Required Amount (₹)"
                  name="loan_amount_required"
                  type="number"
                  value={formData.loan_amount_required}
                  onChange={handleChange}
                  error={!!errors.loan_amount_required}
                  helperText={errors.loan_amount_required}
                  fullWidth
                  required
                  size="small"
                  placeholder="e.g. 100000"
                  inputProps={{ min: 5000, step: 5000, style: { fontFamily: "'Poppins', sans-serif" } }}
                  InputLabelProps={{ style: { fontFamily: "'Poppins', sans-serif" } }}
                />
              </Grid>

              {/* Monthly In-hand Income */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Monthly In-Hand Income (₹)"
                  name="inhandIncome"
                  type="number"
                  value={formData.inhandIncome}
                  onChange={handleChange}
                  error={!!errors.inhandIncome}
                  helperText={errors.inhandIncome}
                  fullWidth
                  required
                  size="small"
                  placeholder="e.g. 65000"
                  inputProps={{ min: 5000, step: 1000, style: { fontFamily: "'Poppins', sans-serif" } }}
                  InputLabelProps={{ style: { fontFamily: "'Poppins', sans-serif" } }}
                />
              </Grid>

              {/* Employment Status */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel sx={{ fontFamily: "'Poppins', sans-serif" }}>Employment Status *</InputLabel>
                  <Select
                    label="Employment Status *"
                    name="employmentStatus"
                    value={formData.employmentStatus}
                    onChange={handleChange}
                    sx={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    <MenuItem value="salaried" sx={{ fontFamily: "'Poppins', sans-serif" }}>Salaried Employee</MenuItem>
                    <MenuItem value="self_employed" sx={{ fontFamily: "'Poppins', sans-serif" }}>Self Employed / Business</MenuItem>
                    <MenuItem value="student" sx={{ fontFamily: "'Poppins', sans-serif" }}>Student / Freelancer</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Salary Mode */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel sx={{ fontFamily: "'Poppins', sans-serif" }}>Salary Received In *</InputLabel>
                  <Select
                    label="Salary Received In *"
                    name="salary_recieved_in"
                    value={formData.salary_recieved_in}
                    onChange={handleChange}
                    sx={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    <MenuItem value="bank" sx={{ fontFamily: "'Poppins', sans-serif" }}>Direct Bank Transfer (NEFT/IMPS)</MenuItem>
                    <MenuItem value="upi" sx={{ fontFamily: "'Poppins', sans-serif" }}>UPI Transfer</MenuItem>
                    <MenuItem value="cheque" sx={{ fontFamily: "'Poppins', sans-serif" }}>Account Payee Cheque</MenuItem>
                    <MenuItem value="cash" sx={{ fontFamily: "'Poppins', sans-serif" }}>Cash</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Company Name */}
              <Grid item xs={12}>
                <TextField
                  label="Employer / Company / Business Name"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  error={!!errors.company_name}
                  helperText={errors.company_name}
                  fullWidth
                  required
                  size="small"
                  placeholder="e.g. Infosys, TCS, ABC Pvt Ltd, Self-Employed"
                  inputProps={{ style: { fontFamily: "'Poppins', sans-serif" } }}
                  InputLabelProps={{ style: { fontFamily: "'Poppins', sans-serif" } }}
                />
              </Grid>

              {/* Residence Pincode */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Current Residence Pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  error={!!errors.pincode}
                  helperText={errors.pincode}
                  fullWidth
                  required
                  size="small"
                  placeholder="6-digit pincode"
                  inputProps={{ maxLength: 6, style: { fontFamily: "'Poppins', sans-serif" } }}
                  InputLabelProps={{ style: { fontFamily: "'Poppins', sans-serif" } }}
                />
              </Grid>

              {/* Office Pincode */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Office / Work Pincode"
                  name="office_pincode"
                  value={formData.office_pincode}
                  onChange={handleChange}
                  error={!!errors.office_pincode}
                  helperText={errors.office_pincode}
                  fullWidth
                  required
                  size="small"
                  placeholder="6-digit pincode"
                  inputProps={{ maxLength: 6, style: { fontFamily: "'Poppins', sans-serif" } }}
                  InputLabelProps={{ style: { fontFamily: "'Poppins', sans-serif" } }}
                />
              </Grid>
            </Grid>

            {/* Privacy and Trust Callout */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.2,
                mt: 3,
                p: 1.5,
                borderRadius: "12px",
                background: isDark ? "rgba(255,255,255,0.03)" : "#f8fafc",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "#f1f5f9"}`,
              }}
            >
              <LockIcon sx={{ fontSize: "1.1rem", color: "#10b981" }} />
              <Typography
                sx={{
                  fontSize: "0.78rem",
                  color: isDark ? "#cbd5e1" : "#475569",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                100% Secure & Confidential. Direct bank-grade Stateless BRE verification with zero impact on your CIBIL score.
              </Typography>
            </Box>
          </Box>
        ) : (
          /* Step 2: Offers Screen */
          <Box>
            {offers.length === 0 ? (
              <Box sx={{ p: 4, textAlign: "center" }}>
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    color: isDark ? "#fff" : "#1e293b",
                    mb: 1,
                  }}
                >
                  No Matching Offers Found
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "0.88rem",
                    color: isDark ? "#94a3b8" : "#64748b",
                    mb: 3,
                  }}
                >
                  We couldn't match lenders for the specified pincode or income bracket right now.
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => setStep(1)}
                  startIcon={<ArrowBackIcon />}
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    textTransform: "none",
                    borderRadius: "12px",
                  }}
                >
                  Modify Criteria
                </Button>
              </Box>
            ) : (
              <Grid container spacing={2.5}>
                {offers.map((offer, index) => {
                  const lenderName = offer.lender_name || "Partner Lender";
                  const approvalText = offer.approval_text || "Pre-Approved";
                  const maxLoan = offer.loan_offered_upto || offer.max_loan_allowed || offer.loan_amount_applied;
                  const minLoan = offer.min_loan_allowed || 5000;
                  const minTenure = offer.minimum_loan_tenure || 12;
                  const maxTenure = offer.maximum_loan_tenure || 60;
                  const processingFee = offer.processingFees || offer.processing_fees || "Nil";
                  const redirectUrl = offer.redirect_url;

                  return (
                    <Grid item xs={12} sm={6} key={offer.offer_id || offer.lender_id || index}>
                      <Card
                        elevation={0}
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          p: 2.2,
                          borderRadius: "18px",
                          background: isDark ? "rgba(30, 41, 59, 0.6)" : "#ffffff",
                          border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
                          boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
                          transition: "all 0.25s ease",
                          "&:hover": {
                            borderColor: "#3244e6",
                            transform: "translateY(-3px)",
                            boxShadow: "0 14px 30px rgba(50, 68, 230, 0.12)",
                          },
                        }}
                      >
                        <Box>
                          {/* Header: Logo and Approval Badge */}
                          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                              {offer.lender_image ? (
                                <Box
                                  component="img"
                                  src={offer.lender_image}
                                  alt={lenderName}
                                  sx={{
                                    width: 48,
                                    height: 34,
                                    objectFit: "contain",
                                    borderRadius: "6px",
                                    p: 0.5,
                                    background: "#fff",
                                  }}
                                />
                              ) : (
                                <Box
                                  sx={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: "10px",
                                    background: "rgba(50, 68, 230, 0.1)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#3244e6",
                                  }}
                                >
                                  <AccountBalanceIcon fontSize="small" />
                                </Box>
                              )}
                              <Box>
                                <Typography
                                  sx={{
                                    fontFamily: "'Poppins', sans-serif",
                                    fontWeight: 700,
                                    fontSize: "0.95rem",
                                    color: isDark ? "#fff" : "#0f172a",
                                    lineHeight: 1.2,
                                  }}
                                >
                                  {lenderName}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontFamily: "'Poppins', sans-serif",
                                    fontSize: "0.75rem",
                                    color: isDark ? "#94a3b8" : "#64748b",
                                  }}
                                >
                                  {offer.lender_category || "Verified Institution"}
                                </Typography>
                              </Box>
                            </Box>
                            <Chip
                              label={approvalText}
                              size="small"
                              sx={{
                                background: "rgba(16, 185, 129, 0.12)",
                                color: "#10b981",
                                fontWeight: 700,
                                fontSize: "0.72rem",
                                fontFamily: "'Poppins', sans-serif",
                                border: "1px solid rgba(16, 185, 129, 0.25)",
                              }}
                            />
                          </Box>

                          <Divider sx={{ my: 1.5, borderColor: isDark ? "rgba(255,255,255,0.06)" : "#f1f5f9" }} />

                          {/* Key Terms */}
                          <Grid container spacing={1.5} sx={{ mb: 1.5 }}>
                            <Grid item xs={6}>
                              <Typography sx={{ fontSize: "0.72rem", color: isDark ? "#94a3b8" : "#64748b", fontFamily: "'Poppins', sans-serif" }}>
                                Offered Up To
                              </Typography>
                              <Typography sx={{ fontWeight: 800, fontSize: "1.05rem", color: isDark ? "#38bdf8" : "#3244e6", fontFamily: "'Poppins', sans-serif" }}>
                                ₹{Number(maxLoan).toLocaleString("en-IN")}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography sx={{ fontSize: "0.72rem", color: isDark ? "#94a3b8" : "#64748b", fontFamily: "'Poppins', sans-serif" }}>
                                Tenure Range
                              </Typography>
                              <Typography sx={{ fontWeight: 700, fontSize: "0.88rem", color: isDark ? "#fff" : "#1e293b", fontFamily: "'Poppins', sans-serif" }}>
                                {minTenure} - {maxTenure} Months
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography sx={{ fontSize: "0.72rem", color: isDark ? "#94a3b8" : "#64748b", fontFamily: "'Poppins', sans-serif" }}>
                                Processing Fee
                              </Typography>
                              <Typography sx={{ fontWeight: 600, fontSize: "0.82rem", color: isDark ? "#cbd5e1" : "#475569", fontFamily: "'Poppins', sans-serif" }}>
                                {typeof processingFee === "number" ? `₹${processingFee}` : processingFee}
                              </Typography>
                            </Grid>
                            {offer.monthly_installment && (
                              <Grid item xs={6}>
                                <Typography sx={{ fontSize: "0.72rem", color: isDark ? "#94a3b8" : "#64748b", fontFamily: "'Poppins', sans-serif" }}>
                                  Est. Monthly EMI
                                </Typography>
                                <Typography sx={{ fontWeight: 700, fontSize: "0.88rem", color: "#10b981", fontFamily: "'Poppins', sans-serif" }}>
                                  ₹{Number(offer.monthly_installment).toLocaleString("en-IN")}/mo
                                </Typography>
                              </Grid>
                            )}
                          </Grid>

                          {/* Tags */}
                          {offer.loan_tags && Array.isArray(offer.loan_tags) && offer.loan_tags.length > 0 && (
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8, mb: 2 }}>
                              {offer.loan_tags.map((tag) => (
                                <Chip
                                  key={tag.id || tag.name}
                                  label={tag.name}
                                  size="small"
                                  sx={{
                                    fontSize: "0.68rem",
                                    height: "22px",
                                    background: isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9",
                                    color: isDark ? "#cbd5e1" : "#475569",
                                    fontFamily: "'Poppins', sans-serif",
                                  }}
                                />
                              ))}
                            </Box>
                          )}
                        </Box>

                        {/* Apply CTA Button */}
                        <Button
                          fullWidth
                          variant="contained"
                          disabled={!redirectUrl}
                          endIcon={<OpenInNewIcon fontSize="small" />}
                          onClick={() => {
                            if (redirectUrl) {
                              window.open(redirectUrl, "_blank", "noopener,noreferrer");
                            }
                          }}
                          sx={{
                            background: "linear-gradient(135deg, #3244e6 0%, #1d2ebd 100%)",
                            color: "#fff",
                            fontWeight: 700,
                            textTransform: "none",
                            borderRadius: "12px",
                            py: 1.1,
                            fontFamily: "'Poppins', sans-serif",
                            boxShadow: "0 6px 16px rgba(50, 68, 230, 0.25)",
                            "&:hover": {
                              background: "linear-gradient(135deg, #1d2ebd 0%, #3244e6 100%)",
                            },
                          }}
                        >
                          Apply Directly With {lenderName}
                        </Button>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </Box>
        )}
      </DialogContent>

      {/* Dialog Footer Actions */}
      <DialogActions
        sx={{
          p: { xs: 2, sm: 2.5 },
          px: { xs: 2, sm: 3.5 },
          borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {step === 1 ? (
          <>
            <Button
              onClick={onClose}
              sx={{
                textTransform: "none",
                color: isDark ? "#94a3b8" : "#64748b",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={loading}
              endIcon={loading ? <CircularProgress size={18} color="inherit" /> : <ArrowForwardIcon />}
              sx={{
                background: "linear-gradient(135deg, #3244e6 0%, #1d2ebd 100%)",
                color: "#fff",
                fontWeight: 700,
                textTransform: "none",
                borderRadius: "50px",
                px: 3.8,
                py: 1.1,
                fontFamily: "'Poppins', sans-serif",
                boxShadow: "0 8px 20px rgba(50, 68, 230, 0.3)",
                "&:hover": {
                  background: "linear-gradient(135deg, #1d2ebd 0%, #3244e6 100%)",
                },
              }}
            >
              {loading ? "Evaluating Offers..." : "Check My Pre-Approved Offers"}
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => setStep(1)}
              startIcon={<ArrowBackIcon />}
              sx={{
                textTransform: "none",
                color: isDark ? "#94a3b8" : "#64748b",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
              }}
            >
              Modify Details
            </Button>
            <Button
              onClick={onClose}
              variant="outlined"
              sx={{
                textTransform: "none",
                fontFamily: "'Poppins', sans-serif",
                borderRadius: "50px",
                px: 3,
                borderColor: isDark ? "rgba(255,255,255,0.2)" : "#cbd5e1",
                color: isDark ? "#fff" : "#1e293b",
              }}
            >
              Close
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}

