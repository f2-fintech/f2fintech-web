import {
  Box,
  Container,
  createTheme,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import styles from "./Apply.module.css";
import ButtonComp from "../common/button/Button";
import { tokens } from "../../theme";
import { keyframes, styled } from "@mui/system";
import StackingCards from "../common/stacking-card/StackingCards";
// import { useTheme } from "@mui/material/styles";

import "@fontsource/urbanist/600.css"; // Black

const theme = createTheme({
  typography: {
    fontFamily:
      '"Urbanist", "Roboto", "Helvetica", "Arial", sans-serif, system-ui',
  },
});
// Neon glow animation
const neonGlow = keyframes`
  0% {
    text-shadow: 
      0 0 5px #f0f, 
      0 0 10px #f0f, 
      0 0 20px #ff0, 
      0 0 30px #ff0, 
      0 0 40px #ff0, 
      0 0 50px #ff0, 
      0 0 60px #ff0;
  }
  50% {
    text-shadow: 
      0 0 5px #0ff, 
      0 0 10px #0ff, 
      0 0 20px #0f0, 
      0 0 30px #0f0, 
      0 0 40px #0f0, 
      0 0 50px #0f0, 
      0 0 60px #0f0;
  }
  100% {
    text-shadow: 
      0 0 5px #f00, 
      0 0 10px #f00, 
      0 0 20px #f90, 
      0 0 30px #f90, 
      0 0 40px #f90, 
      0 0 50px #f90, 
      0 0 60px #f90;
  }
`;

// Styled component for neon text
const NeonText = styled(Box)(({ theme }) => ({
  fontSize: "4rem", // Adjust size as needed
  fontWeight: "bold",
  textTransform: "uppercase",
  color: "#fff",
  textShadow: `
    0 0 5px #00f, 
    0 0 10px #00f, 
    0 0 20px #0ff, 
    0 0 30px #0ff, 
    0 0 40px #0ff, 
    0 0 50px #0ff, 
    0 0 60px #0ff
  `,
  animation: `${neonGlow} 3s infinite alternate`,
  textAlign: "center",
}));

const steps = [
  {
    number: 1,
    image: "../new/step1.png",
    text: "Fill out the loan application form",
  },
  {
    number: 2,
    image: "../new/compare.png",
    text: "Compare loan offers & choose the best option",
  },
  {
    number: 3,
    image: "../new/verification.png",
    text: "Complete documentation & KYC",
  },
  {
    number: 4,
    image: "../new/repayment.png",
    text: "Choose repayment options and receive funds",
  },
];

export default function Apply() {
  const theme = useTheme();
  const colors = tokens(theme);

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        // marginTop: "40px",
        width: "100%",
        background: theme.palette.background.de,
        padding: "76px",
        [theme.breakpoints.down("sm")]: {
          // height: "60%",
          paddingTop: theme.spacing(14), // Reduce top padding for smaller screens
          paddingBottom: theme.spacing(14), // Reduce bottom padding for smaller screens
        },
      }}
    >
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12}>
          <Typography
            fontWeight="bold"
            fontFamily="Poppins"
            sx={{
              textAlign: "center",
              // fontSize: "2.5rem",

              fontSize: {
                xs: "2rem",
                sm: "2.3rem",
                md: "2.5rem",
                xl: "3rem",
              },

              lineHeight: "2rem",
              // marginBottom: "10px",
            }}
          >
            Apply now in{" "}
            <span
              style={{
                background: "#3244e6",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              4 easy steps
            </span>
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <StackingCards />
        </Grid>
        {/* <Grid item xs={5}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <img
              src="/apply3.png"
              alt="Loan Application"
              style={{ width: "100%", height: "61vh", marginBottom: "10vh" }}
            />
          </Box>
        </Grid> */}
      </Grid>

      <Box
        sx={{
          margin: "90px auto 0px auto",
          borderRadius: "20px",
          paddingBottom: "2rem",
        }}
      >
        <ButtonComp />
      </Box>
    </Container>
  );
}
