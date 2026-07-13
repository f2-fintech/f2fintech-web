import { Box, Container, Paper, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import ButtonComp from "../common/button/Button";

/* ── Keyframe strings for MUI sx ── */
const popUpKeyframes = `
  @keyframes popUp {
    0%   { opacity: 0; transform: translateY(60px) scale(0.82); }
    60%  { transform: translateY(-10px) scale(1.04); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }
`;

const shimmerKeyframes = `
  @keyframes shimmerText {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
`;

const floatKeyframes = `
  @keyframes floatOrb {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50%       { transform: translateY(-22px) rotate(180deg); }
  }
`;

const pulseKeyframes = `
  @keyframes dotPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(56,239,125,0.5); }
    50%       { box-shadow: 0 0 0 8px rgba(56,239,125,0); }
  }
`;

/* Inject keyframes once into <head> */
if (typeof document !== "undefined" && !document.getElementById("clients-kf")) {
  const style = document.createElement("style");
  style.id = "clients-kf";
  style.textContent = popUpKeyframes + shimmerKeyframes + floatKeyframes + pulseKeyframes;
  document.head.appendChild(style);
}

/* ── Animated counter hook ── */
const useCounter = (end, duration, isInView) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = end / (duration / 80);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { clearInterval(timer); setCount(end); }
      else { setCount(Math.ceil(start)); }
    }, 80);
    return () => clearInterval(timer);
  }, [end, duration, isInView]);
  return count;
};

/* ── Orb positions ── */
const ORBS = [
  { top: "8%", left: "3%", size: 320, color: "rgba(99,120,255,0.22)", delay: "0s", dur: "9s" },
  { top: "65%", left: "10%", size: 200, color: "rgba(16,185,129,0.18)", delay: "2s", dur: "13s" },
  { top: "15%", right: "6%", size: 260, color: "rgba(162,199,255,0.2)", delay: "1s", dur: "11s" },
  { bottom: "8%", right: "4%", size: 190, color: "rgba(99,120,255,0.18)", delay: "3.5s", dur: "8s" },
];

