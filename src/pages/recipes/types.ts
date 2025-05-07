export interface RecipeFormValues {
  title: string;
  image: string;
  description: string;
  instructions: string[];
  ingredients: string[];
}

export const defaultValues: RecipeFormValues = {
  title: "",
  image: "",
  description: "",
  instructions: [""],
  ingredients: [""],
};

export interface ImageSelectionProps {
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

export interface FormProps {
  values: RecipeFormValues;
  errors: Partial<Record<keyof RecipeFormValues, string>>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index?: number
  ) => void;
  handleSubmit: (
    callback: (values: RecipeFormValues) => void
  ) => (e: React.FormEvent) => void;
  addItem: (
    field: keyof Pick<RecipeFormValues, "ingredients" | "instructions">
  ) => void;
  deleteData: (
    field: keyof Pick<RecipeFormValues, "ingredients" | "instructions">,
    index: number
  ) => void;
  setValues: (values: RecipeFormValues) => void;
}
