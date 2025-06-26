'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CalendarIcon, TagIcon } from '@/components/Icons'
import { useState, useEffect, useRef } from 'react'

export default function Home() {
  const [trails, setTrails] = useState<Array<{ x: number; y: number; id: number }>>([])
  const trailIdRef = useRef(0)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return
      
      const rect = heroRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      
      // Add new trail point
      const newTrail = { x, y, id: trailIdRef.current++ }
      setTrails(prev => [...prev, newTrail].slice(-10)) // Keep last 10 trail points
    }

    const heroElement = heroRef.current
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove)
      return () => heroElement.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-purple-100 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
              NeuroGeneration
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 mb-8 max-w-3xl mx-auto">
              Empowering teens to explore neuroscience and shape the future of brain research
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/posts"
                className="px-8 py-3 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
              >
                Explore Posts
              </Link>
              <Link
                href="/events"
                className="px-8 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-purple-600 dark:text-purple-400 rounded-lg font-semibold transition-colors border-2 border-purple-600 dark:border-purple-400 shadow-lg hover:shadow-xl"
              >
                View Events
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Cursor trail effect */}
        <div className="absolute inset-0 pointer-events-none">
          {trails.map((trail) => (
            <motion.div
              key={trail.id}
              initial={{ opacity: 0.6, scale: 1 }}
              animate={{ opacity: 0, scale: 2 }}
              transition={{ duration: 1, ease: "easeOut" }}
              onAnimationComplete={() => {
                setTrails(prev => prev.filter(t => t.id !== trail.id))
              }}
              className="absolute w-32 h-32 -translate-x-1/2 -translate-y-1/2"
              style={{
                left: trail.x,
                top: trail.y,
              }}
            >
              <div className="w-full h-full bg-purple-400 dark:bg-purple-600 rounded-full filter blur-2xl opacity-30" />
            </motion.div>
          ))}
        </div>
        
        {/* Static background orbs */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-purple-200 dark:bg-purple-800/30 rounded-full filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-300 dark:bg-purple-700/30 rounded-full filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-purple-100 dark:bg-purple-900/20 rounded-full filter blur-3xl opacity-20" />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-serif font-bold text-center mb-12 text-gray-900 dark:text-white"
          >
            What We Offer
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-900 p-8 rounded-2xl hover:shadow-lg dark:hover:shadow-purple-900/20 transition-all border border-gray-100 dark:border-gray-800"
            >
              <div className="w-12 h-12 bg-purple-600 dark:bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                <TagIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                Educational Posts
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Explore cutting-edge neuroscience topics through our carefully curated articles and research insights.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-900 p-8 rounded-2xl hover:shadow-lg dark:hover:shadow-purple-900/20 transition-all border border-gray-100 dark:border-gray-800"
            >
              <div className="w-12 h-12 bg-purple-600 dark:bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                <CalendarIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                Engaging Events
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Join workshops, seminars, and hands-on activities designed to deepen your understanding of neuroscience.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white dark:bg-gray-900 p-8 rounded-2xl hover:shadow-lg dark:hover:shadow-purple-900/20 transition-all border border-gray-100 dark:border-gray-800"
            >
              <div className="w-12 h-12 bg-purple-600 dark:bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                Teen Community
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Connect with like-minded teens passionate about neuroscience and build lasting friendships.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-700 dark:to-purple-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              Join the NeuroGeneration Movement
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Be part of a community that&apos;s shaping the future of neuroscience
            </p>
            <Link
              href="/about"
              className="inline-block px-8 py-3 bg-white hover:bg-gray-100 text-purple-700 rounded-lg font-semibold transition-colors"
            >
              Learn More About Us
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}