/* ── Main Component ── */
const Clients = () => {
  const observerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  const stats = [
    { value: useCounter(600, 1000, isInView), label: "Locations Served", icon: "📍", suffix: "+" },
    { value: useCounter(11000, 1100, isInView), label: "Happy Clients", icon: "😊", suffix: "+" },
    { value: useCounter(30000, 1000, isInView), label: "Applications", icon: "📝", suffix: "+" },
    { value: useCounter(40, 700, isInView), label: "Lenders", icon: "🏦", suffix: "+" },
    { value: useCounter(1100, 1000, isInView), label: "Loans Disbursed", icon: "💰", suffix: "Cr+" },
    { value: useCounter(16000, 1000, isInView), label: "Pincode Served", icon: "📮", suffix: "+" },
  ];

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsInView(true); },
      { threshold: 0.15 }
    );
    if (observerRef.current) obs.observe(observerRef.current);
    return () => { if (observerRef.current) obs.unobserve(observerRef.current); };
  }, []);

  return (
    <Container
      maxWidth={false}
      sx={{
        minHeight: { xs: "auto", md: "88vh" },
        "@media (min-width: 1024px) and (max-width: 1366px)": {
          minHeight: "auto",
        },
        px: { xs: 3, sm: 5, md: 7, lg: 9 },
        py: { xs: 7, sm: 8, md: 9, lg: 11 },
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* ── Background ── */}
      <Box sx={{ position: "absolute", inset: 0, background: "#f1f8ff", zIndex: -2 }} />

      {/* ── Floating orbs ── */}
      {ORBS.map((orb, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            top: orb.top, left: orb.left, right: orb.right, bottom: orb.bottom,
            width: orb.size, height: orb.size,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
            animation: `floatOrb ${orb.dur} ease-in-out infinite`,
            animationDelay: orb.delay,
            zIndex: -1,
            filter: "blur(3px)",
          }}
        />
      ))}

      {/* ── Dot-grid overlay ── */}
      <Box sx={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(0,0,0,0.04) 1px, transparent 1px)", backgroundSize: "30px 30px", zIndex: -1 }} />

      {/* ══ Two-column layout ══ */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          width: "100%",
          gap: { xs: 7, md: 0 },
        }}
      >
        {/* ════ LEFT - 40% ════ */}
        <Box
          sx={{
            width: { xs: "100%", md: "40%" },
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            pr: { xs: 0, md: 7 },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          {/* Live badge */}
          <Box
            sx={{
              display: "inline-flex", alignItems: "center", gap: 1,
              mb: 3,
              mx: { xs: "auto", md: 0 },
              px: 2, py: 0.9,
              borderRadius: "50px",
              border: "1px solid rgba(58, 73, 214, 0.15)",
              background: "rgba(58, 73, 214, 0.05)",
              width: "fit-content",
              backdropFilter: "blur(8px)",
            }}
          >
            <Box sx={{ width: 9, height: 9, borderRadius: "50%", background: "#10b981", flexShrink: 0, animation: "dotPulse 2s ease infinite" }} />
            <Typography sx={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.9px", textTransform: "uppercase", color: "#3a49d6", fontFamily: "'Poppins', sans-serif" }}>
              Trusted by 11,000+ Clients
            </Typography>
          </Box>

          {/* Headline */}
          <Typography
            variant="h1"
            component="h2"
            sx={{
              fontSize: { xs: "2.1rem", sm: "2.7rem", md: "2.9rem", lg: "3.5rem" },
              fontWeight: 800, lineHeight: 1.15, mb: 2.5,
              fontFamily: "'Poppins', sans-serif",
              color: "#1e293b",
            }}
          >
            Get your loan in{" "}
            <Box component="span" sx={{ color: "#10b981" }}>
              3 hours.
            </Box>
          </Typography>

          {/* Sub-heading */}
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "1.1rem", sm: "1.35rem", md: "1.45rem", lg: "1.65rem" },
              fontWeight: 600, lineHeight: 1.45, mb: 2.5,
              fontFamily: "'Poppins', sans-serif",
              color: "#1e293b",
            }}
          >
            Discover the Best Lending Services Tailored for You
          </Typography>

          {/* Body text */}
          <Typography
            sx={{
              fontSize: { xs: "0.88rem", sm: "0.96rem", md: "1rem" },
              lineHeight: 1.8, mb: 4,
              color: "#475569",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            No more running from lender to lender. F2 Fintech matches you with the best personal, business, or property loans across{" "}
            <Box component="span" sx={{ color: "#3a49d6", fontWeight: 600 }}>40+ lenders</Box>
            {" "}- fast, transparent, and hassle‑free.
          </Typography>

          {/* CTA */}
          <Box
            sx={{
              border: "1.5px solid rgba(58, 73, 214, 0.2)",
              borderRadius: "30px",
              width: { xs: "100%", sm: "72%", md: "68%" },
              mx: { xs: "auto", md: 0 },
              transition: "all 0.3s",
              "&:hover": { borderColor: "rgba(58, 73, 214, 0.8)", transform: "scale(1.02)" },
            }}
          >
            <ButtonComp width="100%" />
          </Box>
        </Box>

        {/* ════ RIGHT - 60% ════ */}
        <Box
          ref={observerRef}
          sx={{
            width: { xs: "100%", md: "60%" },
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr 1fr", md: "1fr 1fr 1fr" },
              gap: { xs: 2, sm: 2.5, md: 3 },
              width: "100%",
            }}
          >
            {stats.map((stat, index) => {
              const delay = 0.1 + index * 0.13;
              const isHighlighted = stat.label === "Loans Disbursed";
              return (
                <Box
                  key={index}
                  sx={{
                    gridColumn: "span 1",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      width: "100%",
                      minHeight: { xs: 140, sm: 155, md: 168 },
                      background: isHighlighted ? "linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(16, 185, 129, 0.02) 100%)" : "#ffffff",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      borderRadius: "20px",
                      border: isHighlighted ? "1px solid rgba(16, 185, 129, 0.4)" : "1px solid #e2e8f0",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      p: { xs: 2, sm: 2.5, md: 3 },
                      cursor: "default",
                      opacity: isInView ? 1 : 0,
                      animation: isInView
                        ? `popUp 0.7s cubic-bezier(0.34,1.56,0.64,1) ${delay}s both`
                        : "none",
                      transition: "transform 0.38s ease, box-shadow 0.38s ease, background 0.38s ease",
                      "&:hover": {
                        transform: "translateY(-10px) scale(1.03)",
                        boxShadow: isHighlighted ? "0 20px 40px rgba(16, 185, 129, 0.1)" : "0 20px 40px rgba(0,0,0,0.08)",
                        background: isHighlighted ? "linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(16, 185, 129, 0.04) 100%)" : "rgba(58, 73, 214, 0.02)",
                      },
                    }}
                  >
                    {/* Icon bubble */}
                    <Box
                      sx={{
                        width: { xs: 48, md: 56 },
                        height: { xs: 48, md: 56 },
                        borderRadius: "14px",
                        background: isHighlighted ? "rgba(16, 185, 129, 0.1)" : "#f1f5f9",
                        border: isHighlighted ? "1px solid rgba(16, 185, 129, 0.3)" : "1px solid #e2e8f0",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: { xs: "1.5rem", md: "1.7rem" },
                        mb: 1.5,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.02)",
                      }}
                    >
                      {stat.icon}
                    </Box>

                    {/* Counter */}
                    <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.3 }}>
                      <Typography
                        component="span"
                        sx={{
                          fontSize: { xs: "1.55rem", sm: "1.85rem", md: "2.1rem", lg: "2.4rem" },
                          fontWeight: 800, lineHeight: 1,
                          fontFamily: "'Poppins', sans-serif",
                          color: isHighlighted ? "#059669" : "#3a49d6",
                        }}
                      >
                        {isInView ? stat.value.toLocaleString() : "0"}
                      </Typography>
                      <Typography
                        component="span"
                        sx={{
                          fontSize: { xs: "0.95rem", md: "1.1rem" },
                          fontWeight: 700,
                          color: isHighlighted ? "#10b981" : "#3a49d6",
                          fontFamily: "'Poppins', sans-serif",
                        }}
                      >
                        {stat.suffix}
                      </Typography>
                    </Box>

                    {/* Label */}
                    <Typography
                      sx={{
                        mt: 0.75,
                        fontSize: { xs: "0.7rem", sm: "0.78rem", md: "0.83rem" },
                        fontWeight: 500,
                        color: isHighlighted ? "#047857" : "#475569",
                        letterSpacing: "0.6px",
                        textTransform: "uppercase",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {stat.label}
                    </Typography>

                    {/* Accent line */}
                    <Box sx={{ mt: 1.5, width: "38%", height: "2px", borderRadius: "2px", background: isHighlighted ? "linear-gradient(90deg, #047857, #059669)" : "linear-gradient(90deg, #3a49d6, #047857)" }} />
                  </Paper>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Clients;
