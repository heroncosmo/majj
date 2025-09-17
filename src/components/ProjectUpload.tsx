import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Badge } from './ui/badge'
import { useToast } from '../hooks/use-toast'
import { DatabaseService } from '../lib/database'
import { 
  Upload, 
  X, 
  Image as ImageIcon, 
  Loader2,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

interface ProjectUploadProps {
  onSuccess?: () => void
  onCancel?: () => void
}

export const ProjectUpload = ({ onSuccess, onCancel }: ProjectUploadProps) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [serviceType, setServiceType] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const { toast } = useToast()

  const serviceTypes = [
    'Nettoyage Résidentiel',
    'Nettoyage Commercial', 
    'Nettoyage Approfondi',
    'Service de Femme de Ménage',
    'Nettoyage des Vitres',
    'Organisation et Rangement',
    'Nettoyage Post-Construction'
  ]

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Limiter à 5 images maximum
    const newFiles = [...files, ...acceptedFiles].slice(0, 5)
    setFiles(newFiles)
  }, [files])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 5,
    maxSize: 5 * 1024 * 1024 // 5MB
  })

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim() || !description.trim() || !serviceType || files.length === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs et ajouter au moins une image.",
        variant: "destructive"
      })
      return
    }

    setUploading(true)
    
    try {
      await DatabaseService.createProject({
        title: title.trim(),
        description: description.trim(),
        service_type: serviceType,
        images: files
      })

      toast({
        title: "Succès",
        description: "Votre projet a été ajouté avec succès!",
        variant: "default"
      })

      // Reset form
      setTitle('')
      setDescription('')
      setServiceType('')
      setFiles([])
      
      onSuccess?.()
    } catch (error) {
      console.error('Error creating project:', error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout du projet.",
        variant: "destructive"
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <ImageIcon className="h-5 w-5" />
          <span>Ajouter un Nouveau Projet</span>
        </CardTitle>
        <CardDescription>
          Partagez vos travaux récents pour construire votre portfolio
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Titre du Projet *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Nettoyage complet d'une maison de 150m²"
              required
            />
          </div>

          {/* Service Type */}
          <div className="space-y-2">
            <Label htmlFor="serviceType">Type de Service *</Label>
            <select
              id="serviceType"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Sélectionnez un type de service</option>
              {serviceTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez le travail effectué, les défis rencontrés, les techniques utilisées..."
              rows={4}
              required
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-4">
            <Label>Photos du Projet * (Maximum 5 images)</Label>
            
            {/* Dropzone */}
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                isDragActive 
                  ? 'border-primary bg-primary/5' 
                  : 'border-gray-300 hover:border-primary hover:bg-gray-50'
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              {isDragActive ? (
                <p className="text-primary">Déposez les images ici...</p>
              ) : (
                <div>
                  <p className="text-gray-600 mb-1">
                    Glissez-déposez vos images ici, ou cliquez pour sélectionner
                  </p>
                  <p className="text-sm text-gray-500">
                    PNG, JPG, WEBP jusqu'à 5MB chacune
                  </p>
                </div>
              )}
            </div>

            {/* Preview Images */}
            {files.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {files.map((file, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                    <p className="text-xs text-gray-600 mt-1 truncate">
                      {file.name}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* File count indicator */}
            {files.length > 0 && (
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{files.length}/5 images sélectionnées</span>
                {files.length === 5 && (
                  <Badge variant="secondary" className="flex items-center space-x-1">
                    <CheckCircle className="h-3 w-3" />
                    <span>Maximum atteint</span>
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="submit"
              disabled={uploading || !title.trim() || !description.trim() || !serviceType || files.length === 0}
              className="flex-1"
            >
              {uploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Ajout en cours...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Ajouter le Projet
                </>
              )}
            </Button>
            
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={uploading}
              >
                Annuler
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
