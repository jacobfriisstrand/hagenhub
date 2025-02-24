"use server";

// import { redirect } from "next/navigation";
import { SignUpActionState, signUpFormSchema } from "@/lib/schemas/signup-schema";

export async function signUpAction(prev: SignUpActionState, formData: FormData): Promise<SignUpActionState> {
  const form = Object.fromEntries(formData);
  const validationResult = signUpFormSchema.safeParse(form);

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
    console.log("Sign up data:", validationResult.data);

    return {
      form: validationResult.data,
      errors: {},
    };
  } catch {
    return {
      form: validationResult.data,
      errors: {
        email: ["Failed to sign up. Please try again."],
      },
    };
  }
}
