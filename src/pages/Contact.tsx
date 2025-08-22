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
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours."
    });
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/15551234567?text=Hello! I would like to know more about your services.', '_blank');
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
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions or need assistance? We're here to help! Reach out to us through any of the methods below.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Get in Touch</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Contact Methods */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-accent/50 rounded-lg">
                      <Phone className="w-6 h-6 text-primary" />
                      <div>
                        <h3 className="font-semibold">Phone</h3>
                        <p className="text-muted-foreground">+1 (555) 123-4567</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-accent/50 rounded-lg">
                      <Mail className="w-6 h-6 text-primary" />
                      <div>
                        <h3 className="font-semibold">Email</h3>
                        <p className="text-muted-foreground">info@majikservices.com</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-accent/50 rounded-lg">
                      <MapPin className="w-6 h-6 text-primary" />
                      <div>
                        <h3 className="font-semibold">Address</h3>
                        <p className="text-muted-foreground">123 Professional Ave<br />Business District, State 12345</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-accent/50 rounded-lg">
                      <Clock className="w-6 h-6 text-primary" />
                      <div>
                        <h3 className="font-semibold">Business Hours</h3>
                        <p className="text-muted-foreground">
                          Monday - Friday: 8:00 AM - 6:00 PM<br />
                          Saturday: 9:00 AM - 4:00 PM<br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Contact */}
                  <div className="border-t border-border pt-6">
                    <h3 className="text-lg font-semibold mb-4">Quick Contact via WhatsApp</h3>
                    <Button 
                      onClick={handleWhatsApp}
                      className="w-full bg-secondary hover:bg-secondary-hover"
                      size="lg"
                    >
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Chat on WhatsApp
                    </Button>
                  </div>

                  {/* Social Media */}
                  <div className="border-t border-border pt-6">
                    <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                    <div className="flex space-x-4">
                      <Button variant="outline" size="sm">
                        Facebook
                      </Button>
                      <Button variant="outline" size="sm">
                        Instagram
                      </Button>
                      <Button variant="outline" size="sm">
                        LinkedIn
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Certifications */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">Certifications & Insurance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <span>Licensed & Bonded</span>
                      <Button variant="outline" size="sm">View Certificate</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <span>Liability Insurance</span>
                      <Button variant="outline" size="sm">View Policy</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <span>Workers' Compensation</span>
                      <Button variant="outline" size="sm">View Coverage</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="shadow-lg h-fit">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
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
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
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
                      placeholder="How can we help you? Please provide as much detail as possible..."
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Send Message
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