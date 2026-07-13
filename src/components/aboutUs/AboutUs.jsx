"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  useTheme,
  useMediaQuery,
  Avatar,
  styled,
} from "@mui/material";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Zap,
  ShieldCheck,
  Building2,
  Target,
  Eye,
  Award,
  ArrowRight,
  TrendingUp,
  Percent,
  Clock,
  Briefcase,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  CheckCircle2,
  Linkedin,
  Mail,
} from "lucide-react";
import IndiaPresence from "../home/IndiaPresence";

// Framer Motion Animated Wrappers for MUI components
const MotionBox = motion(Box);
const MotionGrid = motion(Grid);
const MotionCard = motion(Card);
const MotionTypography = motion(Typography);

// Original styled components for Awards & Gallery sections
const ImageCard = styled(Card)(() => ({
  position: "relative",
  height: "300px",
  cursor: "pointer",
  "&:hover .overlay": {
    opacity: 1,
  },
}));

const ImageOverlay = styled(Box)(() => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  display: "flex",
  alignItems: "center",
  fontFamily: "'DM Sans', sans-serif",
  justifyContent: "center",
  opacity: 0,
  transition: "opacity 0.3s ease",
  color: "white",
}));

const YearButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  "&.active": {
    backgroundColor: theme.palette.tertiary?.main,
    color: "white",
  },
}));

// Portfolio items for gallery
const portfolioItems = [
  { id: 38, year: "2026", image: "/new/Ai Sales agent.webp" },
  { id: 39, year: "2026", image: "/new/smiling - 2.webp" },
  { id: 40, year: "2026", image: "/new/The OG pitch.webp" },
  { id: 28, year: "2026", image: "/IMG_0508.webp" },
  { id: 29, year: "2026", image: "/IMG_0529.webp" },
  { id: 30, year: "2026", image: "/IMG_9199.webp" },
  { id: 26, year: "2026", image: "/about2026_cropped.webp" },
  { id: 27, year: "2026", image: "/about22026_cropped.webp" },
  { id: 10, year: "2025", image: "/abt2025-1.webp" },
  { id: 11, year: "2025", image: "/abt2025-2.webp" },
  { id: 13, year: "2025", image: "/abt2025-4.webp" },
  { id: 14, year: "2025", image: "/abt2025-5.webp" },
  { id: 15, year: "2025", image: "/abt2025-6.webp" },
  { id: 16, year: "2025", image: "/abt2025-7.webp" },
  { id: 17, year: "2025", image: "/abt2025-8.webp" },
  { id: 19, year: "2025", image: "/abt2025-9.webp" },
  { id: 20, year: "2025", image: "/abt2025-1000.webp" },
  { id: 21, year: "2025", image: "/abt2025-11.webp" },
  { id: 22, year: "2025", image: "/abt2025-12.webp" },
  { id: 23, year: "2025", image: "/abt2025-13.webp" },
  { id: 24, year: "2025", image: "/abt2025-14.webp" },
  { id: 25, year: "2025", image: "/abt2025-15.webp" },
  { id: 18, year: "2024", image: "/abt-2024.webp" },
  { id: 4, year: "2023", title: "WOMEN'S DAY", image: "/abt5.webp" },
  { id: 5, year: "2023", title: "HOLI CELEBRATION", image: "/abt2.webp" },
  { id: 6, year: "2023", title: "TEAM CELEBRATION", image: "/abt9.webp" },
  { id: 31, year: "2023", image: "/new/abt2023-1c.webp" },
  { id: 32, year: "2023", image: "/new/abt2023-2c.webp" },
  { id: 33, year: "2023", image: "/new/abt2023-3c.webp" },
  { id: 34, year: "2023", image: "/new/abt2023-4c.webp", position: "left center" },
  { id: 35, year: "2023", image: "/new/abt2023-5c.webp" },
  { id: 7, year: "2022", title: "BLIND EMPOWERMENT", image: "/abt4.webp" },
  { id: 8, year: "2022", title: "TEAM BUILDING", image: "/abt7.webp" },
  { id: 9, year: "2022", title: "ANNUAL MEETING", image: "/abt8.webp" },
  { id: 36, year: "2022", image: "/new/IMG-20220120-WA0020.webp" },
  { id: 37, year: "2022", image: "/new/IMG-20220120-WA0083.webp" },
  { id: 1, year: "2021", title: "INDEPENDENCE DAY", image: "/abt6.webp" },
  { id: 2, year: "2021", title: "REPUBLIC DAY", image: "/abt3.webp" },
  { id: 3, year: "2021", title: "GRAND OPENING", image: "/abt1.webp" },
];

const galleryYears = ["2026", "2025", "2024", "2023", "2022", "2021"];

// Floating Animation for Badges
const floatAnimation = (delay = 0) => ({
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
    },
  },
});

// Count Up Component for Section 6 (Modified to display static numbers)
const CountUp = ({ to, prefix = "", suffix = "" }) => {
  const end = parseInt(to.toString().replace(/[^\d]/g, ""), 10) || 0;
  const formattedCount = end >= 1000 ? end.toLocaleString() : end;

  return (
    <span>
      {prefix}
      {formattedCount}
      {suffix}
    </span>
  );
};

