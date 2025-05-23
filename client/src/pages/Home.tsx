import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Award, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '../components/ProductCard';
import { BACKEND_URL } from '../data/config'; // <-- add this import

const Home: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState<string[]>([]);

  const apiUrl = BACKEND_URL; // <-- use BACKEND_URL

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/products`);
        const data = await response.json();
        setProducts(data);
        setCategories(Array.from(new Set(data.map((product: any) => product.category))));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [apiUrl]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold text-vtc-darkbrown">
                Premium Quality <span className="text-vtc-red">Textiles</span> For Everyone
              </h1>
              <p className="text-lg text-gray-700">
                Crafted with care in Tiruppur, VTC Knitting Co. brings you 
                comfortable, durable and stylish textile products for the entire family.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button asChild className="bg-vtc-red hover:bg-vtc-brown">
                  <Link to="/search">
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-vtc-red text-vtc-red hover:bg-vtc-red/10">
                  <Link to="/bulk-order">
                    Bulk Orders
                  </Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1611042553484-d61f84d22784?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                alt="VTC Textile Products" 
                className="rounded-lg shadow-lg object-cover h-[400px] w-full animate-zoom-in"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-sm">
              <Truck className="h-10 w-10 text-vtc-red mb-4" />
              <h3 className="text-lg font-medium mb-2 text-vtc-darkbrown">Fast Shipping</h3>
              <p className="text-gray-600">
                Quick delivery across India with reliable shipping partners.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-sm">
              <Award className="h-10 w-10 text-vtc-red mb-4" />
              <h3 className="text-lg font-medium mb-2 text-vtc-darkbrown">Premium Quality</h3>
              <p className="text-gray-600">
                Made with the finest materials for comfort and durability.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-sm">
              <Shield className="h-10 w-10 text-vtc-red mb-4" />
              <h3 className="text-lg font-medium mb-2 text-vtc-darkbrown">100% Guarantee</h3>
              <p className="text-gray-600">
                Satisfaction guaranteed or your money back, no questions asked.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Sections by Category */}
      {categories.map((category: string) => {
        const categoryProducts = products
          .filter(p => p.category === category)
          .slice(0, 3);
        
        return (
          <section key={category} className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-vtc-darkbrown">{category}'s Collection</h2>
                <Link 
                  to={`/search?category=${category}`} 
                  className="text-vtc-red hover:text-vtc-brown flex items-center"
                >
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {categoryProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA Section */}
      <section className="py-16 bg-vtc-brown text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need a Bulk Order?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            We provide special pricing and manufacturing capabilities for large orders. 
            Perfect for retailers, institutions, and corporate requirements.
          </p>
          <Button asChild className="bg-white text-vtc-red hover:bg-gray-100">
            <Link to="/bulk-order">
              Request Bulk Order
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
