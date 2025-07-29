import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Container, Typography, Box, Grid, useMediaQuery } from "@mui/material";
import { createTheme, useTheme } from "@mui/material/styles";
import "../../App.css";
import { faqData } from "../data/Data.jsx";
import "@fontsource/urbanist/600.css"; // Black

const theme = createTheme({
  typography: {
    fontFamily:
      '"Urbanist", "Roboto", "Helvetica", "Arial", sans-serif, system-ui',
  },
});

const Faq = () => {
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Container
      maxWidth={"false"}
      sx={{
        padding: { xs: "20px", sm: "40px" },
        position: "relative",
      }}
    >
      <Box>
        <Typography
          fontWeight="bold"
          fontFamily="Poppins"
          sx={{
            // fontWeight: "600",
            marginLeft: "12px",
            fontSize: {
              xs: "2rem",
              sm: "2.3rem",
              md: "2.5rem",
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
              width: 400,
              height: 400,
              borderRadius: "50%",
              background: "rgba(50, 68, 230, 0.08)",
              zIndex: 0,
            },
          }}
        >
          FAQ
        </Typography>

        <Grid container>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              padding: { xs: "20px", md: "50px" },
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: "block",
                borderRadius: "10px",
                "&:before": {
                  content: '""',
                  position: "absolute",
                  display: {
                    xs: "none",
                    md: "flex",
                  },
                  top: 100,
                  right: 500,
                  width: 400,
                  height: 400,
                  borderRadius: "50%",
                  background: "rgba(50, 68, 230, 0.08)",
                  zIndex: 0,
                },
              }}
            >
              <img
                src="/think444.gif"
                alt="Not found logo"
                style={{
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                  width: isMobileOrTablet ? "100%" : "auto",
                  height: isMobileOrTablet ? "" : "65vh",
                }}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              padding: { xs: "20px", md: "50px" },
            }}
          >
            {faqData.map((faq, index) => (
              <Accordion
                key={index}
                sx={{
                  boxShadow: "none",
                  marginBottom: "10px",
                  fontSize: "1rem",
                  color: "black",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    fontSize: "1rem",
                    boxShadow: "none",
                    background: "#fff",
                    color: "#000000",
                    fontFamily: "Poppins",
                    fontWeight: "520",
                  }}
                >
                  {faq.question}
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: ".85rem",
                    backgroundColor: "#ffffff",
                    padding: "20px",
                    borderTop: "1px solid #2c3ce3",
                    fontFamily: "Poppins",
                    fontWeight: "433",
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
