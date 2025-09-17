import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Phone, Mail, MapPin, Facebook, Instagram, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import majikLogo from "@/assets/LOGO-MAJIK-NOVO-slogan.png";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img
                src={majikLogo}
                alt="Majik"
                className="h-8 w-auto object-contain"
              />
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              Nous sommes fournisseur de services externalisés depuis plus de 10 ans. Services de femme de ménage à Goiânia.
              Économisez temps et argent en engageant un service spécialisé, de qualité garantie avec des professionnels de confiance.
            </p>
            <div className="flex space-x-3">
              <a href="https://www.facebook.com/majikservicos/" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="text-primary">
                  <Facebook className="w-4 h-4" />
                </Button>
              </a>
              <a href="https://www.instagram.com/netmajik/" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="text-primary">
                  <Instagram className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Liens Rapides</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Nos Services
                </Link>
              </li>
              <li>
                <Link to="/quote" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Demander un Devis
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Devenir Professionnel
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  À Propos
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
            <h4 className="text-lg font-semibold">Nos Services</h4>
            <ul className="space-y-2">
              <li className="text-primary-foreground/80">Nettoyage Résidentiel</li>
              <li className="text-primary-foreground/80">Nettoyage Commercial</li>
              <li className="text-primary-foreground/80">Nettoyage Approfondi</li>
              <li className="text-primary-foreground/80">Service de Femme de Ménage</li>
              <li className="text-primary-foreground/80">Nettoyage Post-Construction</li>
              <li className="text-primary-foreground/80">Organisation et Rangement</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contactez-Nous</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span className="text-primary-foreground/80">+55 62 99560-5542</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span className="text-primary-foreground/80">info@majikservices.com.br</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span className="text-primary-foreground/80">Avenida Padre Monte. 1723<br />Goiânia-GO, Brésil</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-3 pt-4">
              <h5 className="font-semibold">Restez Informé</h5>
              <div className="flex space-x-2">
                <Input 
                  placeholder="Entrez votre email" 
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
                />
                <Button variant="secondary" size="sm">
                  S'abonner
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
            © 2025 Majik Services Professionnels. Tous droits réservés.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              Politique de Confidentialité
            </a>
            <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              Conditions d'Utilisation
            </a>
            <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              Politique des Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};