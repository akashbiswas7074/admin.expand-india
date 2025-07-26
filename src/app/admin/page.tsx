'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DirectAdminPage() {
  const router = useRouter()

  useEffect(() => {
    // Check if user has already chosen a language
    const hasChosenLanguage = localStorage.getItem('language-chosen')
    
    // Redirect to the appropriate locale-based admin page
    if (hasChosenLanguage) {
      const preferredLocale = localStorage.getItem('preferred-locale') || 'en'
      router.replace(`/${preferredLocale}/admin`)
    } else {
      // Default to English admin page
      router.replace('/en/admin')
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to admin panel...</p>
      </div>
    </div>
  )
} 