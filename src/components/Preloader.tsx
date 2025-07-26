'use client'

import { useState, useEffect } from 'react'
import { Globe } from 'lucide-react'

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Check if page is already loaded
    if (document.readyState === 'complete') {
      setIsLoaded(true)
      setProgress(100)
      return
    }

    // Listen for page load completion
    const handleLoad = () => {
      setIsLoaded(true)
      setProgress(100)
    }

    // Listen for DOM content loaded
    const handleDOMContentLoaded = () => {
      setProgress(70)
    }

    // Simulate loading progress more realistically
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90 && !isLoaded) {
          return prev + Math.random() * 2 // Slow down near completion
        }
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + Math.random() * 20
      })
    }, 150)

    // Add event listeners
    window.addEventListener('load', handleLoad)
    document.addEventListener('DOMContentLoaded', handleDOMContentLoaded)

    return () => {
      clearInterval(progressInterval)
      window.removeEventListener('load', handleLoad)
      document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded)
    }
  }, [isLoaded])

  useEffect(() => {
    if (isLoaded && progress >= 100) {
      // Add a small delay for smooth transition
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isLoaded, progress])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
      <div className="text-center">
        {/* Logo Animation */}
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="w-20 h-20 bg-gradient-to-br from-sky-600 to-sky-700 rounded-2xl flex items-center justify-center mb-4 animate-pulse">
              <Globe className="w-10 h-10 text-white animate-spin" style={{ animationDuration: '3s' }} />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-bounce"></div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Expand India</h1>
          <p className="text-gray-600">Canadian Business Solutions</p>
        </div>

        {/* Loading Bar */}
        <div className="w-64 mx-auto mb-6">
          <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-sky-600 to-sky-700 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
          <div className="text-sm text-gray-500 mt-2">
            Loading... {Math.round(Math.min(progress, 100))}%
          </div>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-sky-600 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-sky-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-sky-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>

        {/* Loading Text */}
        <div className="mt-6 text-sm text-gray-500">
          <div className="animate-pulse">
            {progress < 30 && "Initializing application..."}
            {progress >= 30 && progress < 60 && "Loading resources..."}
            {progress >= 60 && progress < 90 && "Setting up components..."}
            {progress >= 90 && "Almost ready!"}
          </div>
        </div>
      </div>
    </div>
  )
} 