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
      title: "Residential Cleaning",
      description: "Complete home cleaning services tailored to your family's needs. From regular maintenance to deep cleaning, we ensure your home is spotless and healthy.",
      features: [
        "Living rooms and bedrooms",
        "Kitchen and appliances", 
        "Bathrooms sanitization",
        "Floor cleaning and mopping",
        "Dusting and surface cleaning",
        "Trash removal"
      ],
      pricing: {
        oneTime: "$80-150",
        weekly: "$60-120",
        biWeekly: "$70-130"
      },
      popular: true
    },
    {
      icon: Building2,
      title: "Commercial Cleaning",
      description: "Professional office and commercial space cleaning to maintain a productive work environment. Customized schedules to fit your business needs.",
      features: [
        "Office desks and workstations",
        "Conference rooms",
        "Restroom sanitization", 
        "Kitchen and break areas",
        "Window and glass cleaning",
        "Floor maintenance"
      ],
      pricing: {
        daily: "$150-300",
        weekly: "$500-800",
        monthly: "$1500-2500"
      },
      popular: false
    },
    {
      icon: Sparkles,
      title: "Deep Cleaning",
      description: "Intensive cleaning service perfect for move-ins, move-outs, seasonal cleaning, or when you need that extra thorough clean.",
      features: [
        "Inside appliances cleaning",
        "Baseboards and trim",
        "Light fixtures and fans",
        "Cabinet interiors",
        "Detailed bathroom scrubbing",
        "Carpet deep cleaning"
      ],
      pricing: {
        small: "$200-300",
        medium: "$300-450",
        large: "$450-650"
      },
      popular: false
    },
    {
      icon: Shirt,
      title: "Ironing Service",
      description: "Professional garment care with pickup and delivery service. Your clothes will be crisp, wrinkle-free, and ready to wear.",
      features: [
        "Shirts and blouses",
        "Pants and skirts",
        "Dresses and suits",
        "Delicate fabrics",
        "Pickup and delivery",
        "Same-day service available"
      ],
      pricing: {
        perItem: "$3-8",
        bundle10: "$25",
        bundle20: "$45"
      },
      popular: false
    }
  ];

  const addOnServices = [
    { name: "Window Cleaning (Interior)", price: "$2-5 per window" },
    { name: "Refrigerator Interior", price: "$25-40" },
    { name: "Oven Deep Clean", price: "$30-50" },
    { name: "Garage Cleaning", price: "$75-150" },
    { name: "Basement/Attic", price: "$100-200" },
    { name: "Eco-friendly Products", price: "+$10-20" }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Our Professional Services
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Comprehensive cleaning solutions delivered by verified professionals. 
              Choose the perfect service for your needs.
            </p>
            <Link to="/quote">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Get Your Free Quote
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
                      Most Popular
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
                          What's Included:
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
                        <h4 className="font-semibold mb-3">Starting Prices:</h4>
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
                            Get Quote
                          </Button>
                        </Link>
                        <Button variant="outline" className="w-full">
                          Learn More
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
              <h2 className="text-3xl font-bold mb-4">Add-on Services</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Enhance your cleaning service with these additional options for a complete solution
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
              <h2 className="text-3xl font-bold mb-4">Why Choose Majik Services?</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-8">
                <Star className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Verified Professionals</h3>
                <p className="text-muted-foreground">
                  All our cleaners are background-checked, insured, and thoroughly vetted for your peace of mind.
                </p>
              </Card>

              <Card className="text-center p-8">
                <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Flexible Scheduling</h3>
                <p className="text-muted-foreground">
                  Book services at your convenience with flexible scheduling options and reliable professionals.
                </p>
              </Card>

              <Card className="text-center p-8">
                <Wrench className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Quality Guarantee</h3>
                <p className="text-muted-foreground">
                  100% satisfaction guarantee. If you're not happy with our service, we'll make it right.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust Majik for their cleaning needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/quote">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Get Free Quote
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline" className="text-lg px-8 text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Join as Professional
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