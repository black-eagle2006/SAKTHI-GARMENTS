import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, PriceBreakdown } from '../types';

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  itemCount: number;
  breakdown: PriceBreakdown;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('sakthi_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('sakthi_cart', JSON.stringify(items));
  }, [items]);

  const addItem = (item: Omit<CartItem, 'id'>) => {
    const id = `${item.productId}_${item.size}_${item.color}_${item.itemType}_${Date.now()}`;
    const newItem: CartItem = {
      ...item,
      id,
      totalPrice: item.unitPrice * item.quantity,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = Math.max(1, item.quantity + delta);
            return {
              ...item,
              quantity: newQty,
              totalPrice: item.unitPrice * newQty,
            };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate pricing breakdown
  const calculateBreakdown = (): PriceBreakdown => {
    let baseGarmentPrice = 0;
    let customizationFee = 0;

    items.forEach((item) => {
      if (item.itemType === 'CUSTOM') {
        const base = 299 * item.quantity;
        const custom = (item.unitPrice - 299) * item.quantity;
        baseGarmentPrice += base;
        customizationFee += Math.max(0, custom);
      } else if (item.itemType === 'SAMPLE') {
        baseGarmentPrice += item.unitPrice * item.quantity;
      } else {
        baseGarmentPrice += item.unitPrice * item.quantity;
      }
    });

    const subtotalRaw = baseGarmentPrice + customizationFee;
    // Quantity discount: 10% off if total quantity >= 5
    const quantityDiscount = itemCount >= 5 ? Math.round(subtotalRaw * 0.1) : 0;
    const subtotal = subtotalRaw - quantityDiscount;

    // Delivery: ₹50 or Free if subtotal > ₹999
    const shippingFee = subtotal > 999 || items.length === 0 ? 0 : 50;

    // GST: 5% on garments in India
    const taxAmount = Math.round(subtotal * 0.05);

    const totalAmount = subtotal + shippingFee + taxAmount;

    return {
      baseGarmentPrice,
      customizationFee,
      quantityDiscount,
      subtotal,
      shippingFee,
      taxAmount,
      totalAmount,
    };
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        breakdown: calculateBreakdown(),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
