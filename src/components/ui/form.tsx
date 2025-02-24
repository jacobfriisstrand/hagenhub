import { useState, startTransition } from "react";
import { ValidatedInput } from "@/components/ui/validated-input";
import { z } from "zod";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import { Check, X, Loader2 } from "lucide-react";

// Improve type safety by making the form data type generic
export type FormField<T extends z.ZodSchema> = {
  name: keyof z.infer<T>;
  label: string;
  type: string;
  schema: z.ZodType;
  requirements?: {
    message: string;
    validator: (value: string) => boolean;
  }[];
};

export type FormProps<T extends z.ZodSchema> = {
  fields: FormField<T>[];
  onSubmit: (data: FormData) => void | Promise<void>;
  submitButtonText: string;
  action: (data: FormData) => void | Promise<void>;
  submitButtonVariant: VariantProps<typeof buttonVariants>["variant"];
  schema: T;
  className?: string;
  buttonClassName?: string;
  fieldClassName?: string;
  defaultValues?: Partial<z.infer<T>>;
  isPending?: boolean;
};

export function Form<T extends z.ZodSchema>({ fields, onSubmit, action, submitButtonText = "Submit", submitButtonVariant = "default", schema, className = "", buttonClassName = "", fieldClassName = "", defaultValues = {}, isPending = false }: FormProps<T>) {
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [fieldValues, setFieldValues] = useState<Record<string, string>>(Object.fromEntries(fields.map((field) => [String(field.name), defaultValues[field.name] || ""])));
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setWasSubmitted(true);

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    const validationResult = schema.safeParse(data);

    if (!validationResult.success) {
      return;
    }

    startTransition(() => {
      onSubmit(formData);
    });
  };

  const handleFieldChange = (name: string, value: string) => {
    setFieldValues((prev) => ({ ...prev, [name]: value }));
    setTouchedFields((prev) => ({ ...prev, [name]: false }));
  };

  const handleFieldBlur = (name: string) => {
    setTouchedFields((prev) => ({ ...prev, [name]: true }));
  };

  return (
    <form onSubmit={handleSubmit} action={action} className={cn("flex flex-col gap-4", className)} noValidate>
      {fields.map((field) => {
        const fieldName = String(field.name);
        const value = fieldValues[fieldName] || "";
        const hasValue = value.length > 0;
        const isTouched = touchedFields[fieldName];

        return (
          <div key={fieldName} className={cn("grid gap-2", fieldClassName)}>
            <Label className="" htmlFor={fieldName}>
              {field.label}
            </Label>
            <ValidatedInput
              type={field.type}
              name={fieldName}
              wasSubmitted={wasSubmitted}
              fieldSchema={field.schema}
              defaultValue={defaultValues[field.name]}
              onChange={(e) => handleFieldChange(fieldName, e.target.value)}
              onBlur={() => handleFieldBlur(fieldName)}
              aria-describedby={field.requirements ? `${fieldName}-requirements` : undefined}
            />
            {field.requirements && (
              <ul id={`${fieldName}-requirements`} className="text-sm space-y-1" aria-label={`Requirements for ${field.label}`}>
                {field.requirements.map((req, i) => {
                  const isValid = req.validator(value);
                  const showError = (wasSubmitted || isTouched) && hasValue && !isValid;
                  const showSuccess = hasValue && isValid;

                  return (
                    <li key={i} className={cn("flex items-center gap-2", showError ? "text-destructive" : showSuccess ? "text-green-500" : "text-muted-foreground")}>
                      <span className="w-4 h-4" aria-hidden="true">
                        {showError ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                      </span>
                      <span aria-live="polite">{req.message}</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
      <div>
        <Button type="submit" variant={submitButtonVariant} className={cn(buttonClassName, "flex items-center justify-center gap-2 relative")} disabled={isPending}>
          <span className={cn("absolute", isPending ? "opacity-100" : "opacity-0 pointer-events-none")}>
            <Loader2 className="h-4 w-4 animate-spin" />
          </span>
          <span className={cn(isPending ? "opacity-0 pointer-events-none" : "opacity-100")}>{submitButtonText}</span>
        </Button>
      </div>
    </form>
  );
}
