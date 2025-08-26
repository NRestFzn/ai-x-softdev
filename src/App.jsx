import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Slide from '@mui/material/Slide';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  useMediaQuery,
  Card,
  CardContent,
  Grid,
  Paper,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Avatar,
  Divider,
  Chip,
  LinearProgress,
  Badge,
  ThemeProvider,
  createTheme,
  alpha,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  Switch,
  FormControlLabel
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Chat as ChatIcon,
  Quiz as QuizIcon,
  School as SchoolIcon,
  BarChart as BarChartIcon,
  Notifications as NotificationsIcon,
  AccountCircle,
  ExitToApp,
  LightMode,
  DarkMode,
  Add as AddIcon,
  TrendingUp,
  EmojiEvents,
  Schedule,
  Close
} from "@mui/icons-material";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
        primary: {
          main: '#4a6fa5',
          light: '#7895c7',
          dark: '#2c4d7a',
        },
        secondary: {
          main: '#ff7043',
          light: '#ff9e75',
          dark: '#c53f13',
        },
        background: {
          default: '#f8fafc',
          paper: '#ffffff',
        },
        text: {
          primary: '#1e293b',
          secondary: '#64748b',
        },
      }
      : {
        primary: {
          main: '#7895c7',
          light: '#a6b9dc',
          dark: '#4a6fa5',
        },
        secondary: {
          main: '#ff9e75',
          light: '#ffcfbc',
          dark: '#ff7043',
        },
        background: {
          default: '#0f172a',
          paper: '#1e293b',
        },
        text: {
          primary: '#f1f5f9',
          secondary: '#94a3b8',
        },
      }),
  },
  shape: {
    borderRadius: 12,
  },

  spacing: 8,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: '8px !important',
          paddingRight: '8px !important',
          maxWidth: '100% !important',
          '@media (min-width: 1200px)': {
            maxWidth: '100% !important',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: mode === 'light'
            ? '0px 4px 10px rgba(30,41,59,0.06)'
            : '0px 4px 10px rgba(0,0,0,0.3)',
          border: mode === 'light'
            ? '1px solid #e2e8f0'
            : '1px solid #334155',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: mode === 'light'
              ? '0px 8px 20px rgba(30,41,59,0.1)'
              : '0px 8px 20px rgba(0,0,0,0.4)',
          },
        },
      },
    },
  },
});
// fungsi buat dasboard
function Dashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [goals, setGoals] = useState([
    { id: 1, title: "Selesaikan Fisika", target: 5, current: 3 },
    { id: 2, title: "Kumpulkan 500 Poin", target: 500, current: 350 },
  ]);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAddGoal = () => {
    const newGoal = {
      id: goals.length + 1,
      title: `Target Baru ${goals.length + 1}`,
      target: 10,
      current: 0
    };
    setGoals([...goals, newGoal]);
    setShowFeedback(true);
  };

  const handleCloseFeedback = () => {
    setShowFeedback(false);
  };

  return (
    <Box sx={{ width: '100%', p: 0 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Dashboard belajaran
        </Typography>
        <Button
          color="primary"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddGoal}
          sx={{
            "&:focus": { outline: "none" },
            "&:focusVisible": { outline: "none" },
            textTransform: "none",
          }}
        >
          Tambah Target
        </Button>
      </Box>

      {/* Statistik - Grid dengan spacing lebih rapat */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <Card sx={{
            background: theme.palette.mode === 'light'
              ? 'linear-gradient(135deg, #4a6fa5 0%, #7895c7 100%)'
              : 'linear-gradient(135deg, #2c4d7a 0%, #4a6fa5 100%)',
            color: 'white',
            p: 2,
            cursor: 'pointer'
          }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>5</Typography>
              <Typography variant="body1">Kursus Diikuti</Typography>
              <TrendingUp sx={{ mt: 1, opacity: 0.8 }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Card sx={{
            background: theme.palette.mode === 'light'
              ? 'linear-gradient(135deg, #ff7043 0%, #ff9e75 100%)'
              : 'linear-gradient(135deg, #c53f13 0%, #ff7043 100%)',
            color: 'white',
            p: 2,
            cursor: 'pointer'
          }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>12</Typography>
              <Typography variant="body1">Kuis Diselesaikan</Typography>
              <EmojiEvents sx={{ mt: 1, opacity: 0.8 }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Card sx={{
            background: theme.palette.mode === 'light'
              ? 'linear-gradient(135deg, #4caf50 0%, #81c784 100%)'
              : "linear-gradient(135deg, #388e3c 0%, #4caf50 100%)",
            color: 'white',
            p: 2,
            cursor: 'pointer'
          }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>85%</Typography>
              <Typography variant="body1">Nilai Rata-rata</Typography>
              <TrendingUp sx={{ mt: 1, opacity: 0.8 }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Card sx={{
            background: theme.palette.mode === 'light'
              ? "linear-gradient(135deg, #9c27b0 0%, #ba68c8 100%)"
              : "linear-gradient(135deg, #7b1fa2 0%, #9c27b0 100%)",
            color: 'white',
            p: 2,
            cursor: 'pointer'
          }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>350</Typography>
              <Typography variant="body1">Poin Pembelajaran</Typography>
              <EmojiEvents sx={{ mt: 1, opacity: 0.8 }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Progress dan Aktivitas - Grid dengan layout lebih lebar */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Progress Pembelajaran
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Matematika Dasar</Typography>
                <Typography variant="body2">75%</Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={75}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: alpha(theme.palette.primary.main, 0.2),
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    backgroundColor: theme.palette.primary.main
                  }
                }}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Kimia</Typography>
                <Typography variant="body2">45%</Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={45}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: alpha(theme.palette.secondary.main, 0.2),
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    backgroundColor: theme.palette.secondary.main
                  }
                }}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Bahasa Inggris</Typography>
                <Typography variant="body2">90%</Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={90}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: alpha('#4caf50', 0.2),
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    backgroundColor: '#4caf50'
                  }
                }}
              />
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mt: 3 }}>
              Target Pembelajaran
            </Typography>

            {goals.map((goal) => (
              <Box key={goal.id} sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">{goal.title}</Typography>
                  <Typography variant="body2">{Math.round((goal.current / goal.target) * 100)}%</Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(goal.current / goal.target) * 100}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: alpha('#9c27b0', 0.2),
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 4,
                      backgroundColor: '#9c27b0'
                    }
                  }}
                />
              </Box>
            ))}
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Aktivitas Terbaru
            </Typography>

            <Box sx={{
              maxHeight: 400,
              overflow: 'auto',
              '& > div': { mb: 2 }
            }}>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                    Matematika
                  </Typography>
                  <Chip label="Hari ini" size="small" color="primary" />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Menyelesaikan kuis Aljabar - Nilai: 90%
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                  <Schedule sx={{ fontSize: 14, mr: 0.5 }} />
                  <Typography variant="caption">2 jam yang lalu</Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 1 }} />

              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                    Pemrograman
                  </Typography>
                  <Chip label="Kemarin" size="small" />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Memulai kursus React.js
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                  <Schedule sx={{ fontSize: 14, mr: 0.5 }} />
                  <Typography variant="caption">1 hari yang lalu</Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 1 }} />

              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                    Sejarah
                  </Typography>
                  <Chip label="2 hari lalu" size="small" />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Berkonsultasi dengan chatbot tentang materi sejarah
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                  <Schedule sx={{ fontSize: 14, mr: 0.5 }} />
                  <Typography variant="caption">2 hari yang lalu</Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 1 }} />

              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                    Fisika
                  </Typography>
                  <Chip label="3 hari lalu" size="small" />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Menyelesaikan modul Hukum Newton
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                  <Schedule sx={{ fontSize: 14, mr: 0.5 }} />
                  <Typography variant="caption">3 hari yang lalu</Typography>
                </Box>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={showFeedback}
        autoHideDuration={3000}
        onClose={handleCloseFeedback}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseFeedback} severity="success" sx={{ width: '100%' }}>
          Target baru berhasil ditambahkan!
        </Alert>
      </Snackbar>
    </Box>
  );
}

