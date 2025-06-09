import type { ReviewType } from "@/app/features/reviews/types/review-type";

import prisma from "@/lib/prisma";

export async function getReviewByFk(listing_pk: string): Promise<ReviewType[]> {
  const reviews = await prisma.review.findMany({
    where: {
      review_listing_fk: listing_pk,
    },
  });

  return reviews;
}
