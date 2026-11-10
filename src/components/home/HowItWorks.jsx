import React, { useRef } from "react";
import {
  Box,
  Typography,
  Container,
  Card,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  HeartHandshake,
  UserCheck,
  Coins,
  FileText,
  Landmark,
  ShieldCheck,
  Percent,
  TrendingUp,
} from "lucide-react";

export default function HowItWorks() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 45%"],
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const steps = [
    {
      id: 0,
      number: "01",
      icon: UserCheck,
      title: "Tell us about yourself",
      description: "A simple form - just the basics. Designed to take no more than a minute of your time.,",
      color: "#3244e6", // Primary Blue
      glowColor: "rgba(50, 68, 230, 0.35)",
      hoverGlow: "rgba(50, 68, 230, 0.8)",
      fadedBg: "rgba(50, 68, 230, 0.05)",
    },
    {
      id: 1,
      number: "02",
      icon: Coins,
      title: "Our loan expert will get in touch with you",
      description: "A senior F2 Fintech advisor personally connects with you - to understand what you need, on your terms.",
      color: "#204ed8", // Brand Blue
      glowColor: "rgba(32, 78, 216, 0.35)",
      hoverGlow: "rgba(32, 78, 216, 0.8)",
      fadedBg: "rgba(32, 78, 216, 0.05)",
    },
    {
      id: 2,
      number: "03",
      icon: FileText,
      title: "Get matched to the right lender",
      description: "Share a few documents and we do the rest - comparing 40+ lenders to find the one that truly fits your profile. No guesswork. No compromise.",
      color: "#3244e6", // Primary Blue
      glowColor: "rgba(50, 68, 230, 0.35)",
      hoverGlow: "rgba(50, 68, 230, 0.8)",
      fadedBg: "rgba(50, 68, 230, 0.05)",
    },
    {
      id: 3,
      number: "04",
      icon: Landmark,
      title: "Get your loan disbursed within 48 hours",
      description: "Your loan, in your account - fast. At a rate we've negotiated for you, with every cost kept to its absolute minimum.",
      color: "#204ed8", // Brand Blue
      glowColor: "rgba(32, 78, 216, 0.35)",
      hoverGlow: "rgba(32, 78, 216, 0.8)",
      fadedBg: "rgba(32, 78, 216, 0.05)",
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: "linear-gradient(180deg, #f4faff 0%, #ffffff 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decorative glows */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "-10%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          // background: "radial-gradient(circle, rgba(58, 73, 214, 0.05) 0%, transparent 70%)",
          filter: "blur(50px)",
          zIndex: 0,
          pointerEvents: "none"
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "10%",
          right: "-10%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(32, 78, 216, 0.05) 0%, transparent 70%)",
          filter: "blur(50px)",
          zIndex: 0,
          pointerEvents: "none"
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* ─────────── 1st Section: Built Entirely Around You ─────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Box
            sx={{
              position: "relative",
              borderRadius: "32px",
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(244, 247, 254, 0.65) 100%)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.8)",
              boxShadow: "0 24px 64px rgba(50, 68, 230, 0.05), inset 0 0 0 1px rgba(255, 255, 255, 0.5)",
              p: { xs: 3, md: 4 },
              mb: { xs: 4, md: 6 },
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "6px",
                background: "linear-gradient(90deg, #3244e6 0%, #10b981 100%)",
              },
            }}
          >
            {/* Glowing background accents */}
            <Box
              sx={{
                position: "absolute",
                top: "-20%",
                right: "-10%",
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(32, 78, 216, 0.08) 0%, transparent 70%)",
                filter: "blur(40px)",
                pointerEvents: "none",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: "-20%",
                left: "-10%",
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(50, 68, 230, 0.06) 0%, transparent 70%)",
                filter: "blur(40px)",
                pointerEvents: "none",
              }}
            />

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1.2fr 0.8fr" },
                gap: { xs: 3, md: 4 },
                position: "relative",
                zIndex: 1,
              }}
            >
              {/* Left Column: Story & Philosophy */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {/* Header Badge */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "8px",
                      background: "linear-gradient(135deg, rgba(50, 68, 230, 0.1) 0%, rgba(50, 68, 230, 0.05) 100%)",
                      color: "#3244e6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid rgba(50, 68, 230, 0.15)",
                    }}
                  >
                    <HeartHandshake size={16} />
                  </Box>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 700,
                      fontSize: "1.55rem",
                      textTransform: "uppercase",
                      letterSpacing: "1.5px",
                      color: "#3244e6",
                    }}
                  >
                    Who we are
                  </Typography>
                </Box>

                {/* Big Statement */}
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: { xs: "1.4rem", sm: "1.75rem", md: "1.5rem" },
                    color: "#0f172a",
                    fontWeight: 800,
                    lineHeight: 1.3,
                    letterSpacing: "-0.02em",
                  }}
                >
                  The right financial partner doesn't ask you to explain yourself - {" "}
                  <Box
                    component="span"
                    sx={{
                      background: "linear-gradient(90deg, #3244e6 0%, #204ed8 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      display: "inline-block",
                    }}
                  >
                    it already understands.
                  </Box>
                </Typography>

                {/* Narrative paragraphs */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: { xs: "0.9rem", md: "0.98rem" },
                      color: "#475569",
                      lineHeight: 1.6,
                    }}
                  >
                    The right financial partner doesn’t ask you to explain yourself - it already understands your goals.
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: { xs: "0.9rem", md: "0.98rem" },
                      color: "#475569",
                      lineHeight: 1.6,
                    }}
                  >
                    At F2 Fintech, we believe that every professional, entrepreneur, business owner, and family deserves financial solutions that are simple, transparent, and tailored to their needs.
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: { xs: "0.9rem", md: "0.98rem" },
                      color: "#0f172a",
                      fontWeight: 700,
                      lineHeight: 1.6,
                    }}
                  >
                    We bring clarity, faster access, and the right financial solutions - so you can focus on what matters most.
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: { xs: "0.9rem", md: "0.98rem" },
                      color: "#475569",
                      lineHeight: 1.6,
                    }}
                  >
                    With{" "}
                    <Box component="span" sx={{ fontWeight: 700, color: "#0f172a" }}>
                      40+ lending partners
                    </Box>{" "}
                    on board, we cover every loan, investment, and insurance need - without the runaround.
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: { xs: "0.9rem", md: "0.98rem" },
                      color: "#475569",
                      lineHeight: 1.6,
                    }}
                  >
                    With over{" "}
                    <Box
                      component="span"
                      sx={{
                        fontWeight: 700,
                        color: "#0f172a",
                      }}
                    >
                      ₹1,100+ Crores
                    </Box>{" "}
                    in loans disbursed and{" "}
                    <Box
                      component="span"
                      sx={{
                        fontWeight: 700,
                        color: "#0f172a",
                      }}
                    >
                      11,000+ clients
                    </Box>{" "}
                    who trust us, we cover every loan, investment, and insurance need - handling it quietly, completely, and without compromise.
                  </Typography>
                </Box>
              </Box>

              {/* Right Column: Dynamic Statistics Cards */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                {/* Metric 1 */}
                <Box
                  component={motion.div}
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  sx={{
                    p: 2,
                    borderRadius: "16px",
                    background: "rgba(255, 255, 255, 0.75)",
                    border: "1px solid rgba(50, 68, 230, 0.12)",
                    boxShadow: "0 8px 24px rgba(50, 68, 230, 0.02)",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: "12px",
                      background: "rgba(50, 68, 230, 0.08)",
                      color: "#3244e6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Coins size={22} />
                  </Box>
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 800,
                        fontSize: { xs: "1.4rem", md: "1.6rem" },
                        color: "#3244e6",
                        lineHeight: 1.1,
                      }}
                    >
                      40+
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 600,
                        color: "#475569",
                        fontSize: "0.8rem",
                        mt: 0.2,
                      }}
                    >
                      Lending Partners
                    </Typography>
                  </Box>
                </Box>

                {/* Metric 2 */}
                <Box
                  component={motion.div}
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  sx={{
                    p: 2,
                    borderRadius: "16px",
                    background: "rgba(255, 255, 255, 0.75)",
                    border: "1px solid rgba(32, 78, 216, 0.12)",
                    boxShadow: "0 8px 24px rgba(32, 78, 216, 0.02)",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: "12px",
                      background: "rgba(32, 78, 216, 0.08)",
                      color: "#204ed8",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <UserCheck size={22} />
                  </Box>
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 800,
                        fontSize: { xs: "1.4rem", md: "1.6rem" },
                        color: "#204ed8",
                        lineHeight: 1.1,
                      }}
                    >
                      11,000+
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 600,
                        color: "#475569",
                        fontSize: "0.8rem",
                        mt: 0.2,
                      }}
                    >
                      Trusted Clients
                    </Typography>
                  </Box>
                </Box>

                {/* Metric 3 */}
                <Box
                  component={motion.div}
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  sx={{
                    p: 2,
                    borderRadius: "16px",
                    background: "rgba(255, 255, 255, 0.75)",
                    border: "1px solid rgba(139, 92, 246, 0.12)",
                    boxShadow: "0 8px 24px rgba(139, 92, 246, 0.02)",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: "12px",
                      background: "rgba(50, 68, 230, 0.08)",
                      color: "#3244e6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <TrendingUp size={22} />
                  </Box>
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 800,
                        fontSize: { xs: "1.4rem", md: "1.6rem" },
                        color: "#3244e6",
                        lineHeight: 1.1,
                      }}
                    >
                      1,100+ Cr
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 600,
                        color: "#475569",
                        fontSize: "0.8rem",
                        mt: 0.2,
                      }}
                    >
                      Loan Disbursed
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </motion.div>

        {/* ─────────── 2nd Section: How It Works Steps ─────────── */}
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: { xs: "2.2rem", md: "3rem" },
              fontWeight: 800,
              color: "#0f172a",
              mb: 2,
            }}
          >
            Private Personalised {" "}
            <Box component="span" sx={{ color: "#384aff" }}>
              Effortless.
            </Box>
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#64748b",
              fontSize: "1.8rem",
              fontWeight: 700,
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            How it Works.
          </Typography>
        </Box>

        {/* Serpentine Step Flow Container (Single Frame, Fluid) */}
        <Box
          ref={containerRef}
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: "1000px",
            height: { xs: "520px", sm: "540px", md: "560px" },
            margin: "0 auto",
            mb: 4,
          }}
        >


          {/* SVG Connector Path */}
          <svg
            viewBox="0 0 1000 560"
            width="100%"
            height="100%"
            preserveAspectRatio="none"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 1,
              pointerEvents: "none",
            }}
          >
            <defs>
              <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3244e6" />
                <stop offset="100%" stopColor="#204ed8" />
              </linearGradient>
            </defs>
            {/* Background faint path track */}
            <path
              d="M 400 100 L 500 100 C 560 100 600 140 600 190 C 600 240 560 280 500 280 C 440 280 400 320 400 370 C 400 420 440 460 500 460 L 600 460"
              fill="none"
              stroke="rgba(50, 68, 230, 0.15)"
              strokeWidth={4.5}
              strokeDasharray="6 6"
            />
            {/* Scroll-driven active animated path */}
            <motion.path
              d="M 400 100 L 500 100 C 560 100 600 140 600 190 C 600 240 560 280 500 280 C 440 280 400 320 400 370 C 400 420 440 460 500 460 L 600 460"
              fill="none"
              stroke="url(#line-gradient)"
              strokeWidth={4.5}
              pathLength={pathLength}
            />
          </svg>

          {/* Steps Rendering */}
          {steps.map((step, idx) => {
            const IconComp = step.icon;
            const isLeftText = idx === 0 || idx === 2;

            // Compute percentage positions for fluid scale with wider margins
            const iconLeft = isLeftText ? "40%" : "60%";
            const iconTop = idx === 0 ? "17.86%" : idx === 1 ? "33.93%" : idx === 2 ? "66.07%" : "82.14%";
            const textLeft = isLeftText ? "2%" : "68%";
            const textWidth = "30%";
            const textTop = iconTop;

            return (
              <Box key={step.id}>
                {/* Step Card Text Block Wrapper */}
                <Box
                  sx={{
                    position: "absolute",
                    left: textLeft,
                    width: textWidth,
                    top: textTop,
                    transform: "translateY(-50%)",
                    textAlign: isLeftText ? "right" : "left",
                    zIndex: 2,
                  }}
                >
                  {/* Animation container */}
                  <motion.div
                    initial={{ opacity: 0, x: isLeftText ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.2 }}
                  >
                    <Box sx={{ position: "relative" }}>


                      {/* Step Content */}
                      <Box sx={{ position: "relative", zIndex: 1 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 800,
                            color: step.color,
                            fontSize: { xs: "0.75rem", sm: "0.9rem", md: "1.1rem" },
                            mb: 0.5,
                            fontFamily: "'Poppins', sans-serif",
                          }}
                        >
                          {step.number}
                        </Typography>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 750,
                            color: "#0f172a",
                            fontSize: { xs: "0.85rem", sm: "1.05rem", md: "1.35rem" },
                            mb: 0.8,
                            fontFamily: "'Poppins', sans-serif",
                          }}
                        >
                          {step.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#475569",
                            fontSize: { xs: "0.7rem", sm: "0.82rem", md: "0.95rem" },
                            lineHeight: 1.5,
                            fontWeight: 500,
                            fontFamily: "'Poppins', sans-serif",
                          }}
                        >
                          {step.description}
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                </Box>

                {/* Step Glowing Circle Icon Wrapper */}
                <Box
                  sx={{
                    position: "absolute",
                    left: iconLeft,
                    top: iconTop,
                    transform: "translate(-50%, -50%)",
                    width: { xs: "34px", sm: "44px", md: "56px" },
                    height: { xs: "34px", sm: "44px", md: "56px" },
                    zIndex: 3,
                  }}
                >
                  {/* Animation container */}
                  <Box
                    component={motion.div}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 100, delay: idx * 0.2 + 0.1 }}
                    whileHover={{ scale: 1.15 }}
                    sx={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      backgroundColor: "#ffffff",
                      border: `2px solid ${step.color}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: `0 0 15px ${step.glowColor}`,
                      cursor: "pointer",
                      transition: "box-shadow 0.3s ease",
                      "&:hover": {
                        boxShadow: `0 0 25px ${step.hoverGlow}`,
                      },
                    }}
                  >
                    <IconComp size={isMobile ? 16 : 22} style={{ color: "#204ed8" }} />
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>

        {/* CTA Get Started Button */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          sx={{ display: "flex", justifyContent: "center", mt: { xs: 4, md: 6 }, mb: { xs: 8, md: 0 } }}
        >
          <Box
            component="button"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              px: { xs: 3.5, md: 5 },
              py: { xs: 1.2, md: 1.8 },
              borderRadius: "30px",
              backgroundColor: "#3244e6",
              color: "#ffffff",
              border: "none",
              fontWeight: 700,
              fontSize: { xs: "0.85rem", md: "1rem" },
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 12px rgba(50, 68, 230, 0.25)",
              fontFamily: "'Poppins', sans-serif",
              "&:hover": {
                backgroundColor: "#204ed8",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 20px rgba(32, 78, 216, 0.4)",
              },
            }}
          >
            Get Started <span style={{ marginLeft: "4px" }}>&gt;</span>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
