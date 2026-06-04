import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="newsletter-section" id="newsletter">
      <div className="container-main">
        <div className="newsletter-card">
          <div className="relative z-10">
            <motion.h2
              className="newsletter-title"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Get exclusive deals delivered weekly
            </motion.h2>
            
            <motion.p
              className="newsletter-subtitle"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              Join over 50,000+ shoppers and get early access to our most competitive discounts and premium product drops.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {isSubmitted ? (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center justify-center gap-3 bg-white/10 border border-white/20 text-white p-4 rounded-xl max-w-md mx-auto"
                >
                  <CheckCircle size={20} className="text-emerald-400" />
                  <span className="font-medium text-sm">Successfully subscribed! Check your inbox soon.</span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="newsletter-form">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="newsletter-input"
                  />
                  <button
                    type="submit"
                    className="newsletter-btn flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>Subscribe</span>
                    <Send size={16} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
