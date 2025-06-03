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
import { Textarea } from "@/components/ui/textarea";

const addListingGeneralInfoSchema = AddListingSchema.pick({
  listing_title: true,
  listing_description: true,
  listing_night_price: true,
});

type AddListingGeneralInfoFormValues = z.infer<typeof addListingGeneralInfoSchema>;

export default function AddListingGeneralInfoForm() {
  const router = useRouter();
  const { formData, setFormData } = useListingStore();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<AddListingGeneralInfoFormValues>({
    resolver: zodResolver(addListingGeneralInfoSchema),
    defaultValues: {
      listing_title: formData.listing_title || "",
      listing_description: formData.listing_description || "",
      listing_night_price: formData.listing_night_price || 0,
    },
    mode: "onTouched",
  });

  function onSubmit(data: AddListingGeneralInfoFormValues) {
    setIsLoading(true);
    setFormData(data);
    router.push("/add-listing/type");
  }

  return (
    <FormWrapper title="General Info" icon="pencil" currentStep="/add-listing/general-info">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-between h-full gap-10">
          <FormGroup title="Listing Details" description="Give your listing a title, description and nightly price">
            <FormField
              control={form.control}
              name="listing_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="listing_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea className="h-32 w-full" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="listing_night_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nightly price (DKK)</FormLabel>
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
                </FormItem>
              )}
            />
          </FormGroup>

          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
            disabled={!form.formState.isValid || form.formState.isSubmitting}
          >
            Next
          </Button>
        </form>
      </Form>
    </FormWrapper>
  );
}
