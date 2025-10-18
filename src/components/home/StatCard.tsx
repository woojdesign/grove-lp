import { motion } from "motion/react";

interface StatCardProps {
  stat: string;
  description: string;
  delay: number;
}

export function StatCard({ stat, description, delay }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="text-center p-8"
    >
      <div className="mb-6 font-display text-stat font-light">
        {stat}
      </div>
      <p className="text-sm opacity-80 leading-relaxed font-sans">
        {description}
      </p>
    </motion.div>
  );
}
