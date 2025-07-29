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
}));

export default function Apply() {
  // const [scrollY, setScrollY] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerTop = rect.top;
      const containerBottom = rect.bottom;
      const windowHeight = window.innerHeight;

      // Define 10% and 90% trigger positions in viewport
      const startTrigger = windowHeight * 0.4;
      const endTrigger = windowHeight * 0.8;

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
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // sm = 600px
  return (
    <Box
      sx={{
        position: "relative",
        height: isMobile ? "100vh" : "",
      }}
    >
      {/* Title Section */}
      <Container
        sx={{
          py: 8,
          textAlign: "center",
          "&:before": {
            content: '""',
            position: "absolute",
            top: -50,
            right: 100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(50, 68, 230, 0.08)",
            zIndex: 0,
          },
          "&:after": {
            content: '""',
            position: "absolute",
            top: 800,
            right: 1200,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(50, 68, 230, 0.05)",
          },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            lineHeight: "1.3",
            fontSize: { xs: "2.5rem", sm: "3rem", md: "3rem" },
            fontFamily: "Poppins",
            color: "#1a202c",
            mb: 2,
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
            }}
          >
            4 Simple Steps
          </Box>
        </Typography>
        <Typography variant="h6" sx={{ color: "#64748b", mb: 4 }}>
          Scroll down to see each step
        </Typography>
      </Container>

      {/* Scrolling Cards Section */}
      <Box
        ref={containerRef}
        sx={{
          height: "90vh", // 4 times viewport height for smooth scrolling
          position: "relative",
        }}
      >
        {/* Sticky Container for Cards */}
        <Box
          sx={{
            position: "sticky",
            marginTop: "20vh",
            transform: "translateY(-30%)",
            height: "60vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Cards */}
          {steps.map((step, index) => {
            const cardProps = getCardProps(index);
            return (
              <StyledCard
                key={step.number}
                translateX={cardProps.translateX}
                scale={cardProps.scale}
                opacity={cardProps.opacity}
                color={step.color}
              >
                {/* Number Circle */}
                <Box
                  sx={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    backgroundColor: step.color,
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    margin: "0 auto 1.5rem auto",
                  }}
                >
                  {step.number}
                </Box>

                {/* Icon */}
                <Box sx={{ fontSize: "3rem", mb: 2 }}>{step.icon}</Box>

                {/* Title */}
                <Typography
                  variant="h5"
                  fontFamily="Poppins"
                  sx={{
                    fontWeight: 600,
                    color: "#1a202c",
                    mb: 2,
                    fontSize: "1.4rem",
                  }}
                >
                  {step.title}
                </Typography>

                {/* Description */}
                <Typography
                  variant="body1"
                  fontFamily="Poppins"
                  sx={{
                    color: "#64748b",
                    lineHeight: 1.6,
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
