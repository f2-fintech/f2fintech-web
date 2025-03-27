import React, { useState } from "react";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import { keyframes, styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import OTPSucess from "./OTPSucess";

// Floating animation
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const FloatingImage = styled("img")({
  animation: `${float} 4s ease-in-out infinite`,
  transition: "all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
});

const QRSuccess = () => {
  const theme = useTheme();
  const [askOtp, setAskOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [mobile, setMobile] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);

  const handleOtp = () => {
    console.log("mobile", mobile);

    // send otp to the mobile logic
    // when otp send setAskOtp true
    setAskOtp(true);
  };

  const verifyOtp = () => {
    console.log("otp", otp);

    // verify otp logic
    // if verified set true
    setOtpVerified(true);
  };

  return (
    <>
      {otpVerified ? (
        <OTPSucess />
      ) : (
        <Box
          sx={{
            height: "80vh", // Changed from minHeight: "100vh"
            display: "flex",
            alignItems: "center",
            background: theme.palette.background.default,
            padding: { xs: 1, md: 2 }, // Reduced padding
          }}
        >
          <Grid
            container
            sx={{
              maxWidth: 1200,
              margin: "0 auto",
              background: theme.palette.background.default,
              borderRadius: 4,
              boxShadow: "0 15px 30px rgba(0, 114, 255, 0.1)",
              overflow: "hidden",
            }}
          >
            {/* Left Side - Text Content */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                padding: { xs: 2, md: 3 }, // Reduced padding
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  color: "#0072FF",
                  fontWeight: 800,
                  mb: 1, // Reduced margin
                  fontFamily: "Urbanist",
                  fontSize: { xs: "1.5rem", md: "2rem" }, // Reduced font size
                  lineHeight: 1.2,
                }}
              >
                Fintech
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  color: "#333",
                  fontWeight: 900,
                  mb: 1, // Reduced margin
                  fontSize: { xs: "1.2rem", md: "1.5rem" }, // Reduced font size
                  transition: "all 0.3s ease",
                  fontFamily: "Urbanist",
                }}
              >
                Long shifts need
                <br />
                strong coffee.
                <br />
                We've got you!
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "#666",
                  mb: 1, // Reduced margin
                  fontSize: "1rem", // Reduced font size
                  fontWeight: 500,
                  fontFamily: "Urbanist",
                  transition: "all 0.3s ease",
                }}
              >
                A quick form, a free snack, and a sip of something good.
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "#666",
                  mb: 1, // Reduced margin
                  fontSize: "1rem", // Reduced font size
                  fontWeight: 500,
                  fontFamily: "Urbanist",
                  transition: "all 0.3s ease",
                }}
              >
                While you enjoy, let's talk about securing your financial
                future.
              </Typography>

              <Box component="form" sx={{ mb: 2 }}>
                {!askOtp ? (
                  <>
                    <TextField
                      fullWidth
                      label="Name"
                      variant="outlined"
                      margin="dense" // Changed from normal
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#0072ff",
                          },
                          "&:hover fieldset": {
                            borderColor: "#005cc5",
                          },
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Qualification"
                      variant="outlined"
                      margin="dense" // Changed from normal
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#0072ff",
                          },
                          "&:hover fieldset": {
                            borderColor: "#005cc5",
                          },
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Mobile Number"
                      variant="outlined"
                      margin="dense" // Changed from normal
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#0072ff",
                          },
                          "&:hover fieldset": {
                            borderColor: "#005cc5",
                          },
                        },
                      }}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    <TextField
                      fullWidth
                      label="Enter OTP"
                      variant="outlined"
                      margin="normal"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#0072ff",
                          },
                          "&:hover fieldset": {
                            borderColor: "#005cc5",
                          },
                        },
                        mb: 3,
                      }}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        backgroundColor: "#0072ff",
                        color: "white",
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 600,
                        fontSize: "1rem",
                        "&:hover": {
                          backgroundColor: "#005cc5",
                        },
                        boxShadow: "0 4px 12px rgba(0, 114, 255, 0.3)",
                      }}
                      onClick={() => verifyOtp()}
                    >
                      Submit
                    </Button>
                  </>
                )}
              </Box>

              {!askOtp && (
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: "#0072ff",
                    color: "white",
                    py: 1, // Reduced padding
                    borderRadius: 2,
                    fontWeight: 600,
                    fontFamily: "Poppins",
                    fontSize: "0.875rem", // Reduced font size
                    "&:hover": {
                      backgroundColor: "#005cc5",
                    },
                    boxShadow: "0 4px 12px rgba(0, 114, 255, 0.3)",
                  }}
                  onClick={handleOtp}
                >
                  Submit
                </Button>
              )}
            </Grid>

            {/* Right Side - Image */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 2, // Reduced padding
                backgroundColor: theme.palette.background.default,
              }}
            >
              <FloatingImage
                src="/cofee.png"
                alt="Cofee Break Illustration"
                sx={{
                  //   width: "50%",
                  width: {
                    xs: "35%",
                    md: "50%",
                    sm: "40%",
                  },
                  height: "auto",
                  //   maxHeight: 400,
                }}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default QRSuccess;
