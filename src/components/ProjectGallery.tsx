import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { useToast } from '../hooks/use-toast'
import { DatabaseService } from '../lib/database'
import { Project } from '../lib/supabase'
import { 
  Eye, 
  Edit, 
  Trash2, 
  Calendar,
  Image as ImageIcon,
  Loader2,
  Plus,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

interface ProjectGalleryProps {
  onAddProject?: () => void
}

export const ProjectGallery = ({ onAddProject }: ProjectGalleryProps) => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { toast } = useToast()

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      setLoading(true)
      const userProjects = await DatabaseService.getUserProjects()
      setProjects(userProjects)
    } catch (error) {
      console.error('Error loading projects:', error)
      toast({
        title: "Erreur",
        description: "Impossible de charger vos projets.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      return
    }

    try {
      await DatabaseService.deleteProject(projectId)
      setProjects(projects.filter(p => p.id !== projectId))
      toast({
        title: "Succès",
        description: "Projet supprimé avec succès.",
      })
    } catch (error) {
      console.error('Error deleting project:', error)
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le projet.",
        variant: "destructive"
      })
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const nextImage = () => {
    if (selectedProject && selectedProject.image_urls) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.image_urls!.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (selectedProject && selectedProject.image_urls) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.image_urls!.length - 1 : prev - 1
      )
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun projet encore
            </h3>
            <p className="text-gray-600 mb-4">
              Commencez à construire votre portfolio en ajoutant vos premiers projets.
            </p>
            <Button onClick={onAddProject}>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter votre Premier Projet
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Mes Projets ({projects.length})</h3>
          <p className="text-sm text-gray-600">Gérez votre portfolio professionnel</p>
        </div>
        <Button onClick={onAddProject}>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Projet
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gray-100 relative overflow-hidden">
              {project.image_urls && project.image_urls.length > 0 ? (
                <img
                  src={project.image_urls[0]}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="h-8 w-8 text-gray-400" />
                </div>
              )}
              {project.image_urls && project.image_urls.length > 1 && (
                <Badge className="absolute top-2 right-2 bg-black/70 text-white">
                  +{project.image_urls.length - 1}
                </Badge>
              )}
            </div>
            
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-base line-clamp-2">{project.title}</CardTitle>
                  <Badge variant="secondary" className="mt-2">
                    {project.service_type}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <CardDescription className="line-clamp-3 mb-4">
                {project.description}
              </CardDescription>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(project.created_at)}</span>
                </div>
                {project.image_urls && (
                  <span>{project.image_urls.length} photo{project.image_urls.length > 1 ? 's' : ''}</span>
                )}
              </div>
              
              <div className="flex space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => {
                        setSelectedProject(project)
                        setCurrentImageIndex(0)
                      }}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Voir
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>{selectedProject?.title}</DialogTitle>
                      <DialogDescription>
                        {selectedProject?.service_type} • {selectedProject && formatDate(selectedProject.created_at)}
                      </DialogDescription>
                    </DialogHeader>
                    
                    {selectedProject && (
                      <div className="space-y-4">
                        {/* Image Gallery */}
                        {selectedProject.image_urls && selectedProject.image_urls.length > 0 && (
                          <div className="relative">
                            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                              <img
                                src={selectedProject.image_urls[currentImageIndex]}
                                alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            
                            {selectedProject.image_urls.length > 1 && (
                              <>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90"
                                  onClick={prevImage}
                                >
                                  <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90"
                                  onClick={nextImage}
                                >
                                  <ChevronRight className="h-4 w-4" />
                                </Button>
                                
                                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                                  <Badge className="bg-black/70 text-white">
                                    {currentImageIndex + 1} / {selectedProject.image_urls.length}
                                  </Badge>
                                </div>
                              </>
                            )}
                          </div>
                        )}
                        
                        {/* Description */}
                        <div>
                          <h4 className="font-medium mb-2">Description</h4>
                          <p className="text-gray-600 whitespace-pre-wrap">
                            {selectedProject.description}
                          </p>
                        </div>
                        
                        {/* Thumbnails */}
                        {selectedProject.image_urls && selectedProject.image_urls.length > 1 && (
                          <div className="flex space-x-2 overflow-x-auto pb-2">
                            {selectedProject.image_urls.map((url, index) => (
                              <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                                  index === currentImageIndex ? 'border-primary' : 'border-gray-200'
                                }`}
                              >
                                <img
                                  src={url}
                                  alt={`Thumbnail ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteProject(project.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
