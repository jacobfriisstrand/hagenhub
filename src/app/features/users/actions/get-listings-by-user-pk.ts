import prisma from "@/lib/prisma";

export async function getListingsByUserPk(user_pk: string) {
  const listings = await prisma.listing.findMany({
    include: {
      listing_images: true,
      listing_type: true,
      listing_area: true,
    },
    where: {
      listing_deleted_at: null,
      listing_user_fk: user_pk,
    },
  });
  return listings;
}
