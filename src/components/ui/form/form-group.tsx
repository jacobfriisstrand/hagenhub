import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type FormGroupProps = {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function FormGroup({ title, description, children, className }: FormGroupProps) {
  return (
    <fieldset className={cn("h-full flex flex-col gap-4", className)}>
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
