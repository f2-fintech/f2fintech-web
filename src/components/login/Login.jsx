import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, useMediaQuery } from "@mui/material";

import Signin from "./Signin";
import Signup from "./Signup";
import Transition from "./Transition";

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const isMobile = useMediaQuery("(max-width:480px)");
  const location = useLocation();
  const navigate = useNavigate();
  const from = "/" || "/providers";

  const handleLoginSuccess = () => {
    navigate(from, { replace: true });
  };

  useEffect(() => {
    window.scrollTo({
      top: window.innerHeight * 0.12, // 12vh of the viewport height
      // behavior: "smooth",
    });
  }, []);

  return (
    <Container
      sx={{
        height: "100vh",
        minWidth: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: isMobile ? "column" : "row",
        padding: "0 !important",
        backgroundColor: "#fff",
        transition: "all 5s ease", // Set the transition duration to 5 seconds
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
    </Container>
  );
};

export default LoginPage;
