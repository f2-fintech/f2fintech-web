// src/components/editor/TiptapEditor.jsx
import React from "react";
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
  FaQuoteLeft,
  FaLink,
  FaImage,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaCode,
  FaUndo,
  FaRedo,
} from "react-icons/fa";

import { Box, IconButton, Paper, GlobalStyles } from "@mui/material";

const MenuButton = ({ onClick, isActive, children }) => (
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
  >
    {children}
  </IconButton>
);

const TiptapEditor = ({ content, setContent, editorOptions = {} }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: {
          HTMLAttributes: { class: "custom-code-block" },
        },
      }),
      Image,
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
    ...editorOptions,
  });

  if (!editor) return null;

  const addImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (event) => {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        editor.chain().focus().setImage({ src: reader.result }).run();
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  const addLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <Box sx={{ maxWidth: 960, mx: "auto", color: "white" }}>
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
          {/* Text Styles */}
          <MenuButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
          >
            <FaBold />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
          >
            <FaItalic />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive("underline")}
          >
            <FaUnderline />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive("strike")}
          >
            <FaStrikethrough />
          </MenuButton>

          <Box
            sx={{ width: 1, height: 16, borderRight: "1px solid gray", mx: 1 }}
          />

          {/* Lists */}
          <MenuButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive("bulletList")}
          >
            <FaListUl />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive("orderedList")}
          >
            <FaListOl />
          </MenuButton>

          {/* Undo/Redo */}
          <MenuButton onClick={() => editor.chain().focus().undo().run()}>
            <FaUndo />
          </MenuButton>
          <MenuButton onClick={() => editor.chain().focus().redo().run()}>
            <FaRedo />
          </MenuButton>

          {/* Alignments */}
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            isActive={editor.isActive({ textAlign: "left" })}
          >
            <FaAlignLeft />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            isActive={editor.isActive({ textAlign: "center" })}
          >
            <FaAlignCenter />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            isActive={editor.isActive({ textAlign: "right" })}
          >
            <FaAlignRight />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            isActive={editor.isActive({ textAlign: "justify" })}
          >
            <FaAlignJustify />
          </MenuButton>

          {/* Insert */}
          <MenuButton onClick={addLink}>
            <FaLink />
          </MenuButton>
          <MenuButton onClick={addImage}>
            <FaImage />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            isActive={editor.isActive("codeBlock")}
          >
            <FaCode />
          </MenuButton>
        </Paper>
      </BubbleMenu>

      <Paper
        sx={{
          mt: 2,
          p: 2,
          minHeight: 300,
          backgroundColor: "#1f1b2e",
          borderRadius: 2,
        }}
      >
        <EditorContent editor={editor} />
      </Paper>

      {/* MUI GlobalStyles instead of style jsx */}
      <GlobalStyles
        styles={{
          ".ProseMirror": {
            color: "white",
            outline: "none",
          },
          ".custom-code-block": {
            backgroundColor: "#000",
            color: "white",
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
