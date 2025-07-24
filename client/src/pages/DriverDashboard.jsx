import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Clock, 
  DollarSign, 
  MapPin, 
  Phone, 
  Star, 
  TrendingUp,
  CreditCard,
  Wallet,
  CheckCircle,
  XCircle,
  Navigation,
  AlertCircle
} from "lucide-react";
import axios from "axios";

const DriverDashboard = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [pendingRequest, setPendingRequest] = useState({
    rider: "John Doe",
    pickup: "CBD, Nairobi",
    destination: "Westlands",
    fare: 250,
    distance: "5.2 km",
    duration: "15 min"
  });

  const recentTrips = [
    { id: 1, rider: "Jane Smith", fare: 180, date: "Today, 2:30 PM", rating: 5, destination: "Karen" },
    { id: 2, rider: "Mike Johnson", fare: 320, date: "Today, 11:45 AM", rating: 4, destination: "Airport" },
    { id: 3, rider: "Sarah Wilson", fare: 150, date: "Yesterday, 6:20 PM", rating: 5, destination: "Kilimani" },
    { id: 4, rider: "David Brown", fare: 200, date: "Yesterday, 3:15 PM", rating: 4, destination: "Upperhill" }
  ];

  const weeklyEarnings = {
    total: 8750,
    trips: 35,
    avgRating: 4.8,
    hours: 42
  };

  const handleAcceptRide = () => {
    setPendingRequest(null);
    // Integration point: Accept ride API call
  };

  const handleRejectRide = () => {
    setPendingRequest(null);
    // Integration point: Reject ride API call
  };

  const handleWithdraw = () => {
    // Integration point: Withdrawal API call
    alert("Withdrawal request submitted. Funds will be sent to your M-Pesa within 5 minutes.");
  };

  const handleAirtimeConversion = () => {
    // Integration point: Airtime conversion API call
    alert("Converting KES 500 to airtime. You'll receive airtime on your registered number.");
  };

  const user = ()=>{
    const res = axios.get("http://localhost:5000//api/drivers/profile", {

    })
  }
  
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Driver Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user}!</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm">Offline</span>
              <Switch 
                checked={isOnline} 
                onCheckedChange={setIsOnline}
              />
              <span className="text-sm">Online</span>
            </div>
            <Badge variant={isOnline ? "default" : "secondary"}>
              {isOnline ? "Available" : "Offline"}
            </Badge>
          </div>
        </div>

        {/* Pending Ride Request */}
        {pendingRequest && (
          <Card className="border-primary bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                New Ride Request
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p><strong>Rider:</strong> {pendingRequest.rider}</p>
                  <p><strong>Pickup:</strong> {pendingRequest.pickup}</p>
                  <p><strong>Destination:</strong> {pendingRequest.destination}</p>
                </div>
                <div className="space-y-2">
                  <p><strong>Fare:</strong> KES {pendingRequest.fare}</p>
                  <p><strong>Distance:</strong> {pendingRequest.distance}</p>
                  <p><strong>Duration:</strong> {pendingRequest.duration}</p>
                </div>
              </div>
              <div className="flex gap-4 mt-4">
                <Button 
                  onClick={handleAcceptRide}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Accept Ride
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleRejectRide}
                  className="flex-1"
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Weekly Earnings</p>
                  <p className="text-2xl font-bold">KES {weeklyEarnings.total.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Trips</p>
                  <p className="text-2xl font-bold">{weeklyEarnings.trips}</p>
                </div>
                <Navigation className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <p className="text-2xl font-bold">{weeklyEarnings.avgRating}</p>
                </div>
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Hours Online</p>
                  <p className="text-2xl font-bold">{weeklyEarnings.hours}h</p>
                </div>
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="trips" className="space-y-4">
          <TabsList>
            <TabsTrigger value="trips">Recent Trips</TabsTrigger>
            <TabsTrigger value="finance">Finance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="trips" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Trips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTrips.map((trip) => (
                    <div key={trip.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>{trip.rider.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{trip.rider}</p>
                          <p className="text-sm text-muted-foreground">{trip.destination}</p>
                          <p className="text-xs text-muted-foreground">{trip.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">KES {trip.fare}</p>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < trip.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="finance" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="h-5 w-5" />
                    Wallet Balance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <p className="text-3xl font-bold">KES 2,450</p>
                    <p className="text-muted-foreground">Available for withdrawal</p>
                    <Button onClick={handleWithdraw} className="w-full">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Withdraw to M-Pesa
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Airtime Conversion
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">Convert earnings to airtime</p>
                    <div className="space-y-2">
                      <p>Convert: KES 500</p>
                      <p className="text-sm text-muted-foreground">Phone: +254 7XX XXX XXX</p>
                    </div>
                    <Button onClick={handleAirtimeConversion} variant="outline" className="w-full">
                      Convert to Airtime
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Earnings Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold">KES 8,750</p>
                    <p className="text-sm text-muted-foreground">This Week</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">KES 32,100</p>
                    <p className="text-sm text-muted-foreground">This Month</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">35</p>
                    <p className="text-sm text-muted-foreground">Trips</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">4.8</p>
                    <p className="text-sm text-muted-foreground">Avg Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DriverDashboard;