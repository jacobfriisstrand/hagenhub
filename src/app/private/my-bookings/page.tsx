import { getCurrentUser } from "@/app/(auth)/current-user";
import getBookingsByPk from "@/app/features/bookings/actions/get-bookings-by-pk";
import getHostBookings from "@/app/features/bookings/actions/get-host-bookings";
import BookingsList from "@/app/features/bookings/components/bookings-list";
import { checkBookingReview } from "@/app/features/reviews/actions/check-booking-review";
import { getUserByPk } from "@/app/features/users/actions/get-user-by-pk";
import { hasListings } from "@/app/features/users/actions/has-listings";
import PageTitle from "@/components/page-title";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type BookingWithReviewStatus = {
  booking: Awaited<ReturnType<typeof getBookingsByPk>>[number];
  hasReviewed: boolean;
  review: { rating: number; comment: string | null } | null;
  host: {
    user_pk: string;
    user_first_name: string;
    user_avatar_url: string | null;
  };
};

export default async function MyBookingsPage() {
  const user = await getCurrentUser({
    withFullUser: true,
    redirectIfNotFound: true,
  });

  const hasUserListings = await hasListings(user.user_pk);

  // Get guest bookings
  const guestBookings = await getBookingsByPk();
  const guestBookingsWithReviewStatus = await Promise.all(
    guestBookings.map(async (booking) => {
      const reviewStatus = await checkBookingReview(booking.booking_pk, booking.booking_guest.user_pk);
      const host = await getUserByPk(booking.booking_listing.listing_user_fk);
      return {
        booking,
        hasReviewed: reviewStatus.hasReviewed,
        review: reviewStatus.review,
        host,
      };
    }),
  );

  // Get host bookings if user has listings
  let hostBookingsWithReviewStatus: BookingWithReviewStatus[] = [];
  if (hasUserListings) {
    const hostBookings = await getHostBookings();

    hostBookingsWithReviewStatus = await Promise.all(
      hostBookings.map(async (booking) => {
        const reviewStatus = await checkBookingReview(booking.booking_pk, booking.booking_guest.user_pk);
        return {
          booking,
          hasReviewed: reviewStatus.hasReviewed,
          review: reviewStatus.review,
          host: booking.booking_guest,
        };
      }),
    );
  }

  return (
    <>
      <PageTitle as="h1" className="mb-4">
        My bookings
      </PageTitle>

      <Tabs defaultValue="guest" className="w-full">
        <TabsList className="ml-auto">
          <TabsTrigger value="guest">View as guest</TabsTrigger>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <TabsTrigger
                    value="host"
                    disabled={!hasUserListings}
                  >
                    View as host
                  </TabsTrigger>
                </div>
              </TooltipTrigger>
              {!hasUserListings && (
                <TooltipContent>
                  <p>Create a listing to see bookings as a host</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </TabsList>

        <TabsContent value="guest">
          <BookingsList bookings={guestBookingsWithReviewStatus} viewType="guest" />
        </TabsContent>

        <TabsContent value="host">
          {hasUserListings
            ? (
                <BookingsList bookings={hostBookingsWithReviewStatus} viewType="host" />
              )
            : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">You haven't created any listings yet.</p>
                  <a href="/add-listing" className="text-primary hover:underline mt-2 inline-block">
                    Create your first listing
                  </a>
                </div>
              )}
        </TabsContent>
      </Tabs>
    </>
  );
}
