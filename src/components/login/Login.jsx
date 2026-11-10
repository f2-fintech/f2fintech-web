import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, useMediaQuery, Box } from "@mui/material";
import { keyframes } from "@mui/system";

import Signin from "./Signin";
import Signup from "./Signup";
import Transition from "./Transition";

// Smooth 3D floating animations for background mesh glow
const float1 = keyframes`
  0%, 100% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(40px, -60px) scale(1.15); }
  66% { transform: translate(-30px, 30px) scale(0.9); }
`;

const float2 = keyframes`
  0%, 100% { transform: translate(0px, 0px) scale(1); }
  50% { transform: translate(-50px, 50px) scale(1.2); }
`;

const float3 = keyframes`
  0%, 100% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(-20px, -40px) scale(0.85); }
  66% { transform: translate(40px, 20px) scale(1.15); }
`;

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:900px)");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLoginSuccess = () => {
    navigate(from, { replace: true });
  };

  useEffect(() => {
    window.scrollTo({
      top: window.innerHeight * 0.12,
    });
  }, []);

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        height: { xs: "auto", sm: "calc(100vh - 12vh)" },
        minHeight: { xs: "min-content", sm: "700px" },
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        background: "#384aff",
        padding: isMobile ? "2rem 0" : 0,
      }}
    >
      {/* Forms Card Container */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: isMobile ? "100%" : isTablet ? "720px" : "1000px",
          height: isMobile ? "auto" : "600px",
          background: isMobile 
            ? "transparent" 
            : "#ffffff",
          borderRadius: "28px",
          boxShadow: isMobile 
            ? "none" 
            : "0 20px 40px rgba(0, 0, 0, 0.15)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          zIndex: 1,
          mx: isMobile ? 0 : 2,
        }}
      >
        <Signin
          isSignUp={isSignUp}
          setIsSignUp={setIsSignUp}
          onLoginSuccess={handleLoginSuccess}
        />
        <Signup
          isSignUp={isSignUp}
          setIsSignUp={setIsSignUp}
          onLoginSuccess={handleLoginSuccess}
        />
        <Transition isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
      </Box>
    </Container>
  );
};

export default LoginPage;
