import { prisma } from "@/lib/prisma";

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
<<<<<<< HEAD
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
=======
>>>>>>> bf51935 (32-fe-booklistingform (#142))
      ],
    },
    include: {
      listing_images: true,
      listing_type: true,
      listing_area: true,
    },
  });
  return searchListings;
}
