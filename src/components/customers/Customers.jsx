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
          lineHeight: "3rem",
          fontSize: "2.5rem",
          fontWeight: "500",
          marginTop: "50px",
          marginBottom: "20px",
        }}
      >
        <span
          style={{
            color: "#ffffff",
            fontFamily: "DM sans",
            fontSize: "2rem",
            marginRight: ".8rem",
            fontWeight: "500",
          }}
        >
          Happy &
        </span>
        <span
          style={{
            marginLeft: "8px",
            fontFamily: "DM sans",
            fontSize: "2rem",
            color: "#50C878",
            fontWeight: 500,
          }}
        >
          Satisfied Customers
        </span>
      </Typography>

      <Typography
        variant="h1"
        sx={{
          display: "flex",
          justifyContent: "center",
          lineHeight: "3rem",
          fontSize: "1.2rem",
          fontWeight: "550",
          marginBottom: "40px",
          fontFamily: "Poppins",
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
                  background: "#ffffff",
                  border: "1px solid yellow",
                  fontFamily: "Poppins",
                  backgroundColor: "#000000",
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    wordWrap: "break-word",
                    lineHeight: "2rem",
                    textAlign: "center",
                    marginTop: "10px",
                    fontSize: "1.3rem",
                    fontFamily: "Poppins",
                    color: "white",
                    letterSpacing: "1",
                  }}
                >
                  ❝ {customer.review} ❞
                </Typography>
                <Typography
                  sx={{
                    color: "#FFD700",
                    fontSize: "1.2rem",
                    fontWeight: "600",
                    marginTop: "20px",
                    textAlign: "center",
                    fontFamily: "Poppins",
                  }}
                >
                  {capitalizeFirstLetter(customer.name)}
                </Typography>
                <Typography
                  sx={{
                    color: "#F3F4F6",
                    fontSize: "1rem",
                    fontWeight: "500",
                    marginTop: "10px",
                    textAlign: "center",
                    fontFamily: "Poppins",
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
              backgroundColor: activeIndex === index ? "#FFD700" : "#ccc",
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
