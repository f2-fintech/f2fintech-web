import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DeleteIcon from "@mui/icons-material/Delete";

import { Utility } from "../utility";
import API from "../../apis";
import Toast from "../toast/Toast";

const QueryForm = ({ customer_id, addQuery, setSubmitted }) => {
  const [questionType, setQuestionType] = useState("");
  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [attachmentPreview, setAttachmentPreview] = useState(null);
  const toastInfo = useSelector((state) => state.toastInfo);
  const dispatch = useDispatch();

  const { toastAndNavigate } = Utility();

  const handleAttachmentChange = (e) => {
    const file = e.target.files[0];
    setAttachment(file);

    if (file && file.type.startsWith("image/")) {
      const previewUrl = URL.createObjectURL(file);
      setAttachmentPreview(previewUrl);
    } else {
      setAttachmentPreview(null);
    }
  };

  const handleAttachmentDelete = () => {
    setAttachment(null);
    setAttachmentPreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((questionType && description) || attachment) {
      setQuestionType("");
      setDescription("");
      setAttachmentPreview(null);

      if (attachment) {
        API.DocumentAPI.uploadDocument({
          document: attachment,
          folder: `query/${attachment.name}`,
        })
          .then((res) => {
            const data = {
              customer_id: customer_id,
              title: questionType,
              description: description,
              attachment: res.data.data, // Add attachment to the query data
            };
            createQuery(data);
          })
          .catch((err) => {
            console.error("Error: ", err);
          });
      } else {
        const data = {
          customer_id: customer_id,
          title: questionType,
          description: description,
        };
        createQuery(data);
      }
    } else {
      console.log(
        "Please provide at least a question type, description, or attachment."
      );
    }
  };

  const createQuery = (data) => {
    API.QueryAPI.create(data)
      .then((res) => {
        if (res.status === 200) {
          addQuery(data);
          setSubmitted(true);
          setAttachment(null);
          toastAndNavigate(dispatch, true, "info", "Query Submitted");
        }
      })
      .catch((err) => {
        toastAndNavigate(
          dispatch,
          true,
          "error",
          err ? err?.message : "An Error Occurred"
        );
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 2,
        backgroundColor: "#000000",
        border: "none",
      }}
    >
      <FormControl
        sx={{
          mb: 2,
          border: "1px solid #333333", // Permanent white border
          borderRadius: "4px", // Optional: Adds rounded corners
          "&:hover": {
            border: "1px solid #333333", // Ensure no change on hover
          },
          "&:focus-within": {
            border: "1px solid #333333", // Ensure no change when focused
          },
        }}
      >
        <InputLabel sx={{ color: "white", backgroundColor: 'black', fontFamily: "Poppins" }}>Query Type</InputLabel>
        <Select
          sx={{
            color: "white", // Ensure text color is white
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none", // Removes the inner border of the Select
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: "none", // No inner border on hover
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "none", // No inner border on focus
            },
          }}
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
          MenuProps={{
            PaperProps: {
              style: {
                backgroundColor: "black",
              },
            },
          }}
        >
          <MenuItem value={"general inquiry"}>General Inquiry</MenuItem>
          <MenuItem value={"technical support"}>Technical Support</MenuItem>
          <MenuItem value={"billing"}>Billing</MenuItem>
          <MenuItem value={"bank statement"}>Bank Statement</MenuItem>
          <MenuItem value={"repayment"}>Repayment</MenuItem>
          <MenuItem value={"foreclosure"}>Foreclosure</MenuItem>
          <MenuItem value={"disbursement"}>Disbursement</MenuItem>
          <MenuItem value={"restructuring"}>Restructuring</MenuItem>
          <MenuItem value={"grievance"}>Grievance</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ position: "relative", mb: 2 }}>
        <TextField
          variant="outlined"
          label="Description"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={handleKeyDown}
          fullWidth
          InputLabelProps={{
            style: { color: "white" }, // Set the label color to white
          }}
          InputProps={{
            style: { color: "white" }, // Set input text color to white
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#333333", // Permanent white border
              },
              "&:hover fieldset": {
                borderColor: "#333333", // White border on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#333333", // White border when focused
              },
            },
          }}
        />

        <IconButton
          component="label"
          aria-label="attach file"
          sx={{
            position: "absolute",
            bottom: 8,
            right: 8,
            backgroundColor: "white",
            "&:hover": {
              backgroundColor: 'white',
              transition: 'ease-in 0.3 sec zoom'
            }
          }}
        >
          <AttachFileIcon />
          <input type="file" hidden onChange={handleAttachmentChange} />
        </IconButton>
      </Box>

      {attachment && (
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Typography>{attachment.name}</Typography>
          {attachmentPreview && (
            <Box
              component="img"
              src={attachmentPreview}
              alt="Preview"
              sx={{ maxHeight: 100, maxWidth: 100, ml: 2, borderRadius: 2 }}
            />
          )}
          <IconButton onClick={handleAttachmentDelete} sx={{ ml: 2 }} aria-label="delete attachment">
            <DeleteIcon />
          </IconButton>
        </Box>
      )}

      <Button
        sx={{
          mt: 1,
          color: "#000",
          fontFamily: "Poppins",
          fontSize: "1.5vw",
          backgroundColor: "#FFD700 !important",
        }}
      >
        Submit
      </Button>
      <Toast
        alerting={toastInfo.toastAlert}
        severity={toastInfo.toastSeverity}
        message={toastInfo.toastMessage}
      />
    </Box>
  );
};

export default QueryForm;
