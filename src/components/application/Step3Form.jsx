import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { Box, Typography, Container, Button, IconButton } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";

import API from "../../apis";
import Toast from "../toast/Toast";
import { Utility } from "../utility";

const initialValues = {
  data: [],
};

const Step3Form = ({ handleNext }) => {
  // Accept handleNext as a prop
  const [selectedFiles, setSelectedFiles] = useState([]); // To store selected files
  const dispatch = useDispatch();
  const toastInfo = useSelector((state) => state.toastInfo);
  const { formatName, getLocalStorage, toastAndNavigate } = Utility();
  const customerId = getLocalStorage("customerInfo")?.id;

  console.log("customer", customerId);

  // Handle deleting a file from the selected files array
  const handleAttachmentDelete = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
  };

  // Submitting the form and uploading files
  const handleFormSubmit = useCallback(
    (values) => {
      console.log("these are form values=>", values.data);

      // Track if all uploads were successful
      let allUploadsSuccess = true;

      values.data.forEach((file) => {
        const formattedName = formatName(file.name);

        // Uploading each document
        API.DocumentAPI.uploadDocument({
          document: file,
          folder: `document/${formattedName}`,
        })
          .then((res) => {
            if (res.data.status === "Success") {
              // Creating document entry in DB
              API.DocumentAPI.createDocument({
                document_url: res.data.data,
                customer_id: customerId,
                type: "bank statement",
              })
                .then(() => {
                  toastAndNavigate(dispatch, true, "info", "Upload Successful");
                })
                .catch((err) => {
                  console.log("Error in creating document inside DB", err);
                  allUploadsSuccess = false;
                });
            } else {
              console.error("Upload failed");
              allUploadsSuccess = false;
            }
          })
          .catch((err) => {
            console.error("Error in upload:", err);
            allUploadsSuccess = false;
          });
      });

      // Move to the next step if all uploads were successful
      if (allUploadsSuccess) {
        handleNext(); // Call handleNext to move to the next step
      }
    },
    [customerId, formatName, handleNext, dispatch, toastAndNavigate]
  );

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) =>
          handleFormSubmit({ ...values, data: selectedFiles })
        }
      >
        {({ dirty, isSubmitting, handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Container
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                marginBottom: "15px",
              }}
            >
              {/* Header section */}
              <Box sx={{ textAlign: "center", mb: 2 }}>
                <Typography variant="h4">Statement Upload</Typography>
                <Typography
                  sx={{ padding: "10px" }}
                  variant="subtitle1"
                  color="gray"
                >
                  Step 2/4
                </Typography>

                <Typography
                  sx={{ display: "flex", color: "gray", padding: "10px" }}
                >
                  ( Upload your recent 6 months Bank Statement)
                  <br />
                  (Maximum File Upload Limit Is 6 )
                </Typography>
              </Box>

              {/* File input and display */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* File picker with multiple file upload support */}
                {selectedFiles.length < 6 && (
                  <IconButton component="label" sx={{ width: "88%", mb: 2 }}>
                    <AddPhotoAlternateIcon />
                    <input
                      hidden
                      multiple
                      type="file"
                      accept=".jpg, .gif, .png, .jpeg, .svg, .webp, application/pdf, .doc, .docx, .txt"
                      onChange={(event) => {
                        const newFiles = Array.from(event.target.files);
                        const totalFiles =
                          selectedFiles.length + newFiles.length; // Calculate total files including the new selection

                        if (totalFiles > 6) {
                          toastAndNavigate(
                            dispatch,
                            true,
                            "error",
                            "Maximum limit reached 6"
                          );
                          return;
                        }
                        setSelectedFiles((prevFiles) => [
                          ...prevFiles,
                          ...newFiles,
                        ]);
                        setFieldValue("data", [...selectedFiles, ...newFiles]);
                      }}
                    />
                  </IconButton>
                )}

                {/* Display selected file names with delete icons */}
                {selectedFiles.length > 0 && (
                  <Box sx={{ width: "100%", mt: 2 }}>
                    {selectedFiles.map((file, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 1,
                        }}
                      >
                        <Typography>{file.name}</Typography>
                        <IconButton
                          onClick={() => handleAttachmentDelete(index)}
                          sx={{ ml: 2 }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
                )}

                {/* Upload button */}
                <Button
                  color="primary"
                  disabled={
                    !dirty || isSubmitting || selectedFiles.length === 0
                  }
                  type="submit"
                  variant="contained"
                  sx={{
                    color: "white",
                    fontWeight: "500",
                    fontSize: "1rem",
                    lineHeight: "1.5rem",
                    mt: 2,
                  }}
                >
                  Upload
                </Button>
              </Box>
            </Container>
          </Form>
        )}
      </Formik>
      <Toast
        alerting={toastInfo.toastAlert}
        message={toastInfo.toastMessage}
        severity={toastInfo.toastSeverity}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </>
  );
};

export default Step3Form;
