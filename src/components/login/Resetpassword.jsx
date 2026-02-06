import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useFormik } from "formik";
import * as Yup from "yup";

import Toast from "../toast/Toast";
import { Utility } from "../utility";
import { CustomerAPI } from "../../apis/CustomerAPI";
import { Helmet } from "react-helmet-async";

const getValidationSchema = (isOtpTrue) => {
  return Yup.object({
    currentPassword: isOtpTrue
      ? Yup.string().notRequired() // Skip validation if isOtpTrue is true
      : Yup.string()
        .min(8, "Password Must Be 8 Characters Long")
        .matches(/[A-Z]/, "Password Must Contain At Least 1 Uppercase Letter")
        .matches(/[a-z]/, "Password Must Contain At Least 1 Lowercase Letter")
        .matches(/[0-9]/, "Password Must Contain At Least 1 Number")
        .matches(
          /[^\w]/,
          "Password Must Contain At Least 1 Special Character"
        )
        .required("Enter Current Password To Proceed"),
    newPassword: Yup.string()
      .min(8, "Password Must Be 8 Characters Long")
      .matches(/[A-Z]/, "Password Must Contain At Least 1 Uppercase Letter")
      .matches(/[a-z]/, "Password Must Contain At Least 1 Lowercase Letter")
      .matches(/[0-9]/, "Password Must Contain At Least 1 Number")
      .matches(/[^\w]/, "Password Must Contain At Least 1 Special Character")
      .max(20, "Password cannot be more than 20 characters")
      .required("This Field is Required"),

    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("newPassword")], "Passwords must match"),
  });
};

