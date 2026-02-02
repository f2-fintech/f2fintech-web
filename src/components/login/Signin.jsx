import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import PasswordIcon from "@mui/icons-material/Password";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import PropTypes from "prop-types";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

import Toast from "../toast/Toast";
import { CustomerAPI } from "../../apis/CustomerAPI";
import { Utility } from "../utility";
import { ForgotPasswordAPI } from "../../apis/ForgotPasswordAPI";
import { auth } from "../../apis/config/firebaseConfig";

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const SignInSchema = Yup.object().shape({
  contact: Yup.string()
    .matches(phoneRegExp, "Contact Number Is Not Valid")
    .required("This Field is required"),
  password: Yup.string()
    .min(8, "Password Must Be 8 Characters Long")
    // .matches(/[A-Z]/, 'Password Must Contain At Least 1 Uppercase Letter')
    .matches(/[a-z]/, "Password Must Contain At Least 1 Lowercase Letter")
    .matches(/[0-9]/, "Password Must Contain At Least 1 Number")
    .matches(/[^\w]/, "Password Must Contain At Least 1 Special Character")
    .max(20, "Password cannot be more than 20 characters")
    .required("This Field is Required"),
});

function Signin({ isSignUp, onLoginSuccess, setIsSignUp }) {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotPasswordContact, setForgotPasswordContact] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [showError, setShowError] = useState("");

  const dispatch = useDispatch();
  const toastInfo = useSelector((state) => state.toastInfo);
  const navigateTo = useNavigate();
  const { setLocalStorage, toastAndNavigate } = Utility();
  const isMobile = useMediaQuery("(max-width:480px)");
  const isTab = useMediaQuery("(max-width:820px)");

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "normal",
        callback: (response) => {
          console.log("recaptcha resolved..");
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
        },
      }
    );
  };

  const handleSubmit = (formData, resetForm) => {
    CustomerAPI.login(formData)
      .then((response) => {
        setLoading(false);
        if (response.data.status === "Success") {
          const customerInfo = {
            id: response.data.data.id,
            name: response.data.data.name,
            token: response.data.data.token,
            role: response.data.data.role,
          };
          setLocalStorage("customerInfo", customerInfo);
          toastAndNavigate(dispatch, true, "success", "SignIn Successful");
          onLoginSuccess(); // Navigate to the previous page
        }
      })
      .catch((error) => {
        setLoading(false);
        toastAndNavigate(
          dispatch,
          true,
          "error",
          error?.response?.data?.msg || "Signin Failed"
        );
        dispatch({
          type: "SET_TOAST",
          payload: {
            toastAlert: true,
            toastMessage: error?.response?.data?.msg || "Signin Failed",
            toastSeverity: "error",
          },
        });
      });
  };

  const handleForgotPassword = () => {
    setForgotPasswordOpen(true);
  };

  const handleSendOtp = async () => {
    try {
      // Generate the reCAPTCHA verifier
      generateRecaptcha();
      const appVerifier = window.recaptchaVerifier;

      console.log("Sending OTP to:", forgotPasswordContact);

      // Send OTP using the ForgotPasswordAPI
      const result = await ForgotPasswordAPI.sendOtp(
        forgotPasswordContact,
        appVerifier
      );

      if (result.success) {
        console.log("OTP sent successfully:", result.verificationId);
        setVerificationId(result.verificationId);
        setOtpSent(true);
      } else {
        console.error("Error sending OTP:", result.error);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const handleVerifyOtp = async () => {
    const result = await ForgotPasswordAPI.verifyOtp(verificationId, otp);

    if (result.success) {
      console.log("verification msg", result.message);
      toastAndNavigate(
        dispatch,
        true,
        "success",
        "OTP verified",
        navigateTo,
        "/reset-password?isOtp=true"
      );
      console.log("navigating");
      // setOtpVerified(true);
    } else {
      console.error(result.error);
    }
  };

  const handleForgotPasswordSubmit = async () => {
    setLoading(true);

    try {
      setLoading(false);

      if (response.data.status === "Success") {
        setForgotPasswordOpen(false);
        setShowError(null); // Clear error on success
      }
    } catch (error) {
      setLoading(false);
      console.error("Forgot password error:", error);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: "#3245e7",
        borderTopRightRadius: isMobile ? "0px" : "120px",
        borderBottomRightRadius: isMobile ? "0px" : "120px",
        borderRadius: isMobile ? "15px" : "0",

        width: {
          xs: "90%",
          sm: "75%",
          md: "60%",
          lg: "50%", // For large screens and above
        },
        backgroundSize: isMobile ? "cover" : isTab ? "cover" : "cover",
        backgroundRepeat: isMobile
          ? "no-repeat"
          : isTab
            ? "no-repeat"
            : "no-repeat",
        // height: "100vh",
        height: {
          xs: "65vh",
          md: "100vh",
          sm: "100vh",
          lg: "100vh",
        },
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...(isSignUp && {
          display: isMobile ? "none" : "",
        }),
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          // marginTop: isMobile ? "-60vw" : "",
          gap: isMobile ? 1 : 4,
          zIndex: 1,
          ...(isSignUp && {
            visibility: "hidden",
            opacity: 0,
            transition: "visibility 0s linear 500ms,opacity 500ms",
          }),
          ...(!isSignUp && {
            visibility: "visible",
            opacity: 1,
            transition: "visibility 0s linear 0s,opacity 500ms",
          }),
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "6.5vw", sm: "2.6vw" }, // Adjust font size for smaller screens
            textAlign: "center",
            color: "white",

            lineHeight: "1.75rem",
            fontWeight: "570",
            // marginBottom: "1.5rem",
            fontFamily: "DM sans",
          }}
        >
          Sign In
        </Typography>
        <Formik
          initialValues={{ contact: "", password: "" }}
          validationSchema={SignInSchema}
          onSubmit={(formData, { resetForm }) => {
            setLoading(true);
            handleSubmit(formData, resetForm);
          }}
        >
          {({
            dirty,
            errors,
            touched,
            isSubmitting,
            handleChange,
            handleBlur,
            values,
          }) => (
            <Form
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <TextField
                label="Contact Number*"
                type="number"
                name="contact"
                variant="filled"
                autoComplete="off"
                value={values.contact}
                onChange={handleChange}
                onBlur={handleBlur}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      sx={{
                        fontSize: {
                          xs: "1.1rem",
                          sm: "inherit",
                          md: "inherit",
                        },
                      }}
                      position="start"
                    >
                      <PhoneAndroidIcon />
                    </InputAdornment>
                  ),
                  disableUnderline: true,
                  sx: {
                    width: {
                      xs: "20rem", // For extra small screens
                      sm: "22rem", // For small screens
                      md: "25rem", // For medium screens and above
                    },
                    color: "black",
                    borderRadius: "20px",
                    // fontSize: "1vw",
                    fontSize: {
                      xs: "2.8vw",
                      sm: "2vw",
                      md: "default",
                    },
                    backgroundColor: "white", // Set permanent white background
                    "&:hover": {
                      backgroundColor: "white", // Keeps white background on hover
                    },
                    //                     "& .css-havevq-MuiSvgIcon-root":{
                    // width:''

                    //                     },
                    "&.Mui-focused": {
                      backgroundColor: "white", // Keeps white background on focus
                    },
                  },
                }}
                sx={{
                  overflow: "hidden",
                  "& .MuiFilledInput-root": {
                    backgroundColor: "white", // Ensures background is white in filled input
                    "&:hover": {
                      backgroundColor: "white", // Keeps white background on hover
                    },
                    "&.Mui-focused": {
                      backgroundColor: "white", // Keeps white background on focus
                    },
                    borderRadius: isMobile ? "15px" : "2px 20px 20px 2px", // 0 on the left, 30px on the right
                  },
                }}
                error={touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
              />

              <TextField
                placeholder="Enter Your Password*"
                type={showPassword ? "text" : "password"}
                variant="filled"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordIcon />
                    </InputAdornment>
                  ),
                  disableUnderline: true,
                  sx: {
                    width: {
                      xs: "20rem", // For extra small screens
                      sm: "22rem", // For small screens
                      md: "25rem", // For medium screens and above
                    },
                    borderRadius: "20px",
                    color: "black",
                    fontSize: {
                      xs: "3vw",
                      sm: "2vw",
                      md: "default",
                    },
                    backgroundColor: "white", // Set permanent white background
                    "&:hover": {
                      backgroundColor: "white", // Keeps white background on hover
                    },
                    "&.Mui-focused": {
                      backgroundColor: "white", // Keeps white background on focus
                    },
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  overflow: "hidden",

                  "& .MuiFilledInput-root": {
                    backgroundColor: "white",
                    "&:hover": {
                      backgroundColor: "white",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "white",
                    },
                    borderRadius: isMobile ? "15px" : "2px 20px 20px 2px",
                  },
                }}
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
              />

              <Button
                onClick={handleForgotPassword}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  color: "#ffffff",
                  fontFamily: "Poppins",
                  fontWeight: "500",

                }}
              >
                Forgot Password?
                <span style={{ marginLeft: "0.5rem" }}> Click here</span>
              </Button>

              <Button
                variant="contained"
                type="submit"
                disabled={!dirty || isSubmitting}
                sx={{
                  marginTop: isMobile ? "2vh" : isTab ? "" : "0px",
                  width: {
                    xs: "50%",
                    sm: "30%",
                    md: "10vw",
                  },
                  padding: "0.5rem 1.5rem",
                  fontFamily: "Poppins",
                  backgroundColor: theme.palette.whitetext.white,
                  fontWeight: "500",
                  textTransform: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: { xs: "1.2rem", sm: "1rem" },
                  lineHeight: "1.5rem",
                  borderRadius: "20px",
                  top: "-2vh",
                  "&:hover": {
                    color: theme.palette.secondary.main,
                    backgroundColor: theme.palette.whitetext.white,
                  },
                }}
              >
                Sign In
              </Button>
              <Typography
                sx={{
                  color: "white",
                  fontFamily: "Poppins",
                  display: { xs: "block", sm: "none" },
                }}
              >
                Don't have an account?
              </Typography>

              {isMobile && (
                <Button
                  onClick={() => setIsSignUp(!isSignUp)}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    color: "#50c878",
                    fontSize: "1.2rem",
                    textDecoration: "underline",
                    fontFamily: "Poppins",
                    fontWeight: "500",
                  }}
                >
                  Sign Up
                </Button>
              )}
            </Form>
          )}
        </Formik>

        {/* // Fogot Password */}
        {forgotPasswordOpen && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              mt: 4,
            }}
          >
            <Typography
              sx={{
                fontSize: "1.8vw",
                fontWeight: "500",
                fontFamily: "Poppins",
                textAlign: "center",
                lineHeight: "1.5rem",
                color: "white",
              }}
            >
              Forgot Password
            </Typography>
            <TextField
              label="Contact Number"
              // type="number"
              variant="filled"
              autoComplete="off"
              value={forgotPasswordContact}
              onChange={(e) => setForgotPasswordContact(e.target.value)}
              // inputProps={{
              //   maxLength: 10,
              // }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneAndroidIcon />
                  </InputAdornment>
                ),
                disableUnderline: true,
                sx: {
                  width: {
                    xs: "20rem", // For extra small screens
                    sm: "22rem", // For small screens
                    md: "25rem", // For medium screens and above
                  },
                  color: "black",
                  borderRadius: "20px",
                  backgroundColor: "white", // Set permanent white background
                  "&:hover": {
                    backgroundColor: "white", // Keeps white background on hover
                  },
                  "&.Mui-focused": {
                    backgroundColor: "white", // Keeps white background on focus
                  },
                },
              }}
              sx={{
                overflow: "hidden",
                "& .MuiFilledInput-root": {
                  backgroundColor: "white", // Ensures background is white in filled input
                  "&:hover": {
                    backgroundColor: "white", // Keeps white background on hover
                  },
                  "&.Mui-focused": {
                    backgroundColor: "white", // Keeps white background on focus
                  },
                  borderRadius: isMobile ? "15px" : "2px 20px 20px 2px", // 0 on the left, 30px on the right
                },
              }}
            />
            {!otpSent ? (
              <>
                <div id="recaptcha-container"></div>
                <Button
                  variant="contained"
                  onClick={handleSendOtp}
                  disabled={loading}
                  sx={{
                    fontWeight: "450",
                    fontFamily: "Poppins",
                    borderRadius: "25px",
                    fontSize: "1rem",
                    lineHeight: "1.5rem",
                    backgroundColor: theme.palette.whitetext.white,
                    "&:hover": {
                      backgroundColor: theme.palette.whitetext.white,
                      color: theme.palette.secondary.main,
                    },
                  }}
                >
                  Send OTP
                </Button>
              </>
            ) : (
              <>
                <TextField
                  label="*OTP"
                  type="number"
                  variant="filled"
                  autoComplete="off"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  inputProps={{
                    maxLength: 6,
                  }}
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      width: {
                        xs: "20rem", // For extra small screens
                        sm: "22rem", // For small screens
                        md: "25rem", // For medium screens and above
                      },
                      color: "black",
                      borderRadius: "20px",
                      fontSize: "1vw",
                      backgroundColor: "white", // Set permanent white background
                      "&:hover": {
                        backgroundColor: "white", // Keeps white background on hover
                      },
                      "&.Mui-focused": {
                        backgroundColor: "white", // Keeps white background on focus
                      },
                    },
                  }}
                  sx={{
                    overflow: "hidden",
                    "& .MuiFilledInput-root": {
                      backgroundColor: "white", // Ensures background is white in filled input
                      "&:hover": {
                        backgroundColor: "white", // Keeps white background on hover
                      },
                      "&.Mui-focused": {
                        backgroundColor: "white", // Keeps white background on focus
                      },
                      borderRadius: "2px 20px 20px 2px", // 0 on the left, 30px on the right
                    },
                  }}
                  error={!!showError}
                  helperText={showError}
                />

                {/* <Button onClick={handleVerifyOtp}>Verify OTP</Button> */}

                <Button
                  variant="contained"
                  onClick={handleVerifyOtp}
                  // disabled={!otpVerified}
                  sx={{
                    color: "white",
                    fontWeight: "500",
                    fontSize: "1rem",
                    lineHeight: "1.5rem",
                  }}
                >
                  Verify OTP
                </Button>
              </>
            )}
          </Box>
        )}

        <Toast
          alerting={toastInfo.toastAlert}
          message={toastInfo.toastMessage}
          severity={toastInfo.toastSeverity}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
        />
      </Box>
    </Box>
  );
}

Signin.propTypes = {
  isSignUp: PropTypes.bool,
  onLoginSuccess: PropTypes.func,
  setOtpVerified: PropTypes.func,
};

export default Signin;
