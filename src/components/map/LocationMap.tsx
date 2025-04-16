
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from "@/components/ui/button";

// You would get this from an environment variable in a real app
const MAPBOX_TOKEN = 'pk.YOUR_MAPBOX_TOKEN_HERE'; // Replace with an actual token

interface Location {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  classes: number;
  rating: number;
}

interface LocationMapProps {
  locations: Location[];
  onLocationSelect?: (location: Location) => void;
}

const LocationMap: React.FC<LocationMapProps> = ({ 
  locations,
  onLocationSelect 
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  
  // Initialize the map
  useEffect(() => {
    if (!mapContainer.current) return;
    
    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    const initialLocation = locations.length > 0 
      ? { lat: locations[0].latitude, lng: locations[0].longitude }
      : { lat: 40.7128, lng: -74.0060 }; // Default to NYC
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [initialLocation.lng, initialLocation.lat],
      zoom: 12
    });
    
    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
    // Clean up on unmount
    return () => {
      if (map.current) map.current.remove();
    };
  }, []);
  
  // Add markers when locations change or map is initialized
  useEffect(() => {
    if (!map.current) return;
    
    // Remove any existing markers
    const markers = document.querySelectorAll('.mapboxgl-marker');
    markers.forEach(marker => marker.remove());
    
    // Add markers for each location
    locations.forEach(location => {
      // Create custom marker element
      const markerEl = document.createElement('div');
      markerEl.className = 'text-fitness-primary hover:text-fitness-secondary cursor-pointer pulse-on-hover';
      markerEl.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="fill-current opacity-80">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      `;
      
      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="p-2 min-w-[200px]">
          <h3 class="font-bold text-[#1A1F2C]">${location.name}</h3>
          <p class="text-sm text-gray-600 mb-2">${location.address}</p>
          <div class="flex justify-between text-sm">
            <span>${location.classes} classes</span>
            <span>⭐ ${location.rating.toFixed(1)}</span>
          </div>
          <button 
            class="w-full mt-3 bg-[#8B5CF6] hover:bg-[#7E69AB] text-white px-3 py-1 rounded-md text-sm"
            id="view-location-${location.id}"
          >
            View Classes
          </button>
        </div>
      `);
      
      // Add marker to map
      const marker = new mapboxgl.Marker(markerEl)
        .setLngLat([location.longitude, location.latitude])
        .setPopup(popup)
        .addTo(map.current!);
      
      // Handle click events on the popup button
      marker.getElement().addEventListener('click', () => {
        setSelectedLocation(location);
      });
      
      // Add event listener for the button inside popup
      popup.on('open', () => {
        document.getElementById(`view-location-${location.id}`)?.addEventListener('click', () => {
          if (onLocationSelect) onLocationSelect(location);
        });
      });
    });
  }, [locations, onLocationSelect]);
  
  return (
    <div className="h-[600px] w-full rounded-xl overflow-hidden shadow-lg">
      <div ref={mapContainer} className="h-full w-full" />
    </div>
  );
};

export default LocationMap;
