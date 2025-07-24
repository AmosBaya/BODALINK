import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Star,
  MapPin,
  Clock,
  Users,
  Zap,
  Shield,
} from "lucide-react";

const RideCard = ({ driver, price, distance, duration, rideType, onSelect }) => {
  const rideTypeConfig = {
    standard: {
      icon: MapPin,
      label: "Standard",
      description: "Regular boda-boda ride",
      color: "bg-blue-500",
    },
    group: {
      icon: Users,
      label: "Group Ride",
      description: "Share with others",
      color: "bg-green-500",
    },
    premium: {
      icon: Zap,
      label: "Premium",
      description: "Verified driver, newer bike",
      color: "bg-purple-500",
    },
  };

  const config = rideTypeConfig[rideType];
  const Icon = config.icon;

  return (
    <Card
      className="hover:shadow-glow transition-all duration-300 cursor-pointer group"
      onClick={onSelect}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${config.color} animate-pulse`} />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Icon className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{config.label}</span>
                {price.surge && price.surge > 1 && (
                  <Badge variant="destructive" className="text-xs">
                    {price.surge}x Surge
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{config.description}</p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              {price.currency} {price.amount.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">
              {distance} • {duration}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={driver.photo} alt={driver.name} />
              <AvatarFallback>
                {driver.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{driver.name}</div>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>{driver.rating}</span>
                <span>({driver.reviews})</span>
                <span>•</span>
                <span>{driver.vehicleType}</span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-center text-sm text-muted-foreground mb-1">
              <Clock className="h-3 w-3 mr-1" />
              <span>Arrives in {driver.eta}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {driver.plateNumber}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-green-500" />
            <span className="text-sm text-green-600 font-medium">
              Verified Driver
            </span>
          </div>

          <Button
            className="group-hover:shadow-glow"
            onClick={(e) => {
              e.stopPropagation();
              if (onSelect) onSelect();
            }}
          >
            Select Ride
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RideCard;
