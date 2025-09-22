import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    try {
      const redirectTo = `${window.location.origin}/reset-password`
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo })
      if (error) throw error
      toast({ title: 'E-mail envoyé', description: "Vérifiez votre boîte mail pour réinitialiser le mot de passe." })
      setEmail('')
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      toast({ title: 'Erreur', description: message || "Impossible d'envoyer l'e-mail.", variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto max-w-md p-6">
      <h1 className="text-2xl font-semibold mb-4">Mot de passe oublié</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="votre@email.com" className="w-full border px-3 py-2 rounded" />
        <button type="submit" disabled={loading} className="btn btn-primary px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50">
          {loading ? 'Envoi...' : 'Envoyer le lien de réinitialisation'}
        </button>
      </form>
    </div>
  )
}

