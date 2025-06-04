import { notFound } from "next/navigation";

import { getBookingByPk } from "@/app/features/bookings/actions/get-booking-by-pk";
import {
  AccommodationCard,
  BookingConfirmationHeader,
  BookingDetailsCard,
  BookingReferenceCard,
  NextStepsCard,
  PriceBreakdownCard,
} from "@/app/features/bookings/components/booking-success";

type BookingSuccessPageProps = {
  params: Promise<{
    bookingPk: string;
  }>;
};

export default async function page({ params }: BookingSuccessPageProps) {
  const resolvedParams = await params;
  const booking = await getBookingByPk(resolvedParams.bookingPk);

  if (!booking) {
    return notFound();
  }

  return (
    <section className="space-y-12">
      <div>
        <BookingConfirmationHeader
          guestName={booking.booking_guest.user_first_name}
          listingTitle={booking.booking_listing.listing_title}
        />
      </div>
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <BookingDetailsCard booking={booking} />
            <AccommodationCard booking={booking} />
            <NextStepsCard booking={booking} />
          </div>
          <div className="space-y-6 md:sticky md:top-25 md:h-fit">
            <PriceBreakdownCard booking={booking} />
            <BookingReferenceCard bookingPk={booking.booking_pk} />
          </div>
        </div>
      </div>
    </section>
  );
}