// komponen sidebar
function NavigationDrawer({ open, onClose, darkMode, setDarkMode, drawerOpen, setDrawerOpen }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const menuItems = [
    {
      id: 'home', label: <span style={{ color: darkMode ? "#fff" : "#7895c7" }}>
        Beranda
      </span>,
      icon: <HomeIcon />, path: '/'
    },
    {
      id: 'chatbot', label: <span style={{ color: darkMode ? "#fff" : "#7895c7" }}>
        Chatbot AI
      </span>,
      icon: <ChatIcon />, path: '/chatbot'
    },
  ];

  const drawerContent = (
    <Slide direction="right" in={open || drawerOpen} mountOnEnter unmountOnExit timeout={300}>
      <Box sx={{ width: 280, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>E</Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>EduLearn</Typography>
              <Typography variant="body2" color="text.secondary">Dashboard Siswa</Typography>
            </Box>
          </Box>
          {isMobile && (
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          )}
        </Box>

        <Divider sx={{ mr: -2.4 }} />

        <List sx={{ flexGrow: 1, pt: 2 }}>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.id}
              component={Link}
              to={item.path}
              onClick={isMobile ? onClose : undefined}
              sx={{
                borderRadius: 2,
                mx: 1,
                mb: 0.5,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.07),
                },
                '&:focus': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.15),
                }
              }}
            >
              <ListItemIcon sx={{ color: 'primary.main' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ mr: -2.4 }} />

        <Box sx={{ p: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                color="primary"
              />
            }
            label={darkMode ? "Mode Gelap" : "Mode Terang"}
            sx={{ mb: 2 }}
          />

          <FormControlLabel
            control={
              <Switch
                checked={notificationsEnabled}
                onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                color="primary"
              />
            }
            label="Notifikasi"
          />

          <ListItem button sx={{ borderRadius: 2, mt: 1 }}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Keluar" />
          </ListItem>
        </Box>
      </Box>
    </Slide>
  );

  if (!drawerOpen && !isMobile) return null;

  return (
    <>
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={open}
          onClose={onClose}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 280,
              transition: 'transform 0.3s ease-in-out', // Smooth transition
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="persistent"
          open={drawerOpen}
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 300,
              position: 'relative',
              height: '100vh',
              transition: 'transform 0.3s ease-in-out', // Smooth transition
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
}




