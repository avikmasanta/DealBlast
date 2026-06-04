import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import { useSale } from '../context/SaleContext';

export default function WishlistDrawer() {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    saleEnded
  } = useSale();

  const rupeeRate = 83;

  const handleMoveToCart = (item) => {
    addToCart(item);
    toggleWishlist(item); // Remove from wishlist when added to cart
    setIsWishlistOpen(false); // Close wishlist to show cart
  };

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="premium-drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsWishlistOpen(false)}
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
                <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
                  <Heart size={18} className="fill-rose-500 text-rose-500" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base leading-tight">My Wishlist</h3>
                  <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                    {wishlist.length === 0 ? 'Empty' : `${wishlist.length} saved items`}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-all cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="premium-drawer-body space-y-4">
              {wishlist.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-350 mb-4 border border-slate-100 shadow-inner">
                    <Heart size={26} />
                  </div>
                  <h4 className="font-bold text-slate-800 text-base mb-1">Your wishlist is empty</h4>
                  <p className="text-xs text-slate-400 max-w-[240px] mb-6 leading-relaxed">
                    Tap the heart icon on any products to save them for later!
                  </p>
                  <button
                    onClick={() => {
                      setIsWishlistOpen(false);
                      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="btn-action-premium"
                  >
                    Explore Products
                  </button>
                </div>
              ) : (
                wishlist.map((item) => (
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

                      <div className="flex items-center gap-2 mt-2">
                        {/* Move to Cart */}
                        <button
                          onClick={() => handleMoveToCart(item)}
                          disabled={saleEnded}
                          className="btn-action-premium flex-1 py-2 px-3 text-xs"
                        >
                          <ShoppingCart size={12} />
                          Add to Cart
                        </button>

                        {/* Remove */}
                        <button
                          onClick={() => toggleWishlist(item)}
                          className="w-9 h-9 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-100 flex items-center justify-center transition-colors cursor-pointer"
                          title="Remove from wishlist"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {wishlist.length > 0 && (
              <div className="premium-drawer-footer">
                <button
                  onClick={() => {
                    setIsWishlistOpen(false);
                    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-checkout-premium"
                  style={{ background: 'var(--gray-900)', boxShadow: '0 4px 16px rgba(15,23,42,0.15)' }}
                >
                  Continue Shopping <ArrowRight size={16} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
