import { useState } from "react";
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
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import PasswordIcon from "@mui/icons-material/Password";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import PropTypes from "prop-types";

import Toast from "../toast/Toast";
import { CustomerAPI } from "../../apis/CustomerAPI";
import { Utility } from "../utility";

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

function Signin({ isSignUp, onLoginSuccess }) {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotPasswordContact, setForgotPasswordContact] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [showError, setShowError] = useState("");

  const dispatch = useDispatch();
  const toastInfo = useSelector((state) => state.toastInfo);
  const { setLocalStorage, toastAndNavigate } = Utility();
  const isMobile = useMediaQuery("(max-width:480px)");
  const isTab = useMediaQuery("(max-width:820px)");

  const handleSubmit = (formData, resetForm) => {
    CustomerAPI.login(formData)
      .then((response) => {
        setLoading(false);
        if (response.data.status === "Success") {
          const customerInfo = {
            id: response.data.data.id,
            name: response.data.data.name,
            token: response.data.data.token,
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
    setLoading(true);
    try {
      const response = await axiosClient.post("/send-otp", {
        contact: forgotPasswordContact,
      });
      setLoading(false);
      if (response.data.status === "Success") {
        setOtpSent(true);
      }
    } catch (error) {
      setLoading(false);
      console.error("OTP send error", error);
    }
  };

  const handleForgotPasswordSubmit = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.post("/verify-otp", {
        contact: forgotPasswordContact,
        otp,
      });
      if (response.data.status === "Success") {
        setForgotPasswordOpen(false);
        setOtpSent(false);
      } else {
        setShowError("Invalid OTP");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Forgot password error", error);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        backgroundImage: "url('nawaz11111.jpg')",
        width: {
          xs: "100%", // For extra small screens
          sm: "75%", // For small screens
          md: "60%", // For medium screens
          lg: "50%", // For large screens and above
        },
        backgroundSize: isMobile ? "cover" : isTab ? "cover" : "cover",
        backgroundRepeat: isMobile
          ? "no-repeat"
          : isTab
          ? "no-repeat"
          : "no-repeat",
        height: "100vh",
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: isMobile
          ? "0% 0% 0% 0%"
          : isTab
          ? "0% 30% 30% 0%"
          : "0% 30% 30% 0%",
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
          marginTop: isMobile ? "-60vw" : "",
          gap: 4,
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
            fontSize: {
              xs: "10vw", // For extra small screens
              sm: "3vw", // For small screens
              md: "2.3vw", // For medium screens and above
            },
            color: "white",
            fontweight: "400",
            fontFamily: "verdana",
            textAlign: "center",
            lineHeight: "1.75rem",
            marginTop: isMobile ? "" : isTab ? "-10vh" : "",
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
                  borderRadius: "20px",
                  overflow: "hidden",
                  "& .MuiFilledInput-root": {
                    backgroundColor: "white", // Ensures background is white in filled input
                    "&:hover": {
                      backgroundColor: "white", // Keeps white background on hover
                    },
                    "&.Mui-focused": {
                      backgroundColor: "white", // Keeps white background on focus
                    },
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
                    fontSize: "1vw",
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
                  borderRadius: "20px",
                  overflow: "hidden",
                  "& .MuiFilledInput-root": {
                    backgroundColor: "white", // Ensures background is white in filled input
                    "&:hover": {
                      backgroundColor: "white", // Keeps white background on hover
                    },
                    "&.Mui-focused": {
                      backgroundColor: "white", // Keeps white background on focus
                    },
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
                  color: "black",
                }}
              >
                Forgot Password? <span> Click here</span>
              </Button>

              <Button
                variant="contained"
                type="submit"
                disabled={!dirty || isSubmitting}
                sx={{
                  width: {
                    xs: "50%", // For extra small screens
                    sm: "30%", // For small screens
                    md: "10vw", // For medium screens and above
                  },
                  color: "white",
                  fontWeight: "500",
                  fontSize: isMobile ? "5vw" : "1vw",
                  lineHeight: "1.5rem",
                  borderRadius: "20px",
                  marginTop: isMobile ? "" : isTab ? "" : "",
                }}
              >
                Sign In
              </Button>
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
              mt: 4,
            }}
          >
            <Typography
              sx={{
                fontSize: "1.5vw",
                fontWeight: "400",
                fontFamily: "verdana",
                textAlign: "center",
                lineHeight: "1.5rem",
              }}
            >
              Forgot Password
            </Typography>
            <TextField
              label="Contact Number"
              type="number"
              variant="filled"
              autoComplete="off"
              value={forgotPasswordContact}
              onChange={(e) => setForgotPasswordContact(e.target.value)}
              inputProps={{
                maxLength: 10,
              }}
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
                borderRadius: "20px",
                overflow: "hidden",
                "& .MuiFilledInput-root": {
                  backgroundColor: "white", // Ensures background is white in filled input
                  "&:hover": {
                    backgroundColor: "white", // Keeps white background on hover
                  },
                  "&.Mui-focused": {
                    backgroundColor: "white", // Keeps white background on focus
                  },
                },
              }}
            />

            {!otpSent ? (
              <Button
                variant="contained"
                onClick={handleSendOtp}
                disabled={loading || forgotPasswordContact.length !== 10}
                sx={{
                  color: "white",
                  fontWeight: "500",
                  fontSize: "1rem",
                  lineHeight: "1.5rem",
                }}
              >
                Send OTP
              </Button>
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
                      borderRadius: "20px",
                      backgroundColor: "darkGray",
                    },
                  }}
                  sx={{
                    borderRadius: "20px",
                    overflow: "hidden",
                  }}
                  error={!!showError}
                  helperText={showError}
                />
                <Button
                  variant="contained"
                  onClick={handleForgotPasswordSubmit}
                  disabled={loading || otp.length !== 6}
                  sx={{
                    color: "white",
                    fontWeight: "500",
                    fontSize: "1rem",
                    lineHeight: "1.5rem",
                  }}
                >
                  Submit
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
};

export default Signin;
