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
} from "lucide-react";
import { LoanInquiryAPI } from "../../apis/LoanInquiryAPI";
import { ALL_BANKS, LOAN_TYPE_META, getBanksByLoanType } from "../../data/banksData";

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
                {lt?.negotiatedRate || "7.10%"}
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
      <Box sx={{ width: 52, height: 52, borderRadius: "10px", background: `${bank.logoColor}15`, border: `1px solid ${bank.logoColor}30`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Poppins", fontWeight: 800, fontSize: "0.7rem", color: bank.logoColor, letterSpacing: "0.5px" }}>
        {bank.shortName}
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
function BankCard({ bank, lt, loanType, onExplore }) {
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
          border: "1px solid #e8edf5",
          borderRadius: "16px",
          p: { xs: 2.5, md: 3 },
          mb: 2,
          boxShadow: "0 2px 16px rgba(50,68,230,0.06)",
          transition: "box-shadow 0.3s",
          "&:hover": { boxShadow: "0 8px 32px rgba(50,68,230,0.12)", borderColor: "#c7d2fe" },
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "150px 1fr 1fr 1fr 1fr auto" },
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
            <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
              <Typography onClick={() => navigate(viewRoute)} sx={{ fontSize: "0.72rem", color: "#3244e6", fontFamily: "Poppins", textDecoration: "underline", cursor: "pointer", "&:hover": { color: "#1d31b8" } }}>
                About
              </Typography>
              <Typography onClick={() => navigate(viewRoute)} sx={{ fontSize: "0.72rem", color: "#3244e6", fontFamily: "Poppins", textDecoration: "underline", cursor: "pointer", "&:hover": { color: "#1d31b8" } }}>
                Interest Rate
              </Typography>
            </Box>
          </Box>

          {/* Interest Rate */}
          <Box sx={{ px: { xs: 0, sm: 2 } }}>
            <Typography sx={{ fontSize: "0.72rem", color: "#94a3b8", fontFamily: "Poppins", mb: 0.3 }}>Interest Rate</Typography>
            <Typography sx={{ fontSize: "0.95rem", fontWeight: 700, color: "#1e293b", fontFamily: "Poppins" }}>{lt.rateRange}</Typography>
            <Box sx={{ display: "inline-flex", alignItems: "center", background: "rgba(50,68,230,0.08)", borderRadius: "20px", px: 1, py: 0.3, mt: 0.5 }}>
              <Typography sx={{ fontSize: "0.68rem", color: "#3244e6", fontWeight: 700, fontFamily: "Poppins" }}>F2F Negotiated</Typography>
            </Box>
            <Typography sx={{ fontSize: "0.82rem", color: "#3244e6", fontWeight: 700, fontFamily: "Poppins", mt: 0.3 }}>{lt.negotiatedRate} *</Typography>
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

          {/* Processing Fee — expandable */}
          <Box sx={{ px: { xs: 0, sm: 2 } }}>
            <Typography sx={{ fontSize: "0.72rem", color: "#94a3b8", fontFamily: "Poppins", mb: 0.3 }}>Processing Fee</Typography>
            <Box onClick={() => setFeeOpen(!feeOpen)} sx={{ display: "flex", alignItems: "center", gap: 0.5, cursor: "pointer" }}>
              <Typography sx={{ fontSize: "0.85rem", fontWeight: 700, color: "#1e293b", fontFamily: "Poppins" }}>{lt.processingFee}</Typography>
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
const [selectedBank, setSelectedBank] = useState(null);
const [selectedLt, setSelectedLt] = useState(null);
const [leadModalOpen, setLeadModalOpen] = useState(false);
const [successModalOpen, setSuccessModalOpen] = useState(false);

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
const activeMeta = LOAN_TYPE_META[loanType] || { label: "Loan", color: "#3244e6" };

// Fetch top 4 banks dynamically for the active loan type
const activeBanks = getBanksByLoanType(loanType).slice(0, 4);

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
          <Typography variant="h2" sx={{ fontFamily: "'Outfit', 'Poppins', sans-serif", fontSize: { xs: "1.8rem", sm: "2.4rem", md: "2.8rem" }, fontWeight: 800, color: "#1e293b", mb: 1.5, letterSpacing: "-0.02em" }}>
            Top Banks For {activeMeta.label}
          </Typography>
          <Typography sx={{ fontFamily: "Poppins", fontSize: { xs: "0.9rem", md: "1rem" }, color: "#64748b", fontWeight: 500 }}>
            Compare rates and options from India's top lenders
          </Typography>
        </Box>
      </motion.div>

      {/* Dynamic Loan Type Tabs/Chips */}
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "flex-start", md: "center" },
          gap: 1.2,
          flexWrap: { xs: "nowrap", md: "wrap" },
          overflowX: { xs: "auto", md: "visible" },
          whiteSpace: { xs: "nowrap", md: "normal" },
          mb: 5,
          maxWidth: "100%",
          width: "100%",
          mx: "auto",
          px: { xs: 2, sm: 3, md: 0 },
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
          "-ms-overflow-style": "none",
        }}
      >
        {Object.entries(LOAN_TYPE_META).map(([key, val]) => {
          const isSelected = loanType === key;
          return (
            <Chip
              key={key}
              label={val.label}
              onClick={() => setLoanType(key)}
              sx={{
                fontFamily: "Poppins",
                fontWeight: 700,
                fontSize: "0.82rem",
                py: 2.2,
                px: 1.5,
                cursor: "pointer",
                borderRadius: "50px",
                background: isSelected ? val.color : "#f1f5f9",
                color: isSelected ? "#fff" : "#475569",
                border: isSelected ? `1.5px solid ${val.color}` : "1.5px solid #e2e8f0",
                transition: "all 0.25s",
                "&:hover": {
                  background: isSelected ? val.color : "#e2e8f0",
                  transform: "translateY(-1px)",
                },
              }}
            />
          );
        })}
      </Box>

      {/* Bank Cards — from central data via .map() */}
      <Box>
        {activeBanks.map(({ bank, loanTypeData }, idx) => (
          <motion.div
            key={`${bank.id}-${loanType}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
          >
            <BankCard bank={bank} lt={loanTypeData} loanType={loanType} onExplore={handleExplore} />
          </motion.div>
        ))}
      </Box>

      {/* Bottom CTA */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}>
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button
            onClick={() => navigate(`/offer?type=${loanType}`)}
            size="large"
            endIcon={<ChevronRight size={20} />}
            sx={{
              background: `linear-gradient(135deg, ${activeMeta.color} 0%, #1e1b4b 100%)`,
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
            No impact on credit score · Clear terms &amp; zero commissions
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
