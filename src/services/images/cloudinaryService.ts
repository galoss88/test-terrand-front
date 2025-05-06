// cloudinaryService.ts - Implementación de Cloudinary

import { IImageUploadProvider, IImageUploadResponse } from "./types";

export class CloudinaryService implements IImageUploadProvider {
  private cloudName: string;
  private uploadPreset: string;

  constructor() {
    this.cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "";
    this.uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "";
  }

  async uploadImage(
    fileOrFormData: File | FormData
  ): Promise<IImageUploadResponse> {
    try {
      let formData: FormData;
      if (fileOrFormData instanceof File) {
        formData = new FormData();
        formData.append("file", fileOrFormData);
      } else {
        formData = fileOrFormData;
      }

      formData.append("upload_preset", this.uploadPreset);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          url: data.secure_url,
          public_id: data.public_id,
        };
      } else {
        throw new Error(
          data.error?.message || "Error al cargar la imagen en Cloudinary"
        );
      }
    } catch (error) {
      return {
        success: false,
        url: "",
        error: error instanceof Error ? error.message : "Error desconocido",
      };
    }
  }

  getImageUrl(imageId: string): string {
    return `https://res.cloudinary.com/${this.cloudName}/image/upload/${imageId}`;
  }
}
