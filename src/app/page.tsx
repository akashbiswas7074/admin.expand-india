'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import LanguageChoicePopup from '@/components/LanguageChoicePopup'

export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    // Directly redirect to admin page
    router.replace('/admin')
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to admin...</p>
      </div>
    </div>
  )
} 