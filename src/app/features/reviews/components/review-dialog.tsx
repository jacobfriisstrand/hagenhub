"use client";

import type { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { BookingWithListing } from "@/app/features/bookings/types/booking-with-listing";
import type { ReviewType } from "@/app/features/reviews/types/review-type";

import { addReview } from "@/app/features/reviews/actions/add-review";
import { DynamicIcon } from "@/components/dynamic-icon";
import { Button } from "@/components/ui/button/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form/form";
import { Textarea } from "@/components/ui/textarea";
import { ReviewSchema } from "@/prisma/generated/zod";

type ReviewDialogProps = {
  hasReviewed: boolean;
  booking: BookingWithListing;
  review?: ReviewType;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const reviewSchema = ReviewSchema.pick({
  review_rating: true,
  review_comment: true,
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

export default function ReviewDialog({
  booking,
  hasReviewed,
  review,
  isOpen,
  setIsOpen,
}: ReviewDialogProps) {
  const [currentRating, setCurrentRating] = useState(review?.review_rating || 0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      review_rating: review?.review_rating || 0,
      review_comment: review?.review_comment || "",
    },
  });

  const handleSubmitReview = async (data: ReviewFormValues) => {
    await addReview({
      review_rating: data.review_rating,
      review_comment: data.review_comment,
      review_listing_fk: booking.booking_listing.listing_pk,
      review_user_fk: booking.booking_guest.user_pk,
      review_booking_fk: booking.booking_pk,
    });
    toast.success("Review added");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {!hasReviewed
          ? (
              <Button
                variant="outline"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Leave a Review
              </Button>
            )
          : (
              <Button
                variant="ghost"
                className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={true}
              >
                Reviewed
              </Button>
            )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Review your stay at
            {" "}
            {booking.booking_listing.listing_title}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmitReview)}>
            <FormField
              control={form.control}
              name="review_rating"
              render={({ field }) => (
                <FormItem className="py-4">
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <div className="flex justify-center gap-2 mb-6">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Button
                          key={star}
                          type="button"
                          onClick={() => {
                            setCurrentRating(star);
                            field.onChange(star);
                          }}
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                          className="focus:outline-none"
                        >
                          <DynamicIcon
                            name="star"
                            className={`w-8 h-8 ${
                              (hoveredRating ? star <= hoveredRating : star <= currentRating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        </Button>
                      ))}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="review_comment"
              render={({ field }) => (
                <FormItem className="py-4">
                  <FormLabel>Comment</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Write your review here" className="w-full" />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" onClick={() => setIsOpen(false)}>Submit Review</Button>
          </form>
        </Form>

      </DialogContent>
    </Dialog>
  );
}
