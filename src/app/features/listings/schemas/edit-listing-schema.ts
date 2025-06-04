import { z } from "zod";

import { ListingSchema } from "@/prisma/generated/zod";

const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const EditListingSchema = ListingSchema.pick({
  listing_title: true,
  listing_description: true,
  listing_night_price: true,
  listing_guest_count: true,
  listing_bedrooms: true,
}).extend({
  listing_image_url: z.any().refine(
    (val) => {
      if (!val || !(val instanceof FileList)) {
        return true; // Allow empty/null values
      }
      return Array.from(val).every(file => ALLOWED_FILE_TYPES.includes(file.type));
    },
    {
      message: "Only JPG, PNG, and WebP images are allowed",
    },
  ),
});

export type EditListingFormValues = z.infer<typeof EditListingSchema>;
