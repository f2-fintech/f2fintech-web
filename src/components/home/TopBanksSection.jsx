import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  CircularProgress,
  Chip,
  Collapse,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Phone,
  User,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Home,
  ExternalLink,
  Star,
  CheckCircle,
  Clock,
  IndianRupee,
  ShieldCheck,
  Percent,
} from "lucide-react";
import { LoanInquiryAPI } from "../../apis/LoanInquiryAPI";
import {
  ALL_BANKS,
  LOAN_TYPE_META,
  COMMON_TERMS,
  getTopBanksForSection,
} from "../../data/banksData";

/* ─── Top Bank Section Tabs (Strictly 5 Categories as per request) ─── */
const TOP_BANKS_TABS = [
  { key: "home-loans", label: "Home Loan", color: "#3244e6" },
  { key: "loan-against-property", label: "Loan Against Property", color: "#10b981" },
  { key: "doctor-loan", label: "Doctor Loan", color: "#ec4899" },
  { key: "personal-loan", label: "Personal Loan", color: "#7c3aed" },
  { key: "business-loan", label: "Business", color: "#06b6d4" },
];

/* ─── Lead Capture Modal ──────────────────────────────── */
function LeadCaptureModal({ open, bank, lt, loanType, onClose, onSuccess }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!name.trim() || name.trim().length < 2) errs.name = "Enter a valid name";
    if (!/^[6-9]\d{9}$/.test(phone.trim())) errs.phone = "Enter a valid 10-digit mobile number";
    return errs;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await LoanInquiryAPI.create({
        name: name.trim(),
        phone: phone.trim(),
        bank_name: bank?.name || "",
        loan_type: loanType || "home-loans",
      });
      onSuccess();
    } catch (err) {
      onSuccess();
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setName(""); setPhone(""); setErrors({});
    onClose();
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <Box
          sx={{
            position: "fixed", inset: 0, zIndex: 9999,
            display: "flex", alignItems: "center", justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)",
          }}
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff", borderRadius: "20px",
              padding: "40px 36px", maxWidth: 440, width: "92%",
              boxShadow: "0 32px 80px rgba(0,0,0,0.2)", position: "relative",
            }}
          >
            <button
              onClick={handleClose}
              style={{
                position: "absolute", top: 14, right: 14,
                background: "#f1f5f9", border: "none", borderRadius: "50%",
                width: 32, height: 32, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b",
              }}
            >
              <X size={16} />
            </button>

            <Typography sx={{ fontFamily: "Poppins", fontWeight: 700, fontSize: "1.25rem", color: "#1e293b", textAlign: "center", mb: 0.5 }}>
              Get loans at Interest Rates
            </Typography>
            <Typography sx={{ fontFamily: "Poppins", fontWeight: 700, fontSize: "1.25rem", color: "#1e293b", textAlign: "center", mb: 3 }}>
              starting as low as{" "}
              <Box component="span" sx={{ color: "#3244e6" }}>
                {lt?.negotiatedRate ? `${lt.negotiatedRate}%` : "7.10%"}
              </Box>
            </Typography>

            {/* Name */}
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, border: `1px solid ${errors.name ? "#ef4444" : "#e2e8f0"}`, borderRadius: "10px", px: 2, py: 1.5, "&:focus-within": { borderColor: "#3244e6", boxShadow: "0 0 0 3px rgba(50,68,230,0.1)" }, transition: "all 0.2s" }}>
                <User size={18} color="#94a3b8" />
                <input
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => { setName(e.target.value); if (errors.name) setErrors({ ...errors, name: "" }); }}
                  style={{ border: "none", outline: "none", background: "transparent", width: "100%", fontFamily: "Poppins, sans-serif", fontSize: "0.95rem", color: "#1e293b" }}
                />
              </Box>
              {errors.name && <Typography sx={{ color: "#ef4444", fontSize: "0.78rem", mt: 0.5, ml: 1, fontFamily: "Poppins" }}>{errors.name}</Typography>}
            </Box>

            {/* Phone */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, border: `1px solid ${errors.phone ? "#ef4444" : "#e2e8f0"}`, borderRadius: "10px", px: 2, py: 1.5, "&:focus-within": { borderColor: "#3244e6", boxShadow: "0 0 0 3px rgba(50,68,230,0.1)" }, transition: "all 0.2s" }}>
                <Phone size={18} color="#94a3b8" />
                <input
                  placeholder="Mobile Number" type="tel"
                  value={phone}
                  onChange={(e) => { setPhone(e.target.value.replace(/\D/g, "").slice(0, 10)); if (errors.phone) setErrors({ ...errors, phone: "" }); }}
                  style={{ border: "none", outline: "none", background: "transparent", width: "100%", fontFamily: "Poppins, sans-serif", fontSize: "0.95rem", color: "#1e293b" }}
                />
              </Box>
              {errors.phone && <Typography sx={{ color: "#ef4444", fontSize: "0.78rem", mt: 0.5, ml: 1, fontFamily: "Poppins" }}>{errors.phone}</Typography>}
            </Box>

            <Button
              fullWidth onClick={handleSubmit} disabled={loading}
              sx={{
                background: "linear-gradient(135deg, #3244e6 0%, #1d31b8 100%)",
                color: "#fff", fontFamily: "Poppins", fontWeight: 700, fontSize: "1rem",
                py: 1.5, borderRadius: "12px", textTransform: "none",
                boxShadow: "0 8px 24px rgba(50,68,230,0.35)",
                "&:hover": { background: "linear-gradient(135deg, #2536c4 0%, #1525a0 100%)" },
                "&:disabled": { opacity: 0.7 },
              }}
            >
              {loading ? <CircularProgress size={22} sx={{ color: "#fff" }} /> : "Submit"}
            </Button>
            <Typography sx={{ textAlign: "center", mt: 2, fontSize: "0.72rem", color: "#94a3b8", fontFamily: "Poppins", lineHeight: 1.5 }}>
              By submitting you agree to our Terms &amp; Privacy Policy.
            </Typography>
          </motion.div>
        </Box>
      )}
    </AnimatePresence>
  );
}

