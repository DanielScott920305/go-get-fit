
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Star, ChevronRight, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LocationMap from "@/components/map/LocationMap";

// Mock data for locations
const locationsData = [
  {
    id: "1",
    name: "Downtown Fitness Center",
    address: "123 Main St, Downtown",
    latitude: 40.7128,
    longitude: -74.0060,
    classes: 15,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1577221084712-45b0445d2b00?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    amenities: ["Parking", "Showers", "Lockers"],
  },
  {
    id: "2",
    name: "Uptown Yoga Studio",
    address: "456 Park Ave, Uptown",
    latitude: 40.7282,
    longitude: -73.9942,
    classes: 10,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    amenities: ["Meditation Room", "Mats Provided", "Tea Bar"],
  },
  {
    id: "3",
    name: "East Side Gym",
    address: "789 Broadway, East Side",
    latitude: 40.7191,
    longitude: -73.9800,
    classes: 20,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    amenities: ["Pool", "Sauna", "Personal Trainers"],
  },
  {
    id: "4",
    name: "West Side Pilates",
    address: "321 9th Ave, West Side",
    latitude: 40.7468,
    longitude: -74.0045,
    classes: 8,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1623874514711-0f321325f318?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    amenities: ["Private Rooms", "Equipment Provided", "AC"],
  },
  {
    id: "5",
    name: "Midtown Boxing Club",
    address: "555 7th Ave, Midtown",
    latitude: 40.7549,
    longitude: -73.9840,
    classes: 12,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1517344884509-a0c97ec11bcc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    amenities: ["Boxing Ring", "Heavy Bags", "Gloves Provided"],
  },
];

const LocationsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  
  const filteredLocations = locationsData.filter((location) =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.address.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleLocationSelect = (location: any) => {
    setSelectedLocation(location.id);
    // Scroll to the location in the list if on mobile
    if (window.innerWidth < 768) {
      const element = document.getElementById(`location-${location.id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-fitness-dark mb-6">Find Fitness Locations</h1>
      
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search locations..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filters
        </Button>
      </div>
      
      {/* Map and List View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map (takes up more space on larger screens) */}
        <div className="lg:col-span-2 order-2 lg:order-1">
          <LocationMap 
            locations={filteredLocations}
            onLocationSelect={handleLocationSelect}
          />
        </div>
        
        {/* Locations List */}
        <div className="order-1 lg:order-2">
          <h2 className="text-xl font-semibold text-fitness-dark mb-4">
            {filteredLocations.length} Locations Found
          </h2>
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {filteredLocations.map((location) => (
              <div 
                key={location.id}
                id={`location-${location.id}`}
                className={`p-4 rounded-lg border transition-all ${
                  selectedLocation === location.id 
                    ? "border-fitness-primary bg-fitness-light" 
                    : "border-gray-200 hover:border-fitness-primary"
                }`}
              >
                <div className="flex gap-3">
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={location.image} 
                      alt={location.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-fitness-dark">{location.name}</h3>
                    <div className="flex items-center text-sm text-gray-500 mb-1">
                      <MapPin className="h-4 w-4 mr-1 text-fitness-primary" />
                      <span>{location.address}</span>
                    </div>
                    <div className="flex items-center text-sm mb-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="font-medium">{location.rating}</span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-gray-600">{location.classes} Classes</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {location.amenities.map((amenity, index) => (
                        <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-fitness-primary hover:text-fitness-secondary hover:bg-fitness-light"
                    onClick={() => handleLocationSelect(location)}
                  >
                    View on Map
                  </Button>
                  <Link to={`/locations/${location.id}`}>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-fitness-dark hover:bg-gray-100 flex items-center"
                    >
                      See Classes <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationsPage;
