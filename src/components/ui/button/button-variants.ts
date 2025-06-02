import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[background-color,color,box-shadow,shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive shadow-xs hover:shadow-md duration-300",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground shadow-none",
        link: "text-primary underline-offset-4 hover:underline",
        icon: "p-4 rounded-full transition-colors duration-300 hover:bg-primary/10 group-hover:bg-primary/10 shadow-none",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg:not(.loading)]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg:not(.loading)]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg:not(.loading)]:px-4",
        xl: "h-12 rounded-md px-8 has-[>svg:not(.loading)]:px-6 text-lg",
        icon: "size-9",
      },
      loading: {
        true: "text-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export { buttonVariants };
