import { Box, Typography, Container, Grid, Card, CardContent } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ShieldIcon from "@mui/icons-material/Shield";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";

export default function Grievance() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const cardStyle = (color) => ({
    background: isDark ? "rgba(30, 41, 59, 0.4)" : "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(12px)",
    borderRadius: "18px",
    border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(50, 68, 230, 0.08)"}`,
    borderTop: `4px solid ${color}`,
    boxShadow: isDark
      ? "0 10px 30px rgba(0, 0, 0, 0.2)"
      : "0 10px 30px rgba(50, 68, 230, 0.03)",
    height: "100%",
    p: 3,
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: isDark
        ? "0 15px 35px rgba(0, 0, 0, 0.3)"
        : "0 15px 35px rgba(50, 68, 230, 0.06)",
    }
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 6, md: 10 },
        px: { xs: 2, sm: 3 },
      }}
    >
      <Container maxWidth="lg">
        {/* Main Wrapper */}
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
          {/* Title Area */}
          <Box sx={{ mb: 5 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <ContactSupportIcon sx={{ color: "#3244e6", mr: 2, fontSize: 38 }} />
              <Typography
                variant="h1"
                sx={{
                  color: isDark ? "#ffffff" : "#172b4d",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                  fontWeight: 800,
                  lineHeight: 1.2,
                }}
              >
                Grievance Redressal Policy
              </Typography>
            </Box>
            <Box
              sx={{
                height: "4px",
                width: "80px",
                background: "linear-gradient(90deg, #3244e6 0%, #10b981 100%)",
                borderRadius: "2px",
                mb: 3
              }}
            />
            <Typography
              sx={{
                color: isDark ? "#cbd5e1" : "#4a5568",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "1rem",
                lineHeight: 1.8,
              }}
            >
              F2 Fintech believes in delivering premium customer service. If you have any questions, feedback, or complaints regarding our financial matching services or partners, we provide a structured escalation matrix to resolve your issues in a transparent and time-bound manner.
            </Typography>
          </Box>

          {/* Three-Level Escalation Grid */}
          <Grid container spacing={4} sx={{ mt: 2 }}>

            {/* Level 1: Customer Support */}
            <Grid item xs={12} md={6}>
              <Card sx={cardStyle("#3244e6")}>
                <CardContent sx={{ p: 0 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2.5 }}>
                    <SupportAgentIcon sx={{ color: "#3244e6", mr: 1.5, fontSize: 28 }} />
                    <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: "'Poppins', sans-serif" }}>
                      Level 1: Support
                    </Typography>
                  </Box>
                  <Typography sx={{ color: isDark ? "#cbd5e1" : "#4a5568", fontSize: "0.9rem", mb: 3, lineHeight: 1.6 }}>
                    For general issues, eligibility checks, or partner matching issues, please contact our help desk.
                  </Typography>

                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Box>
                      <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 600 }}>
                        EMAIL ADDRESS
                      </Typography>
                      <Typography sx={{ color: "#3244e6", fontWeight: 600, fontSize: "0.95rem" }}>
                        support@f2fintech.com
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 600 }}>
                        TELEPHONE HELPLINE
                      </Typography>
                      <Typography sx={{ color: isDark ? "#cbd5e1" : "#1e293b", fontWeight: 600, fontSize: "0.95rem" }}>
                        +91 81300 60135
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 600 }}>
                        TURNAROUND TIME
                      </Typography>
                      <Typography sx={{ color: "#10b981", fontWeight: 650, fontSize: "0.9rem" }}>
                        Within 7 Working Days
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Level 2: Grievance Officer */}
            <Grid item xs={12} md={6}>
              <Card sx={cardStyle("#10b981")}>
                <CardContent sx={{ p: 0 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2.5 }}>
                    <ShieldIcon sx={{ color: "#10b981", mr: 1.5, fontSize: 28 }} />
                    <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: "'Poppins', sans-serif" }}>
                      Level 2: Escalation
                    </Typography>
                  </Box>
                  <Typography sx={{ color: isDark ? "#cbd5e1" : "#4a5568", fontSize: "0.9rem", mb: 3, lineHeight: 1.6 }}>
                    If your complaint is not resolved within 7 days, or if you are unsatisfied with the resolution, write to our Grievance Redressal Officer (GRO).
                  </Typography>

                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Box>
                      <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 600 }}>
                        OFFICER NAME & ROLE
                      </Typography>
                      <Typography sx={{ color: isDark ? "#cbd5e1" : "#1e293b", fontWeight: 600, fontSize: "0.95rem" }}>
                        Mr. Abhinav Awal (Co- founder & MD )
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 600 }}>
                        GRO EMAIL & PHONE
                      </Typography>
                      <Typography sx={{ color: "#10b981", fontWeight: 600, fontSize: "0.95rem" }}>
                        wecare@f2fintech.com
                      </Typography>
                      <Typography sx={{ color: isDark ? "#cbd5e1" : "#1e293b", fontWeight: 600, fontSize: "0.95rem" }}>
                        +91  88606 00555
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 600 }}>
                        TURNAROUND TIME
                      </Typography>
                      <Typography sx={{ color: "#10b981", fontWeight: 650, fontSize: "0.9rem" }}>
                        Within 15 Working Days
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Physical Address details for hard copies */}
          <Box
            sx={{
              mt: 6,
              p: 3,
              borderRadius: "14px",
              background: isDark ? "rgba(30, 41, 59, 0.2)" : "rgba(241, 245, 249, 0.6)",
              border: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 700, fontFamily: "'Poppins', sans-serif", mb: 1, color: isDark ? "#f1f5f9" : "#1e293b" }}>
              Physical Grievance Submission Address
            </Typography>
            <Typography sx={{ color: isDark ? "#cbd5e1" : "#4a5568", fontSize: "0.9rem", lineHeight: 1.6, fontFamily: "'Poppins', sans-serif" }}>
              Customers can send written letters or physical representations regarding grievances to the registered headquarters of the company:<br />
              <br />
              <strong>F2 Fintech Private Limited</strong><br />
              Office 201, Second floor, C-127, AGS Park, C Block, Sector 63, Noida, Uttar Pradesh 201301, India.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
