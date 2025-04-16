
import React from "react";
import { Search } from "lucide-react";
import { format } from "date-fns";
import ClassCard from "@/components/classes/ClassCard";
import { useClassesContext } from "@/contexts/ClassesContext";

const ClassResults: React.FC = () => {
  const { filteredClasses, selectedDate, sortOrder, setSortOrder } = useClassesContext();

  return (
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
          <select 
            className="ml-2 bg-transparent border-none focus:outline-none text-fitness-primary font-medium"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
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
  );
};

export default ClassResults;
