import { notFound } from "next/navigation";

import BookListingForm from "@/app/features/bookings/components/book-listing-form";
import { getListingByPk } from "@/app/features/listings/actions/add-listing/get-listing-by-pk";
import ListingBadgeList from "@/app/features/listings/components/listing-badge-list";
import ListingImageCarousel from "@/app/features/listings/components/listing-image-carousel";
import { getReviewByFk } from "@/app/features/reviews/actions/get-review-by-fk";
import ListingReviews from "@/app/features/reviews/components/review-listing";
import { DynamicIcon } from "@/components/dynamic-icon";
import PageTitle from "@/components/page-title";
import { Separator } from "@/components/ui/separator";

type ListingPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ListingPage({ params }: ListingPageProps) {
  const resolvedParams = await params;
  const [listing, reviews] = await Promise.all([
    getListingByPk(resolvedParams.slug),
    getReviewByFk(resolvedParams.slug),
  ]);

  if (!listing) {
    notFound();
  }

  return (
    <section className="space-y-5 md:space-y-10">
      <ListingImageCarousel priority className="rounded-lg overflow-hidden shadow-lg max-h-[600px]" images={listing.listing_images} />
      <div className="space-y-5">
        <div className="flex flex-col gap-1 md:flex-row md:justify-between md:items-center">
          <PageTitle as="h1">{listing.listing_title}</PageTitle>
          <div className="flex flex-row gap-1 items-center">
            {listing.listing_reviews && listing.listing_reviews.length > 0 && (
              <>
                <p className="text-sm text-muted-foreground flex flex-row gap-1 items-center">
                  <DynamicIcon name="star" className="w-4 h-4" />
                  {listing.listing_reviews.reduce((acc, review) => acc + review.review_rating, 0) / listing.listing_reviews.length}
                </p>
                <DynamicIcon name="dot" className="w-3 h-3 p-0" />
              </>
            )}
            <p className="text-sm text-muted-foreground">
              {listing.listing_reviews && listing.listing_reviews.length === 0
                ? "No reviews"
                : listing.listing_reviews && listing.listing_reviews.length === 1
                  ? "1 review"
                  : `${listing.listing_reviews && listing.listing_reviews.length} reviews`}
            </p>
          </div>
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
        <div className="py-4">
          <PageTitle className="mb-4" as="h2">Reviews</PageTitle>
          {reviews
            ? (
                <ListingReviews reviews={reviews} />
              )
            : (
                <p className="text-sm text-muted-foreground">No reviews</p>
              )}
        </div>
      </div>
    </section>
  );
}
