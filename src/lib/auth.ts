import { supabase } from './supabase'
import type { Profile } from './supabase'

export interface AuthUser {
  id: string
  email: string
  profile?: Profile
}

export class AuthService {
  // Sign up new user
  static async signUp(email: string, password: string, userData: {
    full_name: string
    phone: string
    specialties: string[]
    bio?: string
  }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: userData.full_name,
          phone: userData.phone,
          specialties: userData.specialties,
          bio: userData.bio
        }
      }
    })

    if (error) throw error

    // Create profile manually if trigger doesn't work
    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          full_name: userData.full_name,
          email: email,
          phone: userData.phone,
          specialties: userData.specialties,
          bio: userData.bio,
          role: 'professional',
          status: 'pending'
        })

      if (profileError) {
        console.error('Error creating profile:', profileError)
      }
    }

    return data
  }

  // Sign in user
  static async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error
    return data
  }

  // Sign out user
  static async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  // Get current user with profile
  static async getCurrentUser(): Promise<AuthUser | null> {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return null

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    return {
      id: user.id,
      email: user.email!,
      profile: profile || undefined
    }
  }

  // Update user profile
  static async updateProfile(userId: string, updates: Partial<Profile>) {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single()

    if (error) throw error
    return data
  }

  // Upload profile image
  static async uploadProfileImage(userId: string, file: File) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}/profile.${fileExt}`

    const { data, error } = await supabase.storage
      .from('profile-images')
      .upload(fileName, file, {
        upsert: true
      })

    if (error) throw error

    const { data: { publicUrl } } = supabase.storage
      .from('profile-images')
      .getPublicUrl(fileName)

    return publicUrl
  }

  // Check if user is admin
  static async isAdmin(userId: string): Promise<boolean> {
    const { data } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single()

    return data?.role === 'admin'
  }

  // Get all professionals (admin only)
  static async getAllProfessionals() {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'professional')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }

  // Update professional status (admin only)
  static async updateProfessionalStatus(professionalId: string, status: 'pending' | 'approved' | 'suspended') {
    const { data, error } = await supabase
      .from('profiles')
      .update({ status })
      .eq('id', professionalId)
      .select()
      .single()

    if (error) throw error

    // Create notification for the professional
    await supabase
      .from('notifications')
      .insert({
        user_id: professionalId,
        type: 'profile_approved',
        title: status === 'approved' ? 'Profil Approuvé!' : 'Statut du Profil Mis à Jour',
        message: status === 'approved' 
          ? 'Votre profil professionnel a été approuvé. Vous pouvez maintenant accéder à votre tableau de bord.'
          : `Le statut de votre profil a été mis à jour: ${status}`
      })

    return data
  }
}
