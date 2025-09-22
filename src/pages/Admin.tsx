import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import { Loader2, CheckCircle, Ban } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

interface Prof {
  id: string
  full_name: string
  email: string
  status: 'pending' | 'approved' | 'suspended'
}

export default function Admin() {
  const { isAdmin, user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [rows, setRows] = useState<Prof[]>([])

  const load = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, email, status')
      .in('status', ['pending', 'suspended'])
      .order('created_at', { ascending: true })
    if (error) {
      console.error(error)
    } else {
      setRows((data as Prof[]) || [])
    }
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const act = async (professionalId: string, status: 'approved' | 'suspended') => {
    try {
      const { data, error } = await supabase.functions.invoke('admin-approve-profile', {
        body: { professionalId, status },
      })
      if (error) throw error
      toast({ title: 'Sucesso', description: `Status atualizado para ${status}` })
      await load()
    } catch (e: any) {
      console.error(e)
      toast({ title: 'Erro', description: e?.message || 'Falha ao atualizar status', variant: 'destructive' })
    }
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-700">Acesso restrito a administradores.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Painel de Aprovação de Profissionais</h1>
        {loading ? (
          <div className="flex items-center justify-center py-10 text-gray-600"><Loader2 className="h-6 w-6 animate-spin mr-2" /> Carregando...</div>
        ) : rows.length === 0 ? (
          <div className="text-gray-600">Nenhum profissional pendente/suspenso no momento.</div>
        ) : (
          <div className="space-y-3">
            {rows.map(r => (
              <div key={r.id} className="bg-white rounded-md shadow-sm p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium">{r.full_name} <span className="text-gray-500 text-sm">({r.email})</span></div>
                  <div className="text-sm text-gray-600">Status: {r.status}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => act(r.id, 'approved')} className="inline-flex items-center bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-1" /> Aprovar
                  </button>
                  <button onClick={() => act(r.id, 'suspended')} className="inline-flex items-center bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700">
                    <Ban className="h-4 w-4 mr-1" /> Suspender
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

