import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { Box, useMediaQuery } from "@mui/material";
import { Padding } from "@mui/icons-material";
import { useTheme } from "@emotion/react";

const SpotlightText = (props) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setMousePosition({ x, y });
  };
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box
      onMouseMove={handleMouseMove}
      style={{
        margin: "0 auto",
        width: props.width || "80%",
        display: "flex",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: "black", // Page background

        // padding:  "40px",  
        Padding:{
          xs:"5px", sm:'10px', md:'40px',
        },
        // border: "1px solid red",
      }}
    >
      <Typography
        sx={{
          position: "relative",
          color: "rgba(255, 255, 255, 0.2)", // Increase default visibility
          textShadow: "0 0 5px rgba(255, 255, 255, 0.3)", // Add a subtle glow
          fontFamily: "DM Sans",
          // lineHeight: "55px",
          lineHeight: {
            xs: "30px",
            sm: "55px",
            md: "55px",
            xl: "60px",
          },
          letterSpacing: "0.05rem",
          fontWeight: "600",
          fontSize: {
            xs: "4vw", // Larger for mobile readability
            sm: "3.2vw",
            md: "2.7vw",
            xl: "2.5vw",
          },
            textAlign: 'center',
            ...(isDesktop && {
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 1) 100px, rgba(255, 255, 255, 0) 300px)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              transition: 'background 0.1s ease',
            }),
          }}
      >
        We're F2Fintech, the one-stop destination for easing the loan process in
        India. We help you navigate the complex world of finance. <br /> We have
        you covered, regardless of the type of loan you require. We carefully
        consider your specific scenario to ensure you get the best possible
        offer. <br /> And here's something to be proud of <br />
        since our inception, we've made over 11,000 clients happy.
      </Typography>
    </Box>
  );
};

export default SpotlightText;
