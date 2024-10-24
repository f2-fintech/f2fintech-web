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
          padding: "0 !important",
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
        height: "90vh",
        background:
          "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(6,55,158,1) 100%)",
        backgroundAttachment: "fixed", // Add this to prevent reflow
        backgroundSize: "cover",
      }}
    >
      <Card
        sx={{
          minHeight: "80%",
          padding: "2px",
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
        }}
      >
        <Box
          sx={{
            display: isMobile ? "block" : isTab ? "block" : "flex",
            justifyContent: isMobile ? "normal" : isTab ? "normal" : "flex-end",
            marginRight: isMobile ? "0vh" : "7vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: isMobile ? "0vh" : "0vh",
            }}
          >
            <Formik
              initialValues={{
                name: userData?.name || "",
                email: userData?.email || "",
                gender: userData?.gender || "",
                contact: userData?.contact || "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { resetForm }) => {
                handleSubmit(values, resetForm);
              }}
            >
              {({ values, handleChange, errors, touched }) => (
                <Form>
                  {editMode ? (
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          alignItems: "center",
                          textAlign: "center",
                          minHeight: "100%",
                          padding: "2px",
                          width: isMobile ? "36vh" : isTab ? "36vh" : "100%",
                          gap: 2,
                          marginTop: isMobile ? "14vh" : isTab ? "33vh" : "3vh",
                          marginLeft: isMobile ? "" : isTab ? "7vh" : "",
                          backgroundRepeat: "no-repeat",

                          // border: "2px solid",
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "monospace",
                            fontSize: isMobile
                              ? "8vw"
                              : isTab
                              ? "5vw"
                              : "2.5vw",
                            fontWeight: "300",
                            marginRight: isMobile
                              ? "23vh"
                              : isTab
                              ? "27vh"
                              : "50vh",
                          }}
                        >
                          Edit
                        </Typography>
                        <Field
                          as={TextField}
                          name="name"
                          label="Name"
                          autoComplete="off"
                          // fullWidth
                          onChange={handleChange}
                          value={values.name}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PersonIcon />
                              </InputAdornment>
                            ),
                            sx: {
                              width: isMobile
                                ? "15rem"
                                : isTab
                                ? "35rem"
                                : "25rem",
                              borderRadius: "20px",
                              fontSize: isMobile ? "2vw" : isTab ? "2vw" : "",
                              backgroundColor: "darkGray",
                            },
                          }}
                          InputLabelProps={{
                            style: { color: "black", fontSize: "1rem" }, // Change the color to your desired color
                          }}
                          error={touched.name && !!errors.name}
                          helperText={touched.name && errors.name}
                        />
                        <Field
                          as={TextField}
                          name="email"
                          label="Email"
                          autoComplete="off"
                          onChange={handleChange}
                          value={values.email}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <EmailIcon />
                              </InputAdornment>
                            ),
                            sx: {
                              width: isMobile
                                ? "15rem"
                                : isTab
                                ? "35rem"
                                : "25rem",
                              borderRadius: "20px",
                              fontSize: isMobile ? "2vw" : isTab ? "2vw" : "",
                              backgroundColor: "darkGray",
                            },
                          }}
                          InputLabelProps={{
                            style: { color: "black", fontSize: "1rem" }, // Change the color to your desired color
                          }}
                          error={touched.email && !!errors.email}
                          helperText={touched.email && errors.email}
                        />
                        <FormControl
                          sx={{
                            width: isMobile
                              ? "15rem"
                              : isTab
                              ? "35rem"
                              : "25rem",
                            borderRadius: "20px",
                            backgroundColor: "darkGray",
                            fontSize: isMobile ? "2vw" : isTab ? "2vw" : "",
                          }}
                        >
                          <InputLabel
                            sx={{
                              color: "black",
                              fontSize: "1rem",
                            }}
                          >
                            Gender
                          </InputLabel>
                          <Field
                            as={Select}
                            name="gender"
                            fullWidth={isMobile ? false : true}
                            onChange={handleChange}
                            value={values.gender}
                            disableUnderline
                            sx={{
                              width: isMobile
                                ? "15rem"
                                : isTab
                                ? "35rem"
                                : "25rem",
                              borderRadius: "20px",
                              fontSize: isMobile ? "2vw" : isTab ? "2vw" : "",
                            }}
                            error={touched.gender && !!errors.gender}
                            helperText={touched.gender && errors.gender}
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
                          autoComplete="off"
                          // fullWidth
                          onChange={handleChange}
                          value={values.contact}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PhoneAndroidIcon />
                              </InputAdornment>
                            ),
                            sx: {
                              width: isMobile
                                ? "15rem"
                                : isTab
                                ? "35rem"
                                : "25rem",
                              borderRadius: "20px",
                              fontSize: isMobile ? "2vw" : isTab ? "2vw" : "",
                              backgroundColor: "darkGray",
                            },
                          }}
                          InputLabelProps={{
                            style: { color: "black", fontSize: "1rem" }, // Change the color to your desired color
                          }}
                          error={touched.contact && !!errors.contact}
                          helperText={touched.contact && errors.contact}
                        />
                        <Box
                          display="flex"
                          gap={5}
                          alignItems="center"
                          // justifyContent="center"
                        >
                          <Button
                            variant="contained"
                            sx={{
                              width: isMobile
                                ? "5rem"
                                : isTab
                                ? "7rem"
                                : "8rem",

                              fontSize: isMobile ? "2vw" : isTab ? "2vw" : "",
                              borderRadius: "30px",
                              color: "black",
                              backgroundColor: "white",
                              "&:hover": {
                                backgroundColor: "green",
                                color: "white",
                              },
                            }}
                            type="submit"
                          >
                            Save
                          </Button>
                          <Button
                            variant="contained"
                            sx={{
                              width: isMobile
                                ? "5rem"
                                : isTab
                                ? "7rem"
                                : "8rem",
                              fontSize: isMobile ? "2vw" : isTab ? "2vw" : "",
                              borderRadius: "30px",
                              color: "black",
                              backgroundColor: "white",
                              "&:hover": {
                                backgroundColor: "red",
                                color: "white",
                              },
                            }}
                            onClick={() => setEditMode(false)}
                          >
                            Cancel
                          </Button>
                        </Box>
                      </Box>
                    </>
                  ) : (
                    // outerbox
                    <>
                      <Box>
                        {imageSrc ? (
                          <>
                            <Avatar
                              sx={{
                                width: isMobile
                                  ? "15vh"
                                  : isTab
                                  ? "20vh"
                                  : "32vh",
                                height: isMobile
                                  ? "15vh"
                                  : isTab
                                  ? "20vh"
                                  : "32vh",
                                fontSize: isMobile
                                  ? "10vw"
                                  : isTab
                                  ? "7vw"
                                  : "5vw",
                                marginLeft: isMobile
                                  ? "-4vh"
                                  : isTab
                                  ? "24vh"
                                  : "-2vh",
                                position: "absolute",
                                marginTop: "-7vh",
                                boxShadow:
                                  "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                                ":hover": {
                                  transform: "scale(1.1)",
                                  transition: "all 300ms ease-in-out",
                                },
                              }}
                              alt={values.name}
                              src={imageSrc}
                            />

                            <Box
                              sx={{
                                display: "flex",
                                position: "absolute",
                                gap: 2,
                                mt: 10,
                                ml: 2,
                              }}
                            >
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={handleUploadClick}
                              >
                                Upload
                              </Button>
                              <Button
                                variant="outlined"
                                color="secondary"
                                onClick={handleReInput}
                              >
                                Folder
                              </Button>
                            </Box>
                          </>
                        ) : (
                          <IconButton
                            sx={{
                              width: isMobile
                                ? "15vh"
                                : isTab
                                ? "20vh"
                                : "32vh",
                              height: isMobile
                                ? "15vh"
                                : isTab
                                ? "20vh"
                                : "32vh",
                              marginLeft: isMobile
                                ? "-40vh"
                                : isTab
                                ? "24vh"
                                : "-48vh",
                              position: "absolute",
                              marginTop: "-4vh",
                              boxShadow:
                                "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                            }}
                            component="label"
                          >
                            <AddPhotoAlternateIcon
                              sx={{
                                fontSize: isMobile
                                  ? "10vw"
                                  : isTab
                                  ? "7vw"
                                  : "5vw",
                              }}
                            />
                            <input
                              type="file"
                              accept="image/*"
                              hidden
                              onChange={(event) => {
                                const file = event.target.files[0];
                                if (file) {
                                  setSelectedPhoto(file);
                                  setImageSrc(URL.createObjectURL(file));
                                }
                              }}
                            />
                          </IconButton>
                        )}
                      </Box>

                      <Box
                        sx={{
                          width: isMobile ? "27vh" : isTab ? "60vh" : "100vh",
                          height: isMobile ? "45vh" : isTab ? "50vh" : "40vh",
                        }}
                      >
                        <Box
                          sx={{
                            width: isMobile
                              ? "40vh"
                              : isTab
                              ? "100vh"
                              : "100vh",
                            height: isMobile ? "30vh" : isTab ? "40vh" : "40vh",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 2,
                            marginTop: isMobile
                              ? "32vh"
                              : isTab
                              ? "30vh"
                              : "18vh",
                            marginLeft: isMobile
                              ? "-9vh"
                              : isTab
                              ? "7vh"
                              : "30vh",
                            // border: "2px solid",
                          }}
                        >
                          <Typography
                            sx={{
                              fontFamily: "monospace",
                              fontSize: isMobile
                                ? "5vw"
                                : isTab
                                ? "4vw"
                                : "2vw",
                              fontWeight: "500",
                              marginRight: {
                                xs: "0vh", // Adjust margin for extra small screens
                                md: "50vh", // Adjust margin for medium screens and above
                              },
                            }}
                          >
                            {userData?.name}
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: "monospace",
                              fontSize: isMobile
                                ? "4vw"
                                : isTab
                                ? "4vw"
                                : "1.5vw",
                              fontWeight: "400",
                              marginRight: {
                                xs: "0vh", // Adjust margin for extra small screens
                                md: "50vh", // Adjust margin for medium screens and above
                              },
                            }}
                          >
                            {userData?.email}
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: "monospace",
                              fontSize: isMobile
                                ? "4vw"
                                : isTab
                                ? "4vw"
                                : "1.5vw",
                              fontWeight: "400",
                              marginRight: {
                                xs: "0vh", // Adjust margin for extra small screens
                                md: "50vh", // Adjust margin for medium screens and above
                              },
                            }}
                          >
                            {userData?.contact}
                          </Typography>
                          <Button
                            variant="contained"
                            sx={{
                              width: isMobile
                                ? "5rem"
                                : isTab
                                ? "7rem"
                                : "8rem",
                              fontSize: isMobile ? "2vw" : isTab ? "2vw" : "",

                              borderRadius: "30px",
                              color: "black",
                              backgroundColor: "white",
                              marginRight: isMobile
                                ? "0vh"
                                : isTab
                                ? "50vh"
                                : "",
                              "&:hover": {
                                backgroundColor: "blue",
                                color: "white",
                              },
                              mt: 2,
                            }}
                            onClick={() => setEditMode(true)}
                          >
                            Edit
                          </Button>
                        </Box>
                      </Box>
                    </>
                  )}
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Card>
      <Toast
        alerting={toastInfo.toastAlert}
        message={toastInfo.toastMessage}
        severity={toastInfo.toastSeverity}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </Container>
  );
}
