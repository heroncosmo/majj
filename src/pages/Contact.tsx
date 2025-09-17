import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Clock, MessageSquare } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Envoyé !",
      description: "Merci de nous avoir contactés. Nous vous répondrons dans les 24 heures."
    });
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/5562995605542?text=Bonjour! Je voudrais en savoir plus sur vos services de nettoyage.', '_blank');
  };

  return (
    <div className="min-h-screen bg-accent/20">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <MessageSquare className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Contactez-Nous
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Vous avez des questions ou besoin d'aide ? Nous sommes là pour vous aider ! Contactez-nous par l'une des méthodes ci-dessous.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Entrer en Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Contact Methods */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-accent/50 rounded-lg">
                      <Phone className="w-6 h-6 text-primary" />
                      <div>
                        <h3 className="font-semibold">Téléphone</h3>
                        <p className="text-muted-foreground">+55 62 99560-5542</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-accent/50 rounded-lg">
                      <Mail className="w-6 h-6 text-primary" />
                      <div>
                        <h3 className="font-semibold">Email</h3>
                        <p className="text-muted-foreground">info@majikservices.com.br</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-accent/50 rounded-lg">
                      <MapPin className="w-6 h-6 text-primary" />
                      <div>
                        <h3 className="font-semibold">Adresse</h3>
                        <p className="text-muted-foreground">Avenida Padre Monte. 1723<br />Goiânia-GO, Brésil</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-accent/50 rounded-lg">
                      <Clock className="w-6 h-6 text-primary" />
                      <div>
                        <h3 className="font-semibold">Heures d'Ouverture</h3>
                        <p className="text-muted-foreground">
                          Lundi - Vendredi: 8h00 - 18h00<br />
                          Samedi: 8h00 - 12h00<br />
                          Dimanche: Fermé
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Contact */}
                  <div className="border-t border-border pt-6">
                    <h3 className="text-lg font-semibold mb-4">Contact Rapide via WhatsApp</h3>
                    <Button
                      onClick={handleWhatsApp}
                      className="w-full bg-secondary hover:bg-secondary-hover"
                      size="lg"
                    >
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Chatter sur WhatsApp
                    </Button>
                  </div>

                  {/* Social Media */}
                  <div className="border-t border-border pt-6">
                    <h3 className="text-lg font-semibold mb-4">Suivez-Nous</h3>
                    <div className="flex space-x-4">
                      <a href="https://www.facebook.com/majikservicos/" target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm">
                          Facebook
                        </Button>
                      </a>
                      <a href="https://www.instagram.com/netmajik/" target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm">
                          Instagram
                        </Button>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Certifications */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">Certifications & Assurance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <span>Licencié & Cautionné</span>
                      <Button variant="outline" size="sm">Voir Certificat</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <span>Assurance Responsabilité</span>
                      <Button variant="outline" size="sm">Voir Police</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <span>Compensation Travailleurs</span>
                      <Button variant="outline" size="sm">Voir Couverture</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="shadow-lg h-fit">
              <CardHeader>
                <CardTitle className="text-2xl">Envoyez-nous un Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom Complet *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
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
                      <Label htmlFor="phone">Numéro de Téléphone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Sujet *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Comment pouvons-nous vous aider ? Veuillez fournir autant de détails que possible..."
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Envoyer le Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;