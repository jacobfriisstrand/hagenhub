import type { BookingWithListing } from "@/app/features/bookings/types/booking-with-listing";

import { getCurrentUser } from "@/app/(auth)/current-user";
import { getListingByPk } from "@/app/features/listings/actions/add-listing/get-listing-by-pk";
import { getUserByPk } from "@/app/features/users/actions/get-user-by-pk";
import prisma from "@/lib/prisma";

export default async function getHostBookings() {
  const user = await getCurrentUser({
    withFullUser: true,
    redirectIfNotFound: true,
  });

  // First get all listings owned by the user
  const userListings = await prisma.listing.findMany({
    where: {
      listing_user_fk: user.user_pk,
      listing_deleted_at: null,
    },
    select: {
      listing_pk: true,
    },
  });

  const listingIds = userListings.map(listing => listing.listing_pk);

  // Then get all bookings for these listings
  const bookings = await prisma.booking.findMany({
    where: {
      booking_listing_fk: {
        in: listingIds,
      },
    },
    include: {
      booking_guest: true,
      booking_listing: {
        include: {
          listing_images: true,
          listing_area: true,
          listing_type: true,
        },
      },
    },
  });

  // Fetch related data for each booking
  const bookingsWithRelations = await Promise.all(
    bookings.map(async (booking) => {
      const listing = await getListingByPk(booking.booking_listing_fk);
      const guest = await getUserByPk(booking.booking_guest_fk);
      return {
        ...booking,
        booking_listing: listing,
        booking_guest: guest,
        booking_host: user,
      };
    }),
  );

  return bookingsWithRelations as BookingWithListing[];
}
