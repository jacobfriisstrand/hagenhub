"use server";

import prisma from "@/lib/prisma";

type AddReviewProps = {
  review_rating: number;
  review_comment: string;
  review_listing_fk: string;
  review_user_fk: string;
  review_booking_fk: string;
};

export async function addReview({ review_rating, review_comment, review_listing_fk, review_user_fk, review_booking_fk }: AddReviewProps) {
  const review = await prisma.review.create({
    data: {
      review_booking_fk,
      review_rating,
      review_user_fk,
      review_listing_fk,
      review_comment,
      review_created_at: new Date(),
    },
  });
  return review;
}
