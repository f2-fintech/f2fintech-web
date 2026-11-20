import PropTypes from "prop-types";
import { useCallback, useState, useRef, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Container,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Chip,
  Switch,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  FormHelperText,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Tooltip,
} from "@mui/material";
import {
  CurrencyRupee as CurrencyRupeeIcon,
  Delete as DeleteIcon,
  AddPhotoAlternate as AddPhotoAlternateIcon,
  ExpandMore as ExpandMoreIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  OpenInNew as OpenInNewIcon,
  AutoAwesome as AutoAwesomeIcon,
  Security as SecurityIcon,
  CheckCircle as CheckCircleIcon,
  WorkOutline as WorkOutlineIcon,
  AccountBalanceWallet as AccountBalanceWalletIcon,
  LocationOn as LocationOnIcon,
  Business as BusinessIcon,
  Speed as SpeedIcon,
  Star as StarIcon,
  CardGiftcard as CardGiftcardIcon,
  InfoOutlined as InfoOutlinedIcon,
  Edit as EditIcon,
  Lock as LockIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

import API from "../../apis";
import { Utility } from "../utility";

// ── PRESENTATIONAL HELPERS (BANKKARO OFFERS) ──────────────────────────────────

/**
 * Format currency amounts in standard Indian Rupee notation (₹1,00,000)
 */
const formatINR = (val, showDecimals = false) => {
  if (val === null || val === undefined || val === "" || isNaN(Number(val))) return "N/A";
  const num = Number(val);
  return num.toLocaleString("en-IN", {
    maximumFractionDigits: showDecimals ? 2 : 0,
    minimumFractionDigits: showDecimals ? 2 : 0,
  });
};

/**
 * Format Interest Rate (ROI) as range or single value with 'p.a.'
 */
const formatROI = (min, max, roi) => {
  if (min !== undefined && min !== null && max !== undefined && max !== null && String(min) !== "" && String(max) !== "") {
    if (String(min) === String(max)) return `${min}% p.a.`;
    return `${min}% - ${max}% p.a.`;
  }
  if (min !== undefined && min !== null && String(min) !== "") return `${min}% p.a.`;
  if (max !== undefined && max !== null && String(max) !== "") return `Up to ${max}% p.a.`;
  if (roi !== undefined && roi !== null && String(roi) !== "") return `${roi}% p.a.`;
  return "Competitive";
};

/**
 * Map approval text to theme colors
 */
const getApprovalBadgeStyle = (text = "") => {
  const lower = String(text).toLowerCase();
  if (lower.includes("excellent") || lower.includes("high") || lower.includes("pre-approved")) {
    return {
      bg: "#ecfdf5",
      color: "#059669",
      border: "#a7f3d0",
    };
  }
  if (lower.includes("medium") || lower.includes("fair") || lower.includes("good")) {
    return {
      bg: "#fffbeb",
      color: "#d97706",
      border: "#fde68a",
    };
  }
  return {
    bg: "#f8fafc",
    color: "#64748b",
    border: "#cbd5e1",
  };
};

/**
 * Human-friendly mapping for lender rejection reason flags
 */
const mapIneligibleReason = (lender = {}) => {
  if (lender.salaryRejected) return "Income below lender's minimum";
  if (lender.pincodeReject) return "Pincode not serviceable";
  if (lender.loanEmiReject) return "EMI exceeds affordability";
  if (lender.bre2CompanyCatReject) return "Employer category not accepted";
  if (lender.creditScoreReject) return "Credit score below requirement";
  if (lender.ageRejected) return "Age criteria not met";
  if (lender.loanAmountRejected) return "Loan amount out of range";
  if (lender.employmentTypeRejected) return "Employment type not supported";
  if (lender.salaryModeRejected) return "Salary mode not supported";
  if (lender.dedupeReject) return "Existing customer / duplicate";
  return "Doesn't meet lender criteria";
};

/**
 * Safely extract numbers from raw backend rejectedReason without dumping raw error text
 */
const extractReasonDetail = (lender = {}) => {
  const reason = lender.rejectedReason || "";
  if (!reason || typeof reason !== "string") return null;

  // Pattern: "salary = 25000 allowed minSalary = 35000"
  const salaryMatch = reason.match(/salary\s*=\s*(\d+).*?minSalary\s*=\s*(\d+)/i);
  if (salaryMatch) {
    return `Your income ₹${formatINR(salaryMatch[1])} • Required min ₹${formatINR(salaryMatch[2])}`;
  }

  // Pattern: "loanAmount = 100000 min = 5000 max = 50000"
  const amountMatch = reason.match(/loanAmount\s*=\s*(\d+).*?(?:min\s*=\s*(\d+))?.*?(?:max\s*=\s*(\d+))?/i);
  if (amountMatch && (amountMatch[2] || amountMatch[3])) {
    const min = amountMatch[2] ? `₹${formatINR(amountMatch[2])}` : "";
    const max = amountMatch[3] ? `₹${formatINR(amountMatch[3])}` : "";
    return `Requested ₹${formatINR(amountMatch[1])} • Allowed ${min}${min && max ? " - " : ""}${max}`;
  }

  // Pattern: "cibil = 650 min = 700"
  const cibilMatch = reason.match(/cibil\s*=\s*(\d+).*?min(?:Cibil)?\s*=\s*(\d+)/i);
  if (cibilMatch) {
    return `Your score ${cibilMatch[1]} • Required ${cibilMatch[2]}+`;
  }

  // Pattern: "age = 20 min = 21"
  const ageMatch = reason.match(/age\s*=\s*(\d+).*?(?:min\s*=\s*(\d+))?.*?(?:max\s*=\s*(\d+))?/i);
  if (ageMatch && (ageMatch[2] || ageMatch[3])) {
    return `Age ${ageMatch[1]} yrs • Allowed ${ageMatch[2] || "21"}-${ageMatch[3] || "60"} yrs`;
  }

  return null;
};

// ─────────────────────────────────────────────────────────────────────────────

const Step7Form = ({
  handleBack,
  aadharUploadsSuccess,
  isBankKaroActive = false,
  bankkaroFormData = {},
  setBankkaroFormData,
  setIsBankKaroResultsView,
}) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedAudioFiles, setSelectedAudioFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allUploadsSuccess, setAllUploadsSuccess] = useState(false);

  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const theme = useTheme();
  const [amount, setAmount] = useState(null);
  const [emi, setEmi] = useState(null);
  const [liability, setLiability] = useState(null);

  const [errors, setErrors] = useState({
    amount: "",
    emi: "",
    liability: "",
  });

  // BankKaro Step 4 specific form state
  const [employmentStatus, setEmploymentStatus] = useState(
    bankkaroFormData?.employmentStatus || "salaried"
  );
  const [inhandIncome, setInhandIncome] = useState(
    bankkaroFormData?.inhandIncome ? String(bankkaroFormData.inhandIncome) : ""
  );
  const [salaryRecievedIn, setSalaryRecievedIn] = useState(
    bankkaroFormData?.salary_recieved_in || "bank"
  );
  const [pincode, setPincode] = useState(bankkaroFormData?.pincode || "");
  const [officePincode, setOfficePincode] = useState(
    bankkaroFormData?.office_pincode || ""
  );
  const [fetchCreditConsent, setFetchCreditConsent] = useState(
    bankkaroFormData?.fetch_credit_consent !== undefined
      ? bankkaroFormData.fetch_credit_consent
      : true
  );
  const [knowYourCreditScore, setKnowYourCreditScore] = useState(
    bankkaroFormData?.know_your_credit_score !== undefined
      ? bankkaroFormData.know_your_credit_score
      : true
  );

  const [bankkaroStep4Errors, setBankkaroStep4Errors] = useState({
    inhandIncome: "",
    pincode: "",
    officePincode: "",
    consent: "",
  });

  const [offersLoading, setOffersLoading] = useState(false);
  const [offersResult, setOffersResult] = useState(null);
  const [offersError, setOffersError] = useState("");
  const [showIneligible, setShowIneligible] = useState(false);

  // Notify parent (ApplicationForm) when BankKaro results view is active so it expands to full-width
  useEffect(() => {
    setIsBankKaroResultsView?.(Boolean(offersResult));
    return () => {
      setIsBankKaroResultsView?.(false);
    };
  }, [offersResult, setIsBankKaroResultsView]);

  // Continuously sync Step 4 inputs with bankkaroFormData and localStorage for BankKaro
  useEffect(() => {
    if (!isBankKaroActive) return;
    setBankkaroFormData?.((prev) => ({
      ...prev,
      employmentStatus,
      inhandIncome,
      salary_recieved_in: salaryRecievedIn,
      pincode,
      office_pincode: officePincode,
      fetch_credit_consent: fetchCreditConsent,
      know_your_credit_score: knowYourCreditScore,
    }));
  }, [
    isBankKaroActive,
    employmentStatus,
    inhandIncome,
    salaryRecievedIn,
    pincode,
    officePincode,
    fetchCreditConsent,
    knowYourCreditScore,
    setBankkaroFormData,
  ]);

  const { getLocalStorage, formatName, remLocalStorage, toastAndNavigate, uploadFileToS3, setLocalStorage } =
    Utility();
  const storedCustomerId = useMemo(
    () => getLocalStorage("customerInfo")?.id,
    []
  );
  const profileDetail = useMemo(() => getLocalStorage("profileDetail"), []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Validation for Amount
  const validateAmount = (value) => {
    let error = "";
    if (!value) {
      error = "This field is required.";
    } else if (isNaN(value)) {
      error = "Amount must be a number.";
    } else if (value < 50000 || value > 1000000000) {
      error = "Amount must be between 50 thousand and 100 crore.";
    }
    setErrors((prev) => ({ ...prev, amount: error }));
  };

  // Validation for EMI
  const validateEmi = (value) => {
    let error = "";
    if (value && isNaN(value)) {
      error = "EMI must be a number.";
    }
    setErrors((prev) => ({ ...prev, emi: error }));
  };

  // Validation for Liability
  const validateLiability = (value) => {
    let error = "";
    if (value && isNaN(value)) {
      error = "Liability must be a number.";
    }
    setErrors((prev) => ({ ...prev, liability: error }));
  };

  // BankKaro Step 4 Validations
  const validateInhandIncome = (val) => {
    let err = "";
    const clean = Number(String(val).replace(/[^0-9.]/g, ""));
    if (!val || isNaN(clean) || clean <= 0) {
      err = "Please enter valid monthly in-hand income";
    }
    setBankkaroStep4Errors((prev) => ({ ...prev, inhandIncome: err }));
    return !err;
  };

  const validatePincode = (val, fieldName) => {
    let err = "";
    if (!val || !/^[1-9][0-9]{5}$/.test(String(val).trim())) {
      err = "Enter valid 6-digit pincode";
    }
    setBankkaroStep4Errors((prev) => ({ ...prev, [fieldName]: err }));
    return !err;
  };

  // Submit to BankKaro Stateless BRE Advanced
  const handleBankKaroSubmit = async () => {
    setOffersError("");

    const isIncomeValid = validateInhandIncome(inhandIncome);
    const isPinValid = validatePincode(pincode, "pincode");
    const isOfficePinValid = validatePincode(officePincode || pincode, "officePincode");

    if (!fetchCreditConsent) {
      setBankkaroStep4Errors((prev) => ({
        ...prev,
        consent: "You must provide consent for credit bureau evaluation",
      }));
      return;
    } else {
      setBankkaroStep4Errors((prev) => ({ ...prev, consent: "" }));
    }

    if (!isIncomeValid || !isPinValid || !isOfficePinValid) {
      return;
    }

    setOffersLoading(true);

    const cleanIncome = Number(String(inhandIncome).replace(/[^0-9.]/g, ""));
    const cleanAmount = Number(bankkaroFormData?.loan_amount_required) || 100000;
    const cleanTenure = Number(bankkaroFormData?.loan_tenure) || 12;

    const payload = {
      dob: bankkaroFormData?.dob || "1998-05-15",
      loan_amount_required: cleanAmount,
      employmentStatus: String(employmentStatus).toLowerCase(),
      inhandIncome: cleanIncome,
      salary_recieved_in: String(salaryRecievedIn).toLowerCase(),
      company_name: bankkaroFormData?.company_name || "Private Firm",
      pincode: String(pincode).trim(),
      office_pincode: String(officePincode || pincode).trim(),
      fetch_credit_consent: Boolean(fetchCreditConsent),
      know_your_credit_score: Boolean(knowYourCreditScore),
      loan_tenure: cleanTenure,
      name: bankkaroFormData?.name || undefined,
      phone: bankkaroFormData?.contact || bankkaroFormData?.phone || undefined,
      email: bankkaroFormData?.email || undefined,
    };

    // Update parent state so user edits are preserved
    setBankkaroFormData?.((prev) => ({
      ...prev,
      employmentStatus,
      inhandIncome: cleanIncome,
      salary_recieved_in: salaryRecievedIn,
      pincode,
      office_pincode: officePincode,
      fetch_credit_consent: fetchCreditConsent,
      know_your_credit_score: knowYourCreditScore,
    }));

    try {
      const response = await API.CreditCardsAPI.applyStatelessBRE(payload);
      if (response && (response.status === "Success" || response.data)) {
        setOffersResult(response.data || response);
        // Clear saved form draft from localStorage on final successful submission
        try {
          localStorage.removeItem("bankkaroFormData");
          localStorage.removeItem("activeStep");
          localStorage.removeItem("isBankKaroActive");
        } catch (clearErr) {
          console.warn("[Step7Form] Error clearing localStorage:", clearErr);
        }
        toastAndNavigate(
          dispatch,
          true,
          "info",
          "Pre-approved offers evaluated successfully!"
        );
      } else {
        setOffersError(response?.message || "No offers found or partner returned error.");
      }
    } catch (err) {
      console.error("[Step7Form] BankKaro BRE submission failed:", err);
      setOffersError(err.message || "Failed to connect to pre-approval service. Please try again.");
      toastAndNavigate(dispatch, true, "error", err.message || "Eligibility check failed");
    } finally {
      setOffersLoading(false);
    }
  };

  // Function to update customer info
  const updateCustomerInfo = useCallback(async (data) => {
    try {
      await API.CustomerInfoAPI.updateCustomerInfo(data);
      console.log("Customer info updated successfully.");
    } catch (error) {
      console.log("Error updating customer info:", error);
    }
  }, []);

  // Handle deleting a file from the selected files array
  const handleAttachmentDelete = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const updateFormInfo = async (data) => {
    if (storedCustomerId) {
      try {
        await updateCustomerInfo(data);

        // Reset form fields
        setAmount(null);
        setEmi(null);
        setLiability(null);
        setSelectedFiles([]);
        remLocalStorage("activeStep");
        remLocalStorage("StatementUpload");
        remLocalStorage("profileDetail");
        setLocalStorage("applicationCompleted", "true");
        setLoading(false);
        window.location.reload();
      } catch (error) {
        setLoading(false);
        console.error("Error updating customer info:", error);
      }
    } else {
      setLoading(false);
      console.error("No customer ID found.");
    }
  };

  // Handle form submission
  const create = useCallback(async () => {
    const data = {
      customer_id: storedCustomerId,
      salary: parseFloat(amount),
      existing_emi: emi,
      existing_liability: liability,
    };
    setLoading(true);

    try {
      // Handle file uploads
      if (selectedFiles.length !== 0) {
        for (const file of selectedFiles) {
          await uploadFileToS3(file, "certificate", storedCustomerId);
        }
      }

      // Handle audio uploads (if any, though none selected in UI currently)
      if (selectedAudioFiles.length !== 0) {
        for (const file of selectedAudioFiles) {
          await uploadFileToS3(file, "audio", storedCustomerId);
        }
      }

      setAllUploadsSuccess(true);
      await updateFormInfo(data);
    } catch (error) {
      console.error("Error during form submission:", error);
      toastAndNavigate(
        dispatch,
        true,
        "error",
        "Upload failed. Please try again"
      );
      setAllUploadsSuccess(false);
      setLoading(false);
    }
  }, [
    amount,
    emi,
    liability,
    storedCustomerId,
    dispatch,
    selectedFiles,
    selectedAudioFiles,
    uploadFileToS3,
    updateFormInfo,
    toastAndNavigate
  ]);

  // Render BankKaro Inline Results View
  if (offersResult) {
    const offers = offersResult.offers || [];
    const inEligible = offersResult.inEligibleOffers || [];

    // Requested loan amount from inputs or API response
    const requestedAmount =
      bankkaroFormData?.loan_amount_required ||
      offersResult?.loan_amount_applied ||
      offers[0]?.loan_amount_applied ||
      offers[0]?.loan_offered_upto ||
      null;

    // Identify best offer (lowest minimum_interest_rate)
    let bestOfferIndex = -1;
    if (offers.length > 0) {
      let lowestRate = Infinity;
      offers.forEach((offer, i) => {
        const rate = parseFloat(offer.minimum_interest_rate);
        if (!isNaN(rate) && rate < lowestRate) {
          lowestRate = rate;
          bestOfferIndex = i;
        }
      });
    }

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          animation: "fadeIn 0.3s ease-in-out",
          "@keyframes fadeIn": {
            from: { opacity: 0, transform: "translateY(6px)" },
            to: { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        {/* Top Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            gap: 2,
            mb: 2.5,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "22px", sm: "26px", md: "28px" },
              color: "#0F172A",
              fontFamily: "Poppins",
              letterSpacing: "-0.5px",
            }}
          >
            Your Pre-Approved Offers
          </Typography>

          <Button
            onClick={() => setOffersResult(null)}
            startIcon={<EditIcon sx={{ fontSize: "16px !important" }} />}
            sx={{
              textTransform: "none",
              fontFamily: "Poppins",
              fontWeight: 600,
              fontSize: "0.88rem",
              color: "#3244e6",
              p: 0,
              minWidth: "auto",
              "&:hover": {
                background: "transparent",
                textDecoration: "underline",
              },
            }}
          >
            Edit Details / Start Over
          </Button>
        </Box>

        {/* Summary Strip */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 1.5,
            p: { xs: 1.5, sm: 2 },
            bgcolor: "#F8FAFC",
            borderRadius: "14px",
            border: "1px solid #E2E8F0",
            mb: 3.5,
          }}
        >
          {requestedAmount && (
            <Chip
              label={`Requested: ₹${formatINR(requestedAmount)}`}
              size="small"
              sx={{
                bgcolor: "#FFFFFF",
                border: "1px solid #CBD5E1",
                fontWeight: 600,
                fontSize: "0.78rem",
                color: "#1E293B",
                height: 28,
              }}
            />
          )}
          <Chip
            label={`${offers.length} Eligible Offer${offers.length === 1 ? "" : "s"}`}
            size="small"
            sx={{
              bgcolor: offers.length > 0 ? "#ECFDF5" : "#F1F5F9",
              border: `1px solid ${offers.length > 0 ? "#A7F3D0" : "#CBD5E1"}`,
              fontWeight: 700,
              fontSize: "0.78rem",
              color: offers.length > 0 ? "#059669" : "#64748B",
              height: 28,
            }}
          />
          <Chip
            label={`${inEligible.length} Ineligible Lender${inEligible.length === 1 ? "" : "s"}`}
            size="small"
            sx={{
              bgcolor: "#FFF7ED",
              border: "1px solid #FED7AA",
              fontWeight: 600,
              fontSize: "0.78rem",
              color: "#C2410C",
              height: 28,
            }}
          />
        </Box>

        {/* Eligible Offers Section */}
        {offers.length > 0 ? (
          <Box
            sx={{
              width: "100%",
              maxWidth: offers.length === 1 ? "880px" : "100%",
              mx: "auto",
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: offers.length === 2 ? "repeat(2, 1fr)" : offers.length > 2 ? "repeat(auto-fit, minmax(350px, 1fr))" : "1fr",
              },
              gap: 3,
              mb: 4,
            }}
          >
            {offers.map((offer, idx) => {
              const isBestOffer = idx === bestOfferIndex;
              const approvalStyle = getApprovalBadgeStyle(offer.approval_text);
              const maxAmount = offer.loan_offered_upto || offer.max_loan_allowed;
              const roiDisplay = formatROI(offer.minimum_interest_rate, offer.maximum_interest_rate, offer.roi);
              const tenureDisplay = `${offer.minimum_loan_tenure || 1} - ${offer.maximum_loan_tenure || 48} Months`;
              const feeDisplay = offer.processing_fees
                ? (String(offer.processing_fees).includes("%") ? offer.processing_fees : `₹${formatINR(offer.processing_fees)}`)
                : (offer.processingFees || "Zero / Standard");

              return (
                <Box
                  key={offer.offer_id || `${offer.lender_name}-${idx}`}
                  sx={{
                    position: "relative",
                    background: "#FFFFFF",
                    borderRadius: "18px",
                    border: isBestOffer ? "2px solid #3244e6" : "1.5px solid #E2E8F0",
                    p: { xs: 2.5, sm: 3 },
                    boxShadow: isBestOffer
                      ? "0 14px 28px -6px rgba(50, 68, 230, 0.16)"
                      : "0 10px 24px -6px rgba(0, 0, 0, 0.04)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "all 0.25s ease",
                    "&:hover": {
                      borderColor: "#3244e6",
                      boxShadow: "0 18px 36px -8px rgba(50, 68, 230, 0.18)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  {/* Card Header */}
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 1.5, mb: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      {offer.lender_image ? (
                        <Box
                          component="img"
                          src={offer.lender_image}
                          alt={offer.lender_name || "Lender Logo"}
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                          sx={{
                            width: 46,
                            height: 46,
                            borderRadius: "12px",
                            objectFit: "contain",
                            border: "1px solid #F1F5F9",
                            p: 0.5,
                            bgcolor: "#FFFFFF",
                          }}
                        />
                      ) : (
                        <Avatar
                          sx={{
                            width: 46,
                            height: 46,
                            borderRadius: "12px",
                            bgcolor: "#3244e6",
                            fontWeight: 700,
                            fontSize: "1.1rem",
                          }}
                        >
                          {offer.lender_name ? offer.lender_name.charAt(0) : "L"}
                        </Avatar>
                      )}

                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 800,
                            fontSize: "1.15rem",
                            color: "#0F172A",
                            fontFamily: "Poppins",
                            lineHeight: 1.3,
                          }}
                        >
                          {offer.lender_name}
                        </Typography>
                        <Typography sx={{ fontSize: "0.78rem", color: "#64748B", fontWeight: 500 }}>
                          {offer.lender_category || "Fintech Lender"}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 0.8 }}>
                      {isBestOffer && (
                        <Chip
                          icon={<StarIcon sx={{ fontSize: "14px !important", color: "#4338CA !important" }} />}
                          label="Best Offer"
                          size="small"
                          sx={{
                            bgcolor: "#EEF2FF",
                            color: "#4338CA",
                            fontWeight: 700,
                            fontSize: "0.72rem",
                            border: "1px solid #C7D2FE",
                            height: 22,
                          }}
                        />
                      )}
                      {offer.approval_text && (
                        <Chip
                          label={offer.approval_text}
                          size="small"
                          sx={{
                            backgroundColor: approvalStyle.bg,
                            color: approvalStyle.color,
                            fontWeight: 700,
                            fontSize: "0.72rem",
                            borderRadius: "8px",
                            border: `1px solid ${approvalStyle.border}`,
                            height: 22,
                          }}
                        />
                      )}
                    </Box>
                  </Box>

                  {/* HERO ROW: Interest Rate, Loan Offered, Monthly EMI */}
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
                      gap: 2,
                      background: "linear-gradient(135deg, #F8FAFC 0%, #EEF2FF 100%)",
                      borderRadius: "14px",
                      border: "1px solid #E0E7FF",
                      p: 2,
                      mb: 2.5,
                      alignItems: "center",
                    }}
                  >
                    {/* ROI / Interest Rate (Prominent) */}
                    <Box>
                      <Typography sx={{ fontSize: "0.7rem", color: "#64748B", fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase" }}>
                        Interest Rate (ROI)
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { xs: "1.25rem", sm: "1.35rem" },
                          fontWeight: 800,
                          color: "#3244e6",
                          fontFamily: "Poppins",
                          lineHeight: 1.2,
                          mt: 0.3,
                        }}
                      >
                        {roiDisplay}
                      </Typography>
                    </Box>

                    {/* Loan Amount */}
                    <Box>
                      <Typography sx={{ fontSize: "0.7rem", color: "#64748B", fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase" }}>
                        Loan Offered Up To
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { xs: "1.15rem", sm: "1.25rem" },
                          fontWeight: 800,
                          color: "#0F172A",
                          fontFamily: "Poppins",
                          lineHeight: 1.2,
                          mt: 0.3,
                        }}
                      >
                        {maxAmount ? `₹${formatINR(maxAmount)}` : "As per profile"}
                      </Typography>
                    </Box>

                    {/* Monthly EMI */}
                    <Box>
                      <Typography sx={{ fontSize: "0.7rem", color: "#64748B", fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase" }}>
                        Est. Monthly EMI
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { xs: "1.1rem", sm: "1.2rem" },
                          fontWeight: 800,
                          color: "#059669",
                          fontFamily: "Poppins",
                          lineHeight: 1.2,
                          mt: 0.3,
                        }}
                      >
                        {offer.monthly_installment ? `₹${formatINR(offer.monthly_installment, true)}/mo` : "Calculated on Apply"}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Details Grid: 2-3 Columns */}
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)" },
                      gap: 2,
                      bgcolor: "#F8FAFC",
                      borderRadius: "12px",
                      p: 2,
                      mb: 2.5,
                      border: "1px solid #F1F5F9",
                    }}
                  >
                    <Box>
                      <Typography sx={{ fontSize: "0.7rem", color: "#64748B", fontWeight: 600 }}>
                        Tenure Range
                      </Typography>
                      <Typography sx={{ fontSize: "0.88rem", fontWeight: 700, color: "#1E293B", fontFamily: "Poppins" }}>
                        {tenureDisplay}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography sx={{ fontSize: "0.7rem", color: "#64748B", fontWeight: 600 }}>
                        Processing Fee
                      </Typography>
                      <Typography sx={{ fontSize: "0.88rem", fontWeight: 700, color: "#1E293B", fontFamily: "Poppins" }}>
                        {feeDisplay}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography sx={{ fontSize: "0.7rem", color: "#64748B", fontWeight: 600 }}>
                        You Will Get
                      </Typography>
                      <Typography sx={{ fontSize: "0.88rem", fontWeight: 700, color: "#059669", fontFamily: "Poppins" }}>
                        {offer.amount_you_will_get ? `₹${formatINR(offer.amount_you_will_get)}` : "Net of charges"}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography sx={{ fontSize: "0.7rem", color: "#64748B", fontWeight: 600 }}>
                        Total Interest
                      </Typography>
                      <Typography sx={{ fontSize: "0.88rem", fontWeight: 700, color: "#1E293B", fontFamily: "Poppins" }}>
                        {offer.total_interest_paid
                          ? `₹${formatINR(offer.total_interest_paid)}`
                          : offer.minimum_total_interest_paid && offer.maximum_total_interest_paid
                          ? `₹${formatINR(offer.minimum_total_interest_paid)} - ₹${formatINR(offer.maximum_total_interest_paid)}`
                          : "Competitive"}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography sx={{ fontSize: "0.7rem", color: "#64748B", fontWeight: 600 }}>
                        Total Payable
                      </Typography>
                      <Typography sx={{ fontSize: "0.88rem", fontWeight: 700, color: "#1E293B", fontFamily: "Poppins" }}>
                        {offer.total_amount_paid
                          ? `₹${formatINR(offer.total_amount_paid)}`
                          : offer.minimum_total_payable_amount_range && offer.maximum_total_payable_amount_range
                          ? `₹${formatINR(offer.minimum_total_payable_amount_range)} - ₹${formatINR(offer.maximum_total_payable_amount_range)}`
                          : "As per schedule"}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography sx={{ fontSize: "0.7rem", color: "#64748B", fontWeight: 600 }}>
                        Min. Credit Score
                      </Typography>
                      <Typography sx={{ fontSize: "0.88rem", fontWeight: 700, color: "#1E293B", fontFamily: "Poppins" }}>
                        {offer.salaried_cibil ? `${offer.salaried_cibil}+ CIBIL` : "Standard"}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Chips Row: Loan Tags & Reward Text */}
                  {((offer.loan_tags && offer.loan_tags.length > 0) || offer.ck_reward_text) && (
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", alignItems: "center", mb: 2.5 }}>
                      {offer.ck_reward_text && (
                        <Chip
                          icon={<CardGiftcardIcon sx={{ fontSize: "14px !important", color: "#854D0E !important" }} />}
                          label={offer.ck_reward_text}
                          size="small"
                          sx={{
                            bgcolor: "#FEF9C3",
                            color: "#854D0E",
                            fontWeight: 700,
                            fontSize: "0.75rem",
                            border: "1px solid #FEF08A",
                            height: 24,
                          }}
                        />
                      )}
                      {offer.loan_tags &&
                        offer.loan_tags.map((tag, tIdx) => (
                          <Tooltip key={tag.id || tIdx} title={tag.tag_description || tag.name} arrow>
                            <Chip
                              label={tag.name}
                              size="small"
                              sx={{
                                fontSize: "0.72rem",
                                fontWeight: 500,
                                height: 24,
                                backgroundColor: "#F1F5F9",
                                color: "#475569",
                                borderRadius: "6px",
                              }}
                            />
                          </Tooltip>
                        ))}
                    </Box>
                  )}

                  {/* Card Footer: CTA & External Redirect */}
                  <Box sx={{ mt: "auto" }}>
                    <Button
                      variant="contained"
                      fullWidth
                      endIcon={<OpenInNewIcon sx={{ fontSize: "18px !important" }} />}
                      onClick={() => {
                        if (offer.redirect_url) {
                          window.open(offer.redirect_url, "_blank", "noopener,noreferrer");
                        }
                      }}
                      sx={{
                        background: "linear-gradient(135deg, #3244e6 0%, #1d2ebd 100%)",
                        color: "white",
                        fontWeight: 700,
                        fontFamily: "Poppins",
                        borderRadius: "12px",
                        py: 1.4,
                        fontSize: "0.98rem",
                        textTransform: "none",
                        boxShadow: "0 6px 18px rgba(50, 68, 230, 0.28)",
                        transition: "all 0.25s ease",
                        "&:hover": {
                          background: "linear-gradient(135deg, #1d2ebd 0%, #3244e6 100%)",
                          boxShadow: "0 10px 24px rgba(50, 68, 230, 0.38)",
                          transform: "translateY(-1px)",
                        },
                      }}
                    >
                      Apply with {offer.lender_name}
                    </Button>
                    <Typography
                      sx={{
                        fontSize: "0.72rem",
                        color: "#94A3B8",
                        textAlign: "center",
                        mt: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 0.5,
                      }}
                    >
                      <LockIcon sx={{ fontSize: "12px", color: "#94A3B8" }} />
                      You will be redirected to the lender&apos;s secure site.
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        ) : (
          /* Zero Eligible Offers Empty State */
          <Box
            sx={{
              p: 4,
              textAlign: "center",
              bgcolor: "#F8FAFC",
              borderRadius: "18px",
              border: "1px dashed #CBD5E1",
              mb: 4,
            }}
          >
            <InfoOutlinedIcon sx={{ fontSize: "42px", color: "#3244e6", mb: 1.5 }} />
            <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", fontFamily: "Poppins", mb: 1 }}>
              No Direct Pre-Approvals Available
            </Typography>
            <Typography sx={{ color: "#64748B", fontSize: "0.9rem", maxWidth: "520px", mx: "auto", mb: 3 }}>
              Based on your submitted parameters, lenders could not offer instant pre-approval. You can adjust your requested amount, income, or employer details and try again.
            </Typography>
            <Button
              variant="outlined"
              onClick={() => setOffersResult(null)}
              sx={{
                borderRadius: "10px",
                borderColor: "#3244e6",
                color: "#3244e6",
                fontFamily: "Poppins",
                fontWeight: 600,
                textTransform: "none",
                px: 3,
                "&:hover": {
                  borderColor: "#1d2ebd",
                  backgroundColor: "rgba(50, 68, 230, 0.05)",
                },
              }}
            >
              Modify Application Details
            </Button>
          </Box>
        )}

        {/* Ineligible Lenders Collapsed Section */}
        {inEligible.length > 0 && (
          <Box sx={{ width: "100%", mb: 3 }}>
            <Accordion
              expanded={showIneligible}
              onChange={() => setShowIneligible(!showIneligible)}
              sx={{
                borderRadius: "16px !important",
                border: "1px solid #E2E8F0",
                boxShadow: "none",
                bgcolor: "#F8FAFC",
                "&:before": { display: "none" },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#64748B" }} />}
                sx={{
                  px: 2.5,
                  py: 1,
                  "& .MuiAccordionSummary-content": {
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  },
                }}
              >
                <Typography sx={{ fontWeight: 700, color: "#334155", fontSize: "0.95rem", fontFamily: "Poppins" }}>
                  Not eligible right now ({inEligible.length})
                </Typography>
                <Chip
                  label="Criteria Not Met"
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: "0.68rem",
                    bgcolor: "#F1F5F9",
                    color: "#64748B",
                    fontWeight: 600,
                  }}
                />
              </AccordionSummary>

              <AccordionDetails sx={{ px: 2.5, pb: 2.5, pt: 0.5 }}>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: "repeat(2, 1fr)",
                      md: "repeat(3, 1fr)",
                    },
                    gap: 2,
                  }}
                >
                  {inEligible.map((rej, idx) => {
                    const primaryReason = mapIneligibleReason(rej);
                    const secondaryDetail = extractReasonDetail(rej);

                    return (
                      <Box
                        key={rej.lender_id || `${rej.lender_name}-${idx}`}
                        sx={{
                          p: 2,
                          borderRadius: "12px",
                          backgroundColor: "#FFFFFF",
                          border: "1px solid #E2E8F0",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          gap: 1.5,
                          transition: "all 0.2s ease",
                          "&:hover": {
                            borderColor: "#CBD5E1",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.04)",
                          },
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                          {rej.lender_image ? (
                            <Box
                              component="img"
                              src={rej.lender_image}
                              alt={rej.lender_name || "Lender Logo"}
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                              sx={{
                                width: 34,
                                height: 34,
                                borderRadius: "8px",
                                objectFit: "contain",
                                filter: "grayscale(100%)",
                                opacity: 0.65,
                                border: "1px solid #F1F5F9",
                                p: 0.3,
                              }}
                            />
                          ) : (
                            <Avatar
                              sx={{
                                width: 34,
                                height: 34,
                                borderRadius: "8px",
                                bgcolor: "#94A3B8",
                                fontSize: "0.85rem",
                                fontWeight: 700,
                              }}
                            >
                              {rej.lender_name ? rej.lender_name.charAt(0) : "L"}
                            </Avatar>
                          )}

                          <Box sx={{ minWidth: 0, flex: 1 }}>
                            <Typography
                              sx={{
                                fontWeight: 700,
                                fontSize: "0.92rem",
                                color: "#334155",
                                fontFamily: "Poppins",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {rej.lender_name || `Lender #${rej.lender_id}`}
                            </Typography>
                            <Typography sx={{ fontSize: "0.72rem", color: "#94A3B8" }}>
                              {rej.lender_category || "Fintech Lender"}
                            </Typography>
                          </Box>
                        </Box>

                        <Box>
                          <Chip
                            label={primaryReason}
                            size="small"
                            sx={{
                              maxWidth: "100%",
                              height: "auto",
                              py: 0.3,
                              px: 0.5,
                              fontSize: "0.72rem",
                              fontWeight: 600,
                              bgcolor: "#FFF7ED",
                              color: "#C2410C",
                              border: "1px solid #FED7AA",
                              "& .MuiChip-label": {
                                whiteSpace: "normal",
                                textAlign: "left",
                                lineHeight: 1.25,
                              },
                            }}
                          />

                          {secondaryDetail && (
                            <Typography
                              sx={{
                                fontSize: "0.72rem",
                                color: "#64748B",
                                mt: 0.8,
                                fontWeight: 500,
                                lineHeight: 1.3,
                              }}
                            >
                              {secondaryDetail}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
        )}

        {/* Footer Branding */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            pt: 2,
            borderTop: "1px solid #F1F5F9",
          }}
        >
          <Box
            component="img"
            src="/great-cards-logo.svg"
            alt="Great.Cards"
            sx={{ height: "16px", width: "auto" }}
          />
          <Typography sx={{ fontSize: "0.75rem", color: "#64748B", fontFamily: "Poppins", fontWeight: 500 }}>
            Powered by BankKaro
          </Typography>
        </Box>
      </Box>
    );
  }

  // Render BankKaro Step 4 Form View
  if (isBankKaroActive) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: { xs: "22px", md: "26px" },
              color: "#3244e6",
              fontFamily: "Poppins",
              letterSpacing: "-0.5px",
              lineHeight: 1.2,
              mb: 1,
            }}
          >
            Additional Details
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "14px", md: "16px" },
              color: "rgba(0, 0, 0, 0.5)",
              fontFamily: "Poppins",
              fontWeight: 500,
            }}
          >
            Bureau evaluation parameters for pre-approved loan offers
          </Typography>
        </Box>

        {offersError && (
          <Alert severity="error" sx={{ width: "100%", mb: 3, borderRadius: "12px" }}>
            {offersError}
          </Alert>
        )}

        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 2.5,
            mb: 3.5,
          }}
        >
          {/* Employment Status */}
          <FormControl fullWidth variant="outlined">
            <InputLabel
              id="employment-status-label"
              sx={{
                color: "text.secondary",
                "&.Mui-focused": { color: "#3244e6" },
              }}
            >
              Employment Status*
            </InputLabel>
            <Select
              labelId="employment-status-label"
              value={employmentStatus}
              onChange={(e) => setEmploymentStatus(e.target.value)}
              input={<OutlinedInput label="Employment Status*" />}
              startAdornment={
                <InputAdornment position="start">
                  <WorkOutlineIcon sx={{ color: "#3244e6", mr: 0.5 }} />
                </InputAdornment>
              }
              sx={{
                borderRadius: "12px",
                backgroundColor: "white",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(50, 68, 230, 0.2)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#3244e6",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#3244e6",
                  borderWidth: "1px",
                },
              }}
            >
              <MenuItem value="salaried">Salaried Employee</MenuItem>
              <MenuItem value="self_employed">Self Employed / Business</MenuItem>
              <MenuItem value="student">Student</MenuItem>
            </Select>
          </FormControl>

          {/* Monthly In-Hand Income */}
          <TextField
            autoComplete="off"
            fullWidth
            variant="outlined"
            label="Monthly In-Hand Income (₹)*"
            placeholder="e.g. 65,000"
            value={inhandIncome}
            onChange={(e) => {
              setInhandIncome(e.target.value);
              validateInhandIncome(e.target.value);
            }}
            onBlur={() => validateInhandIncome(inhandIncome)}
            error={!!bankkaroStep4Errors.inhandIncome}
            helperText={bankkaroStep4Errors.inhandIncome || "Net salary received per month"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CurrencyRupeeIcon sx={{ color: "#3244e6" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "white",
                transition: "all 0.3s ease",
                "& fieldset": { borderColor: "rgba(50, 68, 230, 0.2)" },
                "&:hover fieldset": { borderColor: "#3244e6" },
                "&.Mui-focused fieldset": { borderColor: "#3244e6", borderWidth: "1px" },
              },
              "& .MuiInputLabel-root": {
                color: "#555",
                fontWeight: 500,
                "&.Mui-focused": { color: "#3244e6" },
              },
            }}
          />

          {/* Salary Received In */}
          <FormControl fullWidth variant="outlined">
            <InputLabel
              id="salary-received-label"
              sx={{
                color: "text.secondary",
                "&.Mui-focused": { color: "#3244e6" },
              }}
            >
              Salary Received In*
            </InputLabel>
            <Select
              labelId="salary-received-label"
              value={salaryRecievedIn}
              onChange={(e) => setSalaryRecievedIn(e.target.value)}
              input={<OutlinedInput label="Salary Received In*" />}
              startAdornment={
                <InputAdornment position="start">
                  <AccountBalanceWalletIcon sx={{ color: "#3244e6", mr: 0.5 }} />
                </InputAdornment>
              }
              sx={{
                borderRadius: "12px",
                backgroundColor: "white",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(50, 68, 230, 0.2)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#3244e6",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#3244e6",
                  borderWidth: "1px",
                },
              }}
            >
              <MenuItem value="bank">Direct Bank Transfer (NEFT/IMPS)</MenuItem>
              <MenuItem value="cheque">Cheque</MenuItem>
              <MenuItem value="upi">UPI Transfer</MenuItem>
              <MenuItem value="cash">Cash</MenuItem>
            </Select>
          </FormControl>

          {/* Residence Pincode */}
          <TextField
            autoComplete="off"
            fullWidth
            variant="outlined"
            label="Current Residence Pincode*"
            placeholder="6-digit pincode (e.g. 110001)"
            value={pincode}
            inputProps={{ maxLength: 6 }}
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9]/g, "");
              setPincode(val);
              validatePincode(val, "pincode");
            }}
            onBlur={() => validatePincode(pincode, "pincode")}
            error={!!bankkaroStep4Errors.pincode}
            helperText={bankkaroStep4Errors.pincode || "6-digit residential area code"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon sx={{ color: "#3244e6" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "white",
                transition: "all 0.3s ease",
                "& fieldset": { borderColor: "rgba(50, 68, 230, 0.2)" },
                "&:hover fieldset": { borderColor: "#3244e6" },
                "&.Mui-focused fieldset": { borderColor: "#3244e6", borderWidth: "1px" },
              },
              "& .MuiInputLabel-root": {
                color: "#555",
                fontWeight: 500,
                "&.Mui-focused": { color: "#3244e6" },
              },
            }}
          />

          {/* Office / Work Pincode */}
          <TextField
            autoComplete="off"
            fullWidth
            variant="outlined"
            label="Office / Work Pincode*"
            placeholder="6-digit office pincode"
            value={officePincode}
            inputProps={{ maxLength: 6 }}
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9]/g, "");
              setOfficePincode(val);
              validatePincode(val, "officePincode");
            }}
            onBlur={() => validatePincode(officePincode, "officePincode")}
            error={!!bankkaroStep4Errors.officePincode}
            helperText={bankkaroStep4Errors.officePincode || "Workplace / registered company pin"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BusinessIcon sx={{ color: "#3244e6" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "white",
                transition: "all 0.3s ease",
                "& fieldset": { borderColor: "rgba(50, 68, 230, 0.2)" },
                "&:hover fieldset": { borderColor: "#3244e6" },
                "&.Mui-focused fieldset": { borderColor: "#3244e6", borderWidth: "1px" },
              },
              "& .MuiInputLabel-root": {
                color: "#555",
                fontWeight: 500,
                "&.Mui-focused": { color: "#3244e6" },
              },
            }}
          />

          {/* Know Your Credit Score Toggle */}
          <Box
            sx={{
              height: "56px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 2,
              borderRadius: "12px",
              backgroundColor: "white",
              border: "1px solid rgba(50, 68, 230, 0.2)",
              transition: "all 0.3s ease",
              boxSizing: "border-box",
              "&:hover": {
                borderColor: "#3244e6",
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <SpeedIcon sx={{ color: "#3244e6", fontSize: "1.3rem" }} />
              <Box>
                <Typography sx={{ fontWeight: 600, fontSize: "0.85rem", color: "#1e293b", lineHeight: 1.2 }}>
                  Know credit score?
                </Typography>
                <Typography sx={{ fontSize: "0.7rem", color: "#64748b" }}>
                  Refines lender matching
                </Typography>
              </Box>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={knowYourCreditScore}
                  onChange={(e) => setKnowYourCreditScore(e.target.checked)}
                  color="primary"
                  size="small"
                />
              }
              label={
                <Typography sx={{ fontSize: "0.82rem", fontWeight: 700, color: knowYourCreditScore ? "#3244e6" : "#64748b" }}>
                  {knowYourCreditScore ? "Yes" : "No"}
                </Typography>
              }
              sx={{ m: 0 }}
            />
          </Box>

          {/* Credit Bureau Consent */}
          <Box
            sx={{
              gridColumn: { xs: "span 1", md: "span 2" },
              p: 2.5,
              borderRadius: "14px",
              backgroundColor: "#F8FAFC",
              border: "1px solid #E2E8F0",
              borderLeft: "4px solid #3244e6",
              boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5, flexWrap: "wrap", gap: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <SecurityIcon sx={{ color: "#3244e6", fontSize: "1.2rem" }} />
                <Typography sx={{ fontWeight: 700, fontSize: "0.85rem", color: "#1e293b", fontFamily: "Poppins" }}>
                  100% Secure & Confidential
                </Typography>
              </Box>
              <Chip
                icon={<CheckCircleIcon sx={{ fontSize: "14px !important", color: "#059669 !important" }} />}
                label="Soft Inquiry • Zero CIBIL Impact"
                size="small"
                sx={{
                  backgroundColor: "#ecfdf5",
                  color: "#059669",
                  fontWeight: 600,
                  fontSize: "0.72rem",
                  border: "1px solid #a7f3d0",
                  height: 24,
                }}
              />
            </Box>

            <FormControlLabel
              control={
                <Checkbox
                  checked={fetchCreditConsent}
                  onChange={(e) => {
                    setFetchCreditConsent(e.target.checked);
                    if (e.target.checked) {
                      setBankkaroStep4Errors((prev) => ({ ...prev, consent: "" }));
                    }
                  }}
                  sx={{ color: "#3244e6", alignSelf: "flex-start", mt: -0.5 }}
                />
              }
              label={
                <Typography sx={{ fontSize: "0.82rem", color: "#475569", lineHeight: 1.6 }}>
                  <strong>Consent Declaration:</strong> I authorize F2 Fintech & partner financial institutions (via BankKaro / Great.Cards Stateless BRE) to evaluate my credit bureau records with <strong>zero impact on my credit score</strong> for instant pre-approved personal loan offers.
                </Typography>
              }
            />
            {bankkaroStep4Errors.consent && (
              <FormHelperText error sx={{ ml: 4, mt: 0.5 }}>
                {bankkaroStep4Errors.consent}
              </FormHelperText>
            )}
          </Box>
        </Box>

        {/* Bottom Actions */}
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
            pt: 2.5,
            borderTop: "1px solid #F1F5F9",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Button
            onClick={handleBack}
            startIcon={<ArrowBackIcon />}
            sx={{
              fontFamily: "Poppins",
              fontSize: "0.95rem",
              color: "#64748b",
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "10px",
              px: 2.5,
              py: 1,
              "&:hover": {
                background: "rgba(50, 68, 230, 0.05)",
                color: "#3244e6",
              },
            }}
          >
            Go Back
          </Button>

          <Box sx={{ display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                component="img"
                src="/great-cards-logo.svg"
                alt="Great.Cards"
                sx={{ height: "16px", width: "auto", display: "block" }}
              />
              <Typography sx={{ fontSize: "0.75rem", color: "#64748b", fontFamily: "Poppins", fontWeight: 500 }}>
                Powered by BankKaro
              </Typography>
            </Box>

            <Button
              disabled={offersLoading || !inhandIncome || !pincode || !fetchCreditConsent}
              variant="contained"
              endIcon={offersLoading ? <CircularProgress size={18} color="inherit" /> : <ArrowForwardIcon />}
              onClick={handleBankKaroSubmit}
              sx={{
                background: "linear-gradient(135deg, #3244e6 0%, #1d2ebd 100%)",
                color: "white",
                fontWeight: 700,
                fontFamily: "Poppins",
                fontSize: "1rem",
                borderRadius: "12px",
                px: 5,
                py: 1.3,
                textTransform: "none",
                boxShadow: "0 8px 24px rgba(50, 68, 230, 0.25)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "linear-gradient(135deg, #1d2ebd 0%, #3244e6 100%)",
                  boxShadow: "0 12px 28px rgba(50, 68, 230, 0.35)",
                  transform: "translateY(-1px)",
                },
                "&.Mui-disabled": {
                  background: "#e2e8f0",
                  color: "#94a3b8",
                  boxShadow: "none",
                },
              }}
            >
              {offersLoading ? "Evaluating Offers..." : "Submit"}
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: 2,
      }}
    >
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: { xs: "1.5rem", md: "2rem" },
            color: "#3244e6",
            fontFamily: "Poppins",
            mb: 1,
          }}
        >
          Additional Details
        </Typography>
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontSize: "1.1rem",
            color: "rgba(0, 0, 0, 0.4)",
            fontWeight: 600,
          }}
        >
          Step 4 of 4
        </Typography>
      </Box>
      <Box
        sx={{
          width: { xs: "100%", md: "90%", lg: "85%" },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
          mb: 4,
        }}
      >
        <TextField
          autoComplete="off"
          fullWidth
          variant="outlined"
          type="number"
          name="amount"
          label="(Salary/Turnover) p.a*"
          placeholder="e.g. 10,00,000"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
            validateAmount(e.target.value);
          }}
          onBlur={() => validateAmount(amount)}
          error={!!errors.amount}
          helperText={errors.amount}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CurrencyRupeeIcon sx={{ color: "#3244e6" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "16px",
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              "& fieldset": { borderColor: "rgba(50, 68, 230, 0.2)" },
              "&:hover fieldset": { borderColor: "#3244e6" },
              "&.Mui-focused fieldset": { borderColor: "#3244e6", borderWidth: "1px" },
            },
            "& .MuiInputLabel-root": {
              color: "#555",
              fontWeight: 500,
              "&.Mui-focused": { color: "#3244e6" },
            },
          }}
        />
        <TextField
          autoComplete="off"
          fullWidth
          variant="outlined"
          name="emi"
          type="number"
          label="Existing Emi Amount"
          placeholder="e.g. 15,000"
          value={emi}
          onChange={(e) => {
            setEmi(e.target.value);
            validateEmi(e.target.value);
          }}
          onBlur={() => validateEmi(emi)}
          error={!!errors.emi}
          helperText={errors.emi}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CurrencyRupeeIcon sx={{ color: "#3244e6" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "16px",
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              "& fieldset": { borderColor: "rgba(50, 68, 230, 0.2)" },
              "&:hover fieldset": { borderColor: "#3244e6" },
              "&.Mui-focused fieldset": { borderColor: "#3244e6", borderWidth: "1px" },
            },
            "& .MuiInputLabel-root": {
              color: "#555",
              fontWeight: 500,
              "&.Mui-focused": { color: "#3244e6" },
            },
          }}
        />
        <Box sx={{ gridColumn: { md: "span 2" } }}>
          <TextField
            autoComplete="off"
            fullWidth
            variant="outlined"
            name="liability"
            type="number"
            label="Existing credit card liability"
            placeholder="e.g. 50,000"
            value={liability}
            onChange={(e) => {
              setLiability(e.target.value);
              validateLiability(e.target.value);
            }}
            onBlur={() => validateLiability(liability)}
            error={!!errors.liability}
            helperText={errors.liability}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CurrencyRupeeIcon sx={{ color: "#3244e6" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                "& fieldset": { borderColor: "rgba(50, 68, 230, 0.2)" },
                "&:hover fieldset": { borderColor: "#3244e6" },
                "&.Mui-focused fieldset": { borderColor: "#3244e6", borderWidth: "1px" },
              },
              "& .MuiInputLabel-root": {
                color: "#555",
                fontWeight: 500,
                "&.Mui-focused": { color: "#3244e6" },
              },
            }}
          />
        </Box>
      </Box>

      <Divider sx={{ width: "40vw" }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          background: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(50, 68, 230, 0.1)",
          p: 4,
          borderRadius: "24px",
          width: { xs: "100%", md: "90%", lg: "85%" },
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            borderColor: "rgba(50, 68, 230, 0.3)"
          }
        }}
      >
        <Typography
          sx={{
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "#3244e6",
            mb: 3,
            fontFamily: "Poppins"
          }}
        >
          Upload Required Documents
        </Typography>
        <IconButton
          ref={inputRef}
          component="label"
          sx={{
            color: "#3244e6",
            background: "rgba(50, 68, 230, 0.05)",
            p: 3,
            borderRadius: "16px",
            border: "1px dashed rgba(50, 68, 230, 0.4)",
            "&:hover": {
              background: "rgba(50, 68, 230, 0.1)",
              borderColor: "#3244e6"
            }
          }}
        >
          <AddPhotoAlternateIcon sx={{ fontSize: "3rem" }} />
          <input
            hidden
            multiple
            type="file"
            accept=".jpg, .gif, .png, .jpeg, .svg, .webp, application/pdf, .doc, .docx, .txt"
            onChange={(event) => {
              const newFiles = Array.from(event.target.files);

              // Calculate total files including the new selection
              const totalFiles = selectedFiles.length + newFiles.length;

              if (totalFiles > 4) {
                toastAndNavigate(
                  dispatch,
                  true,
                  "error",
                  "Maximum limit reached: 4 files"
                );
                return;
              }

              // Check file size limit (1MB)
              const filteredFiles = newFiles.filter((file) => {
                if (file.size > 10485760) {
                  toastAndNavigate(
                    dispatch,
                    true,
                    "error",
                    `${file.name} exceeds the 10MB limit`
                  );
                  return false;
                }
                return true;
              });

              // If there are no files left after filtering, return early
              if (filteredFiles.length === 0) return;

              setSelectedFiles((prevFiles) => [
                ...prevFiles,
                ...filteredFiles,
              ]);
            }}
          />
        </IconButton>

        {/* Display selected file names with delete icons */}
        {selectedFiles.length > 0 && (
          <Box sx={{ width: "100%", mt: 3 }}>
            {selectedFiles.map((file, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 1.5,
                  mb: 1.5,
                  backgroundColor: "white",
                  borderRadius: "16px",
                  border: "1px solid rgba(50, 68, 230, 0.1)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    transform: "scale(1.01)",
                    borderColor: "rgba(50, 68, 230, 0.3)",
                  }
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#3244e6"
                    }}
                  />
                  <Typography sx={{ fontSize: "0.95rem", color: "#3244e6", fontWeight: 600 }}>
                    {file.name}
                  </Typography>
                </Box>
                <IconButton
                  onClick={() => handleAttachmentDelete(index)}
                  sx={{
                    color: "#d32f2f",
                    "&:hover": { backgroundColor: "rgba(211, 47, 47, 0.08)" }
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 4,
          gap: 2
        }}
      >
        <Button
          onClick={handleBack}
          sx={{
            fontFamily: "Poppins",
            fontSize: "1rem",
            color: "rgba(0,0,0,0.5)",
            textTransform: "none",
            "&:hover": {
              background: "transparent",
              color: "#3244e6",
              textDecoration: "underline"
            },
            "&.Mui-disabled": {
              opacity: 0.3,
            },
          }}
          disabled={aadharUploadsSuccess || profileDetail}
        >
          Go Back
        </Button>
        <Button
          disabled={!!errors.amount || !amount || loading}
          variant="contained"
          onClick={create}
          sx={{
            background: "linear-gradient(135deg, #4E9FE5 0%, #3244e6 100%)",
            color: "white",
            fontWeight: 700,
            fontFamily: "Poppins",
            fontSize: "1.1rem",
            borderRadius: "12px",
            px: 6,
            py: 1.5,
            textTransform: "none",
            boxShadow: "0 8px 24px rgba(50, 68, 230, 0.3)",
            "&:hover": {
              transform: "translateY(-2px)",
              background: "linear-gradient(135deg, #3244e6 0%, #1a2bbd 100%)",
              boxShadow: "0 12px 32px rgba(50, 68, 230, 0.4)",
            },
            "&.Mui-disabled": {
              background: "#e0e0e0",
            }
          }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Complete Application"
          )}
        </Button>
      </Box>
    </Container>
  );
};

Step7Form.propTypes = {
  handleBack: PropTypes.func,
  aadharUploadsSuccess: PropTypes.bool,
  isBankKaroActive: PropTypes.bool,
  bankkaroFormData: PropTypes.object,
  setBankkaroFormData: PropTypes.func,
  applicationNumber: PropTypes.number,
  setApplicationNumber: PropTypes.func,
  setIsBankKaroResultsView: PropTypes.func,
};

export default Step7Form;
