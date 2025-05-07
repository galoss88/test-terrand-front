import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, Typography, Paper } from '@mui/material';
import { ChangeEvent } from 'react';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

interface FileUploadButtonProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  accept: string;
  id?: string;
}

export const FileUploadButton: React.FC<FileUploadButtonProps> = ({ 
  onChange, 
  accept, 
  id = "file-upload" 
}) => {
  return (
    <Button
      component="label"
      variant="contained"
      startIcon={<CloudUploadIcon />}
      sx={{ mb: 2 }}
    >
      Seleccionar imagen
      <VisuallyHiddenInput 
        type="file"
        accept={accept}
        onChange={onChange}
        id={id}
      />
    </Button>
  );
};

interface ImageUploadWithPreviewProps {
  imageSelectionProps: {
    selectedFile: File | null;
    handleFileSelection: (e: ChangeEvent<HTMLInputElement>) => void;
    clearSelection: () => void;
    setImgError: (error: boolean) => void;
  };
  imageToShow: string;
}

export const ImageUploadWithPreview: React.FC<ImageUploadWithPreviewProps> = ({ 
  imageSelectionProps, 
  imageToShow
}) => {
  const { selectedFile, handleFileSelection, setImgError } = imageSelectionProps;
  
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: 2,
      p: 2,
      border: '1px dashed rgba(255,255,255,0.3)',
      borderRadius: 1
    }}>
      <FileUploadButton
        accept="image/*"
        onChange={handleFileSelection}
      />
      
      {selectedFile && (
        <Typography 
          variant="body2" 
          sx={{ 
            color: 'rgba(255,255,255,0.7)',
            wordBreak: 'break-word',
            maxWidth: '100%'
          }}
        >
          Archivo seleccionado: {selectedFile.name}
        </Typography>
      )}
      
      {imageToShow && (
        <Paper elevation={3} sx={{ p: 1, width: '100%' }}>
          <Box
            component="img"
            src={imageToShow}
            alt="Vista previa"
            onError={() => setImgError(true)}
            sx={{
              width: '100%',
              height: '200px',
              objectFit: 'contain',
              borderRadius: 1
            }}
          />
          {selectedFile && (
            <Typography variant="caption" sx={{ mt: 1, display: 'block', textAlign: 'center', color: 'info.main' }}>
              La imagen se subirá cuando guardes los cambios
            </Typography>
          )}
        </Paper>
      )}
    </Box>
  );
};