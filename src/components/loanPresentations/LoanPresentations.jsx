import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Chip,
  TextField,
  InputAdornment,
  Modal,
  IconButton,
  Divider,
  Paper,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import ViewSidebarIcon from "@mui/icons-material/ViewSidebar";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

// F2 Fintech Brand Theme Colors
const BRAND_BLUE = "#3244e6";
const BRAND_HOVER = "#2434b8";
const TEXT_DARK = "#0F172A";
const TEXT_MUTED = "#64748B";
const BORDER_COLOR = "#E2E8F0";

// The 5 Official Real F2 Fintech Presentation Decks from public/PPT
export const LOAN_DECKS = [
  {
    id: "company-profile",
    folder: "1_company_profile",
    fileName: "F2Fintech Company profile- Awareness.pdf",
    fileUrl: "/PPT/F2Fintech%20Company%20profile-%20Awareness.pdf",
    title: "F2 Fintech Company Profile & Awareness Deck",
    tagline: "Trust, Transparency & Technology in Financial Solutions",
    category: "Company Profile",
    audience: "Investors, corporate partners, DSAs, and institutional lenders",
    fileSize: "15.9 MB",
    slidesCount: 15,
    icon: BusinessCenterIcon,
    badgeColor: "#3244e6",
    gradient: "linear-gradient(135deg, #1e4dd8 0%, #3244e6 100%)",
    glowColor: "rgba(50, 68, 230, 0.12)",
    applyRoute: "/about-us",
    applyLabel: "About F2 Fintech",
    description: "Official corporate awareness deck featuring our founding story, CEO Harpreet Singh's vision, pan-India impact, proprietary SaaS products, D-U-N-S® credential, Shark Tank India Season 5 showcase, and 40+ banking partnerships.",
    keyTakeaways: ["Featured on Shark Tank India Season 5 & Bajaj Finserv Award winner", "Proprietary SaaS platforms: Lend Grid OMS & F2 Telly Flow", "Certified D-U-N-S® Registered operational trust", "Empowering 11,000+ happy clients & 40+ lending partners across India"],
    slides: [
      { slideNumber: 1, title: "F2", image: "/PPT/images/1_company_profile/slide_1.png" },
      { slideNumber: 2, title: "WHO WE ARE", image: "/PPT/images/1_company_profile/slide_2.png" },
      { slideNumber: 3, title: "WHY", image: "/PPT/images/1_company_profile/slide_3.png" },
      { slideNumber: 4, title: "HARPREET SINGH", image: "/PPT/images/1_company_profile/slide_4.png" },
      { slideNumber: 5, title: "OUR REACH", image: "/PPT/images/1_company_profile/slide_5.png" },
      { slideNumber: 6, title: "OUR IMPACT IN NUMBERS", image: "/PPT/images/1_company_profile/slide_6.png" },
      { slideNumber: 7, title: "WHAT WE DO", image: "/PPT/images/1_company_profile/slide_7.png" },
      { slideNumber: 8, title: "CHANNEL PARTNERS", image: "/PPT/images/1_company_profile/slide_8.png" },
      { slideNumber: 9, title: "BEYOND THE TRADITIONAL", image: "/PPT/images/1_company_profile/slide_9.png" },
      { slideNumber: 10, title: "Lend Grid", image: "/PPT/images/1_company_profile/slide_10.png" },
      { slideNumber: 11, title: "RECOGNITION & CREDIBILITY", image: "/PPT/images/1_company_profile/slide_11.png" },
      { slideNumber: 12, title: "Receiving the esteemed Bajaj Finserv", image: "/PPT/images/1_company_profile/slide_12.png" },
      { slideNumber: 13, title: "Acquiring the D-U-N-S® Registered™ seal,", image: "/PPT/images/1_company_profile/slide_13.png" },
      { slideNumber: 14, title: "WHAT PEOPLE SAY", image: "/PPT/images/1_company_profile/slide_14.png" },
      { slideNumber: 15, title: "Slide 15", image: "/PPT/images/1_company_profile/slide_15.png" },
    ],
  },
  {
    id: "hot-lead",
    folder: "2_hot_lead",
    fileName: "HOT LEAD PPT.pdf",
    fileUrl: "/PPT/HOT%20LEAD%20PPT.pdf",
    title: "F2 Fintech Borrower Guide & Loan Journey (Hot Lead)",
    tagline: "Your Loan Journey is in Good Hands - Transparent Roadmap",
    category: "Loan Journey",
    audience: "Loan applicants, borrowers, salaried individuals, and MSME business owners",
    fileSize: "4.6 MB",
    slidesCount: 11,
    icon: TrendingUpIcon,
    badgeColor: "#2563eb",
    gradient: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)",
    glowColor: "rgba(37, 99, 235, 0.12)",
    applyRoute: "/lending-partners",
    applyLabel: "View Lending Partners",
    description: "Complete onboarding guide for borrowers. Maps out each milestone from document verification to sanction and final disbursement, transparent lender matchmaking, fraud safety guidelines, and dedicated relationship manager support.",
    keyTakeaways: ["Transparent 5-stage loan lifecycle: Submission → Validation → Sanction → Disbursement", "Fraud prevention tips & customer protection best practices", "Direct relationship manager support across all top banks & NBFCs", "Real borrower experiences and verifiable lender partnerships"],
    slides: [
      { slideNumber: 1, title: "F2FINTECH", image: "/PPT/images/2_hot_lead/slide_1.png" },
      { slideNumber: 2, title: "Thank You for", image: "/PPT/images/2_hot_lead/slide_2.png" },
      { slideNumber: 3, title: "Your Loan Journey", image: "/PPT/images/2_hot_lead/slide_3.png" },
      { slideNumber: 4, title: "Our Impact", image: "/PPT/images/2_hot_lead/slide_4.png" },
      { slideNumber: 5, title: "What Else We Can", image: "/PPT/images/2_hot_lead/slide_5.png" },
      { slideNumber: 6, title: "RECOGNITION & CREDIBILITY", image: "/PPT/images/2_hot_lead/slide_6.png" },
      { slideNumber: 7, title: "Receiving the esteemed Bajaj Finserv", image: "/PPT/images/2_hot_lead/slide_7.png" },
      { slideNumber: 8, title: "Acquiring the D-U-N-S® Registered™ seal,", image: "/PPT/images/2_hot_lead/slide_8.png" },
      { slideNumber: 9, title: "Stay Safe from", image: "/PPT/images/2_hot_lead/slide_9.png" },
      { slideNumber: 10, title: "WHAT PEOPLE SAY", image: "/PPT/images/2_hot_lead/slide_10.png" },
      { slideNumber: 11, title: "WE’RE ALWAYS HERE", image: "/PPT/images/2_hot_lead/slide_11.png" },
    ],
  },
  {
    id: "cold-lead",
    folder: "3_cold_lead",
    fileName: "F2 FINTECH Cold lead.pdf",
    fileUrl: "/PPT/F2%20FINTECH%20Cold%20lead.pdf",
    title: "F2 Fintech: Doctors & Professional Financial Planning (Cold Lead)",
    tagline: "Specifically Built for Doctors - Loans, Investments & The White Coat Club",
    category: "Doctors & Healthcare",
    audience: "MBBS, MD, MS, BDS, clinic owners, specialists, and hospital consultants",
    fileSize: "17.0 MB",
    slidesCount: 12,
    icon: AccountBalanceIcon,
    badgeColor: "#0d9488",
    gradient: "linear-gradient(135deg, #0f766e 0%, #0d9488 100%)",
    glowColor: "rgba(13, 148, 136, 0.12)",
    applyRoute: "/doctor-loan",
    applyLabel: "Explore Doctor Loans",
    description: "Tailored financial planning deck specifically designed for medical professionals. Explains why doctors need specialized financial advisory, professional loans with minimal documentation, The White Coat Club exclusive community, and Doctor Partnership Program.",
    keyTakeaways: ["The White Coat Club: Elite financial health community for doctors", "Unsecured professional loans up to ₹50 Lakh with express sanctions", "Pan-India reach: 11,000+ clients across 1,200+ pincodes", "Recognized by top NBFCs & Banks with 40+ premier lending partners"],
    slides: [
      { slideNumber: 1, title: "F2", image: "/PPT/images/3_cold_lead/slide_1.png" },
      { slideNumber: 2, title: "Our Vision", image: "/PPT/images/3_cold_lead/slide_2.png" },
      { slideNumber: 3, title: "Why Doctors Need Different", image: "/PPT/images/3_cold_lead/slide_3.png" },
      { slideNumber: 4, title: "Lending Solutions", image: "/PPT/images/3_cold_lead/slide_4.png" },
      { slideNumber: 5, title: "The White Coat Club", image: "/PPT/images/3_cold_lead/slide_5.png" },
      { slideNumber: 6, title: "Why choose us ?", image: "/PPT/images/3_cold_lead/slide_6.png" },
      { slideNumber: 7, title: "Reach", image: "/PPT/images/3_cold_lead/slide_7.png" },
      { slideNumber: 8, title: "Tie-ups with 40+ NBFCs & Banks", image: "/PPT/images/3_cold_lead/slide_8.png" },
      { slideNumber: 9, title: "RECOGNITIONS & CREDIBILITY", image: "/PPT/images/3_cold_lead/slide_9.png" },
      { slideNumber: 10, title: "The Doctor Partnership Program", image: "/PPT/images/3_cold_lead/slide_10.png" },
      { slideNumber: 11, title: "DR. VIJAY GUPTA", image: "/PPT/images/3_cold_lead/slide_11.png" },
      { slideNumber: 12, title: "Thank You", image: "/PPT/images/3_cold_lead/slide_12.png" },
    ],
  },
  {
    id: "corporate-education",
    folder: "4_corporate_education",
    fileName: "financial education session for corporates.pdf",
    fileUrl: "/PPT/financial%20education%20session%20for%20corporates.pdf",
    title: "Financial Wellness & Education Session for Corporates",
    tagline: "Empowering Workplaces with Financial Literacy & Early Financial Freedom",
    category: "Corporate Wellness",
    audience: "HR leaders, corporate executives, corporate wellness directors, and employees",
    fileSize: "3.9 MB",
    slidesCount: 10,
    icon: AutoAwesomeOutlinedIcon,
    badgeColor: "#7c3aed",
    gradient: "linear-gradient(135deg, #6d28d9 0%, #7c3aed 100%)",
    glowColor: "rgba(124, 58, 237, 0.12)",
    applyRoute: "/get-in-touch",
    applyLabel: "Book Corporate Workshop",
    description: "Comprehensive corporate financial wellness workshop presentation. Outlines employee financial literacy modules, early financial freedom, debt management, tax optimization, interactive learning activities, and workplace benefits.",
    keyTakeaways: ["Financial literacy as a standard part of employee wellness programs", "Actionable workshops on budgeting, smart investments & tax saving", "Interactive activities that make financial wellness stick", "Tailored sessions for corporate teams of all sizes"],
    slides: [
      { slideNumber: 1, title: "FINANCIAL WELLNESS FOR", image: "/PPT/images/4_corporate_education/slide_1.png" },
      { slideNumber: 2, title: "OUR MISSION", image: "/PPT/images/4_corporate_education/slide_2.png" },
      { slideNumber: 3, title: "Our Impact & A New Initiative", image: "/PPT/images/4_corporate_education/slide_3.png" },
      { slideNumber: 4, title: "THE IDEA & HOW IT WORKS", image: "/PPT/images/4_corporate_education/slide_4.png" },
      { slideNumber: 5, title: "WHAT WE COVER", image: "/PPT/images/4_corporate_education/slide_5.png" },
      { slideNumber: 6, title: "ACTIVITIES THAT MAKE IT STICK", image: "/PPT/images/4_corporate_education/slide_6.png" },
      { slideNumber: 7, title: "WHY F2 FINTECH", image: "/PPT/images/4_corporate_education/slide_7.png" },
      { slideNumber: 8, title: "TRY IT,", image: "/PPT/images/4_corporate_education/slide_8.png" },
      { slideNumber: 9, title: "WHAT'S NEXT", image: "/PPT/images/4_corporate_education/slide_9.png" },
      { slideNumber: 10, title: "LET'S CONNECT", image: "/PPT/images/4_corporate_education/slide_10.png" },
    ],
  },
  {
    id: "saas-product",
    folder: "5_saas_products",
    fileName: "Saas product.pdf",
    fileUrl: "/PPT/Saas%20product.pdf",
    title: "F2 Fintech Enterprise SaaS Product Ecosystem",
    tagline: "Finheal, LendGrid, TellyFlow & Arogyaa - All Solutions on One Platform",
    category: "SaaS & Technology",
    audience: "Lenders, financial enterprises, DSA channel networks, and tech partners",
    fileSize: "3.0 MB",
    slidesCount: 12,
    icon: SlideshowIcon,
    badgeColor: "#ea580c",
    gradient: "linear-gradient(135deg, #c2410c 0%, #ea580c 100%)",
    glowColor: "rgba(234, 88, 12, 0.12)",
    applyRoute: "/about-us",
    applyLabel: "Explore SaaS Solutions",
    description: "Enterprise technology suite overview detailing Finheal (AI + human advisory), LendGrid (Loan Operations Management System), TellyFlow (Tele-calling & CRM), HRMS, and Arogyaa healthcare wellness solution.",
    keyTakeaways: ["Finheal: AI guidance and human advisors for holistic financial management", "LendGrid OMS: End-to-end loan lifecycle management system", "TellyFlow: Enterprise tele-calling & lead conversion platform", "Arogyaa: Integrated healthcare wellness and medical finance"],
    slides: [
      { slideNumber: 1, title: "Finheal", image: "/PPT/images/5_saas_products/slide_1.png" },
      { slideNumber: 2, title: "WHO WE ARE", image: "/PPT/images/5_saas_products/slide_2.png" },
      { slideNumber: 3, title: "OUR SAAS PRODUCTS", image: "/PPT/images/5_saas_products/slide_3.png" },
      { slideNumber: 4, title: "Finheal:", image: "/PPT/images/5_saas_products/slide_4.png" },
      { slideNumber: 5, title: "Tools of Finheal", image: "/PPT/images/5_saas_products/slide_5.png" },
      { slideNumber: 6, title: "LendGrid", image: "/PPT/images/5_saas_products/slide_6.png" },
      { slideNumber: 7, title: "TellyFlow:", image: "/PPT/images/5_saas_products/slide_7.png" },
      { slideNumber: 8, title: "HRMS", image: "/PPT/images/5_saas_products/slide_8.png" },
      { slideNumber: 9, title: "HRMS", image: "/PPT/images/5_saas_products/slide_9.png" },
      { slideNumber: 10, title: "OMS (Operations Management System)", image: "/PPT/images/5_saas_products/slide_10.png" },
      { slideNumber: 11, title: "Arogyaa", image: "/PPT/images/5_saas_products/slide_11.png" },
      { slideNumber: 12, title: "Let’Connect", image: "/PPT/images/5_saas_products/slide_12.png" },
    ],
  },
  {
    id: "doctor-proposal",
    folder: "6_doctor_proposal",
    isPortrait: true,
    fileName: "Doctor proposal.pdf",
    fileUrl: "/PPT/Doctor%20proposal.pdf",
    title: "F2 Fintech Doctor Financial Proposal & Solutions",
    tagline: "Tailored Credit, Overdrafts, Investments & Practice Growth for Doctors",
    category: "Doctors & Healthcare",
    audience: "Doctors, medical practitioners, clinic owners, surgeons, and healthcare consultants",
    fileSize: "5.5 MB",
    slidesCount: 14,
    icon: AccountBalanceIcon,
    badgeColor: "#059669",
    gradient: "linear-gradient(135deg, #065f46 0%, #059669 100%)",
    glowColor: "rgba(5, 150, 105, 0.12)",
    applyRoute: "/doctor-loan",
    applyLabel: "Explore Doctor Loans",
    description: "Comprehensive financial proposal presentation for medical practitioners and clinic owners. Covers pre-approved professional loans, overdraft facilities, zero-collateral limits up to ₹25 Lacs, home & LAP secured loans, wealth investments, insurance protection, and express documentation.",
    keyTakeaways: [
      "Unsecured professional loan options up to ₹25 Lacs with zero collateral",
      "Credit-based Overdraft (OD) facility with interest charged only on utilization",
      "Compare offers from 40+ top national banks and NBFC partners at 0 fees",
      "Comprehensive suite: Loans, practice expansion, wealth investments & insurance",
    ],
    slides: [
      { slideNumber: 1, title: "F2 Fintech Pvt. Ltd.", image: "/PPT/images/6_doctor_proposal/slide_1.png" },
      { slideNumber: 2, title: "Product Groups & Solutions", image: "/PPT/images/6_doctor_proposal/slide_2.png" },
      { slideNumber: 3, title: "About F2 Fintech & 40+ Lenders", image: "/PPT/images/6_doctor_proposal/slide_3.png" },
      { slideNumber: 4, title: "Why Choose Us: Zero Collateral", image: "/PPT/images/6_doctor_proposal/slide_4.png" },
      { slideNumber: 5, title: "Compare Loans from 40+ Lenders", image: "/PPT/images/6_doctor_proposal/slide_5.png" },
      { slideNumber: 6, title: "Overdraft Facility & Credit Line", image: "/PPT/images/6_doctor_proposal/slide_6.png" },
      { slideNumber: 7, title: "Unsecured Personal & Doctor Loans", image: "/PPT/images/6_doctor_proposal/slide_7.png" },
      { slideNumber: 8, title: "Secured Loans & Home Loan / LAP", image: "/PPT/images/6_doctor_proposal/slide_8.png" },
      { slideNumber: 9, title: "Document Checklist for Financial Freedom", image: "/PPT/images/6_doctor_proposal/slide_9.png" },
      { slideNumber: 10, title: "Investments: Mutual Funds & FDs", image: "/PPT/images/6_doctor_proposal/slide_10.png" },
      { slideNumber: 11, title: "Insurances: Life, Health & Office", image: "/PPT/images/6_doctor_proposal/slide_11.png" },
      { slideNumber: 12, title: "Our 40+ Banking & NBFC Partners", image: "/PPT/images/6_doctor_proposal/slide_12.png" },
      { slideNumber: 13, title: "Reserve Your Appointment", image: "/PPT/images/6_doctor_proposal/slide_13.png" },
      { slideNumber: 14, title: "Let’s Connect & Contact Us", image: "/PPT/images/6_doctor_proposal/slide_14.png" },
    ],
  },
];

