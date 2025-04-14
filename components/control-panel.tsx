"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { useImageWarpStore, useLanguageStore } from "@/lib/store"
import { Download, RotateCcw, Crop, Check, Move } from "lucide-react"
import { exportWarpedImage } from "@/lib/warp"
import { useMobile } from "@/hooks/use-mobile"
import { getTranslation } from "@/lib/translations"

interface ControlPanelProps {
  imageUrl: string
  fileName?: string  // Optional filename for export
}

export default function ControlPanel({ imageUrl, fileName = "image" }: ControlPanelProps) {
  const { resetPoints, points, isCropped, isWarped, setCropStatus, setWarpStatus } = useImageWarpStore()
  const { language } = useLanguageStore()
  const [quality, setQuality] = useState(90)
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const isMobile = useMobile()
  
  // Get translations
  const t = getTranslation(language)

  // Load the image for export
  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      setImage(img)
      console.log("Original image loaded for export. Dimensions:", img.width, "x", img.height)
    }
    img.src = imageUrl
  }, [imageUrl])

  const handleExport = () => {
    try {
      // Check if we have the full-resolution image
      if (!image) {
        console.error("Original image not loaded yet")
        return
      }

      console.log("Starting high-quality export. Original dimensions:", image.width, "x", image.height)
      
      // Get the preview canvas for reference (to check parameters, but not for pixel data)
      const previewCanvas = document.getElementById("preview-canvas") as HTMLCanvasElement
      if (!previewCanvas) {
        console.error("Preview canvas not found")
        return
      }

      // Create a high-resolution canvas for processing
      const highResCanvas = document.createElement("canvas")
      highResCanvas.width = image.width
      highResCanvas.height = image.height
      const highResCtx = highResCanvas.getContext("2d")
      if (!highResCtx) {
        console.error("Failed to create high-res context")
        return
      }

      // Draw the original image at full resolution
      highResCtx.drawImage(image, 0, 0, image.width, image.height)

      // Scale the control points to match the original image dimensions
      const scaleX = image.width / previewCanvas.width
      const scaleY = image.height / previewCanvas.height
      
      const scaledPoints = points.map(point => ({
        x: point.x,  // Keep normalized coordinates (0-1)
        y: point.y
      }))

      console.log("Using scaled points for high-res export. Scale factors:", 
                  scaleX.toFixed(2), "x", scaleY.toFixed(2))
      
      // Get the data URL of the high-resolution image with perspective correction
      const dataUrl = exportWarpedImage(highResCanvas, scaledPoints, quality / 100)
      
      if (!dataUrl || dataUrl.length < 100) {
        console.error("Failed to generate valid data URL")
        return
      }

      // Calculate approximate output dimensions
      const minX = Math.min(...points.map(p => p.x))
      const minY = Math.min(...points.map(p => p.y))
      const maxX = Math.max(...points.map(p => p.x))
      const maxY = Math.max(...points.map(p => p.y))
      const outputWidth = Math.round((maxX - minX) * image.width)
      const outputHeight = Math.round((maxY - minY) * image.height)

      // Create a temporary link to download the image
      const link = document.createElement("a")
      const fileFormat = quality >= 95 ? "png" : "jpg"
      
      // Get base filename without extension
      const baseFileName = fileName.replace(/\.[^/.]+$/, "") || "image"
      
      // Create descriptive filename with dimensions
      const outputFileName = isWarped 
        ? `${baseFileName}-perspective-corrected.${fileFormat}` 
        : `${baseFileName}-cropped.${fileFormat}`
        
      link.download = outputFileName
      link.href = dataUrl
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      console.log("High-resolution export complete")
    } catch (error) {
      console.error("Error during export:", error)
    }
  }

  const toggleCrop = () => {
    setCropStatus(!isCropped)
  }

  const toggleWarp = () => {
    if (!isCropped) {
      // If not cropped yet, crop first then warp
      setCropStatus(true)
      setWarpStatus(true)
    } else {
      // Toggle warp state
      setWarpStatus(!isWarped)
    }
  }

  return (
    <div className="bg-card border rounded-lg p-4">
      <Tabs defaultValue="warp">
        <TabsList className="grid grid-cols-2 mb-4 w-full">
          <TabsTrigger value="warp">{t.editTab}</TabsTrigger>
          <TabsTrigger value="export">{t.exportTab}</TabsTrigger>
        </TabsList>

        <TabsContent value="warp" className="space-y-4">
          <div className="pt-2">
            <Button variant="outline" className="w-full" onClick={resetPoints}>
              <RotateCcw className="h-4 w-4 mr-2" />
              {t.resetPoints}
            </Button>
          </div>

          <div className="pt-2">
            <Button variant={isCropped ? "default" : "outline"} className="w-full" onClick={toggleCrop}>
              {isCropped ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  {t.cropped}
                </>
              ) : (
                <>
                  <Crop className="h-4 w-4 mr-2" />
                  {t.cropImage}
                </>
              )}
            </Button>
          </div>

          <div className="pt-2">
            <Button
              variant={isWarped ? "default" : "outline"}
              className="w-full"
              onClick={toggleWarp}
              disabled={!isCropped && !isWarped}
            >
              {isWarped ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  {t.perspectiveCorrected}
                </>
              ) : (
                <>
                  <Move className="h-4 w-4 mr-2" />
                  {t.applyPerspective}
                </>
              )}
            </Button>
          </div>

          {!isMobile && (
            <div className="pt-4 border-t">
              <h3 className="text-sm font-medium mb-2">{t.controlPoints}</h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {points.map((point, i) => (
                  <div key={i} className="p-2 border rounded">
                    <div className="font-medium">Point {i + 1}</div>
                    <div className="text-muted-foreground">
                      x: {point.x.toFixed(2)}, y: {point.y.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="export" className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">{t.quality}</h3>
            <div className="flex items-center gap-4">
              <Slider value={[quality]} min={10} max={100} step={1} onValueChange={(value) => setQuality(value[0])} />
              <span className="text-sm w-8">{quality}%</span>
            </div>
          </div>

          <div className="pt-2">
            <h3 className="text-sm font-medium mb-2">{t.format}</h3>
            <div className="text-xs text-muted-foreground mb-2">
              {quality >= 95 ? t.formatPng : t.formatJpg}
            </div>
          </div>

          <div className="pt-4">
            <Button className="w-full" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              {t.exportImage}
            </Button>
          </div>

          <div className="pt-4 text-xs text-muted-foreground">
            <p>
              {isWarped
                ? t.perspectiveExportDesc
                : isCropped
                  ? t.croppedExportDesc
                  : t.requireCropDesc}
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
