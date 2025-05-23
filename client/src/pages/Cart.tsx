import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { toast } from '../components/ui/use-toast';

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 text-vtc-darkbrown">
            Your Cart
          </h1>
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <ShoppingBag className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h2 className="text-xl font-medium text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button asChild className="bg-vtc-red hover:bg-vtc-brown">
              <Link to="/search">
                Start Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 text-vtc-darkbrown">
          Your Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 pb-0">
                <h2 className="text-lg font-medium text-gray-800 mb-4">
                  Cart Items ({items.length})
                </h2>
              </div>

              <div className="divide-y">
                {items.map((item) => (
                  <div key={item.id} className="p-6 flex flex-col sm:flex-row items-center sm:items-start">
                    <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 mb-4 sm:mb-0">
                      <img 
                        src={item.variants[item.variantIndex].images[0]|| item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-grow sm:ml-6 text-center sm:text-left">
                      <h3 className="font-medium text-gray-800">{item.name}</h3>
                      <p className="text-gray-500 text-sm">
                        {item.category} • {item.type}
                      </p>
                      <p className="text-gray-500 text-sm">
                        Color: {item.selectedColor}, Size: {item.selectedSize}
                      </p>
                      <p className="text-vtc-darkbrown font-bold mt-1">₹{item.price}</p>
                    </div>

                    <div className="mt-4 sm:mt-0 flex items-center">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="mx-3 w-8 text-center">{item.quantity}</span>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 ml-2 text-gray-500 hover:text-red-500"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary Column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3">
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
                    <span className="font-medium text-gray-700">Total</span>
                    <span className="font-bold text-vtc-darkbrown">₹{(getCartTotal() + 40).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Button 
                asChild
                className="w-full mt-6 bg-vtc-red hover:bg-vtc-brown"
              >
                <Link to="/checkout">
                  Proceed to Checkout
                </Link>
              </Button>

              <Button 
                asChild
                variant="outline" 
                className="w-full mt-4 border-vtc-red text-vtc-red hover:bg-vtc-red/10"
              >
                <Link to="/bulk-order">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Request Bulk Order
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
