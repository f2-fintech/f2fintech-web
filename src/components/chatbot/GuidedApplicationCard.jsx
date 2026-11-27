import { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Add,
  ArrowBack,
  ArrowForward,
  Assignment,
  Close,
  CurrencyRupee,
  Search,
  Security,
} from "@mui/icons-material";
import { ChatbotAPI } from "../../apis/ChatbotAPI";
import { axiosInstance } from "../../apis/config/axiosConfig";
import DocumentUploadCard from "./DocumentUploadCard";
import ApplicationReviewCard from "./ApplicationReviewCard";
import {
  AMOUNT_PRESETS,
  AUTO_DECIDE_PROVIDER,
  BUSINESS_ENTITY_OPTIONS,
  CASE_TYPE_OPTIONS,
  EMPLOYMENT_OPTIONS,
  INDIAN_STATES,
  LEAD_TYPE_OPTIONS,
  LOAN_TYPES_BY_CATEGORY,
  PREFIX_OPTIONS,
  TENURE_OPTIONS_BY_CATEGORY,
  calculateAgeYears,
  formatINR,
  getLoanCategoryFromType,
  getLoanTypeLabel,
  normalizeLoanTypeValue,
  normalizeTenureOption,
} from "./applicationFormConstants";

const STEPS_META = [
  { key: "amount", title: "Loan Amount", titleHi: "लोन राशि", draftStage: "category" },
  { key: "loan_type", title: "Loan Type", titleHi: "लोन प्रकार", draftStage: "category" },
  { key: "tenure", title: "Select Tenure", titleHi: "अवधि चुनें", draftStage: "loan_requirements" },
  { key: "providers", title: "Provider Name", titleHi: "लेंडर चुनें", draftStage: "loan_requirements" },
  { key: "loan_meta", title: "Case & Existing Loans", titleHi: "केस व मौजूदा लोन", draftStage: "loan_requirements" },
  { key: "personal_identity", title: "Personal Identity", titleHi: "व्यक्तिगत विवरण", draftStage: "personal" },
  { key: "personal_address", title: "Address & Employment", titleHi: "पता व रोज़गार", draftStage: "personal" },
  { key: "financial", title: "Financial Details", titleHi: "वित्तीय विवरण", draftStage: "financial" },
  { key: "documents", title: "Document Upload", titleHi: "दस्तावेज़ अपलोड", draftStage: "documents" },
  { key: "review", title: "Review & Submit", titleHi: "समीक्षा व सबमिट", draftStage: "review" },
];

const checkboxSx = {
  p: 0.35,
  color: "#94a3b8",
  "&.Mui-checked": { color: "#3244e6" },
  "&.Mui-disabled": { color: "#cbd5e1" },
};

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    bgcolor: "#ffffff",
    fontSize: "0.84rem",
    "& fieldset": { borderColor: "#cbd5e1" },
    "&:hover fieldset": { borderColor: "#3244e6" },
    "&.Mui-focused fieldset": { borderColor: "#3244e6", borderWidth: "1.5px" },
  },
  "& .MuiInputLabel-root": {
    fontSize: "0.82rem",
    color: "#475569",
    "&.Mui-focused": { color: "#3244e6" },
  },
};

