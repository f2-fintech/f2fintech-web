import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Switch,
  FormControlLabel,
  IconButton,
  Link,
  Tooltip,
  Paper,
  Slide,
  Collapse,
} from "@mui/material";
import CookieIcon from "@mui/icons-material/Cookie";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import { Link as RouterLink } from "react-router-dom";

const CookieConsent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(true);
  const [marketingConsent, setMarketingConsent] = useState(true);
  const [hasSetConsent, setHasSetConsent] = useState(false);

  useEffect(() => {
    // Check if consent has already been saved
    const storedConsent = localStorage.getItem("f2fintech_cookie_consent");
    if (storedConsent) {
      try {
        const parsed = JSON.parse(storedConsent);
        setAnalyticsConsent(!!parsed.analytics);
        setMarketingConsent(!!parsed.marketing);
        setHasSetConsent(true);
      } catch (e) {
        console.error("Error parsing stored cookie consent", e);
      }
    } else {
      // Delay displaying the banner for a premium entrance feel
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleOpenEvent = () => {
      setShowPreferences(true);
      setIsOpen(true);
    };
    window.addEventListener("open-cookie-settings", handleOpenEvent);
    return () => {
      window.removeEventListener("open-cookie-settings", handleOpenEvent);
    };
  }, []);

  const handleAcceptAll = () => {
    saveConsent(true, true);
  };

  const handleRejectAll = () => {
    saveConsent(false, false);
  };

  const handleSavePreferences = () => {
    saveConsent(analyticsConsent, marketingConsent);
  };

  const saveConsent = (analyticsVal, marketingVal) => {
    const consent = {
      accepted: true,
      analytics: analyticsVal,
      marketing: marketingVal,
      timestamp: new Date().getTime(),
    };

    localStorage.setItem("f2fintech_cookie_consent", JSON.stringify(consent));
    setAnalyticsConsent(analyticsVal);
    setMarketingConsent(marketingVal);
    setHasSetConsent(true);
    setIsOpen(false);
    setShowPreferences(false);

    // 1. Update Google Consent Mode v2
    if (window.gtag) {
      window.gtag("consent", "update", {
        ad_storage: marketingVal ? "granted" : "denied",
        analytics_storage: analyticsVal ? "granted" : "denied",
        ad_user_data: marketingVal ? "granted" : "denied",
        ad_personalization: marketingVal ? "granted" : "denied",
      });
    }

    // 2. Update Meta Pixel Consent Mode
    if (window.fbq) {
      window.fbq("consent", marketingVal ? "grant" : "revoke");
    }
  };

  const handleOpenSettings = () => {
    setShowPreferences(true);
    setIsOpen(true);
  };

  return (
    <>
      {/* Floating Cookie Consent Banner */}
      <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
        <Paper
          elevation={12}
          sx={{
            position: "fixed",
            bottom: { xs: 0, sm: "24px" },
            right: { xs: 0, sm: "24px" },
            left: { xs: 0, sm: "auto" },
            maxWidth: { xs: "100%", sm: "460px" },
            width: "100%",
            borderRadius: { xs: "16px 16px 0 0", sm: "16px" },
            overflow: "hidden",
            zIndex: 99999,
            backgroundColor: "rgba(255, 255, 255, 0.90)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(50, 68, 230, 0.15)",
            boxShadow: "0 8px 32px 0 rgba(6, 55, 158, 0.12)",
            p: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            transition: "all 0.3s ease-in-out",
          }}
        >
          {/* Header */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center" gap={1}>
              <CookieIcon sx={{ color: "#3244e6", fontSize: 28 }} />
              <Typography
                variant="h6"
                fontWeight="700"
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  color: "#06379e",
                }}
              >
                Cookie Settings
              </Typography>
            </Box>
            {hasSetConsent && (
              <IconButton size="small" onClick={() => setIsOpen(false)} aria-label="close cookie settings">
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
          </Box>

          {/* Description */}
          <Typography
            variant="body2"
            sx={{
              color: "#333333",
              lineHeight: 1.6,
              fontSize: "0.85rem",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            We use cookies to improve your experience, serve personalized ads, and
            analyze site traffic. In accordance with the Indian DPDP Act 2023, you
            have full control over your preference settings. View our{" "}
            <Link
              component={RouterLink}
              to="/privacy-policy"
              onClick={() => setIsOpen(false)}
              sx={{
                color: "#3244e6",
                textDecoration: "underline",
                fontWeight: "600",
                "&:hover": { color: "#06379e" },
              }}
            >
              Privacy Policy
            </Link>
            .
          </Typography>

          {/* Granular Cookie Toggles */}
          <Collapse in={showPreferences}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                mt: 1,
                mb: 1,
                p: 2,
                borderRadius: "8px",
                backgroundColor: "rgba(6, 55, 158, 0.04)",
                border: "1px solid rgba(6, 55, 158, 0.08)",
              }}
            >
              {/* Necessary (Read-only) */}
              <Box display="flex" flexDirection="column" gap={0.5}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="subtitle2" fontWeight="600" color="#06379e">
                    Strictly Necessary
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: "600" }}>
                    Always Active
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Required for core website capabilities like security, user login, and form submissions.
                </Typography>
              </Box>

              {/* Analytics */}
              <Box display="flex" flexDirection="column" gap={0.5}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="subtitle2" fontWeight="600" color="#06379e">
                    Performance & Analytics
                  </Typography>
                  <Switch
                    size="small"
                    checked={analyticsConsent}
                    onChange={(e) => setAnalyticsConsent(e.target.checked)}
                    inputProps={{ "aria-label": "Performance & Analytics cookies" }}
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "#3244e6",
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                        backgroundColor: "#3244e6",
                      },
                    }}
                  />
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Helps us analyze user actions, measure traffic flow, and optimize page performance.
                </Typography>
              </Box>

              {/* Marketing */}
              <Box display="flex" flexDirection="column" gap={0.5}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="subtitle2" fontWeight="600" color="#06379e">
                    Targeting & Marketing
                  </Typography>
                  <Switch
                    size="small"
                    checked={marketingConsent}
                    onChange={(e) => setMarketingConsent(e.target.checked)}
                    inputProps={{ "aria-label": "Targeting & Marketing cookies" }}
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "#3244e6",
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                        backgroundColor: "#3244e6",
                      },
                    }}
                  />
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Enables personalized ads and helps measure marketing campaign performance (e.g. Meta Pixel, Google Ads).
                </Typography>
              </Box>
            </Box>
          </Collapse>

          {/* Action Buttons */}
          <Box
            display="flex"
            flexDirection={showPreferences ? "column" : { xs: "column", sm: "row" }}
            gap={1.5}
            width="100%"
          >
            {showPreferences ? (
              <>
                <Button
                  variant="contained"
                  onClick={handleSavePreferences}
                  sx={{
                    backgroundColor: "#3244e6",
                    color: "#ffffff",
                    textTransform: "none",
                    fontWeight: "600",
                    fontFamily: "'Poppins', sans-serif",
                    "&:hover": {
                      backgroundColor: "#06379e",
                    },
                    borderRadius: "8px",
                    py: 1,
                  }}
                >
                  Save My Preferences
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setShowPreferences(false)}
                  sx={{
                    borderColor: "rgba(50, 68, 230, 0.4)",
                    color: "#3244e6",
                    textTransform: "none",
                    fontWeight: "600",
                    fontFamily: "'Poppins', sans-serif",
                    "&:hover": {
                      borderColor: "#06379e",
                      backgroundColor: "rgba(50, 68, 230, 0.04)",
                    },
                    borderRadius: "8px",
                    py: 1,
                  }}
                >
                  Go Back
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="text"
                  size="small"
                  onClick={handleOpenSettings}
                  startIcon={<SettingsIcon />}
                  sx={{
                    color: "#3244e6",
                    textTransform: "none",
                    fontWeight: "600",
                    fontFamily: "'Poppins', sans-serif",
                    justifyContent: "flex-start",
                    alignSelf: { xs: "flex-start", sm: "center" },
                    p: 0,
                    minWidth: "auto",
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: "#06379e",
                      textDecoration: "underline",
                    },
                  }}
                >
                  Customize
                </Button>

                <Box
                  display="flex"
                  gap={1}
                  flex={1}
                  justifyContent={{ xs: "space-between", sm: "flex-end" }}
                  width={{ xs: "100%", sm: "auto" }}
                >
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleRejectAll}
                    sx={{
                      borderColor: "rgba(50, 68, 230, 0.4)",
                      color: "#3244e6",
                      textTransform: "none",
                      fontWeight: "600",
                      fontFamily: "'Poppins', sans-serif",
                      "&:hover": {
                        borderColor: "#06379e",
                        backgroundColor: "rgba(50, 68, 230, 0.04)",
                      },
                      borderRadius: "8px",
                      px: 2,
                      py: 0.75,
                      flex: { xs: 1, sm: "initial" },
                    }}
                  >
                    Reject All
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleAcceptAll}
                    sx={{
                      backgroundColor: "#3244e6",
                      color: "#ffffff",
                      textTransform: "none",
                      fontWeight: "600",
                      fontFamily: "'Poppins', sans-serif",
                      "&:hover": {
                        backgroundColor: "#06379e",
                      },
                      borderRadius: "8px",
                      px: 2,
                      py: 0.75,
                      flex: { xs: 1, sm: "initial" },
                    }}
                  >
                    Accept All
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Paper>
      </Slide>


    </>
  );
};

export default CookieConsent;
