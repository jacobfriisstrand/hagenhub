"use client";

import type { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import type { ListingType } from "@/prisma/generated/zod";

import FormWrapper from "@/app/features/listings/components/add-listing/add-listing-form-wrapper";
import AddListingTypeRadioButton from "@/app/features/listings/components/add-listing/add-listing-type-radio-button";
import { AddListingSchema } from "@/app/features/listings/schemas/add-listing-schema";
import { Button } from "@/components/ui/button/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form/form";
import { FormGroup } from "@/components/ui/form/form-group";
import { RadioGroup } from "@/components/ui/radio-group";

const addListingTypeSchema = AddListingSchema.pick({
  listing_type_fk: true,
});

type AddListingTypeFormValues = z.infer<typeof addListingTypeSchema>;

export default function AddListingTypeForm({ listingTypes }: { listingTypes: ListingType[] }) {
  const router = useRouter();

  const form = useForm<AddListingTypeFormValues>({
    resolver: zodResolver(addListingTypeSchema),
    defaultValues: {
      listing_type_fk: "",
    },
  });

  function onSubmit(data: AddListingTypeFormValues) {
    // TODO: Implement form submission logic
    console.log(data);
    router.push("/add-listing/bedrooms");
  }

  return (
    <FormWrapper title="Listing type" icon="house">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-between h-full gap-10">
          <FormField
            control={form.control}
            name="listing_type_fk"
            render={({ field }) => (
              <FormGroup title="Listing Type" description="Choose the type of accommodation you want to add">
                <FormItem className="gap-10">
                  <FormLabel className="text-lg font-medium sr-only">Listing type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="grid lg:grid-cols-3 gap-4"
                      aria-invalid={!!form.formState.errors.listing_type_fk}
                      aria-errormessage={form.formState.errors.listing_type_fk?.message}
                    >
                      {listingTypes.map((type: ListingType) => (
                        <FormItem
                          key={type.listing_type_pk}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <AddListingTypeRadioButton
                              isChecked={field.value === type.listing_type_pk}
                              value={type.listing_type_pk}
                              icon={type.listing_type_icon}
                              formLabel={type.listing_type_name}
                            />
                          </FormControl>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormGroup>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={!form.formState.isValid || form.formState.isSubmitting}
          >
            Next
          </Button>
        </form>
      </Form>
    </FormWrapper>
  );
}
