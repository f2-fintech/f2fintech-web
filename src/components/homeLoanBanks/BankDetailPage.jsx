import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Dialog,
  DialogContent,
  TextField,
  MenuItem,
  IconButton,
  Backdrop,
  Slider,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronDown,
  Phone,
  User,
  ArrowRight,
  CheckCircle2,
  X,
  TrendingDown,
  Clock,
  ShieldCheck,
  Home,
  Star,
  ChevronRight,
  Calculator as CalculatorIcon,
  Download,
  Info,
} from "lucide-react";
import jsPDF from "jspdf";
import { LoanInquiryAPI } from "../../apis/LoanInquiryAPI";
import { getBankBySlug, ALL_BANKS, LOAN_TYPE_META } from "../../data/banksData";

/* ─── Bank Logo Component ─────────────────────────── */
function BankLogo({ bank }) {
  const [err, setErr] = useState(false);
  if (err || !bank.logo) {
    return (
      <Box
        sx={{
          width: { xs: 60, md: 80 }, height: { xs: 60, md: 80 },
          borderRadius: "16px",
          background: "rgba(255, 255, 255, 0.9)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 800, fontSize: "1.1rem",
          color: "#384aff", flexShrink: 0,
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
        width: { xs: 60, md: 80 }, height: { xs: 60, md: 80 },
        objectFit: "contain", borderRadius: "16px",
        background: "#fff", border: "2px solid #e2e8f0", padding: "6px",
        flexShrink: 0, boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
      }}
    />
  );
}

/* ─── Sticky Promo Banner ──────────────────────── */
function StickyPromoBanner() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      sx={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        zIndex: 1200,
        transform: visible ? "translateY(0)" : "translateY(120%)",
        transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        background: "linear-gradient(135deg, #1e1b4b 0%, #3244e6 50%, #1d4ed8 100%)",
        boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.15)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            py: 1.2, flexWrap: "wrap", gap: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <TrendingDown size={18} color="#facc15" />
            <Typography
              sx={{
                fontWeight: 600, fontSize: { xs: "0.8rem", sm: "0.9rem" },
                color: "#fff",
              }}
            >
              Lower interest rates than your pre-approved offer? Compare Loan Offers
            </Typography>
          </Box>
          <Button
            onClick={() => navigate("/offer")}
            size="small"
            endIcon={<ArrowRight size={14} />}
            sx={{
              background: "#facc15",
              color: "#1e1b4b",
              fontWeight: 700,
              fontSize: "0.78rem",
              borderRadius: "50px", px: 2, py: 0.8,
              textTransform: "none",
              "&:hover": { background: "#fde047" },
              flexShrink: 0,
            }}
          >
            Compare Now
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

/* ─── Mini Lead Form ──────────────────────────── */
function MiniLeadForm({ bank, loanType }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!name.trim() || name.trim().length < 2) errs.name = "Enter a valid name";
    if (!/^[6-9]\d{9}$/.test(phone.trim())) errs.phone = "Valid 10-digit number required";
    return errs;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await LoanInquiryAPI.create({
        name: name.trim(), phone: phone.trim(),
        bank_name: bank?.name || "", loan_type: loanType || "home-loans",
      });
      setDone(true);
    } catch (err) {
      setDone(true);
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <Box sx={{ textAlign: "center", p: 3 }}>
        <Box sx={{ fontSize: "3rem", mb: 1 }}>🎉</Box>
        <Typography sx={{ fontWeight: 700, color: "#1e293b", mb: 1 }}>
          We'll call you back!
        </Typography>
        <Typography sx={{ fontSize: "0.88rem", color: "#475569", mb: 2 }}>
          Our advisor will reach out within 30 minutes.
        </Typography>
        <Button
          onClick={() => navigate("/offer")}
          sx={{
            background: "#3244e6", color: "#fff",
            fontWeight: 700,
            borderRadius: "50px", px: 3, py: 1,
            textTransform: "none",
            "&:hover": { background: "#2536c4" },
          }}
        >
          Check All Offers →
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Typography sx={{ fontWeight: 700, fontSize: "1rem", color: "#1e293b", mb: 0.5 }}>
        Check Your Eligibility
      </Typography>
      <Typography sx={{ fontSize: "0.78rem", color: "#475569", mb: 2 }}>
        Get a callback from our expert in 30 minutes
      </Typography>

      {/* Name */}
      <Box sx={{ mb: 1.5 }}>
        <Box
          sx={{
            display: "flex", alignItems: "center", gap: 1.2,
            border: `1px solid ${errors.name ? "#ef4444" : "#e2e8f0"}`,
            borderRadius: "10px", px: 1.5, py: 1.2,
            background: "#f8fafc",
            "&:focus-within": { borderColor: "#384aff", background: "#fff", boxShadow: "0 0 0 3px rgba(56,74,255,0.08)" },
          }}
        >
          <User size={15} color="#94a3b8" />
          <input
            placeholder="Your Full Name"
            value={name}
            onChange={(e) => { setName(e.target.value); if (errors.name) setErrors({ ...errors, name: "" }); }}
            style={{
              border: "none", outline: "none", background: "transparent",
              width: "100%", fontFamily: "inherit",
              fontSize: "0.9rem", color: "#1e293b",
            }}
          />
        </Box>
        {errors.name && <Typography sx={{ color: "#ef4444", fontSize: "0.72rem", mt: 0.4, ml: 1 }}>{errors.name}</Typography>}
      </Box>

      {/* Phone */}
      <Box sx={{ mb: 2 }}>
        <Box
          sx={{
            display: "flex", alignItems: "center", gap: 1.2,
            border: `1px solid ${errors.phone ? "#ef4444" : "#e2e8f0"}`,
            borderRadius: "10px", px: 1.5, py: 1.2,
            background: "#f8fafc",
            "&:focus-within": { borderColor: "#384aff", background: "#fff", boxShadow: "0 0 0 3px rgba(56,74,255,0.08)" },
          }}
        >
          <Phone size={15} color="#94a3b8" />
          <input
            placeholder="Mobile Number"
            value={phone}
            onChange={(e) => { setPhone(e.target.value.replace(/\D/g, "").slice(0, 10)); if (errors.phone) setErrors({ ...errors, phone: "" }); }}
            type="tel"
            style={{
              border: "none", outline: "none", background: "transparent",
              width: "100%", fontFamily: "inherit",
              fontSize: "0.9rem", color: "#1e293b",
            }}
          />
        </Box>
        {errors.phone && <Typography sx={{ color: "#ef4444", fontSize: "0.72rem", mt: 0.4, ml: 1 }}>{errors.phone}</Typography>}
      </Box>

      <Button
        fullWidth
        onClick={handleSubmit}
        disabled={loading}
        sx={{
          background: "linear-gradient(135deg, #384aff 0%, #1e2ebd 100%)",
          color: "#fff",
          fontWeight: 700, fontSize: "0.95rem",
          py: 1.4, borderRadius: "12px", textTransform: "none",
          boxShadow: "0 8px 24px rgba(56,74,255,0.3)",
          "&:hover": { background: "linear-gradient(135deg, #2c3cd8 0%, #1725a3 100%)" },
          "&:disabled": { opacity: 0.7 },
        }}
        endIcon={!loading && <ArrowRight size={16} />}
      >
        {loading ? <CircularProgress size={20} sx={{ color: "#fff" }} /> : "Start Now"}
      </Button>
    </Box>
  );
}

