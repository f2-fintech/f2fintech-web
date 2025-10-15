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
  const { formatNameDr } = Utility();

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
      maxWidth="lg"
      sx={{
        py: { xs: 0, md: 6 },
        px: { xs: 2, sm: 3 },
        position: "relative",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          textAlign: "center",
          mb: { xs: 4, md: 5 },
          "&:after": {
            content: '""',
            position: "absolute",
            top: 10,
            right: 1100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(50, 68, 230, 0.05)",
          },
        }}
      >
        <Typography
          fontWeight="700"
          fontFamily="Poppins"
          sx={{
            fontSize: {
              xs: "1.75rem",
              sm: "2.25rem",
              md: "2.75rem",
              xl: "3.25rem",
            },
            color: theme.palette.text.primary,
            mb: { xs: 2, md: 3 },
            lineHeight: 1.2,
          }}
        >
          <span
            style={{
              color: theme.palette.text.primary,
              fontFamily: "Urbanist",
            }}
          >
            Happy &{" "}
          </span>
          <span
            style={{
              background: "linear-gradient(135deg, #3244e6 0%, #5a67f2 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "Urbanist",
            }}
          >
            Satisfied Customers
          </span>
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
            fontWeight: 500,
            color: theme.palette.text.secondary,
            fontFamily: "Poppins",
            maxWidth: "600px",
            mx: "auto",
            lineHeight: 1.6,
          }}
        >
          Here is what some of our satisfied clients have to say about our work
        </Typography>
      </Box>

      {/* Carousel Section */}
      <Box sx={{ position: "relative", mb: 4 }}>
        <Carousel
          id="carousel-container"
          indicators={false}
          navButtonsAlwaysVisible={false}
          autoPlay={true}
          interval={5000}
          index={activeIndex}
          onChange={(index) => handleSlideChange(index)}
          sx={{
            fontFamily: "Poppins",
            "& .CarouselItem": {
              padding: { xs: "0 8px", sm: "0 16px" },
            },
          }}
        >
          {customerRatings.map((customer, i) => (
            <Grid
              container
              spacing={2}
              key={i}
              sx={{
                justifyContent: "center",
                px: { xs: 1, sm: 2 },
              }}
            >
              <Grid item xs={12} sm={10} md={8}>
                <Box
                  sx={{
                    position: "relative",
                    background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, rgba(50, 68, 230, 0.9) 100%)`,
                    borderRadius: "24px",
                    p: { xs: 3, sm: 4, md: 5 },
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    minHeight: { xs: "280px", sm: "300px", md: "320px" },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                      borderRadius: "24px",
                      pointerEvents: "none",
                    },
                  }}
                >
                  {/* Quote Icon */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: { xs: 16, md: 20 },
                      left: { xs: 16, md: 20 },
                      width: { xs: 32, md: 40 },
                      height: { xs: 32, md: 40 },
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: { xs: "1.2rem", md: "1.5rem" },
                      color: "rgba(255, 255, 255, 0.8)",
                    }}
                  >
                    ❝
                  </Box>

                  {/* Review Text */}
                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      pt: { xs: 4, md: 5 },
                      pb: { xs: 2, md: 3 },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                        fontWeight: 500,
                        color: theme.palette.whitetext?.white || "#ffffff",
                        fontFamily: "DM Sans",
                        lineHeight: 1.7,
                        textAlign: "center",
                        fontStyle: "italic",
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      {customer.review}
                    </Typography>
                  </Box>

                  {/* Customer Info */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 1,
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {/* Rating */}
                    <Rating
                      value={Number.parseInt(customer.rating) || 0}
                      readOnly
                      precision={0.5}
                      sx={{
                        mb: 1,
                        "& .MuiRating-iconFilled": {
                          color: "#fdb723",
                          filter:
                            "drop-shadow(0 2px 4px rgba(253, 183, 35, 0.3))",
                        },
                        "& .MuiRating-iconEmpty": {
                          color: "rgba(255, 255, 255, 0.3)",
                        },
                        "& .MuiRating-icon": {
                          fontSize: { xs: "1.4rem", sm: "1.6rem" },
                        },
                      }}
                    />

                    {/* Name */}
                    <Typography
                      sx={{
                        fontSize: { xs: "1.1rem", md: "1.25rem" },
                        fontWeight: 600,
                        color: "#fdb723",
                        fontFamily: "Poppins",
                        textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                      }}
                    >
                      { formatNameDr(customer.name)}
                    </Typography>

                    {/* City */}
                    {customer.city && (
                      <Typography
                        sx={{
                          fontSize: { xs: "0.9rem", md: "1rem" },
                          fontWeight: 400,
                          color: "rgba(255, 255, 255, 0.8)",
                          fontFamily: "Poppins",
                        }}
                      >
                        {capitalizeFirstLetter(customer.city)}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          ))}
        </Carousel>
      </Box>

      {/* Enhanced Dot Indicators */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
          mt: 3,
        }}
      >
        {customerRatings.map((_, index) => (
          <Box
            key={index}
            onClick={() => goToSlide(index)}
            sx={{
              width: activeIndex === index ? "32px" : "12px",
              height: "12px",
              borderRadius: "6px",
              backgroundColor:
                activeIndex === index ? "#3244e6" : "rgba(50, 68, 230, 0.3)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor:
                  activeIndex === index ? "#2c3ce3" : "rgba(50, 68, 230, 0.5)",
                transform: "scale(1.1)",
              },
            }}
          />
        ))}
      </Box>
    </Container>
  );
};

export default Customers;
