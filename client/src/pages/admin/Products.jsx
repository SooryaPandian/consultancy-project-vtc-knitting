import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { Search, Plus, Edit, Trash2, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../data/config';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [productsList, setProductsList] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BACKEND_URL}/api/products`);
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProductsList(data);
      } catch (err) {
        toast({
          title: 'Error',
          description: 'Failed to fetch products from backend',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categoryColors = {
    'Men': 'bg-blue-100 text-blue-800',
    'Women': 'bg-pink-100 text-pink-800',
    'Children': 'bg-green-100 text-green-800'
  };

  // Filter products based on search term
  const filteredProducts = productsList.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (product) => {
    navigate(`/admin/products/${product.id}`);
  };

  const fetchProductDetails = async (productId) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/products/${productId}`);
      if (!res.ok) throw new Error('Failed to fetch product details');
      return await res.json();
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to fetch product details from backend',
        variant: 'destructive',
      });
      return null;
    }
  };

  // Example usage: fetch details before navigating to edit page
  // const handleEdit = async (product) => {
  //   const details = await fetchProductDetails(product.id);
  //   if (details) {
  //     // Optionally pass details to edit page via state or context
  //     navigate(`/admin/products/${product.id}`);
  //   }
  // };

  const confirmDeleteProduct = async () => {
    if (productToDelete) {
      try {
        const res = await fetch(`${BACKEND_URL}/api/products/${productToDelete.id}`, {
          method: 'DELETE',
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Failed to delete product');
        setProductsList(prev => prev.filter(p => p.id !== productToDelete.id));
        setIsDeleteDialogOpen(false);

        toast({
          title: 'Product Deleted',
          description: `${productToDelete.name} has been deleted successfully`,
        });
      } catch (err) {
        toast({
          title: 'Error',
          description: 'Failed to delete product from backend',
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Products</h2>
          <p className="text-sm text-gray-500">Manage your product inventory and details</p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              className="pl-8"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Button
            className="bg-vtc-red hover:bg-vtc-brown"
            onClick={() => navigate('/admin/products/add')}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-3 font-medium text-gray-500">Product</th>
                <th className="px-6 py-3 font-medium text-gray-500">Category</th>
                <th className="px-6 py-3 font-medium text-gray-500">Price</th>
                <th className="px-6 py-3 font-medium text-gray-500">Stock</th>
                <th className="px-6 py-3 font-medium text-gray-500">Discount</th>
                <th className="px-6 py-3 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center">
                    <div className="flex flex-col items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-vtc-red mb-2"></div>
                      <p className="text-gray-500 mb-1">Loading products...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="ml-3">
                          <div className="font-medium text-gray-900">{product.name}</div>
                          <div className="text-xs text-gray-500">{product.type}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={categoryColors[product.category] || 'bg-gray-100 text-gray-800'}>
                        {product.category}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      {product.variants && product.variants.length > 0 ? (
                        <span className="text-gray-700">
                          ₹{Math.min(...product.variants.flatMap(v => v.sizes.map(s => s.price)))} - ₹{Math.max(...product.variants.flatMap(v => v.sizes.map(s => s.price)))}
                        </span>
                      ) : (
                        <span className="text-gray-700">₹{product.basePrice}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {product.variants ? (
                        <span className="text-gray-700">
                          {product.variants.reduce((sum, v) => sum + v.sizes.reduce((s, sz) => s + sz.stock, 0), 0)} units
                        </span>
                      ) : (
                        <span className="text-gray-700">0 units</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {product.discount > 0 ? (
                        <Badge className="bg-green-100 text-green-800">{product.discount}% OFF</Badge>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEdit(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => {
                            setProductToDelete(product);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center">
                    <div className="flex flex-col items-center">
                      <Package className="h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-gray-500 mb-1">No products found</p>
                      <p className="text-sm text-gray-400">Try adjusting your search term</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <p className="text-gray-700">Are you sure you want to delete <span className="font-medium">{productToDelete?.name}</span>?</p>
            <p className="text-gray-500 text-sm mt-1">This action cannot be undone.</p>
          </div>

          <div className="flex justify-end gap-2 mt-2">
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="outline"
              onClick={confirmDeleteProduct}
              className="bg-red-600 hover:bg-red-700 text-black"
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Products;
