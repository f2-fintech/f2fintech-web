import { Button, Box, Typography, useMediaQuery } from "@mui/material";
import { keyframes } from "@mui/system";

export default function Transition({ isSignUp, setIsSignUp }) {
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:900px)");

  const float = keyframes`
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  `;

  const fadeIn = keyframes`
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  `;

  return (
    <Box
      sx={{
        height: "100%",
        display: (isMobile || isTablet) ? "none" : "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        right: isSignUp ? "50%" : "0%",
        left: isSignUp ? "0%" : "50%",
        width: { xs: "100%", sm: "50%" },
        zIndex: 3,
        transition: "all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        background: "rgba(97, 90, 90, 0.05)",
        backdropFilter: "blur(10px)",
        borderLeft: isSignUp ? "none" : "1px solid rgba(41, 41, 41, 0.1)",
        borderRight: isSignUp ? "1px solid rgba(41, 41, 41, 0.1)" : "none",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
          padding: "3rem",
          textAlign: "center",
          animation: `${fadeIn} 0.8s ease-out`,
        }}
      >
        {/* Decorative circle */}
        <Box
          sx={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)",
            border: "2px solid rgba(255, 255, 255, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1rem",
            animation: `${float} 3s ease-in-out infinite`,
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box
            sx={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #5c6cf2 0%, #3244e6 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2.5rem",
            }}
          >
            {isSignUp ? "👋" : "✨"}
          </Box>
        </Box>

        <Typography
          sx={{
            fontSize: { xs: "2rem", md: "2.25rem", lg: "2.5rem" },
            fontWeight: "700",
            color: "white",
            fontFamily: "'Poppins', sans-serif",
            textShadow: "0 2px 20px rgba(0,0,0,0.3)",
            marginBottom: "1rem",
          }}
        >
          {!isSignUp ? "New Here?" : "Welcome Back!"}
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: "1rem", md: "1.05rem", lg: "1.125rem" },
            lineHeight: "1.75",
            color: "rgba(255, 255, 255, 0.9)",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: "400",
            maxWidth: "400px",
            marginBottom: "1rem", // Reduced from 1.5rem
          }}
        >
          {!isSignUp
            ? "Join us today and discover amazing features. Sign up takes less than a minute!"
            : "Great to see you again! Sign in to continue your journey with us."}
        </Typography>

        <Button
          variant="outlined"
          onClick={() => setIsSignUp(!isSignUp)}
          sx={{
            padding: "0.875rem 2.5rem",
            color: "white",
            fontFamily: "Poppins",
            fontWeight: "600",
            fontSize: "1rem",
            textTransform: "none",
            border: "2px solid white",
            borderRadius: "50px",
            background: "transparent",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "white",
              color: "#3244e6",
              border: "2px solid white",
              transform: "translateY(-2px)",
              boxShadow: "0 6px 20px 0 rgba(255, 255, 255, 0.3)",
            },
          }}
        >
          {!isSignUp ? "Sign Up" : "Sign In"}
        </Button>

        {/* Decorative elements */}
        <Box
          sx={{
            position: "absolute",
            bottom: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 1,
          }}
        >
          {[1, 2, 3].map((i) => (
            <Box
              key={i}
              sx={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.5)",
                animation: `${float} ${2 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
