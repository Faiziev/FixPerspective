"use client"

import * as React from "react"
import { Check, Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguageStore } from "@/lib/store"
import { translations } from "@/lib/translations"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguageStore()
  
  const languageNames: Record<string, string> = {
    en: "English",
    es: "Español",
    fr: "Français",
    de: "Deutsch",
    tr: "Türkçe",
    ru: "Русский",
    ja: "日本語",
    zh: "中文"
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Change Language">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.keys(translations).map((lang) => (
          <DropdownMenuItem 
            key={lang}
            onClick={() => setLanguage(lang)}
            className="flex items-center justify-between"
          >
            <span>{languageNames[lang] || lang}</span>
            {lang === language && <Check className="h-4 w-4 ml-2" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 