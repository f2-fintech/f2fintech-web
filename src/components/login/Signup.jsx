import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useTheme } from "@mui/material/styles";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PasswordIcon from "@mui/icons-material/Password";
import EmailIcon from "@mui/icons-material/Email";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Toast from "../toast/Toast";
import axiosClient from "../../api/apiClient";
import { Utility } from "../utility";

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  name: Yup.string()
    .min(2, "Name is Too Short!")
    .max(30, "Name is Too Long!")
    .matches(/^[a-zA-Z\s]+$/, "Name should only contain letters")
    .required("This Field is Required"),
  contact: Yup.string()
    .matches(phoneRegExp, "Contact Number Is Not Valid")
    .required("Contact Number is required"),
  password: Yup.string()
    .min(8, "Password Must Be 8 Characters Long")
    .matches(/[A-Z]/, "Password Must Contain At Least 1 Uppercase Letter")
    .matches(/[a-z]/, "Password Must Contain At Least 1 Lowercase Letter")
    .matches(/[0-9]/, "Password Must Contain At Least 1 Number")
    .matches(/[^\w]/, "Password Must Contain At Least 1 Special Character")
    .max(20, "Password cannot be more than 20 characters")
    .required("This Field is Required"),
});

export default function Signup({ isSignUp, setIsSignUp, onLoginSuccess }) {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState("");
  const dispatch = useDispatch();
  const toastInfo = useSelector((state) => state.toastInfo);
  const { setLocalStorage, toastAndNavigate } = Utility();
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:900px)");

  useEffect(() => {
    let timer;
    if (showError) {
      timer = setTimeout(() => {
        setShowError(null);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showError]);

  const handleSubmit = async (formData, resetForm) => {
    setLoading(true);
    try {
      const response = await axiosClient.post(
        "/create-customer",
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
            "companyid": 101,
          },
        }
      );

      setLoading(false);
      if (response.data.status === "Success") {
        toastAndNavigate(dispatch, true, "success", "SignUp Successful");
        resetForm();
        setIsSignUp(false);
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 409) {
        toastAndNavigate(
          dispatch,
          true,
          "error",
          "Phone number already registered"
        );
        setShowError("Phone number already registered");
      } else {
        console.error("Signup error", error);
      }
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
            ? isTablet
              ? "50%"
              : "75%"
            : "150%",
        transform: isMobile ? "none" : "translate(-50%, -50%)",
        display: isMobile && !isSignUp ? "none" : "flex",
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
        zIndex: isSignUp ? 2 : 1,
        transition: "all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        opacity: isSignUp || isMobile ? 1 : 0,
        pointerEvents: isSignUp || isMobile ? "auto" : "none",
      }}
    >
      <Box
        sx={{
          background: isMobile
            ? "#ffffff"
            : "#eaf4f4",
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
            ...(!isSignUp && !isMobile && {
              visibility: "hidden",
              opacity: 0,
            }),
            ...(isSignUp && {
              visibility: "visible",
              opacity: 1,
              transition: "visibility 0s linear 0s,opacity 500ms",
            }),
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
            Create Account
          </Typography>

          <Formik
            initialValues={{
              contact: "",
              password: "",
              name: "",
              email: "",
            }}
            validationSchema={SignUpSchema}
            onSubmit={(formData, { resetForm }) => {
              handleSubmit(formData, resetForm);
            }}
          >
            {({ dirty, errors, touched, isSubmitting, handleChange, handleBlur, values }) => (
              <Form
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                }}
              >
                <TextField
                  name="name"
                  label="Full Name"
                  type="text"
                  variant="outlined"
                  value={values.name}
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
                          <PersonIcon fontSize="small" />
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
                  error={touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                />

                <TextField
                  name="contact"
                  label="Phone Number"
                  type="text"
                  variant="outlined"
                  autoComplete="off"
                  value={values.contact}
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
                          <PhoneAndroidIcon fontSize="small" />
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
                  error={touched.contact && !!errors.contact}
                  helperText={touched.contact && errors.contact}
                />

                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  variant="outlined"
                  value={values.email}
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
                {showError && (
                  <Typography
                    sx={{
                      color: "#d32f2f",
                      textAlign: "center",
                      mt: 1,
                      fontSize: "0.875rem",
                      fontWeight: "500",
                    }}
                  >
                    {showError}
                  </Typography>
                )}

                <Button
                  variant="contained"
                  disabled={!dirty || isSubmitting || loading}
                  type="submit"
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
                    width: "100%",
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
                  {loading ? "Signing Up..." : "Sign Up"}
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
                      Already have an account?
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
                      }}
                    >
                      Sign In
                    </Button>
                  </Box>
                )}
              </Form>
            )}
          </Formik>
        </Box>
      </Box>

      <Toast
        alerting={toastInfo.toastAlert}
        message={toastInfo.toastMessage}
        severity={toastInfo.toastSeverity}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
    </Box>
  );
}
