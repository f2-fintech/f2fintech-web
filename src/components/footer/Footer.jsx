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
        background: "#032261",
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
              variant="h1"
              sx={{
                fontWeight: "800",
                color: "white",
                marginBottom: "1rem",
                textDecoration: "none",
                fontSize: "2rem",
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
                fontWeight: "600",
                color: "white",
                marginBottom: "1rem",
                textDecoration: "none",
                fontSize: "1.2rem",
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
                  fontSize: ".8rem",
                }}
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
                variant="h6"
                style={{
                  color: "white",
                  marginBottom: "1rem",
                  textDecoration: "none",
                  fontSize: ".8rem",
                }}
                onClick={topFunction}
              >
                Privacy Policy
              </Link>
            </Typography>
            <Typography
              variant="h3"
              sx={{ lineHeight: "2rem", fontSize: "1rem" }}
            >
              <Link
                variant="h6"
                style={{
                  color: "white",
                  marginBottom: "1rem",
                  textDecoration: "none",
                  fontSize: ".8rem",
                }}
                onClick={topFunction}
              >
                Term & Condition
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
                fontWeight: "600",
                color: "white",
                marginBottom: "1rem",
                textDecoration: "none",
                fontSize: "1.2rem",
              }}
            >
              Products
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
                  textDecoration: "none",
                  fontSize: ".8rem",
                }}
                onClick={topFunction}
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
                  textDecoration: "none",
                  fontSize: ".8rem",
                }}
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
                  textDecoration: "none",
                  fontSize: ".8rem",
                }}
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
                  fontSize: ".8rem",
                  textDecoration: "none",
                }}
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
                  fontSize: ".8rem",
                  textDecoration: "none",
                }}
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
                  fontSize: ".8rem",
                  textDecoration: "none",
                }}
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
                fontWeight: "600",
                color: "white",
                marginBottom: "1rem",
                textDecoration: "none",
                fontSize: "1.2rem",
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
                  textDecoration: "none",
                  fontSize: ".8rem",
                }}
                onClick={topFunction}
              >
                Have any doubts?
              </Link>
            </Typography>
            <Typography
              variant="h3"
              sx={{ lineHeight: "2rem", fontSize: "1rem" }}
            >
              <Link
                variant="h6"
                style={{
                  color: "white",
                  marginBottom: "1rem",
                  textDecoration: "none",
                  fontSize: ".8rem",
                }}
                onClick={topFunction}
              >
                Contact Us
              </Link>
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
                }}
                InputLabelProps={{
                  style: { color: "#fff", background: "#032261" },
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
                }}
              >
                Submit
              </Button>
            </Box>
            <Stack
              direction="row"
              spacing={3}
              sx={{ color: "white", cursor: "pointer" }}
            >
              <a
                href="https://www.facebook.com/f2fintech?mibextid=rS40aB7S9Ucbxw6v"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <FacebookOutlinedIcon />
              </a>
              <a
                href="https://www.youtube.com/@F2Fintech"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <YouTubeIcon />
              </a>
              <a
                href="https://in.linkedin.com/company/f2fintech"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <LinkedInIcon />
              </a>
              <a
                href="https://www.instagram.com/f2fintech?igsh=MTNhaGFwZWh1enQ5dw=="
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <InstagramIcon />
              </a>
            </Stack>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "40px 0px",
            borderTop: "1px solid #c4c4c4",
          }}
        >
          <Box sx={{ width: "30%" }}>
            <Typography
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: ".8rem",
              }}
            >
              © 2024 All Rights Reserved by f2fintech
            </Typography>
          </Box>
          <Box sx={{ width: "70%" }}>
            <Typography
              style={{
                color: "white",
                fontSize: ".8rem",
                textDecoration: "none",
              }}
            >
              f2fintech is a platform that connects businesses with lending
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
