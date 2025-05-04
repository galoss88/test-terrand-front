import { RoutesWithSuspense } from "@/routes/routes";
import { theme } from "@/theme";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth={false}>
        <CssBaseline />
        <RoutesWithSuspense />
      </Container>
    </ThemeProvider>
  );
}

export default App;
