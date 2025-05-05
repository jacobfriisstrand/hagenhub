import type { ReactNode } from "react";

type FormGroupProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function FormGroup({ title, description, children }: FormGroupProps) {
  return (
    <fieldset className="h-full flex flex-col gap-4">
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
