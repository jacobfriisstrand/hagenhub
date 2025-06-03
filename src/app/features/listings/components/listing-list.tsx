import type { User } from "@/app/(auth)/current-user";
import type { FullListing } from "@/app/features/listings/types/full-listing-type";

import ListingCard from "@/app/features/listings/components/listing-card";

type ListingListProps = {
  listings: FullListing[];
  user?: User | null;
};

export default function ListingList({ listings, user }: ListingListProps) {
  return (
    <ul className="responsive-grid gap-6">
      {listings.map(listing => (
        <li className="contents" key={listing.listing_pk}>
          <ListingCard listing={listing} user={user} />
        </li>
      ))}
    </ul>
  );
}
