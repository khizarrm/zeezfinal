import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import OptimizedImage from '../components/OptimizedImage';
import Balcony from '../images/balcony.jpeg';
import Mirror from '../images/mirror.jpg'
import Table from '../images/table.jpeg'
import ReberoFeatured from '../images/rebero-featured.jpg'
import ReberoBackground from '../images/rebero-11.jpg'

function Home() {
  return (
    <div className="flex flex-col">
{/* Hero Section */}
<section className="relative h-screen">
        <div className="absolute inset-0">
        <OptimizedImage
          src={ReberoBackground}
          alt="Modern interior design"
          className="w-full h-full object-cover"
          lazy={false}
        />
          <div className="absolute inset-0 hero-gradient" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl bg-black/50 backdrop-blur-lg p-8 rounded-2xl"
          >
            <h1 className="text-4xl md:text-6xl text-white font-argent mb-6">
              Crafting Beautiful Interiors Throughout Kigali
            </h1>
            <p className="text-lg text-white/90 mb-8 text-balance">
              We deliver world-class interior design and decoration services, upholding the highest standards of quality and craftsmanship in every project we undertake.
            </p>
            <div className="flex flex-col gap-4 w-fit">
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 bg-white text-secondary font-medium rounded-full hover:bg-primary transition-colors"
              >
                Book a Consultation
                <ArrowRight className="ml-2" size={20} />
              </Link>

              <Link
                to="/projects"
                className="inline-flex items-center px-6 py-3 bg-secondary text-primary font-medium rounded-full hover:bg-secondary/90 transition-colors"
              >
                View Portfolio
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-argent text-secondary mb-4">
              Our Services
            </h2>
            <p className="text-secondary/70 max-w-2xl mx-auto text-balance">
              From complete interior design to handmade decor and furniture refurbishing,
              we offer comprehensive solutions for your space.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Interior Design",
                description: "Full-service interior design tailored to your style and needs",
                image: Balcony
              },
              {
                title: "Handmade Decor",
                description: "Unique, handcrafted pieces that add character to your space",
                image: Mirror
              },
              {
                title: "Furniture Refurbishing",
                description: "Give your beloved pieces a new life with our expert restoration",
                image: Table
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <OptimizedImage
                    src={service.image}
                    alt={service.title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    height={256}
                  />
                </div>
                <h3 className="text-xl font-argent text-secondary mb-2">{service.title}</h3>
                <p className="text-secondary/70 mb-4">{service.description}</p>
                <Link
                  to="/services"
                  className="inline-flex items-center text-secondary hover:text-accent-terra transition-colors"
                >
                  Learn more
                  <ArrowRight className="ml-1" size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Project */}
      <section className="py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-argent text-secondary mb-4">
                Recent Work
              </h2>
              <p className="text-secondary/70 mb-8 text-balance">
                Discover our latest luxury mansion project in Rebero, where we created 
                contemporary elegance with sophisticated design and premium finishes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/projects?project=rebero-mansion"
                  className="inline-flex items-center px-6 py-3 bg-secondary text-primary font-medium rounded-full hover:bg-secondary/90 transition-colors"
                >
                  View Latest Project
                  <ArrowRight className="ml-2" size={20} />
                </Link>
                <Link
                  to="/projects"
                  className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-secondary text-secondary font-medium rounded-full hover:bg-secondary hover:text-primary transition-colors"
                >
                  View Portfolio
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <OptimizedImage
                src={ReberoFeatured}
                alt="Rebero Mansion - Latest Project"
                className="rounded-lg shadow-xl w-full h-72 object-cover"
                height={288}
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;