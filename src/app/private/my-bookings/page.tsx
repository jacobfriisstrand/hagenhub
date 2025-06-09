import getBookingsByPk from "@/app/features/bookings/actions/get-bookings-by-pk";
import BookingsList from "@/app/features/bookings/components/bookings-list";
import { checkBookingReview } from "@/app/features/reviews/actions/check-booking-review";
import PageTitle from "@/components/page-title";

export default async function MyBookingsPage() {
  const bookings = await getBookingsByPk();
  const bookingsWithReviewStatus = await Promise.all(
    bookings.map(async (booking) => {
      const reviewStatus = await checkBookingReview(booking.booking_pk, booking.booking_guest.user_pk);
      return {
        booking,
        hasReviewed: reviewStatus.hasReviewed,
        review: reviewStatus.review,
      };
    }),
  );

  return (
    <>
      <PageTitle as="h1" className="text-md font-bold tracking-tight sm:text-xl md:text-xl mb-4 flex justify-start">
        My Bookings
      </PageTitle>
      <BookingsList bookings={bookingsWithReviewStatus} />
    </>
  );
}
