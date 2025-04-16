
import React from "react";
import { Link } from "react-router-dom";
import { Search, Menu, User, Bell, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full fitness-gradient flex items-center justify-center">
            <span className="text-white font-bold">GF</span>
          </div>
          <span className="font-bold text-xl text-fitness-dark">GoGetFit</span>
        </Link>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-fitness-dark hover:text-fitness-primary font-medium">
            Home
          </Link>
          <Link to="/classes" className="text-fitness-dark hover:text-fitness-primary font-medium">
            Classes
          </Link>
          <Link to="/locations" className="text-fitness-dark hover:text-fitness-primary font-medium">
            Locations
          </Link>
          <Link to="/trainers" className="text-fitness-dark hover:text-fitness-primary font-medium">
            Trainers
          </Link>
        </nav>

        {/* Right Section - Search, Notifications, Profile */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-fitness-dark">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-fitness-dark">
            <MapPin className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-fitness-dark">
            <Bell className="h-5 w-5" />
          </Button>
          <Link to="/profile">
            <Button variant="ghost" size="icon" className="text-fitness-dark">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          
          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden text-fitness-dark">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
