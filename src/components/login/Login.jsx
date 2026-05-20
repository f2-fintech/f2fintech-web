import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, useMediaQuery, Box } from "@mui/material";
import { keyframes } from "@mui/system";

import Signin from "./Signin";
import Signup from "./Signup";
import Transition from "./Transition";

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
        minHeight: { xs: "min-content", sm: "680px" },
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: isMobile ? "column" : "row",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #3244e6 0%, #5b6df5 100%)",
        padding: isMobile ? "4rem 0" : 0,
      }}
    >
      {/* ... floating elements ... */}
      <Box
        sx={{
          position: "absolute",
          width: { xs: "200px", md: "300px" },
          height: { xs: "200px", md: "300px" },
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
          top: { xs: "-100px", md: "-150px" },
          left: { xs: "-100px", md: "-150px" },
          filter: "blur(80px)",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: { xs: "300px", md: "400px" },
          height: { xs: "300px", md: "400px" },
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
          bottom: { xs: "-150px", md: "-200px" },
          right: { xs: "-150px", md: "-200px" },
          filter: "blur(100px)",
          zIndex: 0,
        }}
      />

      {/* Forms Container */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: isMobile ? "2rem 0" : "0",
          zIndex: 1,
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
