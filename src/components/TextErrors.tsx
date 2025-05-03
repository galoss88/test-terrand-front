import { Box, Button, styled, Typography } from "@mui/material";
const StyledButtonError = styled(Button)(() => ({
  backgroundColor: "rgba(255, 0, 0, 0.5)",
  color: "#fff",
  margin: "4px",
  "&:hover": {
    backgroundColor: "rgba(255, 0, 0, 0.7)",
  },
}));
export const TextErrors = ({
    errors,
  }: {
    errors: Partial<Record<string, string>>;
  }) => {
    if (Object.keys(errors).length === 0) return null;
    console.log("errores", errors);
    return (
      <Box mt={2} width="100%">
        {Object.entries(errors).map(([key, value]) => (
          <StyledButtonError key={key} fullWidth disabled>
            <Typography sx={{ color: "#FFF" }}>{value}</Typography>
          </StyledButtonError>
        ))}
      </Box>
    );
  };
  