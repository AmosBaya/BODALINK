import Header from "@/components/layout/Navbar";
import Hero from "@/components/layout/HeroSection";
import FeatureSection from "@/components/features/FeatureSection";
import PricingCalculator from "@/components/pricing/PricingCalculator";
import SafetyFeatures from "@/components/features/SafetyFeatures";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Smartphone, Download, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <FeatureSection />
      <PricingCalculator />
      <SafetyFeatures />
      
      {/* How It Works Section */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">
              Simple Process
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              How BodaLink Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Getting a ride is as easy as 1-2-3. Sign in, book, and ride safely across Africa with our trusted drivers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <Card className="text-center p-8 bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 group">
              <CardContent className="pt-6 space-y-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Smartphone className="h-10 w-10 text-white" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900">Download & Setup</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Click "Get started" button and create your account in less than 2 minutes. Quick verification and you're ready to ride.
                  </p>
                </div>
                <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50">
                  <Download className="h-4 w-4 mr-2" />
                  Get Started
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center p-8 bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 group">
              <CardContent className="pt-6 space-y-6">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="h-10 w-10 text-white" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900">Book Your Ride</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Set your pickup and destination, choose your ride type, and get an instant fare estimate with transparent pricing.
                  </p>
                </div>
                <Link to="/rider-dashboard">
                  <Button variant="outline" className="w-full border-green-200 text-green-600 hover:bg-green-50">
                    Try Demo
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="text-center p-8 bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 group">
              <CardContent className="pt-6 space-y-6">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Star className="h-10 w-10 text-white" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900">Enjoy & Rate</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Track your ride in real-time, arrive safely at your destination, and rate your driver to help maintain quality.
                  </p>
                </div>
                <Button variant="outline" className="w-full border-orange-200 text-orange-600 hover:bg-orange-50">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="support" className="py-20 bg-gradient-hero bg-orange-500 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Commute?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join thousands of riders and drivers already using BodaRide for safe, affordable transportation across Africa
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/rider-dashboard">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                <Download className="h-5 w-5 mr-2" />
                Book your First Ride
              </Button>
            </Link>
            <Link to="/driver-dashboard">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white/30 text-white hover:bg-white/10">
                <Download className="h-5 w-5 mr-2" />
                Start Driving
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-2xl font-bold">2M+</div>
              <div className="text-white/80 text-sm">Happy Riders</div>
            </div>
            <div>
              <div className="text-2xl font-bold">25K+</div>
              <div className="text-white/80 text-sm">Active Drivers</div>
            </div>
            <div>
              <div className="text-2xl font-bold">150+</div>
              <div className="text-white/80 text-sm">Cities</div>
            </div>
            <div>
              <div className="text-2xl font-bold">4.8★</div>
              <div className="text-white/80 text-sm">App Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <MapPin className="h-6 w-6 text-primary mr-2" />
                <span className="font-bold text-xl">BodaLink</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Safe, affordable boda-boda rides across Africa. Your trusted transport partner.
              </p>
              <div className="flex space-x-4">
                <Button size="sm" variant="ghost">Twitter</Button>
                <Button size="sm" variant="ghost">Facebook</Button>
                <Button size="sm" variant="ghost">Instagram</Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Riders</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <a href="#" className="block hover:text-primary">How to ride</a>
                <a href="#" className="block hover:text-primary">Safety guide</a>
                <a href="#" className="block hover:text-primary">Pricing</a>
                <a href="#" className="block hover:text-primary">Cities</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Drivers</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <a href="#" className="block hover:text-primary">Drive with us</a>
                <a href="#" className="block hover:text-primary">Requirements</a>
                <a href="#" className="block hover:text-primary">Earnings</a>
                <a href="#" className="block hover:text-primary">Resources</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <a href="#" className="block hover:text-primary">Help center</a>
                <a href="#" className="block hover:text-primary">Contact us</a>
                <a href="#" className="block hover:text-primary">Lost & found</a>
                <a href="#" className="block hover:text-primary">Emergency</a>
              </div>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 BodaLink. All rights reserved. Made with ❤️ for Africa.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;