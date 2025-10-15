import { Box, Container, Typography, Grid, useMediaQuery } from "@mui/material";

import ButtonComp from "../common/button/Button";
import styles from "./Eligibility.module.css";
import { useTheme } from "@mui/material/styles";
export default function Eligibility() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // sm = 600px
  return (
    <>
      <Box
        sx={{
          height: "auto",
          width: "100%",
          backgroundColor: theme.palette.background.default,
          mt: isMobile ? 4 : 11.5,
        }}
      >
        <Container
          maxWidth="false"
          sx={{
            px: { xs: 2, sm: 3, md: 4 },
          }}
        >
          <Grid
            container
            spacing={{ xs: 4, md: 6 }}
            sx={{
              alignItems: "flex-start",
            }}
          >
            {/* Who can Apply Section */}
            <Grid item xs={12} md={6}>
              <Typography
                fontWeight="700"
                fontFamily="Poppins"
                sx={{
                  fontSize: {
                    xs: "1.75rem",
                    sm: "2.25rem",
                    md: "2.5rem",
                    xl: "3rem",
                  },
                  color: theme.palette.text.primary,
                  mb: { xs: 3, md: 4 },
                  lineHeight: 1.2,
                }}
              >
                Who can{" "}
                <span
                  style={{
                    color: "#3244e6",
                  }}
                >
                  Apply?
                </span>
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {[
                  {
                    icon: "/employee.png",
                    text: "Employees or Professionals with income more than RS.25,000/- per month",
                  },
                  {
                    icon: "/businessgrow.png",
                    text: "Business and Entrepreneur",
                  },
                  {
                    icon: "/cibilmeter.png",
                    text: "Individuals with CIBIL Score more than 700",
                  },
                ].map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: { xs: 2, sm: 3 },
                      p: { xs: 2, sm: 2.5 },
                      backgroundColor: theme.palette.background.paper,
                      borderRadius: "16px",
                      boxShadow: "0 4px 20px rgba(50, 68, 230, 0.08)",
                      border: "1px solid rgba(50, 68, 230, 0.1)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 30px rgba(50, 68, 230, 0.15)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        minWidth: { xs: 40, sm: 50 },
                        height: { xs: 40, sm: 50 },
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgba(50, 68, 230, 0.1)",
                        borderRadius: "12px",
                      }}
                    >
                      <img
                        src={item.icon || "/placeholder.svg"}
                        alt="Icon"
                        style={{
                          width: "24px",
                          height: "24px",
                          objectFit: "contain",
                        }}
                      />
                    </Box>
                    <Typography
                      sx={{
                        fontSize: { xs: "0.9rem", sm: "1rem" },
                        fontWeight: 500,
                        color: theme.palette.text.primary,
                        lineHeight: 1.5,
                        fontFamily: "Poppins",
                      }}
                    >
                      {item.text}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                order: { xs: 1, md: 2 }, // Keep "Details Handy" below for small screens
              }}
            >
              <Typography
                fontWeight="bold"
                fontFamily="Poppins"
                sx={ {
                  fontSize: {
                    xs: "2rem",
                    sm: "2.3rem",
                    md: "2.5rem",
                    xl: "3rem",
                  },
                  color: theme.palette.text.primary,
                } }
              >
                Keep these Details{ " " }
                <span
                  style={ {
                    lineHeight: "2.5rem",
                    background: "#3244e6",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  } }
                >
                  Handy
                </span>
              </Typography>


              <Grid
                container
                spacing={3}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {[
                  {
                    src: "/Fingerprint.gif",
                    label: "Aadhar",
                    alt: "Adhaar logo",
                  },
                  { src: "/Address.gif", label: "Address", alt: "Adress logo" },
                  { src: "/Wallet.gif", label: "PAN", alt: "Pan card logo" },
                ].map((item, index) => (
                  <Grid item xs={8} sm={6} md={4} key={index}>
                    <Box
                      className={styles.apply_box_cards2}
                      sx={{
                        position: "relative",
                        overflow: "hidden",
                        borderRadius: "20px",
                        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <img
                        src={item.src}
                        style={{
                          height: "100%",
                          width: "auto",
                          borderRadius: "20px",
                        }}
                        alt="Descriptive alternative text"
                      />

                      <Typography
                        sx={{
                          position: "absolute",
                          bottom: "5px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          color:
                            index % 2
                              ? theme.palette.secondary.main
                              : theme.palette.secondary.main,
                          padding: {
                            xs: "210px 15px", // Small padding for mobile
                            sm: "4px 20px", // Medium padding for tablets
                            md: "5px 30px", // Default for larger screens
                          },
                          Radius: "10px",
                          fontWeight: "bold",
                          textAlign: "center",
                          fontSize: {
                            xs: "12px", // Smaller font size for mobile
                            sm: "14px", // Medium font size for tablets
                            md: "16px", // Default for larger screens
                          },
                        }}
                      >
                        {item.label}
                      </Typography>
                      <Typography>{item.alt}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
          <Box
            sx={{
              width: {
                xs: "43%",
                sm: "25%",
                md: "15%",
              },
              margin: " 0 auto",
              py: 4,
            }}
          >
            <ButtonComp />
          </Box>
        </Container>
      </Box>
    </>
  );
}
