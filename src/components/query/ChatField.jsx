import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Divider,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  InputAdornment,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import API from "../../apis";
import { Utility } from "../utility";
import { useDispatch } from "react-redux";
import { format, isValid, parseISO } from "date-fns";

const LIMIT = 3;

const ChatField = ({
  queryDescription,
  queryResponses,
  responseCount,
  setSelectedQuery,
  selectedQueryId,
  getSelectedQueryResponse,
  queryAttachment,
}) => {
  const listRef = useRef(null);
  const [response, setResponse] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [modalPreview, setModalPreview] = useState("");
  const [attachmentPreview, setAttachmentPreview] = useState(null);
  const [imageModalOpen, setImageModalOpen] = useState(false); // Modal state for the image
  const [offset, setOffset] = useState(1);

  const dispatch = useDispatch();
  const { getLocalStorage, toastAndNavigate } = Utility();
  const customerId = getLocalStorage("customerInfo")?.id;

  // Handle attachment file selection
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

  // Handle form submission (sending response and attachment)
  const handleResponseSubmit = async (e) => {
    e.preventDefault();
    if (response.trim()) {
      setAttachment("");
      setAttachmentPreview(null);
      setAttachment(null);

      try {
        let data = {
          query_id: selectedQueryId,
          type: "customer", // You might need to update this to 'supporter' if it's the supporter
          type_id: customerId,
          response: response,
          attachment: "",
        };

        if (attachment) {
          // If there's an attachment, upload it first
          API.DocumentAPI.uploadDocument({
            document: attachment,
            folder: `queryResponse/${attachment.name}`,
          })
            .then((res) => {
              data = {
                ...data,
                attachment: res.data.data, // Add uploaded attachment data to the query response
              };

              createQueryResponse(data);
              scrollToBottom(); // Scroll down to the latest message
            })
            .catch((err) => {
              console.error("Error uploading document: ", err);
            });
        } else {
          // No attachment, just create the query response
          createQueryResponse(data);
          scrollToBottom(); // Scroll down to the latest message
        }

        // Clear the input field
        setResponse("");
      } catch (error) {
        console.error("Failed to submit response:", error);
      }
    }
  };

  // Function to scroll the chat container to the bottom
  const scrollToBottom = () => {
    const chatContainer = document.getElementById("chat-container"); // Ensure this matches your chat box ID
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the bottom
    }
  };

  const createQueryResponse = (data) => {
    API.QueryResponseAPI.create(data)
      .then((res) => {
        if (res.status === 200) {
          toastAndNavigate(dispatch, true, "info", "Response Submitted");
          setResponse("");
          getSelectedQueryResponse(selectedQueryId, 0, true);
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

  // Load older messages
  const handleViewMore = () => {
    getSelectedQueryResponse(selectedQueryId, offset);
    setOffset(offset + 1);
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [queryResponses?.length]);

  // Group messages by date
  const groupMessagesByDate = (messages) => {
    if (!messages?.length) {
      return false;
    }
    const now = new Date();
    const formatCustomDate = (date) => {
      const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
      if (diffInDays < 1) return "Today";
      if (diffInDays === 1) return "Yesterday";
      if (diffInDays < 7) return `${diffInDays} days ago`;
      return format(date, "MMM d, yyyy");
    };

    return messages?.reduce((grouped, msg) => {
      const parsedDate = parseISO(msg.created_at);
      if (!isValid(parsedDate)) {
        console.error("Invalid date encountered:", msg.created_at);
        return grouped;
      }
      const formattedDate = formatCustomDate(parsedDate);
      if (!grouped[formattedDate]) grouped[formattedDate] = [];
      grouped[formattedDate].push(msg);
      return grouped;
    }, {});
  };

  // Handle opening the image in modal
  const handleImageClick = (img) => {
    setImageModalOpen(true); // Open the modal when the image is clicked
    setModalPreview(img);
  };

  // Handle downloading the image
  const handleDownloadImage = () => {
    if (attachmentPreview || queryAttachment) {
      const link = document.createElement("a");
      link.href = attachmentPreview || queryAttachment;
      link.download = attachment ? attachment.name : "downloaded_image";
      link.click();
    }
  };

  // Close image modal
  const closeModal = () => {
    setImageModalOpen(false); // Close the modal
  };

  const groupedMessages = groupMessagesByDate(queryResponses);

  return (
    <Box sx={{ p: 1, display: "flex", flexDirection: "column", width: "100%" }}>
      <Box sx={{ display: "flex" }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => setSelectedQuery(null)}
          sx={{ alignSelf: "flex-start" }}
        >
          Back
        </Button>

        {responseCount > queryResponses?.length && (
          <Button
            onClick={handleViewMore}
            variant="contained"
            sx={{
              backgroundColor: "rgba(128, 128, 128, 0.5)",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignSelf: "center",
              ml: 18,
              width: "auto",
              "&:hover": {
                backgroundColor: "rgba(128, 128, 128, 0.7)",
              },
            }}
          >
            Load Earlier
          </Button>
        )}
      </Box>

      <List ref={listRef} sx={{ maxHeight: "35vh", overflowY: "auto", mb: 2 }}>
        <Typography sx={{ fontWeight: "bolder" }}>
          {queryDescription}
        </Typography>

        {queryAttachment && (
          <Box
            component="img"
            src={queryAttachment}
            alt="Attachment Preview"
            sx={{
              maxHeight: 100,
              maxWidth: 100,
              mt: 1,
              mb: 2,
              borderRadius: 2,
              cursor: "pointer",
            }}
            onClick={() => handleImageClick(queryAttachment)} // Open modal on click
          />
        )}

        {groupedMessages && Object.keys(groupedMessages).length ? (
          Object.entries(groupedMessages).map(([date, messages], index) => (
            <React.Fragment key={date}>
              <Divider textAlign="center" sx={{ mb: 1 }}>
                {date}
              </Divider>
              {messages.map((res, idx) => (
                <ListItem
                  key={idx}
                  sx={{
                    display: "flex",
                    justifyContent:
                      res.type === "user" ? "flex-start" : "flex-end",
                  }}
                >
                  <Paper
                    sx={{
                      p: 1,
                      backgroundColor:
                        res.type === "user"
                          ? "rgba(200, 200, 200, 0.5)"
                          : "rgba(200, 255, 200, 0.5)",
                      borderRadius: 2,
                      maxWidth: "75%",
                    }}
                  >
                    <ListItemText primary={res.response} />

                    {/* Only display the image if there is an attachment */}
                    {res.attachment && (
                      <Box
                        component="img"
                        src={
                          typeof res.attachment === "string"
                            ? res.attachment
                            : URL.createObjectURL(res.attachment)
                        }
                        alt="Attachment Preview"
                        sx={{
                          maxHeight: 100,
                          maxWidth: 100,
                          mt: 1,
                          borderRadius: 2,
                          cursor: "pointer",
                        }}
                        onClick={() => handleImageClick(res.attachment)} // Open modal on click
                      />
                    )}
                  </Paper>
                </ListItem>
              ))}
            </React.Fragment>
          ))
        ) : (
          <ListItem>No messages to display</ListItem>
        )}
      </List>

      {/* Image Modal */}
      <Dialog
        open={imageModalOpen}
        onClose={closeModal}
        maxWidth="xl" // Ensures the modal can expand to large size
      >
        <DialogContent>
          <Box
            component="img"
            src={modalPreview}
            alt="Full-Size Attachment"
            sx={{
              maxWidth: "100%",
              maxHeight: "90vh",
              objectFit: "contain", // Ensures the image scales properly
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleDownloadImage}
            startIcon={<DownloadIcon />}
            sx={{ mt: 2 }}
          >
            Download Image
          </Button>
        </DialogContent>
      </Dialog>

      <Box
        component="form"
        onSubmit={handleResponseSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          mb: 2,
        }}
      >
        <TextField
          variant="outlined"
          label="Your Response"
          multiline
          rows={4}
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              handleResponseSubmit(e);
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  component="label"
                  aria-label="attach file"
                  sx={{
                    cursor: "pointer",
                    position: "absolute",
                    bottom: 8,
                    right: 8,
                  }}
                >
                  <AttachFileIcon />
                  <input type="file" hidden onChange={handleAttachmentChange} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          fullWidth
        />

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
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2, alignSelf: "flex-end" }}
        >
          Submit Response
        </Button>
      </Box>
    </Box>
  );
};

export default ChatField;
