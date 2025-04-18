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
  const magnifierCanvasRef = useRef<HTMLCanvasElement>(null)
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragPointIndex, setDragPointIndex] = useState<number | null>(null)
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit")
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 })
  const [showMagnifier, setShowMagnifier] = useState(false)
  const isMobile = useMobile()

  const magnifierSize = 130; // Size of the magnifier in pixels
  const magnifierZoom = 3; // Zoom level
  
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
        
        if (magnifierCanvasRef.current) {
          magnifierCanvasRef.current.width = magnifierSize;
          magnifierCanvasRef.current.height = magnifierSize;
        }
      }
    }
    img.src = imageUrl
  }, [imageUrl, isMobile])

  // Draw magnifier
  useEffect(() => {
    if (!showMagnifier || !magnifierCanvasRef.current || !canvasRef.current || !image) return;
    
    const magnifierCtx = magnifierCanvasRef.current.getContext('2d');
    if (!magnifierCtx) return;
    
    // Clear the magnifier canvas
    magnifierCtx.clearRect(0, 0, magnifierSize, magnifierSize);
    
    // Calculate the source rectangle in the original canvas
    const sourceX = magnifierPosition.x - (magnifierSize / magnifierZoom / 2);
    const sourceY = magnifierPosition.y - (magnifierSize / magnifierZoom / 2);
    const sourceWidth = magnifierSize / magnifierZoom;
    const sourceHeight = magnifierSize / magnifierZoom;
    
    // Draw the zoomed portion of the main canvas onto the magnifier
    magnifierCtx.drawImage(
      canvasRef.current,
      sourceX, sourceY, sourceWidth, sourceHeight,
      0, 0, magnifierSize, magnifierSize
    );
    
    // Draw a border for the magnifier
    magnifierCtx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
    magnifierCtx.lineWidth = 2;
    magnifierCtx.beginPath();
    magnifierCtx.arc(magnifierSize/2, magnifierSize/2, magnifierSize/2 - 1, 0, Math.PI * 2);
    magnifierCtx.stroke();
    
    // If we have a dragging point, draw a precise crosshair at its position
    if (dragPointIndex !== null) {
      const point = points[dragPointIndex];
      
      // Calculate where the point should be in the magnifier view
      const zoomedX = (point.x * canvasSize.width - sourceX) * magnifierZoom;
      const zoomedY = (point.y * canvasSize.height - sourceY) * magnifierZoom;
      
      // Draw a more precise crosshair
      magnifierCtx.strokeStyle = 'rgba(255, 255, 0, 0.9)';
      magnifierCtx.lineWidth = 1;
      
      // Horizontal line
      magnifierCtx.beginPath();
      magnifierCtx.moveTo(zoomedX - 10, zoomedY);
      magnifierCtx.lineTo(zoomedX + 10, zoomedY);
      magnifierCtx.stroke();
      
      // Vertical line
      magnifierCtx.beginPath();
      magnifierCtx.moveTo(zoomedX, zoomedY - 10);
      magnifierCtx.lineTo(zoomedX, zoomedY + 10);
      magnifierCtx.stroke();
      
      // Small circle at the center point
      magnifierCtx.beginPath();
      magnifierCtx.arc(zoomedX, zoomedY, 3, 0, Math.PI * 2);
      magnifierCtx.stroke();
    } else {
      // Default crosshair at center of magnifier
      magnifierCtx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      magnifierCtx.lineWidth = 1;
      
      // Horizontal line
      magnifierCtx.beginPath();
      magnifierCtx.moveTo(magnifierSize/2 - 10, magnifierSize/2);
      magnifierCtx.lineTo(magnifierSize/2 + 10, magnifierSize/2);
      magnifierCtx.stroke();
      
      // Vertical line
      magnifierCtx.beginPath();
      magnifierCtx.moveTo(magnifierSize/2, magnifierSize/2 - 10);
      magnifierCtx.lineTo(magnifierSize/2, magnifierSize/2 + 10);
      magnifierCtx.stroke();
    }
  }, [showMagnifier, magnifierPosition, points, dragPointIndex, canvasSize, image, magnifierZoom]);

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

    // Draw control points on edit canvas, but skip the currently dragged point
    points.forEach((point, index) => {
      // Skip drawing the point that's currently being dragged
      if (isDragging && dragPointIndex === index) return;
      
      const pointRadius = isMobile ? 12 : 8;
      const fontSize = isMobile ? "12px" : "10px";
      
      // Draw the main control point
      ctx.fillStyle = "rgba(59, 130, 246, 0.7)";
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;

      const x = point.x * canvasSize.width;
      const y = point.y * canvasSize.height;

      ctx.beginPath();
      ctx.arc(x, y, pointRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Draw point index
      ctx.fillStyle = "white";
      ctx.font = `${fontSize} Arial`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText((index + 1).toString(), x, y);
    });

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
  }, [image, points, canvasSize, activeTab, isCropped, isWarped, isMobile, isDragging, dragPointIndex])

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
        setShowMagnifier(true)
        setMagnifierPosition({ x, y })
        return
      }
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return
    
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    if (isDragging && dragPointIndex !== null) {
      // Update point position (normalized to 0-1)
      updatePoint(dragPointIndex, {
        x: Math.max(0, Math.min(1, x / canvasSize.width)),
        y: Math.max(0, Math.min(1, y / canvasSize.height)),
      })
      
      // Position the magnifier away from the cursor
      let magX = x, magY = y;
      
      // Move the magnifier to a different position to avoid finger covering it
      if (isMobile) {
        // Position magnifier above the point on mobile to avoid finger obstruction
        magY = Math.max(magnifierSize/2 + 10, y - 120);
      } else {
        // On desktop, position to the top right of the cursor
        magX = Math.min(canvasSize.width - magnifierSize/2 - 10, x + 50);
        magY = Math.max(magnifierSize/2 + 10, y - 50);
      }
      
      setMagnifierPosition({ x, y });
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setDragPointIndex(null)
    setShowMagnifier(false)
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
        setShowMagnifier(true)
        setMagnifierPosition({ x, y })
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
    
    // Position the magnifier away from the touch point (above the finger)
    const magY = Math.max(magnifierSize/2 + 10, y - 150);
    
    setMagnifierPosition({ x, y });
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    setDragPointIndex(null)
    setShowMagnifier(false)
  }

  // Calculate magnifier position to stay on screen and avoid being under the finger
  const getMagnifierStyle = () => {
    // Canvas center coordinates
    const centerX = canvasSize.width / 2;
    const centerY = canvasSize.height / 2;
    
    // Initial position - place on opposite quadrant from touch point
    let left, top;
    
    // Determine which quadrant the touch is in and place the magnifier in the opposite quadrant
    if (magnifierPosition.x < centerX) {
      // Touch is on left side, place magnifier on right
      left = canvasSize.width - magnifierSize - 30;
    } else {
      // Touch is on right side, place magnifier on left
      left = 30;
    }
    
    // For vertical positioning, never place below the finger
    // If touch is in top half, place at top; if touch is in bottom half, also place at top
    top = 30; // Default to top
    
    // If the magnifier would be too close to the touch point horizontally,
    // adjust to ensure good visibility
    const touchDistX = Math.abs(left + magnifierSize/2 - magnifierPosition.x);
    if (touchDistX < 100) {
      // If the touch is near left edge, move magnifier to right
      if (magnifierPosition.x < centerX) {
        left = Math.min(canvasSize.width - magnifierSize - 20, magnifierPosition.x + 100);
      } else {
        // If the touch is near right edge, move magnifier to left
        left = Math.max(20, magnifierPosition.x - magnifierSize - 100);
      }
    }
    
    // Ensure magnifier stays on screen
    if (left < 10) left = 10;
    if (left > canvasSize.width - magnifierSize - 10) left = canvasSize.width - magnifierSize - 10;
    if (top < 10) top = 10;
    
    return {
      left: `${left}px`,
      top: `${top}px`,
      width: `${magnifierSize}px`,
      height: `${magnifierSize}px`,
      position: 'absolute',
      pointerEvents: 'none',
      borderRadius: '50%',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
      zIndex: 100,
      display: showMagnifier ? 'block' : 'none',
    };
  };

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
          <canvas
            ref={magnifierCanvasRef}
            style={getMagnifierStyle() as React.CSSProperties}
          />
        </div>
      </div>
    </div>
  )
}
