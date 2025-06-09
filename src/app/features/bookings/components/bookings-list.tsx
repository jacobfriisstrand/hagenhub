import type { BookingWithListing } from "@/app/features/bookings/types/booking-with-listing";

import BookingCard from "@/app/features/bookings/components/booking-card";

type BookingsListProps = {
  bookings: {
    booking: BookingWithListing;
    hasReviewed: boolean;
    review: { rating: number; comment: string | null } | null;
  }[];
};

export default function BookingsList({ bookings }: BookingsListProps) {
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
            />
          </li>
        ))}
      </ul>
    </>
  );
}
