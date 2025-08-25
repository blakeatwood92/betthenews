"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Star, TrendingUp } from "lucide-react"
import Link from "next/link"
import { analytics } from "@/lib/analytics"

interface PromoBannerProps {
  variant?: "hero" | "inline" | "sidebar"
  className?: string
}

export function PromoBanner({ variant = "inline", className = "" }: PromoBannerProps) {
  const handleClick = () => {
    analytics.trackEvent("promo_banner_clicked", {
      variant,
      location: "promo_banner",
    })
  }

  if (variant === "hero") {
    return (
      <div className={`bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="bg-primary/20 text-primary">
                <Star className="h-3 w-3 mr-1" />
                Limited Time
              </Badge>
            </div>
            <h3 className="text-xl font-bold mb-2">Get $10 Bonus to Start Betting</h3>
            <p className="text-muted-foreground mb-4">
              New users receive a $10 bonus when they sign up and make their first trade on Polymarket.
            </p>
            <Button size="lg" asChild onClick={handleClick}>
              <Link href="/go/pm">
                <DollarSign className="mr-2 h-5 w-5" />
                Claim Your $10 Bonus
              </Link>
            </Button>
          </div>
          <div className="hidden md:block ml-6">
            <div className="text-4xl font-bold text-primary">$10</div>
            <div className="text-sm text-muted-foreground">Free Bonus</div>
          </div>
        </div>
      </div>
    )
  }

  if (variant === "sidebar") {
    return (
      <Card className={`bg-primary/5 border-primary/20 ${className}`}>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign className="h-5 w-5 text-primary" />
            <span className="font-semibold">$10 Bonus</span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Get $10 when you sign up and make your first trade.</p>
          <Button size="sm" className="w-full" asChild onClick={handleClick}>
            <Link href="/go/pm">Claim Bonus</Link>
          </Button>
        </div>
      </Card>
    )
  }

  // Default inline variant
  return (
    <Card className={`bg-primary/5 border-primary/20 ${className}`}>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/20 p-2 rounded-full">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="font-semibold">$10 Welcome Bonus</div>
              <div className="text-sm text-muted-foreground">For new users who sign up and trade</div>
            </div>
          </div>
          <Button asChild onClick={handleClick}>
            <Link href="/go/pm">
              <TrendingUp className="mr-2 h-4 w-4" />
              Get Started
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  )
}
