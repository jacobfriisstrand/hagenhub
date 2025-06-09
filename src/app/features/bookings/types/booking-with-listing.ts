import type { FullListing } from "../../listings/types/full-listing-type";
import type { FullBooking } from "./full-booking";

export type BookingWithListing = FullBooking & {
  listing: FullListing;
};
