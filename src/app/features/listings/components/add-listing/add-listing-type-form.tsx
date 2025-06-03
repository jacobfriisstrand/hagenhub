"use client";

import type { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import type { ListingType } from "@/prisma/generated/zod";

import { useListingStore } from "@/app/add-listing/store";
import FormWrapper from "@/app/features/listings/components/add-listing/add-listing-form-wrapper";
import AddListingTypeRadioButton from "@/app/features/listings/components/add-listing/add-listing-type-radio-button";
import { AddListingSchema } from "@/app/features/listings/schemas/add-listing-schema";
import { Button } from "@/components/ui/button/button";
import { Form, FormControl, FormField, FormMessage } from "@/components/ui/form/form";
import { FormGroup } from "@/components/ui/form/form-group";
import { RadioGroup } from "@/components/ui/radio-group";

const addListingTypeSchema = AddListingSchema.pick({
  listing_type_fk: true,
});

type AddListingTypeFormValues = z.infer<typeof addListingTypeSchema>;

export default function AddListingTypeForm({ listingTypes }: { listingTypes: ListingType[] }) {
  const router = useRouter();
  const { formData, setFormData } = useListingStore();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<AddListingTypeFormValues>({
    resolver: zodResolver(addListingTypeSchema),
    defaultValues: {
      listing_type_fk: formData.listing_type_fk || "",
    },
    mode: "onTouched",
  });

  function onSubmit(data: AddListingTypeFormValues) {
    setIsLoading(true);
    // Find the selected listing type
    const selectedType = listingTypes.find(type => type.listing_type_pk === data.listing_type_fk);
    if (!selectedType) {
      return;
    }

    setFormData({
      listing_type_fk: selectedType.listing_type_pk,
    });
    router.push("/add-listing/bedrooms");
  }

  return (
    <FormWrapper title="Listing type" icon="house" currentStep="/add-listing/type">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-between h-full gap-10">
          <FormField
            control={form.control}
            name="listing_type_fk"
            render={({ field }) => (
              <FormGroup title="Listing Type" description="Choose the type of accommodation you want to add">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-wrap gap-4"
                  >
                    {listingTypes.map(type => (
                      <AddListingTypeRadioButton
                        key={type.listing_type_pk}
                        value={type.listing_type_pk}
                        formLabel={type.listing_type_name}
                        icon={type.listing_type_icon}
                        isChecked={field.value === type.listing_type_pk}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormGroup>
            )}
          />

          <div className="flex justify-between gap-4 [&>*]:w-fit">
            <Button
              variant="outline"
              type="button"
              onClick={() => router.push("/add-listing/general-info")}
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
