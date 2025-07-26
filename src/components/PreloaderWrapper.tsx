'use client'

import dynamic from 'next/dynamic'

// Dynamically import Preloader to avoid hydration issues
const Preloader = dynamic(() => import('./Preloader'), {
  ssr: false,
})

export default function PreloaderWrapper() {
  return <Preloader />
} 