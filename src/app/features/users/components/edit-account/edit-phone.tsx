"use client";

import type { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { editPhone } from "@/app/features/users/actions/edit-account";
import { Button } from "@/components/ui/button/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form/form";
import { Input } from "@/components/ui/input";
import { UserSchema } from "@/prisma/generated/zod";

export type EditPhoneFormProps = {
  user_phone: string | null;
  user_pk: string;
};

const phoneSchema = UserSchema.pick({
  user_phone_number: true,
});

type PhoneFormValues = z.infer<typeof phoneSchema>;

export default function EditPhoneForm({ user_phone, user_pk }: EditPhoneFormProps) {
  const form = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      user_phone_number: user_phone,
    },
  });

  const onSubmit = async (data: PhoneFormValues) => {
    const result = await editPhone(data, user_pk);
    if (result?.error) {
      toast.error(result.error);
    }
    else {
      toast.success("Phone number updated");
    }
  };

  return (
    <>
      <Form {...form}>
        <p className="text-sm text-gray-500 pb-4">
          Add a number, so confirmed guests and Hagenhub can contact you.
        </p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="user_phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Phone number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your phone number"
                    type="tel"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" isLoading={form.formState.isSubmitting}>Save</Button>
        </form>
      </Form>
    </>
  );
}
