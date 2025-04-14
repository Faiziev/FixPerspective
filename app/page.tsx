"use client"

// This fixes JSX element type errors by declaring JSX namespace
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

import { useState, useEffect } from "react"
import ImageWarpEditor from "@/components/image-warp-editor"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguageStore } from "@/lib/store"
import { getTranslation } from "@/lib/translations"
import Head from "next/head"

export default function Home() {
  const { language } = useLanguageStore()
  const [mounted, setMounted] = useState(false)
  
  // Ensure component is mounted before accessing browser features
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Get translations based on the selected language
  const t = getTranslation(language)
  
  // Avoid hydration mismatch by rendering only on the client
  if (!mounted) return null
  
  return (
    <>
      <Head>
        <title>{t.metaTitle}</title>
        <meta name="description" content={t.metaDescription} />
        <meta property="og:title" content={t.metaTitle} />
        <meta property="og:description" content={t.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.metaTitle} />
        <meta name="twitter:description" content={t.metaDescription} />
        <link rel="canonical" href="https://bezier-warp.vercel.app" />
      </Head>
      <main className="min-h-screen p-4 md:p-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">FixPerspective</h1>
            <div className="flex items-center gap-4">
              <a href="https://www.buymeacoffee.com/faiziev" className="hidden sm:inline-block">
                <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=faiziev&button_colour=000000&font_colour=ffffff&font_family=Cookie&outline_colour=ffffff&coffee_colour=FFDD00" alt="Buy Me A Coffee" style={{height: "40px"}} />
              </a>
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>
          <p className="mb-8 text-muted-foreground">
            {t.appDescription}
          </p>
          <ImageWarpEditor />
          
          <div className="mt-12 text-center">
            <div className="flex flex-col items-center justify-center gap-3">
              <a href="https://github.com/Faiziev" className="text-sm text-muted-foreground hover:text-foreground">
                Created by Faiziev
              </a>
              <a href="https://www.buymeacoffee.com/faiziev" className="sm:hidden block mt-2">
                <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=faiziev&button_colour=000000&font_colour=ffffff&font_family=Cookie&outline_colour=ffffff&coffee_colour=FFDD00" alt="Buy Me A Coffee" style={{height: "42px"}} />
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
