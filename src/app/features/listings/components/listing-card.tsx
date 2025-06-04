"use client";

import { ArrowRight, Pencil } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import type { User } from "@/app/(auth)/current-user";
import type { FullListing } from "@/app/features/listings/types/full-listing-type";

import DeleteListingDialog from "@/app/features/listings/components/delete-listing-dialog";
import EditListingModal from "@/app/features/listings/components/edit-listing/edit-listing-modal";
import ListingBadgeList from "@/app/features/listings/components/listing-badge-list";
import ListingImageCarousel from "@/app/features/listings/components/listing-image-carousel";
import { Button } from "@/components/ui/button/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ListingCardProps = {
  listing: FullListing;
  user?: User | null;
};

export default function ListingCard({ listing, user }: ListingCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const isOwner = user?.user_pk === listing.listing_user_fk;

  return (
    <>
      <Card as="article" className="p-0 pb-6 gap-2 grid-rows-subgrid justify-between shadow-sm">
        <ListingImageCarousel className="h-48 w-full overflow-hidden rounded-t-xl" images={listing.listing_images} />
        <CardHeader className="gap-3 px-4">
          <ListingBadgeList listing={listing} />
          <div>
            <h3 className="text-base md:text-lg font-bold">{listing.listing_title}</h3>
            <p className="text-sm text-muted-foreground">{listing.listing_area.listing_area_name}</p>
          </div>
        </CardHeader>
        <CardContent className="flex justify-between items-center px-4">
          <p className="text-sm font-medium">
            {listing.listing_night_price}
            {" "}
            DKK per night
          </p>
          <div className="flex gap-2">
            {isOwner && (
              <>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="icon" size="icon" onClick={() => setIsEditModalOpen(true)}>
                        <Pencil className="text-primary" size={20} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Edit listing</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DeleteListingDialog listingId={listing.listing_pk} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete listing</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </>
            )}
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
          </div>
        </CardContent>
      </Card>
      {isOwner && (
        <EditListingModal
          listing={listing}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </>
  );
}
