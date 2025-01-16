import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { motion, useAnimation } from "framer-motion";

const steps = [
  {
    number: 1,
    icon: "/money.png",
    title: "Enter your ",
    description: "  personal, business & bank details to get a fair loan offer",
    src: "/enter78.gif",
  },
  {
    number: 2,
    icon: "/window.png",
    title: "Compare the ",
    description: " loan offers & choose the best suited option",
    src: "/compare78.gif",
  },
  {
    number: 3,
    icon: "/customer1.png",
    title: "Accept the",
    description: " loan offer & complete your documentation & KYC",
    src: "/Kyc78.gif",
  },
  {
    number: 4,
    icon: "/loan1.png",
    title: "Choose from",
    description: "flexible repayment options and start receiving funds",
    src: "/Choose78.gif",
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
        sx={{
          width: "90%",
          height: "70vh",
          // maxWidth: "600px",
          bgcolor: "#050505",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          p: 4,
          border: "1px solid rgba(255, 255, 255, 0.1)",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          boxShadow: "0 0  7px #FFD700",
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              position: "absolute",
              top: 20,
              left: 20,
              width: 40,
              height: 40,
              borderRadius: "50%",
              bgcolor: "#FFD700",
              color: "#000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
            }}
          >
            {step.number}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#50C878",
              maxWidth: "80%",
              fontSize: "3.3vw",
              fontFamily: "DM sans ",
              fontWeight: "700",
              marginLeft: "2vw",
            }}
          >
            {step.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "white",
              textAlign: "center",
              maxWidth: "80%",
              fontSize: "2vw",
              fontFamily: "DM sans ",
              fontWeight: "600",
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
        <img
          src={step.src}
          alt="Your GIF description"
          style={{
            // height: "50vh",
            width: "35%",
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
          bgcolor: "#000",
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
