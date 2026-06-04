import { motion } from 'framer-motion';
import { Smartphone, Laptop, Headphones, Watch, Tv, Camera } from 'lucide-react';

const categories = [
  { icon: <Smartphone size={24} />, name: 'Smartphones', count: '120+ products' },
  { icon: <Laptop size={24} />, name: 'Laptops', count: '85+ products' },
  { icon: <Headphones size={24} />, name: 'Audio', count: '200+ products' },
  { icon: <Watch size={24} />, name: 'Wearables', count: '65+ products' },
  { icon: <Tv size={24} />, name: 'TVs', count: '45+ products' },
  { icon: <Camera size={24} />, name: 'Cameras', count: '30+ products' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4 },
  }),
};

export default function Categories() {
  return (
    <section className="categories-section" id="categories">
      <div className="container-main">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-eyebrow">✦ BROWSE</div>
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-subtitle">
            Find exactly what you're looking for
          </p>
        </motion.div>

        <div className="categories-grid">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              className="category-card"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={cardVariants}
            >
              <div className="category-icon">{cat.icon}</div>
              <div className="category-name">{cat.name}</div>
              <div className="category-count">{cat.count}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
