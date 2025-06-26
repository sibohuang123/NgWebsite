'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useTheme } from '@/lib/theme'
import { SunIcon, MoonIcon } from './Icons'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/posts', label: 'Posts' },
  { href: '/events', label: 'Events' },
  { href: '/admin', label: 'Admin' },
]

export default function Navigation() {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg"
            />
            <span className="text-xl font-serif font-bold bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
              NeuroGeneration
            </span>
          </Link>

          <div className="flex items-center space-x-8">
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                )
              })}
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <MoonIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <SunIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}