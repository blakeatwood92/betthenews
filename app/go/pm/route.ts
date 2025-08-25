import { type NextRequest, NextResponse } from "next/server"
import { analytics } from "@/lib/analytics"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  // Get environment variables
  const affiliateUrl = process.env.AFFILIATE_URL || "https://polymarket.com/?modal=signup&mt=7&via=blake-atwood"
  const affiliateFallback =
    process.env.AFFILIATE_URL_FALLBACK || "https://polymarket.com/?modal=signup&mt=7&via=blake-atwood"
  const campaignSlug = process.env.AFFILIATE_CAMPAIGN_SLUG || "betthenews"

  // Build UTM parameters
  const utmParams = new URLSearchParams({
    utm_source: "betthenews",
    utm_medium: "site",
    utm_campaign: campaignSlug,
  })

  // Add any additional parameters from the request
  for (const [key, value] of searchParams.entries()) {
    if (!key.startsWith("utm_")) {
      utmParams.set(key, value)
    }
  }

  // Choose URL (fallback if main has double ?)
  const targetUrl = affiliateUrl.includes("??") ? affiliateFallback : affiliateUrl
  const finalUrl = `${targetUrl}&${utmParams.toString()}`

  const clickEvent = {
    timestamp: new Date().toISOString(),
    page: request.headers.get("referer") || "unknown",
    referrer: request.headers.get("referer"),
    userAgent: request.headers.get("user-agent"),
    campaign: campaignSlug,
    source: "betthenews",
    medium: "site",
    clickId: analytics.generateClickId(),
  }

  // Track the click
  await analytics.trackAffiliateClick(clickEvent)

  return NextResponse.redirect(finalUrl, 302)
}
