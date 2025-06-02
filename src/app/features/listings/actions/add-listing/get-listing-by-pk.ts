import type { FullListing } from "@/app/features/listings/types/full-listing-type";

import { prisma } from "@/lib/prisma";

export async function getListingByPk(listing_pk: string): Promise<FullListing | null> {
  const listing = await prisma.listing.findUnique({
    where: {
      listing_pk,
    },
    include: {
      listing_images: true,
      listing_area: true,
      listing_type: true,
    },
  });

  return listing;
}
