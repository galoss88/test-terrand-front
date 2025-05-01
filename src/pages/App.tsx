import { RoutesWithSuspense } from "@/routes/routes";
import { theme } from "@/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RoutesWithSuspense />
    </ThemeProvider>
  );
}

export default App;
