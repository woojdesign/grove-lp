import { motion } from "motion/react";

interface ProcessCardProps {
  number: string;
  title: string;
  description: string;
  delay: number;
}

export function ProcessCard({ number, title, description, delay }: ProcessCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-4"
    >
      <div className="text-sm text-teal tracking-widest uppercase mb-4 font-sans font-semibold">
        {number}
      </div>
      <h3 className="mb-3 font-display text-card-heading font-light">
        {title}
      </h3>
      <p className="text-muted-foreground leading-loose font-sans">
        {description}
      </p>
    </motion.div>
  );
}