const CATEGORIES = [
  "All Decks",
  "Company Profile",
  "Loan Journey",
  "Doctors & Healthcare",
  "Corporate Wellness",
  "SaaS & Technology",
];

const FAQS = [
  {
    q: "What format are these presentation decks provided in?",
    a: "All decks are provided in high-resolution presentation format. You can download the complete official PDFs directly or preview every slide in 1:1 original 16:9 widescreen quality with full-screen and sidebar toggle controls on our website.",
  },
  {
    q: "Can I use these presentations for corporate, client, or partner briefings?",
    a: "Yes! These decks are officially designed for institutional partners, corporate clients, medical professionals, HR leaders, DSAs, and prospective borrowers to present F2 Fintech's ecosystem, loan roadmaps, enterprise SaaS, and workplace wellness frameworks.",
  },
  {
    q: "Are the statistics and partner figures in the presentations verified?",
    a: "Yes. F2 Fintech operates pan-India with 11,000+ happy clients, 1,200+ pincodes served, features on Shark Tank India Season 5, Bajaj Finserv Award recognition, D-U-N-S® Registered credentials, and 40+ leading RBI-registered banks and NBFC partners.",
  },
  {
    q: "How frequently are these presentations updated?",
    a: "Our product teams update these pitch decks periodically to reflect new lending partnerships, updated interest rates, enterprise SaaS enhancements, and newly introduced financial solutions.",
  },
];

