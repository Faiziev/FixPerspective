import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FixPerspective",
  description: "Free online perspective correction for photos. Warp, align, and straighten images with pinpoint Bezier controls. Fast. Precise. No downloads.",
  keywords: ["image correction", "bezier warp", "perspective correction", "image distortion", "photo editing"],
  authors: [{ name: "Faiziev", url: "https://github.com/Faiziev" }],
  creator: "Faiziev",
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "FixPerspective",
    description: "Free online perspective correction for photos. Warp, align, and straighten images with pinpoint Bezier controls. Fast. Precise. No downloads.",
    type: "website",
    siteName: "FixPerspective",
    locale: "en_US",
    alternateLocale: ["es_ES", "fr_FR", "de_DE", "tr_TR", "ru_RU", "ja_JP", "zh_CN"],
  },
  twitter: {
    card: "summary_large_image",
    title: "FixPerspective",
    description: "Free online perspective correction for photos. Warp, align, and straighten images with pinpoint Bezier controls. Fast. Precise. No downloads.",
    creator: "@profuzuli"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}