"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Link from "next/link"
import { ArrowLeft, Save, Eye, ImageIcon } from "lucide-react"
import ImageUpload from "@/components/ImageUpload"

const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().optional(),
  image: z.string().optional(),
  published: z.boolean(),
})

type BlogForm = z.infer<typeof blogSchema>

export default function NewBlogPage() {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const router = useRouter()
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BlogForm>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      published: false,
    },
  })

  const watchedContent = watch("content", "")
  const watchedTitle = watch("title", "")

  const onSubmit = async (data: BlogForm) => {
    try {
      setLoading(true)
      
      const response = await fetch("/api/user/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          image: imageUrl || undefined,
        }),
      })

      if (response.ok) {
        router.push("/dashboard/blogs")
      } else {
        const errorData = await response.json()
        alert(errorData.error || "Failed to create blog post")
      }
    } catch (error) {
      console.error("Create blog error:", error)
      alert("Failed to create blog post")
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = (url: string) => {
    setImageUrl(url)
    setValue("image", url)
  }

  const generateExcerpt = () => {
    if (watchedContent) {
      const excerpt = watchedContent.substring(0, 160).trim()
      setValue("excerpt", excerpt)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/dashboard/blogs"
          className="inline-flex items-center text-sm text-primary-600 hover:text-primary-500 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to My Blogs
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Blog Post</h1>
        <p className="text-gray-600">Share your thoughts and ideas with the world</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Editor */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  {...register("title")}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 text-lg"
                  placeholder="Enter your blog post title..."
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image
                </label>
                <ImageUpload
                  onImageUpload={handleImageUpload}
                  currentImage={imageUrl}
                />
              </div>

              {/* Content */}
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  Content *
                </label>
                <textarea
                  {...register("content")}
                  rows={15}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 font-mono text-sm"
                  placeholder="Write your blog post content here..."
                />
                {errors.content && (
                  <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
                )}
                <div className="mt-1 text-xs text-gray-500">
                  {watchedContent.length} characters
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
                    Excerpt (Optional)
                  </label>
                  <button
                    type="button"
                    onClick={generateExcerpt}
                    className="text-xs text-primary-600 hover:text-primary-500"
                  >
                    Generate from content
                  </button>
                </div>
                <textarea
                  {...register("excerpt")}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Brief description of your post for previews..."
                />
                <p className="mt-1 text-xs text-gray-500">
                  A short summary that will appear in blog previews and search results
                </p>
              </div>

              {/* Publication Status */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Publication Status</h3>
                    <p className="text-xs text-gray-500">Choose whether to publish immediately or save as draft</p>
                  </div>
                  <div className="flex items-center">
                    <input
                      {...register("published")}
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-700">
                      Publish immediately
                    </label>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <Link
                  href="/dashboard/blogs"
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? "Creating..." : "Create Post"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Preview Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6 sticky top-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Eye className="h-5 w-5 mr-2" />
              Preview
            </h3>
            
            <div className="space-y-4">
              {imageUrl && (
                <div className="aspect-video">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              )}
              
              <div>
                <h4 className="font-semibold text-gray-900">
                  {watchedTitle || "Your blog title will appear here"}
                </h4>
                <div className="mt-2 text-sm text-gray-600">
                  {watchedContent 
                    ? watchedContent.substring(0, 100) + (watchedContent.length > 100 ? "..." : "")
                    : "Your blog content preview will appear here as you type..."
                  }
                </div>
              </div>
              
              <div className="text-xs text-gray-500 border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span>Words: {watchedContent.split(/\s+/).filter(word => word.length > 0).length}</span>
                  <span>Characters: {watchedContent.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 