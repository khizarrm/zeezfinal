import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Users, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import OptimizedImage from '../components/OptimizedImage';
import Founder from '../images/mom.jpeg'

function About() {
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
              Crafting Beautiful Spaces Since 2021
            </h1>
            <p className="text-lg text-secondary/70 mb-8 text-balance">
              We believe that every space has the potential to be extraordinary. Our passion
              lies in discovering and realizing that potential through thoughtful design
              and meticulous attention to detail.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <OptimizedImage
                src={Founder}
                alt="Zarqa Murtaza - Founder of Zeez Creations"
                className="rounded-lg shadow-xl w-full h-[450px] md:h-[550px] lg:h-[650px] object-cover object-top"
                height={650}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-argent text-secondary mb-6">Our Story</h2>
              <p className="text-secondary/70 mb-6">
              The founder of Zeez Creations, Zarqa Murtaza, established the company in 2021 with a simple dream: to transform spaces and touch lives through the art of interior design. Starting in Zambia with handmade trays and small resin tables, her journey brought her to Rwanda in 2022, where she embraced the digital world. As the company's online presence flourished, Zeez Creations evolved and had the honor of designing inspiring spaces like the restaurant La Creola, marking their debut in Interior Design.
              </p>
              <p className="text-secondary/70 mb-8">
              Our mission goes beyond creating beautiful interiors. We aim to inspire other women in the field, proving that with unwavering belief and perseverance, anything is possible. Every design and project is a testament to the idea that if you keep believing, you'll achieve your dreams.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 bg-secondary text-primary font-medium rounded-full hover:bg-secondary/90 transition-colors"
              >
                Work With Us
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
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
              Our Values
            </h2>
            <p className="text-secondary/70 max-w-2xl mx-auto">
              These core principles guide every project and decision we make.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Thoughtful Design",
                description: "Every detail is carefully considered to create harmonious and functional spaces that inspire and delight.",
                icon: Lightbulb,
                gradient: "from-amber-800 to-orange-900"
              },
              {
                title: "Authentic Comfort",
                description: "We design spaces that authentically reflect who you are while providing the relaxation and ease you deserve.",
                icon: Heart,
                gradient: "from-amber-700 to-yellow-800"
              },
              {
                title: "Client Partnership",
                description: "Your vision and satisfaction are at the heart of everything we do. We listen, collaborate, and deliver excellence.",
                icon: Users,
                gradient: "from-yellow-700 to-amber-800"
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group relative"
              >
                <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-primary/10">
                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-xl font-argent text-secondary mb-4 group-hover:text-amber-800 transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-secondary/70 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                  
                  {/* Background decoration */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-primary/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-tr from-primary/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;