"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { EditListingFormValues } from "@/app/features/listings/schemas/edit-listing-schema";
import type { FullListing } from "@/app/features/listings/types/full-listing-type";

import { deleteListingImage } from "@/app/features/listings/actions/delete-listing-image";
import { updateListing } from "@/app/features/listings/actions/update-listing";
import { updateListingImages } from "@/app/features/listings/actions/update-listing-images";
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
  const [isDeletingImage, setIsDeletingImage] = useState<string | null>(null);

  const form = useForm<EditListingFormValues>({
    resolver: zodResolver(EditListingSchema),
    defaultValues: {
      listing_title: listing.listing_title,
      listing_description: listing.listing_description,
      listing_night_price: listing.listing_night_price,
      listing_guest_count: listing.listing_guest_count,
      listing_bedrooms: listing.listing_bedrooms,
      listing_image_url: null,
    },
  });

  async function onSubmit(data: EditListingFormValues) {
    setIsLoading(true);
    try {
      // Update listing details
      const result = await updateListing(listing.listing_pk, {
        listing_title: data.listing_title,
        listing_description: data.listing_description,
        listing_night_price: data.listing_night_price,
        listing_guest_count: data.listing_guest_count,
        listing_bedrooms: data.listing_bedrooms,
      });

      if (result.error) {
        toast.error(result.error);
        return;
      }

      // Handle image upload if there are new images
      if (data.listing_image_url instanceof FileList && data.listing_image_url.length > 0) {
        const imageFormData = new FormData();
        Array.from(data.listing_image_url).forEach((file) => {
          imageFormData.append("images", file);
        });

        const imageResult = await updateListingImages(listing.listing_pk, imageFormData);
        if (imageResult.error) {
          toast.error(imageResult.error);
          return;
        }
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

  async function handleDeleteImage(image_pk: string) {
    setIsDeletingImage(image_pk);
    try {
      const result = await deleteListingImage(image_pk);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success("Image deleted successfully");
      router.refresh();
    }
    catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image");
    }
    finally {
      setIsDeletingImage(null);
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

        <FormGroup title="Images" description="Manage your listing images">
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {listing.listing_images.map(image => (
                <div key={image.listing_image_pk} className="relative aspect-video group">
                  <Image
                    src={image.listing_image_url}
                    alt="Listing image"
                    fill
                    className="object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity focus-visible:opacity-100 focus-visible:ring-1 focus-visible:ring-ring"
                    onClick={() => handleDeleteImage(image.listing_image_pk)}
                    disabled={isDeletingImage === image.listing_image_pk || listing.listing_images.length <= 1}
                    isLoading={isDeletingImage === image.listing_image_pk}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <FormField
              control={form.control}
              name="listing_image_url"
              render={({ field: { onChange, value, ...field } }) => (
                <FormGroup title="Add More Images" description="Upload additional images to your listing">
                  <FormControl>
                    <div className="space-y-2">
                      <Input
                        type="file"
                        multiple
                        accept="image/jpeg,image/png,image/webp"
                        onChange={(e) => {
                          const files = e.target.files;
                          if (files) {
                            onChange(files);
                          }
                        }}
                        {...field}
                      />
                      <p className="text-sm text-muted-foreground">
                        Supported formats: JPG, PNG, WebP
                      </p>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormGroup>
              )}
            />
          </div>
        </FormGroup>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            isLoading={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            isLoading={isLoading}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
}
