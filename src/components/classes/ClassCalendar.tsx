
import React, { useState } from "react";
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

type ClassCalendarProps = {
  onDateSelect: (date: Date) => void;
  selectedDate: Date | null;
  className?: string;
};

const ClassCalendar: React.FC<ClassCalendarProps> = ({
  onDateSelect,
  selectedDate,
  className,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const isMobile = useIsMobile();
  
  const firstDayOfMonth = startOfMonth(currentMonth);
  const lastDayOfMonth = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });
  
  const goToPreviousMonth = () => {
    const previousMonth = new Date(currentMonth);
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    setCurrentMonth(previousMonth);
  };
  
  const goToNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };
  
  // For mobile view, show next 14 days
  const nextTwoWeeks = Array.from({ length: 14 }, (_, i) => addDays(new Date(), i));

  return (
    <div className={cn("bg-white rounded-lg border border-gray-200 shadow-sm", className)}>
      {isMobile ? (
        // Mobile horizontal scrolling date picker
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-3">Select Date</h3>
          <div className="flex overflow-x-auto pb-2 scrollbar-hide space-x-2">
            {nextTwoWeeks.map((date) => (
              <button
                key={date.toString()}
                onClick={() => onDateSelect(date)}
                className={cn(
                  "flex flex-col items-center p-2 rounded-lg min-w-[70px] border transition-colors",
                  isToday(date) && !isSameDay(date, selectedDate) && "border-fitness-primary",
                  isSameDay(date, selectedDate) ? "bg-fitness-primary text-white border-fitness-primary" : "bg-white hover:bg-gray-50 border-gray-200"
                )}
              >
                <span className="text-xs font-medium">{format(date, "EEE")}</span>
                <span className="text-xl font-bold">{format(date, "d")}</span>
                <span className="text-xs">{format(date, "MMM")}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        // Desktop calendar view
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPreviousMonth}
              className="h-7 w-7"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h3 className="font-medium text-center">
              {format(currentMonth, "MMMM yyyy")}
            </h3>
            <Button
              variant="outline"
              size="icon"
              onClick={goToNextMonth}
              className="h-7 w-7"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-7 gap-1 text-center">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-sm font-medium text-gray-500 py-1">
                {day}
              </div>
            ))}
            
            {Array.from({ length: firstDayOfMonth.getDay() }).map((_, index) => (
              <div key={`empty-start-${index}`} className="h-10" />
            ))}
            
            {daysInMonth.map((day) => {
              const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;
              
              return (
                <button
                  key={day.toString()}
                  onClick={() => onDateSelect(day)}
                  className={cn(
                    "h-10 w-10 rounded-full flex items-center justify-center mx-auto transition-colors",
                    isToday(day) && !isSelected && "border border-fitness-primary",
                    isSelected
                      ? "bg-fitness-primary text-white"
                      : "hover:bg-gray-100"
                  )}
                >
                  {format(day, "d")}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassCalendar;
