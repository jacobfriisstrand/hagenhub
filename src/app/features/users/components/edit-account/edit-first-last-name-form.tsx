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
      toast.success("Konto opdateret");
    }
  };

  return (
    <Form {...form}>
      <p className="text-sm text-gray-500">
        Sørg for, at det stemmer overens med navnet på dit myndighedsudstedte id.
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
                <FormLabel>Fornavn</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Indtast dit fornavn"
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
                <FormLabel>Efternavn</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Indtast dit efternavn"
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
        <Button type="submit">Gem</Button>
      </form>
    </Form>
  );
}
