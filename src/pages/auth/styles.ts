import {
  Avatar,
  Container,
  Paper,
  styled,
  TextField,
  Typography,
} from "@mui/material";

export const StyledContainer = styled(Container)(() => ({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundAttachment: "fixed",
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: 16,
  backgroundColor: theme.palette.primary.light,
  backdropFilter: "blur(12px)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.25)",
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  width: "100%",
  "& .MuiOutlinedInput-root": {
    borderRadius: 10,
    backgroundColor: theme.palette.primary.light,
    transition: "all 0.3s ease",
    "& fieldset": {
      borderColor: theme.palette.primary.contrastText,
      borderWidth: 1,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.contrastText,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
      borderWidth: 2,
    },
    "&.Mui-error fieldset": {
      borderColor: theme.palette.error.main,
    },
  },
  "& .MuiInputLabel-root": {
    color: theme.palette.primary.contrastText,
    "&.Mui-focused": {
      color: theme.palette.primary.main,
    },
    "&.Mui-error": {
      color: theme.palette.error.main,
    },
  },
  "& .MuiInputBase-input": {
    color: theme.palette.primary.contrastText,
    padding: "14px 16px",
    "&::placeholder": {
      color: "rgba(255, 255, 255, 0.5)",
      opacity: 1,
    },
  },
  "& .MuiInputAdornment-root": {
    color: "rgba(255, 255, 255, 0.7)",
  },
  "& .MuiFormHelperText-root": {
    marginLeft: 2,
    marginTop: 4,
    fontSize: "0.75rem",
    "&.Mui-error": {
      color: theme.palette.error.main,
    },
  },
}));

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  width: 64,
  height: 64,
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
  },
}));

export const StyledText = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontWeight: 500,
}));

export const StyledTextModal = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  marginBottom: theme.spacing(2),
  textAlign: "center",
  fontWeight: 500,
  lineHeight: 1.6,
}));
