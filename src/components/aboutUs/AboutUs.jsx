import React from "react";
import { motion } from "framer-motion";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { styled } from "@mui/system";
import LendingPartners from "../lendingpartners/Lendingpartners";
import Advantages from "../advantages/Advantages";
import { advantagesData } from "../data/Data.jsx";

// Styled Components
const SectionContainer = styled(Box)(({ theme }) => ({
  padding: "3% 5%",
  textAlign: "center",
}));

const Card = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  background: "linear-gradient(30deg, rgb(60, 200, 255), rgb(72, 255, 72))",
  borderRadius: "20px",
  textAlign: "center",
  color: theme.palette.text.primary,
  "&:hover": {
    color: "white",
  },
}));

const AboutPage = () => {
  return (
    <Box>
      {/* Hero Section */}
      <SectionContainer
        sx={{
          height: "60vh",
          backgroundColor: "#003a6d",
          //   background: "linear-gradient(to bottom, #2f2b2b, #0586db)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h1"
            sx={{
              mt: "3rem",
              color: "white",
              textShadow: `
                  0 0 5px white,     /* Subtle inner glow */
                  0 0 10px white,    /* Brighter edge */
                  0 0 20px white,    /* Outer glow */
                  0 0 30px #ffffff,  /* Fainter shine */
                  0 0 40px #d9d9d9,  /* Slightly extended shine */
                //   0 0 50px #bfbfbf   /* Final faint shine */
                `,
              fontFamily: "'Playfair Display', serif",
              mb: "3rem",
            }}
          >
            f2fintech
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "white",
              padding: "0 10%",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            <span
              style={{
                fontSize: "32px",
                fontFamily: "cursive",
                fontWeight: "bold",
                color: "peachpuff",
                mt: "4rem",
              }}
            >
              Welcome to F2 Fintech. Your go-to place for choosing best loans in
              India. We are operating and Serving this Industry since 2019
              <br />
            </span>
            <span
              style={{
                color: "lightblue",
                fontWeight: 300,
                fontSize: "25px",
                fontFamily: "'Roboto Slab', serif",
              }}
            >
              We're F2Fintech, the one-stop destination for easing the loan
              process in India. We help you navigate the complex world of
              finance. We have you covered, regardless of the type of loan you
              require. We carefully consider your specific scenario to ensure
              you get the best possible offer. And here's something to be proud
              of: since our inception, we've made over 11,000 clients happy.
            </span>
          </Typography>
        </motion.div>
      </SectionContainer>
      <LendingPartners />
      <Advantages advantagesData={advantagesData} />

      {/* Features Section */}
      {/* <Box
        sx={{
          background: "linear-gradient(to bottom, #2f2b2b, #0586db)",
          padding: "5%",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h1"
            sx={{
              display: "flex",
              color: "white",
              marginBottom: "5rem",
              fontFamily: "cursive",
              justifyContent: "center",
            }}
          >
            Features
          </Typography>
        </motion.div>
        <Grid
          sx={{ width: "100%", ml: "4rem", justifyContent: "space-between" }}
          container
          spacing={3}
          justifyContent="center"
        >
          {[
            {
              title: "Global Reach",
              description: "Connect with lenders worldwide",
            },
            {
              title: "Secure Platform",
              description: "Advanced encryption & security",
            },
            {
              title: "Smart Solutions",
              description: "AI-powered matching system",
            },
            {
              title: "Smart Solutions",
              description: "AI-powered matching system",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 * (index + 1) }}
            >
              <Grid
                item
                xs={12}
                md={4}
                height={"12rem"}
                marginLeft={2}
                key={index}
                sx={{
                  display: "flex",
                  paddinng: 5,
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: 4,
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1">{feature.description}</Typography>
                </Card>
              </Grid>
            </motion.div>
          ))}
        </Grid>
      </Box> */}

      {/* Footer */}
      {/* <Box sx={{ background: "#0586DB", padding: "20px", textAlign: "center" }}>
        <Typography variant="h6" sx={{ color: "white" }}>
          © 2024 f2fintech. All Rights Reserved.
        </Typography>
      </Box> */}
    </Box>
  );
};

export default AboutPage;
