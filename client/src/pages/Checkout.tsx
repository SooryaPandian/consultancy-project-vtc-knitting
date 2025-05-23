import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import { useAuth } from '../components/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { ShoppingBag, CreditCard, Wallet, ArrowLeft, Truck } from 'lucide-react';

interface AddressForm {
  fullName: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
}

const Checkout: React.FC = () => {
  const { items, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [addressForm, setAddressForm] = useState<AddressForm>({
    fullName: user?.name || '',
    phoneNumber: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('online');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAddressForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);

    // Prepare order object for backend
    const order = {
      customer: addressForm.fullName,
      email: user?.email || '',
      date: new Date().toISOString().split('T')[0],
      amount: getCartTotal() + 40, // Adding shipping
      items: items.length,
      itemDetails: items.map(item => ({
        productId: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize,
      })),
      status: 'Pending',
      address: {
        fullName: addressForm.fullName,
        phoneNumber: addressForm.phoneNumber,
        addressLine1: addressForm.addressLine1,
        addressLine2: addressForm.addressLine2,
        city: addressForm.city,
        state: addressForm.state,
        pincode: addressForm.pincode,
      },
      paymentMethod,
    };

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add auth headers if needed
        },
        body: JSON.stringify(order),
        credentials: 'include', // if using cookies/session
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Order failed');
      }

      clearCart();
      navigate('/order-success', { state: { order: data.order } });
    } catch (error: any) {
      toast({
        title: 'Order Failed',
        description: error.message || 'Could not place order',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={() => navigate('/cart')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Cart
        </Button>

        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-vtc-darkbrown">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping Details */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Truck className="h-5 w-5 mr-2 text-vtc-red" />
                    Shipping Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={addressForm.fullName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        value={addressForm.phoneNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="addressLine1">Address Line 1</Label>
                    <Input
                      id="addressLine1"
                      name="addressLine1"
                      value={addressForm.addressLine1}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
                    <Input
                      id="addressLine2"
                      name="addressLine2"
                      value={addressForm.addressLine2}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={addressForm.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        name="state"
                        value={addressForm.state}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pincode">PIN Code</Label>
                      <Input
                        id="pincode"
                        name="pincode"
                        value={addressForm.pincode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-vtc-red" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup 
                    value={paymentMethod} 
                    onValueChange={(value) => setPaymentMethod(value as 'cod' | 'online')}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2 border rounded-md p-4 bg-yellow-50 cursor-not-allowed opacity-60 relative">
                      <RadioGroupItem value="cod" id="cod" disabled />
                      <Label htmlFor="cod" className="flex items-center cursor-not-allowed">
                        <Wallet className="h-5 w-5 mr-2" />
                        Cash on Delivery
                        <span className="ml-2 text-xs text-yellow-700 font-semibold">(Currently unavailable)</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-4 hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value="online" id="online"/>
                      <Label htmlFor="online" className="flex items-center cursor-pointer">
                        <CreditCard className="h-5 w-5 mr-2" />
                        Online Payment (Credit/Debit Card, UPI)
                      </Label>
                    </div>
                  </RadioGroup>
                  <div className="mt-2 text-xs text-yellow-700 flex items-center">
                    <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
                    </svg>
                    Cash on Delivery is temporarily disabled. Please use Online Payment.
                  </div>
                </CardContent>
              </Card>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <ShoppingBag className="h-5 w-5 mr-2 text-vtc-red" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.name} x {item.quantity}</span>
                      <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  
                  <Separator className="my-3" />
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">₹40.00</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">Total</span>
                      <span className="font-bold text-vtc-darkbrown">₹{(getCartTotal() + 40).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full mt-6 bg-vtc-red hover:bg-vtc-brown"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  type="button"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    `Place Order - ₹${(getCartTotal() + 40).toFixed(2)}`
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
