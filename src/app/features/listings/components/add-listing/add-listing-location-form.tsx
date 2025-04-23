"use client";

import type { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

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

  const form = useForm<AddListingLocationFormValues>({
    resolver: zodResolver(addListingLocationSchema),
    defaultValues: {
      listing_zip_code: "",
      listing_street_name: "",
      listing_street_number: "",
    },
  });

  const onSubmit = async (data: AddListingLocationFormValues) => {
    // Validate zip code against database
    const zipCodeInfo = await getZipCodeInfo(data.listing_zip_code);
    if (!zipCodeInfo) {
      form.setError("listing_zip_code", {
        type: "manual",
        message: "Please enter a valid Copenhagen zip code",
      });
      return;
    }

    console.warn("Form data:", data);
    router.push("/add-listing/images");
  };

  return (
    <FormWrapper title="Location" icon="map-pin">
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
                  <FormItem>
                    <FormLabel>Zip code</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
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
              onClick={() => router.back()}
              className="w-full"
            >
              Back
            </Button>
            <Button
              type="submit"
              className="w-full"
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
