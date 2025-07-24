import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Phone, 
  MapPin, 
  Camera, 
  Users, 
  Bell,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

const SafetyFeatures = () => {
  const safetyFeatures = [
    {
      icon: AlertTriangle,
      title: "SOS Emergency Button",
      description: "One-tap emergency assistance with instant location sharing to emergency contacts and authorities",
      status: "Active",
      color: "text-red-500"
    },
    {
      icon: Camera,
      title: "Helmet Verification",
      description: "Drivers must take a selfie with their helmet before accepting rides to ensure safety compliance",
      status: "Required",
      color: "text-green-500"
    },
    {
      icon: MapPin,
      title: "Real-time Tracking",
      description: "Share your live location with family and friends throughout your entire journey",
      status: "Always On",
      color: "text-blue-500"
    },
    {
      icon: Shield,
      title: "Driver Verification",
      description: "All drivers undergo background checks, license verification, and vehicle inspection",
      status: "Verified",
      color: "text-green-500"
    },
    {
      icon: Phone,
      title: "Emergency Contacts",
      description: "Automatic notifications sent to your emergency contacts when SOS is activated",
      status: "Configured",
      color: "text-orange-500"
    },
    {
      icon: Bell,
      title: "Safety Alerts",
      description: "Real-time alerts about road conditions, weather warnings, and safety incidents",
      status: "Enabled",
      color: "text-purple-500"
    }
  ];

  return (
    <section id="safety" className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Shield className="h-3 w-3 mr-1" />
            Safety First
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Your Safety is Our
            <span className="bg-gradient-hero bg-orange-500 bg-clip-text text-transparent"> Top Priority</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Advanced safety features designed specifically for African roads and riding conditions
          </p>
        </div>

        {/* Emergency Demo Section */}
        <div className="mb-16">
          <Card className="p-8 bg-gradient-to-r from-red-500/10 to-orange-500/10 border-red-200 dark:border-red-800">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500 rounded-full mb-4 animate-pulse-glow">
                <AlertTriangle className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Emergency SOS Demo</h3>
              <p className="text-muted-foreground">See how our emergency system works in action</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">1</span>
                </div>
                <h4 className="font-semibold mb-2">Press SOS Button</h4>
                <p className="text-sm text-muted-foreground">Long press the emergency button for 3 seconds</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">2</span>
                </div>
                <h4 className="font-semibold mb-2">Location Shared</h4>
                <p className="text-sm text-muted-foreground">GPS coordinates sent to emergency contacts</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">3</span>
                </div>
                <h4 className="font-semibold mb-2">Help Dispatched</h4>
                <p className="text-sm text-muted-foreground">Local authorities and contacts notified</p>
              </div>
            </div>

            <div className="text-center mt-8">
              <Button size="lg" variant="destructive" className="bg-red-500 hover:bg-red-600">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Try SOS Demo (Safe Mode)
              </Button>
            </div>
          </Card>
        </div>

        {/* Safety Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {safetyFeatures.map((feature, index) => (
            <Card key={index} className="group hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <feature.icon className={`h-10 w-10 ${feature.color} group-hover:scale-110 transition-transform`} />
                  <Badge variant="secondary" className="text-xs">
                    {feature.status}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Helmet Verification Demo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-green-500" />
                Helmet Verification Process
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium">Driver takes helmet selfie</div>
                    <div className="text-sm text-muted-foreground">AI verifies helmet is properly worn</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-3 bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium">Verification Complete</div>
                    <div className="text-sm text-muted-foreground">Driver can now accept ride requests</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-3 bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium">Rider Notification</div>
                    <div className="text-sm text-muted-foreground">Riders see verified helmet badge</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                Community Safety Network
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">25,000+</div>
                  <div className="text-muted-foreground">Verified Drivers</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-500">99.8%</div>
                    <div className="text-sm text-muted-foreground">Safety Rating</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-500">24/7</div>
                    <div className="text-sm text-muted-foreground">Support</div>
                  </div>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span className="font-medium">Safety Guarantee</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Every ride is monitored, tracked, and backed by our comprehensive safety protocol
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SafetyFeatures;