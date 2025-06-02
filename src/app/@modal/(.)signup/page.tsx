"use client";

import type { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { signup } from "@/app/(auth)/actions";
import { DynamicIcon } from "@/components/dynamic-icon";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form/form";
import { Input } from "@/components/ui/input";
import { UserSchema } from "@/prisma/generated/zod";

const signupSchema = UserSchema.pick({
  user_first_name: true,
  user_email: true,
  user_password: true,
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      user_first_name: "",
      user_email: "",
      user_password: "",
    },
  });

  async function onSubmit(data: SignupFormValues) {
    // TODO: Implement signup logic here
    try {
      const result = await signup(data);
      if (result?.error) {
        // Handle login error (you might want to show this to the user)
        toast.error(result.error);
      }
      // Redirect to login page after successful signup
      router.refresh();
      router.back();
    }
    catch {
      router.refresh();
      router.back();
    }
  }

  return (
    <Modal title="Create an account">
      <div className="space-y-6">
        <div>
          <p className="text-muted-foreground">Enter your details to sign up</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="user_first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <DynamicIcon
                        name="user"
                        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                      />
                      <Input
                        placeholder="Enter your first name"
                        className="pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="user_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <DynamicIcon
                        name="mail"
                        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                      />
                      <Input
                        placeholder="Enter your email"
                        type="email"
                        className="pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="user_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <DynamicIcon
                        name="lock"
                        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                      />
                      <Input
                        placeholder="Enter your password"
                        type="password"
                        className="pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Sign up
            </Button>
          </form>
        </Form>
      </div>
    </Modal>
  );
}
