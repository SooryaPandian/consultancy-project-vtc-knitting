
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { Search, FileDown, Filter } from 'lucide-react';
import OrderTable from '@/components/admin/OrderTable';
import OrderDetailsView from '@/components/admin/OrderDetailsView';
import type { Order } from '@/components/admin/OrderTable';

const Orders: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [orderAnalytics, setOrderAnalytics] = useState({
    total: 0,
    pending: 0,
    processing: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0
  });
  
  useEffect(() => {
    // Load orders from localStorage for demo
    const savedOrders = JSON.parse(localStorage.getItem('vtcOrders') || '[]');
    // If no saved orders, use the mock data
    const initialOrders = savedOrders.length > 0 ? savedOrders : mockOrders;
    setOrders(initialOrders);
    
    // Calculate analytics
    calculateAnalytics(initialOrders);
  }, []);
  
  const calculateAnalytics = (orderList: Order[]) => {
    const analytics = {
      total: orderList.length,
      pending: orderList.filter(order => order.status === 'Pending').length,
      processing: orderList.filter(order => order.status === 'Processing').length,
      shipped: orderList.filter(order => order.status === 'Shipped').length,
      delivered: orderList.filter(order => order.status === 'Delivered').length,
      cancelled: orderList.filter(order => order.status === 'Cancelled').length
    };
    
    setOrderAnalytics(analytics);
  };
  
  // Filter orders based on search term and status
  const filteredOrders = orders.filter(order => 
    (order.customer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
     order.email?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'all' || order.status === statusFilter)
  );
  
  const updateOrderStatus = (orderId: string, newStatus: string) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus } 
        : order
    );
    
    setOrders(updatedOrders);
    
    // Update in localStorage too
    localStorage.setItem('vtcOrders', JSON.stringify(updatedOrders));
    
    // Recalculate analytics
    calculateAnalytics(updatedOrders);
    
    toast({
      title: `Order ${newStatus}`,
      description: `Order ${orderId} has been marked as ${newStatus.toLowerCase()}`,
    });
  };
  
  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderDetailsOpen(true);
  };
  
  const exportOrders = () => {
    // Create CSV content
    const headers = ["Order ID", "Customer", "Email", "Date", "Amount", "Status"];
    const csvContent = [
      headers.join(","),
      ...filteredOrders.map(order => [
        order.id,
        order.customer,
        order.email || "",
        order.date,
        typeof order.amount === 'number' ? order.amount.toFixed(2) : order.amount,
        order.status
      ].join(","))
    ].join("\n");
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `orders-export-${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export Complete",
      description: `${filteredOrders.length} orders have been exported to CSV`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Orders Management</h2>
          <p className="text-sm text-gray-500">View, track, and manage customer orders</p>
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
                <SelectItem value="all">All Status ({orderAnalytics.total})</SelectItem>
                <SelectItem value="Pending">Pending ({orderAnalytics.pending})</SelectItem>
                <SelectItem value="Processing">Processing ({orderAnalytics.processing})</SelectItem>
                <SelectItem value="Shipped">Shipped ({orderAnalytics.shipped})</SelectItem>
                <SelectItem value="Delivered">Delivered ({orderAnalytics.delivered})</SelectItem>
                <SelectItem value="Cancelled">Cancelled ({orderAnalytics.cancelled})</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button variant="outline" className="whitespace-nowrap" onClick={exportOrders}>
            <FileDown className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      {/* Order Analytics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-5">
        <div className="bg-white rounded-md shadow p-4">
          <p className="text-sm text-gray-500">Total Orders</p>
          <p className="text-2xl font-bold">{orderAnalytics.total}</p>
        </div>
        <div className="bg-white rounded-md shadow p-4">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">{orderAnalytics.pending}</p>
        </div>
        <div className="bg-white rounded-md shadow p-4">
          <p className="text-sm text-gray-500">Processing</p>
          <p className="text-2xl font-bold text-blue-600">{orderAnalytics.processing}</p>
        </div>
        <div className="bg-white rounded-md shadow p-4">
          <p className="text-sm text-gray-500">Shipped</p>
          <p className="text-2xl font-bold text-purple-600">{orderAnalytics.shipped}</p>
        </div>
        <div className="bg-white rounded-md shadow p-4">
          <p className="text-sm text-gray-500">Delivered</p>
          <p className="text-2xl font-bold text-green-600">{orderAnalytics.delivered}</p>
        </div>
      </div>
      
      {/* Orders Table */}
      <OrderTable 
        orders={filteredOrders}
        onViewOrder={viewOrderDetails}
        onUpdateStatus={updateOrderStatus}
      />
      
      {/* Order Details Dialog */}
      <OrderDetailsView
        order={selectedOrder}
        isOpen={isOrderDetailsOpen}
        onClose={() => setIsOrderDetailsOpen(false)}
        onUpdateStatus={updateOrderStatus}
      />
    </div>
  );
};

// Mock order data to use if localStorage is empty
const mockOrders = [
  { 
    id: 'ORD-7893', 
    customer: 'Rajesh Kumar', 
    email: 'rajesh@example.com',
    date: '2025-04-23', 
    amount: 3540, 
    items: 4,
    status: 'Processing',
    paymentMethod: 'cod',
    address: {
      fullName: 'Rajesh Kumar',
      phoneNumber: '9876543210',
      addressLine1: '42 Sardar Patel Road',
      addressLine2: 'Apartment 301',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001'
    },
    itemDetails: [
      {
        id: 'PROD-001',
        name: 'Cotton Shirt - Blue',
        price: 699,
        quantity: 2,
        category: 'Apparel',
        image: '/placeholder.svg'
      },
      {
        id: 'PROD-002',
        name: 'Denim Jeans',
        price: 1299,
        quantity: 1,
        category: 'Apparel',
        image: '/placeholder.svg'
      },
      {
        id: 'PROD-003',
        name: 'Casual Shoes',
        price: 899,
        quantity: 1,
        category: 'Footwear',
        image: '/placeholder.svg'
      }
    ]
  },
  { 
    id: 'ORD-7892', 
    customer: 'Anjali Singh', 
    email: 'anjali@example.com',
    date: '2025-04-22', 
    amount: 2890, 
    items: 3,
    status: 'Shipped',
    paymentMethod: 'online',
    address: {
      fullName: 'Anjali Singh',
      phoneNumber: '8765432109',
      addressLine1: '15 MG Road',
      addressLine2: '',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001'
    },
    itemDetails: [
      {
        id: 'PROD-004',
        name: 'Designer Kurti',
        price: 999,
        quantity: 2,
        category: 'Women\'s Wear',
        image: '/placeholder.svg'
      },
      {
        id: 'PROD-005',
        name: 'Silver Earrings',
        price: 899,
        quantity: 1,
        category: 'Jewelry',
        image: '/placeholder.svg'
      }
    ]
  },
  { 
    id: 'ORD-7891', 
    customer: 'Mohan Das', 
    email: 'mohan@example.com',
    date: '2025-04-22', 
    amount: 1240, 
    items: 2,
    status: 'Delivered',
    paymentMethod: 'cod',
    address: {
      fullName: 'Mohan Das',
      phoneNumber: '7654321098',
      addressLine1: '78 Park Street',
      addressLine2: 'Floor 2',
      city: 'Kolkata',
      state: 'West Bengal',
      pincode: '700001'
    },
    itemDetails: [
      {
        id: 'PROD-006',
        name: 'Cotton T-Shirt',
        price: 599,
        quantity: 1,
        category: 'Apparel',
        image: '/placeholder.svg'
      },
      {
        id: 'PROD-007',
        name: 'Shorts',
        price: 649,
        quantity: 1,
        category: 'Apparel',
        image: '/placeholder.svg'
      }
    ]
  },
  { 
    id: 'ORD-7890', 
    customer: 'Priya Sharma', 
    email: 'priya@example.com',
    date: '2025-04-21', 
    amount: 5670, 
    items: 5,
    status: 'Pending',
    paymentMethod: 'online',
    address: {
      fullName: 'Priya Sharma',
      phoneNumber: '6543210987',
      addressLine1: '22 Rajpath',
      addressLine2: '',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110001'
    },
    itemDetails: [
      {
        id: 'PROD-008',
        name: 'Smartphone X10',
        price: 4999,
        quantity: 1,
        category: 'Electronics',
        image: '/placeholder.svg'
      },
      {
        id: 'PROD-009',
        name: 'Phone Case',
        price: 299,
        quantity: 1,
        category: 'Accessories',
        image: '/placeholder.svg'
      },
      {
        id: 'PROD-010',
        name: 'Screen Guard',
        price: 149,
        quantity: 2,
        category: 'Accessories',
        image: '/placeholder.svg'
      },
      {
        id: 'PROD-011',
        name: 'USB Cable',
        price: 199,
        quantity: 1,
        category: 'Electronics',
        image: '/placeholder.svg'
      }
    ]
  },
  { 
    id: 'ORD-7889', 
    customer: 'Amit Singh', 
    email: 'amit@example.com',
    date: '2025-04-20', 
    amount: 980, 
    items: 1,
    status: 'Processing',
    paymentMethod: 'cod',
    address: {
      fullName: 'Amit Singh',
      phoneNumber: '5432109876',
      addressLine1: '11 Ring Road',
      addressLine2: 'Sector 18',
      city: 'Noida',
      state: 'Uttar Pradesh',
      pincode: '201301'
    },
    itemDetails: [
      {
        id: 'PROD-012',
        name: 'Backpack',
        price: 980,
        quantity: 1,
        category: 'Bags',
        image: '/placeholder.svg'
      }
    ]
  },
  { 
    id: 'ORD-7888', 
    customer: 'Neha Gupta', 
    email: 'neha@example.com',
    date: '2025-04-19', 
    amount: 3210, 
    items: 3,
    status: 'Cancelled',
    paymentMethod: 'online',
    address: {
      fullName: 'Neha Gupta',
      phoneNumber: '4321098765',
      addressLine1: '7 FC Road',
      addressLine2: '',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411001'
    },
    itemDetails: [
      {
        id: 'PROD-013',
        name: 'Dress',
        price: 1299,
        quantity: 1,
        category: 'Women\'s Wear',
        image: '/placeholder.svg'
      },
      {
        id: 'PROD-014',
        name: 'Handbag',
        price: 999,
        quantity: 1,
        category: 'Bags',
        image: '/placeholder.svg'
      },
      {
        id: 'PROD-015',
        name: 'Scarf',
        price: 499,
        quantity: 2,
        category: 'Accessories',
        image: '/placeholder.svg'
      }
    ]
  }
];

export default Orders;
