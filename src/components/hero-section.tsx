import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Star, Users, Shield } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative bg-primary min-h-[600px] flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-foreground/20 via-transparent to-secondary/20"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Have More
              <span className="text-secondary block">Free Time!</span>
            </h1>
            
            <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
              Quality, reliable service with specially selected and competent professionals. 
              Hire now and enjoy more time for what matters most!
            </p>

            {/* Service Buttons */}
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <Button 
                size="lg" 
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 h-auto py-4 px-6"
              >
                <div className="text-center">
                  <div className="font-semibold">House Cleaning</div>
                  <div className="text-sm opacity-80">For Your Home</div>
                </div>
              </Button>
              
              <Button 
                size="lg" 
                className="bg-secondary text-secondary-foreground hover:bg-secondary-hover h-auto py-4 px-6"
              >
                <div className="text-center">
                  <div className="font-semibold">Ironing Service</div>
                  <div className="text-sm opacity-80">Professional Care</div>
                </div>
              </Button>
              
              <Button 
                size="lg" 
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 h-auto py-4 px-6"
              >
                <div className="text-center">
                  <div className="font-semibold">Commercial</div>
                  <div className="text-sm opacity-80">For Your Business</div>
                </div>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-primary-foreground/80">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-secondary" />
                <span>Verified Professionals</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-secondary" />
                <span>Insured Service</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-secondary" />
                <span>5-Star Rated</span>
              </div>
            </div>
          </div>

          {/* Professional Registration Card */}
          <div className="flex justify-center">
            <Card className="bg-primary-foreground/95 backdrop-blur-sm p-8 w-full max-w-md shadow-2xl">
              <div className="text-center mb-6">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-primary mb-2">
                  Are you a cleaning professional?
                </h3>
                <p className="text-muted-foreground">
                  Register and receive client offers on your phone!
                </p>
              </div>

              <div className="space-y-4">
                <Button className="w-full h-12 text-lg" size="lg">
                  Join Our Network
                </Button>
                
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-3">
                    Download our mobile app
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" size="sm" className="h-auto py-2 px-3">
                      <div className="text-xs">
                        <div>Download on</div>
                        <div className="font-semibold">App Store</div>
                      </div>
                    </Button>
                    <Button variant="outline" size="sm" className="h-auto py-2 px-3">
                      <div className="text-xs">
                        <div>Get it on</div>
                        <div className="font-semibold">Google Play</div>
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};