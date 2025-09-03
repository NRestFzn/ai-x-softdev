import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Divider,
  Chip,
  Snackbar,
  Alert,
  alpha,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  Add as AddIcon,
  TrendingUp,
  EmojiEvents,
  Schedule,
} from "@mui/icons-material";

function Dashboard() {
  const theme = useTheme();
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
      current: 0,
    };
    setGoals([...goals, newGoal]);
    setShowFeedback(true);
  };

  const handleCloseFeedback = () => {
    setShowFeedback(false);
  };

  return (
    <Box sx={{ width: "100%", p: 0 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
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
          <Card
            sx={{
              background:
                theme.palette.mode === "light"
                  ? "linear-gradient(135deg, #4a6fa5 0%, #7895c7 100%)"
                  : "linear-gradient(135deg, #2c4d7a 0%, #4a6fa5 100%)",
              color: "white",
              p: 2,
              cursor: "pointer",
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
                5
              </Typography>
              <Typography variant="body1">Kursus Diikuti</Typography>
              <TrendingUp sx={{ mt: 1, opacity: 0.8 }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Card
            sx={{
              background:
                theme.palette.mode === "light"
                  ? "linear-gradient(135deg, #ff7043 0%, #ff9e75 100%)"
                  : "linear-gradient(135deg, #c53f13 0%, #ff7043 100%)",
              color: "white",
              p: 2,
              cursor: "pointer",
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
                12
              </Typography>
              <Typography variant="body1">Kuis Diselesaikan</Typography>
              <EmojiEvents sx={{ mt: 1, opacity: 0.8 }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Card
            sx={{
              background:
                theme.palette.mode === "light"
                  ? "linear-gradient(135deg, #4caf50 0%, #81c784 100%)"
                  : "linear-gradient(135deg, #388e3c 0%, #4caf50 100%)",
              color: "white",
              p: 2,
              cursor: "pointer",
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
                85%
              </Typography>
              <Typography variant="body1">Nilai Rata-rata</Typography>
              <TrendingUp sx={{ mt: 1, opacity: 0.8 }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Card
            sx={{
              background:
                theme.palette.mode === "light"
                  ? "linear-gradient(135deg, #9c27b0 0%, #ba68c8 100%)"
                  : "linear-gradient(135deg, #7b1fa2 0%, #9c27b0 100%)",
              color: "white",
              p: 2,
              cursor: "pointer",
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
                350
              </Typography>
              <Typography variant="body1">Poin Pembelajaran</Typography>
              <EmojiEvents sx={{ mt: 1, opacity: 0.8 }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Progress dan Aktivitas - Grid dengan layout lebih lebar */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Card sx={{ p: 3, height: "100%" }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Progress Pembelajaran
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1,
                }}
              >
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
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 4,
                    backgroundColor: theme.palette.primary.main,
                  },
                }}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1,
                }}
              >
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
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 4,
                    backgroundColor: theme.palette.secondary.main,
                  },
                }}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1,
                }}
              >
                <Typography variant="body2">Bahasa Inggris</Typography>
                <Typography variant="body2">90%</Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={90}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: alpha("#4caf50", 0.2),
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 4,
                    backgroundColor: "#4caf50",
                  },
                }}
              />
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bold", mt: 3 }}
            >
              Target Pembelajaran
            </Typography>

            {goals.map((goal) => (
              <Box key={goal.id} sx={{ mb: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2">{goal.title}</Typography>
                  <Typography variant="body2">
                    {Math.round((goal.current / goal.target) * 100)}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(goal.current / goal.target) * 100}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: alpha("#9c27b0", 0.2),
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 4,
                      backgroundColor: "#9c27b0",
                    },
                  }}
                />
              </Box>
            ))}
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card sx={{ p: 3, height: "100%" }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Aktivitas Terbaru
            </Typography>

            <Box
              sx={{
                maxHeight: 400,
                overflow: "auto",
                "& > div": { mb: 2 },
              }}
            >
              <Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                    Matematika
                  </Typography>
                  <Chip label="Hari ini" size="small" color="primary" />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Menyelesaikan kuis Aljabar - Nilai: 90%
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                  <Schedule sx={{ fontSize: 14, mr: 0.5 }} />
                  <Typography variant="caption">2 jam yang lalu</Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 1 }} />

              <Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                    Pemrograman
                  </Typography>
                  <Chip label="Kemarin" size="small" />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Memulai kursus React.js
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                  <Schedule sx={{ fontSize: 14, mr: 0.5 }} />
                  <Typography variant="caption">1 hari yang lalu</Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 1 }} />

              <Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                    Sejarah
                  </Typography>
                  <Chip label="2 hari lalu" size="small" />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Berkonsultasi dengan chatbot tentang materi sejarah
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                  <Schedule sx={{ fontSize: 14, mr: 0.5 }} />
                  <Typography variant="caption">2 hari yang lalu</Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 1 }} />

              <Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                    Fisika
                  </Typography>
                  <Chip label="3 hari lalu" size="small" />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Menyelesaikan modul Hukum Newton
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
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
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseFeedback}
          severity="success"
          sx={{ width: "100%" }}
        >
          Target baru berhasil ditambahkan!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Dashboard;
