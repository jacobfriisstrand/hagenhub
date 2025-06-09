"use client";

import type { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { editAddress } from "@/app/features/users/actions/edit-account";
import { Button } from "@/components/ui/button/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form/form";
import { Input } from "@/components/ui/input";
import { UserSchema } from "@/prisma/generated/zod";

type EditUserAddressProps = {
  user_zip_code: string | null;
  user_street_name: string | null;
  user_street_number: string | null;
  user_pk: string;
};

const addressSchema = UserSchema.pick({
  user_zip_code: true,
  user_street_name: true,
  user_street_number: true,
});

type AddressFormValues = z.infer<typeof addressSchema>;

export default function EditUserAddress({ user_zip_code, user_street_name, user_street_number, user_pk }: EditUserAddressProps) {
  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      user_zip_code,
      user_street_name,
      user_street_number,
    },
  });

  const onSubmit = async (data: AddressFormValues) => {
    const result = await editAddress(data, user_pk);
    if (result?.error) {
      toast.error(result.error);
    }
    else {
      toast.success("Account updated successfully");
    }
  };

  return (
    <Form {...form}>
      <p className="text-sm text-gray-500">
        Use a permanent address, where you can receive mail.
      </p>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="py-4">
          <FormField
            control={form.control}
            name="user_street_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the street name"
                    type="string"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col md:flex-row gap-4 pt-4">
            <FormField
              control={form.control}
              name="user_street_number"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2">
                  <FormLabel>Street number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the street number"
                      type="string"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="user_zip_code"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2">
                  <FormLabel>Postal code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the postal code"
                      type="string"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit" isLoading={form.formState.isSubmitting}>Save</Button>
      </form>
    </Form>
  );
}
