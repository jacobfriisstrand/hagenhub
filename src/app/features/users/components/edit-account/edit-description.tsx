"use client";

import type { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form/form";
import { Textarea } from "@/components/ui/textarea";
import { UserSchema } from "@/prisma/generated/zod";

import { editDescription } from "../../actions/edit-account";

type EditDescriptionProps = {
  user_description: string | null;
  user_pk: string;
};

const userDescriptionSchema = UserSchema.pick({
  user_description: true,
});

type UserDescriptionFormValues = z.infer<typeof userDescriptionSchema>;

export default function EditDescription({ user_description, user_pk }: EditDescriptionProps) {
  const form = useForm<UserDescriptionFormValues>({
    resolver: zodResolver(userDescriptionSchema),
    defaultValues: {
      user_description,
    },
  });

  const onSubmit = async (data: UserDescriptionFormValues) => {
    const result = await editDescription(data, user_pk);
    if (result?.error) {
      toast.error(result.error);
    }
    else {
      toast.success("Description updated");
    }
  };

  return (
    <Form {...form}>
      <p className="text-sm text-gray-500">
        The description is a description of you, it will be shown on your profile.
      </p>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="user_description"
          render={({ field }) => (
            <FormItem
              className="py-4"
            >
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your description"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
