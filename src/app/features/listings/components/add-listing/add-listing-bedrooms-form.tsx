"use client";

import type { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

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

  const form = useForm<AddListingBedroomsFormValues>({
    resolver: zodResolver(addListingBedroomsSchema),
    defaultValues: {
      listing_bedrooms: 0,
    },
  });

  function onSubmit(data: AddListingBedroomsFormValues) {
    // TODO: Implement form submission logic
    console.log(data);
    router.push("/add-listing/guests");
  }

  return (
    <FormWrapper title="Bedrooms" icon="bed">
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
              onClick={(e) => {
                e.preventDefault();
                router.back();
              }}
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
