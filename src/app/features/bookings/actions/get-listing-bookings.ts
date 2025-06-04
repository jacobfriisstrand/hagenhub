"use server";

import prisma from "@/lib/prisma";

export async function getListingBookings(listingId: string) {
  const bookings = await prisma.booking.findMany({
    where: {
      booking_listing_fk: listingId,
      booking_status: {
        in: ["Pending", "Confirmed"],
      },
    },
    select: {
      booking_check_in: true,
      booking_check_out: true,
    },
  });

  return bookings;
}
