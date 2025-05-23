import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { BACKEND_URL } from '../../data/config';

const initialSize = { size: '', price: '', stock: '' };
const initialVariant = { colorName: '', colorCode: '', images: [''], sizes: [{ ...initialSize }] };

const AddProduct = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [discount, setDiscount] = useState('');
  const [offerEndsAt, setOfferEndsAt] = useState('');
  const [variants, setVariants] = useState([{ ...initialVariant }]);
  const navigate = useNavigate();

  // Variant handlers
  const handleVariantChange = (idx, field, value) => {
    setVariants(variants =>
      variants.map((v, i) => (i === idx ? { ...v, [field]: value } : v))
    );
  };

  const handleVariantImageChange = (variantIdx, imgIdx, value) => {
    setVariants(variants =>
      variants.map((v, i) =>
        i === variantIdx
          ? { ...v, images: v.images.map((img, j) => (j === imgIdx ? value : img)) }
          : v
      )
    );
  };

  const addVariant = () => setVariants([...variants, { ...initialVariant }]);
  const removeVariant = idx => setVariants(variants.filter((_, i) => i !== idx));

  // Size handlers for variants
  const handleVariantSizeChange = (variantIdx, sizeIdx, field, value) => {
    setVariants(variants =>
      variants.map((v, i) =>
        i === variantIdx
          ? {
              ...v,
              sizes: v.sizes.map((s, j) =>
                j === sizeIdx ? { ...s, [field]: value } : s
              ),
            }
          : v
      )
    );
  };

  const addVariantSize = (variantIdx) => {
    setVariants(variants =>
      variants.map((v, i) =>
        i === variantIdx
          ? { ...v, sizes: [...v.sizes, { ...initialSize }] }
          : v
      )
    );
  };

  const removeVariantSize = (variantIdx, sizeIdx) => {
    setVariants(variants =>
      variants.map((v, i) =>
        i === variantIdx
          ? { ...v, sizes: v.sizes.filter((_, j) => j !== sizeIdx) }
          : v
      )
    );
  };

  const addVariantImage = (variantIdx) => {
    setVariants(variants =>
      variants.map((v, i) =>
        i === variantIdx
          ? { ...v, images: [...v.images, ''] }
          : v
      )
    );
  };

  const removeVariantImage = (variantIdx, imgIdx) => {
    setVariants(variants =>
      variants.map((v, i) =>
        i === variantIdx
          ? { ...v, images: v.images.filter((_, j) => j !== imgIdx) }
          : v
      )
    );
  };

  // Apply sizes from first variant to all
  const applySizesToAllVariants = () => {
    const baseSizes = variants[0]?.sizes || [];
    setVariants(variants =>
      variants.map((v, i) =>
        i === 0 ? v : { ...v, sizes: baseSizes.map(s => ({ ...s })) }
      )
    );
  };

  // Apply images from first variant to all
  const applyImagesToAllVariants = () => {
    const baseImages = variants[0]?.images || [''];
    setVariants(variants =>
      variants.map((v, i) =>
        i === 0 ? v : { ...v, images: baseImages.map(img => img) }
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare product object for backend
    const product = {
      name,
      category,
      type,
      basePrice: Number(basePrice),
      description,
      image,
      discount: discount ? Number(discount) : 0,
      offerEndsAt: offerEndsAt ? new Date(offerEndsAt).toISOString() : null,
      variants: variants.map(v => ({
        colorName: v.colorName,
        colorCode: v.colorCode,
        images: v.images,
        sizes: v.sizes.map(s => ({
          size: s.size,
          price: Number(s.price),
          stock: Number(s.stock)
        }))
      }))
    };

    try {
      const res = await fetch(`${BACKEND_URL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(product),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to add product');
      }

      toast({
        title: 'Product Added',
        description: `${name} has been added successfully`,
      });
      navigate('/admin/products');
    } catch (err) {
      toast({
        title: 'Error',
        description: err.message || 'Failed to add product',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-2">Add New Product</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input id="name" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Men">Men</SelectItem>
                <SelectItem value="Women">Women</SelectItem>
                <SelectItem value="Children">Children</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Input id="type" value={type} onChange={e => setType(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="basePrice">Base Price</Label>
            <Input id="basePrice" type="number" value={basePrice} onChange={e => setBasePrice(e.target.value)} required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description (Markdown supported)</Label>
          <Textarea id="description" value={description} onChange={e => setDescription(e.target.value)} className="min-h-[100px]" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image">Default Image URL</Label>
          <Input id="image" value={image} onChange={e => setImage(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="discount">Discount (%)</Label>
          <Input id="discount" type="number" value={discount} onChange={e => setDiscount(e.target.value)} min="0" max="100" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="offerEndsAt">Offer Ends At</Label>
          <Input id="offerEndsAt" type="datetime-local" value={offerEndsAt} onChange={e => setOfferEndsAt(e.target.value)} />
        </div>

        {/* Variants Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="font-semibold">Variants (Colors)</Label>
            <Button type="button" variant="outline" onClick={addVariant}>
              Add Color Variant
            </Button>
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={applySizesToAllVariants}>
              Apply Sizes to All Variants
            </Button>
            <Button type="button" variant="outline" onClick={applyImagesToAllVariants}>
              Apply Images to All Variants
            </Button>
          </div>
          {variants.map((variant, vIdx) => (
            <div key={vIdx} className="border rounded p-4 mb-2">
              <div className="flex gap-2 items-center mb-2">
                <Input
                  placeholder="Color Name (e.g. Red, Blue)"
                  value={variant.colorName}
                  onChange={e => handleVariantChange(vIdx, 'colorName', e.target.value)}
                  required
                />
                <Input
                  placeholder="Color Code (e.g. #FF0000)"
                  value={variant.colorCode}
                  onChange={e => handleVariantChange(vIdx, 'colorCode', e.target.value)}
                  required
                />
                {variants.length > 1 && (
                  <Button type="button" variant="outline" onClick={() => removeVariant(vIdx)}>
                    Remove Color
                  </Button>
                )}
              </div>
              <div className="space-y-2 mb-2">
                <Label>Images</Label>
                {variant.images.map((img, imgIdx) => (
                  <div key={imgIdx} className="flex gap-2 items-center mb-1">
                    <Input
                      placeholder="Image URL"
                      value={img}
                      onChange={e => handleVariantImageChange(vIdx, imgIdx, e.target.value)}
                      required
                    />
                    {variant.images.length > 1 && (
                      <Button type="button" variant="outline" onClick={() => removeVariantImage(vIdx, imgIdx)}>
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={() => addVariantImage(vIdx)}>
                  Add Image
                </Button>
              </div>
              <div className="space-y-2">
                <Label>Sizes</Label>
                {variant.sizes.map((sz, sIdx) => (
                  <div key={sIdx} className="flex gap-2 items-center">
                    <Input
                      placeholder="Size (e.g. S, M, L)"
                      value={sz.size}
                      onChange={e => handleVariantSizeChange(vIdx, sIdx, 'size', e.target.value)}
                      required
                    />
                    <Input
                      placeholder="Price"
                      type="number"
                      value={sz.price}
                      onChange={e => handleVariantSizeChange(vIdx, sIdx, 'price', e.target.value)}
                      required
                    />
                    <Input
                      placeholder="Stock"
                      type="number"
                      value={sz.stock}
                      onChange={e => handleVariantSizeChange(vIdx, sIdx, 'stock', e.target.value)}
                      required
                    />
                    {variant.sizes.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => removeVariantSize(vIdx, sIdx)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addVariantSize(vIdx)}
                >
                  Add Size
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" type="button" onClick={() => navigate('/admin/products')}>Cancel</Button>
          <Button type="submit" className="bg-vtc-red hover:bg-vtc-brown">Add Product</Button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
