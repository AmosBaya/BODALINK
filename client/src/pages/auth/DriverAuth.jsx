import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MapPin,
  Bike,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Smartphone,
  FileText,
} from "lucide-react";
import axios from "axios";

const DriverAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    licenseNumber: "",
    vehicleRegistration: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      try {
        const res = await axios.post("http://localhost:5000/api/auth/login", {
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem("userRole", "driver");
        localStorage.setItem("userEmail", formData.email);
        localStorage.setItem("isAuthenticated", "true");
        toast.success("Login successful!", { duration: 3000 });
        navigate("/driver-dashboard");
      } catch (err) {
        toast.error(
          err.response?.data?.message || "Login failed. Please try again.",
          { duration: 3000 }
        );
      }
    } else {
      try {
        const res = await axios.post("http://localhost:5000/api/auth/register", {
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          role: "driver",
          profile: {
            name: formData.name,
            licenseNumber: formData.licenseNumber,
            vehicleRegistration: formData.vehicleRegistration,
          },
        });

        toast("Driver registration successful!", { duration: 3000 });
        setIsLogin(true);
      } catch (err) {
        toast(
          err.response?.data?.message ||
            "Registration failed. Please try again.",
          { duration: 3000 }
        );
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen md:min-h-dvh bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-indigo-200/30 rounded-full blur-xl"></div>
      </div>
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-3 group mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <MapPin className="h-7 w-7 text-white" />
              </div>
              <div className="font-bold text-2xl text-gray-900">
                Boda<span className="text-blue-500">Link</span>
              </div>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isLogin ? "Welcome Back, Driver!" : "Drive & Earn with Us"}
            </h1>
            <p className="text-gray-600">
              {isLogin ? "Sign in to start earning" : "Join thousands of drivers earning daily"}
            </p>
          </div>

          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-xl">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Bike className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl">
                {isLogin ? "Driver Sign In" : "Become a Driver"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <div className="relative">
                      <User className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <Input
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="pl-10 h-12"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <div className="relative">
                    <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <Input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                {!isLogin && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Phone Number</label>
                      <div className="relative">
                        <Smartphone className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <Input
                          type="tel"
                          name="phone"
                          placeholder="+254 700 000 000"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="pl-10 h-12"
                          required={!isLogin}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Driver's License Number</label>
                      <div className="relative">
                        <FileText className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <Input
                          type="text"
                          name="licenseNumber"
                          placeholder="Enter license number"
                          value={formData.licenseNumber}
                          onChange={handleInputChange}
                          className="pl-10 h-12"
                          required={!isLogin}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Vehicle Registration</label>
                      <div className="relative">
                        <Car className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <Input
                          type="text"
                          name="vehicleRegistration"
                          placeholder="Enter vehicle registration"
                          value={formData.vehicleRegistration}
                          onChange={handleInputChange}
                          className="pl-10 h-12"
                          required={!isLogin}
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <div className="relative">
                    <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10 pr-10 h-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {isLogin && (
                  <div className="text-right">
                    <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                      Forgot password?
                    </a>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold"
                >
                  {isLogin ? "Sign In" : "Register as Driver"}
                </Button>
              </form>

              <div className="text-center">
                <p className="text-gray-600">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="ml-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {isLogin ? "Register" : "Sign in"}
                  </button>
                </p>
              </div>

              {!isLogin && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Requirements:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Valid driver's license</li>
                    <li>• Registered motorcycle</li>
                    <li>• Clean driving record</li>
                    <li>• 18+ years old</li>
                  </ul>
                </div>
              )}

              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Looking for a ride instead?</p>
                <Link to="/rider-auth">
                  <Button variant="outline" className="w-full">
                    <Smartphone className="h-4 w-4 mr-2" />
                    Sign up as Rider
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DriverAuth;
