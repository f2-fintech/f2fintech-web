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
          xs: "80%",
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
              fontSize: { xs: "1.75rem", sm: "2.5rem" },
              fontWeight: "700",
              color: "white",
              fontFamily: "'Poppins', sans-serif",
              marginBottom: "0.5rem",
              textShadow: "0 2px 10px rgba(0,0,0,0.2)",
              textAlign: "center",
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
                  gap: "1rem",
                }}
              >
                <TextField
                  name="name"
                  label="Full Name"
                  type="text"
                  variant="standard"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="off"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ color: "rgba(255,255,255,0.7)" }} />
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
                  error={touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                />

                <TextField
                  name="contact"
                  label="Phone Number"
                  type="text"
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
                  name="email"
                  label="Email"
                  type="email"
                  variant="standard"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="off"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: "rgba(255,255,255,0.7)" }} />
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
                  error={touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
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
                {showError && (
                  <Typography
                    sx={{
                      color: "#ffdddd",
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
                    background: "linear-gradient(135deg, #5c6cf2 0%, #3244e6 100%)",
                    fontWeight: "600",
                    fontSize: "1rem",
                    textTransform: "none",
                    borderRadius: "12px",
                    border: "none",
                    color: "white",
                    boxShadow: "0 4px 15px 0 rgba(50, 68, 230, 0.4)",
                    transition: "all 0.3s ease",
                    width: "100%",
                    "&:hover": {
                      background: "linear-gradient(135deg, #3244e6 0%, #5c6cf2 100%)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 20px 0 rgba(50, 68, 230, 0.6)",
                    },
                    "&:disabled": {
                      background: "rgba(255, 255, 255, 0.2)",
                      color: "rgba(255, 255, 255, 0.5)",
                    },
                  }}
                >
                  {loading ? "Signing Up..." : "Sign Up"}
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
                      Already have an account?
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
