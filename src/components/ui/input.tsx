import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "cn"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 rounded-lg border border-neutral-200 dark:border-input bg-white/70 dark:bg-input/30 px-3 py-1.5 text-base text-neutral-900 dark:text-foreground placeholder:text-neutral-500 dark:placeholder:text-muted-foreground shadow-sm dark:shadow-none transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400 disabled:opacity-50 dark:disabled:bg-input/80 dark:disabled:text-muted-foreground aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 font-mono",
        className
      )}
      {...props}
    />
  )
}

export { Input }