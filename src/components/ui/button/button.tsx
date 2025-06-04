import type { VariantProps } from "class-variance-authority";

import { Slot } from "@radix-ui/react-slot";
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
      className={cn("group data-[loading=true]:grid data-[loading=true]:place-items-center", buttonVariants({ variant, size, className, loading: isLoading }))}
      disabled={disabled || isLoading}
      data-loading={isLoading}
      {...props}
    >
      <div className="group-data-[loading=true]:grid group-data-[loading=true]:place-items-center">
        <span className="group-data-[loading=false]:flex group-data-[loading=false]:gap-1 group-data-[loading=false]:items-center group-data-[loading=true]:[grid-area:1/1] group-data-[loading=true]:invisible">
          {children}
        </span>
        {isLoading && (
          <span className="group-data-[loading=true]:[grid-area:1/1] group-data-[loading=true]:visible invisible">
            <DynamicIcon
              name="loader-circle"
              className="text-muted animate-spin"
            />
          </span>
        )}
      </div>
    </Comp>
  );
}

export { Button };
