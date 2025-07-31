"use client";
import { useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  CardContent,
  CardActions,
  Card,
  CardMedia,
  Button,
  Chip,
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
    id: 1,
    year: "2021",
    title: "TEAM CELEBRETION",
    image: "/abt9.jpg",
  },
  {
    id: 2,
    year: "2021",
    title: "HOLI CELEBRETION",
    image: "/abt2.jpg",
  },
  {
    id: 3,
    year: "2021",
    title: "WOMEN'S DAY",

    image: "/abt5.jpg",
  },
  {
    id: 4,
    year: "2023",
    title: "GRAND OPENING",
    image: "/abt1.jpeg",
  },
  {
    id: 5,
    year: "2023",
    title: "REPUBLIC DAY",
    image: "/abt3.jpeg",
  },
  {
    id: 6,
    year: "2023",
    title: "INDEPENDENCE DAY",
    image: "/abt6.jpg",
  },
  {
    id: 7,
    year: "2022",
    title: "BLIND INPOWERMENT",
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
];

const years = ["2024", "2023", "2022", "2021"];

export default function AboutUsPage() {
  const [selectedYear, setSelectedYear] = useState("2024");
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
        "Receiving the esteemed Bajaj Finserv Award marks a pinnacle moment in F2Fintech's journey, illuminating our path.",
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
    selectedYear === "2024"
      ? portfolioItems
      : portfolioItems.filter((item) => item.year === selectedYear);
  return (
    <Box sx={{ bgcolor: theme.palette.background.default, height: "100%" }}>
      {/* Main Content */}
      <Box sx={{ backgroundColor: "#fff", minHeight: "100vh" }}>
        {/* Navigation Bar Placeholder */}
        <Container maxWidth="xl" sx={{ py: { xs: 4, md: 8 } }}>
          {/* Hero Section */}
          <Grid container spacing={8} sx={{ mb: 8 }}>
            {/* Left Content */}
            <Grid item xs={12} lg={6}>
              <Box sx={{ pr: { lg: 4 } }}>
                {/* Category Badge */}
                <Chip
                  label="Financial Technology"
                  sx={{
                    backgroundColor: "#e6f0ff",
                    color: "#0052cc",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    height: "32px",
                    mb: 3,
                    border: "1px solid #c2d6ff",
                  }}
                />

                {/* Main Heading */}
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "2.5rem", sm: "3rem", md: "3.75rem" },
                    fontWeight: 800,
                    lineHeight: 1.1,
                    color: "#172b4d",
                    mb: 3,
                    fontFamily: "DM Sans, sans-serif",
                    letterSpacing: "-0.025em",
                  }}
                >
                  Global Electronic
                  <br />
                  Marketplace for{" "}
                  <Box
                    component="span"
                    sx={{
                      background:
                        "linear-gradient(135deg, #0052cc 0%, #2684ff 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Loan Trading
                  </Box>
                </Typography>

                {/* Subtitle */}
                <Typography
                  sx={{
                    fontSize: { xs: "1.125rem", md: "1.25rem" },
                    lineHeight: 1.6,
                    color: "#5e6c84",
                    mb: 4,
                    fontFamily: "DM Sans, sans-serif",
                    maxWidth: "90%",
                  }}
                >
                  Connect buyers and sellers in a secure, transparent
                  marketplace designed for modern financial institutions and
                  investors.
                </Typography>

                {/* Feature Pills */}
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 4 }}>
                  {[
                    "Secure Trading",
                    "Global Reach",
                    "Real-time Analytics",
                  ].map((feature) => (
                    <Chip
                      key={feature}
                      label={feature}
                      size="small"
                      sx={{
                        backgroundColor: "white",
                        border: "1px solid #dfe1e6",
                        color: "#5e6c84",
                        fontWeight: 500,
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
                  elevation={0}
                  sx={{
                    maxWidth: 480,
                    backgroundColor: "white",
                    border: "1px solid #e9ecef",
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    component="img"
                    src="/aboutfin.gif"
                    alt="F2fintech Platform"
                    sx={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                    }}
                  />
                </Card>
              </Box>
            </Grid>
          </Grid>

          {/* Stats Section */}
          <Grid container spacing={4} sx={{ mb: 8 }}>
            {[
              { number: "500+", label: "Financial Institutions" },
              { number: "$2.5B+", label: "Loans Traded" },
              { number: "50+", label: "Countries Served" },
              { number: "99.9%", label: "Platform Uptime" },
            ].map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Card
                  elevation={0}
                  sx={{
                    backgroundColor: "white",
                    border: "1px solid #e9ecef",
                    borderRadius: "8px",
                    textAlign: "center",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      boxShadow: "0 4px 16px rgba(23, 43, 77, 0.08)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <CardContent sx={{ py: 3 }}>
                    <Typography
                      sx={{
                        fontSize: { xs: "1.5rem", md: "2rem" },
                        fontWeight: 700,
                        color: "#0052cc",
                        mb: 1,
                        fontFamily: "DM Sans, sans-serif",
                      }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.875rem",
                        color: "#5e6c84",
                        fontWeight: 500,
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Video Section */}

          {/* Trust Indicators */}
          <Box
            sx={{
              mt: 8,
              textAlign: "center",
              py: 4,
              borderTop: "1px solid #e9ecef",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.875rem",
                color: "#5e6c84",
                mb: 3,
                fontWeight: 500,
              }}
            >
              Trusted by leading financial institutions worldwide
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 4,
                opacity: 0.6,
              }}
            >
              {[
                "Bank of America",
                "JPMorgan",
                "Goldman Sachs",
                "Deutsche Bank",
              ].map((bank) => (
                <Typography
                  key={bank}
                  sx={{
                    fontSize: "0.875rem",
                    color: "#5e6c84",
                    fontWeight: 600,
                    letterSpacing: "0.5px",
                  }}
                >
                  {bank}
                </Typography>
              ))}
            </Box>
          </Box>
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
          maxWidth: "1200px",
          margin: "0 auto",
          padding: { xs: "20px", md: "40px" },
          display: "flex",
          flexDirection: "column",
          gap: { xs: "30px", md: "40px" },
          alignItems: "center",
        }}
      >
        {/* Harpreet Singh Card */}
        <Card
          sx={{
            width: "100%",
            maxWidth: "900px",
            height: { xs: "auto", md: "300px" },
            backgroundColor: "background.paper",
            borderRadius: "16px",
            overflow: "hidden",
            position: "relative",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
            },
          }}
        >
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              width: { xs: "100%", md: "320px" },
              height: { xs: "240px", md: "auto" },
              flexShrink: 0,
            }}
          >
            <CardMedia
              sx={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                transition: "transform 0.5s ease",
                "&:hover": {
                  transform: "scale(1.03)",
                },
              }}
              image="/harpreetimg.jpg"
              title="Harpreet Singh"
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "16px",
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
                display: "flex",
                gap: "12px",
              }}
            ></Box>
          </Box>

          <CardContent
            sx={{
              padding: { xs: "20px", md: "15px" },
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                color: "text.primary",
                fontSize: { xs: "1.6rem", md: "1.5rem" },
                fontWeight: "600",
                fontFamily: "Poppins",
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
                fontSize: "1rem",
                marginBottom: "16px",
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
                fontSize: { xs: "0.9rem", md: ".8rem" },
                marginBottom: "16px",
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
            <Box sx={{ display: "flex", gap: "8px", mt: "auto" }}>
              <Chip label="Finance" size="small" />
              <Chip label="Leadership" size="small" />
              <Chip label="Strategy" size="small" />
            </Box>
          </CardContent>
        </Card>

        {/* Abhinav Awal Card */}
        <Card
          sx={{
            width: "100%",
            maxWidth: "900px",
            height: { xs: "auto", md: "300px" },
            backgroundColor: "background.paper",
            borderRadius: "16px",
            overflow: "hidden",
            position: "relative",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
            },
          }}
        >
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              width: { xs: "100%", md: "320px" },
              height: { xs: "240px", md: "100%" },
              flexShrink: 0,
            }}
          >
            <CardMedia
              sx={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                transition: "transform 0.5s ease",
                "&:hover": {
                  transform: "scale(1.03)",
                },
              }}
              image="/abhinavimg.jpg"
              title="Abhinav Awal"
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "16px",
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
                display: "flex",
                gap: "12px",
              }}
            ></Box>
          </Box>

          <CardContent
            sx={{
              padding: { xs: "20px", md: "15px" },
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                color: "text.primary",
                fontSize: { xs: "1.6rem", md: "1.5rem" },
                fontWeight: "600",
                fontFamily: "Poppins",
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
                fontSize: "1rem",
                marginBottom: "16px",
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
                fontSize: { xs: "0.9rem", md: ".8rem" },
                marginBottom: "16px",
              }}
            >
              Abhinav’s journey from a business administration graduate to a
              co-founder of F2 Fintech is a testament to his adaptability and
              keen business acumen. With a Master's in Business Administration,
              complemented by an intensive Start-up Bootcamp at IIT Delhi,
              Abhinav brings a blend of academic excellence and practical
              expertise to the table. His transition from working in his
              family's business to pioneering a start-up showcases his
              entrepreneurial spirit and commitment to innovation.
            </Typography>
            <Box sx={{ display: "flex", gap: "8px", mt: "auto" }}>
              <Chip label="Entrepreneurship" size="small" />
              <Chip label="Innovation" size="small" />
              <Chip label="Business Strategy" size="small" />
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
                }}
              >
                <CardMedia
                  component="img"
                  image={award.image}
                  alt={award.title}
                  sx={{
                    height: 240,
                    objectFit: "cover",
                    borderRadius: 1,
                    transition: { md: "transform 0.3s ease" }, // Transition only on desktop
                    "&:hover": {
                      transform: { md: "scale(1.15)" }, // Disable hover effect on mobile/tablet
                    },
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
