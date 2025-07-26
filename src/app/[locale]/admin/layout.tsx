"use client"

import { useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Users, FileText, Briefcase, Building, Lightbulb, Settings, Mail, Home, LogOut, Menu, X, ChevronLeft } from "lucide-react"

const adminNavItems = (locale: string) => [
  { href: `/${locale}/admin/dashboard`, label: "Dashboard", icon: Home },
  { href: `/${locale}/admin/users`, label: "Users", icon: Users },
  { href: `/${locale}/admin/blogs`, label: "Blogs", icon: FileText },
  // { href: `/${locale}/admin/services`, label: "Services", icon: Briefcase },
  { href: `/${locale}/admin/contacts`, label: "Contacts", icon: Mail },
]

export default function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [locale, setLocale] = useState<string>('en')

  // Get locale from params
  useEffect(() => {
    const getLocale = async () => {
      const resolvedParams = await params
      setLocale(resolvedParams.locale)
    }
    getLocale()
  }, [params])

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = () => {
      setSidebarOpen(false)
    }
    
    if (sidebarOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [sidebarOpen])

  // Close sidebar on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false)
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Show loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <div className="text-primary-600 text-sm">Loading...</div>
        </div>
      </div>
    )
  }

  // If we're on the main admin page (/${locale}/admin), let it handle its own auth
  // This allows the login form to show
  if (pathname === `/${locale}/admin`) {
    return <>{children}</>
  }

  // For other admin pages, require authentication
  if (!session || session.user?.role !== "ADMIN") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Access Denied</h2>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">You need to be logged in as an admin to access this page.</p>
            <Link
              href={`/${locale}/admin`}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors touch-manipulation"
            >
              Go to Admin Login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Show admin layout for authenticated admin users
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center">
              {/* Mobile menu button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSidebarOpen(!sidebarOpen)
                }}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors touch-manipulation mr-2"
              >
                {sidebarOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
              
                              <Link href={`/${locale}/admin/dashboard`} className="flex items-center">
                <h1 className="text-lg sm:text-xl font-semibold text-gray-900 hover:text-primary-700 transition-colors">
                  Admin Panel
                </h1>
              </Link>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="text-xs sm:text-sm text-gray-700 hidden md:block truncate max-w-32">
                Welcome, {session.user?.name}
              </span>
              <Link
                href={`/${locale}`}
                className="text-xs sm:text-sm text-primary-600 hover:text-primary-500 transition-colors px-2 py-1 rounded touch-manipulation"
              >
                <span className="hidden sm:inline">View Site</span>
                <span className="sm:hidden">Site</span>
              </Link>
              <button
                onClick={() => signOut()}
                className="inline-flex items-center px-2 sm:px-4 py-1.5 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 shadow-sm touch-manipulation"
              >
                <LogOut className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Sign Out</span>
                <span className="sm:hidden">Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex relative">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity" />
        )}

        {/* Sidebar */}
        <nav className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-sm border-r border-gray-200 transition-transform duration-300 ease-in-out lg:transition-none pt-14 sm:pt-16 lg:pt-0`}>
          <div className="h-full overflow-y-auto">
            {/* Mobile header in sidebar */}
            <div className="lg:hidden p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Navigation</h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="p-4">
              <ul className="space-y-1 sm:space-y-2">
                {adminNavItems(locale).map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center px-3 sm:px-4 py-2.5 sm:py-3 text-sm font-medium rounded-lg transition-colors touch-manipulation ${
                          isActive
                            ? "bg-primary-100 text-primary-700 border-l-4 border-primary-700"
                            : "text-gray-700 hover:bg-primary-50 hover:text-primary-700"
                        }`}
                      >
                        <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
              
              {/* User info and logout for mobile */}
              <div className="mt-6 pt-4 border-t border-gray-200 lg:hidden">
                <div className="px-3 sm:px-4 py-2 mb-2">
                  <p className="text-xs text-gray-500 mb-1">Signed in as</p>
                  <p className="text-sm font-medium text-gray-900 truncate">{session.user?.name}</p>
                  <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
                </div>
                <button
                  onClick={() => {
                    setSidebarOpen(false)
                    signOut()
                  }}
                  className="flex items-center w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100 transition-colors touch-manipulation"
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  Sign Out
                </button>
              </div>

              {/* Quick actions for mobile */}
              <div className="mt-6 pt-4 border-t border-gray-200 lg:hidden">
                <h3 className="px-3 sm:px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Quick Actions
                </h3>
                <div className="space-y-1">
                  <Link
                    href={`/${locale}/admin/blogs/new`}
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center px-3 sm:px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FileText className="mr-3 h-4 w-4" />
                    New Blog Post
                  </Link>
                  <Link
                    href={`/${locale}`}
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center px-3 sm:px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Home className="mr-3 h-4 w-4" />
                    View Website
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 lg:ml-0 min-h-screen">
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Breadcrumb navigation for mobile */}
            <div className="lg:hidden mb-4">
              <Link
                href={`/${locale}/admin/dashboard`}
                className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Dashboard
              </Link>
            </div>
            
            {children}
          </div>
        </main>
      </div>
    </div>
  )
} 