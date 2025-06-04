import Link from "next/link";

import type { FullBooking } from "@/app/features/bookings/types/full-booking";

import { Button } from "@/components/ui/button/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { InfoCard } from "./info-card";

export function NextStepsCard({ booking }: { booking: NonNullable<FullBooking> }) {
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
