import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion, useAnimation } from "framer-motion";

const steps = [
  {
    number: 1,
    icon: "/money.webp",
    title: "Enter your ",
    description: "personal, business & bank details to get a fair loan offer",
    src: "/stackinggif.gif",
  },
  {
    number: 2,
    icon: "/window.webp",
    title: "Compare the ",
    description: " loan offers & choose the best suited option",
    src: "/stacking2.gif",
  },
  {
    number: 3,
    icon: "/customer1.webp",
    title: "Accept the",
    description: " loan offer & complete your documentation & KYC",
    src: "/stacking3.gif",
  },
  {
    number: 4,
    icon: "/loan1.webp",
    title: "Choose from",
    description: "flexible repayment options and start receiving funds",
    src: "/stacking4.gif",
  },
];

const Card = ({ step, isActive, index, activeIndex }) => {
  const controls = useAnimation();

  useEffect(() => {
    if (isActive) {
      controls.start({
        opacity: 1,
        scale: 1,
        zIndex: 10,
        y: 0,
      });
    } else {
      const distance = Math.abs(activeIndex - index);
      controls.start({
        opacity: 0.5,
        scale: 1 - distance * 0.05, // Reduce scale for further cards
        zIndex: 10 - distance,
        y: distance * 30, // Offset inactive cards downwards slightly
      });
    }
  }, [isActive, index, activeIndex, controls]);
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0.5, scale: 0.9, zIndex: 0, y: 0 }}
      animate={controls}
      transition={{ duration: 0.5 }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        transform: "translate(-50%, -50%)",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        height={{
          xs: "40vh",
          md: "70vh",
          xl: "85vh",
        }}
        // flexDirection= {{xs:'column', md:'row', xl:'row'}}
        sx={{
          // width: "90%",

          width: {
            xs: "100%",
            md: "90%",
            xl: "110%",
          },
          // bgcolor: theme.palette.secondary.main,
          // backgroundImage:"url(caltheme5.webp)",
          backgroundColor: "#e1eaf2ff",
          backdropFilter: "blur(15px)",
          borderRadius: "20px",
          p: 4,
          border: "2px solid black",
          display: "flex",
          flexDirection: {
            xs: "column", // For extra small screens
            md: "row", // For medium screens and up
            xl: "row", // For extra-large screens
          },
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 0 10px ${theme.palette.secondary.main}`,
        }}
      >
        <Box
          sx={{
            display: {
              xs: "flex",
            },
            flexDirection: {
              xs: "column",
            },
            alignItems: {
              xs: "center",
            },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              position: "absolute",
              top: 20,
              left: 20,
              // width: 40,
              width: {
                xs: 25,
                md: 40,
              },
              height: {
                xs: 25,
                md: 40,
              },
              borderRadius: "50%",
              bgcolor: (() => {
                switch (step.number) {
                  case 1:
                    return theme.palette.secondary.main;
                  case 2:
                    return theme.palette.secondary.main;
                  case 3:
                    return theme.palette.secondary.main;
                  case 4:
                    return theme.palette.secondary.main;
                  default:
                    return theme.palette.secondary.main;
                }
              })(),
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: {
                xs: "300",
                md: "bold",
              },
              textAlign: {
                xs: "center",
              },
            }}
          >
            {step.number}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              // color: "#50C878",
              maxWidth: "80%",
              // fontSize: "3.3vw",
              fontSize: {
                xs: "5.3vw",
                md: "3.3vw",
                xl: "4vw",
              },
              fontFamily: "DM sans ",
              fontWeight: {
                xs: "500",
                md: "700",
              },
              // color: theme.palette.whitetext.white,
              color: "#3244e6",

              // marginLeft: "3vw",
              textAlign: {
                xs: "center",
              },
            }}
          >
            {step.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: {
                xs: "center", // Center alignment for extra small screens
                sm: "inherit", // Default alignment for other screens
              },
              display: {
                xs: "flex",
              },
              alignItems: {
                xs: "center",
              },
              maxWidth: "80%",
              fontSize: { md: "2vw", xs: "3.5vw" },
              fontFamily: "DM Sans",
              fontWeight: { md: "600", xs: "400" },
              color: theme.palette.whitetext.black,
            }}
          >
            {step.description}
          </Typography>
        </Box>

        {/* <Box
          component="img"
          src={step.icon}
          alt={`Step ${step.number}`}
          sx={{
            width: "30vw",
            height: "15vh",
            objectFit: "contain",
            mb: 3,
            mt: 2,
          }}
        /> */}
        <Box
          component="img"
          src={step.src}
          alt="Your GIF description"
          sx={{
            width: {
              xs: "60%", // For extra small screens
              sm: "30%",
              md: "35%", // For medium screens
              xl: "35%", // For extra-large screens
            },
            marginTop: {
              xs: "3vh",
              md: "0",
              xl: "0",
            },
            borderRadius: "20px",
          }}
        />
      </Box>
    </motion.div>
  );
};

Card.propTypes = {
  step: PropTypes.shape({
    number: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
};

const StackingCards = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { top, bottom, height } =
          containerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Ensure the component is in view before calculating steps
        if (top < viewportHeight / 5 && bottom > 0) {
          const scrollFactor = 0.5; // Adjust this value for shorter scroll
          const stepHeight = (height / steps.length) * scrollFactor;

          const scrollPosition = Math.abs(top);
          const newActiveIndex = Math.min(
            steps.length - 1,
            Math.max(0, Math.floor(scrollPosition / stepHeight))
          );

          setActiveIndex(newActiveIndex);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      ref={containerRef}
      sx={{
        width: "100%",
        height: `calc(${steps.length} * 50vh)`, // Dynamic height for shorter scroll
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          height: "80vh",
        }}
      >
        {steps.map((step, index) => (
          <Card
            key={step.number}
            step={step}
            isActive={index === activeIndex}
            index={index}
            activeIndex={activeIndex}
          />
        ))}
      </Box>
    </Box>
  );
};

export default StackingCards;
