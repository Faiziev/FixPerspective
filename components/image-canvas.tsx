"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { useImageWarpStore } from "@/lib/store"
import { drawPath, drawControlPoints, cropImage, perspectiveTransform } from "@/lib/warp"
import { useMobile } from "@/hooks/use-mobile"

interface ImageCanvasProps {
  imageUrl: string
}

export default function ImageCanvas({ imageUrl }: ImageCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const croppedCanvasRef = useRef<HTMLCanvasElement>(null)
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragPointIndex, setDragPointIndex] = useState<number | null>(null)
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit")
  const isMobile = useMobile()

  const { points, updatePoint, isCropped, isWarped } = useImageWarpStore()

  // Load image
  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      setImage(img)
      if (canvasRef.current && previewCanvasRef.current && croppedCanvasRef.current) {
        // Set canvas size based on image dimensions, but constrained to viewport
        const maxWidth = isMobile ? window.innerWidth - 32 : Math.min(800, window.innerWidth - 40)
        const scale = maxWidth / img.width
        const width = maxWidth
        const height = img.height * scale

        setCanvasSize({ width, height })

        canvasRef.current.width = width
        canvasRef.current.height = height
        previewCanvasRef.current.width = width
        previewCanvasRef.current.height = height
        croppedCanvasRef.current.width = width
        croppedCanvasRef.current.height = height
      }
    }
    img.src = imageUrl
  }, [imageUrl, isMobile])

  // Resize canvas on window resize
  useEffect(() => {
    const handleResize = () => {
      if (!image || !canvasRef.current || !previewCanvasRef.current || !croppedCanvasRef.current) return

      const maxWidth = isMobile ? window.innerWidth - 32 : Math.min(800, window.innerWidth - 40)
      const scale = maxWidth / image.width
      const width = maxWidth
      const height = image.height * scale

      setCanvasSize({ width, height })

      canvasRef.current.width = width
      canvasRef.current.height = height
      previewCanvasRef.current.width = width
      previewCanvasRef.current.height = height
      croppedCanvasRef.current.width = width
      croppedCanvasRef.current.height = height
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [image, isMobile])

  // Draw canvas
  useEffect(() => {
    if (!canvasRef.current || !image || !previewCanvasRef.current || !croppedCanvasRef.current) return

    const ctx = canvasRef.current.getContext("2d")
    const previewCtx = previewCanvasRef.current.getContext("2d")
    const croppedCtx = croppedCanvasRef.current.getContext("2d")

    if (!ctx || !previewCtx || !croppedCtx) return

    // Clear canvases
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    previewCtx.clearRect(0, 0, previewCanvasRef.current.width, previewCanvasRef.current.height)
    croppedCtx.clearRect(0, 0, croppedCanvasRef.current.width, croppedCanvasRef.current.height)

    // Draw image on edit canvas
    ctx.drawImage(image, 0, 0, canvasRef.current.width, canvasRef.current.height)

    // Draw path on edit canvas
    drawPath(ctx, points, canvasSize)

    // Draw control points on edit canvas
    drawControlPoints(ctx, points, canvasSize, isMobile)

    // Always draw the original image to the cropped canvas first
    croppedCtx.drawImage(image, 0, 0, croppedCanvasRef.current.width, croppedCanvasRef.current.height)

    // Handle preview canvas based on crop and warp status
    if (isCropped) {
      // First, crop the image to the shape - apply to the cropped canvas
      cropImage(croppedCtx, image, points, canvasSize)

      if (isWarped) {
        // If warped, apply perspective transform to the cropped image
        previewCtx.clearRect(0, 0, previewCanvasRef.current.width, previewCanvasRef.current.height)
        perspectiveTransform(previewCtx, croppedCanvasRef.current, points, canvasSize)
      } else {
        // If not warped, just show the cropped image
        previewCtx.clearRect(0, 0, previewCanvasRef.current.width, previewCanvasRef.current.height)
        previewCtx.drawImage(croppedCanvasRef.current, 0, 0)
      }
    } else {
      // If not cropped, just show the original image with the selection outline
      previewCtx.drawImage(image, 0, 0, previewCanvasRef.current.width, previewCanvasRef.current.height)
      drawPath(previewCtx, points, canvasSize)
    }
  }, [image, points, canvasSize, activeTab, isCropped, isWarped, isMobile])

  // Handle mouse events
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Check if we're clicking on a control point
    for (let i = 0; i < points.length; i++) {
      const point = points[i]
      const dx = x - point.x * canvasSize.width
      const dy = y - point.y * canvasSize.height
      const distance = Math.sqrt(dx * dx + dy * dy)
      const hitRadius = isMobile ? 15 : 10

      if (distance < hitRadius) {
        setIsDragging(true)
        setDragPointIndex(i)
        return
      }
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !canvasRef.current || dragPointIndex === null) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Update point position (normalized to 0-1)
    updatePoint(dragPointIndex, {
      x: Math.max(0, Math.min(1, x / canvasSize.width)),
      y: Math.max(0, Math.min(1, y / canvasSize.height)),
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setDragPointIndex(null)
  }

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return
    e.preventDefault() // Prevent scrolling while dragging

    const rect = canvasRef.current.getBoundingClientRect()
    const touch = e.touches[0]
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top

    // Check if we're touching a control point
    for (let i = 0; i < points.length; i++) {
      const point = points[i]
      const dx = x - point.x * canvasSize.width
      const dy = y - point.y * canvasSize.height
      const distance = Math.sqrt(dx * dx + dy * dy)
      const hitRadius = 15 // Larger hit area for touch

      if (distance < hitRadius) {
        setIsDragging(true)
        setDragPointIndex(i)
        return
      }
    }
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDragging || !canvasRef.current || dragPointIndex === null) return
    e.preventDefault() // Prevent scrolling while dragging

    const rect = canvasRef.current.getBoundingClientRect()
    const touch = e.touches[0]
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top

    // Update point position (normalized to 0-1)
    updatePoint(dragPointIndex, {
      x: Math.max(0, Math.min(1, x / canvasSize.width)),
      y: Math.max(0, Math.min(1, y / canvasSize.height)),
    })
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    setDragPointIndex(null)
  }

  return (
    <div className="relative border rounded-lg overflow-hidden bg-muted/20">
      <div className="relative">
        <div className="tabs flex border-b">
          <button
            className={`tab px-4 py-2 ${activeTab === "edit" ? "border-b-2 border-primary font-medium" : "text-muted-foreground"}`}
            onClick={() => setActiveTab("edit")}
          >
            Edit
          </button>
          <button
            className={`tab px-4 py-2 ${activeTab === "preview" ? "border-b-2 border-primary font-medium" : "text-muted-foreground"}`}
            onClick={() => setActiveTab("preview")}
          >
            Preview
          </button>
        </div>
        <div className="relative">
          <canvas
            ref={canvasRef}
            className={`block w-full touch-none ${activeTab === "edit" ? "block" : "hidden"}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              width: canvasSize.width,
              height: canvasSize.height,
            }}
          />
          <canvas
            id="preview-canvas"
            ref={previewCanvasRef}
            className={activeTab === "preview" ? "block" : "hidden"}
            style={{
              width: canvasSize.width,
              height: canvasSize.height,
            }}
          />
          <canvas
            id="cropped-canvas"
            ref={croppedCanvasRef}
            className="hidden"
            style={{
              width: canvasSize.width,
              height: canvasSize.height,
            }}
          />
        </div>
      </div>
    </div>
  )
}
