import type { ReactNode } from "react";

<<<<<<< HEAD
import { cn } from "@/lib/utils";

=======
>>>>>>> bf51935 (32-fe-booklistingform (#142))
type FormGroupProps = {
  title: string;
  description?: string;
  children: ReactNode;
<<<<<<< HEAD
  className?: string;
};

export function FormGroup({ title, description, children, className }: FormGroupProps) {
  return (
    <fieldset className={cn("h-full flex flex-col gap-4", className)}>
=======
};

export function FormGroup({ title, description, children }: FormGroupProps) {
  return (
    <fieldset className="h-full flex flex-col gap-4">
>>>>>>> bf51935 (32-fe-booklistingform (#142))
      <legend className="sr-only">
        {title}
      </legend>
      {description && (
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      )}
      {children}
    </fieldset>
  );
}
