import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

function Chatbot() {
  const theme = useTheme();
  const [messages, setMessages] = useState([
    {
      text: "Halo! Saya EduBot. Ada yang ingin kamu tanyakan?",
      sender: "bot",
    },
  ]);

  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, sender: "user" }]);
      setInputValue("");

      // coba respon bot
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            text: "Terima kasih atas pertanyaannya. Saya akan membantu Anda mencari informasi yang diperlukan.",
            sender: "bot",
          },
        ]);
      }, 1000);
    }
  };

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", mb: 3 }}>
        EduBot AI Assistant
      </Typography>

      <Card
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          p: 5,
          borderRadius: 3,
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            overflow: "auto",
            mb: 2,
            p: 3,
            backgroundColor: "background.default",
            borderRadius: 2,
            minHeight: 400,
          }}
        >
          {messages.map((msg, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                mb: 2,
              }}
            >
              <Paper
                sx={{
                  p: 2,
                  maxWidth: "70%",
                  backgroundColor:
                    msg.sender === "user"
                      ? theme.palette.primary.main
                      : theme.palette.mode === "dark"
                      ? "#435b88ff"
                      : theme.palette.common.white,
                  color:
                    msg.sender === "user"
                      ? theme.palette.primary.contrastText
                      : theme.palette.mode === "dark"
                      ? theme.palette.common.white
                      : theme.palette.text.primary,
                  borderRadius: 3,
                  boxShadow: "0px 2px 9px rgba(0,0,0,0.15)",
                }}
              >
                <Typography variant="body1">{msg.text}</Typography>
              </Paper>
            </Box>
          ))}
        </Box>

        <Box sx={{ display: "flex" }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Tulis pesan..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "50px",
                "& fieldset": {
                  borderColor:
                    theme.palette.mode === "dark"
                      ? "#061829ff"
                      : theme.palette.primary.main,
                  transition: "border-color 0.3s ease",
                },
                "&:hover fieldset": {
                  borderColor: theme.palette.primary.main,
                },
              },
            }}
          />
          <Button
            variant="contained"
            sx={{
              ml: 1,
              textTransform: "none",
              borderRadius: "50px",
              px: 3,
              "&:focus": { outline: "none" },
              "&:focusVisible": { outline: "none" },
            }}
            onClick={handleSendMessage}
          >
            Kirim
          </Button>
        </Box>
      </Card>
    </Box>
  );
}

export default Chatbot;
