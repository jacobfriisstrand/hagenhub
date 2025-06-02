import ListingList from "@/app/features/listings/components/listing-list";

import getListingBySearch from "../features/listings/actions/get-listing-by-search";

type SearchPageProps = {
  searchParams: { search: string };
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { search } = await searchParams;
  const searchListings = await getListingBySearch(search);
  return <ListingList listings={searchListings} />;
}
