import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Container, Typography, Box, Grid } from "@mui/material";

import "../../App.css";
import { faqData } from "../data/Data.jsx";

const Faq = () => {
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
            fontWeight: "600",
            marginBottom: "20px",
            marginLeft: "12px",
            fontSize: { xs: "1.5rem", sm: "2rem" },
            lineHeight: "1.50rem",
            textAlign: "center",
            fontFamily: "DM sans",
            color: "#FFD700",
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
                    borderTop: "1px solid #07399f",
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
