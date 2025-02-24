import { z } from "zod";

const extractRequirements = (schema: z.ZodString) => {
  const requirements = [];

  // Get all checks from the schema
  const checks = schema._def.checks || [];

  for (const check of checks) {
    switch (check.kind) {
      case "email":
        requirements.push({
          message: check.message || "Please enter a valid email.",
          validator: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        });
        break;
      case "min":
        requirements.push({
          message: check.message || `Must be at least ${check.value} characters`,
          validator: (value: string) => value.length >= check.value,
        });
        break;
      case "regex":
        requirements.push({
          message: check.message || "Invalid format",
          validator: (value: string) => check.regex.test(value),
        });
        break;
    }
  }

  return requirements;
};

export const signUpFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});

export type SignUpActionState = {
  form?: {
    email?: string;
    password?: string;
  };
  errors?: {
    email?: string[];
    password?: string[];
  };
};

export const getFieldRequirements = (schema: z.ZodTypeAny) => {
  if (schema instanceof z.ZodString) {
    return extractRequirements(schema);
  }
  return [];
};
