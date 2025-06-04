import { CalendarDays, Clock, Users } from "lucide-react";

import type { FullBooking } from "@/app/features/bookings/types/full-booking";

import { Badge } from "@/components/ui/badge/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { InfoItem } from "./info-item";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BookingDetailsCard({ booking }: { booking: NonNullable<FullBooking> }) {
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
