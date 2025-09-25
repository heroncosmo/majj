import { supabase } from './supabase'
import type { Profile } from './supabase'

export interface AuthUser {
  id: string
  email: string
  profile?: Profile
}

export class AuthService {
  // Sign up new user (via Edge Function admin-signup para contornar erros do endpoint /auth/v1/signup)
  static async signUp(email: string, password: string, userData: {
    full_name: string
    phone: string
    specialties: string[]
    bio?: string
  }) {
    // 1) Tenta via Edge Function (admin-signup)
    let createdViaEdge = false
    try {
      const { error: fnError } = await supabase.functions.invoke('admin-signup', {
        body: {
          email,
          password,
          full_name: userData.full_name,
          phone: userData.phone,
          specialties: userData.specialties,
          bio: userData.bio
        }
      })
      if (fnError) throw fnError
      createdViaEdge = true
    } catch (err) {
      console.warn('admin-signup falhou, usando fallback auth.signUp', err)
      // 1b) Fallback: cria usuário via auth.signUp com metadados;
      // trigger/func no banco garante status 'approved' e available=true
      const { error: suError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.full_name,
            phone: userData.phone,
            specialties: userData.specialties,
            bio: userData.bio ?? null,
            role: 'professional'
          }
        }
      })
      if (suError) throw suError
    }

    // 2) Efetua login com email/senha (tanto para edge quanto fallback)
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (signInError) throw signInError

    return signInData
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
    // Use getSession to avoid network call when there is no session
    const { data: { session } } = await supabase.auth.getSession()
    const sessionUser = session?.user
    if (!sessionUser) return null

    // Try to fetch profile; if it fails, still return basic user info
    try {
      const { data: profile } = await supabase
        .rpc('get_my_profile')
        .single()

      return {
        id: sessionUser.id,
        email: sessionUser.email!,
        profile: profile || undefined
      }
    } catch (e) {
      console.error('getCurrentUser: profile fetch error', e)
      const md: any = sessionUser.user_metadata || {}
      const isDesignatedAdmin = (sessionUser.email === 'brasilmajik@gmail.com')
      const fallbackProfile = {
        id: sessionUser.id,
        full_name: md.full_name || (sessionUser.email?.split('@')[0] ?? ''),
        email: sessionUser.email!,
        phone: md.phone || '',
        role: (isDesignatedAdmin ? 'admin' : 'professional') as const,
        status: 'approved' as const,
        specialties: Array.isArray(md.specialties) ? md.specialties : [],
        bio: md.bio || null,
        profile_image_url: null,
        available: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      return {
        id: sessionUser.id,
        email: sessionUser.email!,
        profile: fallbackProfile as unknown as Profile
      }
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
