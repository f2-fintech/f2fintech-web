import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, ErrorMessage } from "formik";
import { Box, Typography, Button, IconButton, Tooltip } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
import * as Yup from "yup";

import Webcam from "./webcam/Webcam"; // Import the Webcam component
import { Utility } from "../utility";

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
  onFileChange,
  onDelete,
  showWebcamCapture,
  onCapturePhoto,
}) => (
  <>
    <Typography
      sx={{ fontFamily: "-moz-initial", fontSize: "2.5vh", color: "black" }}
    >
      {label}
    </Typography>

    {!preview && (
      <IconButton component="label" sx={{ width: "20%" }}>
        <AddPhotoAlternateIcon />
        <input
          hidden
          type="file"
          accept="image/*"
          onChange={(event) => onFileChange(event, name)}
        />
      </IconButton>
    )}

    {/* Button for opening the camera */}
    {!preview && showWebcamCapture && (
      <Button variant="outlined" onClick={onCapturePhoto} sx={{ mt: 1, mb: 2 }}>
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
  aadharUploadsSuccess,
  setAadharUploadsSuccess,
}) => {
  const [previews, setPreviews] = useState({
    aadharFront: "",
    aadharBack: "",
    passportSizePhoto: "",
  });
  const [showWebcam, setShowWebcam] = useState(false);
  const dispatch = useDispatch();

  const { uploadFileToS3, getLocalStorage, toastAndNavigate } = Utility();
  const customerId = getLocalStorage("customerInfo")?.id;

  // Function to handle capturing photo blob via webcam
  const handleCapturePhoto = (capturedImage) => {
    setPreviews((prev) => ({
      ...prev,
      passportSizePhoto: capturedImage,
    }));
    setShowWebcam(false);
  };

  const handleFileChange = (event, name) => {
    const file = event.target.files[0];
    if (file) {
      setPreviews((prev) => ({ ...prev, [name]: URL.createObjectURL(file) }));
    }
  };

  const handleDelete = (name) => {
    setPreviews((prev) => ({ ...prev, [name]: "" }));
  };

  // Form submission handler
  const handleFormSubmit = useCallback(
    async (values) => {
      const uploadPromises = [];
      console.log("values", values, values.aadharFront, values.aadharBack);

      if (values.aadharFront) {
        console.log("uploading adhar front");
        const aadharFrontPromise = uploadFileToS3(
          values.aadharFront,
          "aadhaar front",
          customerId
        );

        uploadPromises.push(aadharFrontPromise);
      }

      if (values.aadharBack) {
        console.log("uploading adhar back");
        const aadharBackPromise = uploadFileToS3(
          values.aadharBack,
          "aadhaar back",
          customerId
        );
        uploadPromises.push(aadharBackPromise);
      }

      if (values.pancard) {
        console.log("uploading pancard");
        const pancardPromise = uploadFileToS3(
          values.pancard,
          "pancard",
          customerId
        );
        uploadPromises.push(pancardPromise);
      }

      if (values.passportSizePhoto) {
        console.log("uploading photo");
        const photoPromise = uploadFileToS3(
          values.passportSizePhoto,
          "photo",
          customerId
        );
        uploadPromises.push(photoPromise);
      }

      try {
        await Promise.all(uploadPromises);
        console.log("All documents uploaded successfully");
        toastAndNavigate(dispatch, true, "info", "Uploaded Successfully");
        setAadharUploadsSuccess(true);
        const timer = setTimeout(() => {
          handleNext(); // Call handleNext to move to the next step after 2 seconds
        }, 2000);
        // Clear the timeout if the component unmounts
        return () => clearTimeout(timer);
      } catch (err) {
        toastAndNavigate(
          dispatch,
          true,
          "error",
          "Upload Failed. Please Try Again"
        );
        console.error("Error in uploading one or more documents:", err);
      }
    },
    [customerId, dispatch, handleNext] // Include dependencies as needed
  );

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
                  fontFamily: "bold 10px",
                  fontSize: "4vh",
                  fontWeight: "300vh",
                }}
              >
                Profile Details and Proof
              </Typography>
              <Typography
                sx={{
                  fontFamily: "-moz-initial",
                  fontSize: "2.5vh",
                  color: "gray",
                }}
              >
                Step 3/4
              </Typography>

              {/* Aadhar Card Front */}
              <FileInput
                name="aadharFront"
                label="Aadhar Card Front"
                preview={previews.aadharFront}
                onFileChange={(event) => {
                  handleFileChange(event, "aadharFront");
                  setFieldValue("aadharFront", event.target.files[0]);
                }}
                onDelete={() => {
                  handleDelete("aadharFront");
                  setFieldValue("aadharFront", null);
                }}
              />

              {/* Aadhar Card Back */}
              <FileInput
                name="aadharBack"
                label="Aadhar Card Back"
                preview={previews.aadharBack}
                onFileChange={(event) => {
                  handleFileChange(event, "aadharBack");
                  setFieldValue("aadharBack", event.target.files[0]);
                }}
                onDelete={() => {
                  handleDelete("aadharBack");
                  setFieldValue("aadharBack", null);
                }}
              />

              {/* Pan Card */}
              <FileInput
                name="pancard"
                label="Pan Card"
                preview={previews.pancard}
                onFileChange={(event) => {
                  handleFileChange(event, "pancard");
                  setFieldValue("pancard", event.target.files[0]);
                }}
                onDelete={() => {
                  handleDelete("pancard");
                  setFieldValue("pancard", null);
                }}
              />

              {/* Passport Size Photo */}
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
                  disabled={allUploadsSuccess}
                  sx={{ mt: 2 }}
                >
                  Back
                </Button>
                <Button
                  color="primary"
                  disabled={!dirty || isSubmitting || !previews.aadharFront}
                  type="submit"
                  variant="contained"
                  sx={{
                    mr: 1,
                    color: "white",
                    fontWeight: "500",
                    fontSize: "1rem",
                    lineHeight: "1.5rem",
                  }}
                >
                  Upload
                </Button>
                <Button
                  sx={{
                    mr: 4,
                    mt: 1,
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
  handleNext: PropTypes.func.isRequired, // Prop to trigger the next step
};

export default Step4Form;
