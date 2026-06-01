import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Container, useMediaQuery } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import { WifiOff, ServerOff, Zap, Globe, Lock, RefreshCw } from "lucide-react";

const injectStyles = `
@keyframes pulseGlow {
  0%, 100% { opacity: 0.18; filter: blur(80px); }
  50% { opacity: 0.35; filter: blur(100px); }
}
@keyframes laserSweep {
  0% { top: 0%; opacity: 0; }
  10% { opacity: 0.8; }
  90% { opacity: 0.8; }
  100% { top: 100%; opacity: 0; }
}
@keyframes cyberGlitch {
  0% { transform: translate(0) }
  20% { transform: translate(-2px, 1px) }
  40% { transform: translate(-1px, -1px) }
  60% { transform: translate(2px, 2px) }
  80% { transform: translate(1px, -2px) }
  100% { transform: translate(0) }
}
.glitch-text-light:hover {
  animation: cyberGlitch 0.25s infinite linear alternate-reverse;
  text-shadow: 0 0 14px rgba(50, 68, 230, 0.5);
}
`;

const ErrorStatusPage = ({ type = "offline" }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));
  
  const [retryActive, setRetryActive] = useState(false);
  const [mounted, setMounted] = useState(false);

  const isOffline = type === "offline";

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRetry = () => {
    setRetryActive(true);
    setTimeout(() => {
      window.location.reload();
    }, 1200);
  };

  if (!mounted) return null;

  // Theme-aware colors
  const bgMain = theme.palette.background.default || "#ffffff";
  const accent = theme.palette.secondary?.main || "#3244e6";
  const accentDark = theme.palette.tertiary?.main || "#2c3ce3";
  const textPrimary = theme.palette.text.primary || "#000000";
  const grayBg = theme.palette.primary?.main || "#E1E1E1";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: injectStyles }} />
      <Box
        sx={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100vh", zIndex: 99999,
          backgroundColor: bgMain, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", overflow: "hidden",
          padding: { xs: "2rem 1rem", md: "4rem 2rem" }, boxSizing: "border-box",
        }}
      >
        {/* Ambient glow blobs */}
        <Box sx={{ position: "absolute", top: "-10%", left: "-10%", width: "50vw", height: "50vw", borderRadius: "50%",
          background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)`,
          animation: "pulseGlow 8s infinite ease-in-out", pointerEvents: "none", zIndex: 0 }} />
        <Box sx={{ position: "absolute", bottom: "-10%", right: "-10%", width: "50vw", height: "50vw", borderRadius: "50%",
          background: `radial-gradient(circle, ${accentDark}18 0%, transparent 70%)`,
          animation: "pulseGlow 10s infinite ease-in-out alternate", pointerEvents: "none", zIndex: 0 }} />

        {/* Floating Particles */}
        {[...Array(10)].map((_, i) => (
          <Box key={i} component={motion.div}
            initial={{ opacity: 0, x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000) }}
            animate={{ y: [null, -100], opacity: [0, 0.2, 0] }}
            transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, ease: "linear" }}
            sx={{ position: "absolute", width: "2px", height: "2px", background: accent, borderRadius: "50%", zIndex: 1 }}
          />
        ))}

        {/* Content Grid */}
        <Box sx={{ maxWidth: "1280px", width: "100%", display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1.1fr 0.9fr" },
          gap: { xs: "2.5rem", lg: "4rem" }, alignItems: "center", zIndex: 2 }}>

          {/* Left: Glassmorphic Browser */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <Box sx={{
              background: "rgba(255,255,255,0.7)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
              border: `1px solid ${grayBg}`, borderRadius: "16px", overflow: "hidden",
              boxShadow: `0 24px 64px rgba(0,0,0,0.08), 0 0 40px ${accent}10`, position: "relative",
            }}>
              {retryActive && (
                <Box sx={{ position: "absolute", left: 0, width: "100%", height: "3px",
                  background: `linear-gradient(to right, transparent, ${accent}, ${accentDark}, ${accent}, transparent)`,
                  animation: "laserSweep 2s infinite linear", zIndex: 10 }} />
              )}

              {/* Browser chrome bar */}
              <Box sx={{ background: grayBg, borderBottom: `1px solid ${grayBg}`,
                padding: "12px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", gap: "8px" }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ff5f56" }} />
                  <Box sx={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ffbd2e" }} />
                  <Box sx={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#27c93f" }} />
                </Box>
                <Box sx={{ background: "#fff", borderRadius: "8px", padding: "4px 16px",
                  width: { xs: "60%", sm: "70%" }, display: "flex", alignItems: "center", gap: "8px",
                  border: `1px solid ${grayBg}` }}>
                  <Lock size={12} color={accent} />
                  <Typography sx={{ fontSize: "12px", color: "rgba(0,0,0,0.5)", fontFamily: "monospace",
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    f2fintech.com/system-status
                  </Typography>
                </Box>
                <Globe size={16} color="rgba(0,0,0,0.35)" />
              </Box>

              {/* Browser body with Glitch Text */}
              <Box sx={{ padding: { xs: "2rem 1.5rem", sm: "3.5rem 3rem" }, textAlign: "center",
                position: "relative", minHeight: "340px", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center" }}>
                
                <Box sx={{ display: "inline-flex", padding: "12px", borderRadius: "50%",
                  background: "rgba(255,51,102,0.08)", color: "#ff3366", mb: "16px",
                  boxShadow: "0 0 20px rgba(255,51,102,0.12)" }}>
                  {isOffline ? <WifiOff size={36} /> : <ServerOff size={36} />}
                </Box>

                <Typography className="glitch-text-light" sx={{
                  fontSize: { xs: "5rem", md: "7rem" }, fontWeight: "900", lineHeight: "1", letterSpacing: "-2px",
                  color: accent,
                  filter: "drop-shadow(0px 10px 15px rgba(50, 68, 230, 0.2))",
                  cursor: "pointer", transition: "all 0.3s", mb: 2 }}>
                  {isOffline ? "OFF" : "503"}
                </Typography>
                
                <Typography sx={{ fontSize: { xs: "1.2rem", sm: "1.4rem" }, color: textPrimary,
                  fontWeight: "700", letterSpacing: "0.5px", mb: 1 }}>
                  {isOffline ? "Network Disconnected" : "Server Unavailable"}
                </Typography>
              </Box>
            </Box>
          </motion.div>

          {/* Right: Typography */}
          <Box sx={{ display: "flex", flexDirection: "column",
            alignItems: { xs: "center", lg: "flex-start" }, textAlign: { xs: "center", lg: "left" },
            position: "relative", justifyContent: "center" }}>

            <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1,
              background: `${accent}15`, padding: "6px 14px", borderRadius: "100px",
              border: `1px solid ${accent}33`, color: accent, mb: 3 }}>
              <Zap size={14} />
              <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: 1.2 }}>
                SYSTEM ALERT: {isOffline ? "NO SIGNAL" : "LINK ERROR"}
              </Typography>
            </Box>

            <Typography sx={{ fontSize: { xs: "2.2rem", sm: "3.2rem", lg: "4.2rem" }, fontWeight: 900,
              color: textPrimary, lineHeight: "1.1", mb: 2 }}>
              Whoops!<br/>
              <span style={{ color: accent, textShadow: `0 0 30px ${accent}40` }}>Signal Lost.</span>
            </Typography>
            
            <Typography sx={{ color: "rgba(0,0,0,0.6)", fontSize: "1.05rem", lineHeight: "1.7", mb: 4, maxWidth: 520 }}>
              {isOffline 
                ? "Our Tech-Bot accidentally unplugged the data stream while looking for coffee. He's currently trying to find the socket in the dark!"
                : "The vault is temporarily sealing its digital gates for a quick security polish. We'll be back in a flash."
              }
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: { xs: "center", lg: "flex-start" }, mb: 4 }}>
              <Button onClick={handleRetry} disabled={retryActive} startIcon={<RefreshCw size={18} className={retryActive ? "animate-spin" : ""} />}
                sx={{ backgroundColor: accent, color: "#fff", padding: "10px 24px", borderRadius: "30px",
                  fontSize: "0.95rem", fontWeight: "600", textTransform: "none",
                  boxShadow: `0 8px 24px ${accent}44`,
                  "&:hover": { backgroundColor: accentDark, boxShadow: `0 12px 30px ${accent}66`, transform: "translateY(-2px)" },
                  "&:disabled": { backgroundColor: `${accent}88`, color: "#fff" },
                  transition: "all 0.2s ease-in-out" }}>
                {retryActive ? "Restoring..." : "Help Robot Plug it Back"}
              </Button>
            </Box>
            
            <Box sx={{ opacity: 0.4 }}>
              <Typography variant="caption" sx={{ letterSpacing: 1, color: textPrimary, fontWeight: 600 }}>
                F2 FINTECH SECURE PROTOCOL • ENCRYPTED ID: ROBOT-V5
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ErrorStatusPage;
