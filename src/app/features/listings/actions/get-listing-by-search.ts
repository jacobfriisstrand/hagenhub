import prisma from "@/lib/prisma";

export default async function getListingBySearch(search: string) {
  const searchListings = await prisma.listing.findMany({
    where: {
      OR: [
        {
          listing_title: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          listing_description: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          listing_type: {
            listing_type_name: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
        {
          listing_area: {
            listing_area_name: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
      ],
      listing_deleted_at: null,
    },
    include: {
      listing_images: true,
      listing_type: true,
      listing_area: true,
    },
  });
  return searchListings;
}
