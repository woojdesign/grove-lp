import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { fadeInUp, hoverLiftSmall, createTransition, viewport } from "../lib/animations";

export function ProcessCard({ number, title, description, delay }: {
  number: string;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={fadeInUp.initial}
      whileInView={fadeInUp.animate}
      whileHover={hoverLiftSmall}
      viewport={viewport}
      transition={createTransition(1.35, delay)}
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

export function TrustFeature({ text }: { text: string }) {
  return (
    <motion.div
      className="flex items-center gap-3 text-lg"
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <CheckCircle2 className="h-5 w-5 text-teal flex-shrink-0" />
      <p>
        {text}
      </p>
    </motion.div>
  );
}

export function StatCard({ stat, description, delay }: { stat: string; description: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      viewport={viewport}
      transition={createTransition(1.2, delay)}
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

export function TestimonialCard({ quote, author, delay }: { quote: string; author: string; delay: number }) {
  return (
    <motion.div
      initial={fadeInUp.initial}
      whileInView={fadeInUp.animate}
      whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.2)", transition: { duration: 0.3 } }}
      viewport={viewport}
      transition={createTransition(1.2, delay)}
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
