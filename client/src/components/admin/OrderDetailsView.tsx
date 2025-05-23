
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, XCircle } from 'lucide-react';
import OrderStatusBadge from './OrderStatusBadge';
import type { Order } from './OrderTable';

interface OrderDetailsProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (orderId: string, status: string) => void;
}

const OrderDetailsView: React.FC<OrderDetailsProps> = ({
  order,
  isOpen,
  onClose,
  onUpdateStatus
}) => {
  if (!order) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            Order Details - {order.id}
            <span className="ml-2">
              <OrderStatusBadge status={order.status} size="sm" />
            </span>
          </DialogTitle>
          <DialogDescription>
            Placed on {order.date}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-500">Customer</p>
                <p className="font-medium">{order.customer}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment</p>
                <p className="font-medium">{order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p><OrderStatusBadge status={order.status} size="sm" /></p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="font-medium">₹{typeof order.amount === 'number' ? order.amount.toFixed(2) : order.amount}</p>
              </div>
            </div>
          </div>
          
          {/* Customer and Shipping info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Customer Information</h3>
              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <p className="font-medium">{order.customer}</p>
                <p className="text-sm text-gray-600">{order.email}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Shipping Address</h3>
              {order.address ? (
                <div className="bg-gray-50 p-4 rounded border border-gray-200 text-sm">
                  <p className="font-medium">{order.address.fullName}</p>
                  <p>{order.address.addressLine1}</p>
                  {order.address.addressLine2 && <p>{order.address.addressLine2}</p>}
                  <p>{order.address.city}, {order.address.state} - {order.address.pincode}</p>
                  <p className="mt-1">Phone: {order.address.phoneNumber}</p>
                </div>
              ) : (
                <div className="bg-gray-50 p-4 rounded border border-gray-200 text-sm">
                  <p className="text-gray-500">No shipping address available</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Order Items */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Order Items</h3>
            <div className="border rounded-md overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium">Product</th>
                    <th className="text-right px-4 py-3 font-medium">Price</th>
                    <th className="text-right px-4 py-3 font-medium">Quantity</th>
                    <th className="text-right px-4 py-3 font-medium">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {order.itemDetails && order.itemDetails.length > 0 ? (
                    order.itemDetails.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            {item.image && (
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="h-10 w-10 rounded object-cover mr-3"
                              />
                            )}
                            <div>
                              <p className="font-medium">{item.name}</p>
                              {item.category && <p className="text-xs text-gray-500">{item.category}</p>}
                            </div>
                          </div>
                        </td>
                        <td className="text-right px-4 py-3">₹{item.price}</td>
                        <td className="text-right px-4 py-3">{item.quantity}</td>
                        <td className="text-right px-4 py-3 font-medium">₹{(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-4 py-4 text-center text-gray-500">
                        No detailed item information available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-medium">₹{(typeof order.amount === 'number' ? order.amount - 40 : parseFloat(order.amount.toString().replace('₹', '')) - 40).toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Shipping</span>
              <span>₹40.00</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between">
              <span className="font-medium">Total</span>
              <span className="font-bold">₹{typeof order.amount === 'number' ? order.amount.toFixed(2) : order.amount}</span>
            </div>
          </div>
          
          <Separator />
          
          {/* Action Buttons */}
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                <Button
                  variant="outline" 
                  className="text-green-700 bg-green-50 hover:bg-green-100 border border-green-200"
                  onClick={() => {
                    onUpdateStatus(order.id, 'Delivered');
                    onClose();
                  }}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark as Delivered
                </Button>
              )}
              
              {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
                <Button
                  variant="outline"
                  className="text-red-700 bg-red-50 hover:bg-red-100 border border-red-200"
                  onClick={() => {
                    onUpdateStatus(order.id, 'Cancelled');
                    onClose();
                  }}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Cancel Order
                </Button>
              )}
            </div>
            
            <Button 
              variant="outline" 
              onClick={onClose}
            >
              Close
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsView;
