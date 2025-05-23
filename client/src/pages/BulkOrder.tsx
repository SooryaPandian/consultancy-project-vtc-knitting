
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from '../components/ui/use-toast';
import products from '../data/products';
import { SendIcon, Truck, FileText, Clock } from 'lucide-react';

interface BulkOrderFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  city: string;
  productId: string;
  quantity: string;
  message: string;
}

const BulkOrder: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<BulkOrderFormData>();
  const [selectedProduct, setSelectedProduct] = useState('');
  
  const onSubmit = (data: BulkOrderFormData) => {
    console.log('Form data:', data);
    
    toast({
      title: "Bulk Order Request Sent!",
      description: "We've received your request and will contact you within 24 hours.",
      duration: 5000,
    });
    
    reset();
    setSelectedProduct('');
  };
  
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 text-vtc-darkbrown">
          Bulk Order Request
        </h1>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Fill out the form below to request a bulk order. Our team will review your request
          and get back to you with pricing and availability within 24 hours.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form Column */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                    <Input
                      id="name"
                      placeholder="Ramesh Kumar"
                      {...register("name", { required: "Name is required" })}
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name <span className="text-red-500">*</span></Label>
                    <Input
                      id="company"
                      placeholder="Your Company Ltd."
                      {...register("company", { required: "Company name is required" })}
                      className={errors.company ? "border-red-500" : ""}
                    />
                    {errors.company && (
                      <p className="text-red-500 text-xs">{errors.company.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="ramesh@example.com"
                      {...register("email", { 
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address"
                        }
                      })}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs">{errors.email.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
                    <Input
                      id="phone"
                      placeholder="+91 9876543210"
                      {...register("phone", { 
                        required: "Phone number is required",
                        pattern: {
                          value: /^[0-9+\- ]{10,15}$/,
                          message: "Invalid phone number"
                        }
                      })}
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs">{errors.phone.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="city">City <span className="text-red-500">*</span></Label>
                  <Input
                    id="city"
                    placeholder="Mumbai"
                    {...register("city", { required: "City is required" })}
                    className={errors.city ? "border-red-500" : ""}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-xs">{errors.city.message}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="product">Product <span className="text-red-500">*</span></Label>
                    <Select 
                      value={selectedProduct} 
                      onValueChange={(value) => setSelectedProduct(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map(product => (
                          <SelectItem key={product.id} value={product.id.toString()}>
                            {product.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <input 
                      type="hidden" 
                      {...register("productId", { required: "Product is required" })}
                      value={selectedProduct}
                    />
                    {errors.productId && (
                      <p className="text-red-500 text-xs">{errors.productId.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity (minimum 100) <span className="text-red-500">*</span></Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="100"
                      placeholder="500"
                      {...register("quantity", { 
                        required: "Quantity is required",
                        min: {
                          value: 100,
                          message: "Minimum quantity is 100"
                        }
                      })}
                      className={errors.quantity ? "border-red-500" : ""}
                    />
                    {errors.quantity && (
                      <p className="text-red-500 text-xs">{errors.quantity.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Additional Requirements</Label>
                  <Textarea
                    id="message"
                    placeholder="Enter any specific requirements or notes here..."
                    rows={4}
                    {...register("message")}
                  />
                </div>
                
                <Button type="submit" className="w-full bg-vtc-red hover:bg-vtc-brown">
                  <SendIcon className="h-4 w-4 mr-2" />
                  Submit Bulk Order Request
                </Button>
              </form>
            </div>
          </div>
          
          {/* Info Column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-lg font-medium text-vtc-darkbrown mb-4">
                Why Choose VTC for Bulk Orders?
              </h2>
              
              <ul className="space-y-4">
                <li className="flex">
                  <Truck className="h-5 w-5 text-vtc-red mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-800">Free Shipping</h3>
                    <p className="text-gray-600 text-sm">
                      All bulk orders qualify for free shipping across India.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <FileText className="h-5 w-5 text-vtc-red mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-800">Customization</h3>
                    <p className="text-gray-600 text-sm">
                      Custom sizing, packaging, and branding available for bulk orders.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <Clock className="h-5 w-5 text-vtc-red mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-800">Quick Production</h3>
                    <p className="text-gray-600 text-sm">
                      Fast turnaround times, even for large orders.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-vtc-beige rounded-lg p-6">
              <h3 className="text-lg font-medium text-vtc-darkbrown mb-3">Need Help?</h3>
              <p className="text-gray-700 mb-4">
                If you have questions about bulk ordering, contact our dedicated bulk order team:
              </p>
              <p className="text-gray-700">
                <strong>Call:</strong> +91-9876543210
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> bulk@vtcknitting.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkOrder;
