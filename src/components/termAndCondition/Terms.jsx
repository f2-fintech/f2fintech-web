import { Box, Typography, Container, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function TermsOfUse() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 4, md: 8 },
        px: { xs: 2, sm: 3 },
      }}
    >
      <Container maxWidth="md">
        {/* Premium Styled Container Card */}
        <Box
          sx={{
            background: isDark
              ? "rgba(15, 23, 42, 0.8)"
              : "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(16px)",
            borderRadius: "24px",
            padding: { xs: 3, sm: 5, md: 6 },
            border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(50, 68, 230, 0.08)"
              }`,
            boxShadow: isDark
              ? "0 20px 40px rgba(0, 0, 0, 0.3)"
              : "0 20px 40px rgba(50, 68, 230, 0.05)",
            transition: "all 0.3s ease",
          }}
        >
          {/* Header Section */}
          <Box sx={{ mb: 5 }}>
            <Typography
              variant="h1"
              sx={{
                color: isDark ? "#ffffff" : "#172b4d",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                fontWeight: 800,
                lineHeight: 1.2,
                mb: 1.5,
              }}
            >
              Website Terms of Use
            </Typography>

            {/* Decorative Divider */}
            <Box
              sx={{
                height: "4px",
                width: "60px",
                background: "linear-gradient(90deg, #3244e6 0%, #10b981 100%)",
                borderRadius: "2px",
              }}
            />
          </Box>

          {/* Section: Overview/Intro */}
          <Box sx={{ mb: 5 }}>
            <Typography
              sx={{
                color: isDark ? "#cbd5e1" : "#4a5568",
                fontFamily: "'Poppins', sans-serif",
                fontSize: { xs: "0.95rem", sm: "1rem" },
                fontWeight: 400,
                lineHeight: 1.8,
                mb: 2.5,
              }}
            >
              The F2 Fintech website located at{" "}
              <Link
                href="https://f2fintech.com"
                sx={{
                  color: "#3244e6",
                  fontWeight: 600,
                  textDecoration: "none",
                  borderBottom: "1px solid transparent",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    borderBottom: "1px solid #3244e6",
                  },
                }}
              >
                https://f2fintech.com
              </Link>{" "}
              is a copyrighted work belonging to F2 Fintech. Certain features of
              the Site may be subject to additional guidelines, terms, or rules,
              which will be posted on the Site in connection with such features.
            </Typography>
            <Typography
              sx={{
                color: isDark ? "#cbd5e1" : "#4a5568",
                fontFamily: "'Poppins', sans-serif",
                fontSize: { xs: "0.95rem", sm: "1rem" },
                fontWeight: 400,
                lineHeight: 1.8,
              }}
            >
              All such additional terms, guidelines, and rules are incorporated
              by reference into these Terms.
            </Typography>
          </Box>

          {/* Section: Terms of Use */}
          <Box sx={{ mb: 5 }}>
            <Typography
              variant="h2"
              sx={{
                color: isDark ? "#f1f5f9" : "#172b4d",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: { xs: "1.3rem", sm: "1.5rem" },
                fontWeight: 700,
                mb: 2.5,
                borderLeft: "4px solid #3244e6",
                pl: 2,
              }}
            >
              Terms of Use
            </Typography>
            <Typography
              sx={{
                color: isDark ? "#cbd5e1" : "#4a5568",
                fontFamily: "'Poppins', sans-serif",
                fontSize: { xs: "0.95rem", sm: "1rem" },
                fontWeight: 400,
                lineHeight: 1.8,
              }}
            >
              These Terms of Use described the legally binding terms and
              conditions that oversee your use of the Site. By logging into the
              site, you are being complaint that these terms and you represent
              that you have the authority and capacity to enter into these terms.
            </Typography>
          </Box>

          {/* Section: Access to the Site */}
          <Box sx={{ mb: 5 }}>
            <Typography
              variant="h2"
              sx={{
                color: isDark ? "#f1f5f9" : "#172b4d",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: { xs: "1.3rem", sm: "1.5rem" },
                fontWeight: 700,
                mb: 2.5,
                borderLeft: "4px solid #3244e6",
                pl: 2,
              }}
            >
              Access To This Site
            </Typography>
            <Typography
              sx={{
                color: isDark ? "#cbd5e1" : "#4a5568",
                fontFamily: "'Poppins', sans-serif",
                fontSize: { xs: "0.95rem", sm: "1rem" },
                fontWeight: 400,
                lineHeight: 1.8,
                mb: 2.5,
              }}
            >
              Subject to these Terms, Company grants you a non-transferable,
              non-exclusive, revocable, limited license to access the Site solely
              for your own personal, noncommercial use.
            </Typography>
            <Typography
              sx={{
                color: isDark ? "#cbd5e1" : "#4a5568",
                fontFamily: "'Poppins', sans-serif",
                fontSize: { xs: "0.95rem", sm: "1rem" },
                fontWeight: 400,
                lineHeight: 1.8,
                mb: 2.5,
              }}
            >
              <strong>Certain Restrictions.</strong> The rights approved to you in
              these Terms are subject to the following restrictions: (a) you
              shall not sell, rent, lease, transfer, assign, distribute, host, or
              otherwise commercially exploit the Site; (b) you shall not change,
              make derivative works of, disassemble, reverse compile or reverse
              engineer any part of the Site; (c) you shall not access the Site in
              order to build a similar or competitive website; and (d) except as
              expressly stated herein, no part of the Site may be copied,
              reproduced, distributed, republished, downloaded, displayed,
              posted or transmitted in any form or by any means unless otherwise
              indicated, any future release, update, or other addition to
              functionality of the Site shall be subject to these Terms. All
              copyright and other proprietary notices on the Site must be
              retained on all copies thereof.
            </Typography>
            <Typography
              sx={{
                color: isDark ? "#cbd5e1" : "#4a5568",
                fontFamily: "'Poppins', sans-serif",
                fontSize: { xs: "0.95rem", sm: "1rem" },
                fontWeight: 400,
                lineHeight: 1.8,
              }}
            >
              <strong>No Support or Maintenance.</strong> You agree that Company
              will have no obligation to provide you with any support in
              connection with the Site.
            </Typography>
          </Box>

          {/* Section: Contact Information */}
          <Box>
            <Typography
              variant="h2"
              sx={{
                color: isDark ? "#f1f5f9" : "#172b4d",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: { xs: "1.3rem", sm: "1.5rem" },
                fontWeight: 700,
                mb: 2.5,
                borderLeft: "4px solid #3244e6",
                pl: 2,
              }}
            >
              Contact Information
            </Typography>
            <Typography
              sx={{
                color: isDark ? "#cbd5e1" : "#4a5568",
                fontFamily: "'Poppins', sans-serif",
                fontSize: { xs: "0.95rem", sm: "1rem" },
                fontWeight: 400,
                lineHeight: 1.8,
                mb: 1.5,
              }}
            >
              <strong>Address:</strong> A-25, M-1 Arv Park, A-Block, Sector 63,
              Noida, Uttar Pradesh - 201301
            </Typography>
            <Typography
              sx={{
                color: isDark ? "#cbd5e1" : "#4a5568",
                fontFamily: "'Poppins', sans-serif",
                fontSize: { xs: "0.95rem", sm: "1rem" },
                fontWeight: 400,
                lineHeight: 1.8,
                mb: 1.5,
              }}
            >
              <strong>Email:</strong>{" "}
              <Link
                href="mailto:wecare@f2fintech.com"
                sx={{
                  color: "#3244e6",
                  fontWeight: 600,
                  textDecoration: "none",
                  borderBottom: "1px solid transparent",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    borderBottom: "1px solid #3244e6",
                  },
                }}
              >
                wecare@f2fintech.com
              </Link>
            </Typography>
            <Typography
              sx={{
                color: isDark ? "#cbd5e1" : "#4a5568",
                fontFamily: "'Poppins', sans-serif",
                fontSize: { xs: "0.95rem", sm: "1rem" },
                fontWeight: 400,
                lineHeight: 1.8,
              }}
            >
              <strong>Contact:</strong> +91 8810600135, +447547763696
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
