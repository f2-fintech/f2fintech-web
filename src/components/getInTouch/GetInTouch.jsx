import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import { keyframes, styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import OTPSucess from "./OTPSucess";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../apis/config/firebaseConfig";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useCreateLead from "../../apis/GetInTouchLeadsAPI";

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
  const [name, setName] = useState("");
  const [qualification, setQualification] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState();
  const [severity, setSeverity] = useState("success");

  const { createLead } = useCreateLead();

  const handleToast = (severity, message) => {
    setSeverity(severity);
    setMessage(message);
    setOpen(true);
  };

  // ✅ Send OTP
  const handleOtp = async () => {
    if (!name || !qualification) {
      handleToast("error", "Please enter name and qualification.");
      return;
    }

    if (mobile && mobile.length == 10) {
      try {
        if (!window.recaptchaVerifier) {
          window.recaptchaVerifier = new RecaptchaVerifier(
            auth,
            "recaptcha-container",
            {
              size: "invisible",
              callback: (response) => {
                console.log("reCAPTCHA solved!", response);
              },
              "expired-callback": () => {
                console.error("reCAPTCHA expired. Please refresh.");
              },
            }
          );
        }
        const appVerifier = window.recaptchaVerifier;
        setLoading(true);
        const confirmationResult = await signInWithPhoneNumber(
          auth,
          `+91${mobile}`,
          appVerifier
        );
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setAskOtp(true);
        console.log("OTP sent successfully!");
        // show toast
        toast.success("OTP sent successfully!", { position: "top-right" });
      } catch (error) {
        // show toast
        toast.error("Error sending OTP:", { position: "top-right" });
        setLoading(false);
        console.error("Error sending OTP:", error);
      }
    } else {
      console.log("ENter a valid number");
      handleToast("error", "Please enter a valid mobile number");
    }
  };

  const verifyOtp = async () => {
    if (otp.length !== 6) {
      handleToast("error", "Please enter a valid 6-digit OTP");
      return;
    }
    try {
      const result = await window.confirmationResult.confirm(otp);
      if (result) {
        createLead({
          name,
          qualification,
          number: mobile,
        });
      }
      handleToast("success", "OTP verified successfully");

      setOtpVerified(true);
    } catch (error) {
      handleToast("error", "Invalid OTP. Please try again.");
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <div id="recaptcha-container"></div>
      {otpVerified ? (
        <OTPSucess />
      ) : (
        <Box
          sx={{
            height: "80vh",
            display: "flex",
            alignItems: "center",
            background: theme.palette.background.default,
            padding: { xs: 1, md: 2 },
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
                padding: { xs: 2, md: 3 },
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
                  mb: 1,
                  fontFamily: "Urbanist",
                  fontSize: { xs: "1.5rem", md: "2rem" },
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
                  mb: 1,
                  fontSize: { xs: "1.2rem", md: "1.5rem" },
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
                  mb: 1,
                  fontSize: "1rem",
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
                  mb: 1,
                  fontSize: "1rem",
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
                      margin="dense"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                      margin="dense"
                      value={qualification}
                      onChange={(e) => setQualification(e.target.value)}
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
                      type="number"
                      label="Mobile Number"
                      variant="outlined"
                      margin="dense"
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
                      value={otp}
                      type="number"
                      autoComplete="off"
                      variant="outlined"
                      margin="dense"
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
                        backgroundColor: "#2c3ce3",
                        color: "white",
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 600,
                        fontSize: "1rem",
                        fontFamily: "Poppins",
                        "&:hover": {
                          backgroundColor: "#2c3ce3",
                        },
                        boxShadow: "0 4px 12px rgba(0, 114, 255, 0.3)",
                      }}
                      onClick={() => verifyOtp()}
                    >
                      {loading ? "Verifying OTP..." : "Submit"}
                    </Button>
                  </>
                )}
              </Box>

              {!askOtp && (
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: "#2c3ce3",
                    color: "white",
                    py: 1,
                    borderRadius: 2,
                    fontWeight: 600,
                    fontFamily: "Poppins",
                    fontSize: "0.875rem",
                    "&:hover": {
                      backgroundColor: "#2c3ce3",
                    },
                    boxShadow: "0 4px 12px rgba(0, 114, 255, 0.3)",
                  }}
                  onClick={handleOtp}
                >
                  {loading ? "Sending OTP..." : "Submit"}
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
                padding: 2,
                backgroundColor: theme.palette.background.default,
              }}
            >
              <FloatingImage
                src="/cofee.png"
                alt="Cofee Break Illustration"
                sx={{
                  width: {
                    xs: "35%",
                    md: "50%",
                    sm: "40%",
                  },
                  height: "auto",
                }}
              />
            </Grid>
          </Grid>
        </Box>
      )}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        key={"top" + "center"}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default QRSuccess;
