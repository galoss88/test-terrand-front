// useImageUpload.ts - Hook específico para carga de imágenes
import { recipeServiceParams } from "@/services/recipes/recipesService";
import { useState } from "react";

interface UseImageUploadProps {
  onSuccess?: (imageUrl: string) => void;
  onError?: (error: Error) => void;
}

export const useImageUpload = ({
  onSuccess,
  onError,
}: UseImageUploadProps = {}) => {
  const [loadingImage, setLoadingImage] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoadingImage(true);
    setImgError(false);

    try {
      const imageUrl = await recipeServiceParams.uploadImage(file);

      setImagePreview(imageUrl);

      if (onSuccess) {
        onSuccess(imageUrl);
      }

      return imageUrl;
    } catch (error) {
      console.error("Error al subir imagen:", error);
      setImgError(true);

      if (onError && error instanceof Error) {
        onError(error);
      }

      throw error;
    } finally {
      setLoadingImage(false);
    }
  };

  return {
    loadingImage,
    imgError,
    imagePreview,
    handleFileChange,
    setImagePreview,
  };
};
