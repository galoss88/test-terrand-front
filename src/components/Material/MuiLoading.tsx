import { StyledText } from "@/pages/auth/styles";
import { Box, CircularProgress } from "@mui/material";

export const MuiLoading = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
      }}
    >
      <CircularProgress color="primary" size={48} thickness={4} />
      <StyledText
        sx={{
          mt: 3,
          color: "rgba(35, 35, 50, 0.8)",
          fontWeight: 500,
        }}
      >
        {children}
      </StyledText>
    </Box>
  );
};
