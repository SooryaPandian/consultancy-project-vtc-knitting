import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { Search, FileDown, Filter, Eye, Truck, XCircle, CheckCircle, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { BACKEND_URL } from '../../data/config';

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/orders`, {
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Failed to fetch orders');
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        toast({
          title: 'Error',
          description: 'Failed to fetch orders from backend',
          variant: 'destructive',
        });
        setOrders([]);
      }
    };
    fetchOrders();
  }, []);
  
  const statusColors = {
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Processing': 'bg-blue-100 text-blue-800',
    'Shipped': 'bg-purple-100 text-purple-800',
    'Delivered': 'bg-green-100 text-green-800',
    'Cancelled': 'bg-red-100 text-red-800'
  };
  
  // Filter orders based on search term and status
  const filteredOrders = orders.filter(order => 
    (order.customer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
     order.email?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'all' || order.status === statusFilter)
  );
  
  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus } 
        : order
    );
    
    setOrders(updatedOrders);
    
    // Update in localStorage too
    localStorage.setItem('vtcOrders', JSON.stringify(updatedOrders));
    
    toast({
      title: `Order ${newStatus}`,
      description: `Order ${orderId} has been marked as ${newStatus.toLowerCase()}`,
    });
  };
  
  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsOrderDetailsOpen(true);
  };
  
  const getStatusIcon = (status) => {
    switch(status) {
      case 'Pending':
        return <Clock className="h-4 w-4" />;
      case 'Processing':
        return <Clock className="h-4 w-4" />;
      case 'Shipped':
        return <Truck className="h-4 w-4" />;
      case 'Delivered':
        return <CheckCircle className="h-4 w-4" />;
      case 'Cancelled':
        return <XCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Orders</h2>
          <p className="text-sm text-gray-500">View and manage customer orders</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              className="pl-8"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex-1 min-w-[150px]">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  <span>{statusFilter === 'all' ? 'All Status' : statusFilter}</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Shipped">Shipped</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button variant="outline" className="whitespace-nowrap">
            <FileDown className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      {/* Orders Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-3 font-medium text-gray-500">Order ID</th>
                <th className="px-6 py-3 font-medium text-gray-500">Customer</th>
                <th className="px-6 py-3 font-medium text-gray-500">Date</th>
                <th className="px-6 py-3 font-medium text-gray-500">Amount</th>
                <th className="px-6 py-3 font-medium text-gray-500">Status</th>
                <th className="px-6 py-3 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.length > 0 ? (
                filteredOrders.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-gray-900">{order.customer}</div>
                        <div className="text-xs text-gray-500">{order.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{order.date}</td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">₹{typeof order.amount === 'number' ? order.amount.toFixed(2) : order.amount}</div>
                        <div className="text-xs text-gray-500">{order.items} items</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-gray-700"
                          onClick={() => viewOrderDetails(order)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        
                        {order.status === 'Pending' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-blue-600 border-blue-200 hover:bg-blue-50"
                            onClick={() => updateOrderStatus(order.id, 'Processing')}
                          >
                            <Clock className="h-4 w-4" />
                          </Button>
                        )}
                        
                        {(order.status === 'Pending' || order.status === 'Processing') && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-purple-600 border-purple-200 hover:bg-purple-50"
                            onClick={() => updateOrderStatus(order.id, 'Shipped')}
                          >
                            <Truck className="h-4 w-4" />
                          </Button>
                        )}

                        {order.status === 'Shipped' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-green-600 border-green-200 hover:bg-green-50"
                            onClick={() => updateOrderStatus(order.id, 'Delivered')}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                        
                        {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-red-500 border-red-200 hover:bg-red-50"
                            onClick={() => updateOrderStatus(order.id, 'Cancelled')}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center">
                    <p className="text-gray-500">No orders found matching your criteria</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Dialog */}
      <Dialog open={isOrderDetailsOpen} onOpenChange={setIsOrderDetailsOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              Complete information about this order
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Customer Information</h3>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="font-medium">{selectedOrder.customer}</p>
                    <p className="text-sm text-gray-600">{selectedOrder.email}</p>
                    {selectedOrder.address && (
                      <div className="mt-2 text-sm">
                        <p>{selectedOrder.address.addressLine1}</p>
                        {selectedOrder.address.addressLine2 && <p>{selectedOrder.address.addressLine2}</p>}
                        <p>{selectedOrder.address.city}, {selectedOrder.address.state} - {selectedOrder.address.pincode}</p>
                        <p>Phone: {selectedOrder.address.phoneNumber}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Order Information</h3>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[selectedOrder.status]}`}>
                        {getStatusIcon(selectedOrder.status)} {selectedOrder.status}
                      </span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Date:</span>
                      <span className="text-sm font-medium">{selectedOrder.date}</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Payment Method:</span>
                      <span className="text-sm font-medium">{selectedOrder.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Total Amount:</span>
                      <span className="text-sm font-bold">₹{typeof selectedOrder.amount === 'number' ? selectedOrder.amount.toFixed(2) : selectedOrder.amount}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Order Items</h3>
                {selectedOrder.itemDetails && selectedOrder.itemDetails.length > 0 ? (
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-3 py-2">Product</th>
                        <th className="text-right px-3 py-2">Price</th>
                        <th className="text-right px-3 py-2">Quantity</th>
                        <th className="text-right px-3 py-2">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {selectedOrder.itemDetails.map((item, index) => (
                        <tr key={index}>
                          <td className="px-3 py-2">
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
                                <p className="text-xs text-gray-500">{item.category}</p>
                              </div>
                            </div>
                          </td>
                          <td className="text-right px-3 py-2">₹{item.price}</td>
                          <td className="text-right px-3 py-2">{item.quantity}</td>
                          <td className="text-right px-3 py-2 font-medium">₹{(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td colSpan={3} className="text-right px-3 py-2 font-medium">Subtotal:</td>
                        <td className="text-right px-3 py-2">₹{(typeof selectedOrder.amount === 'number' ? selectedOrder.amount - 40 : parseFloat(selectedOrder.amount.replace('₹', '')) - 40).toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td colSpan={3} className="text-right px-3 py-2 font-medium">Shipping:</td>
                        <td className="text-right px-3 py-2">₹40.00</td>
                      </tr>
                      <tr>
                        <td colSpan={3} className="text-right px-3 py-2 font-medium">Total:</td>
                        <td className="text-right px-3 py-2 font-bold">₹{typeof selectedOrder.amount === 'number' ? selectedOrder.amount.toFixed(2) : selectedOrder.amount}</td>
                      </tr>
                    </tfoot>
                  </table>
                ) : (
                  <p className="text-gray-500 text-center py-4">No detailed item information available</p>
                )}
              </div>
              
              <DialogFooter className="flex justify-between">
                <div className="flex gap-2">
                  {selectedOrder.status !== 'Delivered' && selectedOrder.status !== 'Cancelled' && (
                    <Button
                      variant="secondary" 
                      className="text-green-700 bg-green-50 hover:bg-green-100 border border-green-200"
                      onClick={() => {
                        updateOrderStatus(selectedOrder.id, 'Delivered');
                        setIsOrderDetailsOpen(false);
                      }}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark as Delivered
                    </Button>
                  )}
                  
                  {selectedOrder.status !== 'Cancelled' && selectedOrder.status !== 'Delivered' && (
                    <Button
                      variant="secondary"
                      className="text-red-700 bg-red-50 hover:bg-red-100 border border-red-200"
                      onClick={() => {
                        updateOrderStatus(selectedOrder.id, 'Cancelled');
                        setIsOrderDetailsOpen(false);
                      }}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Cancel Order
                    </Button>
                  )}
                </div>
                
                <Button 
                  variant="outline" 
                  onClick={() => setIsOrderDetailsOpen(false)}
                >
                  Close
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Orders;
