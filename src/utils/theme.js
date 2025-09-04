export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: "#4a6fa5",
            light: "#7895c7",
            dark: "#2c4d7a",
          },
          secondary: {
            main: "#ff7043",
            light: "#ff9e75",
            dark: "#c53f13",
          },
          background: {
            default: "#f8fafc",
            paper: "#ffffff",
          },
          text: {
            primary: "#1e293b",
            secondary: "#64748b",
          },
        }
      : {
          primary: {
            main: "#7895c7",
            light: "#a6b9dc",
            dark: "#4a6fa5",
          },
          secondary: {
            main: "#ff9e75",
            light: "#ffcfbc",
            dark: "#ff7043",
          },
          background: {
            default: "#0f172a",
            paper: "#1e293b",
          },
          text: {
            primary: "#f1f5f9",
            secondary: "#94a3b8",
          },
        }),
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 8,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          transition: "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 4px 10px rgba(30,41,59,0.06)",
          border: "1px solid #e2e8f0",
        },
      },
    },
  },
});