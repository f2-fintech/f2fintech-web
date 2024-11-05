import { Box, Container, Typography, Grid } from "@mui/material";

import ButtonComp from "../common/button/Button";
import styles from './Eligibility.module.css';
import BusinessIcon from '@mui/icons-material/Business';

export default function Eligibility() {
  return (
    <Container maxWidth="false" sx={{ paddingBottom: "5%", paddingTop: "10%", width: '91%' }}>
      <Grid container spacing={3} sx={{ display: 'flex', alignItems: '', }}>

        <Grid item xs={6}>

          <Box className={styles.typoTitle}>
            <Typography>Who can <span>Apply?</span></Typography>
          </Box>
          <Box className={styles.apply_box_cards}>
            <img src="./new/employee.png" />
            <Typography className="typo1">Employees or Profession with income more than RS.25,000/- per month</Typography>
          </Box>
          <Box className={styles.apply_box_cards}>
            <img src='/new/business2.png' />
            <Typography className="typo1">Business and Enterprenuer</Typography>
          </Box>
          <Box className={styles.apply_box_cards}>
            <img src="./new/meter.png" />
            <Typography className="typo1">Individuals with CIBIL Score more than 700</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box className={styles.typoTitle}>
            <Typography>Keep these <span> Details Handy</span></Typography>
          </Box>
          <Grid container spacing={3} sx={{ display: 'flex', alignItems: 'center' }}>

            <Grid item xs={4}>
              <Box className={styles.apply_box_cards2}>
                <img src="./new/fingerprint.gif" style={{ width: '100%', height: '100%' }} />
                <Typography className="typo1">Aadhar Number</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box className={styles.apply_box_cards2}>
                <img src="./new/address.png" />
                <Typography className="typo1">Address
                  Proof</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box className={styles.apply_box_cards2}>
                <img src="./new/pan.png" />
                <Typography className="typo1">PAN
                  Number</Typography>
              </Box>
            </Grid>
          </Grid>

        </Grid>
      </Grid>
      <Box sx={{
        width: '15%',
        margin: '40px auto 0 auto'
      }}>
        <ButtonComp />
      </Box>
      {/* <Container
        maxWidth="false"
        sx={{
          height: "75vh",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            height: "400px",
            width: "44%",
            borderRadius: "90px 20px 20px 20px",
            paddingTop: "10vh",
            paddingLeft: "55px",
            border: "1px solid lightgray",
            background:
              "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(6,55,158,1) 100%)",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
          }}
        >
          <Typography
            sx={{
              lineHeight: "5rem",
              fontWeight: "700",
              fontSize: "3.7vw",
              paddingTop: "25px",
              textShadow: "1px 1px 2px gray",
            }}
          >
            Who Can<br></br> Apply?
          </Typography>
        </Box>
        <img
          src="watermark1.png"
          style={{
            position: "absolute",
            marginRight: "65vh",
            marginTop: "40vh",
          }}
        />
        <Box>
          <img
            src="whocan22.jpeg"
            style={{
              height: "54vh",
              width: "95vh",
              borderRadius: "20px 90px 20px 20px",
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
            }}
          />
        </Box>
      </Container>

      <Container
        maxWidth="false"
        sx={{
          height: "60vh",
          border: "1px solid lightgray",
          borderRadius: "20px 20px 90px 90px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: "91%",
          backgroundColor: "#e6ffff",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
        }}
      >
        <Box
          sx={{
            height: "50vh",
            width: "50vh",
            borderRadius: "200px",
            backgroundColor: "lightgray",
            ":hover": {
              transform: "scale(1.1)",
              background: "white",
              transition: "all 300ms ease-in-out",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: "8vh",
            }}
          >
            <img
              src="search.png"
              style={{ height: "25vh", width: "30vh", borderRadius: "20px" }}
            />
          </Box>
          <Typography
            variant="h3"
            sx={{
              lineHeight: "1.75rem",
              fontWeight: "500",
              maxWidth: "12.5",
              textAlign: "center",
              marginTop: "1.25rem",
              fontSize: "1.4vw",
              fontFamily: "cursive",
              padding: "2vh",
            }}
          >
            CIBIL Score of 700<br></br>or higher
          </Typography>
        </Box>
        <Box
          sx={{
            height: "50vh",
            width: "50vh",
            borderRadius: "200px",
            backgroundColor: "lightgray",
            ":hover": {
              transform: "scale(1.1)",
              background: "white",
              transition: "all 300ms ease-in-out",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "8vh",
            }}
          >
            <img
              src="eligibility2.png"
              style={{ height: "25vh", width: "30vh", borderRadius: "20px" }}
            />
          </Box>
          <Typography
            variant="h3"
            sx={{
              lineHeight: "1.75rem",
              fontWeight: "500",
              maxWidth: "12.5",
              textAlign: "center",
              marginTop: "1.25rem",
              fontSize: "1.4vw",
              fontFamily: "cursive",
              padding: "2vh",
            }}
          >
            Business operational for <br></br> 2+ years
          </Typography>
        </Box>
        <Box
          sx={{
            height: "50vh",
            width: "50vh",
            borderRadius: "200px",
            backgroundColor: "lightgray",
            ":hover": {
              transform: "scale(1.1)",
              background: "white",
              transition: "all 300ms ease-in-out",
            },
            marginLeft: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "8vh",
            }}
          >
            <img
              src="eligibility3.png"
              style={{ height: "25vh", width: "30vh", borderRadius: "20px" }}
            />
          </Box>
          <Typography
            variant="h3"
            sx={{
              lineHeight: "1.75rem",
              fontWeight: "500",
              maxWidth: "12.5",
              textAlign: "center",
              marginTop: "1.25rem",
              fontSize: "1.4vw",
              fontFamily: "cursive",
              padding: "2vh",
            }}
          >
            12 month's bank <br></br>statement
          </Typography>
        </Box>
      </Container>
      <Container
        sx={{
          marginTop: 5,
          height: "120px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ButtonComp title="Apply Now" width="400px" />
      </Container> */}
    </Container>
  );
}
