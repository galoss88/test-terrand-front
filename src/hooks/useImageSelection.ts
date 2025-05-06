import { useState } from "react";

export const useImageSelection = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [localPreview, setLocalPreview] = useState<string>("");
  const [imgError, setImgError] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setImgError(false);

    // Crear una URL temporal para previsualización
    const objectUrl = URL.createObjectURL(file);
    setLocalPreview(objectUrl);
  };

  const clearSelection = () => {
    // Revocar URL si existe
    if (localPreview && localPreview.startsWith('blob:')) {
      URL.revokeObjectURL(localPreview);
    }
    
    setSelectedFile(null);
    setLocalPreview("");
  };

  // Limpieza al desmontar el componente
  const cleanup = () => {
    if (localPreview && localPreview.startsWith('blob:')) {
      URL.revokeObjectURL(localPreview);
    }
  };

  return {
    selectedFile,
    localPreview,
    imgError,
    loadingImage,
    setLoadingImage,
    handleFileSelection,
    clearSelection,
    setImgError,
    setLocalPreview,
    cleanup
  };
};