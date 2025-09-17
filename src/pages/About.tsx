import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Award, Shield, Heart, Target, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Qualité d'Abord",
      description: "Nous nous engageons à fournir un service exceptionnel qui dépasse les attentes à chaque fois."
    },
    {
      icon: Shield,
      title: "Confiance et Sécurité",
      description: "Tous les professionnels sont soigneusement vérifiés, assurés et contrôlés pour votre sécurité."
    },
    {
      icon: Zap,
      title: "Fiabilité",
      description: "Service cohérent et fiable sur lequel vous pouvez compter, livré quand et comme vous en avez besoin."
    },
    {
      icon: Users,
      title: "Focus Communautaire",
      description: "Soutenir les professionnels locaux tout en construisant des relations durables avec nos clients."
    }
  ];

  const stats = [
    { number: "10+", label: "Années d'Expérience" },
    { number: "500+", label: "Professionnels Vérifiés" },
    { number: "Goiânia", label: "Ville Servie" },
    { number: "99%", label: "Taux de Satisfaction" }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Fondatrice & PDG",
      description: "Plus de 15 ans dans l'industrie des services, passionnée par la connexion de professionnels de qualité avec les familles."
    },
    {
      name: "Mike Rodriguez",
      role: "Directeur des Opérations",
      description: "Expert en logistique et contrôle qualité, s'assurant que chaque service répond à nos normes élevées."
    },
    {
      name: "Lisa Chen",
      role: "Responsable Succès Client",
      description: "Dédiée à s'assurer que chaque expérience client soit exceptionnelle du début à la fin."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                À Propos de Majik Services
              </h1>
              <p className="text-xl mb-8 leading-relaxed">
                Nous sommes fournisseur de services externalisés depuis plus de 10 ans. Services de femme de ménage à Goiânia.
                Une communauté dédiée à connecter les familles avec des professionnels de confiance qui se soucient de la qualité et de la fiabilité.
              </p>
              <Link to="/contact">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Entrer en Contact
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Notre Histoire</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Nous sommes fournisseur de services externalisés depuis plus de 10 ans. Services de femme de ménage à Goiânia.
                    Économisez temps et argent en engageant un service spécialisé, de qualité garantie avec des professionnels de confiance.
                  </p>
                  <p>
                    Nous laissons votre maison propre et parfumée et vous avez un environnement agréable et organisé pour recharger vos énergies.
                    Notre expérience nous a permis de comprendre les défis de trouver des professionnels de nettoyage fiables.
                  </p>
                  <p>
                    C'est pourquoi nous avons créé Majik - une plateforme qui vérifie soigneusement chaque professionnel,
                    assure des prix équitables et garantit un service de qualité. Aujourd'hui, nous sommes fiers de servir
                    des milliers de familles à Goiânia tout en soutenant des centaines de professionnels du nettoyage.
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <Card className="p-6 bg-accent/30">
                  <div className="flex items-center space-x-4 mb-4">
                    <Target className="w-8 h-8 text-primary" />
                    <h3 className="text-xl font-semibold">Notre Mission</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Fournir des services de nettoyage exceptionnels à travers un réseau de professionnels vérifiés,
                    donnant aux familles plus de temps pour ce qui compte le plus tout en soutenant les prestataires de services locaux.
                  </p>
                </Card>
                <Card className="p-6 bg-accent/30">
                  <div className="flex items-center space-x-4 mb-4">
                    <Award className="w-8 h-8 text-primary" />
                    <h3 className="text-xl font-semibold">Notre Vision</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Devenir la plateforme la plus fiable pour les services à domicile à Goiânia, établissant la référence
                    pour la qualité, la fiabilité et la satisfaction client dans l'industrie.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-accent/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nos Valeurs</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Ces principes fondamentaux guident tout ce que nous faisons et façonnent la façon dont nous servons nos clients et professionnels
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <value.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Notre Impact</h2>
              <p className="text-muted-foreground">
                Des chiffres qui reflètent notre engagement envers l'excellence et la croissance
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-accent/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Rencontrez Notre Équipe</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Les personnes passionnées derrière Majik Services, dédiées à vous faciliter la vie
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <Card key={index} className="text-center p-6">
                  <CardContent className="pt-6">
                    <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quality Assurance */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Assurance Qualité</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comment nous nous assurons que chaque service répond à nos normes élevées
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">1</div>
                  <h3 className="text-lg font-semibold">Sélection Professionnelle</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Vérifications d'antécédents complètes, vérification des références et évaluation des compétences pour chaque professionnel.
                </p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">2</div>
                  <h3 className="text-lg font-semibold">Formation Continue</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Sessions de formation régulières sur les meilleures pratiques, protocoles de sécurité et excellence du service client.
                </p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">3</div>
                  <h3 className="text-lg font-semibold">Surveillance Qualité</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Contrôles qualité réguliers, surveillance des commentaires clients et évaluations de performance.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Prêt à Découvrir la Différence ?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Rejoignez notre communauté de clients satisfaits et découvrez pourquoi Majik Services est le choix de confiance pour le nettoyage professionnel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/quote">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Obtenez Votre Devis
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="text-lg px-8 text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Contactez-Nous
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

export default About;