import prisma from "@/lib/prisma";

export async function hasBookings(user_pk: string) {
  const count = await prisma.booking.count({
    where: {
      booking_guest_fk: user_pk,
    },
  });

  return count > 0;
}
