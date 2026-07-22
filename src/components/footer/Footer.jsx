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
                  fontFamily: "DM Sans",
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
                  fontFamily: "DM Sans",
                }}
              >
                Company
              </Typography>
              <Box>
                {[
                  "About us",
                  "Blogs",
                  "Brochures",
                  "FAQ",
                  "Careers",
                  "Contact Us",
                ].map((text, index) => {
                  const isChannelPartnerModal = text === "Contact Us";
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
                          to={`/${text.replace(/\s*&\s*/g, " and ").replace(/\s+/g, "-").toLowerCase()}`}
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
                  fontFamily: "DM Sans",
                }}
              >
                Legal & Policy
              </Typography>
              <Box>
                {[
                  "Compliance",
                  "Fair Practices Code",
                  "Grievance Policy",
                  "Privacy Policy",
                  "Terms and Condition",
                  "Cookie Settings",
                ].map((text, index) => {
                  const isCookieSettings = text === "Cookie Settings";
                  return (
                    <Typography
                      key={index}
                      sx={{ lineHeight: "2rem", fontSize: "1rem" }}
                    >
                      {isCookieSettings ? (
                        <Box
                          component="span"
                          onClick={() => {
                            window.dispatchEvent(new Event("open-cookie-settings"));
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
                          to={`/${text.replace(/\s*&\s*/g, " and ").replace(/\s+/g, "-").toLowerCase()}`}
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
                  fontFamily: "DM Sans",
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
                  "Doctors and Professionals",
                  "Check Cibil Score",
                  "Eligibility Checker",
                  "DSA Partner",
                  "Realtor Partner",
                ].map((product, index) => (
                  <Typography
                    key={index}
                    sx={{ lineHeight: "2rem", fontSize: "1rem" }}
                  >
                    <Link
                      to={
                        product === "Doctors and Professionals" || product === "Doctors & Professionals"
                          ? "/doctors-and-professionals"
                          : product === "DSA Partner"
                          ? "/dsa"
                          : product === "Realtor Partner"
                          ? "/realtor"
                          : `/${product.replace(/\s+/g, "-").toLowerCase()}`
                      }
                      style={{
                        color: theme.palette.whitetext.white,
                        textDecoration: "none",
                        fontSize: ".9rem",
                        fontFamily: "Poppins",
                      }}
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
                  src="/QRlogo-123.webp"
                  alt="D&B Registered"
                  loading="lazy"
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
                  fontFamily: "DM Sans",
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
                  aria-label="Follow us on Facebook"
                >
                  <FaFacebook size={19} />
                </a>
                <a
                  href="https://www.youtube.com/channel/UCMyV4yKd27_Vx3Sq2FSDN5A"
                  target="_blank"
                  style={{ color: "inherit" }}
                  aria-label="Follow us on YouTube"
                >
                  <IoLogoYoutube size={21} />
                </a>
                <a
                  href="https://www.instagram.com/f2fintech/"
                  target="_blank"
                  style={{ color: "inherit" }}
                  aria-label="Follow us on Instagram"
                >
                  <AiFillInstagram size={21} />
                </a>
                <a
                  href="https://www.linkedin.com/company/f2fintech"
                  target="_blank"
                  style={{ color: "inherit" }}
                  aria-label="Follow us on LinkedIn"
                >
                  <LinkedInIcon />
                </a>
                <a
                  href="https://wa.me/918810600135"
                  target="_blank"
                  style={{ color: "inherit" }}
                  aria-label="Contact us on WhatsApp"
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
                color: "rgba(255, 255, 255, 0.7)",
                fontSize: { xs: ".65rem", sm: ".75rem", md: ".8rem" },
                fontFamily: "Poppins",
                mb: 1.5,
              }}
            >
              Serving Noida, Delhi, Gurgaon, Ghaziabad, Faridabad, Greater Noida, and all major cities across India.
            </Typography>
            <Typography
              sx={{
                color: theme.palette.whitetext.white,
                fontSize: { xs: ".7rem", sm: ".8rem", md: ".9rem" },
                fontFamily: "Poppins",
              }}
            >
              © 2026 All Rights Reserved by F2 Fintech
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
