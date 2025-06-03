"use client";

import type { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useListingStore } from "@/app/add-listing/store";
import FormWrapper from "@/app/features/listings/components/add-listing/add-listing-form-wrapper";
import { AddListingSchema } from "@/app/features/listings/schemas/add-listing-schema";
import { Button } from "@/components/ui/button/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form/form";
import { FormGroup } from "@/components/ui/form/form-group";
import { NumberInput } from "@/components/ui/number-input";
import { ListingSchema } from "@/prisma/generated/zod";

// Extract validation rules from the Zod schema
const bedroomsValidation = ListingSchema.shape.listing_bedrooms._def.checks;
const MIN_BEDROOMS = bedroomsValidation.find(check => check.kind === "min")?.value ?? 1;
const MAX_BEDROOMS = bedroomsValidation.find(check => check.kind === "max")?.value ?? 10;

const addListingBedroomsSchema = AddListingSchema.pick({
  listing_bedrooms: true,
});

type AddListingBedroomsFormValues = z.infer<typeof addListingBedroomsSchema>;

export default function AddListingBedroomsForm() {
  const router = useRouter();
  const { formData, setFormData } = useListingStore();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<AddListingBedroomsFormValues>({
    resolver: zodResolver(addListingBedroomsSchema),
    defaultValues: {
      listing_bedrooms: formData.listing_bedrooms || 1,
    },
    mode: "onTouched",
  });

  function onSubmit(data: AddListingBedroomsFormValues) {
    setIsLoading(true);
    setFormData(data);
    router.push("/add-listing/guests");
  }

  return (
    <FormWrapper title="Bedrooms" icon="bed" currentStep="/add-listing/bedrooms">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-between h-full gap-10">
          <FormField
            control={form.control}
            name="listing_bedrooms"
            render={({ field }) => (
              <FormGroup title="Number of Bedrooms" description="How many bedrooms does your place have?">
                <FormItem className="gap-10">
                  <FormLabel className="text-lg font-medium sr-only">Bedrooms</FormLabel>
                  <FormControl>
                    <NumberInput field={field} min={MIN_BEDROOMS} max={MAX_BEDROOMS} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormGroup>
            )}
          />
          <div className="flex justify-between gap-4 [&>*]:w-fit">
            <Button
              variant="outline"
              type="button"
              onClick={() => router.push("/add-listing/type")}
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
