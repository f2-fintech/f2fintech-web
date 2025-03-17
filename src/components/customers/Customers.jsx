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
  const theme =  useTheme();
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
        variant="h1"
        sx={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          flexDirection: { xs: "column", md: "row" }, // Column for mobile, row for desktop
          lineHeight: "3rem",
          fontSize: { xs: "1.8rem", sm: "2rem", md: "2.50rem" }, // Responsive font size
          fontWeight: { xs: "500",},
          color: theme.palette.text.primary,
          marginTop: { xs: "20px", sm: "30px", md: "50px" },
          marginBottom: { xs: "10px", sm: "15px", md: "20px" },
        }}
      >
        <span
          style={{
            color: theme.palette.text.primary,
            fontFamily: "Urbanist",
            fontSize: "2.50rem",
            marginRight: ".8rem",
          }}
        >
          Happy &
        </span>
        <span
          style={{
            background: 'linear-gradient(90deg, #7C3AED 0%, #9F7AEA 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontFamily: "Urbanist",
            fontSize: "2.50rem",
            marginLeft: { md: "8px" }, // Add spacing only for desktop
          }}
        >
          Satisfied Customers
        </span>
      </Typography>

      <Typography
        variant="h1"
        fontWeight={{ xs: "390", md: "550", xl: "620" }}
        sx={{
          display: "flex",
          justifyContent: "center",
          lineHeight: "3rem",
          fontSize: "1.2rem",
          marginBottom: "40px",
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
              padding: "20px",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            <Grid item xs={12}>
              <Box
                sx={{
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                  borderRadius: "15px",
                  // background: "#ffffff",
                  backgroundColor: theme.palette.secondary.main,
                  border: ".0005rem solid #2c3ce3 ",
                  fontFamily: "Poppins",
                }}
              >
                <Typography
                  variant="h1"
                  fontWeight={{ xs: "390", md: "500", xl: "600" }}
                  sx={{
                    wordWrap: "break-word",
                    lineHeight: "2rem",
                    textAlign: "center",
                    marginTop: "10px",
                    paddingRight:'80px',
                    paddingLeft:'80px',
                    fontSize: "1.2rem",
                    fontFamily: "DM sans",
                    color: theme.palette.whitetext.white,
                  }}
                >
                  ❝ {customer.review} ❞
                </Typography>
                <Typography
                  variant="h1"
                  fontWeight={{ xs: "390", md: "500", xl: "600" }}
                  sx={{
                    color: '#ffd700',
                    fontSize: "1.2rem",
                    marginTop: "20px",
                    textAlign: "center",
                    fontFamily: "Poppins",
                  }}
                >
                  {capitalizeFirstLetter(customer.name)}
                </Typography>
                <Typography
                  sx={{
                    color: theme.palette.whitetext.white,
                    fontSize: "1rem",
                    fontWeight: "500",
                    marginTop: "10px",
                    textAlign: "center",
                    fontFamily: "Poppins",
                  }}
                >
                  {customer.city && capitalizeFirstLetter(customer.city)}
                </Typography>
                <Rating
                  value={parseInt(customer.rating) || 0}
                  readOnly
                  precision={0.5}
                  // highlightSelectedOnly
                  sx={{
                    marginTop: "10px",
                    display: "flex",
                    justifyContent: "center",
                    "& .MuiRating-iconEmpty": {
                      color: theme.palette.text.primary,
                    },
                  }}
                />
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
