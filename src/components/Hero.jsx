import { motion } from 'framer-motion';
import { ArrowRight, Truck, Lock, RotateCcw } from 'lucide-react';

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container-main">
        <div className="hero-grid">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <motion.div
              className="hero-label"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span>✦</span> 24 HOURS ONLY
            </motion.div>

            <h1 className="hero-heading">
              24-Hour<br />
              <em>Flash Sale</em>
            </h1>

            <p className="hero-sub">
              Premium electronics at exclusive prices.<br />
              Don't miss out on the best deals of the year!
            </p>

            <div className="hero-btns">
              <motion.button
                className="btn-primary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                id="hero-shop-now"
              >
                Shop Now <ArrowRight size={18} />
              </motion.button>
              <motion.button
                className="btn-secondary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById('deals')?.scrollIntoView({ behavior: 'smooth' })}
                id="hero-explore"
              >
                Explore Deals
              </motion.button>
            </div>

            <div className="trust-items">
              <div className="trust-item">
                <div className="trust-icon"><Truck size={16} /></div>
                <div>
                  <div className="trust-label">Free Shipping</div>
                  <div className="trust-sub">On all orders</div>
                </div>
              </div>
              <div className="trust-item">
                <div className="trust-icon"><Lock size={16} /></div>
                <div>
                  <div className="trust-label">Secure Payments</div>
                  <div className="trust-sub">100% secure checkout</div>
                </div>
              </div>
              <div className="trust-item">
                <div className="trust-icon"><RotateCcw size={16} /></div>
                <div>
                  <div className="trust-label">Easy Returns</div>
                  <div className="trust-sub">30-day returns</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          >
            <div className="hero-product-stage">
              <div className="hero-glow" />
              <img
                src="/images/headphones.png"
                alt="Premium headphones and electronics"
                className="hero-product-img"
                style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', maxWidth: '280px', zIndex: 3, mixBlendMode: 'multiply' }}
              />
              <img
                src="/images/smartphone.png"
                alt="Premium smartphone"
                className="hero-product-img"
                style={{ position: 'absolute', bottom: '20px', right: '10px', maxWidth: '160px', zIndex: 4, mixBlendMode: 'multiply' }}
              />
              <img
                src="/images/smartwatch.png"
                alt="Premium smartwatch"
                className="hero-product-img"
                style={{ position: 'absolute', bottom: '30px', left: '10px', maxWidth: '130px', zIndex: 2, mixBlendMode: 'multiply' }}
              />

              {/* Floating Badge */}
              <motion.div
                className="hero-badge"
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <span className="hero-badge-up">UP TO</span>
                <span className="hero-badge-num">
                  65<span className="hero-badge-pct">%</span>
                </span>
                <span className="hero-badge-off">OFF</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
