'use client'

import { useEffect } from 'react'
import { setupGlobalErrorHandlers } from '@/lib/errorHandler'

export default function ClientErrorHandler() {
  useEffect(() => {
    setupGlobalErrorHandlers()
  }, [])

  return null
}