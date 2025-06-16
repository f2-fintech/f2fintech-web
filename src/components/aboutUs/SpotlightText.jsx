import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { Box, useMediaQuery } from "@mui/material";
import { Padding } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const SpotlightText = (props) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setMousePosition({ x, y });
  };
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Box
      sx={{
        height: "auto",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: {
          xs: "1.5rem",
          sm: "2rem",
          md: "2.5rem",
        },
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Box
        onMouseMove={handleMouseMove}
        sx={{
          margin: "0 auto",
          width: props.width || "80%",
          display: "flex",
          justifyContent: "center",
          overflow: "hidden",
          backgroundColor: theme.palette.background.default,

          marginTop: {
            xs: "0",
            sm: "0",
            md: "15px",
          },
          flexWrap: "wrap", // Responsive wrapping support
        }}
      >
        <Typography
          sx={{
            position: "relative",
            color: `rgba(0, 0, 0, ${isDesktop ? "0.2" : "0.9"})`,
            textShadow: "0 0 4px rgba(0, 0, 0, 0.4)",
            fontFamily: "DM Sans",
            lineHeight: {
              xs: "1.5",
              sm: "2",
              md: "2",
              xl: "3",
            },
            letterSpacing: "0.05rem",
            fontWeight: "600",
            fontSize: {
              xs: "4vw",
              sm: "3.2vw",
              md: "2.7vw",
              xl: "2.5vw",
            },
            transition: "background 0.1s ease",
            textAlign: "center",
            wordBreak: "break-word", // Prevent overflow
            whiteSpace: "pre-wrap", // Maintain text formatting
            ...(isDesktop && {
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(44, 60, 227) 200px, rgba(255, 255,255, 0.8) 250px)`,
              WebkitBackgroundClip: "text",
              WebkitMaskImage: isDesktop
                ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255,255,1) 150px, rgba(255, 255,255,0.8) 170px)`
                : "none",
              WebkitTextFillColor: "transparent",
              willChange: "background",
            }),
          }}
        >
          We're F2Fintech, the one-stop destination for easing the loan process
          in India. We help you navigate the complex world of finance. We have
          you covered, regardless of the type of loan you require. We carefully
          consider your specific scenario to ensure you get the best possible
          offer. <br /> And here's something to be proud of <br />
          since our inception, we've made over 11,000 clients happy.
        </Typography>
      </Box>
    </Box>
  );
};

export default SpotlightText;
