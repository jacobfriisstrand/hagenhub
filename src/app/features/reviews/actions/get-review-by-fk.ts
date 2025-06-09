import prisma from "@/lib/prisma";

import type { ReviewType } from "../types/review-type";

export async function getReviewByFk(listing_pk: string): Promise<ReviewType[]> {
  const reviews = await prisma.review.findMany({
    where: {
      review_listing_fk: listing_pk,
    },
  });

  return reviews;
}
