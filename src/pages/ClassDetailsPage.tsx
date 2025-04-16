
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Dumbbell, 
  Star, 
  Users, 
  ArrowLeft,
  Share2,
  Heart,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import BookingCalendar from "@/components/booking/BookingCalendar";

// Mock data for class details (in a real app, this would come from an API)
const classDetailsData = {
  id: "1",
  name: "Power Yoga Flow",
  images: [
    "https://images.unsplash.com/photo-1588286840104-8957b019727f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1570655652364-2e0a67455ac6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
  ],
  category: "Yoga",
  duration: "60 min",
  location: {
    name: "Downtown Studio",
    address: "123 Main St, Downtown",
    latitude: 40.7128,
    longitude: -74.0060,
  },
  instructor: {
    name: "Emma Wilson",
    image: "https://images.unsplash.com/photo-1594774959631-7c910af105c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    bio: "Certified yoga instructor with 8+ years of experience specializing in vinyasa and power yoga. Emma's classes focus on building strength, improving flexibility, and finding inner peace through movement.",
    rating: 4.9,
  },
  rating: 4.8,
  reviews: 124,
  price: 15,
  description: "Power Yoga Flow is a dynamic, fitness-based approach to vinyasa-style yoga. This class will challenge you with a sequence of postures designed to build strength, increase flexibility, and improve balance. Suitable for all levels, with modifications offered for beginners and advanced practitioners.",
  details: {
    intensity: "Moderate to High",
    level: "All Levels",
    benefits: ["Strength Building", "Flexibility", "Stress Reduction", "Balance"],
    brings: ["Yoga Mat (or rent one)", "Water Bottle", "Towel"],
    capacity: 20,
    available: 8,
  },
  schedule: [
    { day: "Monday", times: ["07:00 AM", "05:00 PM"] },
    { day: "Wednesday", times: ["07:00 AM", "05:00 PM"] },
    { day: "Friday", times: ["07:00 AM", "05:00 PM"] },
  ],
};

const ClassDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [bookingMode, setBookingMode] = useState(false);
  
  // In a real app, fetch class details using the ID
  const classDetails = classDetailsData;
  
  const handleBookingComplete = (date: Date, timeSlot: any) => {
    // Navigate to payment page (would be implemented in a real app)
    console.log("Booking completed for:", date, timeSlot);
    // In a real app, you would redirect to a payment page with the booking details
    // history.push(`/payment?class=${id}&date=${date}&time=${timeSlot.time}`);
  };

  return (
    <div className="space-y-8">
      {/* Back button */}
      <div>
        <Link to="/classes" className="flex items-center text-fitness-dark hover:text-fitness-primary">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back to Classes</span>
        </Link>
      </div>
      
      {/* Class Images and Main Info */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Images Section - 3/5 width on desktop */}
        <div className="lg:col-span-3 space-y-4">
          {/* Main Image */}
          <div className="rounded-xl overflow-hidden bg-gray-100 h-[400px]">
            <img 
              src={classDetails.images[activeImageIndex]} 
              alt={classDetails.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Thumbnail Images */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {classDetails.images.map((image, index) => (
              <button 
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={`rounded-lg overflow-hidden h-20 w-20 flex-shrink-0 border-2 transition-all ${
                  activeImageIndex === index 
                    ? "border-fitness-primary" 
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                <img 
                  src={image} 
                  alt={`${classDetails.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
          
          {/* Class Details on Desktop */}
          <div className="hidden lg:block space-y-6">
            <Tabs defaultValue="description">
              <TabsList className="w-full">
                <TabsTrigger value="description" className="flex-1">Description</TabsTrigger>
                <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
                <TabsTrigger value="schedule" className="flex-1">Schedule</TabsTrigger>
                <TabsTrigger value="instructor" className="flex-1">Instructor</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-4 space-y-4">
                <p className="text-gray-700">{classDetails.description}</p>
              </TabsContent>
              
              <TabsContent value="details" className="mt-4 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-fitness-dark">Intensity</h4>
                    <p className="text-gray-700">{classDetails.details.intensity}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-fitness-dark">Level</h4>
                    <p className="text-gray-700">{classDetails.details.level}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-fitness-dark">Class Size</h4>
                    <p className="text-gray-700">{classDetails.details.capacity} people</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-fitness-dark">Available Spots</h4>
                    <p className="text-gray-700">{classDetails.details.available} spots</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-fitness-dark">Benefits</h4>
                  <div className="flex flex-wrap gap-2">
                    {classDetails.details.benefits.map((benefit, index) => (
                      <span key={index} className="bg-fitness-light text-fitness-primary px-3 py-1 rounded-full text-sm">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-fitness-dark">What to Bring</h4>
                  <ul className="list-disc list-inside text-gray-700">
                    {classDetails.details.brings.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="schedule" className="mt-4">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left font-medium text-fitness-dark">Day</th>
                      <th className="py-2 text-left font-medium text-fitness-dark">Times</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classDetails.schedule.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 text-gray-700">{item.day}</td>
                        <td className="py-3 text-gray-700">
                          {item.times.join(", ")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TabsContent>
              
              <TabsContent value="instructor" className="mt-4">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img 
                      src={classDetails.instructor.image} 
                      alt={classDetails.instructor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-fitness-dark">{classDetails.instructor.name}</h3>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                      <span>{classDetails.instructor.rating} Instructor Rating</span>
                    </div>
                    <p className="text-gray-700">{classDetails.instructor.bio}</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Booking Section - 2/5 width on desktop */}
        <div className="lg:col-span-2">
          {!bookingMode ? (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-fitness-dark mb-1">{classDetails.name}</h1>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Badge className="bg-fitness-primary hover:bg-fitness-secondary mr-2">
                        {classDetails.category}
                      </Badge>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                        <span>{classDetails.rating}</span>
                        <span className="mx-1">•</span>
                        <span>{classDetails.reviews} reviews</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Heart className="h-5 w-5 text-gray-500" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-5 w-5 text-gray-500" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center text-gray-700">
                    <User className="h-5 w-5 text-fitness-primary mr-3" />
                    <span>Instructor: <span className="font-medium">{classDetails.instructor.name}</span></span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <MapPin className="h-5 w-5 text-fitness-primary mr-3" />
                    <span>{classDetails.location.name} - {classDetails.location.address}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Clock className="h-5 w-5 text-fitness-primary mr-3" />
                    <span>{classDetails.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Dumbbell className="h-5 w-5 text-fitness-primary mr-3" />
                    <span>Intensity: {classDetails.details.intensity}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Users className="h-5 w-5 text-fitness-primary mr-3" />
                    <span>{classDetails.details.available} spots available</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-700">Price per class</span>
                    <span className="text-2xl font-bold text-fitness-dark">${classDetails.price}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-fitness-primary hover:bg-fitness-secondary text-white"
                  size="lg"
                  onClick={() => setBookingMode(true)}
                >
                  Book Now
                </Button>
              </div>
              
              <div className="bg-gray-50 p-4 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-fitness-primary mr-2" />
                <span className="text-gray-700">
                  Classes run on <span className="font-medium">Mon, Wed, Fri</span>
                </span>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-fitness-dark">Book Your Class</h2>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setBookingMode(false)}
                  >
                    Cancel
                  </Button>
                </div>
                
                <BookingCalendar 
                  classId={classDetails.id}
                  className={classDetails.name}
                  onBookingComplete={handleBookingComplete}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Class Details on Mobile Only */}
      <div className="lg:hidden space-y-6">
        <Tabs defaultValue="description">
          <TabsList className="w-full">
            <TabsTrigger value="description" className="flex-1">Description</TabsTrigger>
            <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
            <TabsTrigger value="schedule" className="flex-1">Schedule</TabsTrigger>
            <TabsTrigger value="instructor" className="flex-1">Instructor</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-4 space-y-4">
            <p className="text-gray-700">{classDetails.description}</p>
          </TabsContent>
          
          <TabsContent value="details" className="mt-4 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-fitness-dark">Intensity</h4>
                <p className="text-gray-700">{classDetails.details.intensity}</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-fitness-dark">Level</h4>
                <p className="text-gray-700">{classDetails.details.level}</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-fitness-dark">Class Size</h4>
                <p className="text-gray-700">{classDetails.details.capacity} people</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-fitness-dark">Available Spots</h4>
                <p className="text-gray-700">{classDetails.details.available} spots</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-fitness-dark">Benefits</h4>
              <div className="flex flex-wrap gap-2">
                {classDetails.details.benefits.map((benefit, index) => (
                  <span key={index} className="bg-fitness-light text-fitness-primary px-3 py-1 rounded-full text-sm">
                    {benefit}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-fitness-dark">What to Bring</h4>
              <ul className="list-disc list-inside text-gray-700">
                {classDetails.details.brings.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="schedule" className="mt-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left font-medium text-fitness-dark">Day</th>
                  <th className="py-2 text-left font-medium text-fitness-dark">Times</th>
                </tr>
              </thead>
              <tbody>
                {classDetails.schedule.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 text-gray-700">{item.day}</td>
                    <td className="py-3 text-gray-700">
                      {item.times.join(", ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TabsContent>
          
          <TabsContent value="instructor" className="mt-4">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <img 
                  src={classDetails.instructor.image} 
                  alt={classDetails.instructor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-fitness-dark">{classDetails.instructor.name}</h3>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                  <span>{classDetails.instructor.rating} Instructor Rating</span>
                </div>
                <p className="text-gray-700">{classDetails.instructor.bio}</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClassDetailsPage;
