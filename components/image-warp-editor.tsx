"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import ImageCanvas from "./image-canvas"
import ControlPanel from "./control-panel"
import { useImageWarpStore, useLanguageStore } from "@/lib/store"
import { useMobile } from "@/hooks/use-mobile"
import { getTranslation } from "@/lib/translations"

export default function ImageWarpEditor() {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string>("image")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { resetPoints } = useImageWarpStore()
  const { language } = useLanguageStore()
  const isMobile = useMobile()
  
  // Get translations
  const t = getTranslation(language)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      
      // Clean up previous object URL
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl)
      }
      
      // Set the new file and create a new object URL
      setImageFile(file)
      const url = URL.createObjectURL(file)
      setImageUrl(url)
      
      // Save the filename for export
      setFileName(file.name || "image")
      
      // Reset the control points and state
      resetPoints()
      
      // Reset the file input value to ensure change event fires even if the same file is selected
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl)
      }
    }
  }, [imageUrl])

  return (
    <div className="grid gap-6">
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-6 md:p-12 bg-card">
        {!imageUrl ? (
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-sm font-semibold text-foreground">{t.uploadTitle}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{t.uploadDescription}</p>
            <div className="mt-6">
              <Button onClick={triggerFileInput}>{t.selectImage}</Button>
              <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            </div>
          </div>
        ) : (
          <div className="w-full">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold">{t.editImage}</h2>
              <Button variant="outline" onClick={triggerFileInput}>
                {t.changeImage}
              </Button>
            </div>
            <div className={`grid gap-6 ${isMobile ? "" : "md:grid-cols-[1fr_300px]"}`}>
              <ImageCanvas imageUrl={imageUrl} />
              <ControlPanel imageUrl={imageUrl} fileName={fileName} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
