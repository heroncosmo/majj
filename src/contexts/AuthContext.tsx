import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { AuthService, type AuthUser } from '../lib/auth'
import type { Profile } from '../lib/supabase'

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, userData: {
    full_name: string
    phone: string
    specialties: string[]
    bio?: string
  }) => Promise<void>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<Profile>) => Promise<void>
  isAdmin: boolean
  isProfessional: boolean
  isApproved: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        console.error('Error getting initial session:', error)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          try {
            const currentUser = await AuthService.getCurrentUser()
            setUser(currentUser)
          } catch (error) {
            console.error('Error getting user after sign in:', error)
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      await AuthService.signIn(email, password)
      // User will be set by the auth state change listener
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  const signUp = async (email: string, password: string, userData: {
    full_name: string
    phone: string
    specialties: string[]
    bio?: string
  }) => {
    setLoading(true)
    try {
      await AuthService.signUp(email, password, userData)
      // User will be set by the auth state change listener
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  const signOut = async () => {
    setLoading(true)
    try {
      await AuthService.signOut()
      // User will be cleared by the auth state change listener
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) throw new Error('No user logged in')
    
    try {
      const updatedProfile = await AuthService.updateProfile(user.id, updates)
      setUser({
        ...user,
        profile: updatedProfile
      })
    } catch (error) {
      throw error
    }
  }

  // Computed properties
  const isAdmin = user?.profile?.role === 'admin'
  const isProfessional = user?.profile?.role === 'professional'
  const isApproved = user?.profile?.status === 'approved'

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    isAdmin,
    isProfessional,
    isApproved
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
