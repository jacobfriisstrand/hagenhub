"use client";

import type { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import FormWrapper from "@/app/features/listings/components/add-listing/add-listing-form-wrapper";
import { AddListingSchema } from "@/app/features/listings/schemas/add-listing-schema";
import { Button } from "@/components/ui/button/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form/form";
import { Input } from "@/components/ui/input";

const addListingBedroomsSchema = AddListingSchema.pick({
  listing_bedrooms: true,
});

type AddListingBedroomsFormValues = z.infer<typeof addListingBedroomsSchema>;

export default function AddListingBedroomsForm() {
  const [value, setValue] = useState(0);

  const increment = () => {
    const newValue = Math.min(value + 1, 10);
    setValue(newValue);
  };

  const decrement = () => {
    const newValue = Math.max(value - 1, 0);
    setValue(newValue);
  };

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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col justify-between h-full">
          <FormField
            control={form.control}
            name="listing_bedrooms"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <div className="space-y-2">
                  <FormLabel className="text-lg font-medium sr-only">Bedrooms</FormLabel>
                  <FormDescription>How many bedrooms does your place have?</FormDescription>
                </div>
                <FormControl>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={decrement}
                      disabled={value <= 0}
                      className="rounded-r-none h-full"
                      aria-label="Decrease value"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="text"
                      name={field.name}
                      ref={field.ref}
                      value={value}
                      readOnly
                      className="h-10 w-20 cursor-default rounded-none text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none focus:outline-none focus:ring-none focus:ring-offset-0 focus:border-none border-r-0 border-l-0"
                      aria-label="Number value"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={increment}
                      disabled={value >= 10}
                      className="rounded-l-none h-full"
                      aria-label="Increase value"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between gap-4 [&>*]:w-fit">
            <Button variant="outline" onClick={() => router.back()} className="w-full">
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
