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
        fontSize: "2.5vh",
        fontFamily: "DM sans",
        color: "white",
      }}
    >
      {label}
    </Typography>

    {!preview && (
      <IconButton component="label" sx={{ color: "white" }}>
        <AddPhotoAlternateIcon />
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
          mt: 1,
          mb: 2,
          bgcolor: "#3244e6",
          color: "white",
          "&:hover": {
            color: "white",
            backgroundColor: "#3244e6",
          },
        }}
      >
        Capture Photo
      </Button>
    )}

    {preview && (
      <Box
        sx={{ mt: 2, width: "40%", textAlign: "center", position: "relative" }}
      >
        <img
          src={preview}
          alt={label}
          style={{ maxWidth: "100%", height: "auto" }}
        />
        <IconButton
          onClick={() => onDelete(name)}
          sx={{
            width: "40%",
            position: "absolute",
            top: 20,
            right: 20,
            transform: "translate(50%, -50%)",
            borderRadius: "50%",
            padding: "5px",
          }}
        >
          <Tooltip title="DELETE">
            <DeleteIcon
              sx={{
                color: "#002147",
                ml: 20,
                "&:hover": {
                  color: "red",
                  fontSize: "1.5rem",
                  transition: "all 0.3s ease-in-out",
                },
              }}
            />
          </Tooltip>
        </IconButton>
      </Box>
    )}
    <ErrorMessage name={name} component="div" style={{ color: "red" }} />
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
              <Typography
                sx={{
                  fontFamily: "DM Sans",
                  fontSize: {
                    xs: "1.7rem", // Mobile
                    sm: "2.5rem", // Tablet
                    md: "2rem", // Desktop
                  },
                  color: "#3244e6",
                  fontWeight: 500,
                  marginBottom: 1,
                }}
              >
                Profile Details and Proof
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "2vh",
                  color: theme.palette.whitetext.black,
                  marginBottom: 3,
                }}
              >
                Step 3/4
              </Typography>

              {/* Aadhar Card Front */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#eaf4f4",
                  p: 3,
                  borderRadius: "20px",
                  width: "50%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontSize: "1.1rem" }}>
                  Aadhar Card Front
                </Typography>
                <ThemeProvider theme={blackLabelTheme}>
                  <FileInput
                    name="aadharFront"
                    // label="Aadhar Card Front"
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
                  backgroundColor: "#eaf4f4",
                  p: 3,
                  borderRadius: "20px",
                  width: "50%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontSize: "1.1rem" }}>
                  Aadhar Card Back
                </Typography>
                <ThemeProvider theme={blackLabelTheme}>
                  <FileInput
                    name="aadharBack"
                    // label="Aadhar Card Back"
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
                  backgroundColor: "#eaf4f4",
                  p: 3,
                  borderRadius: "20px",
                  width: "50%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontSize: "1.1rem" }}>Pan Card</Typography>
                <ThemeProvider theme={blackLabelTheme}>
                  <FileInput
                    name="pancard"
                    // label="Pan Card"
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
                  backgroundColor: "#eaf4f4",
                  p: 3,
                  borderRadius: "20px",
                  width: "50%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontSize: "1.1rem" }}>
                  Passport Size Photo
                </Typography>
                <ThemeProvider theme={blackLabelTheme}>
                  <FileInput
                    name="passportSizePhoto"
                    // label="Passport Size Photo"
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

              {showWebcam && (
                <Webcam
                  setCapturedImage={(image) => handleCapturePhoto(image)}
                  setFieldValue={setFieldValue}
                />
              )}

              <Box
                sx={{
                  display: "flex",
                  width: "40vw",
                  justifyContent: "space-between",
                  ml: "40px",
                }}
              >
                <Button
                  onClick={handleBack}
                  disabled={allUploadsSuccess || StatementUpload}
                  sx={{
                    mt: 2,
                    fontFamily: "Poppins",
                    fontSize: ".9rem",
                    color: "black",
                    "&.Mui-disabled": {
                      color: "black", // Override disabled color
                      opacity: 0.5, // Optional: make it look disabled
                    },
                  }}
                >
                  Back
                </Button>
                <Button
                  disabled={
                    !dirty || isSubmitting || !previews.aadharFront || loading
                  }
                  type="submit"
                  variant="contained"
                  sx={{
                    mr: 1,
                    mt: {
                      xs: "1rem",
                      sm: "0",
                      md: "0",
                    },
                    color: "#FFFFFF",
                    backgroundColor: "#3244e6",
                    fontFamily: "Poppins",
                    fontSize: ".9rem",
                    height: {
                      xs: "4vh",
                      sm: "4vh",
                      md: "6vh",
                    },
                    position: "relative",
                    "&:hover": {
                      backgroundColor: "#3244e6",
                      color: "#FFFFFF",
                    },
                    "&.Mui-disabled": {
                      backgroundColor: "#B0B0B0",
                      color: "#FFFFFF",
                    },
                  }}
                >
                  {loading ? (
                    <CircularProgress
                      size={30}
                      color="inherit"
                      sx={{
                        position: "absolute",
                      }}
                    />
                  ) : (
                    "Upload"
                  )}
                </Button>

                <Button
                  sx={{
                    mr: 4,
                    mt: 1,
                    fontFamily: "Poppins",
                    fontSize: ".9rem",
                    color: "black",
                    "&.Mui-disabled": {
                      color: "black", // Override disabled color
                      opacity: 0.5, // Optional: make it look disabled
                    },
                  }}
                  onClick={handleNext}
                >
                  Skip
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
