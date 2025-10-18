import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { homePageContent } from "../content/pages/home";
import { Footer } from "../components/Footer";

export function HomePage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  };

  const content = homePageContent;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Subtle animated gradient background */}
      <div className="fixed inset-0 -z-10 animate-gradient opacity-30 bg-gradient-subtle" />

      {/* Hero Section - Editorial Style */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary text-primary-foreground">
        {/* Gradient Orbs for visual interest */}
        <div className="gradient-orb gradient-orb-warm absolute top-20 right-10 w-96 h-96 animate-float" style={{ animationDelay: '0s' }} />
        <div className="gradient-orb gradient-orb-cool absolute bottom-40 left-20 w-80 h-80 animate-float" style={{ animationDelay: '2s' }} />

        <div className="absolute inset-0 z-0">
          {/* Reduced gradient overlay */}
          <div className="absolute inset-0 z-10 bg-hero-overlay" />
          <img
            src={content.hero.backgroundImage.src}
            alt={content.hero.backgroundImage.alt}
            className="w-full h-full object-cover opacity-60"
          />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-20 max-w-6xl">
          <motion.div
            className="text-center space-y-12 py-24"
            initial="initial"
            animate="animate"
          >
            <motion.div variants={fadeInUp}>
              <Badge variant="outline" className="mb-8 px-6 py-2.5 bg-white/5 border-white/20 text-white backdrop-blur-sm">
                {content.hero.badge}
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="mx-auto max-w-5xl font-display text-hero font-light"
            >
              {content.hero.headline.before}{' '}
              <span className="italic text-accent-color">{content.hero.headline.highlight}</span>
              {' '}{content.hero.headline.after}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl mx-auto max-w-3xl opacity-90 leading-relaxed font-light"
            >
              {content.hero.subheadline}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <Button
                  size="lg"
                  className="group relative overflow-hidden bg-white text-black hover:bg-white/90 px-10 py-7 rounded-full transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center">
                    {content.hero.buttons.primary.text}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  {/* Subtle glow effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <Button
                  size="lg"
                  variant="ghost"
                  className="px-10 py-7 rounded-full text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                >
                  {content.hero.buttons.secondary.text}
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof Strip */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-6 md:px-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center text-sm uppercase tracking-widest text-muted-foreground mb-8"
          >
            {content.socialProof.heading}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.3, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center items-center gap-12"
          >
            {content.socialProof.companies.map((company) => (
              <div key={company} className="text-lg tracking-tight">{company}</div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* The Problem - Large Editorial Text */}
      <section className="py-32 md:py-40 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 animate-gradient opacity-20 bg-gradient-warm" />
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-12"
          >
            <h2 className="font-display text-section-heading font-light text-center">
              {content.problem.heading.before}{' '}
              <span className="italic">{content.problem.heading.highlight1}</span> {content.problem.heading.middle}{' '}
              <span className="italic">{content.problem.heading.highlight2}</span>
            </h2>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-center leading-loose font-light">
              {content.problem.description}
            </p>

            <div className="pt-8 text-center">
              <p className="text-2xl md:text-3xl italic font-display font-light text-secondary-color">
                {content.problem.callout}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Split Feature Section - Dark */}
      <section className="bg-primary text-primary-foreground">
        <div className="grid md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-[500px] md:min-h-[700px]"
          >
            <img
              src={content.feature.image.src}
              alt={content.feature.image.alt}
              className="w-full h-full object-cover opacity-80"
            />
          </motion.div>
          <div className="flex items-center justify-center p-12 md:p-20">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-lg"
            >
              <h3 className="mb-6 font-display text-subsection-heading font-light">
                {content.feature.heading.before}{' '}
                <span className="italic text-accent-color">{content.feature.heading.highlight}</span>
              </h3>
              <p className="text-lg opacity-80 mb-8 leading-loose font-light">
                {content.feature.description}
              </p>
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10 group px-0"
              >
                {content.feature.ctaText}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How Commonplace Works - Minimal Cards */}
      <section className="py-32 md:py-40 bg-muted/30 relative overflow-hidden">
        {/* Subtle gradient orb */}
        <div className="gradient-orb gradient-orb-cool absolute top-10 left-10 w-72 h-72" style={{ opacity: '0.08' }} />

        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-20"
          >
            <h2 className="font-display text-section-heading-alt font-light">
              {content.process.heading.before}{' '}
              <span className="italic">{content.process.heading.highlight}</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            {content.process.steps.map((step, index) => (
              <ProcessCard
                key={step.number}
                number={step.number}
                title={step.title}
                description={step.description}
                delay={0.1 + index * 0.15}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section - Light */}
      <section className="py-32 md:py-40 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 animate-gradient opacity-20 bg-gradient-warm-reverse" />
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-20"
          >
            <h2 className="font-display text-section-heading-alt font-light">
              {content.trust.heading.before}{' '}
              <span className="italic">{content.trust.heading.highlight}</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="grid md:grid-cols-2 gap-x-16 gap-y-8 max-w-4xl mx-auto"
          >
            {content.trust.features.map((feature) => (
              <TrustFeature key={feature} text={feature} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Outcomes - Dark with Stats */}
      <section className="py-32 md:py-40 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-24"
          >
            <h2 className="font-display text-section-heading-alt font-light">
              <span className="italic">{content.outcomes.heading.highlight1}</span> {content.outcomes.heading.middle}{' '}
              <span className="italic">{content.outcomes.heading.highlight2}</span> {content.outcomes.heading.after}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 mb-24">
            {content.outcomes.stats.map((stat, index) => (
              <StatCard
                key={stat.value}
                stat={stat.value}
                description={stat.description}
                delay={0.1 + index * 0.15}
              />
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {content.outcomes.testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.author}
                quote={testimonial.quote}
                author={testimonial.author}
                delay={0.1 + index * 0.15}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Minimal */}
      <section className="py-32 md:py-40 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 animate-gradient opacity-20 bg-gradient-warm" />
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-center space-y-12"
          >
            <h2 className="font-display text-section-heading font-light">
              {content.finalCTA.heading.before}{' '}
              <span className="italic">{content.finalCTA.heading.highlight}</span>
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <Button
                  size="lg"
                  className="group relative overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-7 rounded-full transition-all duration-300"
                >
                  <span className="relative z-10">{content.finalCTA.buttons.primary.text}</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="px-10 py-7 rounded-full border-2 border-teal hover:bg-teal hover:text-white transition-all duration-300"
                >
                  {content.finalCTA.buttons.secondary.text}
                </Button>
              </motion.div>
            </div>

            <p className="text-muted-foreground pt-8 leading-loose">
              {content.finalCTA.subtext.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i === 0 && <br />}
                </span>
              ))}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

function ProcessCard({ number, title, description, delay }: {
  number: string;
  title: string;
  description: string;
  delay: number;
}) {
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

function TrustFeature({ text }: { text: string }) {
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

function StatCard({ stat, description, delay }: { stat: string; description: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="text-center p-8 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-colors"
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

function TestimonialCard({ quote, author, delay }: { quote: string; author: string; delay: number }) {
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
