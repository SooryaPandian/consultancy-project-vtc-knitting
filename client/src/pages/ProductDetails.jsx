import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import { useAuth } from '../components/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import ReactMarkdown from 'react-markdown';
import { Star, ShoppingCart, Heart, Share2, Ruler, ChevronLeft, LogIn, Timer, AlertTriangle } from 'lucide-react';
import ProductReviews from '../components/ProductReviews';

const ProductDetails = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('White');
  const [quantity, setQuantity] = useState(1);
  const [reviewInput, setReviewInput] = useState('');
  const [ratingInput, setRatingInput] = useState(5);
  const [offerTimeRemaining, setOfferTimeRemaining] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${productId}`);
        const data = await response.json();
        setProduct(data);
        console.log(data);
        // Set default size and color
        const defaultColor = data?.variants?.[0]?.colorName || 'White';
        const defaultSize = data?.variants?.[0]?.sizes?.[0]?.size || 'M';
        setSelectedColor(defaultColor);
        setSelectedSize(defaultSize);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const getCurrentSizeInfo = () => {
    const selectedVariant = product?.variants?.find(variant => variant.colorName === selectedColor);
    if (!selectedVariant) return { price: product?.basePrice || 0, stock: 0 };
    const sizeInfo = selectedVariant.sizes.find(size => size.size === selectedSize);
    return sizeInfo || { price: product.basePrice, stock: 0 };
  };

  // Calculate available stock based on selected size and color
  const getAvailableStock = () => {
    const sizeInfo = getCurrentSizeInfo();
    return sizeInfo.stock || 0;
  };

  // Calculate discount price
  const calculateDiscountedPrice = (originalPrice) => {
    if (!product?.discount || product.discount <= 0) return originalPrice;
    return originalPrice * (1 - product.discount / 100);
  };

  // Check if offer is valid
  const isOfferValid = () => {
    return product?.discount > 0 && 
           product?.offerEndsAt && 
           new Date(product.offerEndsAt) > new Date();
  };

  // Live countdown timer for offer
  useEffect(() => {
    if (!product?.offerEndsAt || !isOfferValid()) {
      setOfferTimeRemaining(null);
      return;
    }

    const updateTimer = () => {
      const total = new Date(product.offerEndsAt) - new Date();
      if (total <= 0) {
        setOfferTimeRemaining(null);
        return;
      }
      const days = Math.floor(total / (1000 * 60 * 60 * 24));
      const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((total % (1000 * 60)) / 1000);

      let str = '';
      if (days > 0) str = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      else if (hours > 0) str = `${hours}h ${minutes}m ${seconds}s`;
      else if (minutes > 0) str = `${minutes}m ${seconds}s`;
      else str = `${seconds}s`;

      setOfferTimeRemaining(str);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [product?.offerEndsAt, product?.discount]);

  const sizeChartData = {
    'XS': { chest: '84-88', waist: '70-74', hips: '90-94' },
    'S': { chest: '88-94', waist: '74-80', hips: '94-98' },
    'M': { chest: '94-102', waist: '80-88', hips: '98-104' },
    'L': { chest: '102-110', waist: '88-96', hips: '104-110' },
    'XL': { chest: '110-118', waist: '96-104', hips: '110-118' },
    'XXL': { chest: '118-129', waist: '104-114', hips: '118-128' }
  };
  const renderStars = (rating) => {
      return Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
      ));
    };
  
  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast({
        title: 'Authentication Required',
        description: 'Please login to add items to your cart',
        variant: 'destructive',
      });
      return;
    }

    const availableStock = getAvailableStock();
    if (availableStock < quantity) {
      toast({
        title: 'Insufficient Stock',
        description: `Only ${availableStock} items available for this size and color combination`,
        variant: 'destructive',
      });
      return;
    }

    const currentPrice = getCurrentSizeInfo().price;
    const discountedPrice = isOfferValid() ? calculateDiscountedPrice(currentPrice) : currentPrice;
    
    addToCart({
      ...product,
      selectedSize,
      selectedColor,
      price: discountedPrice,
      originalPrice: currentPrice,
      quantity
    });

    toast({
      title: 'Added to Cart',
      description: `${product.name} (${selectedSize}, ${selectedColor}) added to your cart`,
    });
  };

  const handleColorSelection = (colorName) => {
    setSelectedColor(colorName);
    const selectedVariant = product?.variants?.find(variant => variant.colorName === colorName);
    if (selectedVariant?.sizes?.length > 0) {
      setSelectedSize(selectedVariant.sizes[0].size); // Default to the first available size for the selected color
    }
  };

  const handleSizeSelection = (size) => {
    setSelectedSize(size);
  };

  if (loading) return <div className="p-8 text-center">Loading product...</div>;

  // Ensure product data is valid before rendering
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/search">Back to Products</Link>
        </Button>
      </div>
    );
  }

  const currentSizeInfo = getCurrentSizeInfo();
  const availableStock = getAvailableStock();
  const isOfferActive = isOfferValid();
  const currentPrice = currentSizeInfo.price;
  const discountedPrice = isOfferActive ? calculateDiscountedPrice(currentPrice) : currentPrice;
  
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link to="/search" className="text-vtc-red hover:text-vtc-brown flex items-center">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Products
          </Link>
        </div>
        
        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="relative">
              <img 
                src={product.variants.find(variant => variant.colorName === selectedColor)?.images[0] || product.image} 
                alt={product.name} 
                className="w-full object-cover h-[500px]"
              />
              
              {/* Discount Badge */}
              {isOfferActive && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-vtc-red text-white text-lg px-3 py-1.5">
                    {product.discount}% OFF
                  </Badge>
                </div>
              )}
            </div>
          </div>
          
          {/* Product Info */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="bg-vtc-red text-white text-xs font-medium px-2 py-1 rounded">
                {product.category}
              </span>
              <span className="text-sm text-gray-500">{product.type}</span>
              
              {/* Limited Time Offer */}
              {isOfferActive && offerTimeRemaining && (
                <div className="flex items-center text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                  <Timer className="h-3 w-3 mr-1" />
                  <span>Offer ends in {offerTimeRemaining}</span>
                </div>
              )}
            </div>
            
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
            
            {/* Rating Display */}
            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {renderStars(product.rating)}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating?.toFixed(1)} ({product.reviews?.length || 0} reviews)
              </span>
            </div>
            
            {/* Price Display */}
            <div className="mb-4">
              {isOfferActive ? (
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold text-vtc-red">
                    ₹{discountedPrice.toFixed(2)}
                  </div>
                  <div className="text-lg text-gray-500 line-through">
                    ₹{currentPrice.toFixed(2)}
                  </div>
                  <Badge className="bg-green-600">Save ₹{(currentPrice - discountedPrice).toFixed(2)}</Badge>
                </div>
              ) : (
                <div className="text-2xl font-bold text-vtc-darkbrown">
                  ₹{currentPrice.toFixed(2)}
                </div>
              )}
            </div>
            
            {/* Stock Status */}
            <div className="mb-4">
              {availableStock > 10 ? (
                <span className="text-green-600 text-sm flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                  In Stock ({availableStock} available)
                </span>
              ) : availableStock > 0 ? (
                <span className="text-orange-500 text-sm flex items-center">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Low Stock (Only {availableStock} left)
                </span>
              ) : (
                <span className="text-red-600 text-sm flex items-center">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Out of Stock
                </span>
              )}
            </div>
            
            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-gray-800">Select Size</h3>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-vtc-red flex items-center">
                      <Ruler className="h-4 w-4 mr-1" />
                      Size Chart
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Size Chart (measurements in cm)</DialogTitle>
                    </DialogHeader>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Size</TableHead>
                          <TableHead>Chest</TableHead>
                          <TableHead>Waist</TableHead>
                          <TableHead>Hips</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {Object.entries(sizeChartData).map(([size, measurements]) => (
                          <TableRow key={size}>
                            <TableCell className="font-medium">{size}</TableCell>
                            <TableCell>{measurements.chest}</TableCell>
                            <TableCell>{measurements.waist}</TableCell>
                            <TableCell>{measurements.hips}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </DialogContent>
                </Dialog>
              </div>
              
              <RadioGroup 
                value={selectedSize} 
                onValueChange={handleSizeSelection} 
                className="flex flex-wrap gap-2"
              >
                {product.variants
                  .find(variant => variant.colorName === selectedColor)
                  ?.sizes.map(sizeOption => (
                    <div key={sizeOption.size} className="flex flex-col items-center">
                      <RadioGroupItem 
                        value={sizeOption.size} 
                        id={`size-${sizeOption.size}`} 
                        className="sr-only" 
                        disabled={sizeOption.stock === 0}
                      />
                      <Label
                        htmlFor={`size-${sizeOption.size}`}
                        className={`px-4 py-2 border rounded-md cursor-pointer flex flex-col items-center ${
                          selectedSize === sizeOption.size
                            ? 'bg-vtc-red text-white border-vtc-red'
                            : sizeOption.stock === 0
                              ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <span>{sizeOption.size}</span>
                        <span className={`text-xs mt-1 ${selectedSize === sizeOption.size ? 'text-white' : 'text-gray-500'}`}>
                          ₹{isOfferActive 
                            ? calculateDiscountedPrice(sizeOption.price).toFixed(0) 
                            : sizeOption.price.toFixed(0)}
                        </span>
                      </Label>
                    </div>
                  ))}
              </RadioGroup>
            </div>
            
            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-800 mb-2">Select Color</h3>
              
              <RadioGroup 
                value={selectedColor} 
                onValueChange={handleColorSelection} 
                className="flex flex-wrap gap-3"
              >
                {product.variants.map(variant => (
                  <div key={variant.colorName} className="flex flex-col items-center">
                    <RadioGroupItem 
                      value={variant.colorName} 
                      id={`color-${variant.colorName}`}
                      className="sr-only"
                    />
                    <Label
                      htmlFor={`color-${variant.colorName}`}
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          selectedColor === variant.colorName 
                            ? 'ring-2 ring-vtc-red ring-offset-2' 
                            : ''
                        }`}
                        style={{ backgroundColor: variant.colorCode }}
                      >
                        {selectedColor === variant.colorName && (
                          <span className="text-xs text-white">✓</span>
                        )}
                      </span>
                      <span className="text-xs mt-1">{variant.colorName}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            {/* Quantity Selection */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-800 mb-2">Quantity</h3>
              
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                
                <span className="mx-4 w-8 text-center">{quantity}</span>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(availableStock, quantity + 1))}
                  disabled={quantity >= availableStock}
                >
                  +
                </Button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              {isAuthenticated ? (
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-vtc-red hover:bg-vtc-brown"
                  disabled={availableStock === 0}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {availableStock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </Button>
              ) : (
                <Button
                  asChild
                  className="flex-1 bg-vtc-red hover:bg-vtc-brown"
                >
                  <Link to="/login">
                    <LogIn className="h-5 w-5 mr-2" />
                    Login to Buy
                  </Link>
                </Button>
              )}
              
              <Button variant="outline" className="border-vtc-red text-vtc-red">
                <Heart className="h-5 w-5 mr-2" />
                Wishlist
              </Button>
              
              <Button variant="outline" className="border-vtc-red text-vtc-red">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Tabs for Details, Description, Reviews */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-12">
          <Tabs defaultValue="description">
            <TabsList className="mb-6">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Product Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews & Ratings</TabsTrigger>
            </TabsList>
            
            {/* Description Tab */}
            <TabsContent value="description" className="prose max-w-none">
              <div className="markdown-content">
                <ReactMarkdown>
                  {product.description}
                </ReactMarkdown>
              </div>
            </TabsContent>
            
            {/* Details Tab */}
            <TabsContent value="details">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800">Specifications</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Material: 100% Cotton</li>
                  <li>Care: Machine wash, tumble dry low</li>
                  <li>Color: {product.colors?.map(c => c.name).join(', ')}</li>
                  <li>Manufactured in: Tiruppur, India</li>
                </ul>
                
                <h3 className="text-lg font-medium text-gray-800 mt-6">Features</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Breathable fabric for all-day comfort</li>
                  <li>Reinforced stitching for durability</li>
                  <li>Pre-shrunk to maintain size and shape</li>
                  <li>Easy care and maintenance</li>
                </ul>
              </div>
            </TabsContent>
            
            {/* Reviews Tab */}
            <TabsContent value="reviews">
              <ProductReviews 
                product={product}
                isAuthenticated={isAuthenticated}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
