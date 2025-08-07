"use client";
import { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  TextField,
  Paper,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  Chip,
  Avatar,
} from "@mui/material";
import { Close, CloudUpload, Visibility } from "@mui/icons-material";
import TiptapEditor from "./TipTapEditor";
import {
  createBlog,
  updateBlog,
  getAllBlogs,
  deleteBlog,
} from "../../../apis/BlogsAPI";

const FormatterModal = ({
  isOpen,
  onClose,
  refreshBlogs,
  initialData = null,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "Business Loans",
    author: "",
    route: "",
    readTime: "",
    featured: false,
    image: null,
    imagePreview: "",
  });
  const isEditMode = Boolean(initialData); //

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmed || !initialData?.id) return;

    try {
      const result = await deleteBlog(initialData.id);

      if (result.success) {
        alert("Blog deleted successfully!");
        onClose();
        window.location.reload();
      } else {
        alert("Failed to delete blog.");
      }
    } catch (error) {
      alert("Error deleting blog.");
    }
  };

  const theme = {
    primary: "#3244e6",
    secondary: "#ffffff",
    dark: "#1A1730",
    darker: "#151221",
    purple: "#211C35",
    border: "#6b46c1",
  };

  const categories = [
    "Business Loans",
    "Personal Finance",
    "Credit Score",
    "Investment Tips",
    "Banking",
    "Insurance",
  ];

  useEffect(() => {
    if (isOpen) {
      setFormData(
        initialData || {
          title: "",
          content: "",
          excerpt: "",
          category: "Business Loans",
          author: "",
          route: "",
          readTime: "",
          featured: false,
          image: null,
          imagePreview: "",
        }
      );
    }
  }, [isOpen, initialData]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          image: file,
          imagePreview: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const generateExcerpt = (content) => {
    const plainText = content.replace(/<[^>]*>/g, "");
    return plainText.substring(0, 150) + (plainText.length > 150 ? "..." : "");
  };

  const estimateReadTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  const handlePublish = async () => {
    if (
      !formData.title.trim() ||
      !formData.content.trim() ||
      !formData.author.trim() ||
      !formData.route.trim
    ) {
      alert(
        "Please fill in all required fields (Title, Content, Author,Route)"
      );
      return;
    }

    const blogData = {
      title: formData.title,
      excerpt: formData.excerpt || generateExcerpt(formData.content),
      category: formData.category,
      featured: formData.featured,
      author: formData.author,
      route: formData.route,
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      readTime: formData.readTime || estimateReadTime(formData.content),
      href: "/personal-loan-blogs",
      content: formData.content,
      imageFile: formData.image, // 👈 the raw file object goes here
    };

    try {
      let result;
      if (isEditMode) {
        result = await updateBlog(initialData.id, blogData);
      } else {
        result = await createBlog(blogData);
      }

      if (result.success) {
        alert(`Blog ${isEditMode ? "updated" : "saved"} successfully!`);
        onClose();
        window.location.reload();
        // await getAllBlogs();
      } else {
        alert(`Failed to ${isEditMode ? "update" : "save"} blog.`);
      }
    } catch (error) {
      alert("Server error while saving blog.");
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: { xs: "95%", sm: "90%", md: "85%", lg: "80%" },
          maxWidth: "1400px",
          height: "95vh",
          bgcolor: theme.dark,
          background: `linear-gradient(to bottom, ${theme.dark}, ${theme.darker})`,
          border: `1px solid ${theme.border}40`,
          borderRadius: 2,
          boxShadow: 24,
          outline: "none",
          display: "flex",
          flexDirection: "column",
          color: "white",
          overflow: "hidden",
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
            Create New Blog Post
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
            overflow: "auto",
          }}
        >
          <Grid container spacing={3} sx={{ height: "100%" }}>
            {/* Left Panel - Form Fields */}
            <Grid item xs={12} md={4}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {/* Title */}
                <TextField
                  fullWidth
                  label="Blog Title *"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: theme.purple,
                      color: "white",
                    },
                    "& .MuiInputLabel-root": { color: "#9ca3af" },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: `${theme.border}80`,
                    },
                  }}
                />

                {/* Author */}
                <TextField
                  fullWidth
                  label="Author Name *"
                  value={formData.author}
                  onChange={(e) => handleInputChange("author", e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: theme.purple,
                      color: "white",
                    },
                    "& .MuiInputLabel-root": { color: "#9ca3af" },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: `${theme.border}80`,
                    },
                  }}
                />

                {/* Category */}
                <FormControl fullWidth>
                  <InputLabel sx={{ color: "#9ca3af" }}>Category</InputLabel>
                  <Select
                    value={formData.category}
                    onChange={(e) =>
                      handleInputChange("category", e.target.value)
                    }
                    sx={{
                      backgroundColor: theme.purple,
                      color: "white",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: `${theme.border}80`,
                      },
                    }}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Excerpt */}
                <TextField
                  fullWidth
                  label="Excerpt (Optional)"
                  multiline
                  rows={3}
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange("excerpt", e.target.value)}
                  placeholder="Brief description of the blog post"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: theme.purple,
                      color: "white",
                    },
                    "& .MuiInputLabel-root": { color: "#9ca3af" },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: `${theme.border}80`,
                    },
                  }}
                />

                {/* Dynamic Route */}
                <TextField
                  fullWidth
                  label="Dynamic route *"
                  value={formData.route}
                  onChange={(e) => handleInputChange("route", e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: theme.purple,
                      color: "white",
                    },
                    "& .MuiInputLabel-root": { color: "#9ca3af" },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: `${theme.border}80`,
                    },
                  }}
                />

                {/* Read Time */}
                <TextField
                  fullWidth
                  label="Read Time (Optional)"
                  value={formData.readTime}
                  onChange={(e) =>
                    handleInputChange("readTime", e.target.value)
                  }
                  placeholder="e.g., 5 min read"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: theme.purple,
                      color: "white",
                    },
                    "& .MuiInputLabel-root": { color: "#9ca3af" },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: `${theme.border}80`,
                    },
                  }}
                />

                {/* Image Upload */}
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ mb: 1, color: "#c4b5fd" }}
                  >
                    Featured Image
                  </Typography>
                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<CloudUpload />}
                    fullWidth
                    sx={{
                      color: "#9ca3af",
                      borderColor: "#374151",
                      "&:hover": {
                        borderColor: "#6b7280",
                        color: "white",
                      },
                    }}
                  >
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleImageUpload}
                    />
                  </Button>
                  {formData.imagePreview && (
                    <Box sx={{ mt: 2 }}>
                      <img
                        src={formData.imagePreview}
                        alt="Preview"
                        style={{
                          width: "100%",
                          height: "120px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    </Box>
                  )}
                </Box>

                {/* Featured Toggle */}
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.featured}
                      onChange={(e) =>
                        handleInputChange("featured", e.target.checked)
                      }
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: theme.primary,
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                          {
                            backgroundColor: theme.primary,
                          },
                      }}
                    />
                  }
                  label="Featured Post"
                  sx={{ color: "#c4b5fd" }}
                />
              </Box>
            </Grid>

            {/* Center Panel - Editor */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <Typography variant="h6" sx={{ mb: 2, color: "#c4b5fd" }}>
                  Content Editor
                </Typography>
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
                      content={formData.content}
                      setContent={(content) =>
                        handleInputChange("content", content)
                      }
                      editorOptions={{ immediatelyRender: false }}
                    />
                  </Box>
                </Paper>
              </Box>
            </Grid>

            {/* Right Panel - Preview */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <Typography variant="h6" sx={{ mb: 2, color: "#c4b5fd" }}>
                  Live Preview
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
                  {/* Blog Preview */}
                  {formData.imagePreview && (
                    <Box sx={{ mb: 3 }}>
                      <img
                        src={formData.imagePreview}
                        alt="Featured"
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    </Box>
                  )}

                  <Box
                    sx={{ mb: 2, display: "flex", gap: 1, flexWrap: "wrap" }}
                  >
                    <Chip
                      label={formData.category}
                      size="small"
                      sx={{
                        bgcolor: theme.primary,
                        color: "white",
                        fontSize: "0.75rem",
                      }}
                    />
                    {formData.featured && (
                      <Chip
                        label="Featured"
                        size="small"
                        sx={{
                          bgcolor: "#10b981",
                          color: "white",
                          fontSize: "0.75rem",
                        }}
                      />
                    )}
                  </Box>

                  <Typography
                    variant="h5"
                    sx={{
                      mb: 2,
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {formData.title || "Blog Title"}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      mb: 3,
                      color: "#9ca3af",
                      fontStyle: "italic",
                    }}
                  >
                    {formData.excerpt || generateExcerpt(formData.content)}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 3,
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: theme.primary,
                        fontSize: "0.875rem",
                      }}
                    >
                      {formData.author.charAt(0) || "A"}
                    </Avatar>
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ color: "white", fontWeight: 500 }}
                      >
                        {formData.author || "Author Name"}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#9ca3af", fontSize: "0.75rem" }}
                      >
                        {new Date().toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}{" "}
                        •{" "}
                        {formData.readTime ||
                          estimateReadTime(formData.content)}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      color: "white",
                      "& *": { color: "inherit" },
                      "& h1, & h2, & h3": {
                        marginTop: "1rem",
                        marginBottom: "0.5rem",
                      },
                      "& p": { marginBottom: "1rem", lineHeight: 1.6 },
                      "& ul, & ol": {
                        paddingLeft: "1.5rem",
                        marginBottom: "1rem",
                      },
                    }}
                    dangerouslySetInnerHTML={{ __html: formData.content }}
                  />
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            p: 3,
            borderTop: "1px solid #374151",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: "#9ca3af" }}>
            * Required fields: Title, Content, Author
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{
                color: "#9ca3af",
                borderColor: "#374151",
                "&:hover": {
                  borderColor: "#6b7280",
                  color: "white",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handlePublish}
              startIcon={<Visibility />}
              sx={{
                bgcolor: theme.primary,
                "&:hover": { bgcolor: "#2a3bdc" },
              }}
            >
              {isEditMode ? "Update Blog" : "Publish Blog"}
            </Button>

            {isEditMode && (
              <Button
                variant="outlined"
                color="error"
                onClick={handleDelete}
                sx={{
                  borderColor: "#ef4444",
                  color: "#ef4444",
                  "&:hover": {
                    bgcolor: "#ef444430",
                    borderColor: "#dc2626",
                    color: "#dc2626",
                  },
                }}
              >
                Delete
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default FormatterModal;
