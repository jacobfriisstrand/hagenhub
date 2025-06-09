import type { FullBooking } from "@/app/features/bookings/types/full-booking";
import type { FullListing } from "@/app/features/listings/types/full-listing-type";

export type BookingWithListing = FullBooking & {
  listing: FullListing;
};
