
import React from "react";
import { Badge } from "@/components/ui/badge";
import { useClassesContext } from "@/contexts/ClassesContext";
import { categories } from "@/contexts/ClassesContext";

const CategoryFilter: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useClassesContext();

  return (
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
  );
};

export default CategoryFilter;
