import { Home, MapPin } from "lucide-react";

import type { FullBooking } from "@/app/features/bookings/types/full-booking";

import ListingBadgeList from "@/app/features/listings/components/listing-badge-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { PropertyImages } from "./property-images";

export function AccommodationCard({ booking }: { booking: NonNullable<FullBooking> }) {
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
