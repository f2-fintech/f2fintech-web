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
        position: "relative",
        // background: "linear-gradient(-45deg, #333333, #333333)",
        background: "linear-gradient(to right, #6b0668, #930b8e)",
        borderRadius: "20px",
        padding: { xs: "20px", sm: "40px" }, // Padding adjusted for small screens
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        color: "white",
        width: "90%",
        margin: "auto",
        height: { xs: "auto", sm: "42vh" }, // Adjust height on mobile
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
          textAlign: "center", // Centers the text
        }}
      >
        <Typography variant="h1" fontWeight="bold" fontFamily="Poppins">
          Let's Talk
        </Typography>
        <Typography
          variant="h3"
          sx={{
            lineHeight: "1.4",
            fontSize: { xs: "18px", sm: "21px" }, // Font size adjusted for smaller screens
            marginTop: "10px",
          }}
        >
          For occasional updates, news, and events
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
          height: { xs: "10vh", sm: "400px" }, // Adjusts height on smaller screens
          width: { xs: "100%", sm: "400px" }, // Adjust width on smaller screens
          flexDirection: { xs: "row", sm: "row" }, // Stack input and button on mobile
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        {/* Input Field */}
        <TextField
          variant="standard"
          placeholder="Enter your email"
          InputProps={{
            disableUnderline: true, // Removes default underline
            sx: {
              color: "white", // Light grey placeholder text
              padding: "10px 15px",
              height: "60px",
              borderRadius: "50px",
              backgroundColor: "#3d3d3d", // Slightly lighter input background
              flexGrow: 1,
            },
          }}
          sx={{
            flexGrow: 1,
            marginBottom: { sm: "0" }, // Adds margin at the bottom on mobile
          }}
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
      </Box>
      <Box
        component="img"
        src="/arrow.svg" // Example arrow image
        alt="Arrow"
        sx={{
          position: "absolute",
          top: {
            xs: 130,
            sm: 140,
            md: 150,
            xl: 160,
          },
          right: {
            xs: 10,
            sm: 50,
            md: 300,
            xl: 500,
          },
          width: { xs: "50px", sm: "70px" }, // Smaller size for mobile
          height: { xs: "50px", sm: "70px" },
          marginLeft: { xs: "0", sm: "10px" }, // Margin adjusted on larger screens
        }}
      />
    </Box>
  );
};

export default EmailEnter;
