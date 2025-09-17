import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardList, CheckSquare, CreditCard } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: ClipboardList,
      title: "Demandez Votre Devis",
      description: "Contactez-nous par téléphone ou WhatsApp pour décrire vos besoins de nettoyage. Nous vous fournirons un devis personnalisé."
    },
    {
      icon: CheckSquare,
      title: "Planifiez Votre Service",
      description: "Choisissez la date et l'heure qui vous conviennent. Nos professionnels vérifiés se rendront chez vous à l'heure convenue."
    },
    {
      icon: CreditCard,
      title: "Profitez du Résultat",
      description: "Détendez-vous pendant que nos experts nettoient votre maison. Paiement sécurisé après le service terminé."
    }
  ];

  return (
    <section className="py-20 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Engagez en Seulement 3 Étapes
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Notre processus simplifié facilite l'obtention des services de nettoyage professionnels à Goiânia
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <Card key={index} className="relative group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                
                {/* Icon */}
                <div className="mb-6 pt-4">
                  <step.icon className="w-16 h-16 text-primary mx-auto" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="text-lg px-8 py-4">
            Commencer Maintenant
          </Button>
        </div>
      </div>
    </section>
  );
};