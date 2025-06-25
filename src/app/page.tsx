'use client'

import Hero from '@/components/Hero'
import Features from '@/components/Features'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Hero />
      <Features />
    </main>
  )
}