import type { getBookingByPk } from "../actions/get-booking-by-pk";

export type FullBooking = Awaited<ReturnType<typeof getBookingByPk>>;
