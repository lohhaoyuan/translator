"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Toast, useToast } from "@/components/ui/toast"
import { decodePhrase, copyToClipboard } from "@/lib/utils"
import { languages, getLanguageByCode } from "@/lib/languages"

export default function TranslatePage() {
  const params = useParams()
  const encoded = params.encoded as string

  const [originalPhrase, setOriginalPhrase] = React.useState("")
  const [selectedLanguage, setSelectedLanguage] = React.useState("")
  const [translatedText, setTranslatedText] = React.useState("")
  const [isTranslating, setIsTranslating] = React.useState(false)
  const [error, setError] = React.useState("")
  const { toast, showToast, hideToast } = useToast()

  // Decode the phrase on mount
  React.useEffect(() => {
    if (encoded) {
      const decoded = decodePhrase(encoded)
      if (decoded) {
        setOriginalPhrase(decoded)
      } else {
        setError("Invalid or corrupted link")
      }
    }
  }, [encoded])

  const handleTranslate = async () => {
    if (!selectedLanguage || !originalPhrase) return

    setIsTranslating(true)
    setError("")
    setTranslatedText("")

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: originalPhrase,
          targetLanguage: selectedLanguage,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Translation failed")
      }

      setTranslatedText(data.translatedText)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Translation failed")
      showToast("Translation failed. Please try again.", "error")
    } finally {
      setIsTranslating(false)
    }
  }

  const handleCopyTranslation = async () => {
    const success = await copyToClipboard(translatedText)
    if (success) {
      showToast("Translation copied!", "success")
    }
  }

  const selectedLang = getLanguageByCode(selectedLanguage)

  if (error && !originalPhrase) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-flexoki-red/10 mx-auto mb-4">
              <svg
                className="h-8 w-8 text-flexoki-red"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-flexoki-tx mb-2">
              Invalid Link
            </h2>
            <p className="text-flexoki-tx-2 mb-6">
              This translation link appears to be invalid or corrupted.
            </p>
            <Link href="/">
              <Button>Create New Translation Link</Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-flexoki-ui-2 bg-flexoki-paper-2/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-flexoki-cyan to-flexoki-blue shadow-sm group-hover:shadow-md transition-shadow">
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
          </Link>
          <Link href="/">
            <Button variant="outline" size="sm">
              Create Your Own
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-2xl space-y-6">
          {/* Original Phrase Card */}
          <Card className="animate-fade-in">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-flexoki-orange/10">
                  <svg
                    className="h-4 w-4 text-flexoki-orange"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                </div>
                <CardTitle className="text-lg">Original Phrase</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-lg bg-flexoki-paper border-2 border-flexoki-ui-2">
                <p className="text-flexoki-tx text-lg leading-relaxed whitespace-pre-wrap">
                  {originalPhrase}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Language Selection */}
          <Card className="animate-slide-up" style={{ animationDelay: "100ms" }}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-flexoki-cyan/10">
                  <svg
                    className="h-4 w-4 text-flexoki-cyan"
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
                </div>
                <CardTitle className="text-lg">Choose Language</CardTitle>
              </div>
              <CardDescription>
                Select the language you want to translate to
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select
                value={selectedLanguage}
                onValueChange={setSelectedLanguage}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a language..." />
                </SelectTrigger>
                <SelectContent searchable>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      <span className="flex items-center gap-2">
                        <span className="font-medium">{lang.name}</span>
                        {lang.nativeName && lang.nativeName !== lang.name && (
                          <span className="text-flexoki-tx-3">
                            ({lang.nativeName})
                          </span>
                        )}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                onClick={handleTranslate}
                className="w-full h-12 text-base gap-2"
                disabled={!selectedLanguage || isTranslating}
              >
                {isTranslating ? (
                  <>
                    <svg
                      className="h-4 w-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Translating...
                  </>
                ) : (
                  <>
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
                        d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                      />
                    </svg>
                    Translate to {selectedLang?.name || "Selected Language"}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Translation Result */}
          {translatedText && (
            <Card
              className="animate-slide-up border-2 border-flexoki-green/30"
              style={{ animationDelay: "200ms" }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-flexoki-green/10">
                      <svg
                        className="h-4 w-4 text-flexoki-green"
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
                    </div>
                    <CardTitle className="text-lg">
                      Translation ({selectedLang?.name})
                    </CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyTranslation}
                    className="gap-1.5"
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
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    Copy
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="p-4 rounded-lg bg-flexoki-green/5 border-2 border-flexoki-green/20">
                  <p className="text-flexoki-tx text-lg leading-relaxed whitespace-pre-wrap">
                    {translatedText}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Error Message */}
          {error && !translatedText && (
            <div className="p-4 rounded-lg bg-flexoki-red/10 border border-flexoki-red/20 text-flexoki-red text-center animate-fade-in">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-flexoki-ui-2 py-6 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-flexoki-tx-3">
          <p>Powered by Google Translate / &copy; 2025 Loh Hao Yuan</p> 
          <Link href="/" className="hover:text-flexoki-cyan transition-colors">
            Create your own translation link →
          </Link>
        </div>
      </footer>

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
