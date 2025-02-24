"use server";

// import { redirect } from "next/navigation";
import { ContactActionState, contactFormSchema } from "@/lib/schemas/contact-schema";

export async function contactAction(prev: ContactActionState, formData: FormData): Promise<ContactActionState> {
  const form = Object.fromEntries(formData);
  const validationResult = contactFormSchema.safeParse(form);

  if (!validationResult.success) {
    return {
      form,
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  try {
    // Simulate API call with delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Here you would typically handle the actual sign-up logic
    // For example, creating a user in your database
    console.log("Contact form data:", validationResult.data);

    return {
      form: validationResult.data,
      errors: {},
    };
  } catch {
    return {
      form: validationResult.data,
      errors: {
        name: ["Failed to send message. Please try again."],
      },
    };
  }
}
