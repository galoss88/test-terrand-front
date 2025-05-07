import { StyledTextField } from "@/pages/auth/styles";
import { Box } from "@mui/material";

interface FormProps {
  values: {
    title: string;
    description: string;
    [key: string]: any;
  };
  errors: {
    title?: string;
    description?: string;
    [key: string]: any;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

interface RecipeFieldsSectionProps {
  form: FormProps;
}

const RecipeFieldsSection: React.FC<RecipeFieldsSectionProps> = ({ form }) => {
  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <StyledTextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="title"
        label="Título"
        name="title"
        onChange={form.handleChange}
        value={form.values.title}
        error={!!form.errors.title}
        helperText={form.errors.title}
      />
      <StyledTextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="description"
        label="Descripción"
        name="description"
        onChange={form.handleChange}
        value={form.values.description}
        error={!!form.errors.description}
        helperText={form.errors.description}
        multiline
        rows={4}
      />
    </Box>
  );
};

export default RecipeFieldsSection;