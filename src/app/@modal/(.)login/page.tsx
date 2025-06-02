"use client";

import type { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { login } from "@/app/(auth)/actions";
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

const loginSchema = UserSchema.pick({ user_email: true, user_password: true });
type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();

  // Initialize react-hook-form with zod validation
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      user_email: "",
      user_password: "",
    },
  });

  // Handle form submission
  async function onSubmit(data: LoginFormValues) {
    try {
      const result = await login(data);
      if (result?.error) {
        // Handle login error (you might want to show this to the user)
        toast.error(result.error);
      }
      // If we get here, login was successful and the redirect will happen automatically
      router.refresh();
      router.back();
    }
    catch {
      // If we get here, it means the redirect happened (success case)
      // The error is expected because the redirect interrupts the normal flow

      router.refresh();
      router.back();
    }
  }

  return (
    <Modal title="Welcome back">
      <div className="space-y-6">
        <div>
          <p className="text-muted-foreground">Enter your credentials to login</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              Login
            </Button>
          </form>
        </Form>
      </div>
    </Modal>
  );
}
