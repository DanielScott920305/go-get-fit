
import React from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useClassesContext } from "@/contexts/ClassesContext";

const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery, showFilters, setShowFilters } = useClassesContext();

  return (
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
  );
};

export default SearchBar;
