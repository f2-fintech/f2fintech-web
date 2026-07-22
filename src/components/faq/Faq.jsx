import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Container, Typography, Box, Grid, useMediaQuery } from "@mui/material";
import { createTheme, useTheme } from "@mui/material/styles";

import { faqData } from "../data/Data.jsx";


const theme = createTheme({
  typography: {
    fontFamily:
      '"DM Sans", "Roboto", "Helvetica", "Arial", sans-serif, system-ui',
  },
});

const Faq = () => {
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isIpadPro = useMediaQuery(
    "only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (-webkit-min-device-pixel-ratio: 2)"
  );
  return (
    <Container
      maxWidth={false}
      sx={{
        padding: {
          xs: "20px",
          sm: "40px",
          md: isIpadPro ? "30px" : "40px",
        },
        position: "relative",
      }}
    >
      <Box>
        <Typography
          fontWeight="bold"
          fontFamily="Poppins"
          sx={{
            marginLeft: "12px",
            fontSize: {
              xs: "2rem",
              sm: "2.3rem",
              md: isIpadPro ? "2.2rem" : "2.5rem",
              xl: "3rem",
            },
            textAlign: "center",
            background: "#3244e6",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            "&:before": {
              content: '""',
              position: "absolute",
              display: {
                xs: "none",
                md: "flex",
              },
              top: -100,
              right: -0,
              width: isIpadPro ? 300 : 400,
              height: isIpadPro ? 300 : 400,
              borderRadius: "50%",
              background: "rgba(50, 68, 230, 0.08)",
              zIndex: 0,
            },
          }}
        >
          FAQ (Frequently Asked Questions)
        </Typography>

        <Grid container>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              padding: {
                xs: "20px",
                md: isIpadPro ? "30px" : "50px",
              },
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: "block",
                borderRadius: "10px",
                position: "relative",
                "&:before": {
                  content: '""',
                  position: "absolute",
                  display: {
                    xs: "none",
                    md: "flex",
                  },
                  top: isIpadPro ? 50 : 100,
                  right: isIpadPro ? 300 : 500,
                  width: isIpadPro ? 300 : 400,
                  height: isIpadPro ? 300 : 400,
                  borderRadius: "50%",
                  background: "rgba(50, 68, 230, 0.08)",
                  zIndex: 0,
                },
                // iPad Pro specific adjustments
                "@media (max-width: 1366px) and (min-width: 1024px)": {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  "&:before": {
                    top: 30,
                    right: "50%",
                    transform: "translateX(50%)",
                    width: 250,
                    height: 250,
                  },
                },
                "@media (max-width: 1024px)": {
                  "&:before": {
                    display: "none",
                  },
                },
              }}
            >
              <img
                src="/think444.gif"
                alt="Not found logo"
                style={{
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                  width: isMobileOrTablet ? "100%" : "auto",
                  height: isMobileOrTablet ? "" : isIpadPro ? "50vh" : "65vh",
                  maxWidth: "100%",
                  objectFit: "contain",
                  // iPad Pro specific adjustments
                  "@media (max-width: 1366px) and (min-width: 1024px)": {
                    width: "100%",
                    height: isIpadPro ? "40vh" : "50vh",
                    maxHeight: isIpadPro ? "40vh" : "50vh",
                    maxWidth: "100%",
                    objectFit: "contain",
                  },
                }}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              padding: {
                xs: "20px",
                md: isIpadPro ? "30px" : "50px",
              },
            }}
          >
            {faqData.map((faq, index) => (
              <Accordion
                key={index}
                sx={{
                  boxShadow: "none",
                  marginBottom: "10px",
                  fontSize: {
                    xs: "1rem",
                    md: isIpadPro ? "0.95rem" : "1rem",
                  },
                  color: "black",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    fontSize: {
                      xs: "1rem",
                      md: isIpadPro ? "0.95rem" : "1rem",
                    },
                    boxShadow: "none",
                    background: "#fff",
                    color: "#000000",
                    fontFamily: "Poppins",
                    fontWeight: "520",
                    minHeight: {
                      xs: "48px",
                      md: isIpadPro ? "52px" : "56px",
                    },
                    "& .MuiAccordionSummary-content": {
                      margin: {
                        xs: "12px 0",
                        md: isIpadPro ? "14px 0" : "16px 0",
                      },
                    },
                  }}
                >
                  {faq.question}
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: {
                      xs: "0.85rem",
                      md: isIpadPro ? "0.82rem" : "0.85rem",
                    },
                    backgroundColor: "#ffffff",
                    padding: {
                      xs: "16px",
                      md: isIpadPro ? "18px" : "20px",
                    },
                    borderTop: "1px solid #2c3ce3",
                    fontFamily: "Poppins",
                    fontWeight: "433",
                    lineHeight: {
                      xs: "1.4",
                      md: isIpadPro ? "1.5" : "1.6",
                    },
                  }}
                >
                  <div dangerouslySetInnerHTML={{ __html: faq.answer }}></div>
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Faq;
