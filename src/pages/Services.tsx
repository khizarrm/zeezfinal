import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Star, Award, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import OptimizedImage from '../components/OptimizedImage';
import ServiceInterior from '../images/service-interior.jpg';
import ServiceExterior from '../images/service-exterior.jpg';
import ServiceLuxury from '../images/service-luxury.jpg';

function Services() {
  const services = [
    {
      title: "Interior Design & Consultation",
      subtitle: "Complete Design Solutions",
      description: "Transform your space with our comprehensive interior design services. From initial consultation to final styling, we create environments that reflect your personality while maximizing functionality and aesthetic appeal.",
      features: [
        "Space Planning & Layout Design",
        "Color Scheme & Material Selection",
        "Custom Furniture Design & Selection",
        "Lighting Design & Installation",
        "Art Curation & Wall Treatments",
        "Project Management & Coordination"
      ],
      image: ServiceInterior,
      icon: Star,
      gradient: "from-amber-800 to-orange-900"
    },
    {
      title: "Luxury Outdoor Spaces",
      subtitle: "Exterior & Landscape Design", 
      description: "Create stunning outdoor living areas that seamlessly blend with nature. Our landscape and exterior design services focus on creating sophisticated outdoor environments for relaxation and entertainment.",
      features: [
        "Landscape Architecture & Planning",
        "Outdoor Furniture & Decor Selection",
        "Garden Design & Plant Selection",
        "Water Feature Integration",
        "Lighting & Ambiance Design",
        "Maintenance Planning & Support"
      ],
      image: ServiceExterior,
      icon: Award,
      gradient: "from-amber-700 to-yellow-800"
    },
    {
      title: "Handmade Decor & Furniture",
      subtitle: "Bespoke Craftsmanship",
      description: "Elevate your space with our exclusive handmade pieces. Each item is carefully crafted by skilled artisans, ensuring unique character and exceptional quality that makes your space truly one-of-a-kind.",
      features: [
        "Custom Furniture Creation",
        "Artisanal Decorative Pieces",
        "Textile Design & Upholstery",
        "Furniture Restoration & Refinishing",
        "Personalized Design Consultation",
        "Quality Craftsmanship Guarantee"
      ],
      image: ServiceLuxury,
      icon: Users,
      gradient: "from-yellow-700 to-amber-800"
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-secondary via-secondary/95 to-secondary/90 overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage
            src={ServiceLuxury}
            alt="Luxury interior design"
            className="w-full h-full object-cover opacity-10"
            lazy={false}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl bg-black/50 backdrop-blur-lg p-12 rounded-2xl mx-auto"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6"
              >
                <Award className="w-4 h-4 mr-2" />
                Premium Design Services
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-argent text-white leading-tight mb-8">
                Exceptional
                <span className="block bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
                  Design Services
                </span>
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed">
                From luxurious interiors to stunning outdoor spaces, we deliver world-class design solutions 
                that transform ordinary spaces into extraordinary experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 bg-white text-secondary font-semibold rounded-full hover:bg-primary transition-all duration-300 transform hover:scale-105"
                >
                  Start Your Project
                  <ArrowRight className="ml-2" size={20} />
                </Link>
                <Link
                  to="/projects"
                  className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-secondary transition-all duration-300"
                >
                  View Our Work
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-gradient-to-b from-white to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-argent text-secondary mb-6">
              Our Expertise
            </h2>
            <p className="text-xl text-secondary/70 max-w-3xl mx-auto">
              We specialize in creating exceptional spaces that combine elegance, functionality, 
              and your unique vision into reality.
            </p>
          </motion.div>

          <div className="space-y-32">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                {/* Image Section */}
                <div className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="relative group">
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500`} />
                    <div className="relative bg-white p-2 rounded-3xl shadow-2xl">
                      <div className="overflow-hidden rounded-2xl">
                        <OptimizedImage
                          src={service.image}
                          alt={service.title}
                          className="w-full h-[400px] lg:h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                          height={500}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className={`space-y-8 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div>
                    <div className="flex items-center mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${service.gradient} mr-4`}>
                        <service.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm font-semibold text-secondary/60 uppercase tracking-wider">
                        {service.subtitle}
                      </span>
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-argent text-secondary mb-6 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-lg text-secondary/70 leading-relaxed mb-8">
                      {service.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {service.features.map((feature, featureIndex) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: featureIndex * 0.1 }}
                        className="flex items-center space-x-3"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-secondary/80 font-medium">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="pt-8">
                    <Link
                      to="/contact"
                      className={`inline-flex items-center px-8 py-4 bg-gradient-to-r ${service.gradient} text-white font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300`}
                    >
                      Start Your Project
                      <ArrowRight className="ml-2" size={20} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-secondary via-secondary/95 to-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-argent text-white mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-12">
              Let's collaborate to create a space that perfectly reflects your vision and exceeds your expectations. 
              Every project begins with a conversation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-secondary font-semibold rounded-full hover:bg-primary transition-all duration-300 transform hover:scale-105"
              >
                Schedule Consultation
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-secondary transition-all duration-300"
              >
                Explore Portfolio
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Services;