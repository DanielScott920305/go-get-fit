
import React from "react";
import { Dumbbell, Calendar, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useClassesContext } from "@/contexts/ClassesContext";

const AdvancedFilters: React.FC = () => {
  const { showFilters } = useClassesContext();

  if (!showFilters) return null;

  return (
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
  );
};

export default AdvancedFilters;
