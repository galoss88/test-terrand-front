import { ImageUploadWithPreview } from "@/components/Material/MuiUploadButton";
import { StyledText, StyledTextField } from "@/pages/auth/styles";
import { Box } from "@mui/material";

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
  return (
    <Box sx={{ flex: 0.5, display: "flex", flexDirection: "column", gap: 2 }}>
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

      {/* Usar el componente ImageUploadWithPreview para manejar la subida y vista previa */}
      <ImageUploadWithPreview
        imageSelectionProps={{
          selectedFile: imageSelectionProps.selectedFile,
          handleFileSelection: imageSelectionProps.handleFileSelection,
          clearSelection: imageSelectionProps.clearSelection,
          setImgError: imageSelectionProps.setImgError
        }}
        imageToShow={imageToShow}
      />
      
      {form.errors.image && (
        <StyledText color="error">
          {form.errors.image}
        </StyledText>
      )}
    </Box>
  );
};

export default ImageUploadSection;