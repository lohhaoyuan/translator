"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SelectProps {
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  children: React.ReactNode
}

interface SelectContextValue {
  value?: string
  onValueChange?: (value: string) => void
  open: boolean
  setOpen: (open: boolean) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}

const SelectContext = React.createContext<SelectContextValue | undefined>(
  undefined
)

function useSelectContext() {
  const context = React.useContext(SelectContext)
  if (!context) {
    throw new Error("Select components must be used within a Select")
  }
  return context
}

export function Select({
  value,
  onValueChange,
  children,
  placeholder,
  disabled,
  className,
}: SelectProps) {
  const [open, setOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const containerRef = React.useRef<HTMLDivElement>(null)

  // Close on outside click
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
        setSearchQuery("")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Close on escape
  React.useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false)
        setSearchQuery("")
      }
    }

    if (open) {
      document.addEventListener("keydown", handleEscape)
      return () => document.removeEventListener("keydown", handleEscape)
    }
  }, [open])

  return (
    <SelectContext.Provider
      value={{ value, onValueChange, open, setOpen, searchQuery, setSearchQuery }}
    >
      <div ref={containerRef} className={cn("relative", className)}>
        {children}
      </div>
    </SelectContext.Provider>
  )
}

interface SelectTriggerProps {
  className?: string
  children: React.ReactNode
}

export function SelectTrigger({ className, children }: SelectTriggerProps) {
  const { open, setOpen, value } = useSelectContext()

  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className={cn(
        "flex h-12 w-full items-center justify-between rounded-lg border-2 border-flexoki-ui-3 bg-flexoki-paper px-4 py-2 text-base ring-offset-flexoki-paper transition-all focus:outline-none focus:ring-2 focus:ring-flexoki-cyan focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        open && "ring-2 ring-flexoki-cyan ring-offset-2",
        className
      )}
    >
      {children}
      <svg
        className={cn(
          "h-4 w-4 text-flexoki-tx-2 transition-transform duration-200",
          open && "rotate-180"
        )}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
  )
}

interface SelectValueProps {
  placeholder?: string
}

export function SelectValue({ placeholder }: SelectValueProps) {
  const { value } = useSelectContext()

  return (
    <span className={cn(!value && "text-flexoki-tx-3")}>
      {value || placeholder}
    </span>
  )
}

interface SelectContentProps {
  className?: string
  children: React.ReactNode
  searchable?: boolean
}

export function SelectContent({
  className,
  children,
  searchable = false,
}: SelectContentProps) {
  const { open, searchQuery, setSearchQuery } = useSelectContext()
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (open && searchable && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open, searchable])

  if (!open) return null

  return (
    <div
      className={cn(
        "absolute z-50 mt-2 max-h-[300px] w-full overflow-hidden rounded-lg border-2 border-flexoki-ui-3 bg-flexoki-paper shadow-lg animate-fade-in",
        className
      )}
    >
      {searchable && (
        <div className="sticky top-0 border-b border-flexoki-ui-2 bg-flexoki-paper p-2">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search languages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border border-flexoki-ui-3 bg-flexoki-paper-2 px-3 py-2 text-sm text-flexoki-tx placeholder:text-flexoki-tx-3 focus:outline-none focus:ring-1 focus:ring-flexoki-cyan"
          />
        </div>
      )}
      <div className="overflow-auto max-h-[250px] p-1">{children}</div>
    </div>
  )
}

interface SelectItemProps {
  value: string
  className?: string
  children: React.ReactNode
}

export function SelectItem({ value, className, children }: SelectItemProps) {
  const {
    value: selectedValue,
    onValueChange,
    setOpen,
    searchQuery,
    setSearchQuery,
  } = useSelectContext()

  const isSelected = selectedValue === value

  // Filter based on search query
  const childText = React.Children.toArray(children)
    .map((child) => (typeof child === "string" ? child : ""))
    .join("")
    .toLowerCase()

  if (searchQuery && !childText.includes(searchQuery.toLowerCase())) {
    return null
  }

  return (
    <button
      type="button"
      onClick={() => {
        onValueChange?.(value)
        setOpen(false)
        setSearchQuery("")
      }}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-md px-3 py-2.5 text-sm text-flexoki-tx outline-none transition-colors hover:bg-flexoki-ui focus:bg-flexoki-ui",
        isSelected && "bg-flexoki-cyan/10 text-flexoki-cyan font-medium",
        className
      )}
    >
      {children}
      {isSelected && (
        <svg
          className="absolute right-3 h-4 w-4 text-flexoki-cyan"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      )}
    </button>
  )
}
