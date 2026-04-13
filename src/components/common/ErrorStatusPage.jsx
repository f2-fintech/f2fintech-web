import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { motion } from "framer-motion";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import CloudOffIcon from "@mui/icons-material/CloudOff";
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';

const ErrorStatusPage = ({ type = "offline" }) => {
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

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: 99999,
        background: "#020617",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        color: "#fff",
      }}
    >
      {/* Stable Animated Glows (Replacing the complex gradient array) */}
      <Box
        component={motion.div}
        animate={{
          opacity: [0.1, 0.4, 0.1],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        sx={{
          position: "absolute",
          top: "-10%",
          left: "-10%",
          width: "50%",
          height: "50%",
          background: "radial-gradient(circle, rgba(50, 68, 230, 0.4) 0%, transparent 70%)",
          filter: "blur(80px)",
          zIndex: 0,
        }}
      />
      
      <Box
        component={motion.div}
        animate={{
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        sx={{
          position: "absolute",
          bottom: "-10%",
          right: "-10%",
          width: "60%",
          height: "60%",
          background: "radial-gradient(circle, rgba(50, 68, 230, 0.3) 0%, transparent 70%)",
          filter: "blur(100px)",
          zIndex: 0,
        }}
      />

      {/* Floating Particles */}
      {[...Array(12)].map((_, i) => (
        <Box
          key={i}
          component={motion.div}
          initial={{ 
            opacity: 0, 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight 
          }}
          animate={{
            y: [null, -100],
            opacity: [0, 0.2, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "linear",
          }}
          sx={{
            position: "absolute",
            width: "2px",
            height: "2px",
            background: "#3244e6",
            borderRadius: "50%",
            zIndex: 1,
          }}
        />
      ))}

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: { xs: 4, md: 8 },
        }}
      >
        {/* Robot Illustration Side */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, scale: 0.9, x: -30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            component={motion.img}
            src="/funny_offline.png"
            alt="Confused Tech-Bot"
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            sx={{
              width: { xs: "280px", md: "480px" },
              height: "auto",
              filter: "drop-shadow(0 0 40px rgba(50, 68, 230, 0.3))",
            }}
          />
        </Box>

        {/* Text Content Side */}
        <Box
          sx={{
            flex: 1,
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                background: "rgba(50, 68, 230, 0.1)",
                padding: "6px 14px",
                borderRadius: "100px",
                border: "1px solid rgba(50, 68, 230, 0.2)",
                color: "#3244e6",
                mb: 3,
              }}
            >
              <ElectricalServicesIcon sx={{ fontSize: 16 }} />
              <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: 1.2 }}>
                SYSTEM ALERT: {isOffline ? "NO SIGNAL" : "LINK ERROR"}
              </Typography>
            </Box>

            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.2rem", md: "3.5rem" },
                fontWeight: 900,
                lineHeight: 1.1,
                mb: 2,
                background: "linear-gradient(135deg, #fff 30%, #3244e6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Whoops!<br />
              <Typography component="span" sx={{ fontSize: "inherit", fontWeight: "inherit", color: "#3244e6" }}>
                Signal Lost.
              </Typography>
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: "rgba(255, 255, 255, 0.5)",
                fontWeight: 400,
                fontSize: "1.1rem",
                lineHeight: 1.6,
                mb: 4,
                maxWidth: "480px",
              }}
            >
              {isOffline 
                ? "Our Tech-Bot accidentally unplugged the data stream while looking for coffee. He's currently trying to find the socket in the dark!"
                : "The vault is temporarily sealing its digital gates for a quick security polish. We'll be back in a flash."
              }
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: { xs: "center", md: "start" } }}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleRetry}
                  variant="contained"
                  disabled={retryActive}
                  sx={{
                    background: "#3244e6",
                    color: "#fff",
                    px: 4,
                    py: 1.2,
                    borderRadius: "10px",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    textTransform: "none",
                    boxShadow: "0 15px 30px rgba(50, 68, 230, 0.3)",
                    "&:hover": { background: "#2c3ce3" }
                  }}
                >
                  {retryActive ? "Restoring Connection..." : "Help Robot Plug it Back"}
                </Button>
              </motion.div>
              
              <Button
                variant="outlined"
                sx={{
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  color: "rgba(255, 255, 255, 0.4)",
                  px: 3,
                  py: 1.2,
                  borderRadius: "10px",
                  textTransform: "none",
                  "&:hover": { borderColor: "rgba(255, 255, 255, 0.2)" }
                }}
              >
                Local Security Status
              </Button>
            </Box>

            <Box sx={{ mt: 5, opacity: 0.2 }}>
              <Typography variant="caption" sx={{ letterSpacing: 1 }}>
                F2 FINTECH SECURE PROTOCOL • ENCRYPTED ID: ROBOT-V5
              </Typography>
            </Box>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default ErrorStatusPage;
