import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Founder from '../images/mom.jpeg';

function About() {
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
          About
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-outfit text-primary/50 text-base sm:text-lg max-w-lg mx-auto"
        >
          Crafting beautiful spaces since 2021
        </motion.p>
      </div>

      {/* Founder + Story */}
      <section className="px-6 sm:px-8 pb-24">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={Founder}
              alt="Zarqa Murtaza — Founder of Zeez Creations"
              className="w-full h-[500px] sm:h-[600px] object-cover object-top"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col justify-center"
          >
            <h2 className="font-argent text-2xl sm:text-3xl text-primary mb-6">Our Story</h2>
            <p className="font-outfit text-primary/60 text-base leading-relaxed mb-5">
              The founder of Zeez Creations, Zarqa Murtaza, established the company in 2021 with a simple dream: to transform spaces and touch lives through the art of interior design. Starting in Zambia with handmade trays and small resin tables, her journey brought her to Rwanda in 2022, where she embraced the digital world. As the company's online presence flourished, Zeez Creations evolved and had the honor of designing inspiring spaces like the restaurant La Creola, marking their debut in Interior Design.
            </p>
            <p className="font-outfit text-primary/60 text-base leading-relaxed mb-8">
              Our mission goes beyond creating beautiful interiors. We aim to inspire other women in the field, proving that with unwavering belief and perseverance, anything is possible. Every design and project is a testament to the idea that if you keep believing, you'll achieve your dreams.
            </p>
            <Link
              to="/contact"
              className="inline-block font-outfit text-sm tracking-wide text-primary border-b border-primary/40 pb-0.5 hover:border-primary transition-colors self-start"
            >
              Work With Us
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 sm:px-8 pb-24">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-argent text-2xl sm:text-3xl text-primary text-center mb-14"
          >
            Our Values
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {[
              {
                title: 'Thoughtful Design',
                description: 'Every detail is carefully considered to create harmonious and functional spaces that inspire and delight.',
              },
              {
                title: 'Authentic Comfort',
                description: 'We design spaces that authentically reflect who you are while providing the relaxation and ease you deserve.',
              },
              {
                title: 'Client Partnership',
                description: 'Your vision and satisfaction are at the heart of everything we do. We listen, collaborate, and deliver excellence.',
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <h3 className="font-argent text-lg text-primary mb-3">
                  {value.title}
                </h3>
                <p className="font-outfit text-sm text-primary/50 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
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

export default About;
