import type { z } from "zod";

import { ListingSchema } from "@/prisma/generated/zod";

export const EditListingSchema = ListingSchema.pick({
  listing_title: true,
  listing_description: true,
  listing_night_price: true,
  listing_guest_count: true,
  listing_bedrooms: true,
})
;

export type EditListingFormValues = z.infer<typeof EditListingSchema>;
