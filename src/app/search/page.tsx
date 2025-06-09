import getListingBySearch from "@/app/features/listings/actions/get-listing-by-search";
import ListingList from "@/app/features/listings/components/listing-list";
import PageTitle from "@/components/page-title";

type SearchPageProps = {
  searchParams: Promise<{ search: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { search } = await searchParams;
  const searchListings = await getListingBySearch(search);
  return (
    <>
      <PageTitle as="h1" className="text-md font-bold tracking-tight sm:text-xl md:text-xl mb-4 flex justify-start">
        Search Results for
        {" "}
        {search}
      </PageTitle>
      <ListingList listings={searchListings} />
    </>
  );
}
