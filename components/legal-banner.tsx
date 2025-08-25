"use client"

import { useState, useEffect } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { X, AlertTriangle } from "lucide-react"

export function LegalBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [userLocation, setUserLocation] = useState<string | null>(null)

  useEffect(() => {
    // Check if banner was dismissed
    const dismissed = localStorage.getItem("legal-banner-dismissed")
    if (dismissed) return

    // Simple geo-hint (client-side only, not blocking)
    const detectLocation = async () => {
      try {
        // Use a simple timezone-based hint
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
        if (timezone.includes("America")) {
          setUserLocation("US/CA")
          setIsVisible(true)
        }
      } catch (error) {
        // Fallback: show for everyone
        setIsVisible(true)
      }
    }

    detectLocation()
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem("legal-banner-dismissed", "true")
  }

  if (!isVisible) return null

  return (
    <Alert className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
      <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
      <AlertDescription className="flex items-center justify-between">
        <span className="text-sm">
          <strong>US/Canada Notice:</strong> Trading availability may vary by jurisdiction. Always check Polymarket's
          current eligibility and your local laws. 18+ only.
        </span>
        <Button variant="ghost" size="sm" onClick={handleDismiss} className="ml-4 h-6 w-6 p-0">
          <X className="h-3 w-3" />
        </Button>
      </AlertDescription>
    </Alert>
  )
}
