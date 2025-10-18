import { motion } from "motion/react";

interface TestimonialCardProps {
  quote: string;
  author: string;
  delay: number;
}

export function TestimonialCard({ quote, author, delay }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.2)", transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="border border-white/10 rounded-lg p-10 backdrop-blur-sm hover:border-white/20 transition-colors"
    >
      <p className="mb-6 font-display text-testimonial font-light">
        "{quote}"
      </p>
      <p className="text-sm opacity-70 uppercase tracking-wider font-sans">
        {author}
      </p>
    </motion.div>
  );
}
