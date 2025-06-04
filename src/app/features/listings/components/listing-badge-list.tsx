import type { FullListing } from "@/app/features/listings/types/full-listing-type";

import ListingBadge from "@/app/features/listings/components/listing-badge";
import { cn } from "@/lib/utils";

type ListingBadgeListProps = {
  listing: FullListing;
  size?: string;
  className?: string;
};

export default function ListingBadgeList({ listing, size, className }: ListingBadgeListProps) {
  return (
    <ul className={cn("flex gap-2 flex-wrap", className)}>
      <ListingBadge size={size} text={`${listing.listing_bedrooms} ${listing.listing_bedrooms === 1 ? "bedroom" : "bedrooms"}`} icon="bed" />
      <ListingBadge size={size} text={`${listing.listing_guest_count} guests`} icon="user" />
      <ListingBadge size={size} text={listing.listing_type.listing_type_name} icon={listing.listing_type.listing_type_icon} />
    </ul>
  );
}
