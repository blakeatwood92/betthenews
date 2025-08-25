"use client"

import { useEffect } from "react"

export function PerformanceMonitor() {
  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV !== "development") return

    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === "navigation") {
          console.log("[v0] Navigation timing:", {
            domContentLoaded: entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
            loadComplete: entry.loadEventEnd - entry.loadEventStart,
          })
        }

        if (entry.entryType === "paint") {
          console.log(`[v0] ${entry.name}:`, entry.startTime)
        }

        if (entry.entryType === "largest-contentful-paint") {
          console.log("[v0] LCP:", entry.startTime)
        }
      })
    })

    observer.observe({ entryTypes: ["navigation", "paint", "largest-contentful-paint"] })

    return () => observer.disconnect()
  }, [])

  return null
}
