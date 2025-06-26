'use client'

import { motion } from 'framer-motion'
import { Brain } from 'lucide-react'

interface BrainLogoProps {
  className?: string
  animated?: boolean
}

export default function BrainLogo({ className = "w-8 h-8", animated = true }: BrainLogoProps) {
  if (animated) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Brain className={className} />
      </motion.div>
    )
  }

  return <Brain className={className} />
}