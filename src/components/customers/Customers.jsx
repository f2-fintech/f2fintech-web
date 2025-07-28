import { useEffect, useState } from "react";
import { Container, Typography, Grid, Box, Rating } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import API from "../../apis";
import { Utility } from "../utility";
import { createTheme, useTheme } from "@mui/material/styles";
import "@fontsource/urbanist/600.css"; // Black

const theme = createTheme({
  typography: {
    fontFamily:
      '"Urbanist", "Roboto", "Helvetica", "Arial", sans-serif, system-ui',
  },
});
const Customers = () => {
  const [customerRatings, setCustomerRatings] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const theme = useTheme();
  const { capitalizeFirstLetter } = Utility();

  useEffect(() => {
    API.RatingRevAPI.getRating()
      .then((res) => {
        if (res && res.data && res.data.data && res.data.data.reviews) {
          const ratingData = res.data.data.reviews;

          const profilePromises = ratingData.map((cust) =>
            API.CustomerAPI.getCustomerProfile(cust.id)
              .then((profile) => ({
                ...cust,
                profile: profile.data.data.customer,
              }))
              .catch((profileErr) => {
                console.error("Profile error", profileErr);
                return { ...cust, profile: null };
              })
          );

          Promise.all(profilePromises)
            .then((ratingsWithProfiles) => {
              setCustomerRatings(ratingsWithProfiles);
            })
            .catch((err) => {
              console.error("Error in processing profiles", err);
            });
        }
      })
      .catch((err) => {
        console.error("Error fetching ratings:", err);
      });
  }, []);

  const handleSlideChange = (index) => {
    setActiveIndex(index);
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
    document.getElementById("carousel-container").click();
  };

  if (!customerRatings.length) {
    return null;
  }

  return (
    <Container
      maxWidth="false"
      sx={{
        width: "80%",
      }}
    >
      <Typography
        fontWeight="bold"
        fontFamily="Poppins"
        sx={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          flexDirection: { xs: "column", md: "row" },
          lineHeight: "3rem",
          fontSize: {
            xs: "2rem",
            sm: "2.3rem",
            md: "2.5rem",
            xl: "3rem",
          },
          color: theme.palette.text.primary,
          marginTop: { xs: "15px", sm: "20px", md: "50px" },
          marginBottom: { xs: "10px", sm: "15px", md: "20px" },
        }}
      >
        <span
          style={{
            color: theme.palette.text.primary,
            fontFamily: "Urbanist",
            marginRight: ".8rem",
          }}
        >
          Happy &
        </span>
        <span
          style={{
            background: "#3244e6",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: "Urbanist",
            marginLeft: { md: "8px" }, // Add spacing for desktop only
          }}
        >
          Satisfied Customers
        </span>
      </Typography>

      <Typography
        fontWeight={{ xs: "390", sm: "500", md: "550", xl: "620" }}
        sx={{
          display: "flex",
          justifyContent: "center",
          lineHeight: "2rem", // Line height adjusted for better mobile readability
          fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" }, // Font size for mobile devices
          marginBottom: { xs: "20px", sm: "25px", md: "40px" }, // Adjust bottom margin for mobile and tablet
          fontFamily: "Poppins",
          textAlign: "center",
        }}
      >
        Here is what some of our satisfied clients have to say about our work
      </Typography>

      <Carousel
        id="carousel-container"
        indicators={false}
        navButtonsAlwaysVisible={false}
        autoPlay={true}
        interval={5000}
        index={activeIndex}
        onChange={(index) => handleSlideChange(index)}
        sx={{ fontFamily: "Poppins" }}
      >
        {customerRatings.map((customer, i) => (
          <Grid
            container
            spacing={2}
            key={i}
            sx={{
              textAlign: "center",
              alignItems: "center",
            }}
          >
            <Grid item xs={12}>
              <Box
                sx={{
                  padding: { xs: "12px", md: "20px" },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  borderRadius: "15px",
                  border: "1px solid transparent", // Removed red border for production
                  backgroundColor: theme.palette.secondary.main,
                  fontFamily: "Poppins",
                  minHeight: { xs: "200px", sm: "220px", md: "260px" }, // Minimum heights
                  maxHeight: { xs: "400px", sm: "380px", md: "500px" }, // Maximum heights
                  height: "auto", // Auto-adjust between min and max
                  width: "100%",
                  boxSizing: "border-box",
                  overflow: "hidden", // Prevents content from breaking out
                  transition: "all 0.3s ease", // Smooth resizing
                }}
              >
                {/* Review Text with Scroll for very long content */}
                <Box
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: "100%",
                    maxHeight: { xs: "180px", sm: "160px", md: "220px" },
                    overflowY: "auto", // Adds scroll if content is too long
                    paddingRight: "5px", // Prevents scrollbar overlap
                    "&::-webkit-scrollbar": {
                      width: "4px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: theme.palette.whitetext.white,
                      borderRadius: "2px",
                    },
                  }}
                >
                  <Typography
                    fontWeight={{ xs: 390, md: 500, xl: 600 }}
                    sx={{
                      wordWrap: "break-word",
                      lineHeight: "1.6rem",
                      textAlign: "center",
                      padding: { xs: "0 10px", md: "0 20px" },
                      fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                      fontFamily: "DM Sans",
                      color: theme.palette.whitetext.white,
                    }}
                  >
                    ❝ {customer.review} ❞
                  </Typography>
                </Box>

                {/* Customer Info Section */}
                <Box
                  sx={{
                    width: "100%",
                    marginTop: { xs: "10px", md: "15px" },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    fontWeight={{ xs: 390, md: 500, xl: 600 }}
                    sx={{
                      color: "#fdb723",
                      fontSize: { xs: "1.1rem", md: "1.2rem" },
                      textAlign: "center",
                      fontFamily: "Poppins",
                      lineHeight: 1.2,
                    }}
                  >
                    {capitalizeFirstLetter(customer.name)}
                  </Typography>

                  {customer.city && (
                    <Typography
                      sx={{
                        color: theme.palette.whitetext.white,
                        fontSize: { xs: "0.9rem", md: "1rem" },
                        fontWeight: 500,
                        marginTop: { xs: "4px", md: "6px" },
                        textAlign: "center",
                        fontFamily: "Poppins",
                      }}
                    >
                      {capitalizeFirstLetter(customer.city)}
                    </Typography>
                  )}

                  <Rating
                    value={parseInt(customer.rating) || 0}
                    readOnly
                    precision={0.5}
                    sx={{
                      marginTop: { xs: "8px", md: "12px" },
                      "& .MuiRating-iconFilled": {
                        color: "#fdb723",
                      },
                      "& .MuiRating-iconEmpty": {
                        color: theme.palette.text.primary,
                      },
                      "& .MuiRating-icon": {
                        fontSize: { xs: "1.8rem", sm: "2rem" },
                      },
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        ))}
      </Carousel>

      {/* Custom Dot Indicators */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 3,
          fontFamily: "Poppins", // Replace with your desired font
        }}
      >
        {customerRatings.map((_, index) => (
          <Box
            key={index}
            onClick={() => goToSlide(index)}
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: activeIndex === index ? "#2c3ce3" : "#000",
              margin: "0 5px",
              cursor: "pointer",
            }}
          />
        ))}
      </Box>
    </Container>
  );
};

export default Customers;
