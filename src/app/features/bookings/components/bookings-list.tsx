import type { BookingWithListing } from "@/app/features/bookings/types/booking-with-listing";

import BookingCard from "@/app/features/bookings/components/booking-card";

type HostInfo = {
  user_pk: string;
  user_first_name: string;
  user_avatar_url: string | null;
};

type BookingsListProps = {
  bookings: {
    booking: BookingWithListing;
    hasReviewed: boolean;
    review: { rating: number; comment: string | null } | null;
    host: HostInfo;
  }[];
  viewType?: "guest" | "host";
};

export default function BookingsList({ bookings, viewType = "guest" }: BookingsListProps) {
  return (
    <>
      <ul className="responsive-grid gap-6">
        {bookings.map(booking => (
          <li className="contents" key={booking.booking.booking_pk}>
            <BookingCard
              booking={booking.booking}
              review={booking.review
                ? {
                    review_pk: "",
                    review_rating: booking.review.rating,
                    review_comment: booking.review.comment || "",
                    review_created_at: new Date(),
                    review_listing_fk: booking.booking.booking_listing.listing_pk,
                    review_user_fk: booking.booking.booking_guest.user_pk,
                    review_booking_fk: booking.booking.booking_pk,
                  }
                : null}
              host={viewType === "guest" ? booking.host : booking.booking.booking_guest}
              viewType={viewType}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
