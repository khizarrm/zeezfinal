import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ServiceInterior from '../images/service-interior.jpg';
import ServiceExterior from '../images/service-exterior.jpg';
import ServiceLuxury from '../images/service-luxury.jpg';

const services = [
  {
    title: 'Interior Design & Consultation',
    description: 'Transform your space with our comprehensive interior design services. From initial consultation to final styling, we create environments that reflect your personality while maximizing functionality and aesthetic appeal.',
    features: [
      'Space Planning & Layout Design',
      'Color Scheme & Material Selection',
      'Custom Furniture Design & Selection',
      'Lighting Design & Installation',
      'Art Curation & Wall Treatments',
      'Project Management & Coordination',
    ],
    image: ServiceInterior,
  },
  {
    title: 'Luxury Outdoor Spaces',
    description: 'Create stunning outdoor living areas that seamlessly blend with nature. Our landscape and exterior design services focus on creating sophisticated outdoor environments for relaxation and entertainment.',
    features: [
      'Landscape Architecture & Planning',
      'Outdoor Furniture & Decor Selection',
      'Garden Design & Plant Selection',
      'Water Feature Integration',
      'Lighting & Ambiance Design',
      'Maintenance Planning & Support',
    ],
    image: ServiceExterior,
  },
  {
    title: 'Handmade Decor & Furniture',
    description: 'Elevate your space with our exclusive handmade pieces. Each item is carefully crafted by skilled artisans, ensuring unique character and exceptional quality that makes your space truly one-of-a-kind.',
    features: [
      'Custom Furniture Creation',
      'Artisanal Decorative Pieces',
      'Textile Design & Upholstery',
      'Furniture Restoration & Refinishing',
      'Personalized Design Consultation',
      'Quality Craftsmanship Guarantee',
    ],
    image: ServiceLuxury,
  },
];

function Services() {
  return (
    <div className="min-h-screen bg-secondary">
      <Header />

      {/* Page Header */}
      <div className="text-center pt-8 pb-16 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-argent text-4xl sm:text-5xl text-primary mb-4"
        >
          Services
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-outfit text-primary/50 text-base sm:text-lg max-w-lg mx-auto"
        >
          From interiors to handcrafted decor, we bring your vision to life
        </motion.p>
      </div>

      {/* Services */}
      <section className="px-6 sm:px-8 pb-24 space-y-24">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className={`max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-start ${
              index % 2 === 1 ? 'md:direction-rtl' : ''
            }`}
            style={index % 2 === 1 ? { direction: 'rtl' } : undefined}
          >
            {/* Image */}
            <div style={{ direction: 'ltr' }}>
              <div className="overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-[400px] md:h-[500px] object-cover hover:scale-[1.03] transition-transform duration-700"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center" style={{ direction: 'ltr' }}>
              <h2 className="font-argent text-2xl sm:text-3xl text-primary mb-4">
                {service.title}
              </h2>
              <p className="font-outfit text-primary/60 text-base leading-relaxed mb-6">
                {service.description}
              </p>
              <ul className="space-y-2.5 mb-8">
                {service.features.map((feature) => (
                  <li key={feature} className="font-outfit text-sm text-primary/50 flex items-start gap-2">
                    <span className="text-primary/30 mt-1">—</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="inline-block font-outfit text-sm tracking-wide text-primary border-b border-primary/40 pb-0.5 hover:border-primary transition-colors self-start"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        ))}
      </section>

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
            <Link to="/contact" className="font-outfit text-xs text-primary/40 hover:text-primary transition-colors">Contact</Link>
          </div>
          <p className="font-outfit text-xs text-primary/30">
            Kibagabaga, Kigali
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Services;
