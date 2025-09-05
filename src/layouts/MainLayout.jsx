import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Avatar,
  Divider,
  Switch,
  FormControlLabel,
  Slide,
  Fab
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  Menu as MenuIcon,
  Chat as ChatIcon,
  History as HistoryIcon,
  ExitToApp,
  LightMode,
  DarkMode,
  Close,
} from "@mui/icons-material";
import ProfileMenu from "../components/ProfileMenu";

function NavigationDrawer({ open, onClose, darkMode, setDarkMode, drawerOpen }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const chatHistory = [
    { id: 1, title: "Percakapan 1" },
    { id: 2, title: "Percakapan 2" },
    { id: 3, title: "Percakapan 3" },
  ];

  const drawerContent = (
    <Box
      sx={{
        width: 280,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>E</Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              EduLearn
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Riwayat Chat
            </Typography>
          </Box>
        </Box>
        {isMobile && (
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        )}
      </Box>

      <Divider />

      <List sx={{ 
        flexGrow: 1, 
        pt: 2, 
        overflow: "auto",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        "-ms-overflow-style": "none",
        "scrollbar-width": "none",
      }}>
        <ListItem>
          <ListItemText
            primary="Riwayat Percakapan"
            primaryTypographyProps={{
              fontWeight: "bold",
              color: "text.secondary",
            }}
          />
        </ListItem>
        {chatHistory.map((chat) => (
          <ListItem key={chat.id} disablePadding>
            <ListItemButton
              sx={{
                borderRadius: 2,
                mx: 1,
                mb: 0.5,
              }}
            >
              <ListItemIcon>
                <ChatIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={chat.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

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
      </Box>
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={open}
          onClose={onClose}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 280,
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
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 280,
              position: "fixed",
              height: "100vh",
              top: 0,
              left: 0,
              zIndex: 1200,
              overflowX: "hidden",
              transition: "transform 0.3s ease-in-out",
              transform: drawerOpen ? "translateX(0)" : "translateX(-100%)",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              "-ms-overflow-style": "none",
              "scrollbar-width": "none",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
}

export default function MainLayout({darkMode, setDarkMode, onLogout}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    if (isMobile) {
      setDrawerOpen(false);
    } else {
      setDrawerOpen(true);
      setMobileOpen(false);
    }
  }, [isMobile]);

  const getPageTitle = () => {
    if (location.pathname === "/dashboard") return "Dashboard";
    if (location.pathname === "/settings") return "Settings";
    return "EduBot AI Assistant"; 
  };

  const handleMenuClick = () => {
    if (isMobile) {
      handleDrawerToggle();
    } else {
      setDrawerOpen(!drawerOpen);
    }
  };

  return (
      <Box
        sx={{
          display: "flex",
          bgcolor: "background.default",
          minHeight: "100vh",
          color: "text.primary",
          width: "100vw",
          maxWidth: "100%",
          overflowX: "hidden",
          position: "relative",
        }}
      >
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            width: !isMobile && drawerOpen ? `calc(100% - 280px)` : "100%",
            ml: !isMobile && drawerOpen ? `280px` : 0,
            bgcolor: "background.paper",
            color: "text.primary",
            borderBottom: "1px solid",
            borderColor: "divider",
            transition: "all 0.3s ease-in-out",
            zIndex: 1300,
          }}
        >
          <Toolbar>
            <IconButton
              disableRipple
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleMenuClick}
              sx={{
                mr: 2,
                borderRadius: 1,
                border: "none",
                outline: "none",
                "&:focus": { outline: "none" },
                "&:focusVisible": { outline: "none" },
                "&:hover": { backgroundColor: "action.hover" },
              }}
            >
              {!isMobile && drawerOpen ? <Close /> : <MenuIcon />}
            </IconButton>

            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                fontWeight: "bold",
              }}
            >
              {getPageTitle()}
            </Typography>

            <ProfileMenu onLogout={onLogout} />
          </Toolbar>
        </AppBar>

        <NavigationDrawer
          open={mobileOpen}
          onClose={handleDrawerToggle}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          drawerOpen={drawerOpen}
        />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: !isMobile && drawerOpen ? `calc(100% - 280px)` : "100%",
            ml: !isMobile && drawerOpen ? `280px` : 0,
            mt: "64px",
            transition: "all 0.3s ease-in-out",
            maxWidth: !isMobile && drawerOpen ? `calc(100% - 280px)` : "100%",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Outlet />
        </Box>

        <Fab
          color="primary"
          sx={{
            position: "fixed",
            bottom: 16,
            right: !isMobile && drawerOpen ? `calc(16px + 0px)` : 16,
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