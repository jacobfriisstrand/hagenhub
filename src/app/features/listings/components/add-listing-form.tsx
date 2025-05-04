// TODO: watch the video to see how to do this
// https://www.youtube.com/watch?v=vKJe95pqn8E
"use client";

import type { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form/form";
import { Input } from "@/components/ui/input";
import { ListingSchema } from "@/prisma/generated/zod";

const AddListingSchema = ListingSchema.pick({
  listing_title: true,
  listing_description: true,
  listing_type_fk: true,
  listing_night_price: true,
  listing_area_fk: true,
  listing_bedrooms: true,
  listing_zip_code: true,
});
type AddListingFormValues = z.infer<typeof AddListingSchema>;

export function AddListingForm() {
  const form = useForm<AddListingFormValues>({
    resolver: zodResolver(AddListingSchema),
    defaultValues: {
      listing_title: "",
      listing_description: "",
      listing_night_price: 0,
      listing_area_fk: "",
      listing_type_fk: "",
      listing_bedrooms: 0,
      listing_zip_code: "",
    },
  });

  function onSubmit(data: AddListingFormValues) {
    console.error(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="listing_title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Listing Title</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
