"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { EditListingFormValues } from "@/app/features/listings/schemas/edit-listing-schema";
import type { FullListing } from "@/app/features/listings/types/full-listing-type";

import { updateListing } from "@/app/features/listings/actions/update-listing";
import { EditListingSchema } from "@/app/features/listings/schemas/edit-listing-schema";
import { Button } from "@/components/ui/button/button";
import { Form, FormControl, FormField, FormMessage } from "@/components/ui/form/form";
import { FormGroup } from "@/components/ui/form/form-group";
import { Input } from "@/components/ui/input";
import { NumberInput } from "@/components/ui/number-input";
import { Textarea } from "@/components/ui/textarea";

type EditListingFormProps = {
  listing: FullListing;
  onClose: () => void;
};

export default function EditListingForm({ listing, onClose }: EditListingFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<EditListingFormValues>({
    resolver: zodResolver(EditListingSchema),
    defaultValues: {
      listing_title: listing.listing_title,
      listing_description: listing.listing_description,
      listing_night_price: listing.listing_night_price,
      listing_guest_count: listing.listing_guest_count,
      listing_bedrooms: listing.listing_bedrooms,
    },
  });

  async function onSubmit(data: EditListingFormValues) {
    setIsLoading(true);
    try {
      const result = await updateListing(listing.listing_pk, data);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success("Listing updated successfully");
      router.refresh();
      onClose();
    }
    catch (error) {
      console.error("Error updating listing:", error);
      toast.error("Failed to update listing");
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col">
        <FormField
          control={form.control}
          name="listing_title"
          render={({ field }) => (
            <FormGroup title="Title" description="The title of your listing" className="gap-1">
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="listing_description"
          render={({ field }) => (
            <FormGroup title="Description" description="Describe your listing" className="gap-1">
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="listing_night_price"
          render={({ field }) => (
            <FormGroup title="Price per night" description="The price per night in DKK" className="gap-1">
              <FormControl>
                <Input
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      field.onChange(value === "" ? 0 : Number(value));
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="listing_guest_count"
          render={({ field }) => (
            <FormGroup title="Guest count" description="Maximum number of guests" className="gap-1">
              <FormControl>
                <NumberInput field={field} min={1} />
              </FormControl>
              <FormMessage />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="listing_bedrooms"
          render={({ field }) => (
            <FormGroup title="Bedrooms" description="Number of bedrooms" className="gap-1">
              <FormControl>
                <NumberInput field={field} min={1} />
              </FormControl>
              <FormMessage />
            </FormGroup>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
}
