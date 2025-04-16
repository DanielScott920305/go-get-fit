
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import ClassCalendar from "@/components/classes/ClassCalendar";
import SearchBar from "@/components/classes/SearchBar";
import CategoryFilter from "@/components/classes/CategoryFilter";
import AdvancedFilters from "@/components/classes/AdvancedFilters";
import ClassResults from "@/components/classes/ClassResults";
import { ClassesProvider, useClassesContext } from "@/contexts/ClassesContext";

const ClassesPageContent: React.FC = () => {
  const { setSelectedDate, selectedDate } = useClassesContext();
  const isMobile = useIsMobile();
  
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
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
            <SearchBar />
            
            {/* Calendar for Mobile - Horizontal scrolling */}
            {isMobile && (
              <ClassCalendar 
                onDateSelect={handleDateSelect}
                selectedDate={selectedDate}
              />
            )}
            
            {/* Category Filters */}
            <CategoryFilter />
            
            {/* Advanced Filters (toggleable) */}
            <AdvancedFilters />
          </div>
          
          {/* Search Results */}
          <ClassResults />
        </div>
      </div>
    </div>
  );
};

const ClassesPage: React.FC = () => {
  return (
    <ClassesProvider>
      <ClassesPageContent />
    </ClassesProvider>
  );
};

export default ClassesPage;
