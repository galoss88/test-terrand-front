import { Button, ButtonProps, styled } from "@mui/material";
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
    ? theme.palette.action.disabledBackground
    : "rgba(255, 247, 237, 0.9)",
  color: isLoading ? theme.palette.action.disabled : "#e17055",
  "&:hover": {
    backgroundColor: isLoading
      ? theme.palette.action.disabledBackground
      : "rgba(255, 247, 237, 1)",
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
      {isLoading ? loadingText : textWhenNotLoading}
    </StyledButton>
  );
};

export const LinkButton: React.FC<MaterialButtonProps> = ({
  ...buttonProps
}) => {
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
        color: "#ffffff82",
        outline: "none",
        textDecoration: "underline",
        textDecorationThickness: 2,
        textUnderlineOffset: 4,
        "&:hover": {
          background: "none",
          color: "#FFF",
        },
        textAlign: "center",
        ...buttonProps.sx,
      }}
    >
      {buttonProps.children}
    </StyledButton>
  );
};
