import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const SpotlightText = (props) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md")); // Changed to md for better tablet handling
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setMousePosition({ x, y });
  };

  return (
    <Box
      sx={{
        height: "auto",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: {
          xs: "1.5rem 1rem", // Tighter padding on mobile
          sm: "2rem 1.5rem", // Adjusted for tablet
          md: "2.5rem",
        },
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Box
        onMouseMove={isDesktop ? handleMouseMove : undefined}
        sx={{
          margin: "0 auto",
          width: {
            xs: "90%", // Wider on mobile
            sm: "85%", // Slightly narrower on tablet
            md: props.width || "80%", // Desktop default
          },
          display: "flex",
          justifyContent: "center",
          overflow: "hidden",
          backgroundColor: theme.palette.background.default,
          marginTop: {
            xs: "0",
            sm: "0",
            md: "15px",
          },
          flexWrap: "wrap",
          position: "relative",
          ...(isTablet && {
            borderLeft: `4px solid ${theme.palette.primary.main}`,
            borderRight: `4px solid ${theme.palette.primary.main}`,
            padding: "0 1rem",
            borderRadius: "8px",
          }),
          ...(isMobile && {
            background: `linear-gradient(to right, ${theme.palette.background.default}, ${theme.palette.primary.light}, ${theme.palette.background.default})`,
            padding: "1rem",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }),
        }}
      >
        <Typography
          sx={{
            position: "relative",
            color: isDesktop
              ? `rgba(0, 0, 0, 0.2)`
              : theme.palette.text.primary,
            fontFamily: "DM Sans",
            lineHeight: {
              xs: "1.6", // Better for mobile reading
              sm: "1.8", // Tablet line height
              md: "2",
              xl: "3",
            },
            letterSpacing: {
              xs: "0.03rem", // Tighter on mobile
              sm: "0.04rem", // Slightly more on tablet
              md: "0.05rem",
            },
            fontWeight: {
              xs: "700", // Bolder on small screens
              sm: "600",
              md: "600",
            },
            fontSize: {
              xs: "1.1rem", // Fixed size for mobile
              sm: "1.3rem", // Fixed size for tablet
              md: "2.7vw",
              lg: "2.5vw",
              xl: "2.3vw",
            },
            transition: "all 0.3s ease",
            textAlign: "center",
            wordBreak: "break-word",
            whiteSpace: "pre-wrap",
            ...(isDesktop && {
              textShadow: "0 0 4px rgba(0, 0, 0, 0.4)",
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(44, 60, 227) 200px, rgba(255, 255,255, 0.8) 250px)`,
              WebkitBackgroundClip: "text",
              WebkitMaskImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255,255,1) 150px, rgba(255, 255,255,0.8) 170px)`,
              WebkitTextFillColor: "transparent",
              willChange: "background",
            }),
            ...(isTablet && {
              textShadow: "0 2px 4px rgba(0,0,0,0.1)",
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }),
            ...(isMobile && {
              textShadow: "0 1px 2px rgba(0,0,0,0.1)",
            }),
          }}
        >
          {isMobile || isTablet ? (
            <>
              <Box component="span" sx={{ display: "block", mb: 2 }}>
                We're <strong>F2Fintech</strong>, the one-stop destination for
                easing the loan process in India.
              </Box>
              <Box component="span" sx={{ display: "block", mb: 2 }}>
                We help you navigate the complex world of finance with tailored
                solutions for all loan types.
              </Box>
              <Box component="span" sx={{ display: "block", mb: 2 }}>
                And here's something to be proud of: we've made over{" "}
                <strong>11,000 clients happy</strong> since inception.
              </Box>
            </>
          ) : (
            <>
              We're F2Fintech, the one-stop destination for easing the loan
              process in India. We help you navigate the complex world of
              finance. We have you covered, regardless of the type of loan you
              require. We carefully consider your specific scenario to ensure
              you get the best possible offer. <br /> And here's something to be
              proud of <br />
              since our inception, we've made over 11,000 clients happy.
            </>
          )}
        </Typography>
      </Box>
    </Box>
  );
};

export default SpotlightText;
