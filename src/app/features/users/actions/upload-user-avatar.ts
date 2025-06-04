"use server";

import prisma from "@/lib/prisma";
import supabase from "@/lib/supabase";

const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function uploadUserAvatar(
  user_pk: string,
  formData: FormData,
) {
  try {
    const files = formData.getAll("avatar") as File[];

    if (!files.length) {
      return { success: false, error: "No files selected" };
    }

    // Validate file types
    const invalidFiles = files.filter(file => !ALLOWED_FILE_TYPES.includes(file.type));
    if (invalidFiles.length > 0) {
      return {
        success: false,
        error: `Invalid file type(s) detected. Only JPG, PNG, and WebP images are allowed.`,
      };
    }

    const uploadPromises = files.map(async (file) => {
      try {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${user_pk}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, file);

        if (uploadError) {
          console.error("Supabase upload error:", uploadError);
          throw uploadError;
        }

        const { data: { publicUrl } } = supabase.storage
          .from("avatars")
          .getPublicUrl(filePath);

        return prisma.user.update({
          where: { user_pk },
          data: {
            user_avatar_url: publicUrl,
          },
        });
      }
      catch (error) {
        console.error("Error in file upload process:", error);
        throw error;
      }
    });

    await Promise.all(uploadPromises);
    return { success: true };
  }
  catch (error) {
    console.error("Error uploading images:", error);
    if (error instanceof Error) {
      return { success: false, error: `Failed to upload images: ${error.message}` };
    }
    return { success: false, error: "Failed to upload images" };
  }
}
