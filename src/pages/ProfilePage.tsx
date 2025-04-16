
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  User, 
  Calendar, 
  Clock, 
  MapPin, 
  CreditCard, 
  LogOut, 
  Settings,
  ChevronRight,
  Trash,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Mock data for upcoming bookings
const upcomingBookings = [
  {
    id: "1",
    className: "Power Yoga Flow",
    date: "Mon, Apr 28, 2025",
    time: "07:00 AM",
    location: "Downtown Studio",
    instructor: "Emma Wilson",
    image: "https://images.unsplash.com/photo-1588286840104-8957b019727f?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60",
  },
  {
    id: "2",
    className: "HIIT Cardio Burn",
    date: "Wed, Apr 30, 2025",
    time: "05:00 PM",
    location: "Fitness Center",
    instructor: "Jason Taylor",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60",
  },
];

// Mock data for past bookings
const pastBookings = [
  {
    id: "3",
    className: "Spin & Sculpt",
    date: "Mon, Apr 14, 2025",
    time: "07:00 AM",
    location: "Cycle Studio",
    instructor: "Sarah Chen",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60",
    attended: true,
  },
  {
    id: "4",
    className: "Strength Foundations",
    date: "Fri, Apr 11, 2025",
    time: "05:00 PM",
    location: "Power Gym",
    instructor: "Mike Johnson",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60",
    attended: true,
  },
  {
    id: "5",
    className: "Gentle Morning Yoga",
    date: "Wed, Apr 9, 2025",
    time: "09:00 AM",
    location: "Uptown Yoga Studio",
    instructor: "David Kim",
    image: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60",
    attended: false,
  },
];

// Mock user data
const userData = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  joinDate: "January 2025",
  profileImage: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
};

const ProfilePage: React.FC = () => {
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-6 md:items-center">
        <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
          <img
            src={userData.profileImage}
            alt={userData.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-fitness-dark mb-1">
            {userData.name}
          </h1>
          <p className="text-gray-500 mb-3">{userData.email}</p>
          <p className="text-sm text-gray-500">Member since {userData.joinDate}</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="upcoming">
        <TabsList className="w-full">
          <TabsTrigger value="upcoming" className="flex-1">Upcoming Classes</TabsTrigger>
          <TabsTrigger value="past" className="flex-1">Past Classes</TabsTrigger>
          <TabsTrigger value="favorites" className="flex-1">Favorites</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="mt-6">
          {upcomingBookings.length > 0 ? (
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <div 
                  key={booking.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-48 h-32 overflow-hidden">
                      <img 
                        src={booking.image} 
                        alt={booking.className}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-semibold text-lg text-fitness-dark">{booking.className}</h3>
                        <div className="text-sm">
                          <Link to={`/classes/${booking.id}`}>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-fitness-primary hover:text-fitness-secondary hover:bg-fitness-light"
                            >
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-fitness-primary" />
                          <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-fitness-primary" />
                          <span>{booking.time}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-fitness-primary" />
                          <span>{booking.location}</span>
                        </div>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-fitness-primary" />
                          <span>{booking.instructor}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200"
                    >
                      Cancel Booking
                    </Button>
                    {booking.id === "1" && (
                      <Badge className="bg-fitness-primary">Today</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-fitness-dark mb-2">No upcoming classes</h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                You don't have any upcoming class bookings. Browse classes to find your next workout!
              </p>
              <Link to="/classes">
                <Button className="bg-fitness-primary hover:bg-fitness-secondary text-white">
                  Browse Classes
                </Button>
              </Link>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="past" className="mt-6">
          {pastBookings.length > 0 ? (
            <div className="space-y-4">
              {pastBookings.map((booking) => (
                <div 
                  key={booking.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-48 h-32 overflow-hidden">
                      <img 
                        src={booking.image} 
                        alt={booking.className}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-semibold text-lg text-fitness-dark">{booking.className}</h3>
                        <Badge 
                          className={booking.attended ? "bg-green-500" : "bg-gray-500"}
                        >
                          {booking.attended ? "Attended" : "Missed"}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-fitness-primary" />
                          <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-fitness-primary" />
                          <span>{booking.time}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-fitness-primary" />
                          <span>{booking.location}</span>
                        </div>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-fitness-primary" />
                          <span>{booking.instructor}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {booking.attended && (
                    <div className="bg-gray-50 px-4 py-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-fitness-primary hover:text-fitness-secondary hover:bg-fitness-light"
                      >
                        <Star className="h-4 w-4 mr-1" />
                        Leave a Review
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-fitness-dark mb-2">No past classes</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                You haven't attended any classes yet. Start your fitness journey today!
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="favorites" className="mt-6">
          <div className="text-center py-16">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Star className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-fitness-dark mb-2">No favorite classes</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              You haven't added any classes to your favorites yet. Heart the classes you love to find them here!
            </p>
            <Link to="/classes">
              <Button className="bg-fitness-primary hover:bg-fitness-secondary text-white">
                Browse Classes
              </Button>
            </Link>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-fitness-dark mb-6">Account Settings</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 border-b border-gray-100">
              <div className="flex items-center">
                <User className="h-5 w-5 text-fitness-primary mr-3" />
                <span className="font-medium">Personal Information</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
            
            <div className="flex justify-between items-center p-3 border-b border-gray-100">
              <div className="flex items-center">
                <CreditCard className="h-5 w-5 text-fitness-primary mr-3" />
                <span className="font-medium">Payment Methods</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
            
            <div className="flex justify-between items-center p-3 border-b border-gray-100">
              <div className="flex items-center">
                <Settings className="h-5 w-5 text-fitness-primary mr-3" />
                <span className="font-medium">Preferences</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
            
            <div className="flex justify-between items-center p-3">
              <div className="flex items-center text-red-500">
                <Trash className="h-5 w-5 mr-3" />
                <span className="font-medium">Delete Account</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
