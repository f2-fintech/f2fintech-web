import Slider from "react-slick";
import { Box, createTheme, Typography, useTheme } from "@mui/material";
import { lendingpartnerData } from "../data/Data.jsx";
import "@fontsource/urbanist/600.css"; // Black

const theme = createTheme({
  typography: {
    fontFamily:
      '"Urbanist", "Roboto", "Helvetica", "Arial", sans-serif, system-ui',
  },
});
export default function LendingPartners() {
  
  const theme = useTheme();
    const settings = {
    dots: false, // No dots for navigation
    arrows: false, // No arrows for navigation
    infinite: true, // Infinite loop
    speed: 10000, // Slow down the speed for continuous scrolling (10 seconds for a full scroll)
    slidesToShow: 4, // Number of slides visible at once
    slidesToScroll: 1, // Number of slides to scroll at once
    autoplay: true, // Autoplay to enable scrolling
    autoplaySpeed: 0, // Disable any delay between slides, making it continuous
    cssEase: "linear", // Linear easing for constant scrolling speed
    pauseOnHover: false, // No pausing on hover for continuous scroll
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const setting = {
    dots: false, 
    arrows: false, 
    infinite: true, 
    speed: 10000, 
    slidesToShow: 4, 
    slidesToScroll: 1, 
    autoplay: true, 
    autoplaySpeed: 0, 
    cssEase: "linear", 
    pauseOnHover: false, 
    rtl: true, // This makes the slider move from left to right
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          rtl: true, // Apply the same setting in responsive mode
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rtl: true, 
        },
      },
    ],
};


  return (
    <Box
      sx={{
        width: "100%",
        paddingBottom: "25px",
        mt: 3,
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: "1.8rem", sm: "2rem", md: "2.50rem" }, // Responsive font size
          fontWeight:{xs:'500',},
          fontFamily: "Urbanist",
          display:'flex',
          justifyContent:'center',
          color: theme.palette.text.primary,
          paddingBottom:'2rem'
        }}
      >
        {"Official Lending"}
        <span style={{     background: 'linear-gradient(90deg, #7C3AED 0%, #9F7AEA 100%)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent', marginLeft: ".8rem" }}> Partners</span>
      </Typography>
      <Slider {...settings}>
        {lendingpartnerData.map((lending, index) => (
          <Box
            key={index}
            sx={{
              height: "auto",
              width: "auto!important",
              display: "block!important",
              borderRadius: "20px",
              margin: "0 10px",
              backgroundColor: "#2c3ce3",
              padding: "2px",
              justifyContent: "center",
              // boxShadow:
              //   "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
              ":hover": {
                transform: "scale(.99)",
                // background: "",
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
                height={{ xs: "10vh", md: "20vh" }}
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
                  style={{
                    height: "7vh",
                    width: "auto",
                  }}
                />
              </Box>
            </Box>
          </Box>
        ))}
      </Slider>
      <Slider {...setting}>
        {lendingpartnerData.map((lending, index) => (
          <Box
            key={index}
            sx={{
              height: "auto",
              width: "auto!important",
              display: "block!important",
              borderRadius: "20px",
              margin: "0 10px",
              marginTop:'70px',
              backgroundColor: "#2c3ce3",
              padding: "2px",
              justifyContent: "center",
              // boxShadow:
              //   "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
              ":hover": {
                transform: "scale(.99)",
                // background: "",
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
                height={{ xs: "10vh", md: "20vh" }}
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
                  style={{
                    height: "7vh",
                    width: "auto",
                  }}
                />
              </Box>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
