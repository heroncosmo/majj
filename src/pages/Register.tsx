import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, Upload } from "lucide-react";

const Register = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    experience: "",
    serviceTypes: [] as string[],
    availability: "",
    hasVehicle: "",
    hasEquipment: "",
    references: "",
    additionalInfo: ""
  });

  const serviceTypes = [
    "Nettoyage Résidentiel",
    "Nettoyage Commercial",
    "Nettoyage Approfondi",
    "Service de Femme de Ménage",
    "Nettoyage des Vitres",
    "Organisation et Rangement"
  ];

  const handleServiceTypeChange = (serviceType: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      serviceTypes: checked 
        ? [...prev.serviceTypes, serviceType]
        : prev.serviceTypes.filter(type => type !== serviceType)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Inscription Soumise!",
      description: "Merci de vous être inscrit. Nous examinerons votre candidature et vous contacterons bientôt."
    });
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
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold border-b border-border pb-2">Informations Personnelles</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom de Famille *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Adresse Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Numéro de Téléphone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold border-b border-border pb-2">Informations Professionnelles</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience *</Label>
                    <Select value={formData.experience} onValueChange={(value) => setFormData(prev => ({ ...prev, experience: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-1">0-1 years</SelectItem>
                        <SelectItem value="2-3">2-3 years</SelectItem>
                        <SelectItem value="4-5">4-5 years</SelectItem>
                        <SelectItem value="6-10">6-10 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label>Service Types (Select all that apply) *</Label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {serviceTypes.map((serviceType) => (
                        <div key={serviceType} className="flex items-center space-x-2">
                          <Checkbox
                            id={serviceType}
                            checked={formData.serviceTypes.includes(serviceType)}
                            onCheckedChange={(checked) => handleServiceTypeChange(serviceType, checked as boolean)}
                          />
                          <Label htmlFor={serviceType}>{serviceType}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Availability *</Label>
                    <RadioGroup 
                      value={formData.availability} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, availability: value }))}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="weekdays" id="weekdays" />
                        <Label htmlFor="weekdays">Weekdays only</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="weekends" id="weekends" />
                        <Label htmlFor="weekends">Weekends only</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="flexible" id="flexible" />
                        <Label htmlFor="flexible">Flexible (all days)</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label>Do you have your own vehicle? *</Label>
                      <RadioGroup 
                        value={formData.hasVehicle} 
                        onValueChange={(value) => setFormData(prev => ({ ...prev, hasVehicle: value }))}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="vehicle-yes" />
                          <Label htmlFor="vehicle-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="vehicle-no" />
                          <Label htmlFor="vehicle-no">No</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-3">
                      <Label>Do you have cleaning equipment? *</Label>
                      <RadioGroup 
                        value={formData.hasEquipment} 
                        onValueChange={(value) => setFormData(prev => ({ ...prev, hasEquipment: value }))}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="equipment-yes" />
                          <Label htmlFor="equipment-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="equipment-no" />
                          <Label htmlFor="equipment-no">No</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold border-b border-border pb-2">Additional Information</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="references">References (Previous employers or clients)</Label>
                    <Textarea
                      id="references"
                      placeholder="Please provide contact information for 2-3 references..."
                      value={formData.references}
                      onChange={(e) => setFormData(prev => ({ ...prev, references: e.target.value }))}
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalInfo">Additional Information</Label>
                    <Textarea
                      id="additionalInfo"
                      placeholder="Tell us anything else about your experience, specializations, or availability..."
                      value={formData.additionalInfo}
                      onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
                      rows={4}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Portfolio Photos (Optional)</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                      <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-2">Upload photos of your previous work</p>
                      <Button variant="outline" type="button">
                        Choose Files
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-6">
                  <Button type="submit" size="lg" className="px-12">
                    Soumettre l'Inscription
                  </Button>
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