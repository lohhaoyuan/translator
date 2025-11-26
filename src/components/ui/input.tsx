import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border-2 border-flexoki-ui-3 bg-flexoki-paper px-3 py-2 text-sm text-flexoki-tx ring-offset-flexoki-paper file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-flexoki-tx-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flexoki-cyan focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
