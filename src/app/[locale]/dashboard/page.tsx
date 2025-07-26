"use client"

import { useEffect, useState } from "react"
import { FileText, Plus, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useSession } from "next-auth/react"

interface UserStats {
  totalBlogs: number
  publishedBlogs: number
  draftBlogs: number
}

export default function UserDashboard() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<UserStats>({
    totalBlogs: 0,
    publishedBlogs: 0,
    draftBlogs: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/user/blogs")
      if (response.ok) {
        const data = await response.json()
        const publishedCount = data.blogs.filter((blog: any) => blog.published).length
        const draftCount = data.blogs.filter((blog: any) => !blog.published).length
        
        setStats({
          totalBlogs: data.blogs.length,
          publishedBlogs: publishedCount,
          draftBlogs: draftCount,
        })
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    { 
      label: "Total Blogs", 
      value: stats.totalBlogs, 
      icon: FileText, 
      href: "/dashboard/blogs", 
      color: "bg-cyan-500" 
    },
    { 
      label: "Published", 
      value: stats.publishedBlogs, 
      icon: Eye, 
      href: "/dashboard/blogs?filter=published", 
      color: "bg-green-500" 
    },
    { 
      label: "Drafts", 
      value: stats.draftBlogs, 
      icon: EyeOff, 
      href: "/dashboard/blogs?filter=draft", 
      color: "bg-yellow-500" 
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div>
      <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-cyan-700 to-cyan-400 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=600&fit=crop&crop=center" 
            alt="Dashboard background" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-800/80 to-cyan-400/80"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Dashboard
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Welcome to your dashboard
            </p>
          </div>
        </div>
      </section>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {session?.user?.name}!
        </h1>
        <p className="text-gray-600">Here&apos;s an overview of your blog activity</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <Link
              key={card.label}
              href={card.href}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-200"
            >
              <div className="flex items-center">
                <div className={`${card.color} rounded-lg p-3 mr-4`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                  <p className="text-gray-600">{card.label}</p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              href="/dashboard/blogs/new"
              className="block w-full text-left px-4 py-3 text-sm text-primary-700 bg-primary-50 rounded-md hover:bg-primary-100 transition-colors"
            >
              <div className="flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                <span className="font-medium">Create New Blog Post</span>
              </div>
              <p className="text-xs text-primary-600 mt-1">Share your thoughts and ideas</p>
            </Link>
            <Link
              href="/dashboard/blogs"
              className="block w-full text-left px-4 py-3 text-sm text-gray-700 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                <span className="font-medium">Manage My Blogs</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">Edit, publish, or delete your posts</p>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Blog Tips</h2>
          <div className="space-y-3">
            <div className="text-sm">
              <h3 className="font-medium text-gray-900">✍️ Writing Tips</h3>
              <p className="text-gray-600 text-xs mt-1">Use compelling titles and add images to make your posts engaging</p>
            </div>
            <div className="text-sm">
              <h3 className="font-medium text-gray-900">📸 Add Images</h3>
              <p className="text-gray-600 text-xs mt-1">Upload images to make your blog posts more visually appealing</p>
            </div>
            <div className="text-sm">
              <h3 className="font-medium text-gray-900">🚀 Publishing</h3>
                              <p className="text-gray-600 text-xs mt-1">Save as draft first, then publish when you&apos;re ready to share</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 