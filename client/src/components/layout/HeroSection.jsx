import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Clock, Shield, Smartphone, Star, Zap, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="min-h-screen items-center justify-center bg-gradient-hero overflow-hidden bg-orange-500">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/5 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/3 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container relative z-10 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Main Content */}
          <div className="text-center lg:text-left space-y-8 animate-fade-in">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 glass-effect rounded-full text-sm font-medium text-white">
                <Zap className="h-4 w-4 text-yellow-400" />
                Africa's #1 Ride-Hailing Platform
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                Your Ride,
                <br />
                <span className="text-gradient bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Your Way
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl leading-relaxed">
                Safe, affordable boda-boda rides across Africa. Connect with trusted motorcycle taxi drivers in seconds.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/rider-auth">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-4 bg-white text-gray-900 hover:bg-gray-100 font-semibold shadow-button transition-all duration-300 hover:shadow-xl hover:scale-105"
                >
                  <Smartphone className="h-5 w-5 mr-2" />
                  Book a Ride
                </Button>
              </Link>
              <Link to="/driver-auth">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg px-8 py-4 bg-transparent border-2 border-white/30 text-white hover:bg-white/10 font-semibold backdrop-blur-sm transition-all duration-300 hover:border-white/50"
                >
                  <span className="mr-2">🏍️</span>
                  Become a Driver
                </Button>
              </Link>
            </div>

            {/* Key Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              <div className="text-center space-y-3 group cursor-pointer">
                <div className="w-14 h-14 mx-auto bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                  <MapPin className="h-7 w-7 text-white" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-white">Real-time</div>
                  <div className="text-sm text-white/70">GPS Tracking</div>
                </div>
              </div>
              
              <div className="text-center space-y-3 group cursor-pointer">
                <div className="w-14 h-14 mx-auto bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                  <Clock className="h-7 w-7 text-white" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-white">2 min</div>
                  <div className="text-sm text-white/70">Avg. Pickup</div>
                </div>
              </div>
              
              <div className="text-center space-y-3 group cursor-pointer">
                <div className="w-14 h-14 mx-auto bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                  <Shield className="h-7 w-7 text-white" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-white">Verified</div>
                  <div className="text-sm text-white/70">Drivers</div>
                </div>
              </div>
              
              <div className="text-center space-y-3 group cursor-pointer">
                <div className="w-14 h-14 mx-auto bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                  <Users className="h-7 w-7 text-white" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-white">24/7</div>
                  <div className="text-sm text-white/70">Support</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Ride Preview Card */}
          {/* <div className="relative animate-slide-up">
            <Card className="p-8 bg-white/95 backdrop-blur-xl shadow-2xl border-0 animate-pulse-glow">
              <div className="space-y-6"> */}
                {/* Header */}
                {/* <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Find Your Ride</h3>
                    <p className="text-gray-600">Book instantly</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                </div> */}
                
                {/* Location */}
                {/* <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">Nairobi CBD</div>
                      <div className="text-sm text-gray-500">Your current location</div>
                    </div>
                  </div> */}
                  
                  {/* <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">Nakawa Market</div>
                      <div className="text-sm text-gray-500">5.2 km away</div>
                    </div>
                  </div>
                </div> */}
                
                {/* Driver Info */}
                {/* <div className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                      JK
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">John Katumba</div>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-gray-600">4.9 • Arriving in 3 min</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">KES 640</div>
                    <div className="text-sm text-gray-500">Fixed price</div>
                  </div>
                </div> */}
                
                {/* Payment Methods */}
                {/* <div className="space-y-3">
                  <div className="text-sm font-medium text-gray-700">Payment options</div>
                  <div className="flex gap-2">
                    <div className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-50 border border-green-200 rounded-lg">
                      <span className="text-lg">📱</span>
                      <span className="text-sm font-medium text-green-800">M-Pesa</span>
                    </div>
                    <div className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <span className="text-lg">💳</span>
                      <span className="text-sm font-medium text-blue-800">Card</span>
                    </div>
                    <div className="flex-1 flex items-center justify-center gap-2 py-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <span className="text-lg">💵</span>
                      <span className="text-sm font-medium text-orange-800">Cash</span>
                    </div>
                  </div>
                </div> */}
                
                {/* Book Button */}
                {/* <Button className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-button">
                  Confirm Ride
                </Button>
              </div>
            </Card> */}
          {/* </div> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;