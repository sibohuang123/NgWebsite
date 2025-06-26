'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CalendarIcon, TagIcon } from '@/components/Icons'
import { useState, useEffect } from 'react'

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth - 0.5) * 2
      const y = (clientY / window.innerHeight - 0.5) * 2
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-900 dark:to-purple-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-serif font-bold mb-6 bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent"
              style={{
                transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`,
              }}
            >
              NeuroGeneration
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
              style={{
                transform: `translate(${mousePosition.x * 3}px, ${mousePosition.y * 3}px)`,
              }}
            >
              Empowering teens to explore neuroscience and shape the future of brain research
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              style={{
                transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)`,
              }}
            >
              <Link
                href="/posts"
                className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
              >
                Explore Posts
              </Link>
              <Link
                href="/events"
                className="px-8 py-3 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-purple-600 dark:text-purple-400 rounded-lg font-semibold transition-colors border border-purple-600 dark:border-purple-400"
              >
                View Events
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Animated background elements */}
        <motion.div 
          className="absolute top-10 right-10 w-72 h-72 bg-purple-300 dark:bg-purple-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70"
          animate={{
            x: mousePosition.x * 50,
            y: mousePosition.y * 50,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
        />
        <motion.div 
          className="absolute bottom-10 left-10 w-72 h-72 bg-purple-400 dark:bg-purple-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70"
          animate={{
            x: mousePosition.x * -50,
            y: mousePosition.y * -50,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
        />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
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
              className="bg-purple-50 dark:bg-gray-800 p-8 rounded-2xl hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-purple-600 dark:bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                <TagIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                Educational Posts
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Explore cutting-edge neuroscience topics through our carefully curated articles and research insights.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-purple-50 dark:bg-gray-800 p-8 rounded-2xl hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-purple-600 dark:bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                <CalendarIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                Engaging Events
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Join workshops, seminars, and hands-on activities designed to deepen your understanding of neuroscience.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-purple-50 dark:bg-gray-800 p-8 rounded-2xl hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-purple-600 dark:bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                Teen Community
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
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
              Be part of a community that's shaping the future of neuroscience
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