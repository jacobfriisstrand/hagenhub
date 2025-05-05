"use client";

import type { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useListingStore } from "@/app/add-listing/store";
import { getListingArea } from "@/app/features/listings/actions/get-listing-area";
import { getZipCodeInfo } from "@/app/features/listings/actions/get-zip-code-info";
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
import { ListingSchema } from "@/prisma/generated/zod";

const addListingLocationSchema = ListingSchema.pick({
  listing_zip_code: true,
  listing_street_name: true,
  listing_street_number: true,
});

type AddListingLocationFormValues = z.infer<typeof addListingLocationSchema>;

export default function AddListingLocationForm() {
  const router = useRouter();
  const [districtName, setDistrictName] = useState<string | null>(null);
  const { formData, setFormData } = useListingStore();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<AddListingLocationFormValues>({
    resolver: zodResolver(addListingLocationSchema),
    defaultValues: {
      listing_zip_code: formData.listing_zip_code || "",
      listing_street_name: formData.listing_street_name || "",
      listing_street_number: formData.listing_street_number || "",
    },
    mode: "onTouched",
  });

  const handleZipCodeChange = async (value: string) => {
    if (value.length === 4) {
      const zipCodeInfo = await getZipCodeInfo(value);
      if (zipCodeInfo) {
        setDistrictName(zipCodeInfo.zip_code_district_name);
      }
      else {
        setDistrictName(null);
      }
    }
    else {
      setDistrictName(null);
    }
  };

  const onSubmit = async (data: AddListingLocationFormValues) => {
    setIsLoading(true);
    // Validate zip code against database
    const zipCodeInfo = await getZipCodeInfo(data.listing_zip_code);
    if (!zipCodeInfo) {
      form.setError("listing_zip_code", {
        type: "manual",
        message: "Please enter a valid Copenhagen zip code",
      });
      setIsLoading(false);
      return;
    }

    // Get listing area
    const listingArea = await getListingArea(data.listing_zip_code);
    if (!listingArea) {
      form.setError("listing_zip_code", {
        type: "manual",
        message: "Could not determine listing area",
      });
      setIsLoading(false);
      return;
    }

    setFormData({
      ...data,
      listing_area_fk: listingArea,
    });
    router.push("/add-listing/images");
  };

  return (
    <FormWrapper title="Location" icon="map-pin" currentStep="/add-listing/location">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-between h-full gap-10">
          <FormGroup title="Location Details" description="Where is your listing located?">
            <div className="flex flex-col justify-between gap-4">
              <FormField
                control={form.control}
                name="listing_street_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="listing_street_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street number</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="listing_zip_code"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>Zip code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleZipCodeChange(e.target.value);
                        }}
                      />
                    </FormControl>
                    {districtName && (
                      <div className="text-sm text-gray-500 absolute -bottom-8 left-1">
                        {districtName}
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </FormGroup>

          <div className="flex justify-between gap-4 [&>*]:w-fit">
            <Button
              variant="outline"
              type="button"
              onClick={() => router.push("/add-listing/guests")}
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
              Next
            </Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
}
