"use server";

import { notFound } from "next/navigation";

import { getCurrentUser } from "@/app/(auth)/current-user";
import { getListingByPk } from "@/app/features/listings/actions/add-listing/get-listing-by-pk";
import prisma from "@/lib/prisma";

export async function getBookingByPk(bookingId: string) {
  const user = await getCurrentUser({
    withFullUser: true,
    redirectIfNotFound: true,
  });

  const booking = await prisma.booking.findUnique({
    where: { booking_pk: bookingId, booking_guest_fk: user.user_pk },
    include: {
      booking_listing: true,
    },
  });

  if (!booking) {
    notFound();
  }

  const listing = await getListingByPk(booking.booking_listing_fk);
  if (!listing) {
    notFound();
  }

  return {
    ...booking,
    booking_listing: listing,
    booking_guest: user,
  };
}
