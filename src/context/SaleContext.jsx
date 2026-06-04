import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const SaleContext = createContext();

const SALE_DURATION = 5 * 60; // 5 minutes in seconds

export function SaleProvider({ children }) {
  const [secondsLeft, setSecondsLeft] = useState(SALE_DURATION);
  const [saleEnded, setSaleEnded] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [toast, setToast] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (saleEnded) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setSaleEnded(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [saleEnded]);

  // Parse time
  const time = {
    days: 0,
    hours: Math.floor(secondsLeft / 3600),
    minutes: Math.floor((secondsLeft % 3600) / 60),
    seconds: secondsLeft % 60,
  };

  // Show toast notification
  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
  }, []);

  // Add to cart
  const addToCart = useCallback((product) => {
    if (saleEnded) {
      showToast('Sale has ended!', 'error');
      return;
    }
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        showToast(`${product.name} quantity updated!`);
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      showToast(`${product.name} added to cart!`);
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true); // Auto-open cart drawer when item is added!
  }, [saleEnded, showToast]);

  // Toggle wishlist
  const toggleWishlist = useCallback((product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        showToast(`${product.name} removed from wishlist`);
        return prev.filter((item) => item.id !== product.id);
      }
      showToast(`${product.name} added to wishlist! ❤️`);
      return [...prev, product];
    });
  }, [showToast]);

  // Remove from cart
  const removeFromCart = useCallback((productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
    showToast('Item removed from cart');
  }, [showToast]);

  // Update cart quantity
  const updateCartQty = useCallback((productId, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  }, []);

  // Clear cart (for checkout)
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Cart count
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <SaleContext.Provider
      value={{
        time,
        secondsLeft,
        saleEnded,
        cart,
        wishlist,
        toast,
        setToast,
        cartCount,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        toggleWishlist,
        showToast,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
      }}
    >
      {children}
    </SaleContext.Provider>
  );
}

export function useSale() {
  const context = useContext(SaleContext);
  if (!context) throw new Error('useSale must be used within SaleProvider');
  return context;
}

