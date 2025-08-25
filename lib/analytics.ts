export interface ClickEvent {
  timestamp: string
  page: string
  referrer?: string
  userAgent?: string
  campaign: string
  source: string
  medium: string
  clickId: string
}

import { kvStorage } from "./kv"

export class AnalyticsEngine {
  private static instance: AnalyticsEngine

  static getInstance(): AnalyticsEngine {
    if (!AnalyticsEngine.instance) {
      AnalyticsEngine.instance = new AnalyticsEngine()
    }
    return AnalyticsEngine.instance
  }

  /**
   * Generate a unique click ID
   */
  generateClickId(): string {
    return `click_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  /**
   * Track affiliate click (server-side)
   */
  async trackAffiliateClick(event: ClickEvent): Promise<void> {
    try {
      await kvStorage.trackClick(event.clickId, event)

      console.log("[Analytics] Affiliate click tracked:", event)

      // TODO: Send to analytics service (PostHog, Mixpanel, etc.)
    } catch (error) {
      console.error("[Analytics] Failed to track click:", error)
    }
  }

  /**
   * Track page view (client-side)
   */
  trackPageView(page: string, properties?: Record<string, any>): void {
    try {
      // Respect Do-Not-Track
      if (navigator.doNotTrack === "1") return

      console.log("[Analytics] Page view:", { page, ...properties })

      // TODO: Send to analytics service
    } catch (error) {
      console.error("[Analytics] Failed to track page view:", error)
    }
  }

  /**
   * Track custom event (client-side)
   */
  trackEvent(event: string, properties?: Record<string, any>): void {
    try {
      // Respect Do-Not-Track
      if (navigator.doNotTrack === "1") return

      console.log("[Analytics] Event:", { event, ...properties })

      // TODO: Send to analytics service
    } catch (error) {
      console.error("[Analytics] Failed to track event:", error)
    }
  }
}

export const analytics = AnalyticsEngine.getInstance()
