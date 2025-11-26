import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Encode phrase for URL-safe sharing
// Uses URL-safe base64 (replaces + with -, / with _, removes =)
export function encodePhrase(phrase: string): string {
  const base64 = btoa(encodeURIComponent(phrase))
  // Make it URL-safe
  return base64
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

// Decode phrase from URL
export function decodePhrase(encoded: string): string {
  try {
    // Restore standard base64 from URL-safe version
    let base64 = encoded
      .replace(/-/g, '+')
      .replace(/_/g, '/')
    
    // Add back padding if needed
    const padding = base64.length % 4
    if (padding) {
      base64 += '='.repeat(4 - padding)
    }
    
    return decodeURIComponent(atob(base64))
  } catch (e) {
    console.error('Failed to decode phrase:', e)
    return ""
  }
}

// Generate shareable link
export function generateShareableLink(phrase: string, baseUrl: string): string {
  const encoded = encodePhrase(phrase)
  return `${baseUrl}/translate/${encoded}`
}

// Copy to clipboard with fallback
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = text
      textArea.style.position = "fixed"
      textArea.style.left = "-999999px"
      textArea.style.top = "-999999px"
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      try {
        document.execCommand("copy")
        return true
      } catch {
        return false
      } finally {
        textArea.remove()
      }
    }
  } catch {
    return false
  }
}

// Use Web Share API if available
export async function shareLink(
  url: string,
  title: string,
  text: string
): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({ url, title, text })
      return true
    } catch (err) {
      // User cancelled or share failed
      if ((err as Error).name !== "AbortError") {
        console.error("Share failed:", err)
      }
      return false
    }
  }
  return false
}