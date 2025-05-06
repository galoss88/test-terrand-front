import { IImageUploadProvider, IImageUploadResponse } from "./types";

export class ImgBBService implements IImageUploadProvider {
  private apiKey: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_API_KEY_IMGBB || "";
  }

  async uploadImage(
    fileOrFormData: File | FormData
  ): Promise<IImageUploadResponse> {
    try {
      let formData: FormData;
      if (fileOrFormData instanceof File) {
        formData = new FormData();
        formData.append("image", fileOrFormData);
      } else {
        const originalFormData = fileOrFormData;
        formData = new FormData();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (const [_, value] of originalFormData.entries()) {
          if (value instanceof File) {
            formData.append("image", value);
            break;
          }
        }
      }

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${this.apiKey}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {
        return {
          success: true,
          url: data.data.url,
          public_id: data.data.id,
        };
      } else {
        throw new Error(data.error || "Error al cargar la imagen en ImgBB");
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
    return imageId.startsWith("http") ? imageId : `https://i.ibb.co/${imageId}`;
  }
}
