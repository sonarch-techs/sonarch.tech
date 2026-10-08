import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium font-mono transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
  {
    variants: {
      variant: {
        default:
          "bg-[#008763] text-white hover:bg-[#006f52] shadow-sm shadow-[#008763]/20 dark:bg-[#00c896] dark:text-[#040404] dark:font-bold dark:hover:bg-[#00b285] dark:shadow-md dark:shadow-[#00c896]/20",
        destructive:
          "bg-red-600 text-white shadow-sm hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600",
        outline:
          "border border-neutral-200 bg-white/80 text-neutral-800 hover:bg-neutral-100 hover:text-neutral-900 shadow-sm dark:shadow-none dark:border-[#1f1f1f] dark:bg-transparent dark:text-neutral-200 dark:hover:bg-[#1f1f1f] dark:hover:text-white",
        secondary:
          "bg-neutral-100 text-neutral-800 hover:bg-neutral-200 border border-neutral-200/60 dark:border-transparent dark:bg-[#1f1f1f] dark:text-neutral-200 dark:hover:bg-[#2a2a2a] shadow-sm dark:shadow-none",
        ghost:
          "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-300 dark:hover:bg-[#1f1f1f] dark:hover:text-white",
        link:
          "text-[#008763] dark:text-[#00c896] underline-offset-4 hover:underline p-0 h-auto font-medium",
      },
      size: {
        default: "h-9 px-4 py-2 text-xs",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-11 rounded-xl px-6 text-sm",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };