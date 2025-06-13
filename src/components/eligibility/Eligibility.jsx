import { Box, Container, Typography, Grid } from "@mui/material";

import ButtonComp from "../common/button/Button";
import styles from "./Eligibility.module.css";
import { useTheme } from "@mui/material/styles";
export default function Eligibility() {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          height: "auto",
          width: "100%",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Container
          maxWidth="false"
          sx={{
            paddingBottom: "5%",
            paddingTop: "4%",
            width: "91%",
          }}
        >
          <Grid
            container
            spacing={3}
            sx={{
              display: "flex",
              alignItems: "",
              flexDirection: { xs: "column", md: "row" }, // Stack for small screens, row for larger
            }}
          >
            <Grid item xs={12} md={6}>
              <Typography
                fontWeight="bold"
                fontFamily="Poppins"
                sx={{
                  fontSize: {
                    xs: "2rem",
                    sm: "2.3rem",
                    md: "2.5rem",
                    xl: "3rem",
                  },
                  color: theme.palette.text.primary,
                }}
              >
                Who can{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(90deg, #7C3AED 0%, #9F7AEA 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Apply?
                </span>
              </Typography>

              <Box
                sx={{
                  bgcolor: theme.palette.secondary.main,
                }}
                className={styles.apply_box_cards}
              >
                <img src="/employee.png" alt="Normal Icon" />
                <Typography
                  sx={{ color: theme.palette.whitetext.white }}
                  className="typo1"
                >
                  Employees or Professionals with income more than RS.25,000/-
                  per month
                </Typography>
              </Box>
              <Box
                sx={{
                  bgcolor: theme.palette.secondary.main,
                }}
                className={styles.apply_box_cards}
              >
                <img src="/businessgrow.png" alt="Normal Icon" />
                <Typography
                  sx={{ color: theme.palette.whitetext.white }}
                  className="typo1"
                >
                  Business and Enterprenuer
                </Typography>
              </Box>
              <Box
                sx={{
                  bgcolor: theme.palette.secondary.main,
                }}
                className={styles.apply_box_cards}
              >
                <img src="/cibilmeter.png" alt="Cibil icon" />
                <Typography
                  sx={{ color: theme.palette.whitetext.white }}
                  className="typo1"
                >
                  Individuals with CIBIL Score more than 700
                </Typography>
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
                sx={{
                  fontSize: {
                    xs: "2rem",
                    sm: "2.3rem",
                    md: "2.5rem",
                    xl: "3rem",
                  },
                  color: theme.palette.text.primary,
                }}
              >
                Keep these Details
                <span
                  style={{
                    lineHeight: "2.5rem",
                    background:
                      "linear-gradient(90deg, #7C3AED 0%, #9F7AEA 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  <br />
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
              margin: "75px auto 0 auto",
            }}
          >
            <ButtonComp />
          </Box>
        </Container>
      </Box>
    </>
  );
}
