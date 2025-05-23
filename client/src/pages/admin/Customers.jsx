
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { Search, Mail, Phone, MapPin, Calendar, ShoppingBag, Heart, User } from 'lucide-react';

// Mock customer data
const mockCustomers = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    phone: '9876543210',
    address: 'Coimbatore, Tamil Nadu',
    joinDate: '12 Jan 2025',
    totalOrders: 8,
    totalSpent: '₹12,450',
    wishlistItems: 3
  },
  {
    id: 2,
    name: 'Priya Sharma',
    email: 'priya@example.com',
    phone: '8765432109',
    address: 'Chennai, Tamil Nadu',
    joinDate: '25 Feb 2025',
    totalOrders: 5,
    totalSpent: '₹8,920',
    wishlistItems: 7
  },
  {
    id: 3,
    name: 'Amit Singh',
    email: 'amit@example.com',
    phone: '7654321098',
    address: 'Bangalore, Karnataka',
    joinDate: '03 Mar 2025',
    totalOrders: 3,
    totalSpent: '₹5,340',
    wishlistItems: 2
  },
  {
    id: 4,
    name: 'Neha Gupta',
    email: 'neha@example.com',
    phone: '6543210987',
    address: 'Mumbai, Maharashtra',
    joinDate: '18 Mar 2025',
    totalOrders: 2,
    totalSpent: '₹3,780',
    wishlistItems: 5
  },
  {
    id: 5,
    name: 'Mohan Das',
    email: 'mohan@example.com',
    phone: '5432109876',
    address: 'Delhi, Delhi',
    joinDate: '05 Apr 2025',
    totalOrders: 1,
    totalSpent: '₹1,240',
    wishlistItems: 4
  },
  {
    id: 6,
    name: 'Anjali Singh',
    email: 'anjali@example.com',
    phone: '4321098765',
    address: 'Hyderabad, Telangana',
    joinDate: '10 Apr 2025',
    totalOrders: 4,
    totalSpent: '₹6,870',
    wishlistItems: 8
  }
];

// Mock order data for customers
const mockCustomerOrders = {
  1: [
    { id: 'ORD-7893', date: '2025-04-23', status: 'Processing', amount: '₹2,340' },
    { id: 'ORD-7875', date: '2025-04-10', status: 'Delivered', amount: '₹1,850' },
    { id: 'ORD-7862', date: '2025-03-29', status: 'Delivered', amount: '₹3,220' }
  ],
  2: [
    { id: 'ORD-7890', date: '2025-04-21', status: 'Pending', amount: '₹5,670' },
    { id: 'ORD-7871', date: '2025-04-08', status: 'Delivered', amount: '₹1,230' }
  ],
  3: [
    { id: 'ORD-7889', date: '2025-04-20', status: 'Processing', amount: '₹980' },
    { id: 'ORD-7880', date: '2025-04-15', status: 'Delivered', amount: '₹2,400' }
  ]
};

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isCustomerDetailsOpen, setIsCustomerDetailsOpen] = useState(false);
  
  // Filter customers based on search term
  const filteredCustomers = mockCustomers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );
  
  const openCustomerDetails = (customer) => {
    setSelectedCustomer(customer);
    setIsCustomerDetailsOpen(true);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Customers</h2>
          <p className="text-sm text-gray-500">Manage and view customer information</p>
        </div>
        
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            className="pl-8"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map(customer => (
            <Card key={customer.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="p-6 border-b">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-vtc-red text-white flex items-center justify-center font-bold">
                        {customer.name.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">{customer.name}</div>
                        <div className="text-xs text-gray-500 flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {customer.email}
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => openCustomerDetails(customer)}
                    >
                      View
                    </Button>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-600">{customer.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-600 truncate">{customer.address}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-600">Joined: {customer.joinDate}</span>
                    </div>
                    <div className="flex items-center">
                      <ShoppingBag className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-600">{customer.totalOrders} orders</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t p-4 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div className="text-gray-600 font-medium">Total Spent</div>
                    <div className="text-gray-900 font-bold">{customer.totalSpent}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full bg-white rounded-lg p-8 text-center">
            <User className="h-10 w-10 text-gray-400 mx-auto mb-2" />
            <h3 className="text-lg font-medium text-gray-800 mb-1">No customers found</h3>
            <p className="text-gray-600">Try adjusting your search term</p>
          </div>
        )}
      </div>
      
      {/* Customer Details Dialog */}
      {selectedCustomer && (
        <Dialog open={isCustomerDetailsOpen} onOpenChange={setIsCustomerDetailsOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Customer Details</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              {/* Customer Info */}
              <div className="flex items-center">
                <div className="h-16 w-16 rounded-full bg-vtc-red text-white flex items-center justify-center text-2xl font-bold">
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <div className="text-xl font-medium text-gray-900">{selectedCustomer.name}</div>
                  <div className="text-sm text-gray-500">Customer since {selectedCustomer.joinDate}</div>
                </div>
              </div>
              
              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex flex-col">
                  <span className="text-gray-500">Email</span>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-900">{selectedCustomer.email}</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500">Phone</span>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-900">{selectedCustomer.phone}</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500">Address</span>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-900">{selectedCustomer.address}</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500">Wishlist Items</span>
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-900">{selectedCustomer.wishlistItems} items</span>
                  </div>
                </div>
              </div>
              
              {/* Order History */}
              <div className="border-t pt-4">
                <h3 className="font-medium text-gray-800 mb-3">Recent Orders</h3>
                
                {mockCustomerOrders[selectedCustomer.id] ? (
                  <div className="divide-y divide-gray-100 border rounded-lg">
                    {mockCustomerOrders[selectedCustomer.id].map(order => (
                      <div key={order.id} className="p-3 flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-800">{order.id}</div>
                          <div className="text-xs text-gray-500">{order.date}</div>
                        </div>
                        <div className="flex items-center">
                          <span className={`px-2 py-1 mr-3 rounded-full text-xs font-medium 
                            ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : ''}
                            ${order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : ''}
                            ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                          `}>
                            {order.status}
                          </span>
                          <span className="font-medium text-gray-900">{order.amount}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-gray-50 text-center rounded">
                    <p className="text-gray-500">No order history available</p>
                  </div>
                )}
              </div>
              
              {/* Actions */}
              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: 'Email Sent',
                      description: `Email sent to ${selectedCustomer.email}`,
                    });
                  }}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
                <Button 
                  className="bg-vtc-red hover:bg-vtc-brown"
                  onClick={() => {
                    toast({
                      title: 'Customer Updated',
                      description: `${selectedCustomer.name}'s details would be updated`,
                    });
                  }}
                >
                  Update Details
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Customers;
