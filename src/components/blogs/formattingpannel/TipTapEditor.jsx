import React, { useState, useRef } from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";

import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaListUl,
  FaListOl,
  FaLink,
  FaImage,
  FaCode,
  FaUndo,
  FaRedo,
  FaTimes,
} from "react-icons/fa";

import {
  Box,
  IconButton,
  Paper,
  GlobalStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography as MuiTypography,
  Alert,
} from "@mui/material";

const MenuButton = ({ onClick, isActive, children, tooltip }) => (
  <IconButton
    onClick={onClick}
    size="small"
    sx={{
      color: isActive ? "white" : "grey.300",
      backgroundColor: isActive ? "primary.main" : "transparent",
      "&:hover": {
        backgroundColor: isActive ? "primary.dark" : "grey.700",
        color: "white",
      },
    }}
    title={tooltip}
  >
    {children}
  </IconButton>
);

// Custom Image extension
const CustomImage = Image.extend({
  addKeyboardShortcuts() {
    return {
      Enter: () => {
        const { state, dispatch } = this.editor.view;
        const { $from } = state.selection;

        if ($from.nodeBefore && $from.nodeBefore.type.name === "image") {
          const transaction = state.tr.insert(
            $from.pos,
            state.schema.nodes.paragraph.create()
          );
          dispatch(transaction);
          return true;
        }
        return false;
      },
    };
  },
});

