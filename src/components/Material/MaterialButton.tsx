import { StyledText } from "@/pages/auth/styles";
import { Button, ButtonProps, styled, useTheme } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";

export interface LoadingProps {
  isLoading?: boolean;
  loadingText?: string;
}

export interface MaterialButtonProps extends ButtonProps, LoadingProps {}

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) =>
    !["isLoading", "loadingText"].includes(prop as string),
})<MaterialButtonProps>(({ theme, isLoading }) => ({
  margin: theme.spacing(2, 0),
  padding: theme.spacing(1.2),
  borderRadius: 50,
  backgroundColor: isLoading
    ? theme.palette.primary.main
    : theme.palette.primary.main,
  color: isLoading ? theme.palette.action.disabled : "#e17055",
  "&:hover": {
    backgroundColor: isLoading
      ? theme.palette.primary.main
      : theme.palette.primary.main,
  },
}));

export const MaterialButton: React.FC<MaterialButtonProps> = ({
  children,
  ...buttonProps
}) => {
  return (
    <StyledButton {...buttonProps} disabled={buttonProps.disabled}>
      {children}
    </StyledButton>
  );
};

export const LoadingButton: React.FC<
  MaterialButtonProps & { textWhenNotLoading?: string }
> = ({
  isLoading = false,
  loadingText = "Cargando...",
  textWhenNotLoading = "Enviar",
  ...buttonProps
}) => {
  return (
    <StyledButton
      {...buttonProps}
      isLoading={isLoading}
      loadingText={loadingText}
    >
      <StyledText sx={{ marginBottom: 0 }}>
        {isLoading ? loadingText : textWhenNotLoading}
      </StyledText>
    </StyledButton>
  );
};

export const LinkButton: React.FC<MaterialButtonProps> = ({
  ...buttonProps
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(buttonProps.href ?? "/");
  };
  return (
    <StyledButton
      onClick={handleClick}
      {...buttonProps}
      sx={{
        backgroundColor: "transparent",
        // color: theme.palette.primary.contrastText,
        outline: "none",
        textDecoration: "underline",
        textDecorationThickness: 2,
        textUnderlineOffset: 4,
        color: theme.palette.primary.contrastText,
        "&:hover": {
          background: "transparent",
          color: theme.palette.primary.contrastText,
        },
        textAlign: "center",
        ...buttonProps.sx,
      }}
    >
      {buttonProps.children}
    </StyledButton>
  );
};

export const DeleteButton: React.FC<MaterialButtonProps> = ({
  children,
  ...buttonProps
}) => {
  const theme = useTheme();
  return (
    <StyledButton
      {...buttonProps}
      sx={{
        color: theme.palette.error.main,
        backgroundColor: "transparent",
        padding: 0,
        "&:hover": {
          backgroundColor: theme.palette.error.main,
          padding: 0,
        },
        ...buttonProps.sx,
      }}
    >
      {children}
    </StyledButton>
  );
};
