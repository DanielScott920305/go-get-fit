
import React, { createContext, useContext, useState, ReactNode } from "react";
import { format } from "date-fns";

// Mock data for classes
export const classesData = [
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
export const categories = [
  "All",
  "Yoga",
  "HIIT",
  "Cycling",
  "Strength",
  "Pilates",
  "Boxing",
  "CrossFit",
];

export interface ClassItem {
  id: string;
  name: string;
  image: string;
  category: string;
  duration: string;
  location: string;
  instructor: string;
  rating: number;
  price: number;
  spots: number;
  spotsFilled: number;
}

interface ClassesContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  filteredClasses: ClassItem[];
  sortOrder: string;
  setSortOrder: (order: string) => void;
}

const ClassesContext = createContext<ClassesContextType | undefined>(undefined);

export const useClassesContext = () => {
  const context = useContext(ClassesContext);
  if (!context) {
    throw new Error("useClassesContext must be used within a ClassesProvider");
  }
  return context;
};

interface ClassesProviderProps {
  children: ReactNode;
}

export const ClassesProvider: React.FC<ClassesProviderProps> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [sortOrder, setSortOrder] = useState("Recommended");

  // Filter classes based on search query, selected category, and date
  const filteredClasses = classesData.filter((classItem) => {
    const matchesSearch = classItem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        classItem.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        classItem.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || classItem.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <ClassesContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        showFilters,
        setShowFilters,
        selectedDate,
        setSelectedDate,
        filteredClasses,
        sortOrder,
        setSortOrder,
      }}
    >
      {children}
    </ClassesContext.Provider>
  );
};