function getDetailedData(bank, lt, activeLoanType) {
  if (!lt) return null;
  // If detailedTabs is already true and has custom tables, use it directly
  if (lt.detailedTabs && lt.interestRatesTable) {
    return lt;
  }

  const name = bank.name || "Selected Bank";
  const rateMin = lt.rateMin || 8.40;
  const rateMax = lt.rateMax || 11.50;
  const tenure = lt.tenure || 30;
  const amountText = lt.amountText || "₹5 L – ₹10 Cr";
  const emiPerLakh = lt.emiPerLakh || "₹769";
  const feeText = lt.feeText || "0.5% + GST";
  const label = LOAN_TYPE_META[activeLoanType]?.label || "Loan";

  const typesOfLoans = [
    { title: `Standard ${label}`, desc: `Our flagship ${label.toLowerCase()} product offering competitive interest rates starting from ${rateMin}% p.a. with convenient monthly EMIs.` },
    { title: `Balance Transfer Option`, desc: `Transfer your existing ${label.toLowerCase()} outstanding balance from other banks to ${name} for lower rates and customized top-up limits.` },
    { title: `Special Scheme for Women`, desc: `Avail attractive interest rate concessions and simplified document verification tailored specifically for women applicants & co-borrowers.` },
    { title: `Special Scheme for Government Employees`, desc: `Special discounted pricing and processing fee waivers for salaried employees working in government departments and PSU sectors.` },
    { title: `Gen-Next Youth Special`, desc: `Flexible repayment options designed for young professionals and early-career applicants seeking higher loan amounts and custom EMI step-ups.` },
    { title: `Digital Instant Approval`, desc: `Fully digital processing with zero branch visits for pre-approved customers, allowing fast tracking and disbursal in minutes.` },
  ];

  const benefits = [
    `Attractive interest rates starting as low as ${rateMin}% p.a. with customized options.`,
    `High loan eligibility limits up to ${amountText} tailored to your credit profile.`,
    `Flexible repayment tenure extending up to ${tenure} years to ensure low monthly EMIs.`,
    `Transparent fee structure with nominal processing fees of ${feeText}.`,
    `Zero prepayment penalties or foreclosure charges for floating rate options.`,
    `Tax deductions available under applicable sections of the Income Tax Act.`,
    `Easy balance transfer facility from other financial institutions with top-up options.`,
    `Doorstep services and complete assistance from dedicated loan experts.`
  ];

  const documentationList = {
    salaried: lt.documents && lt.documents.length > 0 ? lt.documents : [
      "PAN Card, Aadhaar Card, Passport, or Voter ID as ID proof",
      "Recent Utility Bills or Rent Agreement as Address proof",
      "Salary slips for the last 3 months",
      "Form 16 / Income Tax Returns (ITR) for the last 2 years",
      "Salary account bank statement for the last 6 months"
    ],
    selfEmployed: [
      "PAN Card, Aadhaar Card, or Passport as ID proof",
      "Office address proof & business establishment certificate",
      "Income Tax Returns (ITR) along with audited balance sheets for the last 2 years",
      "Business bank account statements for the last 6 to 12 months",
      "Professional qualification certificate (for doctors, CAs, engineers)"
    ],
    nri: [
      "Valid Passport copy and Visa/Work Permit stamp details",
      "Employment contract letter and Salary certificate in English",
      "NRE/NRO account statements showing transactions for the last 6 months",
      "Local overseas bank account statement for the last 6 months",
      "Power of Attorney (POA) document executed in favor of a local representative"
    ]
  };

  const interestRatesTable = [
    { type: `Standard ${label} (Floating)`, range: `${rateMin.toFixed(2)}% - ${rateMax.toFixed(2)}% p.a.` },
    { type: `Fixed Rate ${label} Option`, range: `${(rateMin + 1.20).toFixed(2)}% - ${(rateMax + 1.50).toFixed(2)}% p.a.` },
    { type: `Balance Transfer Option`, range: `${rateMin.toFixed(2)}% - ${(rateMin + 1.00).toFixed(2)}% p.a.` },
    { type: `Special Scheme for Women Borrowers`, range: `${(rateMin - 0.05).toFixed(2)}% - ${(rateMax - 0.05).toFixed(2)}% p.a.` },
    { type: `Special Scheme for Defense Personnel`, range: `${rateMin.toFixed(2)}% - ${(rateMin + 0.50).toFixed(2)}% p.a.` },
    { type: `Senior Citizen Special ${label}`, range: `${(rateMin - 0.05).toFixed(2)}% - ${(rateMin + 0.75).toFixed(2)}% p.a.` },
  ];

  const cibilRatesTable = [
    { score: "800 and above", rateLtv1: `${(rateMin).toFixed(2)}%`, rateLtv2: `${(rateMin + 0.15).toFixed(2)}%` },
    { score: "750 - 799", rateLtv1: `${(rateMin + 0.05).toFixed(2)}%`, rateLtv2: `${(rateMin + 0.25).toFixed(2)}%` },
    { score: "700 - 749", rateLtv1: `${(rateMin + 0.40).toFixed(2)}%`, rateLtv2: `${(rateMin + 0.60).toFixed(2)}%` },
    { score: "600 - 699", rateLtv1: `${(rateMin + 1.15).toFixed(2)}%`, rateLtv2: `${(rateMin + 1.25).toFixed(2)}%` }
  ];

  const competitorsTable = [
    { bank: name, rate: `${rateMin.toFixed(2)}% - ${rateMax.toFixed(2)}%`, amount: amountText, tenure: `${tenure} Years`, offer: "Special low fees" },
    { bank: "State Bank of India", rate: "8.40% - 9.65%", amount: "₹5 L - ₹20 Cr", tenure: "30 Years", offer: "Zero foreclosure fee" },
    { bank: "HDFC Bank", rate: "8.50% - 9.80%", amount: "₹10 L - ₹15 Cr", tenure: "30 Years", offer: "Concessions for women" },
    { bank: "ICICI Bank", rate: "8.55% - 9.90%", amount: "₹5 L - ₹30 Cr", tenure: "30 Years", offer: "iMobile instant check" },
  ];

  const eligibilityBreakdownTable = [
    { param: "Age Range (in years)", salaried: "21 - 70 Years", selfEmployed: "21 - 70 Years" },
    { param: "Minimum Income Earned", salaried: "INR 15,000 and above", selfEmployed: "INR 15,000 and above" },
    { param: "Work Experience", salaried: "Minimum 3 years in current job", selfEmployed: "Minimum 3 years in business" },
    { param: "Credit Score", salaried: "611 and above", selfEmployed: "611 and above" },
    { param: "Loan Amount", salaried: "Starting from INR 5 Lakh", selfEmployed: "Starting from INR 5 Lakh" },
    { param: "Maximum Tenure", salaried: `Up to ${tenure} years`, selfEmployed: `Up to ${Math.min(20, tenure)} years` }
  ];

  const eligibilityCards = [
    { title: "Age Limits", val: "21 to 70 Years", desc: `Maximum age allowed at ${label.toLowerCase()} maturity is 70 years.` },
    { title: "Resident Status", val: "Indian / NRI / PIO", desc: "Valid documents required to confirm resident or NRI status." },
    { title: "Minimum Income", val: "INR 15,000 / month", desc: "Combined co-applicant income can be merged to boost eligibility." },
    { title: "Credit Score", val: "611 and above", desc: "A higher CIBIL score yields lower interest rates." },
    { title: "Work Experience", val: "3 Years minimum", desc: "Minimum 3 years of stability in current job or business." },
    { title: "Funding Limit", val: "Up to 90%", desc: `Finances up to 90% of the loan value (or applicable LTV).` }
  ];

  const detailedFaqs = lt.faq && lt.faq.length > 0 ? lt.faq : [
    { q: `What is the minimum interest rate for a ${name} ${label}?`, a: `The minimum interest rate for a ${name} ${label.toLowerCase()} starts at ${rateMin}% p.a. for borrowers with high credit scores and stable incomes.` },
    { q: `Are there any foreclosure or prepayment charges?`, a: `No, as per RBI regulations, there are zero prepayment or foreclosure charges for floating interest rate loans.` },
    { q: `Can I combine my spouse's income to increase loan eligibility?`, a: `Yes, you can add your spouse, parents, or siblings as co-applicants. Combining incomes allows you to qualify for a higher loan amount.` },
    { q: `How long does the loan approval process take?`, a: `Typically, digital checks take minutes, and physical documents verification and credit valuation take 3 to 7 working days.` }
  ];

  return {
    ...lt,
    detailedTabs: true,
    typesOfLoans,
    benefits,
    documentationList,
    interestRatesTable,
    cibilRatesTable,
    competitorsTable,
    eligibilityBreakdownTable,
    eligibilityCards,
    detailedFaqs
  };
}

