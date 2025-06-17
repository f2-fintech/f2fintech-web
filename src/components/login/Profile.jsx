/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Container,
  CircularProgress,
  InputAdornment,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useMediaQuery,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import BoyIcon from "@mui/icons-material/Boy";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useTheme } from "@mui/material/styles";
import API from "../../apis";
import Toast from "../toast/Toast";
import { Utility } from "../utility";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  gender: Yup.string().required("Gender is required"),
  contact: Yup.string().required("Contact is required"),
});

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [open, setOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const dispatch = useDispatch();
  const toastInfo = useSelector((state) => state.toastInfo);

  const { getLocalStorage, toastAndNavigate, uploadFileToS3 } = Utility();
  const customerId = getLocalStorage("customerInfo")?.id;
  const isMobile = useMediaQuery("(max-width:900px)");
  const isTab = useMediaQuery("(max-width:1200px)");

  useEffect(() => {
    API.CustomerAPI.getCustomerProfile(customerId)
      .then(({ data }) => {
        if (data.status === "Success") {
          setUserData(data.data.customer);
        }
      })
      .catch((err) => {
        console.log(err, "API response error");
      })
      .finally(() => {
        setLoading(false);
      });

    API.DocumentAPI.getCustomerDocuments(customerId)
      .then(({ data }) => {
        if (data.status === "Success") {
          setImageSrc(data.data.document_url);
        }
      })
      .catch((err) => {
        console.log(err, "API response error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [!editMode]);

  const handleUploadClick = useCallback(() => {
    if (selectedPhoto) {
      uploadFileToS3(selectedPhoto, "profile", customerId);
    }
  }, [selectedPhoto]);

  const handleDelete = () => {
    if (selectedPhoto) {
      // deleteFileFromS3("profile", customerId, selectedPhoto.name); // Replace with your delete logic
      setSelectedPhoto(null);
      setImageSrc(null);
      console.log("handleDelete", handleDelete);
    }
  };

  const handleReInput = () => {
    setSelectedPhoto(null);
    setImageSrc(null);
  };

  const handleSubmit = (formData, resetForm) => {
    setLoading(true);
    API.CustomerAPI.updateCustomerProfile({
      ...formData,
      customerId,
    })
      .then((res) => {
        if (res.status === "Success") {
          setEditMode(false);
          resetForm();
          toastAndNavigate(
            dispatch,
            true,
            "success",
            "Profile updated successfully!"
          );
        }
      })
      .catch((err) => {
        console.log(err, "Error updating customer profile:");
        if (err) {
          setOpen(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <Container
        // maxWidth={false}
        sx={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // backgroundColor: theme.palette.background.default,
          padding: 0,
          backgroundRepeat: "no-repeat",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: "auto",
        width: "100%",
        backgroundColor: theme.palette.secondary.main,
      }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",

          height: "80vh",
          // backgroundImage: "url(caltheme.png)",
          // backgroundSize: "cover",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "70vw",
          }}
        >
          <img
            style={{ height: "70vh", borderRadius: "40px" }}
            src="/profile1.gif"
            alt="profile"
            className="profile-image"
          />

          <style jsx>{`
            @media (max-width: 1068px) {
              .profile-image {
                display: none;
              }
            }
          `}</style>
          <Card
            sx={{
              display: "flex",
              // padding: 2,
              boxShadow: `0 0 10px ${theme.palette.secondary.main}`,
              // height: "60vh",
              // width: "45vw",
              height: {
                xs: "60vh",
                md: "60vh",
                sm: "60vh",
                lg: "70vh",
              },
              width: {
                xs: "75vw",
                md: "45vw",
                sm: "60vw",
                lg: "70vh",
              },
              // backgroundImage: "url('caltheme.png')",
              backgroundColor: theme.palette.background.default,
              backgroundSize: "550%",

              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              borderRadius: "40px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Formik
              initialValues={{
                name: userData?.name || "",
                email: userData?.email || "",
                gender: userData?.gender || "",
                contact: userData?.contact || "",
              }}
              enableReinitialize
              validationSchema={validationSchema}
              onSubmit={(values, { resetForm }) => {
                handleSubmit(values, resetForm);
              }}
            >
              {({ values, handleChange, errors, touched }) => (
                <Form>
                  {editMode ? (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 2,
                        // mt: 4,
                        // mr: "3rem",
                      }}
                    >
                      <Typography
                        sx={{
                          color: theme.palette.text.primary,

                          fontFamily: "DM sans",
                          // fontSize: "2.5vw",
                          fontSize: {
                            md: "2.5vw",
                            xs: "8vw",
                            sm: "4vw",
                          },
                          fontWeight: 550,
                        }}
                      >
                        Edit
                      </Typography>
                      <Field
                        as={TextField}
                        name="name"
                        label="Name"
                        onChange={handleChange}
                        value={values.name}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon />
                            </InputAdornment>
                          ),
                          sx: {
                            border: "none",
                            "&.MuiOutlinedInput-root": {
                              "& fieldset": {
                                border: "none",
                              },
                              "& input": {
                                fontFamily: "'Poppins',", // Change font family
                                fontSize: "1rem", // Change font size
                                color: "black", // Set input text color to black
                              },
                            },
                            // width: "25vw",
                            width: {
                              md: "25vw",
                              xs: "50vw",
                              sm: "40vw",
                            },
                            // height: "8vh",
                            height: {
                              md: "8vh",
                              xs: "5.5vh",
                              sm: "6.5vh",
                            },
                            borderRadius: "8px",
                            backgroundColor: "white",
                          },
                        }}
                        InputLabelProps={{
                          style: {
                            color: "black",
                            fontSize: "1.1rem", // Change font size of the label
                            fontFamily: "'Poppins', sans-serif", // Change font family of the label
                          },
                        }}
                        error={touched.name && !!errors.name}
                        helperText={touched.name && errors.name}
                      />

                      <Field
                        as={TextField}
                        name="email"
                        label="Email"
                        onChange={handleChange}
                        value={values.email}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon />
                            </InputAdornment>
                          ),
                          sx: {
                            border: "none",
                            "&.MuiOutlinedInput-root": {
                              "& fieldset": {
                                border: "none",
                              },
                              "& input": {
                                fontFamily: "'Poppins',", // Change font family
                                fontSize: "1rem", // Change font size
                                color: "black", // Set input text color to black
                              },
                            },
                            width: {
                              md: "25vw",
                              xs: "50vw",
                              sm: "40vw",
                            },
                            // height: "8vh",
                            height: {
                              md: "8vh",
                              xs: "5.5vh",
                              sm: "6.5vh",
                            },
                            borderRadius: "8px",
                            backgroundColor: "white",
                          },
                        }}
                        InputLabelProps={{
                          style: { color: "black", fontSize: "1rem" },
                        }}
                        error={touched.email && !!errors.email}
                        helperText={touched.email && errors.email}
                      />
                      <FormControl
                        sx={{
                          width: {
                            md: "25vw",
                            xs: "50vw",
                            sm: "40vw",
                          },
                          // height: "8vh",
                          height: {
                            md: "8vh",
                            xs: "5.5vh",
                            sm: "6.5vh",
                          },
                          borderRadius: "8px",
                          backgroundColor: "white",
                        }}
                      >
                        <InputLabel
                          sx={{
                            fontSize: "1rem",
                            "&.Mui-focused": {
                              color: "black", // Ensures the label color stays black when focused
                            },
                          }}
                        >
                          Gender
                        </InputLabel>
                        <Field
                          as={Select}
                          name="gender"
                          onChange={handleChange}
                          value={values.gender}
                          startAdornment={
                            <InputAdornment position="start">
                              <BoyIcon />
                            </InputAdornment>
                          }
                          sx={{
                            border: "none",
                            color: "black",
                            // Ensures the selected text is black
                            "&.MuiOutlinedInput-root": {
                              "& fieldset": {
                                border: "none",
                              },
                            },
                            "& .MuiSelect-select": {
                              color: "black", // Sets the color of the selected value
                            },
                          }}
                          MenuProps={{
                            PaperProps: {
                              sx: {
                                backgroundColor: "black", // Dropdown menu background color
                                color: "white", // Text color in the dropdown menu
                                borderRadius: "15px", // Adds border-radius to the dropdown menu
                                "& .MuiMenuItem-root": {
                                  color: "white", // Dropdown options text color
                                  "&:hover": {
                                    backgroundColor: "#333333", // Hover effect background color
                                  },
                                },
                              },
                            },
                          }}
                        >
                          <MenuItem value="male">Male</MenuItem>
                          <MenuItem value="female">Female</MenuItem>
                          <MenuItem value="other">Other</MenuItem>
                        </Field>
                      </FormControl>
                      <Field
                        as={TextField}
                        name="contact"
                        label="Contact"
                        onChange={handleChange}
                        value={values.contact}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PhoneAndroidIcon />
                            </InputAdornment>
                          ),
                          sx: {
                            border: "none",
                            "&.MuiOutlinedInput-root": {
                              "& fieldset": {
                                border: "none",
                              },
                              "& input": {
                                fontFamily: "'Poppins',", // Change font family
                                fontSize: "1rem", // Change font size
                                color: "black", // Set input text color to black
                              },
                            },
                            width: {
                              md: "25vw",
                              xs: "50vw",
                              sm: "40vw",
                            },
                            // height: "8vh",
                            height: {
                              md: "8vh",
                              xs: "5.5vh",
                              sm: "6.5vh",
                            },
                            borderRadius: "8px",
                            backgroundColor: "white",
                          },
                        }}
                        InputLabelProps={{
                          style: { color: "black", fontSize: "1rem" },
                        }}
                        error={touched.contact && !!errors.contact}
                        helperText={touched.contact && errors.contact}
                      />
                      <Box display="flex" gap={5}>
                        <Button
                          variant="contained"
                          sx={{
                            width: {
                              md: "10vw",
                              xs: "27vw",
                              sm: "18vw",
                            },
                            height: {
                              md: "2.5vw",
                              xs: "9vw",
                              sm: "6.5vw",
                            },
                            borderRadius: "30px",
                            backgroundColor: theme.palette.secondary.main,
                            fontFamily: "Poppins",
                            fontWeight: 450,
                            fontSize: "2vh",
                            color: "white",
                            "&:hover": {
                              backgroundColor: theme.palette.secondary.main,
                            },
                          }}
                          type="submit"
                        >
                          Save
                        </Button>
                        <Button
                          variant="contained"
                          sx={{
                            width: {
                              md: "10vw",
                              xs: "27vw",
                              sm: "18vw",
                            },
                            height: {
                              md: "2.5vw",
                              xs: "9vw",
                              sm: "6.5vw",
                            },
                            borderRadius: "30px",
                            backgroundColor: theme.palette.secondary.main,
                            fontFamily: "Poppins",
                            fontWeight: 450,
                            fontSize: "2vh",
                            color: "white",
                            "&:hover": {
                              backgroundColor: theme.palette.secondary.main,
                            },
                          }}
                          onClick={() => setEditMode(false)}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        gap: 2,
                        // mt: 4,
                        // mr: "10rem",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "DM sans",
                          color: theme.palette.text.primary,

                          fontSize: {
                            md: "2.5vw",
                            xs: "8vw",
                            sm: "4vw",
                          },
                          textTransform: "capitalize",
                          fontWeight: 530,
                        }}
                      >
                        {userData?.name}
                      </Typography>
                      <Typography
                        sx={{
                          color: theme.palette.text.primary,

                          fontFamily: "DM sans",
                          fontSize: {
                            md: "1.67vw",
                            xs: "4.5vw",
                            sm: "3vw",
                          },
                        }}
                      >
                        {userData?.email}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "DM sans",
                          color: theme.palette.text.primary,
                          fontSize: {
                            md: "1.67vw",
                            xs: "4.5vw",
                            sm: "3vw",
                          },
                          fontWeight: "550",
                        }}
                      >
                        {userData?.contact}
                      </Typography>
                      <Button
                        variant="contained"
                        sx={{
                          width: {
                            md: "10vw",
                            xs: "27vw",
                            sm: "18vw",
                          },
                          height: {
                            md: "2.5vw",
                            xs: "9vw",
                            sm: "6.5vw",
                          },
                          borderRadius: "30px",
                          backgroundColor: theme.palette.secondary.main,
                          fontFamily: "Poppins",
                          fontWeight: 450,
                          fontSize: "2vh",
                          color: "white",
                          "&:hover": {
                            backgroundColor: theme.palette.secondary.main,
                            color: "white",
                          },
                        }}
                        onClick={() => setEditMode(true)}
                      >
                        Edit
                      </Button>
                    </Box>
                  )}
                </Form>
              )}
            </Formik>
            <Toast
              alerting={toastInfo.toastAlert}
              message={toastInfo.toastMessage}
              severity={toastInfo.toastSeverity}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            />
          </Card>
        </Box>
      </Container>
    </Box>
  );
}
