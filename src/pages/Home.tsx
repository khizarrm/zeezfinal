import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import heroImage from '../pages/project-photos/rebero-rooftop/01.jpg';
import gridImage1 from '../pages/project-photos/seeds-residences/penthouse/01.jpg';
import gridImage2 from '../pages/project-photos/iwave-office/01.jpg';

import projectRebero from '../pages/project-photos/rebero-rooftop/02.jpg';
import projectIwave from '../pages/project-photos/iwave-office/02.jpg';
import projectSeeds from '../pages/project-photos/seeds-residences/penthouse/02.jpg';
import projectGolfView from '../pages/project-photos/golf-view/01.jpg';
import projectFaysal from '../pages/project-photos/king-faysal-view/01.jpg';
import projectMrFish from '../pages/project-photos/mr-fish/g-01.jpg';

const featuredProjects = [
  { name: 'Rebero Mansion Rooftop', category: 'Interior Design', image: projectRebero },
  { name: 'Iwave Real Estate Office', category: 'Interior Design', image: projectIwave },
  { name: 'Seeds Residences', category: 'Interior Design', image: projectSeeds },
  { name: 'Golf View Apartment', category: 'Interior Design', image: projectGolfView },
  { name: 'King Faysal View Apartment', category: 'Interior Design', image: projectFaysal },
  { name: 'Mr. Fish Restaurant', category: 'Interior Design', image: projectMrFish },
];

