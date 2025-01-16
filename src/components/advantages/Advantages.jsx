import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Advantages({ advantagesData }) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        sx={{
          backgroundImage:"url(/caltheme5.jpg)",
          height: "70vh",
          maxWidth: "100% !important",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          backgroundSize: "cover", // Ensures the image covers the box completely
          backgroundPosition: "center",
          mb: 8
        }}
      >
        <Box
          sx={{
            padding: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{}}>
            <Typography
              variant="h3"
              sx={{
                color: "white",
                lineHeight: "4rem",
                fontSize: "3vw",
                fontWeight: "700",
                fontFamily:'DM sans'
                // textShadow: "-1px 1px 10px rgba(0, 0, 0, 0.75)",
              }}
            >
              Why F2Fintech?
            </Typography>
          </Box>

          <Grid
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {advantagesData.map((advantage, index) => (
              <Grid item xs={4} key={index}>
                <Item
                  sx={{
                    backgroundColor: "transparent",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    boxShadow: "none",
                    ":hover": {
                      transform: "scale(1.1)",
                      transition: "all 300ms ease-in-out",
                    },
                  }}
                >
                  <Box
                    sx={{
                      height: "80px",
                      width: "80px",
                      borderRadius: "18px",
                      backgroundColor: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: '#50C878',
                    }}
                  >
                    {advantage.logo}
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      sx={{
                        fontSize: "1.3vw",
                        lineHeight: "2rem",
                        color: "white",
                        fontWeight: "300",
                        marginLeft: "10px",
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
                        fontSize: ".80rem",
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
