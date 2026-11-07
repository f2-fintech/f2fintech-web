import { Box, Typography, Button, TextField } from "@mui/material";
// import ButtonComp from "./common/button/Button";

const EmailEnter = () => {
  return (
    <Box
      sx={{
        paddingTop: "10px",
        paddingBottom: "15px",
        position: "relative",
        background: "linear-gradient(135deg, #fff 0%, #fff 100%)",
        boxShadow:
          "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
        borderRadius: "24px",
        padding: { xs: "32px 20px", sm: "48px 40px" },
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        width: { xs: "100%", sm: "95%", md: "93%" },
        margin: "0 auto",
        textAlign: "center",
        overflow: "hidden",
        zIndex: 60,
        "&:after": {
          content: '""',
          position: "absolute",
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "rgba(50, 68, 230, 0.05)",
        },
      }}
    >
      {/* Header Section */}
      <Box sx={{ maxWidth: "700px" }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            fontWeight: 800,
            fontFamily: "Poppins, sans-serif",
            background: "linear-gradient(90deg, #3244e6, #3244e6)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            lineHeight: 1.2,
            mb: 2,
          }}
        >
          Stay Informed
        </Typography>

        <Typography
          variant="subtitle1"
          fontFamily="Poppins"
          sx={{
            color: "#4a5568",
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.3rem" },
            lineHeight: 1.6,
            mb: 4,
            px: { xs: 1, sm: 0 },
          }}
        >
          Subscribe for financial insights, product updates, and lending news.
        </Typography>
      </Box>

      {/* Email Form Section */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "600px",
          mt: 4,
        }}
      >
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            width: "100%",
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Your email address"
            inputProps={{
              "aria-label": "Your email address",
            }}
            InputProps={{
              sx: {
                backgroundColor: "white",
                borderRadius: "50px",
                height: "56px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                border: "1px solid #3244e6",

                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {},
              },
            }}
            sx={{
              flexGrow: 1,
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#4361ee",
              color: "white",
              borderRadius: "50px",
              height: "56px",
              px: 4,
              fontSize: "1rem",
              fontWeight: 600,
              fontFamily: "Poppins, sans-serif",
              textTransform: "none",
              boxShadow: "0 4px 6px rgba(67, 97, 238, 0.3)",
              "&:hover": {
                backgroundColor: "#3244e6",
                boxShadow: "0 6px 8px rgba(67, 97, 238, 0.4)",
              },
              minWidth: { xs: "100%", sm: "160px" },
            }}
          >
            Subscribe
          </Button>
        </Box>

        <Typography
          variant="caption"
          sx={{
            display: "block",
            color: "#718096",
            mt: 2,
            fontSize: "0.8rem",
          }}
        >
          We respect your privacy. Unsubscribe at any time.
        </Typography>
      </Box>
    </Box>
  );
};

export default EmailEnter;
