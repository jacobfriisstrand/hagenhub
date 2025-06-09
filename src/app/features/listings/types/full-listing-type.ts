import type { Listing, ListingArea, ListingImage, ListingType } from "@prisma/client";

import type { ReviewType } from "@/app/features/reviews/types/review-type";

export type FullListing = Listing & {
  listing_images: ListingImage[];
  listing_area: ListingArea;
  listing_type: ListingType;
  listing_reviews?: ReviewType[];
};
