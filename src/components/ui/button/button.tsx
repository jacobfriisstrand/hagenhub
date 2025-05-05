import type { VariantProps } from "class-variance-authority";

import { Slot, Slottable } from "@radix-ui/react-slot";
import * as React from "react";

import { DynamicIcon } from "@/components/dynamic-icon";
import { cn } from "@/lib/utils";

import { buttonVariants } from "./button-variants";

function Button({
  className,
  variant,
  size,
  children,
  disabled,
  asChild = false,
  isLoading = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className, loading: isLoading }))}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <DynamicIcon
          name="loader-circle"
          className={cn(
            "text-muted absolute animate-spin",
            // Used for conditional styling when button is loading
            "loading",
          )}
        />
      )}
      <Slottable>{children}</Slottable>
    </Comp>
  );
}

export { Button };
