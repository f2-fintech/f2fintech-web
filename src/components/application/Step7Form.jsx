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
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

import API from "../../apis";
import { Utility } from "../utility";

const Step7Form = ({
  handleBack,
  aadharUploadsSuccess,
  isBankKaroActive = false,
  bankkaroFormData = {},
  setBankkaroFormData,
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

    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          mt: 2,
          mb: 4,
          width: "100%",
        }}
      >
        {/* Results Header */}
        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            mb: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1, flexWrap: "wrap", justifyContent: "center" }}>
            <Box
              component="img"
              src="/great-cards-logo.svg"
              alt="Great.Cards"
              sx={{ height: "24px", width: "auto" }}
            />
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1.4rem", md: "1.8rem" },
                color: "#1e293b",
                fontFamily: "Poppins",
              }}
            >
              Eligible Pre-Approved Offers
            </Typography>
            <Chip
              label="Stateless Instant BRE"
              size="small"
              sx={{
                backgroundColor: "rgba(50, 68, 230, 0.1)",
                color: "#3244e6",
                fontWeight: 700,
                fontSize: "0.75rem",
                borderRadius: "6px",
              }}
            />
          </Box>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: "0.95rem",
              color: "#64748b",
              fontWeight: 500,
              maxWidth: "600px",
            }}
          >
            {offers.length > 0
              ? `Found ${offers.length} pre-approved offer${offers.length === 1 ? "" : "s"} ready for direct application with 0 impact on credit score.`
              : "No pre-approved offers matched your exact inputs at this time."}
          </Typography>
        </Box>

        {/* Offers Cards List */}
        {offers.length > 0 ? (
          <Box
            sx={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
              gap: 3,
              mb: 4,
            }}
          >
            {offers.map((offer, idx) => {
              const maxAmount = offer.loan_offered_upto || offer.max_loan_allowed;
              const emiVal = offer.monthly_installment ? Number(offer.monthly_installment).toLocaleString("en-IN") : null;
              const minRoi = offer.minimum_interest_rate ? `${offer.minimum_interest_rate}%` : offer.roi;
              const maxRoi = offer.maximum_interest_rate ? `${offer.maximum_interest_rate}%` : null;
              const roiDisplay = maxRoi ? `${minRoi} - ${maxRoi}` : minRoi || "Competitive";
              const feeDisplay = offer.processing_fees ? `₹${offer.processing_fees}` : offer.processingFees || "2%";

              return (
                <Box
                  key={offer.offer_id || idx}
                  sx={{
                    background: "white",
                    borderRadius: "20px",
                    border: "1px solid #E2E8F0",
                    p: 3,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "all 0.25s ease",
                    "&:hover": {
                      borderColor: "#3244e6",
                      boxShadow: "0 15px 30px -5px rgba(50, 68, 230, 0.15)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  {/* Card Top Row */}
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2.5 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      {offer.lender_image && (
                        <Box
                          component="img"
                          src={offer.lender_image}
                          alt={offer.lender_name}
                          sx={{
                            width: 44,
                            height: 44,
                            borderRadius: "10px",
                            objectFit: "contain",
                            border: "1px solid #f1f5f9",
                            p: 0.5,
                          }}
                        />
                      )}
                      <Box>
                        <Typography sx={{ fontWeight: 800, fontSize: "1.1rem", color: "#0f172a", fontFamily: "Poppins" }}>
                          {offer.lender_name}
                        </Typography>
                        <Typography sx={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 500 }}>
                          {offer.lender_category || "Fintech Lender"}
                        </Typography>
                      </Box>
                    </Box>
                    {offer.approval_text && (
                      <Chip
                        label={offer.approval_text}
                        size="small"
                        sx={{
                          backgroundColor: "#ecfdf5",
                          color: "#059669",
                          fontWeight: 700,
                          fontSize: "0.75rem",
                          borderRadius: "8px",
                          border: "1px solid #a7f3d0",
                        }}
                      />
                    )}
                  </Box>

                  {/* Primary Metrics Grid */}
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 2,
                      background: "#F8FAFC",
                      borderRadius: "14px",
                      p: 2,
                      mb: 2.5,
                    }}
                  >
                    <Box>
                      <Typography sx={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600 }}>
                        Offered Up To
                      </Typography>
                      <Typography sx={{ fontSize: "1.2rem", fontWeight: 800, color: "#3244e6", fontFamily: "Poppins" }}>
                        ₹{maxAmount ? Number(maxAmount).toLocaleString("en-IN") : "1,20,000"}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600 }}>
                        Tenure Range
                      </Typography>
                      <Typography sx={{ fontSize: "1rem", fontWeight: 700, color: "#1e293b", fontFamily: "Poppins" }}>
                        {offer.minimum_loan_tenure || 12} - {offer.maximum_loan_tenure || 48} Mos
                      </Typography>
                    </Box>
                    {emiVal && (
                      <Box>
                        <Typography sx={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600 }}>
                          Est. Monthly EMI
                        </Typography>
                        <Typography sx={{ fontSize: "0.95rem", fontWeight: 700, color: "#059669", fontFamily: "Poppins" }}>
                          ₹{emiVal}/mo
                        </Typography>
                      </Box>
                    )}
                    <Box>
                      <Typography sx={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600 }}>
                        Interest Rate
                      </Typography>
                      <Typography sx={{ fontSize: "0.95rem", fontWeight: 700, color: "#1e293b", fontFamily: "Poppins" }}>
                        {roiDisplay}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Secondary Details */}
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, px: 0.5 }}>
                    <Typography sx={{ fontSize: "0.78rem", color: "#64748b" }}>
                      Processing Fee: <strong style={{ color: "#334155" }}>{feeDisplay}</strong>
                    </Typography>
                    {offer.amount_you_will_get && (
                      <Typography sx={{ fontSize: "0.78rem", color: "#64748b" }}>
                        Disbursal: <strong style={{ color: "#334155" }}>₹{Number(offer.amount_you_will_get).toLocaleString("en-IN")}</strong>
                      </Typography>
                    )}
                  </Box>

                  {/* Loan Tags */}
                  {offer.loan_tags && offer.loan_tags.length > 0 && (
                    <Box sx={{ display: "flex", gap: 0.8, flexWrap: "wrap", mb: 2.5 }}>
                      {offer.loan_tags.map((tag) => (
                        <Chip
                          key={tag.id || tag.name}
                          label={tag.name}
                          size="small"
                          sx={{
                            fontSize: "0.7rem",
                            height: 22,
                            backgroundColor: "#f1f5f9",
                            color: "#475569",
                            borderRadius: "6px",
                          }}
                        />
                      ))}
                    </Box>
                  )}

                  {/* Direct Apply Action */}
                  <Button
                    variant="contained"
                    fullWidth
                    endIcon={<OpenInNewIcon />}
                    onClick={() => {
                      if (offer.redirect_url) {
                        window.open(offer.redirect_url, "_blank");
                      }
                    }}
                    sx={{
                      background: "linear-gradient(135deg, #3244e6 0%, #1d2ebd 100%)",
                      color: "white",
                      fontWeight: 700,
                      fontFamily: "Poppins",
                      borderRadius: "10px",
                      py: 1.2,
                      textTransform: "none",
                      boxShadow: "0 4px 14px rgba(50, 68, 230, 0.3)",
                      "&:hover": {
                        background: "linear-gradient(135deg, #1d2ebd 0%, #3244e6 100%)",
                      },
                    }}
                  >
                    Apply Directly with {offer.lender_name}
                  </Button>
                </Box>
              );
            })}
          </Box>
        ) : (
          <Alert severity="info" sx={{ width: "100%", mb: 4, borderRadius: "14px" }}>
            No lenders offered immediate pre-approval with these specific parameters. You can click <strong>Modify Details</strong> below to adjust your income, employer, or requested loan amount.
          </Alert>
        )}

        {/* Collapsible Ineligible Lenders */}
        {inEligible.length > 0 && (
          <Box sx={{ width: "100%", mb: 4 }}>
            <Accordion
              expanded={showIneligible}
              onChange={() => setShowIneligible(!showIneligible)}
              sx={{
                borderRadius: "14px !important",
                border: "1px solid #E2E8F0",
                boxShadow: "none",
                "&:before": { display: "none" },
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontWeight: 600, color: "#64748b", fontSize: "0.9rem" }}>
                  View Ineligible Lenders ({inEligible.length})
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                  {inEligible.map((rej, idx) => (
                    <Box
                      key={rej.lender_id || idx}
                      sx={{
                        p: 1.5,
                        borderRadius: "10px",
                        backgroundColor: "#fef2f2",
                        border: "1px solid #fecaca",
                      }}
                    >
                      <Typography sx={{ fontWeight: 700, fontSize: "0.85rem", color: "#991b1b" }}>
                        {rej.lender_name || `Lender #${rej.lender_id}`}
                      </Typography>
                      <Typography sx={{ fontSize: "0.8rem", color: "#b91c1c", mt: 0.3 }}>
                        {rej.rejectedReason || "Did not meet lender bureau eligibility criteria."}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
        )}

        {/* Footer Actions */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", gap: 2, flexWrap: "wrap" }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => setOffersResult(null)}
            sx={{
              fontFamily: "Poppins",
              fontWeight: 600,
              color: "#3244e6",
              textTransform: "none",
              borderRadius: "8px",
              px: 3,
              py: 1,
            }}
          >
            Modify Details
          </Button>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
            <Box
              component="img"
              src="/great-cards-logo.svg"
              alt="Great.Cards"
              sx={{ height: "15px", width: "auto" }}
            />
            <Typography sx={{ fontSize: "0.72rem", color: "#64748b", fontFamily: "Poppins", fontWeight: 500 }}>
              Powered by BankKaro
            </Typography>
          </Box>
        </Box>
      </Container>
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
};

export default Step7Form;
