import ListingList from "@/app/features/listings/components/listing-list";
import PageTitle from "@/components/page-title";

import getListingBySearch from "../features/listings/actions/get-listing-by-search";

type SearchPageProps = {
  searchParams: Promise<{ search: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { search } = await searchParams;
  const searchListings = await getListingBySearch(search);
  return (
    <section className="space-y-10">
      <PageTitle as="h1">
        Search results for "
        {search}
        "
      </PageTitle>
      <ListingList listings={searchListings} />
    </section>
  );
}
