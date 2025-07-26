"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Search, Plus, Edit, Trash2, Eye, Clock, Calendar, FileText, EyeOff, Grid, List } from "lucide-react"

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

interface BlogsResponse {
  blogs: Blog[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export default function AdminBlogsPage() {
  const [data, setData] = useState<BlogsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('cards') // Default to cards for better mobile experience

  useEffect(() => {
    fetchBlogs()
  }, [page, search])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "12",
        ...(search && { search }),
      })
      
      const response = await fetch(`/api/admin/blogs?${params}`)
      if (response.ok) {
        const result = await response.json()
        setData(result)
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  const togglePublished = async (blogId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/blogs/${blogId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ published: !currentStatus }),
      })

      if (response.ok) {
        fetchBlogs()
      } else {
        const errorData = await response.json()
        alert(errorData.error || "Failed to update blog status")
      }
    } catch (error) {
      console.error("Toggle error:", error)
      alert("Failed to update blog status")
    }
  }

  const handleDelete = async (blogId: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return

    try {
      const response = await fetch(`/api/admin/blogs/${blogId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchBlogs()
      } else {
        const errorData = await response.json()
        alert(errorData.error || "Failed to delete blog post")
      }
    } catch (error) {
      console.error("Delete error:", error)
      alert("Failed to delete blog post")
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200
    const words = content.split(/\s+/).length
    return Math.ceil(words / wordsPerMinute)
  }

  const truncateContent = (content: string, maxLength: number) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + "..."
  }

  const getStatusBadge = (published: boolean) => {
    return published ? (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <Eye className="w-3 h-3 mr-1" />
        Published
      </span>
    ) : (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
        <EyeOff className="w-3 h-3 mr-1" />
        Draft
      </span>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Manage your blog content and articles
          </p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors touch-manipulation"
        >
          <Plus className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Create New Post</span>
          <span className="sm:hidden">New Post</span>
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search blog posts..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm touch-manipulation"
            />
          </div>
          
          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors touch-manipulation ${
                  viewMode === 'cards'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Grid className="w-3 h-3 sm:mr-1" />
                <span className="hidden sm:inline">Cards</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors touch-manipulation ${
                  viewMode === 'table'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List className="w-3 h-3 sm:mr-1" />
                <span className="hidden sm:inline">Table</span>
              </button>
            </div>
          </div>
        </div>

        {data && (
          <div className="mt-4 text-sm text-gray-600">
            <span className="font-medium">{data.pagination.total}</span> blog posts found
          </div>
        )}
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-600 text-sm">Loading blog posts...</p>
            </div>
          </div>
        ) : data && data.blogs.length > 0 ? (
          <>
            {viewMode === 'cards' ? (
              /* Cards View - Better for Mobile */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 sm:p-6">
                {data.blogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow group"
                  >
                    {/* Blog Image */}
                    <div className="relative h-40 sm:h-48 bg-gray-200">
                      {blog.image ? (
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <FileText className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                      <div className="absolute top-2 left-2">
                        {getStatusBadge(blog.published)}
                      </div>
                    </div>

                    {/* Blog Content */}
                    <div className="p-4">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-700 transition-colors">
                        {blog.title}
                      </h3>
                      
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {blog.excerpt || truncateContent(blog.content.replace(/<[^>]*>/g, ''), 100)}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-4">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {formatDate(blog.createdAt)}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {estimateReadTime(blog.content)} min read
                        </div>
                      </div>

                      <div className="text-xs text-gray-500 mb-4">
                        By {blog.author.name}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                        <div className="flex items-center space-x-2">
                          <Link
                            href={`/admin/blogs/${blog.id}/edit`}
                            className="p-1.5 text-sky-600 hover:bg-sky-50 rounded-md transition-colors touch-manipulation"
                            title="Edit post"
                          >
                            <Edit className="w-3 h-3" />
                          </Link>
                          <button
                            onClick={() => togglePublished(blog.id, blog.published)}
                            className={`p-1.5 rounded-md transition-colors touch-manipulation ${
                              blog.published
                                ? 'text-yellow-600 hover:bg-yellow-50'
                                : 'text-green-600 hover:bg-green-50'
                            }`}
                            title={blog.published ? 'Unpublish' : 'Publish'}
                          >
                            {blog.published ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                          </button>
                          <button
                            onClick={() => handleDelete(blog.id, blog.title)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors touch-manipulation"
                            title="Delete post"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                        <Link
                          href={`/blog/${blog.id}`}
                          className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Table View - Better for Desktop */
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Post
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Author
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.blogs.map((blog) => (
                      <tr key={blog.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-start">
                            <div className="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0 mr-4 overflow-hidden">
                              {blog.image ? (
                                <img
                                  src={blog.image}
                                  alt={blog.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <FileText className="w-5 h-5 text-gray-400" />
                                </div>
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-sm font-medium text-gray-900 mb-1">
                                {blog.title}
                              </div>
                              <div className="text-sm text-gray-500">
                                {estimateReadTime(blog.content)} min read
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(blog.published)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {blog.author.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(blog.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <Link
                              href={`/admin/blogs/${blog.id}/edit`}
                              className="p-1 text-sky-600 hover:bg-sky-50 rounded transition-colors"
                              title="Edit post"
                            >
                              <Edit className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => togglePublished(blog.id, blog.published)}
                              className={`p-1 rounded transition-colors ${
                                blog.published
                                  ? 'text-yellow-600 hover:bg-yellow-50'
                                  : 'text-green-600 hover:bg-green-50'
                              }`}
                              title={blog.published ? 'Unpublish' : 'Publish'}
                            >
                              {blog.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                            <button
                              onClick={() => handleDelete(blog.id, blog.title)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                              title="Delete post"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            {data.pagination.pages > 1 && (
              <div className="px-4 sm:px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    <span className="hidden sm:inline">
                      Showing page {data.pagination.page} of {data.pagination.pages}
                    </span>
                    <span className="sm:hidden">
                      {data.pagination.page}/{data.pagination.pages}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setPage(page - 1)}
                      disabled={page === 1}
                      className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors touch-manipulation"
                    >
                      <span className="hidden sm:inline">Previous</span>
                      <span className="sm:hidden">←</span>
                    </button>
                    <button
                      onClick={() => setPage(page + 1)}
                      disabled={page === data.pagination.pages}
                      className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors touch-manipulation"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <span className="sm:hidden">→</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts found</h3>
            <p className="text-gray-600 mb-6">
              {search ? "Try adjusting your search terms" : "Start creating your first blog post"}
            </p>
            {!search && (
              <Link
                href="/admin/blogs/new"
                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors touch-manipulation"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create First Post
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
} 