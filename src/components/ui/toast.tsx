"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ToastProps {
  message: string
  type?: "success" | "error" | "info"
  visible: boolean
  onClose: () => void
}

export function Toast({ message, type = "info", visible, onClose }: ToastProps) {
  React.useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [visible, onClose])

  if (!visible) return null

  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-lg px-4 py-3 shadow-lg animate-slide-up",
        {
          "bg-flexoki-green text-flexoki-paper": type === "success",
          "bg-flexoki-red text-flexoki-paper": type === "error",
          "bg-flexoki-blue text-flexoki-paper": type === "info",
        }
      )}
    >
      {type === "success" && (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )}
      {type === "error" && (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
      {type === "info" && (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )}
      <span className="text-sm font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 hover:opacity-70 transition-opacity"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

// Toast hook for easy usage
export function useToast() {
  const [toast, setToast] = React.useState<{
    message: string
    type: "success" | "error" | "info"
    visible: boolean
  }>({
    message: "",
    type: "info",
    visible: false,
  })

  const showToast = React.useCallback(
    (message: string, type: "success" | "error" | "info" = "info") => {
      setToast({ message, type, visible: true })
    },
    []
  )

  const hideToast = React.useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }))
  }, [])

  return { toast, showToast, hideToast }
}
