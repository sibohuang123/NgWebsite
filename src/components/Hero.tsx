'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative px-6 lg:px-8 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Welcome to Your Next.js App
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and Supabase
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-10 flex items-center justify-center gap-x-6"
          >
            <a
              href="#features"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get started
            </a>
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">
              Learn more <span aria-hidden="true">→</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}