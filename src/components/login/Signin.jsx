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
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import PropTypes from "prop-types";

import Toast from "../toast/Toast";
import { CustomerAPI } from "../../apis/CustomerAPI";
import { Utility } from "../utility";
import { ForgotPasswordAPI } from "../../apis/ForgotPasswordAPI";

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email is not valid")
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
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [showError, setShowError] = useState("");

  const dispatch = useDispatch();
  const toastInfo = useSelector((state) => state.toastInfo);
  const navigateTo = useNavigate();
  const { setLocalStorage, toastAndNavigate } = Utility();
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:900px)");



  const handleSubmit = (formData, resetForm) => {
    return CustomerAPI.login(formData)
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
    setLoading(true);
    try {
      const result = await ForgotPasswordAPI.sendOtp(forgotPasswordEmail);

      if (result.success) {
        setOtpSent(true);
      } else {
        toastAndNavigate(dispatch, true, "error", result.error);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const result = await ForgotPasswordAPI.verifyOtp(forgotPasswordEmail, otp);

      if (result.success) {
        toastAndNavigate(
          dispatch,
          true,
          "success",
          "OTP verified",
          navigateTo,
          `/reset-password?isOtp=true&customerId=${result.customerId}`
        );
      } else {
        setShowError(result.error);
      }
    } catch (error) {
      console.error("Verification error:", error);
    } finally {
      setLoading(false);
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
          xs: "85%",
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
          background: isMobile
            ? "#ffffff"
            : "transparent",
          borderRadius: "24px",
          padding: { xs: "2rem 1.5rem", sm: "2rem", md: "2.25rem 2rem" },
          border: isMobile ? "1px solid rgba(0, 0, 0, 0.08)" : "none",
          boxShadow: isMobile ? "0 10px 30px rgba(0, 0, 0, 0.1)" : "none",
          width: "100%",
          maxWidth: "480px",
          position: "relative",
          overflow: "hidden",
        }}
      >
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
              fontSize: { xs: "2rem", sm: "2.5rem" },
              fontWeight: "800",
              color: "#1a1a2e",
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: "-0.5px",
              marginBottom: "0.5rem",
              textAlign: "center",
              background: "linear-gradient(to right, #384aff, #384aff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Welcome Back
          </Typography>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={SignInSchema}
            onSubmit={(formData, { resetForm }) => {
              setLoading(true);
              return handleSubmit(formData, resetForm);
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
                  gap: "1.25rem",
                }}
              >
                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  variant="outlined"
                  autoComplete="off"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Box sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "rgba(56, 74, 255, 0.08)",
                          borderRadius: "8px",
                          p: "6px",
                          mr: "4px",
                          color: "#384aff"
                        }}>
                          <EmailIcon fontSize="small" />
                        </Box>
                      </InputAdornment>
                    ),
                    sx: {
                      color: "#1a1a2e",
                      fontSize: "0.95rem",
                      borderRadius: "12px",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      transition: "all 0.3s ease",
                      "& fieldset": {
                        borderColor: "rgba(0, 0, 0, 0.12)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(0, 0, 0, 0.24) !important",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#384aff !important",
                      },
                      "&.Mui-focused": {
                        boxShadow: "0 0 0 4px rgba(56, 74, 255, 0.15)",
                        backgroundColor: "#ffffff",
                      }
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: "rgba(0, 0, 0, 0.54)",
                      fontFamily: "Poppins",
                      fontSize: "0.9rem",
                      "&.Mui-focused": {
                        color: "#384aff",
                      },
                    },
                  }}
                  sx={{
                    "& .MuiFormHelperText-root": {
                      color: "#d32f2f !important",
                      fontWeight: "500",
                      fontFamily: "Poppins",
                    },
                  }}
                  error={touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                />

                <TextField
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="off"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Box sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "rgba(56, 74, 255, 0.08)",
                          borderRadius: "8px",
                          p: "6px",
                          mr: "4px",
                          color: "#384aff"
                        }}>
                          <PasswordIcon fontSize="small" />
                        </Box>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          sx={{ color: "rgba(0, 0, 0, 0.54)" }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: {
                      color: "#1a1a2e",
                      fontSize: "0.95rem",
                      borderRadius: "12px",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      transition: "all 0.3s ease",
                      "& fieldset": {
                        borderColor: "rgba(0, 0, 0, 0.12)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(0, 0, 0, 0.24) !important",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#384aff !important",
                      },
                      "&.Mui-focused": {
                        boxShadow: "0 0 0 4px rgba(56, 74, 255, 0.15)",
                        backgroundColor: "#ffffff",
                      }
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: "rgba(0, 0, 0, 0.54)",
                      fontFamily: "Poppins",
                      fontSize: "0.9rem",
                      "&.Mui-focused": {
                        color: "#384aff",
                      },
                    },
                  }}
                  sx={{
                    "& .MuiFormHelperText-root": {
                      color: "#d32f2f !important",
                      fontWeight: "500",
                      fontFamily: "Poppins",
                    },
                  }}
                  error={touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                />

                <Button
                  onClick={handleForgotPassword}
                  sx={{
                    alignSelf: "flex-end",
                    color: "rgba(0, 0, 0, 0.6)",
                    fontFamily: "Poppins",
                    fontWeight: "500",
                    fontSize: "0.875rem",
                    textTransform: "none",
                    padding: 0,
                    minWidth: "auto",
                    "&:hover": {
                      background: "transparent",
                      color: "#384aff",
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
                    background: "#384aff",
                    fontWeight: "600",
                    fontSize: "1rem",
                    textTransform: "none",
                    borderRadius: "14px",
                    border: "none",
                    color: "white",
                    boxShadow: "0 4px 15px 0 rgba(56, 74, 255, 0.25)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: "#4f5ff5",
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 20px 0 rgba(56, 74, 255, 0.4)",
                    },
                    "&:disabled": {
                      background: "#e2e8f0",
                      color: "#94a3b8",
                      boxShadow: "none",
                    },
                  }}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </Button>

                {(isMobile || isTablet) && (
                  <Box sx={{ textAlign: "center", marginTop: "1rem" }}>
                    <Typography
                      sx={{
                        color: "rgba(0, 0, 0, 0.6)",
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
                        color: "#384aff",
                        fontSize: "1rem",
                        fontWeight: "600",
                        fontFamily: "Poppins",
                        textTransform: "none",
                        "&:hover": {
                          background: "rgba(56, 74, 255, 0.08)",
                        },
                        "&:disabled": {
                          background: "#e2e8f0",
                          color: "#94a3b8",
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
                mt: 3,
                width: "100%",
                padding: "1.25rem",
                borderRadius: "16px",
                border: "1px solid rgba(0, 0, 0, 0.08)",
                background: "rgba(0, 0, 0, 0.01)",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  fontFamily: "Poppins",
                  color: "#1a1a2e",
                }}
              >
                Forgot Password
              </Typography>
              <TextField
                label="Email Address"
                variant="outlined"
                autoComplete="off"
                type="email"
                value={forgotPasswordEmail}
                onChange={(e) => setForgotPasswordEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgba(56, 74, 255, 0.08)",
                        borderRadius: "8px",
                        p: "6px",
                        mr: "4px",
                        color: "#384aff"
                      }}>
                        <EmailIcon fontSize="small" />
                      </Box>
                    </InputAdornment>
                  ),
                  sx: {
                    color: "#1a1a2e",
                    fontSize: "0.95rem",
                    borderRadius: "12px",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    transition: "all 0.3s ease",
                    "& fieldset": {
                      borderColor: "rgba(0, 0, 0, 0.12)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(0, 0, 0, 0.24) !important",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#384aff !important",
                    },
                    "&.Mui-focused": {
                      boxShadow: "0 0 0 4px rgba(56, 74, 255, 0.15)",
                      backgroundColor: "#ffffff",
                    }
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: "rgba(0, 0, 0, 0.54)",
                    fontFamily: "Poppins",
                    fontSize: "0.9rem",
                    "&.Mui-focused": {
                      color: "#384aff",
                    },
                  },
                }}
                sx={{ width: "100%" }}
              />
              {!otpSent ? (
                <>
                  <Button
                    variant="contained"
                    onClick={handleSendOtp}
                    disabled={loading}
                    sx={{
                      width: "100%",
                      fontWeight: "600",
                      fontFamily: "Poppins",
                      borderRadius: "12px",
                      padding: "0.75rem 2rem",
                      background: "#384aff",
                      color: "white",
                      boxShadow: "0 4px 15px 0 rgba(56, 74, 255, 0.2)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: "#4f5ff5",
                        transform: "translateY(-2px)",
                        boxShadow: "0 6px 20px 0 rgba(56, 74, 255, 0.35)",
                      },
                    }}
                  >
                    {loading ? "Sending..." : "Send OTP"}
                  </Button>
                </>
              ) : (
                <>
                  <TextField
                    label="OTP"
                    type="number"
                    variant="outlined"
                    autoComplete="off"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    inputProps={{ maxLength: 6 }}
                    InputProps={{
                      sx: {
                        color: "#1a1a2e",
                        fontSize: "0.95rem",
                        borderRadius: "12px",
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        transition: "all 0.3s ease",
                        "& fieldset": {
                          borderColor: "rgba(0, 0, 0, 0.12)",
                        },
                        "&:hover fieldset": {
                          borderColor: "rgba(0, 0, 0, 0.24) !important",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#384aff !important",
                        },
                        "&.Mui-focused": {
                          boxShadow: "0 0 0 4px rgba(56, 74, 255, 0.15)",
                          backgroundColor: "#ffffff",
                        }
                      },
                    }}
                    InputLabelProps={{
                      sx: {
                        color: "rgba(0, 0, 0, 0.54)",
                        fontFamily: "Poppins",
                        fontSize: "0.9rem",
                        "&.Mui-focused": {
                          color: "#384aff",
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
                    disabled={loading}
                    sx={{
                      width: "100%",
                      fontWeight: "600",
                      fontFamily: "Poppins",
                      borderRadius: "12px",
                      padding: "0.75rem 2rem",
                      background: "#384aff",
                      color: "white",
                      boxShadow: "0 4px 15px 0 rgba(56, 74, 255, 0.2)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: "#4f5ff5",
                        transform: "translateY(-2px)",
                        boxShadow: "0 6px 20px 0 rgba(56, 74, 255, 0.35)",
                      },
                    }}
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
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

