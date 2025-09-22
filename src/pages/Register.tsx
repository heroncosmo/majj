import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "../contexts/AuthContext";
import { UserPlus, Upload, Loader2, Eye, EyeOff } from "lucide-react";
import { supabase } from "../lib/supabase";

// Validation schema
const registerSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Numéro de téléphone invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  confirmPassword: z.string(),
  experience: z.string().min(1, "Veuillez sélectionner votre expérience"),
  serviceTypes: z.array(z.string()).min(1, "Veuillez sélectionner au moins un service"),
  availability: z.string().min(1, "Veuillez sélectionner votre disponibilité"),
  hasVehicle: z.string().min(1, "Veuillez indiquer si vous avez un véhicule"),
  hasEquipment: z.string().min(1, "Veuillez indiquer si vous avez de l'équipement"),
  references: z.string().optional(),
  additionalInfo: z.string().optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"]
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, signUp, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // (Hooks devem ser inicializados antes de returns condicionais)

  const serviceTypes = [
    "Nettoyage Résidentiel",
    "Nettoyage Commercial",
    "Nettoyage Approfondi",
    "Service de Femme de Ménage",
    "Nettoyage des Vitres",
    "Organisation et Rangement"
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      serviceTypes: []
    }
  });

  const watchedServiceTypes = watch("serviceTypes") || [];

  const handleServiceTypeChange = (serviceType: string, checked: boolean) => {
    const currentTypes = getValues("serviceTypes") || [];
    const newTypes = checked
      ? [...currentTypes, serviceType]
      : currentTypes.filter(type => type !== serviceType);

  // Redirect if already logged in (après initialiser hooks)
  if (user && !loading) {
    return <Navigate to="/dashboard" replace />
  }
    setValue("serviceTypes", newTypes);
  };

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setError(null);
      setIsSubmitting(true);

      // Registrar via cliente padrão (signUp).
      await signUp(data.email, data.password, {
        full_name: `${data.firstName} ${data.lastName}`,
        phone: data.phone,
        specialties: data.serviceTypes,
        bio: data.additionalInfo || undefined
      });

      toast({
        title: "Inscription Réussie!",
        description: "Votre compte a été créé. Vous recevrez une notification une fois votre profil approuvé."
      });

      // Redireciona para a página de login para evitar que a navegação do teste
      // cancele a requisição de signup em andamento
      navigate('/login', { replace: true });

    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      setError(
        message.includes('already registered')
          ? 'Cette adresse email est déjà utilisée'
          : 'Erreur lors de l\'inscription. Veuillez réessayer.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-accent/20">
      <Navigation />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <UserPlus className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Rejoignez Notre Réseau Professionnel
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Inscrivez-vous comme professionnel du nettoyage et commencez à recevoir des opportunités d'emploi directement sur votre téléphone
            </p>
          </div>

          {/* Registration Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Formulaire d'Inscription Professionnelle</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* Personal Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold border-b border-border pb-2">Informations Personnelles</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom *</Label>
                      <Input
                        id="firstName"
                        {...register("firstName")}
                        className={errors.firstName ? 'border-red-500' : ''}
                      />
                      {errors.firstName && (
                        <p className="text-sm text-red-500">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom de Famille *</Label>
                      <Input
                        id="lastName"
                        {...register("lastName")}
                        className={errors.lastName ? 'border-red-500' : ''}
                      />
                      {errors.lastName && (
                        <p className="text-sm text-red-500">{errors.lastName.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Adresse Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        className={errors.email ? 'border-red-500' : ''}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500">{errors.email.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Numéro de Téléphone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+55 62 99999-9999"
                        {...register("phone")}
                        className={errors.phone ? 'border-red-500' : ''}
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-500">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Password fields */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="password">Mot de passe *</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          {...register("password")}
                          className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-sm text-red-500">{errors.password.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          {...register("confirmPassword")}
                          className={errors.confirmPassword ? 'border-red-500 pr-10' : 'pr-10'}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold border-b border-border pb-2">Informations Professionnelles</h3>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Années d'Expérience *</Label>
                    <Select onValueChange={(value) => setValue("experience", value)}>
                      <SelectTrigger className={errors.experience ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Sélectionnez votre niveau d'expérience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-1">0-1 ans</SelectItem>
                        <SelectItem value="2-3">2-3 ans</SelectItem>
                        <SelectItem value="4-5">4-5 ans</SelectItem>
                        <SelectItem value="6-10">6-10 ans</SelectItem>
                        <SelectItem value="10+">10+ ans</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.experience && (
                      <p className="text-sm text-red-500">{errors.experience.message}</p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label>Types de Services (Sélectionnez tous ceux qui s'appliquent) *</Label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {serviceTypes.map((serviceType) => (
                        <div key={serviceType} className="flex items-center space-x-2">
                          <Checkbox
                            id={serviceType}
                            checked={watchedServiceTypes.includes(serviceType)}
                            onCheckedChange={(checked) => handleServiceTypeChange(serviceType, checked as boolean)}
                          />
                          <Label htmlFor={serviceType}>{serviceType}</Label>
                        </div>
                      ))}
                    </div>
                    {errors.serviceTypes && (
                      <p className="text-sm text-red-500">{errors.serviceTypes.message}</p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label>Disponibilité *</Label>
                    <RadioGroup onValueChange={(value) => setValue("availability", value)}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="weekdays" id="weekdays" />
                        <Label htmlFor="weekdays">Jours de semaine seulement</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="weekends" id="weekends" />
                        <Label htmlFor="weekends">Week-ends seulement</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="flexible" id="flexible" />
                        <Label htmlFor="flexible">Flexible (tous les jours)</Label>
                      </div>
                    </RadioGroup>
                    {errors.availability && (
                      <p className="text-sm text-red-500">{errors.availability.message}</p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label>Avez-vous votre propre véhicule? *</Label>
                      <RadioGroup onValueChange={(value) => setValue("hasVehicle", value)}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="vehicle-yes" />
                          <Label htmlFor="vehicle-yes">Oui</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="vehicle-no" />
                          <Label htmlFor="vehicle-no">Non</Label>
                        </div>
                      </RadioGroup>
                      {errors.hasVehicle && (
                        <p className="text-sm text-red-500">{errors.hasVehicle.message}</p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <Label>Avez-vous de l'équipement de nettoyage? *</Label>
                      <RadioGroup onValueChange={(value) => setValue("hasEquipment", value)}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="equipment-yes" />
                          <Label htmlFor="equipment-yes">Oui</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="equipment-no" />
                          <Label htmlFor="equipment-no">Non</Label>
                        </div>
                      </RadioGroup>
                      {errors.hasEquipment && (
                        <p className="text-sm text-red-500">{errors.hasEquipment.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold border-b border-border pb-2">Informations Supplémentaires</h3>

                  <div className="space-y-2">
                    <Label htmlFor="references">Références (Employeurs ou clients précédents)</Label>
                    <Textarea
                      id="references"
                      placeholder="Veuillez fournir les informations de contact de 2-3 références..."
                      {...register("references")}
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalInfo">Informations Supplémentaires</Label>
                    <Textarea
                      id="additionalInfo"
                      placeholder="Parlez-nous de votre expérience, spécialisations ou disponibilité..."
                      {...register("additionalInfo")}
                      rows={4}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Photos de Portfolio (Optionnel)</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                      <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-2">Téléchargez des photos de vos travaux précédents</p>
                      <Button variant="outline" type="button">
                        Choisir des Fichiers
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-6">
                  <Button
                    type="submit"
                    size="lg"
                    className="px-12"
                    disabled={isSubmitting || loading}
                  >
                    {isSubmitting || loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Inscription en cours...
                      </>
                    ) : (
                      'Soumettre l\'Inscription'
                    )}
                  </Button>
                </div>

                {/* Login link */}
                <div className="text-center pt-4">
                  <p className="text-sm text-gray-600">
                    Vous avez déjà un compte ?{' '}
                    <Link
                      to="/login"
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      Se connecter
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Register;