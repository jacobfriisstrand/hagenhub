"use client";
import { useActionState } from "react";
import { signUpAction } from "@/app/api/sign-up/sign-up";
import { signUpFormSchema, getFieldRequirements } from "@/lib/schemas/signup-schema";
import { FormField, Form } from "@/components/ui/form";

export default function SignUpForm() {
  const [state, action, isPending] = useActionState(signUpAction, {});

  const fields: FormField<typeof signUpFormSchema>[] = [
    {
      name: "email",
      label: "Email",
      type: "email",
      schema: signUpFormSchema.shape.email,
      requirements: getFieldRequirements(signUpFormSchema.shape.email),
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      schema: signUpFormSchema.shape.password,
      requirements: getFieldRequirements(signUpFormSchema.shape.password),
    },
  ];

  return <Form fields={fields} submitButtonVariant="default" schema={signUpFormSchema} action={action} onSubmit={action} submitButtonText="Sign up" defaultValues={state.form} isPending={isPending} />;
}
