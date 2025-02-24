"use client";

import { useActionState } from "react";
import { contactFormSchema } from "@/lib/schemas/contact-schema";
import { FormField, Form } from "@/components/ui/form";
import { getFieldRequirements } from "@/lib/utils/schema-utils";
import { contactAction } from "@/app/api/contact/contact";

export default function ContactForm() {
  const [state, action, isPending] = useActionState(contactAction, {});

  const fields: FormField<typeof contactFormSchema>[] = [
    {
      name: "name",
      label: "Name",
      type: "text",
      schema: contactFormSchema.shape.name,
      requirements: getFieldRequirements(contactFormSchema.shape.name),
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      schema: contactFormSchema.shape.email,
      requirements: getFieldRequirements(contactFormSchema.shape.email),
    },
    {
      name: "message",
      label: "Message",
      type: "textarea",
      schema: contactFormSchema.shape.message,
      requirements: getFieldRequirements(contactFormSchema.shape.message),
    },
  ];

  return <Form fields={fields} action={action} submitButtonVariant="default" schema={contactFormSchema} onSubmit={action} submitButtonText="Send Message" defaultValues={state.form} isPending={isPending} />;
}
