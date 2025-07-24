import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Menu, X, Smartphone, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <div className="font-bold text-xl text-gray-900">
              Boda<span className="text-orange-500">Link</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">
              Pricing
            </a>
            <a href="#safety" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">
              Safety
            </a>
            <a href="#support" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">
              Support
            </a>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/rider-auth">
              <Button variant="ghost" className="text-gray-700 hover:text-orange-500 hover:bg-orange-50">
                Book a Ride
              </Button>
            </Link>
            <Link to="/driver-auth">
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold shadow-button">
                <span className="mr-2">🏍️</span>
                Drive with Us
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-orange-500 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg">
            <nav className="flex flex-col space-y-4 p-6">
              <a href="#features" className="text-gray-700 hover:text-orange-500 font-medium py-2">
                Features
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-orange-500 font-medium py-2">
                Pricing
              </a>
              <a href="#safety" className="text-gray-700 hover:text-orange-500 font-medium py-2">
                Safety
              </a>
              <a href="#support" className="text-gray-700 hover:text-orange-500 font-medium py-2">
                Support
              </a>
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                <Link to="/rider-auth">
                  <Button variant="outline" className="w-full">
                    <Smartphone className="h-4 w-4 mr-2" />
                    Rider App
                  </Button>
                </Link>
                <Link to="/driver-auth">
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                    <span className="mr-2">🏍️</span>
                    Drive with Us
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;