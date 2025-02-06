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
import { useFormik } from "formik";
import * as Yup from "yup";

import Toast from "../toast/Toast";
import { Utility } from "../utility";
import { CustomerAPI } from "../../apis/CustomerAPI";

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

  return (
    <Container
      maxWidth={false}
      sx={{
        height: {
          xs: "100vh", // For extra small screens
          sm: "60vh", // For small screens
          md: "70vh", // For medium screens
          lg: "90vh", // For large screens and above
        },
        display: "flex",
        flexDirection: {
          xs: "column",
          sm: "row",
          md: "row",
          xl: "row",
        },
        justifyContent: "center",
        alignItems: "center",
        padding: "0 !important",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: { xs: "30vh", sm: "50vh", md: "67vh" }, // Responsive heights
        }}
      >
        <img
          style={{
            width: "80%", // Makes image responsive
            height: "auto", // Maintain aspect ratio
            maxHeight: "67vh",
          }}
          src="/Resetpassword.gif"
          alt="password"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: {
            xs: "90%", // For extra small screens
            sm: "75%", // For small screens
            md: "60%", // For medium screens
            lg: "50%", // For large screens and above
          },
          height: {
            xs: "auto",
            md: "70vh",
          },
          marginTop: isMobile ? "10vh" : "",
          // marginLeft: isMobile ? "" : isTab ? "" : "100vh",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: {
              xs: "7vw", // For extra small screens
              sm: "4vw", // For small screens
              md: "3vw", // For medium screens and above
            },
            fontWeight: "700",
            fontFamily: "Poppins",
            textAlign: "center",
            lineHeight: "1.75rem",
            marginBottom: "5vh",
            color: "white",
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
            alignItems: "center",
            justifyContent: "center",
            gap: { xs: 2, sm: 3 },
            width: "100%",
            maxWidth: { xs: "90vw", sm: 400 },
            padding: { xs: 2, sm: 3 },
            // display:isMobile? "flex":"",
            // alignItems:isMobile?"center":"",
            // justifyItems:isMobile?"center":"",
          }}
        >
          {error && <Alert severity="error">{error}</Alert>}
          {!isOtpTrue ? (
            <TextField
              name="currentPassword"
              type={showCurrentPassword ? "text" : "password"}
              label="Current Password"
              variant="filled"
              value={formik.values.currentPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              InputLabelProps={{
                shrink: true, // Ensures the label remains at the top-left when focused
                sx: {
                  top: { md: "1vh", xs: ".7vh" },

                  textAlign: "start",
                  fontFamily: "Poppins",
                  fontSize: { xs: "4vw", sm: "2.5vw", md: "1.2vw" },
                  color: "#666666",
                },
              }}
              InputProps={{
                disableUnderline: true,
                sx: {
                  width: { xs: "80vw", sm: "50vw", md: "25vw" },
                  // height: "7vh",
                  height: {
                    xs: "5vh",
                    sm: "5vh",
                    md: "7vh",
                  },
                  borderRadius: "20px",
                  backgroundColor: "white",
                  fontFamily: "Poppins",
                  fontSize: { xs: "4vw", sm: "2.5vw", md: "1.2vw" },
                  color: "black",
                  "&:hover, &.Mui-focused": { backgroundColor: "white" },
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => handleClickShowPassword("currentPassword")}
                      edge="end"
                    >
                      {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                borderRadius: "20px",
                overflow: "hidden",
              }}
              error={
                formik.touched.currentPassword &&
                Boolean(formik.errors.currentPassword)
              }
              helperText={
                formik.touched.currentPassword && formik.errors.currentPassword
              }
            />
          ) : null}

          {["newPassword", "confirmPassword"].map((field) => (
            <TextField
              key={field}
              name={field}
              type={
                field === "newPassword"
                  ? showNewPassword
                    ? "text"
                    : "password"
                  : showConfirmPassword
                  ? "text"
                  : "password"
              }
              label={
                field === "newPassword"
                  ? "New Password"
                  : "Confirm New Password"
              }
              variant="filled"
              value={formik.values[field]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              InputLabelProps={{
                shrink: true, // Ensures the label remains at the top-left when focused
                sx: {
                  top: { md: "1vh", xs: ".7vh" },
                  textAlign: "start",
                  fontFamily: "Poppins",
                  fontSize: { xs: "4vw", sm: "2.5vw", md: "1.2vw" },
                  color: "#666666",
                },
              }}
              InputProps={{
                disableUnderline: true,
                sx: {
                  width: { xs: "80vw", sm: "50vw", md: "25vw" },
                  // height: "7vh",
                  height: {
                    xs: "5vh",
                    sm: "5vh",
                    md: "7vh",
                  },
                  borderRadius: "20px",
                  backgroundColor: "white",
                  fontFamily: "Poppins",
                  fontSize: { xs: "4vw", sm: "2.5vw", md: "1.2vw" },
                  color: "black",
                  "&:hover, &.Mui-focused": { backgroundColor: "white" },
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => handleClickShowPassword(field)}
                      edge="end"
                    >
                      {field === "newPassword" ? (
                        showNewPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )
                      ) : showConfirmPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ borderRadius: "20px", overflow: "hidden" }}
              error={formik.touched[field] && Boolean(formik.errors[field])}
              helperText={formik.touched[field] && formik.errors[field]}
            />
          ))}

          <Button
            type="submit"
            variant="contained"
            sx={{
              bgcolor: "#ffd700",
              color: "black",
              fontFamily: "Poppins",
              fontWeight: "500",
              fontSize: { xs: "4vw", sm: "2vw", md: "1rem" },
              lineHeight: "1.5rem",
              width: { xs: "25vw", sm: "20vw", md: "15vw" },
              height: { xs: "5vh", sm: "5vh", md: "5.5vh" },
              borderRadius: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              "&:hover": {
                bgcolor: "#ffd700",
                color: "#ffffff",
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
    </Container>
  );
}
