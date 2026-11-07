import React from "react";
import { Box, Typography, Container, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Heart } from "lucide-react";

const PlainTextSection = () => {
  const theme = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const features = [
    {
      icon: <Zap size={24} color={theme.palette.secondary.main} />,
      text: (
        <>
          We're <strong>F2 Fintech</strong>, the one-stop destination for easing
          the loan process in India.
        </>
      ),
    },
    {
      icon: <ShieldCheck size={24} color={theme.palette.secondary.main} />,
      text: (
        <>
          We help you navigate the complex world of finance with tailored
          solutions for all loan types.
        </>
      ),
    },
    {
      icon: <Heart size={24} color={theme.palette.secondary.main} />,
      text: (
        <>
          And here's something to be proud of: we've made over{" "}
          <strong>11,000+ clients happy</strong> since inception.
        </>
      ),
    },
  ];

  return (
    <Container maxWidth="md">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <Box
          sx={{
            py: { xs: 5, md: 8 },
            px: { xs: 3, sm: 6 },
            textAlign: "center",
            background: "linear-gradient(145deg, #ffffff 0%, #f8faff 100%)",
            borderRadius: { xs: "24px", md: "40px" },
            border: "1px solid rgba(50, 68, 230, 0.08)",
            boxShadow: "0 20px 40px rgba(50, 68, 230, 0.04)",
            mb: 8,
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "4px",
              background: `linear-gradient(90deg, transparent, ${theme.palette.secondary.main}, transparent)`,
            },
          }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mb: index === features.length - 1 ? 0 : 4,
                }}
              >
                <Box
                  sx={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(50, 68, 230, 0.06)",
                    mb: 2,
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: "1.05rem", sm: "1.2rem" },
                    lineHeight: 1.7,
                    color: "#4a5568",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                    maxWidth: "600px",
                    "& strong": {
                      color: theme.palette.secondary.main,
                      fontWeight: 700,
                    },
                  }}
                >
                  {feature.text}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>
      </motion.div>
    </Container>
  );
};

export default PlainTextSection;
