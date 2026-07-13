import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  Collapse,
  Select,
  MenuItem,
  FormControl,
  Checkbox,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Star,
  Zap,
  ShieldCheck,
  TrendingDown,
  SlidersHorizontal,
  CalendarDays,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { ALL_BANKS, getBanksByLoanType, LOAN_TYPE_META } from "../../data/banksData";

/* ─── Config ─────────────────────────────────────── */
const SORT_OPTIONS = [
  { value: "roi_asc", label: "Lowest Rate First" },
  { value: "emi_asc", label: "Lowest EMI First" },
  { value: "loan_desc", label: "Highest Loan Amount" },
];

const FILTERS = {
  productType: ["Home Loan", "Loan Against Property"],
  employmentType: ["Salaried", "Self-Employed"],
  gender: ["Male", "Female", "Other"],
  city: ["Ahmedabad", "Bangalore", "Chennai", "Coimbatore", "Delhi", "Ghaziabad", "Gurgaon", "Hyderabad", "Mumbai", "Noida", "Pune"],
  loanAmount: ["₹10 Lakhs", "₹25 Lakhs", "₹40 Lakhs", "₹50 Lakhs", "₹1 Crore", "₹1.5 Crores", "₹2 Crores", "₹5 Crores", "₹10 Crores"],
  ltvRatio: ["Up to 75% loan", "Up to 80% loan", "Up to 85% loan", "Up to 90% loan", "90%+ loan"],
  tenure: ["Up to 5 Years", "Up to 10 Years", "Up to 15 Years", "Up to 20 Years", "Up to 30 Years", "30+ Years"],
  specialOffers: ["Show banks with special offers"],
};

/* ─── Bank Logo ──────────────────────────────────── */
function BankLogo({ bank }) {
  const [err, setErr] = useState(false);
  if (err || !bank.logo) {
    return (
      <Box
        sx={{
          width: 40, height: 40, borderRadius: "8px",
          background: `${bank.logoColor}18`,
          border: `1px solid ${bank.logoColor}30`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "Poppins", fontWeight: 800, fontSize: "0.6rem",
          color: bank.logoColor, flexShrink: 0,
        }}
      >
        {bank.shortName}
      </Box>
    );
  }
  return (
    <Box
      component="img" src={bank.logo} alt={bank.name}
      onError={() => setErr(true)}
      sx={{
        width: 40, height: 40, objectFit: "contain",
        borderRadius: "8px", background: "#f8fafc",
        border: "1px solid #e2e8f0", padding: "3px", flexShrink: 0,
      }}
    />
  );
}

