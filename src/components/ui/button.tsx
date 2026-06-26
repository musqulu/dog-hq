import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "border border-primary bg-primary text-primary-foreground shadow-[rgba(0,0,0,0.08)_0_0_1px_0] hover:bg-white",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        outline: "border border-white/10 bg-transparent text-foreground hover:border-white/20 hover:bg-white/[0.04]",
        secondary: "border border-white/10 bg-white/[0.05] text-secondary-foreground hover:bg-white/[0.08]",
        ghost: "text-muted-foreground hover:bg-white/[0.05] hover:text-foreground",
        link: "text-foreground underline-offset-4 hover:underline",
        coral: "border border-[#ff7a5c]/70 bg-[#ff7a5c] text-[#08090a] hover:bg-[#ff906f]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-11 px-6 text-sm",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, buttonVariants }
