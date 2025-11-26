"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

// Separate component for native share button to handle client-side check
function NativeShareButton({ onShare }: { onShare: () => void }) {
  const [canShare, setCanShare] = React.useState(false)

  React.useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && !!navigator.share)
  }, [])

  if (!canShare) return null

  return (
    <Button onClick={onShare} variant="secondary" className="w-full h-11">
      <svg
        className="h-4 w-4 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
        />
      </svg>
      Share via...
    </Button>
  )
}

interface ShareDialogProps {
  open: boolean
  onClose: () => void
  url: string
  phrase: string
  onCopied?: () => void
}

export function ShareDialog({
  open,
  onClose,
  url,
  phrase,
  onCopied,
}: ShareDialogProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Handle escape key
  React.useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    if (open) {
      document.addEventListener("keydown", handleEscape)
      return () => document.removeEventListener("keydown", handleEscape)
    }
  }, [open, onClose])

  // Prevent body scroll when open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = ""
      }
    }
  }, [open])

  const handleCopy = async () => {
    if (inputRef.current) {
      inputRef.current.select()
      try {
        await navigator.clipboard.writeText(url)
        onCopied?.()
      } catch {
        // Fallback
        document.execCommand("copy")
        onCopied?.()
      }
    }
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Translate this phrase",
          text: `Translate: "${phrase}"`,
          url: url,
        })
      } catch (err) {
        // User cancelled or error
        console.log("Share cancelled or failed")
      }
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-flexoki-black/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative z-10 w-full max-w-md mx-4 bg-flexoki-paper rounded-2xl shadow-2xl border-2 border-flexoki-ui-2 animate-slide-up overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-flexoki-ui-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-flexoki-cyan/10">
              <svg
                className="h-5 w-5 text-flexoki-cyan"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-flexoki-tx">
                Share Translation Link
              </h2>
              <p className="text-sm text-flexoki-tx-2">
                Anyone with this link can translate your phrase
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-flexoki-ui transition-colors"
          >
            <svg
              className="h-5 w-5 text-flexoki-tx-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Phrase preview */}
          <div className="p-3 rounded-lg bg-flexoki-ui/50 border border-flexoki-ui-2">
            <p className="text-xs font-medium text-flexoki-tx-2 uppercase tracking-wider mb-1">
              Phrase
            </p>
            <p className="text-flexoki-tx font-medium truncate">{phrase}</p>
          </div>

          {/* URL input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-flexoki-tx-2">
              Shareable Link
            </label>
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={url}
                readOnly
                className="flex-1 h-11 rounded-lg border-2 border-flexoki-ui-3 bg-flexoki-paper-2 px-3 text-sm text-flexoki-tx focus:outline-none focus:ring-2 focus:ring-flexoki-cyan"
                onClick={(e) => (e.target as HTMLInputElement).select()}
              />
              <Button onClick={handleCopy} variant="default" className="h-11">
                <svg
                  className="h-4 w-4 mr-1.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Copy
              </Button>
            </div>
          </div>

          {/* Native share button (if supported) */}
          <NativeShareButton onShare={handleNativeShare} />
        </div>

        {/* Footer decoration */}
        <div className="h-1 bg-gradient-to-r from-flexoki-cyan via-flexoki-blue to-flexoki-purple" />
      </div>
    </div>
  )
}
