import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  IconButton,
  TextField,
  Paper,
  Typography,
  Stack,
  Fade,
  Avatar,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";

// Import material-ui icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Halo 👋, saya EduBot. Ada yang ingin kamu tanyakan?" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll to the bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim() || isTyping) return;

    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate a bot response with typing indicator
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: `Terima kasih sudah bertanya, kamu menanyakan: "${userMsg.text}" 👍. Saat ini saya masih dalam pengembangan.`,
        },
      ]);
      setIsTyping(false);
    }, 1500); // 1.5 second delay
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Paper
      elevation={6}
      sx={{
        width: { xs: "95%", sm: 400 },
        height: 500,
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "primary.contrastText",
          p: 2,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <SmartToyIcon />
        <Typography variant="h6" component="div">
          EduBot
        </Typography>
      </Box>

      {/* Chat Area */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
          bgcolor: "#f2f7fa",
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        {messages.map((msg, i) => (
          <Fade in={true} key={i}>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: msg.from === "user" ? "flex-end" : "flex-start",
                gap: 1,
              }}
            >
              {msg.from === "bot" && (
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  <SmartToyIcon />
                </Avatar>
              )}
              <Paper
                sx={{
                  maxWidth: "80%",
                  p: 1.5,
                  borderRadius: msg.from === "user" ? "15px 15px 4px 15px" : "15px 15px 15px 4px",
                  bgcolor: msg.from === "user" ? "primary.light" : "grey.200",
                  color: msg.from === "user" ? "white" : "black",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography variant="body2">{msg.text}</Typography>
              </Paper>
              {msg.from === "user" && (
                <Avatar sx={{ bgcolor: "secondary.main" }}>
                  <AccountCircleIcon />
                </Avatar>
              )}
            </Box>
          </Fade>
        ))}

        {/* Typing indicator */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 1,
            opacity: isTyping ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        >
          <Avatar sx={{ bgcolor: "primary.main" }}>
            <SmartToyIcon />
          </Avatar>
          <Paper sx={{ p: 1.5, borderRadius: "15px 15px 15px 4px", bgcolor: "grey.200" }}>
            <CircularProgress size={16} />
          </Paper>
        </Box>

        <div ref={messagesEndRef} />
      </Box>

      {/* Input Area */}
      <Box sx={{ p: 2, borderTop: "1px solid", borderColor: "divider" }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <TextField
            size="small"
            fullWidth
            multiline
            maxRows={4}
            placeholder="Tulis pesan..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            sx={{ flex: 1 }}
          />
          <IconButton
            color="primary"
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </Box>
    </Paper>
  );
}