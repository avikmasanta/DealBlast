import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Heart, ShoppingCart, User, Shield, Menu, X } from 'lucide-react';
import { useSale } from '../context/SaleContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount, wishlist, setIsCartOpen, setIsWishlistOpen, showToast } = useSale();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Home', 'Deals', 'Products', 'Categories', 'Reviews', 'Contact'];

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div className="container-main">
        <div className="navbar-inner">
          {/* Logo */}
          <a href="#" className="logo">
            <div className="logo-icon">
              <Shield size={18} strokeWidth={2.5} />
            </div>
            DealBlast
          </a>

          {/* Nav Links */}
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`}>{item}</a>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="nav-actions">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const q = e.target.elements.search?.value;
                if (q) showToast(`Searching for "${q}"...`);
              }}
              className="search-wrapper"
            >
              <input
                type="text"
                name="search"
                className="search-input"
                placeholder="Search products..."
                id="search-bar"
              />
              <button type="submit" className="search-icon-btn" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                <Search size={16} className="search-icon" />
              </button>
            </form>

            <button
              className="nav-icon-btn relative"
              aria-label="Wishlist"
              id="wishlist-btn"
              onClick={() => setIsWishlistOpen(true)}
            >
              <Heart size={20} className={wishlist.length > 0 ? 'fill-rose-500 text-rose-500' : ''} />
              {wishlist.length > 0 && (
                <span className="cart-badge bg-rose-500 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center absolute -top-1 -right-1">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              className="nav-icon-btn cart-btn relative"
              aria-label="Cart"
              id="cart-btn"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="cart-badge bg-blue-600 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center absolute -top-1 -right-1">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              className="nav-icon-btn"
              aria-label="Account"
              id="account-btn"
              onClick={() => showToast('Login dashboard coming soon!')}
            >
              <User size={20} />
            </button>

            <button
              className="mobile-menu-btn"
              aria-label="Menu"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              padding: '16px 0',
              borderTop: '1px solid var(--gray-100)',
            }}
          >
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {navItems.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    style={{
                      fontSize: '15px',
                      fontWeight: 500,
                      color: 'var(--gray-600)',
                      textDecoration: 'none',
                      padding: '8px 0',
                      display: 'block',
                    }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
