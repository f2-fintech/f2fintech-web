import { Button, Box, Typography, useMediaQuery } from "@mui/material";
import { keyframes } from "@mui/system";
import { UserPlus, UserCheck } from "lucide-react";

export default function Transition({ isSignUp, setIsSignUp }) {
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:900px)");

  const float = keyframes`
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-15px);
    }
  `;

  const spin = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  `;

  const pulseGlow = keyframes`
    0%, 100% {
      box-shadow: 0 0 20px rgba(255, 255, 255, 0.1), inset 0 0 15px rgba(255, 255, 255, 0.1);
    }
    50% {
      box-shadow: 0 0 35px rgba(255, 255, 255, 0.25), inset 0 0 25px rgba(255, 255, 255, 0.2);
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
        background: "#384aff",
        borderLeft: isSignUp ? "none" : "1px solid rgba(255, 255, 255, 0.08)",
        borderRight: isSignUp ? "1px solid rgba(255, 255, 255, 0.08)" : "none",
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
        {/* Decorative multi-layered glass sphere */}
        <Box
          sx={{
            position: "relative",
            width: "130px",
            height: "130px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "0.75rem",
            animation: `${float} 4s ease-in-out infinite`,
          }}
        >
          {/* Animated Spinning outer ring */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "2px dashed rgba(255, 255, 255, 0.25)",
              animation: `${spin} 20s linear infinite`,
            }}
          />
          {/* Pulsing glow sphere */}
          <Box
            sx={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(5px)",
              animation: `${pulseGlow} 3s ease-in-out infinite`,
            }}
          >
            <Box
              sx={{
                width: "74px",
                height: "74px",
                borderRadius: "50%",
                background: "#384aff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                boxShadow: "0 10px 20px rgba(56, 74, 255, 0.3)",
              }}
            >
              {isSignUp ? (
                <UserCheck size={32} />
              ) : (
                <UserPlus size={32} />
              )}
            </Box>
          </Box>
        </Box>

        <Typography
          sx={{
            fontSize: { xs: "2rem", md: "2.25rem", lg: "2.5rem" },
            fontWeight: "800",
            color: "white",
            fontFamily: "'Poppins', sans-serif",
            textShadow: "0 2px 20px rgba(0,0,0,0.2)",
            marginBottom: "0.5rem",
            letterSpacing: "-0.5px",
          }}
        >
          {!isSignUp ? "New Here?" : "Welcome Back!"}
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: "0.95rem", md: "1rem" },
            lineHeight: "1.7",
            color: "rgba(255, 255, 255, 0.85)",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: "400",
            maxWidth: "360px",
            marginBottom: "1rem",
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
            padding: "0.875rem 2.75rem",
            color: "white",
            fontFamily: "Poppins",
            fontWeight: "600",
            fontSize: "0.95rem",
            textTransform: "none",
            border: "2px solid rgba(255, 255, 255, 0.4)",
            borderRadius: "50px",
            background: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(10px)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              background: "white",
              color: "#4f46e5",
              border: "2px solid white",
              transform: "translateY(-2px)",
              boxShadow: "0 10px 25px rgba(255, 255, 255, 0.35)",
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
            gap: 1.25,
          }}
        >
          {[1, 2, 3].map((i) => (
            <Box
              key={i}
              sx={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.4)",
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
