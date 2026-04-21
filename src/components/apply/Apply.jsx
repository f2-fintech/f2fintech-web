"use client";

import { useEffect, useState, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import ButtonComp from "../common/button/Button";

const steps = [
  {
    number: 1,
    title: "Fill Application",
    text: "Complete our simple loan application form with your basic information",
    icon: "📝",
    color: "#6366f1",
  },
  {
    number: 2,
    title: "Compare Offers",
    text: "Review and compare multiple loan offers from different lenders",
    icon: "⚖️",
    color: "#8b5cf6",
  },
  {
    number: 3,
    title: "Verification",
    text: "Quick document verification and KYC process for approval",
    icon: "✅",
    color: "#06b6d4",
  },
  {
    number: 4,
    title: "Get Funds",
    text: "Receive your approved funds directly in your account",
    icon: "💰",
    color: "#10b981",
  },
];

const StyledCard = styled(Box)(({ translateX, scale, opacity, color }) => ({
  width: "350px",
  maxWidth: "90vw",
  borderRadius: "20px",
  padding: "2rem",
  boxShadow: `0 10px 30px rgba(0, 0, 0, 0.1)`,
  transform: `translateX(${translateX}px) scale(${scale})`,
  opacity: opacity,
  transition: "all 0.6s ease",
  textAlign: "center",
  border: `2px solid ${opacity > 0.8 ? color : "transparent"}`,
  position: "absolute",
  left: "50%",
  marginLeft: "-175px",

  // iPhone SE specific card adjustments
  "@media (max-width: 375px)": {
    width: "280px",
    marginLeft: "-140px",
    padding: "1.5rem",
  },

  "@media (min-width: 376px) and (max-width: 414px)": {
    width: "300px",
    marginLeft: "-150px",
    padding: "1.8rem",
  },
}));

export default function Apply() {
  const [currentStep, setCurrentStep] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerTop = rect.top;
      const containerBottom = rect.bottom;
      const windowHeight = window.innerHeight;

      // Define trigger positions in viewport
      const startTrigger = windowHeight * 0.3;
      const endTrigger = windowHeight * 0.7;

      // Calculate progress only when any part is within the scroll range
      if (containerBottom > startTrigger && containerTop < endTrigger) {
        const scrollDistance = endTrigger - startTrigger;
        const scrolled =
          Math.min(
            endTrigger,
            Math.max(startTrigger, windowHeight - containerTop)
          ) - startTrigger;

        const scrollProgress = Math.min(
          1,
          Math.max(0, scrolled / scrollDistance)
        );
        const stepProgress = scrollProgress * (steps.length - 1);
        const newCurrentStep = Math.round(stepProgress);

        setCurrentStep(Math.max(0, Math.min(steps.length - 1, newCurrentStep)));
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getCardProps = (index) => {
    const diff = index - currentStep;

    if (diff === 0) {
      // Center card
      return { translateX: 0, scale: 1, opacity: 1 };
    } else if (diff === -1) {
      // Previous card (moving right)
      return { translateX: 400, scale: 0.8, opacity: 0.5 };
    } else if (diff === 1) {
      // Next card (coming from left)
      return { translateX: -400, scale: 0.8, opacity: 0.5 };
    } else {
      // Hidden cards
      return { translateX: diff < 0 ? 600 : -600, scale: 0.6, opacity: 0 };
    }
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isIpadPro = useMediaQuery(
    "only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (-webkit-min-device-pixel-ratio: 2)"
  );

  return (
    <Box
      sx={{
        position: "relative",
        height: isMobile ? "80vh" : isIpadPro ? "60vh" : "90vh",

        // iPhone SE and similar small screens (375px and below)
        "@media (max-width: 375px)": {
          height: "85vh", // Increased height for iPhone SE
          minHeight: "200px", // Ensure minimum height
        },

        // iPhone 6/7/8 Plus, iPhone X/XS/11 Pro (414px and below)
        "@media (min-width: 376px) and (max-width: 414px)": {
          height: "80vh",
          minHeight: "620px",
        },

        // iPhone 12/13/14 Pro Max, Pixel devices (428px-430px)
        "@media (min-width: 415px) and (max-width: 430px)": {
          height: "78vh",
          minHeight: "600px",
        },

        // Samsung Galaxy S20/S21, Pixel 5 (393px-412px)
        "@media (min-width: 390px) and (max-width: 412px)": {
          height: "82vh",
          minHeight: "610px",
        },

        // iPad Mini and small tablets (768px-820px)
        "@media (max-width: 820px)": {
          height: "70vh",
        },

        // Landscape mode for small screens
        "@media (max-width: 896px) and (orientation: landscape)": {
          height: "100vh",
          minHeight: "500px",
        },
      }}
    >
      {/* Title Section - Made more compact */}
      <Container
        sx={{
          py: {
            xs: 2, // Reduced for mobile
            sm: 3,
            md: 4
          },
          textAlign: "center",

          // iPhone SE specific title spacing
          "@media (max-width: 375px)": {
            py: 1.5,
            px: 2,
          },

          "@media (min-width: 376px) and (max-width: 414px)": {
            py: 2,
          },

          "&:before": {
            content: '""',
            position: "absolute",
            top: -10,
            right: 50,
            width: 150,
            height: 150,
            borderRadius: "50%",
            background: "rgba(50, 68, 230, 0.08)",
            zIndex: 0,

            // Hide decorative elements on very small screens
            "@media (max-width: 414px)": {
              display: "none",
            },
          },
          "&:after": {
            content: '""',
            position: "absolute",
            top: 400,
            right: 800,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(50, 68, 230, 0.08)",

            // Hide decorative elements on small screens
            "@media (max-width: 768px)": {
              display: "none",
            },
          },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            lineHeight: {
              xs: 1.3,
              sm: 1.2
            },
            fontSize: {
              xs: "1.75rem",
              sm: "2rem",
              md: "2.5rem",
              lg: "2.8rem"
            },
            fontFamily: "Poppins",
            color: "#1a202c",
            mb: {
              xs: 1,
              sm: 1.5
            },

            // iPhone SE specific font size
            "@media (max-width: 375px)": {
              fontSize: "1.5rem",
              lineHeight: 1.3,
            },

            "@media (min-width: 376px) and (max-width: 414px)": {
              fontSize: "1.6rem",
            },
          }}
        >
          Apply in{" "}
          <Box
            component="span"
            sx={{
              background: "linear-gradient(45deg, #6366f1, #8b5cf6)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
            }}
          >
            4 Simple Steps
          </Box>
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "#64748b",
            mb: {
              xs: 1.5,
              sm: 2
            },
            fontSize: {
              xs: "0.8rem",
              sm: "0.9rem",
              md: "1rem"
            },

            // iPhone SE specific font size
            "@media (max-width: 375px)": {
              fontSize: "0.75rem",
              mb: 1,
            },

            "@media (min-width: 376px) and (max-width: 414px)": {
              fontSize: "0.8rem",
            },
          }}
        >
          Scroll down to see each step
        </Typography>
      </Container>

      {/* Scrolling Cards Section - Made more compact */}
      <Box
        ref={containerRef}
        sx={{
          height: {
            xs: "55vh",
            sm: "60vh",
            md: "60vh"
          },
          position: "relative",

          // iPhone SE specific height
          "@media (max-width: 375px)": {
            height: "50vh",
            minHeight: "380px",
          },

          "@media (min-width: 376px) and (max-width: 414px)": {
            height: "52vh",
            minHeight: "400px",
          },

          // Landscape mode adjustment
          "@media (max-width: 896px) and (orientation: landscape)": {
            height: "70vh",
            minHeight: "350px",
          },
        }}
      >
        {/* Sticky Container for Cards - Adjusted positioning */}
        <Box
          sx={{
            position: "sticky",
            marginTop: {
              xs: "5vh",
              sm: "8vh",
              md: "10vh"
            },
            transform: {
              xs: "translateY(-15%)",
              sm: "translateY(-20%)"
            },
            height: {
              xs: "45vh",
              sm: "50vh",
              md: "50vh"
            },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",

            // iPhone SE specific sticky container
            "@media (max-width: 375px)": {
              marginTop: "3vh",
              height: "42vh",
              transform: "translateY(-10%)",
            },

            "@media (min-width: 376px) and (max-width: 414px)": {
              marginTop: "4vh",
              height: "44vh",
              transform: "translateY(-12%)",
            },

            // Landscape mode
            "@media (max-width: 896px) and (orientation: landscape)": {
              marginTop: "2vh",
              height: "60vh",
              transform: "translateY(-5%)",
            },
          }}
        >
          {/* Cards */}
          {steps.map((step, index) => {
            const cardProps = getCardProps(index);
            // Adjust card animation distance for mobile
            const isMobileDevice = window.innerWidth <= 768;
            const adjustedTranslateX = isMobileDevice ?
              (cardProps.translateX !== 0 ? (cardProps.translateX > 0 ? 250 : -250) : 0) :
              cardProps.translateX;

            return (
              <StyledCard
                key={step.number}
                translateX={adjustedTranslateX}
                scale={cardProps.scale}
                opacity={cardProps.opacity}
                color={step.color}
              >
                {/* Number Circle - Made smaller on mobile */}
                <Box
                  sx={{
                    width: {
                      xs: "40px",
                      sm: "45px",
                      md: "50px"
                    },
                    height: {
                      xs: "40px",
                      sm: "45px",
                      md: "50px"
                    },
                    borderRadius: "50%",
                    backgroundColor: step.color,
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: {
                      xs: "1rem",
                      sm: "1.1rem",
                      md: "1.2rem"
                    },
                    fontWeight: "bold",
                    margin: "0 auto 0.75rem auto",

                    // iPhone SE specific circle
                    "@media (max-width: 375px)": {
                      width: "35px",
                      height: "35px",
                      fontSize: "0.9rem",
                      marginBottom: "0.6rem",
                    },
                  }}
                >
                  {step.number}
                </Box>

                {/* Icon - Smaller on mobile */}
                <Box sx={{
                  fontSize: {
                    xs: "2rem",
                    sm: "2.2rem",
                    md: "2.5rem"
                  },
                  mb: {
                    xs: 1,
                    sm: 1.2,
                    md: 1.5
                  },

                  "@media (max-width: 375px)": {
                    fontSize: "1.8rem",
                    mb: 0.8,
                  },
                }}>
                  {step.icon}
                </Box>

                {/* Title - Adjusted spacing */}
                <Typography
                  variant="h5"
                  fontFamily="Poppins"
                  sx={{
                    fontWeight: 600,
                    color: "#1a202c",
                    mb: {
                      xs: 1,
                      sm: 1.2,
                      md: 1.5
                    },
                    fontSize: {
                      xs: "1rem",
                      sm: "1.1rem",
                      md: "1.2rem"
                    },

                    "@media (max-width: 375px)": {
                      fontSize: "0.9rem",
                      mb: 0.8,
                    },
                  }}
                >
                  {step.title}
                </Typography>

                {/* Description - Adjusted spacing */}
                <Typography
                  variant="body1"
                  fontFamily="Poppins"
                  sx={{
                    color: "#64748b",
                    lineHeight: {
                      xs: 1.4,
                      sm: 1.5
                    },
                    fontSize: {
                      xs: "0.75rem",
                      sm: "0.85rem",
                      md: "0.9rem"
                    },

                    "@media (max-width: 375px)": {
                      fontSize: "0.7rem",
                      lineHeight: 1.3,
                    },

                    "@media (min-width: 376px) and (max-width: 414px)": {
                      fontSize: "0.75rem",
                    },
                  }}
                >
                  {step.text}
                </Typography>
              </StyledCard>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}