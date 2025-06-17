import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";

import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
  Divider,
  CardMedia,
} from "@mui/material";

import { useLocation } from "react-router-dom"; // Import useLocation from react-router-dom

function Compare() {
  const location = useLocation(); // Use useLocation to get the state
  const { compares } = location.state; // Retrieve the compares array from state
  const [hoveredPair, setHoveredPair] = useState(null);

  const handleMouseEnter = (pair) => {
    setHoveredPair(pair);
  };

  const handleMouseLeave = () => {
    setHoveredPair(null);
  };
  const theme = useTheme();
  return (
    <>
      <Container
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "40px",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Box my={4}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            style={{
              fontWeight: "550",
              fontFamily: "Poppins",
              fontSize: "2vw",
              color: theme.palette.secondary.main,
            }}
          >
            Loan Provider Comparison
          </Typography>
        </Box>

        <Grid
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
          }}
          container
          spacing={4}
        >
          {compares.map((product, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                style={{
                  height: "90vh",
                  position: "relative",
                  transition:
                    "transform 0.3s ease-in-out, box-shadow 0.2s ease-in-out",
                  overflow: "hidden",
                  color: theme.palette.secondary.main,
                  padding: "5px",

                  transform: hoveredPair === index ? "scale(1.05)" : "scale(1)",
                  boxShadow:
                    hoveredPair === index
                      ? `0 0  6px ${theme.palette.secondary.main}`
                      : `0 0  6px ${theme.palette.secondary.main}`,
                }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.homeimage}
                  alt={product.title}
                  style={{
                    objectFit: "contain",
                    display: "block",
                    margin: "auto",
                    maxWidth: "100%",
                    maxHeight: "100%",
                  }}
                />

                <CardContent>
                  <Typography
                    variant="h5"
                    gutterBottom
                    style={{
                      fontWeight: "400",
                      fontFamily: "Poppins",
                      color: theme.palette.text.primary,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {product.title}
                  </Typography>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography
                      variant="body2"
                      gutterBottom
                      style={{
                        fontWeight: "bold",
                        fontSize: "2.4vh",
                        color: theme.palette.secondary.main,
                        fontFamily: "Poppins",
                      }}
                      sx={{ marginLeft: 1 }}
                    >
                      <strong>ROI:</strong> {product.interest_rate}
                    </Typography>
                  </Box>
                  {/* <Box display="flex" alignItems="center">
                  <Typography
                    variant="body2"
                    gutterBottom
                    style={{
                      fontWeight: "450",
                      color: "white",
                      fontSize: "2.1vh",
                      fontFamily: "Poppins",
                    }}
                    sx={{ marginLeft: 1 }}
                  >
                    <strong>Description:</strong> {product.description}
                  </Typography>
                </Box> */}
                </CardContent>
                <CardContent>
                  <Divider style={{ margin: "20px 0" }} />
                  <Box display="flex" alignItems="center">
                    <Typography
                      variant="body2"
                      sx={{
                        marginLeft: 1,
                        color: theme.palette.secondary.main,
                        fontSize: "2.4vh",
                        fontFamily: "DM sans",
                        fontWeight: "bold",
                      }}
                    >
                      <strong>Charges:</strong> {product.charges}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Typography
                      variant="body2"
                      sx={{
                        marginLeft: 1,
                        color: theme.palette.secondary.main,
                        fontFamily: "DM sans",
                        fontWeight: "bold",
                        fontSize: "2.4vh",
                      }}
                    >
                      <strong>Document Required:</strong>{" "}
                      {product.document_required}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Typography
                      variant="body2"
                      sx={{
                        marginLeft: 1,
                        color: theme.palette.text.primary,
                        fontFamily: "DM sans",
                        fontWeight: "300",
                        fontSize: "2.2vh",
                      }}
                    >
                      <strong>Minimum KYC:</strong> {product.minimum_kyc}
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center">
                    <Typography
                      variant="body2"
                      gutterBottom
                      style={{
                        fontWeight: "300",
                        color: theme.palette.text.primary,
                        fontFamily: "DM sans",
                      }}
                      sx={{ marginLeft: 1 }}
                    >
                      <strong>Short_description:</strong>{" "}
                      {product.short_description}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Typography
                      variant="body2"
                      gutterBottom
                      style={{
                        fontWeight: "300",
                        color: theme.palette.text.primary,
                        fontFamily: "DM sans",
                      }}
                      sx={{ marginLeft: 1 }}
                    >
                      <strong>Long_description:</strong>{" "}
                      {product.long_description}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Compare;
