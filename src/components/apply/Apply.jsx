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

const StyledCard = styled( Box )( ( { translateX, scale, opacity, color } ) => ( {
  width: "350px",
  maxWidth: "90vw",
  borderRadius: "20px",
  padding: "2rem",
  boxShadow: `0 10px 30px rgba(0, 0, 0, 0.1)`,
  transform: `translateX(${ translateX }px) scale(${ scale })`,
  opacity: opacity,
  transition: "all 0.6s ease",
  textAlign: "center",
  border: `2px solid ${ opacity > 0.8 ? color : "transparent" }`,
  position: "absolute",
  left: "50%",
  marginLeft: "-175px",
} ) );

export default function Apply() {
  const [ currentStep, setCurrentStep ] = useState( 0 );
  const containerRef = useRef( null );

  useEffect( () => {
    const handleScroll = () => {
      if ( !containerRef.current ) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerTop = rect.top;
      const containerBottom = rect.bottom;
      const windowHeight = window.innerHeight;

      // Define trigger positions in viewport
      const startTrigger = windowHeight * 0.3; // Reduced from 0.4
      const endTrigger = windowHeight * 0.7; // Reduced from 0.8

      // Calculate progress only when any part is within the scroll range
      if ( containerBottom > startTrigger && containerTop < endTrigger ) {
        const scrollDistance = endTrigger - startTrigger;
        const scrolled =
          Math.min(
            endTrigger,
            Math.max( startTrigger, windowHeight - containerTop )
          ) - startTrigger;

        const scrollProgress = Math.min(
          1,
          Math.max( 0, scrolled / scrollDistance )
        );
        const stepProgress = scrollProgress * ( steps.length - 1 );
        const newCurrentStep = Math.round( stepProgress );

        setCurrentStep( Math.max( 0, Math.min( steps.length - 1, newCurrentStep ) ) );
      }
    };

    window.addEventListener( "scroll", handleScroll );
    handleScroll(); // Initial call
    return () => window.removeEventListener( "scroll", handleScroll );
  }, [] );

  const getCardProps = ( index ) => {
    const diff = index - currentStep;

    if ( diff === 0 ) {
      // Center card
      return { translateX: 0, scale: 1, opacity: 1 };
    } else if ( diff === -1 ) {
      // Previous card (moving right)
      return { translateX: 400, scale: 0.8, opacity: 0.5 };
    } else if ( diff === 1 ) {
      // Next card (coming from left)
      return { translateX: -400, scale: 0.8, opacity: 0.5 };
    } else {
      // Hidden cards
      return { translateX: diff < 0 ? 600 : -600, scale: 0.6, opacity: 0 };
    }
  };
  const theme = useTheme();
  const isMobile = useMediaQuery( theme.breakpoints.down( "sm" ) ); // sm = 600px
  return (
    <Box
      sx={ {
        position: "relative",
        height: isMobile ? "80vh" : "90vh", // Reduced height
        "@media (max-width: 375px)": {
          height: "90vh", // Reduced from 110vh
        },
        "@media (max-width: 414px)": {
          height: "90vh", // Reduced from 110vh
        },
      } }
    >
      {/* Title Section - Made more compact */ }
      <Container
        sx={ {
          py: 4, // Reduced from py: 8
          textAlign: "center",
          "&:before": {
            content: '""',
            position: "absolute",
            top: -10, // Adjusted position
            right: 50, // Adjusted position
            width: 150, // Reduced size
            height: 150, // Reduced size
            borderRadius: "50%",
            background: "rgba(50, 68, 230, 0.08)",
            zIndex: 0,
          },
          "&:after": {
            content: '""',
            position: "absolute",
            top: 400, // Adjusted position
            right: 800, // Adjusted position
            width: 300, // Reduced size
            height: 300, // Reduced size
            borderRadius: "50%",
            background: "rgba(50, 68, 230, 0.08)",
          },
        } }
      >
        <Typography
          variant="h1"
          sx={ {
            lineHeight: "1.2", // Reduced line height
            fontSize: { xs: "2rem", sm: "2.5rem", md: "2.8rem" }, // Reduced font sizes
            fontFamily: "Poppins",
            color: "#1a202c",
            mb: 1, // Reduced margin
          } }
        >
          Apply in{ " " }
          <Box
            component="span"
            sx={ {
              background: "linear-gradient(45deg, #6366f1, #8b5cf6)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            } }
          >
            4 Simple Steps
          </Box>
        </Typography>
        <Typography
          variant="h6"
          sx={ {
            color: "#64748b",
            mb: 2, // Reduced margin
            fontSize: { xs: "0.9rem", sm: "1rem" } // Reduced font size
          } }
        >
          Scroll down to see each step
        </Typography>
      </Container>

      {/* Scrolling Cards Section - Made more compact */ }
      <Box
        ref={ containerRef }
        sx={ {
          height: "60vh", // Reduced from 90vh
          position: "relative",
        } }
      >
        {/* Sticky Container for Cards - Adjusted positioning */ }
        <Box
          sx={ {
            position: "sticky",
            marginTop: "10vh", // Reduced from 20vh
            transform: "translateY(-20%)", // Adjusted transform
            height: "50vh", // Reduced height
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          } }
        >
          {/* Cards */ }
          { steps.map( ( step, index ) => {
            const cardProps = getCardProps( index );
            return (
              <StyledCard
                key={ step.number }
                translateX={ cardProps.translateX }
                scale={ cardProps.scale }
                opacity={ cardProps.opacity }
                color={ step.color }
              >
                {/* Number Circle - Made slightly smaller */ }
                <Box
                  sx={ {
                    width: "50px", // Reduced size
                    height: "50px", // Reduced size
                    borderRadius: "50%",
                    backgroundColor: step.color,
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.2rem", // Reduced font size
                    fontWeight: "bold",
                    margin: "0 auto 1rem auto", // Reduced margin
                  } }
                >
                  { step.number }
                </Box>

                {/* Icon - Made smaller */ }
                <Box sx={ { fontSize: "2.5rem", mb: 1.5 } }>{ step.icon }</Box>

                {/* Title - Adjusted spacing */ }
                <Typography
                  variant="h5"
                  fontFamily="Poppins"
                  sx={ {
                    fontWeight: 600,
                    color: "#1a202c",
                    mb: 1.5, // Reduced margin
                    fontSize: "1.2rem", // Reduced font size
                  } }
                >
                  { step.title }
                </Typography>

                {/* Description - Adjusted spacing */ }
                <Typography
                  variant="body1"
                  fontFamily="Poppins"
                  sx={ {
                    color: "#64748b",
                    lineHeight: 1.5, // Reduced line height
                    fontSize: "0.9rem", // Reduced font size
                  } }
                >
                  { step.text }
                </Typography>
              </StyledCard>
            );
          } ) }
        </Box>
      </Box>
    </Box>
  );
}