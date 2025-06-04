"use client";

import type { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form/form";
import { Input } from "@/components/ui/input";
import { UserSchema } from "@/prisma/generated/zod";

import { editFirstLastName } from "../../actions/edit-account";

export type EditFirstNameLastNameProps = {
  firstName: string;
  lastName: string | null;
  user_pk: string;
};

const FirstLastNameSchema = UserSchema.pick({
  user_first_name: true,
  user_last_name: true,
});

type FirstLastNameFormValues = z.infer<typeof FirstLastNameSchema>;

export default function FirstLastNameForm({ firstName, lastName, user_pk }: EditFirstNameLastNameProps) {
  const form = useForm<FirstLastNameFormValues>({
    resolver: zodResolver(FirstLastNameSchema),
    defaultValues: {
      user_first_name: firstName,
      user_last_name: lastName,
    },
  });

  const onSubmit = async (data: FirstLastNameFormValues) => {
    const result = await editFirstLastName(data, user_pk);
    if (result?.error) {
      toast.error(result.error);
    }
    else {
      toast.success("Account updated");
    }
  };

  return (
    <Form {...form}>
      <p className="text-sm text-gray-500">
        Make sure it matches the name on your government-issued ID.
      </p>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" py-4"
      >
        <div className="flex flex-col md:flex-row gap-4 py-4">
          <FormField
            control={form.control}
            name="user_first_name"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2">
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your first name"
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
            name="user_last_name"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2">
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your last name"
                    type="text"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" isLoading={form.formState.isSubmitting}>Save</Button>
      </form>
    </Form>
  );
}
