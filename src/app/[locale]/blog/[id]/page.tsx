"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, User, Share2, FileText } from "lucide-react"

interface Blog {
  id: string
  title: string
  content: string
  excerpt?: string
  image?: string
  published: boolean
  createdAt: string
  updatedAt: string
  author: {
    name: string
    email: string
  }
}

export default function BlogDetailPage() {
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const params = useParams()
  const blogId = params.id as string

  useEffect(() => {
    if (blogId) {
      fetchBlog()
    }
  }, [blogId])

  const fetchBlog = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/blogs/${blogId}`)
      
      if (response.ok) {
        const blogData: Blog = await response.json()
        setBlog(blogData)
      } else {
        const errorData = await response.json()
        setError(errorData.error || "Article not found")
      }
    } catch (error) {
      console.error("Fetch blog error:", error)
      setError("Failed to load article")
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200
    const words = content.split(/\s+/).length
    return Math.ceil(words / wordsPerMinute)
  }

  const sharePost = async () => {
    if (navigator.share && blog) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.excerpt || `Read "${blog.title}" - Expert insights on business expansion`,
          url: window.location.href,
        })
      } catch (error) {
        copyToClipboard()
      }
    } else {
      copyToClipboard()
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert("Article link copied to clipboard!")
    }).catch(() => {
      alert("Failed to copy link")
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="h-64 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-sky-50 rounded-lg flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-sky-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-8">
              {error || "The article you&apos;re looking for doesn&apos;t exist or has been removed."}
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Articles
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <div className="bg-white border-b border-gray-200 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/blog"
            className="inline-flex items-center text-sky-600 hover:text-sky-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Articles
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12">
          <div className="mb-6">
            <div className="flex items-center text-sm text-gray-500 mb-6">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{formatDate(blog.createdAt)}</span>
              <span className="mx-3">•</span>
              <Clock className="w-4 h-4 mr-2" />
              <span>{estimateReadTime(blog.content)} min read</span>
              <span className="mx-3">•</span>
              <User className="w-4 h-4 mr-2" />
              <span>{blog.author.name}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              {blog.title}
            </h1>

            {blog.excerpt && (
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {blog.excerpt}
              </p>
            )}

            <div className="flex items-center justify-between py-6 border-t border-b border-gray-200">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mr-4">
                  <User className="w-6 h-6 text-sky-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">{blog.author.name}</div>
                  <div className="text-sm text-gray-500">Business Expansion Expert</div>
                </div>
              </div>
              <button
                onClick={sharePost}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Article
              </button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {blog.image && (
          <div className="mb-12">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg prose-gray max-w-none">
          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
            {blog.content}
          </div>
        </div>

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between mb-8">
            <div className="text-sm text-gray-500">
              <p>Published on {formatDate(blog.createdAt)}</p>
              {blog.updatedAt !== blog.createdAt && (
                <p className="mt-1">Last updated on {formatDate(blog.updatedAt)}</p>
              )}
            </div>
            <button
              onClick={sharePost}
              className="text-sky-600 hover:text-sky-700 text-sm font-medium"
            >
              Share this article
            </button>
          </div>

          {/* Author Bio */}
          <div className="bg-sky-50 rounded-lg p-8">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-sky-200 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-8 h-8 text-sky-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  About {blog.author.name}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {blog.author.name} is a business expansion specialist with extensive experience in Canadian-Indian 
                  market entry strategies. They help companies navigate the complexities of international business 
                  development and cross-border expansion.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </article>

      {/* Related Articles CTA */}
      <section className="bg-gradient-to-r from-sky-700 to-sky-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Continue Reading
          </h2>
          <p className="text-xl text-sky-100 mb-8">
            Explore more expert insights and analysis on business expansion strategies.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 bg-white text-sky-700 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            View All Articles
            <ArrowLeft className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
} 