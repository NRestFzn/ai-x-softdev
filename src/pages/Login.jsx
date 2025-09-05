/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
    Box,
    Button,
    Divider,
    IconButton,
    InputAdornment,
    Paper,
    TextField,
    Typography,
    Fab,
    Link
} from "@mui/material";
import { Visibility, VisibilityOff, DarkMode, LightMode } from "@mui/icons-material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import { motion } from "framer-motion";

export default function Login({ darkMode, setDarkMode, onLoginSuccess }) {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch("http://localhost:8000/v1/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();

            if (response.ok) {
                console.log("Login berhasil!", result.data);
                onLoginSuccess(result.data.accessToken);
            } else {
                console.error("Login gagal:", result.message);
                alert(result.message);
            }
        } catch (error) {
            console.error("Terjadi kesalahan:", error);
            alert("Terjadi kesalahan, coba lagi.");
        }
    };

    const formVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const formItemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.4,
                ease: "easeOut",
            },
        },
    };

    return (
        <Box
            sx={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                bgcolor: "background.default",
            }}
        >
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
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        color="text.primary"
                        sx={{ mb: 2 }}
                    >
                        Selamat Datang Kembali
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{ lineHeight: 1.6, color: "text.secondary" }}
                    >
                        Belajar lebih menyenangkan dengan <b>EDULEARN</b>. Tingkatkan
                        keterampilanmu dengan dukungan AI.
                    </Typography>
                </Box>
            </Box>

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
                            bgcolor: "background.paper",
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

                        <motion.div
                            variants={formVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <Box component="form" onSubmit={handleLogin}>
                                <motion.div variants={formItemVariants}>
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="Email"
                                        variant="outlined"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <EmailOutlinedIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: 3,
                                            },
                                        }}
                                    />
                                </motion.div>
                                <motion.div variants={formItemVariants}>
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="Password"
                                        variant="outlined"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockOutlinedIcon />
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={() => setShowPassword(!showPassword)} sx={{
                                                        "&:focus": { outline: "none" },
                                                        "&:focusVisible": { outline: "none" },
                                                    }}>
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: 3,
                                            },
                                        }}
                                    />
                                </motion.div>
                                <motion.div
                                    variants={formItemVariants}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        type="submit"
                                        size="large"
                                        sx={{
                                            mt: 3,
                                            borderRadius: 3,
                                            py: 1.2,
                                            fontSize: "1rem",
                                            fontWeight: "bold",
                                            color: "white",
                                            background: "linear-gradient(to right, #5B7EA4, #345B82)",
                                            "&:hover": {
                                                background: "linear-gradient(to right, #5B7EA4, #345B82)",
                                                filter: "brightness(0.9)",
                                            },
                                            "&:focus": { outline: "none" },
                                            "&:focusVisible": { outline: "none" },
                                        }}
                                    >
                                        Masuk
                                    </Button>
                                </motion.div>
                                <Divider sx={{ my: 3 }}>atau</Divider>
                                <motion.div
                                    variants={formItemVariants}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        startIcon={<GoogleIcon />}
                                        sx={{
                                            borderRadius: 3,
                                            textTransform: "none",
                                            py: 1.2,
                                            fontSize: "1rem",
                                            color: (theme) => theme.palette.primary.main,
                                            borderColor: (theme) => theme.palette.primary.main,
                                            "&:hover": {
                                                borderColor: (theme) => theme.palette.primary.dark,
                                                backgroundColor: (theme) =>
                                                    theme.palette.mode === "dark"
                                                        ? "rgba(107,124,255,0.1)"
                                                        : "rgba(63,81,181,0.1)",
                                                "&:focus": { outline: "none" },
                                                "&:focusVisible": { outline: "none" },
                                            },
                                        }}
                                    >
                                        Masuk dengan Google
                                    </Button>
                                </motion.div>
                                <Typography sx={{ marginTop: 4 }}>
                                    Belum punya akun?{" "}
                                    <Link
                                        component={RouterLink}
                                        to="/register"
                                        underline="hover"
                                        sx={{
                                            fontWeight: "bold",
                                            background: "linear-gradient(to right, #5B7EA4, #345B82)",
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                            transition: "filter 0.2s ease-in-out",
                                            "&:hover": {
                                                filter: "brightness(0.8)",
                                            },
                                        }}
                                    >
                                        Daftar
                                    </Link>
                                </Typography>
                            </Box>
                        </motion.div>
                    </Paper>
                </motion.div>
            </Box>
            <Fab
                color="primary"
                sx={{
                    position: "fixed",
                    bottom: 16,
                    right: 16,
                    transition: "all 0.3s ease-in-out",
                    zIndex: 1400,
                    "&:focus": { outline: "none" },
                    "&:focusVisible": { outline: "none" },
                }}
                onClick={() => setDarkMode(!darkMode)}
            >
                {darkMode ? <LightMode /> : <DarkMode />}
            </Fab>
        </Box>
    );
}