const LoanPresentations = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Decks");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalDeck, setActiveModalDeck] = useState(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Filter decks based on category & search query
  const filteredDecks = useMemo(() => {
    return LOAN_DECKS.filter((deck) => {
      const matchesCategory =
        selectedCategory === "All Decks" || deck.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        deck.title.toLowerCase().includes(q) ||
        deck.tagline.toLowerCase().includes(q) ||
        deck.category.toLowerCase().includes(q) ||
        deck.description.toLowerCase().includes(q) ||
        deck.keyTakeaways.some((k) => k.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Handle direct file download
  const handleDownload = (e, fileUrl, fileName, title) => {
    if (e) e.stopPropagation();
    try {
      const link = document.createElement("a");
      link.href = fileUrl;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success(`Downloading ${title}...`, {
        position: "bottom-center",
        autoClose: 3000,
      });
    } catch (err) {
      console.error("Download failed:", err);
      toast.error("Failed to start download. Please try again.");
    }
  };

  // Open modal
  const openSlideViewer = (deck, slideIdx = 0) => {
    setActiveModalDeck(deck);
    setActiveSlideIndex(slideIdx);
    setIsFullscreen(false);
    setIsSidebarCollapsed(false);
  };

  // Close modal
  const closeSlideViewer = () => {
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
    setActiveModalDeck(null);
    setActiveSlideIndex(0);
    setIsFullscreen(false);
    setIsSidebarCollapsed(false);
  };

  // Slide navigation
  const handleNextSlide = useCallback(() => {
    if (!activeModalDeck) return;
    setActiveSlideIndex((prev) =>
      prev < activeModalDeck.slides.length - 1 ? prev + 1 : prev
    );
  }, [activeModalDeck]);

  const handlePrevSlide = useCallback(() => {
    setActiveSlideIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  // Toggle Full View / Fullscreen
  const toggleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => {
      const next = !prev;
      if (next) {
        const elem = document.documentElement;
        if (elem.requestFullscreen && !document.fullscreenElement) {
          elem.requestFullscreen().catch(() => {});
        }
      } else {
        if (document.fullscreenElement && document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        }
      }
      return next;
    });
  }, []);

  // Sync with browser fullscreen events (e.g. Esc button pressed)
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [isFullscreen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activeModalDeck) return;
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        handleNextSlide();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrevSlide();
      }
      if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        toggleFullscreen();
      }
      if (e.key === "s" || e.key === "S") {
        e.preventDefault();
        setIsSidebarCollapsed((prev) => !prev);
      }
      if (e.key === "Escape") {
        if (isFullscreen) {
          e.preventDefault();
          toggleFullscreen();
        } else {
          closeSlideViewer();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    activeModalDeck,
    handleNextSlide,
    handlePrevSlide,
    isFullscreen,
    toggleFullscreen,
  ]);

  const activeSlide = activeModalDeck?.slides?.[activeSlideIndex];

  return (
    <Box
      sx={{
        backgroundColor: "#F8FAFC",
        minHeight: "100vh",
        pb: { xs: 8, md: 12 },
        color: TEXT_DARK,
        overflowX: "hidden",
      }}
    >
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION (Aligned with F2 Fintech Brand Theme)
          ───────────────────────────────────────────────────────────── */}
      <Box
        sx={{
          position: "relative",
          background: "linear-gradient(135deg, #1e4dd8 0%, #163bb0 55%, #0f2878 100%)",
          color: "#FFFFFF",
          pt: { xs: 6, md: 9 },
          pb: { xs: 10, md: 14 },
          overflow: "hidden",
        }}
      >
        {/* Glow ambient background elements */}
        <Box
          sx={{
            position: "absolute",
            top: "-120px",
            right: "-80px",
            width: "480px",
            height: "480px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0) 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "-100px",
            left: "-60px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(61, 200, 186, 0.22) 0%, rgba(61, 200, 186, 0) 70%)",
            filter: "blur(70px)",
            pointerEvents: "none",
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ textAlign: "center", maxWidth: 840, mx: "auto" }}>
            {/* Pill Badge */}
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                px: 2.2,
                py: 0.8,
                borderRadius: "30px",
                backgroundColor: "rgba(255, 255, 255, 0.12)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.22)",
                mb: 3,
              }}
            >
              <AutoAwesomeOutlinedIcon sx={{ color: "#FBBF24", fontSize: 18 }} />
              <Typography
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "0.84rem",
                  fontWeight: 600,
                  color: "#FFFFFF",
                  letterSpacing: 0.3,
                }}
              >
                Official Resource Center • Presentation Decks
              </Typography>
            </Box>

            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 800,
                fontSize: { xs: "2.1rem", sm: "3rem", md: "3.6rem" },
                lineHeight: { xs: 1.2, md: 1.15 },
                color: "#FFFFFF",
                mb: 2.5,
                letterSpacing: "-0.5px",
              }}
            >
              Company Presentations &amp;{" "}
              <br />
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  position: "relative",
                  borderBottom: "3px solid #FFFFFF",
                  pb: 0.5,
                }}
              >
                Pitch Decks
              </Box>
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: { xs: "0.95rem", sm: "1.08rem" },
                color: "rgba(255, 255, 255, 0.88)",
                lineHeight: 1.7,
                maxWidth: 760,
                mx: "auto",
                mb: 4.5,
              }}
            >
              Download official executive decks or preview full presentation slides in 1:1 original quality right in your browser.
              Covering <strong>Company Profile</strong>, <strong>Loan Journey</strong>, <strong>Doctors &amp; Healthcare</strong>, <strong>Corporate Wellness</strong>, and <strong>Enterprise SaaS</strong>.
            </Typography>

            {/* Value Proposition Highlights - Clean, open layout without heavy boxes or raw numbers */}
            <Box
              sx={{
                mt: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: { xs: 2.5, md: 3 },
              }}
            >
              {/* Row 1: 3 feature columns */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
                  gap: { xs: 2.5, sm: 3, md: 6 },
                  width: "100%",
                  maxWidth: 820,
                  textAlign: "center",
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 700,
                      fontSize: { xs: "1.1rem", md: "1.25rem" },
                      color: "#FFFFFF",
                      mb: 0.4,
                    }}
                  >
                    Executive Decks
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: { xs: "0.78rem", sm: "0.82rem" },
                      color: "rgba(255, 255, 255, 0.78)",
                      lineHeight: 1.4,
                    }}
                  >
                    Company, Loans, Doctors, Corporates, SaaS
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 700,
                      fontSize: { xs: "1.1rem", md: "1.25rem" },
                      color: "#FFFFFF",
                      mb: 0.4,
                    }}
                  >
                    Free Download
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: { xs: "0.78rem", sm: "0.82rem" },
                      color: "rgba(255, 255, 255, 0.78)",
                      lineHeight: 1.4,
                    }}
                  >
                    High-resolution official presentations
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 700,
                      fontSize: { xs: "1.1rem", md: "1.25rem" },
                      color: "#FFFFFF",
                      mb: 0.4,
                    }}
                  >
                    1:1 Slide Viewer
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: { xs: "0.78rem", sm: "0.82rem" },
                      color: "rgba(255, 255, 255, 0.78)",
                      lineHeight: 1.4,
                    }}
                  >
                    Original 16:9 widescreen presentation mode
                  </Typography>
                </Box>
              </Box>

              {/* Row 2: Centered 4th feature */}
              <Box sx={{ textAlign: "center", maxWidth: 440 }}>
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 700,
                    fontSize: { xs: "1.1rem", md: "1.25rem" },
                    color: "#FFFFFF",
                    mb: 0.4,
                  }}
                >
                  Pan-India Reach
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: { xs: "0.78rem", sm: "0.82rem" },
                    color: "rgba(255, 255, 255, 0.78)",
                    lineHeight: 1.4,
                  }}
                >
                  Backed by leading national lending partners
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ─────────────────────────────────────────────────────────────
          2. SEARCH & FILTER CONTROLS (Overlapping the hero)
          ───────────────────────────────────────────────────────────── */}
      <Container
        maxWidth="lg"
        sx={{
          mt: { xs: -5, md: -6 },
          position: "relative",
          zIndex: 2,
          mb: 6,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 3 },
            borderRadius: "22px",
            border: `1px solid ${BORDER_COLOR}`,
            backgroundColor: "#FFFFFF",
            boxShadow:
              "0 20px 45px -15px rgba(15, 23, 42, 0.1), 0 4px 12px rgba(50, 68, 230, 0.04)",
          }}
        >
          <Grid container spacing={2} alignItems="center">
            {/* Search Input */}
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search by title, topic, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: BRAND_BLUE, fontSize: 22 }} />
                    </InputAdornment>
                  ),
                  endAdornment: searchQuery && (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() => setSearchQuery("")}
                        aria-label="clear search"
                      >
                        <ClearIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    fontFamily: "'Poppins', sans-serif",
                    borderRadius: "14px",
                    backgroundColor: "#F8FAFC",
                    "& fieldset": { borderColor: BORDER_COLOR },
                    "&:hover fieldset": { borderColor: BRAND_BLUE },
                    "&.Mui-focused fieldset": { borderColor: BRAND_BLUE, borderWidth: 2 },
                  },
                }}
              />
            </Grid>

            {/* Category Pills */}
            <Grid item xs={12} md={7}>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  flexWrap: "wrap",
                  justifyContent: { xs: "flex-start", md: "flex-end" },
                }}
              >
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <Chip
                      key={cat}
                      label={cat}
                      onClick={() => setSelectedCategory(cat)}
                      sx={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: isSelected ? 700 : 500,
                        fontSize: "0.82rem",
                        px: 0.8,
                        py: 2,
                        borderRadius: "12px",
                        backgroundColor: isSelected ? BRAND_BLUE : "#F1F5F9",
                        color: isSelected ? "#FFFFFF" : TEXT_DARK,
                        border: isSelected
                          ? `1px solid ${BRAND_BLUE}`
                          : `1px solid ${BORDER_COLOR}`,
                        transition: "all 0.2s ease",
                        "&:hover": {
                          backgroundColor: isSelected ? BRAND_HOVER : "#E2E8F0",
                        },
                      }}
                    />
                  );
                })}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* ─────────────────────────────────────────────────────────────
          3. PRESENTATION CARDS GRID WITH REAL SLIDE PREVIEWS
          ───────────────────────────────────────────────────────────── */}
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        {filteredDecks.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: 8,
              textAlign: "center",
              borderRadius: "24px",
              border: `1px dashed ${BORDER_COLOR}`,
              backgroundColor: "#FFFFFF",
            }}
          >
            <SlideshowIcon sx={{ fontSize: 56, color: "#CBD5E1", mb: 2 }} />
            <Typography
              variant="h6"
              sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, mb: 1 }}
            >
              No Presentation Decks Found
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontFamily: "'Poppins', sans-serif", color: TEXT_MUTED, mb: 3 }}
            >
              No decks matched your search &quot;{searchQuery}&quot;. Try a different keyword or category.
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All Decks");
              }}
              sx={{
                fontFamily: "'Poppins', sans-serif",
                textTransform: "none",
                borderRadius: "12px",
                backgroundColor: BRAND_BLUE,
              }}
            >
              Reset Filters
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={3.5}>
            {filteredDecks.map((deck) => {
              const IconComponent = deck.icon;
              const firstSlide = deck.slides[0];

              return (
                <Grid item xs={12} md={6} key={deck.id}>
                  <Card
                    elevation={0}
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: "24px",
                      border: `1px solid ${BORDER_COLOR}`,
                      backgroundColor: "#FFFFFF",
                      overflow: "hidden",
                      transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                      "&:hover": {
                        transform: "translateY(-6px)",
                        borderColor: BRAND_BLUE,
                        boxShadow:
                          "0 20px 40px -15px rgba(50, 68, 230, 0.15), 0 2px 6px rgba(0, 0, 0, 0.04)",
                      },
                    }}
                  >
                    {/* Header Banner */}
                    <Box
                      sx={{
                        background: deck.gradient,
                        p: 3,
                        color: "#FFFFFF",
                        position: "relative",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          gap: 2,
                          mb: 2,
                        }}
                      >
                        <Chip
                          label={deck.category}
                          size="small"
                          sx={{
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: 700,
                            fontSize: "0.74rem",
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                            color: "#FFFFFF",
                            backdropFilter: "blur(8px)",
                            border: "1px solid rgba(255, 255, 255, 0.3)",
                          }}
                        />
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.8 }}>
                        <Box
                          sx={{
                            width: 52,
                            height: 52,
                            borderRadius: "14px",
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                            backdropFilter: "blur(10px)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#FFFFFF",
                            flexShrink: 0,
                          }}
                        >
                          <IconComponent sx={{ fontSize: 28 }} />
                        </Box>
                        <Box>
                          <Typography
                            variant="h5"
                            sx={{
                              fontFamily: "'Poppins', sans-serif",
                              fontWeight: 800,
                              fontSize: { xs: "1.2rem", sm: "1.35rem" },
                              lineHeight: 1.25,
                              color: "#FFFFFF",
                            }}
                          >
                            {deck.title}
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: "'Poppins', sans-serif",
                              fontSize: "0.82rem",
                              color: "rgba(255, 255, 255, 0.85)",
                              mt: 0.3,
                            }}
                          >
                            {deck.tagline}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    {/* Actual Slide Preview Thumbnail Container */}
                    <Box
                      onClick={() => openSlideViewer(deck, 0)}
                      sx={{
                        position: "relative",
                        aspectRatio: "16 / 9",
                        backgroundColor: "#0A1128",
                        cursor: "pointer",
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        "&:hover .preview-overlay": {
                          opacity: 1,
                        },
                      }}
                    >
                      <img
                        src={firstSlide.image}
                        alt={deck.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: deck.isPortrait ? "contain" : "cover",
                          display: "block",
                        }}
                      />
                      {/* Hover Overlay */}
                      <Box
                        className="preview-overlay"
                        sx={{
                          position: "absolute",
                          inset: 0,
                          backgroundColor: "rgba(15, 23, 42, 0.6)",
                          backdropFilter: "blur(4px)",
                          opacity: 0,
                          transition: "opacity 0.25s ease",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 1.5,
                          color: "#FFFFFF",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            backgroundColor: BRAND_BLUE,
                            px: 2.5,
                            py: 1,
                            borderRadius: "30px",
                            fontWeight: 700,
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: "0.88rem",
                            boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                          }}
                        >
                          <FullscreenIcon sx={{ fontSize: 20 }} />
                          Click to View Presentation
                        </Box>
                      </Box>
                    </Box>

                    {/* Card Actions */}
                    <CardContent
                      sx={{
                        p: { xs: 2.2, sm: 2.6 },
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        backgroundColor: "#FFFFFF",
                      }}
                    >
                      {/* Live Slide Preview Button */}
                      <Button
                        variant="outlined"
                        startIcon={<VisibilityOutlinedIcon />}
                        onClick={() => openSlideViewer(deck, 0)}
                        sx={{
                          fontFamily: "'Poppins', sans-serif",
                          textTransform: "none",
                          fontWeight: 600,
                          borderRadius: "12px",
                          px: 2.4,
                          py: 1,
                          fontSize: "0.86rem",
                          borderColor: BORDER_COLOR,
                          color: TEXT_DARK,
                          "&:hover": {
                            borderColor: BRAND_BLUE,
                            color: BRAND_BLUE,
                            backgroundColor: "rgba(50, 68, 230, 0.04)",
                          },
                        }}
                      >
                        View Slides
                      </Button>

                      {/* Direct Download Button */}
                      <Button
                        variant="contained"
                        startIcon={<DownloadIcon />}
                        onClick={(e) =>
                          handleDownload(e, deck.fileUrl, deck.fileName, deck.title)
                        }
                        sx={{
                          fontFamily: "'Poppins', sans-serif",
                          textTransform: "none",
                          fontWeight: 700,
                          borderRadius: "12px",
                          px: 2.5,
                          py: 1,
                          fontSize: "0.86rem",
                          backgroundColor: BRAND_BLUE,
                          boxShadow: "0 6px 18px rgba(50, 68, 230, 0.25)",
                          "&:hover": {
                            backgroundColor: BRAND_HOVER,
                          },
                        }}
                      >
                        Download PDF
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>

      {/* ─────────────────────────────────────────────────────────────
          4. COMPARISON MATRIX TABLE
          ───────────────────────────────────────────────────────────── */}
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4.5 },
            borderRadius: "24px",
            border: `1px solid ${BORDER_COLOR}`,
            backgroundColor: "#FFFFFF",
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Typography
              sx={{
                fontFamily: "'Poppins', sans-serif",
                color: BRAND_BLUE,
                fontWeight: 700,
                fontSize: "0.82rem",
                textTransform: "uppercase",
                letterSpacing: 1.2,
                mb: 0.5,
              }}
            >
              Executive Summary
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 800,
                color: TEXT_DARK,
                fontSize: { xs: "1.3rem", sm: "1.6rem" },
              }}
            >
              All 4 Presentation Decks at a Glance
            </Typography>
          </Box>

          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#F8FAFC" }}>
                  <TableCell sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}>
                    Presentation Deck
                  </TableCell>
                  <TableCell sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}>
                    Category
                  </TableCell>
                  <TableCell sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}>
                    Target Audience
                  </TableCell>
                  <TableCell sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}>
                    Slides / Size
                  </TableCell>
                  <TableCell align="center" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {LOAN_DECKS.map((d) => (
                  <TableRow
                    key={d.id}
                    hover
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Box
                          sx={{
                            width: 36,
                            height: 36,
                            borderRadius: "10px",
                            backgroundColor: d.glowColor,
                            color: d.badgeColor,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <d.icon sx={{ fontSize: 20 }} />
                        </Box>
                        <Box>
                          <Typography
                            sx={{
                              fontFamily: "'Poppins', sans-serif",
                              fontWeight: 700,
                              fontSize: "0.9rem",
                              color: TEXT_DARK,
                            }}
                          >
                            {d.title}
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: "'Poppins', sans-serif",
                              fontSize: "0.75rem",
                              color: TEXT_MUTED,
                            }}
                          >
                            {d.fileName}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={d.category}
                        size="small"
                        sx={{
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: 600,
                          fontSize: "0.72rem",
                          backgroundColor: "#F1F5F9",
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.85rem", color: TEXT_MUTED }}>
                      {d.audience}
                    </TableCell>
                    <TableCell sx={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.85rem", fontWeight: 600 }}>
                      {d.slidesCount} Slides • {d.fileSize}
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => openSlideViewer(d, 0)}
                          sx={{
                            fontFamily: "'Poppins', sans-serif",
                            textTransform: "none",
                            borderRadius: "8px",
                            fontSize: "0.78rem",
                            fontWeight: 600,
                          }}
                        >
                          Preview
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          startIcon={<DownloadIcon sx={{ fontSize: 16 }} />}
                          onClick={(e) => handleDownload(e, d.fileUrl, d.fileName, d.title)}
                          sx={{
                            fontFamily: "'Poppins', sans-serif",
                            textTransform: "none",
                            borderRadius: "8px",
                            fontSize: "0.78rem",
                            fontWeight: 600,
                            backgroundColor: BRAND_BLUE,
                          }}
                        >
                          PDF
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>

      {/* ─────────────────────────────────────────────────────────────
          5. FREQUENTLY ASKED QUESTIONS
          ───────────────────────────────────────────────────────────── */}
      <Container maxWidth="md" sx={{ mb: 10 }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            sx={{
              fontFamily: "'Poppins', sans-serif",
              color: BRAND_BLUE,
              fontWeight: 700,
              fontSize: "0.85rem",
              textTransform: "uppercase",
              letterSpacing: 1.2,
              mb: 0.5,
            }}
          >
            Questions &amp; Guidance
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 800,
              color: TEXT_DARK,
              fontSize: { xs: "1.5rem", sm: "2rem" },
            }}
          >
            Frequently Asked Questions
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {FAQS.map((item, index) => (
            <Accordion
              key={index}
              elevation={0}
              sx={{
                borderRadius: "16px !important",
                border: `1px solid ${BORDER_COLOR}`,
                "&:before": { display: "none" },
                overflow: "hidden",
                transition: "all 0.2s ease",
                "&.Mui-expanded": {
                  borderColor: BRAND_BLUE,
                  boxShadow: "0 8px 24px rgba(50, 68, 230, 0.08)",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: BRAND_BLUE }} />}
                sx={{
                  py: 1.2,
                  px: 2.5,
                  "& .MuiAccordionSummary-content": { my: 1 },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    color: TEXT_DARK,
                    fontSize: "0.98rem",
                  }}
                >
                  {item.q}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 2.5, pb: 2.5, pt: 0 }}>
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    color: TEXT_MUTED,
                    fontSize: "0.88rem",
                    lineHeight: 1.7,
                  }}
                >
                  {item.a}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>

      {/* ─────────────────────────────────────────────────────────────
          6. POWERPOINT-STYLE INTERACTIVE SLIDE VIEWER MODAL
             (Renders true 1:1 original slides with thumbnail sidebar)
          ───────────────────────────────────────────────────────────── */}
      <Modal
        open={Boolean(activeModalDeck)}
        onClose={closeSlideViewer}
        aria-labelledby="slide-viewer-modal"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: isFullscreen ? 0 : { xs: 1, sm: 2, md: 3 },
          backdropFilter: isFullscreen ? "none" : "blur(10px)",
          backgroundColor: isFullscreen ? "#050811" : "rgba(10, 15, 30, 0.88)",
          zIndex: 1300,
        }}
      >
        <Box
          sx={{
            width: isFullscreen ? "100vw" : "100%",
            height: isFullscreen ? "100vh" : "auto",
            maxWidth: isFullscreen ? "100vw" : 1200,
            maxHeight: isFullscreen ? "100vh" : "95vh",
            backgroundColor: "#1E293B",
            borderRadius: isFullscreen ? 0 : "24px",
            boxShadow: isFullscreen ? "none" : "0 30px 80px rgba(0, 0, 0, 0.5)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            outline: "none",
            border: isFullscreen ? "none" : "1px solid rgba(255, 255, 255, 0.12)",
            transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* Top Bar (PowerPoint Title Bar Style) */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: { xs: 2, sm: 3 },
              py: isFullscreen ? 1.2 : 1.6,
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
              backgroundColor: "#0F172A",
              color: "#FFFFFF",
              flexShrink: 0,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: 0 }}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "10px",
                  backgroundColor: BRAND_BLUE,
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <SlideshowIcon sx={{ fontSize: 20 }} />
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 700,
                    fontSize: { xs: "0.9rem", sm: "1.05rem" },
                    color: "#FFFFFF",
                    lineHeight: 1.2,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {activeModalDeck?.title}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "0.72rem",
                    color: "#94A3B8",
                  }}
                >
                  Slide {activeSlideIndex + 1} of {activeModalDeck?.slides?.length} • {activeModalDeck?.fileName}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 1.5 }, flexShrink: 0 }}>
              {/* Sidebar Collapse Toggle Button (in Full View or whenever modal is open) */}
              {isFullscreen && (
                <Tooltip
                  title={
                    isSidebarCollapsed
                      ? "Show Thumbnails Sidebar (S)"
                      : "Collapse Sidebar (S)"
                  }
                >
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<ViewSidebarIcon />}
                    onClick={() => setIsSidebarCollapsed((prev) => !prev)}
                    sx={{
                      fontFamily: "'Poppins', sans-serif",
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: "0.82rem",
                      borderRadius: "10px",
                      px: { xs: 1.2, sm: 1.8 },
                      py: 0.7,
                      color: isSidebarCollapsed ? "#38BDF8" : "#94A3B8",
                      borderColor: isSidebarCollapsed
                        ? "#38BDF8"
                        : "rgba(255, 255, 255, 0.2)",
                      backgroundColor: isSidebarCollapsed
                        ? "rgba(56, 189, 248, 0.14)"
                        : "rgba(255, 255, 255, 0.05)",
                      "&:hover": {
                        color: "#FFFFFF",
                        borderColor: "#38BDF8",
                        backgroundColor: "rgba(56, 189, 248, 0.22)",
                      },
                    }}
                  >
                    {isSidebarCollapsed ? "Show Sidebar" : "Collapse Sidebar"}
                  </Button>
                </Tooltip>
              )}

              {/* Full View Toggle Button */}
              <Tooltip title={isFullscreen ? "Exit Full View (Esc or F)" : "Full View (F)"}>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                  onClick={toggleFullscreen}
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "0.82rem",
                    borderRadius: "10px",
                    px: { xs: 1.2, sm: 1.8 },
                    py: 0.7,
                    color: isFullscreen ? "#38BDF8" : "#FFFFFF",
                    borderColor: isFullscreen ? "#38BDF8" : "rgba(255, 255, 255, 0.25)",
                    backgroundColor: isFullscreen ? "rgba(56, 189, 248, 0.15)" : "rgba(255, 255, 255, 0.05)",
                    "&:hover": {
                      borderColor: "#38BDF8",
                      backgroundColor: "rgba(56, 189, 248, 0.25)",
                    },
                  }}
                >
                  {isFullscreen ? "Exit Full View" : "Full View"}
                </Button>
              </Tooltip>

              {/* Download PDF Button */}
              <Button
                size="small"
                variant="contained"
                startIcon={<DownloadIcon sx={{ fontSize: 16 }} />}
                onClick={(e) =>
                  handleDownload(
                    e,
                    activeModalDeck?.fileUrl,
                    activeModalDeck?.fileName,
                    activeModalDeck?.title
                  )
                }
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.8rem",
                  borderRadius: "10px",
                  backgroundColor: BRAND_BLUE,
                  display: { xs: "none", sm: "inline-flex" },
                  "&:hover": { backgroundColor: BRAND_HOVER },
                }}
              >
                Download (PDF)
              </Button>

              {/* Close Button */}
              <IconButton
                onClick={closeSlideViewer}
                aria-label="close modal"
                sx={{ color: "#94A3B8", "&:hover": { color: "#FFFFFF" } }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Modal Main Stage: Sidebar Thumbnails (Left) + Big Slide (Right) */}
          <Box
            sx={{
              display: "flex",
              flex: 1,
              overflow: "hidden",
              backgroundColor: "#0B1120",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            {/* Left Thumbnail Strip */}
            <Box
              sx={{
                width: isSidebarCollapsed
                  ? 0
                  : { xs: "100%", md: isFullscreen ? 210 : 220 },
                minWidth: isSidebarCollapsed ? 0 : { md: isFullscreen ? 210 : 220 },
                maxWidth: isSidebarCollapsed ? 0 : { md: 240 },
                borderRight: isSidebarCollapsed
                  ? "none"
                  : { md: "1px solid rgba(255, 255, 255, 0.08)" },
                borderBottom: isSidebarCollapsed
                  ? "none"
                  : { xs: "1px solid rgba(255, 255, 255, 0.08)", md: "none" },
                p: isSidebarCollapsed ? 0 : 2,
                overflowY: isSidebarCollapsed ? "hidden" : "auto",
                overflowX: isSidebarCollapsed ? "hidden" : { xs: "auto", md: "hidden" },
                display: isSidebarCollapsed ? "none" : "flex",
                flexDirection: { xs: "row", md: "column" },
                gap: 1.8,
                flexShrink: 0,
                backgroundColor: "#070D19",
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              {/* Header with Title & Collapse Chevron Button */}
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                  justifyContent: "space-between",
                  pb: 1,
                  borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                  mb: 0.5,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "#94A3B8",
                    textTransform: "uppercase",
                    letterSpacing: 0.8,
                  }}
                >
                  Slides ({activeModalDeck?.slides?.length})
                </Typography>
                <Tooltip title="Collapse sidebar (S)">
                  <IconButton
                    size="small"
                    onClick={() => setIsSidebarCollapsed(true)}
                    sx={{
                      color: "#94A3B8",
                      p: 0.5,
                      "&:hover": {
                        color: "#FFFFFF",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      },
                    }}
                  >
                    <ChevronLeftIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </Tooltip>
              </Box>

              {activeModalDeck?.slides?.map((sl, idx) => {
                const isSelected = idx === activeSlideIndex;
                return (
                  <Box
                    key={idx}
                    onClick={() => setActiveSlideIndex(idx)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.2,
                      cursor: "pointer",
                      flexShrink: 0,
                    }}
                  >
                    {/* Slide Number */}
                    <Typography
                      sx={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        color: isSelected ? "#38BDF8" : "#64748B",
                        minWidth: 16,
                        textAlign: "right",
                        display: { xs: "none", md: "block" },
                      }}
                    >
                      {idx + 1}
                    </Typography>

                    {/* Miniature Slide Card */}
                    <Box
                      sx={{
                        width: { xs: 110, md: isFullscreen ? 150 : 170 },
                        aspectRatio: "16 / 9",
                        borderRadius: "8px",
                        overflow: "hidden",
                        border: isSelected
                          ? "2.5px solid #38BDF8"
                          : "1.5px solid rgba(255, 255, 255, 0.15)",
                        boxShadow: isSelected ? "0 0 14px rgba(56, 189, 248, 0.4)" : "none",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          borderColor: "#38BDF8",
                        },
                      }}
                    >
                      <img
                        src={sl.image}
                        alt={`Slide ${idx + 1}`}
                        style={{ width: "100%", height: "100%", objectFit: activeModalDeck?.isPortrait ? "contain" : "cover", display: "block" }}
                      />
                    </Box>
                  </Box>
                );
              })}
            </Box>

            {/* Right Stage: High-Resolution Active Slide Canvas */}
            <Box
              sx={{
                flex: 1,
                p: isFullscreen ? { xs: 1.5, sm: 2, md: 3 } : { xs: 2, sm: 3, md: 4 },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                backgroundColor: "#0B1120",
              }}
            >
              {/* Floating Expand Sidebar Button when collapsed */}
              {isSidebarCollapsed && (
                <Tooltip title="Show Slides Sidebar (S)">
                  <IconButton
                    onClick={() => setIsSidebarCollapsed(false)}
                    aria-label="Expand sidebar"
                    sx={{
                      position: "absolute",
                      left: { xs: 12, sm: 20 },
                      top: { xs: 12, sm: 20 },
                      backgroundColor: "rgba(15, 23, 42, 0.85)",
                      color: "#38BDF8",
                      border: "1px solid rgba(56, 189, 248, 0.35)",
                      backdropFilter: "blur(8px)",
                      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.5)",
                      width: { xs: 36, sm: 42 },
                      height: { xs: 36, sm: 42 },
                      zIndex: 20,
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor: BRAND_BLUE,
                        color: "#FFFFFF",
                        transform: "scale(1.08)",
                      },
                    }}
                  >
                    <ViewSidebarIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
                  </IconButton>
                </Tooltip>
              )}

              {/* The Actual Slide Display in exact 16:9 Presentation Aspect Ratio */}
              {activeSlide && (
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: isFullscreen
                      ? isSidebarCollapsed
                        ? "96vw"
                        : "calc(100vw - 260px)"
                      : isSidebarCollapsed
                      ? 1120
                      : 960,
                    maxHeight: isFullscreen ? "calc(100vh - 135px)" : "70vh",
                    aspectRatio: "16 / 9",
                    borderRadius: isFullscreen ? "8px" : "14px",
                    overflow: "hidden",
                    boxShadow: "0 25px 60px rgba(0, 0, 0, 0.75)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    backgroundColor: "#000000",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <img
                    src={activeSlide.image}
                    alt={activeSlide.title || `Slide ${activeSlide.slideNumber}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />

                  {/* Left Hover Navigation Arrow */}
                  {activeSlideIndex > 0 && (
                    <IconButton
                      onClick={handlePrevSlide}
                      aria-label="Previous slide"
                      sx={{
                        position: "absolute",
                        left: { xs: 8, sm: 16 },
                        top: "50%",
                        transform: "translateY(-50%)",
                        backgroundColor: "rgba(15, 23, 42, 0.75)",
                        color: "#FFFFFF",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        backdropFilter: "blur(6px)",
                        boxShadow: "0 6px 18px rgba(0,0,0,0.5)",
                        width: { xs: 36, sm: 46 },
                        height: { xs: 36, sm: 46 },
                        transition: "all 0.2s ease",
                        "&:hover": {
                          backgroundColor: BRAND_BLUE,
                          transform: "translateY(-50%) scale(1.1)",
                        },
                        zIndex: 10,
                      }}
                    >
                      <ChevronLeftIcon sx={{ fontSize: { xs: 22, sm: 28 } }} />
                    </IconButton>
                  )}

                  {/* Right Hover Navigation Arrow */}
                  {activeSlideIndex < (activeModalDeck?.slides?.length || 4) - 1 && (
                    <IconButton
                      onClick={handleNextSlide}
                      aria-label="Next slide"
                      sx={{
                        position: "absolute",
                        right: { xs: 8, sm: 16 },
                        top: "50%",
                        transform: "translateY(-50%)",
                        backgroundColor: "rgba(15, 23, 42, 0.75)",
                        color: "#FFFFFF",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        backdropFilter: "blur(6px)",
                        boxShadow: "0 6px 18px rgba(0,0,0,0.5)",
                        width: { xs: 36, sm: 46 },
                        height: { xs: 36, sm: 46 },
                        transition: "all 0.2s ease",
                        "&:hover": {
                          backgroundColor: BRAND_BLUE,
                          transform: "translateY(-50%) scale(1.1)",
                        },
                        zIndex: 10,
                      }}
                    >
                      <ChevronRightIcon sx={{ fontSize: { xs: 22, sm: 28 } }} />
                    </IconButton>
                  )}

                  {/* Quick-toggle Full View button directly on slide */}
                  <Tooltip title={isFullscreen ? "Exit Full View" : "Full View"}>
                    <IconButton
                      onClick={toggleFullscreen}
                      aria-label="Toggle full view"
                      sx={{
                        position: "absolute",
                        top: { xs: 8, sm: 14 },
                        right: { xs: 8, sm: 14 },
                        backgroundColor: "rgba(15, 23, 42, 0.75)",
                        color: isFullscreen ? "#38BDF8" : "#FFFFFF",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        backdropFilter: "blur(6px)",
                        width: { xs: 32, sm: 38 },
                        height: { xs: 32, sm: 38 },
                        zIndex: 10,
                        transition: "all 0.2s ease",
                        "&:hover": {
                          backgroundColor: BRAND_BLUE,
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      {isFullscreen ? (
                        <FullscreenExitIcon sx={{ fontSize: { xs: 18, sm: 22 } }} />
                      ) : (
                        <FullscreenIcon sx={{ fontSize: { xs: 18, sm: 22 } }} />
                      )}
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
            </Box>
          </Box>

          {/* Bottom Control Bar */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: { xs: 2, sm: 3.5 },
              py: isFullscreen ? 1.2 : 1.8,
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              backgroundColor: "#0F172A",
              flexWrap: "wrap",
              gap: 1.5,
              flexShrink: 0,
            }}
          >
            <Button
              variant="outlined"
              startIcon={<ChevronLeftIcon />}
              disabled={activeSlideIndex === 0}
              onClick={handlePrevSlide}
              sx={{
                fontFamily: "'Poppins', sans-serif",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.85rem",
                borderRadius: "10px",
                borderColor: "rgba(255, 255, 255, 0.2)",
                color: "#FFFFFF",
                "&:hover": {
                  borderColor: "#38BDF8",
                  backgroundColor: "rgba(56, 189, 248, 0.08)",
                },
                "&.Mui-disabled": {
                  borderColor: "rgba(255, 255, 255, 0.08)",
                  color: "rgba(255, 255, 255, 0.3)",
                },
              }}
            >
              Previous Slide
            </Button>

            {/* Slide Dots / Counter */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Typography
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "0.85rem",
                  color: "#94A3B8",
                  fontWeight: 600,
                }}
              >
                Slide {activeSlideIndex + 1} of {activeModalDeck?.slides?.length}
              </Typography>
              <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 0.6, alignItems: "center" }}>
                {activeModalDeck?.slides?.map((_, dotIdx) => (
                  <Box
                    key={dotIdx}
                    onClick={() => setActiveSlideIndex(dotIdx)}
                    sx={{
                      width: dotIdx === activeSlideIndex ? 22 : 8,
                      height: 8,
                      borderRadius: "4px",
                      backgroundColor:
                        dotIdx === activeSlideIndex ? "#38BDF8" : "rgba(255, 255, 255, 0.25)",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor: "#38BDF8",
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>

            <Button
              variant="contained"
              endIcon={<ChevronRightIcon />}
              disabled={
                activeSlideIndex === (activeModalDeck?.slides?.length || 4) - 1
              }
              onClick={handleNextSlide}
              sx={{
                fontFamily: "'Poppins', sans-serif",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.85rem",
                borderRadius: "10px",
                backgroundColor: BRAND_BLUE,
                "&:hover": { backgroundColor: BRAND_HOVER },
              }}
            >
              Next Slide
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default LoanPresentations;
