"use client"

import * as React from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ShareDialog } from "@/components/ui/share-dialog"
import { Toast, useToast } from "@/components/ui/toast"
import { generateShareableLink } from "@/lib/utils"

export default function HomePage() {
  const [phrase, setPhrase] = React.useState("")
  const [shareDialogOpen, setShareDialogOpen] = React.useState(false)
  const [shareableUrl, setShareableUrl] = React.useState("")
  const { toast, showToast, hideToast } = useToast()

  const handleGenerateLink = () => {
    if (!phrase.trim()) {
      showToast("Please enter a phrase to translate", "error")
      return
    }

    const baseUrl = typeof window !== "undefined" ? window.location.origin : ""
    const url = generateShareableLink(phrase.trim(), baseUrl)
    setShareableUrl(url)
    setShareDialogOpen(true)
  }

  const handleCopied = () => {
    showToast("Link copied to clipboard!", "success")
  }

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-flexoki-ui-2 bg-flexoki-paper-2/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-flexoki-cyan to-flexoki-blue shadow-sm">
              <svg
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-flexoki-tx">
                Phrase Translator
              </h1>
              <p className="text-xs text-flexoki-tx-2">
                Share phrases in 240+ languages
              </p>
            </div>
          </div>
          <a
            href="https://translate.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-flexoki-tx-3 hover:text-flexoki-cyan transition-colors"
          >
            Powered by Google Translate
          </a>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-2xl space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-3 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold text-flexoki-tx tracking-tight">
              Translate anything,
              <span className="block text-flexoki-cyan">share everywhere</span>
            </h2>
            <p className="text-flexoki-tx-2 text-lg max-w-md mx-auto">
              Enter a phrase, get a shareable link. Recipients choose their
              language.
            </p>
          </div>

          {/* Input Card */}
          <Card className="animate-slide-up" style={{ animationDelay: "100ms" }}>
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Your Phrase</CardTitle>
              <CardDescription>
                Enter the text you want to make translatable
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Type or paste your phrase here..."
                value={phrase}
                onChange={(e) => setPhrase(e.target.value)}
                className="min-h-[160px] text-lg"
                maxLength={2000}
              />
              <div className="flex items-center justify-between">
                <span className="text-sm text-flexoki-tx-3">
                  {phrase.length} / 2000 characters
                </span>
                <Button
                  onClick={handleGenerateLink}
                  size="lg"
                  className="gap-2"
                  disabled={!phrase.trim()}
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                  Generate Share Link
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-slide-up"
            style={{ animationDelay: "200ms" }}
          >
            {[
              {
                icon: (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                title: "240+ Languages",
                description: "Support for virtually every language",
              },
              {
                icon: (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                ),
                title: "Instant Sharing",
                description: "Generate links in one click",
              },
              {
                icon: (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                ),
                title: "AI-Powered",
                description: "High-quality translations",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center p-4 rounded-xl bg-flexoki-paper-2/50 border border-flexoki-ui"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-flexoki-cyan/10 text-flexoki-cyan mb-3">
                  {feature.icon}
                </div>
                <h3 className="font-medium text-flexoki-tx mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-flexoki-tx-3">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-flexoki-ui-2 py-6 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-flexoki-tx-3">
          <p>&copy; 2025 Loh Hao Yuan</p>
          <div className="flex items-center gap-4">
            <a
              href="https://translate.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-flexoki-cyan transition-colors"
            >
              Google Translate
            </a>
            <span>•</span>
            <span>240+ Languages</span>
          </div>
        </div>
      </footer>

      {/* Share Dialog */}
      <ShareDialog
        open={shareDialogOpen}
        onClose={() => setShareDialogOpen(false)}
        url={shareableUrl}
        phrase={phrase}
        onCopied={handleCopied}
      />

      {/* Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onClose={hideToast}
      />
    </main>
  )
}
