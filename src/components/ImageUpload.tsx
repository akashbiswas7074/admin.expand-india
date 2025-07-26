"use client"

import React, { useState, useRef } from "react"
import { X, ImageIcon } from "lucide-react"

interface ImageUploadProps {
  onImageUpload: (url: string, publicId?: string) => void
  onImageDelete?: (publicId: string) => void
  currentImage?: string
  currentPublicId?: string
  className?: string
}

export default function ImageUpload({ 
  onImageUpload, 
  onImageDelete, 
  currentImage, 
  currentPublicId,
  className = "" 
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [preview, setPreview] = useState(currentImage || "")
  const [publicId, setPublicId] = useState(currentPublicId || "")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (file: File) => {
    if (!file) return

    setUploading(true)
    
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        setPreview(data.imageUrl)
        setPublicId(data.publicId)
        onImageUpload(data.imageUrl, data.publicId)
      } else {
        const errorData = await response.json()
        alert(errorData.error || "Failed to upload image")
      }
    } catch (error) {
      console.error("Upload error:", error)
      alert("Failed to upload image")
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteImage = async () => {
    if (!publicId || !onImageDelete) return

    try {
      const response = await fetch(`/api/upload?publicId=${encodeURIComponent(publicId)}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setPreview("")
        setPublicId("")
        onImageDelete(publicId)
        onImageUpload("")
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
      } else {
        const errorData = await response.json()
        alert(errorData.error || "Failed to delete image")
      }
    } catch (error) {
      console.error("Delete error:", error)
      alert("Failed to delete image")
    }
  }

  const removeImage = () => {
    setPreview("")
    setPublicId("")
    onImageUpload("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0])
    }
  }

  if (preview) {
    return (
      <div className={`relative ${className}`}>
        <img
          src={preview}
          alt="Uploaded preview"
          className="w-full h-48 object-cover rounded-lg border border-gray-300"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          {onImageDelete && publicId && (
            <button
              type="button"
              onClick={handleDeleteImage}
              className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
              title="Delete from Cloudinary"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={removeImage}
            className="bg-gray-500 text-white p-1 rounded-full hover:bg-gray-600 transition-colors"
            title="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive
            ? "border-primary-500 bg-primary-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <div className="flex flex-col items-center">
          {uploading ? (
            <>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mb-4"></div>
              <p className="text-sm text-gray-600">Uploading...</p>
            </>
          ) : (
            <>
              <ImageIcon className="w-12 h-12 text-gray-400 mb-4" />
              <p className="text-sm text-gray-600 mb-2">
                Drag and drop an image here, or{" "}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-primary-600 hover:text-primary-500 underline"
                >
                  browse
                </button>
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF up to 10MB
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
} 