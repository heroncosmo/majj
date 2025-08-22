import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, Shirt, Building2, Sparkles, Clock, Users } from "lucide-react";

export const ServicesGrid = () => {
  const services = [
    {
      icon: Home,
      title: "Residential Cleaning",
      description: "Complete house cleaning with attention to every detail. Professional and reliable service for your home.",
      features: ["Deep cleaning", "Regular maintenance", "Eco-friendly products"],
      price: "From $80",
      popular: false
    },
    {
      icon: Shirt,
      title: "Ironing Service",
      description: "Professional ironing service that leaves your clothes crisp and wrinkle-free. Pickup and delivery available.",
      features: ["Pickup & delivery", "Professional pressing", "Garment care"],
      price: "From $25",
      popular: true
    },
    {
      icon: Building2,
      title: "Commercial Cleaning",
      description: "Comprehensive cleaning solutions for offices and businesses. Maintain a professional environment.",
      features: ["Office cleaning", "Scheduled service", "Custom packages"],
      price: "From $150",
      popular: false
    },
    {
      icon: Sparkles,
      title: "Deep Cleaning",
      description: "Intensive cleaning service for move-ins, move-outs, or seasonal deep cleaning needs.",
      features: ["Move-in/out cleaning", "Seasonal service", "Detailed sanitization"],
      price: "From $200",
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Our Professional Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose from our range of professional cleaning services, all performed by verified and experienced professionals
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="relative group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
              <CardHeader className="text-center pb-4">
                {service.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-secondary text-secondary-foreground">
                    Most Popular
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
                  Request Quote
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
            <h3 className="text-xl font-semibold mb-2">Verified Professionals</h3>
            <p className="text-muted-foreground">Carefully selected and background-checked professionals</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-secondary mr-3" />
              <span className="text-4xl font-bold text-secondary">10k+</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Services Completed</h3>
            <p className="text-muted-foreground">Happy customers with quality service delivery</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Clock className="w-8 h-8 text-primary mr-3" />
              <span className="text-4xl font-bold text-primary">24h</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Quick Response</h3>
            <p className="text-muted-foreground">Fast booking and professional service scheduling</p>
          </div>
        </div>
      </div>
    </section>
  );
};