import { CheckCircle } from "lucide-react";

import PageTitle from "@/components/page-title";

export function BookingConfirmationHeader({
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
