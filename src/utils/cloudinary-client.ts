export const uploadImage = async (file: File): Promise<string | null> => {
  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", "e-parmacy");
  // formData.append("transformation", "c_fill,g_face,h_200,w_200/f_webp/q_auto");

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) throw new Error("Upload failed");

    const data = await res.json();
    return data.secure_url;
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    return null;
  }
};

export const extractPublicId = (url: string): string | null => {
  if (!url.includes("cloudinary.com")) return null;

  const match = url.match(/\/([^/]+)\.(jpg|jpeg|png|webp|gif)$/);
  return match ? `avatars/${match[1]}` : null;
};
