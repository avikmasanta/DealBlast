import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Tag } from 'lucide-react';
import { useSale } from '../context/SaleContext';

export default function SalesPopup() {
  const { showToast } = useSale();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let hasVisited = false;
    let forcePopup = false;

    try {
      hasVisited = localStorage.getItem('dealblast_visited');
    } catch (e) {
      console.warn('Storage blocked:', e);
    }

    try {
      forcePopup = window.location.search.includes('popup=true');
    } catch (e) {
      console.warn('Location blocked:', e);
    }

    if (forcePopup || !hasVisited) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        try {
          localStorage.setItem('dealblast_visited', 'true');
        } catch (e) {
          // ignore
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('FLASH65');
    setCopied(true);
    showToast('Coupon code FLASH65 copied successfully!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClaim = () => {
    handleCopyCode();
    setIsOpen(false);
    const productsSec = document.getElementById('products');
    if (productsSec) {
      productsSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
          />

          {/* DealBlast Promo Image Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: 'spring', damping: 24, stiffness: 240 }}
            className="relative bg-white w-full max-w-[400px] rounded-[24px] overflow-hidden shadow-2xl border border-slate-100 z-10 select-none flex flex-col font-sans"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-950/40 hover:bg-slate-950/60 text-white transition-colors z-50 cursor-pointer"
            >
              <X size={14} />
            </button>

            {/* Banner Section */}
            <div className="w-full aspect-square overflow-hidden bg-slate-950">
              <img
                src="/images/promo_banner.png"
                alt="DealBlast Biggest Tech Sale 65% OFF"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Body */}
            <div className="p-5 flex flex-col items-center text-center space-y-4">
              {/* Coupon Ticket box */}
              <div className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center justify-between">
                <div className="text-left">
                  <div className="text-[8px] font-bold text-slate-400 uppercase tracking-wide">COUPON CODE</div>
                  <div className="font-mono text-sm font-black text-blue-600 leading-none mt-0.5">FLASH65</div>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                >
                  {copied ? (
                    <span className="flex items-center gap-1">
                      <Check size={10} /> Copied
                    </span>
                  ) : (
                    <span>Copy Code</span>
                  )}
                </button>
              </div>

              {/* Action Buttons */}
              <div className="w-full space-y-1.5">
                <button
                  onClick={handleClaim}
                  className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-lg transition-all shadow-md shadow-blue-600/10 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Tag size={14} />
                  <span>Claim Offer & Shop Now</span>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2 text-slate-400 hover:text-slate-600 text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-colors"
                >
                  No thanks, continue shopping
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
