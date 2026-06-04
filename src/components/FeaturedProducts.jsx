import { motion } from 'framer-motion';
import { Star, ArrowRight, Heart, ShoppingCart } from 'lucide-react';
import { useSale } from '../context/SaleContext';

const products = [
  {
    id: 1,
    name: 'Apple AirPods Pro 2',
    image: '/images/airpods.png',
    rating: 4.8,
    reviews: 216,
    price: 199.99,
    oldPrice: 249.99,
    discount: 20,
    badge: 'Best Seller',
    badgeClass: 'badge-bestseller',
    soldPercent: 78,
    stockCount: 14,
  },
  {
    id: 2,
    name: 'Apple Watch Series 9',
    image: '/images/smartwatch.png',
    rating: 4.9,
    reviews: 512,
    price: 349.99,
    oldPrice: 429.99,
    discount: 18,
    badge: 'Hot Deal',
    badgeClass: 'badge-hot',
    soldPercent: 85,
    stockCount: 8,
  },
  {
    id: 3,
    name: 'MacBook Air M2',
    image: '/images/macbook.png',
    rating: 4.9,
    reviews: '1.2K',
    price: 999.99,
    oldPrice: 1199.99,
    discount: 17,
    badge: 'Trending',
    badgeClass: 'badge-trending',
    soldPercent: 64,
    stockCount: 22,
  },
  {
    id: 4,
    name: 'iPhone 15 Pro Max',
    image: '/images/smartphone.png',
    rating: 4.8,
    reviews: 854,
    price: 1099.99,
    oldPrice: 1299.99,
    discount: 15,
    badge: null,
    badgeClass: null,
    soldPercent: 92,
    stockCount: 4,
  },
  {
    id: 5,
    name: 'Sony WH-1000XM5',
    image: '/images/sony_headphones.png',
    rating: 4.7,
    reviews: 309,
    price: 299.99,
    oldPrice: 399.99,
    discount: 25,
    badge: null,
    badgeClass: null,
    soldPercent: 45,
    stockCount: 47,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
  }),
};

export default function FeaturedProducts() {
  const { addToCart, toggleWishlist, wishlist, saleEnded, showToast } = useSale();

  return (
    <section className="products-section" id="products">
      <div className="container-main">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-eyebrow">✦ TOP DEALS</div>
          <h2 className="section-title">Featured Products</h2>
          <p className="section-subtitle">
            Handpicked products with unbeatable prices
          </p>
        </motion.div>

        <div className="products-grid">
          {products.map((product, i) => {
            const isWishlisted = wishlist.some((item) => item.id === product.id);
            return (
              <motion.div
                key={product.id}
                className={`product-card flex flex-col justify-between relative ${saleEnded ? 'opacity-80' : ''}`}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={cardVariants}
              >
                {/* Heart Button */}
                <button
                  className={`product-wishlist-btn ${isWishlisted ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product);
                  }}
                  title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart size={16} className={isWishlisted ? "fill-rose-500 text-rose-500" : ""} />
                </button>

                <div>
                  {product.badge && (
                    <span className={`product-badge ${product.badgeClass}`}>
                      {product.badge}
                    </span>
                  )}

                  <div className="product-img-wrap">
                    <img src={product.image} alt={product.name} loading="lazy" />
                  </div>

                  <div className="product-rating">
                    <Star size={12} fill="#F59E0B" stroke="#F59E0B" />
                    <span className="rating-val">{product.rating}</span>
                    <span className="rating-count">({product.reviews})</span>
                  </div>

                  <div className="product-name">{product.name}</div>

                  <div className="product-prices flex flex-col gap-0.5">
                    <div className="flex items-baseline gap-1.5">
                      <span className="price-current font-extrabold text-[17px] text-slate-900">₹{Math.round(product.price * 83).toLocaleString('en-IN')}</span>
                      <span className="price-original text-xs text-slate-400 line-through">₹{Math.round(product.oldPrice * 83).toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="product-discount">{product.discount}% OFF</div>
                </div>

                <div className="mt-4">
                  {/* Add to Cart button */}
                  <motion.button
                    className="product-add-btn"
                    whileHover={saleEnded ? {} : { scale: 1.02 }}
                    whileTap={saleEnded ? {} : { scale: 0.98 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!saleEnded) addToCart(product);
                    }}
                    disabled={saleEnded}
                  >
                    <ShoppingCart size={13} />
                    {saleEnded ? 'Sale Ended' : 'Add to Cart'}
                  </motion.button>

                  {/* Progress bar container */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 mb-1">
                      <span className="flex items-center gap-1">
                        {product.soldPercent >= 75 && <span className="animate-pulse">🔥</span>}
                        {product.soldPercent}% Sold
                      </span>
                      <span className="text-slate-400">{product.stockCount} left</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${
                          product.soldPercent >= 75
                            ? 'from-amber-500 to-rose-500'
                            : 'from-blue-500 to-indigo-600'
                        }`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${product.soldPercent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="view-all-wrap"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <motion.button
            className="view-all-btn"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => showToast('All exclusive deals are loaded successfully!')}
            id="view-all-products"
          >
            View All Products <ArrowRight size={16} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
