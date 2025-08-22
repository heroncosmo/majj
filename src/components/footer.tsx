import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Phone, Mail, MapPin, Facebook, Instagram, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-foreground rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold">M</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Majik</h3>
                <p className="text-xs opacity-80">Professional Services</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              Quality, reliable cleaning services with specially selected and competent professionals. 
              Your trusted partner for all cleaning needs.
            </p>
            <div className="flex space-x-3">
              <Button variant="outline" size="sm" className="text-primary">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="text-primary">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="text-primary">
                <MessageSquare className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/quote" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Get Quote
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Join as Professional
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Our Services</h4>
            <ul className="space-y-2">
              <li className="text-primary-foreground/80">Residential Cleaning</li>
              <li className="text-primary-foreground/80">Commercial Cleaning</li>
              <li className="text-primary-foreground/80">Deep Cleaning</li>
              <li className="text-primary-foreground/80">Ironing Service</li>
              <li className="text-primary-foreground/80">Move-in/Move-out</li>
              <li className="text-primary-foreground/80">Post-Construction</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span className="text-primary-foreground/80">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span className="text-primary-foreground/80">info@majikservices.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span className="text-primary-foreground/80">123 Professional Ave<br />Business District, State 12345</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-3 pt-4">
              <h5 className="font-semibold">Stay Updated</h5>
              <div className="flex space-x-2">
                <Input 
                  placeholder="Enter your email" 
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
                />
                <Button variant="secondary" size="sm">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-primary-foreground/20" />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-primary-foreground/80">
            © 2024 Majik Professional Services. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};