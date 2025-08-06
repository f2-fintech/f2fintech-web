import styled from "@emotion/styled";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";

const AnimatedItem = styled(Paper)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  borderRadius: "16px",
  padding: theme.spacing(3),
  textAlign: "center",
  transition: "all 0.3s ease",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 40px rgba(0, 0, 0, 0.2)",
    background: "rgba(255, 255, 255, 0.15)",
  },
  ...theme.applyStyles("dark", {
    backgroundColor: "rgba(26, 32, 39, 0.7)",
  }),
}));

const useCounter = (end, duration, isInView) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = end / (duration / 100);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          clearInterval(timer);
          setCount(end);
        } else {
          setCount(Math.ceil(start));
        }
      }, 100);
      return () => clearInterval(timer);
    }
  }, [end, duration, isInView]);

  return count;
};

const Clients = () => {
  const observerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  const stats = [
    {
      value: useCounter(400, 1000, isInView),
      label: "Locations Served",
      icon: "📍",
    },
    {
      value: useCounter(10000, 1100, isInView),
      label: "Happy Clients",
      icon: "😊",
    },
    {
      value: useCounter(14400, 1000, isInView),
      label: "Applications",
      icon: "📝",
    },
    { value: useCounter(40, 700, isInView), label: "Lenders", icon: "🏦" },
    {
      value: useCounter(1100, 1000, isInView),
      label: "Loans Disbursed",
      icon: "💰",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, []);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // sm = 600px

  return (
    <Container
      maxWidth={false}
      sx={{
        height: isMobile ? "75vh" : "100%",
        px: { xs: 2, md: 4 },
        py: { xs: 2, md: 8 },
        position: "relative",
        overflow: "hidden",
        mt: isMobile ? 4 : 4.5,
      }}
    >
      {/* Background elements */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: {
            xs: "100%",
            md: "100%",
          },
          background: "linear-gradient(135deg, #3244e6 0%, #1a2cb8 100%)",
          zIndex: -1,
          "&::before": {
            content: '""',
            position: "absolute",
            top: "-50%",
            left: "-50%",
            width: "200%",
            height: "200%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
            animation: "rotate 20s linear infinite",
            "@keyframes rotate": {
              "0%": { transform: "rotate(0deg)" },
              "100%": { transform: "rotate(360deg)" },
            },
          },
        }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 3, md: 6 },
          alignItems: "center",
        }}
      >
        {/* Left Content - Text Section */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            color: "white",
            zIndex: 1,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "1.6rem", sm: "2.5rem", md: "3rem" }, // smaller on mobile
              fontWeight: 700,
              lineHeight: 1.2,
              mb: 2.5,
              fontFamily: "'Poppins', sans-serif",
              background: "linear-gradient(90deg, #fff, #a7c7ff)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Unlock Your Financial Potential
          </Typography>

          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "1.3rem", sm: "1.8rem", md: "2rem" }, // smaller on mobile
              fontWeight: 600,
              lineHeight: 1.3,
              mb: 2.5,
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Discover the Best Lending Services Tailored for You
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "0.9rem", md: "1.1rem" }, // smaller on mobile
              lineHeight: 1.5,
              mb: 3.5,
              opacity: 0.9,
            }}
          >
            Our vision is to create awareness about money and help people
            achieve Financial Freedom early in life. We aspire to shape a future
            where everyone has equal opportunities to achieve their dreams and
            aspirations.
          </Typography>

          <Button
            variant="contained"
            sx={{
              alignSelf: "flex-start",
              px: 4,
              py: 1.5,
              color: "#3244e6",
              backgroundColor: "#ffffff",
              transition: "none",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              "&:hover": {
                backgroundColor: "#ffffff",
                color: "#3244e6",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                transform: "none",
              },
              position: "relative",
              display: "inline-block",
              overflow: "hidden",
              padding: {
                xs: "0.3rem 1rem",
                sm: "0.5rem 1.5rem",
                md: "0.6rem 2rem",
              },
              width: {
                xs: "100%",
                sm: "auto",
                md: "13vw",
              },
              borderRadius: "30px",
              fontFamily: "Poppins",
              fontWeight: "500",
              fontSize: {
                xs: "0.9rem",
                sm: "1rem",
                md: "1.1rem",
              },
              lineHeight: "1.5rem",
              textTransform: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Get Started
          </Button>
        </Box>

        {/* Right Content - Stats Section */}
        <Box
          ref={observerRef}
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          <Grid
            container
            spacing={{ xs: 1, md: 3 }}
            sx={{
              maxWidth: { md: "auto" },
            }}
          >
            {stats.map((stat, index) => (
              <Grid
                sx={{
                  height: isMobile ? "13vh" : "auto",
                  width: isMobile ? "18vw" : "auto",
                }}
                item
                xs={4}
                sm={4}
                md={4}
                key={index}
              >
                <AnimatedItem>
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: { xs: "1.2rem", sm: "2.2rem", md: "2rem" }, // slightly smaller on mobile
                      fontWeight: 700,
                      mb: 1,
                      color: "white",
                      fontFamily: "'Poppins', sans-serif",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    {stat.icon}
                    <Box
                      component="span"
                      sx={{
                        background: "linear-gradient(90deg, #fff, #a7c7ff)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                        fontSize: {
                          xs: "clamp(12px, 3vw, 16px)", // Mobile first (extra small)
                          sm: "clamp(14px, 2.5vw, 18px)", // Small devices
                          md: "clamp(16px, 2vw, 20px)", // Medium devices
                          lg: "clamp(18px, 1.5vw, 22px)", // Large devices
                          xl: "clamp(20px, 1vw, 24px)", // Extra large
                        },
                        lineHeight: 1.2, // Maintain aspect ratio
                        display: "inline-block", // Ensures gradient applies correctly
                      }}
                    >
                      {isInView ? stat.value.toLocaleString() : 0}+{" "}
                      {stat.value === 1100 ? "Cr" : ""}
                    </Box>
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: "0.75rem", sm: "0.9rem", md: "1rem" }, // slightly smaller on mobile
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.8)",
                      textTransform: "capitalize",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {stat.label}
                  </Typography>
                </AnimatedItem>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Clients;
