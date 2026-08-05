import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-[10px] border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#121316] text-white shadow-xs hover:bg-[#22242a]",
        secondary:
          "border-transparent bg-[#F4F2EC] text-[#0d0e12] hover:bg-gray-200 font-medium",
        destructive:
          "border-transparent bg-red-100 text-red-800 font-bold",
        outline: "text-gray-700 border-gray-300 bg-gray-50 font-mono font-medium",
        academic: "border-transparent bg-blue-100 text-blue-800 font-bold uppercase",
        campus: "border-transparent bg-emerald-100 text-emerald-800 font-bold uppercase",
        exams: "border-transparent bg-amber-100 text-amber-800 font-bold uppercase",
        attendance: "border-transparent bg-purple-100 text-purple-800 font-bold uppercase",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
