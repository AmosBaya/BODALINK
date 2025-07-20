import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { toast } from "sonner"
import { MapPin, Send, Car, Star, Clock, CreditCard, Route, CheckCircle } from 'lucide-react';
import io from 'socket.io-client';

const socket = io(import.meta.env.VITE_BACKEND_URL);

export default function RiderDashboard() {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [estimatedFare, setEstimatedFare] = useState(0);
  const [availableDrivers, setAvailableDrivers] = useState([]);
  const [pastTrips, setPastTrips] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [rating, setRating] = useState(0);
  const [rideStatus, setRideStatus] = useState('idle');
  const [ridePath, setRidePath] = useState(null);

  useEffect(() => {
    socket.on('active-drivers', (drivers) => {
      setAvailableDrivers(drivers);
    });

    socket.on('ride-accepted', ({ driverId }) => {
      setRideStatus('accepted');
      toast({ title: 'Ride Accepted', description: `Driver ${driverId} accepted your request.` });
      setRidePath({ from: pickup, to: destination });
    });

    socket.on('ride-started', () => setRideStatus('ongoing'));
    socket.on('ride-completed', () => setRideStatus('completed'));

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/rider/trips`)
      .then(res => res.json())
      .then(data => setPastTrips(data.trips || []))
      .catch(() => toast({ title: 'Failed to load past trips' }));

    return () => {
      socket.off('active-drivers');
      socket.off('ride-accepted');
      socket.off('ride-started');
      socket.off('ride-completed');
    };
  }, []);

  const handleBookRide = () => {
    if (!pickup || !destination) return toast({ title: 'Error', description: 'Enter pickup and destination' });
    const fare = Math.floor(Math.random() * 500) + 100;
    setEstimatedFare(fare);
    setRideStatus('requested');
    socket.emit('request-ride', { pickup, destination });
    toast({ title: 'Ride Requested', description: `Looking for available drivers...` });
  };

  const handleMpesasPayment = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/pay/mpesa`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: estimatedFare })
    })
    .then(res => res.json())
    .then(data => toast({ title: 'M-Pesa Payment', description: data.message }))
    .catch(() => toast({ title: 'Payment Failed', description: 'Could not process M-Pesa payment.' }));
  };

  const submitRating = (tripId, value) => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/rider/rate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tripId, rating: value })
    })
    .then(() => toast({ title: 'Rating Submitted', description: `You rated ${value} stars.` }))
    .catch(() => toast({ title: 'Rating Failed' }));
  };

  const openMap = (fieldSetter) => {
    const location = prompt('Search location on Google Maps and paste coordinates or address here:');
    if (location) fieldSetter(location);
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <Tabs defaultValue="book">
        <TabsList className="mb-6">
          <TabsTrigger value="book">Book Ride</TabsTrigger>
          <TabsTrigger value="drivers">Available Drivers</TabsTrigger>
          <TabsTrigger value="trips">Past Trips</TabsTrigger>
        </TabsList>

        <TabsContent value="book">
          <Card className="mb-6">
            <CardContent className="space-y-4 p-6">
              <h2 className="text-lg font-semibold mb-2">Request a Ride</h2>
              <div className="space-y-3">
                <div>
                  <Label>Pickup Location</Label>
                  <div className="flex gap-2">
                    <Input icon={<MapPin />} value={pickup} onChange={(e) => setPickup(e.target.value)} placeholder="Enter pickup" />
                    <Button variant="outline" onClick={() => openMap(setPickup)}>Map</Button>
                  </div>
                </div>
                <div>
                  <Label>Destination</Label>
                  <div className="flex gap-2">
                    <Input icon={<MapPin />} value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Enter destination" />
                    <Button variant="outline" onClick={() => openMap(setDestination)}>Map</Button>
                  </div>
                </div>
                <Button onClick={handleBookRide} icon={<Send />}>Request Ride</Button>
                {estimatedFare > 0 && (
                  <div className="text-green-600 font-semibold">Estimated Fare: KES {estimatedFare}</div>
                )}
                <div className="text-sm text-muted-foreground">Status: {rideStatus}</div>
              </div>

              {ridePath && (
                <div className="mt-4 text-sm text-blue-600">
                  <Route className="inline mr-1" />Route: {ridePath.from} → {ridePath.to}
                </div>
              )}
              {rideStatus === 'completed' && (
                <div className="mt-2 text-green-600 flex items-center gap-1">
                  <CheckCircle size={16} /> Ride completed. Thank you for using BodaLink!
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Choose Payment Method</h3>
              <div className="flex gap-2">
                <Button variant="outline" icon={<CreditCard />} onClick={handleMpesasPayment}>M-Pesa</Button>
                <Button variant="outline">Card</Button>
                <Button variant="outline">Cash</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drivers">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-4">Available Drivers</h3>
              <ul className="space-y-3">
                {availableDrivers.map(([driverId, { location }]) => (
                  <li key={driverId} className="flex justify-between items-center border p-2 rounded shadow">
                    <div>
                      <p className="font-semibold">Driver ID: {driverId}</p>
                      <p className="text-sm text-muted-foreground">Location: {location?.lat}, {location?.lng}</p>
                    </div>
                    <Button variant="outline" onClick={() => setSelectedDriver(driverId)}>Select</Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trips">
          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="text-lg font-semibold">Past Trips</h3>
              {pastTrips.length === 0 ? (
                <p className="text-muted-foreground">You have no trips yet.</p>
              ) : (
                pastTrips.map((trip, index) => (
                  <div key={index} className="border p-3 rounded shadow-sm">
                    <div className="flex justify-between text-sm">
                      <span><Car className="inline mr-1" />From: {trip.pickup}</span>
                      <span><MapPin className="inline mr-1" />To: {trip.destination}</span>
                      <span><Clock className="inline mr-1" />{trip.time}</span>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span>Fare: KES {trip.fare}</span>
                      <Button size="sm" variant="outline" icon={<Star />} onClick={() => submitRating(trip.id, 5)}>Rate</Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
