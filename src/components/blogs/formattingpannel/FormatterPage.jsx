"use client";
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
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
  CircularProgress,
  Backdrop,
  Tabs,
  Tab,
  Chip,
  Tooltip,
  IconButton,
} from "@mui/material";
import {
  CloudUpload,
  Visibility,
  ArrowBack,
  Code,
  Edit,
  ContentCopy,
  CheckCircle,
  Refresh,
} from "@mui/icons-material";
import TiptapEditor from "./TipTapEditor";
import {
  createBlog,
  updateBlog,
  getBlogById,
  deleteBlog,
} from "../../../apis/BlogsAPI";
import API from "../../../apis";

// ─── Helper: detect if content is a self-contained HTML blog ──────────────────
const isRawHTMLBlog = (content) => {
  if (!content) return false;
  const lower = content.toLowerCase().trim();
  return (
    lower.includes("f2dl-wrapper") ||
    lower.includes("<!doctype") ||
    lower.includes("<html") ||
    lower.includes("<style>") ||
    (lower.includes('<div class="') && lower.includes("<script"))
  );
};

// ─── HTML Preview Iframe ──────────────────────────────────────────────────────
const HtmlPreviewFrame = ({ htmlContent }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // Extract only body content if it's a full HTML doc, else use as-is
    let bodyContent = htmlContent;
    const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    if (bodyMatch) {
      // Full HTML doc – use srcdoc with the entire document for correct execution
      bodyContent = htmlContent;
    }

    iframe.srcdoc = bodyContent;
  }, [htmlContent]);

  return (
    <iframe
      ref={iframeRef}
      title="Blog HTML Preview"
      style={{
        width: "100%",
        height: "100%",
        minHeight: "600px",
        border: "none",
        borderRadius: "8px",
        background: "white",
      }}
      sandbox="allow-scripts allow-same-origin allow-forms"
    />
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────
const FormatterPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = id && id !== "new";

  // Active editor mode: "html" for raw HTML paste, "rich" for TipTap
  const [editorMode, setEditorMode] = useState("html");
  const [copiedToClip, setCopiedToClip] = useState(false);

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

  const [contentImages, setContentImages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMessage, setProcessingMessage] = useState("");
  const [previewKey, setPreviewKey] = useState(0); // force iframe re-render

  const handleClose = () => navigate("/blogs");

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmed || !id) return;
    try {
      setIsProcessing(true);
      setProcessingMessage("Deleting blog...");
      const result = await deleteBlog(id);
      if (result.success) {
        alert("Blog deleted successfully!");
        navigate("/blogs");
      } else {
        alert("Failed to delete blog.");
      }
    } catch {
      alert("Error deleting blog.");
    } finally {
      setIsProcessing(false);
    }
  };

  const theme = {
    primary: "#3244e6",
    secondary: "#ffffff",
    dark: "#ffffff",
    darker: "#f9fafb",
    purple: "#f3f4f6",
    border: "#d1d5db",
  };

  const categories = [
    "Business Loans",
    "Personal Finance",
    "Home Loans",
    "OverDraft Loans",
    "Credit Score",
    "Investment Tips",
    "Banking",
    "Insurance",
    "Doctor Loans",
  ];

  // ── Load existing blog ──────────────────────────────────────────────────────
  useEffect(() => {
    if (isEditMode) {
      const fetchBlog = async () => {
        try {
          setIsProcessing(true);
          setProcessingMessage("Loading blog...");
          const result = await getBlogById(id);
          if (result.success) {
            const blog = result.blog;
            setFormData({
              ...blog,
              imagePreview: blog.image || "",
            });
            // Auto-detect editor mode
            if (isRawHTMLBlog(blog.content)) {
              setEditorMode("html");
            } else {
              setEditorMode("rich");
            }
          } else {
            alert("Failed to fetch blog data");
            navigate("/blogs");
          }
        } catch {
          alert("Error fetching blog data");
          navigate("/blogs");
        } finally {
          setIsProcessing(false);
        }
      };
      fetchBlog();
    } else {
      setFormData({
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
      setContentImages([]);
    }
  }, [id, isEditMode, navigate]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // ── Auto-extract metadata from pasted HTML ──────────────────────────────────
  const extractMetaFromHTML = (html) => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const titleTag =
        doc.querySelector("title")?.textContent?.trim() || "";
      const descMeta =
        doc
          .querySelector('meta[name="description"]')
          ?.getAttribute("content")
          ?.trim() || "";
      const h1Text = doc.querySelector("h1")?.textContent?.trim() || "";

      return { titleTag, descMeta, h1Text };
    } catch {
      return { titleTag: "", descMeta: "", h1Text: "" };
    }
  };

  const handleHTMLPaste = (html) => {
    handleInputChange("content", html);

    // Auto-fill metadata if fields are empty
    const { titleTag, descMeta, h1Text } = extractMetaFromHTML(html);

    setFormData((prev) => ({
      ...prev,
      content: html,
      title: prev.title || h1Text || titleTag || prev.title,
      excerpt: prev.excerpt || descMeta || prev.excerpt,
    }));
  };

  // ── Featured image upload ───────────────────────────────────────────────────
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

  // ── Content image upload (used by TipTap rich mode) ────────────────────────
  const handleContentImageUpload = (file) => {
    return new Promise(async (resolve, reject) => {
      try {
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 10);
        const extension = file.name.split(".").pop();
        const uniqueFileName = `blog-${timestamp}-${randomString}.${extension}`;

        const res = await API.DocumentAPI.uploadDocument({
          document: file,
          folder: `document/blog/${uniqueFileName}`,
        });

        if (res.data.status === "Success") {
          const fileUrl = res.data.data || res.data.fileUrl;
          const imageIndex = contentImages.length;
          const placeholder = `PLACEHOLDER_IMAGE_${imageIndex}`;
          setContentImages((prev) => [
            ...prev,
            { file, placeholder, preview: fileUrl },
          ]);
          resolve({ preview: fileUrl, placeholder, index: imageIndex });
        } else {
          reject(new Error("Upload failed"));
        }
      } catch (error) {
        reject(error);
      }
    });
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

  // ── Publish / Update ────────────────────────────────────────────────────────
  const handlePublish = async () => {
    if (
      !formData.title.trim() ||
      !formData.content.trim() ||
      !formData.author.trim() ||
      !formData.route.trim()
    ) {
      alert(
        "Please fill in all required fields (Title, Content, Author, Route)"
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
      // Flag so BlogDetails knows to render as iframe
      contentType: isRawHTMLBlog(formData.content) ? "html" : "rich",
      imageFile: formData.image,
    };

    contentImages.forEach((file, index) => {
      blogData[`contentImage${index}`] = file;
    });

    try {
      setIsProcessing(true);
      const totalImages = contentImages.length + (formData.image ? 1 : 0);
      setProcessingMessage(
        totalImages > 0
          ? `Uploading ${totalImages} image(s)...`
          : isEditMode
          ? "Updating blog..."
          : "Publishing blog..."
      );

      const result = isEditMode
        ? await updateBlog(id, blogData)
        : await createBlog(blogData);

      if (result.success) {
        alert(`Blog ${isEditMode ? "updated" : "saved"} successfully!`);
        navigate("/blogs");
      } else {
        alert(`Failed to ${isEditMode ? "update" : "save"} blog.`);
      }
    } catch (error) {
      console.error("Error saving blog:", error);
      alert("Server error while saving blog. Check console for details.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopyHTML = () => {
    if (formData.content) {
      navigator.clipboard.writeText(formData.content);
      setCopiedToClip(true);
      setTimeout(() => setCopiedToClip(false), 2000);
    }
  };

  const htmlIsRaw = isRawHTMLBlog(formData.content);

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: theme.dark,
        background: `linear-gradient(to bottom, ${theme.dark}, ${theme.darker})`,
        color: "black",
        py: 2,
      }}
    >
      {/* Processing Backdrop */}
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (t) => t.zIndex.drawer + 1,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        }}
        open={isProcessing}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <CircularProgress color="inherit" size={60} />
          <Typography variant="h6">{processingMessage}</Typography>
          <Typography variant="body2" sx={{ maxWidth: 400, textAlign: "center" }}>
            Please wait while we process your blog...
          </Typography>
        </Box>
      </Backdrop>

      <Container maxWidth="xl">
        <Box
          sx={{
            bgcolor: theme.dark,
            background: `linear-gradient(to bottom, ${theme.dark}, ${theme.darker})`,
            color: "black",
            border: `1px solid ${theme.border}40`,
            borderRadius: 2,
            boxShadow: 24,
            overflow: "hidden",
          }}
        >
          {/* ── Header ── */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 3,
              borderBottom: "1px solid #e5e7eb",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography
                variant="h5"
                component="h1"
                sx={{ fontWeight: 700, color: "#1f2937" }}
              >
                {isEditMode ? `Edit Blog #${id}` : "Create New Blog Post"}
              </Typography>
              {htmlIsRaw && (
                <Chip
                  icon={<Code sx={{ fontSize: 14 }} />}
                  label="Custom HTML Blog"
                  size="small"
                  sx={{
                    bgcolor: "#dbeafe",
                    color: "#1e40af",
                    fontWeight: 600,
                    border: "1px solid #93c5fd",
                  }}
                />
              )}
            </Box>
            <Button
              onClick={handleClose}
              variant="outlined"
              startIcon={<ArrowBack />}
              sx={{
                borderColor: "#d1d5db",
                color: "black",
                "&:hover": { borderColor: "#6b7280", bgcolor: "#f3f4f6" },
              }}
            >
              Back to Blogs
            </Button>
          </Box>

          {/* ── Body ── */}
          <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
              {/* ── LEFT PANEL: Metadata ── */}
              <Grid item xs={12} md={3}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <TextField
                    fullWidth
                    label="Blog Title *"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    sx={inputSx(theme)}
                  />
                  <TextField
                    fullWidth
                    label="Author Name *"
                    value={formData.author}
                    onChange={(e) =>
                      handleInputChange("author", e.target.value)
                    }
                    sx={inputSx(theme)}
                  />
                  <FormControl fullWidth>
                    <InputLabel sx={{ color: "#6b7280" }}>Category</InputLabel>
                    <Select
                      value={formData.category}
                      label="Category"
                      onChange={(e) =>
                        handleInputChange("category", e.target.value)
                      }
                      sx={{
                        backgroundColor: theme.purple,
                        color: "black",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.border,
                        },
                      }}
                    >
                      {categories.map((c) => (
                        <MenuItem key={c} value={c}>
                          {c}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    label="Excerpt (Optional)"
                    multiline
                    rows={3}
                    value={formData.excerpt}
                    onChange={(e) =>
                      handleInputChange("excerpt", e.target.value)
                    }
                    placeholder="Brief description (auto-extracted from HTML if empty)"
                    sx={inputSx(theme)}
                  />
                  <TextField
                    fullWidth
                    label="Route / Slug *"
                    value={formData.route}
                    onChange={(e) =>
                      handleInputChange("route", e.target.value)
                    }
                    placeholder="e.g. /blogs/doctor-loan-india-2026"
                    sx={inputSx(theme)}
                  />
                  <TextField
                    fullWidth
                    label="Read Time (Optional)"
                    value={formData.readTime}
                    onChange={(e) =>
                      handleInputChange("readTime", e.target.value)
                    }
                    placeholder="e.g., 8 min read"
                    sx={inputSx(theme)}
                  />

                  {/* Featured image */}
                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1, color: "#6b7280" }}>
                      Featured Image (thumbnail)
                    </Typography>
                    <Button
                      component="label"
                      variant="outlined"
                      startIcon={<CloudUpload />}
                      fullWidth
                      sx={{
                        color: "#6b7280",
                        borderColor: "#d1d5db",
                        "&:hover": { borderColor: "#6b7280", color: "#374151" },
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
                            height: "110px",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                        />
                      </Box>
                    )}
                  </Box>

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
                    sx={{ color: "#6b7280" }}
                  />
                </Box>
              </Grid>

              {/* ── CENTER PANEL: Editor ── */}
              <Grid item xs={12} md={4.5}>
                <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                  {/* Mode Tabs */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 1.5,
                    }}
                  >
                    <Tabs
                      value={editorMode}
                      onChange={(_, v) => setEditorMode(v)}
                      sx={{
                        minHeight: 36,
                        "& .MuiTab-root": {
                          minHeight: 36,
                          py: 0.5,
                          fontSize: "0.85rem",
                        },
                      }}
                    >
                      <Tab
                        icon={<Code sx={{ fontSize: 16 }} />}
                        iconPosition="start"
                        label="HTML Mode"
                        value="html"
                      />
                      <Tab
                        icon={<Edit sx={{ fontSize: 16 }} />}
                        iconPosition="start"
                        label="Rich Text"
                        value="rich"
                      />
                    </Tabs>

                    {editorMode === "html" && formData.content && (
                      <Tooltip title={copiedToClip ? "Copied!" : "Copy HTML"}>
                        <IconButton size="small" onClick={handleCopyHTML}>
                          {copiedToClip ? (
                            <CheckCircle sx={{ color: "#16a34a", fontSize: 18 }} />
                          ) : (
                            <ContentCopy sx={{ fontSize: 18 }} />
                          )}
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>

                  {/* ── HTML Mode ── */}
                  {editorMode === "html" && (
                    <Paper
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        border: "1px solid #d1d5db",
                        borderRadius: 1,
                        overflow: "hidden",
                        minHeight: 500,
                      }}
                    >
                      {/* Instruction banner */}
                      <Box
                        sx={{
                          px: 2,
                          py: 1,
                          bgcolor: "#eff6ff",
                          borderBottom: "1px solid #bfdbfe",
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <Code sx={{ fontSize: 16, color: "#2563eb" }} />
                        <Typography variant="caption" sx={{ color: "#1d4ed8" }}>
                          Paste your complete HTML blog code below. The preview
                          will render it exactly, including styles &amp; scripts.
                        </Typography>
                      </Box>
                      <textarea
                        value={formData.content}
                        onChange={(e) => handleHTMLPaste(e.target.value)}
                        placeholder={`Paste your full HTML blog here, e.g.:\n\n<!DOCTYPE html>\n<html>\n<head>\n  <style>/* your styles */</style>\n</head>\n<body>\n  <div class="f2dl-wrapper">...</div>\n  <script>/* your JS */</script>\n</body>\n</html>`}
                        style={{
                          flex: 1,
                          width: "100%",
                          minHeight: "460px",
                          padding: "14px",
                          fontFamily: '"Fira Code", "Consolas", monospace',
                          fontSize: "13px",
                          lineHeight: 1.6,
                          border: "none",
                          outline: "none",
                          resize: "vertical",
                          background: "#fafafa",
                          color: "#1a1a2e",
                        }}
                        spellCheck={false}
                      />
                      {/* Character count */}
                      <Box
                        sx={{
                          px: 2,
                          py: 0.5,
                          bgcolor: "#f9fafb",
                          borderTop: "1px solid #e5e7eb",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="caption" color="text.secondary">
                          {formData.content.length.toLocaleString()} characters
                        </Typography>
                        {htmlIsRaw && (
                          <Chip
                            label="✓ HTML detected"
                            size="small"
                            sx={{ bgcolor: "#dcfce7", color: "#16a34a", fontSize: "0.72rem" }}
                          />
                        )}
                      </Box>
                    </Paper>
                  )}

                  {/* ── Rich Text Mode ── */}
                  {editorMode === "rich" && (
                    <Paper
                      sx={{
                        flexGrow: 1,
                        minHeight: "500px",
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
                          onImageUpload={handleContentImageUpload}
                          editorOptions={{ immediatelyRender: false }}
                        />
                      </Box>
                    </Paper>
                  )}
                </Box>
              </Grid>

              {/* ── RIGHT PANEL: Live Preview ── */}
              <Grid item xs={12} md={4.5}>
                <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 1.5,
                    }}
                  >
                    <Typography variant="h6" sx={{ color: "#6b7280", fontSize: "0.95rem", fontWeight: 600 }}>
                      <Visibility sx={{ fontSize: 16, mr: 0.5, verticalAlign: "middle" }} />
                      Live Preview
                    </Typography>
                    <Tooltip title="Refresh preview">
                      <IconButton
                        size="small"
                        onClick={() => setPreviewKey((k) => k + 1)}
                      >
                        <Refresh sx={{ fontSize: 18 }} />
                      </IconButton>
                    </Tooltip>
                  </Box>

                  <Paper
                    sx={{
                      flexGrow: 1,
                      minHeight: "540px",
                      bgcolor: "white",
                      border: `1px solid ${theme.border}80`,
                      borderRadius: 1,
                      overflow: "hidden",
                    }}
                  >
                    {/* HTML blog: iframe preview */}
                    {htmlIsRaw && formData.content ? (
                      <HtmlPreviewFrame
                        key={previewKey}
                        htmlContent={formData.content}
                      />
                    ) : formData.content ? (
                      /* Rich text: styled HTML preview */
                      <Box sx={{ p: 3, overflow: "auto", height: "100%" }}>
                        {formData.imagePreview && (
                          <img
                            src={formData.imagePreview}
                            alt="Featured"
                            style={{
                              width: "100%",
                              height: "180px",
                              objectFit: "cover",
                              borderRadius: "8px",
                              marginBottom: "16px",
                            }}
                          />
                        )}
                        <Typography
                          variant="h5"
                          sx={{ mb: 1.5, color: "#1f2937", fontWeight: 700 }}
                        >
                          {formData.title || "Blog Title"}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ mb: 2, color: "#6b7280", fontStyle: "italic" }}
                        >
                          {formData.excerpt ||
                            generateExcerpt(formData.content)}
                        </Typography>
                        <Box
                          sx={{
                            color: "black",
                            "& p": { mb: 2, lineHeight: 1.7 },
                            "& h2, & h3": { mt: 2, mb: 1 },
                            "& ul, & ol": { pl: 2.5, mb: 2 },
                            "& img": {
                              maxWidth: "100%",
                              borderRadius: "8px",
                            },
                          }}
                          dangerouslySetInnerHTML={{
                            __html: formData.content,
                          }}
                        />
                      </Box>
                    ) : (
                      /* Empty state */
                      <Box
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#9ca3af",
                          gap: 1.5,
                          p: 4,
                          textAlign: "center",
                        }}
                      >
                        <Visibility sx={{ fontSize: 48, opacity: 0.3 }} />
                        <Typography variant="h6" sx={{ fontWeight: 500 }}>
                          Preview will appear here
                        </Typography>
                        <Typography variant="body2">
                          Paste your HTML code or start writing in Rich Text
                          mode to see a live preview.
                        </Typography>
                      </Box>
                    )}
                  </Paper>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* ── Footer / Actions ── */}
          <Box
            sx={{
              p: 3,
              borderTop: "1px solid #e5e7eb",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Typography variant="body2" sx={{ color: "#9ca3af" }}>
              * Required fields: Title, Content, Author, Route
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="outlined"
                onClick={handleClose}
                sx={{
                  borderColor: "#d1d5db",
                  color: "black",
                  "&:hover": { borderColor: "#6b7280", bgcolor: "#f3f4f6" },
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
                  color: "white",
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
      </Container>
    </Box>
  );
};

// ─── Shared MUI TextField sx helper ──────────────────────────────────────────
const inputSx = (theme) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: theme.purple,
    color: "black",
  },
  "& .MuiInputLabel-root": { color: "#6b7280" },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.border,
  },
});

export default FormatterPage;
