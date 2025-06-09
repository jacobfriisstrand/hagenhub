import type { BookingWithListing } from "@/app/features/bookings/types/booking-with-listing";

import { getCurrentUser } from "@/app/(auth)/current-user";
import { getListingByPk } from "@/app/features/listings/actions/add-listing/get-listing-by-pk";
import prisma from "@/lib/prisma";

export default async function getBookingsByPk() {
  const user = await getCurrentUser({
    withFullUser: true,
    redirectIfNotFound: true,
  });

  const bookings = await prisma.booking.findMany({
    where: {
      booking_guest_fk: user.user_pk,
    },
  });

  // Fetch related data for each booking
  const bookingsWithRelations = await Promise.all(
    bookings.map(async (booking) => {
      const listing = await getListingByPk(booking.booking_listing_fk);
      return {
        ...booking,
        booking_listing: listing,
        booking_guest: user,
      };
    }),
  );

  return bookingsWithRelations as BookingWithListing[];
}
