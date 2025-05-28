import type { FullListing } from "@/app/features/listings/types";

import ListingBadge from "@/app/features/listings/components/listing-badge";

type ListingBadgeListProps = {
  listing: FullListing;
  size?: string;
};

export default function ListingBadgeList({ listing, size }: ListingBadgeListProps) {
  return (
    <ul className="flex gap-2 flex-wrap mt-3">
      <ListingBadge size={size} text={`${listing.listing_bedrooms} ${listing.listing_bedrooms === 1 ? "bedroom" : "bedrooms"}`} icon="bed" />
      <ListingBadge size={size} text={`${listing.listing_guests} guests`} icon="user" />
      <ListingBadge size={size} text={listing.listing_type.listing_type_name} icon={listing.listing_type.listing_type_icon} />
    </ul>
  );
}
