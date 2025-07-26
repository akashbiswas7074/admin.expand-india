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
  imagePublicId: z.string().optional(),
  published: z.boolean(),
})

type BlogForm = z.infer<typeof blogSchema>

export default function NewBlogPage() {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [imagePublicId, setImagePublicId] = useState("")
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
      
      const response = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          image: imageUrl || undefined,
          imagePublicId: imagePublicId || undefined,
        }),
      })

      if (response.ok) {
        router.push("/admin/blogs")
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

  const handleImageUpload = (url: string, publicId?: string) => {
    setImageUrl(url)
    setImagePublicId(publicId || "")
    setValue("image", url)
    setValue("imagePublicId", publicId || "")
  }

  const handleImageDelete = (publicId: string) => {
    setImageUrl("")
    setImagePublicId("")
    setValue("image", "")
    setValue("imagePublicId", "")
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Blog Post</h1>
            <p className="text-gray-600">Write and publish engaging content for your audience</p>
          </div>
          <Link
            href="/admin/blogs"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blogs
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                {...register("title")}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter an engaging title for your blog post"
              />
              {errors.title && (
                <p className="mt-2 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            {/* Content */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <textarea
                {...register("content")}
                rows={20}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 resize-none"
                placeholder="Write your blog content here..."
              />
              {errors.content && (
                <p className="mt-2 text-sm text-red-600">{errors.content.message}</p>
              )}
            </div>

            {/* Excerpt */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
                  Excerpt (Optional)
                </label>
                <button
                  type="button"
                  onClick={generateExcerpt}
                  className="text-xs text-primary-600 hover:text-primary-500"
                >
                  Auto-generate from content
                </button>
              </div>
              <textarea
                {...register("excerpt")}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="Brief description of the blog post (will be auto-generated if left empty)"
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Publish Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    {...register("published")}
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Publish immediately
                  </label>
                </div>
                
                <div className="text-xs text-gray-500">
                  Uncheck to save as draft. You can publish later from the blogs list.
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Featured Image</h3>
              <ImageUpload
                onImageUpload={handleImageUpload}
                onImageDelete={handleImageDelete}
                currentImage={imageUrl}
                currentPublicId={imagePublicId}
              />
            </div>

            {/* Preview Info */}
            {watchedTitle && (
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Preview</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Title:</span>
                    <p className="text-sm text-gray-900">{watchedTitle}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Word Count:</span>
                    <p className="text-sm text-gray-900">{watchedContent.split(/\s+/).length} words</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Read Time:</span>
                    <p className="text-sm text-gray-900">~{Math.ceil(watchedContent.split(/\s+/).length / 200)} min</p>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Create Blog Post
                    </>
                  )}
                </button>
                
                <Link
                  href="/admin/blogs"
                  className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
} 