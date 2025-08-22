import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Mon - Fri: 8:00 - 18:00</span>
            </div>
          </div>
          <div className="hidden md:flex space-x-3">
            <a href="#" className="hover:text-primary-foreground/80 transition-colors">Facebook</a>
            <a href="#" className="hover:text-primary-foreground/80 transition-colors">Instagram</a>
            <a href="#" className="hover:text-primary-foreground/80 transition-colors">WhatsApp</a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-background border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">M</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">Majik</h1>
                <p className="text-xs text-muted-foreground">Professional Services</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">
                Home
              </Link>
              <Link to="/services" className="text-foreground hover:text-primary transition-colors font-medium">
                Our Services
              </Link>
              <Link to="/professionals" className="text-foreground hover:text-primary transition-colors font-medium">
                For Professionals
              </Link>
              <Link to="/about" className="text-foreground hover:text-primary transition-colors font-medium">
                About
              </Link>
              <Link to="/contact" className="text-foreground hover:text-primary transition-colors font-medium">
                Contact
              </Link>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <Link to="/quote">
                <Button variant="outline">Get Quote</Button>
              </Link>
              <Link to="/register">
                <Button>Join as Professional</Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col space-y-3">
                <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                  Home
                </Link>
                <Link to="/services" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                  Our Services
                </Link>
                <Link to="/professionals" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                  For Professionals
                </Link>
                <Link to="/about" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                  About
                </Link>
                <Link to="/contact" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                  Contact
                </Link>
                <div className="flex flex-col space-y-2 pt-4">
                  <Link to="/quote">
                    <Button variant="outline" className="w-full">Get Quote</Button>
                  </Link>
                  <Link to="/register">
                    <Button className="w-full">Join as Professional</Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};