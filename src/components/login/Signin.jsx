import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:900px)");

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "normal",
        callback: (response) => {
          console.log("recaptcha resolved..");
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
          onLoginSuccess();
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
      });
  };

  const handleForgotPassword = () => {
    setForgotPasswordOpen(true);
  };

  const handleSendOtp = async () => {
    try {
      generateRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      const result = await ForgotPasswordAPI.sendOtp(
        forgotPasswordContact,
        appVerifier
      );

      if (result.success) {
        setVerificationId(result.verificationId);
        setOtpSent(true);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const handleVerifyOtp = async () => {
    const result = await ForgotPasswordAPI.verifyOtp(verificationId, otp);

    if (result.success) {
      toastAndNavigate(
        dispatch,
        true,
        "success",
        "OTP verified",
        navigateTo,
        "/reset-password?isOtp=true"
      );
    } else {
      console.error(result.error);
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
        position: isMobile ? "relative" : "absolute",
        top: isMobile ? "auto" : "50%",
        left: isMobile
          ? "auto"
          : isSignUp
            ? "-100%"
            : isTablet
              ? "50%"
              : "25%",
        transform: isMobile ? "none" : "translate(-50%, -50%)",
        display: isMobile && isSignUp ? "none" : "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: {
          xs: "80%",
          sm: "400px",
          md: "440px",
          lg: "480px",
        },
        margin: isMobile ? "0 auto" : "0",
        zIndex: 2,
        transition: "all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        opacity: isSignUp ? 0 : 1,
        pointerEvents: isSignUp ? "none" : "auto",
      }}
    >
      <Box
        sx={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(20px)",
          borderRadius: "24px",
          padding: { xs: "1.25rem 1rem", sm: "2rem", md: "2.25rem 2rem" },
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
          width: "100%",
          maxWidth: "480px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Blurred Logo Background */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            height: "80%",
            backgroundImage: "url(/f2Fintechlogo-old.png)",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "blur(4px) opacity(0.4)",
            zIndex: 0,
          }}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1.5,
            position: "relative",
            zIndex: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "1.75rem", sm: "2.5rem" },
              fontWeight: "700",
              color: "white",
              fontFamily: "'Poppins', sans-serif",
              marginBottom: "0.5rem",
              textShadow: "0 2px 10px rgba(0,0,0,0.2)",
              textAlign: "center",
            }}
          >
            Welcome Back
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
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <TextField
                  name="contact"
                  label="Phone Number"
                  type="number"
                  variant="standard"
                  autoComplete="off"
                  value={values.contact}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneAndroidIcon sx={{ color: "rgba(255,255,255,0.7)" }} />
                      </InputAdornment>
                    ),
                    disableUnderline: false,
                    sx: {
                      color: "white",
                      fontSize: "1rem",
                      "&:before": {
                        borderBottom: "2px solid rgba(255, 255, 255, 0.3)",
                      },
                      "&:hover:not(.Mui-disabled):before": {
                        borderBottom: "2px solid rgba(255, 255, 255, 0.5)",
                      },
                      "&:after": {
                        borderBottom: "2px solid white",
                      },
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: "rgba(255, 255, 255, 0.7)",
                      "&.Mui-focused": {
                        color: "white",
                      },
                    },
                  }}
                  sx={{
                    "& .MuiFormHelperText-root": {
                      color: "#ffdddd",
                      fontWeight: "500",
                    },
                  }}
                  error={touched.contact && !!errors.contact}
                  helperText={touched.contact && errors.contact}
                />

                <TextField
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  variant="standard"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="off"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PasswordIcon sx={{ color: "rgba(255,255,255,0.7)" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          sx={{ color: "rgba(255,255,255,0.7)" }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    disableUnderline: false,
                    sx: {
                      color: "white",
                      fontSize: "1rem",
                      "&:before": {
                        borderBottom: "2px solid rgba(255, 255, 255, 0.3)",
                      },
                      "&:hover:not(.Mui-disabled):before": {
                        borderBottom: "2px solid rgba(255, 255, 255, 0.5)",
                      },
                      "&:after": {
                        borderBottom: "2px solid white",
                      },
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: "rgba(255, 255, 255, 0.7)",
                      "&.Mui-focused": {
                        color: "white",
                      },
                    },
                  }}
                  sx={{
                    "& .MuiFormHelperText-root": {
                      color: "#ffdddd",
                      fontWeight: "500",
                    },
                  }}
                  error={touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                />

                <Button
                  onClick={handleForgotPassword}
                  sx={{
                    alignSelf: "flex-end",
                    color: "rgba(255, 255, 255, 0.9)",
                    fontFamily: "Poppins",
                    fontWeight: "400",
                    fontSize: "0.875rem",
                    textTransform: "none",
                    padding: 0,
                    minWidth: "auto",
                    "&:hover": {
                      background: "transparent",
                      color: "white",
                      textDecoration: "underline",
                    },
                  }}
                >
                  Forgot Password?
                </Button>

                <Button
                  variant="contained"
                  type="submit"
                  disabled={!dirty || isSubmitting || loading}
                  sx={{
                    marginTop: "1rem",
                    padding: "0.875rem 2rem",
                    fontFamily: "Poppins",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    fontWeight: "600",
                    fontSize: "1rem",
                    textTransform: "none",
                    borderRadius: "12px",
                    border: "none",
                    color: "white",
                    boxShadow: "0 4px 15px 0 rgba(116, 75, 162, 0.4)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 20px 0 rgba(116, 75, 162, 0.6)",
                    },
                    "&:disabled": {
                      background: "rgba(255, 255, 255, 0.2)",
                      color: "rgba(255, 255, 255, 0.5)",
                    },
                  }}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </Button>

                {(isMobile || isTablet) && (
                  <Box sx={{ textAlign: "center", marginTop: "1rem" }}>
                    <Typography
                      sx={{
                        color: "rgba(255, 255, 255, 0.8)",
                        fontFamily: "Poppins",
                        fontSize: "0.875rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Don't have an account?
                    </Typography>
                    <Button
                      onClick={() => setIsSignUp(!isSignUp)}
                      sx={{
                        color: "white",
                        fontSize: "1rem",
                        fontWeight: "600",
                        fontFamily: "Poppins",
                        textTransform: "none",
                        "&:hover": {
                          background: "rgba(255, 255, 255, 0.1)",
                        },
                      }}
                    >
                      Sign Up
                    </Button>
                  </Box>
                )}
              </Form>
            )}
          </Formik>

          {forgotPasswordOpen && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                mt: 2,
                width: "100%",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  fontFamily: "Poppins",
                  color: "white",
                }}
              >
                Forgot Password
              </Typography>
              <TextField
                label="Contact Number"
                variant="standard"
                autoComplete="off"
                value={forgotPasswordContact}
                onChange={(e) => setForgotPasswordContact(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneAndroidIcon sx={{ color: "rgba(255,255,255,0.7)" }} />
                    </InputAdornment>
                  ),
                  disableUnderline: false,
                  sx: {
                    color: "white",
                    "&:before": {
                      borderBottom: "2px solid rgba(255, 255, 255, 0.3)",
                    },
                    "&:after": {
                      borderBottom: "2px solid white",
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: "rgba(255, 255, 255, 0.7)",
                    "&.Mui-focused": {
                      color: "white",
                    },
                  },
                }}
                sx={{ width: "100%" }}
              />
              {!otpSent ? (
                <>
                  <div id="recaptcha-container"></div>
                  <Button
                    variant="contained"
                    onClick={handleSendOtp}
                    disabled={loading}
                    sx={{
                      fontWeight: "600",
                      fontFamily: "Poppins",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "white",
                      "&:hover": {
                        background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
                      },
                    }}
                  >
                    Send OTP
                  </Button>
                </>
              ) : (
                <>
                  <TextField
                    label="OTP"
                    type="number"
                    variant="standard"
                    autoComplete="off"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    inputProps={{ maxLength: 6 }}
                    InputProps={{
                      disableUnderline: false,
                      sx: {
                        color: "white",
                        "&:before": {
                          borderBottom: "2px solid rgba(255, 255, 255, 0.3)",
                        },
                        "&:after": {
                          borderBottom: "2px solid white",
                        },
                      },
                    }}
                    InputLabelProps={{
                      sx: {
                        color: "rgba(255, 255, 255, 0.7)",
                        "&.Mui-focused": {
                          color: "white",
                        },
                      },
                    }}
                    sx={{ width: "100%" }}
                    error={!!showError}
                    helperText={showError}
                  />
                  <Button
                    variant="contained"
                    onClick={handleVerifyOtp}
                    sx={{
                      fontWeight: "600",
                      fontFamily: "Poppins",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "white",
                      "&:hover": {
                        background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
                      },
                    }}
                  >
                    Verify OTP
                  </Button>
                </>
              )}
            </Box>
          )}
        </Box>
      </Box>

      <Toast
        alerting={toastInfo.toastAlert}
        message={toastInfo.toastMessage}
        severity={toastInfo.toastSeverity}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      />
    </Box>
  );
}

Signin.propTypes = {
  isSignUp: PropTypes.bool,
  onLoginSuccess: PropTypes.func,
  setIsSignUp: PropTypes.func,
};

export default Signin;
