import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../images/logo.png';

interface HeaderProps {
  onContactClick?: () => void;
}

const NAV_LINKS = [
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Portfolio' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
] as const;

function Header({ onContactClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isMenuOpen]);

  const renderItem = (
    link: (typeof NAV_LINKS)[number],
    variant: 'desktop' | 'mobile',
  ) => {
    const isActive = location.pathname === link.to;
    const desktopClass =
      'text-sm tracking-[0.15em] uppercase hover:text-primary transition-colors font-outfit';
    const mobileClass =
      'font-argent text-3xl tracking-wide py-3 hover:text-primary transition-colors';
    const colorClass = isActive ? 'text-primary' : 'text-primary/70';
    const className = `${variant === 'desktop' ? desktopClass : mobileClass} ${colorClass}`;

    if (link.label === 'Contact' && onContactClick) {
      return (
        <button
          key={link.label}
          onClick={() => {
            setIsMenuOpen(false);
            onContactClick();
          }}
          className={className}
        >
          {link.label}
        </button>
      );
    }
    return (
      <Link key={link.label} to={link.to} className={className}>
        {link.label}
      </Link>
    );
  };

  return (
    <>
      <nav className="relative flex items-center justify-between px-5 sm:px-8 py-4 sm:py-6">
        <button
          onClick={() => setIsMenuOpen(true)}
          className="sm:hidden -ml-2 p-2 text-primary/80 hover:text-primary transition-colors"
          aria-label="Open menu"
        >
          <Menu size={24} strokeWidth={1.5} />
        </button>

        <div className="hidden sm:flex items-center gap-8">
          {renderItem(NAV_LINKS[0], 'desktop')}
          {renderItem(NAV_LINKS[1], 'desktop')}
        </div>

        <Link
          to="/"
          className="absolute left-1/2 -translate-x-1/2"
          aria-label="Zeez Creations — Home"
        >
          <img
            src={logo}
            alt="Zeez Creations"
            className="h-12 sm:h-20 w-auto"
          />
        </Link>

        <div className="hidden sm:flex items-center gap-8">
          {renderItem(NAV_LINKS[2], 'desktop')}
          {renderItem(NAV_LINKS[3], 'desktop')}
        </div>

        <div className="sm:hidden w-8" aria-hidden />
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] sm:hidden bg-secondary flex flex-col"
          >
            <div className="flex items-center justify-between px-5 py-4">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Zeez Creations — Home"
              >
                <img src={logo} alt="Zeez Creations" className="h-12 w-auto" />
              </Link>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="-mr-2 p-2 text-primary/80 hover:text-primary transition-colors"
                aria-label="Close menu"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.05 }}
              className="flex flex-1 flex-col items-center justify-center gap-1 pb-24"
            >
              {NAV_LINKS.map((link) => renderItem(link, 'mobile'))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