const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const contactLinks = [
    {
      icon: WhatsAppIcon,
      label: 'WhatsApp',
      value: '+250 791 702 562',
      href: 'https://wa.me/250791702562',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'zscreation45@gmail.com',
      href: 'mailto:zscreation45@gmail.com',
    },
    {
      icon: InstagramIcon,
      label: 'Instagram',
      value: '@zeezcreationskigali',
      href: 'https://www.instagram.com/zeezcreationskigali/',
    },
    {
      icon: FacebookIcon,
      label: 'Facebook',
      value: 'Zeez Creations',
      href: 'https://www.facebook.com/p/Zeez-Creations-100089067046265/',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Kibagabaga, Kigali',
      href: 'https://maps.google.com/?q=Kibagabaga,Kigali,Rwanda',
    },
  ];

  return (
    <div className="min-h-screen bg-secondary">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 sm:px-8 py-6">
        <div className="flex items-center gap-8">
          <Link
            to="/about"
            className="text-sm tracking-[0.15em] uppercase text-primary/70 hover:text-primary transition-colors font-outfit"
          >
            About
          </Link>
          <Link
            to="/projects"
            className="text-sm tracking-[0.15em] uppercase text-primary/70 hover:text-primary transition-colors font-outfit"
          >
            Portfolio
          </Link>
        </div>

        <Link to="/" className="absolute left-1/2 -translate-x-1/2">
          <img
            src={logo}
            alt="Zeez Creations"
            className="h-16 sm:h-20 w-auto"
          />
        </Link>

        <div className="flex items-center gap-8">
          <Link
            to="/services"
            className="text-sm tracking-[0.15em] uppercase text-primary/70 hover:text-primary transition-colors font-outfit"
          >
            Services
          </Link>
          <button
            onClick={() => setIsContactOpen(true)}
            className="text-sm tracking-[0.15em] uppercase text-primary/70 hover:text-primary transition-colors font-outfit"
          >
            Contact
          </button>
        </div>
      </nav>

      {/* Hero Section — full viewport frame */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="px-6 sm:px-8 pb-6 sm:pb-8"
      >
        <div className="relative">
          <div className="relative overflow-hidden">
            <img
              src={heroImage}
              alt="Zeez Creations — Luxury Interior Design"
              className="w-full h-[calc(100vh-7.5rem)] object-cover"
            />
            {/* Text overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="font-argent text-3xl sm:text-4xl lg:text-5xl text-white text-center leading-snug italic px-8"
                style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
              >
                Timeless Spaces, Crafted
                <br />
                with Intention
              </motion.h2>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Intro + CTA */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-center px-6 pb-16"
      >
        <p className="font-outfit text-primary/60 text-base sm:text-lg max-w-md mx-auto leading-relaxed mb-6">
          Creating timeless spaces that inspire and elevate everyday living —
          world-class interior design and handcrafted decor in Kigali.
        </p>
        <Link
          to="/projects"
          className="inline-block font-outfit text-sm tracking-wide text-primary border-b border-primary/40 pb-0.5 hover:border-primary transition-colors"
        >
          View Portfolio
        </Link>
      </motion.section>

      {/* Two-Column Image Grid — same width as hero */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="px-6 sm:px-8 pb-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="overflow-hidden">
            <img
              src={gridImage1}
              alt="Seeds Penthouse design by Zeez Creations"
              className="w-full h-[50vh] sm:h-[70vh] object-cover hover:scale-[1.03] transition-transform duration-700"
            />
          </div>
          <div className="overflow-hidden">
            <img
              src={gridImage2}
              alt="Golf View Apartments design by Zeez Creations"
              className="w-full h-[50vh] sm:h-[70vh] object-cover hover:scale-[1.03] transition-transform duration-700"
            />
          </div>
        </div>
      </motion.section>

      {/* Approach / Philosophy */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7 }}
        className="px-6 sm:px-8 pt-16 pb-24"
      >
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-outfit text-primary/60 text-base sm:text-lg leading-relaxed mb-8">
            Every space tells a story. We begin by listening — understanding how you live,
            what inspires you, and the feeling you want to come home to. From there, we layer
            textures, light, and intention to craft interiors that are as functional as they
            are beautiful. Our process is deeply collaborative, rooted in trust, and always
            guided by a belief that thoughtful design has the power to transform everyday life.
          </p>
          <Link
            to="/contact"
            className="inline-block font-outfit text-sm tracking-wide text-primary border-b border-primary/40 pb-0.5 hover:border-primary transition-colors"
          >
            Work With Us
          </Link>
        </div>
      </motion.section>

      {/* Projects Carousel */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7 }}
        className="pb-24"
      >
        <div
          className="flex gap-4 sm:gap-5 overflow-x-auto pl-10 pr-6 sm:pl-16 sm:pr-8 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {featuredProjects.map((project) => (
            <Link
              key={project.name}
              to="/projects"
              className="flex-shrink-0 snap-start group"
            >
              <div className="w-[55vw] sm:w-[30vw] lg:w-[22vw] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full aspect-[3/4] object-cover group-hover:scale-[1.03] transition-transform duration-700"
                />
              </div>
              <div className="mt-3">
                <p className="font-outfit text-sm text-primary font-medium">
                  {project.name}
                </p>
                <p className="font-outfit text-xs text-primary/40 tracking-wide uppercase">
                  {project.category}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </motion.section>

      <div className="h-16" />
      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 bg-secondary border-t border-primary/10 px-6 sm:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-outfit text-xs text-primary/30">
            &copy; {new Date().getFullYear()} Zeez Creations
          </p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="font-outfit text-xs text-primary/40 hover:text-primary transition-colors">About</Link>
            <Link to="/projects" className="font-outfit text-xs text-primary/40 hover:text-primary transition-colors">Portfolio</Link>
            <Link to="/services" className="font-outfit text-xs text-primary/40 hover:text-primary transition-colors">Services</Link>
            <button onClick={() => setIsContactOpen(true)} className="font-outfit text-xs text-primary/40 hover:text-primary transition-colors">Contact</button>
          </div>
          <div className="flex items-center gap-5">
            <a href="https://www.instagram.com/zeezcreationskigali/" target="_blank" rel="noopener noreferrer" className="text-primary/30 hover:text-primary transition-colors"><InstagramIcon /></a>
            <a href="https://www.facebook.com/p/Zeez-Creations-100089067046265/" target="_blank" rel="noopener noreferrer" className="text-primary/30 hover:text-primary transition-colors"><FacebookIcon /></a>
            <a href="https://wa.me/250791702562" target="_blank" rel="noopener noreferrer" className="text-primary/30 hover:text-primary transition-colors"><WhatsAppIcon /></a>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      <AnimatePresence>
        {isContactOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsContactOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative bg-secondary rounded-2xl p-8 max-w-sm w-full shadow-2xl border border-primary/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsContactOpen(false)}
                className="absolute top-4 right-4 p-1.5 text-primary/40 hover:text-primary transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <h2 className="font-argent text-2xl text-primary mb-6">
                Get in Touch
              </h2>

              <div className="space-y-2">
                {contactLinks.map((contact) => (
                  <a
                    key={contact.label}
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors group border border-transparent hover:border-primary/10"
                  >
                    <div className="p-2.5 bg-primary/10 rounded-full text-primary group-hover:bg-primary group-hover:text-secondary transition-colors">
                      <contact.icon />
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-primary/50 uppercase tracking-wider">
                        {contact.label}
                      </p>
                      <p className="text-primary font-medium">
                        {contact.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Home;
