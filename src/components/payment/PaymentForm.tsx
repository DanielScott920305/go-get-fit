
import React, { useState } from "react";
import { CreditCard, Lock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PaymentFormProps {
  amount: number;
  classDetails: {
    name: string;
    date: string;
    time: string;
    location: string;
  };
  onPaymentComplete?: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  amount,
  classDetails,
  onPaymentComplete,
}) => {
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "processing" | "success" | "error"
  >("idle");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentStatus("processing");

    // Simulate payment processing
    setTimeout(() => {
      setPaymentStatus("success");
      if (onPaymentComplete) {
        setTimeout(onPaymentComplete, 1500);
      }
    }, 2000);
  };

  if (paymentStatus === "success") {
    return (
      <div className="text-center py-8">
        <div className="mx-auto w-16 h-16 mb-4 text-green-500">
          <CheckCircle className="w-full h-full" />
        </div>
        <h2 className="text-2xl font-bold text-fitness-dark mb-2">
          Payment Successful!
        </h2>
        <p className="text-gray-600 mb-6">
          Your booking for {classDetails.name} has been confirmed.
        </p>
        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
          <h3 className="font-semibold mb-2">Booking Details:</h3>
          <p><span className="font-medium">Class:</span> {classDetails.name}</p>
          <p><span className="font-medium">Date:</span> {classDetails.date}</p>
          <p><span className="font-medium">Time:</span> {classDetails.time}</p>
          <p><span className="font-medium">Location:</span> {classDetails.location}</p>
        </div>
        <Button
          className="bg-fitness-primary hover:bg-fitness-secondary text-white"
          onClick={onPaymentComplete}
        >
          View Your Schedule
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-fitness-dark">
          Payment Details
        </h2>
        <div className="flex items-center text-gray-500 text-sm">
          <Lock className="h-4 w-4 mr-1" />
          <span>Secure Payment</span>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="flex justify-between mb-2">
          <span className="font-medium">{classDetails.name}</span>
          <span className="font-bold">${amount.toFixed(2)}</span>
        </div>
        <div className="text-sm text-gray-600">
          <p>{classDetails.date} at {classDetails.time}</p>
          <p>{classDetails.location}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="card-number">Card Number</Label>
          <div className="relative">
            <Input
              id="card-number"
              name="number"
              placeholder="1234 5678 9012 3456"
              value={cardDetails.number}
              onChange={handleInputChange}
              required
              className="pl-10"
              maxLength={19}
            />
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="card-name">Cardholder Name</Label>
          <Input
            id="card-name"
            name="name"
            placeholder="John Doe"
            value={cardDetails.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="card-expiry">Expiry Date</Label>
            <Input
              id="card-expiry"
              name="expiry"
              placeholder="MM/YY"
              value={cardDetails.expiry}
              onChange={handleInputChange}
              required
              maxLength={5}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="card-cvc">CVC</Label>
            <Input
              id="card-cvc"
              name="cvc"
              placeholder="123"
              value={cardDetails.cvc}
              onChange={handleInputChange}
              required
              maxLength={3}
              type="password"
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-fitness-primary hover:bg-fitness-secondary text-white"
          size="lg"
          disabled={paymentStatus === "processing"}
        >
          {paymentStatus === "processing" ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            `Pay $${amount.toFixed(2)}`
          )}
        </Button>
      </form>
    </div>
  );
};

export default PaymentForm;
