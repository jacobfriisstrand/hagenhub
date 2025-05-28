import { ArrowRight } from "lucide-react";
import Link from "next/link";

import type { FullListing } from "@/app/features/listings/types";

import ListingBadgeList from "@/app/features/listings/components/listing-badge-list";
import ListingImageCarousel from "@/app/features/listings/components/listing-image-carousel";
import { Button } from "@/components/ui/button/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ListingCard({ listing }: { listing: FullListing }) {
  return (
    <Card as="article" className="p-0 pb-6 gap-2 grid-rows-subgrid justify-between shadow-sm">
      <ListingImageCarousel className="h-48 w-full overflow-hidden rounded-t-xl" images={listing.listing_images} />
      <CardHeader className="gap-3">
        <ListingBadgeList listing={listing} />
        <div>
          <h3 className="text-base md:text-lg font-bold">{listing.listing_title}</h3>
          <p className="text-sm text-muted-foreground">{listing.listing_area.listing_area_name}</p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{listing.listing_description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm font-medium">
          {listing.listing_night_price}
          {" "}
          DKK per night
        </p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="icon" size="icon" asChild>
                <Link href={`/listing/${listing.listing_pk}`}>
                  <ArrowRight className="text-primary" size={20} />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View listing</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
}
