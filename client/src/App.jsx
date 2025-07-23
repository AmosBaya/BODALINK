import { Button } from "@/components/ui/button"
import DriverDashboard from "./pages/DriverDashboard";
import RiderDashboard from "./pages/Rider-dashboard";
import RiderAuth from "./pages/auth/RiderAuth";
import DriverAuth from "./pages/auth/DriverAuth";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner"

export default function App() {
  return (
    <>
    <Toaster position="top-center" />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rider-auth" element={<RiderAuth />} />
        <Route path="/driver-auth" element={<DriverAuth />} />
        <Route path="/driver-dashboard" element={<DriverDashboard />} />
        <Route path="/rider-dashboard" element={<RiderDashboard />} />
      </Routes>
    </BrowserRouter>
    </>
  );
};