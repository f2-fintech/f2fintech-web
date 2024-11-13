import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  TextField,
  Button,
  Box,
  Typography,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  InputAdornment,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
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
const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const SignUpSchema = Yup.object().shape({
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
  gender: Yup.string().required("Gender is required"),
});

export default function Signup({ isSignUp, setIsSignUp, onLoginSuccess }) {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState("");
  const dispatch = useDispatch();
  const toastInfo = useSelector((state) => state.toastInfo);
  const { setLocalStorage, toastAndNavigate } = Utility();
  const isMobile = useMediaQuery("(max-width:480px)");
  const isTab = useMediaQuery("(max-width:820px)");

  useEffect(() => {
    let timer;
    if (showError) {
      timer = setTimeout(() => {
        setShowError(null);
      }, 3000); // 3000 ms = 3 seconds
    }
    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts or showError changes
  }, [showError]);

  //
  const handleSubmit = async (formData, resetForm) => {
    setLoading(true);
    try {
      const response = await axiosClient.post(
        "/create-customer",
        JSON.stringify(formData)
      );

      console.log("RESPONSEE", response);
      setLoading(false);
      if (response.data.status === "Success") {
        const customerInfo = {
          id: response.data.data.id,
          name: response.data.data.name,
          token: response.data.data.token,
        };
        setLocalStorage("customerInfo", customerInfo);
        toastAndNavigate(dispatch, true, "success", "SignUp Successful");
        resetForm();
        onLoginSuccess();
        // toastAndNavigate(
        //   dispatch,
        //   true,
        //   "success",
        //   "Signup Successful",
        //   () => { },
        //   null,
        //   false,
        //   () => setIsSignUp(false)
        // );
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 409) {
        console.log("Phone number already registered", error);
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

  return (
    <Box
      sx={{
        backgroundImage: "url('nawaz11111.jpg')",
        backgroundSize: isMobile ? "cover" : "cover",
        backgroundRepeat: isMobile ? "no-repeat" : "",
        width: {
          xs: "100%", // For extra small screens
          sm: "75%", // For small screens
          md: "60%", // For medium screens
          lg: "50%", // For large screens and above
        },
        borderRadius: isMobile
          ? "0%"
          : isTab
          ? "30% 0% 0% 30%"
          : "30% 0% 0% 30%",
        height: "100vh",

        backgroundPosition: isMobile ? "right" : "top",
        margin: 0,
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: isMobile ? "flex-start" : "center",
        ...(!isSignUp && {
          display: isMobile ? "none" : "",
        }),
      }}
    >
      <Box
        sx={{
          height: "66vh",
          width: {
            xs: "90%", // For extra small screens
            md: "50%", // For medium screens and above
          },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 4,
          zIndex: 1,
          ...(!isSignUp && {
            visibility: "hidden",
            opacity: 0,
            // transition: "visibility 0s linear 500ms,opacity 500ms",
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
            color: "white",
            fontSize: isMobile ? "10vw" : "2.3vw",
            fontweight: "400",
            fontFamily: "verdana",
            textAlign: "center",
            lineHeight: "1.75rem",
            marginTop: isMobile ? "13vh" : isTab ? "10vh" : "",
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
            gender: "",
          }}
          validationSchema={SignUpSchema}
          onSubmit={(formData, { resetForm }) => {
            setLoading(true);
            handleSubmit(formData, resetForm);
            console.log(formData, "formData");
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
            setErrors,
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
                name="name"
                label="Full Name*"
                type="text"
                variant="filled"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                  disableUnderline: true,
                  sx: {
                    backgroundColor: "white", // Permanent white background for the input area
                    borderRadius: "20px",
                    width: {
                      xs: "20rem",
                      sm: "22rem",
                      md: "25rem",
                    },
                    fontSize: "1vw",
                    padding: "0 12px",
                    "&:hover": {
                      backgroundColor: "white", // Ensures background remains white on hover
                    },
                    "&.Mui-focused": {
                      backgroundColor: "white", // Ensures background remains white on focus
                    },
                  },
                }}
                sx={{
                  borderRadius: "20px",
                  "& .MuiFormHelperText-root": {
                    marginLeft: "10px", // Adjusts error message positioning
                  },
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
                error={touched.name && !!errors.name}
                helperText={touched.name && errors.name}
              />

              <TextField
                name="contact"
                label="Contact Number*"
                type="number"
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
                    maxLength: 10,
                    width: {
                      xs: "20rem", // For extra small screens
                      sm: "22rem", // For small screens
                      md: "25rem", // For medium screens and above
                    },
                    borderRadius: "20px",
                    backgroundColor: "white", // Set permanent white background
                    fontSize: "1vw",
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
                name="password"
                label="Password*"
                type={showPassword ? "text" : "password"}
                variant="filled"
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
                    backgroundColor: "white!important", // Permanent white background
                    fontSize: "1vw",
                    "&:hover": {
                      backgroundColor: "white!important", // Keeps white background on hover
                    },
                    "&.Mui-focused": {
                      backgroundColor: "white!important", // Keeps white background on focus
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

              <TextField
                name="email"
                label="Email"
                type="email"
                variant="filled"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
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
                    fontSize: "1vw",
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
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />

              <FormControl
                variant="filled"
                sx={{
                  width: {
                    xs: "20rem", // For extra small screens
                    sm: "22rem", // For small screens
                    md: "25rem", // For medium screens and above
                  },
                  borderRadius: "20px",
                  overflow: "hidden",
                  "& .MuiFilledInput-root": {
                    backgroundColor: "white", // Permanent white background
                    "&:before, &:after": {
                      borderBottom: "none",
                    },
                    "&:hover:not(.Mui-disabled):before": {
                      borderBottom: "none",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "white", // Keeps white background on focus
                    },
                  },
                }}
                error={touched.gender && !!errors.gender}
              >
                <InputLabel>*Gender</InputLabel>
                <Select
                  name="gender"
                  value={values.gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disableUnderline
                  sx={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    backgroundColor: "white", // Permanent white background
                    fontSize: "1vw",
                    "&:hover": {
                      backgroundColor: "white", // Keeps white background on hover
                    },
                    "&.Mui-focused": {
                      backgroundColor: "white", // Keeps white background on focus
                    },
                  }}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
                {touched.gender && errors.gender && (
                  <Typography
                    color="error"
                    variant="caption"
                    marginLeft="15px"
                    marginTop="5px"
                  >
                    {errors.gender}
                  </Typography>
                )}
              </FormControl>

              {showError && <div style={{ color: "red" }}>{showError}</div>}

              <Button
                variant="contained"
                disabled={!dirty || isSubmitting}
                type="submit"
                sx={{
                  borderRadius: "20px",
                  width: {
                    xs: "50%", // For extra small screens
                    sm: "30%", // For small screens
                    md: "10vw", // For medium screens and above
                  },
                  color: "white",
                  fontWeight: "500",
                  fontSize: isMobile ? "5vw" : "1rem",
                  lineHeight: "1.5rem",
                }}
              >
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>
        <Toast
          alerting={toastInfo.toastAlert}
          message={toastInfo.toastMessage}
          severity={toastInfo.toastSeverity}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        />
      </Box>
    </Box>
  );
}
