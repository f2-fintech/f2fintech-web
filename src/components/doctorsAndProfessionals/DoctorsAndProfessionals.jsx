import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Box, Container, Typography, Button, Grid, useTheme, useMediaQuery } from "@mui/material";
import { keyframes } from "@mui/system";
import { BadgeCheck, Stethoscope, Zap, Star } from "lucide-react";

// Styling constants
const INK = "#1f2937";
const PAPER = "#f4faff";
const CARD = "#ffffff";
const TEAL = "#3244e6";
const TEAL_DEEP = "#2c3ce3";
const AMBER = "#10b981";
const AMBER_DEEP = "#059669";
const SLATE = "#4b5563";
const LINE = "#e2e8f0";

// Self-contained scroll animation styling
const globalStyles = `
  .reveal {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .reveal.is-visible {
    opacity: 1;
    transform: none;
  }
  @media (prefers-reduced-motion: reduce) {
    .reveal {
      opacity: 1 !important;
      transform: none !important;
      transition: none !important;
    }
  }
`;

const marqueeScroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const floating = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-5px) rotate(5deg); }
`;

const shine = keyframes`
  0% { left: -100%; }
  20% { left: 100%; }
  100% { left: 100%; }
`;

export default function DoctorsAndProfessionals() {
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const revealEls = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => io.observe(el));

    // Scroll to top on load
    window.scrollTo({ top: 0, behavior: "instant" });

    return () => {
      revealEls.forEach((el) => io.unobserve(el));
    };
  }, []);

  const banks = [
    { name: "HDFC Bank", specialty: "Special doctor desk checks & fast track program", logo: "/hdfc.webp" },
    { name: "ICICI Bank", specialty: "WC + term loans, digital onboarding", logo: "/icici.webp" },
    { name: "IDFC FIRST Bank", specialty: "Attractive balance transfer schemes", logo: "/eligibility_idfc.webp" },
  ];

  const nbfcs = [
    { name: "Bajaj Finance", specialty: "Quick documentation, higher limits", logo: "/bajaj.webp" },
    { name: "Bajaj Market", specialty: "Special programs, digital workflow", logo: "/bajaj.webp" },
    { name: "Godrej Capital", specialty: "Equipment finance, flexible repayment", logo: "/godrej.webp" },
    { name: "Cholamandalam (Chola)", specialty: "Customized loan tenures for practices", logo: "/cholamandalam.webp" },
    { name: "L&T Finance", specialty: "Low interest, structured EMIs", logo: "/eligibility_L&T.webp" },
    { name: "Tata Capital", specialty: "Clinic setup, working capital limit", logo: "/eligibility_tata.webp" },
    { name: "Aditya Birla Capital", specialty: "Unsecured doctor loans up to 75 Lakhs", logo: "/eligibility_nbfc.webp" },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      <Helmet>
        <title>F2 Fintech for Doctors — Financing built around your practice</title>
        <meta
          name="description"
          content="Compare offers from 40+ banks and NBFCs in one place for clinic setup, equipment, expansion, or personal needs without running between branches."
        />
        <link rel="canonical" href="https://f2fintech.com/doctors-and-professionals" />
      </Helmet>

      <Box
        sx={{
          background: PAPER,
          backgroundImage: `radial-gradient(at 50% 50%, #f4faff 0%, #eef6ff 100%)`,
          color: INK,
          fontFamily: "'Poppins', sans-serif",
          WebkitFontSmoothing: "antialiased",
          minHeight: "100vh",
          pb: 7.5,
        }}
      >
        {/* HERO SECTION */}
        <Box
          component="section"
          sx={{
            pt: { xs: 3, sm: 2 },
            pb: { xs: 9, sm: 12.5 },
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: "-120px",
              right: "-160px",
              width: "480px",
              height: "480px",
              borderRadius: "50%",
              background: "radial-gradient(circle at 30% 30%, rgba(50, 68, 230, 0.08), transparent 65%)",
              pointerEvents: "none",
            },
          }}
        >
          <Container maxWidth="full" sx={{ px: { xs: 2.5, md: 4 } }}>
            <Grid container spacing={{ xs: 5, md: 6 }} alignItems="center">
              <Grid item xs={12} md={7}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  <Typography
                    component="span"
                    sx={{
                      fontSize: "0.82rem",
                      color: TEAL,
                      fontWeight: 700,
                      display: "inline-block",
                      mb: 2.25,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    For Doctors &amp; Medical Professionals
                  </Typography>
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: "2.3rem", sm: "3rem", md: "3.8rem" },
                      fontWeight: 800,
                      letterSpacing: "-0.02em",
                      background: `linear-gradient(135deg, ${INK} 0%, ${TEAL_DEEP} 100%)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      lineHeight: 1.15,
                    }}
                  >
                    Financing that keeps pace with your practice.
                  </Typography>
                  <Typography
                    sx={{
                      mt: 3,
                      fontSize: "1rem",
                      color: SLATE,
                      lineHeight: 1.65,
                    }}
                  >
                    Compare offers from{" "}
                    <Box component="span" sx={{ color: AMBER, fontWeight: 700 }}>
                      40+
                    </Box>{" "}
                    banks and NBFCs in one place — for clinic setup, equipment,
                    expansion, or personal needs — without running between branches.
                  </Typography>

                  <Box
                    sx={{
                      mt: 3.5,
                      display: { xs: "grid", sm: "flex" },
                      gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "none" },
                      flexWrap: { sm: "wrap" },
                      gap: { xs: 1.25, sm: 1.5 },
                      width: "100%",
                    }}
                  >
                    {["Clinic Setup", "Equipment Finance", "Practice Expansion", "Personal Loans"].map((tag, idx) => (
                      <Box
                        key={idx}
                        component="span"
                        sx={{
                          fontSize: { xs: "0.72rem", sm: "0.85rem" },
                          color: TEAL,
                          bgcolor: "rgba(50, 68, 230, 0.06)",
                          border: "1px solid rgba(50, 68, 230, 0.15)",
                          px: { xs: 1.5, sm: 2.25 },
                          py: { xs: 0.8, sm: 1 },
                          borderRadius: "24px",
                          fontWeight: 600,
                          cursor: "default",
                          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                          boxShadow: "0 2px 4px rgba(50, 68, 230, 0.02)",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          gap: { xs: 0.75, sm: 1 },
                          "&::before": {
                            content: '""',
                            width: "5px",
                            height: "5px",
                            borderRadius: "50%",
                            bgcolor: AMBER,
                            transition: "background-color 0.3s ease",
                          },
                          "&:hover": {
                            bgcolor: TEAL,
                            borderColor: TEAL,
                            color: "#ffffff",
                            transform: "translateY(-3px) scale(1.03)",
                            boxShadow: "0 8px 20px rgba(50, 68, 230, 0.2)",
                            "&::before": {
                              bgcolor: "#ffffff",
                            }
                          },
                        }}
                      >
                        {tag}
                      </Box>
                    ))}
                  </Box>

                  <Box sx={{ mt: 4, display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 2.5 }, flexWrap: "wrap" }}>
                    <Button
                      component={Link}
                      to="/application-form"
                      variant="contained"
                      sx={{
                        bgcolor: TEAL,
                        color: "#fff",
                        borderRadius: "30px",
                        px: { xs: 3, sm: 4 },
                        py: { xs: 0.8, sm: 1 },
                        fontWeight: 600,
                        textTransform: "none",
                        fontSize: { xs: "0.88rem", sm: "1rem" },
                        boxShadow: "0 6px 20px rgba(50, 68, 230, 0.25)",
                        transition: "all .2s ease",
                        "&:hover": {
                          bgcolor: TEAL_DEEP,
                          transform: "translateY(-2px)",
                          boxShadow: "0 8px 25px rgba(50, 68, 230, 0.35)",
                        },
                      }}
                    >
                      Apply Now
                    </Button>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        background: "linear-gradient(135deg, rgba(50, 68, 230, 0.07) 0%, rgba(50, 68, 230, 0.02) 100%)",
                        border: "1.5px solid rgba(50, 68, 230, 0.25)",
                        borderRadius: "16px",
                        px: { xs: 1.75, sm: 2.25 },
                        py: { xs: 0.75, sm: 1 },
                        boxShadow: "0 4px 15px rgba(50, 68, 230, 0.06)",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          borderColor: "rgba(50, 68, 230, 0.45)",
                          boxShadow: "0 8px 25px rgba(50, 68, 230, 0.15)",
                          background: "linear-gradient(135deg, rgba(50, 68, 230, 0.12) 0%, rgba(50, 68, 230, 0.04) 100%)",
                        },
                      }}
                    >
                      <Typography
                        component="span"
                        sx={{
                          fontWeight: 800,
                          fontSize: { xs: "1.25rem", sm: "1.5rem" },
                          color: TEAL,
                          letterSpacing: "-0.02em",
                        }}
                      >
                        40+
                      </Typography>
                      <Typography
                        component="span"
                        sx={{
                          fontSize: { xs: "0.72rem", sm: "0.8rem" },
                          color: SLATE,
                          lineHeight: 1.3,
                          fontWeight: 600,
                        }}
                      >
                        Banks &amp;
                        <br />
                        NBFC partners
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} md={5}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  <Box
                    component="img"
                    src="/new/doctorsloan.webp"
                    alt="Doctor and Medical Professional"
                    sx={{
                      width: "100%",
                      maxWidth: { xs: "100%", sm: "540px", md: "580px", lg: "650px" },
                      height: "auto",
                      objectFit: "contain",
                      filter: "drop-shadow(0 15px 35px rgba(50, 68, 230, 0.08))",
                      borderRadius: "24px",
                      transition: "transform 0.4s ease",
                      "&:hover": {
                        transform: "translateY(-6px)",
                      },
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* ENHANCED TAGLINE MARQUEE */}
        <Box
          sx={{
            width: "100%",
            background: "linear-gradient(90deg, #3a49d6 0%, #1d4ed8 50%, #3a49d6 100%)",
            overflow: "hidden",
            py: { xs: 0.8, md: 1.5 },
            borderTop: "1px solid rgba(255,255,255,0.15)",
            borderBottom: "1px solid rgba(255,255,255,0.15)",
            display: 'flex',
            position: 'relative',
            mb: { xs: 2.5, md: 4 },
            boxShadow: "0 10px 40px rgba(58, 73, 214, 0.25)",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "50%",
              height: "100%",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
              animation: `${shine} 6s infinite ease-in-out`,
              zIndex: 1
            }
          }}
        >
          {/* Floating Background Icons */}
          <Box sx={{ position: 'absolute', left: '10%', top: '20%', opacity: 0.1, color: '#fff', animation: `${floating} 3s infinite ease-in-out` }}>
            <Stethoscope size={isMobileScreen ? 16 : 24} />
          </Box>
          <Box sx={{ position: 'absolute', right: '15%', bottom: '20%', opacity: 0.1, color: '#fff', animation: `${floating} 4s infinite ease-in-out` }}>
            <Zap size={isMobileScreen ? 14 : 20} />
          </Box>
          <Box sx={{ position: 'absolute', left: '40%', bottom: '10%', opacity: 0.08, color: '#fff', animation: `${floating} 5s infinite ease-in-out` }}>
            <Star size={isMobileScreen ? 12 : 18} />
          </Box>

          <Box
            sx={{
              display: "flex",
              width: "max-content",
              animation: `${marqueeScroll} 30s linear infinite`,
              "&:hover": {
                animationPlayState: "paused",
              },
            }}
          >
            {[...Array(12)].map((_, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, md: 3 }, px: { xs: 2, md: 4 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <BadgeCheck size={isMobileScreen ? 12 : 16} style={{ color: '#ffcc00' }} />
                  <Typography
                    sx={{
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: { xs: "0.75rem", md: "1.05rem" },
                      whiteSpace: "nowrap",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      fontFamily: 'Poppins',
                      textShadow: "0 2px 4px rgba(0,0,0,0.1)"
                    }}
                  >
                    India&apos;s best <span style={{ color: '#ffcc00' }}>Doctor&apos;s Lending Platform</span>
                  </Typography>
                </Box>
                <Box sx={{ color: 'rgba(255, 204, 0, 0.5)', fontSize: { xs: '0.9rem', md: '1.2rem' }, fontWeight: 900 }}>•</Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* ABOUT SECTION */}
        <Box component="section" sx={{ py: { xs: 3, sm: 9 } }} id="about">
          <Container maxWidth="lg" sx={{ px: { xs: 2.5, md: 4 } }}>
            <Box
              className="reveal"
              sx={{
                background: CARD,
                border: `1px solid ${LINE}`,
                borderLeft: `5px solid ${TEAL}`,
                borderRadius: "16px",
                p: { xs: "28px 24px", sm: "38px 42px" },
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "170px 1fr" },
                gap: { xs: 1.75, sm: 4 },
                boxShadow: "0 8px 30px rgba(50, 68, 230, 0.03)",
              }}
            >
              <Box>
                <Typography
                  component="div"
                  sx={{
                    fontSize: "0.78rem",
                    color: TEAL,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  What it is
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    mt: 1,
                  }}
                >
                  F2 Fintech
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: "1.05rem",
                  color: SLATE,
                  lineHeight: 1.65,
                }}
              >
                F2 Fintech is a loan marketplace built for doctors. Instead of approaching banks
                one by one, you share your details with us once — we match you with the lenders
                most likely to approve your profile, at a competitive rate. Our team handles the
                documentation and follow-ups, so you can stay focused on your patients.
              </Typography>
            </Box>
          </Container>
        </Box>

        {/* LENDING NETWORK / PARTNERS SECTION */}
        <Box component="section" sx={{ py: { xs: 3, sm: 9.5 } }} id="partners">
          <Container maxWidth="lg" sx={{ px: { xs: 2.5, md: 4 } }}>
            <Box className="reveal" sx={{ mb: 6, maxWidth: "100%" }}>
              <Typography
                component="span"
                sx={{
                  fontSize: "0.82rem",
                  color: TEAL,
                  fontWeight: 700,
                  display: "inline-block",
                  mb: 1.5,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Our Lending Network
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontSize: "2.25rem",
                  fontWeight: 800,
                  letterSpacing: "-0.01em",
                }}
              >
                Banks and NBFCs, side by side.
              </Typography>
              <Typography
                sx={{
                  mt: 1.75,
                  fontSize: "1.08rem",
                  color: SLATE,
                  lineHeight: 1.65,
                }}
              >
                We work with leading banks first, backed by a wide bench of NBFCs — so every doctor
                gets a real comparison, not just one offer.
              </Typography>
            </Box>

            <Box className="reveal" sx={{ mb: 7, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Typography
                component="div"
                sx={{
                  fontSize: "0.8rem",
                  color: TEAL,
                  bgcolor: "rgba(50, 68, 230, 0.07)",
                  fontWeight: 700,
                  mb: 4,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  px: 2.25,
                  py: 0.75,
                  borderRadius: "100px",
                  border: "1px solid rgba(50, 68, 230, 0.15)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Banks
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 3, width: "100%" }}>
                {banks.map((bank, index) => (
                  <Box
                    key={index}
                    sx={{
                      background: "rgba(255, 255, 255, 0.7)",
                      backdropFilter: "blur(16px)",
                      WebkitBackdropFilter: "blur(16px)",
                      border: "1px solid rgba(255, 255, 255, 0.65)",
                      borderRadius: "16px",
                      p: "22px 18px",
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-between",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.01), 0 2px 4px -1px rgba(0, 0, 0, 0.01), 0 20px 40px -20px rgba(50, 68, 230, 0.05)",
                      transition: "all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
                      position: "relative",
                      overflow: "hidden",
                      height: "auto",
                      minHeight: "190px",
                      flex: "1 1 210px",
                      maxWidth: "235px",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "4px",
                        background: `linear-gradient(90deg, ${TEAL}, #6366f1)`,
                        opacity: 0.6,
                        transition: "opacity 0.3s ease, height 0.3s ease",
                      },
                      "&:hover": {
                        transform: "translateY(-8px) scale(1.02)",
                        borderColor: "rgba(50, 68, 230, 0.25)",
                        boxShadow: "0 20px 40px -15px rgba(50, 68, 230, 0.12), 0 0 0 1px rgba(50, 68, 230, 0.04)",
                        background: "rgba(255, 255, 255, 0.92)",
                        "&::before": {
                          opacity: 1,
                          height: "6px",
                        },
                        "& .partner-logo-container": {
                          transform: "scale(1.04)",
                          boxShadow: "0 10px 15px -3px rgba(50, 68, 230, 0.08), inset 0 2px 4px 0 rgba(0, 0, 0, 0.02)",
                          borderColor: "rgba(50, 68, 230, 0.1)",
                        },
                        "& .name": {
                          color: TEAL,
                        }
                      }
                    }}
                  >
                    <Box
                      className="partner-logo-container"
                      sx={{
                        height: "58px",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 1.75,
                        background: "#ffffff",
                        borderRadius: "12px",
                        p: "8px 12px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), inset 0 2px 4px 0 rgba(0, 0, 0, 0.02)",
                        border: "1px solid rgba(50, 68, 230, 0.04)",
                        transition: "transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.4s ease, border-color 0.4s ease",
                      }}
                    >
                      <Box
                        component="img"
                        src={bank.logo}
                        alt={`${bank.name} logo`}
                        sx={{
                          maxHeight: "100%",
                          maxWidth: "100%",
                          objectFit: "contain",
                          mixBlendMode: "normal",
                          transition: "transform 0.3s ease",
                          filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.02))",
                        }}
                      />
                    </Box>
                    <Typography
                      className="name"
                      sx={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 600,
                        fontSize: "0.98rem",
                        color: INK,
                        mb: 0.75,
                        transition: "color 0.3s ease",
                      }}
                    >
                      {bank.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.76rem",
                        color: SLATE,
                        lineHeight: 1.45,
                        fontWeight: 500,
                      }}
                    >
                      {bank.specialty}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box className="reveal" sx={{ mb: 7, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Typography
                component="div"
                sx={{
                  fontSize: "0.8rem",
                  color: TEAL,
                  bgcolor: "rgba(50, 68, 230, 0.07)",
                  fontWeight: 700,
                  mb: 4,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  px: 2.25,
                  py: 0.75,
                  borderRadius: "100px",
                  border: "1px solid rgba(50, 68, 230, 0.15)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                NBFCs
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 3, width: "100%" }}>
                {nbfcs.map((nbfc, index) => (
                  <Box
                    key={index}
                    sx={{
                      background: "rgba(255, 255, 255, 0.7)",
                      backdropFilter: "blur(16px)",
                      WebkitBackdropFilter: "blur(16px)",
                      border: "1px solid rgba(255, 255, 255, 0.65)",
                      borderRadius: "16px",
                      p: "22px 18px",
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-between",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.01), 0 2px 4px -1px rgba(0, 0, 0, 0.01), 0 20px 40px -20px rgba(50, 68, 230, 0.05)",
                      transition: "all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
                      position: "relative",
                      overflow: "hidden",
                      height: "auto",
                      minHeight: "190px",
                      flex: "1 1 210px",
                      maxWidth: "235px",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "4px",
                        background: `linear-gradient(90deg, ${AMBER}, #10b981)`,
                        opacity: 0.6,
                        transition: "opacity 0.3s ease, height 0.3s ease",
                      },
                      "&:hover": {
                        transform: "translateY(-8px) scale(1.02)",
                        borderColor: "rgba(50, 68, 230, 0.25)",
                        boxShadow: "0 20px 40px -15px rgba(50, 68, 230, 0.12), 0 0 0 1px rgba(50, 68, 230, 0.04)",
                        background: "rgba(255, 255, 255, 0.92)",
                        "&::before": {
                          opacity: 1,
                          height: "6px",
                        },
                        "& .partner-logo-container": {
                          transform: "scale(1.04)",
                          boxShadow: "0 10px 15px -3px rgba(50, 68, 230, 0.08), inset 0 2px 4px 0 rgba(0, 0, 0, 0.02)",
                          borderColor: "rgba(50, 68, 230, 0.1)",
                        },
                        "& .name": {
                          color: TEAL,
                        }
                      }
                    }}
                  >
                    <Box
                      className="partner-logo-container"
                      sx={{
                        height: "58px",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 1.75,
                        background: "#ffffff",
                        borderRadius: "12px",
                        p: "8px 12px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), inset 0 2px 4px 0 rgba(0, 0, 0, 0.02)",
                        border: "1px solid rgba(50, 68, 230, 0.04)",
                        transition: "transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.4s ease, border-color 0.4s ease",
                      }}
                    >
                      <Box
                        component="img"
                        src={nbfc.logo}
                        alt={`${nbfc.name} logo`}
                        sx={{
                          maxHeight: "100%",
                          maxWidth: "100%",
                          objectFit: "contain",
                          mixBlendMode: "normal",
                          transition: "transform 0.3s ease",
                          filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.02))",
                        }}
                      />
                    </Box>
                    <Typography
                      className="name"
                      sx={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 600,
                        fontSize: "0.98rem",
                        color: INK,
                        mb: 0.75,
                        transition: "color 0.3s ease",
                      }}
                    >
                      {nbfc.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.76rem",
                        color: SLATE,
                        lineHeight: 1.45,
                        fontWeight: 500,
                      }}
                    >
                      {nbfc.specialty}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box
              className="reveal"
              sx={{
                mt: 5,
                mx: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1.25,
                background: `linear-gradient(135deg, ${TEAL_DEEP}, ${TEAL})`,
                color: "#fff",
                borderRadius: "50px",
                px: 4,
                py: 1.75,
                fontSize: "0.95rem",
                fontWeight: 600,
                boxShadow: "0 10px 25px -5px rgba(50, 68, 230, 0.3), 0 4px 10px -2px rgba(50, 68, 230, 0.2)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                transition: "all 0.3s ease",
                cursor: "default",
                width: "fit-content",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 15px 30px -5px rgba(50, 68, 230, 0.4), 0 6px 12px -2px rgba(50, 68, 230, 0.3)",
                }
              }}
            >
              and <Box component="span" sx={{ color: AMBER, fontWeight: 700, fontSize: "1.1rem" }}>40+</Box> more banks &amp; NBFCs in our network
            </Box>
          </Container>
        </Box>

        {/* PROCESS SECTION */}
        <Box component="section" sx={{ py: { xs: 3, sm: 10 } }} id="process">
          <Container maxWidth="lg" sx={{ px: { xs: 2.5, md: 4 } }}>
            <Box className="reveal" sx={{ mb: 0, maxWidth: "100%" }}>
              <Typography
                component="span"
                sx={{
                  fontSize: "0.82rem",
                  color: TEAL,
                  fontWeight: 700,
                  display: "inline-block",
                  mb: 1.5,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                How It Works
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontSize: "2.25rem",
                  fontWeight: 800,
                  letterSpacing: "-0.01em",
                }}
              >
                From message to money, in four steps
              </Typography>
              <Typography
                sx={{
                  mt: 1.75,
                  fontSize: "1.1rem",
                  color: SLATE,
                  lineHeight: 1.65,
                }}
              >
                No guesswork, no branch visits. Here's exactly what happens once you apply.
              </Typography>
            </Box>

            <Box
              className="reveal"
              component={motion.div}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.1 } },
              }}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "center", md: "flex-start" },
                gap: 3,
                mt: 7,
                p: { xs: 3.5, sm: 6 },
                background: CARD,
                border: "1px solid rgba(50, 68, 230, 0.1)",
                boxShadow: "0 20px 40px rgba(50, 68, 230, 0.06)",
                borderRadius: "40px",
              }}
            >
              {[
                {
                  icon: (
                    <svg
                      viewBox="0 0 32 32"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="6" y="5" width="20" height="24" rx="3"></rect>
                      <line x1="11" y1="12" x2="21" y2="12"></line>
                      <line x1="11" y1="17" x2="21" y2="17"></line>
                      <line x1="11" y1="22" x2="17" y2="22"></line>
                    </svg>
                  ),
                  label: "Share your requirements",
                  desc: "Tell us what you need — it takes just 1 minute.",
                  color: "#3244e6",
                  dir: -1,
                },
                {
                  icon: (
                    <svg
                      viewBox="0 0 32 32"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="14" cy="14" r="8"></circle>
                      <line x1="20" y1="20" x2="27" y2="27"></line>
                      <polyline points="10,14 13,17 18,11"></polyline>
                    </svg>
                  ),
                  label: "Get matched to a lender",
                  desc: (
                    <>
                      We match you to the best lender from{" "}
                      <Box component="span" sx={{ color: AMBER, fontWeight: 700 }}>
                        40+
                      </Box>{" "}
                      banks and NBFCs.
                    </>
                  ),
                  color: "#10b981",
                  dir: 1,
                },
                {
                  icon: (
                    <svg
                      viewBox="0 0 32 32"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="9" y="4" width="14" height="24" rx="3"></rect>
                      <line x1="13" y1="8" x2="19" y2="8"></line>
                      <polyline points="12,17 15,20 21,13"></polyline>
                    </svg>
                  ),
                  label: "Go fully digital",
                  desc: "Minimal documentation, fully digital — no branch visits.",
                  color: "#f59e0b",
                  dir: -1,
                },
                {
                  icon: (
                    <svg
                      viewBox="0 0 32 32"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="16" cy="16" r="11"></circle>
                      <text
                        x="16"
                        y="22"
                        textAnchor="middle"
                        fontFamily="Poppins, sans-serif"
                        fontWeight="700"
                        fontSize="13"
                        stroke="none"
                        fill="currentColor"
                      >
                        ₹
                      </text>
                    </svg>
                  ),
                  label: "Get disbursed",
                  desc: "Loan disbursed in 24 to 72 hours, straight to your account.",
                  color: "#0ea5e9",
                  dir: 1,
                },
              ].map((step, index) => (
                <Box
                  className="funnel-step"
                  key={index}
                  component={motion.div}
                  style={{ "--step-color": step.color }}
                  variants={{
                    hidden: { opacity: 0, x: step.dir * 90, scale: 0.85 },
                    show: {
                      opacity: 1,
                      x: 0,
                      scale: 1,
                      transition: { type: "spring", stiffness: 180, damping: 22 },
                    },
                  }}
                  whileHover={{
                    scale: 1.12,
                    filter: "brightness(1.1)",
                    transition: { type: "spring", stiffness: 400, damping: 10 },
                  }}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    flex: 1,
                    position: "relative",
                    width: "100%",
                    transition: "all 0.3s ease",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      top: "36px",
                      right: "-50%",
                      width: "100%",
                      height: "2px",
                      background: "rgba(50, 68, 230, 0.15)",
                      zIndex: 0,
                      display: { xs: "none", md: "block" }
                    },
                    "&:last-child::after": {
                      display: "none"
                    }
                  }}
                >
                  <Box
                    className="step-icon-wrap"
                    sx={{
                      width: "72px",
                      height: "72px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: step.color,
                      color: "#ffffff",
                      boxShadow: "0 10px 25px rgba(50, 68, 230, 0.15)",
                      zIndex: 1,
                      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      "& svg": {
                        width: "32px",
                        height: "32px",
                      },
                      "&:hover": {
                        transform: "scale(1.12)",
                        boxShadow: `0 12px 30px ${step.color}`,
                        filter: "brightness(1.1)",
                      }
                    }}
                  >
                    {step.icon}
                  </Box>
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: "1.15rem",
                      fontWeight: 700,
                      mt: 3,
                      color: INK,
                      lineHeight: 1.3,
                    }}
                  >
                    {step.label}
                  </Typography>
                  <Typography
                    sx={{
                      mt: 1.25,
                      fontSize: "0.88rem",
                      color: SLATE,
                      maxWidth: "200px",
                      lineHeight: 1.5,
                    }}
                  >
                    {step.desc}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Container>
        </Box>

        {/* CTA SECTION */}
        <Box component="section" sx={{ py: { xs: 7.5, sm: 10 } }} id="apply">
          <Container maxWidth="lg" sx={{ px: { xs: 2.5, md: 4 } }}>
            <Box
              className="reveal"
              sx={{
                background: `linear-gradient(135deg, ${TEAL_DEEP}, ${TEAL})`,
                borderRadius: "24px",
                p: { xs: "48px 24px", sm: "64px 48px" },
                textAlign: "center",
                color: "#fff",
                boxShadow: "0 20px 50px rgba(50, 68, 230, 0.2)",
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  color: "#fff",
                  fontSize: "2.1rem",
                  fontWeight: 800,
                }}
              >
                Ready when you are.
              </Typography>
              <Typography
                sx={{
                  color: "#e2e8f0",
                  mt: 2,
                  fontSize: "1.1rem",
                  fontWeight: 500,
                }}
              >
                Tell us a little about yourself and your practice — it takes about a minute.
              </Typography>

              <Button
                component={Link}
                to="/application-form"
                variant="contained"
                sx={{
                  mt: 3.75,
                  px: 5,
                  py: 1.4,
                  fontSize: "1.05rem",
                  bgcolor: AMBER,
                  color: "#ffffff",
                  borderRadius: "30px",
                  fontWeight: 600,
                  textTransform: "none",
                  boxShadow: "0 6px 20px rgba(16, 185, 129, 0.3)",
                  transition: "all .2s ease",
                  "&:hover": {
                    bgcolor: AMBER_DEEP,
                    transform: "translateY(-2px)",
                  }
                }}
              >
                Apply Now
              </Button>

              <Typography
                sx={{
                  mt: 2.5,
                  fontSize: "0.88rem",
                  color: "#e2e8f0",
                  fontWeight: 500,
                }}
              >
                Our executive will get in touch with you within 6 hours.
              </Typography>
            </Box>

            {/* DISCLAIMER SECTION */}
            <Box
              className="reveal"
              sx={{
                mt: 6,
                borderTop: `1px solid ${LINE}`,
                pt: 3.5,
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.85rem",
                  color: SLATE,
                  lineHeight: 1.6,
                }}
              >
                F2 Fintech is a loan marketplace and does not itself lend money. Eligibility,
                interest rates, and final approval are determined by the partner bank or NBFC.
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
}
