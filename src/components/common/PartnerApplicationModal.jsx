import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { useTheme } from "@mui/material/styles";
import { toast } from "react-toastify";
import { DocumentAPI } from "../../apis/DocumentAPI";

export default function PartnerApplicationModal({
  open,
  onClose,
  type = "realtor", // "realtor" | "dsa"
  whatsappNumber = "918860600555",
  onSubmitApi,
}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const isRealtor = type === "realtor";
  const partnerTitle = isRealtor ? "Realtor Partner" : "DSA Partner";
  const waDefaultMsg = isRealtor
    ? "Hi, I want to be a Realtor partner in your company"
    : "Hi, I want to be a DSA in your company";

  const [step, setStep] = useState(1); // 1, 2, 3, "success"
  const [referenceId, setReferenceId] = useState("");

  // Step 1 Form Data
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    experience: "",
    firmName: "",
    gender: "",
  });

  const [formErrors, setFormErrors] = useState({});

  // Step 2 Documents
  const [docs, setDocs] = useState({
    aadhaar: null,
    pan: null,
    bankProof: null,
    photo: null,
    reraGst: null,
  });

  const [docErrors, setDocErrors] = useState({});
  const [uploadedDocUrls, setUploadedDocUrls] = useState({});

  // Step 3 Agreement
  const [agreed, setAgreed] = useState(false);
  const [agreeError, setAgreeError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Ref for the scrollable body — reset to top on every step change
  const bodyRef = useRef(null);

  // Reset state on open/close
  useEffect(() => {
    if (open) {
      setStep(1);
      setFormData({
        name: "",
        phone: "",
        email: "",
        city: "",
        experience: "",
        firmName: "",
        gender: "",
      });
      setFormErrors({});
      setDocs({
        aadhaar: null,
        pan: null,
        bankProof: null,
        photo: null,
        reraGst: null,
      });
      setDocErrors({});
      setUploadedDocUrls({});
      setAgreed(false);
      setAgreeError(false);
      setSubmitting(false);
    }
  }, [open]);

  // Scroll body back to top whenever step changes
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = 0;
    }
  }, [step]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let val = value;
    if (name === "phone") {
      val = val.replace(/\D/g, "").slice(0, 10);
    }
    setFormData((prev) => ({ ...prev, [name]: val }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep1 = () => {
    let errs = {};
    if (!formData.name.trim()) errs.name = "Please enter your full name.";
    if (!/^\d{10}$/.test(formData.phone.trim()))
      errs.phone = "Enter a valid 10-digit mobile number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()))
      errs.email = "Enter a valid email address.";
    if (!formData.city.trim()) errs.city = "Please enter your city.";
    if (!formData.experience) errs.experience = "Please select your experience.";
    if (!formData.gender) errs.gender = "Please select your gender.";

    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFileChange = (key, file) => {
    if (!file) return;
    setDocs((prev) => ({ ...prev, [key]: file }));
    if (docErrors[key]) {
      setDocErrors((prev) => ({ ...prev, [key]: false }));
    }
  };

  const handleClearFile = (key) => {
    setDocs((prev) => ({ ...prev, [key]: null }));
  };

  const validateStep2 = () => {
    let errs = {};
    if (!docs.aadhaar) errs.aadhaar = true;
    if (!docs.pan) errs.pan = true;
    if (!docs.photo) errs.photo = true;

    setDocErrors(errs);
    const missing = [];
    if (errs.aadhaar) missing.push("Aadhaar card");
    if (errs.pan) missing.push("PAN card");
    if (errs.photo) missing.push("Passport-size photo");

    if (missing.length > 0) {
      toast.error(`Please upload mandatory document(s): ${missing.join(", ")}`);
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (!agreed) {
      setAgreeError(true);
      return false;
    }
    setAgreeError(false);
    return true;
  };

  const uploadFileToS3 = async (file, docKey) => {
    if (!file) return null;
    try {
      const fd = new FormData();
      const folderName = `${type}_docs/${docKey}_${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
      fd.append("document", file);
      fd.append("folder", folderName);

      const res = await DocumentAPI.uploadDocument(fd);
      if (res && res.data && res.data.data) {
        return res.data.data;
      } else if (res && res.data && typeof res.data === "string") {
        return res.data;
      }
      return null;
    } catch (err) {
      console.error(`Error uploading ${docKey} to S3:`, err);
      return null;
    }
  };

  const handleNext = async () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      if (validateStep2()) setStep(3);
    } else if (step === 3) {
      if (!validateStep3()) return;
      setSubmitting(true);
      try {
        if (onSubmitApi) {
          // Upload documents to S3
          const [aadhaarUrl, panUrl, bankProofUrl, photoUrl, reraGstUrl] = await Promise.all([
            uploadFileToS3(docs.aadhaar, "aadhaar"),
            uploadFileToS3(docs.pan, "pan"),
            uploadFileToS3(docs.bankProof, "bank_proof"),
            uploadFileToS3(docs.photo, "photo"),
            uploadFileToS3(docs.reraGst, "rera_gst"),
          ]);

          const payload = {
            name: formData.name.trim(),
            mobile: formData.phone.trim(),
            email: formData.email.trim(),
            city: formData.city.trim(),
            experience: formData.experience,
            company_gst: formData.firmName.trim() || null,
            gender: formData.gender || "Other",
            age: 25,
            aadhaar_doc: aadhaarUrl,
            pan_doc: panUrl,
            bank_proof_doc: bankProofUrl,
            photo_doc: photoUrl,
            rera_gst_doc: reraGstUrl,
          };
          await onSubmitApi(payload);
        }
        const prefix = isRealtor ? "F2REALTOR" : "F2DSA";
        const randomId = `${prefix}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
        setReferenceId(randomId);
        toast.success(`🎉 ${partnerTitle} Application Submitted Successfully!`);
        setStep("success");
      } catch (err) {
        console.error("Submission error:", err);
        toast.error("Failed to submit. Please try again.");
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (typeof step === "number" && step > 1) {
      setStep(step - 1);
    }
  };

  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(waDefaultMsg)}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&margin=8&data=${encodeURIComponent(waLink)}`;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: "24px",
          background: isDark ? "#0f1222" : "#ffffff",
          color: isDark ? "#ffffff" : "#0f1222",
          fontFamily: "'Poppins', sans-serif",
          overflow: "hidden",
          boxShadow: isDark
            ? "0 20px 45px -22px rgba(0,0,0,0.8)"
            : "0 20px 45px -22px rgba(29,26,90,0.28)",
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #E7E7F3",
        },
      }}
    >
      {/* Header */}
      <Box sx={{ p: { xs: 2.5, sm: 3.5 }, pb: 1, position: "relative" }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 20,
            right: 20,
            width: 34,
            height: 34,
            borderRadius: "50%",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.15)" : "#E7E7F3"}`,
            background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
            color: isDark ? "rgba(255,255,255,0.7)" : "#585C74",
            "&:hover": {
              background: isDark ? "rgba(50,68,230,0.2)" : "#EEECFE",
              color: "#3244e6",
            },
          }}
        >
          <CloseIcon sx={{ fontSize: 18 }} />
        </IconButton>

        {/* Brandmark */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontWeight: 800,
            fontFamily: "'Poppins', sans-serif",
            fontSize: "14px",
            color: "#3244e6",
            letterSpacing: ".02em",
            mb: 1.5,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 20V6a2 2 0 0 1 2-2h9l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"
              stroke="#3244e6"
              strokeWidth="2"
            />
            <path
              d="M9 12h6M9 16h6M9 8h3"
              stroke="#3244e6"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          F2 FINTECH
        </Box>

        <Typography
          variant="h5"
          sx={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 800,
            fontSize: { xs: "1.35rem", sm: "1.5rem" },
            mb: 0.5,
            letterSpacing: "-0.01em",
            color: isDark ? "#fff" : "#0F1222",
          }}
        >
          Become a {partnerTitle}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontFamily: "'Poppins', sans-serif",
            color: isDark ? "rgba(255,255,255,0.65)" : "#585C74",
            fontSize: "13.5px",
            lineHeight: 1.55,
          }}
        >
          Complete your details and upload your documents. Verification usually takes under 24 hours.
        </Typography>
      </Box>

      {/* Stepper (Only when not success) */}
      {step !== "success" && (
        <Box sx={{ px: { xs: 2.5, sm: 3.5 } }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            {[1, 2, 3].map((n, idx) => {
              const active = step === n;
              const done = typeof step === "number" && step > n;
              return (
                <Box
                  key={n}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flex: idx < 2 ? 1 : "none",
                  }}
                >
                  <Box
                    sx={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12.5px",
                      fontWeight: 700,
                      fontFamily: "'Poppins', sans-serif",
                      background: done
                        ? "#1E9E6B"
                        : active
                          ? "#3244e6"
                          : isDark
                            ? "rgba(255,255,255,0.1)"
                            : "#EDEDF6",
                      color: done || active ? "#ffffff" : isDark ? "rgba(255,255,255,0.4)" : "#9497AC",
                      flexShrink: 0,
                      transition: "all 0.25s ease",
                    }}
                  >
                    {done ? "✓" : n}
                  </Box>
                  {idx < 2 && (
                    <Box
                      sx={{
                        flex: 1,
                        height: 2,
                        background: isDark ? "rgba(255,255,255,0.1)" : "#EDEDF6",
                        mx: 1,
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          height: "100%",
                          width: (typeof step === "number" && step > n + 1) ? "100%" : (typeof step === "number" && step === n + 1) ? "100%" : "0%",
                          background: "#1E9E6B",
                          transition: "width 0.35s ease",
                        }}
                      />
                    </Box>
                  )}
                </Box>
              );
            })}
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "10.5px",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: ".04em",
              color: isDark ? "rgba(255,255,255,0.4)" : "#AEB0C4",
              pb: 2,
            }}
          >
            <span style={{ color: step === 1 ? "#3244e6" : "inherit" }}>Your details</span>
            <span style={{ color: step === 2 ? "#3244e6" : "inherit" }}>Documents</span>
            <span style={{ color: step === 3 ? "#3244e6" : "inherit" }}>Review & submit</span>
          </Box>
        </Box>
      )}

      {/* Body Content */}
      <Box
        ref={bodyRef}
        sx={{
          px: { xs: 2.5, sm: 3.5 },
          py: 1,
          maxHeight: "60vh",
          overflowY: "auto",
        }}
      >
        {/* STEP 1 */}
        {step === 1 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box>
              <Typography
                variant="body2"
                sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, mb: 0.8, fontSize: "13px" }}
              >
                Full name <span style={{ color: "#D64545" }}>*</span>
              </Typography>
              <TextField
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                error={!!formErrors.name}
                helperText={formErrors.name}
                placeholder="As per your Aadhaar / PAN"
                fullWidth
                variant="outlined"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "0.9rem",
                    background: isDark ? "rgba(255,255,255,0.04)" : "#FCFCFE",
                  },
                }}
              />
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
              <Box>
                <Typography variant="body2" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, mb: 0.8, fontSize: "13px" }}>
                  Mobile number <span style={{ color: "#D64545" }}>*</span>
                </Typography>
                <Box sx={{ display: "flex" }}>
                  <Box
                    sx={{
                      px: 1.5,
                      display: "flex",
                      alignItems: "center",
                      background: isDark ? "rgba(255,255,255,0.08)" : "#F0F0F8",
                      border: `1px solid ${isDark ? "rgba(255,255,255,0.15)" : "#E7E7F3"}`,
                      borderRight: "none",
                      borderRadius: "12px 0 0 12px",
                      fontSize: "14px",
                      fontFamily: "'Poppins', sans-serif",
                      color: isDark ? "rgba(255,255,255,0.7)" : "#585C74",
                      fontWeight: 500,
                    }}
                  >
                    +91
                  </Box>
                  <TextField
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    error={!!formErrors.phone}
                    helperText={formErrors.phone}
                    placeholder="98765 43210"
                    fullWidth
                    variant="outlined"
                    size="small"
                    inputProps={{ maxLength: 10 }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "0 12px 12px 0",
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "0.9rem",
                        background: isDark ? "rgba(255,255,255,0.04)" : "#FCFCFE",
                      },
                    }}
                  />
                </Box>
              </Box>

              <Box>
                <Typography variant="body2" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, mb: 0.8, fontSize: "13px" }}>
                  Email address <span style={{ color: "#D64545" }}>*</span>
                </Typography>
                <TextField
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                  placeholder="you@agency.com"
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "0.9rem",
                      background: isDark ? "rgba(255,255,255,0.04)" : "#FCFCFE",
                    },
                  }}
                />
              </Box>
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
              <Box>
                <Typography variant="body2" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, mb: 0.8, fontSize: "13px" }}>
                  City / location <span style={{ color: "#D64545" }}>*</span>
                </Typography>
                <TextField
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  error={!!formErrors.city}
                  helperText={formErrors.city}
                  placeholder="e.g. Delhi"
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "0.9rem",
                      background: isDark ? "rgba(255,255,255,0.04)" : "#FCFCFE",
                    },
                  }}
                />
              </Box>

              <Box>
                <Typography variant="body2" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, mb: 0.8, fontSize: "13px" }}>
                  Years in {isRealtor ? "real estate" : "finance / loans"} <span style={{ color: "#D64545" }}>*</span>
                </Typography>
                <FormControl fullWidth size="small" error={!!formErrors.experience}>
                  <Select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    displayEmpty
                    sx={{
                      borderRadius: "12px",
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "0.9rem",
                      background: isDark ? "rgba(255,255,255,0.04)" : "#FCFCFE",
                    }}
                  >
                    <MenuItem value="" disabled sx={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.9rem" }}>
                      Select one
                    </MenuItem>
                    <MenuItem value="Less than 1 year" sx={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.9rem" }}>Less than 1 year</MenuItem>
                    <MenuItem value="1 – 3 years" sx={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.9rem" }}>1 – 3 years</MenuItem>
                    <MenuItem value="3 – 5 years" sx={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.9rem" }}>3 – 5 years</MenuItem>
                    <MenuItem value="5+ years" sx={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.9rem" }}>5+ years</MenuItem>
                  </Select>
                  {formErrors.experience && (
                    <Typography variant="caption" color="error" sx={{ mt: 0.5, fontFamily: "'Poppins', sans-serif" }}>
                      {formErrors.experience}
                    </Typography>
                  )}
                </FormControl>
              </Box>
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
              <Box>
                <Typography variant="body2" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, mb: 0.8, fontSize: "13px" }}>
                  Gender <span style={{ color: "#D64545" }}>*</span>
                </Typography>
                <FormControl fullWidth size="small" error={!!formErrors.gender}>
                  <Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    displayEmpty
                    sx={{
                      borderRadius: "12px",
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "0.9rem",
                      background: isDark ? "rgba(255,255,255,0.04)" : "#FCFCFE",
                    }}
                  >
                    <MenuItem value="" disabled sx={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.9rem" }}>
                      Select Gender
                    </MenuItem>
                    <MenuItem value="Male" sx={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.9rem" }}>Male</MenuItem>
                    <MenuItem value="Female" sx={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.9rem" }}>Female</MenuItem>
                    <MenuItem value="Other" sx={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.9rem" }}>Other</MenuItem>
                  </Select>
                  {formErrors.gender && (
                    <Typography variant="caption" color="error" sx={{ mt: 0.5, fontFamily: "'Poppins', sans-serif" }}>
                      {formErrors.gender}
                    </Typography>
                  )}
                </FormControl>
              </Box>

              <Box>
                <Typography variant="body2" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, mb: 0.8, fontSize: "13px" }}>
                  Agency / Firm name <span style={{ color: isDark ? "rgba(255,255,255,0.5)" : "#585C74", fontWeight: 400, fontSize: "11.5px" }}>optional</span>
                </Typography>
                <TextField
                  name="firmName"
                  value={formData.firmName}
                  onChange={handleInputChange}
                  placeholder="If you work under an agency"
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "0.9rem",
                      background: isDark ? "rgba(255,255,255,0.04)" : "#FCFCFE",
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {[
              { key: "aadhaar", label: "Aadhaar card", req: true, hint: "JPG, PNG or PDF, up to 5MB", accept: "image/*,.pdf" },
              { key: "pan", label: "PAN card", req: true, hint: "JPG, PNG or PDF, up to 5MB", accept: "image/*,.pdf" },
              { key: "photo", label: "Passport-size photo", req: true, hint: "JPG or PNG, up to 5MB", accept: "image/*" },
              { key: "bankProof", label: "Bank proof", optHint: "cancelled cheque or passbook", req: false, hint: "JPG, PNG or PDF, up to 5MB", accept: "image/*,.pdf" },
              { key: "reraGst", label: isRealtor ? "RERA certificate" : "GST / Registration", req: false, hint: isRealtor ? "If registered with RERA" : "If registered", accept: "image/*,.pdf" },
            ].map((doc) => {
              const fileObj = docs[doc.key];
              const isErr = docErrors[doc.key];
              return (
                <Box key={doc.key}>
                  <Typography variant="body2" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, mb: 0.6, fontSize: "13px" }}>
                    {doc.label}{" "}
                    {doc.optHint && (
                      <span style={{ color: isDark ? "rgba(255,255,255,0.5)" : "#585C74", fontWeight: 400, fontSize: "11.5px" }}>
                        ({doc.optHint})
                      </span>
                    )}
                    {doc.req ? (
                      <span style={{ color: "#D64545" }}> *</span>
                    ) : (
                      <span style={{ color: isDark ? "rgba(255,255,255,0.5)" : "#585C74", fontWeight: 400, fontSize: "11.5px" }}> optional</span>
                    )}
                  </Typography>

                  <Box
                    component="label"
                    sx={{
                      border: fileObj
                        ? "1.6px solid #1E9E6B"
                        : isErr
                          ? "1.6px dashed #D64545"
                          : `1.6px dashed ${isDark ? "rgba(255,255,255,0.2)" : "#CFD0E6"}`,
                      borderRadius: "14px",
                      p: 1.8,
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      cursor: "pointer",
                      background: fileObj
                        ? isDark ? "rgba(30,158,107,0.1)" : "#F1FAF6"
                        : isDark ? "rgba(255,255,255,0.03)" : "#FCFCFE",
                      transition: "all 0.15s ease",
                      position: "relative",
                      "&:hover": {
                        borderColor: "#3244e6",
                        background: isDark ? "rgba(50,68,230,0.1)" : "#EEECFE",
                      },
                    }}
                  >
                    <input
                      type="file"
                      accept={doc.accept}
                      style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer", width: "100%" }}
                      onChange={(e) => handleFileChange(doc.key, e.target.files[0])}
                    />

                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: fileObj ? "#DCF3E8" : "#EEECFE",
                        color: fileObj ? "#1E9E6B" : "#3244e6",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {fileObj ? <InsertDriveFileIcon sx={{ fontSize: 20 }} /> : <UploadFileIcon sx={{ fontSize: 20 }} />}
                    </Box>

                    {fileObj ? (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1, overflow: "hidden" }}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontFamily: "'Poppins', sans-serif",
                            color: "#1E9E6B",
                            fontWeight: 600,
                            fontSize: "13px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {fileObj.name}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleClearFile(doc.key);
                          }}
                          sx={{ color: isDark ? "rgba(255,255,255,0.6)" : "#585C74", p: 0.5 }}
                        >
                          <CloseIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                      </Box>
                    ) : (
                      <Typography variant="body2" sx={{ fontFamily: "'Poppins', sans-serif", fontSize: "13.5px", color: isDark ? "rgba(255,255,255,0.7)" : "#585C74" }}>
                        <b>Tap to upload</b> · {doc.hint}
                      </Typography>
                    )}
                  </Box>
                  {isErr && (
                    <Typography variant="caption" color="error" sx={{ mt: 0.5, display: "block", fontFamily: "'Poppins', sans-serif" }}>
                      {doc.label} is required.
                    </Typography>
                  )}
                </Box>
              );
            })}
          </Box>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box
              sx={{
                background: isDark ? "rgba(255,255,255,0.03)" : "#FBFBFE",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#E7E7F3"}`,
                borderRadius: "14px",
                p: 2,
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: ".05em",
                  color: "#3244e6",
                  fontWeight: 700,
                  fontSize: "12px",
                  mb: 1.5,
                }}
              >
                Your details
              </Typography>
              {[
                { k: "Name", v: formData.name },
                { k: "Mobile", v: `+91 ${formData.phone}` },
                { k: "Email", v: formData.email },
                { k: "City", v: formData.city },
                { k: "Gender", v: formData.gender },
                { k: "Experience", v: formData.experience },
                { k: "Agency / Firm", v: formData.firmName || "Not provided" },
              ].map((row, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    py: 0.8,
                    fontSize: "13.5px",
                    fontFamily: "'Poppins', sans-serif",
                    borderBottom: i < 6 ? `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "#F0F0F8"}` : "none",
                  }}
                >
                  <span style={{ color: isDark ? "rgba(255,255,255,0.6)" : "#585C74" }}>{row.k}</span>
                  <span style={{ fontWeight: 600 }}>{row.v || "-"}</span>
                </Box>
              ))}
            </Box>

            <Box
              sx={{
                background: isDark ? "rgba(255,255,255,0.03)" : "#FBFBFE",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#E7E7F3"}`,
                borderRadius: "14px",
                p: 2,
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: ".05em",
                  color: "#3244e6",
                  fontWeight: 700,
                  fontSize: "12px",
                  mb: 1.5,
                }}
              >
                Uploaded Documents
              </Typography>
              {[
                { k: "Aadhaar card", v: docs.aadhaar?.name },
                { k: "PAN card", v: docs.pan?.name },
                { k: "Bank proof", v: docs.bankProof?.name },
                { k: "Photo", v: docs.photo?.name },
                { k: isRealtor ? "RERA certificate" : "GST / Registration", v: docs.reraGst?.name || "Not provided" },
              ].map((row, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    py: 0.8,
                    fontSize: "13.5px",
                    fontFamily: "'Poppins', sans-serif",
                    borderBottom: i < 4 ? `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "#F0F0F8"}` : "none",
                  }}
                >
                  <span style={{ color: isDark ? "rgba(255,255,255,0.6)" : "#585C74" }}>{row.k}</span>
                  <span style={{ fontWeight: 600, color: row.v && row.v !== "Not provided" ? "#1E9E6B" : "inherit" }}>
                    {row.v || "-"}
                  </span>
                </Box>
              ))}
            </Box>

            <Box sx={{ display: "flex", gap: 1.2, alignItems: "flex-start", mt: 1 }}>
              <input
                type="checkbox"
                id="agree"
                checked={agreed}
                onChange={(e) => {
                  setAgreed(e.target.checked);
                  if (e.target.checked) setAgreeError(false);
                }}
                style={{ marginTop: 4, width: 16, height: 16, accentColor: "#3244e6", flexShrink: 0, cursor: "pointer" }}
              />
              <Typography variant="body2" component="label" htmlFor="agree" sx={{ fontFamily: "'Poppins', sans-serif", fontSize: "13px", color: isDark ? "rgba(255,255,255,0.7)" : "#585C74", cursor: "pointer", lineHeight: 1.5 }}>
                I confirm the details and documents above are accurate, and I consent to F2 Fintech verifying them for {partnerTitle} onboarding.
              </Typography>
            </Box>
            {agreeError && (
              <Typography variant="caption" color="error" sx={{ ml: 3.5, fontFamily: "'Poppins', sans-serif" }}>
                Please confirm before submitting.
              </Typography>
            )}
          </Box>
        )}

        {/* SUCCESS PANEL */}
        {step === "success" && (
          <Box sx={{ textAlign: "center", py: 2, px: 1 }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                mx: "auto",
                mb: 2,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #1E9E6B, #14B87F)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 14px 26px -10px rgba(30,158,107,0.55)",
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 36, color: "#fff" }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, fontFamily: "'Poppins', sans-serif" }}>
              Application received
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: "'Poppins', sans-serif", color: isDark ? "rgba(255,255,255,0.7)" : "#585C74", mb: 3, maxWidth: 400, mx: "auto", lineHeight: 1.6 }}>
              One last step - scan the code with WhatsApp to send us your kickoff message. Our team confirms most {partnerTitle} applications within 24 hours.
            </Typography>

            <Box
              sx={{
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1.5,
                background: isDark ? "rgba(180,130,60,0.15)" : "#FBF3E7",
                border: `1px solid ${isDark ? "rgba(180,130,60,0.3)" : "#EFDDBB"}`,
                borderRadius: "14px",
                p: 2.5,
                mb: 2.5,
              }}
            >
              <Box
                component="img"
                src={qrUrl}
                alt="Scan to message F2 Fintech on WhatsApp"
                sx={{
                  width: 168,
                  height: 168,
                  borderRadius: "10px",
                  background: "#fff",
                  p: 1,
                  border: "1px solid #EFDDBB",
                }}
              />
              <Typography variant="caption" sx={{ fontFamily: "'Poppins', sans-serif", color: "#B4823C", fontWeight: 700, letterSpacing: ".02em" }}>
                Scan with WhatsApp
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontSize: "12px",
                  fontFamily: "'Poppins', sans-serif",
                  color: isDark ? "rgba(255,255,255,0.8)" : "#585C74",
                  background: isDark ? "rgba(0,0,0,0.2)" : "#fff",
                  border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#E7E7F3"}`,
                  borderRadius: "999px",
                  px: 1.8,
                  py: 0.6,
                }}
              >
                "{waDefaultMsg}"
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Button
                variant="contained"
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  background: isDark
                    ? "linear-gradient(135deg, #38bdf8 0%, #3b82f6 100%)"
                    : "linear-gradient(135deg, #3244e6 0%, #1d2ebd 100%)",
                  color: "#fff",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  borderRadius: "50px",
                  px: 3.5,
                  py: 1.4,
                  textTransform: "none",
                  boxShadow: isDark
                    ? "0 10px 25px -5px rgba(59,130,246,0.4)"
                    : "0 10px 25px -5px rgba(50,68,230,0.35)",
                  "&:hover": {
                    background: isDark
                      ? "linear-gradient(135deg, #3b82f6 0%, #38bdf8 100%)"
                      : "linear-gradient(135deg, #1d2ebd 0%, #3244e6 100%)",
                  },
                }}
              >
                Message us on WhatsApp instead
              </Button>
            </Box>

            <Typography variant="caption" sx={{ fontFamily: "'Poppins', sans-serif", color: isDark ? "rgba(255,255,255,0.6)" : "#585C74" }}>
              Reference ID <b style={{ color: isDark ? "#fff" : "#0F1222", fontFamily: "'Poppins', sans-serif" }}>{referenceId}</b>
            </Typography>
          </Box>
        )}
      </Box>

      {/* Footer Navigation - Centered Button */}
      {step !== "success" && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            p: { xs: 2.5, sm: 3.5 },
            pt: 2,
            borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#E7E7F3"}`,
          }}
        >
          {step > 1 && (
            <Button
              onClick={handleBack}
              sx={{
                position: "absolute",
                left: { xs: 16, sm: 24 },
                color: isDark ? "rgba(255,255,255,0.7)" : "#585C74",
                textTransform: "none",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                px: 2,
              }}
            >
              Back
            </Button>
          )}

          <Button
            variant="contained"
            onClick={handleNext}
            disabled={submitting}
            sx={{
              width: { xs: "100%", sm: "300px" },
              maxWidth: "340px",
              background: isDark
                ? "linear-gradient(135deg, #38bdf8 0%, #3b82f6 100%)"
                : "linear-gradient(135deg, #3244e6 0%, #1d2ebd 100%)",
              color: "#fff",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              borderRadius: "50px",
              py: 1.5,
              fontSize: "0.98rem",
              textTransform: "none",
              boxShadow: isDark
                ? "0 10px 25px -5px rgba(59,130,246,0.4)"
                : "0 10px 25px -5px rgba(50,68,230,0.35)",
              "&:hover": {
                background: isDark
                  ? "linear-gradient(135deg, #3b82f6 0%, #38bdf8 100%)"
                  : "linear-gradient(135deg, #1d2ebd 0%, #3244e6 100%)",
              },
            }}
          >
            {submitting ? "Submitting..." : step === 3 ? "Submit Application" : "Continue"}
          </Button>
        </Box>
      )}
    </Dialog>
  );
}
