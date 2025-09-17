import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, Building2, Sparkles, Shirt, Wrench, Calendar, Star, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      icon: Home,
      title: "Nettoyage Résidentiel",
      description: "Services de nettoyage complets adaptés aux besoins de votre famille. De l'entretien régulier au nettoyage en profondeur, nous nous assurons que votre maison soit impeccable et saine.",
      features: [
        "Salons et chambres",
        "Cuisine et électroménagers",
        "Désinfection des salles de bains",
        "Nettoyage et lavage des sols",
        "Dépoussiérage et nettoyage des surfaces",
        "Enlèvement des déchets"
      ],
      pricing: {
        oneTime: "R$ 80-150",
        weekly: "R$ 60-120",
        biWeekly: "R$ 70-130"
      },
      popular: true
    },
    {
      icon: Building2,
      title: "Nettoyage Commercial",
      description: "Nettoyage professionnel de bureaux et d'espaces commerciaux pour maintenir un environnement de travail productif. Horaires personnalisés pour répondre aux besoins de votre entreprise.",
      features: [
        "Bureaux et postes de travail",
        "Salles de conférence",
        "Désinfection des toilettes",
        "Cuisine et espaces de pause",
        "Nettoyage des vitres et verres",
        "Entretien des sols"
      ],
      pricing: {
        daily: "R$ 150-300",
        weekly: "R$ 500-800",
        monthly: "R$ 1500-2500"
      },
      popular: false
    },
    {
      icon: Sparkles,
      title: "Nettoyage en Profondeur",
      description: "Service de nettoyage intensif parfait pour les emménagements, déménagements, nettoyage saisonnier, ou quand vous avez besoin d'un nettoyage extra minutieux.",
      features: [
        "Nettoyage intérieur des électroménagers",
        "Plinthes et moulures",
        "Luminaires et ventilateurs",
        "Intérieur des armoires",
        "Récurage détaillé des salles de bains",
        "Nettoyage en profondeur des tapis"
      ],
      pricing: {
        small: "R$ 200-300",
        medium: "R$ 300-450",
        large: "R$ 450-650"
      },
      popular: false
    },
    {
      icon: Shirt,
      title: "Service de Repassage",
      description: "Soins professionnels des vêtements avec service de collecte et livraison. Vos vêtements seront impeccables, sans plis et prêts à porter.",
      features: [
        "Chemises et chemisiers",
        "Pantalons et jupes",
        "Robes et costumes",
        "Tissus délicats",
        "Collecte et livraison",
        "Service le jour même disponible"
      ],
      pricing: {
        perItem: "R$ 3-8",
        bundle10: "R$ 25",
        bundle20: "R$ 45"
      },
      popular: false
    }
  ];

  const addOnServices = [
    { name: "Nettoyage des Vitres (Intérieur)", price: "R$ 2-5 par fenêtre" },
    { name: "Intérieur du Réfrigérateur", price: "R$ 25-40" },
    { name: "Nettoyage en Profondeur du Four", price: "R$ 30-50" },
    { name: "Nettoyage du Garage", price: "R$ 75-150" },
    { name: "Sous-sol/Grenier", price: "R$ 100-200" },
    { name: "Produits Écologiques", price: "+R$ 10-20" }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Nos Services Professionnels
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Solutions de nettoyage complètes livrées par des professionnels vérifiés.
              Choisissez le service parfait pour vos besoins.
            </p>
            <Link to="/quote">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Obtenez Votre Devis Gratuit
              </Button>
            </Link>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="relative shadow-lg border-2 hover:border-primary/20 transition-all duration-300">
                  {service.popular && (
                    <Badge className="absolute -top-3 left-6 bg-secondary text-secondary-foreground">
                      Le Plus Populaire
                    </Badge>
                  )}
                  
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <service.icon className="w-8 h-8 text-primary" />
                      </div>
                      <CardTitle className="text-2xl">{service.title}</CardTitle>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-6">
                      {/* Features */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center">
                          <CheckCircle className="w-5 h-5 text-secondary mr-2" />
                          Ce qui est Inclus :
                        </h4>
                        <ul className="grid md:grid-cols-2 gap-2">
                          {service.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center text-sm">
                              <div className="w-2 h-2 bg-secondary rounded-full mr-3 flex-shrink-0"></div>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Pricing */}
                      <div className="border-t pt-4">
                        <h4 className="font-semibold mb-3">Prix de Départ :</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {Object.entries(service.pricing).map(([key, price]) => (
                            <div key={key} className="text-center p-2 bg-accent/30 rounded">
                              <div className="text-sm text-muted-foreground capitalize">
                                {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                              </div>
                              <div className="font-bold text-primary">{price}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="grid grid-cols-2 gap-3">
                        <Link to="/quote">
                          <Button className="w-full" variant={service.popular ? "default" : "outline"}>
                            Obtenir un Devis
                          </Button>
                        </Link>
                        <Button variant="outline" className="w-full">
                          En Savoir Plus
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Add-on Services */}
        <section className="py-20 bg-accent/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Services Complémentaires</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Améliorez votre service de nettoyage avec ces options supplémentaires pour une solution complète
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {addOnServices.map((addon, index) => (
                <Card key={index} className="text-center p-6">
                  <h4 className="font-semibold mb-2">{addon.name}</h4>
                  <p className="text-primary font-bold">{addon.price}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Pourquoi Choisir Majik Services ?</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-8">
                <Star className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Professionnels Vérifiés</h3>
                <p className="text-muted-foreground">
                  Tous nos agents de nettoyage sont vérifiés, assurés et soigneusement contrôlés pour votre tranquillité d'esprit.
                </p>
              </Card>

              <Card className="text-center p-8">
                <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Planification Flexible</h3>
                <p className="text-muted-foreground">
                  Réservez des services à votre convenance avec des options de planification flexibles et des professionnels fiables.
                </p>
              </Card>

              <Card className="text-center p-8">
                <Wrench className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Garantie Qualité</h3>
                <p className="text-muted-foreground">
                  Garantie de satisfaction à 100%. Si vous n'êtes pas satisfait de notre service, nous le corrigerons.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Prêt à Commencer ?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Rejoignez des milliers de clients satisfaits qui font confiance à Majik pour leurs besoins de nettoyage
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/quote">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Devis Gratuit
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline" className="text-lg px-8 text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Rejoindre comme Professionnel
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;