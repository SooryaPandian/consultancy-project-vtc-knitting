
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '../components/ui/use-toast';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();
  
  const onSubmit = (data: ContactFormData) => {
    console.log('Contact form data:', data);
    
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
      duration: 3000,
    });
    
    reset();
  };
  
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 text-vtc-darkbrown">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Have questions or feedback? We're here to help. Reach out to our team using the form below
          or contact us directly.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info Column */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-medium text-vtc-darkbrown mb-6">
                Contact Information
              </h2>
              
              <div className="space-y-6">
                <div className="flex">
                  <MapPin className="h-6 w-6 text-vtc-red mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Factory Address</h3>
                    <p className="text-gray-600">
                      VTC Knitting Co.<br />
                      123 Textile Park, Avinashi Road<br />
                      Tiruppur, Tamil Nadu - 641603<br />
                      India
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <Phone className="h-6 w-6 text-vtc-red mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Phone</h3>
                    <p className="text-gray-600">+91-9876543210</p>
                    <p className="text-gray-600">+91-4224567890</p>
                  </div>
                </div>
                
                <div className="flex">
                  <Mail className="h-6 w-6 text-vtc-red mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Email</h3>
                    <p className="text-gray-600">contact@vtcknitting.com</p>
                    <p className="text-gray-600">sales@vtcknitting.com</p>
                  </div>
                </div>
                
                <div className="flex">
                  <Clock className="h-6 w-6 text-vtc-red mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Business Hours</h3>
                    <p className="text-gray-600">
                      Monday - Saturday: 9:00 AM - 6:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Map */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-medium text-vtc-darkbrown mb-4">
                Location
              </h2>
              <div className="rounded-lg overflow-hidden h-64">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.944126051374!2d77.34076007395552!3d11.028893089118306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba9a79fa149a8d7%3A0x8abe7b31db3c1bd0!2sTiruppur%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1709828369899!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="VTC Knitting Co. Location"
                ></iframe>
              </div>
            </div>
          </div>
          
          {/* Contact Form Column */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-medium text-vtc-darkbrown mb-6">
                Send Us a Message
              </h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="name"
                    placeholder="Priya Sharma"
                    {...register("name", { required: "Name is required" })}
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs">{errors.name.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="priya@example.com"
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
                  <Label htmlFor="subject">Subject <span className="text-red-500">*</span></Label>
                  <Input
                    id="subject"
                    placeholder="Product Inquiry"
                    {...register("subject", { required: "Subject is required" })}
                    className={errors.subject ? "border-red-500" : ""}
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-xs">{errors.subject.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message <span className="text-red-500">*</span></Label>
                  <Textarea
                    id="message"
                    placeholder="Enter your message here..."
                    rows={6}
                    {...register("message", { required: "Message is required" })}
                    className={errors.message ? "border-red-500" : ""}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs">{errors.message.message}</p>
                  )}
                </div>
                
                <Button type="submit" className="bg-vtc-red hover:bg-vtc-brown">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
