import React, { useState } from "react";
import { Box, IconButton, Typography, Collapse } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const BrandBanner = () => {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 9998, // Just below potential chat widget
      }}
    >
      <Collapse in={open}>
        <Box
          sx={(theme) => ({
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            px: 2,
            py: 1,
            borderRadius: "50px",
            background: theme.palette.mode === "dark" 
              ? "rgba(30, 41, 59, 0.85)" 
              : "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(12px)",
            boxShadow: theme.palette.mode === "dark"
              ? "0 4px 20px rgba(0,0,0,0.4)"
              : "0 4px 20px rgba(0,0,0,0.1)",
            border: `1px solid ${theme.palette.divider}`,
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: theme.palette.mode === "dark"
                ? "0 6px 24px rgba(0,0,0,0.6)"
                : "0 6px 24px rgba(0,0,0,0.15)",
            }
          })}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'primary.main' }}>
            <AutoAwesomeIcon fontSize="small" />
          </Box>
          <Typography 
            variant="body2" 
            sx={{ 
              fontWeight: 600, 
              color: 'text.primary',
              letterSpacing: '0.3px',
              fontFamily: "'Inter', sans-serif"
            }}
          >
            Empowering your financial journey
          </Typography>
          <IconButton 
            size="small" 
            onClick={() => setOpen(false)}
            sx={{ ml: 1, p: 0.5, color: 'text.secondary', "&:hover": { color: 'text.primary' } }}
            aria-label="close banner"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </Collapse>
    </Box>
  );
};

export default BrandBanner;
