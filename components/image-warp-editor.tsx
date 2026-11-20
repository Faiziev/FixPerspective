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
  const [isDragging, setIsDragging] = useState(false) // État pour le style au survol
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { resetPoints } = useImageWarpStore()
  const { language } = useLanguageStore()
  const isMobile = useMobile()
  
  const t = getTranslation(language)

  // Logique centralisée pour traiter le fichier (Input ou Drag & Drop)
  const processFile = (file: File) => {
    // Vérifie que le fichier déposé est bien une image
    if (!file.type.startsWith("image/")) {
      return
    }

    if (imageUrl) {
      URL.revokeObjectURL(imageUrl)
    }

    setImageFile(file)
    const url = URL.createObjectURL(file)
    setImageUrl(url)
    setFileName(file.name || "image")
    resetPoints()

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0])
    }
  }

  // Gestionnaires d'événements Drag & Drop
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault() // Obligatoire pour autoriser le drop
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault() // Empêche le navigateur d'ouvrir l'image
    e.stopPropagation()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0])
    }
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl)
      }
    }
  }, [imageUrl])

  return (
    <div className="grid gap-6">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 md:p-12 transition-colors ${
          isDragging
            ? "border-primary bg-primary/10"
            : "border-border bg-card"
        }`}
      >
        {!imageUrl ? (
          <div className="text-center pointer-events-none">
            <Upload className={`mx-auto h-12 w-12 ${isDragging ? "text-primary" : "text-muted-foreground"}`} />
            <h3 className="mt-2 text-sm font-semibold text-foreground">{t.uploadTitle}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{t.uploadDescription}</p>
            {/* pointer-events-auto rétablit le clic uniquement sur le bouton */}
            <div className="mt-6 pointer-events-auto">
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
              <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
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
