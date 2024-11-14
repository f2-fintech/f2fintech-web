import { useCallback, useEffect, useState } from "react";
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

const Step3Form = ({ handleNext, allUploadsSuccess, setAllUploadsSuccess }) => {
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
                  setAllUploadsSuccess(true);
                })
                .catch((err) => {
                  toastAndNavigate(
                    dispatch,
                    true,
                    "info",
                    "Error in creating document inside DB"
                  );
                  console.log("Error in creating document inside DB", err);
                  setAllUploadsSuccess(false);
                });
            } else {
              toastAndNavigate(dispatch, true, "info", "Upload failed");
              console.error("Upload failed");
              setAllUploadsSuccess(false);
            }
          })
          .catch((err) => {
            toastAndNavigate(
              dispatch,
              true,
              "error",
              "Upload failed. Please try again"
            );
            console.error("Error in upload:", err);
            setAllUploadsSuccess(false);
          });
      });
    },
    [customerId, formatName, handleNext, dispatch, toastAndNavigate]
  );

  useEffect(() => {
    if (allUploadsSuccess) {
      const timer = setTimeout(() => {
        handleNext(); // Call handleNext to move to the next step after 2 seconds
      }, 2000);

      // Clear the timeout if the component unmounts or if allUploadsSuccess changes
      return () => clearTimeout(timer);
    }
  }, [allUploadsSuccess]);

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

                        // Calculate total files including the new selection
                        const totalFiles =
                          selectedFiles.length + newFiles.length;

                        if (totalFiles > 6) {
                          toastAndNavigate(
                            dispatch,
                            true,
                            "error",
                            "Maximum limit reached: 6 files"
                          );
                          return;
                        }

                        // Check file size limit (1MB = 1,048,576 bytes)
                        const filteredFiles = newFiles.filter((file) => {
                          if (file.size > 1048576) {
                            toastAndNavigate(
                              dispatch,
                              true,
                              "error",
                              `${file.name} exceeds the 1MB limit`
                            );
                            return false;
                          }
                          return true;
                        });

                        // If there are no files left after filtering, return early
                        if (filteredFiles.length === 0) return;

                        setSelectedFiles((prevFiles) => [
                          ...prevFiles,
                          ...filteredFiles,
                        ]);
                        setFieldValue("data", [
                          ...selectedFiles,
                          ...filteredFiles,
                        ]);
                      }}
                    />
                  </IconButton>
                )}

                {/* Display selected file names with delete icons */}
                {selectedFiles.length > 0 && (
                  <Box sx={{ width: "100%", maxWidth: "40vw", mt: 2 }}>
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
                <Box
                  sx={{
                    display: "flex",
                    width: "40vw",
                    justifyContent: "flex-end",
                    ml: "40px",
                  }}
                >
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
                      mr: 20,
                    }}
                  >
                    Upload
                  </Button>

                  <Button
                    sx={{
                      mr: 4,
                      mt: 2,
                    }}
                    onClick={handleNext}
                    disabled={selectedFiles.length > 0}
                  >
                    Skip
                  </Button>
                </Box>
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