export default function ResetPassword() {
  const [error, setError] = useState(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const toastInfo = useSelector((state) => state.toastInfo);
  const navigateTo = useNavigate();
  const { getLocalStorage, toastAndNavigate } = Utility();
  const queryParams = new URLSearchParams(location.search);
  const isMobile = useMediaQuery("(max-width:480px)");
  const isTab = useMediaQuery("(max-width:1200px)");
  const isOtpTrue = queryParams.get("isOtp") || false;
  const customerId = getLocalStorage("customerInfo")?.id;

  const validationSchema = getValidationSchema(isOtpTrue);

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // Reset error and success states
      setError(null);

      // Call the API to reset the password
      try {
        const response = await CustomerAPI.resetPassword({
          customerId: customerId || null,
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
          isOtpTrue,
        });

        console.log("API Response:", response);

        if (response?.statusText === "OK") {
          console.log("aara h");
          toastAndNavigate(
            dispatch,
            true,
            "success",
            "Reset Successful",
            navigateTo,
            "/"
          );
          console.log("navigating");
        } else {
          throw new Error("Failed to reset password");
        }
      } catch (err) {
        console.error("Unexpected error:", err.message);
        setError("Failed to reset password");

        toastAndNavigate(dispatch, true, "error", "Failed to reset password");
      }
    },
  });

  const handleClickShowPassword = (field) => {
    switch (field) {
      case "currentPassword":
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case "newPassword":
        setShowNewPassword(!showNewPassword);
        break;
      case "confirmPassword":
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };
  const theme = useTheme();
  return (
    <>
      <Helmet>
        <title></title>
        <meta name="Name" content=" " />
        <title></title>
        <meta name="Name" content=" " />
        <link rel="canonical" href="http://localhost:5173/reset-password" />
      </Helmet>
      <Box
        sx={{
          minHeight: { xs: "auto", md: "calc(100vh - 12vh)" },
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
          padding: { xs: "2rem 0", md: "4rem 0" },
        }}
      >
        {/* Floating Background Circles */}
        <Box
          sx={{
            position: "absolute",
            width: { xs: "200px", md: "300px" },
            height: { xs: "200px", md: "300px" },
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
            top: { xs: "-100px", md: "-150px" },
            left: { xs: "-100px", md: "-150px" },
            filter: "blur(80px)",
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            width: { xs: "300px", md: "400px" },
            height: { xs: "300px", md: "400px" },
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
            bottom: { xs: "-150px", md: "-200px" },
            right: { xs: "-150px", md: "-200px" },
            filter: "blur(100px)",
            zIndex: 0,
          }}
        />

        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", lg: "row" },
              alignItems: "center",
              justifyContent: "center",
              gap: { xs: 4, lg: 8 },
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: { xs: "100%", lg: "45%" },
                display: { xs: "none", sm: "flex" }, // Hide on very small screens, show on tablet+
              }}
            >
              <img
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  height: "auto",
                  borderRadius: "40px",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                }}
                src="/Resetpassword.gif"
                alt="password Illustration"
              />
            </Box>

            <Box
              sx={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(20px)",
                borderRadius: "24px",
                padding: { xs: "1.5rem 1rem", sm: "2rem", md: "2.5rem" },
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
                width: "100%",
                maxWidth: { xs: "90%", sm: "420px", md: "480px" },
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

              <Box sx={{ position: "relative", zIndex: 1 }}>
                <Typography
                  sx={{
                    fontSize: { xs: "1.75rem", sm: "2.5rem" },
                    fontWeight: "700",
                    color: "white",
                    fontFamily: "'Poppins', sans-serif",
                    marginBottom: "1rem",
                    textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                    textAlign: "center",
                    lineHeight: "1.2",
                  }}
                >
                  Reset Password
                </Typography>

                <Box
                  component="form"
                  onSubmit={formik.handleSubmit}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    width: "100%",
                  }}
                >
                  {error && <Alert severity="error" sx={{ borderRadius: "12px" }}>{error}</Alert>}

                  {!isOtpTrue && (
                    <TextField
                      name="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      label="Current Password"
                      variant="standard"
                      fullWidth
                      value={formik.values.currentPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      InputProps={{
                        disableUnderline: false,
                        sx: {
                          color: "white",
                          fontFamily: "Poppins",
                          "&:before": { borderBottom: "2px solid rgba(255, 255, 255, 0.3)" },
                          "&:hover:not(.Mui-disabled):before": { borderBottom: "2px solid rgba(255, 255, 255, 0.5)" },
                          "&:after": { borderBottom: "2px solid white" },
                        },
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => handleClickShowPassword("currentPassword")}
                              edge="end"
                              sx={{ color: "rgba(255,255,255,0.7)" }}
                            >
                              {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      InputLabelProps={{
                        sx: {
                          color: "rgba(255, 255, 255, 0.8)",
                          fontFamily: "Poppins",
                          "&.Mui-focused": { color: "white" },
                        },
                      }}
                      error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
                      helperText={formik.touched.currentPassword && formik.errors.currentPassword}
                      sx={{
                        "& .MuiFormHelperText-root": { color: "#ffdddd", fontWeight: "500" },
                      }}
                    />
                  )}

                  <TextField
                    name="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    label="New Password"
                    variant="standard"
                    fullWidth
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    InputProps={{
                      disableUnderline: false,
                      sx: {
                        color: "white",
                        fontFamily: "Poppins",
                        "&:before": { borderBottom: "2px solid rgba(255, 255, 255, 0.3)" },
                        "&:hover:not(.Mui-disabled):before": { borderBottom: "2px solid rgba(255, 255, 255, 0.5)" },
                        "&:after": { borderBottom: "2px solid white" },
                      },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => handleClickShowPassword("newPassword")}
                            edge="end"
                            sx={{ color: "rgba(255,255,255,0.7)" }}
                          >
                            {showNewPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    InputLabelProps={{
                      sx: {
                        color: "rgba(255, 255, 255, 0.8)",
                        fontFamily: "Poppins",
                        "&.Mui-focused": { color: "white" },
                      },
                    }}
                    error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                    helperText={formik.touched.newPassword && formik.errors.newPassword}
                    sx={{
                      "& .MuiFormHelperText-root": { color: "#ffdddd", fontWeight: "500" },
                    }}
                  />

                  <TextField
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    label="Confirm New Password"
                    variant="standard"
                    fullWidth
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    InputProps={{
                      disableUnderline: false,
                      sx: {
                        color: "white",
                        fontFamily: "Poppins",
                        "&:before": { borderBottom: "2px solid rgba(255, 255, 255, 0.3)" },
                        "&:hover:not(.Mui-disabled):before": { borderBottom: "2px solid rgba(255, 255, 255, 0.5)" },
                        "&:after": { borderBottom: "2px solid white" },
                      },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => handleClickShowPassword("confirmPassword")}
                            edge="end"
                            sx={{ color: "rgba(255,255,255,0.7)" }}
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    InputLabelProps={{
                      sx: {
                        color: "rgba(255, 255, 255, 0.8)",
                        fontFamily: "Poppins",
                        "&.Mui-focused": { color: "white" },
                      },
                    }}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    sx={{
                      "& .MuiFormHelperText-root": { color: "#ffdddd", fontWeight: "500" },
                    }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      padding: "0.875rem 0",
                      fontFamily: "Poppins",
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      fontWeight: "600",
                      fontSize: "1rem",
                      textTransform: "none",
                      borderRadius: "12px",
                      border: "none",
                      color: "white",
                      boxShadow: "0 4px 15px 0 rgba(116, 75, 162, 0.4)",
                      marginTop: "1rem",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 6px 20px 0 rgba(116, 75, 162, 0.6)",
                      },
                    }}
                  >
                    Submit
                  </Button>

                  <Toast
                    alerting={toastInfo.toastAlert}
                    message={toastInfo.toastMessage}
                    severity={toastInfo.toastSeverity}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
