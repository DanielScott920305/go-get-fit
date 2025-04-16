
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import PaymentForm from "@/components/payment/PaymentForm";

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  // In a real app, you would fetch details from API using the booking params
  const mockClassDetails = {
    name: "Power Yoga Flow",
    date: "Mon, Apr 28, 2025",
    time: "07:00 AM",
    location: "Downtown Studio",
  };
  
  const handlePaymentComplete = () => {
    navigate("/profile");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-fitness-dark hover:text-fitness-primary"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back</span>
        </button>
      </div>
      
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-fitness-dark mb-8 text-center">
            Complete Your Booking
          </h1>
          
          <PaymentForm 
            amount={15}
            classDetails={mockClassDetails}
            onPaymentComplete={handlePaymentComplete}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
