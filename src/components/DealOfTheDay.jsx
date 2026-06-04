import { motion } from 'framer-motion';
import { CheckCircle2, ShoppingCart } from 'lucide-react';
import { useSale } from '../context/SaleContext';

const tvProduct = {
  id: 101,
  name: 'Samsung 55" OLED 4K Smart TV',
  price: 899.99,
  oldPrice: 1499.99,
  image: '/images/oled_tv.png',
};

export default function DealOfTheDay() {
  const { time, saleEnded, addToCart } = useSale();

  const pad = (n) => String(n).padStart(2, '0');

  const features = [
    '4K OLED Display',
    '120Hz Refresh Rate',
    'Smart TV with Tizen OS',
    'Dolby Atmos Sound',
  ];


  return (
    <section className="deal-section" id="deals">
      <div className="container-main">
        <motion.div
          className="deal-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          {/* Left – Details */}
          <div>
            <div className="deal-eyebrow">DEAL OF THE DAY</div>
            <h3 className="deal-title">Samsung 55" OLED 4K Smart TV</h3>
            <p className="deal-desc">
              Experience incredible picture quality with deep blacks,
              vibrant colors, and stunning detail.
            </p>

            <ul className="deal-features">
              {features.map((f) => (
                <li key={f}>
                  <CheckCircle2 size={16} /> {f}
                </li>
              ))}
            </ul>

            {/* Mini Countdown */}
            <div className="deal-timer-units" style={{ marginBottom: 20 }}>
              {saleEnded ? (
                <div className="text-rose-500 font-extrabold text-sm tracking-wider uppercase bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-100">
                  Offer Expired
                </div>
              ) : (
                [
                  { v: pad(time.hours), l: 'Hours' },
                  { v: pad(time.minutes), l: 'Minutes' },
                  { v: pad(time.seconds), l: 'Seconds' },
                ].map((u) => (
                  <div key={u.l} className="deal-timer-unit">
                    <div className="deal-timer-val">{u.v}</div>
                    <div className="deal-timer-label">{u.l}</div>
                  </div>
                ))
              )}
            </div>

            <div className="deal-prices flex flex-col gap-0.5 mb-2.5">
              <div className="flex items-baseline gap-2">
                <span className="deal-price text-3xl font-black text-slate-900">₹{Math.round(899.99 * 83).toLocaleString('en-IN')}</span>
                <span className="deal-old-price text-base text-slate-400 line-through">₹{Math.round(1499.99 * 83).toLocaleString('en-IN')}</span>
              </div>
            </div>
            <div className="deal-discount-badge" style={{ marginBottom: 24 }}>40% OFF</div>

            <motion.button
              className={`deal-buy-btn ${saleEnded ? 'bg-slate-300 cursor-not-allowed opacity-60 hover:scale-100' : ''}`}
              whileHover={saleEnded ? {} : { scale: 1.03 }}
              whileTap={saleEnded ? {} : { scale: 0.97 }}
              onClick={() => !saleEnded && addToCart(tvProduct)}
              disabled={saleEnded}
              id="deal-buy-now"
            >
              {saleEnded ? 'Sale Ended' : 'Buy Now'} <ShoppingCart size={18} />
            </motion.button>
          </div>

          {/* Center – hidden spacer */}
          <div className="deal-center" style={{ display: 'none' }}></div>

          {/* Right – Image */}
          <div className="deal-img-wrap">
            <motion.img
              src="/images/oled_tv.png"
              alt="Samsung OLED 4K Smart TV"
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
