import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SessionProvider from '@/components/SessionProvider'
import PreloaderWrapper from '@/components/PreloaderWrapper'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import LanguageChoicePopup from '@/components/LanguageChoicePopup'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Expand India - Canadian Business Expansion Services',
  description: 'Your trusted partner for Canadian business expansion into the Indian market. Expert consulting, market research, and business development services.',
  keywords: 'Canadian business expansion, India market entry, business consulting, market research, international business',
}

export default async function LocaleLayout(props: { children: React.ReactNode, params: { locale: string } }) {
  const { children, params } = props;
  const { locale } = await params;

  return (
    <SessionProvider>
      <PreloaderWrapper />
      <Navigation />
      <main>{children}</main>
      <Footer />
      <LanguageChoicePopup />
    </SessionProvider>
  )
} 