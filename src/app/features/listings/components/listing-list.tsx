<<<<<<< HEAD
import type { User } from "@/app/(auth)/current-user";
=======
>>>>>>> bf51935 (32-fe-booklistingform (#142))
import type { FullListing } from "@/app/features/listings/types/full-listing-type";

import ListingCard from "@/app/features/listings/components/listing-card";

<<<<<<< HEAD
type ListingListProps = {
  listings: FullListing[];
  user: User | null;
};

export default function ListingList({ listings, user }: ListingListProps) {
=======
export default function ListingList({ listings }: { listings: FullListing[] }) {
>>>>>>> bf51935 (32-fe-booklistingform (#142))
  return (
    <ul className="responsive-grid gap-6">
      {listings.map(listing => (
        <li className="contents" key={listing.listing_pk}>
<<<<<<< HEAD
          <ListingCard listing={listing} user={user} />
=======
          <ListingCard listing={listing} />
>>>>>>> bf51935 (32-fe-booklistingform (#142))
        </li>
      ))}
    </ul>
  );
}
