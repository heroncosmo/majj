import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, Shirt, Building2, Sparkles, Clock, Users } from "lucide-react";
import cleaningService from "@/assets/cleaning-service.jpg";
import ironingService from "@/assets/ironing-service.jpg";
import commercialService from "@/assets/commercial-service.jpg";

export const ServicesGrid = () => {
  const services = [
    {
      icon: Home,
      title: "Service de Femme de Ménage",
      description: "Service de femme de ménage professionnel à Goiânia. Nettoyage complet de votre maison avec des professionnels de confiance.",
      features: ["Nettoyage en profondeur", "Entretien régulier", "Professionnels vérifiés"],
      price: "À partir de R$ 80",
      popular: true,
      image: cleaningService
    },
    {
      icon: Building2,
      title: "Nettoyage Commercial",
      description: "Solutions de nettoyage complètes pour bureaux et entreprises à Goiânia. Maintenez un environnement professionnel.",
      features: ["Nettoyage de bureaux", "Service planifié", "Forfaits personnalisés"],
      price: "À partir de R$ 150",
      popular: false,
      image: commercialService
    },
    {
      icon: Sparkles,
      title: "Nettoyage Approfondi",
      description: "Service de nettoyage intensif pour emménagement, déménagement ou nettoyage post-construction.",
      features: ["Nettoyage post-construction", "Service d'emménagement", "Désinfection complète"],
      price: "À partir de R$ 200",
      popular: false,
      image: cleaningService
    },
    {
      icon: Shirt,
      title: "Organisation et Rangement",
      description: "Service d'organisation et rangement pour maintenir votre maison propre et organisée en permanence.",
      features: ["Organisation d'espaces", "Rangement professionnel", "Conseils personnalisés"],
      price: "À partir de R$ 100",
      popular: false,
      image: ironingService
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Nos Services Professionnels
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choisissez parmi notre gamme de services de nettoyage professionnels à Goiânia, tous exécutés par des professionnels vérifiés avec plus de 10 ans d'expérience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="relative group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
              <CardHeader className="text-center pb-4">
                {service.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-secondary text-secondary-foreground">
                    Le Plus Populaire
                  </Badge>
                )}
                
                <div className="mb-4 pt-2">
                  <service.icon className="w-12 h-12 text-primary mx-auto" />
                </div>
                
                <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                <p className="text-2xl font-bold text-primary">{service.price}</p>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-secondary rounded-full mr-3 flex-shrink-0"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="w-full" 
                  variant={service.popular ? "default" : "outline"}
                >
                  Demander un Devis
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-16 pt-16 border-t">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-primary mr-3" />
              <span className="text-4xl font-bold text-primary">500+</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Professionnels Vérifiés</h3>
            <p className="text-muted-foreground">Plus de 10 ans d'expérience avec des professionnels de confiance</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-secondary mr-3" />
              <span className="text-4xl font-bold text-secondary">10k+</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Services Réalisés</h3>
            <p className="text-muted-foreground">Clients satisfaits avec une prestation de service de qualité</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Clock className="w-8 h-8 text-primary mr-3" />
              <span className="text-4xl font-bold text-primary">24h</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Réponse Rapide</h3>
            <p className="text-muted-foreground">Réservation rapide et planification de service professionnelle</p>
          </div>
        </div>
      </div>
    </section>
  );
};