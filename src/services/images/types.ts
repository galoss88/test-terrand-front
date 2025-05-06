export interface IImageUploadResponse {
  success: boolean;
  url: string;
  public_id?: string;
  error?: string;
}

export interface IImageUploadProvider {
  uploadImage(file: File | FormData): Promise<IImageUploadResponse>;
  getImageUrl(imageId: string): string;
}
