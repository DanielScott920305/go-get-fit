
import React, { useState } from "react";
import { format, addDays, isSameDay, isAfter, startOfToday } from "date-fns";
import { Calendar, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface BookingCalendarProps {
  classId: string;
  className: string;
  onBookingComplete?: (date: Date, timeSlot: TimeSlot) => void;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({
  classId,
  className,
  onBookingComplete,
}) => {
  const today = startOfToday();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  
  // Generate next 14 days for selection
  const dateRange = Array.from({ length: 14 }, (_, i) => addDays(today, i));
  
  // Example time slots - in a real app, these would come from an API based on the selected date
  const timeSlots: TimeSlot[] = [
    { id: "1", time: "07:00 AM", available: true },
    { id: "2", time: "09:00 AM", available: true },
    { id: "3", time: "11:00 AM", available: false },
    { id: "4", time: "01:00 PM", available: true },
    { id: "5", time: "03:00 PM", available: true },
    { id: "6", time: "05:00 PM", available: false },
    { id: "7", time: "07:00 PM", available: true },
  ];

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null); // Reset time slot when date changes
  };

  const handleTimeSelect = (timeSlot: TimeSlot) => {
    if (!timeSlot.available) return;
    setSelectedTimeSlot(timeSlot);
  };

  const handleBooking = () => {
    if (selectedDate && selectedTimeSlot && onBookingComplete) {
      onBookingComplete(selectedDate, selectedTimeSlot);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-fitness-primary" />
          <h3 className="text-xl font-semibold">Select Date</h3>
        </div>
        
        <div className="relative">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            {dateRange.map((date) => (
              <button
                key={date.toString()}
                onClick={() => handleDateSelect(date)}
                className={cn(
                  "flex flex-col items-center p-2 rounded-lg min-w-[70px] border transition-colors",
                  isSameDay(date, selectedDate || today)
                    ? "bg-fitness-primary text-white border-fitness-primary"
                    : "bg-white hover:bg-gray-50 border-gray-200"
                )}
              >
                <span className="text-xs font-medium">
                  {format(date, "EEE")}
                </span>
                <span className="text-xl font-bold">
                  {format(date, "d")}
                </span>
                <span className="text-xs">
                  {format(date, "MMM")}
                </span>
              </button>
            ))}
          </div>
          
          <div className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-white to-transparent w-10 z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 bg-gradient-to-l from-white to-transparent w-10 z-10 pointer-events-none" />
        </div>
      </div>

      {selectedDate && (
        <div className="space-y-2">
          <div className="flex items-center">
            <Clock className="mr-2 h-5 w-5 text-fitness-primary" />
            <h3 className="text-xl font-semibold">Select Time</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {timeSlots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => handleTimeSelect(slot)}
                disabled={!slot.available}
                className={cn(
                  "p-3 rounded-lg border text-center transition-colors",
                  slot.available
                    ? selectedTimeSlot?.id === slot.id
                      ? "bg-fitness-primary text-white border-fitness-primary"
                      : "bg-white hover:bg-gray-50 border-gray-200"
                    : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                )}
              >
                <span className="font-medium">{slot.time}</span>
                {!slot.available && (
                  <p className="text-xs mt-1">Unavailable</p>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      <Button
        className="w-full bg-fitness-primary hover:bg-fitness-secondary text-white"
        size="lg"
        disabled={!selectedDate || !selectedTimeSlot}
        onClick={handleBooking}
      >
        Book Class
      </Button>
    </div>
  );
};

export default BookingCalendar;
