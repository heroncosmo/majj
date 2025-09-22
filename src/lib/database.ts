import { supabase } from './supabase'
import type { Quote, Project, Notification } from './supabase'

// Build-time fallbacks for environments exposing NEXT_PUBLIC_* only (e.g., Vercel)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - replaced at build time by Vite define
declare const __NEXT_PUBLIC_SUPABASE_URL__: string
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - replaced at build time by Vite define
declare const __NEXT_PUBLIC_SUPABASE_ANON_KEY__: string

const PUBLIC_URL = import.meta.env.VITE_SUPABASE_URL || __NEXT_PUBLIC_SUPABASE_URL__
const PUBLIC_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY || __NEXT_PUBLIC_SUPABASE_ANON_KEY__

export class DatabaseService {
  // QUOTES MANAGEMENT
  static async createQuote(quoteData: Omit<Quote, 'id' | 'created_at' | 'status' | 'assigned_professional_id'>) {
    const { callEdgeFunction } = await import('./functions')
    return callEdgeFunction('create-quote', quoteData)
  }

  static async getAllQuotes() {
    const { data, error } = await supabase
      .from('quotes')
      .select(`
        *,
        assigned_professional:profiles(full_name, email)
      `)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }

  static async assignQuote(quoteId: string, professionalId: string) {
    const { data, error } = await supabase
      .from('quotes')
      .update({ 
        assigned_professional_id: professionalId,
        status: 'assigned'
      })
      .eq('id', quoteId)
      .select()
      .single()

    if (error) throw error

    // Create notification for professional
    await supabase
      .from('notifications')
      .insert({
        user_id: professionalId,
        type: 'quote_assigned',
        title: 'Nouveau Devis Assigné',
        message: 'Un nouveau devis vous a été assigné. Consultez votre tableau de bord pour plus de détails.'
      })

    return data
  }

  static async updateQuoteStatus(quoteId: string, status: Quote['status']) {
    const { data, error } = await supabase
      .from('quotes')
      .update({ status })
      .eq('id', quoteId)
      .select()
      .single()

    if (error) throw error
    return data
  }

  // PROJECTS MANAGEMENT
  static async createProject(projectData: Omit<Project, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('projects')
      .insert(projectData)
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async getProjectsByProfessional(professionalId: string) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('professional_id', professionalId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }

  static async getAllProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        professional:profiles(full_name, email)
      `)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }

  static async updateProject(projectId: string, updates: Partial<Project>) {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', projectId)
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async deleteProject(projectId: string) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId)

    if (error) throw error
  }

  // IMAGE UPLOAD FOR PROJECTS
  static async uploadProjectImages(professionalId: string, projectId: string, files: File[], type: 'before' | 'after') {
    // E2E/Test bypass: avoid real network/storage operations when testBypass=1 is present
    if (typeof window !== 'undefined') {
      const isBypass = new URLSearchParams(window.location.search).get('testBypass') === '1'
      if (isBypass) {
        const base = window.location.origin
        return files.map((_, index) => `${base}/favicon-16x16.png`)
      }
    }

    const uploadPromises = files.map(async (file, index) => {
      const fileExt = file.name.split('.').pop()
      const fileName = `${professionalId}/${projectId}/${type}_${index}.${fileExt}`

      const { data, error } = await supabase.storage
        .from('project-images')
        .upload(fileName, file)

      if (error) throw error

      const { data: { publicUrl } } = supabase.storage
        .from('project-images')
        .getPublicUrl(fileName)

      return publicUrl
    })

    return Promise.all(uploadPromises)
  }

  // NOTIFICATIONS MANAGEMENT
  static async getNotifications(userId: string) {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }

  static async markNotificationAsRead(notificationId: string) {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId)

    if (error) throw error
  }

  static async markAllNotificationsAsRead(userId: string) {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('user_id', userId)
      .eq('read', false)

    if (error) throw error
  }

  // STATISTICS FOR ADMIN DASHBOARD
  static async getAdminStats() {
    const [quotesResult, professionalsResult, projectsResult] = await Promise.all([
      supabase.from('quotes').select('status', { count: 'exact' }),
      supabase.from('profiles').select('status, role', { count: 'exact' }).eq('role', 'professional'),
      supabase.from('projects').select('id', { count: 'exact' })
    ])

    const stats = {
      totalQuotes: quotesResult.count || 0,
      newQuotes: 0,
      assignedQuotes: 0,
      completedQuotes: 0,
      totalProfessionals: professionalsResult.count || 0,
      pendingProfessionals: 0,
      approvedProfessionals: 0,
      totalProjects: projectsResult.count || 0
    }

    // Count quotes by status
    if (quotesResult.data) {
      stats.newQuotes = quotesResult.data.filter(q => q.status === 'new').length
      stats.assignedQuotes = quotesResult.data.filter(q => q.status === 'assigned' || q.status === 'in_progress').length
      stats.completedQuotes = quotesResult.data.filter(q => q.status === 'completed').length
    }

    // Count professionals by status
    if (professionalsResult.data) {
      stats.pendingProfessionals = professionalsResult.data.filter(p => p.status === 'pending').length
      stats.approvedProfessionals = professionalsResult.data.filter(p => p.status === 'approved').length
    }

    return stats
  }
}
