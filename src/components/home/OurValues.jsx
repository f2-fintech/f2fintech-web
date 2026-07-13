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
              background: "linear-gradient(135deg, #1f1681ff 0%, #102e7aff 100%)",
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
          justifyContent: "center",
          alignItems: "center",
          gap: { xs: 4, sm: 4, md: 6 },
          width: "100%",
        }}
      >
        {awards.map((award, index) => (
          <Box key={index}>
            <Card
              sx={{
                height: "100%",
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
                  objectFit: "cover",
                  borderRadius: "15px",
                }}
              />
              <CardContent sx={{ flexGrow: 1, textAlign: "center", px: 2 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    color: "#3244e6",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: { xs: "3.5vw", sm: "3vw", md: "1.25vw" },
                    mb: 2,
                  }}
                >
                  {award.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.text.primary,
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: "500",
                    lineHeight: 1.6,
                    fontSize: { xs: "3vw", sm: "2.8vw", md: "1.1vw" },
                  }}
                >
                  {award.description}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
