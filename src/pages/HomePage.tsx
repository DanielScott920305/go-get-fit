
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Calendar, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import ClassCard from "@/components/classes/ClassCard";

// Mock data - in a real app, this would come from an API
const featuredClasses = [
  {
    id: "1",
    name: "Power Yoga Flow",
    image: "https://images.unsplash.com/photo-1588286840104-8957b019727f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Yoga",
    duration: "60 min",
    location: "Downtown Studio",
    instructor: "Emma Wilson",
    rating: 4.8,
    price: 15,
    spots: 20,
    spotsFilled: 12,
  },
  {
    id: "2",
    name: "HIIT Cardio Burn",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "HIIT",
    duration: "45 min",
    location: "Fitness Center",
    instructor: "Jason Taylor",
    rating: 4.7,
    price: 20,
    spots: 15,
    spotsFilled: 10,
  },
  {
    id: "3",
    name: "Spin & Sculpt",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Cycling",
    duration: "50 min",
    location: "Cycle Studio",
    instructor: "Sarah Chen",
    rating: 4.9,
    price: 18,
    spots: 25,
    spotsFilled: 20,
  },
  {
    id: "4",
    name: "Strength Foundations",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Strength",
    duration: "55 min",
    location: "Power Gym",
    instructor: "Mike Johnson",
    rating: 4.6,
    price: 22,
    spots: 12,
    spotsFilled: 8,
  },
];

const HomePage: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80')",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-fitness-dark/80 to-fitness-dark/40"></div>
        <div className="relative z-10 py-24 px-6 md:px-12 max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Find Your Perfect <span className="text-fitness-primary">Fitness</span> Class
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl">
            Discover and book fitness classes near you. From yoga to HIIT, find the perfect
            workout to match your fitness goals.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/classes">
              <Button className="bg-fitness-primary hover:bg-fitness-secondary text-white text-lg px-8 py-6">
                Browse Classes
              </Button>
            </Link>
            <Link to="/locations">
              <Button variant="outline" className="bg-white/10 text-white border-white hover:bg-white/20 text-lg px-8 py-6">
                Find Locations
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <h2 className="text-3xl font-bold text-fitness-dark mb-10 text-center">
          How GoGetFit Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-fitness-light rounded-full flex items-center justify-center mb-4">
              <MapPin className="h-8 w-8 text-fitness-primary" />
            </div>
            <h3 className="text-xl font-bold text-fitness-dark mb-2">Find Classes</h3>
            <p className="text-gray-600">
              Discover fitness classes near you on our interactive map or browse by category.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-fitness-light rounded-full flex items-center justify-center mb-4">
              <Calendar className="h-8 w-8 text-fitness-primary" />
            </div>
            <h3 className="text-xl font-bold text-fitness-dark mb-2">Book Your Spot</h3>
            <p className="text-gray-600">
              Choose a time that works for you and book your spot in just a few clicks.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-fitness-light rounded-full flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-fitness-primary" />
            </div>
            <h3 className="text-xl font-bold text-fitness-dark mb-2">Attend & Enjoy</h3>
            <p className="text-gray-600">
              Show up, enjoy your class, and track your fitness journey all in one place.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Classes */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-fitness-dark">Featured Classes</h2>
          <Link
            to="/classes"
            className="flex items-center text-fitness-primary hover:text-fitness-secondary font-medium"
          >
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredClasses.map((classItem) => (
            <ClassCard key={classItem.id} {...classItem} />
          ))}
        </div>
      </section>

      {/* Join Community */}
      <section className="bg-fitness-light rounded-2xl p-8 md:p-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="mb-6 md:mb-0 md:mr-6">
            <h2 className="text-3xl font-bold text-fitness-dark mb-4">
              Join Our Fitness Community
            </h2>
            <p className="text-gray-600 max-w-md">
              Get exclusive access to special classes, discounts, and fitness events in your area.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Button className="bg-fitness-primary hover:bg-fitness-secondary text-white px-8 py-6">
              Sign Up Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
