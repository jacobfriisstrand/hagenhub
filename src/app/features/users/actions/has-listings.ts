import prisma from "@/lib/prisma";

export async function hasListings(user_pk: string) {
  const count = await prisma.listing.count({
    where: {
      listing_user_fk: user_pk,
      listing_deleted_at: null,
    },
  });

  return count > 0;
}
