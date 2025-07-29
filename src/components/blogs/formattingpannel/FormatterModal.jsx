"use client";
import { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  TextField,
  Paper,
  Backdrop,
  Fade,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import TiptapEditor from "./TipTapEditor";

const FormatterModal = ({ isOpen, onClose, handleBlogSubmit }) => {
  const [formattedContent, setFormattedContent] = useState("");
  const [contentTitle, setContentTitle] = useState("");

  const theme = {
    primary: "#3244e6",
    secondary: "#ffffff",
    dark: "#1A1730",
    darker: "#151221",
    purple: "#211C35",
    border: "#6b46c1",
  };

  useEffect(() => {
    if (isOpen) {
      setFormattedContent("");
      setContentTitle("");
    }
  }, [isOpen]);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        sx: { backgroundColor: "rgba(0, 0, 0, 0.7)" },
      }}
    >
      <Fade in={isOpen}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "95%", sm: "90%", md: "80%", lg: "70%" },
            maxWidth: "1200px",
            height: "90vh",
            bgcolor: theme.dark,
            background: `linear-gradient(to bottom, ${theme.dark}, ${theme.darker})`,
            border: `1px solid ${theme.border}40`,
            borderRadius: 2,
            boxShadow: 24,
            outline: "none",
            display: "flex",
            flexDirection: "column",
            color: "white",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 3,
              borderBottom: "1px solid #374151",
            }}
          >
            <Typography
              variant="h6"
              component="h2"
              sx={{
                fontWeight: 600,
                color: "#c4b5fd",
              }}
            >
              Write Your Content
            </Typography>
            <IconButton
              onClick={onClose}
              size="small"
              sx={{
                color: "#9ca3af",
                "&:hover": { color: "white" },
              }}
            >
              <Close />
            </IconButton>
          </Box>

          {/* Body */}
          <Box
            sx={{
              p: 3,
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 3,
                height: "100%",
              }}
            >
              {/* Editor Section */}
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  minHeight: 0,
                }}
              >
                <TextField
                  fullWidth
                  placeholder="Add title for your content"
                  value={contentTitle}
                  onChange={(e) => setContentTitle(e.target.value)}
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: theme.purple,
                      color: "white",
                      "& fieldset": {
                        borderColor: `${theme.border}80`,
                      },
                      "&:hover fieldset": {
                        borderColor: theme.border,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: theme.primary,
                      },
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "#9ca3af",
                      opacity: 1,
                    },
                  }}
                />
                <Paper
                  sx={{
                    flexGrow: 1,
                    bgcolor: theme.purple,
                    border: `1px solid ${theme.border}80`,
                    borderRadius: 1,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ flexGrow: 1, overflow: "auto" }}>
                    <TiptapEditor
                      content={formattedContent}
                      setContent={setFormattedContent}
                      editorOptions={{ immediatelyRender: false }}
                    />
                  </Box>
                </Paper>
              </Box>

              {/* Preview Section */}
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  minHeight: 0,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    mb: 2,
                    color: "#c4b5fd",
                    fontWeight: 600,
                  }}
                >
                  Preview
                </Typography>
                <Paper
                  sx={{
                    flexGrow: 1,
                    p: 3,
                    bgcolor: theme.purple,
                    border: `1px solid ${theme.border}80`,
                    borderRadius: 1,
                    overflow: "auto",
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      mb: 3,
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {contentTitle || "Untitled Content"}
                  </Typography>
                  <Box
                    sx={{
                      color: "white",
                      "& *": { color: "inherit" },
                    }}
                    dangerouslySetInnerHTML={{ __html: formattedContent }}
                  />
                </Paper>
              </Box>
            </Box>
          </Box>
        </Box>
      </Fade>
      <Button
        variant="contained"
        onClick={() => {
          const newBlog = {
            id: Date.now(),
            title: contentTitle,
            excerpt: formattedContent.substring(0, 120), // Or generate from editor
            category: "Business Loans", // Or allow selection
            featured: false,
            image: "/F2.fintech (2).png",
            author: "Robert Wilson",
            date: new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            }),
            readTime: "4 min read",
            href: "/personal-loan-blogs",
            content: formattedContent,
          };
          handleSubmit(newBlog);
          onClose();
        }}
      >
        Publish
      </Button>
    </Modal>
  );
};

export default FormatterModal;
