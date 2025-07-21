import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  MapPin, 
  Star, 
  Clock, 
  DollarSign,
  Phone,
  MessageSquare,
  Navigation,
  Calendar,
  Plus,
  User,
  MapIcon
} from "lucide-react";

const RiderDashboard = () => {
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
  const [currentRating, setCurrentRating] = useState(0);
  const [ratingComment, setRatingComment] = useState("");

  const availableDrivers = [
    {
      id: 1,
      name: "Patrick Mwangi",
      rating: 4.9,
      distance: "2 min away",
      fare: 250,
      bike: "Honda CB150R",
      phone: "+254 712 345 678",
      image: "/placeholder.svg",
      trips: 1250
    },
    {
      id: 2,
      name: "Grace Wanjiku",
      rating: 4.8,
      distance: "4 min away",
      fare: 280,
      bike: "Yamaha FZ",
      phone: "+254 723 456 789",
      image: "/placeholder.svg",
      trips: 890
    },
    {
      id: 3,
      name: "John Kiprotich",
      rating: 4.7,
      distance: "6 min away",
      fare: 300,
      bike: "TVS Apache",
      phone: "+254 734 567 890",
      image: "/placeholder.svg",
      trips: 2100
    }
  ];

  const rideHistory = [
    {
      id: 1,
      driver: "Patrick Mwangi",
      date: "2024-01-15",
      time: "2:30 PM",
      from: "CBD, Nairobi",
      to: "Westlands",
      fare: 250,
      rating: 5,
      status: "Completed"
    },
    {
      id: 2,
      driver: "Grace Wanjiku",
      date: "2024-01-14",
      time: "11:45 AM",
      from: "Karen",
      to: "Airport",
      fare: 450,
      rating: 4,
      status: "Completed"
    },
    {
      id: 3,
      driver: "John Kiprotich",
      date: "2024-01-13",
      time: "6:20 PM",
      from: "Kilimani",
      to: "CBD",
      fare: 180,
      rating: 0,
      status: "Pending Rating"
    }
  ];

  const [bookingForm, setBookingForm] = useState({
    pickup: "",
    destination: "",
    notes: ""
  });

  const handleBookRide = (driver) => {
    // Integration point: Book ride API call
    alert(`Ride booked with ${driver.name}! They'll arrive in ${driver.distance}.`);
  };

  const handleRateDriver = (rideId) => {
    // Integration point: Rate driver API call
    console.log("Rating:", currentRating, "Comment:", ratingComment, "Ride ID:", rideId);
    setRatingDialogOpen(false);
    setCurrentRating(0);
    setRatingComment("");
    alert("Thank you for your rating!");
  };

  const handleNewRideBooking = () => {
    if (!bookingForm.pickup || !bookingForm.destination) {
      alert("Please fill in pickup and destination locations.");
      return;
    }
    // Integration point: New ride booking API call
    alert("Searching for available drivers near you...");
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Rider Dashboard</h1>
            <p className="text-muted-foreground">Book your next boda ride</p>
          </div>
          <Avatar className="h-12 w-12">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>

        <Tabs defaultValue="book" className="space-y-4">
          <TabsList>
            <TabsTrigger value="book">Book Ride</TabsTrigger>
            <TabsTrigger value="history">Ride History</TabsTrigger>
            <TabsTrigger value="drivers">Available Drivers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="book" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Book New Ride
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pickup">Pickup Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="pickup"
                        placeholder="Enter pickup location"
                        className="pl-10"
                        value={bookingForm.pickup}
                        onChange={(e) => setBookingForm({...bookingForm, pickup: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination</Label>
                    <div className="relative">
                      <Navigation className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="destination"
                        placeholder="Where are you going?"
                        className="pl-10"
                        value={bookingForm.destination}
                        onChange={(e) => setBookingForm({...bookingForm, destination: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Special Instructions (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any special instructions for the driver..."
                    value={bookingForm.notes}
                    onChange={(e) => setBookingForm({...bookingForm, notes: e.target.value})}
                  />
                </div>
                
                <Button onClick={handleNewRideBooking} className="w-full" size="lg">
                  <MapIcon className="mr-2 h-4 w-4" />
                  Find Available Drivers
                </Button>
              </CardContent>
            </Card>
            
            {/* Fare Estimate */}
            {/* <Card>
              <CardHeader>
                <CardTitle>Estimated Fare</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">KES 250 - 300</p>
                    <p className="text-sm text-muted-foreground">Based on distance and current demand</p>
                  </div>
                  <Badge>Dynamic Pricing</Badge>
                </div>
              </CardContent>
            </Card> */}
          </TabsContent>
          
          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Ride History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rideHistory.map((ride) => (
                    <div key={ride.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span className="font-medium">{ride.driver}</span>
                            <Badge variant={ride.status === "Completed" ? "default" : "secondary"}>
                              {ride.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {ride.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {ride.time}
                            </span>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm"><strong>From:</strong> {ride.from}</p>
                            <p className="text-sm"><strong>To:</strong> {ride.to}</p>
                          </div>
                        </div>
                        
                        <div className="text-right space-y-2">
                          <p className="text-lg font-bold">KES {ride.fare}</p>
                          {ride.rating > 0 ? (
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${i < ride.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                          ) : (
                            <Dialog open={ratingDialogOpen} onOpenChange={setRatingDialogOpen}>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  Rate Driver
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Rate Your Driver</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="text-center">
                                    <p className="font-medium">{ride.driver}</p>
                                    <p className="text-sm text-muted-foreground">{ride.from} → {ride.to}</p>
                                  </div>
                                  
                                  <div className="flex justify-center gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star
                                        key={star}
                                        className={`h-8 w-8 cursor-pointer ${
                                          star <= currentRating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                        }`}
                                        onClick={() => setCurrentRating(star)}
                                      />
                                    ))}
                                  </div>
                                  
                                  <Textarea
                                    placeholder="Share your experience (optional)"
                                    value={ratingComment}
                                    onChange={(e) => setRatingComment(e.target.value)}
                                  />
                                  
                                  <Button 
                                    onClick={() => handleRateDriver(ride.id)} 
                                    className="w-full"
                                    disabled={currentRating === 0}
                                  >
                                    Submit Rating
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="drivers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Available Drivers Near You</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {availableDrivers.map((driver) => (
                    <div key={driver.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={driver.image} />
                            <AvatarFallback>{driver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          
                          <div>
                            <h3 className="font-medium">{driver.name}</h3>
                            <div className="flex items-center gap-1 mb-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm">{driver.rating}</span>
                              <span className="text-xs text-muted-foreground">({driver.trips} trips)</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{driver.bike}</p>
                            <p className="text-sm text-blue-600">{driver.distance}</p>
                          </div>
                        </div>
                        
                        <div className="text-right space-y-2">
                          <p className="text-lg font-bold">KES {driver.fare}</p>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Phone className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                            <Button size="sm" onClick={() => handleBookRide(driver)}>
                              Book Ride
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RiderDashboard;