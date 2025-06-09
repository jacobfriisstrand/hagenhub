"use client";
import { format } from "date-fns";
import { useState } from "react";

import type { BookingWithListing } from "@/app/features/bookings/types/booking-with-listing";
import type { ReviewType } from "@/app/features/reviews/types/review-type";

import ListingImageCarousel from "@/app/features/listings/components/listing-image-carousel";
import ReviewDialog from "@/app/features/reviews/components/review-dialog";
import { DynamicIcon } from "@/components/dynamic-icon";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type BookingProps = {
  booking: BookingWithListing;
  review: ReviewType | null;
};

export default function BookingCard({ booking, review }: BookingProps) {
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);

  const hasReviewed = review !== null;

  return (
    <Card as="article" className="p-0 pb-2 gap-2 grid grid-rows-[auto_1fr] shadow-sm">
      <div>
        <div className="relative">
          <ListingImageCarousel className="h-48 w-full overflow-hidden rounded-t-xl" images={booking.booking_listing.listing_images} />
          <div className="absolute top-2 right-2">
            <span className="text-sm bg-gray-400 text-white px-2 py-1 rounded-md">{booking.booking_status}</span>
          </div>
        </div>
        <CardHeader className="gap-3 px-4 py-2">
          <div>
            <h3 className="text-base md:text-lg font-bold">{booking.booking_listing.listing_area.listing_area_name}</h3>
            <p className="text-sm text-muted-foreground">{booking.booking_listing.listing_title}</p>
            <p className="text-sm text-muted-foreground pt-6 flex items-center gap-1">
              <DynamicIcon name="calendar" className="w-4 h-4" />
              {format(booking.booking_check_in, "MMM d, yyyy")}
              {" "}
              -
              {format(booking.booking_check_out, "MMM d, yyyy")}
            </p>
          </div>
        </CardHeader>
      </div>
      <CardContent className="grid grid-cols-2 gap-2 items-center px-4 border-t border-border pt-4 pb-2">
        <p className="text-sm font-medium">
          {booking.booking_listing.listing_night_price}
          {" "}
          kr
          {" "}
          <span className="text-sm font-normal text-muted-foreground">/night</span>
        </p>
        <div className="flex justify-end">
          {booking.booking_status === "Completed" && (
            <ReviewDialog
              booking={booking}
              hasReviewed={hasReviewed}
              review={review ?? undefined}
              isOpen={isReviewDialogOpen}
              setIsOpen={setIsReviewDialogOpen}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
