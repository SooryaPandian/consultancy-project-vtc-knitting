
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Home, Package } from 'lucide-react';

const OrderSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { order } = location.state || {};
  
  useEffect(() => {
    // If no order data, redirect to home
    if (!order) {
      navigate('/');
    }
  }, [order, navigate]);

  if (!order) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl text-center">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-vtc-darkbrown">
          Order Confirmed!
        </h1>
        
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex justify-between text-sm border-b pb-4">
                <span className="font-medium">Order ID:</span>
                <span>{order.id}</span>
              </div>
              
              <div className="flex justify-between text-sm border-b pb-4">
                <span className="font-medium">Date:</span>
                <span>{order.date}</span>
              </div>
              
              <div className="flex justify-between text-sm border-b pb-4">
                <span className="font-medium">Payment Method:</span>
                <span>
                  {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                </span>
              </div>
              
              <div className="flex justify-between text-sm border-b pb-4">
                <span className="font-medium">Shipping Address:</span>
                <span className="text-right">
                  {order.address.addressLine1}, 
                  {order.address.addressLine2 && ` ${order.address.addressLine2},`}<br />
                  {order.address.city}, {order.address.state} - {order.address.pincode}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="font-medium">Total Amount:</span>
                <span className="font-bold text-vtc-red">₹{order.amount.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => navigate('/')}
            variant="outline"
            className="flex items-center"
          >
            <Home className="mr-2 h-4 w-4" />
            Continue Shopping
          </Button>
          
          <Button 
            onClick={() => navigate('/profile')}
            className="bg-vtc-red hover:bg-vtc-brown flex items-center"
          >
            <Package className="mr-2 h-4 w-4" />
            Track Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
