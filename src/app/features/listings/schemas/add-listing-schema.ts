import { z } from "zod";

import { ListingImageSchema, ListingSchema } from "@/prisma/generated/zod";

export const AddListingSchema = ListingSchema.pick({
  listing_title: true,
  listing_description: true,
  listing_type_fk: true,
  listing_night_price: true,
  listing_area_fk: true,
  listing_bedrooms: true,
  listing_zip_code: true,
}).extend({
  listing_images: z.array(
    ListingImageSchema.pick({
      listing_image_url: true,
    }),
  ),
  listing_type_name: z.string(),
  listing_type_icon: z.string(),
});

export type AddListingFormValues = z.infer<typeof AddListingSchema>;
