import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { Plus, X, Save, Trash2 } from 'lucide-react';
import { BACKEND_URL } from '../../data/config';

const UpdateProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newVariant, setNewVariant] = useState({
    colorName: '',
    colorCode: '',
    images: [''],
    sizes: [{ size: 'S', price: 0, stock: 0 }]
  });

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BACKEND_URL}/api/products/${productId}`);
        if (!res.ok) throw new Error('Failed to fetch product');
        const product = await res.json();
        setFormData({
          name: product.name || '',
          category: product.category || '',
          type: product.type || '',
          description: product.description || '',
          basePrice: product.basePrice || 0,
          image: product.image || '',
          rating: product.rating || 0,
          discount: product.discount || 0,
          offerEndsAt: product.offerEndsAt ? new Date(product.offerEndsAt).toISOString().split('T')[0] : '',
          variants: product.variants || [],
        });
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to fetch product details",
          variant: "destructive",
        });
        setFormData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Success",
      description: "Product updated successfully",
    });
    navigate('/admin/products');
  };

  const handleDeleteProduct = () => {
    toast({
      title: "Success",
      description: "Product deleted successfully",
    });
    navigate('/admin/products');
  };

  const addVariant = () => {
    setFormData(prev => ({
      ...prev,
      variants: [...prev.variants, newVariant]
    }));
    setNewVariant({
      colorName: '',
      colorCode: '',
      images: [''],
      sizes: [{ size: 'S', price: 0, stock: 0 }]
    });
  };

  const removeVariant = (index) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        Loading product details...
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Update Product</h2>
        <Button 
          variant="destructive" 
          onClick={handleDeleteProduct}
          className="bg-red-600 hover:bg-red-700"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Product
        </Button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <Input
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <Input
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Base Price</label>
            <Input
              type="number"
              value={formData.basePrice}
              onChange={(e) => setFormData(prev => ({ ...prev, basePrice: parseFloat(e.target.value) }))}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
            <Input
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={formData.rating}
              onChange={(e) => setFormData(prev => ({ ...prev, rating: parseFloat(e.target.value) }))}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Discount (%)</label>
            <Input
              type="number"
              min="0"
              max="100"
              value={formData.discount}
              onChange={(e) => setFormData(prev => ({ ...prev, discount: parseInt(e.target.value) }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Offer Ends At</label>
            <Input
              type="date"
              value={formData.offerEndsAt}
              onChange={(e) => setFormData(prev => ({ ...prev, offerEndsAt: e.target.value }))}
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Main Image URL</label>
            <Input
              value={formData.image}
              onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={5}
              required
            />
          </div>
        </div>

        {/* Variants Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Product Variants</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button type="button">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Variant
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Variant</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Color Name</label>
                    <Input
                      value={newVariant.colorName}
                      onChange={(e) => setNewVariant(prev => ({
                        ...prev,
                        colorName: e.target.value
                      }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Color Code</label>
                    <Input
                      type="color"
                      value={newVariant.colorCode}
                      onChange={(e) => setNewVariant(prev => ({
                        ...prev,
                        colorCode: e.target.value
                      }))}
                    />
                  </div>
                  <Button type="button" onClick={addVariant}>Add Variant</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {formData.variants.map((variant, index) => (
            <div key={index} className="border rounded-lg p-4 relative">
              <button
                type="button"
                onClick={() => removeVariant(index)}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              >
                <X className="h-4 w-4" />
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Color Name</label>
                  <Input
                    value={variant.colorName}
                    onChange={(e) => {
                      const newVariants = [...formData.variants];
                      newVariants[index] = {
                        ...variant,
                        colorName: e.target.value
                      };
                      setFormData(prev => ({ ...prev, variants: newVariants }));
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Color Code</label>
                  <Input
                    type="color"
                    value={variant.colorCode}
                    onChange={(e) => {
                      const newVariants = [...formData.variants];
                      newVariants[index] = {
                        ...variant,
                        colorCode: e.target.value
                      };
                      setFormData(prev => ({ ...prev, variants: newVariants }));
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Image URL</label>
                  <Input
                    value={variant.images[0]}
                    onChange={(e) => {
                      const newVariants = [...formData.variants];
                      newVariants[index] = {
                        ...variant,
                        images: [e.target.value]
                      };
                      setFormData(prev => ({ ...prev, variants: newVariants }));
                    }}
                  />
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Sizes</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {variant.sizes.map((size, sizeIndex) => (
                    <div key={sizeIndex} className="border rounded p-2">
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-xs mb-1">Size</label>
                          <Input
                            value={size.size}
                            onChange={(e) => {
                              const newVariants = [...formData.variants];
                              newVariants[index].sizes[sizeIndex].size = e.target.value;
                              setFormData(prev => ({ ...prev, variants: newVariants }));
                            }}
                          />
                        </div>
                        <div>
                          <label className="block text-xs mb-1">Price</label>
                          <Input
                            type="number"
                            value={size.price}
                            onChange={(e) => {
                              const newVariants = [...formData.variants];
                              newVariants[index].sizes[sizeIndex].price = parseFloat(e.target.value);
                              setFormData(prev => ({ ...prev, variants: newVariants }));
                            }}
                          />
                        </div>
                        <div>
                          <label className="block text-xs mb-1">Stock</label>
                          <Input
                            type="number"
                            value={size.stock}
                            onChange={(e) => {
                              const newVariants = [...formData.variants];
                              newVariants[index].sizes[sizeIndex].stock = parseInt(e.target.value);
                              setFormData(prev => ({ ...prev, variants: newVariants }));
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <Button type="submit">
            <Save className="h-4 w-4 mr-2" />
            Update Product
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate('/admin/products')}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
