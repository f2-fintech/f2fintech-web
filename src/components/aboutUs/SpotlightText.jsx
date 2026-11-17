import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const SpotlightText = (props) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
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
        height: isTablet ? "45vh" : "auto",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: {
          xs: "1.5rem 1rem",
          sm: "2rem 1.5rem",
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
            xs: "90%",
            sm: "95%",
            md: props.width || "80%",
          },
          display: "flex",
          justifyContent: "center",
          overflow: "hidden",
          backgroundColor: theme.palette.background.default,
          marginTop: {
            xs: "0",
            sm: "0",
            md: "2px",
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
              xs: "1.6",
              sm: "1.8",
              md: "1.2",
              lg: "1.6",
              xl: "1.6",
            },
            letterSpacing: {
              xs: "0.03rem",
              sm: "0.04rem",
              md: "0.05rem",
            },
            fontWeight: {
              xs: "700",
              sm: "600",
              md: "700",
            },
            fontSize: {
              xs: "1.1rem",
              sm: "1.3rem",
              md: "2vw",
              lg: "2.3vw",
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
                We're <strong>F2 Fintech</strong>, the one-stop destination for
                easing the loan process in India.
              </Box>
              <Box component="span" sx={{ display: "block", mb: 2 }}>
                We help you navigate the complex world of finance with tailored
                solutions for all loan types.
              </Box>
              <Box component="span" sx={{ display: "block", mb: 2 }}>
                And here's something to be proud of: we've made over{" "}
                <strong>11,000+ clients happy</strong> since inception.
              </Box>
            </>
          ) : (
            <>
              <Box component="span" sx={{ display: "block", mb: 2 }}>
                F2 Fintech is a digital financial services platform that helps individuals across India compare and apply for loans, credit cards, insurance, and investment products in one place.
              </Box>
              <Box component="span" sx={{ display: "block", mb: 2 }}>
                By combining technology with real financial insights, we guide users toward options that match their profile, making the process faster, simpler, and more reliable.
              </Box>
            </>
          )}
        </Typography>
      </Box>
    </Box>
  );
};

export default SpotlightText;
