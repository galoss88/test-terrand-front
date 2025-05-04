import { Box, Modal, ModalProps, Paper, styled } from "@mui/material";
import React from "react";

// Contenedor del modal
const ModalContainer = styled(Paper)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  maxWidth: "90%",
  maxHeight: "90vh",
  overflow: "auto",
  outline: "none",
  backgroundColor: theme.palette.primary.main,
}));

// Tipos para las props del modal principal
interface MaterialModalMessageProps {
  open: boolean;
  handleClose?: () => void;
  children?: React.ReactElement;
  maxWidth?: string | number;
  // Permitir pasar otras props al Modal
  sx?: Omit<ModalProps, "open" | "onClose" | "children">;
}

// Tipos para las props del contenedor
interface ContainerProps {
  children: React.ReactNode;
  sx?: object;
  className?: string;
}

// Componente principal con subcomponentes
export const MaterialModal: React.FC<MaterialModalMessageProps> & {
  Container: React.FC<ContainerProps>;
  Header: React.FC<ContainerProps>;
  Content: React.FC<ContainerProps>;
  Footer: React.FC<ContainerProps>;
} = ({ open, handleClose = () => {}, children, maxWidth = "600px", sx }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      {...sx}
    >
      <ModalContainer sx={{ maxWidth }}>
        {children || <Box p={2}>Sin contenido</Box>}
      </ModalContainer>
    </Modal>
  );
};

MaterialModal.Container = ({ children, sx, className }) => {
  return (
    <Box sx={{ ...sx }} className={className}>
      {children}
    </Box>
  );
};

MaterialModal.Header = ({ children, sx, className }) => {
  return (
    <Box
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        pb: 2,
        mb: 2,
        ...sx,
      }}
      className={className}
    >
      {children}
    </Box>
  );
};

MaterialModal.Content = ({ children, sx, className }) => {
  return (
    <Box sx={{ py: 1, ...sx }} className={className}>
      {children}
    </Box>
  );
};

MaterialModal.Footer = ({ children, sx, className }) => {
  return (
    <Box
      sx={{
        borderTop: "1px solid",
        borderColor: "divider",
        pt: 2,
        mt: 2,
        display: "flex",
        justifyContent: "flex-end",
        ...sx,
      }}
      className={className}
    >
      {children}
    </Box>
  );
};
