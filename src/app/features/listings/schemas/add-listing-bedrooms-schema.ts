import { AddListingSchema } from "./add-listing-schema";

export const addListingBedroomsSchema = AddListingSchema.pick({
  listing_bedrooms: true,
});
