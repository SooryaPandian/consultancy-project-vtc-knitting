
import React from 'react';
import { Eye, Truck, XCircle, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import OrderStatusBadge from './OrderStatusBadge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category?: string;
  image?: string;
}

interface OrderAddress {
  fullName: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Order {
  id: string;
  customer: string;
  email?: string;
  date: string;
  amount: number | string;
  items: number;
  status: string;
  paymentMethod: string;
  address?: OrderAddress;
  itemDetails?: OrderItem[];
}

interface OrderTableProps {
  orders: Order[];
  onViewOrder: (order: Order) => void;
  onUpdateStatus: (orderId: string, newStatus: string) => void;
}

const OrderTable: React.FC<OrderTableProps> = ({
  orders,
  onViewOrder,
  onUpdateStatus
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length > 0 ? (
              orders.map(order => (
                <TableRow key={order.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">
                    {order.id}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.customer}</div>
                      <div className="text-xs text-gray-500">{order.email}</div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-gray-700">
                    {order.date}
                  </TableCell>
                  <TableCell className="text-right">
                    <div>
                      <div className="font-medium">₹{typeof order.amount === 'number' ? order.amount.toFixed(2) : order.amount}</div>
                      <div className="text-xs text-gray-500">{order.items} items</div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <OrderStatusBadge status={order.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-gray-700"
                        onClick={() => onViewOrder(order)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      
                      {order.status === 'Pending' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-blue-600 border-blue-200 hover:bg-blue-50"
                          onClick={() => onUpdateStatus(order.id, 'Processing')}
                        >
                          <Clock className="h-4 w-4" />
                        </Button>
                      )}
                      
                      {(order.status === 'Pending' || order.status === 'Processing') && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-purple-600 border-purple-200 hover:bg-purple-50"
                          onClick={() => onUpdateStatus(order.id, 'Shipped')}
                        >
                          <Truck className="h-4 w-4" />
                        </Button>
                      )}

                      {order.status === 'Shipped' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-green-600 border-green-200 hover:bg-green-50"
                          onClick={() => onUpdateStatus(order.id, 'Delivered')}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                      
                      {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-500 border-red-200 hover:bg-red-50"
                          onClick={() => onUpdateStatus(order.id, 'Cancelled')}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center">
                  <p className="text-gray-500">No orders found matching your criteria</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default OrderTable;
