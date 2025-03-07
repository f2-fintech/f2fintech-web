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
  FilledInput,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import { Visibility, VisibilityOff, Wc } from "@mui/icons-material";
import PasswordIcon from "@mui/icons-material/Password";
import EmailIcon from "@mui/icons-material/Email";
import ManIcon from "@mui/icons-material/Man";
import dayjs from "dayjs";
import { subYears } from "date-fns";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";

import Toast from "../toast/Toast";
import axiosClient from "../../api/apiClient";
import { Utility } from "../utility";

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address") // Validates proper email format
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
  // gender: Yup.string(),
  // dob: Yup.date()
  //   .nullable()
  //   .typeError("Invalid date format")
  //   .test("not-future", "Invalid age", (value) => value && value < new Date())
  //   .max(subYears(new Date(), 20), "You must be at least 20 years old to apply")
  //   .required("This field is required"),
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

      console.log("formData", formData);
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

  // Get the current date and calculate 20 years ago
  const minDate = dayjs("1900-01-01");
  const maxDate = dayjs().subtract(20, "year");
  const theme = useTheme ();
  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        //  backgroundSize:'125%',
        backgroundSize: isMobile ? "100%" : "100%",
        backgroundImage: "url(caltheme5.png)",
        borderTopRightRadius: isMobile ? "0px" : "120px",
        borderBottomRightRadius: isMobile ? "0px" : "120px",
        borderRadius: isMobile ? "15px" : "120",
        width: {
          xs: "90%", // For extra small screens
          sm: "75%", // For small screens
          md: "60%", // For medium screens
          lg: "50%", // For large screens and above
        },
        // height: "100vh",
        height: {
          xs: "65vh",
          md: "100vh",
          sm: "100vh",
          lg: "100vh",
        },

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
          // marginBottom: "8.5vh",
          width: {
            xs: "90%", // For extra small screens
            md: "50%", // For medium screens and above
          },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          gap: isMobile ? 1 :            4,
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
            fontSize: { xs: "6.5vw", sm: "2.6vw" }, // Adjust font size for smaller screens
            textAlign: "center",
            marginTop: {
              xs: "11vh",
              sm: "inherit",
              md: "inherit",
            },
            color: "white",

            lineHeight: "1.75rem",
            fontWeight: "570",
            // marginBottom: "1.5rem",
            fontFamily: "DM sans",
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
            // gender: "",
            // dob: null,
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
            setFieldValue,
          }) => (
            <Form
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: isMobile ? 6: 10,
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
                      <PersonIcon    sx={{
                        fontSize: {
                          xs: "1.1rem",
                          sm: "inherit",
                          md: "inherit",
                        },
                      }} />
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
                    color: "black",
                    fontSize: {
                      xs: "2.8vw",
                      sm: "2vw",
                      md: "default",
                    },                    padding: "0 12px",

                    "&:hover": {
                      backgroundColor: "white", // Ensures background remains white on hover
                      color: "black",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "white", // Ensures background remains white on focus
                      color: "black",
                    },
                  },
                }}
                sx={{
                  // borderRadius: "20px",
                  "& .MuiFormHelperText-root": {
                    marginLeft: "10px", // Adjusts error message positioning
                  },
                  "& .MuiFilledInput-root": {
                    backgroundColor: "white", // Ensures background is white in filled input
                    "&:hover": {
                      backgroundColor: "white", // Keeps white background on hover
                      color: "black",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "white", // Keeps white background on focus
                      color: "black",
                    },
                    borderRadius: isMobile ? "15px" : "2px 20px 20px 2px", // 0 on the left, 30px on the right
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
                      <PhoneAndroidIcon   sx={{
                        fontSize: {
                          xs: "8.rem",
                          sm: "inherit",
                          md: "inherit",
                        },
                      }}/>
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
                    color: "black",
                    borderRadius: "20px",
                    backgroundColor: "white", // Set permanent white background
                    fontSize: {
                      xs: "2.8vw",
                      sm: "2vw",
                      md: "default",
                    },                    "&:hover": {
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
                  "& .MuiFormHelperText-root": {
                    color: "white", // Custom error message color
                  },
                }}
                error={touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
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
                      <EmailIcon   sx={{
                        fontSize: {
                          xs: "1.1rem",
                          sm: "inherit",
                          md: "inherit",
                        },
                      }}/>
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
                    fontSize: {
                      xs: "2.8vw",
                      sm: "2vw",
                      md: "default",
                    },                    "&:hover": {
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
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
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
                      <PasswordIcon   sx={{
                        fontSize: {
                          xs: "1.1rem",
                          sm: "inherit",
                          md: "inherit",
                        },
                      }}/>
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
                    backgroundColor: "white!important", // Permanent white background
                    fontSize: {
                      xs: "2.8vw",
                      sm: "2vw",
                      md: "default",
                    },                    "&:hover": {
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
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
              />
              <Field
                as={FormControl}
                variant="filled"
                sx={{
                  width: {
                    xs: "20rem", // For extra small screens
                    sm: "22rem", // For small screens
                    md: "25rem", // For medium screens and above
                  },
                  color: "black",
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
                    borderRadius: "20px 2px 2px 20px", // 0 on the left, 30px on the right
                  },
                }}
                error={touched.gender && Boolean(errors.gender)}
              >
                {/* <InputLabel>Gender*</InputLabel> */}
                {/* <Select
                  name="gender"
                  value={values.gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        borderRadius: "20px", // Applies rounded corners to the dropdown
                        overflow: "hidden",
                        backgroundColor: "black", // Dropdown background color
                      },
                    },
                  }}
                  disableUnderline
                  sx={{
                    borderRadius: "20px 2px 2px 20px", // 0 on the left, 30px on the right

                    overflow: "hidden",
                    backgroundColor: "white", // Permanent white background
                    fontSize: "1vw",
                    color: "black",
                    "&:hover": {
                      backgroundColor: "white", // Keeps white background on hover
                    },
                    "&.Mui-focused": {
                      backgroundColor: "white", // Keeps white background on focus
                    },
                  }}
                  startAdornment={
                    <InputAdornment position="start">
                      <Wc />
                    </InputAdornment>
                  }
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select> */}
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
                <Box
                  sx={{
                    width: "75%",
                    mt: 1.8,
                  }}
                >
                  {/* <LocalizationProvider
                    sx={{
                      border: "none",                    }}
                    dateAdapter={AdapterDayjs}
                  >
                    <DatePicker
                      sx={{
                        backgroundColor: "white",
                        borderRadius: "20px 2px 2px 20px", // 0 on the left, 30px on the right

                        width: "25rem",
                        height: "3.5rem",
                        "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                        "& .css-1koqp8o-MuiFormLabel-root-MuiInputLabel-root.Mui-focused":
                          {
                            color: "black",
                            backgroundColor: "white",
                            borderRadius: 2,
                          },
                        "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input:focus":
                          {
                            color: "black !important", // Text color
                          },
                        "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input":
                          {
                            color: "black !important", // Text color
                          },
                      }}
                      format="DD MMMM YYYY"
                      views={["day", "month", "year"]}
                      label="Select Date Of Birth*"
                      name="dob"
                      minDate={minDate} // Start at 1900
                      maxDate={maxDate} // End at 20 years before today
                      error={touched.dob && !!errors.dob}
                      helperText={touched.dob && errors.dob}
                      value={values.dob}
                      onBlur={() => setFieldTouched("dob", true)}
                      onChange={(newValue) => {
                        console.log("newValue", newValue);
                        setFieldValue("dob", newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          margin="normal"
                          sx={{
                            border: "none",
                          }}
                        />
                      )}
                    />

                    <ErrorMessage
                      name="dob"
                      component="div"
                      style={{
                        color: "white",
                        margin: "5px 14px",
                        fontFamily: "Verdana, sans-serif",
                        fontSize: "0.6428571428571428rem",
                        fontWeight: "400",
                      }} // Inline style for color
                    />
                  </LocalizationProvider> */}
                  {/* <Typography
                    sx={{
                      fontSize: ".85rem",
                      color: "white",
                      ml: "16px",
                      mt: "3px",
                      fontFamily: "poppins",
                      fontWeight: "340",
                    }}
                  >
                    *Minimum age 20 required
                  </Typography> */}
                </Box>
              </Field>

              {showError && <div style={{ color: "red" }}>{showError}</div>}

              <Button
                variant="contained"
                disabled={!dirty || isSubmitting}
                type="submit"
                sx={{
                  marginTop: isMobile ? "2vh" : isTab ? "" : "0px",
                  width: {
                    xs: "50%", // For extra small screens
                    sm: "30%", // For small screens
                    md: "10vw", // For medium screens and above
                  },
                  padding: "0.5rem 1.5rem",
                  backgroundColor: theme.palette.whitetext.white,
                  fontFamily: "Poppins",
                  marginBottom:"2rem",
                  fontWeight: isMobile ? "500" :"",
                  lineHeight: "1.5rem",
                  textTransform: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: { xs: "1.2rem", sm: "1rem" },
                  borderRadius: "20px",
                  top: "-2vh",
                  "&:hover": {
                    color: theme.palette.secondary.main,
                    backgroundColor: theme.palette.whitetext.white,
                  },
                }}
              >
                Sign Up
              </Button>
              <Typography
                sx={{
                  color: "white",
                  fontFamily: "Poppins",
                  display: { xs: "block", sm: "none" },
                }}
              >
                Already have an account?
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
                  sign in
                </Button>
              )}
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
