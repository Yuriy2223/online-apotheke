// utils/cloudinary-server.ts

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
  }
};

export const extractPublicId = (url: string): string | null => {
  if (!url.includes("cloudinary.com")) return null;

  const match = url.match(/\/([^/]+)\.(jpg|jpeg|png|webp|gif)$/);
  return match ? `avatars/${match[1]}` : null;
};