/* ─── Offer Card (matches screenshot) ────────────── */
function OfferCard({ bank, lt, loanType }) {
  const [feeOpen, setFeeOpen] = useState(false);
  const navigate = useNavigate();

  const fmt = (n) =>
    n >= 10000000
      ? `₹${(n / 10000000).toFixed(2)} Cr`
      : n >= 100000
        ? `₹${(n / 100000).toFixed(2)} L`
        : `₹${n.toLocaleString("en-IN")}`;

  const viewDetailsRoute = `/${loanType}/${lt.slug}`;
  const applyRoute = "/application-form";

  return (
    <Box
      sx={{
        background: "#fff",
        border: `1.5px solid ${bank.recommended ? "#c7d2fe" : "#e8edf5"}`,
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: bank.recommended
          ? "0 4px 20px rgba(50,68,230,0.10)"
          : "0 2px 10px rgba(0,0,0,0.05)",
        transition: "box-shadow 0.25s, transform 0.2s",
        "&:hover": {
          boxShadow: "0 8px 30px rgba(50,68,230,0.13)",
          transform: "translateY(-2px)",
        },
      }}
    >
      {/* Header */}
      <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
        {bank.recommended && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
            <Star size={13} fill="#f59e0b" color="#f59e0b" />
            <Typography sx={{ fontSize: "0.72rem", fontWeight: 700, color: "#f59e0b", fontFamily: "Poppins" }}>
              Recommended
            </Typography>
          </Box>
        )}

        {/* Bank Name Row */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <BankLogo bank={bank} />
            <Typography
              sx={{
                fontSize: "0.85rem", fontWeight: 700, color: "#1e293b",
                fontFamily: "Poppins", lineHeight: 1.3, maxWidth: 110,
              }}
            >
              {bank.name}
            </Typography>
          </Box>
          <Chip
            icon={<CalendarDays size={11} />}
            label={`${lt.tenure} Years`}
            size="small"
            sx={{
              fontSize: "0.68rem", height: 22, fontFamily: "Poppins",
              background: "rgba(50,68,230,0.06)", color: "#3244e6",
              "& .MuiChip-icon": { color: "#3244e6", ml: 0.5 },
            }}
          />
        </Box>

        {/* Stats Row */}
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1, mb: 2 }}>
          {[
            { label: "Loan amount", value: fmt(lt.maxLoanNum) },
            { label: "ROI", value: `${lt.interestRate}%`, blue: true },
            { label: "EMI", value: `₹${lt.emi.toLocaleString("en-IN")}/mo` },
          ].map((s) => (
            <Box key={s.label}>
              <Typography sx={{ fontSize: "0.65rem", color: "#94a3b8", fontFamily: "Poppins", mb: 0.2 }}>
                {s.label}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.88rem", fontWeight: 700,
                  color: s.blue ? "#3244e6" : "#1e293b",
                  fontFamily: "Poppins",
                }}
              >
                {s.value}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* LTV row (if applicable) */}
        {lt.ltv && lt.ltv !== "N/A" && (
          <Typography sx={{ fontSize: "0.75rem", color: "#3244e6", fontWeight: 700, fontFamily: "Poppins", mb: 1.5 }}>
            LTV up to {lt.ltv}
          </Typography>
        )}
      </Box>

      {/* Processing Fee - Expandable */}
      <Box
        onClick={() => setFeeOpen(!feeOpen)}
        sx={{
          mx: { xs: 2, sm: 2.5 }, mb: 1.5,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "#f8faff", border: "1px solid #e2e8f0",
          borderRadius: "10px", px: 1.5, py: 1.1,
          cursor: "pointer", transition: "background 0.2s",
          "&:hover": { background: "#f0f4ff" },
        }}
      >
        <Typography sx={{ fontSize: "0.8rem", color: "#475569", fontFamily: "Poppins", fontWeight: 600 }}>
          {lt.processingFee}
        </Typography>
        {feeOpen
          ? <ChevronUp size={15} color="#64748b" />
          : <ChevronDown size={15} color="#64748b" />
        }
      </Box>

      <Collapse in={feeOpen}>
        <Box sx={{ mx: { xs: 2, sm: 2.5 }, mb: 1.5, background: "#f8faff", borderRadius: "10px", p: 1.5 }}>
          {lt.feeDetails.map((fee, i) => (
            <Box
              key={i}
              sx={{
                display: "flex", justifyContent: "space-between",
                py: 0.6,
                borderBottom: i < lt.feeDetails.length - 1 ? "1px solid #e8edf5" : "none",
              }}
            >
              <Typography sx={{ fontSize: "0.72rem", color: "#64748b", fontFamily: "Poppins" }}>
                {fee.label}
              </Typography>
              <Typography sx={{ fontSize: "0.72rem", color: "#1e293b", fontFamily: "Poppins", fontWeight: 600, textAlign: "right", maxWidth: "55%" }}>
                {fee.value}
              </Typography>
            </Box>
          ))}
        </Box>
      </Collapse>

      {/* ── Two Buttons ── */}
      <Box sx={{ px: { xs: 2, sm: 2.5 }, pb: 2.5, display: "flex", gap: 1.5 }}>
        {/* View Details */}
        <Button
          onClick={() => navigate(viewDetailsRoute)}
          variant="outlined"
          fullWidth
          startIcon={<ExternalLink size={14} />}
          sx={{
            border: "1.5px solid #3244e6",
            color: "#3244e6",
            fontFamily: "Poppins", fontWeight: 700,
            fontSize: "0.82rem", py: 1.1,
            borderRadius: "50px", textTransform: "none",
            background: "transparent",
            transition: "all 0.2s",
            "&:hover": {
              background: "#f0f4ff",
              borderColor: "#1d31b8",
              color: "#1d31b8",
            },
          }}
        >
          View Details
        </Button>

        {/* Apply Now */}
        <Button
          onClick={() => navigate(applyRoute)}
          fullWidth
          sx={{
            background: "linear-gradient(135deg, #3244e6 0%, #4f46e5 100%)",
            color: "#fff",
            fontFamily: "Poppins", fontWeight: 700,
            fontSize: "0.82rem", py: 1.1,
            borderRadius: "50px", textTransform: "none",
            boxShadow: "0 4px 16px rgba(50,68,230,0.25)",
            "&:hover": {
              background: "linear-gradient(135deg, #2536c4 0%, #4338ca 100%)",
              boxShadow: "0 8px 24px rgba(50,68,230,0.35)",
            },
            transition: "all 0.2s",
          }}
        >
          Apply Now
        </Button>
      </Box>
    </Box>
  );
}

