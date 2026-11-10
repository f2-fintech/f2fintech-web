import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  useTheme,
} from "@mui/material";

const awards = [
  {
    title: "JoshTalk",
    image: "/joshtalk-mr-h.webp",
    description: "Featured on JoshTalk's Mr. Harpreet Singh, showcasing F2 Fintech's innovative journey and vision to democratize financial services across India.",
    objectFit: "cover",
    objectPosition: "top",
  },
  {
    title: "D-U-N-S® Registered™",
    image: "/D-U-N-S.webp",
    description: "Acquiring the D-U-N-S® Registered™ seal, validating our operational credentials and building global trust as a transparent fintech partner.",
    objectFit: "contain",
  },
  {
    title: "SHARK TANK INDIA Season - 05",
    image: "/shark-tank.webp",
    description: "Selected and featured in Shark Tank India Season 5, representing our vision to scale innovative fintech solutions and drive financial inclusion.",
  },
  {
    title: "G-20 University Connect Programme",
    image: "/G20.webp",
    description: "Actively engaging in the G-20 University Connect Programme to foster financial education, digital literacy, and economic empowerment among youth.",
  },
  {
    title: "Bajaj Finserv Award",
    image: "/awardceremony.webp",
    description: "Receiving the esteemed Bajaj Finserv Award marks a pinnacle moment in F2 Fintech's journey, reflecting our commitment.",
  },
  {
    title: "Entrepreneur of the Year",
    image: "/enterpreneur.webp",
    description: "October 15, 2022,honored with the prestigious 'Entrepreneur of the Year (Financial Service)' award at the MSME India Business Awards.",
  },
  {
    title: "MSME Award",
    image: "/msme11.webp",
    description: "Empowering F2 Fintech to innovate, bridging gap between financial services and cutting-edge technology, earning us the prestigious MSME Award.",
  },
  {
    title: "Certificate of Recognition",
    image: "/COR.webp",
    description: "Officially recognized as a startup by DPIIT, Department for Promotion of Industry and Internal Trade, Ministry of Commerce & Industry, Govt. of India.",
    objectFit: "contain",
  },
  {
    title: "Trademark Certificate",
    image: "/trademark-cer.webp",
    description: "Officially registered trademark certificate, securing F2 Fintech's brand identity and intellectual property rights under the Trade Marks Registry, Govt. of India.",
    objectFit: "contain",
  },
];

export default function OurValues() {
  const theme = useTheme();

  return (
    <Box sx={{ py: { xs: 4, md: 10 }, px: 2 }}>
      <Box sx={{ textAlign: "center", mb: { xs: 5, md: 7 } }}>
        <Chip
          label="OUR RECOGNITION"
          sx={{
            background: "rgba(50, 68, 230, 0.08)",
            color: "#3244e6",
            fontWeight: 700,
            fontSize: "0.85rem",
            borderRadius: "50px",
            mb: 2,
          }}
        />
        <Typography
          variant="h2"
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: { xs: "1.6rem", md: "3rem" },
            fontWeight: 650,
            lineHeight: 1.1,
            color: "#1e293b",
            mb: 2,
            letterSpacing: "-0.04em",
          }}
        >
          Recognition Across the {" "}
          <span
            style={{
              background: "linear-gradient(135deg, #384aff 0%, #384aff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
            }}
          >
            Industry
          </span>
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "column", md: "row" },
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "stretch",
          gap: { xs: 4, sm: 4, md: 6 },
          width: "100%",
        }}
      >
        {awards.map((award, index) => (
          <Card
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              boxShadow: "none",
              width: { xs: "92vw", sm: "85vw", md: "24vw" },
              alignItems: "center",
              position: "relative",
              overflow: "visible",
              backgroundColor: "#f0f4ff",
              borderRadius: "15px",
              p: 1,
              transition: { md: "transform 0.3s ease" },
              "&:hover": {
                transform: { md: "scale(1.15)" },
                zIndex: 10,
              },
            }}
          >
            <CardMedia
              component="img"
              image={award.image}
              alt={award.title}
              sx={{
                width: "100%",
                aspectRatio: "3/2",
                objectFit: award.objectFit || "cover",
                objectPosition: award.objectPosition || "center",
                borderRadius: "15px",
                backgroundColor: "#fff",
              }}
            />
            <CardContent
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                px: 2,
                width: "100%",
              }}
            >
              <Box
                sx={{
                  minHeight: { xs: "auto", md: "3.2rem" },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 1.5,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#3244e6",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: { xs: "3.5vw", sm: "3vw", md: "1.25vw" },
                    lineHeight: 1.25,
                  }}
                >
                  {award.title}
                </Typography>
              </Box>
              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.text.primary,
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: "500",
                  lineHeight: 1.6,
                  fontSize: { xs: "3vw", sm: "2.8vw", md: "1.1vw" },
                  minHeight: { xs: "auto", md: "5.5rem" },
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                }}
              >
                {award.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
