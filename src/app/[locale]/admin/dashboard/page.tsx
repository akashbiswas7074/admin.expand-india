"use client"

import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Users, FileText, Briefcase, Building, Lightbulb, Mail, Shield, TrendingUp, Activity, Plus, ExternalLink } from "lucide-react"

interface Stats {
  users: number
  blogs: number
  services: number
  industries: number
  solutions: number
  contacts: number
}

export default function AdminDashboardPage() {
  const { data: session, status } = useSession()
  const [stats, setStats] = useState<Stats>({
    users: 0,
    blogs: 0,
    services: 0,
    industries: 0,
    solutions: 0,
    contacts: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "loading") return // Still loading

    if (session?.user?.role === "ADMIN") {
      fetchStats()
    } else {
      setLoading(false)
    }
  }, [session, status])

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/stats")
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error)
    } finally {
      setLoading(false)
    }
  }

  // Show loading state
  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  // Show admin dashboard if authenticated
  const statCards = [
    { label: "Users", value: stats.users, icon: Users, href: "/admin/users", color: "text-sky-600", bgColor: "bg-sky-50", description: "Total registered users" },
    { label: "Blog Posts", value: stats.blogs, icon: FileText, href: "/admin/blogs", color: "text-green-600", bgColor: "bg-green-50", description: "Published articles" },
    { label: "Services", value: stats.services, icon: Briefcase, href: "/admin/services", color: "text-purple-600", bgColor: "bg-purple-50", description: "Active services" },
    { label: "Industries", value: stats.industries, icon: Building, href: "/admin/industries", color: "text-yellow-600", bgColor: "bg-yellow-50", description: "Industry sectors" },
    { label: "Solutions", value: stats.solutions, icon: Lightbulb, href: "/admin/solutions", color: "text-red-600", bgColor: "bg-red-50", description: "Business solutions" },
    { label: "Contacts", value: stats.contacts, icon: Mail, href: "/admin/contacts", color: "text-indigo-600", bgColor: "bg-indigo-50", description: "Contact inquiries" },
  ]

  const quickActions = [
    { 
      title: "Create New Blog Post", 
      href: "/admin/blogs/new", 
      icon: Plus, 
      color: "text-green-600", 
      bgColor: "bg-green-50",
      description: "Write and publish content"
    },
    { 
      title: "Add New Service", 
      href: "/admin/services/new", 
      icon: Plus, 
      color: "text-sky-600", 
      bgColor: "bg-sky-50",
      description: "Create service offerings"
    },
    { 
      title: "View Contact Messages", 
      href: "/admin/contacts", 
      icon: Mail, 
      color: "text-purple-600", 
      bgColor: "bg-purple-50",
      description: "Review customer inquiries"
    },
    { 
      title: "View Website", 
      href: "/", 
      icon: ExternalLink, 
      color: "text-gray-600", 
      bgColor: "bg-gray-50",
      description: "See public site"
    },
  ]

  const systemStatus = [
    {
      title: "System Status",
      value: "Active",
      icon: Activity,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "All systems operational"
    },
    {
      title: "Platform Growth",
      value: "Growing",
      icon: TrendingUp,
      color: "text-sky-600",
      bgColor: "bg-sky-50",
      description: "User engagement up"
    },
    {
      title: "Data Protection",
      value: "Secure",
      icon: Shield,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Security measures active"
    }
  ]

  return (
    <div className="space-y-6 sm:space-y-8">
      <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-cyan-700 to-cyan-400 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=600&fit=crop&crop=center" 
            alt="Admin dashboard background" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-800/80 to-cyan-400/80"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Admin Dashboard
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Welcome to the admin dashboard
            </p>
          </div>
        </div>
      </section>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <Link
              key={card.label}
              href={card.href}
              className="bg-white rounded-lg shadow border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-all duration-200 hover:border-gray-300 group touch-manipulation"
            >
              <div className="flex items-start">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${card.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${card.color}`} />
                </div>
                <div className="ml-3 sm:ml-4 min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">
                    {card.label}
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                    {card.value}
                  </p>
                  <p className="text-xs text-gray-500 hidden sm:block">
                    {card.description}
                  </p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-lg shadow border border-gray-200">
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Quick Actions</h3>
              <p className="text-sm text-gray-600 mt-1">Common administrative tasks</p>
            </div>
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
                {quickActions.map((action) => {
                  const Icon = action.icon
                  return (
                    <Link
                      key={action.title}
                      href={action.href}
                      className="flex items-center p-3 sm:p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 group touch-manipulation"
                    >
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg ${action.bgColor} flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0`}>
                        <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${action.color}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm sm:text-base font-medium text-gray-900 group-hover:text-gray-700">
                          {action.title}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500 mt-1 hidden sm:block">
                          {action.description}
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-lg shadow border border-gray-200">
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Platform Overview</h3>
              <p className="text-sm text-gray-600 mt-1">Detailed platform statistics</p>
            </div>
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between py-2 sm:py-3 border-b border-gray-100">
                    <div className="flex items-center min-w-0 flex-1">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-sky-50 rounded-lg flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                        <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-sky-600" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-700 truncate">Blog Posts</span>
                    </div>
                    <span className="text-base sm:text-lg font-bold text-gray-900 ml-2">{stats.blogs}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 sm:py-3 border-b border-gray-100">
                    <div className="flex items-center min-w-0 flex-1">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-50 rounded-lg flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                        <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-700 truncate">Services</span>
                    </div>
                    <span className="text-base sm:text-lg font-bold text-gray-900 ml-2">{stats.services}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 sm:py-3">
                    <div className="flex items-center min-w-0 flex-1">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-50 rounded-lg flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                        <Building className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-700 truncate">Industries</span>
                    </div>
                    <span className="text-base sm:text-lg font-bold text-gray-900 ml-2">{stats.industries}</span>
                  </div>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between py-2 sm:py-3 border-b border-gray-100">
                    <div className="flex items-center min-w-0 flex-1">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-50 rounded-lg flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                        <Users className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-600" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-700 truncate">Users</span>
                    </div>
                    <span className="text-base sm:text-lg font-bold text-gray-900 ml-2">{stats.users}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 sm:py-3 border-b border-gray-100">
                    <div className="flex items-center min-w-0 flex-1">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-50 rounded-lg flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                        <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-700 truncate">Contacts</span>
                    </div>
                    <span className="text-base sm:text-lg font-bold text-gray-900 ml-2">{stats.contacts}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 sm:py-3">
                    <div className="flex items-center min-w-0 flex-1">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-indigo-50 rounded-lg flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                        <Lightbulb className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-600" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-700 truncate">Solutions</span>
                    </div>
                    <span className="text-base sm:text-lg font-bold text-gray-900 ml-2">{stats.solutions}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Status Section */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">System Status</h3>
          <p className="text-sm text-gray-600 mt-1">Platform health and performance indicators</p>
        </div>
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {systemStatus.map((status, index) => {
              const Icon = status.icon
              return (
                <div key={index} className="text-center p-4 sm:p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 ${status.bgColor} rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${status.color}`} />
                  </div>
                  <div className="text-base sm:text-lg font-bold text-gray-900 mb-1">
                    {status.value}
                  </div>
                  <div className="text-sm font-medium text-gray-700 mb-1">
                    {status.title}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">
                    {status.description}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mobile Quick Stats Summary */}
      <div className="sm:hidden bg-gradient-to-r from-cyan-50 to-cyan-100 rounded-lg p-4 border border-cyan-200">
        <h4 className="text-base font-semibold text-cyan-900 mb-3">Quick Summary</h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center">
            <div className="text-lg font-bold text-cyan-900">{stats.users + stats.blogs}</div>
            <div className="text-xs text-cyan-700">Total Content</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-cyan-900">{stats.contacts}</div>
            <div className="text-xs text-cyan-700">New Inquiries</div>
          </div>
        </div>
      </div>
    </div>
  )
} 