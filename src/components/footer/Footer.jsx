import { Link } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Stack,
  Button,
  TextField,
} from "@mui/material";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  return (
    <Container
      maxWidth="false"
      sx={{
        background: "#000000",
        textDecoration: "none",
      }}
    >
      <Box
        sx={{
          paddingRight: "60px",
          paddingLeft: "60px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "40px 0px",
          }}
        >
          <Box width={350} alignItems="center" sx={{ textDecoration: "none" }}>
            <Typography
              sx={{
                color: "white",
                marginBottom: "1rem",
                textDecoration: "none",
                fontSize: "2rem",
                fontFamily: "DM sans",
                fontWeight: "650",
              }}
            >
              <Link
                to="/"
                variant="h6"
                style={{
                  color: "white",
                  marginBottom: "1rem",
                  textDecoration: "none",
                }}
                onClick={topFunction}
              >
                F2 Fintech
              </Link>
            </Typography>
            <Typography
              variant="h3"
              sx={{
                color: "white",
                lineHeight: "1.5rem",
                textDecoration: "none",
                fontSize: ".9rem",
                fontFamily: "Poppins",
                fontWeight: "440",
              }}
            >
              F2 Fintech Pvt Ltd, A-25, M-1 Arv Park, A-Block, Sector 63, Noida
              +918810600135
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              textDecoration: "none",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: "650",
                color: "white",
                marginBottom: ".1rem",
                textDecoration: "none",
                fontSize: "1.3rem",
                fontFamily: "DM sans",
              }}
            >
              Company
            </Typography>
            <Typography
              variant="h3"
              sx={{ lineHeight: "2rem", fontSize: "1rem" }}
            >
              <Link
                to="/aboutus"
                style={{
                  color: "white",
                  marginBottom: "1rem",
                  underline: "none",
                  textDecoration: "none",
                  fontSize: ".9rem",
                  fontFamily: "Poppins",
                  fontWeight: "500",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#FFD700")}
                onMouseLeave={(e) => (e.target.style.color = "white")}
              >
                About us
              </Link>
            </Typography>
            <Typography
              variant="h3"
              sx={{ lineHeight: "2rem", fontSize: "1rem" }}
            ></Typography>
            <Typography
              variant="h3"
              sx={{ lineHeight: "2rem", fontSize: "1rem" }}
            >
              <Link
                to="/privacy"
                variant="h6"
                style={{
                  color: "white",
                  marginBottom: "1rem",
                  underline: "none",
                  textDecoration: "none",
                  fontSize: ".9rem",
                  fontFamily: "Poppins",
                  fontWeight: "500",
                }}
                onClick={topFunction}
                onMouseEnter={(e) => (e.target.style.color = "#FFD700")}
                onMouseLeave={(e) => (e.target.style.color = "white")}
              >
                Privacy Policy
              </Link>
            </Typography>
            <Typography
              variant="h3"
              sx={{ lineHeight: "2rem", fontSize: "1rem" }}
            >
              <Link
                to="/terms"
                variant="h6"
                style={{
                  color: "white",
                  marginBottom: "1rem",
                  underline: "none",
                  textDecoration: "none",
                  fontSize: ".9rem",
                  fontFamily: "Poppins",
                  fontWeight: "500",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#FFD700")}
                onMouseLeave={(e) => (e.target.style.color = "white")}
                onClick={topFunction}
              >
                Terms & Condition
              </Link>
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              textDecoration: "none",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: "650",
                color: "white",
                marginBottom: ".1rem",
                textDecoration: "none",
                fontSize: "1.3rem",
                fontFamily: "DM sans",
              }}
            >
              Products
            </Typography>
            <Typography
              variant="h3"
              sx={{ lineHeight: "2rem", fontSize: "1rem" }}
            >
              <Link
                to="/doctor-loan"
                variant="h6"
                style={{
                  color: "white",
                  marginBottom: "1rem",
                  underline: "none",
                  textDecoration: "none",
                  fontSize: ".9rem",
                  fontFamily: "Poppins",
                  fontWeight: "500",
                }}
                onClick={topFunction}
                onMouseEnter={(e) => (e.target.style.color = "#FFD700")}
                onMouseLeave={(e) => (e.target.style.color = "white")}
              >
                Doctor Loan
              </Link>
            </Typography>

            <Typography
              variant="h3"
              sx={{ lineHeight: "2rem", fontSize: "1rem" }}
            >
              <Link
                to="/business-loan#about-business-loans"
                variant="h6"
                style={{
                  color: "white",
                  marginBottom: "1rem",
                  underline: "none",
                  textDecoration: "none",
                  fontSize: ".9rem",
                  fontFamily: "Poppins",
                  fontWeight: "500",
                }}
                onClick={topFunction}
                onMouseEnter={(e) => (e.target.style.color = "#FFD700")}
                onMouseLeave={(e) => (e.target.style.color = "white")}
              >
                Business Loan
              </Link>
            </Typography>
            <Typography
              variant="h3"
              sx={{ lineHeight: "2rem", fontSize: "1rem" }}
            >
              <Link
                to="/msme-loan#about-msme-loans"
                variant="h6"
                style={{
                  color: "white",
                  marginBottom: "1rem",
                  underline: "none",
                  textDecoration: "none",
                  fontSize: ".9rem",
                  fontFamily: "Poppins",
                  fontWeight: "500",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#FFD700")}
                onMouseLeave={(e) => (e.target.style.color = "white")}
                onClick={topFunction}
              >
                MSME Loan
              </Link>
            </Typography>
            <Typography
              variant="h3"
              sx={{ lineHeight: "2rem", fontSize: "1rem" }}
            >
              <Link
                to="/small-business-loan#about-small-business-loans"
                variant="h6"
                style={{
                  color: "white",
                  marginBottom: "1rem",
                  underline: "none",
                  textDecoration: "none",
                  fontSize: ".9rem",
                  fontFamily: "Poppins",
                  fontWeight: "500",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#FFD700")}
                onMouseLeave={(e) => (e.target.style.color = "white")}
                onClick={topFunction}
              >
                Small Business Loan
              </Link>
            </Typography>
            <Typography
              variant="h3"
              sx={{ lineHeight: "2rem", fontSize: "1rem" }}
            >
              <Link
                to="/unsecured-loan#about-unsecured-loans"
                variant="h6"
                style={{
                  color: "white",
                  marginBottom: "1rem",
                  underline: "none",
                  textDecoration: "none",
                  fontSize: ".9rem",
                  fontFamily: "Poppins",
                  fontWeight: "500",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#FFD700")}
                onMouseLeave={(e) => (e.target.style.color = "white")}
                onClick={topFunction}
              >
                Unsecured Business Loan
              </Link>
            </Typography>
            <Typography
              variant="h3"
              sx={{ lineHeight: "2rem", fontSize: "1rem" }}
            >
              <Link
                to="/business-loan-for-women#about-business-loans-for-women"
                style={{
                  color: "white",
                  marginBottom: "1rem",
                  underline: "none",
                  textDecoration: "none",
                  fontSize: ".9rem",
                  fontFamily: "Poppins",
                  fontWeight: "500",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#FFD700")}
                onMouseLeave={(e) => (e.target.style.color = "white")}
                onClick={topFunction}
              >
                Business Loan For Women
              </Link>
            </Typography>
            <Typography
              variant="h3"
              sx={{ lineHeight: "2rem", fontSize: "1rem" }}
            >
              <Link
                to="/ecommerce-business-loan#about-ecommerce-business-loans"
                style={{
                  color: "white",
                  marginBottom: "1rem",
                  underline: "none",
                  textDecoration: "none",
                  fontSize: ".9rem",
                  fontFamily: "Poppins",
                  fontWeight: "500",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#FFD700")}
                onMouseLeave={(e) => (e.target.style.color = "white")}
                onClick={topFunction}
              >
                E-Commerce Business Loan
              </Link>
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              textDecoration: "none",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: "650",
                color: "white",
                marginBottom: ".1rem",
                textDecoration: "none",
                fontSize: "1.3rem",
                fontFamily: "DM sans",
              }}
            >
              Let's Talk
            </Typography>
            <Typography
              variant="h3"
              sx={{ lineHeight: "2rem", fontSize: "1rem" }}
            >
              <Link
                variant="h6"
                to="/query"
                style={{
                  color: "white",
                  marginBottom: "1rem",
                  underline: "none",
                  textDecoration: "none",
                  fontSize: ".9rem",
                  fontFamily: "Poppins",
                  fontWeight: "500",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#FFD700")}
                onMouseLeave={(e) => (e.target.style.color = "white")}
                onClick={topFunction}
              >
                Have any doubts?
              </Link>
            </Typography>
            <Typography
              variant="h3"
              sx={{ lineHeight: "2rem", fontSize: "1rem" }}
            >
              <Typography
                variant="h6"
                // to="#"
                style={{
                  color: "white",
                  marginBottom: "1rem",
                  underline: "none",
                  textDecoration: "none",
                  fontSize: ".9rem",
                  fontFamily: "Poppins",
                  fontWeight: "500",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#FFD700")}
                onMouseLeave={(e) => (e.target.style.color = "white")}
                onClick={topFunction}
              >
                Contact Us
              </Typography>
            </Typography>
            <Box sx={{ width: "100%", maxWidth: "100%" }}>
              <TextField
                fullWidth
                label="Enter Email"
                id="fullWidth"
                sx={{
                  background: "transparent",
                  borderColor: "white",
                  border: "1px solid white",
                  borderRadius: "6px",
                  fontFamily: "Poppins",
                  fontWeight: "900",
                }}
                InputLabelProps={{
                  style: { color: "#fff" },
                }}
              />
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  marginTop: "20px",
                  border: "1px solid white",
                  color: "white",
                  height: "40px",
                  marginBottom: "20px",
                  fontFamily: "Poppins",
                }}
              >
                Submit
              </Button>
            </Box>
            <Stack
              direction="row"
              spacing={1}
              sx={{ color: "white", cursor: "pointer" }}
            >
              <a
                href="https://www.facebook.com/f2fintech?mibextid=rS40aB7S9Ucbxw6v"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <FacebookOutlinedIcon
                  sx={{
                    transition: "transform 0.3s ease",
                    transform: "translateY(0)",
                    "&:hover": {
                      transform: "translateY(-10px) ",
                    },
                  }}
                />
              </a>
              <a
                href="https://www.youtube.com/@F2Fintech"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <YouTubeIcon
                  sx={{
                    transition: "transform 0.3s ease",
                    transform: "translateY(0)",
                    "&:hover": {
                      transform: "translateY(-10px)",
                    },
                  }}
                />
              </a>
              <a
                href="https://in.linkedin.com/company/f2fintech"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <LinkedInIcon
                  sx={{
                    transition: "transform 0.3s ease",
                    transform: "translateY(0)",
                    "&:hover": {
                      transform: "translateY(-10px)",
                    },
                  }}
                />
              </a>
              <a
                href="https://www.instagram.com/f2fintech?igsh=MTNhaGFwZWh1enQ5dw=="
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <InstagramIcon
                  sx={{
                    transition: "transform 0.3s ease",
                    transform: "translateY(0)",
                    "&:hover": {
                      transform: "translateY(-10px)",
                    },
                  }}
                />
              </a>
            </Stack>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "40px 0px",
            borderTop: "1px solid #FFD700",
          }}
        >
          <Box sx={{ width: "30%" }}>
            <Typography
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: ".8rem",
                fontFamily: "poppins",
                fontWeight: "500",
              }}
            >
              © 2025 All Rights Reserved by f2fintech
            </Typography>
          </Box>
          <Box sx={{ width: "70%" }}>
            <Typography
              style={{
                color: "white",
                fontSize: ".7rem",
                textDecoration: "none",
                fontFamily: "poppins",
              }}
            >
              F2fintech is a platform that connects businesses with lending
              options offered by RBI-licensed NBFC partners. The loans offered
              on the platform are subject to the terms and conditions and loan
              approval process of the NBFC partners
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Footer;
