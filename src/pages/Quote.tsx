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
import { Calculator, MapPin, Calendar } from "lucide-react";
import { DatabaseService } from "@/lib/database";

const Quote = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    serviceType: "",
    propertyType: "",
    rooms: "",
    bathrooms: "",
    frequency: "",
    preferredDate: "",
    timePreference: "",
    specialRequests: [] as string[],
    additionalNotes: "",
    budget: ""
  });

  const serviceTypes = [
    "Nettoyage Résidentiel Régulier",
    "Nettoyage Approfondi",
    "Nettoyage d'Emménagement/Déménagement",
    "Nettoyage Post-Construction",
    "Nettoyage Commercial de Bureau",
    "Service d'Organisation"
  ];

  const specialRequests = [
    "Produits respectueux des animaux",
    "Produits écologiques uniquement",
    "Nettoyage des vitres inclus",
    "Nettoyage du réfrigérateur",
    "Nettoyage du four",
    "Service de lessive",
    "Service d'organisation"
  ];

  const handleSpecialRequestChange = (request: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      specialRequests: checked 
        ? [...prev.specialRequests, request]
        : prev.specialRequests.filter(req => req !== request)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const client_name = `${formData.firstName} ${formData.lastName}`.trim();
      const client_email = formData.email;
      const client_phone = formData.phone;
      const service_type = formData.serviceType;
      const address = `${formData.address}, ${formData.city} ${formData.zipCode}`.trim();

      const details = [
        `Type de propriété: ${formData.propertyType || '-'}`,
        `Pièces: ${formData.rooms || '-'}`,
        `Salles de bain: ${formData.bathrooms || '-'}`,
        `Fréquence: ${formData.frequency || '-'}`,
        `Préférences horaires: ${formData.timePreference || '-'}`,
        `Services additionnels: ${formData.specialRequests.join(', ') || '-'}`,
        `Budget: ${formData.budget || '-'}`,
        formData.additionalNotes ? `Notes: ${formData.additionalNotes}` : ''
      ].filter(Boolean).join('\n');

      await DatabaseService.createQuote({
        client_name,
        client_email,
        client_phone,
        service_type,
        description: details,
        address,
        preferred_date: formData.preferredDate || undefined
      });

      toast({
        title: "Demande de Devis Soumise!",
        description: "Merci pour votre demande. Notre équipe vous contactera dans les 24 heures.",
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        zipCode: "",
        serviceType: "",
        propertyType: "",
        rooms: "",
        bathrooms: "",
        frequency: "",
        preferredDate: "",
        timePreference: "",
        specialRequests: [],
        additionalNotes: "",
        budget: ""
      });
    } catch (error) {
      console.error('Error creating quote:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer votre demande pour le moment.",
        variant: "destructive"
      });
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
              <Calculator className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Obtenez Votre Devis Gratuit
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Parlez-nous de vos besoins de nettoyage et nous vous fournirons un devis détaillé et personnalisé
            </p>
          </div>

          {/* Quote Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Demander un Devis</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold border-b border-border pb-2 flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Informations de Contact
                  </h3>
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

                {/* Service Location */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold border-b border-border pb-2">Lieu du Service</h3>
                  <div className="grid gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="address">Adresse de la Rue *</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="city">Ville *</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">Code Postal *</Label>
                        <Input
                          id="zipCode"
                          value={formData.zipCode}
                          onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Service Details */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold border-b border-border pb-2">Détails du Service</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="serviceType">Type de Service *</Label>
                    <Select value={formData.serviceType} onValueChange={(value) => setFormData(prev => ({ ...prev, serviceType: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez le type de service dont vous avez besoin" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceTypes.map((service) => (
                          <SelectItem key={service} value={service}>{service}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="propertyType">Type de Propriété *</Label>
                      <Select value={formData.propertyType} onValueChange={(value) => setFormData(prev => ({ ...prev, propertyType: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez le type de propriété" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="apartment">Appartement</SelectItem>
                          <SelectItem value="house">Maison</SelectItem>
                          <SelectItem value="condo">Copropriété</SelectItem>
                          <SelectItem value="office">Bureau</SelectItem>
                          <SelectItem value="other">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="rooms">Number of Rooms *</Label>
                      <Select value={formData.rooms} onValueChange={(value) => setFormData(prev => ({ ...prev, rooms: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select number of rooms" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 room</SelectItem>
                          <SelectItem value="2">2 rooms</SelectItem>
                          <SelectItem value="3">3 rooms</SelectItem>
                          <SelectItem value="4">4 rooms</SelectItem>
                          <SelectItem value="5+">5+ rooms</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="bathrooms">Number of Bathrooms *</Label>
                      <Select value={formData.bathrooms} onValueChange={(value) => setFormData(prev => ({ ...prev, bathrooms: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select number of bathrooms" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 bathroom</SelectItem>
                          <SelectItem value="2">2 bathrooms</SelectItem>
                          <SelectItem value="3">3 bathrooms</SelectItem>
                          <SelectItem value="4+">4+ bathrooms</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="frequency">Cleaning Frequency *</Label>
                      <Select value={formData.frequency} onValueChange={(value) => setFormData(prev => ({ ...prev, frequency: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="How often do you need service?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="one-time">One-time service</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Scheduling */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold border-b border-border pb-2 flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Scheduling Preferences
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="preferredDate">Preferred Start Date</Label>
                      <Input
                        id="preferredDate"
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, preferredDate: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-3">
                      <Label>Time Preference</Label>
                      <RadioGroup 
                        value={formData.timePreference} 
                        onValueChange={(value) => setFormData(prev => ({ ...prev, timePreference: value }))}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="morning" id="morning" />
                          <Label htmlFor="morning">Morning (8:00 AM - 12:00 PM)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="afternoon" id="afternoon" />
                          <Label htmlFor="afternoon">Afternoon (12:00 PM - 5:00 PM)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="flexible" id="time-flexible" />
                          <Label htmlFor="time-flexible">Flexible</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>

                {/* Special Requests */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold border-b border-border pb-2">Special Requests & Add-ons</h3>
                  
                  <div className="space-y-3">
                    <Label>Additional Services (Select all that apply)</Label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {specialRequests.map((request) => (
                        <div key={request} className="flex items-center space-x-2">
                          <Checkbox
                            id={request}
                            checked={formData.specialRequests.includes(request)}
                            onCheckedChange={(checked) => handleSpecialRequestChange(request, checked as boolean)}
                          />
                          <Label htmlFor={request}>{request}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget">Approximate Budget Range</Label>
                    <Select value={formData.budget} onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your budget range (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-100">Under $100</SelectItem>
                        <SelectItem value="100-200">$100 - $200</SelectItem>
                        <SelectItem value="200-300">$200 - $300</SelectItem>
                        <SelectItem value="300-500">$300 - $500</SelectItem>
                        <SelectItem value="over-500">Over $500</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalNotes">Additional Notes</Label>
                    <Textarea
                      id="additionalNotes"
                      placeholder="Tell us about any specific requirements, access instructions, or other details..."
                      value={formData.additionalNotes}
                      onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
                      rows={4}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-6">
                  <Button type="submit" size="lg" className="px-12">
                    Demander un Devis Gratuit
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

export default Quote;