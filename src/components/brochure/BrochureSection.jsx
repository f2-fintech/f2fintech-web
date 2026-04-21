import React from "react";
import { Box, Container, Typography, Grid, useTheme } from "@mui/material";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton, Button } from "@mui/material";

const brochures = [
  {
    id: 1,
    title: "Business Loan",
    desc: "Scale your enterprise",
    file: "business-loan-proposal.pdf",
    icon: BusinessCenterOutlinedIcon,
    color: "#0ea5e9",
  },
  {
    id: 2,
    title: "CA Proposal",
    desc: "Financial partnerships",
    file: "ca-proposal-F2.pdf",
    icon: AccountBalanceOutlinedIcon,
    color: "#8b5cf6",
  },
  {
    id: 3,
    title: "Doctor Loan",
    desc: "For medical professionals",
    file: "doctor-loan-proposal.pdf",
    icon: LocalHospitalOutlinedIcon,
    color: "#10b981",
  },
  {
    id: 4,
    title: "Home Loan",
    desc: "Full & short guides",
    file: "home-loan-full-proposal.pdf",
    icon: HomeOutlinedIcon,
    color: "#f59e0b",
  },
  {
    id: 5,
    title: "Property Loan",
    desc: "Unlock real estate equity",
    file: "loan-against-property.pdf",
    icon: ApartmentOutlinedIcon,
    color: "#06b6d4",
  },
  {
    id: 6,
    title: "Personal Loan",
    desc: "Flexible unsecured capital",
    file: "personal-loan-proposal.pdf",
    icon: PersonOutlineOutlinedIcon,
    color: "#6366f1",
  },
];

const BrochureSection = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isDark = theme.palette.mode === "dark";

  const handleBackToFooter = () => {
    navigate("/", { state: { scrollToFooter: true } });
  };

  const handleDownload = (e, file) => {
    e.preventDefault();
    const filePath = `/newassets/${file}`;

    // Create a temporary link for downloading
    const downloadLink = document.createElement("a");
    downloadLink.href = filePath;
    downloadLink.download = file;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    // Open in a new tab
    window.open(filePath, "_blank");
  };

  return (
    <Box
      sx={{
        py: { xs: 6, md: 8 },
        backgroundColor: isDark ? "#0f172a" : "#ffffff",
      }}
    >
      <Container maxWidth="lg">
        {/* Back Button */}
        <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-start" }}>
          <Button
            onClick={handleBackToFooter}
            startIcon={<ArrowBackIcon />}
            sx={{
              color: isDark ? "#94a3b8" : "#64748b",
              textTransform: "none",
              fontSize: "1rem",
              fontFamily: "Poppins",
              "&:hover": {
                color: "#3244e6",
                backgroundColor: "transparent",
                "& .MuiButton-startIcon": {
                  transform: "translateX(-4px)",
                },
              },
              transition: "all 0.3s ease",
            }}
          >
            Back to Home
          </Button>
        </Box>

        {/* Header - Compact */}
        <Box textAlign="center" mb={5}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              fontWeight="bold"
              fontFamily="Poppins"
              textAlign="center"
              sx={{
                fontSize: {
                  xs: "2rem",
                  sm: "2rem",
                  md: "2.3rem",
                  lg: "2.5rem",
                  xl: "3rem",
                },
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                color: theme.palette.text.primary,
                paddingBottom: "3rem",
                px: 2,
              }}
            >
              Download
              <span
                style={{
                  marginRight: "10px",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "#3244e6",
                  marginLeft: "10px",
                }}
              >
                Brochures
              </span>
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: isDark ? "#94a3b8" : "#64748b",
                maxWidth: "500px",
                mx: "auto",
              }}
            >
              Access our financial portfolios and proposals
            </Typography>
          </motion.div>
        </Box>

        {/* Grid - Compact Cards */}
        <Grid container spacing={2}>
          {brochures.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Box
                  component="a"
                  href={`/newassets/${item.file}`}
                  onClick={(e) => handleDownload(e, item.file)}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 2,
                    textDecoration: "none",
                    borderRadius: "16px",
                    backgroundColor: isDark ? "rgba(30, 41, 59, 0.6)" : "#f8fafc",
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#e2e8f0"}`,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      backgroundColor: isDark ? "rgba(30, 41, 59, 0.9)" : "#ffffff",
                      borderColor: isDark ? "rgba(255,255,255,0.1)" : "#cbd5e1",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                      "& .download-icon": {
                        opacity: 1,
                        transform: "translateX(0)",
                      },
                    },
                  }}
                >
                  {/* Icon */}
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: "12px",
                      backgroundColor: `${item.color}15`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <item.icon sx={{ fontSize: 24, color: item.color }} />
                  </Box>

                  {/* Content */}
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 600,
                        color: isDark ? "#fff" : "#0f172a",
                        fontSize: "1rem",
                        fontFamily: "Poppins",
                        mb: 0.25,
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: isDark ? "#94a3b8" : "#64748b",
                        display: "block",
                      }}
                    >
                      {item.desc}
                    </Typography>
                  </Box>

                  {/* Download Icon */}
                  <CloudDownloadOutlinedIcon
                    className="download-icon"
                    sx={{
                      fontSize: 20,
                      color: item.color,
                      opacity: 0.6,
                      transform: "translateX(4px)",
                      transition: "all 0.3s ease",
                    }}
                  />
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default BrochureSection;