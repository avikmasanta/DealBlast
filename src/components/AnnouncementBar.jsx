import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useSale } from '../context/SaleContext';

export default function AnnouncementBar() {
  const { saleEnded } = useSale();

  return (
    <div className="announcement-bar" style={{ backgroundColor: saleEnded ? '#1E293B' : '' }}>
      <div className="container-main">
        <div className="announcement-inner">
          <motion.span
            className="announcement-text font-semibold text-xs tracking-wider"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {saleEnded
              ? '⌛ FLASH SALE ENDED! The offers have expired, but you can still sign up for our newsletter below.'
              : '🔥 FLASH SALE LIVE NOW! Up to 65% OFF on all electronics. Limited time offer!'}
          </motion.span>
          {!saleEnded && (
            <motion.a
              href="#products"
              className="announcement-cta font-bold text-xs"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Shop Now <ArrowRight size={14} />
            </motion.a>
          )}
        </div>
      </div>
    </div>
  );
}
