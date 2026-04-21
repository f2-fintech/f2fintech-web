import { useState, useRef, useEffect } from "react";
import {
  Box,
  IconButton,
  TextField,
  Button,
  Paper,
  Typography,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const ChatbotWidget = () => {
  console.log("API_BASE_URL", API_BASE_URL);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi! I'm your finance assistant. Ask me anything about loans, CIBIL, or eligibility.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/chat`,
        { message: input },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const fullReply = res?.data?.reply
        ?.replace(/<think>[\s\S]*?<\/think>/gi, "")
        .trim();

      // Start typing effect
      let currentText = "";
      const typingInterval = 30; // milliseconds per character

      const botMessage = { from: "bot", text: "" };
      setMessages((prev) => [...prev, botMessage]);

      let charIndex = 0;

      const typeChar = () => {
        if (charIndex < fullReply.length) {
          currentText += fullReply[charIndex++];
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = { ...botMessage, text: currentText };
            return updated;
          });
          setTimeout(typeChar, typingInterval);
        } else {
          setIsLoading(false); s
        }
      };

      typeChar();
    } catch (err) {
      console.error("Chatbot error:", err.response?.data || err.message);
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
      setIsLoading(false);
    }
  };

  console.log("messages", messages);

  return (
    <Tooltip title="Your financial Assistant" arrow>
      <Box
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1300,
        }}
      >
        {!isOpen ? (
          <IconButton
            color="primary"
            size="large"
            sx={{
              backgroundColor: "#007bff",
              color: "white",
              boxShadow: 4,
              "&:hover": { backgroundColor: "#005ecb" },
              width: 56,
              height: 56,
            }}
            onClick={() => setIsOpen(true)}
          >
            <ChatIcon />
          </IconButton>
        ) : (
          <Paper
            elevation={6}
            sx={{
              width: 320,
              height: 420,
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                p: 1.5,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#1976d2",
                color: "white",
              }}
            >
              <Typography variant="subtitle1">Finance Assistant</Typography>
              <IconButton
                onClick={() => setIsOpen(false)}
                size="small"
                sx={{ color: "white" }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>

            <Box
              sx={{
                flex: 1,
                p: 2,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
                bgcolor: "#f7f7f7",
              }}
            >
              {messages.map((msg, idx) => (
                <Box
                  key={idx}
                  sx={{
                    alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
                    bgcolor: msg.from === "user" ? "#e3f2fd" : "white",
                    color: msg.from === "user" ? "#0d47a1" : "#333",
                    px: 2,
                    py: 1.5,
                    borderRadius: 2,
                    maxWidth: "85%",
                    boxShadow: 1,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  <Typography variant="body2">{msg.text}</Typography>
                </Box>
              ))}
              <div ref={messagesEndRef} />

              {isLoading && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
                  <CircularProgress size={24} />
                </Box>
              )}
            </Box>

            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              sx={{
                display: "flex",
                borderTop: "1px solid #e0e0e0",
                p: 1.5,
                bgcolor: "white",
              }}
            >
              <TextField
                variant="outlined"
                size="small"
                placeholder="Ask something..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                fullWidth
                sx={{ mr: 1 }}
                disabled={isLoading}
              />
              <Button
                variant="contained"
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                endIcon={<SendIcon />}
              >
                Send
              </Button>
            </Box>
          </Paper>
        )}
      </Box>
    </Tooltip>
  );
};

export default ChatbotWidget;
