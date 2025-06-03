import { z } from "zod";

import { BookingSchema } from "@/prisma/generated/zod";

const today = new Date();
today.setHours(0, 0, 0, 0);

export const bookingSchema = BookingSchema.pick({
  booking_guest_count: true,
  booking_night_count: true,
  booking_check_in: true,
  booking_check_out: true,
  booking_status: true,
  booking_listing_fk: true,
}).extend({
  booking_check_in: z.coerce.date()
    .min(today, { message: "Check-in date cannot be in the past" }),
  booking_check_out: z.coerce.date()
    .min(today, { message: "Check-out date cannot be in the past" }),
  booking_guest_count: z.number()
    .min(1, { message: "At least 1 guest is required" }),
}).refine(
  (data) => {
    if (!data.booking_check_in || !data.booking_check_out)
      return false;
    return data.booking_check_out > data.booking_check_in;
  },
  {
    message: "Check-out date must be after check-in date",
    path: ["booking_check_out"],
  },
);

export type BookingFormValues = z.infer<typeof bookingSchema>;
