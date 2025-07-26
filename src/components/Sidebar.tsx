'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronRight, Home, Users, Globe, Building, FileText, Phone, Info, Settings, HelpCircle } from 'lucide-react'

interface MenuItem {
  id: string
  title: string
  href: string
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
  children?: MenuItem[]
}

const menuItems: MenuItem[] = [
  {
    id: 'home',
    title: 'Home',
    href: '/',
    icon: Home
  },
  {
    id: 'about',
    title: 'About Us',
    href: '/about',
    icon: Info
  },
  {
    id: 'solutions',
    title: 'Solutions',
    href: '/solutions',
    icon: Settings
  },
  {
    id: 'why-india',
    title: 'Why India',
    href: '/why-india',
    icon: Globe
  },
  {
    id: 'know-india',
    title: 'Know India',
    href: '/know-india',
    icon: HelpCircle
  },
  {
    id: 'industries-services',
    title: 'Industries & Services',
    href: '/industries-services',
    icon: Building
  },
  {
    id: 'services-companies',
    title: 'Services for Companies',
    href: '/services-companies',
    icon: Users
  },
  {
    id: 'blog',
    title: 'Blog',
    href: '/blog',
    icon: FileText
  },
  {
    id: 'contact',
    title: 'Contact Us',
    href: '/contact',
    icon: Phone
  }
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleItem = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-gray-800 text-white z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button
                onClick={onClose}
                className="lg:hidden p-1 hover:bg-gray-700 rounded"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto">
            <ul className="py-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                const hasChildren = item.children && item.children.length > 0
                const isExpanded = expandedItems.includes(item.id)

                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                      onClick={() => !hasChildren && onClose()}
                    >
                      {Icon && <Icon className="w-4 h-4 mr-3" />}
                      <span className="flex-1">{item.title}</span>
                      {hasChildren && (
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            toggleItem(item.id)
                          }}
                          className="p-1 hover:bg-gray-600 rounded"
                        >
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </button>
                      )}
                    </Link>
                    
                    {hasChildren && isExpanded && (
                      <ul className="bg-gray-900">
                        {item.children?.map((child) => (
                          <li key={child.id}>
                            <Link
                              href={child.href}
                              className="flex items-center px-8 py-2 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors text-sm"
                              onClick={onClose}
                            >
                              {child.icon && <child.icon className="w-3 h-3 mr-2" />}
                              {child.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-700">
            <div className="text-xs text-gray-400">
              <p>Expand India</p>
              <p>Canadian Business Solutions</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 