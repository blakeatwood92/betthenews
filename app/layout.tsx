import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import Script from "next/script"
import { StickyCTA } from "@/components/sticky-cta"
import { LegalBanner } from "@/components/legal-banner"
import "./globals.css"

export const metadata: Metadata = {
  title: "BetTheNews - If it's in the news, it's on the board",
  description:
    "Turn breaking news into prediction market opportunities. Discover what you can bet on from today's headlines.",
  generator: "v0.app",
  keywords: "prediction markets, news betting, polymarket, current events, political betting",
  openGraph: {
    title: "BetTheNews - If it's in the news, it's on the board",
    description: "Turn breaking news into prediction market opportunities.",
    type: "website",
    siteName: "BetTheNews",
  },
  twitter: {
    card: "summary_large_image",
    title: "BetTheNews - If it's in the news, it's on the board",
    description: "Turn breaking news into prediction market opportunities.",
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

        <LegalBanner />
        {children}
        <StickyCTA />
      </body>
    </html>
  )
}
