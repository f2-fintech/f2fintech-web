import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Advantages({ advantagesData }) {
  const theme = useTheme();
  const isIpadPro = useMediaQuery(
    "only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (-webkit-min-device-pixel-ratio: 2)"
  );
  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        sx={{
          background: "#3244e6",
          height: {
            xs: "65vh",
            sm: "35vh",
            md: isIpadPro ? "45vh" : "70vh", // Reduced for iPad Pro
          },
          maxWidth: "100% !important",
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: {
            xs: "1rem",
            sm: "2rem",
            md: isIpadPro ? "2rem" : "3rem", // Adjusted for iPad Pro
          },
        }}
      >
        <Box
          sx={{
            padding: {
              xs: "10px",
              sm: "20px",
              md: isIpadPro ? "20px" : "30px", // Adjusted for iPad Pro
            },
            display: "flex",
            flexDirection: {
              xs: "column",
              md: isIpadPro ? "column" : "row", // Keep column on iPad Pro
              sm: "row",
            },
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              variant="h3"
              sx={{
                lineHeight: {
                  xs: "2rem",
                  sm: "3rem",
                  md: isIpadPro ? "3rem" : "4rem", // Reduced for iPad Pro
                },
                fontSize: {
                  xs: "6vw",
                  sm: "4vw",
                  md: isIpadPro ? "3.5vw" : "3vw", // Adjusted for iPad Pro
                },
                fontWeight: "700",
                fontFamily: "DM sans",
                color: theme.palette.whitetext.white,
              }}
            >
              Why F2 Fintech?
            </Typography>
          </Box>

          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: {
                xs: "center",
                md: isIpadPro ? "center" : "space-around", // Center on iPad Pro
              },
              alignItems: "center",
              rowSpacing: {
                xs: 2,
                sm: 3,
                md: isIpadPro ? 2 : 3, // Reduced spacing for iPad Pro
              },
              columnSpacing: {
                xs: 1,
                sm: 2,
                md: isIpadPro ? 2 : 3, // Reduced spacing for iPad Pro
              },
            }}
          >
            {advantagesData.map((advantage, index) => (
              <Grid item xs={12} sm={6} md={isIpadPro ? 6 : 4} key={index}>
                {" "}
                {/* 2 columns on iPad Pro */}
                <Item
                  sx={{
                    backgroundColor: "transparent",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    boxShadow: "none",
                    [`@media (hover: hover)`]: {
                      "&:hover": {
                        transform: "scale(1.1)",
                        transition: "all 300ms ease-in-out",
                      },
                    },
                  }}
                >
                  <Box
                    sx={{
                      height: {
                        xs: "50px",
                        sm: "55px",
                        md: isIpadPro ? "65px" : "80px", // Reduced for iPad Pro
                      },
                      width: {
                        xs: "50px",
                        sm: "55px",
                        md: isIpadPro ? "65px" : "80px", // Reduced for iPad Pro
                      },
                      borderRadius: "18px",
                      backgroundColor: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: theme.palette.secondary.main,
                    }}
                  >
                    {advantage.logo}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "10px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: {
                          xs: "3.5vw",
                          sm: "1.9vw",
                          md: isIpadPro ? "1.8vw" : "1.3vw", // Adjusted for iPad Pro
                        },
                        lineHeight: {
                          xs: "1.5rem",
                          md: isIpadPro ? "1.8rem" : "2rem", // Reduced for iPad Pro
                        },
                        color: theme.palette.whitetext.white,
                        fontWeight: "300",
                        fontFamily: "Poppins",
                        maxWidth: "400px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {advantage.title}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: {
                          xs: "0.7rem",
                          sm: "0.8rem",
                          md: isIpadPro ? "0.85rem" : "0.9rem", // Adjusted for iPad Pro
                        },
                        lineHeight: "1rem",
                        color: "white",
                        fontFamily: "Poppins",
                        fontWeight: "300",
                      }}
                    >
                      {/* {advantage.subtitle} */}
                    </Typography>
                  </Box>
                </Item>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
}

// PropTypes definition for Advantages component
Advantages.propTypes = {
  advantagesData: PropTypes.arrayOf(
    PropTypes.shape({
      logo: PropTypes.node,
      title: PropTypes.string,
      subtitle: PropTypes.string,
    })
  ).isRequired,
};
