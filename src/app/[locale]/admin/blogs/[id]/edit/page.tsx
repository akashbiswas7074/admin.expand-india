"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Link from "next/link"
import { ArrowLeft, Save, Eye, ImageIcon, Trash2 } from "lucide-react"
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

interface Blog {
  id: string
  title: string
  content: string
  excerpt?: string
  image?: string
  imagePublicId?: string
  published: boolean
  createdAt: string
  updatedAt: string
  author: {
    name: string
    email: string
  }
}

export default function EditBlogPage() {
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [blog, setBlog] = useState<Blog | null>(null)
  const [imageUrl, setImageUrl] = useState("")
  const [imagePublicId, setImagePublicId] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  const params = useParams()
  const blogId = params.id as string
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<BlogForm>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      published: false,
    },
  })

  const watchedContent = watch("content", "")
  const watchedTitle = watch("title", "")

  useEffect(() => {
    if (blogId) {
      fetchBlog()
    }
  }, [blogId])

  const fetchBlog = async () => {
    try {
      setFetchLoading(true)
      const response = await fetch(`/api/admin/blogs/${blogId}`)
      
      if (response.ok) {
        const blogData: Blog = await response.json()
        setBlog(blogData)
        
        // Reset form with blog data
        reset({
          title: blogData.title,
          content: blogData.content,
          excerpt: blogData.excerpt || "",
          image: blogData.image || "",
          imagePublicId: blogData.imagePublicId || "",
          published: blogData.published,
        })
        
        // Set image state
        setImageUrl(blogData.image || "")
        setImagePublicId(blogData.imagePublicId || "")
      } else {
        const errorData = await response.json()
        setError(errorData.error || "Failed to load blog post")
      }
    } catch (error) {
      console.error("Fetch blog error:", error)
      setError("Failed to load blog post")
    } finally {
      setFetchLoading(false)
    }
  }

  const onSubmit = async (data: BlogForm) => {
    try {
      setLoading(true)
      
      const response = await fetch(`/api/admin/blogs/${blogId}`, {
        method: "PATCH",
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
        setError(errorData.error || "Failed to update blog post")
      }
    } catch (error) {
      console.error("Update blog error:", error)
      setError("Failed to update blog post")
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

  const handleImageDelete = async (publicId: string) => {
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

  const handleDeleteBlog = async () => {
    if (!confirm("Are you sure you want to delete this blog post? This action cannot be undone.")) {
      return
    }

    try {
      setLoading(true)
      const response = await fetch(`/api/admin/blogs/${blogId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        router.push("/admin/blogs")
      } else {
        const errorData = await response.json()
        setError(errorData.error || "Failed to delete blog post")
      }
    } catch (error) {
      console.error("Delete blog error:", error)
      setError("Failed to delete blog post")
    } finally {
      setLoading(false)
    }
  }

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog post...</p>
        </div>
      </div>
    )
  }

  if (error && !blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ImageIcon className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Blog Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/admin/blogs"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blogs
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Blog Post</h1>
            <p className="text-gray-600">
              Update &quot;{blog?.title}&quot; • Created {blog ? new Date(blog.createdAt).toLocaleDateString() : ''}
            </p>
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

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-800">{error}</p>
        </div>
      )}

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
                    Published
                  </label>
                </div>
                
                <div className="text-xs text-gray-500">
                  Uncheck to save as draft. Published posts are visible to visitors.
                </div>

                {blog && (
                  <div className="pt-4 border-t border-gray-200">
                    <div className="text-xs text-gray-500 space-y-1">
                      <div>Created: {new Date(blog.createdAt).toLocaleDateString()}</div>
                      <div>Updated: {new Date(blog.updatedAt).toLocaleDateString()}</div>
                      <div>Author: {blog.author.name}</div>
                    </div>
                  </div>
                )}
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
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Update Blog Post
                    </>
                  )}
                </button>
                
                {blog && (
                  <Link
                    href={`/blog/${blog.id}`}
                    target="_blank"
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview Post
                  </Link>
                )}

                <Link
                  href="/admin/blogs"
                  className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </Link>

                <div className="pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleDeleteBlog}
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Blog Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
} 