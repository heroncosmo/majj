import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import majikLogo from "@/assets/LOGO-MAJIK-NOVO-slogan.png";

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
              <span>+55 62 99560-5542</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Lun - Ven: 8h - 18h | Sam: 8h - 12h</span>
            </div>
          </div>
          <div className="hidden md:flex space-x-3">
            <a href="https://www.facebook.com/majikservicos/" className="hover:text-primary-foreground/80 transition-colors">Facebook</a>
            <a href="https://www.instagram.com/netmajik/" className="hover:text-primary-foreground/80 transition-colors">Instagram</a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-background border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img
                src={majikLogo}
                alt="Majik - Services de Nettoyage"
                className="h-12 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">
                Accueil
              </Link>
              <Link to="/services" className="text-foreground hover:text-primary transition-colors font-medium">
                Nos Services
              </Link>
              <Link to="/register" className="text-foreground hover:text-primary transition-colors font-medium">
                Travailler avec Nous
              </Link>
              <Link to="/about" className="text-foreground hover:text-primary transition-colors font-medium">
                À Propos
              </Link>
              <Link to="/contact" className="text-foreground hover:text-primary transition-colors font-medium">
                Contact
              </Link>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <Link to="/quote">
                <Button variant="outline">Demander un Devis</Button>
              </Link>
              <Link to="/register">
                <Button>Devenir Professionnel</Button>
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
                  Accueil
                </Link>
                <Link to="/services" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                  Nos Services
                </Link>
                <Link to="/register" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                  Travailler avec Nous
                </Link>
                <Link to="/about" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                  À Propos
                </Link>
                <Link to="/contact" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                  Contact
                </Link>
                <div className="flex flex-col space-y-2 pt-4">
                  <Link to="/quote">
                    <Button variant="outline" className="w-full">Demander un Devis</Button>
                  </Link>
                  <Link to="/register">
                    <Button className="w-full">Devenir Professionnel</Button>
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