import { getAllListings } from "@/app/features/listings/actions/add-listing/get-all-listings";
import ListingList from "@/app/features/listings/components/listing-list";
import HeroSection from "@/components/hero-section";

export default async function Home() {
  const listings = await getAllListings();

  return (
    <>
      <HeroSection />
      <ListingList listings={listings} />
    </>
  );
}
