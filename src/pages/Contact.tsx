import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const serviceMap: { [key: string]: string } = {
  'interior-design': 'Interior Design',
  'handmade-decor': 'Handmade Decor',
  'furniture-refurbishing': 'Furniture Refurbishing',
  'consultation': 'Consultation',
  'custom': 'Custom Orders',
  'other': 'Other',
};

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    service: '',
    message: "Hi Zarqa! I'm interested in your services at Zeez! I would love to schedule a consultation to discuss how you can help transform my space. Please contact me at your earliest convenience to discuss the details and pricing."
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = '+250791702562';
    const encodedMessage = encodeURIComponent(formData.message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData(prev => {
      const updatedState = { ...prev, [name]: value };

      if (name === 'name' || name === 'service') {
        const userName = name === 'name' ? value : prev.name;
        const serviceValue = name === 'service' ? value : prev.service;
        const serviceName = serviceValue && serviceMap[serviceValue] ? serviceMap[serviceValue] : 'your services';

        let message = '';
        if (serviceName !== 'Other') {
          if (userName) {
            message = `Hi Zarqa! My name is ${userName} and I'm interested in ${serviceName} at Zeez! `;
            message += `I would love to schedule a consultation to discuss how you can help transform my space. `;
            message += `Please contact me at your earliest convenience to discuss the details and provide me with more information about your ${serviceName.toLowerCase()} services and pricing.`;
          } else {
            message = `Hi Zarqa! I'm interested in ${serviceName} at Zeez! `;
            message += `I would love to schedule a consultation to discuss how you can help transform my space. `;
            message += `Please contact me at your earliest convenience to discuss the details and pricing.`;
          }
        }
        updatedState.message = message;
      }

      return updatedState;
    });
  };

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
          Contact
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-outfit text-primary/50 text-base sm:text-lg max-w-lg mx-auto"
        >
          Every exceptional space begins with a conversation
        </motion.p>
      </div>

      {/* Contact Info + Form */}
      <section className="px-6 sm:px-8 pb-24">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-8 mb-10">
              {[
                { icon: Phone, label: 'Phone & WhatsApp', value: '+250 791 702 562' },
                { icon: Mail, label: 'Email', value: 'zscreation45@gmail.com' },
                { icon: MapPin, label: 'Studio', value: 'Kibagabaga, Kigali, Rwanda' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <item.icon size={18} className="text-primary/30 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-outfit text-xs text-primary/40 uppercase tracking-wider mb-0.5">
                      {item.label}
                    </p>
                    <p className="font-outfit text-primary text-sm">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="font-outfit text-primary/50 text-sm leading-relaxed mb-6">
              We'd love to hear about your vision and explore how we can bring it to life.
              Fill out the form and we'll send your message directly via WhatsApp, or reach out
              to us through any of the channels above.
            </p>

            <a
              href="https://wa.me/250791702562"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-outfit text-sm tracking-wide text-primary border-b border-primary/40 pb-0.5 hover:border-primary transition-colors"
            >
              Message us on WhatsApp
            </a>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block font-outfit text-xs text-primary/40 uppercase tracking-wider mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-0 py-3 bg-transparent border-b border-primary/15 focus:border-primary/40 focus:outline-none font-outfit text-primary text-sm transition-colors"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label htmlFor="service" className="block font-outfit text-xs text-primary/40 uppercase tracking-wider mb-2">
                  Service of Interest
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-0 py-3 bg-transparent border-b border-primary/15 focus:border-primary/40 focus:outline-none font-outfit text-primary text-sm transition-colors appearance-none"
                  required
                >
                  <option value="">Select a service</option>
                  <option value="interior-design">Interior Design</option>
                  <option value="handmade-decor">Handmade Decor</option>
                  <option value="furniture-refurbishing">Furniture Refurbishing</option>
                  <option value="consultation">Consultation</option>
                  <option value="custom">Custom Order</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block font-outfit text-xs text-primary/40 uppercase tracking-wider mb-2">
                  Message Preview
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-0 py-3 bg-transparent border-b border-primary/15 focus:border-primary/40 focus:outline-none font-outfit text-primary text-sm transition-colors resize-none"
                  placeholder="Your message will appear here..."
                  required
                />
                <p className="font-outfit text-xs text-primary/30 mt-2">
                  Auto-generated based on your selections. Feel free to edit.
                </p>
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 font-outfit text-sm tracking-wide text-primary border-b border-primary/40 pb-0.5 hover:border-primary transition-colors mt-4"
              >
                <MessageCircle size={14} />
                Send via WhatsApp
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <div className="h-16" />
      {/* Footer */}
      <footer className="border-t border-primary/10 px-6 sm:px-8 py-6">
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

export default Contact;
