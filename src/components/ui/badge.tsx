import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[11px] font-semibold transition-[color,box-shadow]",
  {
    variants: {
      variant: {
        default: "border-white/10 bg-white/[0.06] text-foreground",
        secondary: "border-white/10 bg-white/[0.04] text-muted-foreground",
        destructive: "border-[#f34f52]/20 bg-[#f34f52]/10 text-[#f34f52]",
        outline: "border-white/12 text-muted-foreground",
        coral: "border-[#ff7a5c]/20 bg-[#ff7a5c]/10 text-[#ff9b82]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({ className, variant, ...props }: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
