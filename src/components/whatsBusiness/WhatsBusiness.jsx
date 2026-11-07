import { Box, Button, Container, Typography } from "@mui/material";

export default function WhatsBusiness() {
  return (
    <>
      <Container
        sx={{
          height: "700px",
          minWidth: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ height: "650px", width: "50%" }}>
          <Typography
            sx={{
              lineHeight: "4rem",
              fontWeight: "600",
              fontSize: "3rem",
              height: "250px",
              width: "600px",
              marginLeft: "40px",
              marginTop: "40px",
            }}
          >
            What is a Business Loan<br></br> and Why Should You Consider It?
          </Typography>
          <Box sx={{ height: "50%", width: "100%" }}>
            <img
              style={{
                height: "357px",
                marginLeft: "100px",
              }}
              src="whatsb1.webp"
            />
          </Box>
        </Box>
        <Box sx={{ height: "650px", width: "50%" }}>
          <Typography
            sx={{
              marginBottom: "1rem",
              fontWeight: "100",
              fontSize: "1.3rem",
              lineHeight: "2.5rem",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Business loans are crucial for entrepreneurs aiming to start or grow
            their businesses.
          </Typography>
          <Typography
            sx={{
              marginBottom: "1rem",
              fontWeight: "100",
              fontSize: "1.3rem",
              lineHeight: "2.5rem",
            }}
          >
            It is a comprehensive solution that is aimed at helping Indian
            businesses with quick funds.
          </Typography>
          <Typography
            sx={{
              marginBottom: "1rem",
              fontWeight: "100",
              fontSize: "1.3rem",
              lineHeight: "2.5rem",
            }}
          >
            Open Capitals online business loan is perfect for new businesses,
            serving as a capital source for all your business requirements. The
            business loan interest rate is affordable, ensuring you dont have to
            compromise on essential business expenses.
          </Typography>
          <Typography
            sx={{
              marginBottom: "1rem",
              fontWeight: "100",
              fontSize: "1.3rem",
              lineHeight: "2.5rem",
            }}
          >
            Apply for an instant business loan from Open Capital today, and take
            your business to new heights of success!
          </Typography>
          <Button
            sx={{
              color: "white",
              fontWeight: "500",
              height: "40px",
              width: "250px",
              backgroundColor: "rgb(102 45 153)",
              borderRadius: "25px",
              marginTop: "20px",
              "&:hover": {
                backgroundColor: "rgb(102 45 153)",
                color: "white",
              },
            }}
          >
            {"Start your application"}
          </Button>
        </Box>
      </Container>
    </>
  );
}