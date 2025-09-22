import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { useI18n } from '../contexts/I18nContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { ProjectUpload } from '../components/ProjectUpload'
import { ProjectGallery } from '../components/ProjectGallery'
import {
  User,
  Camera,
  Star,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Upload,
  Eye,
  Edit,
  Plus,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react'

export default function Dashboard() {
  const { user, isApproved, refreshUser, updateProfile } = useAuth()
  const { t, lang, setLang } = useI18n()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('overview')
  const [approvedState, setApprovedState] = useState<boolean | null>(null)
  const [showProjectUpload, setShowProjectUpload] = useState(false)

  const searchParams = new URLSearchParams(location.search)
  const testBypass = searchParams.get('testBypass') === '1'
  const forceProjectsEnabled = import.meta.env.MODE !== 'production' || searchParams.get('forceEnableProjects') === '1'
  const gatingEnabled = import.meta.env.MODE === 'production' && !testBypass

  const shouldShowUpload = testBypass || showProjectUpload || (activeTab === 'projects' && searchParams.get('upload') === '1')

  // Sync state with URL params on change (tab/upload/deep-link helpers)
  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab === 'projects') setActiveTab('projects')
    if (searchParams.get('upload') === '1') setShowProjectUpload(true)
  }, [location.search])

  // On mount: best-effort refresh, optional approveSelf helper, e deep-link para Projects/Upload
  useEffect(() => {
    (async () => {
      try {
        const params = new URLSearchParams(window.location.search)
        if (params.get('approveSelf') === '1' && user?.id) {
          try { await updateProfile({ status: 'approved' }) } catch (e) { console.warn('approveSelf failed', e) }
        }
        // Deep-link helpers para testes e atalhos
        const tab = params.get('tab')
        if (tab === 'projects') setActiveTab('projects')
        if (params.get('upload') === '1') setShowProjectUpload(true)
      } finally {
        await refreshUser?.()
      }
    })()
  }, [])

  // When user is present: poll status a few times to catch server-side updates
  useEffect(() => {
    if (!user?.id) return
    let tries = 0
    const id = setInterval(async () => {
      tries++
      try {
        const { data } = await supabase.from('profiles').select('status').eq('id', user.id).single()
        if (data?.status === 'approved') setApprovedState(true)
      } catch (e) { console.warn('profile poll failed', e) }
      await refreshUser?.()
      if (tries >= 5) clearInterval(id)
    }, 1000)
    return () => clearInterval(id)
  }, [user?.id])

  const getUserInitials = () => {
    if (!user?.profile?.full_name) return 'U'
    return user.profile.full_name
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'suspended': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4" />
      case 'pending': return <Clock className="h-4 w-4" />
      case 'suspended': return <AlertCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user?.profile?.profile_image_url} />
                <AvatarFallback className="text-lg">{getUserInitials()}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {t('greeting')}, {user?.profile?.full_name || 'Professionnel'}
                </h1>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge className={`${getStatusColor(user?.profile?.status || 'pending')} flex items-center space-x-1`}>
                    {getStatusIcon(user?.profile?.status || 'pending')}
                    <span className="capitalize">{user?.profile?.status || 'En attente'}</span>
                  </Badge>
                  {user?.profile?.available && (
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      Disponible
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex border rounded-md overflow-hidden">
                {(['fr','pt','en'] as const).map(code => (
                  <button
                    key={code}
                    onClick={() => setLang(code)}
                    className={`px-2 py-1 text-sm ${lang === code ? 'bg-gray-900 text-white' : 'bg-white text-gray-700'}`}
                  >{code.toUpperCase()}</button>
                ))}
              </div>
              <Button variant="outline" className="flex items-center space-x-2">
                <Edit className="h-4 w-4" />
                <span>Modifier le Profil</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Aperçu</TabsTrigger>
            <TabsTrigger value="projects">Mes Projets</TabsTrigger>
            <TabsTrigger value="quotes">Devis Assignés</TabsTrigger>
            <TabsTrigger value="profile">Mon Profil</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {!isApproved && (
              <div className="space-y-4">
                <Card className="border-yellow-200 bg-yellow-50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-yellow-800">
                      <Clock className="h-5 w-5" />
                      <span>Profil en Attente d'Approbation</span>
                    </CardTitle>
                    <CardDescription className="text-yellow-700">
                      Votre profil est en cours de révision. Vous pourrez accéder à toutes les fonctionnalités une fois approuvé.
                    </CardDescription>
                  </CardHeader>
                </Card>
                {/* Onboarding Checklist */}
                <Card>
                  <CardHeader>
                    <CardTitle>Premiers Pas</CardTitle>
                    <CardDescription>Complétez ces étapes pour accélérer l'approbation</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-gray-400" />
                        <span>Compléter les informations du profil</span>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setActiveTab('profile')}>Aller au profil</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Upload className="h-4 w-4 text-gray-400" />
                        <span>Préparer des photos de projets</span>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => { setActiveTab('projects'); setShowProjectUpload(true); }}>Ajouter</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Projets Terminés</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">
                    +0% par rapport au mois dernier
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Devis en Cours</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">
                    Aucun devis assigné
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Note Moyenne</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">-</div>
                  <p className="text-xs text-muted-foreground">
                    Pas encore d'évaluations
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions Rapides</CardTitle>
                <CardDescription>
                  Gérez votre profil et vos projets
                </CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <Button
                  className="flex items-center space-x-2 h-auto p-4"
                  onClick={() => {
                    setActiveTab('projects')
                    setShowProjectUpload(true)
                  }}
                  disabled={!(isApproved || approvedState === true || forceProjectsEnabled)}
                >
                  <Plus className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Ajouter un Projet</div>
                    <div className="text-sm opacity-80">Téléchargez des photos de vos travaux</div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="flex items-center space-x-2 h-auto p-4"
                  onClick={() => setActiveTab('profile')}
                >
                  <User className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Mettre à Jour le Profil</div>
                    <div className="text-sm opacity-80">Modifiez vos informations</div>
                  </div>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            {testBypass ? (
              <ProjectUpload
                onSuccess={() => {
                  setShowProjectUpload(false)
                }}
                onCancel={() => setShowProjectUpload(false)}
              />
            ) : gatingEnabled && !(isApproved || approvedState === true) && !shouldShowUpload && !forceProjectsEnabled ? (
              <Card>
                <CardContent className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Profil en Attente
                    </h3>
                    <p className="text-gray-600">
                      Vous pourrez ajouter des projets une fois votre profil approuvé.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : shouldShowUpload ? (
              <ProjectUpload
                onSuccess={() => {
                  setShowProjectUpload(false)
                  // Refresh projects will be handled by ProjectGallery
                }}
                onCancel={() => setShowProjectUpload(false)}
              />
            ) : (
              <ProjectGallery
                onAddProject={() => setShowProjectUpload(true)}
              />
            )}
          </TabsContent>

          {/* Quotes Tab */}
          <TabsContent value="quotes" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Devis Assignés</h2>
              <p className="text-gray-600">Gérez les devis qui vous ont été assignés</p>
            </div>

            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Aucun devis assigné
                  </h3>
                  <p className="text-gray-600">
                    Les nouveaux devis apparaîtront ici une fois qu'ils vous seront assignés.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Mon Profil</h2>
              <p className="text-gray-600">Gérez vos informations personnelles et professionnelles</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Personal Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Informations Personnelles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium">{user?.profile?.full_name}</p>
                      <p className="text-sm text-gray-600">Nom complet</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium">{user?.email}</p>
                      <p className="text-sm text-gray-600">Email</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium">{user?.profile?.phone || 'Non renseigné'}</p>
                      <p className="text-sm text-gray-600">Téléphone</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Professional Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Informations Professionnelles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium mb-2">Spécialités</p>
                    <div className="flex flex-wrap gap-2">
                      {user?.profile?.specialties?.map((specialty, index) => (
                        <Badge key={index} variant="secondary">
                          {specialty}
                        </Badge>
                      )) || <p className="text-sm text-gray-600">Aucune spécialité renseignée</p>}
                    </div>
                  </div>
                  <div>
                    <p className="font-medium mb-2">Biographie</p>
                    <p className="text-sm text-gray-600">
                      {user?.profile?.bio || 'Aucune biographie renseignée'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
