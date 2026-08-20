import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputAdornment,
  CircularProgress,
  Button,
  Chip,
  Stack,
  IconButton,
  Tooltip,
  Radio,
  Checkbox,
  Collapse,
  Slider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import CalculateIcon from "@mui/icons-material/Calculate";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import FlightIcon from "@mui/icons-material/Flight";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

import ApplyCardModal from "./ApplyCardModal";
import CardDetailModal from "./CardDetailModal";
import SpendCalculatorModal from "./SpendCalculatorModal";
import CompareCardsModal from "./CompareCardsModal";
import CategoryGeniusModal from "./CategoryGeniusModal";
import { getCreditCards, calculateCardSpends } from "../../apis/CreditCardsAPI";
import { toast } from "react-toastify";
import "./CreditCards.css";

const CATEGORIES = [
  { label: "All Cards", value: "all", icon: AccountBalanceWalletIcon },
  { label: "Fuel", value: "fuel", icon: LocalGasStationIcon },
  { label: "Shopping", value: "shopping", icon: ShoppingBagIcon },
  { label: "Food Delivery", value: "online-food", icon: FastfoodIcon },
  { label: "Dining", value: "dining", icon: RestaurantIcon },
  { label: "Grocery", value: "grocery", icon: LocalCafeIcon },
  { label: "Travel", value: "travel", icon: FlightIcon },
];

const FEE_RANGES = [
  { label: "All Fees", value: "all" },
  { label: "Lifetime Free (₹0)", value: "free" },
  { label: "₹1 - ₹1,000", value: "1-1000" },
  { label: "₹1,001 - ₹2,000", value: "1001-2000" },
  { label: "₹2,001 - ₹5,000", value: "2001-5000" },
  { label: "₹5,001+", value: "5001+" },
];

const NETWORKS = [
  { label: "VISA", value: "VISA" },
  { label: "Mastercard", value: "Mastercard" },
  { label: "RuPay", value: "RuPay" },
  { label: "American Express", value: "AmericanExpress" },
];

const BANKS = [
  "HDFC Bank",
  "SBI Card",
  "ICICI Bank",
  "Axis Bank",
  "IDFC FIRST Bank",
  "IndusInd Bank",
  "Kotak Mahindra Bank",
  "AU Small Finance Bank",
  "Standard Chartered",
  "HSBC Bank",
  "Yes Bank",
  "RBL Bank",
];

