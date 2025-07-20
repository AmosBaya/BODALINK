import React, { useEffect, useState } from 'react';
import socket from '../utils/socket';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { BadgeCheck, Wallet, Clock, BarChart3, Power } from 'lucide-react';

const DriverDashboard = ({ driverId }) => {
  const [rideRequests, setRideRequests] = useState([]);
  const [tripHistory, setTripHistory] = useState([]);
  const [earnings, setEarnings] = useState(0);
  const [hoursOnline, setHoursOnline] = useState(0);
  const [online, setOnline] = useState(false);
  const [weeklyEarnings, setWeeklyEarnings] = useState([]);

  useEffect(() => {
    let onlineStart = null;

    if (online) {
      onlineStart = Date.now();
      socket.connect();
      socket.emit('register-driver', { driverId, location: { lat: 0, lng: 0 } });
    } else {
      if (onlineStart) {
        const duration = (Date.now() - onlineStart) / 3600000;
        setHoursOnline((prev) => prev + duration);
      }
      socket.disconnect();
    }

    socket.on('ride-request', (data) => {
      setRideRequests((prev) => [...prev, data]);
    });

    return () => {
      socket.off('ride-request');
    };
  }, [online, driverId]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`/api/bookings/driver/${driverId}`);
        const trips = await res.json();
        setTripHistory(trips);
        setEarnings(trips.filter(t => t.status === 'completed').length * 150);

        const earningsRes = await fetch(`/api/earnings/weekly/${driverId}`);
        const earningsData = await earningsRes.json();
        setWeeklyEarnings(earningsData);
      } catch (err) {
        console.error('Failed to fetch driver stats', err);
      }
    };
    fetchStats();
  }, [driverId]);

  const acceptRide = (ride) => {
    socket.emit('ride-accepted', {
      rideId: ride._id,
      riderId: ride.rider,
      driverId,
    });
  };

  const viewWallet = async () => {
    const res = await fetch(`/api/wallet/${driverId}`);
    const wallet = await res.json();
    alert(`Wallet Balance: KES ${wallet.balance}`);
  };

  const withdrawEarnings = async () => {
    const res = await fetch(`/api/wallet/withdraw/${driverId}`, { method: 'POST' });
    const data = await res.json();
    alert(data.message);
  };

  const exportReport = async () => {
    const res = await fetch(`/api/reports/export/${driverId}`);
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'report.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const updateProfile = () => {
    window.location.href = `/profile/${driverId}`;
  };

  const initiateMpesa = async () => {
    try {
      const res = await fetch(`/api/wallet/mpesa/${driverId}`, { method: 'POST' });
      const data = await res.json();
      alert(data.message);
    } catch (error) {
      alert('M-Pesa initiation failed');
    }
  };

  return (
    <div className="grid gap-6 p-4 md:grid-cols-3 bg-gradient-to-br from-blue-50 to-purple-100 min-h-screen">
      <Card className="md:col-span-2 shadow-xl rounded-2xl">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><Power className="w-5 h-5 text-green-500" /> Driver Status</h2>
            <div className="flex items-center gap-3">
              <span className={`font-medium ${online ? 'text-green-600' : 'text-gray-500'}`}>{online ? 'Online' : 'Offline'}</span>
              <Switch checked={online} onCheckedChange={setOnline} />
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2"><BadgeCheck className="w-5 h-5 text-blue-500" /> Ride Requests</h3>
            {rideRequests.length ? rideRequests.map((ride) => (
              <div key={ride._id} className="border border-gray-200 bg-white p-4 rounded-lg shadow-sm mb-3">
                <p><strong>Pickup:</strong> {ride.pickupLocation}</p>
                <p><strong>Drop-off:</strong> {ride.dropoffLocation}</p>
                <Button onClick={() => acceptRide(ride)} className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white">Accept</Button>
              </div>
            )) : <p className="text-sm text-gray-500">No current ride requests.</p>}
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2"><Clock className="w-5 h-5 text-orange-500" /> Trip History</h3>
            <div className="space-y-2 max-h-[200px] overflow-auto bg-white p-2 rounded-md border">
              {tripHistory.map((trip) => (
                <div key={trip._id} className="text-sm border-b pb-1">
                  {trip.pickupLocation} → {trip.dropoffLocation} — <em>{trip.status}</em>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2"><Wallet className="w-5 h-5 text-teal-500" /> Earnings & Hours</h3>
            <p className="text-md text-gray-600"><strong>Total Earnings:</strong> KES {earnings}</p>
            <p className="text-md text-gray-600"><strong>Hours Online:</strong> {hoursOnline.toFixed(2)} hrs</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-purple-500" /> Weekly Earnings</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyEarnings} className="bg-white rounded-lg p-2">
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="amount" fill="#7c3aed" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-xl rounded-2xl">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-800">Account & Finance</h2>
          <div className="space-y-2">
            <Button variant="outline" className="w-full text-blue-600 border-blue-200" onClick={viewWallet}>View Wallet</Button>
            <Button variant="outline" className="w-full text-green-600 border-green-200" onClick={withdrawEarnings}>Withdraw Earnings</Button>
            <Button variant="outline" className="w-full text-amber-600 border-amber-200" onClick={initiateMpesa}>Withdraw via M-Pesa</Button>
            <Button variant="outline" className="w-full text-purple-600 border-purple-200" onClick={exportReport}>Export Report (PDF)</Button>
            <Button variant="outline" className="w-full text-gray-700 border-gray-200" onClick={updateProfile}>Update Profile</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DriverDashboard;
