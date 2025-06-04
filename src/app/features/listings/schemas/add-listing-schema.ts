import type { z } from "zod";

import { ListingSchema } from "@/prisma/generated/zod";

export const AddListingSchema = ListingSchema.pick({
  listing_title: true,
  listing_description: true,
  listing_type_fk: true,
  listing_night_price: true,
  listing_area_fk: true,
  listing_bedrooms: true,
  listing_guest_count: true,
  listing_zip_code: true,
  listing_street_name: true,
  listing_street_number: true,
})
;

export type AddListingFormValues = z.infer<typeof AddListingSchema>;
