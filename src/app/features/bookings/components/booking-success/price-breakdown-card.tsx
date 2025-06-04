import type { FullBooking } from "@/app/features/bookings/types/full-booking";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { PriceRow } from "./price-row";

export function PriceBreakdownCard({ booking }: { booking: NonNullable<FullBooking> }) {
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
