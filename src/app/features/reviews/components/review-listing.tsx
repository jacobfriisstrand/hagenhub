import type { ReviewType } from "@/app/features/reviews/types/review-type";

import { DynamicIcon } from "@/components/dynamic-icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import prisma from "@/lib/prisma";

type ListingReviewsProps = {
  reviews: ReviewType[] | null;
};

export default async function ListingReviews({ reviews }: ListingReviewsProps) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-left text-gray-500 py-8">
        No reviews available
      </div>
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      user_pk: reviews[0].review_user_fk,
    },
  });

  console.log("user", user?.user_last_name);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      {reviews.map(review => (
        <Card key={review.review_pk} className="border-0 shadow-none p-0">
          <CardContent className="p-0">
            <div className="flex items-start gap-4">
              <Avatar className="w-12 h-12">
                <AvatarImage className="object-cover" src={user?.user_avatar_url || ""} alt={review.review_booking_fk} />
                <AvatarFallback className="bg-gray-500 text-white font-semibold ">
                  {user?.user_first_name?.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-base">
                    {user?.user_first_name}
                    {" "}
                    {user?.user_last_name}
                  </h4>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array.from({ length: 5 })].map((_, i) => (
                    <DynamicIcon
                      name="star"
                      key={i}
                      className={`w-3 h-3 ${
                        i < review.review_rating ? "fill-black text-black" : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">{review.review_created_at.toLocaleDateString()}</span>
                </div>

                <p className="text-sm text-gray-800 leading-relaxed">{review.review_comment}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
