import * as React from "react";

import { cn } from "@/lib/utils";

type CardProps<T extends React.ElementType = "div"> = {
  as?: T;
  className?: string;
} & React.ComponentPropsWithoutRef<T>;

function Card<T extends React.ElementType = "div">({
  as,
  className,
  ...props
}: CardProps<T>) {
  const Component = as || "div";
  return (
    <Component
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border p-6 shadow-sm",
        className,
      )}
      {...props}
    />
  );
}

type CardHeaderProps<T extends React.ElementType = "div"> = {
  as?: T;
  className?: string;
} & React.ComponentPropsWithoutRef<T>;

function CardHeader<T extends React.ElementType = "div">({
  as,
  className,
  ...props
}: CardHeaderProps<T>) {
  const Component = as || "div";
  return (
    <Component
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 has-[data-slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className,
      )}
      {...props}
    />
  );
}

type CardTitleProps<T extends React.ElementType = "div"> = {
  as?: T;
  className?: string;
} & React.ComponentPropsWithoutRef<T>;

function CardTitle<T extends React.ElementType = "div">({
  as,
  className,
  ...props
}: CardTitleProps<T>) {
  const Component = as || "div";
  return (
    <Component
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  );
}

type CardDescriptionProps<T extends React.ElementType = "div"> = {
  as?: T;
  className?: string;
} & React.ComponentPropsWithoutRef<T>;

function CardDescription<T extends React.ElementType = "div">({
  as,
  className,
  ...props
}: CardDescriptionProps<T>) {
  const Component = as || "div";
  return (
    <Component
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

type CardActionProps<T extends React.ElementType = "div"> = {
  as?: T;
  className?: string;
} & React.ComponentPropsWithoutRef<T>;

function CardAction<T extends React.ElementType = "div">({
  as,
  className,
  ...props
}: CardActionProps<T>) {
  const Component = as || "div";
  return (
    <Component
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

type CardContentProps<T extends React.ElementType = "div"> = {
  as?: T;
  className?: string;
} & React.ComponentPropsWithoutRef<T>;

function CardContent<T extends React.ElementType = "div">({
  as,
  className,
  ...props
}: CardContentProps<T>) {
  const Component = as || "div";
  return (
    <Component
      data-slot="card-content"
      className={cn("", className)}
      {...props}
    />
  );
}

type CardFooterProps<T extends React.ElementType = "div"> = {
  as?: T;
  className?: string;
} & React.ComponentPropsWithoutRef<T>;

function CardFooter<T extends React.ElementType = "div">({
  as,
  className,
  ...props
}: CardFooterProps<T>) {
  const Component = as || "div";
  return (
    <Component
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