// komponen Chatbot 
function Chatbot() {
  const theme = useTheme();
  const [messages, setMessages] = useState([
    { text: "Halo! Saya EduBot. Ada yang ingin kamu tanyakan?", sender: "bot" }
  ]);

  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, sender: "user" }]);
      setInputValue("");

      // coba respon bot
      setTimeout(() => {
        setMessages(prev => [...prev, {
          text: "Terima kasih atas pertanyaannya. Saya akan membantu Anda mencari informasi yang diperlukan.",
          sender: "bot"
        }]);
      }, 1000);
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        EduBot AI Assistant
      </Typography>

      <Card sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 5, borderRadius: 3 }}>
        <Box sx={{
          flexGrow: 1,
          overflow: 'auto',
          mb: 2,
          p: 3,
          backgroundColor: 'background.default',
          borderRadius: 2,
          minHeight: 400
        }}>
          {messages.map((msg, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                mb: 2
              }}
            >
              <Paper
                sx={{
                  p: 2,
                  maxWidth: '70%',
                  backgroundColor: msg.sender === 'user'
                    ? theme.palette.primary.main
                    : theme.palette.mode === 'dark'
                      ? "#435b88ff"
                      : theme.palette.common.white,
                  color: msg.sender === 'user'
                    ? theme.palette.primary.contrastText
                    : theme.palette.mode === 'dark'
                      ? theme.palette.common.white
                      : theme.palette.text.primary,
                  borderRadius: 3,
                  boxShadow: "0px 2px 9px rgba(0,0,0,0.15)"
                }}
              >
                <Typography variant="body1">{msg.text}</Typography>
              </Paper>
            </Box>
          ))}
        </Box>

        <Box sx={{ display: 'flex' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Tulis pesan..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "50px",
                "& fieldset": {
                  borderColor: theme.palette.mode === "dark" ? "#061829ff" : theme.palette.primary.main, 
                  transition: "border-color 0.3s ease", 
                },
                "&:hover fieldset": {
                  borderColor: theme.palette.primary.main,
                }
              }
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

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const muiTheme = createTheme(getDesignTokens(darkMode ? 'dark' : 'light'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNotificationClick = () => {
    setNotificationOpen(true);
    setTimeout(() => {
      setNotificationOpen(false);
    }, 2000);
  };

  useEffect(() => {
    if (isMobile) {
      setDrawerOpen(false);
    } else {
      setDrawerOpen(true);
    }
  }, [isMobile]);

  return (
    <ThemeProvider theme={muiTheme}>
      <Box sx={{
        display: 'flex',
        bgcolor: 'background.default',
        minHeight: '100vh',
        color: 'text.primary',
        width: '100vw',
        maxWidth: '100%',
        overflowX: 'hidden'
      }}>
        <Router>
          {/* Navbar yang menyesuaikan lebar */}
          <AppBar
            position="fixed"
            elevation={0}
            sx={{
              width: drawerOpen ? { md: `calc(100% - 280px)` } : '100%',
              ml: drawerOpen ? { md: `280px` } : 0,
              bgcolor: 'background.paper',
              color: 'text.primary',
              borderBottom: '1px solid',
              borderColor: 'divider',
              transition: 'all 0.3s ease-in-out',
              left: 0,
              right: 0
            }}
          >
            <Toolbar>
              <IconButton
                disableRipple
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={() => setDrawerOpen(!drawerOpen)}
                sx={{
                  mr: 2,
                  display: { md: 'block' },
                  left: 10,
                  borderRadius: 1,
                  border: "none",
                  outline: "none",
                  "&:focus": { outline: "none" },
                  "&:focusVisible": { outline: "none" },
                  "&:hover": { backgroundColor: "transparent" }
                }}
              >
                {drawerOpen ? <Close /> : <MenuIcon />}
              </IconButton>


              <Typography
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 1,
                  fontWeight: 'bold',
                }}
              >
                Education
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                  color="inherit"
                  sx={{
                    mr: 1,
                    border: "none",
                    outline: "none",
                    "&:focus": { outline: "none" },
                    "&:focusVisible": { outline: "none" },
                    "&:hover": { backgroundColor: "transparent" }
                  }}
                  onClick={handleNotificationClick}
                >

                  <Badge badgeContent={3} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>

                <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: 'primary.main',
                      mr: 1,
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'scale(1.1)'
                      }
                    }}
                  >
                    S
                  </Avatar>
                  <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
                    Student
                  </Typography>
                </Box>
              </Box>
            </Toolbar>
          </AppBar>

          {/* Sidebar/Navigasi */}
          <NavigationDrawer
            open={mobileOpen}
            onClose={handleDrawerToggle}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            drawerOpen={drawerOpen}
            setDrawerOpen={setDrawerOpen}
          />

          {/* Konten utama yang menyesuaikan lebar */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: drawerOpen ? { md: `calc(100% - 280px)` } : '100%',
              ml: drawerOpen ? { md: `0px` } : 0,
              mt: '64px',
              transition: 'all 0.3s ease-in-out',
              maxWidth: '100%',
              overflow: 'hidden'
            }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/chatbot" element={<Chatbot />} />
            </Routes>
          </Box>

          <Fab
            color="primary"
            sx={{
              position: 'fixed',
              bottom: 16,
              right: 16,
              "&:focus": { outline: "none" },
              "&:focusVisible": { outline: "none" }
            }}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <LightMode /> : <DarkMode />}
          </Fab>

          <Snackbar
            open={notificationOpen}
            message="Notifikasi diklik!"
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          />
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;