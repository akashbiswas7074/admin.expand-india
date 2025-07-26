'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import LanguageChoicePopup from '@/components/LanguageChoicePopup'

export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    // Check if user has already chosen a language
    const hasChosenLanguage = localStorage.getItem('language-chosen')
    
    // If user has already chosen a language, redirect to admin page
    if (hasChosenLanguage) {
      // Get the preferred locale from localStorage or default to 'en'
      const preferredLocale = localStorage.getItem('preferred-locale') || 'en'
      router.replace(`/${preferredLocale}/admin`)
    }
    // If not, the LanguageChoicePopup will handle the choice
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
      <LanguageChoicePopup />
    </div>
  )
} 