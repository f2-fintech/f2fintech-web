import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Container, Typography, Box, Grid } from "@mui/material";
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
  return (
    <Container
      maxWidth={"false"}
      sx={{
        padding: { xs: "20px", sm: "40px", md: "85px" },
      }}
    >
      <Box>
        <Typography
          sx={{
            // fontWeight: "600",
            marginBottom: "20px",
            marginLeft: "12px",
            fontSize: { xs: "1.5rem", sm: "2.50rem" },
            textAlign: "center",
            fontFamily: "urbanist",
            background: 'linear-gradient(90deg, #7C3AED 0%, #9F7AEA 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
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
            }}
          >
            <Box
              sx={{
                display: "block",
                borderRadius: "10px",
              }}
            >
              <Box />
              <video
                autoPlay
                loop
                muted
                style={{
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                  width: "100%",
                }}
              >
                <source src="/think444.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
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
                    borderTop: "1px solid #ffd700",
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
