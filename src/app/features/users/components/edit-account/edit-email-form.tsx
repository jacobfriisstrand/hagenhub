"use client";

import type { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form/form";
import { Input } from "@/components/ui/input";
import { UserSchema } from "@/prisma/generated/zod";

import { editEmail } from "../../actions/edit-account";

export type EditEmailFormProps = {
  user_email: string;
  user_pk: string;
};

const emailSchema = UserSchema.pick({
  user_email: true,
});

type EmailFormValues = z.infer<typeof emailSchema>;

export default function EditEmailForm({ user_email, user_pk }: EditEmailFormProps) {
  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      user_email,
    },
  });

  const onSubmit = async (data: EmailFormValues) => {
    const result = await editEmail(data, user_pk);
    if (result?.error) {
      toast.error(result.error);
    }
    else {
      toast.success("E-mail updated");
    }
  };

  return (
    <>
      <Form {...form}>
        <p className="text-sm text-gray-500 pb-4">
          Use an address you always have access to.
        </p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="user_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your e-mail"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Save</Button>
        </form>
      </Form>
    </>
  );
}
