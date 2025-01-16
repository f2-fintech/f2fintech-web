import { Button, Box, Typography, useMediaQuery } from "@mui/material";
import { keyframes, styled } from "@mui/system";

export default function Transition({ isSignUp, setIsSignUp }) {
  const isMobile = useMediaQuery("(max-width:480px)");
  const isTab = useMediaQuery("(max-width:820px)");

  const neonGlow = keyframes`
  0% {
    text-shadow: 
      0 0 2px #FFD700, 
      0 0 2px #FFD700, 
      0 0 2px #FFD700, 
      0 0 2px #FFD700, 
      0 0 2px #FFD700, 
      0 0 2px #FFD700, 
      0 0 2px #FFD700;
  }
  50% {
    text-shadow: 
      0 0 2px #50C878, 
      0 0 2px #50C878, 
      0 0 2px #50C878, 
      0 0 2px #50C878, 
      0 0 2px #50C878, 
      0 0 2px #50C878, 
      0 0 2px #50C878;
  }
  100% {
    text-shadow: 
      0 0 2px #FFD700, 
      0 0 2px #FFD700, 
      0 0 2px #FFD700, 
      0 0 2px #FFD700, 
      0 0 2px #FFD700, 
      0 0 2px #FFD700, 
      0 0 2px #FFD700;
  }
`;

  const NeonText = styled(Box)(({ theme }) => ({
    fontSize: "4rem", // Adjust size as needed
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#fff",
    textShadow: `
    0 0 5px #FFD700, 
    0 0 10px #FFD700, 
    0 0 20px #FFD700, 
    0 0 30px #FFD700, 
    0 0 40px #FFD700, 
    0 0 50px #FFD700, 
    0 0 60px #FFD700
  `,
    animation: `${neonGlow} 3s infinite alternate`,
    textAlign: "center",
  }));

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: isMobile ? "transparent" : "black",
        backgroundSize: isMobile ? "cover" : "contain", // Cover or contain based on your preference
        backgroundPosition: "center", // Center the background image
        color: "white",
        zIndex: 2,
        position: "absolute",
        right: isSignUp ? "50%" : "0%", // Animates between positions
        left: isSignUp ? "0%" : "50%",
        width: { xs: "100%", sm: "50%" }, // Adjust width for smaller screens
        backgroundImage: `url(/${isSignUp ? "login.gif" : "signup.gif"})`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          height: { xs: "40vh", sm: "60vh" }, // Adjust height for smaller screens
          width: "100%",
          display: "flex",
          marginBottom: "18vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        {/* Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent black
            zIndex: 0,
          }}
        ></Box>
        {!isMobile && (
          <>
            <NeonText
              sx={{
                fontSize: { xs: "6vw", sm: "3.5vw" },
                textAlign: "center",
                lineHeight: "1.75rem",
                fontWeight: "570",
                textTransform: "none",
                fontFamily: "DM sans",
                position: "relative", // Ensure text stays above overlay
                zIndex: 1,
              }}
            >
              Hello, Friend!
            </NeonText>

            <Typography
              sx={{
                fontSize: { xs: "3vw", sm: "1.2vw" },
                lineHeight: "1.5rem",
                textAlign: "center",
                marginBottom: "2.5rem",
                fontFamily: "Poppins",
                fontWeight: "500",
                position: "relative",
                zIndex: 1,
              }}
            >
              {!isSignUp ? "Register" : "Sign in"} with your details to access
              all<br></br> our financial tools and services.
            </Typography>
          </>
        )}
        <Button
          variant="contained"
          onClick={() => setIsSignUp(!isSignUp)}
          sx={{
            backgroundColor: "#50C878",
            marginTop: isMobile ? "30vh" : isTab ? "" : "0px",
            // width: {
            //   xs: "50%",
            //   sm: "30%",
            //   md: "10vw",
            // },
            padding: "0.5rem 1.5rem",
            width: "13vw",
            color: "#000000", // Default text color
            fontFamily: "Poppins",
            fontWeight: "500",
            // fontSize: "1.1rem",
            textTransform: "none",
            border: "none",
            cursor: "pointer",
            fontSize: { xs: "1.2rem", sm: "1rem" },
            lineHeight: "1.5rem",
            borderRadius: "20px",
            top: "-2vh",

            "&:hover": {
              color: "#ffffff",
              backgroundColor: "#3EA561",
            },
          }}
        >
          {!isSignUp ? "Sign Up" : "Sign In"}
        </Button>
      </Box>
    </Box>
  );
}