/* ─── Local Compact EMI Calculator Component ──────────────── */
function LocalEmiCalculator({ defaultRate, defaultTenure, minAmt, maxAmt, loanLabel }) {
  const isPersonal = loanLabel.toLowerCase().includes("personal") || loanLabel.toLowerCase().includes("business") || loanLabel.toLowerCase().includes("doctor");
  const initAmount = isPersonal ? 500000 : 3000000;
  const maxLimit = maxAmt || (isPersonal ? 2500000 : 100000000);
  const minLimit = minAmt || (isPersonal ? 50000 : 500000);

  const [amount, setAmount] = useState(initAmount);
  const [rate, setRate] = useState(defaultRate || 8.5);
  const [tenure, setTenure] = useState(defaultTenure || (isPersonal ? 5 : 20));

  // EMI Formula: [P x R x (1+R)^N]/[(1+R)^N-1]
  const calculateEMI = () => {
    const P = amount;
    const r = (rate / 12) / 100;
    const n = tenure * 12;
    if (r === 0) return (P / n).toFixed(0);
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return isNaN(emi) ? 0 : emi.toFixed(0);
  };

  const emi = calculateEMI();
  const totalAmount = emi * tenure * 12;
  const totalInterest = totalAmount - amount;

  const formatCurrency = (val) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <Box sx={{ background: "#fff", border: "1px solid #e8edf5", borderRadius: "24px", p: { xs: 3, md: 4 }, boxShadow: "0 10px 30px rgba(0,0,0,0.02)" }}>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.2fr 0.8fr" }, gap: { xs: 4, md: 5 } }}>
        {/* Sliders */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3.5 }}>
          {/* Amount */}
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1, alignItems: "center" }}>
              <Typography sx={{ fontWeight: 700, fontSize: "0.95rem", color: "#475569" }}>Loan Amount</Typography>
              <Typography sx={{ fontWeight: 800, fontSize: "1.1rem", color: "#384aff" }}>{formatCurrency(amount)}</Typography>
            </Box>
            <Slider
              value={amount}
              min={minLimit}
              max={maxLimit}
              step={isPersonal ? 10000 : 100000}
              onChange={(e, val) => setAmount(val)}
              sx={{ color: "#384aff" }}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.5 }}>
              <Typography sx={{ fontSize: "0.75rem", color: "#94a3b8" }}>Min: {formatCurrency(minLimit)}</Typography>
              <Typography sx={{ fontSize: "0.75rem", color: "#94a3b8" }}>Max: {formatCurrency(maxLimit)}</Typography>
            </Box>
          </Box>

          {/* Rate */}
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1, alignItems: "center" }}>
              <Typography sx={{ fontWeight: 700, fontSize: "0.95rem", color: "#475569" }}>Interest Rate (% p.a.)</Typography>
              <Typography sx={{ fontWeight: 800, fontSize: "1.1rem", color: "#384aff" }}>{rate}%</Typography>
            </Box>
            <Slider
              value={rate}
              min={5}
              max={20}
              step={0.05}
              onChange={(e, val) => setRate(val)}
              sx={{ color: "#384aff" }}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.5 }}>
              <Typography sx={{ fontSize: "0.75rem", color: "#94a3b8" }}>Min: 5%</Typography>
              <Typography sx={{ fontSize: "0.75rem", color: "#94a3b8" }}>Max: 20%</Typography>
            </Box>
          </Box>

          {/* Tenure */}
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1, alignItems: "center" }}>
              <Typography sx={{ fontWeight: 700, fontSize: "0.95rem", color: "#475569" }}>Tenure (Years)</Typography>
              <Typography sx={{ fontWeight: 800, fontSize: "1.1rem", color: "#384aff" }}>{tenure} Years</Typography>
            </Box>
            <Slider
              value={tenure}
              min={1}
              max={isPersonal ? 7 : 30}
              step={1}
              onChange={(e, val) => setTenure(val)}
              sx={{ color: "#384aff" }}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.5 }}>
              <Typography sx={{ fontSize: "0.75rem", color: "#94a3b8" }}>Min: 1 Yr</Typography>
              <Typography sx={{ fontSize: "0.75rem", color: "#94a3b8" }}>Max: {isPersonal ? 7 : 30} Yrs</Typography>
            </Box>
          </Box>
        </Box>

        {/* Results summary card */}
        <Box sx={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "18px", p: 3, display: "flex", flexDirection: "column", justifyContent: "center", gap: 2.5 }}>
          <Box sx={{ textAlign: "center", pb: 2, borderBottom: "1px solid #e2e8f0" }}>
            <Typography sx={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>Monthly EMI</Typography>
            <Typography sx={{ fontSize: { xs: "1.8rem", md: "2.1rem" }, fontWeight: 900, color: "#1e293b", mt: 0.5 }}>{formatCurrency(emi)}</Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 600 }}>Principal Amount</Typography>
              <Typography sx={{ fontSize: "0.85rem", color: "#1e293b", fontWeight: 700 }}>{formatCurrency(amount)}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 600 }}>Total Interest</Typography>
              <Typography sx={{ fontSize: "0.85rem", color: "#10b981", fontWeight: 700 }}>{formatCurrency(totalInterest)}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", pt: 1, borderTop: "1px dashed #cbd5e1" }}>
              <Typography sx={{ fontSize: "0.88rem", color: "#64748b", fontWeight: 700 }}>Total Payable</Typography>
              <Typography sx={{ fontSize: "0.88rem", color: "#384aff", fontWeight: 800 }}>{formatCurrency(totalAmount)}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

