import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { User, ShoppingBag, Lock, MapPin, Phone, Mail, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BACKEND_URL } from '../data/config';

const UserProfile = () => {
  const { user } = useAuth();
  
  const [userProfile, setUserProfile] = useState({
    name: user?.name || 'User Name',
    email: user?.email || 'user@example.com',
    phone: '9876543210',
    address: 'Coimbatore, Tamil Nadu',
    pincode: '641001'
  });
  
  const [passwordFields, setPasswordFields] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderLoading, setSelectedOrderLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoadingOrders(true);
      try {
        const res = await fetch(`${BACKEND_URL}/api/orders/user`, {
          credentials: 'include', // if using cookies/session
        });
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setOrders([]);
      } finally {
        setLoadingOrders(false);
      }
    };
    fetchOrders();
  }, []);
  
  const handleProfileChange = (e) => {
    setUserProfile({
      ...userProfile,
      [e.target.name]: e.target.value
    });
  };
  
  const handlePasswordChange = (e) => {
    setPasswordFields({
      ...passwordFields,
      [e.target.name]: e.target.value
    });
  };
  
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    toast({
      title: 'Profile Updated',
      description: 'Your profile information has been updated',
    });
  };
  
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordFields.newPassword !== passwordFields.confirmPassword) {
      toast({
        title: 'Password Error',
        description: 'New passwords do not match',
        variant: 'destructive'
      });
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          currentPassword: passwordFields.currentPassword,
          newPassword: passwordFields.newPassword,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Password update failed');
      }
      toast({
        title: 'Password Updated',
        description: data.message || 'Your password has been changed successfully',
      });
      setPasswordFields({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      toast({
        title: 'Password Error',
        description: error.message || 'Password update failed',
        variant: 'destructive'
      });
    }
  };
  
  const handleOrderSelect = async (orderId) => {
    setSelectedOrderLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/orders/${orderId}`, {
        credentials: 'include',
      });
      const data = await res.json();
      setSelectedOrder(data);
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Could not fetch order details',
        variant: 'destructive',
      });
      setSelectedOrder(null);
    } finally {
      setSelectedOrderLoading(false);
    }
  };

  // Status colors for order status badges
  const statusColors = {
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Processing': 'bg-blue-100 text-blue-800',
    'Shipped': 'bg-purple-100 text-purple-800',
    'Delivered': 'bg-green-100 text-green-800',
    'Cancelled': 'bg-red-100 text-red-800'
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link to="/" className="text-vtc-red hover:text-vtc-brown flex items-center">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-vtc-darkbrown">My Account</h1>
        
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-white shadow-sm rounded-lg p-1">
            <TabsTrigger value="profile" className="data-[state=active]:bg-vtc-red data-[state=active]:text-white">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-vtc-red data-[state=active]:text-white">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-vtc-red data-[state=active]:text-white">
              <Lock className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>
          
          {/* Profile Tab Content */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details and contact information</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        name="name"
                        value={userProfile.name}
                        onChange={handleProfileChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        name="email"
                        value={userProfile.email}
                        onChange={handleProfileChange}
                        disabled
                      />
                      <p className="text-xs text-gray-500">Email cannot be changed</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input 
                        id="phone" 
                        name="phone"
                        value={userProfile.phone}
                        onChange={handleProfileChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pincode">PIN Code</Label>
                      <Input 
                        id="pincode" 
                        name="pincode"
                        value={userProfile.pincode}
                        onChange={handleProfileChange}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input 
                        id="address" 
                        name="address"
                        value={userProfile.address}
                        onChange={handleProfileChange}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" className="bg-vtc-red hover:bg-vtc-brown">
                      Update Profile
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Orders Tab Content */}
          <TabsContent value="orders">
            <div className="space-y-6">
              {selectedOrder ? (
                selectedOrderLoading ? (
                  <div className="p-6 text-center text-gray-500">Loading order details...</div>
                ) : (
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div>
                        <CardTitle className="text-xl">Order #{selectedOrder.id}</CardTitle>
                        <CardDescription>
                          Placed on {selectedOrder.date}
                        </CardDescription>
                      </div>
                      <Button 
                        variant="ghost"
                        onClick={() => setSelectedOrder(null)}
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Back to Orders
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="flex flex-wrap justify-between gap-4">
                          <div>
                            <h4 className="font-medium text-sm text-gray-500 mb-1">Status</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[selectedOrder.status]}`}>
                              {selectedOrder.status}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm text-gray-500 mb-1">Total Amount</h4>
                            <span className="font-bold text-gray-800">₹{selectedOrder.amount}</span>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800 mb-3">Order Items</h4>
                          <div className="bg-gray-50 rounded-lg">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-gray-200">
                                  <th className="text-left py-2 px-4">Item</th>
                                  <th className="text-left py-2 px-4">Details</th>
                                  <th className="text-left py-2 px-4">Qty</th>
                                  <th className="text-right py-2 px-4">Price</th>
                                </tr>
                              </thead>
                              <tbody>
                                {selectedOrder.itemDetails.map((item, index) => (
                                  <tr key={index} className="border-b border-gray-200 last:border-b-0">
                                    <td className="py-3 px-4">{item.name}</td>
                                    <td className="py-3 px-4 text-gray-600">
                                      {item.selectedSize || '-'}, {item.selectedColor || '-'}
                                    </td>
                                    <td className="py-3 px-4">{item.quantity}</td>
                                    <td className="py-3 px-4 text-right font-medium">₹{item.price}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button 
                            variant="outline"
                            onClick={() => {
                              toast({
                                title: 'Coming Soon',
                                description: 'This feature will be available soon',
                              });
                            }}
                          >
                            Need Help?
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                    <CardDescription>View your recent orders and their status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loadingOrders ? (
                      <div className="p-6 text-center text-gray-500">Loading orders...</div>
                    ) : orders.length > 0 ? (
                      <div className="space-y-4">
                        {orders.map(order => (
                          <div 
                            key={order.id}
                            className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                            onClick={() => handleOrderSelect(order.id)}
                          >
                            <div className="mb-2 md:mb-0">
                              <div className="font-medium text-gray-900">{order.id}</div>
                              <div className="text-sm text-gray-500">{order.date}</div>
                            </div>
                            <div className="flex flex-wrap items-center gap-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                                {order.status}
                              </span>
                              <span className="font-bold text-gray-800">₹{order.amount}</span>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="ml-2"
                                onClick={e => {
                                  e.stopPropagation();
                                  handleOrderSelect(order.id);
                                }}
                              >
                                View Details
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-6 text-center">
                        <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-gray-900 mb-1">No Orders Yet</h3>
                        <p className="text-gray-500 mb-4">You haven't placed any orders yet</p>
                        <Button asChild className="bg-vtc-red hover:bg-vtc-brown">
                          <Link to="/search">Start Shopping</Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          
          {/* Security Tab Content */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Update your password and manage security preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input 
                      id="currentPassword" 
                      name="currentPassword"
                      type="password" 
                      value={passwordFields.currentPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input 
                        id="newPassword" 
                        name="newPassword"
                        type="password" 
                        value={passwordFields.newPassword}
                        onChange={handlePasswordChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input 
                        id="confirmPassword" 
                        name="confirmPassword"
                        type="password" 
                        value={passwordFields.confirmPassword}
                        onChange={handlePasswordChange}
                      />
                    </div>
                  </div>
                  
                  <div className="pt-2 pb-4">
                    <p className="text-xs text-gray-500 italic">
                      Password must be at least 8 characters long with at least one uppercase letter, one lowercase letter, and one number.
                    </p>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" className="bg-vtc-red hover:bg-vtc-brown">
                      Update Password
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfile;
