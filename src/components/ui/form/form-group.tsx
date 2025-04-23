import type { ReactNode } from "react";

type FormGroupProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function FormGroup({ title, description, children }: FormGroupProps) {
  return (
    <fieldset>
      <legend className="sr-only">
        {title}
      </legend>
      {description && (
        <p className="text-sm text-muted-foreground mb-4">
          {description}
        </p>
      )}
      {children}
    </fieldset>
  );
}
