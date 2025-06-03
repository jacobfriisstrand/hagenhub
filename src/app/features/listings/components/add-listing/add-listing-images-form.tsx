"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { useListingStore } from "@/app/add-listing/store";
import { createListing } from "@/app/features/listings/actions/add-listing/create-listing";
import { uploadListingImages } from "@/app/features/listings/actions/add-listing/upload-listing-images";
import FormWrapper from "@/app/features/listings/components/add-listing/add-listing-form-wrapper";
import { Button } from "@/components/ui/button/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form/form";
import { FormGroup } from "@/components/ui/form/form-group";
import { Input } from "@/components/ui/input";

const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const addListingImagesSchema = z.object({
  listing_image_url: z.any().refine(
    (val) => {
      if (!(val instanceof FileList) || val.length === 0) {
        return false;
      }
      return Array.from(val).every(file => ALLOWED_FILE_TYPES.includes(file.type));
    },
    {
      message: "Only JPG, PNG, and WebP images are allowed",
    },
  ),
});

type AddListingImagesFormValues = z.infer<typeof addListingImagesSchema>;

export default function AddListingImagesForm() {
  const router = useRouter();
  const { formData, clearFormData, setListingCreated } = useListingStore();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<AddListingImagesFormValues>({
    resolver: zodResolver(addListingImagesSchema),
    defaultValues: {
      listing_image_url: null,
    },
  });

  const onSubmit = async (data: AddListingImagesFormValues) => {
    try {
      setIsLoading(true);
      // Validate store data
      if (!formData) {
        toast.error("No listing data found. Please start over.");
        setIsLoading(false);
        return;
      }

      // Check for required fields
      const requiredFields = [
        "listing_title",
        "listing_description",
        "listing_type_fk",
        "listing_bedrooms",
        "listing_guests",
        "listing_zip_code",
        "listing_street_name",
        "listing_street_number",
        "listing_area_fk",
      ] as const;

      for (const field of requiredFields) {
        if (!formData[field]) {
          toast.error("Please fill in all required fields before submitting");
          setIsLoading(false);
          return;
        }
      }

      // Create listing first
      const listing = await createListing({
        listing_title: formData.listing_title!,
        listing_description: formData.listing_description!,
        listing_type_fk: formData.listing_type_fk!,
        listing_bedrooms: formData.listing_bedrooms!,
        listing_guests: formData.listing_guests!,
        listing_zip_code: formData.listing_zip_code!,
        listing_street_name: formData.listing_street_name!,
        listing_street_number: formData.listing_street_number!,
        listing_area_fk: formData.listing_area_fk!,
        listing_night_price: formData.listing_night_price || 0,
      });

      if (!listing?.listing_pk) {
        toast.error("Failed to create listing");
        setIsLoading(false);
        return;
      }

      // Upload images
      const imageFormData = new FormData();
      const files = data.listing_image_url as FileList;

      Array.from(files).forEach((file) => {
        imageFormData.append("images", file);
      });

      await uploadListingImages(listing.listing_pk, imageFormData);

      clearFormData();
      setListingCreated(true);
      router.push("/add-listing/success");
    }
    catch (error) {
      console.error("Error creating listing:", error);
      toast.error("Failed to create listing");
      setIsLoading(false);
    }
  };

  return (
    <FormWrapper title="Images" icon="images" currentStep="/add-listing/images">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-between h-full gap-10">
          <FormGroup title="Images" description="Add images to your listing">
            <FormField
              control={form.control}
              name="listing_image_url"
              render={({ field: { onChange, value, ...field } }) => (
                <FormItem>
                  <FormLabel className="sr-only">Images</FormLabel>
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
                </FormItem>
              )}
            />
          </FormGroup>

          <div className="flex justify-between gap-4 [&>*]:w-fit">
            <Button
              variant="outline"
              type="button"
              onClick={() => router.push("/add-listing/location")}
              className="w-full"
              disabled={isLoading}
            >
              Back
            </Button>
            <Button
              type="submit"
              className="w-full"
              isLoading={isLoading}
              disabled={!form.formState.isValid || form.formState.isSubmitting}
            >
              Create Listing
            </Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
}
