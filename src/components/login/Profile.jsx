/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Avatar,
  Container,
  CircularProgress,
  InputAdornment,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import BoyIcon from "@mui/icons-material/Boy";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

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
        maxWidth={false}
        sx={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 0,
          backgroundRepeat: "no-repeat",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        background:
          "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(6,55,158,1) 100%)",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      <Card
        sx={{
          display: "flex",
          minHeight: "80%",
          padding: 2,
          height: "64vh",
          width: "80vw",
          maxWidth: "100%",
          textAlign: "center",
          mx: "auto",
          mt: 5,
          backgroundImage: "url('profilenawa.avif')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          borderRadius: "40px",
          backgroundColor: "#b3ffe0",
          justifyContent: "right",
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
                    mt: 4,
                    mr: "3rem",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "monospace",
                      fontSize: "2.5vw",
                      fontWeight: 300,
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
                        },
                        width: "25rem",
                        borderRadius: "20px",
                        backgroundColor: "white",
                      },
                    }}
                    InputLabelProps={{
                      style: { color: "black", fontSize: "1rem" },
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
                        },
                        width: "25rem",
                        borderRadius: "20px",
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
                      width: "25rem",
                      borderRadius: "20px",
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
                        "&.MuiOutlinedInput-root": {
                          "& fieldset": {
                            border: "none",
                          },
                        },
                      }}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            borderRadius: "15px", // Adds border-radius to the dropdown menu
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
                        },
                        width: "25rem",
                        borderRadius: "20px",
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
                        width: "8rem",
                        borderRadius: "30px",
                        backgroundColor: "navyblue",
                      }}
                      type="submit"
                    >
                      Save
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        width: "8rem",
                        borderRadius: "30px",
                        backgroundColor: "white",
                        color: "black",
                        "&:hover": {
                          backgroundColor: "white",
                          color: "black",
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
                    mt: 4,
                    mr: "10rem",
                  }}
                >
                  <Typography sx={{ fontFamily: "monospace", fontSize: "2vw" }}>
                    {userData?.name}
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "monospace", fontSize: "1.5vw" }}
                  >
                    {userData?.email}
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "monospace", fontSize: "1.5vw" }}
                  >
                    {userData?.contact}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      width: "8rem",
                      borderRadius: "30px",
                      backgroundColor: "white",
                      color: "black",
                      "&:hover": {
                        backgroundColor: "darkblue",
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
    </Container>
  );
}
