"use server";

import type { AddListingFormValues } from "@/app/features/listings/schemas/add-listing-schema";

import { getCurrentUser } from "@/app/(auth)/current-user";
import prisma from "@/lib/prisma";

export async function createListing(data: AddListingFormValues) {
  try {
    const user = await getCurrentUser({
      withFullUser: false,
      redirectIfNotFound: true,
    });

    const listing = await prisma.listing.create({
      data: {
        listing_title: data.listing_title,
        listing_description: data.listing_description,
        listing_type_fk: data.listing_type_fk,
        listing_night_price: data.listing_night_price,
        listing_area_fk: data.listing_area_fk,
        listing_bedrooms: data.listing_bedrooms,
        listing_guests: data.listing_guests,
        listing_guest_count: data.listing_guests,
        listing_zip_code: data.listing_zip_code,
        listing_street_name: data.listing_street_name,
        listing_street_number: data.listing_street_number,
        listing_user_fk: user.user_pk,
        // Generate random coordinates within Copenhagen area
        listing_latitude: 55.6 + Math.random() * 0.2, // Random between 55.6 and 55.8
        listing_longitude: 12.4 + Math.random() * 0.3, // Random between 12.4 and 12.7
      },
    });

    return { success: true, listing_pk: listing.listing_pk };
  }
  catch (error) {
    console.error("Error creating listing:", error);
    return { success: false, error: "Failed to create listing" };
  }
}