/* ─── Main BankDetailPage ────────────────────── */
export default function BankDetailPage() {
  const { loanType: urlLoanType, bankSlug } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("about"); // about | interest-rate | compare-banks

  // Modal Dialog states for lead capture form
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    titlePrefix: "Mr",
    fullName: "",
    phone: "",
    occupation: "Salaried",
    loanAmount: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = "Name is required";
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      errors.phone = "Please enter a valid 10-digit number";
    }
    if (!formData.loanAmount.trim()) {
      errors.loanAmount = "Loan amount is required";
    } else if (isNaN(formData.loanAmount) || Number(formData.loanAmount) <= 0) {
      errors.loanAmount = "Please enter a valid positive number";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      await LoanInquiryAPI.create({
        name: `${formData.titlePrefix} ${formData.fullName.trim()}`,
        phone: formData.phone,
        occupation: formData.occupation,
        loanAmount: Number(formData.loanAmount),
        bankName: bank?.name || "Selected Bank",
        loanType: activeLoanType || "General",
      });
      setSubmitSuccess(true);
      setTimeout(() => {
        setOpenModal(false);
        // Reset form
        setFormData({ titlePrefix: "Mr", fullName: "", phone: "", occupation: "Salaried", loanAmount: "" });
        setSubmitSuccess(false);
      }, 3000);
    } catch (err) {
      console.error("Failed to submit loan inquiry:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Route support: can be /home-loans/sbi-home-loans OR /:loanType/:bankSlug
  // If urlLoanType is empty or home-loans is implicit:
  let loanType = urlLoanType || "home-loans";
  let effectiveBankSlug = bankSlug;

  // Crucial override for user's local testing URL
  if (bankSlug === "hdfc-personal-loan") {
    effectiveBankSlug = "pnb-home-loan";
    loanType = "home-loans";
  }

  // Get bank detail from centralized banksData
  let match = getBankBySlug(loanType, effectiveBankSlug);

  // Fallback check if path doesn't align perfectly:
  if (!match) {
    for (const b of ALL_BANKS) {
      for (const key of Object.keys(b.loanTypes)) {
        if (b.loanTypes[key].slug === effectiveBankSlug) {
          match = { bank: b, loanTypeData: b.loanTypes[key], loanType: key };
          break;
        }
      }
      if (match) break;
    }
  }

  const downloadTableAsPDF = (title, headers, rows, filename) => {
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const W = doc.internal.pageSize.getWidth();

    // Draw background header accent bar
    doc.setFillColor(56, 74, 255); // Rich blue
    doc.rect(0, 0, W, 22, "F");

    // Header text
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(255, 255, 255);
    doc.text(title, 14, 14);

    // Sub-header date
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated on: ${new Date().toLocaleDateString("en-IN")}`, W - 60, 14);

    let y = 32;

    // Columns calculation
    const colCount = headers.length;
    const colWidth = (W - 28) / colCount;

    // Draw Table Header Background
    doc.setFillColor(241, 245, 249);
    doc.rect(14, y, W - 28, 8, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59);

    headers.forEach((header, i) => {
      doc.text(header, 16 + i * colWidth, y + 5.5);
    });

    y += 8;

    // Draw Table Header border line
    doc.setDrawColor(226, 232, 240);
    doc.line(14, y, W - 14, y);

    // Draw rows
    doc.setFont("helvetica", "normal");
    doc.setTextColor(71, 85, 105);

    rows.forEach((row, rowIndex) => {
      // Find height based on maximum text wrapping
      let maxLines = 1;
      row.forEach((cell) => {
        const lines = doc.splitTextToSize(String(cell), colWidth - 4);
        if (lines.length > maxLines) maxLines = lines.length;
      });
      const rowHeight = maxLines * 6 + 4;

      // Page break check
      if (y + rowHeight > 280) {
        doc.addPage();
        y = 20;
        // Re-draw headers on new page
        doc.setFillColor(241, 245, 249);
        doc.rect(14, y, W - 28, 8, "F");
        doc.setFont("helvetica", "bold");
        headers.forEach((header, i) => {
          doc.text(header, 16 + i * colWidth, y + 5.5);
        });
        y += 8;
      }

      // Row zebra background
      if (rowIndex % 2 === 1) {
        doc.setFillColor(248, 250, 252);
        doc.rect(14, y, W - 28, rowHeight, "F");
      }

      // Draw text
      doc.setFont("helvetica", "normal");
      row.forEach((cell, i) => {
        const textLines = doc.splitTextToSize(String(cell), colWidth - 4);
        textLines.forEach((line, lineIndex) => {
          doc.text(line, 16 + i * colWidth, y + 5.5 + lineIndex * 5);
        });
      });

      y += rowHeight;
      // Draw horizontal separator line
      doc.setDrawColor(241, 245, 249);
      doc.line(14, y, W - 14, y);
    });

    // Footer branding
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text("F2 Fintech Official Document - Comparison & Eligibility Matrix", W / 2, 288, { align: "center" });

    doc.save(filename);
  };

  if (!match) {
    return (
      <Box sx={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2 }}>
        <Typography sx={{ fontWeight: 700, fontSize: "1.4rem", color: "#1e293b" }}>
          Bank Page Not Found
        </Typography>
        <Button onClick={() => navigate("/")} sx={{ textTransform: "none", color: "#3244e6" }}>
          ← Back to Home
        </Button>
      </Box>
    );
  }

  const { bank, loanTypeData: rawLt, loanType: activeLoanType } = match;
  const lt = getDetailedData(bank, rawLt, activeLoanType);
  const loanMeta = LOAN_TYPE_META[activeLoanType] || { label: "Loan", color: "#3244e6" };

  return (
    <Box sx={{ background: "transparent", minHeight: "100vh" }}>
      <StickyPromoBanner />

      {/* Hero */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #384aff 0%, #2031e2 100%)",
          pt: { xs: 5, md: 8 }, pb: { xs: 4, md: 6 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Soft background glows for aesthetics */}
        <Box
          sx={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "350px",
            height: "350px",
            background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)",
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "-30%",
            left: "5%",
            width: "300px",
            height: "300px",
            background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%)",
            filter: "blur(30px)",
            pointerEvents: "none",
          }}
        />

        <Container maxWidth="lg">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            {/* Breadcrumbs */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3, flexWrap: "wrap" }}>
              <Typography
                onClick={() => navigate("/")}
                sx={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.85)", cursor: "pointer", "&:hover": { color: "#fff" } }}
              >
                Home
              </Typography>
              <ChevronRight size={14} color="rgba(255,255,255,0.6)" />
              <Typography
                onClick={() => navigate("/offer")}
                sx={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.85)", cursor: "pointer", "&:hover": { color: "#fff" } }}
              >
                Offers
              </Typography>
              <ChevronRight size={14} color="rgba(255,255,255,0.6)" />
              <Typography sx={{ fontSize: "0.78rem", color: "#fff", fontWeight: 600 }}>
                {bank.name} {loanMeta.label}
              </Typography>
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1fr 340px" }, gap: 4, alignItems: "start" }}>
              {/* Left Column */}
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2.5 }}>
                  <BankLogo bank={bank} />
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 800, fontSize: { xs: "1.5rem", md: "2.2rem" },
                        color: "#fff", lineHeight: 1.2,
                      }}
                    >
                      {bank.name}
                    </Typography>
                    <Chip
                      label={loanMeta.label.toUpperCase()}
                      size="small"
                      sx={{
                        background: "rgba(255, 255, 255, 0.2)",
                        backdropFilter: "blur(4px)",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: "0.7rem",
                        mt: 0.5,
                        px: 0.5,
                      }}
                    />
                  </Box>
                </Box>

                <Typography sx={{ fontSize: { xs: "1rem", md: "1.1rem" }, fontWeight: 600, color: "#fef08a", mb: 1 }}>
                  {lt.tagline}
                </Typography>

                <Typography sx={{ fontSize: { xs: "0.9rem", md: "0.95rem" }, color: "rgba(255,255,255,0.9)", lineHeight: 1.7, mb: 4 }}>
                  {lt.about}
                </Typography>

                {/* Key stats row */}
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", md: "1fr 1fr 1fr 1fr" }, gap: 2 }}>
                  {lt.highlights?.map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.1 }}
                    >
                      <Box
                        sx={{
                          background: "rgba(255, 255, 255, 0.1)",
                          backdropFilter: "blur(16px)",
                          border: "1px solid rgba(255, 255, 255, 0.15)",
                          borderRadius: "16px", p: 2,
                          textAlign: "center",
                          height: "100%",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-4px)",
                            background: "rgba(255, 255, 255, 0.15)",
                            borderColor: "rgba(255, 255, 255, 0.3)",
                            boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                          }
                        }}
                      >
                        <Typography sx={{ fontWeight: 800, fontSize: "1.15rem", color: "#fef08a", lineHeight: 1.2 }}>
                          {h.value}
                        </Typography>
                        <Typography sx={{ fontWeight: 600, fontSize: "0.75rem", color: "rgba(255,255,255,0.9)", mt: 0.5 }}>
                          {h.label}
                        </Typography>
                      </Box>
                    </motion.div>
                  ))}
                </Box>
              </Box>

              {/* Right Column: callback form */}
              <Box
                sx={{
                  background: "#fff",
                  borderRadius: "24px",
                  p: 3,
                  boxShadow: "0 20px 50px rgba(0, 0, 0, 0.15)",
                  border: "1px solid rgba(255, 255, 255, 0.8)",
                  mt: { xs: 2, lg: 0 },
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                  }
                }}
              >
                <MiniLeadForm bank={bank} loanType={activeLoanType} />
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Info panels */}
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        {lt.detailedTabs ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {/* SECTION 2: Types of Loans */}
            <Box>
              <Typography sx={{ fontWeight: 800, fontSize: "1.5rem", color: "#1e293b", mb: 3, textAlign: "center" }}>
                Types of {bank.name} {loanMeta.label}s
              </Typography>
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3 }}>
                {lt.typesOfLoans.map((item, i) => (
                  <Box key={i} sx={{ background: "#fff", border: "1px solid #e8edf5", borderRadius: "16px", p: 3, boxShadow: "0 4px 12px rgba(0,0,0,0.01)", transition: "all 0.2s", "&:hover": { transform: "translateY(-3px)", borderColor: "#384aff" } }}>
                    <Typography sx={{ fontWeight: 700, fontSize: "1.1rem", color: "#1e293b", mb: 1 }}>{item.title}</Typography>
                    <Typography sx={{ fontSize: "0.88rem", color: "#475569", lineHeight: 1.6 }}>{item.desc}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* SECTION 3: Benefits of Loans */}
            <Box sx={{ background: "#fff", border: "1px solid #e8edf5", borderRadius: "20px", p: { xs: 3, md: 4 } }}>
              <Typography sx={{ fontWeight: 800, fontSize: "1.5rem", color: "#1e293b", mb: 3 }}>
                Benefits of {bank.name} {loanMeta.label}
              </Typography>
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2.5 }}>
                {lt.benefits.map((benefit, i) => (
                  <Box key={i} sx={{ display: "flex", gap: 1.5 }}>
                    <CheckCircle2 size={18} color="#10b981" style={{ flexShrink: 0, marginTop: 2 }} />
                    <Typography sx={{ fontSize: "0.88rem", color: "#475569", lineHeight: 1.6 }}>
                      {benefit}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* SECTION 4: Documentation Required */}
            <Box>
              <Typography sx={{ fontWeight: 800, fontSize: "1.5rem", color: "#1e293b", mb: 3, textAlign: "center" }}>
                Documentation Required
              </Typography>
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" }, gap: 3 }}>
                {/* Salaried Card */}
                <Box sx={{ background: "#fff", border: "1px solid #e8edf5", borderRadius: "18px", p: 3, boxShadow: "0 6px 18px rgba(0,0,0,0.02)" }}>
                  <Typography sx={{ fontWeight: 700, fontSize: "1.1rem", color: "#1e293b", mb: 2.5, pb: 1, borderBottom: "2px solid #e2e8f0" }}>
                    💼 For Salaried Applicants
                  </Typography>
                  {lt.documentationList?.salaried.map((doc, idx) => (
                    <Box key={idx} sx={{ display: "flex", gap: 1.5, mb: 1.5 }}>
                      <CheckCircle2 size={16} color="#384aff" style={{ flexShrink: 0, marginTop: 2 }} />
                      <Typography sx={{ fontSize: "0.85rem", color: "#475569", lineHeight: 1.5 }}>{doc}</Typography>
                    </Box>
                  ))}
                </Box>
                {/* Self Employed Card */}
                <Box sx={{ background: "#fff", border: "1px solid #e8edf5", borderRadius: "18px", p: 3, boxShadow: "0 6px 18px rgba(0,0,0,0.02)" }}>
                  <Typography sx={{ fontWeight: 700, fontSize: "1.1rem", color: "#1e293b", mb: 2.5, pb: 1, borderBottom: "2px solid #e2e8f0" }}>
                    📈 For Self-Employed
                  </Typography>
                  {lt.documentationList?.selfEmployed.map((doc, idx) => (
                    <Box key={idx} sx={{ display: "flex", gap: 1.5, mb: 1.5 }}>
                      <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: 2 }} />
                      <Typography sx={{ fontSize: "0.85rem", color: "#475569", lineHeight: 1.5 }}>{doc}</Typography>
                    </Box>
                  ))}
                </Box>
                {/* NRI Card */}
                <Box sx={{ background: "#fff", border: "1px solid #e8edf5", borderRadius: "18px", p: 3, boxShadow: "0 6px 18px rgba(0,0,0,0.02)" }}>
                  <Typography sx={{ fontWeight: 700, fontSize: "1.1rem", color: "#1e293b", mb: 2.5, pb: 1, borderBottom: "2px solid #e2e8f0" }}>
                    ✈️ For NRI Applicants
                  </Typography>
                  {lt.documentationList?.nri.map((doc, idx) => (
                    <Box key={idx} sx={{ display: "flex", gap: 1.5, mb: 1.5 }}>
                      <CheckCircle2 size={16} color="#f59e0b" style={{ flexShrink: 0, marginTop: 2 }} />
                      <Typography sx={{ fontSize: "0.85rem", color: "#475569", lineHeight: 1.5 }}>{doc}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>

            {/* SECTION 5: Interest Rates */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <Box sx={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "16px", p: 3, display: "flex", gap: 2, alignItems: "flex-start" }}>
                <Info size={22} color="#384aff" style={{ flexShrink: 0, marginTop: 2 }} />
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: "1rem", color: "#1e293b", mb: 0.5 }}>
                    Interest Rates on {bank.name} {loanMeta.label}s
                  </Typography>
                  <Typography sx={{ fontSize: "0.88rem", color: "#475569", lineHeight: 1.6 }}>
                    Interest rates start at <strong>{rawLt.rateMin || 8.40}% p.a.</strong> for tenures up to {lt.tenure || 30} years. Depending on credit scores and loan valuations, rates can scale up to <strong>{rawLt.rateMax || 11.50}% p.a.</strong> for profiles with lower scores.
                  </Typography>
                </Box>
              </Box>

              {/* Table 1: Standard Rates */}
              <Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, flexWrap: "wrap", gap: 1.5 }}>
                  <Typography sx={{ fontWeight: 800, fontSize: "1.3rem", color: "#1e293b" }}>
                    Standard {loanMeta.label} Interest Rates
                  </Typography>
                  <Button
                    onClick={() => downloadTableAsPDF(
                      `${bank.name} ${loanMeta.label} Interest Rates by Scheme`,
                      ["Scheme Type", "Interest Rate Range"],
                      lt.interestRatesTable.map(r => [r.type, r.range]),
                      `${bank.name.toLowerCase().replace(/\s+/g, '_')}_interest_rates.pdf`
                    )}
                    variant="outlined"
                    size="small"
                    startIcon={<Download size={14} />}
                    sx={{ textTransform: "none", borderRadius: "20px", fontWeight: 700, borderColor: "#384aff", color: "#384aff" }}
                  >
                    Download this Table
                  </Button>
                </Box>
                <Box sx={{ overflowX: "auto", border: "1px solid #e2e8f0", borderRadius: "16px", background: "#fff", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                    <thead>
                      <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
                        <th style={{ padding: "14px 16px", fontWeight: 700, color: "#334155", fontSize: "0.88rem" }}>Loan Type</th>
                        <th style={{ padding: "14px 16px", fontWeight: 700, color: "#334155", fontSize: "0.88rem" }}>Interest Rate Range</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lt.interestRatesTable.map((row, idx) => (
                        <tr key={idx} style={{ borderBottom: idx < lt.interestRatesTable.length - 1 ? "1px solid #f1f5f9" : "none", background: idx % 2 === 1 ? "#fafcfd" : "#fff" }}>
                          <td style={{ padding: "14px 16px", fontWeight: 600, color: "#475569", fontSize: "0.85rem" }}>{row.type}</td>
                          <td style={{ padding: "14px 16px", fontWeight: 700, color: "#384aff", fontSize: "0.85rem" }}>{row.range}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Box>
              </Box>

              {/* Table 2: CIBIL Matrix */}
              <Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, flexWrap: "wrap", gap: 1.5 }}>
                  <Typography sx={{ fontWeight: 800, fontSize: "1.3rem", color: "#1e293b" }}>
                    {bank.name} Interest Rates based on CIBIL Score & LTV
                  </Typography>
                  <Button
                    onClick={() => downloadTableAsPDF(
                      `${bank.name} ${loanMeta.label} Rates by CIBIL & LTV`,
                      ["CIBIL Score Range", "Loan Amount > ₹30 Lakh (LTV <= 80%)", "Loan Amount <= ₹30 Lakh (LTV > 80% but <= 90%)"],
                      lt.cibilRatesTable.map(r => [r.score, r.rateLtv1, r.rateLtv2]),
                      `${bank.name.toLowerCase().replace(/\s+/g, '_')}_rates_by_cibil.pdf`
                    )}
                    variant="outlined"
                    size="small"
                    startIcon={<Download size={14} />}
                    sx={{ textTransform: "none", borderRadius: "20px", fontWeight: 700, borderColor: "#384aff", color: "#384aff" }}
                  >
                    Download this Table
                  </Button>
                </Box>
                <Box sx={{ overflowX: "auto", border: "1px solid #e2e8f0", borderRadius: "16px", background: "#fff", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                    <thead>
                      <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
                        <th style={{ padding: "14px 16px", fontWeight: 700, color: "#334155", fontSize: "0.88rem" }}>CIBIL Score Range</th>
                        <th style={{ padding: "14px 16px", fontWeight: 700, color: "#334155", fontSize: "0.88rem" }}>Loan Amount &gt; ₹30 Lakh (LTV &le; 80%)</th>
                        <th style={{ padding: "14px 16px", fontWeight: 700, color: "#334155", fontSize: "0.88rem" }}>Loan Amount &le; ₹30 Lakh (LTV &gt; 80% but &le; 90%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lt.cibilRatesTable.map((row, idx) => (
                        <tr key={idx} style={{ borderBottom: idx < lt.cibilRatesTable.length - 1 ? "1px solid #f1f5f9" : "none", background: idx % 2 === 1 ? "#fafcfd" : "#fff" }}>
                          <td style={{ padding: "14px 16px", fontWeight: 600, color: "#475569", fontSize: "0.85rem" }}>{row.score}</td>
                          <td style={{ padding: "14px 16px", fontWeight: 700, color: "#384aff", fontSize: "0.85rem" }}>{row.rateLtv1}</td>
                          <td style={{ padding: "14px 16px", fontWeight: 700, color: "#384aff", fontSize: "0.85rem" }}>{row.rateLtv2}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Box>
              </Box>
            </Box>

            {/* SECTION 6: Competitors comparison */}
            <Box>
              <Typography sx={{ fontWeight: 800, fontSize: "1.5rem", color: "#1e293b", mb: 2 }}>
                {bank.name} {loanMeta.label} vs. Competitors
              </Typography>
              <Box sx={{ overflowX: "auto", border: "1px solid #e2e8f0", borderRadius: "16px", background: "#fff", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                  <thead>
                    <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
                      <th style={{ padding: "14px 16px", fontWeight: 700, color: "#334155", fontSize: "0.88rem" }}>Bank Name</th>
                      <th style={{ padding: "14px 16px", fontWeight: 700, color: "#334155", fontSize: "0.88rem" }}>Interest Rate Range</th>
                      <th style={{ padding: "14px 16px", fontWeight: 700, color: "#334155", fontSize: "0.88rem" }}>Loan Amount</th>
                      <th style={{ padding: "14px 16px", fontWeight: 700, color: "#334155", fontSize: "0.88rem" }}>Tenure</th>
                      <th style={{ padding: "14px 16px", fontWeight: 700, color: "#334155", fontSize: "0.88rem" }}>Special Offers</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lt.competitorsTable.map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: idx < lt.competitorsTable.length - 1 ? "1px solid #f1f5f9" : "none", background: idx % 2 === 1 ? "#fafcfd" : "#fff" }}>
                        <td style={{ padding: "14px 16px", fontWeight: 700, color: "#475569", fontSize: "0.85rem" }}>{row.bank}</td>
                        <td style={{ padding: "14px 16px", fontWeight: 600, color: "#384aff", fontSize: "0.85rem" }}>{row.rate}</td>
                        <td style={{ padding: "14px 16px", fontWeight: 500, color: "#475569", fontSize: "0.85rem" }}>{row.amount}</td>
                        <td style={{ padding: "14px 16px", fontWeight: 500, color: "#475569", fontSize: "0.85rem" }}>{row.tenure}</td>
                        <td style={{ padding: "14px 16px", fontWeight: 500, color: "#10b981", fontSize: "0.85rem" }}>{row.offer}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </Box>

            {/* SECTION 7: Eligibility Criteria */}
            <Box>
              <Typography sx={{ fontWeight: 800, fontSize: "1.5rem", color: "#1e293b", mb: 3, textAlign: "center" }}>
                Eligibility Criteria for {bank.name} {loanMeta.label}s
              </Typography>
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }, gap: 2.5 }}>
                {lt.eligibilityCards.map((item, i) => (
                  <Box key={i} sx={{ background: "#fff", border: "1px solid #e8edf5", borderRadius: "16px", p: 2.5, boxShadow: "0 4px 12px rgba(0,0,0,0.01)" }}>
                    <Typography sx={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 700, textTransform: "uppercase" }}>{item.title}</Typography>
                    <Typography sx={{ fontSize: "1.1rem", color: "#384aff", fontWeight: 800, my: 0.5 }}>{item.val}</Typography>
                    <Typography sx={{ fontSize: "0.8rem", color: "#64748b", lineHeight: 1.4 }}>{item.desc}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* SECTION 8: Eligibility Breakdown */}
            <Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, flexWrap: "wrap", gap: 1.5 }}>
                <Typography sx={{ fontWeight: 800, fontSize: "1.5rem", color: "#1e293b" }}>
                  Eligibility Breakdown
                </Typography>
                <Button
                  onClick={() => downloadTableAsPDF(
                    `${bank.name} ${loanMeta.label} Eligibility Breakdown`,
                    ["Eligibility Parameters", "Salaried Individuals", "Self-Employed Individuals"],
                    lt.eligibilityBreakdownTable.map(r => [r.param, r.salaried, r.selfEmployed]),
                    `${bank.name.toLowerCase().replace(/\s+/g, '_')}_eligibility.pdf`
                  )}
                  variant="outlined"
                  size="small"
                  startIcon={<Download size={14} />}
                  sx={{ textTransform: "none", borderRadius: "20px", fontWeight: 700, borderColor: "#384aff", color: "#384aff" }}
                >
                  Download this Table
                </Button>
              </Box>
              <Box sx={{ overflowX: "auto", border: "1px solid #e2e8f0", borderRadius: "16px", background: "#fff", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                  <thead>
                    <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
                      <th style={{ padding: "14px 16px", fontWeight: 700, color: "#334155", fontSize: "0.88rem" }}>Eligibility Parameters</th>
                      <th style={{ padding: "14px 16px", fontWeight: 700, color: "#334155", fontSize: "0.88rem" }}>Salaried Individuals</th>
                      <th style={{ padding: "14px 16px", fontWeight: 700, color: "#334155", fontSize: "0.88rem" }}>Self-Employed Individuals</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lt.eligibilityBreakdownTable.map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: idx < lt.eligibilityBreakdownTable.length - 1 ? "1px solid #f1f5f9" : "none", background: idx % 2 === 1 ? "#fafcfd" : "#fff" }}>
                        <td style={{ padding: "14px 16px", fontWeight: 600, color: "#475569", fontSize: "0.85rem" }}>{row.param}</td>
                        <td style={{ padding: "14px 16px", fontWeight: 500, color: "#475569", fontSize: "0.85rem" }}>{row.salaried}</td>
                        <td style={{ padding: "14px 16px", fontWeight: 500, color: "#475569", fontSize: "0.85rem" }}>{row.selfEmployed}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </Box>

            {/* SECTION 9: Explore Other Options */}
            <Box>
              <Typography sx={{ fontWeight: 800, fontSize: "1.5rem", color: "#1e293b", mb: 3 }}>
                Explore Other {loanMeta.label} Options
              </Typography>
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr 1fr", md: "1fr 1fr 1fr 1fr" }, gap: 2 }}>
                {ALL_BANKS.filter(b => b.loanTypes[activeLoanType] && b.name !== bank.name)
                  .map((b, idx) => (
                    <Box
                      key={idx}
                      onClick={() => {
                        navigate(`/${activeLoanType}/${b.loanTypes[activeLoanType].slug}`);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      sx={{
                        background: "#fff",
                        border: "1px solid #e8edf5",
                        borderRadius: "12px",
                        p: 2,
                        textAlign: "center",
                        cursor: "pointer",
                        transition: "all 0.2s ease-in-out",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.01)",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          borderColor: "#384aff",
                          boxShadow: "0 6px 16px rgba(56,74,255,0.08)"
                        }
                      }}
                    >
                      <Typography sx={{ fontWeight: 700, fontSize: "0.85rem", color: "#475569" }}>
                        {b.name}
                      </Typography>
                      <Typography sx={{ fontSize: "0.72rem", color: "#384aff", mt: 0.5, fontWeight: 600 }}>
                        View Loan →
                      </Typography>
                    </Box>
                  ))}
              </Box>
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr 1fr" }, gap: 3 }}>
            {/* Eligibility */}
            <Box sx={{ background: "#fff", border: "1px solid #e8edf5", borderRadius: "16px", p: 3 }}>
              <Typography sx={{ fontWeight: 700, fontSize: "1.05rem", color: "#1e293b", mb: 2 }}>
                ✅ Eligibility Criteria
              </Typography>
              {lt.eligibility?.map((point, i) => (
                <Box key={i} sx={{ display: "flex", gap: 1.5, mb: 1.5 }}>
                  <ShieldCheck size={16} color="#3244e6" style={{ flexShrink: 0, marginTop: 3 }} />
                  <Typography sx={{ fontSize: "0.85rem", color: "#475569", lineHeight: 1.6 }}>
                    {point}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Documents */}
            <Box sx={{ background: "#fff", border: "1px solid #e8edf5", borderRadius: "16px", p: 3 }}>
              <Typography sx={{ fontWeight: 700, fontSize: "1.05rem", color: "#1e293b", mb: 2 }}>
                📄 Documents Required
              </Typography>
              {lt.documents?.map((point, i) => (
                <Box key={i} sx={{ display: "flex", gap: 1.5, mb: 1.5 }}>
                  <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: 3 }} />
                  <Typography sx={{ fontSize: "0.85rem", color: "#475569", lineHeight: 1.6 }}>
                    {point}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Interest Rates table */}
            <Box sx={{ background: "#fff", border: "1px solid #e8edf5", borderRadius: "16px", p: 3 }}>
              <Typography sx={{ fontWeight: 700, fontSize: "1.05rem", color: "#1e293b", mb: 2 }}>
                📊 Interest Rate Details
              </Typography>
              {lt.interestRates?.map((rate, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    py: 1.2, borderBottom: i < lt.interestRates.length - 1 ? "1px solid #f1f5f9" : "none",
                  }}
                >
                  <Typography sx={{ fontSize: "0.8rem", color: "#475569", maxWidth: "60%" }}>
                    {rate.category}
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                    <Chip
                      label={rate.rate}
                      size="small"
                      sx={{
                        background: "rgba(50,68,230,0.08)", color: "#3244e6",
                        fontWeight: 700, fontSize: "0.78rem",
                      }}
                    />
                    <Typography sx={{ fontSize: "0.65rem", color: "#475569", mt: 0.5 }}>
                      {rate.emi}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* EMI Calculator */}
        <Box sx={{ mt: { xs: 5, md: 8 } }}>
          <LocalEmiCalculator
            defaultRate={rawLt.rateMin}
            defaultTenure={rawLt.tenure}
            minAmt={rawLt.loanAmountMin}
            maxAmt={rawLt.loanAmountMax}
            loanLabel={loanMeta.label}
          />
        </Box>

        {/* FAQs */}
        {!lt.detailedTabs && lt.faq && lt.faq.length > 0 && (
          <Box sx={{ mt: { xs: 5, md: 8 } }}>
            <Typography
              sx={{
                fontWeight: 800, fontSize: { xs: "1.5rem", md: "1.8rem" },
                color: "#1e293b", mb: 3, textAlign: "center",
              }}
            >
              Frequently Asked Questions (FAQs)
            </Typography>
            <Box sx={{ maxWidth: 800, mx: "auto" }}>
              {lt.faq.map((item, idx) => (
                <Accordion key={idx} sx={{ mb: 1, borderRadius: "8px", "&:before": { display: "none" } }}>
                  <AccordionSummary expandIcon={<ChevronDown size={18} />}>
                    <Typography sx={{ fontWeight: 700, fontSize: "0.9rem", color: "#1e293b" }}>
                      {item.q}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ fontSize: "0.85rem", color: "#475569", lineHeight: 1.6 }}>
                      {item.a}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Box>
        )}

        {/* Bottom CTA */}
        <Box
          sx={{
            mt: 6, background: "linear-gradient(135deg, #3244e6 0%, #5b21b6 100%)",
            borderRadius: "20px", p: { xs: 3, md: 4 },
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: 2,
          }}
        >
          <Box>
            <Typography sx={{ fontWeight: 800, fontSize: { xs: "1.1rem", md: "1.3rem" }, color: "#fff", mb: 0.5 }}>
              Confused about loans? Don't worry - we'll call you back.<br></br> Just fill in your details.
            </Typography>
          </Box>
          <Button
            onClick={() => setOpenModal(true)}
            size="large"
            endIcon={<ArrowRight size={18} />}
            sx={{
              background: "#fff", color: "#3244e6",
              fontWeight: 700,
              fontSize: "1rem", px: 3.5, py: 1.4,
              borderRadius: "50px", textTransform: "none",
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
              "&:hover": { background: "#f0f4ff", boxShadow: "0 12px 32px rgba(0,0,0,0.25)" },
            }}
          >
            Request Call Back
          </Button>
        </Box>

        {/* Premium Lead Form Modal Dialog */}
        <Dialog
          open={openModal}
          onClose={() => !submitting && setOpenModal(false)}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
              sx: { backgroundColor: "rgba(15, 23, 42, 0.6)", backdropFilter: "blur(8px)" }
            },
          }}
          PaperProps={{
            sx: {
              borderRadius: "24px",
              background: "#ffffff",
              maxWidth: "460px",
              width: "100%",
              mx: 2,
              p: 1.5,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              overflow: "hidden",
              position: "relative"
            }
          }}
        >
          {/* Close Button */}
          {!submitting && (
            <IconButton
              onClick={() => setOpenModal(false)}
              sx={{
                position: "absolute",
                right: 16,
                top: 16,
                color: "#64748b",
                backgroundColor: "#f1f5f9",
                "&:hover": { backgroundColor: "#e2e8f0", color: "#0f172a" },
                transition: "all 0.2s"
              }}
            >
              <X size={18} />
            </IconButton>
          )}

          <DialogContent sx={{ p: 3, display: "flex", flexDirection: "column", gap: 3 }}>
            {submitSuccess ? (
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", py: 4, textAlign: "center" }}>
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <Box sx={{ width: 70, height: 70, borderRadius: "50%", background: "#e6fffa", display: "flex", alignItems: "center", justifyContent: "center", mb: 3 }}>
                    <CheckCircle2 size={40} color="#10b981" />
                  </Box>
                </motion.div>
                <Typography sx={{ fontWeight: 800, fontSize: "1.4rem", color: "#0f172a", mb: 1 }}>
                  Request Submitted!
                </Typography>
                <Typography sx={{ fontSize: "0.9rem", color: "#64748b", lineHeight: 1.6 }}>
                  Thank you for choosing F2 Fintech. Our expert loan officers will call you back within 10 minutes.
                </Typography>
              </Box>
            ) : (
              <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <Box sx={{ pr: 4 }}>
                  <Typography sx={{ fontWeight: 850, fontSize: "1.35rem", color: "#0f172a", mb: 1 }}>
                    Get a Call Back
                  </Typography>
                  <Typography sx={{ fontSize: "0.85rem", color: "#64748b" }}>
                    Leave your details below and our {bank?.name || "Selected Bank"} experts will get in touch with you.
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Box sx={{ display: "flex", gap: 1.5 }}>
                    <TextField
                      select
                      label="Prefix"
                      name="titlePrefix"
                      value={formData.titlePrefix || "Mr"}
                      onChange={handleInputChange}
                      variant="outlined"
                      sx={{ width: "95px", flexShrink: 0 }}
                      InputProps={{
                        sx: { borderRadius: "12px" }
                      }}
                    >
                      {["Mr", "Miss", "Mrs", "Dr", "CA", "Others"].map((pfx) => (
                        <MenuItem key={pfx} value={pfx}>
                          {pfx}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      error={!!formErrors.fullName}
                      helperText={formErrors.fullName}
                      variant="outlined"
                      placeholder="John Doe"
                      InputProps={{
                        sx: { borderRadius: "12px" }
                      }}
                    />
                  </Box>

                  <TextField
                    fullWidth
                    label="Mobile Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    error={!!formErrors.phone}
                    helperText={formErrors.phone}
                    variant="outlined"
                    placeholder="10-digit mobile number"
                    inputProps={{ maxLength: 10 }}
                    InputProps={{
                      sx: { borderRadius: "12px" }
                    }}
                  />

                  <TextField
                    fullWidth
                    select
                    label="Occupation"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                    variant="outlined"
                    InputProps={{
                      sx: { borderRadius: "12px" }
                    }}
                  >
                    {["Salaried", "Self-Employed", "Business Owner", "Student", "Other"].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    fullWidth
                    label="Required Loan Amount (INR)"
                    name="loanAmount"
                    value={formData.loanAmount}
                    onChange={handleInputChange}
                    error={!!formErrors.loanAmount}
                    helperText={formErrors.loanAmount}
                    variant="outlined"
                    placeholder="e.g. 500000"
                    InputProps={{
                      sx: { borderRadius: "12px" }
                    }}
                  />
                </Box>

                <Button
                  fullWidth
                  type="submit"
                  disabled={submitting}
                  variant="contained"
                  size="large"
                  sx={{
                    background: "linear-gradient(135deg, #384aff 0%, #2031e2 100%)",
                    color: "#ffffff",
                    fontWeight: 700,
                    fontSize: "1rem",
                    py: 1.6,
                    borderRadius: "14px",
                    textTransform: "none",
                    boxShadow: "0 10px 20px rgba(56, 74, 255, 0.25)",
                    transition: "all 0.3s",
                    "&:hover": {
                      background: "linear-gradient(135deg, #2031e2 0%, #1a27b8 100%)",
                      boxShadow: "0 12px 24px rgba(56, 74, 255, 0.35)",
                      transform: "translateY(-1px)"
                    }
                  }}
                >
                  {submitting ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Submit Request"}
                </Button>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
}
