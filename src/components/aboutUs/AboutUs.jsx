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
import Faq from "../faq/Faq";
import { useTheme } from "@mui/material/styles";
import SpotlightText from "./SpotlightText";

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
  fontFamily: "Poppins",
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
    id: 12,
    year: "2025",
    image: "/abt2025-3.jpg",
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
  {
    id: 20,
    year: "2025",
    image: "/abt2025-10.jpg",
  },
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
  return (
    <Box sx={{ bgcolor: theme.palette.background.default, height: "100%" }}>
      {/* Main Content */}
      <Box
        sx={{
          backgroundColor: "#fff",
          minHeight: "100vh",
        }}
      >
        {/* Navigation Bar Placeholder */}
        <Container maxWidth="xl" sx={{ py: { xs: 4 } }}>
          {/* Hero Section */}
          <Grid
            container
            spacing={{ xs: 6, md: 10 }}
            sx={{ mb: { xs: 6, md: 12 } }}
          >
            {/* Left Content */}
            <Grid item xs={12} lg={6}>
              <Box sx={{ pr: { lg: 6 } }}>
                {/* Category Badge */}
                <Chip
                  label="Financial Technology"
                  sx={{
                    backgroundColor: "#f5f7fa",
                    color: "#0052cc",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    height: "32px",
                    mb: 3,
                    borderRadius: "8px",
                    px: 2,
                  }}
                />

                {/* Main Heading */}
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "2.25rem", sm: "2.75rem", md: "3.5rem" },
                    fontWeight: 800,
                    lineHeight: 1.1,
                    color: "#172b4d",
                    mb: 3,
                    fontFamily: "DM Sans, sans-serif",
                  }}
                >
                  Global Marketplace for
                  <Box
                    component="span"
                    sx={{
                      backgroundColor: "#3244e6",

                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      ml: 1,
                    }}
                  >
                    Buying & Selling Loans
                  </Box>
                </Typography>

                {/* Subtitle */}
                <Typography
                  sx={{
                    fontSize: { xs: "1rem", md: "1.125rem" },
                    lineHeight: 1.6,
                    color: "#5e6c84",
                    mb: 4,
                    fontFamily: "DM Sans, sans-serif",
                  }}
                >
                  <strong>Delegate</strong> your financial worries to us and
                  focus on growing your core business.
                </Typography>

                {/* Feature Pills */}
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 4 }}>
                  {[
                    "Quick Disbursal",
                    "Paperless Process",
                    "Instant Eligibility Check",
                  ].map((feature) => (
                    <Chip
                      key={feature}
                      label={feature}
                      size="small"
                      sx={{
                        fontWeight: 500,
                        fontSize: "0.75rem",
                        borderRadius: "6px",
                        px: 1.5,
                        py: 0.3,
                        backgroundColor: "#f5f7fa",
                        color: "#0052cc",
                        border: "1px solid #d9e2f3",
                        cursor: "default",
                        transition: "0.2s",
                        "&:hover": {
                          backgroundColor: "#e6f0ff",
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
                <Card
                  elevation={6}
                  sx={{
                    maxWidth: 500,
                    width: "100%",
                    borderRadius: "20px",
                    overflow: "hidden",
                    backgroundColor: "transparent",
                    boxShadow: "none",
                    position: "relative",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      width: "150%",
                      height: "150%",
                      background:
                        "linear-gradient(135deg, #2684ff 0%, #0052cc 100%)",
                      borderRadius: "50%",
                      top: "-50%",
                      left: "-25%",
                      opacity: 0.1,
                    },
                  }}
                >
                  <Box
                    component="img"
                    src="/about.png"
                    alt="F2 fintech Platform"
                    sx={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      position: "relative",
                      zIndex: 1,
                    }}
                  />
                </Card>
              </Box>
            </Grid>
          </Grid>

          {/* Stats Section */}
          <Grid
            container
            spacing={3}
            justifyContent="center"
            sx={{
              position: "relative",
              minHeight: "350px",
              width: "70%",
              margin: "0 auto",
              display: "flex",
              justifyContent: "center",
              bottom: 40,
            }}
          >
            {[
              {
                number: "9,000+",
                label: "Happy Clients",
                delay: 0,
                color: "#FF6B6B",
              },
              {
                number: "30,000+",
                label: "Applications",
                delay: 0.2,
                color: "#4ECDC4",
              },
              { number: "40+", label: "Lenders", delay: 0.4, color: "#FFD166" },
              {
                number: "1,100+ Cr",
                label: "Loans Disbursed",
                delay: 0.6,
                color: "#6A0572",
              },
            ].map((stat, index) => (
              <Grid
                item
                xs={6}
                sm={4}
                md={3}
                key={index}
                sx={{ position: "relative" }}
              >
                <Card
                  elevation={0}
                  sx={{
                    backgroundColor: "white",
                    border: "1px solid #e0e0e0",
                    borderRadius: "50%",
                    textAlign: "center",
                    padding: "20px",
                    transition: "all 0.5s ease",
                    width: { xs: "100px", sm: "120px", md: "140px" },
                    height: { xs: "100px", sm: "120px", md: "140px" },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    // Random positions for each card
                    ...(index === 0 && {
                      top: { xs: "10%", md: "15%" },
                      left: { xs: "5%", md: "10%" },
                      animation: `float 3s ease-in-out ${stat.delay}s infinite alternate`,
                    }),
                    ...(index === 1 && {
                      top: { xs: "60%", md: "65%" },
                      right: { xs: "5%", md: "15%" },
                      animation: `float 3s ease-in-out ${stat.delay}s infinite alternate-reverse`,
                    }),
                    ...(index === 2 && {
                      top: { xs: "30%", md: "25%" },
                      right: { xs: "10%", md: "25%" },
                      animation: `float 4s ease-in-out ${stat.delay}s infinite alternate`,
                    }),
                    ...(index === 3 && {
                      bottom: { xs: "10%", md: "20%" },
                      left: { xs: "15%", md: "20%" },
                      animation: `float 3.5s ease-in-out ${stat.delay}s infinite alternate-reverse`,
                    }),
                    "&:hover": {
                      boxShadow: "0 12px 32px rgba(65, 105, 225, 0.3)",
                      transform: "scale(1.1) translateY(-8px)",
                      borderColor: "#4169E1",
                      backgroundColor: "#f8faff",
                    },
                    "@keyframes float": {
                      "0%": {
                        transform: "translateY(0px)",
                      },
                      "50%": {
                        transform: "translateY(-12px)",
                      },
                      "100%": {
                        transform: "translateY(0px)",
                      },
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                      fontWeight: 700,
                      color: stat.color,
                      mb: 0.5,
                      fontFamily: "DM Sans, sans-serif",
                      lineHeight: 1.2,
                    }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.875rem" },
                      color: "#666",
                      fontWeight: 500,
                      lineHeight: 1.1,
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Box>
        <Typography
          variant="h3"
          sx={{
            color: theme.palette.text.primary,
            lineHeight: "4rem",
            fontSize: {
              md: "2.6vw",
              sm: "6vw",
              xs: "6vw",
            },
            fontWeight: "550",
            fontFamily: "DM sans",
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#fff",
          }}
        >
          Who we
          <span
            style={{ color: theme.palette.secondary.main, marginLeft: ".7rem" }}
          >
            Are
          </span>
        </Typography>
        <SpotlightText width="80%" />
      </Box>
      <Box>
        <Typography
          sx={{
            color: theme.palette.text.primary,
            display: "flex",
            fontSize: {
              md: "2.6vw",
              sm: "6vw",
              xs: "6vw",
            },
            fontWeight: "550",
            fontFamily: "DM sans",
            justifyContent: "center",
          }}
        >
          Meet our{" "}
          <span
            style={{ color: theme.palette.secondary.main, marginLeft: ".6rem" }}
          >
            {" "}
            Founders
          </span>
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
            xs: "20px",
            sm: "30px",
            md: isIpadPro ? "40px" : "10px",
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
            height: { xs: "auto", md: "460px" },
            backgroundColor: "white",
            borderRadius: "20px",
            overflow: "hidden",
            position: "relative",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            boxShadow:
              "0 10px 40px rgba(0,0,0,0.08), 0 6px 10px rgba(0,0,0,0.03)",
            transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1)",
            border: "1px solid rgba(255,255,255,0.8)",
            "&:hover": {
              transform: "translateY(-8px)",
              boxShadow:
                "0 20px 50px rgba(0,0,0,0.12), 0 12px 20px rgba(0,0,0,0.06)",
            },
          }}
        >
          {/* Image Container */}
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              width: { xs: "100%", md: "50%" },
              height: { xs: "240px", md: "100%" },
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
            <Box sx={{ height: "90%" }}>
              <Typography
                variant="h3"
                sx={{
                  color: "text.primary",
                  fontSize: { xs: "1.4rem", sm: "1.5rem", md: "1.4rem" },
                  fontWeight: "600",
                  fontFamily: "Poppins",
                  marginBottom: "8px",
                }}
              >
                Harpreet Singh
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  color: "#788585",
                  fontFamily: "Poppins",
                  fontWeight: "600",
                  fontSize: { xs: "0.9rem", sm: ".8rem" },
                  marginBottom: "12px",
                }}
              >
                Founder & Chief Executive Officer
              </Typography>
              <Box
                sx={{
                  maxHeight: { md: "270px" },
                  overflowY: "auto",
                  marginBottom: "16px",
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
                    fontFamily: "verdana",
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
                  backgroundColor: "rgba(66, 153, 225, 0.1)",
                  color: "#2b6cb0",
                  fontWeight: "500",
                  fontSize: "0.75rem",
                }}
              />
              <Chip
                label="Entrepreneur"
                size="small"
                sx={{
                  backgroundColor: "rgba(72, 187, 120, 0.1)",
                  color: "#2f855a",
                  fontWeight: "500",
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
            height: { xs: "auto", md: "460px" },
            backgroundColor: "white",
            borderRadius: "20px",
            overflow: "hidden",
            position: "relative",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            boxShadow:
              "0 10px 40px rgba(0,0,0,0.08), 0 6px 10px rgba(0,0,0,0.03)",
            transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1)",
            border: "1px solid rgba(255,255,255,0.8)",
            "&:hover": {
              transform: "translateY(-8px)",
              boxShadow:
                "0 20px 50px rgba(0,0,0,0.12), 0 12px 20px rgba(0,0,0,0.06)",
            },
          }}
        >
          {/* Image Container */}
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              width: { xs: "100%", md: "50%" },
              height: { xs: "240px", md: "100%" },
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
            <Box sx={{ height: "90%" }}>
              <Typography
                variant="h3"
                sx={{
                  color: "text.primary",
                  fontSize: { xs: "1.4rem", sm: "1.5rem", md: "1.4rem" },
                  fontWeight: "600",
                  fontFamily: "Poppins",
                  marginBottom: "8px",
                }}
              >
                Abhinav Awal
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  color: "#788585",
                  fontFamily: "Poppins",
                  fontWeight: "600",
                  fontSize: { xs: "0.9rem", sm: ".8rem" },
                  marginBottom: "12px",
                }}
              >
                Co-Founder & Managing Director
              </Typography>
              <Box
                sx={{
                  maxHeight: { md: "270px" },
                  overflowY: "auto",
                  marginBottom: "16px",
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
                    fontFamily: "verdana",
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
                  backgroundColor: "rgba(66, 153, 225, 0.1)",
                  color: "#2b6cb0",
                  fontWeight: "500",
                  fontSize: "0.75rem",
                }}
              />
              <Chip
                label="Entrepreneur"
                size="small"
                sx={{
                  backgroundColor: "rgba(72, 187, 120, 0.1)",
                  color: "#2f855a",
                  fontWeight: "500",
                  fontSize: "0.75rem",
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ py: 8, px: 2 }}>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{
            color: theme.palette.text.primary,
            mb: 2,
            fontFamily: "Poppins",
            fontSize: "2.5vh",
            fontWeight: 500,
          }}
        >
          OUR VALUES
        </Typography>

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
            fontFamily: "DM sans",
          }}
        >
          Speak Volumes Through Every
          <span style={{ color: theme.palette.secondary.main }}>
            {" "}
            Award Captured{" "}
          </span>
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
                  width: { xs: "65vw", sm: "80vw", md: "20vw" },
                  alignItems: "center",
                  position: "relative",
                  overflow: "visible",
                  backgroundColor: "#eaf4f4",
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
                    height: 240,
                    objectFit: "cover",
                    borderRadius: "15px",
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
                      color: theme.palette.secondary.main,
                      fontFamily: "DM sans",
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
                      fontFamily: "DM sans",
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
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h2"
          component="h1"
          align="center"
          gutterBottom
          sx={{
            mb: 4,
            mt: -6,
            color: theme.palette.text.primary,
            fontSize: {
              md: "2.6vw",
              sm: "6vw",
              xs: "6vw",
            },
            fontWeight: "550",
            fontFamily: "DM sans",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          Check our latest{" "}
          <span style={{ color: theme.palette.tertiary.main }}>work</span>
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
                border: "1px solid #FFD700",
                backgroundColor:
                  selectedYear === year
                    ? theme.palette.secondary.main
                    : theme.palette.secondary.main,
                color: selectedYear === year ? "#000000" : "#ffffff",
                fontFamily: "Poppins",
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
                      fontFamily: "Poppins",
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
      <Faq />
    </Box>
  );
}
