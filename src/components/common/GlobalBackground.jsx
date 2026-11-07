import React from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";

/**
 * GlobalBackground
 * - Fixed behind all content, full-screen
 * - Performance-optimized: only 3 blobs, low blur, no scroll listeners
 * - Completely disabled on mobile to preserve frame rate
 */
const GlobalBackground = () => {
  const theme = useTheme();
  // Disable on mobile & tablet - too GPU-heavy on small devices
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (isMobile) return null;

  const blobs = [
    {
      size: "550px",
      top: "-80px",
      left: "-120px",
      color: "radial-gradient(circle, rgba(50,68,230,0.15) 0%, rgba(50,68,230,0) 70%)",
      animation: "floatBlob1 14s ease-in-out infinite",
    },
    {
      size: "450px",
      top: "35%",
      right: "-80px",
      color: "radial-gradient(circle, rgba(50,68,230,0.08) 0%, rgba(50,68,230,0) 70%)",
      animation: "floatBlob2 18s ease-in-out infinite",
    },
    {
      size: "380px",
      top: "65%",
      left: "8%",
      color: "radial-gradient(circle, rgba(50,68,230,0.10) 0%, rgba(50,68,230,0) 70%)",
      animation: "floatBlob3 12s ease-in-out infinite",
    },
  ];

  return (
    <Box
      aria-hidden="true"
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        contain: "strict",
        "& ~ *": { position: "relative", zIndex: 1 },
        "@keyframes floatBlob1": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-25px)" },
        },
        "@keyframes floatBlob2": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(20px)" },
        },
        "@keyframes floatBlob3": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
      }}
    >
      {blobs.map((blob, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            width: blob.size,
            height: blob.size,
            top: blob.top,
            left: blob.left,
            right: blob.right,
            bottom: blob.bottom,
            background: blob.color,
            borderRadius: "50%",
            filter: "blur(15px)",
            animation: blob.animation,
            willChange: "transform",
          }}
        />
      ))}

      {/* Subtle grid dot overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle, rgba(50,68,230,0.06) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          opacity: 0.5,
        }}
      />
    </Box>
  );
};

export default GlobalBackground;
