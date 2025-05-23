import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import FilterPanel from '../components/FilterPanel';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search as SearchIcon } from 'lucide-react';
import { BACKEND_URL } from '../data/config';

const Search: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryFromUrl = queryParams.get('category');

  const [products, setProducts] = useState([]);
  const [productTypes, setProductTypes] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState({
    Men: categoryFromUrl === 'Men',
    Women: categoryFromUrl === 'Women',
    Children: categoryFromUrl === 'Children',
  });
  const [selectedType, setSelectedType] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [sortOption, setSortOption] = useState('relevance');
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Handle category change
  const handleCategoryChange = (category: keyof typeof categories) => {
    setCategories(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Handle price range change
  const handlePriceRangeChange = (value: [number, number]) => {
    setPriceRange(value);
  };

  // Handle type change
  const handleTypeChange = (value: string) => {
    setSelectedType(value);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setCategories({
      Men: false,
      Women: false,
      Children: false,
    });
    setPriceRange([0, priceRange[1]]);
    setSelectedType('all');
    setSortOption('relevance');
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/products`);
        const data = await response.json();
        setProducts(data);

        // Extract unique product types
        const types = Array.from(new Set(data.map((product: any) => product.type)));
        setProductTypes(types);

        // Set initial price range
        const maxPrice = Math.max(
          ...data.flatMap((p: any) =>
            p.variants.flatMap((v: any) => v.sizes.map((s: any) => s.price))
          )
        );
        setPriceRange([0, maxPrice]);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products based on all criteria
    let result = products;

    // Search term
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Categories
    const activeCategories = Object.entries(categories)
      .filter(([_, isActive]) => isActive)
      .map(([category]) => category);
    
    if (activeCategories.length > 0) {
      result = result.filter(product => activeCategories.includes(product.category));
    }
    
    // Price range
    result = result.filter(product => {
      const minPrice = Math.min(
        ...product.variants.flatMap(v => 
          v.sizes.map(s => s.price)
        )
      );
      return minPrice >= priceRange[0] && minPrice <= priceRange[1];
    });
    
    // Type
    if (selectedType && selectedType !== 'all') {
      result = result.filter(product => product.type === selectedType);
    }
    
    // Sorting
    if (sortOption === 'price-low') {
      result = [...result].sort((a, b) => {
        const aMinPrice = Math.min(
          ...a.variants.flatMap(v => 
            v.sizes.map(s => s.price)
          )
        );
        const bMinPrice = Math.min(
          ...b.variants.flatMap(v => 
            v.sizes.map(s => s.price)
          )
        );
        return aMinPrice - bMinPrice;
      });
    } else if (sortOption === 'price-high') {
      result = [...result].sort((a, b) => {
        const aMinPrice = Math.min(
          ...a.variants.flatMap(v => 
            v.sizes.map(s => s.price)
          )
        );
        const bMinPrice = Math.min(
          ...b.variants.flatMap(v => 
            v.sizes.map(s => s.price)
          )
        );
        return bMinPrice - aMinPrice;
      });
    } else if (sortOption === 'name-asc') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'name-desc') {
      result = [...result].sort((a, b) => b.name.localeCompare(a.name));
    }
    // If sortOption is 'relevance', we don't need to do any additional sorting
    
    setFilteredProducts(result);
  }, [searchTerm, categories, priceRange, selectedType, sortOption, products]);

  useEffect(() => {
    if (categoryFromUrl) {
      setCategories({
        Men: categoryFromUrl === 'Men',
        Women: categoryFromUrl === 'Women',
        Children: categoryFromUrl === 'Children',
      });
    }
  }, [categoryFromUrl]);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 text-vtc-darkbrown">
          Search Products
        </h1>
        
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8 relative">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Column */}
          <div className="lg:col-span-1">
            <FilterPanel
              categories={categories}
              priceRange={priceRange}
              maxPrice={priceRange[1]}
              selectedType={selectedType}
              types={productTypes}
              onCategoryChange={handleCategoryChange}
              onPriceRangeChange={handlePriceRangeChange}
              onTypeChange={handleTypeChange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Products Column */}
          <div className="lg:col-span-3">
            {/* Sorting and Results Count */}
            <div className="bg-white rounded-lg p-4 shadow-sm mb-6 flex flex-wrap justify-between items-center">
              <p className="text-gray-600">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              </p>
              
              <div className="w-48 mt-2 sm:mt-0">
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="name-asc">Name: A to Z</SelectItem>
                    <SelectItem value="name-desc">Name: Z to A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-8 shadow-sm text-center">
                <h3 className="text-lg font-medium text-gray-800 mb-2">No products found</h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
