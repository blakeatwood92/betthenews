"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, DollarSign, TrendingUp } from "lucide-react"
import Link from "next/link"
import { analytics } from "@/lib/analytics"

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Check if user has dismissed the CTA
    const dismissed = localStorage.getItem("sticky-cta-dismissed")
    if (dismissed) {
      setIsDismissed(true)
      return
    }

    // Show CTA after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
    localStorage.setItem("sticky-cta-dismissed", "true")
    analytics.trackEvent("sticky_cta_dismissed")
  }

  const handleClick = () => {
    analytics.trackEvent("sticky_cta_clicked", {
      location: "bottom_mobile",
    })
  }

  if (isDismissed || !isVisible) return null

  return (
    <>
      {/* Mobile Bottom Sheet */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <Card className="rounded-t-lg rounded-b-none border-t border-x-0 border-b-0 bg-primary text-primary-foreground">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                <span className="font-semibold">$10 Bonus Available</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDismiss}
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm mb-3 opacity-90">
              New users get a $10 bonus when they sign up and make their first trade.
            </p>
            <Button
              asChild
              className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              onClick={handleClick}
            >
              <Link href="/go/pm">
                <TrendingUp className="mr-2 h-4 w-4" />
                Claim Your Bonus
              </Link>
            </Button>
          </div>
        </Card>
      </div>

      {/* Desktop Floating CTA */}
      <div className="fixed bottom-6 right-6 z-50 hidden md:block">
        <Card className="bg-primary text-primary-foreground shadow-lg">
          <div className="p-4 max-w-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span className="font-semibold text-sm">$10 Bonus</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDismiss}
                className="text-primary-foreground hover:bg-primary-foreground/20 h-6 w-6 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            <p className="text-xs mb-3 opacity-90">Get $10 when you sign up and make your first trade.</p>
            <Button
              size="sm"
              asChild
              className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              onClick={handleClick}
            >
              <Link href="/go/pm">Claim Bonus</Link>
            </Button>
          </div>
        </Card>
      </div>
    </>
  )
}
