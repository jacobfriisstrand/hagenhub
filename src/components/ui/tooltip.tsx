"use client";

import {
  Arrow as RadixTooltipArrow,
  Content as RadixTooltipContent,
  Portal as RadixTooltipPortal,
  Provider as RadixTooltipProvider,
  Root as RadixTooltipRoot,
  Trigger as RadixTooltipTrigger,
} from "@radix-ui/react-tooltip";
import * as React from "react";

import { cn } from "@/lib/utils";

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof RadixTooltipProvider>) {
  return (
    <RadixTooltipProvider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof RadixTooltipRoot>) {
  return (
    <TooltipProvider>
      <RadixTooltipRoot data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof RadixTooltipTrigger>) {
  return <RadixTooltipTrigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof RadixTooltipContent>) {
  return (
    <RadixTooltipPortal>
      <RadixTooltipContent
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
          className,
        )}
        {...props}
      >
        {children}
        <RadixTooltipArrow className="bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </RadixTooltipContent>
    </RadixTooltipPortal>
  );
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
