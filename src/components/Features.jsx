import { motion } from 'framer-motion';
import { Truck, Lock, RotateCcw, Headphones } from 'lucide-react';

const features = [
  {
    icon: <Truck size={24} />,
    title: 'Free Shipping',
    desc: 'Fast & free delivery on all orders',
  },
  {
    icon: <Lock size={24} />,
    title: 'Secure Payments',
    desc: '100% secure payment with SSL encryption',
  },
  {
    icon: <RotateCcw size={24} />,
    title: 'Easy Returns',
    desc: '30-day hassle-free returns policy',
  },
  {
    icon: <Headphones size={24} />,
    title: '24/7 Support',
    desc: 'Dedicated support whenever you need',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
};

export default function Features() {
  return (
    <section className="features-section">
      <div className="container-main">
        <div className="features-grid">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="feature-card"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={cardVariants}
            >
              <div className="feature-icon">{feature.icon}</div>
              <div className="feature-title">{feature.title}</div>
              <div className="feature-desc">{feature.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
