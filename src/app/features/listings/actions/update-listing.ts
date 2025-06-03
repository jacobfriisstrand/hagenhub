"use server";

import { z } from "zod";

import { getCurrentUser } from "@/app/(auth)/current-user";
import { EditListingSchema } from "@/app/features/listings/schemas/edit-listing-schema";
import { prisma } from "@/lib/prisma";

export async function updateListing(listing_pk: string, data: z.infer<typeof EditListingSchema>) {
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

    const validatedData = EditListingSchema.parse(data);

    const updatedListing = await prisma.listing.update({
      where: {
        listing_pk,
      },
      data: validatedData,
    });

    return { data: updatedListing };
  }
  catch (error) {
    if (error instanceof z.ZodError) {
      return { error: "Invalid request data" };
    }

    if (error instanceof Error) {
      return { error: error.message };
    }

    return { error: "Internal error" };
  }
}