export default function CreditCards() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFeeRange, setSelectedFeeRange] = useState("all");
  const [selectedNetworks, setSelectedNetworks] = useState([]);
  const [selectedBanks, setSelectedBanks] = useState([]);
  const [bankSearchText, setBankSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const searchContainerRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(12);

  // Close search suggestions dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsSearchDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  // Collapsible Accordions (Category OPEN, others CLOSED by default)
  const [openCategory, setOpenCategory] = useState(true);
  const [openFeeRange, setOpenFeeRange] = useState(false);
  const [openNetwork, setOpenNetwork] = useState(false);
  const [openBank, setOpenBank] = useState(false);

  // 3-Field Eligibility Bar
  const [pincode, setPincode] = useState("");
  const [inhandIncome, setInhandIncome] = useState("");
  const [empStatus, setEmpStatus] = useState("Salaried");
  const [isEligibilityApplied, setIsEligibilityApplied] = useState(false);

  // Inline Spend Calculator Section State (POST /partner/cardgenius/v2/calculate)
  const [inlineSpends, setInlineSpends] = useState({
    amazon_spends: 10000,
    flipkart_spends: 5000,
    online_food_ordering: 4000,
    dining_or_going_out: 5000,
    fuel: 4000,
    grocery_spends_online: 6000,
    flights_annual: 50000,
    electricity_bills: 3000,
  });
  const [inlineCalculating, setInlineCalculating] = useState(false);
  const [inlineResults, setInlineResults] = useState(null);

  // Modals & Comparison
  const [comparedCards, setComparedCards] = useState([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [categorySavings, setCategorySavings] = useState({});
  const [isCategoryGeniusOpen, setIsCategoryGeniusOpen] = useState(false);
  const [selectedCardForApply, setSelectedCardForApply] = useState(null);
  const [selectedCardForDetail, setSelectedCardForDetail] = useState(null);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCards();
  }, []);

  const fetchCards = async () => {
    setLoading(true);
    try {
      const data = await getCreditCards();
      setCards(data || []);
    } catch (err) {
      console.error("Failed to load cards:", err);
      toast.error("Failed to load credit cards.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleNetwork = (net) => {
    setSelectedNetworks((prev) =>
      prev.includes(net) ? prev.filter((n) => n !== net) : [...prev, net]
    );
  };

  const handleToggleBank = (bank) => {
    setSelectedBanks((prev) =>
      prev.includes(bank) ? prev.filter((b) => b !== bank) : [...prev, bank]
    );
  };

  const handleClearAllFilters = () => {
    setSelectedCategory("all");
    setSelectedFeeRange("all");
    setSelectedNetworks([]);
    setSelectedBanks([]);
    setBankSearchText("");
    setSearchQuery("");
    setPincode("");
    setInhandIncome("");
    setEmpStatus("Salaried");
    setIsEligibilityApplied(false);
    setCategorySavings({});
    setVisibleCount(12);
    toast.info("All filters cleared");
  };

  const handleApplyEligibility = () => {
    if (!pincode || pincode.length !== 6) {
      toast.error("Please enter a valid 6-digit pincode.");
      return;
    }
    if (!inhandIncome || parseInt(inhandIncome) < 1000) {
      toast.error("Please enter your monthly income.");
      return;
    }
    setIsEligibilityApplied(true);
    toast.success("Eligibility criteria applied!");
  };

  const handleToggleCompare = (card, e) => {
    e.stopPropagation();
    const exists = comparedCards.some((c) => (c.id || c.seo_alias) === (card.id || card.seo_alias));
    if (exists) {
      setComparedCards((prev) => prev.filter((c) => (c.id || c.seo_alias) !== (card.id || card.seo_alias)));
      toast.info(`Removed ${card.name} from comparison`);
    } else {
      if (comparedCards.length >= 4) {
        toast.warning("You can compare up to 4 credit cards at a time.");
        return;
      }
      setComparedCards((prev) => [...prev, card]);
      toast.success(`Added ${card.name} to comparison`);
    }
  };

  const handleRemoveCompare = (card) => {
    setComparedCards((prev) => prev.filter((c) => (c.id || c.seo_alias) !== (card.id || card.seo_alias)));
  };

  const handleInlineSliderChange = (field) => (event, newValue) => {
    setInlineSpends((prev) => ({ ...prev, [field]: newValue }));
  };

  const handleCalculateInline = async () => {
    setInlineCalculating(true);
    try {
      const data = await calculateCardSpends(inlineSpends);
      let list = [];
      if (data?.savings && Array.isArray(data.savings)) {
        list = data.savings;
      } else if (data?.cards && Array.isArray(data.cards)) {
        list = data.cards;
      } else if (Array.isArray(data)) {
        list = data;
      } else if (data?.data && Array.isArray(data.data)) {
        list = data.data;
      }

      if (list.length > 0) {
        // Sort descending by highest calculated savings
        const sorted = [...list].sort((a, b) => {
          const valA = parseFloat(a.total_savings_yearly || a.net_savings || a.annual_saving || 0);
          const valB = parseFloat(b.total_savings_yearly || b.net_savings || b.annual_saving || 0);
          return valB - valA;
        });
        setInlineResults(sorted);
        toast.success(`Calculated top rewards across 130+ cards! Ranked by highest savings.`);
      } else {
        toast.info("Adjust your spend amounts to calculate savings.");
      }
    } catch (err) {
      console.error("Inline calculate error:", err);
      toast.error("Failed to calculate savings. Please try again.");
    } finally {
      setInlineCalculating(false);
    }
  };

  // Real-time search suggestions directly under hero search bar
  const searchSuggestions = useMemo(() => {
    if (!searchQuery || searchQuery.trim().length === 0) return [];
    const q = searchQuery.toLowerCase().trim();
    return cards
      .filter((c) => {
        const nameMatch = c.name?.toLowerCase().includes(q);
        const bankMatch = c.bank_name?.toLowerCase().includes(q);
        const aliasMatch = c.card_alias?.toLowerCase().includes(q);
        const typeMatch = c.card_type?.toLowerCase().includes(q);
        const tagMatch = c.tags?.some((t) => t.name?.toLowerCase().includes(q));
        return nameMatch || bankMatch || aliasMatch || typeMatch || tagMatch;
      })
      .slice(0, 6);
  }, [searchQuery, cards]);

  // Filter & Search Logic
  const filteredCards = useMemo(() => {
    let result = [...cards];

    // Category
    if (selectedCategory !== "all") {
      const cat = selectedCategory.toLowerCase();
      result = result.filter((c) =>
        c.tags?.some(
          (t) =>
            t.name?.toLowerCase().includes(cat) ||
            t.seo_alias?.toLowerCase().includes(cat)
        )
      );
    }

    // Annual Fee Range
    if (selectedFeeRange === "free") {
      result = result.filter(
        (c) =>
          c.joining_fee_text === "0" ||
          c.joining_fee_text === "Free" ||
          c.joining_fee_text === "Nil" ||
          !c.joining_fee_text ||
          c.annual_fee_text === "0" ||
          c.annual_fee_text === "Nil" ||
          !c.annual_fee_text
      );
    } else if (selectedFeeRange === "1-1000") {
      result = result.filter((c) => {
        const fee = parseFloat(c.joining_fee_text) || 0;
        return fee >= 1 && fee <= 1000;
      });
    } else if (selectedFeeRange === "1001-2000") {
      result = result.filter((c) => {
        const fee = parseFloat(c.joining_fee_text) || 0;
        return fee >= 1001 && fee <= 2000;
      });
    } else if (selectedFeeRange === "2001-5000") {
      result = result.filter((c) => {
        const fee = parseFloat(c.joining_fee_text) || 0;
        return fee >= 2001 && fee <= 5000;
      });
    } else if (selectedFeeRange === "5001+") {
      result = result.filter((c) => (parseFloat(c.joining_fee_text) || 0) > 5000);
    }

    // Card Network
    if (selectedNetworks.length > 0) {
      result = result.filter((c) => {
        const cardNet = (c.card_type || c.name || "").toLowerCase();
        return selectedNetworks.some((n) => cardNet.includes(n.toLowerCase()));
      });
    }

    // Bank Multi-Select
    if (selectedBanks.length > 0) {
      result = result.filter((c) => {
        const bName = (c.bank_name || "").toLowerCase();
        return selectedBanks.some((b) => {
          const cleanB = b.toLowerCase().replace(" bank", "").replace(" card", "").trim();
          return bName.includes(cleanB);
        });
      });
    }

    // Search query (Searches card name, bank, and network)
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (c) =>
          (c.name && c.name.toLowerCase().includes(q)) ||
          (c.bank_name && c.bank_name.toLowerCase().includes(q)) ||
          (c.card_type && c.card_type.toLowerCase().includes(q))
      );
    }

    // Eligibility check
    if (isEligibilityApplied && inhandIncome) {
      const userMonthly = parseFloat(inhandIncome) || 0;
      const userAnnual = userMonthly * 12;
      result = result.filter((c) => {
        const minIncome = parseFloat(c.income) || 0;
        return userAnnual >= minIncome || userMonthly >= minIncome || minIncome === 0;
      });
    }

    return result;
  }, [
    cards,
    selectedCategory,
    selectedFeeRange,
    selectedNetworks,
    selectedBanks,
    searchQuery,
    isEligibilityApplied,
    inhandIncome,
  ]);

  const loadMoreRef = useRef(null);

  // Reset visibleCount to 12 when any filter or search query changes
  useEffect(() => {
    setVisibleCount(12);
  }, [
    selectedCategory,
    selectedFeeRange,
    selectedNetworks,
    selectedBanks,
    searchQuery,
    isEligibilityApplied,
    inhandIncome,
  ]);

  // Infinite scroll observer: Automatically loads next 12 cards on scroll
  useEffect(() => {
    if (visibleCount >= filteredCards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0] && entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + 12, filteredCards.length));
        }
      },
      { threshold: 0.1, rootMargin: "300px" }
    );

    const currentEl = loadMoreRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, [visibleCount, filteredCards.length]);

  const displayedCards = filteredCards.slice(0, visibleCount);

  const getNetworkTag = (card) => {
    const type = (card.card_type || card.name || "").toLowerCase();
    if (type.includes("visa")) return "VISA";
    if (type.includes("master")) return "Mastercard";
    if (type.includes("rupay")) return "RuPay";
    if (type.includes("amex") || type.includes("american")) return "Amex";
    return "Credit Card";
  };

  return (
    <Box sx={{ minHeight: "100vh", pb: { xs: 8, md: 10 }, background: isDark ? "#0b0f19" : "#f8faff" }}>
      {/* 1. HERO SECTION */}
      <Box
        sx={{
          minHeight: { xs: "auto", md: "calc(100vh - 75px)" },
          display: "flex",
          alignItems: "center",
          background: isDark
            ? "radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%), #0f172a"
            : "radial-gradient(circle at 80% 20%, rgba(50, 68, 230, 0.06) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(56, 189, 248, 0.05) 0%, transparent 50%), #ffffff",
          pt: { xs: 3.5, sm: 4, md: 4 },
          pb: { xs: 4, sm: 5, md: 6 },
          px: { xs: 2, sm: 4 },
          position: "relative",
          overflow: "visible",
          zIndex: 5,
        }}
      >
        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 10, px: { xs: 2, sm: 3, md: 4 }, my: "auto" }}>
          <Grid container spacing={{ xs: 3, md: 4 }} alignItems="center">
            {/* LEFT COLUMN: BADGE, HEADLINE, SUBTITLE, SEARCH BAR */}
            <Grid item xs={12} md={6.8} lg={7} sx={{ textAlign: { xs: "center", md: "left" } }}>
              {/* Badge */}
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  px: 2.2,
                  py: 0.6,
                  borderRadius: "50px",
                  background: isDark ? "rgba(255, 255, 255, 0.08)" : "#ffffff",
                  border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(50, 68, 230, 0.15)"}`,
                  boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
                  mb: 1.8,
                }}
              >
                <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#3244e6" }} />
                <Typography sx={{ fontSize: "0.76rem", fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", color: isDark ? "#38bdf8" : "#3244e6", fontFamily: "'Poppins', sans-serif" }}>
                  AI-Powered Card Advisor
                </Typography>
              </Box>

              {/* Heading */}
              <Typography
                variant="h1"
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 850,
                  fontSize: { xs: "2.1rem", sm: "2.8rem", md: "3.2rem", lg: "3.6rem" },
                  color: isDark ? "#fff" : "#0f172a",
                  lineHeight: 1.1,
                  mb: 1.5,
                }}
              >
                Build wealth with
                <br />
                <Box component="span" sx={{ background: "linear-gradient(90deg, #3244e6 0%, #5b6cf0 50%, #38bdf8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  smarter cards
                </Box>
              </Typography>

              <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: { xs: "0.92rem", sm: "1.02rem" }, color: isDark ? "rgba(255,255,255,0.8)" : "#64748b", mb: 2.5, maxWidth: 580, mx: { xs: "auto", md: "0" } }}>
                We analyze 130+ cards against your real spending to find your perfect match.
              </Typography>

              {/* Search bar inside Hero with live suggestions */}
              <Box ref={searchContainerRef} sx={{ maxWidth: { xs: "100%", sm: 560 }, mx: { xs: "auto", md: "0" }, position: "relative", mb: 3 }}>
                <Box
                  component="form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsSearchDropdownOpen(false);
                    const el = document.getElementById("cards-catalog");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  sx={{
                    p: 0.8,
                    borderRadius: "20px",
                    background: isDark ? "rgba(30, 41, 59, 0.95)" : "#ffffff",
                    boxShadow: "0 12px 30px rgba(50, 68, 230, 0.12)",
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "#e2e8f0"}`,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <TextField
                    fullWidth
                    placeholder="Search by card name or bank (e.g. Axis Flipkart, SBI Cashback)..."
                    value={searchQuery}
                    onFocus={() => {
                      if (searchQuery.trim().length > 0) {
                        setIsSearchDropdownOpen(true);
                      }
                    }}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setIsSearchDropdownOpen(e.target.value.trim().length > 0);
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: "#3244e6", ml: 1 }} />
                        </InputAdornment>
                      ),
                      endAdornment: searchQuery ? (
                        <InputAdornment position="end">
                          <IconButton
                            size="small"
                            onClick={() => {
                              setSearchQuery("");
                              setIsSearchDropdownOpen(false);
                            }}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      ) : null,
                      style: { fontFamily: "'Poppins', sans-serif", fontSize: "0.92rem" },
                    }}
                    sx={{ "& fieldset": { border: "none" } }}
                  />
                  <Button
                    variant="contained"
                    onClick={() => {
                      setIsSearchDropdownOpen(false);
                      const el = document.getElementById("cards-catalog");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    sx={{
                      background: "linear-gradient(135deg, #3244e6 0%, #1d2ebd 100%)",
                      color: "#fff",
                      fontWeight: 700,
                      borderRadius: "14px",
                      px: 3.2,
                      py: 1.2,
                      fontFamily: "'Poppins', sans-serif",
                      textTransform: "none",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Search
                  </Button>
                </Box>

                {/* LIVE SEARCH RESULTS DROPDOWN DIRECTLY UNDER SEARCH BAR */}
                {isSearchDropdownOpen && searchQuery.trim().length > 0 && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      right: 0,
                      mt: 1.5,
                      zIndex: 200,
                      background: isDark ? "#0f172a" : "#ffffff",
                      borderRadius: "20px",
                      border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "#e2e8f0"}`,
                      boxShadow: "0 20px 45px rgba(0,0,0,0.18)",
                      p: 2,
                      maxHeight: "420px",
                      overflowY: "auto",
                      scrollbarWidth: "none",
                      "&::-webkit-scrollbar": {
                        display: "none",
                      },
                      textAlign: "left",
                    }}
                  >
                    <Box sx={{ mb: 1.5, px: 1 }}>
                      <Typography sx={{ fontSize: "0.8rem", fontWeight: 700, color: isDark ? "#94a3b8" : "#64748b", textTransform: "uppercase", fontFamily: "'Poppins', sans-serif" }}>
                        Found {searchSuggestions.length} matching {searchSuggestions.length === 1 ? "card" : "cards"}
                      </Typography>
                    </Box>

                    {searchSuggestions.length === 0 ? (
                      <Box sx={{ p: 3, textAlign: "center", color: "#64748b" }}>
                        <Typography sx={{ fontSize: "0.9rem", fontFamily: "'Poppins', sans-serif" }}>
                          No credit cards found matching "{searchQuery}"
                        </Typography>
                      </Box>
                    ) : (
                      <Stack spacing={1.2}>
                        {searchSuggestions.map((card) => {
                          const joiningFee = card.joining_fee_text || "0";
                          const isLTF = joiningFee === "0" || joiningFee === "Nil" || joiningFee === "Free" || !joiningFee;
                          const cardSlug = card.card_alias || card.seo_alias || card.id;

                          return (
                            <Box
                              key={card.id || card.seo_alias}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                p: 1.5,
                                borderRadius: "14px",
                                background: isDark ? "rgba(255,255,255,0.03)" : "#f8fafc",
                                border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "#f1f5f9"}`,
                                "&:hover": {
                                  background: isDark ? "rgba(50, 68, 230, 0.12)" : "#eff6ff",
                                  borderColor: "#3244e6",
                                  transform: "translateY(-1px)",
                                },
                                transition: "all 0.2s ease",
                                flexWrap: { xs: "wrap", sm: "nowrap" },
                                gap: 1.5,
                              }}
                            >
                              {/* Left: Artwork & Info */}
                              <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1, minWidth: 0 }}>
                                <img
                                  src={card.image || card.card_bg_image || "https://d2sriifpjiqv0p.cloudfront.net/admin/BankKaro_20260622_122010_AGB_SBI_Cashback.png1732257446742"}
                                  alt={card.name}
                                  style={{
                                    width: "60px",
                                    height: "38px",
                                    objectFit: "contain",
                                    borderRadius: "4px",
                                    filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.15))",
                                  }}
                                />
                                <Box sx={{ minWidth: 0 }}>
                                  <Typography
                                    noWrap
                                    sx={{
                                      fontWeight: 700,
                                      fontSize: "0.92rem",
                                      color: isDark ? "#fff" : "#0f172a",
                                      fontFamily: "'Poppins', sans-serif",
                                    }}
                                  >
                                    {card.name}
                                  </Typography>
                                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.2 }}>
                                    <Typography sx={{ fontSize: "0.76rem", color: "#64748b", fontWeight: 600, fontFamily: "'Poppins', sans-serif" }}>
                                      {card.bank_name || "Bank"}
                                    </Typography>
                                    <Typography sx={{ fontSize: "0.76rem", color: isLTF ? "#10b981" : "#64748b", fontWeight: 700, fontFamily: "'Poppins', sans-serif" }}>
                                      • {isLTF ? "Lifetime Free" : `Joining: ₹${parseInt(joiningFee).toLocaleString("en-IN")}`}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>

                              {/* Right: Action Buttons */}
                              <Box sx={{ display: "flex", gap: 1, flexShrink: 0, width: { xs: "100%", sm: "auto" }, justifyContent: { xs: "flex-end", sm: "flex-start" } }}>
                                <Button
                                  size="small"
                                  variant="outlined"
                                  onClick={() => {
                                    setIsSearchDropdownOpen(false);
                                    navigate(`/cards/${cardSlug}`);
                                  }}
                                  sx={{
                                    borderRadius: "10px",
                                    textTransform: "none",
                                    fontWeight: 700,
                                    fontSize: "0.8rem",
                                    px: 2,
                                    borderColor: isDark ? "rgba(255,255,255,0.2)" : "#cbd5e1",
                                    color: isDark ? "#cbd5e1" : "#475569",
                                    fontFamily: "'Poppins', sans-serif",
                                  }}
                                >
                                  Details
                                </Button>
                                <Button
                                  size="small"
                                  variant="contained"
                                  onClick={() => {
                                    setIsSearchDropdownOpen(false);
                                    setSelectedCardForApply(card);
                                  }}
                                  sx={{
                                    borderRadius: "10px",
                                    textTransform: "none",
                                    fontWeight: 700,
                                    fontSize: "0.8rem",
                                    px: 2.5,
                                    background: "linear-gradient(135deg, #3244e6 0%, #1d2ebd 100%)",
                                    color: "#fff",
                                    fontFamily: "'Poppins', sans-serif",
                                  }}
                                >
                                  Apply
                                </Button>
                              </Box>
                            </Box>
                          );
                        })}
                      </Stack>
                    )}
                  </Box>
                )}
              </Box>

              {/* Quick Trust Highlights */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap", justifyContent: { xs: "center", md: "flex-start" }, mt: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CheckCircleOutlineIcon sx={{ color: "#10b981", fontSize: "1.1rem" }} />
                  <Typography sx={{ fontSize: "0.82rem", fontWeight: 600, color: isDark ? "#cbd5e1" : "#475569", fontFamily: "'Poppins', sans-serif" }}>
                    130+ Verified Cards
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CheckCircleOutlineIcon sx={{ color: "#10b981", fontSize: "1.1rem" }} />
                  <Typography sx={{ fontSize: "0.82rem", fontWeight: 600, color: isDark ? "#cbd5e1" : "#475569", fontFamily: "'Poppins', sans-serif" }}>
                    100% Free Comparison
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CheckCircleOutlineIcon sx={{ color: "#10b981", fontSize: "1.1rem" }} />
                  <Typography sx={{ fontSize: "0.82rem", fontWeight: 600, color: isDark ? "#cbd5e1" : "#475569", fontFamily: "'Poppins', sans-serif" }}>
                    Instant Bank Offers
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* RIGHT COLUMN: REALISTIC ADVERTISEMENT IMAGE OF WOMAN WITH CREDIT CARD */}
            <Grid item xs={12} md={5.2} lg={5} sx={{ display: "flex", justifyContent: "center", position: "relative" }}>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  maxWidth: { xs: "300px", sm: "360px", md: "400px" },
                  mx: "auto",
                }}
              >
                {/* Main Advertisement Image */}
                <Box
                  sx={{
                    position: "relative",
                    borderRadius: "22px",
                    overflow: "hidden",
                    border: `3px solid ${isDark ? "rgba(255,255,255,0.12)" : "#ffffff"}`,
                    boxShadow: "0 20px 45px rgba(50, 68, 230, 0.16)",
                    lineHeight: 0,
                  }}
                >
                  <img
                    src="/credit_card_hero_ad.webp"
                    alt="Credit Card Advertisement"
                    style={{
                      width: "100%",
                      height: "auto",
                      maxHeight: "390px",
                      display: "block",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 2. INLINE LIVE SPEND & REWARDS CALCULATOR SECTION (POST /partner/cardgenius/v2/calculate) */}
      <Container maxWidth="xl" sx={{ mt: { xs: 4, md: 8 }, px: { xs: 2, sm: 3, md: 4 } }}>
        <Box
          sx={{
            background: isDark
              ? "linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%)"
              : "linear-gradient(135deg, #ffffff 0%, #f8faff 100%)",
            borderRadius: "28px",
            p: { xs: 3, sm: 4, md: 5 },
            border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(50, 68, 230, 0.12)"}`,
            boxShadow: isDark ? "0 12px 36px rgba(0,0,0,0.4)" : "0 10px 30px rgba(50, 68, 230, 0.08)",
            mb: { xs: 4, md: 6 },
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 0.6,
                borderRadius: "50px",
                backgroundColor: isDark ? "rgba(56, 189, 248, 0.15)" : "rgba(50, 68, 230, 0.08)",
                color: isDark ? "#38bdf8" : "#3244e6",
                fontWeight: 700,
                fontSize: "0.78rem",
                textTransform: "uppercase",
                letterSpacing: 1,
                mb: 1.5,
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              <AutoAwesomeIcon sx={{ fontSize: "0.95rem" }} />
              CardGenius™ Spend & Rewards Calculator
            </Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1.6rem", sm: "2.1rem", md: "2.5rem" },
                color: isDark ? "#fff" : "#0f172a",
                fontFamily: "'Poppins', sans-serif",
                lineHeight: 1.2,
                mb: 1,
              }}
            >
              Calculate Your Real Savings Before Applying
            </Typography>
            <Typography
              sx={{
                color: isDark ? "#94a3b8" : "#64748b",
                fontSize: { xs: "0.88rem", sm: "0.98rem" },
                fontFamily: "'Poppins', sans-serif",
                maxWidth: 650,
                mx: "auto",
              }}
            >
              Adjust your monthly spending sliders to run a live calculation with BankKaro's AI engine and find cards that deliver the highest reward points and net cashback.
            </Typography>
          </Box>

          {/* 6 Category Sliders Grid */}
          <Grid container spacing={3}>
            {/* 1. Online Shopping */}
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ p: 2.2, borderRadius: "18px", backgroundColor: isDark ? "rgba(15, 23, 42, 0.6)" : "#f8fafc", border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "#e2e8f0"}` }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <ShoppingBagIcon sx={{ color: "#3244e6", fontSize: "1.1rem" }} />
                    <Typography sx={{ fontWeight: 700, fontSize: "0.88rem", fontFamily: "'Poppins', sans-serif", color: isDark ? "#fff" : "#1e293b" }}>
                      Online Shopping
                    </Typography>
                  </Box>
                  <Typography sx={{ fontWeight: 800, color: isDark ? "#38bdf8" : "#3244e6", fontFamily: "'Poppins', sans-serif", fontSize: "0.92rem" }}>
                    ₹{inlineSpends.amazon_spends.toLocaleString("en-IN")}/mo
                  </Typography>
                </Box>
                <Slider
                  value={inlineSpends.amazon_spends}
                  onChange={handleInlineSliderChange("amazon_spends")}
                  min={0}
                  max={100000}
                  step={1000}
                  sx={{ color: "#3244e6" }}
                />
              </Box>
            </Grid>

            {/* 2. Dining & Food Delivery */}
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ p: 2.2, borderRadius: "18px", backgroundColor: isDark ? "rgba(15, 23, 42, 0.6)" : "#f8fafc", border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "#e2e8f0"}` }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <RestaurantIcon sx={{ color: "#3244e6", fontSize: "1.1rem" }} />
                    <Typography sx={{ fontWeight: 700, fontSize: "0.88rem", fontFamily: "'Poppins', sans-serif", color: isDark ? "#fff" : "#1e293b" }}>
                      Dining & Food Apps
                    </Typography>
                  </Box>
                  <Typography sx={{ fontWeight: 800, color: isDark ? "#38bdf8" : "#3244e6", fontFamily: "'Poppins', sans-serif", fontSize: "0.92rem" }}>
                    ₹{inlineSpends.dining_or_going_out.toLocaleString("en-IN")}/mo
                  </Typography>
                </Box>
                <Slider
                  value={inlineSpends.dining_or_going_out}
                  onChange={handleInlineSliderChange("dining_or_going_out")}
                  min={0}
                  max={50000}
                  step={500}
                  sx={{ color: "#3244e6" }}
                />
              </Box>
            </Grid>

            {/* 3. Fuel & Petrol */}
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ p: 2.2, borderRadius: "18px", backgroundColor: isDark ? "rgba(15, 23, 42, 0.6)" : "#f8fafc", border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "#e2e8f0"}` }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LocalGasStationIcon sx={{ color: "#3244e6", fontSize: "1.1rem" }} />
                    <Typography sx={{ fontWeight: 700, fontSize: "0.88rem", fontFamily: "'Poppins', sans-serif", color: isDark ? "#fff" : "#1e293b" }}>
                      Fuel & Petrol
                    </Typography>
                  </Box>
                  <Typography sx={{ fontWeight: 800, color: isDark ? "#38bdf8" : "#3244e6", fontFamily: "'Poppins', sans-serif", fontSize: "0.92rem" }}>
                    ₹{inlineSpends.fuel.toLocaleString("en-IN")}/mo
                  </Typography>
                </Box>
                <Slider
                  value={inlineSpends.fuel}
                  onChange={handleInlineSliderChange("fuel")}
                  min={0}
                  max={30000}
                  step={500}
                  sx={{ color: "#3244e6" }}
                />
              </Box>
            </Grid>

            {/* 4. Grocery */}
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ p: 2.2, borderRadius: "18px", backgroundColor: isDark ? "rgba(15, 23, 42, 0.6)" : "#f8fafc", border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "#e2e8f0"}` }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LocalCafeIcon sx={{ color: "#3244e6", fontSize: "1.1rem" }} />
                    <Typography sx={{ fontWeight: 700, fontSize: "0.88rem", fontFamily: "'Poppins', sans-serif", color: isDark ? "#fff" : "#1e293b" }}>
                      Grocery Spends
                    </Typography>
                  </Box>
                  <Typography sx={{ fontWeight: 800, color: isDark ? "#38bdf8" : "#3244e6", fontFamily: "'Poppins', sans-serif", fontSize: "0.92rem" }}>
                    ₹{inlineSpends.grocery_spends_online.toLocaleString("en-IN")}/mo
                  </Typography>
                </Box>
                <Slider
                  value={inlineSpends.grocery_spends_online}
                  onChange={handleInlineSliderChange("grocery_spends_online")}
                  min={0}
                  max={50000}
                  step={500}
                  sx={{ color: "#3244e6" }}
                />
              </Box>
            </Grid>

            {/* 5. Flights & Travel */}
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ p: 2.2, borderRadius: "18px", backgroundColor: isDark ? "rgba(15, 23, 42, 0.6)" : "#f8fafc", border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "#e2e8f0"}` }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <FlightIcon sx={{ color: "#3244e6", fontSize: "1.1rem" }} />
                    <Typography sx={{ fontWeight: 700, fontSize: "0.88rem", fontFamily: "'Poppins', sans-serif", color: isDark ? "#fff" : "#1e293b" }}>
                      Flights & Travel
                    </Typography>
                  </Box>
                  <Typography sx={{ fontWeight: 800, color: isDark ? "#38bdf8" : "#3244e6", fontFamily: "'Poppins', sans-serif", fontSize: "0.92rem" }}>
                    ₹{inlineSpends.flights_annual.toLocaleString("en-IN")}/yr
                  </Typography>
                </Box>
                <Slider
                  value={inlineSpends.flights_annual}
                  onChange={handleInlineSliderChange("flights_annual")}
                  min={0}
                  max={500000}
                  step={10000}
                  sx={{ color: "#3244e6" }}
                />
              </Box>
            </Grid>

            {/* 6. Utility & Electricity */}
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ p: 2.2, borderRadius: "18px", backgroundColor: isDark ? "rgba(15, 23, 42, 0.6)" : "#f8fafc", border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "#e2e8f0"}` }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <AccountBalanceWalletIcon sx={{ color: "#3244e6", fontSize: "1.1rem" }} />
                    <Typography sx={{ fontWeight: 700, fontSize: "0.88rem", fontFamily: "'Poppins', sans-serif", color: isDark ? "#fff" : "#1e293b" }}>
                      Utility & Bills
                    </Typography>
                  </Box>
                  <Typography sx={{ fontWeight: 800, color: isDark ? "#38bdf8" : "#3244e6", fontFamily: "'Poppins', sans-serif", fontSize: "0.92rem" }}>
                    ₹{inlineSpends.electricity_bills.toLocaleString("en-IN")}/mo
                  </Typography>
                </Box>
                <Slider
                  value={inlineSpends.electricity_bills}
                  onChange={handleInlineSliderChange("electricity_bills")}
                  min={0}
                  max={30000}
                  step={500}
                  sx={{ color: "#3244e6" }}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Calculate CTA Button */}
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleCalculateInline}
              disabled={inlineCalculating}
              endIcon={inlineCalculating ? <CircularProgress size={20} color="inherit" /> : <CalculateIcon />}
              sx={{
                background: "linear-gradient(135deg, #3244e6 0%, #1d2ebd 100%)",
                color: "#ffffff",
                fontWeight: 800,
                fontSize: "1rem",
                borderRadius: "50px",
                px: 5,
                py: 1.4,
                textTransform: "none",
                fontFamily: "'Poppins', sans-serif",
                boxShadow: "0 10px 25px rgba(50, 68, 230, 0.3)",
                "&:hover": {
                  background: "linear-gradient(135deg, #1d2ebd 0%, #3244e6 100%)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              {inlineCalculating ? "Calculating Top Cards..." : "Calculate Best Cards & Savings"}
            </Button>
          </Box>

          {/* Inline Results Box */}
          {inlineResults && inlineResults.length > 0 && (
            <Box sx={{ mt: 5, pt: 4, borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}` }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3, flexWrap: "wrap", gap: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <AutoAwesomeIcon sx={{ color: "#3244e6" }} />
                  <Typography variant="h5" sx={{ fontWeight: 800, color: isDark ? "#fff" : "#0f172a", fontFamily: "'Poppins', sans-serif" }}>
                    Top Recommended Cards For Your Spends
                  </Typography>
                </Box>
                <Chip label="Live BankKaro Engine" size="small" sx={{ backgroundColor: "rgba(16, 185, 129, 0.12)", color: "#10b981", fontWeight: 700 }} />
              </Box>

              <Grid container spacing={2.5}>
                {inlineResults.slice(0, 4).map((item, idx) => {
                  const cardName = item.card_name || item.name || "Credit Card";
                  const bankName = item.bank_name || item.bank || "Bank";
                  const netSavings = item.total_savings_yearly || item.net_savings || item.annual_saving || 15000;
                  const matchedCard = cards.find(
                    (c) =>
                      (c.id && item.id && c.id === item.id) ||
                      (c.seo_alias && item.seo_card_alias && c.seo_alias === item.seo_card_alias) ||
                      (c.name && cardName && c.name.toLowerCase() === cardName.toLowerCase())
                  );
                  const cardImg =
                    matchedCard?.image ||
                    matchedCard?.card_bg_image ||
                    item.image ||
                    item.card_bg_image ||
                    item.logo ||
                    item.cg_bank_image ||
                    "https://d2sriifpjiqv0p.cloudfront.net/admin/BankKaro_20260622_122010_AGB_SBI_Cashback.png1732257446742";

                  return (
                    <Grid item xs={12} sm={6} md={3} key={item.id || idx}>
                      <Card
                        sx={{
                          borderRadius: "20px",
                          background: isDark ? "#1e293b" : "#ffffff",
                          border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
                          boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
                          display: "flex",
                          flexDirection: "column",
                          height: "100%",
                          p: 2,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            borderColor: "#3244e6",
                            transform: "translateY(-4px)",
                            boxShadow: "0 12px 28px rgba(50,68,230,0.15)",
                          },
                        }}
                      >
                        {/* Top Rank Badge */}
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
                          <Chip
                            label={`#${idx + 1} Best Match`}
                            size="small"
                            sx={{
                              backgroundColor: idx === 0 ? "rgba(50, 68, 230, 0.12)" : "rgba(16, 185, 129, 0.12)",
                              color: idx === 0 ? "#3244e6" : "#10b981",
                              fontWeight: 700,
                              fontSize: "0.72rem",
                            }}
                          />
                          <Typography sx={{ fontSize: "0.72rem", color: isDark ? "#94a3b8" : "#64748b" }}>
                            {bankName}
                          </Typography>
                        </Box>

                        {/* Card Photo */}
                        <Box sx={{ height: 100, display: "flex", alignItems: "center", justifyContent: "center", my: 1 }}>
                          <img
                            src={cardImg}
                            alt={cardName}
                            style={{ maxHeight: "90px", maxWidth: "140px", objectFit: "contain", filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.15))" }}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://d2sriifpjiqv0p.cloudfront.net/admin/BankKaro_20260622_122010_AGB_SBI_Cashback.png1732257446742";
                            }}
                          />
                        </Box>

                        {/* Title */}
                        <Typography
                          sx={{
                            fontWeight: 800,
                            fontSize: "0.95rem",
                            color: isDark ? "#fff" : "#0f172a",
                            fontFamily: "'Poppins', sans-serif",
                            mt: 1,
                            mb: 1.5,
                            lineHeight: 1.3,
                            minHeight: "2.6em",
                          }}
                        >
                          {cardName}
                        </Typography>

                        {/* Net Savings Box */}
                        <Box sx={{ backgroundColor: isDark ? "rgba(16, 185, 129, 0.1)" : "#ecfdf5", p: 1.2, borderRadius: "10px", mb: 2, textAlign: "center" }}>
                          <Typography sx={{ fontSize: "0.72rem", color: "#059669", fontWeight: 600, textTransform: "uppercase" }}>
                            Estimated Savings
                          </Typography>
                          <Typography sx={{ fontSize: "1.1rem", fontWeight: 850, color: "#10b981", fontFamily: "'Poppins', sans-serif" }}>
                            ₹{parseInt(netSavings).toLocaleString("en-IN")}/yr
                          </Typography>
                        </Box>

                        {/* Action Buttons: Details + Apply */}
                        <Stack direction="row" spacing={1} sx={{ mt: "auto" }}>
                          <Button
                            variant="outlined"
                            onClick={() => {
                              const cardSlug =
                                matchedCard?.card_alias ||
                                matchedCard?.seo_alias ||
                                item.seo_card_alias ||
                                item.card_alias ||
                                item.seo_alias ||
                                item.id ||
                                matchedCard?.id;
                              if (cardSlug) {
                                navigate(`/cards/${cardSlug}`);
                              } else {
                                setSelectedCardForDetail(matchedCard || item);
                              }
                            }}
                            sx={{
                              flex: 1,
                              borderColor: isDark ? "rgba(255,255,255,0.2)" : "#cbd5e1",
                              color: isDark ? "#cbd5e1" : "#475569",
                              fontWeight: 700,
                              fontSize: "0.8rem",
                              borderRadius: "10px",
                              py: 0.8,
                              textTransform: "none",
                              fontFamily: "'Poppins', sans-serif",
                              "&:hover": {
                                borderColor: "#3244e6",
                                color: "#3244e6",
                                backgroundColor: "rgba(50, 68, 230, 0.04)",
                              },
                            }}
                          >
                            Details
                          </Button>
                          <Button
                            variant="contained"
                            onClick={() => setSelectedCardForApply(matchedCard || item)}
                            endIcon={<ArrowForwardIcon sx={{ fontSize: "0.85rem !important" }} />}
                            sx={{
                              flex: 1.2,
                              background: "linear-gradient(135deg, #3244e6 0%, #1d2ebd 100%)",
                              color: "#ffffff",
                              fontWeight: 700,
                              fontSize: "0.8rem",
                              borderRadius: "10px",
                              py: 0.8,
                              textTransform: "none",
                              fontFamily: "'Poppins', sans-serif",
                              boxShadow: "0 4px 12px rgba(50, 68, 230, 0.25)",
                              "&:hover": {
                                background: "linear-gradient(135deg, #1d2ebd 0%, #3244e6 100%)",
                              },
                            }}
                          >
                            Apply
                          </Button>
                        </Stack>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          )}
        </Box>
      </Container>

      {/* 3. MAIN CATALOG WITH SIDEBAR FILTERS */}
      <Container id="cards-catalog" maxWidth="xl" sx={{ mt: { xs: 4, md: 6 }, px: { xs: 2, sm: 3, md: 4 } }}>
        {/* Section Header */}
        <Box sx={{ mb: 4 }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              px: 2,
              py: 0.6,
              borderRadius: "50px",
              backgroundColor: isDark ? "rgba(56, 189, 248, 0.12)" : "rgba(50, 68, 230, 0.08)",
              color: isDark ? "#38bdf8" : "#3244e6",
              fontWeight: 700,
              fontSize: "0.78rem",
              textTransform: "uppercase",
              letterSpacing: 1,
              mb: 1.2,
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            <CreditCardIcon sx={{ fontSize: "1rem" }} />
            Curated Bank Offers
          </Box>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 850,
              fontSize: { xs: "1.8rem", sm: "2.3rem", md: "2.6rem" },
              color: isDark ? "#ffffff" : "#0f172a",
              fontFamily: "'Poppins', sans-serif",
              lineHeight: 1.2,
              mb: 1,
            }}
          >
            Top Credit Cards in India
          </Typography>
          <Typography
            sx={{
              color: isDark ? "#94a3b8" : "#64748b",
              fontSize: { xs: "0.9rem", sm: "1rem" },
              fontFamily: "'Poppins', sans-serif",
              maxWidth: 760,
            }}
          >
            Explore 130+ cards from India's leading banks. Filter by your preferred categories, fee ranges, or check your instant approval eligibility below.
          </Typography>
        </Box>

        <Grid container spacing={3.5}>
          {/* LEFT SIDEBAR FILTERS */}
          <Grid item xs={12} md={3.2} lg={3}>
            <Box
              sx={{
                background: isDark ? "#1e293b" : "#ffffff",
                borderRadius: "24px",
                p: 3,
                border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
                boxShadow: isDark ? "0 10px 25px rgba(0,0,0,0.3)" : "0 8px 24px rgba(0,0,0,0.04)",
                position: { md: "sticky" },
                top: { md: "90px" },
                maxHeight: { md: "calc(100vh - 110px)" },
                overflowY: "auto",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {/* Header: Filters + Clear All */}
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography sx={{ fontWeight: 800, fontSize: "1.3rem", color: isDark ? "#fff" : "#0f172a", fontFamily: "'Poppins', sans-serif" }}>
                  Filters
                </Typography>
                <Button
                  onClick={handleClearAllFilters}
                  size="small"
                  sx={{
                    color: isDark ? "#38bdf8" : "#3244e6",
                    fontWeight: 700,
                    textTransform: "none",
                    fontSize: "0.85rem",
                    fontFamily: "'Poppins', sans-serif",
                    "&:hover": { background: "transparent", textDecoration: "underline" },
                  }}
                >
                  Clear All
                </Button>
              </Box>

              {/* 1. CATEGORY FILTER (OPEN BY DEFAULT) */}
              <Box sx={{ mb: 3 }}>
                <Box
                  onClick={() => setOpenCategory(!openCategory)}
                  sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", mb: 1.5 }}
                >
                  <Typography sx={{ fontWeight: 700, fontSize: "0.95rem", color: isDark ? "#fff" : "#0f172a", fontFamily: "'Poppins', sans-serif" }}>
                    Category
                  </Typography>
                  {openCategory ? <ExpandLessIcon sx={{ color: "#64748b" }} /> : <ExpandMoreIcon sx={{ color: "#64748b" }} />}
                </Box>

                <Collapse in={openCategory}>
                  <Stack spacing={1}>
                    {CATEGORIES.map((cat) => {
                      const isSelected = selectedCategory === cat.value;
                      const IconComp = cat.icon;
                      return (
                        <Box
                          key={cat.value}
                          onClick={() => setSelectedCategory(cat.value)}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            p: "10px 14px",
                            borderRadius: "12px",
                            cursor: "pointer",
                            border: `1px solid ${isSelected ? "#3244e6" : isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
                            backgroundColor: isSelected ? (isDark ? "rgba(50, 68, 230, 0.15)" : "#f8faff") : "transparent",
                            transition: "all 0.2s ease",
                            "&:hover": {
                              borderColor: "#3244e6",
                              backgroundColor: isDark ? "rgba(50, 68, 230, 0.08)" : "#f8faff",
                            },
                          }}
                        >
                          <Radio
                            checked={isSelected}
                            size="small"
                            sx={{ p: 0, color: "#cbd5e1", "&.Mui-checked": { color: "#3244e6" } }}
                          />
                          <IconComp sx={{ fontSize: "1.1rem", color: isSelected ? "#3244e6" : "#64748b" }} />
                          <Typography sx={{ fontSize: "0.88rem", fontWeight: isSelected ? 700 : 500, color: isDark ? "#fff" : "#1e293b", fontFamily: "'Poppins', sans-serif" }}>
                            {cat.label}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Stack>
                </Collapse>
              </Box>

              {/* 2. ANNUAL FEE RANGE FILTER (CLOSED BY DEFAULT) */}
              <Box sx={{ mb: 3 }}>
                <Box
                  onClick={() => setOpenFeeRange(!openFeeRange)}
                  sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", mb: 1.5 }}
                >
                  <Typography sx={{ fontWeight: 700, fontSize: "0.95rem", color: isDark ? "#fff" : "#0f172a", fontFamily: "'Poppins', sans-serif" }}>
                    Annual Fee Range
                  </Typography>
                  {openFeeRange ? <ExpandLessIcon sx={{ color: "#64748b" }} /> : <ExpandMoreIcon sx={{ color: "#64748b" }} />}
                </Box>

                <Collapse in={openFeeRange}>
                  <Stack spacing={1}>
                    {FEE_RANGES.map((fee) => {
                      const isSelected = selectedFeeRange === fee.value;
                      return (
                        <Box
                          key={fee.value}
                          onClick={() => setSelectedFeeRange(fee.value)}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            p: "10px 14px",
                            borderRadius: "12px",
                            cursor: "pointer",
                            border: `1px solid ${isSelected ? "#3244e6" : isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
                            backgroundColor: isSelected ? (isDark ? "rgba(50, 68, 230, 0.15)" : "#f8faff") : "transparent",
                            transition: "all 0.2s ease",
                            "&:hover": {
                              borderColor: "#3244e6",
                              backgroundColor: isDark ? "rgba(50, 68, 230, 0.08)" : "#f8faff",
                            },
                          }}
                        >
                          <Radio
                            checked={isSelected}
                            size="small"
                            sx={{ p: 0, color: "#cbd5e1", "&.Mui-checked": { color: "#3244e6" } }}
                          />
                          <Typography sx={{ fontSize: "0.88rem", fontWeight: isSelected ? 700 : 500, color: isDark ? "#fff" : "#1e293b", fontFamily: "'Poppins', sans-serif" }}>
                            {fee.label}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Stack>
                </Collapse>
              </Box>

              {/* 3. CARD NETWORK FILTER (CLOSED BY DEFAULT) */}
              <Box sx={{ mb: 3 }}>
                <Box
                  onClick={() => setOpenNetwork(!openNetwork)}
                  sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", mb: 1.5 }}
                >
                  <Typography sx={{ fontWeight: 700, fontSize: "0.95rem", color: isDark ? "#fff" : "#0f172a", fontFamily: "'Poppins', sans-serif" }}>
                    Card Network
                  </Typography>
                  {openNetwork ? <ExpandLessIcon sx={{ color: "#64748b" }} /> : <ExpandMoreIcon sx={{ color: "#64748b" }} />}
                </Box>

                <Collapse in={openNetwork}>
                  <Stack spacing={1}>
                    {NETWORKS.map((net) => {
                      const isChecked = selectedNetworks.includes(net.value);
                      return (
                        <Box
                          key={net.value}
                          onClick={() => handleToggleNetwork(net.value)}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            p: "10px 14px",
                            borderRadius: "12px",
                            cursor: "pointer",
                            border: `1px solid ${isChecked ? "#3244e6" : isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
                            backgroundColor: isChecked ? (isDark ? "rgba(50, 68, 230, 0.15)" : "#f8faff") : "transparent",
                            transition: "all 0.2s ease",
                            "&:hover": {
                              borderColor: "#3244e6",
                              backgroundColor: isDark ? "rgba(50, 68, 230, 0.08)" : "#f8faff",
                            },
                          }}
                        >
                          <Checkbox
                            checked={isChecked}
                            size="small"
                            sx={{ p: 0, color: "#cbd5e1", "&.Mui-checked": { color: "#3244e6" } }}
                          />
                          <Typography sx={{ fontSize: "0.88rem", fontWeight: isChecked ? 700 : 500, color: isDark ? "#fff" : "#1e293b", fontFamily: "'Poppins', sans-serif" }}>
                            {net.label}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Stack>
                </Collapse>
              </Box>

              {/* 4. BANK FILTER (CLOSED BY DEFAULT) */}
              <Box>
                <Box
                  onClick={() => setOpenBank(!openBank)}
                  sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", mb: 1.5 }}
                >
                  <Typography sx={{ fontWeight: 700, fontSize: "0.95rem", color: isDark ? "#fff" : "#0f172a", fontFamily: "'Poppins', sans-serif" }}>
                    Bank
                  </Typography>
                  {openBank ? <ExpandLessIcon sx={{ color: "#64748b" }} /> : <ExpandMoreIcon sx={{ color: "#64748b" }} />}
                </Box>

                <Collapse in={openBank}>
                  {/* Bank search inside group */}
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Search bank..."
                    value={bankSearchText}
                    onChange={(e) => setBankSearchText(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ fontSize: "1rem", color: "#94a3b8" }} />
                        </InputAdornment>
                      ),
                      style: { fontFamily: "'Poppins', sans-serif", fontSize: "0.82rem", borderRadius: "10px", marginBottom: "10px" },
                    }}
                  />

                  <Stack spacing={1} sx={{ maxHeight: "280px", overflowY: "auto", pr: 0.5 }}>
                    {BANKS.filter((b) => b.toLowerCase().includes(bankSearchText.toLowerCase())).map((b) => {
                      const isChecked = selectedBanks.includes(b);
                      return (
                        <Box
                          key={b}
                          onClick={() => handleToggleBank(b)}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            p: "10px 14px",
                            borderRadius: "12px",
                            cursor: "pointer",
                            border: `1px solid ${isChecked ? "#3244e6" : isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
                            backgroundColor: isChecked ? (isDark ? "rgba(50, 68, 230, 0.15)" : "#f8faff") : "transparent",
                            transition: "all 0.2s ease",
                            "&:hover": {
                              borderColor: "#3244e6",
                              backgroundColor: isDark ? "rgba(50, 68, 230, 0.08)" : "#f8faff",
                            },
                          }}
                        >
                          <Checkbox
                            checked={isChecked}
                            size="small"
                            sx={{ p: 0, color: "#cbd5e1", "&.Mui-checked": { color: "#3244e6" } }}
                          />
                          <Typography sx={{ fontSize: "0.88rem", fontWeight: isChecked ? 700 : 500, color: isDark ? "#fff" : "#1e293b", fontFamily: "'Poppins', sans-serif" }}>
                            {b}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Stack>
                </Collapse>
              </Box>
            </Box>
          </Grid>

          {/* RIGHT MAIN CATALOG */}
          <Grid item xs={12} md={8.8} lg={9}>
            {/* TOP 3-FIELD ELIGIBILITY BAR */}
            <Box
              sx={{
                background: isDark ? "#1e293b" : "#ffffff",
                borderRadius: "24px",
                p: { xs: 2.5, sm: 3 },
                border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
                boxShadow: isDark ? "0 8px 24px rgba(0,0,0,0.2)" : "0 4px 16px rgba(0,0,0,0.03)",
                mb: 3.5,
              }}
            >
              <Grid container spacing={2} alignItems="flex-end">
                {/* Pincode */}
                <Grid item xs={12} sm={3.5}>
                  <Typography sx={{ fontSize: "0.78rem", fontWeight: 600, color: isDark ? "#94a3b8" : "#64748b", mb: 0.8, fontFamily: "'Poppins', sans-serif" }}>
                    Pincode
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Enter 6-digit pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    InputProps={{ style: { fontFamily: "'Poppins', sans-serif", fontSize: "0.88rem", borderRadius: "10px" } }}
                  />
                </Grid>

                {/* Monthly Income */}
                <Grid item xs={12} sm={3.5}>
                  <Typography sx={{ fontSize: "0.78rem", fontWeight: 600, color: isDark ? "#94a3b8" : "#64748b", mb: 0.8, fontFamily: "'Poppins', sans-serif" }}>
                    Monthly Income (₹)
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    type="number"
                    placeholder="e.g., 50000"
                    value={inhandIncome}
                    onChange={(e) => setInhandIncome(e.target.value)}
                    InputProps={{ style: { fontFamily: "'Poppins', sans-serif", fontSize: "0.88rem", borderRadius: "10px" } }}
                  />
                </Grid>

                {/* Employment Status */}
                <Grid item xs={12} sm={2.5}>
                  <Typography sx={{ fontSize: "0.78rem", fontWeight: 600, color: isDark ? "#94a3b8" : "#64748b", mb: 0.8, fontFamily: "'Poppins', sans-serif" }}>
                    Employment Status
                  </Typography>
                  <FormControl fullWidth size="small">
                    <Select
                      value={empStatus}
                      onChange={(e) => setEmpStatus(e.target.value)}
                      sx={{ borderRadius: "10px", fontFamily: "'Poppins', sans-serif", fontSize: "0.88rem" }}
                    >
                      <MenuItem value="Salaried" sx={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.88rem" }}>
                        Salaried
                      </MenuItem>
                      <MenuItem value="Self-Employed" sx={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.88rem" }}>
                        Self-Employed
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Check Button */}
                <Grid item xs={12} sm={2.5}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={isEligibilityApplied ? handleClearAllFilters : handleApplyEligibility}
                    startIcon={isEligibilityApplied ? <CheckIcon /> : <CheckCircleIcon />}
                    sx={{
                      background: isEligibilityApplied
                        ? "#10b981"
                        : "linear-gradient(135deg, #3244e6 0%, #1d2ebd 100%)",
                      color: "#ffffff",
                      fontWeight: 700,
                      borderRadius: "14px",
                      py: 1,
                      textTransform: "none",
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "0.88rem",
                      boxShadow: "0 4px 14px rgba(50,68,230,0.25)",
                    }}
                  >
                    {isEligibilityApplied ? "Applied" : "Check Eligibility"}
                  </Button>
                </Grid>
              </Grid>
            </Box>

            {/* Results Count Header */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Typography sx={{ fontSize: "0.92rem", fontWeight: 600, color: isDark ? "#cbd5e1" : "#64748b", fontFamily: "'Poppins', sans-serif" }}>
                Showing <Box component="span" sx={{ fontWeight: 800, color: isDark ? "#fff" : "#0f172a" }}>{Math.min(visibleCount, filteredCards.length)}</Box> of {filteredCards.length} cards
              </Typography>
            </Box>

            {/* Loading */}
            {loading ? (
              <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", py: 14, gap: 2 }}>
                <CircularProgress sx={{ color: "#3244e6" }} size={48} />
                <Typography sx={{ fontFamily: "'Poppins', sans-serif", color: "#64748b", fontWeight: 500 }}>
                  Loading credit cards catalog...
                </Typography>
              </Box>
            ) : filteredCards.length === 0 ? (
              <Box
                sx={{
                  textAlign: "center",
                  py: 10,
                  px: 3,
                  borderRadius: "24px",
                  background: isDark ? "rgba(30, 41, 59, 0.4)" : "#ffffff",
                  border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
                }}
              >
                <CreditCardIcon sx={{ fontSize: "4rem", color: "#94a3b8", mb: 1.5 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, color: isDark ? "#fff" : "#1e293b", fontFamily: "'Poppins', sans-serif" }}>
                  No Matching Credit Cards Found
                </Typography>
                <Typography sx={{ color: "#64748b", mt: 1, fontFamily: "'Poppins', sans-serif", maxWidth: 450, mx: "auto" }}>
                  Try adjusting your category, bank, or network filter.
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleClearAllFilters}
                  sx={{
                    mt: 3,
                    background: "linear-gradient(135deg, #3244e6 0%, #1d2ebd 100%)",
                    textTransform: "none",
                    fontWeight: 700,
                    borderRadius: "50px",
                    px: 4,
                    py: 1,
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Reset All Filters
                </Button>
              </Box>
            ) : (
              <>
                {/* 3-COLUMN CARDS GRID (PEDESTAL PODIUM CARD DESIGN) */}
                <Grid container spacing={3}>
                  {displayedCards.map((card) => {
                    const isCompared = comparedCards.some(
                      (c) => (c.id || c.seo_alias) === (card.id || card.seo_alias)
                    );
                    const networkTag = getNetworkTag(card);
                    const isLTF =
                      card.joining_fee_text === "0" ||
                      card.joining_fee_text === "Free" ||
                      card.joining_fee_text === "Nil" ||
                      !card.joining_fee_text;

                    const activeCategorySavings = categorySavings[selectedCategory]?.[String(card.id)];

                    return (
                      <Grid item xs={12} sm={6} lg={4} key={card.id || card.seo_alias}>
                        <Card
                          sx={{
                            borderRadius: "24px",
                            background: isDark ? "#1e293b" : "#ffffff",
                            border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
                            boxShadow: isDark ? "0 10px 25px rgba(0,0,0,0.25)" : "0 6px 20px rgba(0,0,0,0.04)",
                            overflow: "hidden",
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                            transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                            "&:hover": {
                              transform: "translateY(-6px)",
                              boxShadow: "0 16px 36px rgba(50,68,230,0.12)",
                              borderColor: "#3244e6",
                            },
                          }}
                        >
                          {/* Top Artwork Container with 3D Pedestal Podium Effect */}
                          <Box
                            sx={{
                              position: "relative",
                              height: 190,
                              background: isDark
                                ? "radial-gradient(ellipse at center bottom, rgba(50,68,230,0.25) 0%, rgba(15,23,42,0.8) 70%)"
                                : "radial-gradient(ellipse at center bottom, #f3e4d7 0%, #faeee4 50%, #fff7f2 100%)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              overflow: "hidden",
                            }}
                          >
                            {/* Compare Plus Button */}
                            <Tooltip title={isCompared ? "Remove from comparison" : "Add to comparison"} arrow>
                              <IconButton
                                size="small"
                                onClick={(e) => handleToggleCompare(card, e)}
                                sx={{
                                  position: "absolute",
                                  top: 12,
                                  right: 12,
                                  zIndex: 10,
                                  backgroundColor: isCompared ? "#3244e6" : "rgba(255,255,255,0.9)",
                                  color: isCompared ? "#ffffff" : "#475569",
                                  width: 32,
                                  height: 32,
                                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                  "&:hover": { backgroundColor: isCompared ? "#1d2ebd" : "#ffffff", color: "#3244e6" },
                                }}
                              >
                                {isCompared ? <CheckIcon sx={{ fontSize: "1rem" }} /> : <AddIcon sx={{ fontSize: "1.1rem" }} />}
                              </IconButton>
                            </Tooltip>

                            {/* Savings Badge */}
                            {activeCategorySavings ? (
                              <Box
                                sx={{
                                  position: "absolute",
                                  top: 12,
                                  left: 12,
                                  zIndex: 10,
                                  px: 1.5,
                                  py: 0.5,
                                  borderRadius: "8px",
                                  backgroundColor: "#3244e6",
                                  color: "#ffffff",
                                  fontSize: "0.75rem",
                                  fontWeight: 700,
                                  fontFamily: "'Poppins', sans-serif",
                                  boxShadow: "0 4px 10px rgba(50,68,230,0.3)",
                                }}
                              >
                                Save ₹{parseInt(activeCategorySavings).toLocaleString("en-IN")}/yr
                              </Box>
                            ) : null}

                            {/* LTF Badge */}
                            {isLTF && (
                              <Box
                                sx={{
                                  position: "absolute",
                                  bottom: 12,
                                  right: 12,
                                  zIndex: 10,
                                  px: 1.2,
                                  py: 0.4,
                                  borderRadius: "6px",
                                  backgroundColor: isDark ? "rgba(0,0,0,0.7)" : "#ffffff",
                                  color: isDark ? "#38bdf8" : "#0f172a",
                                  fontSize: "0.72rem",
                                  fontWeight: 800,
                                  fontFamily: "'Poppins', sans-serif",
                                  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                                }}
                              >
                                LTF
                              </Box>
                            )}

                            {/* 3D Round Pedestal Podium */}
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: -24,
                                width: 180,
                                height: 55,
                                borderRadius: "50%",
                                background: isDark
                                  ? "linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.6) 100%)"
                                  : "linear-gradient(180deg, #dfc6b4 0%, #ba9c87 100%)",
                                boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
                                border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#d2b49d"}`,
                              }}
                            />

                            {/* Floating Credit Card Image */}
                            <img
                              src={card.image || card.card_bg_image || "https://d2sriifpjiqv0p.cloudfront.net/admin/BankKaro_20260622_122010_AGB_SBI_Cashback.png1732257446742"}
                              alt={card.name}
                              loading="lazy"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://d2sriifpjiqv0p.cloudfront.net/admin/BankKaro_20260622_122010_AGB_SBI_Cashback.png1732257446742";
                              }}
                              style={{
                                maxHeight: "120px",
                                maxWidth: "185px",
                                objectFit: "contain",
                                filter: "drop-shadow(0 14px 20px rgba(0,0,0,0.22))",
                                position: "relative",
                                zIndex: 2,
                              }}
                            />
                          </Box>

                          {/* Content */}
                          <CardContent sx={{ p: 2.5, flex: 1, display: "flex", flexDirection: "column" }}>
                            {/* Network Pill */}
                            <Chip
                              label={networkTag}
                              size="small"
                              sx={{
                                alignSelf: "flex-start",
                                mb: 1.5,
                                fontWeight: 700,
                                fontSize: "0.72rem",
                                color: isDark ? "#cbd5e1" : "#475569",
                                backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "#f1f5f9",
                                borderRadius: "6px",
                                height: 22,
                              }}
                            />

                            {/* Card Name */}
                            <Typography
                              sx={{
                                fontWeight: 800,
                                fontSize: "1.05rem",
                                color: isDark ? "#fff" : "#0f172a",
                                fontFamily: "'Poppins', sans-serif",
                                mb: 2,
                                lineHeight: 1.3,
                                minHeight: "2.6em",
                              }}
                            >
                              {card.name}
                            </Typography>

                            {/* Fee Box (2 Columns Gray Container) */}
                            <Box
                              sx={{
                                display: "flex",
                                backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "#f8fafc",
                                border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "#f1f5f9"}`,
                                borderRadius: "12px",
                                p: 1.5,
                                mb: 2.5,
                              }}
                            >
                              <Box sx={{ flex: 1 }}>
                                <Typography sx={{ fontSize: "0.72rem", color: isDark ? "#94a3b8" : "#64748b", fontWeight: 600, fontFamily: "'Poppins', sans-serif" }}>
                                  Joining
                                </Typography>
                                <Typography sx={{ fontSize: "0.95rem", fontWeight: 800, color: isDark ? "#fff" : "#1e293b", fontFamily: "'Poppins', sans-serif" }}>
                                  {isLTF ? "Free" : `₹${parseInt(card.joining_fee_text).toLocaleString("en-IN")}`}
                                </Typography>
                              </Box>
                              <Box sx={{ flex: 1 }}>
                                <Typography sx={{ fontSize: "0.72rem", color: isDark ? "#94a3b8" : "#64748b", fontWeight: 600, fontFamily: "'Poppins', sans-serif" }}>
                                  Annual
                                </Typography>
                                <Typography sx={{ fontSize: "0.95rem", fontWeight: 800, color: isDark ? "#fff" : "#1e293b", fontFamily: "'Poppins', sans-serif" }}>
                                  {card.annual_fee_text === "0" || card.annual_fee_text === "Nil" || !card.annual_fee_text
                                    ? "Free"
                                    : `₹${parseInt(card.annual_fee_text).toLocaleString("en-IN")}`}
                                </Typography>
                              </Box>
                            </Box>

                            {/* Action Buttons */}
                            <Stack direction="row" spacing={1.5} sx={{ mt: "auto" }}>
                              <Button
                                variant="outlined"
                                onClick={() => navigate(`/cards/${card.card_alias || card.seo_alias || card.id}`)}
                                sx={{
                                  flex: 1,
                                  borderRadius: "12px",
                                  borderColor: isDark ? "rgba(255,255,255,0.2)" : "#cbd5e1",
                                  color: isDark ? "#e2e8f0" : "#475569",
                                  fontWeight: 700,
                                  fontSize: "0.86rem",
                                  textTransform: "none",
                                  fontFamily: "'Poppins', sans-serif",
                                  py: 0.9,
                                  "&:hover": {
                                    borderColor: "#3244e6",
                                    color: "#3244e6",
                                  },
                                }}
                              >
                                Details
                              </Button>
                              <Button
                                variant="contained"
                                onClick={() => setSelectedCardForApply(card)}
                                endIcon={<ArrowForwardIcon sx={{ fontSize: "0.95rem !important" }} />}
                                sx={{
                                  flex: 1.3,
                                  borderRadius: "12px",
                                  background: "linear-gradient(135deg, #3244e6 0%, #1d2ebd 100%)",
                                  color: "#fff",
                                  fontWeight: 800,
                                  fontSize: "0.88rem",
                                  textTransform: "none",
                                  fontFamily: "'Poppins', sans-serif",
                                  py: 0.9,
                                  boxShadow: "0 4px 14px rgba(50,68,230,0.3)",
                                  "&:hover": {
                                    background: "linear-gradient(135deg, #1d2ebd 0%, #3244e6 100%)",
                                  },
                                }}
                              >
                                Apply Now
                              </Button>
                            </Stack>
                          </CardContent>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>

                {/* Infinite Scroll Sentinel */}
                {visibleCount < filteredCards.length && (
                  <Box
                    ref={loadMoreRef}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      mt: 5,
                      py: 3,
                      gap: 1.2,
                    }}
                  >
                    <CircularProgress size={28} sx={{ color: "#3244e6" }} />
                    <Typography
                      sx={{
                        fontSize: "0.84rem",
                        color: isDark ? "#94a3b8" : "#64748b",
                        fontWeight: 600,
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    >
                      Loading next 12 cards... ({Math.min(visibleCount, filteredCards.length)} of {filteredCards.length} loaded)
                    </Typography>
                  </Box>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Container>

      {/* Floating Compare Bar */}
      {comparedCards.length > 0 && (
        <Box
          sx={{
            position: "fixed",
            bottom: { xs: 16, sm: 24 },
            right: { xs: 16, sm: 32 },
            zIndex: 1000,
            p: 2,
            borderRadius: "24px",
            background: "linear-gradient(135deg, #3244e6 0%, #1d2ebd 100%)",
            color: "#ffffff",
            boxShadow: "0 16px 40px rgba(0, 0, 0, 0.35)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(16px)",
            maxWidth: "380px",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CompareArrowsIcon sx={{ fontSize: "1.2rem" }} />
              <Typography sx={{ fontWeight: 700, fontSize: "0.9rem", fontFamily: "'Poppins', sans-serif" }}>
                Compare Cards ({comparedCards.length}/4)
              </Typography>
            </Box>
            <IconButton size="small" onClick={() => setComparedCards([])} sx={{ color: "rgba(255,255,255,0.8)" }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", gap: 1, mb: 2, overflowX: "auto" }}>
            {comparedCards.map((c) => (
              <Box
                key={c.id || c.seo_alias}
                sx={{
                  position: "relative",
                  width: "55px",
                  height: "40px",
                  borderRadius: "8px",
                  backgroundColor: "#ffffff",
                  p: "2px",
                  border: "2px solid rgba(255,255,255,0.8)",
                  flexShrink: 0,
                }}
              >
                <img
                  src={c.image || c.card_bg_image || "https://d2sriifpjiqv0p.cloudfront.net/admin/BankKaro_20260622_122010_AGB_SBI_Cashback.png1732257446742"}
                  alt={c.name}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
                <IconButton
                  size="small"
                  onClick={() => handleRemoveCompare(c)}
                  sx={{
                    position: "absolute",
                    top: -6,
                    right: -6,
                    backgroundColor: "#ef4444",
                    color: "#ffffff",
                    p: "2px",
                    "&:hover": { backgroundColor: "#dc2626" },
                  }}
                >
                  <CloseIcon sx={{ fontSize: "0.7rem" }} />
                </IconButton>
              </Box>
            ))}
          </Box>

          <Button
            variant="contained"
            fullWidth
            onClick={() => setIsCompareOpen(true)}
            sx={{
              backgroundColor: "#ffffff",
              color: "#3244e6",
              fontWeight: 800,
              borderRadius: "50px",
              textTransform: "none",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "0.88rem",
              py: 0.9,
              "&:hover": {
                backgroundColor: "#f8fafc",
                color: "#1d2ebd",
              },
            }}
          >
            Compare Now
          </Button>
        </Box>
      )}

      {/* Modals */}
      <ApplyCardModal
        open={Boolean(selectedCardForApply)}
        onClose={() => setSelectedCardForApply(null)}
        card={selectedCardForApply}
      />

      <CardDetailModal
        open={Boolean(selectedCardForDetail)}
        onClose={() => setSelectedCardForDetail(null)}
        card={selectedCardForDetail}
        onApply={(c) => setSelectedCardForApply(c)}
      />

      <CompareCardsModal
        open={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        cards={comparedCards}
        onRemoveCard={handleRemoveCompare}
        onApply={(c) => setSelectedCardForApply(c)}
      />

      <CategoryGeniusModal
        open={isCategoryGeniusOpen}
        onClose={() => setIsCategoryGeniusOpen(false)}
        category={selectedCategory}
        onApplySavings={(cat, res) => {
          const map = {};
          const list = res?.savings || res?.cards || (Array.isArray(res) ? res : []);
          list.forEach((item) => {
            const cid = item.card_id || item.id;
            const sav = item.total_savings_yearly || item.net_savings || item.annual_saving || 0;
            if (cid) map[String(cid)] = sav;
          });
          setCategorySavings((prev) => ({ ...prev, [cat]: map }));
        }}
      />

      <SpendCalculatorModal
        open={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        onSelectCard={(c) => {
          setSelectedCardForDetail(c);
        }}
      />
    </Box>
  );
}
