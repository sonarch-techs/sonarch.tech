import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2.5 py-0.5 text-[11px] font-mono font-semibold tracking-wide whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default:
          "bg-[#008763] text-white dark:bg-[#00c896] dark:text-[#040404] shadow-sm dark:shadow-none [a]:hover:opacity-90",
        brand:
          "bg-[#008763]/10 text-[#008763] border-[#008763]/25 dark:bg-[#00c896]/10 dark:text-[#00c896] dark:border-[#00c896]/20",
        secondary:
          "bg-neutral-100 text-neutral-800 border border-neutral-200/80 dark:border-transparent dark:bg-secondary dark:text-secondary-foreground [a]:hover:bg-neutral-200 dark:[a]:hover:bg-secondary/80",
        destructive:
          "bg-destructive/10 text-destructive border border-destructive/20 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
        outline:
          "border-neutral-200 bg-white/70 text-neutral-800 dark:border-border dark:bg-transparent dark:text-foreground [a]:hover:bg-neutral-100 dark:[a]:hover:bg-muted",
        ghost:
          "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-muted/50",
        link:
          "text-[#008763] dark:text-[#00c896] underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }