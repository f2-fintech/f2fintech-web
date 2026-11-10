import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
  Divider,
  CircularProgress,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckIcon from "@mui/icons-material/Check";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import AddIcon from "@mui/icons-material/Add";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import InfoIcon from "@mui/icons-material/Info";
import { getCreditCards } from "../../apis/CreditCardsAPI";
import ApplyCardModal from "./ApplyCardModal";
import { toast } from "react-toastify";

const TABS = [
  { id: "fees", label: "Fees" },
  { id: "benefits", label: "Benefits" },
  { id: "rewards", label: "Rewards" },
  { id: "fee-structure", label: "Fee Structure" },
  { id: "all-benefits", label: "All Benefits" },
  { id: "tnc", label: "T&Cs" },
];

export default function CardDetailPage() {
  const { cardSlug } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("fees");
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isCompared, setIsCompared] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCardDetail();
  }, [cardSlug]);

  const fetchCardDetail = async () => {
    setLoading(true);
    try {
      const allCards = await getCreditCards();
      const slug = (cardSlug || "").toLowerCase().trim();
      const found = allCards.find(
        (c) =>
          (c.card_alias && c.card_alias.toLowerCase() === slug) ||
          (c.seo_alias && c.seo_alias.toLowerCase() === slug) ||
          String(c.id) === slug ||
          (c.name && c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug)
      );

      if (found) {
        setCard(found);
      } else {
        toast.error("Card not found");
      }
    } catch (err) {
      console.error("Failed to load card detail:", err);
      toast.error("Error loading card details");
    } finally {
      setLoading(false);
    }
  };

  const scrollToSection = (id) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -140;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const renderFormattedContent = (rawText, defaultText = "", customSx = {}) => {
    const content = rawText || defaultText;
    if (!content) return null;
    if (typeof content === "string" && /<[a-z][\s\S]*>/i.test(content)) {
      return (
        <Box
          sx={{
            fontSize: "0.92rem",
            color: isDark ? "#cbd5e1" : "#475569",
            fontFamily: "'Poppins', sans-serif",
            lineHeight: 1.6,
            "& ul": { pl: 2.5, my: 0.5, listStyleType: "disc" },
            "& ol": { pl: 2.5, my: 0.5 },
            "& li": { mb: 0.5 },
            "& p": { my: 0.5 },
            ...customSx,
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      );
    }
    return (
      <Typography
        sx={{
          color: isDark ? "#cbd5e1" : "#475569",
          fontSize: "0.92rem",
          fontFamily: "'Poppins', sans-serif",
          lineHeight: 1.6,
          ...customSx,
        }}
      >
        {content}
      </Typography>
    );
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2 }}>
        <CircularProgress sx={{ color: "#3244e6" }} size={48} />
        <Typography sx={{ fontFamily: "'Poppins', sans-serif", color: "#64748b" }}>
          Loading card details...
        </Typography>
      </Box>
    );
  }

  if (!card) {
    return (
      <Container maxWidth="md" sx={{ py: 14, textAlign: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: isDark ? "#fff" : "#0f172a", mb: 2 }}>
          Credit Card Not Found
        </Typography>
        <Typography sx={{ color: "#64748b", mb: 4 }}>
          The card you are looking for might have been moved or updated.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/cards")}
          startIcon={<ArrowBackIcon />}
          sx={{
            background: "linear-gradient(135deg, #3244e6 0%, #1d2ebd 100%)",
            color: "#fff",
            fontWeight: 700,
            borderRadius: "50px",
            px: 4,
            py: 1.2,
            textTransform: "none",
          }}
        >
          Back to All Cards
        </Button>
      </Container>
    );
  }

  const networkTag = (card.card_type || "VISA").toUpperCase();
  const bankName = card.bank_name || card.bank || "Bank";
  const joiningFee = card.joining_fee_text || "0";
  const annualFee = card.annual_fee_text || "0";
  const isLTF = joiningFee === "0" || joiningFee === "Free" || joiningFee === "Nil" || !joiningFee;
  const usps = card.product_usps || [];
  const cardImg = card.image || card.card_bg_image || "https://d2sriifpjiqv0p.cloudfront.net/admin/BankKaro_20260622_122010_AGB_SBI_Cashback.png1732257446742";

  return (
    <Box sx={{ minHeight: "100vh", pb: 14, background: isDark ? "#0b0f19" : "#f8faff" }}>
      {/* TOP HERO / OVERVIEW SECTION (EXACT SCREENSHOT LAYOUT) */}
      <Box
        sx={{
          minHeight: { xs: "auto", md: "calc(100vh - 80px)" },
          display: "flex",
          alignItems: "center",
          background: isDark
            ? "linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)"
            : "linear-gradient(135deg, #2b2b36 0%, #1f1f2e 100%)",
          color: "#ffffff",
          pt: { xs: 4, sm: 5, md: 5 },
          pb: { xs: 5, sm: 6, md: 6 },
          px: { xs: 2, sm: 4 },
        }}
      >
        <Container maxWidth="lg" sx={{ my: "auto" }}>
          {/* Back Link */}
          <Button
            onClick={() => navigate("/cards")}
            startIcon={<ArrowBackIcon />}
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              textTransform: "none",
              mb: { xs: 2, md: 3 },
              fontWeight: 600,
              fontSize: "0.84rem",
              fontFamily: "'Poppins', sans-serif",
              "&:hover": { color: "#ffffff", background: "transparent" },
            }}
          >
            All Credit Cards
          </Button>

          <Grid container spacing={{ xs: 3, md: 4 }} alignItems="center">
            {/* Left: 3D Floating Credit Card Artwork */}
            <Grid item xs={12} md={5} sx={{ textAlign: "center" }}>
              <Box
                sx={{
                  position: "relative",
                  display: "inline-block",
                  p: 1.5,
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    bottom: "-12px",
                    left: "15%",
                    width: "70%",
                    height: "25px",
                    background: "rgba(0,0,0,0.45)",
                    filter: "blur(16px)",
                    borderRadius: "50%",
                  },
                }}
              >
                <img
                  src={cardImg}
                  alt={card.name}
                  style={{
                    maxHeight: "210px",
                    maxWidth: "330px",
                    width: "100%",
                    objectFit: "contain",
                    filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.5))",
                    transform: "perspective(1000px) rotateY(-4deg)",
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://d2sriifpjiqv0p.cloudfront.net/admin/BankKaro_20260622_122010_AGB_SBI_Cashback.png1732257446742";
                  }}
                />
              </Box>
            </Grid>

            {/* Right: Overview & Quick Highlights */}
            <Grid item xs={12} md={7}>
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  color: "#94a3b8",
                  mb: 0.8,
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Card Overview
              </Typography>

              <Typography
                variant="h2"
                sx={{
                  fontWeight: 850,
                  fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.6rem" },
                  color: "#ffffff",
                  fontFamily: "'Poppins', sans-serif",
                  lineHeight: 1.15,
                  mb: 1.5,
                }}
              >
                {card.name}
              </Typography>

              {/* Badges */}
              <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
                <Chip
                  label={networkTag}
                  size="small"
                  sx={{ backgroundColor: "#ffffff", color: "#0f172a", fontWeight: 800, fontSize: "0.76rem" }}
                />
                {bankName && (
                  <Chip
                    label={bankName}
                    size="small"
                    sx={{ backgroundColor: "rgba(255, 255, 255, 0.15)", color: "#ffffff", fontWeight: 700, fontSize: "0.76rem" }}
                  />
                )}
                {isLTF && (
                  <Chip
                    label="Lifetime Free"
                    size="small"
                    sx={{ backgroundColor: "#10b981", color: "#ffffff", fontWeight: 800, fontSize: "0.76rem" }}
                  />
                )}
              </Box>

              {/* Bullet highlights from product_usps */}
              <Stack spacing={1} sx={{ mb: 2.5 }}>
                {usps.slice(0, 2).map((usp, idx) => (
                  <Box key={idx} sx={{ display: "flex", alignItems: "flex-start", gap: 1.2 }}>
                    <Typography sx={{ color: "#facc15", fontWeight: 800, fontSize: "1rem", lineHeight: 1 }}>
                      ✓
                    </Typography>
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: "0.9rem", color: "#ffffff", fontFamily: "'Poppins', sans-serif" }}>
                        {usp.header}
                      </Typography>
                      <Typography sx={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.75)", fontFamily: "'Poppins', sans-serif" }}>
                        {usp.description}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>

              {/* CTA Action Buttons */}
              <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
                <Button
                  variant="contained"
                  size="medium"
                  onClick={() => setIsApplyModalOpen(true)}
                  endIcon={<OpenInNewIcon sx={{ fontSize: "1rem !important" }} />}
                  sx={{
                    background: "#ffffff",
                    color: "#0f172a",
                    fontWeight: 800,
                    borderRadius: "12px",
                    px: 3.5,
                    py: 1.1,
                    textTransform: "none",
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "0.9rem",
                    "&:hover": { background: "#f8fafc", transform: "translateY(-2px)" },
                    transition: "all 0.2s ease",
                  }}
                >
                  Apply Now
                </Button>

                <Button
                  variant="outlined"
                  size="medium"
                  onClick={() => scrollToSection("fees")}
                  startIcon={<VerifiedUserIcon />}
                  sx={{
                    borderColor: "rgba(255, 255, 255, 0.4)",
                    color: "#ffffff",
                    fontWeight: 700,
                    borderRadius: "12px",
                    px: 3,
                    py: 1.1,
                    textTransform: "none",
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "0.9rem",
                    "&:hover": { borderColor: "#ffffff", background: "rgba(255,255,255,0.08)" },
                  }}
                >
                  Check Eligibility
                </Button>

                <Button
                  variant="outlined"
                  size="medium"
                  onClick={() => {
                    setIsCompared(!isCompared);
                    toast.success(isCompared ? "Removed from compare" : "Added to compare");
                  }}
                  startIcon={isCompared ? <CheckIcon /> : <AddIcon />}
                  sx={{
                    borderColor: "rgba(255, 255, 255, 0.25)",
                    color: "#ffffff",
                    fontWeight: 700,
                    borderRadius: "12px",
                    px: 2.5,
                    py: 1.1,
                    textTransform: "none",
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "0.9rem",
                    "&:hover": { borderColor: "#ffffff", background: "rgba(255,255,255,0.08)" },
                  }}
                >
                  {isCompared ? "Compared" : "Compare"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* STICKY TAB NAVIGATION BAR */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 90,
          background: isDark ? "rgba(15, 23, 42, 0.95)" : "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
          py: 1.5,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", gap: 1.5, overflowX: "auto", py: 0.5 }}>
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <Button
                  key={tab.id}
                  onClick={() => scrollToSection(tab.id)}
                  sx={{
                    borderRadius: "10px",
                    px: 2.5,
                    py: 0.8,
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    fontFamily: "'Poppins', sans-serif",
                    textTransform: "none",
                    whiteSpace: "nowrap",
                    backgroundColor: isActive ? "#3244e6" : "transparent",
                    color: isActive ? "#ffffff" : isDark ? "#94a3b8" : "#64748b",
                    "&:hover": {
                      backgroundColor: isActive ? "#1d2ebd" : isDark ? "rgba(255,255,255,0.06)" : "#f1f5f9",
                    },
                  }}
                >
                  {tab.label}
                </Button>
              );
            })}
          </Box>
        </Container>
      </Box>

      {/* DETAILED CONTENT SECTIONS */}
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        {/* 1. FEES & ELIGIBILITY SECTION */}
        <Box id="fees" sx={{ mb: 6 }}>
          <Grid container spacing={3.5}>
            {/* Fees Card */}
            <Grid item xs={12} md={6}>
              <Typography variant="h5" sx={{ fontWeight: 800, color: isDark ? "#fff" : "#0f172a", fontFamily: "'Poppins', sans-serif", mb: 2 }}>
                Fees
              </Typography>
              <Card
                sx={{
                  borderRadius: "20px",
                  background: isDark ? "#1e293b" : "#ffffff",
                  border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                  p: 3,
                }}
              >
                <Typography sx={{ fontSize: "0.78rem", color: isDark ? "#94a3b8" : "#64748b", fontWeight: 600, textTransform: "uppercase" }}>
                  Annual Fee
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 850, color: isDark ? "#fff" : "#0f172a", fontFamily: "'Poppins', sans-serif", mt: 0.5, mb: 2 }}>
                  {isLTF ? "Free (₹0)" : `₹${Math.round(parseInt(annualFee) * 1.18).toLocaleString("en-IN")} (₹${parseInt(annualFee).toLocaleString("en-IN")} + GST)`}
                </Typography>

                {card.annual_fee_waiver || card.annual_fee_comment ? (
                  <Box sx={{ p: 2, borderRadius: "12px", backgroundColor: isDark ? "rgba(50, 68, 230, 0.1)" : "#eff6ff", border: "1px solid #bfdbfe" }}>
                    <Typography sx={{ fontWeight: 700, fontSize: "0.85rem", color: "#3244e6", mb: 0.5 }}>
                      Waiver Condition
                    </Typography>
                    <Typography sx={{ fontSize: "0.85rem", color: isDark ? "#cbd5e1" : "#1e40af" }}>
                      {card.annual_fee_comment || `Annual fee waived on spending ₹${card.annual_fee_waiver} in the preceding year.`}
                    </Typography>
                  </Box>
                ) : null}
              </Card>
            </Grid>

            {/* Eligibility Card */}
            <Grid item xs={12} md={6}>
              <Typography variant="h5" sx={{ fontWeight: 800, color: isDark ? "#fff" : "#0f172a", fontFamily: "'Poppins', sans-serif", mb: 2 }}>
                Eligibility
              </Typography>
              <Card
                sx={{
                  borderRadius: "20px",
                  background: isDark ? "#1e293b" : "#ffffff",
                  border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                  p: 3,
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography sx={{ fontSize: "0.78rem", color: isDark ? "#94a3b8" : "#64748b", fontWeight: 600, textTransform: "uppercase" }}>
                      Min Monthly Income
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: isDark ? "#fff" : "#0f172a", mt: 0.5 }}>
                      {card.income_comment || (card.income ? `₹${parseInt(card.income).toLocaleString("en-IN")}` : "₹25,000/mo")}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={{ fontSize: "0.78rem", color: isDark ? "#94a3b8" : "#64748b", fontWeight: 600, textTransform: "uppercase" }}>
                      Employment
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: isDark ? "#fff" : "#0f172a", mt: 0.5 }}>
                      {card.employment_type || "Salaried / Self-Employed"}
                    </Typography>
                  </Grid>
                  {card.min_age && (
                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: "0.78rem", color: isDark ? "#94a3b8" : "#64748b", fontWeight: 600, textTransform: "uppercase" }}>
                        Age Requirement
                      </Typography>
                      <Typography sx={{ fontWeight: 700, color: isDark ? "#fff" : "#0f172a", mt: 0.5 }}>
                        {card.min_age} - {card.max_age || 65} Years
                      </Typography>
                    </Grid>
                  )}
                  {card.crif && (
                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: "0.78rem", color: isDark ? "#94a3b8" : "#64748b", fontWeight: 600, textTransform: "uppercase" }}>
                        CRIF / CIBIL Score
                      </Typography>
                      <Typography sx={{ fontWeight: 700, color: isDark ? "#fff" : "#0f172a", mt: 0.5 }}>
                        {card.crif}+ Recommended
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* 2. KEY BENEFITS SECTION */}
        <Box id="benefits" sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 850, color: isDark ? "#fff" : "#0f172a", fontFamily: "'Poppins', sans-serif", mb: 3 }}>
            Key Benefits
          </Typography>

          <Grid container spacing={3}>
            {usps.map((usp, idx) => (
              <Grid item xs={12} sm={6} key={idx}>
                <Card
                  sx={{
                    borderRadius: "18px",
                    background: isDark ? "#1e293b" : "#ffffff",
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
                    boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
                    p: 2.5,
                    height: "100%",
                    display: "flex",
                    gap: 2,
                    alignItems: "flex-start",
                  }}
                >
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      backgroundColor: isDark ? "rgba(56, 189, 248, 0.15)" : "#eff6ff",
                      color: "#3244e6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      mt: 0.2,
                    }}
                  >
                    <CheckIcon sx={{ fontSize: "1.1rem" }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 800, fontSize: "0.98rem", color: isDark ? "#fff" : "#0f172a", fontFamily: "'Poppins', sans-serif", mb: 0.5 }}>
                      {usp.header}
                    </Typography>
                    <Typography sx={{ fontSize: "0.85rem", color: isDark ? "#94a3b8" : "#64748b", fontFamily: "'Poppins', sans-serif", lineHeight: 1.5 }}>
                      {usp.description}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* 3. REWARDS & REDEMPTION SECTION */}
        <Box id="rewards" sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 850, color: isDark ? "#fff" : "#0f172a", fontFamily: "'Poppins', sans-serif", mb: 3 }}>
            Rewards & Redemption
          </Typography>

          <Card
            sx={{
              borderRadius: "20px",
              background: isDark ? "#1e293b" : "#ffffff",
              border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
              p: 3.5,
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
                  <CardGiftcardIcon sx={{ color: "#3244e6" }} />
                  <Typography sx={{ fontWeight: 700, color: isDark ? "#fff" : "#0f172a", fontFamily: "'Poppins', sans-serif" }}>
                    Reward Conversion Rate
                  </Typography>
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 800, color: isDark ? "#38bdf8" : "#3244e6", fontFamily: "'Poppins', sans-serif" }}>
                  {card.reward_conversion_rate || "Direct Statement Cashback"}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
                  <MonetizationOnIcon sx={{ color: "#10b981" }} />
                  <Typography sx={{ fontWeight: 700, color: isDark ? "#fff" : "#0f172a", fontFamily: "'Poppins', sans-serif" }}>
                    Redemption Options
                  </Typography>
                </Box>
                {renderFormattedContent(
                  card.redemption_options,
                  "Cashback is automatically credited to the monthly credit card statement."
                )}
              </Grid>
            </Grid>
          </Card>
        </Box>

        {/* 4. FEE STRUCTURE & CHARGES */}
        <Box id="fee-structure" sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 850, color: isDark ? "#fff" : "#0f172a", fontFamily: "'Poppins', sans-serif", mb: 3 }}>
            Fee Structure & Charges
          </Typography>

          <Card
            sx={{
              borderRadius: "20px",
              background: isDark ? "#1e293b" : "#ffffff",
              border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
              p: 3.5,
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontSize: "0.78rem", color: isDark ? "#94a3b8" : "#64748b", fontWeight: 600, textTransform: "uppercase" }}>
                  Joining Fee
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 800, color: isDark ? "#fff" : "#0f172a", mt: 0.5, mb: 1 }}>
                  {isLTF ? "Nil (Lifetime Free)" : `₹${parseInt(joiningFee).toLocaleString("en-IN")} + GST`}
                </Typography>
                {card.joining_fee_comment && renderFormattedContent(card.joining_fee_comment, "", { fontSize: "0.82rem", color: isDark ? "#94a3b8" : "#64748b" })}
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontSize: "0.78rem", color: isDark ? "#94a3b8" : "#64748b", fontWeight: 600, textTransform: "uppercase" }}>
                  Annual Renewal Fee
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 800, color: isDark ? "#fff" : "#0f172a", mt: 0.5, mb: 1 }}>
                  {card.annual_fee_text === "0" || card.annual_fee_text === "Nil" || !card.annual_fee_text
                    ? "Nil (Lifetime Free)"
                    : `₹${parseInt(annualFee).toLocaleString("en-IN")} + GST`}
                </Typography>
                {card.annual_fee_comment && renderFormattedContent(card.annual_fee_comment, "", { fontSize: "0.82rem", color: isDark ? "#94a3b8" : "#64748b" })}
              </Grid>
            </Grid>
          </Card>
        </Box>

        {/* 5. TERMS & CONDITIONS */}
        <Box id="tnc" sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 850, color: isDark ? "#fff" : "#0f172a", fontFamily: "'Poppins', sans-serif", mb: 3 }}>
            Terms & Conditions
          </Typography>

          <Card
            sx={{
              borderRadius: "20px",
              background: isDark ? "#1e293b" : "#ffffff",
              border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
              p: 3.5,
            }}
          >
            {renderFormattedContent(
              card.tnc,
              "Approval of credit card application is at the sole discretion of the issuing bank based on internal credit policy, CIBIL score verification, and income verification. Cashback and reward points calculation is subject to issuer terms and milestone policies."
            )}
          </Card>
        </Box>
      </Container>

      {/* BOTTOM STICKY ACTION BAR */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: isDark ? "rgba(15, 23, 42, 0.95)" : "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(16px)",
          borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0"}`,
          py: 1.8,
          px: 2,
          boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={() => setIsApplyModalOpen(true)}
              endIcon={<OpenInNewIcon />}
              sx={{
                background: "linear-gradient(135deg, #3244e6 0%, #1d2ebd 100%)",
                color: "#ffffff",
                fontWeight: 800,
                fontSize: "1rem",
                borderRadius: "14px",
                py: 1.3,
                textTransform: "none",
                fontFamily: "'Poppins', sans-serif",
                boxShadow: "0 6px 20px rgba(50, 68, 230, 0.35)",
              }}
            >
              Apply Now - Instant Decision
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => {
                setIsCompared(!isCompared);
                toast.success(isCompared ? "Removed from compare" : "Added to compare");
              }}
              startIcon={isCompared ? <CheckIcon /> : <AddIcon />}
              sx={{
                borderRadius: "14px",
                px: 3.5,
                py: 1.3,
                fontWeight: 700,
                fontFamily: "'Poppins', sans-serif",
                borderColor: isDark ? "rgba(255,255,255,0.2)" : "#cbd5e1",
                color: isDark ? "#fff" : "#0f172a",
                textTransform: "none",
                whiteSpace: "nowrap",
              }}
            >
              {isCompared ? "Compared" : "Compare"}
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Lead capture modal */}
      <ApplyCardModal
        open={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        card={card}
      />
    </Box>
  );
}