function CheckboxChoiceCard({
  checked,
  label,
  sublabel,
  badge,
  disabled = false,
  onClick,
  compact = false,
}) {
  return (
    <Box
      component="label"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.85,
        px: compact ? 1 : 1.2,
        py: compact ? 0.7 : 0.85,
        borderRadius: 2,
        border: checked ? "1.5px solid #3244e6" : "1px solid #cbd5e1",
        bgcolor: disabled ? "#f8fafc" : checked ? "#eef2ff" : "#ffffff",
        opacity: disabled ? 0.55 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.16s ease",
        userSelect: "none",
        minWidth: 0,
        m: 0,
        "&:hover": !disabled
          ? {
              borderColor: "#3244e6",
              bgcolor: checked ? "#eef2ff" : "#f8faff",
            }
          : {},
      }}
    >
      <Checkbox
        size="small"
        checked={checked}
        disabled={disabled}
        onChange={() => !disabled && onClick()}
        sx={checkboxSx}
      />
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={0.5}>
          <Typography
            variant="caption"
            fontWeight={checked ? 700 : 600}
            color="#0f172a"
            sx={{ fontSize: compact ? "0.75rem" : "0.78rem", lineHeight: 1.25 }}
          >
            {label}
          </Typography>
          {badge && (
            <Chip
              size="small"
              label={badge}
              sx={{
                height: 18,
                fontSize: "0.62rem",
                fontWeight: 700,
                bgcolor: checked ? "#dbeafe" : "#f1f5f9",
                color: checked ? "#1d2ebd" : "#475569",
                flexShrink: 0,
              }}
            />
          )}
        </Stack>
        {sublabel && (
          <Typography
            variant="caption"
            color="#64748b"
            sx={{ display: "block", fontSize: "0.66rem", lineHeight: 1.2 }}
          >
            {sublabel}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

CheckboxChoiceCard.propTypes = {
  checked: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  sublabel: PropTypes.string,
  badge: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  compact: PropTypes.bool,
};

export default function GuidedApplicationCard({
  data,
  sessionId,
  language = "en",
  isCompact = false,
  onProgressUpdated,
}) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const cardRef = useRef(null);
  const [measuredWidth, setMeasuredWidth] = useState(0);

  const isHi = language === "hi";
  const compact = Boolean(
    isCompact || isSmallScreen || (measuredWidth > 0 && measuredWidth < 500)
  );

  const [stepIndex, setStepIndex] = useState(0);
  const [initializing, setInitializing] = useState(true);
  const [saving, setSaving] = useState(false);
  const [submitDone, setSubmitDone] = useState(false);
  const [serverError, setServerError] = useState("");
  const [duplicateWarning, setDuplicateWarning] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  // Catalog & Providers loaded from backend
  const [formConfigs, setFormConfigs] = useState([]);
  const [providersList, setProvidersList] = useState(() => {
    const initial = Array.isArray(data?.providers) ? data.providers : [];
    return initial.filter(
      (p) => p && p !== AUTO_DECIDE_PROVIDER && p !== "Apply with BankKaro"
    );
  });
  const [providerSearch, setProviderSearch] = useState("");

  // Step 1-5: Loan Request State (mirrors Step1Form.jsx)
  const [amount, setAmount] = useState("");
  const [loanType, setLoanType] = useState(() =>
    normalizeLoanTypeValue(data?.loanType || "")
  );
  const [tenure, setTenure] = useState("");
  const [selectedProviders, setSelectedProviders] = useState([]);
  const [providerAmounts, setProviderAmounts] = useState({});
  const [caseType, setCaseType] = useState("fresh");
  const [leadType, setLeadType] = useState("notion");
  const [hasRunningLoans, setHasRunningLoans] = useState("");
  const [existingLoans, setExistingLoans] = useState([
    { has_running_loans: "", which_loan: "", loan_amount: "", running_emi: "" },
  ]);

  // Step 6-7: Personal Details State (mirrors Step1Form.jsx + step1ValidationSchema.jsx)
  const [prefix, setPrefix] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [pan, setPan] = useState("");
  const [savedPanMask, setSavedPanMask] = useState("");
  const [dob, setDob] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");
  const [samePermanentAddr, setSamePermanentAddr] = useState(false);
  const [workingAddress, setWorkingAddress] = useState("");
  const [sameWorkingAddr, setSameWorkingAddr] = useState(false);
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [consentAccepted, setConsentAccepted] = useState(true);
  const [whatsappOptIn, setWhatsappOptIn] = useState(true);

  // Step 8: Financial & Category Details (mirrors Step7Form.jsx + formConfigSeedData.js)
  const [salary, setSalary] = useState("");
  const [existingEmi, setExistingEmi] = useState("");
  const [existingLiability, setExistingLiability] = useState("");
  const [company, setCompany] = useState("");
  const [businessEntityType, setBusinessEntityType] = useState("sole_proprietorship");
  const [gstNumber, setGstNumber] = useState("");
  const [degree, setDegree] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");

  // Step 9-10: Documents & Review
  const [documentChecklist, setDocumentChecklist] = useState(
    Array.isArray(data?.documentChecklist) ? data.documentChecklist : []
  );
  const [reviewData, setReviewData] = useState(null);

  const loanCategory = useMemo(() => getLoanCategoryFromType(loanType), [loanType]);
  const tenureOptions = useMemo(
    () => (loanCategory ? TENURE_OPTIONS_BY_CATEGORY[loanCategory] || [] : []),
    [loanCategory]
  );

  const activeConfig = useMemo(() => {
    const normalized = normalizeLoanTypeValue(loanType);
    return formConfigs.find((c) => c.loan_type === normalized) || null;
  }, [formConfigs, loanType]);

  const initialDataRef = useRef(data);

  // Keep ResizeObserver updated for fluid container adaptation
  useEffect(() => {
    const el = cardRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect?.width;
      if (width) setMeasuredWidth(width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Load full providers list, form configs, and hydrate active draft
  useEffect(() => {
    let cancelled = false;
    const seedData = initialDataRef.current;
    async function bootstrap() {
      setInitializing(true);
      try {
        const [cfgRes, provRes, revRes] = await Promise.allSettled([
          ChatbotAPI.getFormConfig("all"),
          axiosInstance.get("/get-all-loan-providers?page=1&limit=100"),
          sessionId ? ChatbotAPI.getApplicationReview(sessionId) : Promise.resolve(null),
        ]);

        if (cancelled) return;

        // 1. Form configs + chatbot providers
        const mergedNames = new Set(
          (Array.isArray(seedData?.providers) ? seedData.providers : []).filter(Boolean)
        );
        if (cfgRes.status === "fulfilled" && cfgRes.value) {
          if (Array.isArray(cfgRes.value.configs)) {
            setFormConfigs(cfgRes.value.configs);
          }
          for (const p of cfgRes.value.providers || []) {
            if (p?.title) mergedNames.add(String(p.title).trim());
          }
        }
        if (provRes.status === "fulfilled" && provRes.value?.data?.data?.rows) {
          for (const p of provRes.value.data.data.rows) {
            if (p?.title) mergedNames.add(String(p.title).trim());
          }
        }
        mergedNames.delete(AUTO_DECIDE_PROVIDER);
        mergedNames.delete("Apply with BankKaro");
        setProvidersList(Array.from(mergedNames).sort((a, b) => a.localeCompare(b)));

        // 2. Hydrate any existing draft fields safely
        const review = revRes.status === "fulfilled" ? revRes.value?.review : null;
        if (review) {
          setReviewData(review);
          if (Array.isArray(review.documents) && review.documents.length > 0) {
            setDocumentChecklist(review.documents);
          }

          const lr = review.loanRequirements || {};
          const pi = review.personalInfo || {};
          const ef = review.employmentAndFinancials || {};

          const hydratedLoanType = normalizeLoanTypeValue(lr.loan_type || seedData?.loanType || "");
          const hydratedCategory = getLoanCategoryFromType(hydratedLoanType);
          const hydratedAmt = lr.amount ? String(lr.amount) : "";
          const hydratedTenure = lr.tenure
            ? normalizeTenureOption(lr.tenure, hydratedCategory)
            : lr.tenure_months
              ? normalizeTenureOption(`${lr.tenure_months} months`, hydratedCategory)
              : "";
          const hydratedProviders = Array.isArray(lr.providers) ? lr.providers : [];

          if (hydratedAmt) setAmount(hydratedAmt);
          if (hydratedLoanType) setLoanType(hydratedLoanType);
          if (hydratedTenure) setTenure(hydratedTenure);
          if (hydratedProviders.length > 0) {
            setSelectedProviders(hydratedProviders);
            const amtMap = {};
            hydratedProviders.forEach((p) => {
              if (p !== AUTO_DECIDE_PROVIDER && hydratedAmt) amtMap[p] = hydratedAmt;
            });
            setProviderAmounts(amtMap);
          }
          if (lr.case_type) setCaseType(lr.case_type);

          if (Array.isArray(ef.existing_loans) && ef.existing_loans.length > 0) {
            const firstHas = ef.existing_loans[0]?.has_running_loans;
            const flag = firstHas === 1 || firstHas === "yes" ? "yes" : "no";
            setHasRunningLoans(flag);
            setExistingLoans(
              ef.existing_loans.map((l) => ({
                has_running_loans: l.has_running_loans === 1 || l.has_running_loans === "yes" ? "yes" : "no",
                which_loan: l.which_loan || "",
                loan_amount: l.loan_amount ? String(l.loan_amount) : "",
                running_emi: l.running_emi ? String(l.running_emi) : "",
              }))
            );
          }

          if (pi.prefix) setPrefix(pi.prefix);
          if (pi.name) setName(pi.name);
          if (pi.contact) setContact(pi.contact);
          if (pi.email) setEmail(pi.email);
          if (pi.panMasked) setSavedPanMask(pi.panMasked);
          if (pi.dob) setDob(String(pi.dob).slice(0, 10));
          if (pi.father_name) setFatherName(pi.father_name);
          if (pi.mother_name) setMotherName(pi.mother_name);
          if (pi.current_address) setCurrentAddress(pi.current_address);
          if (pi.permanent_address) setPermanentAddress(pi.permanent_address);
          if (pi.working_address) setWorkingAddress(pi.working_address);
          if (pi.city) setCity(pi.city);
          if (pi.state) setStateName(pi.state);
          if (ef.employment_type) setEmploymentType(ef.employment_type);

          if (ef.salary) setSalary(String(ef.salary));
          if (ef.existing_emi) setExistingEmi(String(ef.existing_emi));
          if (ef.existing_liability) setExistingLiability(String(ef.existing_liability));
          if (ef.company) setCompany(ef.company);
          if (ef.gst_number) setGstNumber(ef.gst_number);
          if (ef.degree) setDegree(ef.degree);
          if (ef.license_number) setLicenseNumber(ef.license_number);

          // Jump to first incomplete step ONLY in exact sequence
          const missP = review.missingPersonal || [];
          const missF = review.missingFinancial || [];
          const missD = review.missingDocuments || [];

          if (!hydratedAmt) setStepIndex(0);
          else if (!hydratedLoanType) setStepIndex(1);
          else if (!hydratedTenure) setStepIndex(2);
          else if (hydratedProviders.length === 0) setStepIndex(3);
          else if (missP.length > 0) setStepIndex(5);
          else if (missF.length > 0) setStepIndex(7);
          else if (missD.length > 0) setStepIndex(8);
          else if (review.isReadyForReview) setStepIndex(9);
        }
      } finally {
        if (!cancelled) setInitializing(false);
      }
    }

    bootstrap();
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  const scrollCardTop = () => {
    cardRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  const goToStep = (idx) => {
    setServerError("");
    setFieldErrors({});
    setStepIndex(idx);
    onProgressUpdated?.({
      loanType: loanType || data?.loanType,
      currentStep: STEPS_META[idx]?.draftStage || "category",
    });
    setTimeout(scrollCardTop, 50);
  };

  const clearError = (key) => {
    if (fieldErrors[key]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
    if (serverError) setServerError("");
  };

  const handleLoanTypeSelect = (val) => {
    const normalized = normalizeLoanTypeValue(val);
    setLoanType(normalized);
    clearError("loan_type");
    const nextCat = getLoanCategoryFromType(normalized);
    const validTenures = TENURE_OPTIONS_BY_CATEGORY[nextCat] || [];
    if (tenure && !validTenures.includes(tenure)) {
      setTenure("");
    }
  };

  const handleToggleProvider = (provName) => {
    clearError("providers");
    if (provName === AUTO_DECIDE_PROVIDER) {
      if (selectedProviders.includes(AUTO_DECIDE_PROVIDER)) {
        setSelectedProviders([]);
      } else {
        setSelectedProviders([AUTO_DECIDE_PROVIDER]);
        setProviderAmounts({});
      }
      return;
    }

    const withoutAuto = selectedProviders.filter((p) => p !== AUTO_DECIDE_PROVIDER);
    if (withoutAuto.includes(provName)) {
      const next = withoutAuto.filter((p) => p !== provName);
      setSelectedProviders(next);
      setProviderAmounts((prev) => {
        const copy = { ...prev };
        delete copy[provName];
        return copy;
      });
    } else {
      const next = [...withoutAuto, provName];
      setSelectedProviders(next);
      setProviderAmounts((prev) => ({
        ...prev,
        [provName]: prev[provName] || amount || "",
      }));
    }
  };

  const handleRunningLoansChoice = (choice) => {
    setHasRunningLoans(choice);
    clearError("has_running_loans");
    if (choice === "no") {
      setExistingLoans([
        { has_running_loans: "no", which_loan: "", loan_amount: "", running_emi: "" },
      ]);
    } else {
      setExistingLoans((prev) =>
        prev.map((l) => ({ ...l, has_running_loans: "yes" }))
      );
    }
  };

  const handleExistingLoanRowChange = (idx, field, val) => {
    setExistingLoans((prev) =>
      prev.map((row, i) => (i === idx ? { ...row, [field]: val } : row))
    );
    clearError(`existing_${idx}_${field}`);
  };

  const saveDraftFields = async (fields, nextStepIdx) => {
    if (!sessionId) {
      goToStep(nextStepIdx);
      return true;
    }
    setSaving(true);
    setServerError("");
    try {
      const res = await ChatbotAPI.updateApplicationDraft({ sessionId, fields });
      if (res?.duplicateWarning) {
        setDuplicateWarning(res.duplicateWarning);
      } else {
        setDuplicateWarning(null);
      }
      if (res?.progress) {
        if (Array.isArray(res.progress.documentChecklist)) {
          setDocumentChecklist(res.progress.documentChecklist);
        }
        onProgressUpdated?.({
          ...res.progress,
          currentStep: STEPS_META[nextStepIdx]?.draftStage || res.progress.currentStep,
        });
      }
      goToStep(nextStepIdx);
      return true;
    } catch (err) {
      const valErrors = err?.data?.validationErrors;
      if (valErrors && typeof valErrors === "object") {
        setFieldErrors((prev) => ({ ...prev, ...valErrors }));
        setServerError(
          isHi
            ? "कृपया चिह्नित फ़ील्ड में सही जानकारी दर्ज करें।"
            : "Please review the highlighted fields below."
        );
      } else {
        setServerError(err.message || "Could not save application step. Please try again.");
      }
      return false;
    } finally {
      setSaving(false);
    }
  };

  const validateAndAdvance = async () => {
    const errs = {};
    const stepKey = STEPS_META[stepIndex].key;

    if (stepKey === "amount") {
      const num = Number(amount);
      if (!amount || Number.isNaN(num)) {
        errs.amount = isHi ? "लोन राशि आवश्यक है" : "Loan amount is required";
      } else if (num < 50000 || num > 100000000) {
        errs.amount = isHi
          ? "राशि ₹50,000 से ₹10,00,00,000 के बीच होनी चाहिए"
          : "Amount must be within ₹50,000 and ₹10,00,00,000 (10 Cr)";
      }
      if (Object.keys(errs).length > 0) {
        setFieldErrors(errs);
        return;
      }
      // Keep providerAmounts synced if default wasn't customized
      if (!selectedProviders.includes(AUTO_DECIDE_PROVIDER)) {
        setProviderAmounts((prev) => {
          const updated = { ...prev };
          selectedProviders.forEach((p) => {
            if (!updated[p]) updated[p] = String(amount);
          });
          return updated;
        });
      }
      goToStep(1);
      return;
    }

    if (stepKey === "loan_type") {
      if (!loanType) {
        errs.loan_type = isHi ? "कृपया लोन प्रकार चुनें" : "Please select a loan type";
      }
      if (Object.keys(errs).length > 0) {
        setFieldErrors(errs);
        return;
      }
      goToStep(2);
      return;
    }

    if (stepKey === "tenure") {
      if (!tenure) {
        errs.tenure = isHi ? "कृपया लोन अवधि चुनें" : "Please select a loan tenure";
      }
      if (Object.keys(errs).length > 0) {
        setFieldErrors(errs);
        return;
      }
      goToStep(3);
      return;
    }

    if (stepKey === "providers") {
      if (selectedProviders.length === 0) {
        errs.providers = isHi
          ? "कम से कम एक लेंडर या ऑटो-चयन विकल्प चुनें"
          : "Please select at least one provider";
      } else if (!selectedProviders.includes(AUTO_DECIDE_PROVIDER)) {
        for (const p of selectedProviders) {
          const pAmt = Number(providerAmounts[p] || amount);
          if (!pAmt || Number.isNaN(pAmt) || pAmt < 50000 || pAmt > 100000000) {
            errs.providers = `Invalid amount for ${p} (must be ₹50,000 – ₹10 Cr)`;
            break;
          }
        }
      }
      if (Object.keys(errs).length > 0) {
        setFieldErrors(errs);
        return;
      }
      goToStep(4);
      return;
    }

    if (stepKey === "loan_meta") {
      if (!caseType) errs.case_type = "Please select Case Type";
      if (!leadType) errs.lead_type = "Please select Lead Type";
      if (!hasRunningLoans) {
        errs.has_running_loans = isHi
          ? "कृपया बताएं कि क्या आपका कोई मौजूदा लोन चल रहा है"
          : "Please choose Yes or No for existing running loans";
      } else if (hasRunningLoans === "yes") {
        existingLoans.forEach((loan, idx) => {
          if (!loan.which_loan) errs[`existing_${idx}_which_loan`] = "Required";
          const outAmt = Number(loan.loan_amount);
          if (!loan.loan_amount || Number.isNaN(outAmt) || outAmt <= 0) {
            errs[`existing_${idx}_loan_amount`] = "Enter valid amount > 0";
          }
          if (loan.running_emi && (Number.isNaN(Number(loan.running_emi)) || Number(loan.running_emi) < 0)) {
            errs[`existing_${idx}_running_emi`] = "Invalid EMI";
          }
        });
      }
      if (Object.keys(errs).length > 0) {
        setFieldErrors(errs);
        return;
      }

      // Auto-prefill existing_emi on Step 8 if user specified running EMIs
      if (hasRunningLoans === "yes" && !existingEmi) {
        const summedEmi = existingLoans.reduce(
          (sum, l) => sum + (Number(l.running_emi) || 0),
          0
        );
        if (summedEmi > 0) setExistingEmi(String(summedEmi));
      }

      const customAmountsPayload = {};
      if (!selectedProviders.includes(AUTO_DECIDE_PROVIDER)) {
        selectedProviders.forEach((p) => {
          customAmountsPayload[p] = Number(providerAmounts[p] || amount);
        });
      }

      await saveDraftFields(
        {
          amount: Number(amount),
          loan_type: loanType,
          tenure,
          providers: selectedProviders,
          provider_amounts: customAmountsPayload,
          case_type: caseType,
          lead_type: leadType,
          existing_loans: existingLoans.map((l) => ({
            has_running_loans: hasRunningLoans,
            which_loan: hasRunningLoans === "yes" ? l.which_loan : "",
            loan_amount: hasRunningLoans === "yes" ? l.loan_amount : "",
            running_emi: hasRunningLoans === "yes" ? l.running_emi : "",
          })),
        },
        5
      );
      return;
    }

    if (stepKey === "personal_identity") {
      if (!prefix) errs.prefix = "Select a title / prefix";
      const cleanName = name.trim();
      if (!cleanName || cleanName.length < 2 || cleanName.length > 40 || !/^[a-zA-Z\s]+$/.test(cleanName)) {
        errs.name = "Full name must be 2–40 alphabetic characters";
      }
      if (!/^[6-9]\d{9}$/.test(contact.trim())) {
        errs.contact = "Enter valid 10-digit Indian mobile number";
      }
      if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(email.trim())) {
        errs.email = "Enter a valid email address";
      }
      const cleanPan = pan.trim().toUpperCase();
      if (!cleanPan && !savedPanMask) {
        errs.pan = "PAN card number is required";
      } else if (cleanPan && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(cleanPan)) {
        errs.pan = "PAN must match format ABCDE1234F";
      }
      const age = calculateAgeYears(dob);
      if (!dob || age === null) {
        errs.dob = "Date of Birth is required";
      } else if (age < 20) {
        errs.dob = "Minimum age 20 years required";
      }
      const cleanFather = fatherName.trim();
      if (!cleanFather || cleanFather.length < 2 || cleanFather.length > 40 || !/^[a-zA-Z\s]+$/.test(cleanFather)) {
        errs.father_name = "Father's name must be 2–40 letters";
      }
      const cleanMother = motherName.trim();
      if (!cleanMother || cleanMother.length < 2 || cleanMother.length > 40 || !/^[a-zA-Z\s]+$/.test(cleanMother)) {
        errs.mother_name = "Mother's name must be 2–40 letters";
      }

      if (Object.keys(errs).length > 0) {
        setFieldErrors(errs);
        return;
      }
      goToStep(6);
      return;
    }

    if (stepKey === "personal_address") {
      const curAddr = currentAddress.trim();
      const permAddr = (samePermanentAddr ? currentAddress : permanentAddress).trim();
      const workAddr = (sameWorkingAddr ? currentAddress : workingAddress).trim();

      if (curAddr.length < 10 || curAddr.length > 240) {
        errs.current_address = "Current address must be 10–240 characters";
      }
      if (permAddr.length < 10 || permAddr.length > 240) {
        errs.permanent_address = "Permanent address must be 10–240 characters";
      }
      if (workAddr.length < 10 || workAddr.length > 240) {
        errs.working_address = "Working address must be 10–240 characters";
      }
      const cleanCity = city.trim();
      if (cleanCity.length < 2 || cleanCity.length > 30 || !/^[a-zA-Z\s]+$/.test(cleanCity)) {
        errs.city = "City must be 2–30 alphabetic characters";
      }
      if (!stateName) errs.state = "Please select your state";
      if (!employmentType) errs.employment_type = "Please select employment type";
      if (!consentAccepted) errs.consent = "Please accept the F2 Fintech Terms & Privacy Policy";

      if (Object.keys(errs).length > 0) {
        setFieldErrors(errs);
        return;
      }

      const personalPayload = {
        prefix,
        name: name.trim(),
        contact: contact.trim(),
        email: email.trim().toLowerCase(),
        dob,
        father_name: fatherName.trim(),
        mother_name: motherName.trim(),
        current_address: curAddr,
        permanent_address: permAddr,
        working_address: workAddr,
        city: cleanCity,
        state: stateName,
        employment_type: employmentType,
        whatsapp_consent: whatsappOptIn,
      };
      if (pan.trim()) {
        personalPayload.pan = pan.trim().toUpperCase();
      }

      await saveDraftFields(personalPayload, 7);
      return;
    }

    if (stepKey === "financial") {
      const salNum = Number(salary);
      if (!salary || Number.isNaN(salNum) || salNum < 50000 || salNum > 1000000000) {
        errs.salary = "Annual salary / turnover must be between ₹50,000 and ₹100 Cr";
      }
      if (existingEmi && (Number.isNaN(Number(existingEmi)) || Number(existingEmi) < 0)) {
        errs.existing_emi = "Existing EMI cannot be negative";
      }
      if (existingLiability && (Number.isNaN(Number(existingLiability)) || Number(existingLiability) < 0)) {
        errs.existing_liability = "Liability cannot be negative";
      }
      if (loanType === "business loan" && company.trim().length < 2) {
        errs.company = "Business / Entity Name is required for Business Loans";
      }
      if ((loanType === "professional loan" || loanType === "doctor") && degree.trim().length < 2) {
        errs.degree = "Qualification degree is required";
      }
      if ((loanType === "professional loan" || loanType === "doctor") && licenseNumber.trim().length < 2) {
        errs.license_number = "Registration / license number is required";
      }

      if (Object.keys(errs).length > 0) {
        setFieldErrors(errs);
        return;
      }

      const finPayload = {
        salary: salNum,
        existing_emi: existingEmi ? Number(existingEmi) : 0,
        existing_liability: existingLiability ? Number(existingLiability) : 0,
      };
      if (company.trim()) finPayload.company = company.trim();
      if (loanType === "business loan") {
        finPayload.business_entity_type = businessEntityType;
        if (gstNumber.trim()) finPayload.gst_number = gstNumber.trim().toUpperCase();
      }
      if (loanType === "professional loan" || loanType === "doctor") {
        finPayload.degree = degree.trim();
        finPayload.license_number = licenseNumber.trim();
      }

      await saveDraftFields(finPayload, 8);
    }
  };

  const handleProceedToReview = async () => {
    setSaving(true);
    setServerError("");
    try {
      if (sessionId) {
        const res = await ChatbotAPI.getApplicationReview(sessionId);
        if (res?.review) {
          setReviewData(res.review);
        }
      }
      goToStep(9);
    } catch (err) {
      setServerError(err.message || "Could not load application review.");
    } finally {
      setSaving(false);
    }
  };

  const currentMeta = STEPS_META[stepIndex];
  const progressPct = Math.round(((stepIndex + 1) / STEPS_META.length) * 100);
  const filteredProviders = useMemo(() => {
    const q = providerSearch.trim().toLowerCase();
    if (!q) return providersList;
    return providersList.filter((p) => p.toLowerCase().includes(q));
  }, [providersList, providerSearch]);

  const maxDobStr = useMemo(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 20);
    return d.toISOString().slice(0, 10);
  }, []);

  if (initializing) {
    return (
      <Paper
        ref={cardRef}
        elevation={0}
        sx={{
          p: 2.5,
          mt: 1,
          borderRadius: 3,
          border: "1px solid #dbeafe",
          bgcolor: "#ffffff",
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <CircularProgress size={18} sx={{ color: "#3244e6" }} />
        <Typography variant="caption" fontWeight={600} color="#475569">
          {isHi ? "आवेदन फ़ॉर्म तैयार किया जा रहा है..." : "Preparing your guided loan application..."}
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      ref={cardRef}
      elevation={0}
      sx={{
        mt: 1,
        borderRadius: 3,
        overflow: "hidden",
        border: "1px solid #c7d2fe",
        bgcolor: "#ffffff",
        boxShadow: "0 6px 24px rgba(29, 46, 189, 0.08)",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: compact ? 1.5 : 2,
          py: compact ? 1.15 : 1.35,
          background: "linear-gradient(135deg, #f8faff 0%, #eef2ff 100%)",
          borderBottom: "1px solid #e0e7ff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Stack direction="row" spacing={1.1} alignItems="center" sx={{ minWidth: 0 }}>
          <Box
            sx={{
              width: compact ? 30 : 34,
              height: compact ? 30 : 34,
              borderRadius: 2,
              background: "linear-gradient(135deg, #1d2ebd 0%, #3244e6 100%)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 4px 10px rgba(50, 68, 230, 0.25)",
            }}
          >
            <Assignment sx={{ fontSize: compact ? 17 : 19 }} />
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="subtitle2"
              fontWeight={700}
              color="#0f172a"
              sx={{ fontSize: compact ? "0.82rem" : "0.9rem", lineHeight: 1.25 }}
            >
              {isHi ? currentMeta.titleHi : currentMeta.title}
            </Typography>
            <Typography
              variant="caption"
              color="#64748b"
              sx={{ display: "block", fontSize: "0.66rem", lineHeight: 1.2 }}
              noWrap
            >
              {isHi
                ? `चरण ${stepIndex + 1} / ${STEPS_META.length} • सत्यापित लोन आवेदन`
                : `Step ${stepIndex + 1} of ${STEPS_META.length} • Official Loan Application`}
            </Typography>
          </Box>
        </Stack>

        <Chip
          size="small"
          label={submitDone ? (isHi ? "सबमिट" : "Submitted") : `${progressPct}%`}
          sx={{
            height: 22,
            bgcolor: submitDone ? "#dcfce7" : "#ffffff",
            border: submitDone ? "1px solid #86efac" : "1px solid #c7d2fe",
            color: submitDone ? "#047857" : "#1d2ebd",
            fontWeight: 700,
            fontSize: "0.68rem",
            flexShrink: 0,
          }}
        />
      </Box>

      {/* Progress Bar */}
      <LinearProgress
        variant={saving ? "indeterminate" : "determinate"}
        value={progressPct}
        sx={{
          height: 3.5,
          bgcolor: "#e0e7ff",
          "& .MuiLinearProgress-bar": { bgcolor: submitDone ? "#10b981" : "#3244e6" },
        }}
      />

      {/* Quick Summary Pills of Completed Choices */}
      {!submitDone && (amount || loanType || tenure || selectedProviders.length > 0) && stepIndex > 0 && (
        <Box
          sx={{
            px: compact ? 1.5 : 2,
            py: 0.9,
            bgcolor: "#f8fafc",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            flexWrap: "wrap",
            gap: 0.6,
          }}
        >
          {amount && Number(amount) >= 50000 && (
            <Chip
              size="small"
              clickable
              onClick={() => goToStep(0)}
              label={formatINR(amount)}
              sx={{
                height: 22,
                fontSize: "0.68rem",
                fontWeight: 700,
                bgcolor: "#eef2ff",
                color: "#1d2ebd",
              }}
            />
          )}
          {loanType && (
            <Chip
              size="small"
              clickable
              onClick={() => goToStep(1)}
              label={`${getLoanTypeLabel(loanType, language)} (${loanCategory === "secured" ? "Secured" : "Unsecured"})`}
              sx={{
                height: 22,
                fontSize: "0.68rem",
                fontWeight: 600,
                bgcolor: "#ffffff",
                border: "1px solid #cbd5e1",
                color: "#0f172a",
              }}
            />
          )}
          {tenure && (
            <Chip
              size="small"
              clickable
              onClick={() => goToStep(2)}
              label={tenure}
              sx={{
                height: 22,
                fontSize: "0.68rem",
                fontWeight: 600,
                bgcolor: "#ffffff",
                border: "1px solid #cbd5e1",
                color: "#0f172a",
              }}
            />
          )}
          {selectedProviders.length > 0 && (
            <Chip
              size="small"
              clickable
              onClick={() => goToStep(3)}
              label={
                selectedProviders[0] === AUTO_DECIDE_PROVIDER
                  ? "F2 Auto-Match"
                  : selectedProviders.length === 1
                    ? selectedProviders[0]
                    : `${selectedProviders[0]} +${selectedProviders.length - 1}`
              }
              sx={{
                height: 22,
                fontSize: "0.68rem",
                fontWeight: 600,
                bgcolor: "#ecfdf5",
                border: "1px solid #a7f3d0",
                color: "#047857",
              }}
            />
          )}
        </Box>
      )}

      <Box sx={{ p: compact ? 1.5 : 2 }}>
        {duplicateWarning && (
          <Alert severity="warning" sx={{ mb: 1.5, borderRadius: 2, py: 0.5, fontSize: "0.76rem" }}>
            {duplicateWarning.message}
          </Alert>
        )}

        {serverError && (
          <Alert severity="error" sx={{ mb: 1.5, borderRadius: 2, py: 0.5, fontSize: "0.76rem" }}>
            {serverError}
          </Alert>
        )}

        {/* STEP 1: LOAN AMOUNT */}
        {currentMeta.key === "amount" && (
          <Stack spacing={1.5}>
            <Typography variant="body2" fontWeight={600} color="#1e293b" sx={{ fontSize: "0.84rem" }}>
              {isHi
                ? "आपको कितनी लोन राशि की आवश्यकता है? (न्यूनतम ₹50,000 से ₹10 करोड़)"
                : "How much loan amount do you require?"}
            </Typography>

            <TextField
              fullWidth
              type="number"
              size="small"
              label={isHi ? "आवश्यक लोन राशि*" : "Loan Amount Required*"}
              placeholder="e.g. 500000"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                clearError("amount");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  validateAndAdvance();
                }
              }}
              error={Boolean(fieldErrors.amount)}
              helperText={
                fieldErrors.amount ||
                (amount && Number(amount) >= 50000
                  ? `${formatINR(amount)} (Range: ₹50,000 – ₹10 Cr)`
                  : "Allowed range: ₹50,000 to ₹10,00,00,000")
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CurrencyRupee sx={{ color: "#3244e6", fontSize: 18 }} />
                  </InputAdornment>
                ),
              }}
              sx={inputSx}
            />

            <Box>
              <Typography variant="caption" color="#64748b" fontWeight={600} sx={{ display: "block", mb: 0.7 }}>
                {isHi ? "त्वरित विकल्प चुनें:" : "Quick Amount Presets:"}
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.7 }}>
                {AMOUNT_PRESETS.map((preset) => {
                  const selected = String(amount) === preset.value;
                  return (
                    <Button
                      key={preset.value}
                      size="small"
                      variant={selected ? "contained" : "outlined"}
                      onClick={() => {
                        setAmount(preset.value);
                        clearError("amount");
                      }}
                      sx={{
                        minWidth: "auto",
                        px: 1.25,
                        py: 0.35,
                        borderRadius: 99,
                        textTransform: "none",
                        fontWeight: 700,
                        fontSize: "0.73rem",
                        bgcolor: selected ? "#3244e6" : "#f1f5f9",
                        color: selected ? "#ffffff" : "#1e293b",
                        borderColor: selected ? "#1d2ebd" : "#cbd5e1",
                        boxShadow: "none",
                        "&:hover": {
                          bgcolor: selected ? "#1d2ebd" : "#e0e7ff",
                          borderColor: "#3244e6",
                          color: selected ? "#ffffff" : "#1d2ebd",
                          boxShadow: "none",
                        },
                      }}
                    >
                      {preset.label}
                    </Button>
                  );
                })}
              </Box>
            </Box>
          </Stack>
        )}

        {/* STEP 2: LOAN TYPE (SECURED & UNSECURED CHECKBOXES) */}
        {currentMeta.key === "loan_type" && (
          <Stack spacing={1.5}>
            <Typography variant="body2" fontWeight={600} color="#1e293b" sx={{ fontSize: "0.84rem" }}>
              {isHi
                ? "कृपया सिक्योर्ड या अनसिक्योर्ड श्रेणी में से लोन प्रकार चुनें:"
                : "Select your Loan Type (categorized by Unsecured & Secured loans):"}
            </Typography>

            <Box>
              <Stack direction="row" spacing={0.8} alignItems="center" sx={{ mb: 0.8 }}>
                <Chip
                  size="small"
                  label={isHi ? "अनसिक्योर्ड लोन (बिना गारंटी)" : "Unsecured Loans"}
                  sx={{ height: 20, fontSize: "0.68rem", fontWeight: 700, bgcolor: "#eef2ff", color: "#1d2ebd" }}
                />
                <Typography variant="caption" color="#64748b" sx={{ fontSize: "0.68rem" }}>
                  No collateral • 1–8 yrs
                </Typography>
              </Stack>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: compact ? "1fr" : "repeat(2, minmax(0, 1fr))",
                  gap: 0.85,
                }}
              >
                {LOAN_TYPES_BY_CATEGORY.unsecured.map((lt) => (
                  <CheckboxChoiceCard
                    key={lt.value}
                    checked={loanType === lt.value}
                    label={isHi ? lt.labelHi : lt.label}
                    compact={compact}
                    onClick={() => handleLoanTypeSelect(lt.value)}
                  />
                ))}
              </Box>
            </Box>

            <Box>
              <Stack direction="row" spacing={0.8} alignItems="center" sx={{ mb: 0.8 }}>
                <Chip
                  size="small"
                  label={isHi ? "सिक्योर्ड लोन (संपत्ति/वाहन आधार)" : "Secured Loans"}
                  sx={{ height: 20, fontSize: "0.68rem", fontWeight: 700, bgcolor: "#ecfdf5", color: "#047857" }}
                />
                <Typography variant="caption" color="#64748b" sx={{ fontSize: "0.68rem" }}>
                  Asset-backed • 5–30 yrs
                </Typography>
              </Stack>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: compact ? "1fr" : "repeat(2, minmax(0, 1fr))",
                  gap: 0.85,
                }}
              >
                {LOAN_TYPES_BY_CATEGORY.secured.map((lt) => (
                  <CheckboxChoiceCard
                    key={lt.value}
                    checked={loanType === lt.value}
                    label={isHi ? lt.labelHi : lt.label}
                    compact={compact}
                    onClick={() => handleLoanTypeSelect(lt.value)}
                  />
                ))}
              </Box>
            </Box>

            {fieldErrors.loan_type && (
              <FormHelperText error sx={{ fontWeight: 600 }}>
                {fieldErrors.loan_type}
              </FormHelperText>
            )}
          </Stack>
        )}

        {/* STEP 3: TENURE BASED ON LOAN TYPE */}
        {currentMeta.key === "tenure" && (
          <Stack spacing={1.4}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={0.8}>
              <Typography variant="body2" fontWeight={600} color="#1e293b" sx={{ fontSize: "0.84rem" }}>
                {isHi
                  ? `${getLoanTypeLabel(loanType, language)} के लिए सुविधाजनक अवधि चुनें:`
                  : `Select a comfortable tenure for your ${getLoanTypeLabel(loanType, language)}:`}
              </Typography>
              <Chip
                size="small"
                label={
                  loanCategory === "secured"
                    ? "Secured • Long Term"
                    : "Unsecured • Short Term"
                }
                sx={{
                  height: 20,
                  fontSize: "0.66rem",
                  fontWeight: 700,
                  bgcolor: loanCategory === "secured" ? "#ecfdf5" : "#eef2ff",
                  color: loanCategory === "secured" ? "#047857" : "#1d2ebd",
                }}
              />
            </Stack>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: compact
                  ? "repeat(2, minmax(0, 1fr))"
                  : "repeat(4, minmax(0, 1fr))",
                gap: 0.85,
              }}
            >
              {tenureOptions.map((opt) => (
                <CheckboxChoiceCard
                  key={opt}
                  checked={tenure === opt}
                  label={opt}
                  compact={compact}
                  onClick={() => {
                    setTenure(opt);
                    clearError("tenure");
                  }}
                />
              ))}
            </Box>

            {fieldErrors.tenure && (
              <FormHelperText error sx={{ fontWeight: 600 }}>
                {fieldErrors.tenure}
              </FormHelperText>
            )}
          </Stack>
        )}

        {/* STEP 4: PROVIDERS (MULTI-SELECT CHECKBOXES + PER-PROVIDER AMOUNTS) */}
        {currentMeta.key === "providers" && (
          <Stack spacing={1.25}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={0.5}>
              <Typography variant="body2" fontWeight={600} color="#1e293b" sx={{ fontSize: "0.84rem" }}>
                {isHi
                  ? "पसंदीदा बैंक / NBFC चुनें (एक या अधिक चेक करें):"
                  : "Select Lending Partners (Check one or multiple):"}
              </Typography>
              {selectedProviders.length > 0 && (
                <Chip
                  size="small"
                  label={`${selectedProviders.length} selected`}
                  sx={{ height: 20, fontSize: "0.66rem", fontWeight: 700, bgcolor: "#eef2ff", color: "#1d2ebd" }}
                />
              )}
            </Stack>

            {/* Exclusive Smart-Match Option */}
            <CheckboxChoiceCard
              checked={selectedProviders.includes(AUTO_DECIDE_PROVIDER)}
              label={AUTO_DECIDE_PROVIDER}
              sublabel={
                isHi
                  ? "F2Fintech आपके प्रोफ़ाइल के अनुसार सबसे सही लेंडर चुनेगा"
                  : "Recommended if you want F2 Fintech advisors to match the best lender"
              }
              badge="Recommended"
              compact={compact}
              onClick={() => handleToggleProvider(AUTO_DECIDE_PROVIDER)}
            />

            {/* Search filter for providers */}
            {providersList.length > 6 && (
              <TextField
                fullWidth
                size="small"
                placeholder={isHi ? "बैंक या NBFC खोजें..." : "Search bank or NBFC..."}
                value={providerSearch}
                onChange={(e) => setProviderSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ fontSize: 17, color: "#64748b" }} />
                    </InputAdornment>
                  ),
                }}
                sx={inputSx}
              />
            )}

            {/* All Lending Partners Checkboxes */}
            <Box
              sx={{
                maxHeight: 225,
                overflowY: "auto",
                p: 1,
                borderRadius: 2,
                border: "1px solid #e2e8f0",
                bgcolor: "#f8fafc",
                display: "grid",
                gridTemplateColumns: compact ? "1fr" : "repeat(2, minmax(0, 1fr))",
                gap: 0.8,
              }}
            >
              {filteredProviders.map((provName) => {
                const isAuto = selectedProviders.includes(AUTO_DECIDE_PROVIDER);
                return (
                  <CheckboxChoiceCard
                    key={provName}
                    checked={selectedProviders.includes(provName)}
                    disabled={isAuto}
                    label={provName}
                    compact={compact}
                    onClick={() => handleToggleProvider(provName)}
                  />
                );
              })}
              {filteredProviders.length === 0 && (
                <Typography variant="caption" color="#64748b" sx={{ p: 1 }}>
                  No matching providers found.
                </Typography>
              )}
            </Box>

            {/* Per-Provider Amount Customization (matches Step1Form.jsx) */}
            {selectedProviders.length > 0 &&
              !selectedProviders.includes(AUTO_DECIDE_PROVIDER) && (
                <Box
                  sx={{
                    p: 1.2,
                    borderRadius: 2,
                    bgcolor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <Typography variant="caption" fontWeight={700} color="#1d2ebd" sx={{ display: "block", mb: 0.8 }}>
                    {isHi ? "प्रत्येक लेंडर के लिए लोन राशि (वैकल्पिक बदलाव):" : "Loan Amount per Selected Provider:"}
                  </Typography>
                  <Stack spacing={0.8}>
                    {selectedProviders.map((prov) => (
                      <Stack
                        key={prov}
                        direction={compact ? "column" : "row"}
                        justifyContent="space-between"
                        alignItems={compact ? "stretch" : "center"}
                        spacing={1}
                        sx={{ p: 0.8, bgcolor: "#ffffff", borderRadius: 1.5, border: "1px solid #e2e8f0" }}
                      >
                        <Typography variant="caption" fontWeight={600} color="#0f172a">
                          {prov}
                        </Typography>
                        <TextField
                          size="small"
                          type="number"
                          value={providerAmounts[prov] ?? amount}
                          onChange={(e) => {
                            clearError("providers");
                            setProviderAmounts((prev) => ({ ...prev, [prov]: e.target.value }));
                          }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <CurrencyRupee sx={{ fontSize: 14, color: "#3244e6" }} />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            ...inputSx,
                            width: compact ? "100%" : 155,
                            "& input": { py: 0.6, fontSize: "0.78rem", fontWeight: 700 },
                          }}
                        />
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              )}

            {fieldErrors.providers && (
              <FormHelperText error sx={{ fontWeight: 600 }}>
                {fieldErrors.providers}
              </FormHelperText>
            )}
          </Stack>
        )}

        {/* STEP 5: CASE TYPE, LEAD SOURCE & EXISTING LOANS */}
        {currentMeta.key === "loan_meta" && (
          <Stack spacing={1.5}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: compact ? "1fr" : "repeat(2, minmax(0, 1fr))",
                gap: 1.2,
              }}
            >
              <Box>
                <Typography variant="caption" fontWeight={700} color="#334155" sx={{ display: "block", mb: 0.6 }}>
                  {isHi ? "केस प्रकार*" : "Case Type*"}
                </Typography>
                <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 0.8 }}>
                  {CASE_TYPE_OPTIONS.map((ct) => (
                    <CheckboxChoiceCard
                      key={ct.value}
                      checked={caseType === ct.value}
                      label={ct.label}
                      sublabel={ct.desc}
                      compact={compact}
                      onClick={() => {
                        setCaseType(ct.value);
                        clearError("case_type");
                      }}
                    />
                  ))}
                </Box>
                {fieldErrors.case_type && <FormHelperText error>{fieldErrors.case_type}</FormHelperText>}
              </Box>

              <Box>
                <Typography variant="caption" fontWeight={700} color="#334155" sx={{ display: "block", mb: 0.6 }}>
                  {isHi ? "लीड स्रोत*" : "Lead Source / Type*"}
                </Typography>
                <FormControl fullWidth size="small" error={Boolean(fieldErrors.lead_type)}>
                  <Select
                    value={leadType}
                    onChange={(e) => {
                      setLeadType(e.target.value);
                      clearError("lead_type");
                    }}
                    sx={{ borderRadius: 2, bgcolor: "#ffffff", fontSize: "0.84rem" }}
                  >
                    {LEAD_TYPE_OPTIONS.map((lt) => (
                      <MenuItem key={lt.value} value={lt.value} sx={{ fontSize: "0.84rem" }}>
                        {lt.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <Box>
              <Typography variant="caption" fontWeight={700} color="#334155" sx={{ display: "block", mb: 0.7 }}>
                {isHi ? "क्या आपका पहले से कोई लोन चल रहा है?*" : "Do you have any existing running loans?*"}
              </Typography>
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 0.9 }}>
                <CheckboxChoiceCard
                  checked={hasRunningLoans === "no"}
                  label={isHi ? "नहीं (कोई मौजूदा लोन नहीं)" : "No Running Loans"}
                  compact={compact}
                  onClick={() => handleRunningLoansChoice("no")}
                />
                <CheckboxChoiceCard
                  checked={hasRunningLoans === "yes"}
                  label={isHi ? "हाँ (मौजूदा लोन है)" : "Yes, I have Running Loans"}
                  compact={compact}
                  onClick={() => handleRunningLoansChoice("yes")}
                />
              </Box>
              {fieldErrors.has_running_loans && (
                <FormHelperText error sx={{ fontWeight: 600 }}>
                  {fieldErrors.has_running_loans}
                </FormHelperText>
              )}
            </Box>

            {hasRunningLoans === "yes" && (
              <Stack spacing={1.1}>
                {existingLoans.map((loan, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      p: 1.25,
                      borderRadius: 2,
                      border: "1px solid #cbd5e1",
                      bgcolor: "#f8fafc",
                    }}
                  >
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                      <Chip
                        size="small"
                        label={`LOAN RECORD #${idx + 1}`}
                        sx={{ height: 20, fontSize: "0.65rem", fontWeight: 700, bgcolor: "#eef2ff", color: "#1d2ebd" }}
                      />
                      {existingLoans.length > 1 && (
                        <IconButton
                          size="small"
                          onClick={() =>
                            setExistingLoans((prev) => prev.filter((_, i) => i !== idx))
                          }
                          sx={{ color: "#dc2626", p: 0.3 }}
                        >
                          <Close fontSize="small" />
                        </IconButton>
                      )}
                    </Stack>

                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: compact ? "1fr" : "repeat(3, minmax(0, 1fr))",
                        gap: 1,
                      }}
                    >
                      <FormControl
                        size="small"
                        fullWidth
                        error={Boolean(fieldErrors[`existing_${idx}_which_loan`])}
                      >
                        <InputLabel sx={{ fontSize: "0.8rem" }}>Loan Type*</InputLabel>
                        <Select
                          label="Loan Type*"
                          value={loan.which_loan}
                          onChange={(e) =>
                            handleExistingLoanRowChange(idx, "which_loan", e.target.value)
                          }
                          sx={{ borderRadius: 2, bgcolor: "#ffffff", fontSize: "0.8rem" }}
                        >
                          <MenuItem disabled sx={{ fontWeight: 700, bgcolor: "#f1f5f9", fontSize: "0.75rem" }}>
                            Unsecured
                          </MenuItem>
                          {LOAN_TYPES_BY_CATEGORY.unsecured.map((l) => (
                            <MenuItem key={l.value} value={l.value} sx={{ fontSize: "0.8rem" }}>
                              {l.label}
                            </MenuItem>
                          ))}
                          <MenuItem disabled sx={{ fontWeight: 700, bgcolor: "#f1f5f9", fontSize: "0.75rem" }}>
                            Secured
                          </MenuItem>
                          {LOAN_TYPES_BY_CATEGORY.secured.map((l) => (
                            <MenuItem key={l.value} value={l.value} sx={{ fontSize: "0.8rem" }}>
                              {l.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <TextField
                        size="small"
                        type="number"
                        label="Outstanding Amt*"
                        placeholder="e.g. 150000"
                        value={loan.loan_amount}
                        onChange={(e) =>
                          handleExistingLoanRowChange(idx, "loan_amount", e.target.value)
                        }
                        error={Boolean(fieldErrors[`existing_${idx}_loan_amount`])}
                        helperText={fieldErrors[`existing_${idx}_loan_amount`]}
                        sx={inputSx}
                      />

                      <TextField
                        size="small"
                        type="number"
                        label="Monthly EMI"
                        placeholder="e.g. 5000"
                        value={loan.running_emi}
                        onChange={(e) =>
                          handleExistingLoanRowChange(idx, "running_emi", e.target.value)
                        }
                        error={Boolean(fieldErrors[`existing_${idx}_running_emi`])}
                        helperText={fieldErrors[`existing_${idx}_running_emi`]}
                        sx={inputSx}
                      />
                    </Box>
                  </Box>
                ))}

                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<Add fontSize="small" />}
                  onClick={() =>
                    setExistingLoans((prev) => [
                      ...prev,
                      { has_running_loans: "yes", which_loan: "", loan_amount: "", running_emi: "" },
                    ])
                  }
                  sx={{
                    alignSelf: "flex-start",
                    color: "#1d2ebd",
                    borderColor: "#c7d2fe",
                    textTransform: "none",
                    borderRadius: 2,
                    fontWeight: 600,
                    fontSize: "0.76rem",
                  }}
                >
                  {isHi ? "+ एक और लोन जोड़ें" : "Add Additional Loan"}
                </Button>
              </Stack>
            )}
          </Stack>
        )}

        {/* STEP 6: PERSONAL & IDENTITY DETAILS */}
        {currentMeta.key === "personal_identity" && (
          <Stack spacing={1.25}>
            <Box>
              <Typography variant="caption" fontWeight={700} color="#334155" sx={{ display: "block", mb: 0.6 }}>
                {isHi ? "शीर्षक (Prefix)*" : "Title / Prefix*"}
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: compact
                    ? "repeat(3, minmax(0, 1fr))"
                    : "repeat(5, minmax(0, 1fr))",
                  gap: 0.7,
                }}
              >
                {PREFIX_OPTIONS.map((p) => (
                  <CheckboxChoiceCard
                    key={p.value}
                    checked={prefix === p.value}
                    label={p.label}
                    compact
                    onClick={() => {
                      setPrefix(p.value);
                      clearError("prefix");
                    }}
                  />
                ))}
              </Box>
              {fieldErrors.prefix && <FormHelperText error>{fieldErrors.prefix}</FormHelperText>}
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: compact ? "1fr" : "repeat(2, minmax(0, 1fr))",
                gap: 1.15,
              }}
            >
              <TextField
                size="small"
                fullWidth
                label={isHi ? "पूरा नाम*" : "Full Name*"}
                placeholder="As per PAN card"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  clearError("name");
                }}
                error={Boolean(fieldErrors.name)}
                helperText={fieldErrors.name}
                sx={inputSx}
              />

              <TextField
                size="small"
                fullWidth
                label={isHi ? "मोबाइल नंबर*" : "Contact Number*"}
                placeholder="10-digit mobile"
                value={contact}
                onChange={(e) => {
                  setContact(e.target.value.replace(/[^0-9]/g, "").slice(0, 10));
                  clearError("contact");
                }}
                error={Boolean(fieldErrors.contact)}
                helperText={fieldErrors.contact}
                sx={inputSx}
              />

              <TextField
                size="small"
                fullWidth
                type="email"
                label={isHi ? "ईमेल पता*" : "Email Address*"}
                placeholder="name@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearError("email");
                }}
                error={Boolean(fieldErrors.email)}
                helperText={fieldErrors.email}
                sx={inputSx}
              />

              <TextField
                size="small"
                fullWidth
                label={isHi ? "पैन कार्ड नंबर*" : "PAN ID*"}
                placeholder="ABCDE1234F"
                value={pan}
                onChange={(e) => {
                  setPan(e.target.value.toUpperCase().slice(0, 10));
                  clearError("pan");
                }}
                error={Boolean(fieldErrors.pan)}
                helperText={
                  fieldErrors.pan ||
                  (savedPanMask && !pan ? `On file: ${savedPanMask} (leave blank to keep)` : "")
                }
                inputProps={{ maxLength: 10 }}
                sx={inputSx}
              />

              <TextField
                size="small"
                fullWidth
                type="date"
                label={isHi ? "जन्म तिथि*" : "Date of Birth*"}
                value={dob}
                onChange={(e) => {
                  setDob(e.target.value);
                  clearError("dob");
                }}
                error={Boolean(fieldErrors.dob)}
                helperText={fieldErrors.dob || "Minimum age 20 years required"}
                InputLabelProps={{ shrink: true }}
                inputProps={{ max: maxDobStr }}
                sx={inputSx}
              />

              <TextField
                size="small"
                fullWidth
                label={isHi ? "पिता का नाम*" : "Father's Name*"}
                value={fatherName}
                onChange={(e) => {
                  setFatherName(e.target.value);
                  clearError("father_name");
                }}
                error={Boolean(fieldErrors.father_name)}
                helperText={fieldErrors.father_name}
                sx={inputSx}
              />

              <TextField
                size="small"
                fullWidth
                label={isHi ? "माता का नाम*" : "Mother's Name*"}
                value={motherName}
                onChange={(e) => {
                  setMotherName(e.target.value);
                  clearError("mother_name");
                }}
                error={Boolean(fieldErrors.mother_name)}
                helperText={fieldErrors.mother_name}
                sx={{ ...inputSx, gridColumn: compact ? "auto" : "span 2" }}
              />
            </Box>
          </Stack>
        )}

        {/* STEP 7: ADDRESSES, STATE, EMPLOYMENT & CONSENT */}
        {currentMeta.key === "personal_address" && (
          <Stack spacing={1.25}>
            <TextField
              size="small"
              fullWidth
              multiline
              rows={2}
              label={isHi ? "वर्तमान निवास पता*" : "Current Address*"}
              placeholder="House/Flat No, Street, Area, Landmark (min 10 chars)"
              value={currentAddress}
              onChange={(e) => {
                setCurrentAddress(e.target.value);
                clearError("current_address");
              }}
              error={Boolean(fieldErrors.current_address)}
              helperText={fieldErrors.current_address}
              sx={inputSx}
            />

            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={samePermanentAddr}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setSamePermanentAddr(checked);
                      if (checked) {
                        setPermanentAddress(currentAddress);
                        clearError("permanent_address");
                      }
                    }}
                    sx={checkboxSx}
                  />
                }
                label={
                  <Typography variant="caption" fontWeight={600} color="#334155">
                    {isHi ? "स्थायी पता वर्तमान पते के समान है" : "Permanent Address same as Current Address"}
                  </Typography>
                }
                sx={{ mb: 0.4 }}
              />
              {!samePermanentAddr && (
                <TextField
                  size="small"
                  fullWidth
                  multiline
                  rows={2}
                  label={isHi ? "स्थायी पता*" : "Permanent Address*"}
                  value={permanentAddress}
                  onChange={(e) => {
                    setPermanentAddress(e.target.value);
                    clearError("permanent_address");
                  }}
                  error={Boolean(fieldErrors.permanent_address)}
                  helperText={fieldErrors.permanent_address}
                  sx={inputSx}
                />
              )}
            </Box>

            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={sameWorkingAddr}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setSameWorkingAddr(checked);
                      if (checked) {
                        setWorkingAddress(currentAddress);
                        clearError("working_address");
                      }
                    }}
                    sx={checkboxSx}
                  />
                }
                label={
                  <Typography variant="caption" fontWeight={600} color="#334155">
                    {isHi ? "कार्यस्थल का पता वर्तमान पते के समान है" : "Working / Office Address same as Current Address"}
                  </Typography>
                }
                sx={{ mb: 0.4 }}
              />
              {!sameWorkingAddr && (
                <TextField
                  size="small"
                  fullWidth
                  multiline
                  rows={2}
                  label={isHi ? "कार्यस्थल / ऑफिस पता*" : "Working / Office Address*"}
                  value={workingAddress}
                  onChange={(e) => {
                    setWorkingAddress(e.target.value);
                    clearError("working_address");
                  }}
                  error={Boolean(fieldErrors.working_address)}
                  helperText={fieldErrors.working_address}
                  sx={inputSx}
                />
              )}
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: compact ? "1fr" : "repeat(2, minmax(0, 1fr))",
                gap: 1.15,
              }}
            >
              <TextField
                size="small"
                fullWidth
                label={isHi ? "शहर*" : "City*"}
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  clearError("city");
                }}
                error={Boolean(fieldErrors.city)}
                helperText={fieldErrors.city}
                sx={inputSx}
              />

              <FormControl size="small" fullWidth error={Boolean(fieldErrors.state)}>
                <InputLabel sx={{ fontSize: "0.82rem" }}>{isHi ? "राज्य*" : "State*"}</InputLabel>
                <Select
                  label={isHi ? "राज्य*" : "State*"}
                  value={stateName}
                  onChange={(e) => {
                    setStateName(e.target.value);
                    clearError("state");
                  }}
                  sx={{ borderRadius: 2, bgcolor: "#ffffff", fontSize: "0.84rem" }}
                >
                  {INDIAN_STATES.map((st) => (
                    <MenuItem key={st} value={st} sx={{ fontSize: "0.82rem" }}>
                      {st}
                    </MenuItem>
                  ))}
                </Select>
                {fieldErrors.state && <FormHelperText>{fieldErrors.state}</FormHelperText>}
              </FormControl>
            </Box>

            <Box>
              <Typography variant="caption" fontWeight={700} color="#334155" sx={{ display: "block", mb: 0.6 }}>
                {isHi ? "रोज़गार प्रकार*" : "Employment Type*"}
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: compact
                    ? "1fr"
                    : "repeat(2, minmax(0, 1fr))",
                  gap: 0.8,
                }}
              >
                {EMPLOYMENT_OPTIONS.map((emp) => (
                  <CheckboxChoiceCard
                    key={emp.value}
                    checked={employmentType === emp.value}
                    label={isHi ? emp.labelHi : emp.label}
                    compact={compact}
                    onClick={() => {
                      setEmploymentType(emp.value);
                      clearError("employment_type");
                    }}
                  />
                ))}
              </Box>
              {fieldErrors.employment_type && (
                <FormHelperText error>{fieldErrors.employment_type}</FormHelperText>
              )}
            </Box>

            {/* Consents (mirrors Step1Form.jsx) */}
            <Box
              sx={{
                p: 1.2,
                borderRadius: 2,
                bgcolor: "#f8fafc",
                border: "1px dashed #cbd5e1",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={consentAccepted}
                    onChange={(e) => {
                      setConsentAccepted(e.target.checked);
                      clearError("consent");
                    }}
                    sx={checkboxSx}
                  />
                }
                label={
                  <Typography variant="caption" color="#475569" sx={{ fontSize: "0.72rem", lineHeight: 1.4 }}>
                    I agree to opt for the products and services of <strong>F2 Fintech</strong> and consent to the T&C, Privacy Policy & Credit Terms.
                  </Typography>
                }
                sx={{ alignItems: "flex-start", mb: 0.5 }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={whatsappOptIn}
                    onChange={(e) => setWhatsappOptIn(e.target.checked)}
                    sx={{ p: 0.35, color: "#94a3b8", "&.Mui-checked": { color: "#16a34a" } }}
                  />
                }
                label={
                  <Typography variant="caption" color="#475569" sx={{ fontSize: "0.72rem" }}>
                    Enable WhatsApp updates for loan status and offers
                  </Typography>
                }
                sx={{ alignItems: "center" }}
              />
              {fieldErrors.consent && (
                <FormHelperText error sx={{ fontWeight: 600 }}>
                  {fieldErrors.consent}
                </FormHelperText>
              )}
            </Box>
          </Stack>
        )}

        {/* STEP 8: FINANCIAL & CATEGORY SPECIFIC DETAILS */}
        {currentMeta.key === "financial" && (
          <Stack spacing={1.25}>
            <Typography variant="body2" fontWeight={600} color="#1e293b" sx={{ fontSize: "0.84rem" }}>
              {isHi
                ? "अपनी वार्षिक आय और वित्तीय दायित्व दर्ज करें:"
                : "Enter your annual income & existing financial obligations:"}
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: compact ? "1fr" : "repeat(2, minmax(0, 1fr))",
                gap: 1.15,
              }}
            >
              <TextField
                size="small"
                fullWidth
                type="number"
                label={isHi ? "वार्षिक आय / टर्नओवर (₹ p.a.)*" : "(Salary / Turnover) p.a.*"}
                placeholder="e.g. 1000000"
                value={salary}
                onChange={(e) => {
                  setSalary(e.target.value);
                  clearError("salary");
                }}
                error={Boolean(fieldErrors.salary)}
                helperText={fieldErrors.salary || (salary ? formatINR(salary) : "")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CurrencyRupee sx={{ fontSize: 16, color: "#3244e6" }} />
                    </InputAdornment>
                  ),
                }}
                sx={inputSx}
              />

              <TextField
                size="small"
                fullWidth
                type="number"
                label={isHi ? "मौजूदा मासिक EMI (₹)" : "Existing Monthly EMI Amount"}
                placeholder="e.g. 15000"
                value={existingEmi}
                onChange={(e) => {
                  setExistingEmi(e.target.value);
                  clearError("existing_emi");
                }}
                error={Boolean(fieldErrors.existing_emi)}
                helperText={fieldErrors.existing_emi}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CurrencyRupee sx={{ fontSize: 16, color: "#3244e6" }} />
                    </InputAdornment>
                  ),
                }}
                sx={inputSx}
              />

              <TextField
                size="small"
                fullWidth
                type="number"
                label={isHi ? "क्रेडिट कार्ड / अन्य देनदारी (₹)" : "Existing Credit Card Liability"}
                placeholder="e.g. 50000"
                value={existingLiability}
                onChange={(e) => {
                  setExistingLiability(e.target.value);
                  clearError("existing_liability");
                }}
                error={Boolean(fieldErrors.existing_liability)}
                helperText={fieldErrors.existing_liability}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CurrencyRupee sx={{ fontSize: 16, color: "#3244e6" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ ...inputSx, gridColumn: compact ? "auto" : "span 2" }}
              />

              {loanType === "business loan" && (
                <>
                  <TextField
                    size="small"
                    fullWidth
                    label={isHi ? "व्यापार / कंपनी का नाम*" : "Business / Entity Name*"}
                    value={company}
                    onChange={(e) => {
                      setCompany(e.target.value);
                      clearError("company");
                    }}
                    error={Boolean(fieldErrors.company)}
                    helperText={fieldErrors.company}
                    sx={inputSx}
                  />
                  <FormControl size="small" fullWidth>
                    <InputLabel sx={{ fontSize: "0.82rem" }}>Business Entity Type</InputLabel>
                    <Select
                      label="Business Entity Type"
                      value={businessEntityType}
                      onChange={(e) => setBusinessEntityType(e.target.value)}
                      sx={{ borderRadius: 2, bgcolor: "#ffffff", fontSize: "0.84rem" }}
                    >
                      {BUSINESS_ENTITY_OPTIONS.map((b) => (
                        <MenuItem key={b.value} value={b.value} sx={{ fontSize: "0.82rem" }}>
                          {b.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    size="small"
                    fullWidth
                    label="GST / Udhyam Registration Number (Optional)"
                    value={gstNumber}
                    onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
                    sx={{ ...inputSx, gridColumn: compact ? "auto" : "span 2" }}
                  />
                </>
              )}

              {(loanType === "professional loan" || loanType === "doctor") && (
                <>
                  <TextField
                    size="small"
                    fullWidth
                    label="Highest Qualification Degree* (e.g. MBBS, BDS, CA)"
                    value={degree}
                    onChange={(e) => {
                      setDegree(e.target.value);
                      clearError("degree");
                    }}
                    error={Boolean(fieldErrors.degree)}
                    helperText={fieldErrors.degree}
                    sx={inputSx}
                  />
                  <TextField
                    size="small"
                    fullWidth
                    label="Medical / Professional Registration No.*"
                    value={licenseNumber}
                    onChange={(e) => {
                      setLicenseNumber(e.target.value);
                      clearError("license_number");
                    }}
                    error={Boolean(fieldErrors.license_number)}
                    helperText={fieldErrors.license_number}
                    sx={inputSx}
                  />
                </>
              )}

              {loanType !== "business loan" &&
                loanType !== "professional loan" &&
                loanType !== "doctor" &&
                employmentType === "salaried" && (
                  <TextField
                    size="small"
                    fullWidth
                    label="Employer / Company Name (Optional)"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    sx={{ ...inputSx, gridColumn: compact ? "auto" : "span 2" }}
                  />
                )}
            </Box>
          </Stack>
        )}

        {/* STEP 9: DOCUMENT UPLOAD */}
        {currentMeta.key === "documents" && (
          <DocumentUploadCard
            data={{
              loanType: getLoanTypeLabel(loanType, language),
              checklist:
                documentChecklist.length > 0
                  ? documentChecklist
                  : activeConfig
                    ? [
                        ...(activeConfig.mandatory_documents_json || []).map((d) => ({
                          ...d,
                          required: true,
                          uploaded: false,
                        })),
                        ...(activeConfig.optional_documents_json || []).map((d) => ({
                          ...d,
                          required: false,
                          uploaded: false,
                        })),
                      ]
                    : [
                        { type: "aadhaar front", label: "Aadhaar Card (Front)", required: true, uploaded: false },
                        { type: "pancard", label: "PAN Card", required: true, uploaded: false },
                        { type: "bank statement", label: "Last 6 Months Bank Statement", required: true, uploaded: false },
                        { type: "aadhaar back", label: "Aadhaar Card (Back)", required: false, uploaded: false },
                        { type: "photo", label: "Passport Size Photo", required: false, uploaded: false },
                      ],
            }}
            sessionId={sessionId}
            language={language}
            isCompact={compact}
            onChecklistUpdated={(prog) => {
              if (Array.isArray(prog?.documentChecklist)) {
                setDocumentChecklist(prog.documentChecklist);
              }
              onProgressUpdated?.(prog);
            }}
            onProceedToReview={handleProceedToReview}
          />
        )}

        {/* STEP 10: FINAL REVIEW & SUBMIT */}
        {currentMeta.key === "review" && (
          <ApplicationReviewCard
            data={reviewData}
            sessionId={sessionId}
            language={language}
            isCompact={compact}
            onRequestEdit={() => goToStep(0)}
            onSubmitted={() => {
              setSubmitDone(true);
              onProgressUpdated?.({ loanType, currentStep: "submitted" });
            }}
          />
        )}

        {/* Navigation Footer (for Steps 1-9; Step 10 has its own Confirm & Edit actions) */}
        {currentMeta.key !== "review" && !submitDone && (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
            sx={{ mt: 2, pt: 1.5, borderTop: "1px solid #f1f5f9" }}
          >
            <Button
              size="small"
              variant="outlined"
              disabled={stepIndex === 0 || saving}
              startIcon={<ArrowBack sx={{ fontSize: 15 }} />}
              onClick={() => goToStep(Math.max(0, stepIndex - 1))}
              sx={{
                color: "#334155",
                borderColor: "#cbd5e1",
                textTransform: "none",
                borderRadius: 2,
                fontWeight: 600,
                fontSize: "0.78rem",
                "&:hover": { borderColor: "#3244e6", color: "#1d2ebd", bgcolor: "#f8faff" },
                "&.Mui-disabled": { color: "#cbd5e1", borderColor: "#f1f5f9" },
              }}
            >
              {isHi ? "पीछे" : "Back"}
            </Button>

            {currentMeta.key !== "documents" && (
              <Button
                size="small"
                variant="contained"
                disabled={saving}
                endIcon={
                  saving ? (
                    <CircularProgress size={14} sx={{ color: "#ffffff" }} />
                  ) : (
                    <ArrowForward sx={{ fontSize: 16 }} />
                  )
                }
                onClick={validateAndAdvance}
                sx={{
                  background: "linear-gradient(135deg, #1d2ebd 0%, #3244e6 100%)",
                  color: "#ffffff",
                  boxShadow: "0 4px 12px rgba(50, 68, 230, 0.24)",
                  textTransform: "none",
                  borderRadius: 2,
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  px: 2.2,
                  py: 0.75,
                  "&:hover": {
                    background: "linear-gradient(135deg, #17259c 0%, #1d2ebd 100%)",
                  },
                }}
              >
                {saving
                  ? isHi
                    ? "सहेजा जा रहा है..."
                    : "Saving..."
                  : stepIndex === 4 || stepIndex === 6 || stepIndex === 7
                    ? isHi
                      ? "सहेजें व आगे बढ़ें"
                      : "Save & Continue"
                    : isHi
                      ? "आगे बढ़ें"
                      : "Continue"}
              </Button>
            )}
          </Stack>
        )}

        {/* Security Footer */}
        <Stack
          direction="row"
          spacing={0.6}
          alignItems="center"
          sx={{ mt: 1.2, pt: 0.8, borderTop: "1px dashed #e2e8f0" }}
        >
          <Security sx={{ fontSize: 13, color: "#64748b" }} />
          <Typography variant="caption" color="#64748b" sx={{ fontSize: "0.66rem" }}>
            {isHi
              ? "256-बिट एन्क्रिप्टेड ड्राफ्ट • सबमिट करने से पहले सभी विवरणों की समीक्षा करें"
              : "256-bit encrypted draft • Matches F2Fintech official application intake"}
          </Typography>
        </Stack>
      </Box>
    </Paper>
  );
}

GuidedApplicationCard.propTypes = {
  data: PropTypes.shape({
    loanType: PropTypes.string,
    currentStep: PropTypes.string,
    providers: PropTypes.arrayOf(PropTypes.string),
    documentChecklist: PropTypes.arrayOf(PropTypes.object),
  }),
  sessionId: PropTypes.string,
  language: PropTypes.string,
  isCompact: PropTypes.bool,
  onProgressUpdated: PropTypes.func,
};
