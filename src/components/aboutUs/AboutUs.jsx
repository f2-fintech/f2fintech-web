"use client";
import { useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  CardContent,
  Card,
  CardMedia,
  Button,
  Chip,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import SpotlightText from "./SpotlightText";
import PlainTextSection from "./PlainTextSection";


const ImageCard = styled(Card)(({ theme }) => ({
  position: "relative",
  height: "300px",
  cursor: "pointer",
  "&:hover .overlay": {
    opacity: 1,
  },
}));

const ImageOverlay = styled(Box)(({ theme }) => ({
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
    backgroundColor: theme.palette.tertiary.main,
    color: "white",
  },
}));

// Sample data
const portfolioItems = [
  {
    id: 10,
    year: "2025",
    image: "/abt2025-1.jpg",
  },
  {
    id: 11,
    year: "2025",
    image: "/abt2025-2.jpg",
  },
  {
    id: 13,
    year: "2025",
    image: "/abt2025-4.jpg",
  },
  {
    id: 14,
    year: "2025",
    image: "/abt2025-5.jpg",
  },
  {
    id: 15,
    year: "2025",
    image: "/abt2025-6.jpg",
  },
  {
    id: 16,
    year: "2025",
    image: "/abt2025-7.jpg",
  },
  {
    id: 17,
    year: "2025",
    image: "/abt2025-8.jpg",
  },

  {
    id: 19,
    year: "2025",
    image: "/abt2025-9.jpg",
  },
  // {
  //   id: 20,
  //   year: "2025",
  //   image: "/abt2025-10.jpg",
  // },
  {
    id: 21,
    year: "2025",
    image: "/abt2025-11.jpg",
  },
  {
    id: 22,
    year: "2025",
    image: "/abt2025-12.jpg",
  },
  {
    id: 23,
    year: "2025",
    image: "/abt2025-13.jpg",
  },
  {
    id: 24,
    year: "2025",
    image: "/abt2025-14.jpg",
  },
  {
    id: 25,
    year: "2025",
    image: "/abt2025-15.jpg",
  },
  {
    id: 18,
    year: "2024",
    image: "/abt-2024.jpg",
  },
  {
    id: 4,
    year: "2023",
    title: "WOMEN'S DAY",
    image: "/abt5.jpg",
  },
  {
    id: 5,
    year: "2023",
    title: "HOLI CELEBRATION",
    image: "/abt2.jpg",
  },
  {
    id: 6,
    year: "2023",
    title: "TEAM CELEBRATION",
    image: "/abt9.jpg",
  },
  {
    id: 7,
    year: "2022",
    title: "BLIND EMPOWERMENT",
    image: "/abt4.jpeg",
  },
  {
    id: 8,
    year: "2022",
    title: "TEAM BUILDING",
    image: "/abt7.jpeg",
  },
  {
    id: 9,
    year: "2022",
    title: "ANNUAL MEETING",
    image: "/abt8.jpeg",
  },
  {
    id: 1,
    year: "2021",
    title: "INDEPENDENCE DAY",
    image: "/abt6.jpg",
  },
  {
    id: 2,
    year: "2021",
    title: "REPUBLIC DAY",
    image: "/abt3.jpeg",
  },
  {
    id: 3,
    year: "2021",

    title: "GRAND OPENING",
    image: "/abt1.jpeg",
  },
];

const years = ["2025", "2024", "2023", "2022", "2021"];

