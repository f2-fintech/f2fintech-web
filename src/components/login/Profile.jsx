import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
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
        minHeight: { xs: "auto", md: "calc(100vh - 12vh)" },
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #3244e6 0%, #5b6df5 100%)",
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
          <img
            style={{
              height: "auto",
              maxHeight: "60vh",
              width: "100%",
              maxWidth: "500px",
              borderRadius: "40px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
              display: isMobile ? "none" : "block",
            }}
            src="/f2Fintechlogo.webp"
            alt="profile"
          />
          <Box
            sx={{
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(20px)",
              borderRadius: "24px",
              padding: { xs: "1.5rem 1rem", sm: "2rem", md: "2.5rem" },
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
              width: "100%",
              maxWidth: { xs: "100%", sm: "480px" },
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
                backgroundImage: "url(/f2Fintechlogo-old.webp)",
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                filter: "blur(4px) opacity(0.4)",
                zIndex: 0,
              }}
            />

            <Box sx={{ position: "relative", zIndex: 1, width: "100%" }}>
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
                            fontSize: { xs: "1.75rem", sm: "2.5rem" },
                            fontWeight: "700",
                            color: "white",
                            fontFamily: "'Poppins', sans-serif",
                            marginBottom: "1rem",
                            textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                            textAlign: "center",
                          }}
                        >
                          Edit Profile
                        </Typography>
                        <Field
                          as={TextField}
                          name="name"
                          label="Name"
                          variant="standard"
                          fullWidth
                          onChange={handleChange}
                          value={values.name}
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
                              "& .MuiInput-input": {
                                fontFamily: "'Poppins', sans-serif",
                              },
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
                              color: "rgba(255, 255, 255, 0.8)",
                              fontFamily: "'Poppins', sans-serif",
                              "&.Mui-focused": {
                                color: "white",
                              },
                            },
                          }}
                          error={touched.name && !!errors.name}
                          helperText={touched.name && errors.name}
                          sx={{
                            "& .MuiFormHelperText-root": {
                              color: "#ffdddd",
                              fontWeight: "500",
                            },
                          }}
                        />

                        <Field
                          as={TextField}
                          name="email"
                          label="Email"
                          variant="standard"
                          fullWidth
                          onChange={handleChange}
                          value={values.email}
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
                              "& .MuiInput-input": {
                                fontFamily: "'Poppins', sans-serif",
                              },
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
                              color: "rgba(255, 255, 255, 0.8)",
                              fontFamily: "'Poppins', sans-serif",
                              "&.Mui-focused": {
                                color: "white",
                              },
                            },
                          }}
                          error={touched.email && !!errors.email}
                          helperText={touched.email && errors.email}
                          sx={{
                            "& .MuiFormHelperText-root": {
                              color: "#ffdddd",
                              fontWeight: "500",
                            },
                          }}
                        />
                        <FormControl variant="standard" fullWidth>
                          <InputLabel
                            sx={{
                              color: "rgba(255, 255, 255, 0.8)",
                              fontFamily: "'Poppins', sans-serif",
                              "&.Mui-focused": {
                                color: "white",
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
                                <BoyIcon sx={{ color: "rgba(255,255,255,0.7)" }} />
                              </InputAdornment>
                            }
                            sx={{
                              color: "white",
                              fontFamily: "'Poppins', sans-serif",
                              "&:before": {
                                borderBottom: "2px solid rgba(255, 255, 255, 0.3)",
                              },
                              "&:hover:not(.Mui-disabled):before": {
                                borderBottom: "2px solid rgba(255, 255, 255, 0.5)",
                              },
                              "&:after": {
                                borderBottom: "2px solid white",
                              },
                              "& .MuiSelect-select": {
                                color: "white",
                              },
                              "& .MuiSvgIcon-root": {
                                color: "rgba(255,255,255,0.7)",
                              },
                            }}
                            MenuProps={{
                              PaperProps: {
                                sx: {
                                  background: "rgba(30, 60, 114, 0.95)",
                                  backdropFilter: "blur(10px)",
                                  color: "white",
                                  borderRadius: "12px",
                                  "& .MuiMenuItem-root": {
                                    fontFamily: "'Poppins', sans-serif",
                                    "&:hover": {
                                      background: "rgba(255, 255, 255, 0.1)",
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
                          variant="standard"
                          fullWidth
                          onChange={handleChange}
                          value={values.contact}
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
                              "& .MuiInput-input": {
                                fontFamily: "'Poppins', sans-serif",
                              },
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
                              color: "rgba(255, 255, 255, 0.8)",
                              fontFamily: "'Poppins', sans-serif",
                              "&.Mui-focused": {
                                color: "white",
                              },
                            },
                          }}
                          error={touched.contact && !!errors.contact}
                          helperText={touched.contact && errors.contact}
                          sx={{
                            "& .MuiFormHelperText-root": {
                              color: "#ffdddd",
                              fontWeight: "500",
                            },
                          }}
                        />
                        <Box
                          sx={{
                            display: "flex",
                            gap: 3,
                            width: "100%",
                            marginTop: "1.5rem"
                          }}
                        >
                          <Button
                            variant="contained"
                            type="submit"
                            sx={{
                              flex: 1,
                              padding: "0.875rem 0",
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
                              "&:hover": {
                                background: "linear-gradient(135deg, #3244e6 0%, #5c6cf2 100%)",
                                transform: "translateY(-2px)",
                                boxShadow: "0 6px 20px 0 rgba(50, 68, 230, 0.6)",
                              },
                            }}
                          >
                            Save
                          </Button>
                          <Button
                            variant="outlined"
                            onClick={() => setEditMode(false)}
                            sx={{
                              flex: 1,
                              padding: "0.875rem 0",
                              fontFamily: "Poppins",
                              color: "white",
                              fontWeight: "600",
                              fontSize: "1rem",
                              textTransform: "none",
                              borderRadius: "12px",
                              border: "2px solid rgba(255, 255, 255, 0.5)",
                              "&:hover": {
                                border: "2px solid white",
                                background: "rgba(255, 255, 255, 0.1)",
                                transform: "translateY(-2px)",
                              },
                            }}
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
                          justifyContent: "center",
                          alignItems: "center",
                          gap: 2,
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
                            textTransform: "capitalize",
                          }}
                        >
                          {userData?.name}
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width: "100%", alignItems: "center", mb: 3 }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, color: "rgba(255,255,255,0.9)" }}>
                            <EmailIcon sx={{ fontSize: "1.2rem" }} />
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: "1.1rem" }}>
                              {userData?.email}
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, color: "rgba(255,255,255,0.9)" }}>
                            <PhoneAndroidIcon sx={{ fontSize: "1.2rem" }} />
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: "1.1rem", fontWeight: "600" }}>
                              {userData?.contact}
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, color: "rgba(255,255,255,0.9)" }}>
                            <BoyIcon sx={{ fontSize: "1.2rem" }} />
                            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: "1.1rem" }}>
                              {userData?.gender}
                            </Typography>
                          </Box>
                        </Box>
                        <Button
                          variant="contained"
                          fullWidth
                          onClick={() => setEditMode(true)}
                          sx={{
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
                            "&:hover": {
                              background: "linear-gradient(135deg, #3244e6 0%, #5c6cf2 100%)",
                              transform: "translateY(-2px)",
                              boxShadow: "0 6px 20px 0 rgba(50, 68, 230, 0.6)",
                            },
                          }}
                        >
                          Edit Profile
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
            </Box>
          </Box >
        </Box >
      </Container >
    </Box >
  );
}
