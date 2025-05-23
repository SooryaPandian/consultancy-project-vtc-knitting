
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, LogIn, Star, Timer } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: any; // Will properly type this once all product types are updated
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  
  const handleAddToCart = () => {
    if (isAuthenticated) {
      // Get first variant and its first size for default selection
      const defaultVariant = product.variants[0];
      const defaultSize = defaultVariant.sizes[0];
      
      addToCart({
        ...product,
        selectedColor: defaultVariant.colorName,
        selectedSize: defaultSize.size,
        price: defaultSize.price,
        quantity: 1
      });
    } else {
      toast({
        title: "Authentication Required",
        description: "Please login to add items to your cart",
        variant: "destructive",
      });
    }
  };
  
  // Get price range from all variants and their sizes
  const getPriceRange = () => {
    const allPrices = product.variants.flatMap(v => v.sizes.map(s => s.price));
    const minPrice = Math.min(...allPrices);
    const maxPrice = Math.max(...allPrices);
    return minPrice === maxPrice ? `₹${minPrice}` : `₹${minPrice} - ₹${maxPrice}`;
  };
  
  // Check if offer is valid
  const hasOffer = product.discount > 0 && product.offerEndsAt && new Date(product.offerEndsAt) > new Date();
  
  // Calculate time remaining for offer
  const getTimeRemaining = () => {
    if (!product.offerEndsAt) return null;
    
    const total = new Date(product.offerEndsAt) - new Date();
    if (total <= 0) return null;
    
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
  };
  
  const timeRemaining = getTimeRemaining();
  
  // Get total stock across all variants and sizes
  const getTotalStock = () => {
    return product.variants.reduce(
      (acc, variant) => acc + variant.sizes.reduce((sum, size) => sum + size.stock, 0),
      0
    );
  };
  
  // Render star rating
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          className={`h-3 w-3 ${i <= Math.round(rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
        />
      );
    }
    return stars;
  };
  
  const totalStock = getTotalStock();
  const priceRange = getPriceRange();
  
  return (
    <div className="product-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden h-48">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          
          <div className="absolute top-2 right-2 bg-white/90 text-xs font-medium px-2 py-1 rounded text-vtc-red">
            {product.category}
          </div>
          
          {hasOffer && (
            <div className="absolute top-2 left-2">
              <Badge className="bg-vtc-red text-white">{product.discount}% OFF</Badge>
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-gray-800 text-lg mb-1">{product.name}</h3>
        </Link>
        <p className="text-gray-500 text-sm mb-1">{product.type}</p>
        
        {/* Rating Display */}
        <div className="flex items-center mb-2">
          <div className="flex mr-1">
            {renderStars(product.rating)}
          </div>
          <span className="text-xs text-gray-500">({product.rating})</span>
        </div>
        
        {/* Limited Time Offer */}
        {hasOffer && timeRemaining && (
          <div className="flex items-center text-xs text-vtc-red mb-2">
            <Timer className="h-3 w-3 mr-1" />
            <span>Offer ends in {timeRemaining}</span>
          </div>
        )}
        
        {/* Price Display */}
        <div className="flex items-center mb-2">
          <span className="font-bold text-vtc-darkbrown">
            {priceRange}
          </span>
          {hasOffer && (
            <span className="ml-2 text-xs text-gray-500 line-through">
              ₹{Math.round(parseInt(priceRange.replace('₹', '')) / (1 - product.discount / 100))}
            </span>
          )}
        </div>
        
        {/* Stock Status */}
        <div className="text-xs text-gray-500 mb-3">
          {totalStock > 10 
            ? 'In Stock' 
            : totalStock > 0 
              ? 'Low Stock' 
              : 'Out of Stock'
          }
        </div>
        
        {/* Action Button */}
        {isAuthenticated ? (
          <Button 
            variant="outline" 
            size="sm"
            className="w-full text-vtc-red border-vtc-red hover:bg-vtc-red hover:text-white"
            onClick={handleAddToCart}
            disabled={totalStock === 0}
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            {totalStock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="w-full text-vtc-red border-vtc-red hover:bg-vtc-red hover:text-white"
            asChild
          >
            <Link to="/login">
              <LogIn className="h-4 w-4 mr-1" />
              Login to Buy
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
