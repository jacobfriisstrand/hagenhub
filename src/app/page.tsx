import { getCurrentUser } from "@/app/(auth)/current-user";
import { getAllListings } from "@/app/features/listings/actions/add-listing/get-all-listings";
import ListingList from "@/app/features/listings/components/listing-list";
import HeroSection from "@/components/hero-section";

export default async function Home() {
  const listings = await getAllListings();
  const user = await getCurrentUser({
    withFullUser: false,
    redirectIfNotFound: false,
  });

  return (
    <>
      <HeroSection />
      <ListingList listings={listings} user={user} />
    </>
  );
}
