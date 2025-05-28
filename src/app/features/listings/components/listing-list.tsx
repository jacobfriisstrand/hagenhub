import type { FullListing } from "@/app/features/listings/types";

import ListingCard from "@/app/features/listings/components/listing-card";

export default function ListingList({ listings }: { listings: FullListing[] }) {
  return (
    <ul className="responsive-grid gap-6">
      {listings.map(listing => (
        <li className="contents" key={listing.listing_pk}>
          <ListingCard listing={listing} />
        </li>
      ))}
    </ul>
  );
}
