import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '../components/ui/use-toast';

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    // Load cart items from localStorage on initialization
    const storedItems = localStorage.getItem('cartItems');
    return storedItems ? JSON.parse(storedItems) : [];
  });

  useEffect(() => {
    // Save cart items to localStorage whenever they change
    localStorage.setItem('cartItems', JSON.stringify(items));
  }, [items]);

  const addToCart = (product) => {
    setItems(prevItems => {
      // Check if product already exists in cart
      console.log('Adding to cart:', product);
      console.log('Current cart items:', prevItems);
      const existingItem = prevItems.find(item => item.id === product.id && item.selectedColor === product.selectedColor && item.selectedSize === product.selectedSize);
      
      if (existingItem) {
        // Increase quantity if item already exists
        return prevItems.map(item => 
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity } 
            : item
        );
      } else {
        // Find the variant index for the selected color
        const variantIndex = product.variants.findIndex(variant => variant.colorName === product.selectedColor);
        
        // Add new item with quantity and variantIndex
        console.log("added new item");
        console.log("variantIndex", variantIndex);
        console.log(product.variants[variantIndex])
        return [...prevItems, { ...product, quantity: product.quantity, variantIndex }];
      }
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      duration: 2000,
    });
  };

  const removeFromCart = (productId) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const getCartTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const getCartCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };
  
  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      getCartTotal,
      getCartCount,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
