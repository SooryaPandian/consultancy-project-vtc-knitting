
import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

type Categories = {
  Men: boolean;
  Women: boolean;
  Children: boolean;
}

interface FilterPanelProps {
  categories: Categories;
  priceRange: [number, number];
  maxPrice: number;
  selectedType: string;
  types: string[];
  onCategoryChange: (category: keyof Categories) => void;
  onPriceRangeChange: (value: [number, number]) => void;
  onTypeChange: (value: string) => void;
  onClearFilters: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ 
  categories, 
  priceRange, 
  maxPrice,
  selectedType,
  types,
  onCategoryChange, 
  onPriceRangeChange, 
  onTypeChange,
  onClearFilters
}) => {

  return (
    <div className="bg-white rounded-lg shadow-md p-5 sticky top-20">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-medium text-vtc-darkbrown">Filters</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClearFilters}
          className="text-gray-500 hover:text-vtc-red"
        >
          <X className="h-4 w-4 mr-1" />
          Clear All
        </Button>
      </div>
      
      {/* Categories Section */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Categories</h3>
        <div className="space-y-2">
          {Object.keys(categories).map((category) => (
            <div key={category} className="flex items-center">
              <Checkbox 
                id={`category-${category}`} 
                checked={categories[category as keyof Categories]}
                onCheckedChange={() => onCategoryChange(category as keyof Categories)}
                className="text-vtc-red"
              />
              <Label 
                htmlFor={`category-${category}`}
                className="ml-2 text-sm font-normal text-gray-700 cursor-pointer"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Price Range Section */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Price Range</h3>
        <div className="mt-2">
          <Slider 
            defaultValue={[0, maxPrice]} 
            max={maxPrice} 
            step={5}
            value={[priceRange[0], priceRange[1]]}
            onValueChange={(value) => onPriceRangeChange(value as [number, number])}
            className="mb-4"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
        </div>
      </div>
      
      {/* Type Selection */}
      <div className="mb-2">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Product Type</h3>
        <Select value={selectedType} onValueChange={onTypeChange}>
          <SelectTrigger className="w-full border-gray-300">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {types.map((type) => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterPanel;
