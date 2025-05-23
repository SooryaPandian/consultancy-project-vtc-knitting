
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Users, ShoppingCart, TrendingUp } from 'lucide-react';

// Sample data for dashboard
const dashboardData = {
  totalSales: "₹158,230",
  newOrders: 57,
  totalProducts: 94,
  totalCustomers: 2156,
  recentOrders: [
    { id: "ORD-7891", customer: "Rajesh Kumar", date: "2025-04-22", amount: "₹3,540", status: "Delivered" },
    { id: "ORD-7890", customer: "Priya Sharma", date: "2025-04-22", amount: "₹1,890", status: "Processing" },
    { id: "ORD-7889", customer: "Amit Singh", date: "2025-04-21", amount: "₹2,150", status: "Shipped" },
    { id: "ORD-7888", customer: "Neha Gupta", date: "2025-04-21", amount: "₹780", status: "Pending" },
    { id: "ORD-7887", customer: "Mohan Das", date: "2025-04-20", amount: "₹4,230", status: "Delivered" }
  ],
  popularProducts: [
    { name: "D Rib (Royal)", sales: 146, revenue: "₹16,790" },
    { name: "S. Rib (Harsha)", sales: 135, revenue: "₹14,175" },
    { name: "Single Rip", sales: 128, revenue: "₹12,160" },
    { name: "Banian Rn Color", sales: 112, revenue: "₹11,200" },
    { name: "Children Fine Drawer", sales: 97, revenue: "₹8,245" }
  ]
};

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
        <p className="text-sm text-gray-500">Last updated: April 24, 2025</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Sales</p>
              <h3 className="text-2xl font-bold text-gray-800">{dashboardData.totalSales}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">New Orders</p>
              <h3 className="text-2xl font-bold text-gray-800">{dashboardData.newOrders}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Package className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Products</p>
              <h3 className="text-2xl font-bold text-gray-800">{dashboardData.totalProducts}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Customers</p>
              <h3 className="text-2xl font-bold text-gray-800">{dashboardData.totalCustomers}</h3>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Orders */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-gray-200">
                  <th className="pb-3 font-medium text-gray-500">Order ID</th>
                  <th className="pb-3 font-medium text-gray-500">Customer</th>
                  <th className="pb-3 font-medium text-gray-500">Date</th>
                  <th className="pb-3 font-medium text-gray-500">Amount</th>
                  <th className="pb-3 font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.recentOrders.map(order => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 font-medium text-gray-900">{order.id}</td>
                    <td className="py-3 text-gray-600">{order.customer}</td>
                    <td className="py-3 text-gray-600">{order.date}</td>
                    <td className="py-3 text-gray-900">{order.amount}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize
                        ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : ''}
                        ${order.status === 'Processing' ? 'bg-blue-100 text-blue-700' : ''}
                        ${order.status === 'Shipped' ? 'bg-purple-100 text-purple-700' : ''}
                        ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : ''}
                      `}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {/* Popular Products */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Popular Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-gray-200">
                  <th className="pb-3 font-medium text-gray-500">Product Name</th>
                  <th className="pb-3 font-medium text-gray-500">Sales</th>
                  <th className="pb-3 font-medium text-gray-500">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.popularProducts.map((product, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 font-medium text-gray-900">{product.name}</td>
                    <td className="py-3 text-gray-600">{product.sales} units</td>
                    <td className="py-3 text-gray-900">{product.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
