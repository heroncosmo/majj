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
    "Regular House Cleaning",
    "Deep Cleaning",
    "Move-in/Move-out Cleaning",
    "Post-Construction Cleaning",
    "Commercial Office Cleaning",
    "Ironing Service"
  ];

  const specialRequests = [
    "Pet-friendly products",
    "Eco-friendly products only", 
    "Window cleaning included",
    "Refrigerator cleaning",
    "Oven cleaning",
    "Laundry service",
    "Organizing service"
  ];

  const handleSpecialRequestChange = (request: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      specialRequests: checked 
        ? [...prev.specialRequests, request]
        : prev.specialRequests.filter(req => req !== request)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Quote Request Submitted!",
      description: "Thank you for your request. Our team will contact you within 24 hours with a detailed quote."
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
              <Calculator className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Get Your Free Quote
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tell us about your cleaning needs and we'll provide you with a detailed, personalized quote
            </p>
          </div>

          {/* Quote Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Request a Quote</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold border-b border-border pb-2 flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Contact Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
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
                  <h3 className="text-lg font-semibold border-b border-border pb-2">Service Location</h3>
                  <div className="grid gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address *</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP Code *</Label>
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
                  <h3 className="text-lg font-semibold border-b border-border pb-2">Service Details</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="serviceType">Type of Service *</Label>
                    <Select value={formData.serviceType} onValueChange={(value) => setFormData(prev => ({ ...prev, serviceType: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the type of service you need" />
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
                      <Label htmlFor="propertyType">Property Type *</Label>
                      <Select value={formData.propertyType} onValueChange={(value) => setFormData(prev => ({ ...prev, propertyType: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="house">House</SelectItem>
                          <SelectItem value="condo">Condo</SelectItem>
                          <SelectItem value="office">Office</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
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
                    Request Free Quote
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