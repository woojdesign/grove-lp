import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

interface TrustFeatureProps {
  text: string;
}

export function TrustFeature({ text }: TrustFeatureProps) {
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
