import {
  Box,
  Button,
  Container,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";

export default function HowToApply() {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "900px",
        minWidth: "100%",
        padding: "50px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          height: "100%",
          // width: "100%",
        }}
      >
        <Box sx={{ width: "50%", height: "100%" }}>
          <Typography
            variant="h2"
            sx={{
              marginLeft: "80px",
              lineHeight: "5rem",
              fontWeight: "700",
              marginTop: "5px",
            }}
          >
            How to apply for a business loan with F2 Fintech
          </Typography>
          <Typography
            variant="h4"
            sx={{
              marginLeft: "80px",
              lineHeight: "1.25rem",
              fontSize: "1.5rem",
              marginTop: "3rem",
              marginBottom: "1.25rem",
            }}
          >
            Get your business loan disbursed to your bank account in just three
            simple steps:
          </Typography>
          <Typography
            variant="h4"
            sx={{
              marginLeft: "80px",
              lineHeight: "1.25rem",
              fontSize: "1.1rem",
              marginTop: "5rem",
              marginBottom: "1.25rem",
            }}
          >
            <FormControlLabel
              // value="female"
              control={<Radio />}
              label="Enter your personal, business & bank details to get a business
              loan offer"
            />
          </Typography>
          <Typography
            variant="h4"
            sx={{
              marginLeft: "80px",
              lineHeight: "1.25rem",
              fontSize: "1.1rem",
              marginTop: "3rem",
              marginBottom: "1.25rem",
            }}
          >
            <FormControlLabel
              // value="female"
              control={<Radio />}
              label="Accept the business loan offer & complete your documentation &
              KYC"
            />
          </Typography>
          <Typography
            variant="h4"
            sx={{
              marginLeft: "80px",
              lineHeight: "1.25rem",
              fontSize: "1.1rem",
              marginTop: "3rem",
              marginBottom: "1.25rem",
            }}
          >
            <FormControlLabel
              // value="female"
              control={<Radio />}
              label="Choose from flexible repayment options and start receiving funds"
            />
          </Typography>
          <Box
            sx={{
              backgroundColor: "rgba(102, 51, 153)",
              height: "40px",
              width: "200px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "25px",
              margin: "80px",
            }}
          >
            <Button
              sx={{
                color: "white",
                fontWeight: "500",
                height: "40px",
                width: "400px",
              }}
            >
              Apply now
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            width: "50%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            style={{ height: "600px", width: "100%" }}
            src="howtoapply01.webp"
          />
        </Box>
      </Box>
    </Container>
  );
}