/* ─── Filters Sidebar ──────────────────────────── */
function FiltersSidebar({ filters, setFilters }) {
  const [citySearch, setCitySearch] = useState("");

  const toggle = (key, val) =>
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key]?.includes(val)
        ? prev[key].filter((x) => x !== val)
        : [...(prev[key] || []), val],
    }));

  const sections = [
    { key: "productType", label: "Product Type", options: FILTERS.productType },
    { key: "employmentType", label: "Employment Type", options: FILTERS.employmentType },
    { key: "gender", label: "Gender", options: FILTERS.gender },
    { key: "city", label: "City", options: FILTERS.city, isCity: true },
    { key: "loanAmount", label: "Loan Amount", options: FILTERS.loanAmount },
    { key: "ltvRatio", label: "LTV Ratio", options: FILTERS.ltvRatio },
    { key: "tenure", label: "Tenure", options: FILTERS.tenure },
    { key: "specialOffers", label: "Special Offers", options: FILTERS.specialOffers },
  ];

  return (
    <Box
      sx={{
        background: "#fff", border: "1px solid #e8edf5",
        borderRadius: "16px", p: 2.5,
        position: "sticky", top: 80,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2.5 }}>
        <SlidersHorizontal size={18} color="#3244e6" />
        <Typography sx={{ fontWeight: 700, fontSize: "1rem", color: "#1e293b" }}>
          Filters
        </Typography>
      </Box>
      {sections.map((sec) => (
        <Accordion
          key={sec.key} disableGutters elevation={0}
          sx={{ border: "none", background: "transparent", "&:before": { display: "none" }, mb: 0.5 }}
        >
          <AccordionSummary expandIcon={<ChevronDown size={16} />} sx={{ px: 0, minHeight: 44 }}>
            <Typography sx={{ fontSize: "0.82rem", fontWeight: 700, color: "#1e293b" }}>
              {sec.label}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 0, pt: 0, pb: 1 }}>
            {sec.isCity ? (
              <Box sx={{ pt: 1 }}>
                <Box
                  component="input"
                  type="text"
                  placeholder="Search city"
                  value={citySearch}
                  onChange={(e) => setCitySearch(e.target.value)}
                  sx={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    fontSize: "0.82rem",
                    mb: 1.5,
                    outline: "none",
                    fontFamily: "inherit",
                    "&:focus": {
                      borderColor: "#3244e6",
                    }
                  }}
                />
                <Box sx={{ maxHeight: 150, overflowY: "auto", pr: 0.5 }}>
                  {sec.options
                    .filter((c) => c.toLowerCase().includes(citySearch.toLowerCase()))
                    .map((opt) => (
                      <FormControlLabel
                        key={opt}
                        control={
                          <Checkbox
                            checked={filters[sec.key]?.includes(opt) || false}
                            onChange={() => toggle(sec.key, opt)}
                            size="small"
                            sx={{ color: "#3244e6", "&.Mui-checked": { color: "#3244e6" }, py: 0.3 }}
                          />
                        }
                        label={<Typography sx={{ fontSize: "0.8rem", color: "#475569" }}>{opt}</Typography>}
                        sx={{ display: "flex", ml: 0, mb: 0.3 }}
                      />
                    ))}
                </Box>
              </Box>
            ) : (
              sec.options.map((opt) => (
                <FormControlLabel
                  key={opt}
                  control={
                    <Checkbox
                      checked={filters[sec.key]?.includes(opt) || false}
                      onChange={() => toggle(sec.key, opt)}
                      size="small"
                      sx={{ color: "#3244e6", "&.Mui-checked": { color: "#3244e6" }, py: 0.3 }}
                    />
                  }
                  label={<Typography sx={{ fontSize: "0.8rem", color: "#475569" }}>{opt}</Typography>}
                  sx={{ display: "flex", ml: 0, mb: 0.3 }}
                />
              ))
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}

/* ─── Loan Descriptions Config ───────────────────── */
const LOAN_DESCRIPTIONS = {
  "home-loans": {
    titleHighlight: "Loan Interest Rates",
    titleRest: " & Fees Across Banks And NBFCs - 2026",
    updatedText: "Updated on 9-6-2026 Written by Ramandeep Sadana, Credit Expert with over 10 years of experience",
    introText: "Find the best rates only with F2 Fintech. Looking for the best loan interest rates in 2026? Here's a complete list of current loan rates and processing fees offered by leading banks and NFC's in India.",
    expandedText: " This table helps you easily compare loan offers across HDFC, SBI, ICICI, Axis Bank, LIC Housing Finance, and more. Whether you're a salaried or self-employed borrower, use this updated list to make an informed decision and find the most affordable home loan option for your needs."
  },
  "personal-loan": {
    titleHighlight: "Personal Loan Interest Rates",
    titleRest: " & Charges Across Top Lenders - 2026",
    updatedText: "Updated on 10-6-2026 Written by Ramandeep Sadana, Credit Expert with over 10 years of experience",
    introText: "Find the best rates only with F2 Fintech. Looking for the best personal loan interest rates in 2026? Compare rates and processing fees offered by leading banks and NBFCs in India.",
    expandedText: " Whether you need funds for a medical emergency, wedding, travel, or debt consolidation, use this updated comparison list to find the most affordable personal loan options tailored to your eligibility."
  },
  "doctor-loan": {
    titleHighlight: "Doctor Loan Interest Rates",
    titleRest: " & Special Offers for Medical Professionals - 2026",
    updatedText: "Updated on 12-6-2026 Written by Ramandeep Sadana, Credit Expert with over 10 years of experience",
    introText: "Get specialized financial support only with F2 Fintech. Looking for doctor loan interest rates in 2026? We bring you a compiled list of exclusive loan offers, minimal documentation requirements, and competitive interest rates offered by top banks and NBFCs in India.",
    expandedText: " Specifically designed for medical practitioners to expand clinics, purchase advanced medical equipment, or manage clinical operations efficiently."
  },
  "professional-loan": {
    titleHighlight: "Professional Loan Interest Rates",
    titleRest: " & Schemes for CA, CS & Architects - 2026",
    updatedText: "Updated on 11-6-2026 Written by Ramandeep Sadana, Credit Expert with over 10 years of experience",
    introText: "Empower your practice with F2 Fintech. Compare the best professional loan interest rates and processing fees in 2026 for Chartered Accountants, Company Secretaries, and Architects.",
    expandedText: " Compare top schemes from leading Indian financial institutions to scale your consultancy, upgrade office infrastructure, or manage working capital efficiently."
  },
  "loan-against-property": {
    titleHighlight: "Loan Against Property (LAP) Rates",
    titleRest: " & LTV Ratio Across Banks - 2026",
    updatedText: "Updated on 14-6-2026 Written by Ramandeep Sadana, Credit Expert with over 10 years of experience",
    introText: "Unlock the value of your property with F2 Fintech. Looking for the best Loan Against Property (LAP) interest rates in 2026? Here's an updated list of commercial and residential property loan options, interest rates, and processing fees.",
    expandedText: " Compare loan-to-value (LTV) ratios and flexible tenures offered by top lenders in India to meet your personal or business capital requirements."
  },
  "business-loan": {
    titleHighlight: "Business Loan Interest Rates",
    titleRest: " & Collateral-Free Schemes - 2026",
    updatedText: "Updated on 15-6-2026 Written by Ramandeep Sadana, Credit Expert with over 10 years of experience",
    introText: "Fuel your business growth only with F2 Fintech. Compare collateral-free business loan interest rates, tenure options, and processing fees offered by leading banks and NBFCs in 2026.",
    expandedText: " Find the right working capital loan, machinery loan, or MSME loan scheme to take your business to the next level with customized repayment structures."
  }
};

/* ─── Main OfferPage ─────────────────────────────── */
export default function OfferPage() {
  const [sortBy, setSortBy] = useState("roi_asc");
  const [filters, setFilters] = useState({
    productType: [],
    employmentType: ["Salaried"],
    gender: [],
    city: [],
    loanAmount: [],
    ltvRatio: [],
    tenure: [],
    specialOffers: [],
  });
  const [descExpanded, setDescExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Parse loanType from query params (?type=personal-loan)
  const searchParams = new URLSearchParams(location.search);
  const initialType = searchParams.get("type") || "home-loans";
  const [loanType, setLoanType] = useState(initialType);

  // Sync loanType state and reset description expansion when query parameters change
  useEffect(() => {
    const qType = new URLSearchParams(location.search).get("type") || "home-loans";
    setLoanType(qType);
    setDescExpanded(false);
  }, [location.search]);

  // Get active metadata
  const activeMeta = LOAN_TYPE_META[loanType] || { label: "Loan", color: "#3244e6" };

  // Get active product types for querying based on filters
  const activeProductTypes = [];
  if (filters.productType && filters.productType.length > 0) {
    if (filters.productType.includes("Home Loan")) activeProductTypes.push("home-loans");
    if (filters.productType.includes("Loan Against Property")) activeProductTypes.push("loan-against-property");
  } else {
    activeProductTypes.push(loanType);
  }

  // Get all banks for the selected product types
  let bankList = [];
  activeProductTypes.forEach((pType) => {
    const list = getBanksByLoanType(pType);
    list.forEach(item => {
      bankList.push({
        ...item,
        loanTypeData: {
          ...item.loanTypeData,
          actualLoanType: pType
        }
      });
    });
  });

  // Filter
  const filteredList = bankList.filter(({ bank, loanTypeData }) => {
    // 1. Product Type Filter (pre-filtered in querying step above)

    // 2. Employment Type Filter
    if (filters.employmentType && filters.employmentType.length > 0) {
      const isSalaried = filters.employmentType.includes("Salaried");
      const isSelfEmployed = filters.employmentType.includes("Self-Employed");
      const eligString = (loanTypeData.eligibility || []).join(" ").toLowerCase();
      const descString = (loanTypeData.about || "").toLowerCase();
      if (isSalaried && !isSelfEmployed) {
        if (!eligString.includes("salaried") && eligString.includes("self-employed")) {
          return false;
        }
      }
      if (isSelfEmployed && !isSalaried) {
        if (!eligString.includes("self-employed") && !descString.includes("self-employed") && !descString.includes("business")) {
          return false;
        }
      }
    }

    // 3. Gender Filter
    if (filters.gender && filters.gender.length > 0 && filters.gender.includes("Female") && !filters.gender.includes("Male")) {
      const bankNameLower = bank.name.toLowerCase();
      const aboutLower = loanTypeData.about.toLowerCase();
      const hasFemaleScheme = bankNameLower.includes("state bank") || bankNameLower.includes("sbi") || bankNameLower.includes("hdfc") || bankNameLower.includes("icici") || aboutLower.includes("women") || aboutLower.includes("female");
      if (!hasFemaleScheme) {
        return false;
      }
    }

    // 4. City Filter - operated nationally, let all pass

    // 5. Loan Amount Filter
    if (filters.loanAmount && filters.loanAmount.length > 0) {
      const matchesAmount = filters.loanAmount.some(amountStr => {
        let val = 0;
        if (amountStr.includes("Lakh")) {
          val = parseFloat(amountStr.replace(/[^\d.]/g, "")) * 100000;
        } else if (amountStr.includes("Crore")) {
          val = parseFloat(amountStr.replace(/[^\d.]/g, "")) * 10000000;
        }
        return val >= loanTypeData.loanAmountMin && val <= loanTypeData.loanAmountMax;
      });
      if (!matchesAmount) return false;
    }

    // 6. LTV Ratio Filter
    if (filters.ltvRatio && filters.ltvRatio.length > 0) {
      const bankLtv = parseFloat(loanTypeData.ltv.replace(/[^\d.]/g, "")) || 0;
      const matchesLtv = filters.ltvRatio.some(ltvStr => {
        const ltvVal = parseFloat(ltvStr.replace(/[^\d.]/g, "")) || 0;
        return bankLtv >= ltvVal;
      });
      if (!matchesLtv) return false;
    }

    // 7. Tenure Filter
    if (filters.tenure && filters.tenure.length > 0) {
      const bankTenure = loanTypeData.tenure || 0;
      const matchesTenure = filters.tenure.some(tenureStr => {
        const tenureVal = parseFloat(tenureStr.replace(/[^\d.]/g, "")) || 0;
        return bankTenure >= tenureVal;
      });
      if (!matchesTenure) return false;
    }

    // 8. Special Offers Filter
    if (filters.specialOffers && filters.specialOffers.includes("Show banks with special offers")) {
      const matchesSpecial = bank.recommended || loanTypeData.processingFee.toLowerCase().includes("nil") || loanTypeData.processingFee.toLowerCase().includes("zero") || loanTypeData.processingFee.toLowerCase().includes("waiver");
      if (!matchesSpecial) return false;
    }

    return true;
  });

  // Sort
  const sorted = [...filteredList].sort((a, b) => {
    if (sortBy === "roi_asc") return parseFloat(a.loanTypeData.interestRate) - parseFloat(b.loanTypeData.interestRate);
    if (sortBy === "emi_asc") return a.loanTypeData.emi - b.loanTypeData.emi;
    if (sortBy === "loan_desc") return b.loanTypeData.maxLoanNum - a.loanTypeData.maxLoanNum;
    return 0;
  });

  // Recommended first
  const recommended = sorted.filter((x) => x.bank.recommended);
  const rest = sorted.filter((x) => !x.bank.recommended);
  const finalList = [...recommended, ...rest];

  const handleLoanTypeChange = (e) => {
    const newType = e.target.value;
    setLoanType(newType);
    // Update URL query parameter
    navigate(`/offer?type=${newType}`, { replace: true });
  };

  // Resolve active loan description meta
  const desc = LOAN_DESCRIPTIONS[loanType] || {
    titleHighlight: activeMeta.label,
    titleRest: " Interest Rates & Fees Across Banks - 2026",
    updatedText: "Updated on 9-6-2026 Written by Ramandeep Sadana, Credit Expert with over 10 years of experience",
    introText: `Find the best rates only with F2 Fintech. Looking for the best ${activeMeta.label.toLowerCase()} interest rates in 2026? Here is a list of current rates and fees offered by leading banks in India.`,
    expandedText: " Use this comparison table to compare different loan offers and make an informed decision for your financial needs."
  };

  return (
    <Box sx={{ background: "#f4f7fe", minHeight: "100vh", pt: { xs: 3, md: 4 }, pb: 8 }}>
      <Container maxWidth="xl">
        {/* Description Section */}
        {desc && (
          <Box sx={{ mb: 4, mt: 1 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1.6rem", sm: "2rem", md: "2.5rem" },
                color: "text.primary",
                lineHeight: 1.2,
                mb: 1.5,
              }}
            >
              <Box component="span" sx={{ color: activeMeta.color, mr: 1, display: "inline-block" }}>
                {desc.titleHighlight}
              </Box>
              {desc.titleRest}
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                fontSize: "0.75rem",
                mb: 2.5,
              }}
            >
              {desc.updatedText}
            </Typography>

            <Box>
              <Typography
                color="text.secondary"
                sx={{
                  fontSize: "0.88rem",
                  lineHeight: 1.6,
                  display: "inline",
                }}
              >
                {desc.introText}
                {descExpanded && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {desc.expandedText}
                  </motion.span>
                )}
              </Typography>
              <Box sx={{ mt: 1.5 }}>
                <Button
                  onClick={() => setDescExpanded(!descExpanded)}
                  sx={{
                    color: activeMeta.color,
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    textTransform: "none",
                    p: 0,
                    minWidth: 0,
                    "&:hover": { background: "transparent", textDecoration: "underline" },
                  }}
                >
                  {descExpanded ? "Read less" : "Read more"}
                </Button>
              </Box>
            </Box>
          </Box>
        )}

        {/* Top bar */}
        <Box
          sx={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            mb: 3, flexWrap: "wrap", gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
            <Typography sx={{ fontFamily: "Poppins", fontWeight: 700, fontSize: { xs: "1rem", md: "1.1rem" }, color: "#1e293b" }}>
              {finalList.length} {activeMeta.label} Offers Found
            </Typography>

            {/* Loan Type Selector */}
            <FormControl size="small">
              <Select
                value={loanType}
                onChange={handleLoanTypeChange}
                sx={{
                  fontFamily: "Poppins", fontSize: "0.82rem", fontWeight: 600,
                  borderRadius: "10px", background: "#fff",
                  "& .MuiSelect-select": { py: 0.8, px: 1.5 },
                }}
              >
                {Object.entries(LOAN_TYPE_META).map(([key, val]) => (
                  <MenuItem key={key} value={key} sx={{ fontFamily: "Poppins", fontSize: "0.82rem" }}>
                    {val.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography sx={{ fontFamily: "Poppins", fontSize: "0.85rem", color: "#64748b" }}>Sort By</Typography>
            <FormControl size="small">
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                sx={{
                  fontFamily: "Poppins", fontSize: "0.82rem",
                  borderRadius: "10px", background: "#fff",
                  "& .MuiSelect-select": { py: 0.8, px: 1.5 },
                }}
              >
                {SORT_OPTIONS.map((o) => (
                  <MenuItem key={o.value} value={o.value} sx={{ fontFamily: "Poppins", fontSize: "0.82rem" }}>
                    {o.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "280px 1fr" }, gap: 3, alignItems: "start" }}>
          {/* ── Left: Promo + Filters ── */}
          <Box>
            {/* Promo Card */}
            <Box
              sx={{
                background: "linear-gradient(135deg, #f8faff 0%, #eff3ff 100%)",
                border: "1.5px solid #c7d2fe",
                borderRadius: "16px", p: 2.5, mb: 2.5,
              }}
            >
              <Typography sx={{ fontFamily: "Poppins", fontWeight: 800, fontSize: "1.05rem", color: "#1e293b", mb: 1, lineHeight: 1.35 }}>
                Get the best{" "}
                <Box component="span" sx={{ color: "#3244e6" }}>{activeMeta.label}</Box>{" "}
                Offers from{" "}
                <Box component="span" sx={{ color: "#f59e0b", fontStyle: "italic" }}>70+ leading Banks</Box>
              </Typography>
              <Typography sx={{ fontFamily: "Poppins", fontWeight: 700, fontSize: "0.78rem", color: "#475569", mb: 1 }}>
                Why Choose Us
              </Typography>
              {["0% Commission - No extra cost", "Lowest rates starting 7.10%", "Support during & after loan"].map((pt) => (
                <Box key={pt} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                  <Box sx={{ width: 16, height: 16, borderRadius: "50%", background: "#10b981", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Typography sx={{ fontSize: "0.6rem", color: "#fff", fontWeight: 800 }}>✓</Typography>
                  </Box>
                  <Typography sx={{ fontFamily: "Poppins", fontSize: "0.78rem", color: "#475569" }}>{pt}</Typography>
                </Box>
              ))}
              <Button
                onClick={() => navigate("/application-form")}
                fullWidth

                sx={{
                  mt: 2,
                  background: "linear-gradient(135deg, #3244e6 0%, #4f46e5 100%)",
                  color: "#fff", fontFamily: "Poppins", fontWeight: 700,
                  fontSize: "0.82rem", py: 1.2, borderRadius: "50px",
                  textTransform: "none",
                  boxShadow: "0 6px 20px rgba(50,68,230,0.3)",
                  "&:hover": { background: "linear-gradient(135deg, #2536c4 0%, #4338ca 100%)" },
                }}
                startIcon={<Zap size={15} />}
              >
                Schedule a call
              </Button>
            </Box>

            <FiltersSidebar filters={filters} setFilters={setFilters} />
          </Box>

          {/* ── Right: Cards ── */}
          <Box>
            {/* F2 Fintech Advantage */}
            <Box sx={{ background: "#fff", border: "1px solid #e8edf5", borderRadius: "16px", p: 2.5, mb: 3 }}>
              <Typography sx={{ fontFamily: "Poppins", fontWeight: 700, fontSize: "1rem", color: "#1e293b", mb: 2 }}>
                F2 Fintech Advantage
              </Typography>
              <Box sx={{ display: "flex", gap: { xs: 2, sm: 4 }, flexWrap: "wrap" }}>
                {[
                  { icon: <TrendingDown size={18} color="#3244e6" />, label: "Lowest EMI Match" },
                  { icon: <Zap size={18} color="#f59e0b" />, label: "Fast Approval Support" },
                  { icon: <ShieldCheck size={18} color="#10b981" />, label: "No Hidden Charges" },
                ].map((a) => (
                  <Box key={a.label} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box sx={{ width: 34, height: 34, borderRadius: "8px", background: "#f8faff", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #e2e8f0" }}>
                      {a.icon}
                    </Box>
                    <Typography sx={{ fontFamily: "Poppins", fontSize: "0.82rem", color: "#475569", fontWeight: 600 }}>
                      {a.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Cards Grid */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", xl: "1fr 1fr 1fr" },
                gap: 2,
              }}
            >
              {finalList.map(({ bank, loanTypeData }, idx) => (
                <motion.div
                  key={`${bank.id}-${loanTypeData.slug}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                >
                  <OfferCard bank={bank} lt={loanTypeData} loanType={loanTypeData.actualLoanType || loanType} />
                </motion.div>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
