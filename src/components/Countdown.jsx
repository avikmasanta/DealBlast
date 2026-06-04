import { motion } from 'framer-motion';
import { Calendar, Clock, Timer, Bell } from 'lucide-react';
import { useSale } from '../context/SaleContext';

export default function Countdown() {
  const { time, saleEnded } = useSale();

  const pad = (n) => String(n).padStart(2, '0');

  const units = [
    { icon: <Calendar size={20} />, value: pad(time.days), label: 'Days' },
    { icon: <Clock size={20} />, value: pad(time.hours), label: 'Hours' },
    { icon: <Timer size={20} />, value: pad(time.minutes), label: 'Minutes' },
    { icon: <Bell size={20} />, value: pad(time.seconds), label: 'Seconds' },
  ];


  return (
    <section className="countdown-section">
      <div className="container-main">
        <motion.div
          className="countdown-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          {saleEnded ? (
            <div className="flex flex-col items-center justify-center w-full py-4 text-center">
              <span className="text-rose-500 font-black text-2xl tracking-widest uppercase mb-1.5 flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping"></span>
                FLASH SALE ENDED
              </span>
              <span className="text-slate-500 text-sm font-medium">
                Subscribe below to receive notifications for our next exclusive drop!
              </span>
            </div>
          ) : (
            units.map((unit, i) => (
              <div key={unit.label} style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                {i > 0 && <span className="countdown-sep" style={{ marginRight: '48px' }}>:</span>}
                <div className="countdown-unit">
                  <div className="countdown-icon">{unit.icon}</div>
                  <div>
                    <div className="countdown-value">{unit.value}</div>
                    <div className="countdown-label">{unit.label}</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
}
