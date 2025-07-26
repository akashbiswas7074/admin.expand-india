'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Globe, X } from 'lucide-react'

interface LanguageOption {
  code: string
  label: string
  flag: string
  description: string
}

const languageOptions: LanguageOption[] = [
  {
    code: 'en',
    label: 'English',
    flag: '🇺🇸',
    description: 'International English'
  },
  {
    code: 'en-CA',
    label: 'Canada',
    flag: '🇨🇦',
    description: 'Canadian English'
  }
]

export default function LanguageChoicePopup() {
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user has already chosen a language
    const hasChosenLanguage = localStorage.getItem('language-chosen')
    const currentPath = window.location.pathname
    
    // Show popup if:
    // 1. User hasn't chosen language before
    // 2. User is on root path (not already on a locale path)
    if (!hasChosenLanguage && (currentPath === '/' || currentPath === '')) {
      setIsVisible(true)
    }
  }, [])

  const handleLanguageSelect = (langCode: string) => {
    // Mark that user has chosen a language
    localStorage.setItem('language-chosen', 'true')
    localStorage.setItem('preferred-locale', langCode)
    
    // Navigate to the admin page for the selected language
    router.push(`/${langCode}/admin`)
    setIsVisible(false)
  }

  const handleClose = () => {
    // Mark that user has chosen a language (default to English)
    localStorage.setItem('language-chosen', 'true')
    localStorage.setItem('preferred-locale', 'en')
    router.push('/en/admin')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-600 to-sky-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Globe className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">Welcome to Admin Panel</h2>
                <p className="text-sky-100 text-sm mt-1">Choose your preferred language</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-sky-100 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Language Options */}
        <div className="p-6">
          <div className="space-y-3">
            {languageOptions.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                className="w-full flex items-center p-4 border border-gray-200 rounded-lg hover:border-sky-300 hover:bg-sky-50 transition-all duration-200 group"
              >
                <div className="flex items-center space-x-4 flex-1">
                  <span className="text-3xl">{lang.flag}</span>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900 group-hover:text-sky-700">
                      {lang.label}
                    </div>
                    <div className="text-sm text-gray-500">
                      {lang.description}
                    </div>
                  </div>
                </div>
                <div className="text-sky-400 group-hover:text-sky-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              You can change your language preference anytime from the navigation menu.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 