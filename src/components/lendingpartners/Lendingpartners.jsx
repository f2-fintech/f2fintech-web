import Slider from "react-slick";
import { Box, createTheme, Typography, useTheme } from "@mui/material";
import { lendingpartnerData } from "../data/Data.jsx";
import "@fontsource/urbanist/600.css";

const theme = createTheme({
  typography: {
    fontFamily:
      '"Urbanist", "Roboto", "Helvetica", "Arial", sans-serif, system-ui',
  },
});

export default function LendingPartners() {
  const theme = useTheme();

  // Common settings for both desktop and mobile
  const baseSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 10000,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: false,
  };

  // Desktop settings (unchanged from your original)
  const desktopSettings = {
    ...baseSettings,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: "unslick",
      },
    ],
  };

  // Mobile settings (new design)
  const mobileSettings = {
    ...baseSettings,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    rtl: false,
    speed: 5000,
  };

  return (
    <Box
      sx={{
        width: "100%",
        paddingBottom: "25px",

        mt: 3,
        height: {
          xs: "60vh",
          sm: "50vh",
          md: "79vh",
          xl: "90vh",
          "@media (max-width: 375px)": {
            height: "80vh",
          },
          "@media (max-width: 414px)": {
            // Samsung S8+ width tak apply hoga
            height: "75vh",
          },
        },
      }}
    >
      <Typography
        fontWeight="bold"
        fontFamily="Poppins"
        textAlign="center"
        sx={{
          fontSize: {
            xs: "1.5rem",
            sm: "2rem",
            md: "2.3rem",
            lg: "2.5rem",
            xl: "3rem",
          },
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          color: theme.palette.text.primary,
          paddingBottom: {
            xs: "2rem",
            sm: "5rem",
          },
          px: 2,
        }}
      >
        {"Official Lending"}
        <span
          style={{
            background: "#3244e6",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginLeft: "0.8rem",
          }}
        >
          Partners
        </span>
      </Typography>

      {/* Desktop Version (unchanged) */}
      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <Slider {...desktopSettings}>
          {lendingpartnerData.map((lending, index) => (
            <DesktopPartnerCard key={index} lending={lending} />
          ))}
        </Slider>
        <Slider {...{ ...desktopSettings, rtl: true }}>
          {lendingpartnerData.map((lending, index) => (
            <DesktopPartnerCard
              key={index}
              lending={lending}
              marginTop="40px"
            />
          ))}
        </Slider>
      </Box>

      {/* Mobile Version (new design) */}
      <Box
        sx={{
          display: { xs: "block", sm: "none" },
          height: "60vh",
        }}
      >
        <Slider {...mobileSettings}>
          {lendingpartnerData.map((lending, index) => (
            <MobilePartnerCard key={index} lending={lending} />
          ))}
        </Slider>
      </Box>
    </Box>
  );
}

// Extracted desktop card component
function DesktopPartnerCard({ lending, marginTop = "0px" }) {
  return (
    <Box
      sx={{
        height: "auto",
        width: "auto!important",
        display: "block!important",
        borderRadius: "20px",
        margin: "0 10px",
        marginTop,
        backgroundColor: "#2c3ce3",
        padding: "2px",
        justifyContent: "center",
        ":hover": {
          transform: "scale(.99)",
          transition: "all 300ms ease-in-out",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        <Box
          height={{ xs: "10vh", md: "20vh", sm: "15vh" }}
          sx={{
            background: "white",
            borderRadius: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={lending.src}
            alt={lending.alt}
            style={{
              height: "7vh",
              width: "auto",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

// New mobile card component
function MobilePartnerCard({ lending }) {
  return (
    <Box
      sx={{
        height: "120px",
        width: "90%!important",
        margin: "10px auto",
        borderRadius: "15px",
        backgroundColor: "#2c3ce3",
        padding: "2px",
        display: "flex!important",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          background: "white",
          borderRadius: "14px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <img
          src={lending.src}
          alt={lending.alt}
          style={{
            height: "50px",
            width: "auto",
            maxWidth: "100%",
          }}
        />
      </Box>
    </Box>
  );
}
