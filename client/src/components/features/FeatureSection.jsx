import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Users, 
  ShieldCheck, 
  CameraIcon, 
  Battery, 
  DollarSign,
  CloudRain,
  TrendingUp,
  Phone,
  MapPin
} from "lucide-react";

const FeatureSection = () => {
  const features = [
    {
      icon: Zap,
      title: "Dynamic Pricing",
      description: "Smart pricing that adjusts based on weather, traffic, and fuel costs",
      badge: "AI-Powered",
      color: "text-yellow-500"
    },
    {
      icon: Users,
      title: "Group Rides",
      description: "Share costs with riders heading the same direction",
      badge: "Cost Saving",
      color: "text-blue-500"
    },
    {
      icon: ShieldCheck,
      title: "SOS Safety",
      description: "One-tap emergency button with real-time location sharing",
      badge: "Critical",
      color: "text-red-500"
    },
    {
      icon: CameraIcon,
      title: "Helmet Verification",
      description: "Drivers verify helmet usage with selfie authentication",
      badge: "Safety First",
      color: "text-green-500"
    },
    {
      icon: Battery,
      title: "Battery Swap Stations",
      description: "Integration with local stations for electric boda-bodas",
      badge: "Eco-Friendly",
      color: "text-emerald-500"
    },
    {
      icon: Phone,
      title: "Airtime Cashout",
      description: "Convert earnings to mobile airtime for unbanked drivers",
      badge: "Innovation",
      color: "text-purple-500"
    }
  ];

  const stats = [
    { label: "Active Drivers", value: "25,000+", icon: Users },
    { label: "Cities Covered", value: "150+", icon: MapPin },
    { label: "Safe Rides", value: "2M+", icon: ShieldCheck },
    { label: "Average Rating", value: "4.8★", icon: TrendingUp }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-16 animate-fade-in">
          <Badge variant="outline" className="mb-4">
            Built for Africa
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Revolutionary Features for
            <span className="bg-gradient-hero bg-orange-500 bg-clip-text text-transparent"> Modern Transport</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the future of motorcycle transport with innovative safety features and smart technology
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center p-6 shadow-card hover:shadow-glow transition-all duration-300">
              <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
              <div className="text-2xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-glow transition-all duration-300 border-0 bg-gradient-card">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <feature.icon className={`h-12 w-12 ${feature.color} group-hover:scale-110 transition-transform`} />
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Weather Integration Highlight */}
        <div className="mt-16">
          <Card className="p-8 bg-gradient-hero bg-orange-500 text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <CloudRain className="h-12 w-12 text-white" />
                <div>
                  <h3 className="text-2xl font-bold">Weather-Smart Pricing</h3>
                  <p className="text-white/90">Automatic fare adjustments during rain or harsh weather</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-lg font-semibold">Sunny Day</div>
                  <div className="text-2xl font-bold">Base Price</div>
                  <div className="text-sm text-white/80">Normal rates apply</div>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-lg font-semibold">Light Rain</div>
                  <div className="text-2xl font-bold">+15%</div>
                  <div className="text-sm text-white/80">Safety surcharge</div>
                </div>
                <div className="bg-white/30 rounded-lg p-4">
                  <div className="text-lg font-semibold">Heavy Rain</div>
                  <div className="text-2xl font-bold">+30%</div>
                  <div className="text-sm text-white/80">High demand pricing</div>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;