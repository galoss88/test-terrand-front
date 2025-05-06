import { CloudinaryService } from "./cloudinaryService";
import { ImgBBService } from "./imgBbService";
import { IImageUploadProvider, IImageUploadResponse } from "./types";

export class ImageUploadService {
  private primaryProvider: IImageUploadProvider;
  private fallbackProvider: IImageUploadProvider;

  constructor() {
    this.primaryProvider = new CloudinaryService();
    this.fallbackProvider = new ImgBBService();
  }

  async uploadImage(file: File | FormData): Promise<IImageUploadResponse> {
    const primaryResult = await this.primaryProvider.uploadImage(file);

    if (primaryResult.success) {
      return primaryResult;
    }

    console.warn(
      "Fallo al cargar imagen con proveedor principal. Intentando con respaldo..."
    );
    return this.fallbackProvider.uploadImage(file);
  }

  getImageUrl(
    imageId: string,
    provider: "primary" | "fallback" = "primary"
  ): string {
    return provider === "primary"
      ? this.primaryProvider.getImageUrl(imageId)
      : this.fallbackProvider.getImageUrl(imageId);
  }
}

export const imageUploadService = new ImageUploadService();
