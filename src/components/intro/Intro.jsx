import { Container, Box, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Intro() {
  const introRef = useRef(null);

  useEffect(() => {
    const element = introRef.current;

    // Apply GSAP animation only for desktop screens (width > 768px)
    // if (window.innerWidth > 768) {
    //   const animation = gsap.to(element, {
    //     rotateX: 95, // Increased tilt on X-axis
    //     rotateY: 50, // Increased tilt on Y-axis
    //     opacity: 0.9, // Increased opacity for higher visibility
    //     duration: 1.5, // Animation duration
    //     ease: "power1.out",
    //     scrollTrigger: {
    //       trigger: element,
    //       start: "top 0",
    //       end: "bottom top",
    //       scrub: true, // Synchronizes animation with scrolling
    //     },
    //   });

    //   // Cleanup function to remove ScrollTrigger on unmount
    //   return () => {
    //     animation.scrollTrigger?.kill();
    //   };
    // }
  }, []);

  return (
    <Container
      ref={introRef}
      maxWidth={false}
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: {
          xs: "60vh",
          sm: "80vh",
          md: "100vh",
          xl: "100vh",
        },
        overflow: "hidden",
        padding: 0,
        margin: 0,
        maxWidth: "none",
      }}
    >
      <Box sx={{ width: "100%", height: "100%" }}>
        <video
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            overflow: "hidden",
            left: 0,
            right: 0,
          }}
          src="/intro1.mp4"
          autoPlay
          loop
          muted
        />
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          zIndex: 1,
        }}
      >
        <Typography
          color="white"
          sx={{
            textAlign: "center",
            fontSize: {
              xs: "6vw",
              sm: "5vw",
              md: "4vw",
            },
            fontWeight: 900,
            width: {
              xs: "90%",
              sm: "80%",
              md: "70%",
            },
            fontFamily: "Poppins",
          }}
        >
          Global Marketplace <br />
          For Buying and Selling Loans.
        </Typography>
      </Box>
    </Container>
  );
}
