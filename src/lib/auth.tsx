'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface AuthContextType {
  isAdmin: boolean
  login: (password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Simple admin authentication - in production, use proper authentication
const DEFAULT_PASSWORD = 'ng-admin-2024' // Default password

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if admin session exists
    const adminSession = localStorage.getItem('isAdmin')
    if (adminSession === 'true') {
      setIsAdmin(true)
    }
  }, [])

  const getAdminPassword = (): string => {
    // Check if a custom password has been set
    const customPasswordHash = localStorage.getItem('adminPasswordHash')
    if (customPasswordHash) {
      // Decode the simple base64 encoding (in production, use proper hashing)
      try {
        return atob(customPasswordHash)
      } catch {
        return DEFAULT_PASSWORD
      }
    }
    return DEFAULT_PASSWORD
  }

  const login = (password: string): boolean => {
    const currentPassword = getAdminPassword()
    if (password === currentPassword) {
      setIsAdmin(true)
      localStorage.setItem('isAdmin', 'true')
      // Store password in session for password change feature
      sessionStorage.setItem('adminPassword', password)
      return true
    }
    return false
  }

  const logout = () => {
    setIsAdmin(false)
    localStorage.removeItem('isAdmin')
    sessionStorage.removeItem('adminPassword')
    router.push('/')
  }

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}