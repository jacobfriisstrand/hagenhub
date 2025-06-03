import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

export default function PageTitle({
  as: Component,
  children,
  className,
  ...props
}: {
  as: ElementType;
  children: ReactNode;
} & React.ComponentProps<"h1">) {
  return (
    <Component className={cn("text-lg md:text-2xl font-medium", className)} {...props}>
      {children}
    </Component>
  );
}
