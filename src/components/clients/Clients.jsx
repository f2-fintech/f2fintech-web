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
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // < 600px
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "lg")); // 600px - 1200px
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg")); // > 1200px
  const isIpadPro = useMediaQuery(
    "only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (-webkit-min-device-pixel-ratio: 2)"
  );
  return (
    <Container
      maxWidth={false}
      sx={{
        minHeight: {
          xs: "75vh", // Mobile
          sm: "60vh", // Tablet
          md: isIpadPro ? "65vh" : "70vh", // Adjusted for iPad Pro
          lg: "80vh", // Large desktop
        },
        height: "auto",
        px: {
          xs: 2, // Mobile
          sm: 3, // Tablet
          md: isIpadPro ? 3 : 4, // Adjusted for iPad Pro
        },
        py: {
          xs: 3, // Mobile
          sm: 4, // Tablet
          md: isIpadPro ? 4 : 6, // Adjusted for iPad Pro
          lg: 8, // Large desktop
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
              xs: "center", // Mobile - center
              md: isIpadPro ? "center" : "left", // Center on iPad Pro
            },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: {
                xs: "1.5rem", // Mobile
                sm: "2rem", // Small tablet
                md: isIpadPro ? "2.2rem" : "2.5rem", // Adjusted for iPad Pro
                lg: "3rem", // Desktop
              },
              fontWeight: 700,
              lineHeight: {
                xs: 1.3,
                sm: 1.2,
                md: isIpadPro ? 1.3 : 1.2, // Adjusted for iPad Pro
              },
              mb: {
                xs: 2, // Mobile
                sm: 2.5, // Tablet & Desktop
                md: isIpadPro ? 2 : 2.5, // Adjusted for iPad Pro
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
                xs: "1.2rem", // Mobile
                sm: "1.5rem", // Small tablet
                md: isIpadPro ? "1.6rem" : "1.8rem", // Adjusted for iPad Pro
                lg: "2rem", // Desktop
              },
              fontWeight: 600,
              lineHeight: {
                xs: 1.4,
                sm: 1.3,
                md: isIpadPro ? 1.4 : 1.3, // Adjusted for iPad Pro
              },
              mb: {
                xs: 2, // Mobile
                sm: 2.5, // Tablet & Desktop
                md: isIpadPro ? 2 : 2.5, // Adjusted for iPad Pro
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
                xs: "0.85rem", // Mobile
                sm: "0.95rem", // Small tablet
                md: isIpadPro ? "1rem" : "1.05rem", // Adjusted for iPad Pro
                lg: "1.1rem", // Desktop
              },
              lineHeight: 1.6,
              mb: {
                xs: 3, // Mobile
                sm: 3.5, // Tablet & Desktop
                md: isIpadPro ? 3 : 3.5, // Adjusted for iPad Pro
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
                xs: "100%", // Mobile - full width
                sm: "80%", // Tablet - 80% width
                md: isIpadPro ? "25%" : "70%", // Adjusted for iPad Pro
              },
              mx: {
                xs: "auto", // Center on mobile
                md: isIpadPro ? "auto" : 0, // Center on iPad Pro
              },
            }}
          >
            <ButtonComp />
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
              xs: 1.5, // Mobile
              sm: 2, // Tablet
              md: isIpadPro ? 2 : 2.5, // Adjusted for iPad Pro
            }}
            sx={{
              maxWidth: {
                xs: "100%", // Mobile
                sm: "90%", // Tablet
                md: isIpadPro ? "95%" : "100%", // Adjusted for iPad Pro
              },
              margin: "0 auto",
            }}
          >
            {stats.map((stat, index) => (
              <Grid
                item
                xs={6} // 2 columns on mobile
                sm={4} // 3 columns on tablet
                md={isIpadPro ? 6 : 4} // 2 columns on iPad Pro, 3 on desktop
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <AnimatedItem
                  sx={{
                    width: {
                      xs: "100%", // Mobile
                      sm: "90%", // Tablet
                      md: isIpadPro ? "95%" : "100%", // Adjusted for iPad Pro
                    },
                    minHeight: {
                      xs: "120px", // Mobile
                      sm: "140px", // Tablet
                      md: isIpadPro ? "130px" : "160px", // Adjusted for iPad Pro
                    },
                    p: {
                      xs: 1.5, // Mobile
                      sm: 2, // Tablet
                      md: isIpadPro ? 2 : 3, // Adjusted for iPad Pro
                    },
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: {
                        xs: "1.1rem", // Mobile
                        sm: "1.4rem", // Small tablet
                        md: isIpadPro ? "1.3rem" : "1.6rem", // Adjusted for iPad Pro
                        lg: "1.8rem", // Desktop
                        xl: "2rem", // Large desktop
                      },
                      fontWeight: 700,
                      mb: {
                        xs: 0.5, // Mobile
                        sm: 1, // Tablet & Desktop
                        md: isIpadPro ? 0.5 : 1, // Adjusted for iPad Pro
                      },
                      color: "white",
                      fontFamily: "'Poppins', sans-serif",
                      display: "flex",
                      alignItems: "center",
                      gap: {
                        xs: 0.5, // Mobile
                        sm: 1, // Tablet & Desktop
                        md: isIpadPro ? 0.5 : 1, // Adjusted for iPad Pro
                      },
                      flexDirection: {
                        xs: "column", // Mobile - vertical
                        sm: "row", // Tablet & Desktop - horizontal
                        md: isIpadPro ? "column" : "row", // Column on iPad Pro
                      },
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        fontSize: {
                          xs: "1.5rem", // Mobile
                          sm: "1.8rem", // Tablet
                          md: isIpadPro ? "1.6rem" : "2rem", // Adjusted for iPad Pro
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
                          xs: "0.9rem", // Mobile
                          sm: "1.1rem", // Small tablet
                          md: isIpadPro ? "1rem" : "1.3rem", // Adjusted for iPad Pro
                          lg: "1.5rem", // Desktop
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
                        xs: "0.7rem", // Mobile
                        sm: "0.8rem", // Small tablet
                        md: isIpadPro ? "0.75rem" : "0.85rem", // Adjusted for iPad Pro
                        lg: "0.9rem", // Desktop
                      },
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.8)",
                      textTransform: "capitalize",
                      letterSpacing: "0.5px",
                      lineHeight: 1.3,
                      textAlign: "center",
                      mt: {
                        xs: 0.5, // Mobile
                        sm: 1, // Tablet & Desktop
                        md: isIpadPro ? 0.5 : 1, // Adjusted for iPad Pro
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
