import { Box, Typography, Container, styled } from "@mui/material";
const Section = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 600,
  marginBottom: theme.spacing(1),
}));

const SectionContent = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "0.875rem",
  lineHeight: 1.6,
}));

export default function PrivacyPolicy() {
  return (
    <Container
      maxWidth="md"
      sx={{
        py: 4,
        border: "2px solid #333333",
        borderRadius: "20px",
      
      }}
    >
      <Section sx={{ borderBottom: "1px solid #333333" }}>
        <SectionTitle
          sx={{
            color: "#FFD700",
            fontFamily: "DM sans",
            fontSize: "2vw",
            fontWeight: "450",
          }}
          variant="h6"
        >
          Overview
        </SectionTitle>
        <SectionContent
          sx={{
            color: "white",
            fontFamily: "Poppins",
            fontSize: "1rem",
            fontWeight: "300",
          }}
        >
          This Privacy Policy explains how we collect, use, and protect your
          information when you use our service. By using our service, you agree
          to the terms outlined in this policy.
        </SectionContent>
      </Section>

      <Section sx={{ borderBottom: "1px solid #333333" }}>
        <SectionTitle
          sx={{
            color: "#FFD700",
            fontFamily: "DM sans",
            fontSize: "2vw",
            fontWeight: "450",
          }}
          variant="h6"
        >
          Types of Data Collected
        </SectionTitle>
        <SectionContent
          sx={{
            color: "white",
            fontFamily: "Poppins",
            fontSize: "1rem",
            fontWeight: "300",
          }}
        >
          We collect personal data such as email addresses, names, phone
          numbers, and address details, as well as usage data automatically when
          you use our service.
        </SectionContent>
      </Section>

      <Section sx={{ borderBottom: "1px solid #333333" }}>
        <SectionTitle
          sx={{
            color: "#FFD700",
            fontFamily: "DM sans",
            fontSize: "2vw",
            fontWeight: "450",
          }}
          variant="h6"
        >
          Use of Your Personal Data
        </SectionTitle>
        <SectionContent
          sx={{
            color: "white",
            fontFamily: "Poppins",
            fontSize: "1rem",
            fontWeight: "300",
          }}
        >
          We use your personal data for purposes such as providing and improving
          our service, managing your account, and contacting you. We may also
          use cookies and tracking technologies.
        </SectionContent>
      </Section>

      <Section sx={{ borderBottom: "1px solid #333333" }}>
        <SectionTitle
          sx={{
            color: "#FFD700",
            fontFamily: "DM sans",
            fontSize: "2vw",
            fontWeight: "450",
          }}
          variant="h6"
        >
          Sharing Your Information
        </SectionTitle>
        <SectionContent
          sx={{
            color: "white",
            fontFamily: "Poppins",
            fontSize: "1rem",
            fontWeight: "300",
          }}
        >
          We may share your information with service providers, affiliates,
          business partners, and other users as required for our service or with
          your consent.
        </SectionContent>
      </Section>

      <Section sx={{ borderBottom: "1px solid #333333" }}>
        <SectionTitle
          sx={{
            color: "#FFD700",
            fontFamily: "DM sans",
            fontSize: "2vw",
            fontWeight: "450",
          }}
          variant="h6"
        >
          Data Retention and Security
        </SectionTitle>
        <SectionContent
          sx={{
            color: "white",
            fontFamily: "Poppins",
            fontSize: "1rem",
            fontWeight: "300",
          }}
        >
          We retain your data as necessary and take reasonable security
          measures, although no method of data transmission is 100% secure.
        </SectionContent>
      </Section>

      <Section sx={{ borderBottom: "1px solid #333333" }}>
        <SectionTitle
          sx={{
            color: "#FFD700",
            fontFamily: "DM sans",
            fontSize: "2vw",
            fontWeight: "450",
          }}
          variant="h6"
        >
          Children's Privacy
        </SectionTitle>
        <SectionContent
          sx={{
            color: "white",
            fontFamily: "Poppins",
            fontSize: "1rem",
            fontWeight: "300",
          }}
        >
          Our service is not intended for children under 13, and we do not
          knowingly collect personal information.
        </SectionContent>
      </Section>

      <Section sx={{ borderBottom: "1px solid #333333" }}>
        <SectionTitle
          sx={{
            color: "#FFD700",
            fontFamily: "DM sans",
            fontSize: "2vw",
            fontWeight: "450",
          }}
          variant="h6"
        >
          Links to Other Websites
        </SectionTitle>
        <SectionContent
          sx={{
            color: "white",
            fontFamily: "Poppins",
            fontSize: "1rem",
            fontWeight: "300",
          }}
        >
          Our service may contain links to third party websites. We are not
          responsible for their content or privacy practices.
        </SectionContent>
      </Section>
    </Container>
  );
}
