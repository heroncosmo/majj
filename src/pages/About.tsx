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
      title: "Quality First",
      description: "We're committed to delivering exceptional service that exceeds expectations every time."
    },
    {
      icon: Shield,
      title: "Trust & Security", 
      description: "All professionals are thoroughly vetted, insured, and background-checked for your safety."
    },
    {
      icon: Zap,
      title: "Reliability",
      description: "Consistent, dependable service you can count on, delivered when and how you need it."
    },
    {
      icon: Users,
      title: "Community Focus",
      description: "Supporting local professionals while building lasting relationships with our clients."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Happy Customers" },
    { number: "500+", label: "Verified Professionals" },
    { number: "50+", label: "Cities Served" },
    { number: "99%", label: "Satisfaction Rate" }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      description: "15+ years in service industry, passionate about connecting quality professionals with families."
    },
    {
      name: "Mike Rodriguez", 
      role: "Operations Director",
      description: "Expert in logistics and quality control, ensuring every service meets our high standards."
    },
    {
      name: "Lisa Chen",
      role: "Customer Success Manager",
      description: "Dedicated to ensuring every customer experience is exceptional from start to finish."
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
                About Majik Services
              </h1>
              <p className="text-xl mb-8 leading-relaxed">
                We're more than just a cleaning service platform. We're a community dedicated to 
                connecting families with trusted professionals who care about quality and reliability.
              </p>
              <Link to="/contact">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Get in Touch
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
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Founded in 2020, Majik Services was born from a simple idea: everyone deserves 
                    more time to enjoy life while having access to reliable, quality cleaning services.
                  </p>
                  <p>
                    Our founders experienced firsthand the challenges of finding trustworthy cleaning 
                    professionals. Too many services were unreliable, overpriced, or simply didn't 
                    meet quality expectations.
                  </p>
                  <p>
                    That's why we created Majik - a platform that carefully vets every professional, 
                    ensures fair pricing, and guarantees quality service. Today, we're proud to serve 
                    thousands of families while supporting hundreds of professional cleaners in 
                    building successful businesses.
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <Card className="p-6 bg-accent/30">
                  <div className="flex items-center space-x-4 mb-4">
                    <Target className="w-8 h-8 text-primary" />
                    <h3 className="text-xl font-semibold">Our Mission</h3>
                  </div>
                  <p className="text-muted-foreground">
                    To provide exceptional cleaning services through a network of verified professionals, 
                    giving families more time for what matters most while supporting local service providers.
                  </p>
                </Card>
                <Card className="p-6 bg-accent/30">
                  <div className="flex items-center space-x-4 mb-4">
                    <Award className="w-8 h-8 text-primary" />
                    <h3 className="text-xl font-semibold">Our Vision</h3>
                  </div>
                  <p className="text-muted-foreground">
                    To become the most trusted platform for home services, setting the gold standard 
                    for quality, reliability, and customer satisfaction in the industry.
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
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These core principles guide everything we do and shape how we serve our customers and professionals
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
              <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
              <p className="text-muted-foreground">
                Numbers that reflect our commitment to excellence and growth
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
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The passionate people behind Majik Services, dedicated to making your life easier
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
              <h2 className="text-3xl font-bold mb-4">Quality Assurance</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                How we ensure every service meets our high standards
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">1</div>
                  <h3 className="text-lg font-semibold">Professional Screening</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Comprehensive background checks, reference verification, and skills assessment for every professional.
                </p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">2</div>
                  <h3 className="text-lg font-semibold">Ongoing Training</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Regular training sessions on best practices, safety protocols, and customer service excellence.
                </p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">3</div>
                  <h3 className="text-lg font-semibold">Quality Monitoring</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Regular quality checks, customer feedback monitoring, and performance evaluations.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Experience the Difference?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join our community of satisfied customers and discover why Majik Services is the trusted choice for professional cleaning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/quote">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Get Your Quote
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="text-lg px-8 text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Contact Us
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