const TiptapEditor = ({
  content,
  setContent,
  onImageUpload,
  editorOptions = {},
}) => {
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const imageFileRef = useRef(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: {
          HTMLAttributes: { class: "custom-code-block" },
        },
        paragraph: {
          HTMLAttributes: {
            class: "editor-paragraph",
          },
        },
      }),
      CustomImage.configure({
        HTMLAttributes: {
          class: "editor-image",
          style: "display: block; margin: 1rem 0;",
        },
        allowBase64: false, // IMPORTANT: Disable base64
        inline: false,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
      Placeholder.configure({ placeholder: "Write something amazing..." }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Typography,
      Underline,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      TaskList,
      TaskItem.configure({ nested: true }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
    ],
    content,
    onUpdate: ({ editor }) => setContent(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "prose-editor",
        style: "outline: none; min-height: 300px;",
      },
    },
    ...editorOptions,
  });

  if (!editor) return null;

  // Insert image from URL
  const insertImageFromUrl = () => {
    if (imageUrl.trim()) {
      editor
        .chain()
        .focus()
        .setImage({
          src: imageUrl,
          alt: imageAlt || "Image",
        })
        .run();

      setTimeout(() => {
        editor.commands.focus("end");
      }, 100);

      setImageDialogOpen(false);
      setImageUrl("");
      setImageAlt("");
    }
  };

  // Handle file upload - Send file to parent component
  const handleFileUpload = async (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (!onImageUpload) {
      alert("Image upload handler not configured");
      return;
    }

    try {
      // Call parent's image upload handler
      const result = await onImageUpload(file);

      if (result && result.preview) {
        // Insert image with preview URL (base64) for display
        // but store the placeholder for backend replacement
        editor
          .chain()
          .focus()
          .setImage({
            src: result.preview, // Base64 for preview
            alt: imageAlt || file.name,
            "data-placeholder": result.placeholder, // Store placeholder
          })
          .run();

        setTimeout(() => {
          editor.commands.focus("end");
        }, 100);
      }

      setImageDialogOpen(false);
      setImageAlt("");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    }
  };

  // Drag and drop image
  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);

    const files = Array.from(event.dataTransfer.files);
    const imageFile = files.find((file) => file.type.startsWith("image/"));

    if (imageFile) {
      handleFileUpload(imageFile);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragOver(false);
  };

  // Quick image insert from file input
  const quickAddImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event) => {
      const file = event.target.files[0];
      handleFileUpload(file);
    };
    input.click();
  };

  const openImageDialog = () => {
    setImageDialogOpen(true);
  };

  const addLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <Box sx={{ maxWidth: 960, mx: "auto", color: "white" }}>
      {/* Image Insertion Dialog */}
      <Dialog
        open={imageDialogOpen}
        onClose={() => setImageDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Insert Image
          <IconButton
            aria-label="close"
            onClick={() => setImageDialogOpen(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <FaTimes />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 2 }}>
            {/* Method 1: URL Input */}
            <Box>
              <MuiTypography variant="h6" gutterBottom>
                From URL
              </MuiTypography>
              <TextField
                fullWidth
                placeholder="Paste image URL here"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                size="small"
              />
              <TextField
                fullWidth
                placeholder="Alt text (optional)"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                size="small"
                sx={{ mt: 1 }}
              />
            </Box>

            <Box sx={{ textAlign: "center", color: "text.secondary" }}>OR</Box>

            {/* Method 2: File Upload */}
            <Box>
              <MuiTypography variant="h6" gutterBottom>
                Upload Image
              </MuiTypography>
              <Box
                sx={{
                  border: "2px dashed",
                  borderColor: dragOver ? "primary.main" : "grey.300",
                  borderRadius: 2,
                  p: 3,
                  textAlign: "center",
                  cursor: "pointer",
                  backgroundColor: dragOver ? "action.hover" : "transparent",
                  transition: "all 0.3s ease",
                }}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => document.getElementById("file-input").click()}
              >
                <FaImage size={32} style={{ marginBottom: 8, color: "#666" }} />
                <MuiTypography variant="body2" color="text.secondary">
                  Drag & drop an image here or click to browse
                </MuiTypography>
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    handleFileUpload(file);
                  }}
                />
              </Box>
            </Box>

            <Alert severity="info">
              Tip: Images will be uploaded to cloud storage when you publish the
              blog.
            </Alert>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setImageDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={insertImageFromUrl}
            variant="contained"
            disabled={!imageUrl.trim()}
          >
            Insert from URL
          </Button>
        </DialogActions>
      </Dialog>

      {/* Bubble Menu */}
      <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <Paper
          elevation={4}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            p: 1,
            backgroundColor: "#151221",
            borderRadius: 2,
          }}
        >
          <MenuButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
            tooltip="Bold"
          >
            <FaBold />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
            tooltip="Italic"
          >
            <FaItalic />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive("underline")}
            tooltip="Underline"
          >
            <FaUnderline />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive("strike")}
            tooltip="Strikethrough"
          >
            <FaStrikethrough />
          </MenuButton>

          <Box
            sx={{ width: 1, height: 16, borderRight: "1px solid gray", mx: 1 }}
          />

          <MenuButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive("bulletList")}
            tooltip="Bullet List"
          >
            <FaListUl />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive("orderedList")}
            tooltip="Numbered List"
          >
            <FaListOl />
          </MenuButton>

          <MenuButton
            onClick={() => editor.chain().focus().undo().run()}
            tooltip="Undo"
          >
            <FaUndo />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().redo().run()}
            tooltip="Redo"
          >
            <FaRedo />
          </MenuButton>

          <MenuButton onClick={addLink} tooltip="Insert Link">
            <FaLink />
          </MenuButton>
          <MenuButton
            onClick={openImageDialog}
            tooltip="Insert Image"
            isActive={false}
          >
            <FaImage />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            isActive={editor.isActive("codeBlock")}
            tooltip="Code Block"
          >
            <FaCode />
          </MenuButton>
        </Paper>
      </BubbleMenu>

      {/* Editor Content */}
      <Paper
        sx={{
          mt: 2,
          p: 2,
          minHeight: 300,
          backgroundColor: "#ffffff",
          borderRadius: 2,
          color: "#111827",
          border: dragOver ? "2px dashed primary.main" : "1px solid grey.300",
          position: "relative", // Added for absolute positioning
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <EditorContent editor={editor} />

        {/* Placeholder Chat Message */}
        {editor && editor.getText().trim() === "" && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              color: "grey.500",
              pointerEvents: "none",
              width: "80%",
            }}
          >
            <Box
              sx={{
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                p: 3,
                backgroundColor: "grey.50",
                borderRadius: 2,
                border: "1px solid",
                borderColor: "grey.200",
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  backgroundColor: "primary.main",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
              >
                💬
              </Box>
              <MuiTypography variant="h6" color="grey.600">
                Start Writing Your Story
              </MuiTypography>
              <MuiTypography variant="body2" color="grey.500">
                Share your thoughts, ideas, or create amazing content...
              </MuiTypography>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  mt: 1,
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    px: 2,
                    py: 1,
                    backgroundColor: "white",
                    borderRadius: 1,
                    border: "1px solid",
                    borderColor: "grey.300",
                    fontSize: "0.8rem",
                  }}
                >
                  ✨ Write an article
                </Box>
                <Box
                  sx={{
                    px: 2,
                    py: 1,
                    backgroundColor: "white",
                    borderRadius: 1,
                    border: "1px solid",
                    borderColor: "grey.300",
                    fontSize: "0.8rem",
                  }}
                >
                  🖼️ Add images
                </Box>
                <Box
                  sx={{
                    px: 2,
                    py: 1,
                    backgroundColor: "white",
                    borderRadius: 1,
                    border: "1px solid",
                    borderColor: "grey.300",
                    fontSize: "0.8rem",
                  }}
                >
                  📝 Format text
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Paper>

      {/* Quick Action Buttons */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          mt: 1,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Button
          variant="outlined"
          size="small"
          startIcon={<FaImage />}
          onClick={quickAddImage}
          sx={{
            border: "1px solid gray",
            borderRadius: "15px",
            color: "#000",
            fontWeight: "600",
            fontFamily: "poppins",
            "& .MuiButton-startIcon": {
              color: "#3244e6",
            },
          }}
        >
          Quick Upload Image
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<FaImage />}
          onClick={openImageDialog}
          sx={{
            border: "1px solid gray",
            borderRadius: "15px",
            color: "#000",
            fontWeight: "600",
            fontFamily: "poppins",
            "& .MuiButton-startIcon": {
              color: "#3244e6",
            },
          }}
        >
          Insert Image from URL
        </Button>
      </Box>

      {/* Instructions */}
      <Box sx={{ mt: 1 }}>
        <MuiTypography variant="body2" color="text.secondary">
          💡 Tip: Images will be stored temporarily and uploaded to S3 when you
          publish.
        </MuiTypography>
      </Box>

      {/* Global Styles */}
      <GlobalStyles
        styles={{
          ".prose-editor": {
            color: "#111827 !important",
            outline: "none",
            minHeight: "300px",

            "& .editor-image": {
              maxWidth: "100%",
              height: "auto",
              borderRadius: "8px",
              margin: "1rem 0",
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "block",

              "&:hover": {
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                transform: "scale(1.02)",
              },
            },

            "& .editor-paragraph": {
              margin: "0.5rem 0",
              lineHeight: "1.6",
            },

            "& .ProseMirror": {
              "& > *": {
                margin: "0.5rem 0",
              },

              "& img": {
                margin: "1rem 0",
              },
            },

            "& .ProseMirror-selectednode": {
              outline: "2px solid #1976d2",
              outlineOffset: "2px",
            },
          },

          ".custom-code-block": {
            backgroundColor: "#f3f4f6",
            color: "#111827 !important",
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            margin: "0.5rem 0",
          },
        }}
      />
    </Box>
  );
};

export default TiptapEditor;
