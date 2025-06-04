"use server";

import { revalidatePath } from "next/cache";

import { getCurrentUser } from "@/app/(auth)/current-user";
import prisma from "@/lib/prisma";
import supabase from "@/lib/supabase";

export async function deleteListingImage(image_pk: string) {
  try {
    const user = await getCurrentUser({
      withFullUser: false,
      redirectIfNotFound: true,
    });

    // Get the image and its associated listing
    const image = await prisma.listingImage.findUnique({
      where: {
        listing_image_pk: image_pk,
      },
      include: {
        listing_image_listing: {
          include: {
            listing_images: true,
          },
        },
      },
    });

    if (!image) {
      throw new Error("Image not found");
    }

    if (image.listing_image_listing.listing_user_fk !== user.user_pk) {
      throw new Error("Unauthorized");
    }

    // Check if this is the last image
    if (image.listing_image_listing.listing_images.length <= 1) {
      return { success: false, error: "Cannot delete the last image. A listing must have at least one image." };
    }

    // Extract the file path from the URL
    const url = new URL(image.listing_image_url);
    const filePath = url.pathname.split("/").slice(-2).join("/");

    // Delete from Supabase storage
    const { error: deleteError } = await supabase.storage
      .from("listing-images-dev")
      .remove([filePath]);

    if (deleteError) {
      throw deleteError;
    }

    // Delete from database
    await prisma.listingImage.delete({
      where: {
        listing_image_pk: image_pk,
      },
    });

    revalidatePath("/listings");
    return { success: true };
  }
  catch (error) {
    console.error("Error deleting image:", error);
    return { success: false, error: "Failed to delete image" };
  }
}
