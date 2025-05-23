
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { User, ShieldCheck, Bell, Store, Settings as SettingsIcon, Mail, Save } from 'lucide-react';

const Settings = () => {
  const [passwordFields, setPasswordFields] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [generalSettings, setGeneralSettings] = useState({
    storeName: 'VTC Knitting Co.',
    email: 'info@vtcknitting.com',
    phone: '1234567890',
    address: 'Tiruppur, Tamil Nadu, India',
    currency: 'INR',
    orderPrefix: 'ORD'
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    newOrder: true,
    lowStock: true,
    returnRequests: true,
    newCustomer: false,
    promotions: true
  });
  
  const handlePasswordChange = (e) => {
    setPasswordFields({
      ...passwordFields,
      [e.target.name]: e.target.value
    });
  };
  
  const handleGeneralSettingChange = (e) => {
    setGeneralSettings({
      ...generalSettings,
      [e.target.name]: e.target.value
    });
  };
  
  const handleNotificationToggle = (setting) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting]
    });
  };
  
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    if (passwordFields.newPassword !== passwordFields.confirmPassword) {
      toast({
        title: 'Password Error',
        description: 'New passwords do not match',
        variant: 'destructive'
      });
      return;
    }
    
    // In a real app, this would send to the backend
    toast({
      title: 'Password Updated',
      description: 'Your password has been changed successfully',
    });
    
    setPasswordFields({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };
  
  const handleGeneralSubmit = (e) => {
    e.preventDefault();
    
    toast({
      title: 'Settings Saved',
      description: 'General settings have been updated',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
        <p className="text-sm text-gray-500">Manage your admin account and application settings</p>
      </div>
      
      <Tabs defaultValue="account">
        <TabsList className="mb-6 grid grid-cols-3 md:w-[400px]">
          <TabsTrigger value="account" className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            <span>Account</span>
          </TabsTrigger>
          <TabsTrigger value="general" className="flex items-center">
            <Store className="h-4 w-4 mr-2" />
            <span>General</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="h-4 w-4 mr-2" />
            <span>Notifications</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Account Settings */}
        <TabsContent value="account">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Admin Profile</CardTitle>
                <CardDescription>Update your admin account information</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="adminName">Name</Label>
                      <Input id="adminName" defaultValue="Admin User" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="adminEmail">Email</Label>
                      <Input id="adminEmail" defaultValue="admin@vtc.com" />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button className="bg-vtc-red hover:bg-vtc-brown">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Security</CardTitle>
                <CardDescription>Update your password and security settings</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handlePasswordSubmit}>
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
                  
                  <div className="flex items-center space-x-2 pt-2">
                    <ShieldCheck className="h-4 w-4 text-gray-400" />
                    <span className="text-xs text-gray-500">Password must be at least 8 characters long with at least one uppercase letter, one lowercase letter, and one number.</span>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" className="bg-vtc-red hover:bg-vtc-brown">
                      Update Password
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Store Settings</CardTitle>
              <CardDescription>Update your store information and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleGeneralSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="storeName">Store Name</Label>
                    <Input 
                      id="storeName" 
                      name="storeName"
                      value={generalSettings.storeName}
                      onChange={handleGeneralSettingChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storeEmail">Contact Email</Label>
                    <Input 
                      id="storeEmail" 
                      name="email"
                      value={generalSettings.email}
                      onChange={handleGeneralSettingChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storePhone">Contact Phone</Label>
                    <Input 
                      id="storePhone" 
                      name="phone"
                      value={generalSettings.phone}
                      onChange={handleGeneralSettingChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storeAddress">Store Address</Label>
                    <Input 
                      id="storeAddress" 
                      name="address"
                      value={generalSettings.address}
                      onChange={handleGeneralSettingChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select
                      value={generalSettings.currency}
                      onValueChange={(value) => setGeneralSettings({...generalSettings, currency: value})}
                    >
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                        <SelectItem value="USD">US Dollar ($)</SelectItem>
                        <SelectItem value="EUR">Euro (€)</SelectItem>
                        <SelectItem value="GBP">British Pound (£)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="orderPrefix">Order ID Prefix</Label>
                    <Input 
                      id="orderPrefix" 
                      name="orderPrefix"
                      value={generalSettings.orderPrefix}
                      onChange={handleGeneralSettingChange}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" className="bg-vtc-red hover:bg-vtc-brown">
                    <SettingsIcon className="h-4 w-4 mr-2" />
                    Save Settings
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Notification Preferences</CardTitle>
              <CardDescription>Manage which notifications you receive</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">New Order Notifications</Label>
                    <p className="text-sm text-gray-500">
                      Receive notifications when new orders are placed
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.newOrder}
                    onCheckedChange={() => handleNotificationToggle('newOrder')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Low Stock Alerts</Label>
                    <p className="text-sm text-gray-500">
                      Receive alerts when product stock falls below the threshold
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.lowStock}
                    onCheckedChange={() => handleNotificationToggle('lowStock')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Return Request Notifications</Label>
                    <p className="text-sm text-gray-500">
                      Get notified when customers request returns
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.returnRequests}
                    onCheckedChange={() => handleNotificationToggle('returnRequests')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">New Customer Registration</Label>
                    <p className="text-sm text-gray-500">
                      Receive notifications for new customer registrations
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.newCustomer}
                    onCheckedChange={() => handleNotificationToggle('newCustomer')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Promotion Updates</Label>
                    <p className="text-sm text-gray-500">
                      Get updates about automatic promotions and discount expiry
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.promotions}
                    onCheckedChange={() => handleNotificationToggle('promotions')}
                  />
                </div>
                
                <div className="pt-4 border-t">
                  <Button 
                    className="bg-vtc-red hover:bg-vtc-brown"
                    onClick={() => {
                      toast({
                        title: 'Notification Settings Saved',
                        description: 'Your notification preferences have been updated',
                      });
                    }}
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Save Preferences
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
