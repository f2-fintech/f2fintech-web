import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import { FaFacebook } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { IoLogoWhatsapp } from "react-icons/io";
import { AiFillInstagram } from "react-icons/ai";
import { useTheme } from "@mui/material/styles";
import ChannelPartnerModal from "../channelPartners/ChannelPartnerModal";
import CareersModal from "../careers/CareersModal";

const Footer = () => {
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  const theme = useTheme();
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [isCareersModalOpen, setIsCareersModalOpen] = useState(false);
  return (
    <>
      <Container
        id="footer"
        maxWidth={false}
        sx={{
          background: theme.palette.secondary.main,
          textDecoration: "none",
          padding: "20px",
          position: "relative",
          zIndex: 1100,
        }}
      >
        <Box sx={{ px: { xs: 2, sm: 6 }, py: 4 }}>
          <Grid
            container
            spacing={4}
            justifyContent="space-between"
            sx={{ textAlign: { xs: "center", sm: "left" } }}
          >
            <Grid item xs={12} sm="auto">
              <Typography
                sx={{
                  marginBottom: "1rem",
                  fontSize: "2rem",
                  fontFamily: "DM sans",
                  fontWeight: 650,
                }}
              >
                <Link
                  to="/"
                  style={{
                    color: theme.palette.whitetext.white,
                    textDecoration: "none",
                  }}
                >
                  F2 Fintech
                </Link>
              </Typography>

              <Typography
                sx={{
                  color: theme.palette.whitetext.white,
                  lineHeight: "1.5rem",
                  fontSize: ".9rem",
                  fontFamily: "Poppins",
                }}
              >
                F2 Fintech Pvt Ltd, A-25, M-1 Arv Park,<br></br> A-Block, Sector 63,
                Noida <br></br>+91 8810600135 , +91 8860600555
              </Typography>
            </Grid>
            <Grid item xs={12} sm="auto">
              <Typography
                sx={{
                  fontWeight: 650,
                  color: theme.palette.whitetext.white,
                  marginBottom: ".5rem",
                  fontSize: "1.3rem",
                  fontFamily: "DM sans",
                }}
              >
                Company
              </Typography>
              <Box>
                {[
                  "About us",
                  "Privacy Policy",
                  "Terms & Condition",
                  "Blogs",
                  "Brochures",
                  "FAQ",
                  "Careers",
                  "Become Channel Partner",
                ].map((text, index) => {
                  const isChannelPartnerModal = text === "Become Channel Partner";
                  const isCareersModal = text === "Careers";
                  const isAnyModal = isChannelPartnerModal || isCareersModal;
                  return (
                    <Typography
                      key={index}
                      sx={{ lineHeight: "2rem", fontSize: "1rem" }}
                    >
                      {isAnyModal ? (
                        <Box
                          component="span"
                          onClick={() => {
                            if (isChannelPartnerModal) setIsPartnerModalOpen(true);
                            if (isCareersModal) setIsCareersModalOpen(true);
                          }}
                          style={{
                            color: theme.palette.whitetext.white,
                            textDecoration: "none",
                            fontSize: ".9rem",
                            fontFamily: "Poppins",
                            cursor: "pointer",
                            transition: "color 0.3s ease",
                          }}
                          onMouseEnter={(e) =>
                            (e.target.style.color = "#FFD700")
                          }
                          onMouseLeave={(e) => (e.target.style.color = "white")}
                        >
                          {text}
                        </Box>
                      ) : (
                        <Link
                          to={`/${text.replace(/\s+/g, "-").toLowerCase()}`}
                          style={{
                            color: theme.palette.whitetext.white,
                            textDecoration: "none",
                            fontSize: ".9rem",
                            fontFamily: "Poppins",
                          }}
                          onMouseEnter={(e) =>
                            (e.target.style.color = "#FFD700")
                          }
                          onMouseLeave={(e) => (e.target.style.color = "white")}
                        >
                          {text}
                        </Link>
                      )}
                    </Typography>
                  );
                })}
              </Box>

            </Grid>
            <Grid item xs={12} sm="auto">
              <Typography
                sx={{
                  fontWeight: 650,
                  color: theme.palette.whitetext.white,
                  marginBottom: ".5rem",
                  fontSize: "1.3rem",
                  fontFamily: "DM sans",
                }}
              >
                Products
              </Typography>
              <Box>
                {[
                  "Doctor Loan",
                  "Home Loan",
                  "Business Loan",
                  "Personal Loan",
                  "Loan Against Property",
                ].map((product, index) => (
                  <Typography
                    key={index}
                    sx={{ lineHeight: "2rem", fontSize: "1rem" }}
                  >
                    <Link
                      to={`/${product.replace(/\s+/g, "-").toLowerCase()}`}
                      style={{
                        color: theme.palette.whitetext.white,
                        textDecoration: "none",
                        fontSize: ".9rem",
                        fontFamily: "Poppins",
                      }}
                      // onClick={topFunction}
                      onMouseEnter={(e) => (e.target.style.color = "#FFD700")}
                      onMouseLeave={(e) => (e.target.style.color = "white")}
                    >
                      {product}
                    </Link>
                  </Typography>
                ))}
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm="auto"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", sm: "flex-start" },
              }}
            >
              <Box
                component="a"
                href="https://dunsregistered.dnb.com/DunsRegisteredProfileAnywhere.aspx?Key1=3201911&PaArea=Email"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  position: "relative",
                  width: "160px",
                  marginBottom: "1.5rem",
                  display: "block",
                  mx: { xs: "auto", sm: 0 },
                  transition: "transform 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <Box
                  component="img"
                  src="/QRlogo.png"
                  alt="D&B Registered"
                  sx={{
                    width: "100%",
                    display: "block",
                    backgroundColor: "white",
                    borderRadius: "8px",
                    padding: "8px",
                  }}
                />
                {/* Blinking "Click Here" Overlay */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: "10%",
                    left: "8%",
                    width: "84%",
                    height: "28%",
                    backgroundColor: "#004a77", // D&B Navy Blue match
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "6px",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    pointerEvents: "none",
                    animation: "blink-click-here 2s infinite ease-in-out",
                    "@keyframes blink-click-here": {
                      "0%, 45%": { opacity: 0 },
                      "50%, 100%": { opacity: 1 }
                    }
                  }}
                >
                  Click Here
                </Box>
              </Box>
              <Typography
                sx={{
                  fontWeight: 650,
                  color: theme.palette.whitetext.white,
                  marginBottom: ".5rem",
                  fontSize: "1.3rem",
                  fontFamily: "DM sans",
                }}
              >
                Let's Connect
              </Typography>

              <Stack
                direction="row"
                justifyContent={{ xs: "center", sm: "flex-start" }}
                spacing={2}
                sx={{ mt: 2, color: "white" }}
              >
                <a
                  href="https://www.facebook.com/f2fintech/"
                  target="_blank"
                  style={{ color: "inherit" }}
                >
                  <FaFacebook size={19} />
                </a>
                <a
                  href="https://www.youtube.com/channel/UCMyV4yKd27_Vx3Sq2FSDN5A"
                  target="_blank"
                  style={{ color: "inherit" }}
                >
                  <IoLogoYoutube size={21} />
                </a>
                <a
                  href="https://www.instagram.com/f2fintech/"
                  target="_blank"
                  style={{ color: "inherit" }}
                >
                  <AiFillInstagram size={21} />
                </a>
                <a
                  href="https://www.linkedin.com/company/f2fintech"
                  target="_blank"
                  style={{ color: "inherit" }}
                >
                  <LinkedInIcon />
                </a>
                <a
                  href="https://wa.me/918810600135"
                  target="_blank"
                  style={{ color: "inherit" }}
                >
                  <IoLogoWhatsapp size={21} />
                </a>
              </Stack>
            </Grid>
          </Grid>
          <Box
            sx={{
              borderTop: "1px solid #fff",
              pt: { xs: 1, md: 3 },
              mt: { xs: 2, md: 4 },
              pb: { xs: 3, md: 4 },
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                color: theme.palette.whitetext.white,
                fontSize: { xs: ".7rem", sm: ".8rem", md: ".9rem" },
                fontFamily: "Poppins",
              }}
            >
              © 2025 All Rights Reserved by F2 Fintech
            </Typography>
          </Box>
        </Box>
      </Container>
      <ChannelPartnerModal
        open={isPartnerModalOpen}
        onClose={() => setIsPartnerModalOpen(false)}
      />
      <CareersModal
        open={isCareersModalOpen}
        onClose={() => setIsCareersModalOpen(false)}
      />
    </>
  );
};

export default Footer;
