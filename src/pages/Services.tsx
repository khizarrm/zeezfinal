import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Table from '../images/table.jpeg';
import waitingArea from '../images/waiting-area.jpeg'
import mirror from '../images/mirror.jpg'

function Services() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-argent text-secondary mb-6">
              Our Services
            </h1>
            <p className="text-lg text-secondary/70 mb-8 text-balance">
              From complete interior design to custom furniture solutions, we offer
              comprehensive services to transform your space into something extraordinary.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-24">
            {[
              {
                title: "Interior Design/Consultation",
                description: "Full-service interior design tailored to your style and needs. We handle everything from concept development to final styling.",
                features: [
                  "Space Planning",
                  "Wall Art",
                  "Color Consultation",
                  "Furniture Selection",
                  "Lighting Design",
                  "Material Selection"
                ],
                image: waitingArea
              },
              {
                title: "Handmade Decor",
                description: "Custom-crafted pieces that add unique character and personality to your space, created specifically for your needs.",
                features: [
                  "Custom Artwork",
                  "Textile Design",
                  "Decorative Accessories",
                  "Wall Treatments",
                  "Custom Installations"
                ],
                image: mirror
              },
              {
                title: "Furniture Refurbishing",
                description: "Give your beloved pieces a new life with our expert restoration and refinishing services.",
                features: [
                  "Furniture Restoration",
                  "Custom Upholstery",
                  "Wood Refinishing",
                  "Hardware Updates",
                  "Structural Repairs"
                ],
                image: Table
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
              >
                <div className={`relative ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="w-full h-64 md:h-96 overflow-hidden rounded-lg shadow-xl">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-argent text-secondary mb-4">
                    {service.title}
                  </h2>
                  <p className="text-secondary/70 mb-6">{service.description}</p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-secondary/70">
                        <ArrowRight size={16} className="mr-2 text-accent-terra" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className="inline-flex items-center px-6 py-3 bg-secondary text-primary font-medium rounded-full hover:bg-secondary/90 transition-colors"
                  >
                    Book Now
                    <ArrowRight className="ml-2" size={20} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;