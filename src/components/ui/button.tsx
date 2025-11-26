import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flexoki-cyan focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
          {
            "bg-flexoki-blue text-flexoki-paper hover:bg-flexoki-blue-2 shadow-sm":
              variant === "default",
            "bg-flexoki-ui-2 text-flexoki-tx hover:bg-flexoki-ui-3":
              variant === "secondary",
            "border-2 border-flexoki-ui-3 bg-transparent text-flexoki-tx hover:bg-flexoki-ui hover:border-flexoki-tx-3":
              variant === "outline",
            "bg-transparent text-flexoki-tx hover:bg-flexoki-ui":
              variant === "ghost",
            "bg-flexoki-red text-flexoki-paper hover:bg-flexoki-red-2":
              variant === "destructive",
          },
          {
            "h-10 px-4 py-2 text-sm": size === "default",
            "h-8 px-3 text-xs": size === "sm",
            "h-12 px-6 text-base": size === "lg",
            "h-10 w-10": size === "icon",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
