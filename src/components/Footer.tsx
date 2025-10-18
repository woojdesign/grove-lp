import { Link } from 'react-router-dom';
import { footerContent } from '../content/shared/navigation';

export function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-muted-foreground">
            {footerContent.copyright}
          </p>
          <div className="flex gap-8 text-sm">
            {footerContent.links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
