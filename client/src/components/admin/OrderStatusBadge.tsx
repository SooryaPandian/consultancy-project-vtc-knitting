
import React from 'react';
import { Clock, Truck, CheckCircle, XCircle } from 'lucide-react';

type OrderStatusProps = {
  status: string;
  size?: 'sm' | 'md' | 'lg';
};

export const OrderStatusBadge: React.FC<OrderStatusProps> = ({ status, size = 'md' }) => {
  const statusColors = {
    'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Processing': 'bg-blue-100 text-blue-800 border-blue-200',
    'Shipped': 'bg-purple-100 text-purple-800 border-purple-200',
    'Delivered': 'bg-green-100 text-green-800 border-green-200',
    'Cancelled': 'bg-red-100 text-red-800 border-red-200'
  };

  const getStatusIcon = () => {
    switch(status) {
      case 'Pending':
        return <Clock className={size === 'sm' ? 'h-3 w-3 mr-1' : 'h-4 w-4 mr-2'} />;
      case 'Processing':
        return <Clock className={size === 'sm' ? 'h-3 w-3 mr-1' : 'h-4 w-4 mr-2'} />;
      case 'Shipped':
        return <Truck className={size === 'sm' ? 'h-3 w-3 mr-1' : 'h-4 w-4 mr-2'} />;
      case 'Delivered':
        return <CheckCircle className={size === 'sm' ? 'h-3 w-3 mr-1' : 'h-4 w-4 mr-2'} />;
      case 'Cancelled':
        return <XCircle className={size === 'sm' ? 'h-3 w-3 mr-1' : 'h-4 w-4 mr-2'} />;
      default:
        return null;
    }
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base'
  };

  return (
    <span className={`inline-flex items-center border rounded-full font-medium ${statusColors[status]} ${sizeClasses[size]}`}>
      {getStatusIcon()}
      {status}
    </span>
  );
};

export default OrderStatusBadge;
