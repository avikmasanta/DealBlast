import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle } from 'lucide-react';
import { useSale } from '../context/SaleContext';

export default function Toast() {
  const { toast, setToast } = useSale();

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 2800);
    return () => clearTimeout(timer);
  }, [toast, setToast]);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          className="fixed bottom-6 right-6 z-[100] max-w-sm flex items-center gap-3 p-4 rounded-2xl shadow-xl border backdrop-blur-md transition-all"
          style={{
            background: toast.type === 'error' ? 'rgba(254, 242, 242, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            borderColor: toast.type === 'error' ? '#FECACA' : '#E2E8F0',
          }}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.95 }}
        >
          {toast.type === 'error' ? (
            <AlertCircle className="text-rose-500 flex-shrink-0" size={18} />
          ) : (
            <CheckCircle className="text-emerald-500 flex-shrink-0" size={18} />
          )}

          <span className="text-xs font-semibold text-slate-800 flex-1 leading-relaxed">
            {toast.message}
          </span>

          <button
            onClick={() => setToast(null)}
            className="text-slate-400 hover:text-slate-600 transition-colors p-0.5 rounded-full hover:bg-slate-100 flex items-center justify-center cursor-pointer"
          >
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
