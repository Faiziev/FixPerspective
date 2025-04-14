"use client"

import { create } from "zustand"

export interface Point {
  x: number
  y: number
}

interface ImageWarpState {
  points: Point[]
  isCropped: boolean
  isWarped: boolean
  updatePoint: (index: number, position: { x: number; y: number }) => void
  resetPoints: () => void
  setCropStatus: (status: boolean) => void
  setWarpStatus: (status: boolean) => void
}

// Default points positioned at the corners of the image in a quadrilateral shape
const DEFAULT_POINTS: Point[] = [
  // Top-left
  { x: 0.2, y: 0.2 },
  // Top-right
  { x: 0.8, y: 0.2 },
  // Bottom-right
  { x: 0.8, y: 0.8 },
  // Bottom-left
  { x: 0.2, y: 0.8 },
]

export const useImageWarpStore = create<ImageWarpState>((set) => ({
  points: [...DEFAULT_POINTS],
  isCropped: false,
  isWarped: false,

  updatePoint: (index, position) =>
    set((state) => {
      const newPoints = [...state.points]
      newPoints[index] = {
        ...newPoints[index],
        x: position.x,
        y: position.y,
      }
      return { points: newPoints }
    }),

  resetPoints: () => set({ points: [...DEFAULT_POINTS], isCropped: false, isWarped: false }),

  setCropStatus: (status) => set({ isCropped: status, isWarped: false }),

  setWarpStatus: (status) => set({ isWarped: status }),
}))

// Interface for language support
interface LanguageState {
  language: string
  setLanguage: (language: string) => void
}

// Create a store for language settings
export const useLanguageStore = create<LanguageState>((set) => ({
  language: typeof navigator !== 'undefined' 
    ? (navigator.language.split('-')[0] || 'en') 
    : 'en',
  setLanguage: (language) => set({ language }),
}))
