import { Box, Typography, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function PrivacyPolicy() {
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
              Privacy Policy
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

          {/* Section: Overview */}
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
              Overview
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
              This Privacy Policy explains how we collect, use, and protect your
              information when you use our service. By using our service, you agree
              to the terms outlined in this policy.
            </Typography>
          </Box>

          {/* Section: Types of Data Collected */}
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
              Types of Data Collected
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
              We collect personal data such as email addresses, names, phone
              numbers, and address details, as well as usage data automatically when
              you use our service.
            </Typography>
          </Box>

          {/* Section: Use of Your Personal Data */}
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
              Use of Your Personal Data
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
              We use your personal data for purposes such as providing and improving
              our service, managing your account, and contacting you. We may also
              use cookies and tracking technologies.
            </Typography>
          </Box>

          {/* Section: Sharing Your Information */}
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
              Sharing Your Information
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
              We may share your information with service providers, affiliates,
              business partners, and other users as required for our service or with
              your consent.
            </Typography>
          </Box>

          {/* Section: Data Retention and Security */}
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
              Data Retention and Security
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
              We retain your data as necessary and take reasonable security
              measures, although no method of data transmission is 100% secure.
            </Typography>
          </Box>

          {/* Section: Children's Privacy */}
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
              Children's Privacy
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
              Our service is not intended for children under 13, and we do not
              knowingly collect personal information.
            </Typography>
          </Box>

          {/* Section: Links to Other Websites */}
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
              Links to Other Websites
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
              Our service may contain links to third party websites. We are not
              responsible for their content or privacy practices.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
