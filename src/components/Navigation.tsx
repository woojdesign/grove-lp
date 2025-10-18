import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { navigationContent } from '../content/shared/navigation';

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-display text-xl font-light">
            {navigationContent.logoText}
          </Link>

          <div className="flex items-center gap-6">
            {navigationContent.links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.text}
              </Link>
            ))}

            <Button size="sm" className="rounded-full">
              {navigationContent.ctaButton.text}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
