'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Calendar, User, ArrowRight, FileText, Clock } from 'lucide-react'

interface Blog {
  id: string
  title: string
  content: string
  excerpt?: string
  image?: string
  published: boolean
  createdAt: string
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
  isAdmin?: boolean
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0
  })
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [isAdmin, setIsAdmin] = useState(false)

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
      
      const response = await fetch(`/api/blogs?${params}`)
      if (response.ok) {
        const result: BlogsResponse = await response.json()
        setBlogs(result.blogs)
        setPagination(result.pagination)
        setIsAdmin(result.isAdmin || false)
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

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength).trim() + "..."
  }

  const featuredBlog = blogs.find(blog => blog.published) || blogs[0]
  const otherBlogs = blogs.filter(blog => blog.id !== featuredBlog?.id)

  return (
    <div className="min-h-screen bg-white pt-16 sm:pt-20">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-sky-700 to-sky-400 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop&crop=center" 
            alt="Business insights and articles" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-sky-800/80 to-sky-400/80"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6 leading-tight">
              Industry Insights & Expert Analysis
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4">
              Stay informed with the latest trends, strategies, and insights for business expansion between Canada and India
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto px-4">
              <div className="relative">
                <Search className="absolute left-6 sm:left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles and insights..."
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-12 sm:pl-12 pr-4 py-3 sm:py-4 bg-white text-gray-900 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-500 border-0 text-base touch-manipulation"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-12 sm:py-16">
              <div className="text-center">
                <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
                <p className="text-gray-600 text-sm sm:text-base">Loading articles...</p>
              </div>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <div className="bg-gray-50 rounded-lg p-8 sm:p-12 max-w-sm sm:max-w-md mx-auto">
                <FileText className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mb-4 sm:mb-6" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
                  {search ? "No articles found" : "No articles published yet"}
                </h3>
                <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
                  {search 
                    ? "Try adjusting your search terms or browse all articles" 
                    : "Check back soon for new insights and expert articles"
                  }
                </p>
                {search && (
                  <button
                    onClick={() => handleSearch("")}
                    className="bg-sky-600 text-white px-6 py-3 rounded-lg hover:bg-sky-700 transition-colors touch-manipulation"
                  >
                    Browse All Articles
                  </button>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Featured Article */}
              {featuredBlog && (
                <div className="mb-12 sm:mb-16">
                  <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                    <div className="grid lg:grid-cols-2 gap-0">
                      <div className="relative lg:order-2">
                        {featuredBlog.image ? (
                          <img
                            src={featuredBlog.image}
                            alt={featuredBlog.title}
                            className="w-full h-64 sm:h-80 lg:h-full object-cover lg:min-h-96"
                          />
                        ) : (
                          <div className="w-full h-64 sm:h-80 lg:h-full lg:min-h-96 bg-sky-50 flex items-center justify-center">
                            <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-sky-400" />
                          </div>
                        )}
                      </div>
                      <div className="p-6 sm:p-8 lg:p-12 lg:order-1 flex flex-col justify-center">
                        <div className="mb-4 sm:mb-6">
                          <span className="bg-sky-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm font-medium">
                            Featured Article
                          </span>
                          {!featuredBlog.published && isAdmin && (
                            <span className="ml-2 sm:ml-3 bg-yellow-100 text-yellow-800 px-2 sm:px-3 py-1 rounded text-xs font-medium">
                              Draft
                            </span>
                          )}
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-6 leading-tight">
                          {featuredBlog.title}
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                          {featuredBlog.excerpt || truncateContent(featuredBlog.content, 200)}
                        </p>
                        <div className="flex flex-wrap items-center text-gray-500 text-xs sm:text-sm mb-6 sm:mb-8 gap-2 sm:gap-4">
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            <span>{formatDate(featuredBlog.createdAt)}</span>
                          </div>
                          <div className="flex items-center">
                            <User className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            <span>{featuredBlog.author.name}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            <span>{estimateReadTime(featuredBlog.content)} min read</span>
                          </div>
                        </div>
                        <Link
                          href={`/blog/${featuredBlog.id}`}
                          className="inline-flex items-center bg-sky-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-sky-700 transition-colors touch-manipulation"
                        >
                          Read Full Article
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Articles Grid */}
              {blogs.length > 0 && (
                <div>
                  <div className="mb-8 sm:mb-12">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
                      {featuredBlog ? "Latest Articles" : "All Articles"}
                    </h2>
                    <div className="w-12 sm:w-16 h-1 bg-sky-600 mb-4 sm:mb-6"></div>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Showing {blogs.length} of {pagination.total} articles
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {(featuredBlog ? otherBlogs : blogs).map((blog) => (
                      <article key={blog.id} className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group">
                        <div className="relative">
                          {blog.image ? (
                            <img
                              src={blog.image}
                              alt={blog.title}
                              className="w-full h-44 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-44 sm:h-48 bg-sky-50 flex items-center justify-center">
                              <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-sky-400" />
                            </div>
                          )}
                          <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                            {!blog.published && isAdmin && (
                              <span className="bg-yellow-500 text-white px-2 sm:px-3 py-1 rounded text-xs font-medium">
                                Draft
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="p-4 sm:p-6">
                          <div className="flex items-center text-xs text-gray-500 mb-3 flex-wrap gap-1 sm:gap-2">
                            <div className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              <span>{formatDate(blog.createdAt)}</span>
                            </div>
                            <span className="hidden sm:inline">•</span>
                            <div className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              <span>{estimateReadTime(blog.content)} min read</span>
                            </div>
                          </div>
                          
                          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3 line-clamp-2 group-hover:text-sky-700 transition-colors leading-tight">
                            {blog.title}
                          </h3>
                          
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                            {blog.excerpt || truncateContent(blog.content, 120)}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500 truncate mr-2">By {blog.author.name}</span>
                            <Link
                              href={`/blog/${blog.id}`}
                              className="inline-flex items-center text-sky-600 hover:text-sky-700 text-sm font-medium group-hover:underline flex-shrink-0 touch-manipulation"
                            >
                              Read More
                              <ArrowRight className="ml-1 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="mt-12 sm:mt-16 flex justify-center">
                  <div className="flex items-center space-x-2 sm:space-x-4">
                    <button
                      onClick={() => setPage(page - 1)}
                      disabled={page === 1}
                      className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                    >
                      <span className="hidden sm:inline">Previous</span>
                      <span className="sm:hidden">←</span>
                    </button>
                    <span className="px-2 sm:px-4 py-2 text-xs sm:text-sm text-gray-600">
                      <span className="hidden sm:inline">Page {page} of {pagination.pages}</span>
                      <span className="sm:hidden">{page}/{pagination.pages}</span>
                    </span>
                    <button
                      onClick={() => setPage(page + 1)}
                      disabled={page === pagination.pages}
                      className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <span className="sm:hidden">→</span>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-sky-700 to-sky-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
            Stay Informed with Industry Updates
          </h2>
          <p className="text-lg sm:text-xl text-sky-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Subscribe to receive our latest insights, market analysis, and business expansion strategies delivered to your inbox.
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 sm:gap-4 px-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-300 text-base touch-manipulation"
            />
            <button className="bg-white text-sky-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors touch-manipulation">
              Subscribe
            </button>
          </div>
          <p className="text-sky-200 text-xs sm:text-sm mt-3 sm:mt-4">No spam. Professional insights only.</p>
        </div>
      </section>
    </div>
  )
} 