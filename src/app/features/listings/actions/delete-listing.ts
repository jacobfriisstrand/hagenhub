"use server";

import { revalidatePath } from "next/cache";

import { getCurrentUser } from "@/app/(auth)/current-user";
import prisma from "@/lib/prisma";

export async function deleteListing(listing_pk: string) {
  try {
    const user = await getCurrentUser({
      withFullUser: false,
      redirectIfNotFound: true,
    });

    const listing = await prisma.listing.findUnique({
      where: {
        listing_pk,
      },
    });

    if (!listing) {
      throw new Error("Listing not found");
    }

    if (listing.listing_user_fk !== user.user_pk) {
      throw new Error("Unauthorized");
    }

    await prisma.listing.update({
      where: {
        listing_pk,
      },
      data: {
        listing_deleted_at: new Date(),
      },
    });

    revalidatePath("/");
    revalidatePath("/listings");
    revalidatePath(`/listing/${listing_pk}`);

    return { success: true };
  }
  catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }

    return { error: "Internal error" };
  }
}
