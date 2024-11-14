import { useEffect, useState } from "react";
import { Container, Typography, Grid, Box, Rating } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import API from "../../apis";
import { Utility } from "../utility";

const Customers = () => {
  const [customerRatings, setCustomerRatings] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const { capitalizeFirstLetter } = Utility();

  useEffect(() => {
    // Fetching ratings using the API
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
          lineHeight: "3rem",
          fontSize: "2.5rem",
          fontWeight: "500",
          marginTop: "50px",
          marginBottom: "20px",
        }}
      >
        <span style={{ color: "#000000" }}>Happy &</span>
        <span style={{ color: "#000066", marginLeft: "8px" }}>
          Satisfied Faces
        </span>
      </Typography>

      <Typography
        variant="h1"
        sx={{
          display: "flex",
          justifyContent: "center",
          lineHeight: "3rem",
          fontSize: "1.2rem",
          fontWeight: "300",
          marginBottom: "40px",
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
      >
        {customerRatings.length > 0 &&
          customerRatings.map((customer, i) => (
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
                    background: "#ffffff",
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <Typography
                    variant="h2"
                    sx={{
                      wordWrap: "break-word",
                      lineHeight: "2rem",
                      textAlign: "center",
                      marginTop: "10px",
                      fontSize: "1.2rem",
                      fontStyle: "sans-serif",
                      color: "#07399f",
                    }}
                  >
                    ❝ {customer.review} ❞
                  </Typography>
                  <Typography
                    sx={{
                      color: "#07399f",
                      fontSize: "1.2rem",
                      fontWeight: "600",
                      marginTop: "20px",
                      textAlign: "center",
                    }}
                  >
                    {capitalizeFirstLetter(customer.name)}
                  </Typography>
                  <Typography
                    sx={{
                      color: "gray",
                      fontSize: "1rem",
                      fontWeight: "500",
                      marginTop: "10px",
                      textAlign: "center",
                    }}
                  >
                    {capitalizeFirstLetter(customer.city)}
                  </Typography>
                  <Rating
                    value={customer.rating || 0}
                    readOnly
                    precision={0.5}
                    sx={{
                      marginTop: "10px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          ))}
      </Carousel>

      {/* Custom Dot Indicators */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        {customerRatings.map((_, index) => (
          <Box
            key={index}
            onClick={() => goToSlide(index)} // On click, go to the selected slide
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: activeIndex === index ? "#07399f" : "#ccc",
              margin: "0 5px",
              transition: "background-color 0.3s",
              cursor: "pointer",
            }}
          />
        ))}
      </Box>
    </Container>
  );
};

export default Customers;
