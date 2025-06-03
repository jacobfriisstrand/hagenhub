import { CalendarDays, CheckCircle, Clock, Home, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

import type { FullBooking } from "@/app/features/bookings/types/full-booking";

import { getBookingByPk } from "@/app/features/bookings/actions/get-booking-by-pk";
import ListingBadgeList from "@/app/features/listings/components/listing-badge-list";
import PageTitle from "@/components/page-title";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type BookingSuccessPageProps = {
  params: Promise<{
    bookingPk: string;
  }>;
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Main Page Component
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
          <div className="space-y-6 md:sticky md:top-6 md:h-fit">
            <PriceBreakdownCard booking={booking} />
            <BookingReferenceCard bookingPk={booking.booking_pk} />
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoItem({
  icon,
  label,
  children,
  primaryText,
  secondaryText,
}: {
  icon?: React.ComponentType<any>;
  label: string;
  children?: React.ReactNode;
  primaryText?: string | number;
  secondaryText?: string;
}) {
  return (
    <div>
      <h3 className="font-semibold text-gray-900">{label}</h3>
      {icon && primaryText && (
        <div className="flex items-center gap-2">
          {icon && React.createElement(icon, { className: "w-4 h-4 text-gray-500" })}
          <span>{primaryText}</span>
        </div>
      )}
      {primaryText && !icon && <p className="text-gray-600">{primaryText}</p>}
      {secondaryText && <p className="text-sm text-gray-500">{secondaryText}</p>}
      {children}
    </div>
  );
}

function PropertyImages({
  images,
  title,
}: {
  images: any[];
  title: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {images.slice(0, 4).map((image, index) => (
        <div key={image.listing_image_pk} className="relative aspect-square rounded-lg overflow-hidden">
          <Image
            src={image.listing_image_url || "/placeholder.svg"}
            alt={`${title} - Image ${index + 1}`}
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}

function PriceRow({
  label,
  amount,
}: {
  label: string;
  amount: string | number;
}) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span>
        {amount}
        {" "}
        DKK
      </span>
    </div>
  );
}

function InfoCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg">
      <h4 className="font-semibold mb-2">{title}</h4>
      <p className="text-sm">{description}</p>
    </div>
  );
}

function BookingConfirmationHeader({
  guestName,
  listingTitle,
}: {
  guestName: string;
  listingTitle: string;
}) {
  return (
    <div className="text-center space-y-5">
      <div className="flex justify-center">
        <div className="flex items-center justify-center size-10 bg-primary/10 rounded-full">
          <CheckCircle className="size-5 text-primary" />
        </div>
      </div>
      <header>
        <PageTitle as="h1" className="bg-clip-text text-transparent bg-gradient-to-l from-primary/90 to-primary/50">
          Booking confirmed
        </PageTitle>
      </header>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Thank you
        {" "}
        {guestName}
        ! Your reservation for
        {" "}
        <span className="font-semibold text-gray-900">{listingTitle}</span>
        {" "}
        has been successfully confirmed.
      </p>
    </div>
  );
}

function BookingDetailsCard({ booking }: { booking: NonNullable<FullBooking> }) {
  const checkInDate = formatDate(booking.booking_check_in.toISOString());
  const checkOutDate = formatDate(booking.booking_check_out.toISOString());

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarDays className="w-5 h-5" />
          Booking details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <InfoItem label="Check-in" primaryText={checkInDate} secondaryText="After 3:00 PM" />
            <InfoItem
              icon={Users}
              label="Guests"
              primaryText={`${booking.booking_guest_count} guest${booking.booking_guest_count > 1 ? "s" : ""}`}
            />
          </div>
          <div className="space-y-6">
            <InfoItem label="Check-out" primaryText={checkOutDate} secondaryText="Before 11:00 AM" />
            <InfoItem
              icon={Clock}
              label="Duration"
              primaryText={`${booking.booking_night_count} night${booking.booking_night_count > 1 ? "s" : ""}`}
            />
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">Booking status</span>
          <Badge variant={booking.booking_status === "Pending" ? "pending" : "default"}>{booking.booking_status}</Badge>
        </div>
      </CardContent>
    </Card>
  );
}

function AccommodationCard({ booking }: { booking: NonNullable<FullBooking> }) {
  const { booking_listing } = booking;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Home className="w-5 h-5" />
          Your accommodation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{booking_listing.listing_title}</h3>
              <div className="flex gap-2 text-gray-600 mb-3">
                <MapPin className="w-4 h-4" />
                <span>
                  {booking_listing.listing_street_name}
                  {" "}
                  {booking_listing.listing_street_number}
                  ,
                  {" "}
                  {booking_listing.listing_zip_code}
                  {" "}
                  {booking_listing.listing_area.listing_area_name}
                </span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{booking_listing.listing_description}</p>
            </div>

            <ListingBadgeList listing={booking_listing} />
          </div>

          <PropertyImages images={booking_listing.listing_images} title={booking_listing.listing_title} />
        </div>
      </CardContent>
    </Card>
  );
}

function NextStepsCard({ booking }: { booking: NonNullable<FullBooking> }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>What's next?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <InfoCard
          title="Host confirmation"
          description="Your booking request has been sent to the host. They will review and accept your booking soon."
        />
        <Link href={`/bookings/${booking.booking_guest.user_pk}`}>
          <Button>View your bookings</Button>
        </Link>
      </CardContent>
    </Card>
  );
}

function PriceBreakdownCard({ booking }: { booking: NonNullable<FullBooking> }) {
  const totalCost = booking.booking_listing.listing_night_price * booking.booking_night_count;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Price breakdown</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <PriceRow
          label={`${booking.booking_listing.listing_night_price} × ${booking.booking_night_count} night${booking.booking_night_count > 1 ? "s" : ""}`}
          amount={totalCost}
        />
        <Separator />
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>
            {totalCost}
            {" "}
            DKK
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function BookingReferenceCard({ bookingPk }: { bookingPk: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking reference</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500 mb-1">Reference Number</p>
          <p className="font-mono text-sm font-semibold break-all">{bookingPk}</p>
        </div>
        <p className="text-xs text-gray-500 mt-2">Keep this reference number for your records</p>
      </CardContent>
    </Card>
  );
}
