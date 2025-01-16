import { Box, Typography, Container, Link, styled } from "@mui/material";

const Section = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  color: "#0000CD", // Royal blue color matching the image
  fontWeight: 500,
  marginBottom: theme.spacing(2),
  fontSize: "1.25rem",
}));

const SectionContent = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: "0.875rem",
  lineHeight: 1.6,
  marginBottom: theme.spacing(2),
}));

export default function TermsOfUse() {
  return (
    <Container maxWidth="md" sx={{ py: 4, border:'1px solid #333333', borderRadius:'20px' }}>
      <Section>
        <Typography
          sx={{
            color: "#50C878",
            fontFamily: "DM sans",
            fontSize: "2vw",
            fontWeight: "450",
            borderBottom:'1px solid #333333',
            width:'38%'
          }}
          variant="h4"
          gutterBottom
        >
          Website Terms of Use
        </Typography>
        <Typography variant="body2" gutterBottom>
          Version 1.0
        </Typography>
        <SectionContent     sx={{
            color: "white",
            fontFamily: "Poppins",
            fontSize: "1rem",
            fontWeight: "300",
          }}>
          The f2fintech website located at {" "}
          <Link href="https://f2fintech.com">https://f2fintech.com</Link> is a
          copyrighted work belonging to F2 Fintech. Certain features of the Site
          may be subject to additional guidelines, terms, or rules, which will
          be posted on the Site in connection with such features.
        </SectionContent>
        <SectionContent>
          All such additional terms, guidelines, and rules are incorporated by
          reference into these Terms.
        </SectionContent>
      </Section>

      <Section>
        <SectionTitle
          sx={{
            color: "#50C878",
            fontFamily: "DM sans",
            fontSize: "2vw",
            fontWeight: "450",
             borderBottom:'1px solid #333333',
            width:'23%',

          }}
        >
          Terms of Use
        </SectionTitle>
        <SectionContent     sx={{
            color: "white",
            fontFamily: "Poppins",
            fontSize: "1rem",
            fontWeight: "300",
            
          }}>
          These Terms of Use described the legally binding terms and conditions
          that oversee your use of the Site. By logging into the site, you are
          being complaint that these terms and you represent that you have the
          authority and capacity to enter into these terms.
        </SectionContent>
      </Section>

      <Section>
        <SectionTitle
          sx={{
            color: "#50C878",
            fontFamily: "DM sans",
            fontSize: "2vw",
            fontWeight: "450",
             borderBottom:'1px solid #333333',
            width:'35%',
          }}
        >
          Access To This Site
        </SectionTitle>
        <SectionContent     sx={{
            color: "white",
            fontFamily: "Poppins",
            fontSize: "1rem",
            fontWeight: "300",
          }}>
          Subject to these Terms, Company grants you a non-transferable,
          non-exclusive, revocable, limited license to access the Site solely
          for your own personal, noncommercial use.
        </SectionContent>
        <SectionContent     sx={{
            color: "white",
            fontFamily: "Poppins",
            fontSize: "1rem",
            fontWeight: "300",
          }}>
          Certain Restrictions. The rights approved to you in these Terms are
          subject to the following restrictions: (a) you shall not sell, rent,
          lease, transfer, assign, distribute, host, or otherwise commercially
          exploit the Site; (b) you shall not change, make derivative works of,
          disassemble, reverse compile or reverse engineer any part of the Site;
          (c) you shall not access the Site in order to build a similar or
          competitive website; and (d) except as expressly stated herein, no
          part of the Site may be copied, reproduced, distributed, republished,
          downloaded, displayed, posted or transmitted in any form or by any
          means unless otherwise indicated, any future release, update, or other
          addition to functionality of the Site shall be subject to these Terms.
          All copyright and other proprietary notices on the Site must be
          retained on all copies thereof.
        </SectionContent>
        <SectionContent     sx={{
            color: "white",
            fontFamily: "Poppins",
            fontSize: "1rem",
            fontWeight: "300",
          }}>
          No Support or Maintenance. You agree that Company will have no
          obligation to provide you with any support in connection with the
          Site.
        </SectionContent>
      </Section>

      <Section>
        <SectionTitle
          sx={{
            color: "#50C878",
            fontFamily: "DM sans",
            fontSize: "2vw",
            fontWeight: "450",
             borderBottom:'1px solid #333333',
            width:'35%',
          }}
        >
          Contact Information
        </SectionTitle>
        <SectionContent     sx={{
            color: "white",
            fontFamily: "Poppins",
            fontSize: "1rem",
            fontWeight: "300",
          }}>
          Address: A-25, M-1 Arv Park, A-Block, Sector 63, Noida Uttar Pradesh
          -201301
        </SectionContent>
        <SectionContent>
          Email:
          <Link href="mailto:wecare@f2fintech.com">wecare@f2fintech.com</Link>
        </SectionContent>
        <SectionContent     sx={{
            color: "white",
            fontFamily: "Poppins",
            fontSize: "1rem",
            fontWeight: "300",
          }}>Contact: +91 8810600135, +447547763696</SectionContent>
      </Section>
    </Container>
  );
}
