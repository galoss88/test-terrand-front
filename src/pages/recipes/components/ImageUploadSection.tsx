import { StyledTextField } from "@/pages/auth/styles";
import { Box, Typography } from "@mui/material";

interface ImageSelectionProps {
  selectedFile: File | null;
  localPreview: string;
  imgError: boolean;
  loadingImage: boolean;
  setLoadingImage: (loading: boolean) => void;
  handleFileSelection: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearSelection: () => void;
  setImgError: (error: boolean) => void;
  setLocalPreview: (preview: string) => void;
  cleanup: () => void;
}

interface FormProps {
  values: {
    image: string;
    [key: string]: any;
  };
  errors: {
    image?: string;
    [key: string]: any;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

interface ImageUploadSectionProps {
  form: FormProps;
  handleImageUrlChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  imageSelectionProps: ImageSelectionProps;
  imageToShow: string;
}

const ImageUploadSection: React.FC<ImageUploadSectionProps> = ({
  form,
  handleImageUrlChange,
  imageSelectionProps,
  imageToShow,
}) => {
  const { selectedFile, setImgError } = imageSelectionProps;

  return (
    <Box sx={{ flex: 0.5, display: "flex", flexDirection: "column" }}>
      <StyledTextField
        variant="outlined"
        margin="normal"
        fullWidth
        name="image"
        type="text"
        label="URL de imagen"
        onChange={handleImageUrlChange}
        value={form.values.image}
        error={!!form.errors.image}
        helperText={form.errors.image}
      />

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <input
          type="file"
          accept="image/*"
          onChange={imageSelectionProps.handleFileSelection}
          style={{ marginTop: 8 }}
          id="image-upload"
        />
        {selectedFile && (
          <Typography variant="caption" sx={{ color: "success.main" }}>
            Archivo seleccionado: {selectedFile.name}
          </Typography>
        )}
      </Box>

      <Box
        component="img"
        src={imageToShow}
        alt="Preview"
        onError={() => setImgError(true)}
        sx={{
          width: "100%",
          maxHeight: 200,
          objectFit: "cover",
          mt: 1,
          borderRadius: 2,
        }}
      />

      {selectedFile && (
        <Typography variant="caption" sx={{ mt: 1, color: "info.main" }}>
          La imagen se subirá cuando guardes los cambios
        </Typography>
      )}
    </Box>
  );
};

export default ImageUploadSection;
