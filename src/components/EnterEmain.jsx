import React from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
// import ButtonComp from "./common/button/Button";

const EmailEnter = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(-45deg, #333333, #333333)",
        borderRadius: "20px",
        padding: "40px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        color: "white",
        width: "90%",
        margin: "auto",
        height: "42vh",
        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
        marginBottom: "15vh",
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
        <Typography variant="h1" fontWeight="bold" fontFamily="Poppins">
          Lets' Talk
        </Typography>
        <Typography
          variant="h3"
          sx={{ lineHeight: "1.4", fontSize: "21px", marginTop: "10px" }}
        >
          For occasional updates, news and events
        </Typography>
      </Box>

      {/* Right Section - Button with Arrow */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#333", // Dark background
          borderRadius: "50px",
          border: "1px solid",
          padding: "5px",
          marginTop: "20px",
          height: "400px",
          width: "400px",
        }}
      >
        {/* Input Field */}
        <TextField
          variant="standard"
          placeholder="Enter your email"
          InputProps={{
            disableUnderline: true, // Removes default underline
            sx: {
              color: "#b0b0b0", // Light grey placeholder text
              padding: "10px 15px",
              height: "60px",
              borderRadius: "50px",
              backgroundColor: "#3d3d3d", // Slightly lighter input background
              flexGrow: 1,
            },
          }}
          sx={{ flexGrow: 1 }}
        />

        {/* Subscribe Button */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "white",
            color: "black",
            borderRadius: "50px",
            padding: "10px 15px",
            height: "60px",
            width: "80px",
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

        {/* Hand-drawn arrow (Optional) */}
        <Box
          component="img"
          src="/arrow.svg" // Example arrow image
          alt="Arrow"
          sx={{ width: 70, height: 70, marginLeft: "10px" }}
        />
      </Box>
    </Box>
  );
};

export default EmailEnter;
