import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Verified Buyer',
    initials: 'SJ',
    rating: 5,
    text: '"Absolutely love my new AirPods Pro! The noise cancellation is incredible and the delivery was super fast. Will definitely shop here again."',
  },
  {
    name: 'Michael Chen',
    role: 'Verified Buyer',
    initials: 'MC',
    rating: 5,
    text: '"Got my MacBook Air at an amazing price during the flash sale. The whole experience was seamless from ordering to delivery. Highly recommend!"',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Verified Buyer',
    initials: 'ER',
    rating: 5,
    text: '"The customer service is outstanding. Had a question about my Apple Watch and they responded within minutes. Great products, great service!"',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

export default function Testimonials() {
  return (
    <section className="testimonials-section" id="reviews">
      <div className="container-main">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-eyebrow">✦ REVIEWS</div>
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">
            Trusted by thousands of happy customers worldwide
          </p>
        </motion.div>

        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="testimonial-card"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={cardVariants}
            >
              <div className="testimonial-stars">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} size={14} fill="#F59E0B" stroke="#F59E0B" />
                ))}
              </div>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.initials}</div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
