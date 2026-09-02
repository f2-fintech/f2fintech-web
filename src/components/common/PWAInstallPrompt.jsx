import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Slide,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GetAppIcon from "@mui/icons-material/GetApp";
import InstallMobileIcon from "@mui/icons-material/InstallMobile";

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already running in standalone mode (already installed PWA)
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    if (isStandalone) {
      setIsInstalled(true);
      return;
    }

    // Check if user dismissed prompt recently
    const dismissedUntil = localStorage.getItem("pwa_install_dismissed_until");
    if (dismissedUntil && Number(dismissedUntil) > Date.now()) {
      return;
    }

    const handleBeforeInstallPrompt = (e) => {
      // Prevent default mini-infobar on mobile Chrome
      e.preventDefault();
      setDeferredPrompt(e);
      // Show custom banner after a 3-second delay for smooth UX
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 3000);

      return () => clearTimeout(timer);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show native install prompt
    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Dismiss for 7 days
    const nextWeek = Date.now() + 7 * 24 * 60 * 60 * 1000;
    localStorage.setItem("pwa_install_dismissed_until", nextWeek.toString());
  };

  if (!showPrompt || isInstalled) return null;

  return (
    <Slide direction="up" in={showPrompt} mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: "fixed",
          bottom: { xs: 16, sm: 24 },
          left: { xs: 16, sm: 24 },
          right: { xs: 16, sm: "auto" },
          maxWidth: { sm: 420 },
          zIndex: 9999,
          bgcolor: "#0f172a",
          color: "#ffffff",
          borderRadius: "18px",
          p: 2,
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(12px)",
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        {/* App Icon */}
        <Box
          component="img"
          src="/pwa-icon-192x192.png"
          alt="F2 Fintech Icon"
          sx={{
            width: 48,
            height: 48,
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
            flexShrink: 0,
          }}
        />

        {/* Text Details */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              fontSize: "0.92rem",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              gap: 0.6,
            }}
          >
            Install F2 Fintech App
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "#94a3b8",
              fontSize: "0.76rem",
              display: "block",
              lineHeight: 1.2,
              mt: 0.2,
            }}
          >
            Fast, instant access to loans & CIBIL score. Works offline!
          </Typography>
        </Box>

        {/* Install Button */}
        <Button
          variant="contained"
          size="small"
          onClick={handleInstallClick}
          startIcon={<InstallMobileIcon sx={{ fontSize: "1.1rem !important" }} />}
          sx={{
            bgcolor: "#1d2ebd",
            color: "#ffffff !important",
            "&, & *": { color: "#ffffff !important" },
            fontWeight: 700,
            fontSize: "0.8rem",
            textTransform: "none",
            borderRadius: "10px",
            px: 1.5,
            py: 0.8,
            whiteSpace: "nowrap",
            "&:hover": {
              bgcolor: "#172554",
            },
          }}
        >
          Install
        </Button>

        {/* Close Button */}
        <IconButton
          size="small"
          onClick={handleDismiss}
          sx={{
            color: "#94a3b8",
            p: 0.5,
            "&:hover": { color: "#ffffff", bgcolor: "rgba(255,255,255,0.1)" },
          }}
          aria-label="Close"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
    </Slide>
  );
};

export default PWAInstallPrompt;
