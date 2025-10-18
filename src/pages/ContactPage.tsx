import { motion } from "motion/react";
import { contactPageContent } from "../content/pages/contact";
import { Footer } from "../components/Footer";
import { Navigation } from "../components/Navigation";
import { PageHead } from "../components/PageHead";
import { Mail } from "lucide-react";

export function ContactPage() {
  const content = contactPageContent;

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
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 border-b border-border">
          <div className="container mx-auto px-6 md:px-12 max-w-4xl">
            <motion.div
              {...fadeInUp}
              className="text-center space-y-6"
            >
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light">
                {content.hero.title}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto">
                {content.hero.description}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Sections */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 md:px-12 max-w-4xl">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16">
              {content.sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="space-y-4"
                >
                  <h2 className="font-display text-2xl md:text-3xl font-light">
                    {section.title}
                  </h2>
                  <div className="space-y-3">
                    {section.content.map((paragraph, pIndex) => (
                      <p
                        key={pIndex}
                        className="text-base text-muted-foreground leading-relaxed font-light"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {section.email && (
                    <a
                      href={`mailto:${section.email}`}
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group mt-2"
                    >
                      <Mail className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      <span className="font-medium">{section.email}</span>
                    </a>
                  )}
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
