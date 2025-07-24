import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { 
  MapPin, 
  Clock, 
  CloudRain, 
  Zap, 
  TrendingUp,
  Users,
  Car
} from "lucide-react";

const PricingCalculator = () => {
  const [factors, setFactors] = useState({
    distance: 5,
    weather: "sunny",
    traffic: "medium",
    demand: "medium",
    timeOfDay: "off-peak",
    fuelPrice: 120
  });

  const [calculatedPrice, setCalculatedPrice] = useState(0);

  const baseRate = 45; // Base rate per km in KES

  const weatherMultipliers = {
    sunny: 1.0,
    "light-rain": 1.15,
    "heavy-rain": 1.3
  };

  const trafficMultipliers = {
    low: 1.0,
    medium: 1.1,
    high: 1.25
  };

  const demandMultipliers = {
    low: 0.9,
    medium: 1.0,
    high: 1.4
  };

  const timeMultipliers = {
    "off-peak": 1.0,
    peak: 1.2
  };

  useEffect(() => {
    const distance = factors.distance;
    const baseCost = baseRate * distance;
    
    const weatherFactor = weatherMultipliers[factors.weather];
    const trafficFactor = trafficMultipliers[factors.traffic];
    const demandFactor = demandMultipliers[factors.demand];
    const timeFactor = timeMultipliers[factors.timeOfDay];
    const fuelFactor = factors.fuelPrice / 120; // Base fuel price
    
    const totalPrice = baseCost * weatherFactor * trafficFactor * demandFactor * timeFactor * fuelFactor;
    setCalculatedPrice(Math.round(totalPrice));
  }, [factors]);

  const getFactorColor = (factor, value) => {
    if (factor === "weather") {
      return value === "sunny" ? "text-green-500" : value === "light-rain" ? "text-yellow-500" : "text-red-500";
    }
    if (factor === "traffic" || factor === "demand") {
      return value === "low" ? "text-green-500" : value === "medium" ? "text-yellow-500" : "text-red-500";
    }
    return "text-blue-500";
  };

  const getSurgeLevel = () => {
    const multiplier = calculatedPrice / (baseRate * factors.distance);
    if (multiplier <= 1.1) return { level: "Normal", color: "bg-green-500", multiplier: "1x" };
    if (multiplier <= 1.3) return { level: "Low Surge", color: "bg-yellow-500", multiplier: "1.3x" };
    if (multiplier <= 1.6) return { level: "Medium Surge", color: "bg-orange-500", multiplier: "1.6x" };
    return { level: "High Surge", color: "bg-red-500", multiplier: "2x+" };
  };

  const surge = getSurgeLevel();

  return (
    <section id="pricing" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Transparent Pricing
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            See How We Calculate Your Fare
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered pricing adjusts in real-time based on various factors to ensure fair rates for both riders and drivers
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls */}
          <Card className="p-6">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Pricing Factors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Distance */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Distance: {factors.distance} km
                  </label>
                </div>
                <Slider
                  value={[factors.distance]}
                  onValueChange={(value) => setFactors(prev => ({ ...prev, distance: value[0] }))}
                  max={20}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Weather */}
              <div>
                <label className="font-medium flex items-center gap-2 mb-3">
                  <CloudRain className="h-4 w-4" />
                  Weather Conditions
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["sunny", "light-rain", "heavy-rain"].map((weather) => (
                    <Button
                      key={weather}
                      variant={factors.weather === weather ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFactors(prev => ({ ...prev, weather }))}
                      className="capitalize"
                    >
                      {weather.replace("-", " ")}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Traffic */}
              <div>
                <label className="font-medium flex items-center gap-2 mb-3">
                  <Car className="h-4 w-4" />
                  Traffic Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["low", "medium", "high"].map((traffic) => (
                    <Button
                      key={traffic}
                      variant={factors.traffic === traffic ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFactors(prev => ({ ...prev, traffic }))}
                      className="capitalize"
                    >
                      {traffic}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Demand */}
              <div>
                <label className="font-medium flex items-center gap-2 mb-3">
                  <Users className="h-4 w-4" />
                  Rider Demand
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["low", "medium", "high"].map((demand) => (
                    <Button
                      key={demand}
                      variant={factors.demand === demand ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFactors(prev => ({ ...prev, demand }))}
                      className="capitalize"
                    >
                      {demand}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Time of Day */}
              <div>
                <label className="font-medium flex items-center gap-2 mb-3">
                  <Clock className="h-4 w-4" />
                  Time of Day
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {["off-peak", "peak"].map((time) => (
                    <Button
                      key={time}
                      variant={factors.timeOfDay === time ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFactors(prev => ({ ...prev, timeOfDay: time }))}
                      className="capitalize"
                    >
                      {time.replace("-", " ")}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Fuel Price */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="font-medium flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Fuel Price: KES {factors.fuelPrice}
                  </label>
                </div>
                <Slider
                  value={[factors.fuelPrice]}
                  onValueChange={(value) => setFactors(prev => ({ ...prev, fuelPrice: value[0] }))}
                  max={160}
                  min={80}
                  step={5}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Price Display */}
          <Card className="p-6">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <span>Calculated Fare</span>
                <Badge className={`${surge.color} text-white`}>
                  {surge.level}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-8">
                <div className="text-5xl font-bold text-primary mb-2">
                  KES {calculatedPrice.toLocaleString()}
                </div>
                <div className="text-lg text-muted-foreground">
                  for {factors.distance} km ride
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  ≈ KES {Math.round(calculatedPrice / factors.distance)} per km
                </div>
              </div>

              {/* Breakdown */}
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                  <span>Base Rate ({factors.distance} km)</span>
                  <span className="font-semibold">KES {(baseRate * factors.distance).toLocaleString()}</span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className={`flex items-center gap-1 ${getFactorColor("weather", factors.weather)}`}>
                      <CloudRain className="h-3 w-3" />
                      Weather ({factors.weather})
                    </span>
                    <span>×{weatherMultipliers[factors.weather]}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className={`flex items-center gap-1 ${getFactorColor("traffic", factors.traffic)}`}>
                      <Car className="h-3 w-3" />
                      Traffic ({factors.traffic})
                    </span>
                    <span>×{trafficMultipliers[factors.traffic]}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className={`flex items-center gap-1 ${getFactorColor("demand", factors.demand)}`}>
                      <Users className="h-3 w-3" />
                      Demand ({factors.demand})
                    </span>
                    <span>×{demandMultipliers[factors.demand]}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1 text-blue-500">
                      <Clock className="h-3 w-3" />
                      Time ({factors.timeOfDay})
                    </span>
                    <span>×{timeMultipliers[factors.timeOfDay]}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1 text-purple-500">
                      <Zap className="h-3 w-3" />
                      Fuel Price
                    </span>
                    <span>×{(factors.fuelPrice / 120).toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-3 mt-6">
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-sm font-medium mb-2">Payment Options:</div>
                    <div className="flex gap-2 text-xs">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded">M-Pesa</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">Card</span>
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded">Cash</span>
                    </div>
                  </div>
                  <Button className="w-full" size="lg">
                    Book This Ride
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PricingCalculator;