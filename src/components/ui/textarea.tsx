import * as React from "react"
import { cn } from "cn"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-lg border border-neutral-200 dark:border-input bg-white/70 dark:bg-input/30 px-3 py-2 text-base text-neutral-900 dark:text-foreground placeholder:text-neutral-500 dark:placeholder:text-muted-foreground shadow-sm dark:shadow-none transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400 disabled:opacity-50 dark:disabled:bg-input/80 dark:disabled:text-muted-foreground aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 font-mono resize-none",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }