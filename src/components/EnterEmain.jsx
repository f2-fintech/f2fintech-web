import { Box, Typography, Button, TextField } from "@mui/material";
// import ButtonComp from "./common/button/Button";

const EmailEnter = () => {
  return (
    <Box
      sx={{
        position: "relative",
        background: "#e1eaf2ff",
        borderRadius: "20px",
        padding: { xs: "20px", sm: "40px" },
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        color: "white",
        width: { xs: "95%", sm: "90%", md: "84%" },
        margin: "auto",
        height: { xs: "auto", sm: "35vh", md: "35vh", lg: "50vh" },
        marginBottom: "10vh",
        marginTop: "10vh",
        textAlign: "center",
      }}
    >
      {/* Left Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          fontSize={{ xs: "30px", sm: "40px", md: "49px" }}
          fontWeight="bold"
          fontFamily="Poppins"
          sx={{ color: "#3244e6" }}
        >
          Let's Talk
        </Typography>

        <Box
          component="img"
          src="/arrow.svg"
          alt="Arrow"
          sx={{
            color: "black",
            position: "relative",
            top: 10,
            width: { xs: "40px", sm: "60px", md: "70px" },
            height: { xs: "15px", sm: "25px", md: "30px" },
            marginLeft: { xs: "0", sm: "10px" },
          }}
        />

        <Typography
          variant="h3"
          sx={{
            color: "#3244e6",
            lineHeight: "1.4",
            fontSize: { xs: "16px", sm: "18px", md: "20px" },
            marginTop: "15px",
            paddingTop: "10px",
            marginX: { xs: "10px", sm: "20px" },
          }}
        >
          For occasional updates, news, and events
        </Typography>
      </Box>

      {/* Right Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#3244e6",
          borderRadius: "50px",
          border: "1px solid",
          padding: "5px",
          marginTop: { xs: "40px", sm: "60px", md: "30px" },
          height: { xs: "auto", sm: "80px", md: "auto" },
          width: { xs: "100%", sm: "80%", md: "60%", lg: "50%" },
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "center",
          gap: { xs: "10px", sm: "10px" },
        }}
      >
        {/* Input Field */}
        <TextField
          variant="standard"
          placeholder="Enter your email"
          autoComplete="off"
          InputProps={{
            disableUnderline: true,
            sx: {
              // color: "white",
              padding: "10px 15px",
              height: "60px",
              textAlign: "center",
              borderRadius: "50px",
              backgroundColor: "#ffffff",
              color: "black",
              flexGrow: 1,
              width: "100%",
            },
          }}
          sx={{
            width: { xs: "90%", sm: "70%" },
            marginBottom: { xs: "0px", sm: "0" },
          }}
        />

        {/* Submit Button */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "white",
            color: "black",
            borderRadius: "50px",
            padding: "10px 15px",
            height: "60px",
            width: { xs: "90%", sm: "auto", md: "100px" },
            fontFamily: "Poppins",
            fontWeight: "600",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#e0e0e0",
            },
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default EmailEnter;
