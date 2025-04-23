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

const addListingGuestsSchema = AddListingSchema.pick({
  listing_guests: true,
});

type AddListingGuestsFormValues = z.infer<typeof addListingGuestsSchema>;

export default function AddListingGuestsForm() {
  const router = useRouter();

  const form = useForm<AddListingGuestsFormValues>({
    resolver: zodResolver(addListingGuestsSchema),
    defaultValues: {
      listing_guests: 0,
    },
  });

  function onSubmit(data: AddListingGuestsFormValues) {
    // TODO: Implement form submission logic
    console.log(data);
    router.push("/add-listing/location");
  }

  return (
    <FormWrapper title="Guests" icon="users">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-between h-full gap-10">
          <FormField
            control={form.control}
            name="listing_guests"
            render={({ field }) => (
              <FormGroup title="Guest Capacity" description="How many guests can sleep in your place?">
                <FormItem className="gap-10">
                  <FormLabel className="text-lg font-medium sr-only">Guests</FormLabel>
                  <FormControl>
                    <NumberInput field={field} min={0} />
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
              disabled={!form.formState.isValid || form.formState.isSubmitting || form.getValues().listing_guests === 0}
            >
              Next
            </Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
}
