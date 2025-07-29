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
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useTheme } from "@mui/material/styles";

const Footer = () => {
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  const theme = useTheme();
  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          background: theme.palette.secondary.main,
          textDecoration: "none",
          padding: "20px",
        }}
      >
        <Box sx={{ px: { xs: 2, md: 6 }, py: 4 }}>
          <Grid
            container
            spacing={4}
            sx={{ textAlign: { xs: "center", md: "left" } }}
          >
            <Grid item xs={12} md={3}>
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
                  // onClick={topFunction}
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
                F2 Fintech Pvt Ltd, A-25, M-1 Arv Park, A-Block, Sector 63,
                Noida +918810600135
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
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
                ].map((text, index) => (
                  <Typography
                    key={index}
                    sx={{ lineHeight: "2rem", fontSize: "1rem" }}
                  >
                    <Link
                      to={`/${text.replace(/\s+/g, "-").toLowerCase()}`}
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
                      {text}
                    </Link>
                  </Typography>
                ))}
              </Box>
              {/* <Box>
                {[
                  "Business Loan Blogs",
                  "Personal Loan Blogs",
                  "Over Draft Blogs",
                ].map((products, index) => (
                  <Typography
                    key={index}
                    sx={{ lineHeight: "2rem", fontSize: "1rem" }}
                  >
                    <Link
                      to={`/${products.replace(/\s+/g, "-").toLowerCase()}`}
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
                      {products}
                    </Link>
                  </Typography>
                ))}
              </Box> */}
            </Grid>
            <Grid item xs={12} md={3}>
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
                  "Business Loan",
                  "MSME Loan",
                  "Small Business Loan",
                  "Unsecured Business Loan",
                  "Business Loan For Women",
                  "ECommerce Business Loan",
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
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              item
              xs={12}
              md={3}
            >
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
              {/* <TextField
              fullWidth
              label="Enter Email"
              variant="outlined"
              sx={{
                background: "transparent",
                borderColor: "white",
                borderRadius: "6px",
                "& .MuiInputBase-root": {
                  color: "white",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#FFD700",
                },
                "& .MuiInputLabel-root": {
                  color: "#fff",
                },
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
              }}
            >
              Submit
            </Button> */}

              <Stack
                direction="row"
                justifyContent="center"
                spacing={2}
                sx={{ mt: 2, color: "white" }}
              >
                <a href="#" target="_blank" style={{ color: "inherit" }}>
                  <FacebookOutlinedIcon />
                </a>
                <a href="#" target="_blank" style={{ color: "inherit" }}>
                  <YouTubeIcon />
                </a>
                <a href="#" target="_blank" style={{ color: "inherit" }}>
                  <InstagramIcon />
                </a>
                <a href="#" target="_blank" style={{ color: "inherit" }}>
                  <LinkedInIcon />
                </a>
              </Stack>
            </Grid>
          </Grid>
          <Box
            sx={{
              borderTop: "1px solid #fff", // Keep the border at the top
              pt: { xs: 1, md: 3 }, // Padding-top for mobile and desktop
              mt: { xs: 2, md: 4 }, // Margin-top to give space
              pb: { xs: 3, md: 4 }, // Add bottom padding to avoid clipping
              textAlign: "center", // Center the text
            }}
          >
            <Typography
              sx={{
                color: theme.palette.whitetext.white,
                fontSize: { xs: ".7rem", sm: ".8rem", md: ".9rem" }, // Responsive font size
                fontFamily: "Poppins",
              }}
            >
              © 2025 All Rights Reserved by F2 Fintech
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Footer;
