import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, ErrorMessage } from "formik";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import * as Yup from "yup";

import Webcam from "./webcam/Webcam"; // Import the Webcam component
import { Utility } from "../utility";
import { color } from "framer-motion";

// Validation schema
const validationSchema = Yup.object({
  aadharFront: Yup.mixed().required("This Field is Required"),
  aadharBack: Yup.mixed().nullable(),
  passportSizePhoto: Yup.mixed().nullable(),
});

// Initial values
const initialValues = {
  aadharFront: null,
  aadharBack: null,
  pancard: null,
  passportSizePhoto: null,
};

// FileInput component for file selection and preview
const FileInput = ({
  name,
  label,
  preview,
  accept,
  onFileChange,
  onDelete,
  showWebcamCapture,
  onCapturePhoto,
}) => (
  <>
    <Typography
      sx={{
        fontSize: "0.9rem",
        fontFamily: "Poppins",
        color: "rgba(0,0,0,0.5)",
        mb: 2,
        fontWeight: 500
      }}
    >
      {label}
    </Typography>

    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      {!preview && (
        <IconButton
          component="label"
          sx={{
            color: "#1e3c72",
            background: "rgba(30, 60, 114, 0.05)",
            p: 4,
            width: "100%",
            borderRadius: "16px",
            border: "1px dashed rgba(30, 60, 114, 0.4)",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "rgba(30, 60, 114, 0.1)",
              borderColor: "#1e3c72",
              transform: "translateY(-2px)"
            }
          }}
        >
          <AddPhotoAlternateIcon sx={{ fontSize: "2.5rem" }} />
          <input
            hidden
            type="file"
            accept={accept}
            onChange={(event) => onFileChange(event, name)}
          />
        </IconButton>
      )}

      {/* Button for opening the camera */}
      {!preview && showWebcamCapture && (
        <Button
          variant="outlined"
          onClick={onCapturePhoto}
          sx={{
            mt: 2,
            width: "100%",
            borderRadius: "12px",
            borderColor: "#1e3c72",
            color: "#1e3c72",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "rgba(30, 60, 114, 0.05)",
              borderColor: "#1e3c72",
            },
          }}
        >
          Open Camera
        </Button>
      )}

      {preview && (
        <Box
          sx={{
            mt: 1,
            width: "100%",
            aspectRatio: "16/9",
            position: "relative",
            overflow: "hidden",
            borderRadius: "16px",
            border: "1px solid rgba(0,0,0,0.1)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.05)"
          }}
        >
          <img
            src={preview}
            alt={label}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <IconButton
            onClick={() => onDelete(name)}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              "&:hover": {
                backgroundColor: "#ffebed",
                color: "#d32f2f"
              }
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
      <ErrorMessage
        name={name}
        component="div"
        style={{ color: "#d32f2f", fontSize: "0.8rem", marginTop: "8px", fontFamily: "Poppins" }}
      />
    </Box>
  </>
);

// Main form component
const Step4Form = ({
  handleNext,
  handleBack,
  allUploadsSuccess,
  setAadharUploadsSuccess,
}) => {
  const [previews, setPreviews] = useState({
    aadharFront: "",
    aadharBack: "",
    passportSizePhoto: "",
  });
  const [showWebcam, setShowWebcam] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { uploadFileToS3, getLocalStorage, setLocalStorage, toastAndNavigate } =
    Utility();
  const customerId = getLocalStorage("customerInfo")?.id;
  const StatementUpload = getLocalStorage("StatementUpload");
  console.log(StatementUpload, "statementupload", typeof StatementUpload);
  // Function to handle capturing photo blob via webcam
  const handleCapturePhoto = (capturedImage) => {
    setPreviews((prev) => ({
      ...prev,
      passportSizePhoto: capturedImage,
    }));
    setShowWebcam(false);
  };

  useEffect(() => {
    console.log("Scroll To Top");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleFileChange = (event, name) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 10485760) {
        toastAndNavigate(
          dispatch,
          true,
          "error",
          `${file.name} exceeds the 10MB limit`
        );
        event.target.value = ""; // Clear selection
        return;
      }
      setPreviews((prev) => ({ ...prev, [name]: URL.createObjectURL(file) }));
    }
  };

  const handleDelete = (name) => {
    setPreviews((prev) => ({ ...prev, [name]: "" }));
  };

  const blackLabelTheme = createTheme({
    components: {
      MuiFormLabel: {
        styleOverrides: {
          root: {
            color: "black",
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: "black",
          },
        },
      },
    },
  });

  // Form submission handler
  const handleFormSubmit = useCallback(
    async (values) => {
      setLoading(true); // Start loader
      console.log("values", values, values.aadharFront, values.aadharBack);

      const filesToUpload = [
        { file: values.aadharFront, name: "aadhaar front" },
        { file: values.aadharBack, name: "aadhaar back" },
        { file: values.pancard, name: "pancard" },
        { file: values.passportSizePhoto, name: "photo" },
      ].filter((item) => item.file); // Remove empty values

      const startTime = Date.now(); // Capture start time

      try {
        // Uploading files sequentially to prevent timeouts
        for (const item of filesToUpload) {
          console.log(`Uploading ${item.name}`);
          await uploadFileToS3(item.file, item.name, customerId);
        }

        console.log("All documents uploaded successfully");
        toastAndNavigate(dispatch, true, "info", "Uploaded Successfully");
        setAadharUploadsSuccess(true);
        setLocalStorage("profileDetail", true);

        // Ensure at least 3 seconds loading time
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(3000 - elapsedTime, 0);

        setTimeout(() => {
          setLoading(false); // Stop loading after min 3s
          handleNext(); // Move to next step
        }, remainingTime);
      } catch (err) {
        console.error("Error in uploading one or more documents:", err);
        toastAndNavigate(
          dispatch,
          true,
          "error",
          "Upload Failed. Please Try Again"
        );

        // Ensure loader remains visible for at least 3 seconds
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    },
    [customerId, dispatch, handleNext]
  );

  const theme = useTheme();
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ dirty, isSubmitting, handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                margin: "15px 15px",
                gap: 2,
              }}
            >
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: "1.5rem", md: "1.8rem" },
                    background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontFamily: "Poppins",
                    mb: 1,
                  }}
                >
                  Profile Details and Proof
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: "1.1rem",
                    color: "rgba(0, 0, 0, 0.4)",
                    fontWeight: 600,
                  }}
                >
                  Step 3 of 4
                </Typography>
              </Box>

              {/* Grid Container for Proofs */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 3,
                  width: { xs: "100%", md: "90%", lg: "85%" },
                  mt: 2
                }}
              >
                {/* Aadhar Card Front */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    background: "rgba(255, 255, 255, 0.5)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(30, 60, 114, 0.1)",
                    p: 4,
                    borderRadius: "24px",
                    alignItems: "center",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                      borderColor: "rgba(30, 60, 114, 0.3)"
                    }
                  }}
                >
                  <Typography sx={{ fontSize: "1rem", fontWeight: 700, color: "#1e3c72", mb: 2, fontFamily: "Poppins" }}>
                    Aadhar (Front)
                  </Typography>
                  <ThemeProvider theme={blackLabelTheme}>
                    <FileInput
                      name="aadharFront"
                      label="Aadhar Card Front"
                      preview={previews.aadharFront}
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.odt,.rtf,.xml"
                      onFileChange={(event) => {
                        handleFileChange(event, "aadharFront");
                        setFieldValue("aadharFront", event.target.files[0]);
                      }}
                      onDelete={() => {
                        handleDelete("aadharFront");
                        setFieldValue("aadharFront", null);
                      }}
                    />
                  </ThemeProvider>
                </Box>

                {/* Aadhar Card Back */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    background: "rgba(255, 255, 255, 0.5)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(30, 60, 114, 0.1)",
                    p: 4,
                    borderRadius: "24px",
                    alignItems: "center",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                      borderColor: "rgba(30, 60, 114, 0.3)"
                    }
                  }}
                >
                  <Typography sx={{ fontSize: "1rem", fontWeight: 700, color: "#1e3c72", mb: 2, fontFamily: "Poppins" }}>
                    Aadhar (Back)
                  </Typography>
                  <ThemeProvider theme={blackLabelTheme}>
                    <FileInput
                      name="aadharBack"
                      label="Aadhar Card Back"
                      preview={previews.aadharBack}
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.odt,.rtf,.xml"
                      onFileChange={(event) => {
                        handleFileChange(event, "aadharBack");
                        setFieldValue("aadharBack", event.target.files[0]);
                      }}
                      onDelete={() => {
                        handleDelete("aadharBack");
                        setFieldValue("aadharBack", null);
                      }}
                    />
                  </ThemeProvider>
                </Box>

                {/* Pan Card */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    background: "rgba(255, 255, 255, 0.5)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(30, 60, 114, 0.1)",
                    p: 4,
                    borderRadius: "24px",
                    alignItems: "center",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                      borderColor: "rgba(30, 60, 114, 0.3)"
                    }
                  }}
                >
                  <Typography sx={{ fontSize: "1rem", fontWeight: 700, color: "#1e3c72", mb: 2, fontFamily: "Poppins" }}>
                    Pan Card
                  </Typography>
                  <ThemeProvider theme={blackLabelTheme}>
                    <FileInput
                      name="pancard"
                      label="Pan Card"
                      preview={previews.pancard}
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.odt,.rtf,.xml"
                      onFileChange={(event) => {
                        handleFileChange(event, "pancard");
                        setFieldValue("pancard", event.target.files[0]);
                      }}
                      onDelete={() => {
                        handleDelete("pancard");
                        setFieldValue("pancard", null);
                      }}
                    />
                  </ThemeProvider>
                </Box>

                {/* Passport Size Photo */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    background: "rgba(255, 255, 255, 0.5)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(30, 60, 114, 0.1)",
                    p: 4,
                    borderRadius: "24px",
                    alignItems: "center",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                      borderColor: "rgba(30, 60, 114, 0.3)"
                    }
                  }}
                >
                  <Typography sx={{ fontSize: "1rem", fontWeight: 700, color: "#1e3c72", mb: 2, fontFamily: "Poppins" }}>
                    Passport Photo
                  </Typography>
                  <ThemeProvider theme={blackLabelTheme}>
                    <FileInput
                      name="passportSizePhoto"
                      label="Passport Size Photo"
                      preview={previews.passportSizePhoto}
                      onFileChange={(event) => {
                        handleFileChange(event, "passportSizePhoto");
                        setFieldValue("passportSizePhoto", event.target.files[0]);
                      }}
                      onDelete={() => {
                        handleDelete("passportSizePhoto");
                        setFieldValue("passportSizePhoto", null);
                      }}
                      showWebcamCapture={true}
                      onCapturePhoto={() => setShowWebcam(true)}
                    />
                  </ThemeProvider>
                </Box>
              </Box>

              {showWebcam && (
                <Webcam
                  setCapturedImage={(image) => handleCapturePhoto(image)}
                  setFieldValue={setFieldValue}
                />
              )}

              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  mt: 4,
                  gap: 2
                }}
              >
                <Button
                  onClick={handleBack}
                  disabled={allUploadsSuccess || StatementUpload}
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: "1rem",
                    color: "rgba(0,0,0,0.6)",
                    textTransform: "none",
                    "&:hover": {
                      background: "transparent",
                      color: "#1e3c72",
                      textDecoration: "underline"
                    },
                    "&.Mui-disabled": {
                      opacity: 0.3,
                    },
                  }}
                >
                  Go Back
                </Button>
                <Button
                  disabled={
                    !dirty || isSubmitting || !previews.aadharFront || loading
                  }
                  type="submit"
                  variant="contained"
                  sx={{
                    background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    fontFamily: "Poppins",
                    fontSize: "1.1rem",
                    borderRadius: "12px",
                    px: 6,
                    py: 1.5,
                    textTransform: "none",
                    boxShadow: "0 8px 24px rgba(30, 60, 114, 0.3)",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 12px 32px rgba(30, 60, 114, 0.4)",
                    },
                    "&.Mui-disabled": {
                      background: "#e0e0e0",
                    },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Upload Documents"
                  )}
                </Button>

                <Button
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: "0.9rem",
                    color: "rgba(0,0,0,0.5)",
                    textTransform: "none",
                    "&:hover": {
                      background: "transparent",
                      color: "#1e3c72",
                      textDecoration: "underline"
                    }
                  }}
                  onClick={handleNext}
                >
                  Skip this Step
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

FileInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  preview: PropTypes.string,
  onFileChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  showWebcamCapture: PropTypes.bool,
  onCapturePhoto: PropTypes.func,
};

Step4Form.propTypes = {
  handleNext: PropTypes.func,
  handleBack: PropTypes.func,
  allUploadsSuccess: PropTypes.bool,
  setAadharUploadsSuccess: PropTypes.func,
};

export default Step4Form;
