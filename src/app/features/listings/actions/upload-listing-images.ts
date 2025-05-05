"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import supabase from "@/lib/supabase";

const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function uploadListingImages(
  listing_pk: string,
  formData: FormData,
) {
  try {
    const files = formData.getAll("images") as File[];

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
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${listing_pk}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("listing-images-dev")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from("listing-images-dev")
        .getPublicUrl(filePath);

      return prisma.listingImage.create({
        data: {
          listing_image_url: publicUrl,
          listing_image_listing_fk: listing_pk,
        },
      });
    });

    await Promise.all(uploadPromises);
    revalidatePath("/listings");
    return { success: true };
  }
  catch (error) {
    console.error("Error uploading images:", error);
    return { success: false, error: "Failed to upload images" };
  }
}
