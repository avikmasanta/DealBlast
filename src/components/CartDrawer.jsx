import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Lock } from 'lucide-react';
import { useSale } from '../context/SaleContext';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQty,
    clearCart,
    showToast,
    saleEnded
  } = useSale();

  const handleCheckout = () => {
    if (saleEnded) {
      showToast('Cannot checkout: The sale has ended!', 'error');
      return;
    }
    showToast('Processing checkout...');
    setTimeout(() => {
      showToast('🎉 Order placed successfully! Thank you for shopping with DealBlast.', 'success');
      clearCart();
      setIsCartOpen(false);
    }, 1200);
  };

  const rupeeRate = 83;
  const subtotalUSD = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const subtotalINR = subtotalUSD * rupeeRate;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="premium-drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
          />

          {/* Drawer Panel Container */}
          <motion.div
            className="premium-drawer-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
          >
            {/* Header */}
            <div className="premium-drawer-header">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <ShoppingBag size={18} />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base leading-tight">Your Cart</h3>
                  <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                    {cart.length === 0 ? 'Empty' : `${cart.reduce((s, i) => s + i.qty, 0)} items`}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-all cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="premium-drawer-body space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 mb-4 border border-slate-100 shadow-inner">
                    <ShoppingBag size={26} />
                  </div>
                  <h4 className="font-bold text-slate-800 text-base mb-1">Your cart is empty</h4>
                  <p className="text-xs text-slate-400 max-w-[240px] mb-6 leading-relaxed">
                    Explore our premier flash sales and add items to your cart before time runs out!
                  </p>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="btn-action-premium"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="cart-item-card"
                  >
                    <div className="cart-item-img-wrap">
                      <img
                        src={item.image}
                        alt={item.name}
                      />
                    </div>

                    <div className="cart-item-details">
                      <div>
                        <h4 className="cart-item-name">{item.name}</h4>
                        <div className="flex items-baseline gap-1.5 mb-2">
                          <span className="font-extrabold text-slate-900 text-sm">
                            ₹{Math.round(item.price * rupeeRate).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-1">
                        {/* Qty Selector */}
                        <div className="cart-item-qty-selector">
                          <button
                            onClick={() => updateCartQty(item.id, -1)}
                            className="cart-item-qty-btn"
                            disabled={item.qty <= 1}
                          >
                            <Minus size={12} />
                          </button>
                          <span className="cart-item-qty-val">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateCartQty(item.id, 1)}
                            className="cart-item-qty-btn"
                            disabled={saleEnded}
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-400 hover:text-rose-500 p-1.5 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="premium-drawer-footer space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-800">
                      ₹{Math.round(subtotalINR).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Shipping</span>
                    <span className="text-emerald-600 font-bold uppercase tracking-wider text-[10px]">
                      Free
                    </span>
                  </div>
                  <div className="border-t border-slate-200/80 my-2 pt-2.5 flex justify-between items-baseline">
                    <span className="font-extrabold text-slate-900 text-sm">Total Amount</span>
                    <div className="text-right">
                      <span className="font-black text-slate-900 text-xl">
                        ₹{Math.round(subtotalINR).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-1">
                  {saleEnded ? (
                    <div className="bg-rose-50 text-rose-600 border border-rose-100 rounded-xl p-3 text-center text-xs font-semibold">
                      Checkout is disabled because the flash sale has ended.
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={handleCheckout}
                        className="btn-checkout-premium"
                      >
                        Proceed to Checkout <ArrowRight size={16} />
                      </button>
                      
                      {/* Secured checkout trust block with payment icons */}
                      <div className="space-y-2.5 pt-1.5">
                        <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-medium">
                          <Lock size={10} />
                          <span>Secured by SSL checkout encryption</span>
                        </div>
                        
                        {/* Visa, Mastercard, Apple Pay, PayPal, Google Pay icons */}
                        <div className="payment-logos">
                          {/* Visa */}
                          <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="payment-logo-item" title="Visa">
                            <rect width="32" height="20" rx="3" fill="#1A1F71"/>
                            <path d="M12.2 13.2H10.6L11.6 7.6H13.2L12.2 13.2ZM19.7 7.8C19.4 7.6 18.8 7.4 18.1 7.4C16.4 7.4 15.2 8.3 15.2 9.6C15.2 10.6 16.1 11.1 16.8 11.4C17.5 11.7 17.7 11.9 17.7 12.2C17.7 12.7 17.1 12.9 16.6 12.9C15.9 12.9 15.5 12.7 15.2 12.6L14.9 14.1C15.3 14.3 16.1 14.4 16.9 14.4C18.7 14.4 19.9 13.5 19.9 12.1C19.9 10.9 19.1 10.4 18.2 10.0C17.4 9.6 17.0 9.4 17.0 9.1C17.0 8.7 17.5 8.5 18.0 8.5C18.6 8.5 19.0 8.6 19.3 8.7L19.7 7.8ZM24.4 7.6H23.1C22.7 7.6 22.4 7.8 22.2 8.2L19.7 13.2H21.4L21.7 12.2H23.8L24.0 13.2H25.6L24.4 7.6ZM22.2 10.8L23.0 8.9L23.5 10.8H22.2ZM7.7 7.6L5.3 12.1L4.8 9.3C4.7 8.2 3.8 7.7 2.9 7.6V7.6H6.1L7.2 12.1L8.9 7.6H7.7Z" fill="white"/>
                          </svg>
                          {/* Mastercard */}
                          <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="payment-logo-item" title="Mastercard">
                            <rect width="32" height="20" rx="3" fill="#222222"/>
                            <circle cx="13" cy="10" r="6" fill="#EB001B"/>
                            <circle cx="19" cy="10" r="6" fill="#F79E1B" fillOpacity="0.8"/>
                          </svg>
                          {/* Apple Pay */}
                          <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="payment-logo-item" title="Apple Pay">
                            <rect width="32" height="20" rx="3" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1"/>
                            <path d="M12.0 9.5C12.0 8.3 12.9 7.7 13.0 7.6C12.4 6.8 11.6 6.7 11.3 6.7C10.6 6.6 9.9 7.1 9.5 7.1C9.1 7.1 8.6 6.7 8.0 6.7C7.2 6.7 6.5 7.1 6.1 7.8C5.2 9.3 5.9 11.6 6.8 12.8C7.2 13.4 7.7 14.1 8.3 14.1C9.0 14.1 9.2 13.6 10.0 13.6C10.8 13.6 11.0 14.1 11.6 14.1C12.3 14.1 12.7 13.4 13.2 12.8C13.7 12.0 13.9 11.3 13.9 11.2C13.9 11.2 12.0 10.5 12.0 9.5Z" fill="#0F172A"/>
                            <path d="M11.3 5.8C11.6 5.4 11.8 4.9 11.7 4.3C11.2 4.3 10.7 4.6 10.3 5.1C10.0 5.4 9.8 6.0 9.9 6.5C10.4 6.6 10.9 6.2 11.3 5.8Z" fill="#0F172A"/>
                            <path d="M17.2 8.3C18.1 8.3 19.0 9.1 19.0 10.5C19.0 11.9 18.1 12.7 17.2 12.7C16.3 12.7 15.4 11.9 15.4 10.5C15.4 9.1 16.3 8.3 17.2 8.3ZM17.2 11.6C17.8 11.6 18.1 11.1 18.1 10.5C18.1 9.9 17.8 9.4 17.2 9.4C16.6 9.4 16.3 9.9 16.3 10.5C16.3 11.1 16.6 11.6 17.2 11.6ZM20.2 8.5H21.1V9.3C21.4 8.7 22.0 8.3 22.8 8.3C24.1 8.3 24.9 9.3 24.9 10.5C24.9 11.8 24.1 12.7 22.8 12.7C22.0 12.7 21.4 12.3 21.1 11.8V14.6H20.2V8.5ZM22.5 11.6C23.1 11.6 24.0 11.1 24.0 10.5C24.0 9.9 23.1 9.4 22.5 9.4C21.9 9.4 21.0 9.9 21.0 10.5C21.0 11.1 21.9 11.6 22.5 11.6ZM28.2 8.5L26.3 13.2C26.1 13.8 25.8 14.2 25.3 14.2C25.1 14.2 24.9 14.1 24.7 14.0L24.5 13.3C24.6 13.4 24.8 13.4 24.9 13.4C25.2 13.4 25.4 13.2 25.5 12.9L25.6 12.6L24.1 8.5H25.1L26.0 11.4L27.1 8.5H28.2Z" fill="#0F172A"/>
                          </svg>
                          {/* PayPal */}
                          <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="payment-logo-item" title="PayPal">
                            <rect width="32" height="20" rx="3" fill="#003087"/>
                            <path d="M12.8 14.0L14.2 5.0H17.2C18.6 5.0 19.4 5.6 19.2 6.9C19.0 8.2 17.8 9.0 16.4 9.0H14.8L14.0 14.0H12.8ZM15.8 14.0L17.2 5.0H20.2C21.6 5.0 22.4 5.6 22.2 6.9C22.0 8.2 20.8 9.0 19.4 9.0H17.8L17.0 14.0H15.8Z" fill="#0079C1" fillOpacity="0.85"/>
                            <path d="M10.8 15.0L12.2 6.0H15.2C16.6 6.0 17.4 6.6 17.2 7.9C17.0 9.2 15.8 10.0 14.4 10.0H12.8L12.0 15.0H10.8Z" fill="#0079C1"/>
                          </svg>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
