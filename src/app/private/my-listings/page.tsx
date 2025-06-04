import { getCurrentUser } from "@/app/(auth)/current-user";
import ListingList from "@/app/features/listings/components/listing-list";
import { getListingsByUserPk } from "@/app/features/users/actions/get-listings-by-user-pk";
import PageTitle from "@/components/page-title";

export default async function MyListingsPage() {
  const user = await getCurrentUser({
    withFullUser: false,
    redirectIfNotFound: true,
  });

  const listings = await getListingsByUserPk(user.user_pk);

  return (
    <div className="space-y-6">
      <PageTitle as="h1">My Listings</PageTitle>
      {listings.length === 0
        ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">You haven't created any listings yet.</p>
              <a href="/add-listing" className="text-primary hover:underline mt-2 inline-block">
                Create your first listing
              </a>
            </div>
          )
        : (
            <ListingList listings={listings} user={user} />
          )}
    </div>
  );
}
