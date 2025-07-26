'use client'

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Menu, X, LayoutDashboard, User, LogOut } from "lucide-react"
import { useRouter, usePathname } from 'next/navigation';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { data: session } = useSession()
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const mobileButtonRef = useRef<HTMLButtonElement>(null)

  // Language switcher state
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<'en' | 'en-CA'>('en');
  const langButtonRef = useRef<HTMLButtonElement>(null);
  const langOptions = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'en-CA', label: 'Canada', flag: '🇨🇦' },
  ];
  const router = useRouter();
  const pathname = usePathname();

  // Initialize selectedLang based on current pathname
  useEffect(() => {
    const pathSegments = pathname.split('/');
    if (pathSegments[1] === 'en' || pathSegments[1] === 'en-CA') {
      setSelectedLang(pathSegments[1] as 'en' | 'en-CA');
    }
  }, [pathname]);

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        langDropdownOpen &&
        langButtonRef.current &&
        !langButtonRef.current.contains(event.target as Node)
      ) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [langDropdownOpen]);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node

      // Handle mobile menu
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        mobileButtonRef.current &&
        !mobileMenuRef.current.contains(target) &&
        !mobileButtonRef.current.contains(target)
      ) {
        setIsMobileMenuOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMobileMenuOpen])

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false)
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  // Get path without locale
  const getPathWithoutLocale = () => {
    const pathSegments = pathname.split('/');
    if (pathSegments[1] === 'en' || pathSegments[1] === 'en-CA') {
      const pathWithoutLocale = '/' + pathSegments.slice(2).join('/');
      return pathWithoutLocale === '/' ? '' : pathWithoutLocale;
    }
    return pathname === '/' ? '' : pathname;
  };

  const pathWithoutLocale = getPathWithoutLocale();

  const navItems = [
    { name: "Home", href: `/${selectedLang}` },
    { name: "About", href: `/${selectedLang}/about` },
    { name: "Industries", href: `/${selectedLang}/industries-services` },
    { name: "Services", href: `/${selectedLang}/services-companies` },
    { name: "Solutions", href: `/${selectedLang}/solutions` },
    { name: "Blog", href: `/${selectedLang}/blog` },
    { name: "Contact", href: `/${selectedLang}/contact` },
  ]

  const handleSignOut = async () => {
    setIsMobileMenuOpen(false)
    await signOut()
  }

  const handleLanguageChange = (langCode: string) => {
    setSelectedLang(langCode as 'en' | 'en-CA');
    setLangDropdownOpen(false);
    
    // Store the preferred locale in localStorage (client only)
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-locale', langCode);
    }
    
    // Navigate to the same page but with different locale
    const currentPathWithoutLocale = getPathWithoutLocale();
    const newPath = `/${langCode}${currentPathWithoutLocale}`;
    
    // Use router.push for client-side navigation
    router.push(newPath);
  };

  return (
    <>
      <nav className="bg-white shadow-lg fixed w-full top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 sm:h-18">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link 
                href={`/${selectedLang}`}
                prefetch={true}
                className="text-xl sm:text-2xl font-bold text-sky-700 hover:text-sky-800 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Expand India
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  prefetch={true}
                  className="text-gray-700 hover:text-sky-700 px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-sky-50"
                >
                  {item.name}
                </Link>
              ))}
              
              {/* User Icon - Direct link to Admin Panel */}
              {session && (
                <Link
                  href={`/${selectedLang}/admin`}
                  prefetch={true}
                  className="flex items-center space-x-2 text-gray-700 hover:text-sky-700 px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-sky-50"
                >
                  <User className="w-4 h-4" />
                </Link>
              )}
              
              {/* Language Switcher - rightmost */}
              <div className="relative">
                <button
                  ref={langButtonRef}
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  className="flex items-center px-3 py-2 rounded-lg hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-200 transition-all duration-200 border border-gray-200 hover:border-sky-300"
                  aria-label="Select language"
                  type="button"
                >
                  <span className="text-xl mr-2">{langOptions.find(l => l.code === selectedLang)?.flag}</span>
                  <span className="text-sm font-medium text-gray-700 mr-2">{langOptions.find(l => l.code === selectedLang)?.label}</span>
                  <svg className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {langDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden">
                    {langOptions.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full flex items-center px-4 py-3 text-sm hover:bg-sky-50 transition-colors duration-200 ${selectedLang === lang.code ? 'bg-sky-100 text-sky-700 font-semibold' : 'text-gray-700'}`}
                        type="button"
                      >
                        <span className="text-lg mr-3">{lang.flag}</span>
                        <span className="font-medium">{lang.label}</span>
                        {selectedLang === lang.code && (
                          <svg className="ml-auto w-4 h-4 text-sky-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center space-x-2">
              {session && (
                <Link
                  href={`/${selectedLang}/admin`}
                  prefetch={true}
                  className="p-2 rounded-md text-gray-700 hover:text-sky-700 hover:bg-sky-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="h-5 w-5" />
                </Link>
              )}
              
              <button
                ref={mobileButtonRef}
                onClick={(e) => {
                  e.stopPropagation()
                  setIsMobileMenuOpen(!isMobileMenuOpen)
                }}
                className="p-2 rounded-md text-gray-700 hover:text-sky-700 hover:bg-sky-50 transition-colors touch-manipulation"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Mobile Menu */}
          <div 
            ref={mobileMenuRef}
            className="absolute inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl transform transition-transform"
          >
            <div className="flex flex-col h-full pt-16"> {/* Added pt-16 to account for fixed navbar */}
              {/* Mobile menu header - Single header without duplicate X button */}
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
              </div>

              {/* User info section for mobile */}
              {session && (
                <div className="p-4 border-b border-gray-200 bg-sky-50">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-sky-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-sky-700" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-gray-900 truncate">{session.user?.name}</div>
                      <div className="text-xs text-gray-600 truncate">{session.user?.email}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile navigation links */}
              <div className="flex-1 overflow-y-auto py-4">
                <div className="space-y-1 px-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      prefetch={true}
                      className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-sky-700 hover:bg-sky-50 rounded-lg transition-colors touch-manipulation"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {/* Mobile user actions */}
                {session && (
                  <div className="mt-6 pt-6 border-t border-gray-200 px-4 space-y-1">
                    <Link
                      href={`/${selectedLang}/admin`}
                      prefetch={true}
                      className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-sky-700 hover:bg-sky-50 rounded-lg transition-colors touch-manipulation"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <LayoutDashboard className="w-5 h-5 mr-3" />
                      Admin Panel
                    </Link>
                    
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors touch-manipulation"
                    >
                      <LogOut className="w-5 h-5 mr-3" />
                      Sign Out
                    </button>
                  </div>
                )}

                {/* Language Switcher - last in mobile menu */}
                <div className="mt-8 px-4">
                  <div className="relative">
                    <button
                      key={`mobile-lang-${selectedLang}`}
                      ref={langButtonRef}
                      onClick={() => {
                        setLangDropdownOpen(!langDropdownOpen);
                      }}
                      className="flex items-center px-4 py-3 rounded-lg hover:bg-sky-50 focus:outline-none w-full border border-gray-200 hover:border-sky-300 transition-all duration-200"
                      aria-label="Select language"
                      type="button"
                    >
                      <span className="text-xl mr-3">{langOptions.find(l => l.code === selectedLang)?.flag}</span>
                      <span className="text-base font-medium text-gray-700 flex-1 text-left">{langOptions.find(l => l.code === selectedLang)?.label}</span>
                      <svg className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {langDropdownOpen && (
                      <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden">
                        {langOptions.map((lang) => (
                          <button
                            key={`mobile-lang-${lang.code}`}
                            onClick={() => {
                              handleLanguageChange(lang.code);
                            }}
                            className={`w-full flex items-center px-4 py-3 text-sm hover:bg-sky-50 transition-colors duration-200 ${selectedLang === lang.code ? 'bg-sky-100 text-sky-700 font-semibold' : 'text-gray-700'}`}
                            type="button"
                          >
                            <span className="text-lg mr-3">{lang.flag}</span>
                            <span className="font-medium flex-1 text-left">{lang.label}</span>
                            {selectedLang === lang.code && (
                              <svg className="w-4 h-4 text-sky-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 