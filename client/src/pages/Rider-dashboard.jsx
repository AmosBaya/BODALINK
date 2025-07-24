// Converted and enhanced with backend interactions + loading + toast using shadcn/sonner
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
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
  MapPin, Star, Clock, DollarSign, Phone,
  MessageSquare, Navigation, Calendar, Plus,
  User, MapIcon
} from "lucide-react";

const RiderDashboard = () => {
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
  const [currentRating, setCurrentRating] = useState(0);
  const [ratingComment, setRatingComment] = useState("");

  const [availableDrivers, setAvailableDrivers] = useState([]);
  const [rideHistory, setRideHistory] = useState([]);
  const [bookingForm, setBookingForm] = useState({ pickup: "", destination: "", notes: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const driversRes = await axios.get("http://localhost:5000/api/riders/available-drivers");
        const historyRes = await axios.get("http://localhost:5000/api/riders/ride-history");
        setAvailableDrivers(driversRes.data);
        setRideHistory(historyRes.data);
      } catch (error) {
        toast.error("Failed to fetch dashboard data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleBookRide = async (driver) => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/riders/request-ride", {
        driverId: driver.id,
        pickup: bookingForm.pickup,
        destination: bookingForm.destination,
        notes: bookingForm.notes,
      });
      toast.success(res.data.message || `Ride booked with ${driver.name}`);
    } catch (error) {
      toast.error("Failed to book ride");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRateDriver = async (rideId) => {
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/riders/rate-driver", {
        rideId,
        rating: currentRating,
        comment: ratingComment,
      });
      toast.success("Thank you for your rating!");
      setRatingDialogOpen(false);
      setCurrentRating(0);
      setRatingComment("");
    } catch (error) {
      toast.error("Failed to submit rating");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewRideBooking = async () => {
    if (!bookingForm.pickup || !bookingForm.destination) {
      toast.warning("Please fill in pickup and destination locations.");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/riders/request-ride", {
        pickup: bookingForm.pickup,
        destination: bookingForm.destination,
        notes: bookingForm.notes,
      });
      setAvailableDrivers(res.data);
      toast.success("Drivers found near you");
    } catch (error) {
      toast.error("Could not find drivers");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Rider Dashboard</h1>
            <p className="text-muted-foreground">Book your next boda ride</p>
          </div>
          <Avatar className="h-12 w-12">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>RD</AvatarFallback>
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
                  <Plus className="h-5 w-5" /> Book New Ride
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pickup">Pickup Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="pickup" className="pl-10" placeholder="Enter pickup location" value={bookingForm.pickup} onChange={(e) => setBookingForm({ ...bookingForm, pickup: e.target.value })} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination</Label>
                    <div className="relative">
                      <Navigation className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="destination" className="pl-10" placeholder="Where are you going?" value={bookingForm.destination} onChange={(e) => setBookingForm({ ...bookingForm, destination: e.target.value })} />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Special Instructions</Label>
                  <Textarea id="notes" placeholder="Optional..." value={bookingForm.notes} onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })} />
                </div>
                <Button onClick={handleNewRideBooking} className="w-full text-white bg-green-800 hover:bg-green-700 hover:text-black"  size="lg" disabled={loading}>
                  <MapIcon className="mr-2 h-4 w-4" /> {loading ? "Loading..." : "Find Available Drivers"}
                </Button>
              </CardContent>
            </Card>
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
