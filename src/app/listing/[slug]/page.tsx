import { notFound } from "next/navigation";

import { getListingByPk } from "@/app/features/listings/actions/get-listing-by-pk";
import ListingBadgeList from "@/app/features/listings/components/listing-badge-list";
import ListingImageCarousel from "@/app/features/listings/components/listing-image-carousel";

type ListingPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ListingPage({ params }: ListingPageProps) {
  const resolvedParams = await params;
  const listing = await getListingByPk(resolvedParams.slug);

  if (!listing) {
    notFound();
  }

  return (
    <section className="space-y-5">
      <ListingImageCarousel className="rounded-lg overflow-hidden shadow-lg" images={listing.listing_images} />
      <div className="flex flex-col gap-2 md:flex-row md:justify-between items-center">
        <h1 className="text-base md:text-2xl font-medium">{listing.listing_title}</h1>
        <p className="md:text-lg">
          {listing.listing_night_price}
          {" "}
          DKK per night
        </p>
      </div>
      <ListingBadgeList size="text-sm md:text-md" listing={listing} />
      <p className="text-sm md:text-lg">{listing.listing_description}</p>
    </section>
  );
}
