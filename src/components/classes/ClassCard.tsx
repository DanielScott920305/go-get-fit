
import React from "react";
import { Link } from "react-router-dom";
import { Clock, MapPin, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ClassCardProps {
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

const ClassCard: React.FC<ClassCardProps> = ({
  id,
  name,
  image,
  category,
  duration,
  location,
  instructor,
  rating,
  price,
  spots,
  spotsFilled,
}) => {
  return (
    <div className="fitness-card overflow-hidden">
      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <Badge
          className="absolute top-3 right-3 bg-fitness-primary hover:bg-fitness-secondary"
          variant="secondary"
        >
          {category}
        </Badge>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-fitness-dark mb-1 line-clamp-1">
          {name}
        </h3>
        <p className="text-sm text-gray-500 mb-3">with {instructor}</p>

        {/* Meta Information */}
        <div className="flex flex-wrap gap-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center mr-4">
            <Clock className="w-4 h-4 mr-1 text-fitness-primary" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center mr-4">
            <MapPin className="w-4 h-4 mr-1 text-fitness-primary" />
            <span className="truncate max-w-[120px]">{location}</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1 text-fitness-primary" />
            <span>
              {spotsFilled}/{spots} spots
            </span>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 mr-1 fill-yellow-400" />
            <span className="font-medium">{rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-fitness-dark">${price}</span>
            <Link to={`/classes/${id}`}>
              <Button
                className="bg-fitness-primary hover:bg-fitness-secondary text-white"
                size="sm"
              >
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
