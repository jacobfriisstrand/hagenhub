"use client";

import type { FullListing } from "@/app/features/listings/types/full-listing-type";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import EditListingForm from "./edit-listing-form";

type EditListingModalProps = {
  listing: FullListing;
  isOpen: boolean;
  onClose: () => void;
};

export default function EditListingModal({ listing, isOpen, onClose }: EditListingModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Listing</DialogTitle>
        </DialogHeader>
        <EditListingForm listing={listing} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}
