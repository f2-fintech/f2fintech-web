import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Home, Terminal, Globe, Lock, WifiOff, ShieldAlert, Server, ChevronRight } from "lucide-react";

const injectStyles = `
@keyframes cyberGlitch {
  0% { transform: translate(0) }
  20% { transform: translate(-2px, 1px) }
  40% { transform: translate(-1px, -1px) }
  60% { transform: translate(2px, 2px) }
  80% { transform: translate(1px, -2px) }
  100% { transform: translate(0) }
}
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
.glitch-text-light:hover {
  animation: cyberGlitch 0.25s infinite linear alternate-reverse;
  text-shadow: 0 0 14px rgba(50, 68, 230, 0.5);
}
`;

const NotFoundPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  const location = useLocation();
  const badPath = `f2fintech.com${location.pathname}`;

  const [progress, setProgress] = useState(0);
  const [loadState, setLoadState] = useState("loading");
  const [retryCount, setRetryCount] = useState(0);
  const [logsOpen, setLogsOpen] = useState(false);
  const [typedLogs, setTypedLogs] = useState([]);
  const terminalEndRef = useRef(null);

  const diagnosticsLogs = [
    "[00:01:02] [SYSTEM] Initiating handshake with F2 Fintech core API...",
    "[00:01:03] [SYSTEM] Host resolved to secure-vault.f2fintech.internal.",
    "[00:01:03] [SECURITY] AES-256 encryption handshake verified. Status: OK.",
    "[00:01:04] [LEDGER] Loading transactional ledger and gold-backing coefficients...",
    `[00:01:05] [NETWORK] Querying router: GET https://f2fintech.com${location.pathname}`,
    "[00:01:06] [ROUTING] WARNING: Target endpoint was not registered in active gateway node mapping.",
    "[00:01:06] [SERVER] ERROR 404: RESOURCE_NOT_FOUND (Ledger node is missing or deprecated).",
    "[00:01:07] [DIAGNOSTIC] Connection halted at 99%. Thread state: EXPIRED.",
    "[00:01:07] [SYSTEM] CRITICAL: Page rendering aborted. Please redirect back to active secure home portal.",
  ];

  const retryLogs = [
    `[00:02:15] [SYSTEM] Re-initiating connection (Retry attempt #${retryCount + 1})...`,
    "[00:02:16] [NETWORK] Clearing cache and DNS buffers... Done.",
    "[00:02:16] [SECURITY] Re-authenticating SSL handshake... Verified.",
    "[00:02:17] [DATA] Fetching backup node server: backup-vault.f2fintech.internal",
    "[00:02:18] [SERVER] ERROR 404: CONNECTION_REFUSED (Server node offline).",
    "[00:02:18] [SYSTEM] Reload failed. core-vault is still unreachable.",
  ];

  useEffect(() => {
    if (terminalEndRef.current) terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [typedLogs, logsOpen]);

  useEffect(() => {
    let timer;
    if (loadState === "loading" || loadState === "retrying") {
      setProgress(0);
      let cur = 0;
      const tick = () => {
        if (cur < 99) {
          const jump = Math.max(1, Math.min(15, Math.floor(Math.random() * ((99 - cur) / 3 + 2))));
          cur = Math.min(cur + jump, 99);
          setProgress(cur);
          timer = setTimeout(tick, cur > 80 ? 400 + Math.random() * 400 : 80 + Math.random() * 150);
        } else {
          setTimeout(() => setLoadState("failed"), 800);
        }
      };
      timer = setTimeout(tick, 200);
    }
    return () => clearTimeout(timer);
  }, [loadState, retryCount]);

  useEffect(() => {
    let idx = 0, t;
    const src = loadState === "failed" && retryCount > 0 ? [...diagnosticsLogs, ...retryLogs] : diagnosticsLogs;
    if (logsOpen) {
      setTypedLogs([]);
      const next = () => {
        if (idx < src.length) { setTypedLogs(p => [...p, src[idx]]); idx++; t = setTimeout(next, 350 + Math.random() * 250); }
      };
      next();
    }
    return () => clearTimeout(t);
  }, [logsOpen, loadState, retryCount]);

  const handleRetry = () => { setRetryCount(p => p + 1); setLoadState("retrying"); };
  const handleBackToHome = () => navigate("/");

  // Theme-aware colors
  const bgMain = theme.palette.background.default; // #ffffff
  const accent = theme.palette.secondary.main;     // #3244e6
  const accentDark = theme.palette.tertiary.main;  // #2c3ce3
  const textPrimary = theme.palette.text.primary;   // #000
  const grayBg = theme.palette.primary.main;        // #E1E1E1

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Page Not Found - 404 | F2 Fintech</title>
      </Helmet>
      <style dangerouslySetInnerHTML={{ __html: injectStyles }} />

      <Box sx={{
        backgroundColor: bgMain,
        minHeight: "100vh", width: "100%",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: { xs: "2rem 1rem", md: "4rem 2rem" },
        overflow: "hidden", position: "relative", boxSizing: "border-box",
      }}>
        {/* Ambient glow blobs */}
        <Box sx={{ position: "absolute", top: "-10%", left: "-10%", width: "50vw", height: "50vw", borderRadius: "50%",
          background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)`,
          animation: "pulseGlow 8s infinite ease-in-out", pointerEvents: "none", zIndex: 0 }} />
        <Box sx={{ position: "absolute", bottom: "-10%", right: "-10%", width: "50vw", height: "50vw", borderRadius: "50%",
          background: `radial-gradient(circle, ${accentDark}18 0%, transparent 70%)`,
          animation: "pulseGlow 10s infinite ease-in-out alternate", pointerEvents: "none", zIndex: 0 }} />

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
              {/* Laser scanline */}
              {(loadState === "loading" || loadState === "retrying") && (
                <Box sx={{ position: "absolute", left: 0, width: "100%", height: "3px",
                  background: `linear-gradient(to right, transparent, ${accent}, ${accentDark}, ${accent}, transparent)`,
                  animation: "laserSweep 2s infinite linear", zIndex: 10 }} />
              )}

              {/* Browser chrome bar */}
              <Box sx={{ background: grayBg, borderBottom: `1px solid ${grayBg}`,
                padding: "12px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", gap: "8px" }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ff5f56", cursor: "pointer" }} onClick={handleBackToHome} />
                  <Box sx={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ffbd2e" }} />
                  <Box sx={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#27c93f" }} />
                </Box>
                <Box sx={{ background: "#fff", borderRadius: "8px", padding: "4px 16px",
                  width: { xs: "60%", sm: "70%" }, display: "flex", alignItems: "center", gap: "8px",
                  border: `1px solid ${grayBg}` }}>
                  <Lock size={12} color={accent} />
                  <Typography sx={{ fontSize: "12px", color: "rgba(0,0,0,0.5)", fontFamily: "monospace",
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {badPath}
                  </Typography>
                </Box>
                <Globe size={16} color="rgba(0,0,0,0.35)" />
              </Box>

              {/* Browser body */}
              <Box sx={{ padding: { xs: "2rem 1.5rem", sm: "3.5rem 3rem" }, textAlign: "center",
                position: "relative", minHeight: "340px", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center" }}>

                <AnimatePresence mode="wait">
                  {loadState === "failed" ? (
                    <motion.div key="err" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4 }} style={{ width: "100%" }}>
                      <Box sx={{ display: "inline-flex", padding: "12px", borderRadius: "50%",
                        background: "rgba(255,51,102,0.08)", color: "#ff3366", mb: "16px",
                        boxShadow: "0 0 20px rgba(255,51,102,0.12)" }}>
                        <ShieldAlert size={36} />
                      </Box>
                      <Typography className="glitch-text-light" sx={{
                        fontSize: { xs: "5rem", md: "8rem" }, fontWeight: "900", lineHeight: "1", letterSpacing: "-2px",
                        color: accent,
                        filter: "drop-shadow(0px 10px 15px rgba(50, 68, 230, 0.2))",
                        cursor: "pointer", transition: "all 0.3s", mb: 1 }}>
                        404
                      </Typography>
                      <Typography sx={{ fontSize: { xs: "1.2rem", sm: "1.6rem" }, color: textPrimary,
                        fontWeight: "700", letterSpacing: "0.5px", mb: 1.5 }}>
                        Oops! Page Not Found
                      </Typography>
                      <Typography sx={{ color: "rgba(0,0,0,0.5)", fontSize: { xs: "0.85rem", sm: "0.95rem" },
                        maxWidth: "480px", margin: "0 auto 2rem auto", lineHeight: "1.6" }}>
                        The page you are looking for does not exist. It might have been removed, had its name changed, or is temporarily unavailable.
                      </Typography>
                    </motion.div>
                  ) : (
                    <motion.div key="load" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }} style={{ width: "100%", maxWidth: "440px" }}>
                      <Box sx={{ mb: 3 }}>
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                          style={{ display: "inline-block" }}>
                          <RefreshCw size={44} color={accent} />
                        </motion.div>
                      </Box>
                      <Typography sx={{ fontSize: "1.1rem", color: textPrimary, fontWeight: "600", mb: 1, letterSpacing: "1px" }}>
                        {loadState === "retrying" ? "RE-ESTABLISHING SECURE GATEWAY..." : "INITIATING SECURE SYNC..."}
                      </Typography>
                      <Typography sx={{ fontSize: "3.5rem", fontWeight: "900", color: accent, mb: 2 }}>
                        {progress}%
                      </Typography>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Progress bar */}
                <Box sx={{ width: "100%", maxWidth: "440px", height: "8px", backgroundColor: grayBg,
                  borderRadius: "10px", position: "relative", overflow: "hidden", border: `1px solid ${grayBg}` }}>
                  <Box sx={{ height: "100%", width: `${progress}%`,
                    background: loadState === "failed" ? "linear-gradient(90deg, #ff3366, #ff8c00)"
                      : `linear-gradient(90deg, ${accent} 0%, ${accentDark} 100%)`,
                    boxShadow: loadState === "failed" ? "0 0 10px rgba(255,51,102,0.5)" : `0 0 10px ${accent}55`,
                    borderRadius: "10px", transition: "width 0.15s ease-out, background 0.3s ease" }} />
                </Box>

                {/* Buttons */}
                {loadState === "failed" && (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center", mt: 4, zIndex: 3 }}>
                    <Button onClick={handleBackToHome} startIcon={<Home size={18} />}
                      sx={{ backgroundColor: accent, color: "#fff", padding: "10px 24px", borderRadius: "30px",
                        fontSize: "0.95rem", fontWeight: "600", textTransform: "none",
                        boxShadow: `0 8px 24px ${accent}44`,
                        "&:hover": { backgroundColor: accentDark, boxShadow: `0 12px 30px ${accent}66`, transform: "translateY(-2px)" },
                        transition: "all 0.2s ease-in-out" }}>
                      Return to Portal
                    </Button>
                    <Button onClick={handleRetry} startIcon={<RefreshCw size={18} />}
                      sx={{ backgroundColor: "rgba(0,0,0,0.04)", border: `1px solid ${grayBg}`, color: textPrimary,
                        padding: "10px 24px", borderRadius: "30px", fontSize: "0.95rem", fontWeight: "600", textTransform: "none",
                        "&:hover": { backgroundColor: "rgba(0,0,0,0.08)", borderColor: accent, transform: "translateY(-2px)" },
                        transition: "all 0.2s ease-in-out" }}>
                      Retry Connection
                    </Button>
                  </Box>
                )}
              </Box>
            </Box>
          </motion.div>

          {/* Right: Typography + Floating items */}
          <Box sx={{ display: "flex", flexDirection: "column",
            alignItems: { xs: "center", lg: "flex-start" }, textAlign: { xs: "center", lg: "left" },
            position: "relative", minHeight: { xs: "auto", lg: "450px" }, justifyContent: "center", py: { xs: 2, lg: 0 } }}>

            {!isMobile && (<>


              {/* Floating Credit Card */}
              <motion.div style={{ position: "absolute", bottom: 20, right: "10%", zIndex: 4 }}
                animate={{ y: [15, -15, 15], rotate: [5, -5, 5], scale: [0.95, 1.05, 0.95] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}>
                <Box sx={{ width: 160, height: 100, borderRadius: "12px",
                  background: `linear-gradient(135deg, ${accent}33 0%, ${accentDark}18 100%)`,
                  backdropFilter: "blur(10px)", border: `1px solid ${grayBg}`,
                  boxShadow: `0 15px 35px rgba(0,0,0,0.08), 0 0 20px ${accent}15`,
                  padding: "12px", display: "flex", flexDirection: "column", justifyContent: "space-between", boxSizing: "border-box" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ width: 22, height: 18, borderRadius: "3px", background: "linear-gradient(135deg, #ffd700, #c0c0c0)", border: "1px solid rgba(0,0,0,0.1)" }} />
                    <WifiOff size={16} color="#ff3366" />
                  </Box>
                  <Box>
                    <Box sx={{ width: "80%", height: 4, backgroundColor: "rgba(0,0,0,0.15)", borderRadius: 2, mb: "6px" }} />
                    <Box sx={{ width: "50%", height: 4, backgroundColor: "rgba(0,0,0,0.08)", borderRadius: 2 }} />
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ width: 30, height: 8, backgroundColor: "rgba(0,0,0,0.12)", borderRadius: 1 }} />
                    <Box sx={{ width: 16, height: 16, borderRadius: "50%", backgroundColor: accent, boxShadow: `0 0 10px ${accent}` }} />
                  </Box>
                </Box>
              </motion.div>

              {/* Floating Chart */}
              <motion.div style={{ position: "absolute", top: 0, right: isTablet ? "5%" : "15%", zIndex: 5 }}
                animate={{ y: [-10, 10, -10], rotate: [-3, 3, -3] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}>
                <Box sx={{ width: 120, height: 75, borderRadius: "8px", backgroundColor: "#fff",
                  border: `1px solid ${grayBg}`, boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
                  padding: "8px", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <Typography sx={{ fontSize: 9, color: "rgba(0,0,0,0.4)", fontFamily: "monospace" }}>SECURE_LEDGER</Typography>
                  <svg width="100%" height="30" style={{ overflow: "visible" }}>
                    <path d="M 0,25 L 25,18 L 50,22 L 75,5 L 85,15" fill="none" stroke="#ff3366" strokeWidth="2" strokeDasharray="2" />
                    <line x1="75" y1="5" x2="100" y2="35" stroke="#ff3366" strokeWidth="2" />
                    <circle cx="100" cy="35" r="3" fill="#ff3366" />
                    <circle cx="75" cy="5" r="3" fill={accent} />
                  </svg>
                </Box>
              </motion.div>
            </>)}

            <Typography sx={{ fontSize: { xs: "0.85rem", sm: "1rem" }, fontWeight: 800,
              color: accent, letterSpacing: "4px", textTransform: "uppercase", mb: 2 }}>
              Error 404
            </Typography>
            <Typography sx={{ fontSize: { xs: "2.2rem", sm: "3.2rem", lg: "4.2rem" }, fontWeight: 900,
              color: textPrimary, lineHeight: "1.1", mb: 3 }}>
              Page <br/><span style={{ color: accent, textShadow: `0 0 30px ${accent}40` }}>Not Found!</span>
            </Typography>
            <Typography sx={{ color: "rgba(0,0,0,0.6)", fontSize: "1.05rem", lineHeight: "1.7", mb: 4, maxWidth: 520 }}>
              We can't seem to find the page you're looking for. Please check the URL for mistakes or return to our homepage to continue your journey.
            </Typography>

            <Button onClick={() => setLogsOpen(!logsOpen)} startIcon={<Terminal size={16} />}
              sx={{ backgroundColor: logsOpen ? `${accent}12` : "rgba(0,0,0,0.03)",
                border: logsOpen ? `1px solid ${accent}` : `1px solid ${grayBg}`,
                color: logsOpen ? accent : "rgba(0,0,0,0.6)", padding: "8px 20px", borderRadius: "8px",
                fontSize: "0.85rem", fontWeight: 600, textTransform: "none",
                "&:hover": { backgroundColor: `${accent}0a`, borderColor: accent, color: accent },
                transition: "all 0.2s ease-in-out" }}>
              {logsOpen ? "Hide connection log diagnostics" : "Show connection log diagnostics"}
            </Button>
          </Box>
        </Box>

        {/* Terminal drawer */}
        <AnimatePresence>
          {logsOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4, ease: "easeInOut" }}
              style={{ width: "100%", maxWidth: 1280, marginTop: "2rem", zIndex: 2 }}>
              <Box sx={{ backgroundColor: "#0d1117", border: `1px solid ${accent}33`, borderRadius: "12px",
                padding: "16px 20px", boxShadow: `0 10px 40px ${accent}08`, maxHeight: 220, overflowY: "auto",
                fontFamily: "'Courier New', Courier, monospace", boxSizing: "border-box",
                "&::-webkit-scrollbar": { width: 6 },
                "&::-webkit-scrollbar-track": { background: "rgba(0,0,0,0.2)" },
                "&::-webkit-scrollbar-thumb": { background: `${accent}33`, borderRadius: 3 } }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: "8px", mb: "12px",
                  borderBottom: "1px solid rgba(255,255,255,0.08)", pb: "8px" }}>
                  <Server size={14} color={accent} />
                  <Typography sx={{ fontSize: 11, fontWeight: "bold", color: accent, letterSpacing: 1, textTransform: "uppercase" }}>
                    F2 Connection Diagnostics Node: v1.4.04-stable
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {typedLogs.map((log, i) => {
                    const isErr = log.includes("ERROR") || log.includes("CRITICAL");
                    const isWarn = log.includes("WARNING") || log.includes("WARN");
                    let c = "#27c93f";
                    if (isErr) c = "#ff3366";
                    else if (isWarn) c = "#ffbd2e";
                    return (
                      <Box key={i} sx={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                        <ChevronRight size={12} color={accent} style={{ marginTop: 3, flexShrink: 0 }} />
                        <Typography sx={{ fontSize: 12, fontFamily: "inherit", color: c, lineHeight: "1.4", wordBreak: "break-all" }}>{log}</Typography>
                      </Box>
                    );
                  })}
                  <div ref={terminalEndRef} />
                </Box>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </>
  );
};

export default NotFoundPage;
