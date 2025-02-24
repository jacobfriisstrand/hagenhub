import { z } from "zod";

export interface ValidationRequirement {
  message: string;
  validator: (value: string) => boolean;
}

export const extractRequirements = (schema: z.ZodString): ValidationRequirement[] => {
  const requirements: ValidationRequirement[] = [];

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

export const getFieldRequirements = (schema: z.ZodTypeAny): ValidationRequirement[] => {
  if (schema instanceof z.ZodString) {
    return extractRequirements(schema);
  }
  return [];
};