export default function AboutUsPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isIpadPro = useMediaQuery(
    "only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (-webkit-min-device-pixel-ratio: 2)"
  );

  // Formatted Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Section 8 Testimonial Carousel State
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Gallery year filter state
  const [selectedYear, setSelectedYear] = useState("2026");
  const [showMoreHarpreet, setShowMoreHarpreet] = useState(false);
  const portfolioFilter = portfolioItems.filter((item) => item.year === selectedYear);


  const testimonials = [
    {
      quote: "F2 Fintech helped me secure a loan quickly with minimal documentation. Their team guided me throughout the process.",
      author: "Dr. Amit Sharma",
      role: "Senior Consultant, Cardiologist",
      rating: 5,
      image: "/101.webp",
    },
    {
      quote: "As a business owner, getting capital on time is crucial. F2 Fintech offered unmatched support, comparison, and fast disbursal.",
      author: "Rajesh Mehta",
      role: "Owner, Mehta Enterprises",
      rating: 5,
      image: "/abhinavimg.webp",
    },
    {
      quote: "Fantastic experience! The relationship manager was with me at every stage, transparently explaining the interest rates.",
      author: "Priya Iyer",
      role: "Lead Software Architect",
      rating: 5,
      image: "/customer1.webp",
    },
  ];

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(handleNextTestimonial, 6000);
    return () => clearInterval(timer);
  }, []);

  // Section 9 Bank Logos list - all 29 providers
  const partners = [
    { name: "Bajaj Finance", logo: "/partners/bajaj-finance.webp" },
    { name: "Bajaj Market", logo: "/partners/bajaj-market.webp" },
    { name: "Chola", logo: "/partners/chola.webp" },
    { name: "L&T", logo: "/partners/lnt.webp" },
    { name: "Tata", logo: "/partners/tata.webp" },
    { name: "ABFL", logo: "/partners/abfl.webp" },
    { name: "Godrej", logo: "/partners/godrej.webp" },
    { name: "IDFC", logo: "/partners/idfc.webp" },
    { name: "HDFC Bank", logo: "/partners/hdfc.webp" },
    { name: "ICICI", logo: "/partners/icici.webp" },
    { name: "INDUSIND", logo: "/partners/indusind.webp" },
    { name: "Lending Cart", logo: "/partners/lendingkart.webp" },
    { name: "Incred", logo: "/partners/incred.webp" },
    { name: "Credit Saison", logo: "/partners/credit-saison.webp" },
    { name: "Paysense", logo: "/partners/paysense.webp" },
    { name: "Shriram", logo: "/partners/shriram.webp" },
    { name: "HSBC Bank", logo: "/partners/hsbc.webp" },
    { name: "Standard Chartered", logo: "/partners/standard-chartered.webp" },
    { name: "YES Bank", logo: "/partners/yes-bank.webp" },
    { name: "AXIS Bank", logo: "/partners/axis.webp" },
    { name: "Kotak Bank", logo: "/partners/kotak.webp" },
    { name: "Deutsche Bank", logo: "/partners/deutsche.webp" },
    { name: "SBI", logo: "/partners/sbi.webp" },
    { name: "PNB", logo: "/partners/pnb.webp" },
    { name: "Poonawala", logo: "/partners/poonawala.webp" },
    { name: "SMFG", logo: "/partners/smfg.webp" },
    { name: "Canara Bank", logo: "/partners/canara.webp" },
    { name: "Bank of Baroda", logo: "/partners/bob.webp" },
    { name: "BOI", logo: "/partners/boi.webp" },
  ];

  // Slice the partners array into three distinct rows for the marquee
  const baseRow1 = partners.slice(0, 10);
  const baseRow2 = partners.slice(10, 20);
  const baseRow3 = partners.slice(20);

  // Duplicate to make each row long enough to cover wide viewports seamlessly
  const row1 = [...baseRow1, ...baseRow1];
  const row2 = [...baseRow2, ...baseRow2];
  const row3 = [...baseRow3, ...baseRow3];

  return (
    <Box sx={{ bgcolor: "#ffffff", overflowX: "hidden", fontFamily: "'DM Sans', sans-serif" }}>

      {/* SECTION 1: HERO SECTION */}
      <Box
        sx={{
          position: "relative",
          pt: { xs: 4, md: 6 },
          pb: { xs: 5, md: 6 },
          background: "radial-gradient(circle at 80% 20%, rgba(50, 68, 230, 0.07) 0%, rgba(255, 255, 255, 0) 50%), radial-gradient(circle at 10% 80%, rgba(50, 68, 230, 0.05) 0%, rgba(255, 255, 255, 0) 40%)",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={6} alignItems="center">

            {/* Left Hero Content */}
            <Grid item xs={12} lg={6}>
              <MotionBox
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Chip
                  label="FINANCIAL TECHNOLOGY"
                  sx={{
                    background: "linear-gradient(135deg, #3244e6 0%, #1d4ed8 100%)",
                    color: "#ffffff",
                    fontWeight: 800,
                    fontSize: "0.85rem",
                    fontFamily: "'DM Sans', sans-serif",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    height: "34px",
                    mb: 3,
                    borderRadius: "50px",
                    px: 2,
                    boxShadow: "0 4px 15px rgba(50, 68, 230, 0.25)",
                    border: "none",
                    "& .MuiChip-label": {
                      px: 1,
                    }
                  }}
                />

                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "2.5rem", sm: "3.2rem", md: "4rem" },
                    fontWeight: 800,
                    lineHeight: 1.15,
                    color: "#0f172a",
                    mb: 3,
                    letterSpacing: "-0.03em",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  A Professional Platform for Comparing and Selecting the{" "}
                  <Box
                    component="span"
                    sx={{
                      color: "#3244e6",
                      display: "inline",
                    }}
                  >
                    right financial products
                  </Box>
                </Typography>

                <Typography
                  sx={{
                    fontSize: { xs: "1.1rem", md: "1.25rem" },
                    lineHeight: 1.7,
                    color: "#475569",
                    mb: 5,
                    fontFamily: "'DM Sans', sans-serif",
                    maxWidth: "540px",
                  }}
                >
                  <strong>Entrust </strong> your financing requirements to our expert team.
                </Typography>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                  <Button
                    variant="contained"
                    onClick={() => navigate("/application-form")}
                    sx={{
                      backgroundColor: "#3244e6",
                      color: "#ffffff",
                      fontSize: "1rem",
                      fontWeight: 600,
                      px: 4,
                      py: 1.5,
                      borderRadius: "50px",
                      boxShadow: "0 10px 20px rgba(50, 68, 230, 0.25)",
                      textTransform: "none",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#2535cf",
                        transform: "translateY(-2px)",
                        boxShadow: "0 12px 24px rgba(50, 68, 230, 0.35)",
                      },
                    }}
                  >
                    Apply Now
                  </Button>
                  {/* <Button
                    variant="outlined"
                    onClick={() => navigate("/get-in-touch")}
                    sx={{
                      borderColor: "rgba(50, 68, 230, 0.3)",
                      color: "#3244e6",
                      fontSize: "1rem",
                      fontWeight: 600,
                      px: 4,
                      py: 1.5,
                      borderRadius: "50px",
                      textTransform: "none",
                      borderWidth: "1.5px",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        borderColor: "#3244e6",
                        borderWidth: "1.5px",
                        backgroundColor: "rgba(50, 68, 230, 0.04)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    Talk to an Expert
                  </Button> */}
                </Box>
              </MotionBox>
            </Grid>

            {/* Right Hero Image & Badges */}
            <Grid item xs={12} lg={6} sx={{ display: "flex", justifyContent: "center", position: "relative" }}>
              <MotionBox
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                sx={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "640px",
                  mt: { md: "-30px", xs: "0px" },
                }}
              >
                {/* Background glow shadow */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "10%",
                    left: "10%",
                    right: "10%",
                    bottom: "10%",
                    background: "rgba(50, 68, 230, 0.15)",
                    filter: "blur(60px)",
                    borderRadius: "50%",
                    zIndex: 0,
                  }}
                />

                {/* 2x2 grid representing a big square with 4 partitions */}
                <Box
                  sx={{
                    position: "relative",
                    zIndex: 1,
                    width: "100%",
                    maxWidth: "500px",
                    mx: "auto",
                    aspectRatio: "1/1",
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gridTemplateRows: "repeat(2, 1fr)",
                    bgcolor: "#ffffff",
                    borderRadius: "30px 0 30px 0",
                    overflow: "hidden",
                    boxShadow: "0 25px 50px -12px rgba(50, 68, 230, 0.25)",
                    // border: "6px solid #ffffff",
                  }}
                >
                  {[
                    { value: "11000", prefix: "", suffix: "+", label: "Happy Clients", isWhite: false },
                    { value: "30000", prefix: "", suffix: "+", label: "Applications", isWhite: true },
                    { value: "40", prefix: "", suffix: "+", label: "Lenders", isWhite: true },
                    { value: "1100", prefix: "", suffix: "+ Cr", label: "Loans Disbursed", isWhite: false },
                  ].map((stat, idx) => (
                    <MotionBox
                      key={idx}
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        background: stat.isWhite
                          ? "#ffffff"
                          : "linear-gradient(135deg, #3244e6 0%, #1d4ed8 100%)",
                        color: stat.isWhite ? "#0f172a" : "#ffffff",
                        p: { xs: 2, sm: 3, md: 4 },
                        textAlign: "center",
                        position: "relative",
                        overflow: "hidden",
                        cursor: "pointer",
                        border: stat.isWhite ? "1px solid rgba(50, 68, 230, 0.08)" : "none",
                      }}
                    >
                      <Typography
                        variant="h2"
                        sx={{
                          fontSize: { xs: "1.6rem", sm: "2.2rem", md: "2.5rem", lg: "2.8rem" },
                          fontWeight: 800,
                          color: stat.isWhite ? "#3244e6" : "#ffffff",
                          fontFamily: "'DM Sans', sans-serif",
                          mb: 1,
                          position: "relative",
                          zIndex: 1,
                        }}
                      >
                        <CountUp to={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: stat.isWhite ? "#475569" : "rgba(255, 255, 255, 0.85)",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.8rem", lg: "0.85rem" },
                          position: "relative",
                          zIndex: 1,
                        }}
                      >
                        {stat.label}
                      </Typography>
                    </MotionBox>
                  ))}
                </Box>
              </MotionBox>
            </Grid>

          </Grid>

          {/* Fallback Badges Grid for Mobile */}
          <Box sx={{ display: { xs: "flex", sm: "none" }, flexDirection: "column", gap: 2, mt: 5 }}>
            {[
              { icon: <ShieldCheck size={20} />, title: "Trusted Financial Partner", color: "#10b981", bg: "rgba(16, 185, 129, 0.08)" },
              { icon: <Zap size={20} />, title: "Fast Approval Process", color: "#ef4444", bg: "rgba(239, 68, 68, 0.08)" },
              { icon: <Building2 size={20} />, title: "Multiple Banking Partners", color: "#3244e6", bg: "rgba(50, 68, 230, 0.08)" },
            ].map((badge, idx) => (
              <Box key={idx} sx={{ display: "flex", alignItems: "center", gap: 2, p: 2, bgcolor: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                <Avatar sx={{ bgcolor: badge.bg, color: badge.color, width: 36, height: 36 }}>
                  {badge.icon}
                </Avatar>
                <Typography sx={{ fontWeight: 600, color: "#0f172a", fontSize: "0.9rem" }}>{badge.title}</Typography>
              </Box>
            ))}
          </Box>

        </Container>
      </Box>

      {/* SECTION 2: COMPANY STORY */}
      <Box sx={{ py: { xs: 5, md: 6 }, bgcolor: "#f8fafc" }}>
        <Container maxWidth="xl">
          <Grid container spacing={5} alignItems="center">

            {/* Story Content */}
            <Grid item xs={12} lg={5.5}>
              <MotionBox
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Chip
                  label="Our Story"
                  sx={{
                    background: "rgba(50, 68, 230, 0.08)",
                    color: "#3244e6",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    borderRadius: "50px",
                    mb: 3,
                  }}
                />

                <Typography
                  variant="h2"
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: { xs: "1.8rem", md: "2.8rem" },
                    fontWeight: 650,
                    lineHeight: 1.1,
                    color: "#1e293b",
                    mb: 3,
                    letterSpacing: "-0.04em",
                  }}
                >
                  Simplifying Complex{" "}
                  <Box
                    component="span"
                    sx={{
                      background: "linear-gradient(135deg, #1f1681ff 0%, #102e7aff 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      display: "inline-block",
                    }}
                  >
                    Loan Journeys
                  </Box>
                </Typography>

                <Typography
                  sx={{
                    fontSize: "1.1rem",
                    lineHeight: 1.7,
                    color: "#475569",
                    mb: 4,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  F2 Fintech was established to simplify the complex and tedious loan process. We saw professionals, business owners, and doctors struggle through heavy paperwork, unclear options, and slow processing times. By combining cutting-edge technology with seasoned financial advisory, we build a seamless bridge that provides transparent financial guidance and fast loan options.
                </Typography>

                {/* Highlight Points */}
                <Grid container spacing={3}>
                  {[
                    { title: "Customer-First Approach", desc: "Tailoring every credit solution to your specific career and financial cashflow requirements." },
                    { title: "Financial Expertise", desc: "Expert advisory that guides you through comparison and selection of optimal loan plans." },
                    { title: "Simplified Documentation", desc: "Completely digital validation workflow that eliminates manual bureaucracy." },
                    { title: "Faster Approvals", desc: "Direct partner integrations to secure fast approvals and disbursal paths." },
                  ].map((item, idx) => (
                    <Grid item xs={12} sm={6} key={idx}>
                      <Box sx={{ display: "flex", gap: 1.5 }}>
                        <CheckCircle2 size={20} color="#3244e6" style={{ marginTop: "3px", flexShrink: 0 }} />
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#0f172a", mb: 0.5 }}>
                            {item.title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#64748b", lineHeight: 1.5 }}>
                            {item.desc}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>

              </MotionBox>
            </Grid>

            {/* Original Single Image */}
            <Grid item xs={12} lg={6.5}>
              <MotionBox
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    maxWidth: "100%",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      width: "120%",
                      height: "120%",
                      background: "radial-gradient(circle, rgba(50, 68, 230, 0.08) 0%, transparent 70%)",
                      borderRadius: "50%",
                      top: "-10%",
                      left: "-10%",
                      zIndex: 0,
                    },
                  }}
                >
                  <Box
                    component="img"
                    src="/new/aboutusbann.webp"
                    alt="F2 Fintech Platform"
                    sx={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      position: "relative",
                      zIndex: 1,
                    }}
                  />
                </Box>
              </MotionBox>
            </Grid>

          </Grid>
        </Container>
      </Box>

      {/* SECTION 3: MISSION, VISION & VALUES */}
      <Box sx={{ py: { xs: 5, md: 6 } }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Chip
              label="Mission & Core"
              sx={{
                background: "rgba(50, 68, 230, 0.08)",
                color: "#3244e6",
                fontWeight: 700,
                fontSize: "0.85rem",
                borderRadius: "50px",
                mb: 2,
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontSize: { xs: "1.8rem", md: "2.8rem" },
                fontWeight: 650,
                lineHeight: 1.1,
                color: "#1e293b",
                letterSpacing: "-0.04em",
              }}
            >
              Our Foundation &{" "}
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(135deg, #1f1681ff 0%, #102e7aff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  display: "inline-block",
                }}
              >
                Core Beliefs
              </Box>
            </Typography>
          </Box>

          <Grid container spacing={4}>

            {/* Mission Card */}
            <Grid item xs={12} md={4}>
              <MotionCard
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(50, 68, 230, 0.08)" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                sx={{
                  height: "100%",
                  borderRadius: "20px",
                  border: "1px solid rgba(50, 68, 230, 0.08)",
                  background: "rgba(255, 255, 255, 0.7)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
                  p: 4,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ p: 0, display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <Avatar sx={{ bgcolor: "rgba(50, 68, 230, 0.08)", color: "#3244e6", width: 56, height: 56, mb: 3 }}>
                    <Target size={28} />
                  </Avatar>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: "#0f172a", mb: 2, fontFamily: "'DM Sans', sans-serif" }}>
                    Our Mission
                  </Typography>
                  <Typography sx={{ color: "#475569", lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>
                    "To provide transparent, efficient, and customer-centric financial solutions that empower individuals and businesses to achieve their goals."
                  </Typography>
                </CardContent>
              </MotionCard>
            </Grid>

            {/* Vision Card */}
            <Grid item xs={12} md={4}>
              <MotionCard
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(50, 68, 230, 0.08)" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                sx={{
                  height: "100%",
                  borderRadius: "20px",
                  border: "1px solid rgba(50, 68, 230, 0.08)",
                  background: "rgba(255, 255, 255, 0.7)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
                  p: 4,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ p: 0, display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <Avatar sx={{ bgcolor: "rgba(16, 185, 129, 0.08)", color: "#10b981", width: 56, height: 56, mb: 3 }}>
                    <Eye size={28} />
                  </Avatar>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: "#0f172a", mb: 2, fontFamily: "'DM Sans', sans-serif" }}>
                    Our Vision
                  </Typography>
                  <Typography sx={{ color: "#475569", lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>
                    "To become India's most trusted financial advisory and loan distribution platform."
                  </Typography>
                </CardContent>
              </MotionCard>
            </Grid>

            {/* Values Card */}
            <Grid item xs={12} md={4}>
              <MotionCard
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(50, 68, 230, 0.08)" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                sx={{
                  height: "100%",
                  borderRadius: "20px",
                  border: "1px solid rgba(50, 68, 230, 0.08)",
                  background: "rgba(255, 255, 255, 0.7)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
                  p: 4,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ p: 0, display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <Avatar sx={{ bgcolor: "rgba(249, 115, 22, 0.08)", color: "#f97316", width: 56, height: 56, mb: 3 }}>
                    <Award size={28} />
                  </Avatar>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: "#0f172a", mb: 2, fontFamily: "'DM Sans', sans-serif" }}>
                    Core Values
                  </Typography>

                  <Grid container spacing={1}>
                    {["Transparency", "Trust", "Integrity", "Customer Success", "Innovation", "Excellence"].map((val, idx) => (
                      <Grid item xs={6} key={idx}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "#3244e6" }} />
                          <Typography variant="body2" sx={{ fontWeight: 600, color: "#475569" }}>
                            {val}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </MotionCard>
            </Grid>

          </Grid>
        </Container>
      </Box>

      {/* SECTION 4: WHY CHOOSE F2 FINTECH */}
      <Box sx={{ py: { xs: 5, md: 6 }, bgcolor: "#f8fafc" }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Chip
              label="Why Choose Us"
              sx={{
                background: "rgba(50, 68, 230, 0.08)",
                color: "#3244e6",
                fontWeight: 700,
                fontSize: "0.85rem",
                borderRadius: "50px",
                mb: 2,
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontSize: { xs: "1.8rem", md: "2.8rem" },
                fontWeight: 650,
                lineHeight: 1.1,
                color: "#1e293b",
                letterSpacing: "-0.04em",
                mb: 2,
              }}
            >
              The F2 Fintech{" "}
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(135deg, #1f1681ff 0%, #102e7aff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  display: "inline-block",
                }}
              >
                Advantage
              </Box>
            </Typography>
            <Typography sx={{ color: "#64748b", maxWidth: "600px", mx: "auto" }}>
              We bring transparent lending solutions directly to you, combining wide lender access with end-to-end expertise.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              { title: "Fast Loan Processing", icon: <Clock size={24} />, desc: "Swift approvals and direct API submission with minimal turnaround time.", color: "#3244e6", bg: "rgba(50, 68, 230, 0.08)" },
              { title: "Multiple Banking Partners", icon: <Building2 size={24} />, desc: "Access to 25+ top banks and NBFCs, giving you a competitive choice.", color: "#10b981", bg: "rgba(16, 185, 129, 0.08)" },
              { title: "Competitive Interest Rates", icon: <Percent size={24} />, desc: "Compare and secure the lowest rates with transparency on charges.", color: "#f59e0b", bg: "rgba(245, 158, 11, 0.08)" },
              { title: "Dedicated Relationship Managers", icon: <UserCheck size={24} />, desc: "Personal managers to coordinate paperwork and guide you directly.", color: "#ec4899", bg: "rgba(236, 72, 153, 0.08)" },
              { title: "End-to-End Support", icon: <Briefcase size={24} />, desc: "Comprehensive care, covering checkups, approvals, and final disbursal.", color: "#8b5cf6", bg: "rgba(139, 92, 246, 0.08)" },
              { title: "Transparent Process", icon: <ShieldCheck size={24} />, desc: "Clear parameters, zero hidden fees, and constant WhatsApp updates.", color: "#ef4444", bg: "rgba(239, 68, 68, 0.08)" },
            ].map((feature, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <MotionCard
                  whileHover={{ y: -6 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  sx={{
                    height: "100%",
                    borderRadius: "16px",
                    p: 4,
                    border: "1px solid rgba(0, 0, 0, 0.05)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.01)",
                    background: "#ffffff",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Avatar sx={{ bgcolor: feature.bg, color: feature.color, width: 48, height: 48, mb: 3 }}>
                    {feature.icon}
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: "#0f172a", mb: 1.5, fontFamily: "'DM Sans', sans-serif" }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#64748b", lineHeight: 1.6 }}>
                    {feature.desc}
                  </Typography>
                </MotionCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* SECTION 5: JOURNEY TIMELINE */}
      <Box sx={{ py: { xs: 5, md: 6 } }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Chip
              label="Our Journey"
              sx={{
                background: "rgba(50, 68, 230, 0.08)",
                color: "#3244e6",
                fontWeight: 700,
                fontSize: "0.85rem",
                borderRadius: "50px",
                mb: 2,
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontSize: { xs: "1.8rem", md: "2.8rem" },
                fontWeight: 650,
                lineHeight: 1.1,
                color: "#1e293b",
                letterSpacing: "-0.04em",
              }}
            >
              Milestones of{" "}
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(135deg, #1f1681ff 0%, #102e7aff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  display: "inline-block",
                }}
              >
                Growth
              </Box>
            </Typography>
          </Box>

          {/* Timeline Container */}
          <Box sx={{ position: "relative", maxWidth: "900px", mx: "auto", px: 2 }}>
            {/* Central Line */}
            <Box
              sx={{
                position: "absolute",
                left: { xs: "20px", md: "50%" },
                top: 0,
                bottom: 0,
                width: "4px",
                background: "linear-gradient(to bottom, rgba(50, 68, 230, 0.1), #3244e6, rgba(50, 68, 230, 0.1))",
                transform: "translateX(-50%)",
                zIndex: 0,
              }}
            />

            {[
              { year: "2022", title: "Company Founded", desc: "F2 Fintech launches operations with the focus to simplify the loan process for professionals." },
              { year: "2023", title: "1,000+ Customers Served", desc: "Attained first key operational milestone, simplifying documentation workflows." },
              { year: "2024", title: "Expanded Loan Portfolio", desc: "Introduced specialized lines for doctors, unsecured business loans, and MSME options." },
              { year: "2025", title: "Digital Loan Platform Launch", desc: "Unveiled our paperless eligibility check platform, directly integrating bank APIs." },
              {
                year: "2026",
                title: "Major growth milestone",
                desc: "F2 Fintech made its national debut on Shark Tank India and accelerated revenue significantly.",
                featured: "Featured on Shark Tank India",
                stats: [
                  { label: "Revenue before", value: "₹3 Cr" },
                  { label: "Revenue now", value: "₹5.2 Cr" },
                  { label: "Growth", value: "+73%" }
                ]
              },
              {
                year: "What's next",
                title: "The next chapter",
                desc: "Exciting milestones are in the pipeline. Stay tuned for what F2 Fintech is building next.",
                featured: "Coming soon",
                featuredIcon: "🚀",
                isDashed: true
              },
            ].map((milestone, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <MotionGrid
                  container
                  key={idx}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  sx={{
                    mb: 6,
                    flexDirection: { xs: "row", md: isEven ? "row" : "row-reverse" },
                    position: "relative",
                  }}
                >
                  {/* Left or Right Content Card */}
                  <Grid item xs={12} md={5.5} sx={{ display: "flex", justifyContent: { xs: "flex-start", md: isEven ? "flex-end" : "flex-start" }, pl: { xs: 5, md: 0 } }}>
                    <Box
                      sx={{
                        bgcolor: "#ffffff",
                        p: 3,
                        borderRadius: "16px",
                        border: milestone.isDashed ? "2.5px dashed rgba(50, 68, 230, 0.45)" : "1px solid rgba(50, 68, 230, 0.08)",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.02)",
                        position: "relative",
                        maxWidth: "400px",
                        width: "100%",
                      }}
                    >
                      {milestone.featured && (
                        <Box sx={{ display: "flex", mb: 1.5 }}>
                          <Box
                            sx={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 0.5,
                              color: "#3244e6",
                              bgcolor: "rgba(50, 68, 230, 0.06)",
                              px: 1.5,
                              py: 0.5,
                              borderRadius: "20px",
                              fontWeight: 700,
                              fontSize: "0.75rem",
                            }}
                          >
                            {milestone.featuredIcon || "⭐"} {milestone.featured}
                          </Box>
                        </Box>
                      )}
                      <Typography variant="h6" sx={{ fontWeight: 800, color: "#3244e6", mb: 1, fontFamily: "'DM Sans', sans-serif" }}>
                        {milestone.year}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#0f172a", mb: 1 }}>
                        {milestone.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#64748b", lineHeight: 1.6, mb: milestone.stats ? 2 : 0 }}>
                        {milestone.desc}
                      </Typography>
                      {milestone.stats && (
                        <Grid container spacing={1.5} sx={{ mt: 1 }}>
                          {milestone.stats.map((stat, sIdx) => (
                            <Grid item xs={4} key={sIdx}>
                              <Box
                                sx={{
                                  bgcolor: "rgba(50, 68, 230, 0.05)",
                                  p: 1.5,
                                  borderRadius: "12px",
                                  textAlign: "center",
                                  height: "100%",
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Typography
                                  variant="body1"
                                  sx={{
                                    fontWeight: 800,
                                    color: "#3244e6",
                                    fontSize: { xs: "0.9rem", sm: "1.05rem" },
                                  }}
                                >
                                  {stat.value}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  sx={{
                                    color: "#5c6ae9",
                                    fontWeight: 600,
                                    fontSize: { xs: "0.6rem", sm: "0.68rem" },
                                    lineHeight: 1.2,
                                    mt: 0.5,
                                  }}
                                >
                                  {stat.label}
                                </Typography>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      )}
                    </Box>
                  </Grid>

                  {/* Spacer Column */}
                  <Grid item xs={0} md={1} sx={{ display: { xs: "none", md: "block" } }} />

                  {/* Node Dot */}
                  <Box
                    sx={{
                      position: "absolute",
                      left: { xs: "20px", md: "50%" },
                      top: "24px",
                      width: "20px",
                      height: "20px",
                      bgcolor: "#ffffff",
                      border: "4px solid #3244e6",
                      borderRadius: "50%",
                      transform: "translateX(-50%)",
                      zIndex: 1,
                      boxShadow: "0 0 10px rgba(50, 68, 230, 0.4)",
                    }}
                  />
                </MotionGrid>
              );
            })}
          </Box>
        </Container>
      </Box>

      {/* SECTION 6: ACHIEVEMENT COUNTERS */}
      <Box
        sx={{
          py: { xs: 5, md: 6 },
          background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
          color: "#ffffff",
          position: "relative",
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={4} justifyContent="center" sx={{ textAlign: "center" }}>
            {[
              { value: "11000", prefix: "", suffix: "+", label: "Happy Clients" },
              { value: "30000", prefix: "", suffix: "+", label: "Applications" },
              { value: "40", prefix: "", suffix: "+", label: "Lenders" },
              { value: "1100", prefix: "", suffix: "+ Cr", label: "Loans Disbursed" },
            ].map((stat, idx) => (
              <Grid item xs={6} md={3} key={idx}>
                <MotionBox
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  sx={{ p: 2 }}
                >
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: { xs: "2.2rem", sm: "3rem", md: "4rem" },
                      fontWeight: 800,
                      color: "#ffffff",
                      fontFamily: "'DM Sans', sans-serif",
                      mb: 1,
                    }}
                  >
                    <CountUp to={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: "rgba(255, 255, 255, 0.7)",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      fontSize: { xs: "0.75rem", sm: "0.9rem" },
                    }}
                  >
                    {stat.label}
                  </Typography>
                </MotionBox>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* National Footprint / India Map Section */}
      <IndiaPresence />

      {/* SECTION 7: MEET OUR FOUNDERS - Moz-style alternating layout */}
      <Box sx={{ py: { xs: 5, md: 7 }, bgcolor: "#f0f4f0" }}>

        {/* Section Header */}
        <Box sx={{ textAlign: "center", mb: { xs: 5, md: 7 } }}>
          <Chip
            label="Leadership"
            sx={{
              background: "rgba(50, 68, 230, 0.08)",
              color: "#3244e6",
              fontWeight: 700,
              fontSize: "0.85rem",
              borderRadius: "50px",
              mb: 2,
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontSize: { xs: "1.8rem", md: "2.8rem" },
              fontWeight: 650,
              lineHeight: 1.1,
              color: "#1e293b",
              letterSpacing: "-0.04em",
            }}
          >
            Meet our{" "}
            <Box
              component="span"
              sx={{
                background: "linear-gradient(135deg, #1f1681ff 0%, #102e7aff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                display: "inline-block",
              }}
            >
              Founders
            </Box>
          </Typography>
        </Box>

        {/* Harpreet Singh - image LEFT, text RIGHT */}
        <MotionBox
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "center", md: "flex-start" },
            width: "100%",
            px: { xs: 2, sm: 5, md: 10, lg: 14 },
            py: { xs: 4, md: 6 },
            gap: { xs: 4, md: 8 },
          }}
        >
          {/* Photo */}
          <Box
            sx={{
              flexShrink: 0,
              width: { xs: "100%", sm: "420px", md: "480px", lg: "540px" },
              height: { xs: "320px", sm: "440px", md: "520px" },
              borderRadius: "6px",
              overflow: "hidden",
              boxShadow: "0 6px 32px rgba(0,0,0,0.12)",
            }}
          >
            <Box
              component="img"
              src="/HarpreetSingh.webp"
              alt="Harpreet Singh - Founder & CEO"
              loading="lazy"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                transition: "transform 0.7s ease",
                "&:hover": { transform: "scale(1.04)" },
              }}
            />
          </Box>

          {/* Text */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* Name + Role - top */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3, flexWrap: "wrap" }}>
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "1.3rem", md: "1.6rem" },
                  color: "#172b4d",
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: "-0.02em",
                }}
              >
                Harpreet Singh
              </Typography>
              <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "#94a3b8" }} />
              <Typography
                sx={{
                  color: "#3244e6",
                  fontWeight: 700,
                  fontSize: { xs: "1rem", md: "1.15rem" },
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Founder & Chief Executive Officer
              </Typography>
            </Box>
            <Box
              sx={{
                maxHeight: { xs: "280px", sm: "360px", md: "400px" },
                overflowY: "auto",
                pr: 1.5,
                mb: 3,
                // Custom elegant scrollbar styling
                "&::-webkit-scrollbar": {
                  width: "5px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "rgba(0, 0, 0, 0.03)",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "rgba(50, 68, 230, 0.25)",
                  borderRadius: "10px",
                  "&:hover": {
                    background: "rgba(50, 68, 230, 0.45)",
                  },
                },
              }}
            >
              <Typography
                sx={{
                  color: "#3d4b5c",
                  fontSize: { xs: "0.97rem", md: "1.05rem" },
                  lineHeight: 1.75,
                  fontFamily: "'DM Sans', sans-serif",
                  mb: 3,
                }}
              >
                Meet Harpreet Singh - a man who doesn't just talk about the future of finance. He is building it. As Founder & CEO of F2 Fintech, he is at the forefront of innovation in financial services - helping businesses and individuals seize the opportunities of the digital economy. And through Nexus Founders, the platform he created, he is doing something even more powerful: building the ecosystem that will produce the next generation of entrepreneurs.
              </Typography>
              <Typography
                sx={{
                  color: "#3d4b5c",
                  fontSize: { xs: "0.97rem", md: "1.05rem" },
                  lineHeight: 1.75,
                  fontFamily: "'DM Sans', sans-serif",
                  mb: 3,
                }}
              >
                An alumnus of ISB&M Pune and IIM Indore, Harpreet carries both the rigour of premier institutions and the grit of a practitioner. Today, he gives back as Visiting Faculty of Finance at IIFT - walking into classrooms not with theory alone, but with the real stories of what it takes to build in the real world.
              </Typography>
              <Typography
                sx={{
                  color: "#3d4b5c",
                  fontSize: { xs: "0.97rem", md: "1.05rem" },
                  lineHeight: 1.75,
                  fontFamily: "'DM Sans', sans-serif",
                  mb: 3,
                }}
              >
                His journey has taken him to some remarkable stages. His work in entrepreneurship and innovation has been recognized through engagements with the G20. And if you've watched Shark Tank India Season 5 - you may have already seen him in action.
              </Typography>
              <Typography
                sx={{
                  color: "#3d4b5c",
                  fontSize: { xs: "0.97rem", md: "1.05rem" },
                  lineHeight: 1.75,
                  fontFamily: "'DM Sans', sans-serif",
                  mb: 0,
                }}
              >
                But here's what truly drives him: the belief that the best investment you can make is in people. Harpreet is deeply passionate about mentoring founders, students, and emerging leaders - people just like you - to build businesses that matter and create change that lasts.
              </Typography>
            </Box>
            {/* Chips */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "8px", mt: 2 }}>
              <Chip
                label="Fintech Innovator"
                size="small"
                sx={{
                  backgroundColor: "rgba(50, 68, 230, 0.1)",
                  color: "#3244e6",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  borderRadius: "50px",
                }}
              />
              <Chip
                label="Entrepreneur"
                size="small"
                sx={{
                  backgroundColor: "rgba(16, 185, 129, 0.1)",
                  color: "#10b981",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  borderRadius: "50px",
                }}
              />
            </Box>
          </Box>
        </MotionBox>

        {/* Divider */}
        <Box sx={{ width: "100%", px: { xs: 2, sm: 5, md: 10, lg: 14 } }}>
          <Box sx={{ borderTop: "1px solid rgba(0,0,0,0.08)", my: 0 }} />
        </Box>

        {/* Abhinav Awal - image RIGHT, text LEFT */}
        <MotionBox
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, delay: 0.1 }}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row-reverse" },
            alignItems: "center",
            width: "100%",
            px: { xs: 2, sm: 5, md: 10, lg: 14 },
            py: { xs: 4, md: 6 },
            gap: { xs: 4, md: 8 },
          }}
        >
          {/* Photo */}
          <Box
            sx={{
              flexShrink: 0,
              width: { xs: "100%", sm: "420px", md: "480px", lg: "540px" },
              height: { xs: "320px", sm: "440px", md: "520px" },
              borderRadius: "6px",
              overflow: "hidden",
              boxShadow: "0 6px 32px rgba(0,0,0,0.12)",
            }}
          >
            <Box
              component="img"
              src="/abhinavimg.webp"
              alt="Abhinav Awal - Co-Founder & MD"
              loading="lazy"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                transition: "transform 0.7s ease",
                "&:hover": { transform: "scale(1.04)" },
              }}
            />
          </Box>

          {/* Text */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* Name + Role - top */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3, flexWrap: "wrap" }}>
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "1.3rem", md: "1.6rem" },
                  color: "#172b4d",
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: "-0.02em",
                }}
              >
                Abhinav Awal
              </Typography>
              <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "#94a3b8" }} />
              <Typography
                sx={{
                  color: "#3244e6",
                  fontWeight: 700,
                  fontSize: { xs: "1rem", md: "1.15rem" },
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Co-Founder & Managing Director
              </Typography>
            </Box>
            <Typography
              sx={{
                color: "#3d4b5c",
                fontSize: { xs: "0.97rem", md: "1.05rem" },
                lineHeight: 1.75,
                fontFamily: "'DM Sans', sans-serif",
                mb: 3,
              }}
            >
              Abhinav's journey from a business administration graduate to co-founder of F2 Fintech is a testament to his adaptability and keen business acumen. With a Master's in Business Administration, complemented by an intensive Start-up Bootcamp at IIT Delhi, Abhinav brings a combination of academic excellence and practical expertise to the role.
            </Typography>
            <Typography
              sx={{
                color: "#3d4b5c",
                fontSize: { xs: "0.97rem", md: "1.05rem" },
                lineHeight: 1.75,
                fontFamily: "'DM Sans', sans-serif",
                mb: 3,
              }}
            >
              His transition from working in his family's business to establishing a fintech venture reflects his entrepreneurial commitment and commitment to building India's most trusted financial advisory platform.
            </Typography>
            {/* Chips */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "8px", mt: 2 }}>
              <Chip
                label="MBA Graduate"
                size="small"
                sx={{
                  backgroundColor: "rgba(50, 68, 230, 0.1)",
                  color: "#3244e6",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  borderRadius: "50px",
                }}
              />
              <Chip
                label="Entrepreneur"
                size="small"
                sx={{
                  backgroundColor: "rgba(16, 185, 129, 0.1)",
                  color: "#10b981",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  borderRadius: "50px",
                }}
              />
            </Box>
          </Box>
        </MotionBox>

      </Box>

      {/* SECTION 9: BANKING PARTNERS */}
      <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: "#ffffff", overflow: "hidden" }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Chip
              label="Our Network"
              sx={{
                background: "rgba(50, 68, 230, 0.08)",
                color: "#3244e6",
                fontWeight: 700,
                fontSize: "0.85rem",
                borderRadius: "50px",
                mb: 2,
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontSize: { xs: "1.8rem", md: "2.8rem" },
                fontWeight: 650,
                lineHeight: 1.1,
                color: "#1e293b",
                letterSpacing: "-0.04em",
              }}
            >
              Our 40+ Banking &{" "}
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(135deg, #1f1681ff 0%, #102e7aff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  display: "inline-block",
                }}
              >
                Financial Partners
              </Box>
            </Typography>
          </Box>
        </Container>

        {/* Keyframes animation definitions injected into the component */}
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes scroll-left {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
          }
          @keyframes scroll-right {
            0% { transform: translate3d(-50%, 0, 0); }
            100% { transform: translate3d(0, 0, 0); }
          }
        `}} />

        {/* Marquee Wrapper */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            gap: { xs: 2.5, md: 4 },
          }}
        >
          {/* Row 1: Right to Left */}
          <Box sx={{ overflow: "hidden", width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                width: "max-content",
                animation: "scroll-left 40s linear infinite",
                "&:hover": {
                  animationPlayState: "paused",
                },
              }}
            >
              {row1.map((partner, idx) => (
                <MotionCard
                  key={`row1-${idx}`}
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.05)" }}
                  sx={{
                    width: { xs: 180, md: 240 },
                    height: { xs: 110, md: 140 },
                    flexShrink: 0,
                    marginRight: { xs: "16px", md: "24px" },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "16px",
                    border: "1.5px solid #f1f5f9",
                    bgcolor: "#ffffff",
                    p: 1.5,
                    boxShadow: "none",
                    cursor: "pointer",
                    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                  }}
                >
                  {partner.logo ? (
                    <Box
                      component="img"
                      src={partner.logo}
                      alt={partner.name}
                      sx={{
                        width: "100%",
                        height: "90px",
                        objectFit: "contain",
                        objectPosition: "center",
                        opacity: 0.92,
                        transition: "all 0.3s ease",
                      }}
                    />
                  ) : (
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 700,
                        color: "#94a3b8",
                        textAlign: "center",
                        fontSize: "0.9rem",
                      }}
                    >
                      {partner.name}
                    </Typography>
                  )}
                </MotionCard>
              ))}
            </Box>
          </Box>

          {/* Row 2: Left to Right */}
          <Box sx={{ overflow: "hidden", width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                width: "max-content",
                animation: "scroll-right 40s linear infinite",
                "&:hover": {
                  animationPlayState: "paused",
                },
              }}
            >
              {row2.map((partner, idx) => (
                <MotionCard
                  key={`row2-${idx}`}
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.05)" }}
                  sx={{
                    width: { xs: 180, md: 240 },
                    height: { xs: 110, md: 140 },
                    flexShrink: 0,
                    marginRight: { xs: "16px", md: "24px" },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "16px",
                    border: "1.5px solid #f1f5f9",
                    bgcolor: "#ffffff",
                    p: 1.5,
                    boxShadow: "none",
                    cursor: "pointer",
                    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                  }}
                >
                  {partner.logo ? (
                    <Box
                      component="img"
                      src={partner.logo}
                      alt={partner.name}
                      sx={{
                        width: "100%",
                        height: "90px",
                        objectFit: "contain",
                        objectPosition: "center",
                        opacity: 0.92,
                        transition: "all 0.3s ease",
                      }}
                    />
                  ) : (
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 700,
                        color: "#94a3b8",
                        textAlign: "center",
                        fontSize: "0.9rem",
                      }}
                    >
                      {partner.name}
                    </Typography>
                  )}
                </MotionCard>
              ))}
            </Box>
          </Box>

          {/* Row 3: Right to Left */}
          <Box sx={{ overflow: "hidden", width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                width: "max-content",
                animation: "scroll-left 40s linear infinite",
                "&:hover": {
                  animationPlayState: "paused",
                },
              }}
            >
              {row3.map((partner, idx) => (
                <MotionCard
                  key={`row3-${idx}`}
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.05)" }}
                  sx={{
                    width: { xs: 180, md: 240 },
                    height: { xs: 110, md: 140 },
                    flexShrink: 0,
                    marginRight: { xs: "16px", md: "24px" },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "16px",
                    border: "1.5px solid #f1f5f9",
                    bgcolor: "#ffffff",
                    p: 1.5,
                    boxShadow: "none",
                    cursor: "pointer",
                    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                  }}
                >
                  {partner.logo ? (
                    <Box
                      component="img"
                      src={partner.logo}
                      alt={partner.name}
                      sx={{
                        width: "100%",
                        height: "90px",
                        objectFit: "contain",
                        objectPosition: "center",
                        opacity: 0.92,
                        transition: "all 0.3s ease",
                      }}
                    />
                  ) : (
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 700,
                        color: "#94a3b8",
                        textAlign: "center",
                        fontSize: "0.9rem",
                      }}
                    >
                      {partner.name}
                    </Typography>
                  )}
                </MotionCard>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>


      {/* SECTION 11: GALLERY - original design */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 10 } }}>
        <Box sx={{ textAlign: "center", mb: { xs: 5, md: 7 } }}>
          <Chip
            label="PORTFOLIO"
            sx={{
              background: "rgba(50, 68, 230, 0.08)",
              color: "#3244e6",
              fontWeight: 700,
              fontSize: "0.85rem",
              borderRadius: "50px",
              mb: 2,
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontSize: { xs: "1.8rem", md: "2.8rem" },
              fontWeight: 650,
              lineHeight: 1.1,
              color: "#1e293b",
              letterSpacing: "-0.04em",
            }}
          >
            Check our latest{" "}
            <Box
              component="span"
              sx={{
                background: "linear-gradient(135deg, #1f1681ff 0%, #102e7aff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                display: "inline-block",
              }}
            >
              Work
            </Box>
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 6,
            gap: 2,
            flexWrap: "wrap",
            px: 2,
          }}
        >
          {galleryYears.map((year) => (
            <YearButton
              style={{
                backgroundColor: theme.palette.secondary.main,
                color: selectedYear === year ? "#000000" : "#ffffff",
                fontFamily: "'DM Sans', sans-serif",
                borderRadius: "20px",
                transition: "all 0.3s ease",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
              key={year}
              onClick={() => setSelectedYear(year)}
            >
              {year}
            </YearButton>
          ))}
        </Box>

        <Grid container spacing={4}>
          {portfolioFilter.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <ImageCard
                sx={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  sx={{
                    objectPosition: item.position || "center center",
                    transition: "transform 0.3s ease",
                    "&:hover": { transform: "scale(1.1)" },
                  }}
                />
                <ImageOverlay
                  className="overlay"
                  sx={{
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    "&:hover": { opacity: 1 },
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: "#ffffff",
                      fontSize: "1.5rem",
                      fontWeight: "600",
                    }}
                    variant="h6"
                    component="div"
                    align="center"
                  >
                    {item.title}
                  </Typography>
                </ImageOverlay>
              </ImageCard>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* SECTION 12: FINAL CTA */}
      <Box sx={{ py: { xs: 5, md: 6 }, bgcolor: "#ffffff" }}>
        <Container maxWidth="lg">
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            sx={{
              p: { xs: 6, md: 10 },
              borderRadius: "32px",
              background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #3244e6 100%)",
              color: "#ffffff",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 30px 60px rgba(50, 68, 230, 0.2)",
            }}
          >
            {/* Background elements */}
            <Box
              sx={{
                position: "absolute",
                top: "-50%",
                left: "-50%",
                width: "200%",
                height: "200%",
                background: "radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 60%)",
                pointerEvents: "none",
              }}
            />

            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", md: "3rem" },
                fontWeight: 800,
                color: "#ffffff",
                mb: 2,
                fontFamily: "'DM Sans', sans-serif",
                position: "relative",
                zIndex: 1,
              }}
            >
              Ready to Get the Right Loan Solution?
            </Typography>

            <Typography
              sx={{
                fontSize: "1.1rem",
                color: "rgba(255, 255, 255, 0.8)",
                mb: 6,
                maxWidth: "600px",
                mx: "auto",
                fontFamily: "'DM Sans', sans-serif",
                position: "relative",
                zIndex: 1,
              }}
            >
              Connect with our experts today and discover financing options tailored to your needs.
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 2.5, position: "relative", zIndex: 1 }}>
              <Button
                variant="contained"
                onClick={() => navigate("/application-form")}
                sx={{
                  backgroundColor: "#ffffff",
                  color: "#3244e6",
                  fontWeight: 700,
                  fontSize: "1rem",
                  px: 5,
                  py: 1.8,
                  borderRadius: "50px",
                  textTransform: "none",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#f8fafc",
                    transform: "translateY(-2px)",
                    boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
                  },
                }}
              >
                Apply for a Loan
              </Button>
              {/* <Button
                variant="outlined"
                onClick={() => navigate("/get-in-touch")}
                sx={{
                  borderColor: "rgba(255, 255, 255, 0.4)",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "1rem",
                  px: 5,
                  py: 1.8,
                  borderRadius: "50px",
                  textTransform: "none",
                  borderWidth: "1.5px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "#ffffff",
                    borderWidth: "1.5px",
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Talk to an Expert
              </Button> */}
            </Box>
          </MotionBox>
        </Container>
      </Box>

    </Box>
  );
}
