import type { getBookingByPk } from "@/app/features/bookings/actions/get-booking-by-pk";

export type FullBooking = Awaited<ReturnType<typeof getBookingByPk>>;
