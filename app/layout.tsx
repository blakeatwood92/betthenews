import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import Script from "next/script"
import { StickyCTA } from "@/components/sticky-cta"
import { LegalBanner } from "@/components/legal-banner"
import { ErrorBoundary } from "@/components/error-boundary"
import { PerformanceMonitor } from "@/components/performance-monitor"
import "./globals.css"

export const metadata: Metadata = {
  title: "Polymarket Live - Real-time Odds & Breaking News",
  description:
    "Live Polymarket prediction market data and breaking news. Track real-time odds, volume, and market movements on the world's largest prediction market platform.",
  generator: "v0.app",
  keywords: "polymarket, prediction markets, live odds, breaking news, real-time data, market movements, trading",
  openGraph: {
    title: "Polymarket Live - Real-time Odds & Breaking News",
    description: "Live Polymarket prediction market data and breaking news that moves markets.",
    type: "website",
    siteName: "Polymarket Live",
  },
  twitter: {
    card: "summary_large_image",
    title: "Polymarket Live - Real-time Odds & Breaking News",
    description: "Live Polymarket prediction market data and breaking news that moves markets.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
        <link rel="preconnect" href="https://gamma-api.polymarket.com" />
        <link rel="preconnect" href="https://polymarket.com" />
      </head>
      <body>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-0FC0VE7BR3" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0FC0VE7BR3');
          `}
        </Script>

        <ErrorBoundary>
          <LegalBanner />
          {children}
          <StickyCTA />
        </ErrorBoundary>

        <PerformanceMonitor />
      </body>
    </html>
  )
}
