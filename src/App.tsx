import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { motion } from "motion/react";
import { ArrowRight, Shield, Users, Sparkles, CheckCircle2 } from "lucide-react";
import heroImage from "figma:asset/1d238fd6df90dc12f9289f962d9003c6c6a24d61.png";

export default function App() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Subtle animated gradient background */}
      <div 
        className="fixed inset-0 -z-10 animate-gradient opacity-30"
        style={{
          background: 'linear-gradient(135deg, rgba(212, 165, 116, 0.15) 0%, rgba(250, 250, 249, 0) 30%, rgba(160, 120, 85, 0.1) 60%, rgba(250, 250, 249, 0) 100%)'
        }}
      />
      {/* Hero Section - Editorial Style */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 z-0">
          {/* Reduced gradient overlay */}
          <div className="absolute inset-0 z-10" style={{
            background: 'radial-gradient(circle at 30% 20%, rgba(212, 165, 116, 0.12) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(160, 120, 85, 0.1) 0%, transparent 50%), linear-gradient(135deg, rgba(26, 26, 26, 0.65) 0%, rgba(26, 26, 26, 0.55) 50%, rgba(47, 69, 56, 0.6) 100%)'
          }} />
          <img
            src={heroImage}
            alt="People connecting through shared interests"
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
                Designed for human connection
              </Badge>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="mx-auto max-w-5xl"
              style={{ 
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                lineHeight: '1.1',
                fontFamily: 'Georgia, serif',
                fontWeight: 300,
                letterSpacing: '-0.02em'
              }}
            >
              In every big company or school, there are{' '}
              <span style={{ fontStyle: 'italic', color: '#d4a574' }}>hundreds of people</span>
              {' '}you'd love to know but never meet.
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl mx-auto max-w-3xl opacity-90"
              style={{ lineHeight: '1.6', fontWeight: 300 }}
            >
              Commonplace quietly introduces you to the people who share your passions, experiences, and goals — so large organizations feel a little more human again.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
            >
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-white/90 px-10 py-7 rounded-full transition-all duration-300 hover:scale-105"
              >
                Get Early Access
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="ghost"
                className="px-10 py-7 rounded-full text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                Request a Demo
              </Button>
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
            Already sparking conversations at
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.3, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center items-center gap-12"
          >
            <div className="text-lg tracking-tight">Company A</div>
            <div className="text-lg tracking-tight">University B</div>
            <div className="text-lg tracking-tight">Startup C</div>
          </motion.div>
        </div>
      </section>

      {/* The Problem - Large Editorial Text */}
      <section className="py-32 md:py-40 relative overflow-hidden">
        <div 
          className="absolute inset-0 -z-10 animate-gradient opacity-20"
          style={{
            background: 'linear-gradient(135deg, rgba(212, 165, 116, 0.08) 0%, rgba(250, 250, 249, 0) 40%, rgba(160, 120, 85, 0.06) 70%, rgba(250, 250, 249, 0) 100%)'
          }}
        />
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-12"
          >
            <h2 
              style={{ 
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                lineHeight: '1.2',
                fontFamily: 'Georgia, serif',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                textAlign: 'center'
              }}
            >
              Organizations have never been more{' '}
              <span style={{ fontStyle: 'italic' }}>connected</span> — and people have never felt more{' '}
              <span style={{ fontStyle: 'italic' }}>disconnected.</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-center" style={{ lineHeight: '1.7', fontWeight: 300 }}>
              Remote work, hybrid teams, and endless Slack threads mean that we know our coworkers' calendars better than we know them. Culture can't thrive if people never cross paths — and serendipity doesn't scale on its own.
            </p>
            
            <div className="pt-8 text-center">
              <p className="text-2xl md:text-3xl" style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif', fontWeight: 300, color: '#a07855' }}>
                Commonplace restores serendipity — intentionally.
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
              src="https://images.unsplash.com/photo-1753729213561-0fd9e4669d15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBjYWxtfGVufDF8fHx8MTc2MDQ4NjYzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Modern workspace"
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
              <h3 
                className="mb-6"
                style={{ 
                  fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                  lineHeight: '1.2',
                  fontFamily: 'Georgia, serif',
                  fontWeight: 300,
                  letterSpacing: '-0.01em'
                }}
              >
                Thoughtful introductions, powered by{' '}
                <span style={{ fontStyle: 'italic', color: '#d4a574' }}>quiet intelligence.</span>
              </h3>
              <p className="text-lg opacity-80 mb-8" style={{ lineHeight: '1.7', fontWeight: 300 }}>
                Commonplace asks a few fun, open-ended questions to learn what makes each person tick, then maps interests using AI embeddings — like semantic DNA for your community.
              </p>
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/10 group px-0"
              >
                Learn more
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How Commonplace Works - Minimal Cards */}
      <section className="py-32 md:py-40 bg-muted/30">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-20"
          >
            <h2 
              style={{ 
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                lineHeight: '1.2',
                fontFamily: 'Georgia, serif',
                fontWeight: 300,
                letterSpacing: '-0.02em'
              }}
            >
              No scrolling. No feeds.{' '}
              <span style={{ fontStyle: 'italic' }}>Just connection.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            <ProcessCard
              number="01"
              title="Listen"
              description="Commonplace asks a few fun, open-ended questions to learn what makes each person tick."
              delay={0.1}
            />
            <ProcessCard
              number="02"
              title="Learn"
              description="Our system maps interests and experiences using AI embeddings — like semantic DNA for your community."
              delay={0.25}
            />
            <ProcessCard
              number="03"
              title="Connect"
              description="Every month, Commonplace introduces you to someone nearby who shares your curiosity."
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Trust Section - Light */}
      <section className="py-32 md:py-40 relative overflow-hidden">
        <div 
          className="absolute inset-0 -z-10 animate-gradient opacity-20"
          style={{
            background: 'linear-gradient(135deg, rgba(160, 120, 85, 0.06) 0%, rgba(250, 250, 249, 0) 40%, rgba(212, 165, 116, 0.08) 70%, rgba(250, 250, 249, 0) 100%)'
          }}
        />
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-20"
          >
            <h2 
              style={{ 
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                lineHeight: '1.2',
                fontFamily: 'Georgia, serif',
                fontWeight: 300,
                letterSpacing: '-0.02em'
              }}
            >
              Safe, private, and built for{' '}
              <span style={{ fontStyle: 'italic' }}>enterprises.</span>
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="grid md:grid-cols-2 gap-x-16 gap-y-8 max-w-4xl mx-auto"
          >
            <TrustFeature text="SOC2-ready and GDPR-compliant security" />
            <TrustFeature text="Double opt-in introductions only" />
            <TrustFeature text="Aggregated analytics, never person-level tracking" />
            <TrustFeature text="Flexible credentialing (email, SSO, or geofence)" />
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
            <h2 
              style={{ 
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                lineHeight: '1.2',
                fontFamily: 'Georgia, serif',
                fontWeight: 300,
                letterSpacing: '-0.02em'
              }}
            >
              <span style={{ fontStyle: 'italic' }}>Belonging</span> drives retention.{' '}
              <span style={{ fontStyle: 'italic' }}>Connection</span> drives innovation.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 mb-24">
            <StatCard
              stat="74%"
              description="of employees say they'd stay longer if they felt more connected at work"
              delay={0.1}
            />
            <StatCard
              stat="30-50%"
              description="participation within 90 days in Commonplace pilot organizations"
              delay={0.25}
            />
            <StatCard
              stat="3 of 4"
              description="participants report &quot;meeting someone they wouldn't have otherwise&quot;"
              delay={0.4}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <TestimonialCard
              quote="Our campus finally feels smaller."
              author="MBA student"
              delay={0.1}
            />
            <TestimonialCard
              quote="It's like a quiet culture supercharger."
              author="HR Director"
              delay={0.25}
            />
          </div>
        </div>
      </section>

      {/* Final CTA - Minimal */}
      <section className="py-32 md:py-40 relative overflow-hidden">
        <div 
          className="absolute inset-0 -z-10 animate-gradient opacity-20"
          style={{
            background: 'linear-gradient(135deg, rgba(212, 165, 116, 0.08) 0%, rgba(250, 250, 249, 0) 40%, rgba(160, 120, 85, 0.06) 70%, rgba(250, 250, 249, 0) 100%)'
          }}
        />
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-center space-y-12"
          >
            <h2 
              style={{ 
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                lineHeight: '1.2',
                fontFamily: 'Georgia, serif',
                fontWeight: 300,
                letterSpacing: '-0.02em'
              }}
            >
              Ready to make your organization feel more{' '}
              <span style={{ fontStyle: 'italic' }}>human?</span>
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-7 rounded-full transition-all duration-300 hover:scale-105"
              >
                Request a Demo
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="px-10 py-7 rounded-full border-2 hover:bg-muted/50 transition-all duration-300"
              >
                Get Early Access
              </Button>
            </div>

            <p className="text-muted-foreground pt-8" style={{ lineHeight: '1.7' }}>
              Commonplace pilots start with 200–500 users and grow organically.<br />
              We'll handle setup; you enjoy the ripple effects.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-muted-foreground">
              Commonplace © 2025 — Designed to make large organizations feel small again.
            </p>
            <div className="flex gap-8 text-sm">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Security
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
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
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-4"
    >
      <div className="text-sm text-muted-foreground tracking-widest uppercase mb-4">
        {number}
      </div>
      <h3 
        className="mb-3"
        style={{ 
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          fontFamily: 'Georgia, serif',
          fontWeight: 300
        }}
      >
        {title}
      </h3>
      <p className="text-muted-foreground" style={{ lineHeight: '1.7' }}>
        {description}
      </p>
    </motion.div>
  );
}

function TrustFeature({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 text-lg">
      <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0" />
      <p>
        {text}
      </p>
    </div>
  );
}

function StatCard({ stat, description, delay }: { stat: string; description: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="text-center"
    >
      <div 
        className="mb-6"
        style={{ 
          fontSize: 'clamp(3rem, 6vw, 5rem)',
          fontFamily: 'Georgia, serif',
          fontWeight: 300,
          lineHeight: 1,
          color: '#d4a574'
        }}
      >
        {stat}
      </div>
      <p className="text-sm opacity-80" style={{ lineHeight: '1.6' }}>
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
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="border border-white/10 rounded-lg p-10 backdrop-blur-sm"
    >
      <p 
        className="mb-6"
        style={{ 
          fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
          fontStyle: 'italic',
          fontFamily: 'Georgia, serif',
          fontWeight: 300,
          lineHeight: '1.5'
        }}
      >
        "{quote}"
      </p>
      <p className="text-sm opacity-70 uppercase tracking-wider">
        {author}
      </p>
    </motion.div>
  );
}