export default function AboutUsPage() {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [inView, setInView] = useState(false);
  const boxRef = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    if (boxRef.current) {
      observer.observe(boxRef.current);
    }
    return () => {
      if (boxRef.current) observer.unobserve(boxRef.current);
    };
  }, []);
  const blogPosts = [
    {
      id: 1,
      title: "A guide to acquiring loans for non-listed companies",
      date: "Sat, March 20",
      image: "/loan11.webp",
      link: "#",
    },
    {
      id: 2,
      title: "keep in mind while applying for a personal loan",
      date: "Sat, March 20",
      image: "/loan2.jpg",
      link: "#",
    },
    {
      id: 3,
      title: "How To Apply For A  Personal Loan these step ",
      date: "Sat, March 20",
      image: "/loan1.webp",
      link: "#",
    },
  ];
  const awards = [
    {
      title: "Bajaj Finserv Award",
      image: "/awardceremony.jpg",
      description:
        "Receiving the esteemed Bajaj Finserv Award marks a pinnacle moment in F2 Fintech's journey, illuminating our path.",
    },
    {
      title: "Entrepreneur of the Year",
      image: "/enterpreneur.jpg",
      description:
        "October 15, 2022,honored with the prestigious 'Entrepreneur of the Year (Financial Service)' award at the MSME India Business Awards.",
    },
    {
      title: "MSME Award",
      image: "/award(2).jpg",
      description:
        "Empowering F2 Fintech to innovate, bridging gap between financial services and cutting-edge technology, earning us the prestigious MSME Award.",
    },
  ];

  const portfolioFilter =
    selectedYear === "2025"
      ? portfolioItems
      : portfolioItems.filter((item) => item.year === selectedYear);
  const isIpadPro = useMediaQuery(
    "only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (-webkit-min-device-pixel-ratio: 2)"
  );
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const showSpotlight = isDesktop && !isIpadPro;

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, height: "100%" }}>
      {/* Main Content */}
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          minHeight: "100vh",
        }}
      >
        {/* Navigation Bar Placeholder */}
        <Container maxWidth="xl" sx={{ py: { xs: 4, md: 10 } }}>
          {/* Hero Section */}
          <Grid
            container
            spacing={{ xs: 6, md: 10 }}
            sx={{ mb: { xs: 3, md: 4 } }}
            alignItems="center"
          >
            {/* Left Content */}
            <Grid item xs={12} lg={6}>
              <Box sx={{ pr: { lg: 6 } }}>
                {/* Category Badge */}
                <Chip
                  label="Financial Technology"
                  sx={{
                    background: "linear-gradient(135deg, #3244e6 0%, #1d4ed8 100%)",
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: "0.85rem",
                    fontFamily: "'Poppins', sans-serif",
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

                {/* Main Heading */}
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "2.5rem", sm: "3rem", md: "4rem" },
                    fontWeight: 800,
                    lineHeight: 1.1,
                    color: "#172b4d",
                    mb: 3,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  Your trusted platform to compare and choose the
                  <Box
                    component="span"
                    sx={{
                      color: "#3244e6",
                      ml: { xs: 0, sm: 1.5 },
                      display: { xs: "block", sm: "inline-block" }
                    }}
                  >
                    right financial products
                  </Box>
                </Typography>

                {/* Subtitle */}
                <Typography
                  sx={{
                    fontSize: { xs: "1.1rem", md: "1.25rem" },
                    lineHeight: 1.6,
                    color: "#5e6c84",
                    mb: 4,
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  <strong>Delegate</strong> your financial worries to us and
                  focus on growing your core business.
                </Typography>

                {/* Feature Pills */}
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 4 }}>
                  {[
                    "Quick Disbursal",
                    "Paperless Process",
                    "Instant Eligibility Check",
                  ].map((feature) => (
                    <Chip
                      key={feature}
                      label={feature}
                      sx={{
                        fontWeight: 600,
                        fontSize: "0.875rem",
                        fontFamily: "'Poppins', sans-serif",
                        borderRadius: "50px",
                        px: 1,
                        height: "38px",
                        backgroundColor: "rgba(50, 68, 230, 0.04)",
                        color: "#3244e6",
                        border: "1.5px solid rgba(50, 68, 230, 0.15)",
                        cursor: "default",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: "rgba(50, 68, 230, 0.08)",
                          borderColor: "#3244e6",
                          transform: "translateY(-2px)",
                          boxShadow: "0 4px 12px rgba(50, 68, 230, 0.1)",
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Grid>

            {/* Right Content - Image */}
            <Grid item xs={12} lg={6}>
              <Box
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
                    maxWidth: 500,
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
                    src="/about_graphic.png"
                    alt="F2 fintech Platform"
                    sx={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      position: "relative",
                      zIndex: 1,
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
        {/* Stats Section - Clean Blocks */}
        <Box
          sx={{
            borderRadius: "24px",
            p: { xs: 2, md: 4 },
            mb: 0
          }}
        >
          <Grid container spacing={{ xs: 1, sm: 2, md: 4 }}>
            {[
              { number: "11,000+", label: "Happy Clients", color: "#3244e6" },
              { number: "30,000+", label: "Applications", color: "#3244e6" },
              { number: "40+", label: "Lenders", color: "#3244e6" },
              { number: "1,100+ Cr", label: "Loans Disbursed", color: "#3244e6" },
            ].map((stat, index) => (
              <Grid item xs={3} key={index}>
                <Box
                  sx={{
                    textAlign: "center",
                    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    cursor: "pointer",
                    p: 2,
                    borderRadius: "16px",
                    "&:hover": {
                      transform: "scale(1.1) translateY(-5px)",
                      "& .stat-number": {
                        color: stat.color,
                        transform: "scale(1.05)",
                      },
                      "& .stat-label": {
                        color: "#172b4d",
                      }
                    },
                  }}
                >
                  <Typography
                    className="stat-number"
                    sx={{
                      fontSize: { xs: "1.1rem", sm: "1.5rem", md: "2.5rem" },
                      fontWeight: 800,
                      color: "#172b4d",
                      fontFamily: "'DM Sans', sans-serif",
                      lineHeight: 1,
                      mb: 0.5,
                      transition: "all 0.3s ease",
                    }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography
                    className="stat-label"
                    sx={{
                      fontSize: { xs: "0.55rem", sm: "0.75rem", md: "1rem" },
                      color: "#5e6c84",
                      fontWeight: 600,
                      fontFamily: "'Poppins', sans-serif",
                      textTransform: "uppercase",
                      letterSpacing: "0.02em",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <Box sx={{ py: { xs: 4, md: 10 } }}>
        <Container maxWidth="xl">
          <Typography
            variant="h2"
            sx={{
              color: "#172b4d",
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 800,
              fontFamily: "'DM Sans', sans-serif",
              textAlign: "center",
              mb: 6,
            }}
          >
            Who We
            <Box component="span" sx={{ color: "#3244e6", ml: 1.5 }}>
              Are
            </Box>
          </Typography>
          <Box
            sx={{
              maxWidth: "1400px",
              mx: "auto",
              px: {
                xs: "20px",
                sm: "30px",
                md: isIpadPro ? "40px" : "60px",
              }
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "1.1rem", md: "1.25rem" },
                lineHeight: 1.8,
                color: "#4a5568",
                fontFamily: "'Poppins', sans-serif",
                mb: 4,
                textAlign: "center",
              }}
            >
              F2 Fintech is a digital lending platform that simplifies access to financial solutions. We connect individuals and businesses with the right loan and insurance products through a seamless, technology driven process.
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "1.1rem", md: "1.25rem" },
                lineHeight: 1.8,
                color: "#4a5568",
                fontFamily: "'Poppins', sans-serif",
                mb: 4,
                textAlign: "center",
              }}
            >
              From selecting the right product to documentation and disbursal, we provide end to end support across the lending journey. Our platform integrates with leading banks and NBFCs to ensure fast, reliable, & transparent service.
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "1.1rem", md: "1.25rem" },
                lineHeight: 1.8,
                color: "#4a5568",
                fontFamily: "'Poppins', sans-serif",
                textAlign: "center",
              }}
            >
              At F2 Fintech, we focus on making finance efficient and tailored to every customer’s needs.
            </Typography>
          </Box>
        </Container>
      </Box>
      <Box sx={{ py: { xs: 4, md: 4 } }}>
        <Typography
          sx={{
            color: "#172b4d",
            textAlign: "center",
            fontSize: { xs: "2rem", md: "3rem" },
            fontWeight: 800,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Meet our{" "}
          <Box
            component="span"
            sx={{ color: "#3244e6", ml: 1, fontWeight: "800" }}
          >
            Founders
          </Box>
        </Typography>
      </Box>
      {/* Meet our founder */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto",
          padding: {
            xs: "20px",
            sm: "30px",
            md: isIpadPro ? "40px" : "60px",
          },
          paddingY: {
            xs: "10px",
            sm: "10px",
            md: "10px",
          },
          boxSizing: "border-box",
          display: "flex",
          flexDirection: {
            xs: "column",
            md: isIpadPro ? "column" : "row",
          },
          gap: {
            xs: "30px",
            sm: "40px",
            md: isIpadPro ? "40px" : "40px",
          },
          alignItems: "center",
          justifyContent: "center",
          borderRadius: { xs: 0, md: "24px" },
          marginY: {
            xs: "20px",
            md: isIpadPro ? "30px" : "40px",
          },
        }}
      >
        {/* Harpreet Singh Card */}
        <Card
          sx={{
            width: { xs: "100%", lg: "48%" },
            maxWidth: "600px",
            height: { xs: "auto", md: "500px" },
            backgroundColor: "white",
            borderRadius: "20px",
            overflow: "hidden",
            position: "relative",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            boxShadow:
              "0 4px 20px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.02)",
            transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            border: "1px solid rgba(0, 0, 0, 0.08)",
            "&:hover": {
              transform: "translateY(-10px)",
              boxShadow:
                "0 20px 40px rgba(0,0,0,0.08), 0 8px 16px rgba(0,0,0,0.04)",
              borderColor: theme.palette.secondary.main,
            },
          }}
        >
          {/* Image Container */}
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              width: { xs: "100%", md: "50%" },
              height: { xs: "240px", sm: "450px", md: "100%" },
              flexShrink: 0,
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "40%",
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 100%)",
                opacity: 0,
                transition: "opacity 0.3s ease",
              },
              "&:hover::after": {
                opacity: 1,
              },
            }}
          >
            <CardMedia
              component="img"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "36% top",
                transition: "transform 0.7s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
              image="/harpreetimg.jpg"
              alt="Harpreet Singh - Founder & CEO"
              loading="lazy"
              decoding="async"
            />
          </Box>

          {/* Content Container */}
          <CardContent
            sx={{
              padding: { xs: "20px", md: "28px" },
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              background:
                "linear-gradient(to bottom, #ffffff 0%, #fafbfc 100%)",
            }}
          >
            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
              <Typography
                variant="h3"
                sx={{
                  color: "#172b4d",
                  fontSize: { xs: "1.4rem", sm: "1.6rem", md: "1.7rem" },
                  fontWeight: "700",
                  fontFamily: "DM Sans, sans-serif",
                  marginBottom: "12px",
                  letterSpacing: "-0.02em",
                }}
              >
                Harpreet Singh
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  color: theme.palette.secondary.main,
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: "600",
                  fontSize: { xs: "0.85rem", sm: "0.9rem" },
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "24px",
                  lineHeight: 1.4,
                }}
              >
                Founder & Chief Executive Officer
              </Typography>
              <Box
                sx={{
                  maxHeight: { md: "270px" },
                  overflowY: "auto",
                  marginBottom: "32px",
                  pr: 0.5,
                  "&::-webkit-scrollbar": { width: "4px" },
                  "&::-webkit-scrollbar-track": { background: "transparent" },
                  "&::-webkit-scrollbar-thumb": {
                    background: "rgba(120,133,133,0.35)",
                    borderRadius: "4px",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    background: "rgba(120,133,133,0.6)",
                  },
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "#454747ff",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: "400",
                    lineHeight: 1.6,
                    fontSize: { xs: "0.8rem", sm: "0.8rem", md: "0.8rem" },
                  }}
                >
                  Mr. Harpreet Singh is the Founder and Chief Executive Officer of F2 Fintech and the Founder of the Nexus Founder Community. With over a decade of experience in financial services and fintech innovation, he is known for his strategic leadership and vision in building scalable financial ecosystems. Through F2 Fintech, he aims to create an open and collaborative financial marketplace that delivers simpler, faster, and more inclusive financial solutions. Mr. Singh has also held leadership roles at Financial Freedom and InsiderLab Fintech Pvt. Ltd., where he led major business transformation initiatives. He further strengthened his leadership and strategic expertise through advanced management studies at IIM Indore.
                </Typography>
              </Box>
            </Box>

            {/* Professional Highlights */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginTop: "auto",
              }}
            >
              <Chip
                label="Fintech Innovator"
                size="small"
                sx={{
                  backgroundColor: "rgba(50, 68, 230, 0.1)",
                  color: "#3244e6",
                  fontWeight: "600",
                  fontSize: "0.75rem",
                }}
              />
              <Chip
                label="Entrepreneur"
                size="small"
                sx={{
                  backgroundColor: "rgba(16, 185, 129, 0.1)",
                  color: "#10b981",
                  fontWeight: "600",
                  fontSize: "0.75rem",
                }}
              />
            </Box>
          </CardContent>
        </Card>

        {/* Abhinav Awal Card */}
        <Card
          sx={{
            width: { xs: "100%", lg: "48%" },
            maxWidth: "600px",
            height: { xs: "auto", md: "500px" },
            backgroundColor: "white",
            borderRadius: "20px",
            overflow: "hidden",
            position: "relative",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            boxShadow:
              "0 4px 20px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.02)",
            transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            border: "1px solid rgba(0, 0, 0, 0.08)",
            "&:hover": {
              transform: "translateY(-10px)",
              boxShadow:
                "0 20px 40px rgba(0,0,0,0.08), 0 8px 16px rgba(0,0,0,0.04)",
              borderColor: theme.palette.secondary.main,
            },
          }}
        >
          {/* Image Container */}
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              width: { xs: "100%", md: "50%" },
              height: { xs: "240px", sm: "450px", md: "100%" },
              flexShrink: 0,
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "40%",
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 100%)",
                opacity: 0,
                transition: "opacity 0.3s ease",
              },
              "&:hover::after": {
                opacity: 1,
              },
            }}
          >
            <CardMedia
              component="img"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "39% top",
                transition: "transform 0.7s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
              image="/abhinavimg.jpg"
              alt="Abhinav Awal - Co-Founder & MD"
              loading="lazy"
              decoding="async"
            />
          </Box>

          {/* Content Container */}
          <CardContent
            sx={{
              padding: { xs: "20px", md: "28px" },
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              background:
                "linear-gradient(to bottom, #ffffff 0%, #fafbfc 100%)",
            }}
          >
            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
              <Typography
                variant="h3"
                sx={{
                  color: "#172b4d",
                  fontSize: { xs: "1.4rem", sm: "1.6rem", md: "1.7rem" },
                  fontWeight: "700",
                  fontFamily: "DM Sans, sans-serif",
                  marginBottom: "12px",
                  letterSpacing: "-0.02em",
                }}
              >
                Abhinav Awal
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  color: theme.palette.secondary.main,
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: "600",
                  fontSize: { xs: "0.85rem", sm: "0.9rem" },
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "24px",
                  lineHeight: 1.4,
                }}
              >
                Co-Founder & Managing Director
              </Typography>
              <Box
                sx={{
                  maxHeight: { md: "270px" },
                  overflowY: "auto",
                  marginBottom: "32px",
                  pr: 0.5,
                  "&::-webkit-scrollbar": { width: "4px" },
                  "&::-webkit-scrollbar-track": { background: "transparent" },
                  "&::-webkit-scrollbar-thumb": {
                    background: "rgba(120,133,133,0.35)",
                    borderRadius: "4px",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    background: "rgba(120,133,133,0.6)",
                  },
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "#454747ff",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: "400",
                    lineHeight: 1.6,
                    fontSize: { xs: "0.8rem", sm: "0.8rem", md: "0.8rem" },
                  }}
                >
                  Abhinav's journey from a business administration graduate to a
                  co-founder of F2 Fintech is a testament to his adaptability and
                  keen business acumen. With a Master's in Business
                  Administration, complemented by an intensive Start-up Bootcamp
                  at IIT Delhi, Abhinav brings a blend of academic excellence and
                  practical expertise to the table. His transition from working in
                  his family's business to pioneering a start-up showcases his
                  entrepreneurial spirit and commitment to innovation.
                </Typography>
              </Box>
            </Box>

            {/* Professional Highlights */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginTop: "auto",
              }}
            >
              <Chip
                label="MBA Graduate"
                size="small"
                sx={{
                  backgroundColor: "rgba(50, 68, 230, 0.1)",
                  color: "#3244e6",
                  fontWeight: "600",
                  fontSize: "0.75rem",
                }}
              />
              <Chip
                label="Entrepreneur"
                size="small"
                sx={{
                  backgroundColor: "rgba(16, 185, 129, 0.1)",
                  color: "#10b981",
                  fontWeight: "600",
                  fontSize: "0.75rem",
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ py: { xs: 4, md: 10 }, px: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Typography
            variant="subtitle1"
            sx={{
              color: theme.palette.secondary.main,
              backgroundColor: `${theme.palette.secondary.main}15`,
              px: 3,
              py: 0.5,
              borderRadius: "20px",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.9rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "1px",
              border: `1px solid ${theme.palette.secondary.main}30`,
            }}
          >
            OUR VALUES
          </Typography>
        </Box>

        <Typography
          variant="h3"
          align="center"
          sx={{
            color: theme.palette.text.primary,
            mb: 6,
            fontSize: {
              md: "2.6vw",
              sm: "6vw",
              xs: "6vw",
            },
            fontWeight: "550",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Speak Volumes Through Every
          <Box component="span" sx={{ color: "#3244e6" }}>
            {" "}
            Award Captured{" "}
          </Box>
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "column", md: "row" },
            justifyContent: "center",
            alignItems: "center",
            gap: { xs: 4, sm: 4, md: 6 },
            width: "100%",
          }}
        >
          {awards.map((award, index) => (
            <Box key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "none",
                  width: { xs: "92vw", sm: "85vw", md: "20vw" },
                  alignItems: "center",
                  position: "relative",
                  overflow: "visible",
                  backgroundColor: "#f0f4ff",
                  borderRadius: "15px",
                  p: 1,
                  transition: { md: "transform 0.3s ease" },
                  "&:hover": {
                    transform: { md: "scale(1.15)" },
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={award.image}
                  alt={award.title}
                  sx={{
                    height: { xs: 280, sm: 450, md: 260 },
                    objectFit: "cover",
                    borderRadius: "15px",
                    objectPosition: "center top",
                  }}
                />
                <CardContent
                  sx={{
                    flexGrow: 1,
                    textAlign: "center",
                    px: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      color: "#3244e6",
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: {
                        xs: "3.5vw",
                        sm: "3vw",
                        md: "1.25vw",
                      },
                      mb: 2,
                    }}
                  >
                    {award.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.palette.text.primary,
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: "500",
                      lineHeight: 1.6,
                      fontSize: {
                        xs: "3vw",
                        sm: "2.8",
                        md: "1.1vw",
                      },
                    }}
                  >
                    {award.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 10 } }}>
        <Typography
          variant="h2"
          component="h1"
          align="center"
          gutterBottom
          sx={{
            mb: 4,
            mt: -6,
            color: "#172b4d",
            fontSize: { xs: "2rem", md: "3rem" },
            fontWeight: 800,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Check our latest{" "}
          <Box component="span" sx={{ color: "#3244e6" }}>work</Box>
        </Typography>

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
          {years.map((year) => (
            <YearButton
              style={{
                backgroundColor:
                  selectedYear === year
                    ? theme.palette.secondary.main
                    : theme.palette.secondary.main,
                color: selectedYear === year ? "#000000" : "#ffffff",
                fontFamily: "'DM Sans', sans-serif",
                borderRadius: "20px",
                padding: {
                  xs: "6px 16px",
                  sm: "8px 20px",
                },
                fontSize: {
                  xs: "0.875rem",
                  sm: "1rem",
                },
                transition: "all 0.3s ease",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                minWidth: {
                  xs: "70px",
                  sm: "auto",
                },
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 6px 8px rgba(0, 0, 0, 0.15)",
                },
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
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                />
                <ImageOverlay
                  className="overlay"
                  sx={{
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    "&:hover": {
                      opacity: 1,
                    },
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
    </Box >
  );
}
