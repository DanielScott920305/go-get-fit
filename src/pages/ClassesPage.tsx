
import React, { useState } from "react";
import { Filter, Search, Dumbbell, Calendar, Users } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import ClassCard from "@/components/classes/ClassCard";
import ClassCalendar from "@/components/classes/ClassCalendar";
import { useIsMobile } from "@/hooks/use-mobile";

// Mock data for classes
const classesData = [
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
  {
    id: "5",
    name: "Pilates Core Focus",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Pilates",
    duration: "50 min",
    location: "West Side Pilates",
    instructor: "Lisa Wong",
    rating: 4.9,
    price: 25,
    spots: 15,
    spotsFilled: 12,
  },
  {
    id: "6",
    name: "Boxing Fundamentals",
    image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Boxing",
    duration: "60 min",
    location: "Midtown Boxing Club",
    instructor: "Carlos Rodriguez",
    rating: 4.5,
    price: 22,
    spots: 10,
    spotsFilled: 7,
  },
  {
    id: "7",
    name: "Gentle Morning Yoga",
    image: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Yoga",
    duration: "45 min",
    location: "Uptown Yoga Studio",
    instructor: "David Kim",
    rating: 4.6,
    price: 15,
    spots: 20,
    spotsFilled: 15,
  },
  {
    id: "8",
    name: "CrossFit WOD",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "CrossFit",
    duration: "60 min",
    location: "East Side Gym",
    instructor: "Alex Martinez",
    rating: 4.7,
    price: 24,
    spots: 12,
    spotsFilled: 9,
  },
];

// Categories for filtering
const categories = [
  "All",
  "Yoga",
  "HIIT",
  "Cycling",
  "Strength",
  "Pilates",
  "Boxing",
  "CrossFit",
];

const ClassesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const isMobile = useIsMobile();
  
  // Filter classes based on search query, selected category, and date
  const filteredClasses = classesData.filter((classItem) => {
    const matchesSearch = classItem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        classItem.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        classItem.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || classItem.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    // In a real app, you would filter classes by this date
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-fitness-dark mb-2">Browse Classes</h1>
        <p className="text-gray-600">
          Find and book fitness classes that match your schedule and goals
        </p>
      </div>
      
      {/* Calendar for Desktop & Search and Filter */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar - Only visible on desktop as a sidebar */}
        {!isMobile && (
          <div className="lg:col-span-1">
            <ClassCalendar 
              onDateSelect={handleDateSelect}
              selectedDate={selectedDate}
              className="sticky top-6"
            />
          </div>
        )}
        
        {/* Search and Classes - Takes full width on mobile, 2/3 on desktop */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search and Filter */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search classes, instructors, or locations..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-5 w-5" />
                <span>Filters</span>
              </Button>
            </div>
            
            {/* Calendar for Mobile - Horizontal scrolling */}
            {isMobile && (
              <ClassCalendar 
                onDateSelect={handleDateSelect}
                selectedDate={selectedDate}
              />
            )}
            
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`cursor-pointer text-sm py-1 px-3 ${
                    selectedCategory === category 
                      ? "bg-fitness-primary hover:bg-fitness-secondary"
                      : "hover:bg-fitness-light"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
            
            {/* Advanced Filters (toggleable) */}
            {showFilters && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="space-y-2">
                  <div className="flex items-center text-sm font-medium text-fitness-dark">
                    <Dumbbell className="h-4 w-4 mr-2 text-fitness-primary" />
                    Intensity Level
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="cursor-pointer hover:bg-fitness-light">Beginner</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-fitness-light">Intermediate</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-fitness-light">Advanced</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm font-medium text-fitness-dark">
                    <Calendar className="h-4 w-4 mr-2 text-fitness-primary" />
                    Time of Day
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="cursor-pointer hover:bg-fitness-light">Morning</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-fitness-light">Afternoon</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-fitness-light">Evening</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm font-medium text-fitness-dark">
                    <Users className="h-4 w-4 mr-2 text-fitness-primary" />
                    Class Size
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="cursor-pointer hover:bg-fitness-light">Small</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-fitness-light">Medium</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-fitness-light">Large</Badge>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Search Results */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-fitness-dark">
                {filteredClasses.length} Classes Found
                {selectedDate && (
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    on {format(selectedDate, "MMM d, yyyy")}
                  </span>
                )}
              </h2>
              <div className="flex items-center text-sm text-gray-500">
                <span className="hidden sm:inline">Sort by:</span>
                <select className="ml-2 bg-transparent border-none focus:outline-none text-fitness-primary font-medium">
                  <option>Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Rating</option>
                </select>
              </div>
            </div>
            
            {/* Grid of Class Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6">
              {filteredClasses.map((classItem) => (
                <ClassCard key={classItem.id} {...classItem} />
              ))}
            </div>
            
            {/* Empty State */}
            {filteredClasses.length === 0 && (
              <div className="text-center py-16 px-4">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-fitness-dark mb-2">No classes found</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  We couldn't find any classes matching your search. Try adjusting your filters or search query.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassesPage;
