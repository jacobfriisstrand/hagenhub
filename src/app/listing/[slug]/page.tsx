import { notFound } from "next/navigation";

import BookListingForm from "@/app/features/bookings/components/book-listing-form";
import { getListingByPk } from "@/app/features/listings/actions/add-listing/get-listing-by-pk";
import ListingBadgeList from "@/app/features/listings/components/listing-badge-list";
import ListingImageCarousel from "@/app/features/listings/components/listing-image-carousel";
import PageTitle from "@/components/page-title";
import { Separator } from "@/components/ui/separator";

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
    <section className="space-y-5 md:space-y-10">
      <ListingImageCarousel priority className="rounded-lg overflow-hidden shadow-lg" images={listing.listing_images} />
      <div className="space-y-5">
        <div className="flex flex-col gap-1 md:flex-row md:justify-between md:items-center">
          <PageTitle as="h1">{listing.listing_title}</PageTitle>
          {/* TODO: Add rating */}
          <p className="text-red-500">Add rating here</p>
        </div>
        <ListingBadgeList size="text-sm md:text-md" listing={listing} />
      </div>
      <Separator className="my-5 md:my-10" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_0.5fr]">
        <p className="md:text-lg">{listing.listing_description}</p>
        <BookListingForm
          price={listing.listing_night_price}
          guestCount={listing.listing_guest_count}
          listingId={listing.listing_pk}
        />
      </div>
      <Separator className="my-10" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <PageTitle as="h2">Reviews</PageTitle>
          {/* TODO: Add review carousel here */}
          <p className="text-red-500">Add review carousel here</p>
        </div>
      </div>
    </section>
  );
}
