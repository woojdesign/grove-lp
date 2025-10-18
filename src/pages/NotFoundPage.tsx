import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { motion } from 'motion/react';
import { PageHead } from '../components/PageHead';

export function NotFoundPage() {
  return (
    <>
      <PageHead
        metadata={{
          title: 'Page Not Found | Commonplace',
          description: 'The page you\'re looking for doesn\'t exist.',
        }}
        noindex={true}
      />

      <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
        {/* Subtle gradient background matching site design */}
        <div className="fixed inset-0 -z-10 animate-gradient opacity-20 bg-gradient-warm" />

      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center space-y-12 max-w-3xl mx-auto"
        >
          {/* Large 404 - Editorial style */}
          <div className="space-y-2">
            <h1 className="font-display text-9xl md:text-[12rem] font-light text-foreground/10">
              404
            </h1>
            <p className="font-display text-4xl md:text-5xl font-light -mt-16">
              Page not found
            </p>
          </div>

          {/* Friendly explanation */}
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light max-w-2xl mx-auto">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back to where connections happen.
          </p>

          {/* CTA buttons matching site style */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Button
                asChild
                size="lg"
                className="group relative overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-7 rounded-full transition-all duration-300"
              >
                <Link to="/">
                  <span className="relative z-10">Return Home</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Button
                asChild
                size="lg"
                variant="outline"
                className="px-10 py-7 rounded-full border-2 border-teal hover:bg-teal hover:text-white transition-all duration-300"
              >
                <Link to="/#contact">
                  Contact Us
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Subtle help text */}
          <p className="text-sm text-muted-foreground pt-8">
            Looking for something specific?{' '}
            <Link to="/" className="text-accent-color hover:underline">
              Start from our homepage
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
    </>
  );
}
