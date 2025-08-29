import React, {useState, useEffect, useRef} from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  Paper,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import axios from 'axios';

function Chatbot() {
  const theme = useTheme();
  const [messages, setMessages] = useState([
    {text: 'Halo! Saya EduBot. Ada yang ingin kamu tanyakan?', sender: 'bot'},
  ]);

  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      setMessages([...messages, {text: inputValue, sender: 'user'}]);
      const userMessage = inputValue;
      setInputValue('');

      try {
        const {data: axiosResponse} = await axios.post(
          `${import.meta.env.VITE_API_URL}/v1/chatbot/public-ask`,
          {
            question: userMessage,
          }
        );

        const textMessage =
          axiosResponse.data.candidates[0].content.parts[0].text;

        setMessages((prev) => [...prev, {text: textMessage, sender: 'bot'}]);
      } catch (error) {
        console.error(error);
        setSnackbarMessage(error.message);
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        setMessages((prev) => [
          ...prev,
          {text: 'Terjadi kesalahan saat menghubungi server.', sender: 'bot'},
        ]);
      }
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
      <Typography variant="h4" gutterBottom sx={{fontWeight: 'bold', mb: 3}}>
        EduBot AI Assistant
      </Typography>

      <Card
        sx={{
          border: 'none',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          p: 5,
          borderRadius: 3,
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            overflow: 'auto',
            mb: 2,
            p: 3,
            backgroundColor: 'background.default',
            borderRadius: 2,
            height: 'calc(100vh - 300px)',
            maxHeight: '560px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent:
                    msg.sender === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <Paper
                  sx={{
                    p: 2,
                    maxWidth: '70%',
                    backgroundColor:
                      msg.sender === 'user'
                        ? theme.palette.primary.main
                        : theme.palette.mode === 'dark'
                        ? '#435b88ff'
                        : theme.palette.common.white,
                    color:
                      msg.sender === 'user'
                        ? theme.palette.primary.contrastText
                        : theme.palette.mode === 'dark'
                        ? theme.palette.common.white
                        : theme.palette.text.primary,
                    borderRadius: 3,
                    boxShadow: '0px 2px 9px rgba(0,0,0,0.15)',
                  }}
                >
                  <Typography variant="body1">{msg.text}</Typography>
                </Paper>
              </Box>
            ))}
            <div ref={messagesEndRef} />
          </Box>
        </Box>

        <Box sx={{display: 'flex'}}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Tulis pesan..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '50px',
                '& fieldset': {
                  borderColor:
                    theme.palette.mode === 'dark'
                      ? '#061829ff'
                      : theme.palette.primary.main,
                  transition: 'border-color 0.3s ease',
                },
                '&:hover fieldset': {
                  borderColor: theme.palette.primary.main,
                },
              },
            }}
          />
          <Button
            variant="contained"
            sx={{
              ml: 1,
              textTransform: 'none',
              borderRadius: '50px',
              px: 3,
              '&:focus': {outline: 'none'},
              '&:focusVisible': {outline: 'none'},
            }}
            onClick={handleSendMessage}
          >
            Kirim
          </Button>
        </Box>
      </Card>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{width: '100%'}}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Chatbot;
