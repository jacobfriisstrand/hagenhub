import prisma from "@/lib/prisma";

export async function getAllListings() {
  const listings = await prisma.listing.findMany({
    include: {
      listing_images: true,
      listing_type: true,
      listing_area: true,
    },
    where: {
      listing_deleted_at: null,
    },
  });
  return listings;
}
