import { motion } from "motion/react";
import { securityPageContent } from "../content/pages/security";
import { Footer } from "../components/Footer";
import { Navigation } from "../components/Navigation";
import { PageHead } from "../components/PageHead";
import { Shield } from "lucide-react";

export function SecurityPage() {
  const content = securityPageContent;

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  };

  return (
    <>
      <PageHead metadata={content.metadata} />

      <div className="min-h-screen bg-background">
        <Navigation />

        {/* Hero Section */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 border-b border-border bg-muted/30">
          <div className="container mx-auto px-6 md:px-12 max-w-4xl">
            <motion.div
              {...fadeInUp}
              className="text-center space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex justify-center"
              >
                <div className="p-4 rounded-full bg-primary/10">
                  <Shield className="w-12 h-12 text-primary" />
                </div>
              </motion.div>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light">
                {content.hero.title}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto">
                {content.hero.description}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 md:px-12 max-w-3xl">
            <div className="space-y-16">
              {content.sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="space-y-4"
                >
                  <h2 className="font-display text-3xl md:text-4xl font-light">
                    {section.title}
                  </h2>
                  <div className="space-y-4">
                    {section.content.map((paragraph, pIndex) => (
                      <p
                        key={pIndex}
                        className="text-lg text-muted-foreground leading-relaxed font-light"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
