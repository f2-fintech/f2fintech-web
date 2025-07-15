import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Grid, Typography } from "@mui/material";
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
  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        sx={{
          // backgroundImage: "url(/caltheme5.png)",
          background: "#3244e6",
          height: { xs: "65vh", sm: "35vh", md: "70vh" }, // Responsive height
          maxWidth: "100% !important",
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          backgroundSize: "cover",
          backgroundPosition: "center",
          // mb: 8,

          padding: { xs: "1rem", sm: "2rem", md: "3rem" }, // Add padding for smaller screens
        }}
      >
        <Box
          sx={{
            padding: { xs: "10px", sm: "20px", md: "30px" }, // Responsive padding
            display: "flex",

            flexDirection: { xs: "column", md: "row", sm: "row" }, // Vertical on mobile, horizontal on desktop

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              variant="h3"
              sx={{
                lineHeight: { xs: "2rem", sm: "3rem", md: "4rem" }, // Responsive line height
                fontSize: { xs: "6vw", sm: "4vw", md: "3vw" }, // Responsive font size
                fontWeight: "700",
                fontFamily: "DM sans",
                color: theme.palette.whitetext.white,
              }}
            >
              Why F2Fintech?
            </Typography>
          </Box>

          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "space-around" }, // Center content on mobile
              alignItems: "center",
              rowSpacing: { xs: 2, sm: 3 }, // Adjust row spacing for smaller screens
              columnSpacing: { xs: 1, sm: 2, md: 3 },
            }}
          >
            {advantagesData.map((advantage, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
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
                      height: { xs: "50px", sm: "55px", md: "80px" }, // Responsive icon height
                      width: { xs: "50px", sm: "55px", md: "80px" }, // Responsive icon width
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
                      marginLeft: "10px", // Consistent margin for all screens
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: "3.5vw", sm: "1.9vw", md: "1.3vw" }, // Responsive title font size
                        lineHeight: { xs: "1.5rem", md: "2rem" }, // Responsive line height
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
                        fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" }, // Responsive subtitle font size
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
