import { Box, Typography, Container, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GavelIcon from "@mui/icons-material/Gavel";

export default function FairPractices() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const accordionStyle = {
    background: isDark ? "rgba(30, 41, 59, 0.3)" : "rgba(248, 250, 252, 0.8)",
    border: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
    borderRadius: "12px",
    mb: 2,
    "&:before": { display: "none" },
    boxShadow: "none",
    overflow: "hidden"
  };

  const sections = [
    {
      title: "1. Core Objective & Scope",
      details: "This Fair Practices Code (FPC) outlines the minimum standard practices to be followed by F2 Fintech Private Limited when dealing with customers. It highlights our commitment to transparency, fairness, and customer support in all our loan matchmaking, comparison, and facilitation services."
    },
    {
      title: "2. Application & Processing of Loans",
      details: "We ensure all loan applications facilitated through our platform contain clear, comprehensive information about key criteria, documentation requirements, and processing milestones. We do not charge arbitrary, unadvertised fees for utilizing our online platform, and all partner lender fees are transparently disclosed."
    },
    {
      title: "3. Transparency in Interest Rates & Charges",
      details: "F2 Fintech provides real-time comparison tables of partner banks and NBFCs. We make every reasonable effort to display updated interest rates, annual percentage rates (APR), processing fees, pre-closure charges, and loan tenures. Customers are strongly encouraged to review the specific loan agreement of the selected partner lender."
    },
    {
      title: "4. Equal Opportunity & Non-Discrimination",
      details: "F2 Fintech serves all qualified applicants without discrimination on the basis of gender, race, caste, religion, marital status, age, or physical disability. All credit scoring recommendations are generated objectively based on financial inputs, credit histories, and partner lending criteria."
    },
    {
      title: "5. Ethical Recovery & Harassment-Free Conduct",
      details: "F2 Fintech strictly adopts a zero-tolerance policy against coercive, abusive, or high-handed collection methods. Although we do not directly manage collections, we contractually obligate our staff and partner platforms to adhere to professional communication hours (typically 8:00 AM to 7:00 PM), maintain polite correspondence, and respect customer privacy at all times."
    },
    {
      title: "6. Customer Privacy & Data Security",
      details: "All customer information, documents, and credentials collected during the eligibility assessment are secured under advanced encryption standards. Personal data is only shared with RBI-registered lending partners selected and authorized by the customer. We never sell customer records to unauthorized third parties."
    }
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 6, md: 10 },
        px: { xs: 2, sm: 3 },
      }}
    >
      <Container maxWidth="md">
        {/* Card Container */}
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
          <Box sx={{ mb: 5 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <GavelIcon sx={{ color: "#3244e6", mr: 2, fontSize: 36 }} />
              <Typography
                variant="h1"
                sx={{
                  color: isDark ? "#ffffff" : "#172b4d",
                  fontFamily: "'Verdana', sans-serif",
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                  fontWeight: 800,
                  lineHeight: 1.2,
                }}
              >
                Fair Practices Code
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
                fontFamily: "'Verdana', sans-serif",
                fontSize: { xs: "0.95rem", sm: "1rem" },
                fontWeight: 400,
                lineHeight: 1.8,
              }}
            >
              This code outlines the ethical practices and standards we follow across our lending referral services to ensure customer-centric services and full compliance with fair lending principles.
            </Typography>
          </Box>

          {/* Accordion List for Code Details */}
          <Box sx={{ mt: 4 }}>
            {sections.map((section, index) => (
              <Accordion key={index} disableGutters sx={accordionStyle}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: "#3244e6" }} />}
                  sx={{
                    px: 3,
                    py: 1,
                    "& .MuiAccordionSummary-content": {
                      margin: "12px 0"
                    }
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontFamily: "'Verdana', sans-serif",
                      fontSize: "1.1rem",
                      color: isDark ? "#f1f5f9" : "#1e293b"
                    }}
                  >
                    {section.title}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 3, pb: 3, pt: 0 }}>
                  <Typography
                    sx={{
                      color: isDark ? "#cbd5e1" : "#4a5568",
                      fontFamily: "'Verdana', sans-serif",
                      fontSize: "0.95rem",
                      lineHeight: 1.8,
                    }}
                  >
                    {section.details}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>

          {/* Footer of the document */}
          <Box
            sx={{
              mt: 6,
              pt: 3,
              borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
              textAlign: "center"
            }}
          >
            <Typography
              sx={{
                color: "#94a3b8",
                fontSize: "0.85rem",
                fontFamily: "'Verdana', sans-serif",
                fontWeight: 500
              }}
            >
              Last Updated: July 01, 2026 | F2 Fintech Private Limited
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
