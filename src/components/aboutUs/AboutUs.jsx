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
import LightScroll from "./LightScroll";

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
                      color: stat.color, // Applied random color here
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
        <LightScroll width="40%" />
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
          boxSizing: "border-box",
          display: "flex",
          flexDirection: {
            xs: "column",
            md: isIpadPro ? "column" : "row", // Keep column on iPad Pro
          },
          gap: {
            xs: "30px",
            sm: "40px",
            md: isIpadPro ? "40px" : "60px",
          },
          alignItems: "center", // Changed to center for better alignment
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
            height: { xs: "auto", md: "440px" },
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
              width: { xs: "100%", md: "42%" },
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
                objectPosition: "center top",
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
            <Box>
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
              <Typography
                variant="body1"
                sx={{
                  color: "#788585",
                  fontFamily: "verdana",
                  fontWeight: "400",
                  lineHeight: 1.6,
                  fontSize: { xs: "0.8rem", sm: "0.8rem", md: "0.8rem" },
                  marginBottom: "16px",
                  flexGrow: 1,
                }}
              >
                Harpreet Singh, a Chartered Accountant by training, has carved a
                niche in the financial services industry through his strategic
                foresight and leadership. Starting his career with a successful
                tenure at Bajaj FinServ, Harpreet quickly rose through the ranks
                to become the youngest Regional Sales Manager in the company's
                history. After acquiring significant experience and a series of
                accolades, he ventured into entrepreneurship, co-founding
                InsiderLab and later establishing F2 Fintech.
              </Typography>
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
                label="Chartered Accountant"
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
              {/* <Chip
                label="Industry Leader"
                size="small"
                sx={{
                  backgroundColor: "rgba(237, 137, 54, 0.1)",
                  color: "#c05621",
                  fontWeight: "500",
                  fontSize: "0.75rem",
                }}
              /> */}
            </Box>
          </CardContent>
        </Card>

        {/* Abhinav Awal Card */}
        <Card
          sx={{
            width: { xs: "100%", lg: "48%" },
            maxWidth: "600px",
            height: { xs: "auto", md: "440px" },
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
              width: { xs: "100%", md: "42%" },
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
                objectPosition: "center top",
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
            <Box>
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
              <Typography
                variant="body1"
                sx={{
                  color: "#788585",
                  fontFamily: "verdana",
                  fontWeight: "400",
                  lineHeight: 1.6,
                  fontSize: { xs: "0.8rem", sm: "0.8rem", md: "0.8rem" },
                  marginBottom: "16px",
                  flexGrow: 1,
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
            flexDirection: { xs: "column", sm: "column", md: "row" }, // Stack vertically on mobile/tablet, row on desktop
            justifyContent: "center",
            alignItems: "center",
            gap: { xs: 4, sm: 4, md: 6 }, // Add space between awards
            width: "100%", // Full width for mobile and tab
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
                  width: { xs: "65vw", sm: "80vw", md: "20vw" }, // Full width on mobile/tablet, fixed on desktop
                  alignItems: "center",
                  position: "relative",
                  overflow: "visible",
                  backgroundColor: "#eaf4f4",
                  borderRadius: "15px",
                  p: 1,
                  transition: { md: "transform 0.3s ease" }, // Transition only on desktop
                  "&:hover": {
                    transform: { md: "scale(1.15)" }, // Disable hover effect on mobile/tablet
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
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)", // Add subtle text shadow
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
            gap: 2, // Add gap between buttons
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
                borderRadius: "20px", // Rounded corners
                padding: "8px 20px", // Add padding
                transition: "all 0.3s ease", // Smooth transition
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Add shadow
                "&:hover": {
                  transform: "scale(1.05)", // Slight scale on hover
                  boxShadow: "0px 6px 8px rgba(0, 0, 0, 0.15)", // Enhanced shadow on hover
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
                  borderRadius: "12px", // Rounded corners for the card
                  overflow: "hidden", // Ensure the image respects the border radius
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Add shadow
                  transition: "all 0.3s ease", // Smooth transition
                  "&:hover": {
                    transform: "translateY(-5px)", // Slight lift on hover
                    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)", // Enhanced shadow on hover
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={item.image}
                  alt={item.title}
                  sx={{
                    transition: "transform 0.3s ease", // Smooth image transition
                    "&:hover": {
                      transform: "scale(1.1)", // Slight zoom on hover
                    },
                  }}
                />
                <ImageOverlay
                  className="overlay"
                  sx={{
                    backgroundColor: "rgba(0, 0, 0, 0.6)", // Darker overlay for better text visibility
                    opacity: 0, // Initially hidden
                    transition: "opacity 0.3s ease", // Smooth transition
                    "&:hover": {
                      opacity: 1, // Show overlay on hover
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      color: "#ffffff", // White text for contrast
                      fontSize: "1.5rem", // Larger font size
                      fontWeight: "600", // Bold text
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
      {/* Last only about  */}
      {/* <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box textAlign="center" mb={6}>
          <Typography
            variant="subtitle1"
            component="p"
            color="primary"
            gutterBottom
            sx={{
              textTransform: "uppercase",
              fontFamily: "DM sans",
              fontSize: "2vw",
              fontWeight: "450",
              color: "#FFD700",
            }}
          >
            BLOG
          </Typography>
          <Typography
            variant="h3"
            component="h2"
            color="primary"
            sx={{
              fontWeight: "450",
              color: "white",
              fontFamily: "Poppins",
              fontSize: "2vw",
            }}
          >
            Recent posts from <span style={{ color: "#FFD700" }}>our Blog</span>
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {blogPosts.map((post) => (
            <Grid item xs={12} md={4} key={post.id}>
              <Card
                sx={{
                  height: "75vh",
                  display: "flex",
                  width: "24vw",
                  flexDirection: "column",
                  boxShadow: "none",
                  backgroundColor: "#100D0D",
                }}
              >
                <CardMedia
                  component="img"
                  height={250}
                  image={post.image}
                  alt={post.title}
                  sx={{
                    borderRadius: 1,
                    transition: "transform 0.3s ease-in-out", // Smooth transition effect
                    "&:hover": {
                      transform: "scale(1.1) rotate(5deg)", // Zoom and tilt effect on hover
                    },
                  }}
                />

                <CardContent sx={{ flexGrow: 1, px: 0 }}>
                  <Typography
                    sx={{
                      marginLeft: "0.5rem",
                      fontFamily: "Poppins",
                      fontWeight: "400",
                    }}
                    variant="subtitle2"
                    color="#ffffff"
                    gutterBottom
                  >
                    {post.date}
                  </Typography>
                  <Typography
                    sx={{
                      marginLeft: "0.5rem",
                      fontSize: "1.10rem",
                      color: "white",
                      fontWeight: "450",
                      fontFamily: "Poppins",
                    }}
                  >
                    {post.title}
                  </Typography>
                  <Box
                    href="#"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      fontFamily: "Poppins",
                      fontWeight: "340",
                      color: "#FFD700",
                      marginTop: "15vh",
                      marginLeft: "0.8rem",
                      cursor: "pointer",
                      overflow: "hidden",
                    }}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                  >
                    Read More
                    <ArrowForwardIcon
                      sx={{
                        fontSize: 18,
                        transition: "transform 0.3s ease, opacity 0.3s ease",
                        transform: hover ? "translateX(20px)" : "translateX(0)",
                        opacity: hover ? 0 : 1,
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container> */}
    </Box>
  );
}
