import { Box, Typography, Container, Grid, Card, CardContent } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import BusinessIcon from "@mui/icons-material/Business";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";


export default function Compliance() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const cardStyle = {
    background: isDark ? "rgba(30, 41, 59, 0.4)" : "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(12px)",
    borderRadius: "16px",
    border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(50, 68, 230, 0.08)"}`,
    boxShadow: isDark
      ? "0 10px 30px rgba(0, 0, 0, 0.2)"
      : "0 10px 30px rgba(50, 68, 230, 0.03)",
    height: "100%",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: isDark
        ? "0 15px 35px rgba(0, 0, 0, 0.3)"
        : "0 15px 35px rgba(50, 68, 230, 0.06)",
    }
  };

  const partners = [
    { name: "HDFC Bank Limited", type: "Scheduled Commercial Bank" },
    { name: "ICICI Bank Limited", type: "Scheduled Commercial Bank" },
    { name: "Bajaj Finserv Limited", type: "Non-Banking Financial Company (NBFC)" },
    { name: "Cholamandalam Investment & Finance Company", type: "Non-Banking Financial Company (NBFC)" },
    { name: "Indifi Technologies Private Limited", type: "Non-Banking Financial Company (NBFC) Partner" },
    { name: "Flexiloan Services Private Limited", type: "Non-Banking Financial Company (NBFC) Partner" }
  ];

  const recognitions = [
    { name: "IIT-Delhi: Certificate of Appreciation / Honour", type: "Award (Valid from 2026)" },
    { name: "MSME: India Business Award - Entrepreneur of the Year", type: "Award (Valid from 2022)" },
    { name: "Indian Icon Award", type: "Award (Valid from 2022)" },
    { name: "Delhi Medical Association", type: "Award (Valid from 2019)" },
    { name: "Startup India Recognition Certificate (DPIIT, Govt. of India)", type: "Certification (Valid from 2025)" },
    { name: "NPCI Propel Program Participation Certificate", type: "Certification (Valid from 2023)" },
    { name: "Incubation Membership (IIM Lucknow Noida Campus)", type: "Membership (Valid from 2024)" },
    { name: "Delhi Medical Associates", type: "Official Professional Affiliation" },
    { name: "TRAI", type: "Telecom Regulatory Compliance" },
  ];


  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 6, md: 10 },
        px: { xs: 2, sm: 3 },
      }}
    >
      <Container maxWidth="lg">
        {/* Main Card Container */}
        <Box
          sx={{
            background: isDark
              ? "rgba(15, 23, 42, 0.8)"
              : "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(16px)",
            borderRadius: "24px",
            padding: { xs: 3, sm: 5, md: 6 },
            border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(50, 68, 230, 0.08)"}`,
            boxShadow: isDark
              ? "0 20px 40px rgba(0, 0, 0, 0.3)"
              : "0 20px 40px rgba(50, 68, 230, 0.05)",
          }}
        >
          {/* Header Section */}
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h1"
              sx={{
                color: isDark ? "#ffffff" : "#172b4d",
                fontFamily: "'Poppins', sans-serif",
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                fontWeight: 800,
                lineHeight: 1.2,
                mb: 1.5,
              }}
            >
              Regulatory & Corporate Compliance
            </Typography>
            <Box
              sx={{
                height: "4px",
                width: "80px",
                background: "linear-gradient(90deg, #3244e6 0%, #10b981 100%)",
                borderRadius: "2px",
              }}
            />
          </Box>

          <Typography
            sx={{
              color: isDark ? "#cbd5e1" : "#4a5568",
              fontFamily: "'Poppins', sans-serif",
              fontSize: { xs: "1rem", sm: "1.1rem" },
              fontWeight: 400,
              lineHeight: 1.8,
              mb: 6,
            }}
          >
            F2 Fintech Private Limited is dedicated to maintaining high standards of regulatory compliance, operational integrity, and transparency in all financial intermediation activities.
          </Typography>

          {/* Grid of Corporate Information */}
          <Grid container spacing={4} sx={{ mb: 8 }}>
            <Grid item xs={12} md={6}>
              <Card sx={cardStyle}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2.5 }}>
                    <BusinessIcon sx={{ color: "#3244e6", mr: 2, fontSize: 32 }} />
                    <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: "'Poppins', sans-serif" }}>
                      Corporate Identity
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ color: "#94a3b8", fontWeight: 600 }}>
                        REGISTERED COMPANY NAME
                      </Typography>
                      <Typography sx={{ color: isDark ? "#cbd5e1" : "#1e293b", fontWeight: 550 }}>
                        F2 Fintech Private Limited
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ color: "#94a3b8", fontWeight: 600 }}>
                        CORPORATE IDENTIFICATION NUMBER (CIN)
                      </Typography>
                      <Typography sx={{ color: isDark ? "#cbd5e1" : "#1e293b", fontWeight: 550, fontFamily: "monospace" }}>
                        U67100UP2022PTC168197
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ color: "#94a3b8", fontWeight: 600 }}>
                        DATE OF INCORPORATION
                      </Typography>
                      <Typography sx={{ color: isDark ? "#cbd5e1" : "#1e293b", fontWeight: 550 }}>
                        July 25, 2022
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={cardStyle}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2.5 }}>
                    <ContactMailIcon sx={{ color: "#10b981", mr: 2, fontSize: 32 }} />
                    <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: "'Poppins', sans-serif" }}>
                      Office & Contact Address
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ color: "#94a3b8", fontWeight: 600 }}>
                        REGISTERED & CORPORATE OFFICE
                      </Typography>
                      <Typography sx={{ color: isDark ? "#cbd5e1" : "#1e293b", fontWeight: 550, lineHeight: 1.6 }}>
                        F2 Fintech Pvt Ltd,<br />
                        Office 201, Second floor, C-127,<br />
                        AGS Park, C Block, Sector 63,<br />
                        Noida, Uttar Pradesh 201301
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ color: "#94a3b8", fontWeight: 600 }}>
                        OFFICIAL CONTACT EMAIL
                      </Typography>
                      <Typography sx={{ color: "#3244e6", fontWeight: 550 }}>
                        wecare@f2fintech.com
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ color: "#94a3b8", fontWeight: 600 }}>
                        CUSTOMER HELPLINE
                      </Typography>
                      <Typography sx={{ color: isDark ? "#cbd5e1" : "#1e293b", fontWeight: 550 }}>
                        +91 8810600135, +91 8860600555
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Section: LSP Disclosure */}
          <Box sx={{ mb: 8 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <AssignmentIcon sx={{ color: "#3244e6", mr: 2 }} />
              <Typography
                variant="h2"
                sx={{
                  color: isDark ? "#f1f5f9" : "#172b4d",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: { xs: "1.4rem", sm: "1.6rem" },
                  fontWeight: 700,
                  borderLeft: "4px solid #3244e6",
                  pl: 2,
                }}
              >
                Lending Service Provider (LSP) Status
              </Typography>
            </Box>
            <Typography
              sx={{
                color: isDark ? "#cbd5e1" : "#4a5568",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "1rem",
                lineHeight: 1.8,
                mb: 4,
              }}
            >
              F2 Fintech acts as a digital lending service provider and lead generator partner for registered commercial banks and NBFCs. We facilitate the distribution and sourcing of various credit products (personal loans, home loans, business loans, loans against property) through our online platform. We strictly do not engage in direct lending or balance sheet credit risks.
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: isDark ? "#f1f5f9" : "#1e293b",
                fontWeight: 650,
                fontFamily: "'Poppins', sans-serif",
                mb: 2.5
              }}
            >
              Our Key Registered Banking & NBFC Partners:
            </Typography>

            <Grid container spacing={3}>
              {partners.map((partner, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box
                    sx={{
                      p: 2.5,
                      borderRadius: "12px",
                      border: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
                      background: isDark ? "rgba(30, 41, 59, 0.2)" : "rgba(248, 250, 252, 0.8)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      height: "100%",
                    }}
                  >
                    <Typography sx={{ fontWeight: 600, color: isDark ? "#f1f5f9" : "#1e293b", fontSize: "0.95rem" }}>
                      {partner.name}
                    </Typography>
                    <Typography sx={{ color: "#64748B", fontSize: "0.8rem", mt: 0.5, fontWeight: 500 }}>
                      {partner.type}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Section: Affiliations, Memberships & Recognitions */}
          <Box sx={{ mb: 8 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <VerifiedUserIcon sx={{ color: "#3244e6", mr: 2 }} />
              <Typography
                variant="h2"
                sx={{
                  color: isDark ? "#f1f5f9" : "#172b4d",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: { xs: "1.4rem", sm: "1.6rem" },
                  fontWeight: 700,
                  borderLeft: "4px solid #3244e6",
                  pl: 2,
                }}
              >
                Affiliations, Memberships & Recognitions
              </Typography>
            </Box>
            <Typography
              sx={{
                color: isDark ? "#cbd5e1" : "#4a5568",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "1rem",
                lineHeight: 1.8,
                mb: 4,
              }}
            >
              F2 Fintech is associated with leading industry panels, regulatory compliance frameworks, and recognized media/professional forums:
            </Typography>

            <Grid container spacing={3}>
              {recognitions.map((rec, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box
                    sx={{
                      p: 2.5,
                      borderRadius: "12px",
                      border: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
                      background: isDark ? "rgba(30, 41, 59, 0.2)" : "rgba(248, 250, 252, 0.8)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      height: "100%",
                    }}
                  >
                    <Typography sx={{ fontWeight: 600, color: isDark ? "#f1f5f9" : "#1e293b", fontSize: "0.95rem" }}>
                      {rec.name}
                    </Typography>
                    <Typography sx={{ color: "#64748B", fontSize: "0.8rem", mt: 0.5, fontWeight: 500 }}>
                      {rec.type}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Section: Regulatory Guidelines Compliance */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <HelpOutlineIcon sx={{ color: "#10b981", mr: 2 }} />
              <Typography
                variant="h2"
                sx={{
                  color: isDark ? "#f1f5f9" : "#172b4d",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: { xs: "1.4rem", sm: "1.6rem" },
                  fontWeight: 700,
                  borderLeft: "4px solid #10b981",
                  pl: 2,
                }}
              >
                Compliance Declaration
              </Typography>
            </Box>
            <Typography
              sx={{
                color: isDark ? "#cbd5e1" : "#4a5568",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "1rem",
                lineHeight: 1.8,
              }}
            >
              We ensure our platform, loan comparison matrices, eligibility criteria calculators, and data collection processes comply strictly with digital lending guidelines, consumer protection laws, and data privacy guidelines. Our systems employ advanced security standards (ISO certification and Secure Socket Layer encryption) to safeguard customer records.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
