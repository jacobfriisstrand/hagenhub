"use server";

import prisma from "@/lib/prisma";

export async function checkBookingReview(bookingId: string, userId: string) {
  const review = await prisma.review.findFirst({
    where: {
      review_booking_fk: bookingId,
      review_user_fk: userId,
    },
  });

  return {
    hasReviewed: !!review,
    review: review
      ? {
          rating: review.review_rating,
          comment: review.review_comment,
        }
      : null,
  };
}
