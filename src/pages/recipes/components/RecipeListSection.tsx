import {
  DeleteButton,
  MaterialButton,
} from "@/components/Material/MaterialButton";
import { StyledTextField } from "@/pages/auth/styles";
import { Box, Typography } from "@mui/material";

interface RecipeListSectionProps {
  title: string;
  name: "ingredients" | "instructions";
  items: string[];
  errors?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => void;
  onAdd: () => void;
  onDelete: (index: number) => void;
  buttonText: string;
  fieldLabel: string;
  multiline?: boolean;
  rows?: number;
}

const RecipeListSection: React.FC<RecipeListSectionProps> = ({
  title,
  name,
  items,
  errors,
  onChange,
  onAdd,
  onDelete,
  buttonText,
  fieldLabel,
  multiline = false,
  rows = 1,
}) => {
  return (
    <Box
      sx={{
        flex: 0.5,
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Typography variant="subtitle1" color="rgba(255, 255, 255, 0.9)">
        {title}
      </Typography>

      {items.map((item, idx) => (
        <Box key={idx} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <StyledTextField
            fullWidth
            name={name}
            label={`${fieldLabel} ${idx + 1}`}
            onChange={(e) => onChange(e, idx)}
            value={item}
            error={!!errors}
            helperText={idx === 0 ? errors : ""}
            multiline={multiline}
            rows={rows}
          />
          {items.length > 1 && (
            <DeleteButton onClick={() => onDelete(idx)}>X</DeleteButton>
          )}
        </Box>
      ))}

      <MaterialButton onClick={onAdd}>{buttonText}</MaterialButton>
    </Box>
  );
};

export default RecipeListSection;