/* ─── Success Modal ─────────────────────────────── */
function SuccessModal({ open, onClose, onCheckOffers }) {
  if (!open) return null;
  return (
    <AnimatePresence>
      {open && (
        <Box
          sx={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            style={{ background: "#fff", borderRadius: "20px", padding: "44px 36px 36px", maxWidth: 420, width: "92%", boxShadow: "0 32px 80px rgba(0,0,0,0.2)", position: "relative", textAlign: "center" }}
          >
            <button onClick={onClose} style={{ position: "absolute", top: 14, right: 14, background: "#f1f5f9", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b" }}>
              <X size={16} />
            </button>
            <Box sx={{ fontSize: "64px", mb: 2, lineHeight: 1 }}>🏠🎉</Box>
            <Typography sx={{ fontFamily: "Poppins", fontWeight: 800, fontSize: "1.4rem", color: "#1e293b", mb: 1.5 }}>
              We got your back!
            </Typography>
            <Typography sx={{ fontFamily: "Poppins", fontSize: "0.95rem", color: "#64748b", mb: 3.5, lineHeight: 1.6 }}>
              Our Expert Loan Advisors will reach out to you right away. You can reach us at{" "}
              <Box component="span" sx={{ fontWeight: 700, color: "#3244e6" }}>+91 88106 00135</Box>.
            </Typography>
            <Button
              fullWidth onClick={onCheckOffers} endIcon={<ArrowRight size={18} />}
              sx={{
                background: "linear-gradient(135deg, #3244e6 0%, #5b21b6 100%)",
                color: "#fff", fontFamily: "Poppins", fontWeight: 700, fontSize: "1rem",
                py: 1.5, borderRadius: "12px", textTransform: "none",
                boxShadow: "0 8px 24px rgba(50,68,230,0.3)",
                "&:hover": { background: "linear-gradient(135deg, #2536c4 0%, #4c1d95 100%)", transform: "translateY(-1px)" },
              }}
            >
              Check out Loan Offers
            </Button>
          </motion.div>
        </Box>
      )}
    </AnimatePresence>
  );
}

/* ─── Bank Logo ─────────────────────────────────── */
function BankLogo({ bank }) {
  const [err, setErr] = useState(false);
  if (err || !bank.logo) {
    return (
      <Box sx={{ width: 52, height: 52, borderRadius: "10px", background: `${bank.logoColor || '#3244e6'}15`, border: `1px solid ${bank.logoColor || '#3244e6'}30`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Poppins", fontWeight: 800, fontSize: "0.7rem", color: bank.logoColor || '#3244e6', letterSpacing: "0.5px" }}>
        {bank.shortName || bank.name?.slice(0, 4)}
      </Box>
    );
  }
  return (
    <Box component="img" src={bank.logo} alt={bank.name} onError={() => setErr(true)}
      sx={{ width: 52, height: 52, objectFit: "contain", borderRadius: "10px", padding: "4px", background: "#f8fafc", border: "1px solid #e2e8f0" }}
    />
  );
}

/* ─── Bank Card ─────────────────────────────────── */
function BankCard({ bank, lt, loanType, onExplore, isTop5 }) {
  const navigate = useNavigate();
  const [feeOpen, setFeeOpen] = useState(false);
  const viewRoute = `/${loanType}/${lt.slug}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -2 }}
    >
      <Box
        sx={{
          background: "#fff",
          border: bank.recommended ? "1.5px solid #c7d2fe" : "1px solid #e8edf5",
          borderRadius: "16px",
          p: { xs: 2.5, md: 3 },
          mb: 2,
          position: "relative",
          boxShadow: bank.recommended
            ? "0 4px 20px rgba(50,68,230,0.09)"
            : "0 2px 16px rgba(50,68,230,0.05)",
          transition: "box-shadow 0.3s, border-color 0.3s",
          "&:hover": { boxShadow: "0 8px 32px rgba(50,68,230,0.12)", borderColor: "#3244e6" },
        }}
      >
        {/* Recommended Badge */}
        {bank.recommended && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: { xs: 16, sm: 24 },
              transform: "translateY(-50%)",
              display: "flex",
              alignItems: "center",
              gap: 0.6,
              background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
              border: "1px solid #f59e0b",
              color: "#92400e",
              px: 1.4,
              py: 0.35,
              borderRadius: "50px",
              fontSize: "0.68rem",
              fontWeight: 700,
              fontFamily: "Poppins",
              boxShadow: "0 2px 8px rgba(245, 158, 11, 0.25)",
              zIndex: 2,
              letterSpacing: "0.01em",
            }}
          >
            <Star size={11} fill="#d97706" color="#d97706" /> Recommended Lender
          </Box>
        )}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "150px 1.2fr 1fr 1fr 1fr auto" },
            gap: { xs: 2, sm: 1 },
            alignItems: "center",
          }}
        >
          {/* Bank Identity */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: { xs: "flex-start", sm: "center" }, gap: 1 }}>
            <BankLogo bank={bank} />
            <Typography sx={{ fontFamily: "Poppins", fontWeight: 700, fontSize: "0.82rem", color: "#1e293b", textAlign: { xs: "left", sm: "center" }, lineHeight: 1.3 }}>
              {bank.name}
            </Typography>
          </Box>

          {/* Interest Rate */}
          <Box sx={{ px: { xs: 0, sm: 2 } }}>
            <Typography sx={{ fontSize: "0.72rem", color: "#94a3b8", fontFamily: "Poppins", mb: 0.3 }}>
              Interest Rate (% p.a.)
            </Typography>
            <Typography sx={{ fontSize: "0.95rem", fontWeight: 700, color: "#1e293b", fontFamily: "Poppins" }}>
              {lt.rateRange}
            </Typography>
            <Box sx={{ display: "inline-flex", flexDirection: "column", alignItems: "flex-start", mt: 0.5 }}>
              <Box sx={{ display: "inline-flex", alignItems: "center", background: "rgba(50,68,230,0.08)", borderRadius: "20px", px: 1, py: 0.3 }}>
                <Typography sx={{ fontSize: "0.68rem", color: "#3244e6", fontWeight: 700, fontFamily: "Poppins" }}>
                  F2F Negotiated
                </Typography>
              </Box>
              <Typography sx={{ fontSize: "0.82rem", color: "#3244e6", fontWeight: 700, fontFamily: "Poppins", mt: 0.3 }}>
                {lt.negotiatedRate}%*
              </Typography>
            </Box>
          </Box>

          {/* Loan Amount */}
          <Box sx={{ px: { xs: 0, sm: 2 } }}>
            <Typography sx={{ fontSize: "0.72rem", color: "#94a3b8", fontFamily: "Poppins", mb: 0.3 }}>Loan Amount</Typography>
            <Typography sx={{ fontSize: "0.92rem", fontWeight: 700, color: "#1e293b", fontFamily: "Poppins" }}>{lt.loanAmount}</Typography>
          </Box>

          {/* EMI Per Lakh */}
          <Box sx={{ px: { xs: 0, sm: 2 } }}>
            <Typography sx={{ fontSize: "0.72rem", color: "#94a3b8", fontFamily: "Poppins", mb: 0.3 }}>EMI Per Lakh</Typography>
            <Typography sx={{ fontSize: "0.92rem", fontWeight: 700, color: "#1e293b", fontFamily: "Poppins" }}>{lt.emiPerLakh}</Typography>
          </Box>

          {/* Processing Fee - expandable */}
          <Box sx={{ px: { xs: 0, sm: 2 } }}>
            <Typography sx={{ fontSize: "0.72rem", color: "#94a3b8", fontFamily: "Poppins", mb: 0.3 }}>Processing Fee</Typography>
            <Box onClick={() => setFeeOpen(!feeOpen)} sx={{ display: "flex", alignItems: "center", gap: 0.5, cursor: "pointer" }}>
              <Typography sx={{ fontSize: "0.82rem", fontWeight: 700, color: "#1e293b", fontFamily: "Poppins" }}>{lt.processingFee}</Typography>
              {feeOpen ? <ChevronUp size={13} color="#64748b" /> : <ChevronDown size={13} color="#64748b" />}
            </Box>
            <Collapse in={feeOpen}>
              <Box sx={{ mt: 1, background: "#f8faff", borderRadius: "8px", p: 1 }}>
                {lt.feeDetails?.map((fee, i) => (
                  <Box key={i} sx={{ display: "flex", justifyContent: "space-between", py: 0.4 }}>
                    <Typography sx={{ fontSize: "0.68rem", color: "#64748b", fontFamily: "Poppins" }}>{fee.label}</Typography>
                    <Typography sx={{ fontSize: "0.68rem", color: "#1e293b", fontFamily: "Poppins", fontWeight: 600 }}>{fee.value}</Typography>
                  </Box>
                ))}
              </Box>
            </Collapse>
          </Box>

          {/* CTAs */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, pl: { xs: 0, sm: 2 }, minWidth: 140 }}>
            <Button
              onClick={() => navigate(viewRoute)}
              variant="outlined"
              startIcon={<ExternalLink size={13} />}
              sx={{
                border: "1.5px solid #3244e6", color: "#3244e6",
                fontFamily: "Poppins", fontWeight: 700, fontSize: "0.78rem",
                borderRadius: "50px", px: 2, py: 0.9, textTransform: "none",
                background: "transparent",
                "&:hover": { background: "#f0f4ff", borderColor: "#1d31b8", color: "#1d31b8" },
              }}
            >
              View Details
            </Button>
            <Button
              onClick={() => onExplore(bank, lt)}
              sx={{
                background: "linear-gradient(135deg, #3244e6 0%, #4f46e5 100%)",
                color: "#fff", fontFamily: "Poppins", fontWeight: 700,
                fontSize: "0.78rem", borderRadius: "50px", px: 2, py: 0.9,
                textTransform: "none", boxShadow: "0 4px 16px rgba(50,68,230,0.25)",
                "&:hover": { background: "linear-gradient(135deg, #2536c4 0%, #4338ca 100%)" },
              }}
            >
              Explore Offer
            </Button>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}

/* ─── Main TopBanksSection ─────────────────────── */
export default function TopBanksSection() {
  const navigate = useNavigate();
  const [loanType, setLoanType] = useState("home-loans");
  const [showAll, setShowAll] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null);
  const [selectedLt, setSelectedLt] = useState(null);
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const handleTabChange = (key) => {
    setLoanType(key);
    setShowAll(false);
  };

  const handleExplore = (bank, lt) => {
    setSelectedBank(bank);
    setSelectedLt(lt);
    setLeadModalOpen(true);
  };

  const handleLeadSuccess = () => {
    setLeadModalOpen(false);
    setTimeout(() => setSuccessModalOpen(true), 200);
  };

  // Get active meta configuration
  const activeTab = TOP_BANKS_TABS.find((t) => t.key === loanType) || TOP_BANKS_TABS[0];
  const activeMeta = LOAN_TYPE_META[loanType] || { label: activeTab.label, color: activeTab.color };
  const commonTerms = COMMON_TERMS[loanType] || COMMON_TERMS["home-loans"];

  // Fetch banks from central dataset matching the PDF
  const { top5, all } = getTopBanksForSection(loanType);
  const displayBanks = showAll ? all : top5;

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, background: "linear-gradient(180deg, #ffffff 0%, #f8faff 50%, #ffffff 100%)", position: "relative", overflow: "hidden" }}>
      {/* Background blobs */}
      <Box sx={{ position: "absolute", top: "5%", right: "-5%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(50,68,230,0.04) 0%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />
      <Box sx={{ position: "absolute", bottom: "5%", left: "-5%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Chip
              icon={<Home size={14} />}
              label="LOAN COMPARISON HUB"
              sx={{ background: "rgba(50,68,230,0.08)", color: "#3244e6", fontWeight: 700, fontSize: "0.8rem", fontFamily: "Poppins", borderRadius: "50px", mb: 2, "& .MuiChip-icon": { color: "#3244e6" } }}
            />
            <Typography variant="h2" sx={{ fontFamily: "'Poppins', sans-serif", fontSize: { xs: "1.8rem", sm: "2.4rem", md: "2.8rem" }, fontWeight: 800, color: "#1e293b", mb: 1.5, letterSpacing: "-0.02em" }}>
              Top Banks For {activeMeta.label}
            </Typography>
            <Typography sx={{ fontFamily: "Poppins", fontSize: { xs: "0.9rem", md: "1rem" }, color: "#64748b", fontWeight: 500 }}>
              29 partner banks &amp; financial institutions · Verified rate list from PDF comparison
            </Typography>
          </Box>
        </motion.div>

        {/* 5 Requested Loan Type Tabs */}
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "flex-start", md: "center" },
            gap: 1.2,
            flexWrap: { xs: "nowrap", md: "wrap" },
            overflowX: { xs: "auto", md: "visible" },
            whiteSpace: { xs: "nowrap", md: "normal" },
            mb: 3.5,
            maxWidth: "100%",
            width: "100%",
            mx: "auto",
            px: { xs: 2, sm: 3, md: 0 },
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
            "-ms-overflow-style": "none",
          }}
        >
          {TOP_BANKS_TABS.map((tab) => {
            const isSelected = loanType === tab.key;
            return (
              <Chip
                key={tab.key}
                label={tab.label}
                onClick={() => handleTabChange(tab.key)}
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  py: 2.3,
                  px: 2,
                  cursor: "pointer",
                  borderRadius: "50px",
                  background: isSelected ? tab.color : "#f1f5f9",
                  color: isSelected ? "#fff" : "#475569",
                  border: isSelected ? `1.5px solid ${tab.color}` : "1.5px solid #e2e8f0",
                  boxShadow: isSelected ? `0 4px 14px ${tab.color}35` : "none",
                  transition: "all 0.25s",
                  "&:hover": {
                    background: isSelected ? tab.color : "#e2e8f0",
                    transform: "translateY(-1px)",
                  },
                }}
              />
            );
          })}
        </Box>

        {/* Common Terms Banner (from Page 1 of PDF) */}
        {commonTerms && (
          <Box
            sx={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "14px",
              p: { xs: 2, sm: 2.5 },
              mb: 4,
              boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
              display: "grid",
              gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(4, 1fr)" },
              gridTemplateColumns: {
                xs: "1fr 1fr",
                sm: commonTerms.ltv && commonTerms.ltv !== "N/A" ? "repeat(5, 1fr)" : "repeat(4, 1fr)",
              },
              gap: 2,
            }}
          >
            <Box sx={{ borderRight: { sm: "1px solid #f1f5f9" }, pr: { sm: 1.5 } }}>
              <Typography sx={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 600, fontFamily: "Poppins" }}>
                Loan Amount
              </Typography>
              <Typography sx={{ fontSize: "0.92rem", color: "#1e293b", fontWeight: 700, fontFamily: "Poppins" }}>
                {commonTerms.amount}
              </Typography>
            </Box>

            <Box sx={{ borderRight: { sm: "1px solid #f1f5f9" }, pr: { sm: 1.5 } }}>
              <Typography sx={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 600, fontFamily: "Poppins" }}>
                Max Tenure
              </Typography>
              <Typography sx={{ fontSize: "0.92rem", color: "#1e293b", fontWeight: 700, fontFamily: "Poppins" }}>
                {commonTerms.tenure}
              </Typography>
            </Box>

            <Box sx={{ borderRight: { sm: "1px solid #f1f5f9" }, pr: { sm: 1.5 } }}>
              <Typography sx={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 600, fontFamily: "Poppins" }}>
                Processing Fee
              </Typography>
              <Typography sx={{ fontSize: "0.92rem", color: "#1e293b", fontWeight: 700, fontFamily: "Poppins" }}>
                {commonTerms.fee}
              </Typography>
            </Box>

            {commonTerms.ltv && commonTerms.ltv !== "N/A" && (
              <Box sx={{ borderRight: { sm: "1px solid #f1f5f9" }, pr: { sm: 1.5 } }}>
                <Typography sx={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 600, fontFamily: "Poppins" }}>
                  Max LTV
                </Typography>
                <Typography sx={{ fontSize: "0.92rem", color: "#1e293b", fontWeight: 700, fontFamily: "Poppins" }}>
                  {commonTerms.ltv}
                </Typography>
              </Box>
            )}

            <Box>
              <Typography sx={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 600, fontFamily: "Poppins" }}>
                Foreclosure / Prepayment
              </Typography>
              <Typography sx={{ fontSize: "0.92rem", color: "#10b981", fontWeight: 700, fontFamily: "Poppins" }}>
                NIL after 6 months
              </Typography>
            </Box>
          </Box>
        )}

        {/* Section Sub-header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, px: 0.5 }}>
          <Typography sx={{ fontSize: "0.85rem", fontWeight: 700, color: "#475569", fontFamily: "Poppins" }}>
            {showAll ? `All ${all.length} Available Lenders` : `Top 5 Lowest Starting Rates`}
          </Typography>
        </Box>

        {/* Bank Cards */}
        <Box sx={{ pt: 1 }}>
          {displayBanks.map(({ bank, loanTypeData }, idx) => (
            <motion.div
              key={`${bank.id}-${loanType}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <BankCard
                bank={bank}
                lt={loanTypeData}
                loanType={loanType}
                onExplore={handleExplore}
                isTop5={idx < 5}
              />
            </motion.div>
          ))}
        </Box>

        {/* Bottom CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button
              onClick={() => navigate(`/offer?type=${loanType}`)}
              size="large"
              endIcon={<ChevronRight size={20} />}
              sx={{
                background: `linear-gradient(135deg, ${activeTab.color} 0%, #1e1b4b 100%)`,
                color: "#fff", fontFamily: "Poppins", fontWeight: 700, fontSize: "1rem",
                px: 4, py: 1.6, borderRadius: "50px", textTransform: "none",
                boxShadow: `0 8px 28px rgba(50,68,230,0.25)`,
                "&:hover": { transform: "translateY(-2px)" },
                transition: "all 0.25s",
              }}
            >
              Show Me Best {activeMeta.label} Rates
            </Button>
            <Typography sx={{ mt: 1.5, fontSize: "0.78rem", color: "#94a3b8", fontFamily: "Poppins" }}>
              Indicative rates for comparison only · Eligibility: CIBIL 700+, Age 21–65 · Stamp duty at actuals as per state law
            </Typography>
          </Box>
        </motion.div>
      </Container>

      {/* Modals */}
      <LeadCaptureModal open={leadModalOpen} bank={selectedBank} lt={selectedLt} loanType={loanType} onClose={() => setLeadModalOpen(false)} onSuccess={handleLeadSuccess} />
      <SuccessModal open={successModalOpen} onClose={() => setSuccessModalOpen(false)} onCheckOffers={() => { setSuccessModalOpen(false); navigate(`/offer?type=${loanType}`); }} />
    </Box>
  );
}
