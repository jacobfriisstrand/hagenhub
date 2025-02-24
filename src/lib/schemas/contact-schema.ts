import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }).trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }).max(500, { message: "Message cannot exceed 500 characters" }).trim(),
});

export type ContactActionState = {
  form?: {
    name?: string;
    email?: string;
    message?: string;
  };
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
};
