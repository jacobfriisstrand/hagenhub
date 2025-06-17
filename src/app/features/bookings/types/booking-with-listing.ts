import type { User } from "@prisma/client";

import type { FullBooking } from "@/app/features/bookings/types/full-booking";
import type { FullListing } from "@/app/features/listings/types/full-listing-type";

export type BookingWithListing = FullBooking & {
  booking_listing: FullListing;
  booking_guest: User;
  booking_host: User | null;
};
