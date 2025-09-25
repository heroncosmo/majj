import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { DatabaseService } from '@/lib/database'
import type { Project } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import { Loader2 } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { Navigation } from '@/components/ui/navigation'
import { Footer } from '@/components/footer'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink } from '@/components/ui/pagination'

interface Prof {
  id: string
  full_name: string
  email: string
  phone?: string
  status: 'pending' | 'approved' | 'suspended'
}

interface Quote {
  id: string
  client_name: string
  client_email: string
  client_phone?: string
  service_type: string
  status: 'new' | 'assigned' | 'in_progress' | 'completed'
  address?: string
}


export default function Admin() {
  const { isAdmin, user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [rows, setRows] = useState<Prof[]>([])
  const [quotes, setQuotes] = useState<Quote[]>([])
  // Profissionais: busca e paginação
  const [searchTerm, setSearchTerm] = useState('')
  const [profPage, setProfPage] = useState(1)
  const profPageSize = 10
  const [selectedProf, setSelectedProf] = useState<Prof | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [detailsLoading, setDetailsLoading] = useState(false)
  const [profProjects, setProfProjects] = useState<Project[]>([])
  const [selectedProfileFull, setSelectedProfileFull] = useState<any | null>(null)
  // Orçamentos: filtros e paginação
  const [quoteFilter, setQuoteFilter] = useState<'all' | 'in_progress' | 'completed'>('all')
  const [quotePage, setQuotePage] = useState(1)
  const quotePageSize = 10

  // Listas derivadas
  const filteredProfs = rows.filter(r => r.full_name.toLowerCase().includes(searchTerm.toLowerCase()))
  const totalProfPages = Math.max(1, Math.ceil(filteredProfs.length / profPageSize))
  const currentProfs = filteredProfs.slice((profPage - 1) * profPageSize, profPage * profPageSize)

  const filteredQuotes = quotes.filter(q => {
    if (quoteFilter === 'all') return true
    if (quoteFilter === 'completed') return q.status === 'completed'
    // "Em andamento": considerar estados ativos que ainda não foram concluídos
    return q.status === 'in_progress' || q.status === 'new' || q.status === 'assigned'
  })
  const totalQuotePages = Math.max(1, Math.ceil(filteredQuotes.length / quotePageSize))
  const currentQuotes = filteredQuotes.slice((quotePage - 1) * quotePageSize, quotePage * quotePageSize)

  const getUserInitials = () => {
    const full = user?.profile?.full_name
    if (!full) return 'AD'
    return full.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  const API_URL = import.meta.env.VITE_SUPABASE_URL
  const API_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

  // Carregar perfil completo e projetos do profissional quando abrir detalhes
  useEffect(() => {
    const run = async () => {
      if (detailsOpen && selectedProf) {
        setDetailsLoading(true)
        try {
          const { data: profFull } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', selectedProf.id)
            .single()
          setSelectedProfileFull(profFull || null)

          const data = await DatabaseService.getProjectsByProfessional(selectedProf.id)
          setProfProjects(data || [])
        } catch (e) {
          console.error('[admin] load details error', e)
        } finally {
          setDetailsLoading(false)
        }
      } else {
        setProfProjects([])
        setSelectedProfileFull(null)
      }
    }
    void run()
  }, [detailsOpen, selectedProf])

  // Evitar REST manual com env; usar o cliente do Supabase autenticado
  const loadData = async () => {
    setLoading(true)
    try {
      const { data: profs, error: profErr } = await supabase
        .from('profiles')
        .select('id,full_name,email,phone,status')
        .eq('role', 'professional')
        .order('created_at', { ascending: false })
      if (profErr) throw profErr
      setRows(profs || [])

      const { data: qs, error: qErr } = await supabase
        .from('quotes')
        .select('id,client_name,client_email,client_phone,service_type,status,address')
        .order('created_at', { ascending: false })
      if (qErr) throw qErr
      console.log('[admin] quotes fetched:', Array.isArray(qs) ? qs.length : qs)
      setQuotes(qs || [])
    } catch (e: any) {
      console.error('[admin] load error', e)
      toast({ title: 'Erro ao carregar dados', description: e?.message || 'Falha no carregamento', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  // Carregar dados quando tivermos um usuário/sessão ou quando isAdmin estiver definido
  useEffect(() => {
    const run = async () => {
      if (user?.id || isAdmin) {
        await loadData()
        return
      }
      const { data: { session } } = await supabase.auth.getSession()
      if (session) await loadData()
    }
    void run()
  }, [user?.id, isAdmin])


  const updateQuote = async (quoteId: string, status: 'in_progress' | 'completed') => {
    try {
      await DatabaseService.updateQuoteStatus(quoteId, status as any)
      toast({
        title: 'Sucesso',
        description: status === 'completed' ? 'Orçamento marcado como concluído' : 'Orçamento marcado como em andamento'
      })
      await loadData()
    } catch (e: any) {
      console.error(e)
      toast({ title: 'Erro', description: e?.message || 'Falha ao atualizar orçamento', variant: 'destructive' })
    }
  }

  if (!(isAdmin || user?.email === 'brasilmajik@gmail.com')) {
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
      <Navigation />

      {/* Header do Admin com perfil */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-14 w-14">
                <AvatarImage src={user?.profile?.profile_image_url} />
                <AvatarFallback className="text-lg">{getUserInitials()}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Administração</h1>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{user?.profile?.full_name || 'Administrador'}</span>
                  <span className="mx-2">•</span>
                  <span>{user?.email}</span>
                  <span className="mx-2">•</span>
                  <Badge variant="secondary" className="uppercase">{user?.profile?.role || 'admin'}</Badge>
                </div>
              </div>
            </div>
            {/* Logout já disponível no menu do Navigation */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="professionals" className="w-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Painel Administrativo</h2>
            <TabsList>
              <TabsTrigger value="professionals">Profissionais</TabsTrigger>
              <TabsTrigger value="quotes">Orçamentos</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="professionals">
            <div className="flex items-center gap-2 mb-4">
              <Input
                placeholder="Buscar por nome do profissional..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setProfPage(1) }}
                className="max-w-sm"
              />
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-10 text-gray-600"><Loader2 className="h-6 w-6 animate-spin mr-2" /> Carregando...</div>
            ) : (
              <div className="space-y-3">
                {currentProfs.map((r) => (
                  <div key={r.id} className="bg-white rounded-md shadow-sm p-4 flex items-center justify-between">
                    <div>
                      <div className="font-medium">{r.full_name} <span className="text-gray-500 text-sm">({r.email})</span></div>
                      {r.phone && <div className="text-sm text-gray-600">Telefone: {r.phone}</div>}
                    </div>
                    <div className="flex gap-2">
                      {(r.phone || '').replace(/\D/g, '') && (
                        <a
                          href={`https://wa.me/${(r.phone || '').replace(/\D/g, '')}?text=${encodeURIComponent(`Olá ${r.full_name}, aqui é da Majik Services.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center bg-emerald-600 text-white px-3 py-2 rounded hover:bg-emerald-700"
                          title="Falar com Profissional"
                        >
                          Falar com Profissional
                        </a>
                      )}
                      <Button variant="outline" onClick={() => { setSelectedProf(r); setDetailsOpen(true) }}>Ver Detalhes</Button>
                    </div>
                  </div>
                ))}

                {/* Pagina e7 e3o de profissionais */}
                <Pagination className="pt-2">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); setProfPage(p => Math.max(1, p - 1)) }} />
                    </PaginationItem>
                    {Array.from({ length: totalProfPages }, (_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink href="#" isActive={profPage === (i + 1)} onClick={(e) => { e.preventDefault(); setProfPage(i + 1) }}>
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext href="#" onClick={(e) => { e.preventDefault(); setProfPage(p => Math.min(totalProfPages, p + 1)) }} />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </TabsContent>

          {/* Modal de detalhes do profissional (fora das abas para estar acess vel em Profissionais) */}
          <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Detalhes do Profissional</DialogTitle>
              </DialogHeader>
              {!selectedProf ? (
                <div className="text-sm text-gray-600">Nenhum profissional selecionado.</div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={undefined} />
                      <AvatarFallback>{selectedProf.full_name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{selectedProf.full_name}</div>
                      <div className="text-sm text-gray-600">{selectedProf.email}</div>
                      {selectedProf.phone && <div className="text-sm text-gray-600">Telefone: {selectedProf.phone}</div>}
                    </div>
                  </div>

                  {/* Perfil / especialidades / bio */}
                  {Array.isArray(selectedProfileFull?.specialties) && selectedProfileFull!.specialties.length > 0 && (
                    <div>
                      <div className="text-sm font-medium">Especialidades:</div>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedProfileFull!.specialties.map((s: string, idx: number) => (
                          <Badge key={idx} variant="secondary">{s}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {selectedProfileFull?.bio && (
                    <div className="text-sm text-gray-700 whitespace-pre-wrap">{selectedProfileFull.bio}</div>
                  )}

                  {/* Projetos (servi e7os/fotos) */}
                  <div>
                    <div className="text-sm font-medium mb-2">Projetos do profissional</div>
                    {detailsLoading ? (
                      <div className="flex items-center text-gray-600"><Loader2 className="h-4 w-4 animate-spin mr-2" /> Carregando projetos...</div>
                    ) : profProjects.length === 0 ? (
                      <div className="text-sm text-gray-600">Nenhum projeto encontrado.</div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {profProjects.map((p) => (
                          <div key={p.id} className="border rounded-md p-3 bg-white">
                            <div className="font-medium">{p.title || p.service_type}</div>
                            <div className="text-xs text-gray-600 mb-2">Servi e7o: {p.service_type}</div>
                            {Array.isArray(p.after_images) && p.after_images.length > 0 ? (
                              <div className="grid grid-cols-3 gap-2">
                                {p.after_images.slice(0,3).map((url, i) => (
                                  <img key={i} src={url} alt="foto" className="h-20 w-full object-cover rounded" />
                                ))}
                              </div>
                            ) : (
                              <div className="text-xs text-gray-500">Sem fotos</div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          <TabsContent value="quotes">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-gray-600">Filtrar:</span>
              <Button variant={quoteFilter==='all' ? 'default' : 'outline'} size="sm" onClick={() => setQuoteFilter('all')}>Todos</Button>
              <Button variant={quoteFilter==='in_progress' ? 'default' : 'outline'} size="sm" onClick={() => setQuoteFilter('in_progress')}>Em andamento</Button>
              <Button variant={quoteFilter==='completed' ? 'default' : 'outline'} size="sm" onClick={() => setQuoteFilter('completed')}>Concluídos</Button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-10 text-gray-600"><Loader2 className="h-6 w-6 animate-spin mr-2" /> Carregando...</div>
            ) : (
              <>
                <div className="space-y-3">
                  {currentQuotes.map((q) => (
                    <div key={q.id} className="bg-white rounded-md shadow-sm p-4 flex items-center justify-between">
                      <div>
                        <div className="font-medium">{q.client_name} <span className="text-gray-500 text-sm">({q.client_email})</span></div>
                        <div className="text-sm text-gray-600">Telefone: {q.client_phone || '-'}</div>
                        <div className="text-sm text-gray-600">Serviço: {q.service_type} • Status: {q.status}</div>
                        {q.address && <div className="text-xs text-gray-500 mt-1">{q.address}</div>}
                      </div>
                      <div className="flex gap-2">
                        {((q.client_phone || '').replace(/\D/g, '')) && (
                          <a
                            href={`https://wa.me/${(q.client_phone || '').replace(/\D/g, '')}?text=${encodeURIComponent(`Olá ${q.client_name}, aqui é da Majik Services. Sobre sua solicitação de orçamento (${q.service_type}).`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center bg-emerald-600 text-white px-3 py-2 rounded hover:bg-emerald-700"
                            title="Enviar WhatsApp"
                          >
                            Enviar WhatsApp
                          </a>
                        )}
                        <button onClick={() => updateQuote(q.id, 'completed')} className="inline-flex items-center bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700">
                          Marcar concluído
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Paginação de orçamentos */}
                <Pagination className="pt-2">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); setQuotePage(p => Math.max(1, p - 1)) }} />
                    </PaginationItem>
                    {Array.from({ length: totalQuotePages }, (_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink href="#" isActive={quotePage === (i + 1)} onClick={(e) => { e.preventDefault(); setQuotePage(i + 1) }}>
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext href="#" onClick={(e) => { e.preventDefault(); setQuotePage(p => Math.min(totalQuotePages, p + 1)) }} />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>


      <Footer />
    </div>
  )
}

