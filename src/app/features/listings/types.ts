import type { Listing, ListingArea, ListingImage, ListingType } from "@prisma/client";

export type FullListing = Listing & {
  listing_images: ListingImage[];
  listing_area: ListingArea;
  listing_type: ListingType;
};
