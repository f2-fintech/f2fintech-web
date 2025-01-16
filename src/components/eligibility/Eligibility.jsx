import { Box, Container, Typography, Grid } from "@mui/material";

import ButtonComp from "../common/button/Button";
import styles from "./Eligibility.module.css";
import BusinessIcon from "@mui/icons-material/Business";

export default function Eligibility() {
  return (
    <Container
      maxWidth="false"
      sx={{
        paddingBottom: "5%",
        paddingTop: "4%",
        width: "91%",
      }}
    >
      <Grid container spacing={3} sx={{ display: "flex", alignItems: "" }}>
        <Grid item xs={6}>
          <Box className={styles.typoTitle}>
            <Typography>
              Who can <span>Apply?</span>
            </Typography>
          </Box>
          <Box className={styles.apply_box_cards}>
            <img src="/employee.png" />
            <Typography className="typo1">
              Employees or Professionals with income more than RS.25,000/- per
              month
            </Typography>
          </Box>
          <Box className={styles.apply_box_cards}>
            <img src="/businessgrow.png" />
            <Typography className="typo1">Business and Enterprenuer</Typography>
          </Box>
          <Box className={styles.apply_box_cards}>
            <img src="/cibilmeter.png" />
            <Typography className="typo1">
              Individuals with CIBIL Score more than 700
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box className={styles.typoTitle}>
            <Typography>
              Keep these <span> Details Handy</span>
            </Typography>
          </Box>
          <Grid
            spacing={3}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {[
              { src: "/Adhaar78.mp4", label: "Aadhar" },
              { src: "/Address.mp4", label: "Address" },
              { src: "/Wallet.mp4", label: "PAN" },
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box
                  className={styles.apply_box_cards2}
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "20px",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 12px 30px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  <video
                    autoPlay
                    loop
                    muted
                    style={{
                      height: "30vh",
                      // width: "100%",
                      borderRadius: "20px",
                    }}
                  >
                    <source src={item.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <Typography
                    sx={{
                      position: "absolute",
                      bottom: "5px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      color: index % 2 ? "#FFD700" : "white",
                      padding: "5px 30px",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      textAlign: "center",
                      marginRight: "1rem",
                    }}
                  >
                    {item.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Box
        sx={{
          width: "15%",
          margin: "75px auto 0 auto",
        }}
      >
        <ButtonComp />
      </Box>
    </Container>
  );
}
