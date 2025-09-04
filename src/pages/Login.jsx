import React from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        backgroundColor: "#f8f9fa", // background netral terang
      }}
    >
      {/* Left Section */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          p: { xs: 3, md: 5 },
        }}
      >
        <Box sx={{ textAlign: { xs: "center", md: "left" }, maxWidth: 500 }}>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
            Selamat Datang
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.6, color: "text.secondary" }}>
            Belajar lebih menyenangkan dengan <b>EDULEARN</b>. Tingkatkan
            keterampilanmu dengan dukungan AI.
          </Typography>
        </Box>
      </Box>

      {/* Right Section */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 3, md: 5 },
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Paper
            elevation={6}
            sx={{
              borderRadius: 4,
              p: { xs: 3, md: 4 },
              width: "100%",
              maxWidth: 380,
              textAlign: "center",
              backgroundColor: "white",
            }}
          >
            <Box sx={{ mb: 3 }}>
              <Box
                component="img"
                src="https://cdn-icons-png.flaticon.com/512/906/906175.png"
                alt="logo"
                sx={{ width: 60, mb: 2 }}
              />
              <Typography variant="h5" fontWeight="bold" color="text.primary">
                EDULEARN
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Platform Pembelajaran Interaktif
              </Typography>
            </Box>

            {/* Form */}
            <Box component="form">
              <TextField
                fullWidth
                margin="normal"
                label="Nama Lengkap"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Alamat Email"
                variant="outlined"
                type="email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  mt: 3,
                  borderRadius: 3,
                  py: 1.2,
                  fontSize: "1rem",
                  fontWeight: "bold",
                  backgroundColor: "#1976d2", // biru modern
                  "&:hover": {
                    backgroundColor: "#1565c0",
                  },
                }}
              >
                MASUK
              </Button>

              <Divider sx={{ my: 3 }}>atau</Divider>

              <Button
                fullWidth
                variant="outlined"
                startIcon={<GoogleIcon />}
                sx={{
                  borderRadius: 3,
                  textTransform: "none",
                  py: 1.2,
                  fontSize: "1rem",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                Masuk dengan Google
              </Button>
            </Box>
          </Paper>
        </motion.div>
      </Box>
    </Box>
  );
}
