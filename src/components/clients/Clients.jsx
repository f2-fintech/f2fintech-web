import styled from "@emotion/styled";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import ButtonComp from "../common/button/Button";

const AnimatedItem = styled(Paper)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  borderRadius: "16px",
  padding: theme.spacing(2),
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
      value: useCounter(600, 1000, isInView),
      label: "Locations Served",
      icon: "📍",
    },
    {
      value: useCounter(9000, 1100, isInView),
      label: "Happy Clients",
      icon: "😊",
    },
    {
      value: useCounter(30000, 1000, isInView),
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
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "lg"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const isIpadPro = useMediaQuery(
    "only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (-webkit-min-device-pixel-ratio: 2)"
  );
  return (
    <Container
      maxWidth={false}
      sx={{
        minHeight: {
          xs: "75vh",
          sm: "60vh",
          md: isIpadPro ? "65vh" : "70vh",
          lg: "80vh",
        },
        height: "auto",
        px: {
          xs: 2,
          sm: 3,
          md: isIpadPro ? 3 : 4,
        },
        py: {
          xs: 3,
          sm: 4,
          md: isIpadPro ? 4 : 6,
          lg: 8,
        },
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Background elements */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
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
          flexDirection: {
            xs: "column", // Mobile - vertical
            md: isIpadPro ? "column" : "row", // Keep column on iPad Pro
          },
          gap: {
            xs: 4, // Mobile
            sm: 5, // Tablet
            md: isIpadPro ? 5 : 6, // Adjusted for iPad Pro
            lg: 8, // Large desktop
          },
          alignItems: "center",
          width: "100%",
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
            textAlign: {
              xs: "center",
              md: isIpadPro ? "center" : "left",
            },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: {
                xs: "1.5rem",
                sm: "2rem",
                md: isIpadPro ? "2.2rem" : "2.5rem",
                lg: "3rem",
              },
              fontWeight: 700,
              lineHeight: {
                xs: 1.3,
                sm: 1.2,
                md: isIpadPro ? 1.3 : 1.2,
              },
              mb: {
                xs: 2,
                sm: 2.5,
                md: isIpadPro ? 2 : 2.5,
              },
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
              fontSize: {
                xs: "1.2rem",
                sm: "1.5rem",
                md: isIpadPro ? "1.6rem" : "1.8rem",
                lg: "2rem",
              },
              fontWeight: 600,
              lineHeight: {
                xs: 1.4,
                sm: 1.3,
                md: isIpadPro ? 1.4 : 1.3,
              },
              mb: {
                xs: 2,
                sm: 2.5,
                md: isIpadPro ? 2 : 2.5,
              },
              fontFamily: "'Poppins', sans-serif",
              opacity: 0.95,
            }}
          >
            Discover the Best Lending Services Tailored for You
          </Typography>

          <Typography
            sx={{
              fontSize: {
                xs: "0.85rem",
                sm: "0.95rem",
                md: isIpadPro ? "1rem" : "1.05rem",
                lg: "1.1rem",
              },
              lineHeight: 1.6,
              mb: {
                xs: 3,
                sm: 3.5,
                md: isIpadPro ? 3 : 3.5,
              },
              opacity: 0.9,
              maxWidth: "100%",
            }}
          >
            Our vision is to create awareness about money and help people
            achieve Financial Freedom early in life. We aspire to shape a future
            where everyone has equal opportunities to achieve their dreams and
            aspirations.
          </Typography>

          <Box
            sx={{
              border: "1px solid white",
              borderRadius: "30px",
              width: {
                xs: "100%",
                sm: "80%",
                md: isIpadPro ? "25%" : "70%",
              },
              mx: {
                xs: "auto",
                md: isIpadPro ? "auto" : 0,
              },
            }}
          >
            <ButtonComp width="100%" />
          </Box>
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
            width: "100%",
          }}
        >
          <Grid
            container
            spacing={{
              xs: 1.5,
              sm: 2,
              md: isIpadPro ? 2 : 2.5,
            }}
            sx={{
              maxWidth: {
                xs: "100%",
                sm: "90%",
                md: isIpadPro ? "95%" : "100%",
              },
              margin: "0 auto",
            }}
          >
            {stats.map((stat, index) => (
              <Grid
                item
                xs={6}
                sm={4}
                md={isIpadPro ? 6 : 4}
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <AnimatedItem
                  sx={{
                    width: {
                      xs: "100%",
                      sm: "90%",
                      md: isIpadPro ? "95%" : "100%",
                    },
                    minHeight: {
                      xs: "120px",
                      sm: "140px",
                      md: isIpadPro ? "130px" : "160px",
                    },
                    p: {
                      xs: 1.5,
                      sm: 2,
                      md: isIpadPro ? 2 : 3,
                    },
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: {
                        xs: "1.1rem",
                        sm: "1.4rem",
                        md: isIpadPro ? "1.3rem" : "1.6rem",
                        lg: "1.8rem",
                        xl: "2rem",
                      },
                      fontWeight: 700,
                      mb: {
                        xs: 0.5,
                        sm: 1,
                        md: isIpadPro ? 0.5 : 1,
                      },
                      color: "white",
                      fontFamily: "'Poppins', sans-serif",
                      display: "flex",
                      alignItems: "center",
                      gap: {
                        xs: 0.5,
                        sm: 1,
                        md: isIpadPro ? 0.5 : 1,
                      },
                      flexDirection: {
                        xs: "column",
                        sm: "row",
                        md: isIpadPro ? "column" : "row",
                      },
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        fontSize: {
                          xs: "1.5rem",
                          sm: "1.8rem",
                          md: isIpadPro ? "1.6rem" : "2rem",
                        },
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Box
                      component="span"
                      sx={{
                        background: "linear-gradient(90deg, #fff, #a7c7ff)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                        fontSize: {
                          xs: "0.9rem",
                          sm: "1.1rem",
                          md: isIpadPro ? "1rem" : "1.3rem",
                          lg: "1.5rem",
                        },
                        fontWeight: 700,
                        lineHeight: 1.2,
                        display: "inline-block",
                      }}
                    >
                      {isInView ? stat.value.toLocaleString() : 0}+
                      {stat.value === 1100 ? "Cr" : ""}
                    </Box>
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: {
                        xs: "0.7rem",
                        sm: "0.8rem",
                        md: isIpadPro ? "0.75rem" : "0.85rem",
                        lg: "0.9rem",
                      },
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.8)",
                      textTransform: "capitalize",
                      letterSpacing: "0.5px",
                      lineHeight: 1.3,
                      textAlign: "center",
                      mt: {
                        xs: 0.5,
                        sm: 1,
                        md: isIpadPro ? 0.5 : 1,
                      },
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
