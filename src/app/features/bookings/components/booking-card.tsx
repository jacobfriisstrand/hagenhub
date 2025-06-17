"use client";
import { format } from "date-fns";
import Link from "next/link";
import { useState } from "react";

import type { BookingWithListing } from "@/app/features/bookings/types/booking-with-listing";
import type { ReviewType } from "@/app/features/reviews/types/review-type";

import ListingImageCarousel from "@/app/features/listings/components/listing-image-carousel";
import ReviewDialog from "@/app/features/reviews/components/review-dialog";
import { DynamicIcon } from "@/components/dynamic-icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type HostInfo = {
  user_pk: string;
  user_first_name: string;
  user_avatar_url: string | null;
};

type BookingProps = {
  booking: BookingWithListing;
  review: ReviewType | null;
  host: HostInfo;
  viewType: "guest" | "host";
};

export default function BookingCard({ booking, review, host, viewType }: BookingProps) {
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);

  const hasReviewed = review !== null;

  return (
    <Card as="article" className="p-0 pb-2 gap-2 grid grid-rows-[auto_1fr] shadow-sm">
      <div>
        <div className="relative">
          <ListingImageCarousel className="h-48 w-full overflow-hidden rounded-t-xl" images={booking.booking_listing.listing_images} />
          <div className="absolute top-2 right-2">
            <Badge variant={
              booking.booking_status === "Pending"
                ? "pending"
                : booking.booking_status === "Confirmed"
                  ? "default"
                  : booking.booking_status === "Completed"
                    ? "completed"
                    : "destructive"
            }
            >
              {booking.booking_status}
            </Badge>
          </div>
        </div>
        <CardHeader className="gap-3 px-4 py-2">
          <div className="flex items-center gap-2">
            <Avatar className="size-5">
              <AvatarFallback className="bg-blue-50 text-blue-600">
                {host.user_first_name.charAt(0)}
              </AvatarFallback>
              <AvatarImage src={host.user_avatar_url || ""} />
            </Avatar>
            <p className="text-xs font-medium">
              {viewType === "guest" ? "Hosted by" : "Booked by"}
              {" "}
              <Link href={viewType === "guest" ? `/profile/${host.user_pk}` : `/profile/${booking.booking_guest.user_pk}`} className={`hover:underline hover:text-blue-600 transition-colors w-fit ${viewType === "guest" ? "text-blue-600" : "text-blue-600"}`}>{host.user_first_name}</Link>
            </p>
          </div>
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
