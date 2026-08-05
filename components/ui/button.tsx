import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[#121316] text-white shadow-xs hover:bg-[#22242a]",
        destructive:
          "bg-red-600 text-white shadow-xs hover:bg-red-700",
        outline:
          "border border-gray-300 bg-white text-gray-800 shadow-2xs hover:bg-gray-100 hover:text-black",
        secondary:
          "bg-[#F4F2EC] text-[#0d0e12] shadow-2xs hover:bg-gray-200 border border-[#E6E2D8]",
        ghost: "hover:bg-gray-200/70 text-gray-800 hover:text-black",
        link: "text-black underline-offset-4 hover:underline",
        dark: "bg-[#121316] text-white hover:bg-[#22242a] shadow-xs",
        soft: "bg-[#F4F2EC] text-[#0d0e12] hover:bg-gray-200 border border-[#E6E2D8]"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-[10px] px-3 text-xs",
        lg: "h-11 rounded-[10px] px-8 text-base",
        icon: "h-9 w-9 rounded-[10px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
