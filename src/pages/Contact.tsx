import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Award } from 'lucide-react';
import OptimizedImage from '../components/OptimizedImage';
import ContactReception from '../images/contact-reception.jpeg';
import ContactWine from '../images/contact-wine.jpg';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    service: '',
    message: "Hi Zarqa! I'm interested in your services at Zeez! I would love to schedule a consultation to discuss how you can help transform my space. Please contact me at your earliest convenience to discuss the details and pricing."
  });

  // Service map for readability
  const serviceMap: { [key: string]: string } = {
    'interior-design': 'Interior Design',
    'handmade-decor': 'Handmade Decor',
    'furniture-refurbishing': 'Furniture Refurbishing',
    'consultation': 'Consultation',
    'custom': 'Custom Orders',
    'other': 'Other',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format the WhatsApp phone number (removing any spaces or special characters)
    const phoneNumber = '+250791702562';
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(formData.message);
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
      // Create an updated state object
      const updatedState = {
        ...prev,
        [name]: value
      };
      
      // Generate a more informative message based on name and service
      if (name === 'name' || name === 'service') {
        const userName = name === 'name' ? value : prev.name;
        const serviceValue = name === 'service' ? value : prev.service;
        const serviceName = serviceValue && serviceMap[serviceValue] ? serviceMap[serviceValue] : 'your services';
        
        let message = '';

        if (serviceName != 'Other'){
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

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "zscreation45@gmail.com",
      description: "Send us a detailed message"
    },
    {
      icon: Phone,
      title: "Phone & WhatsApp",
      content: "+250 791702562",
      description: "Call or message us directly"
    },
    {
      icon: MapPin,
      title: "Studio Location",
      content: "Kibagabaga, Kigali, Rwanda",
      description: "Visit our design studio"
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-secondary via-secondary/95 to-secondary/90 overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage
            src={ContactReception}
            alt="Urban Park Suites reception area"
            className="w-full h-full object-cover opacity-15"
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
                <MessageCircle className="w-4 h-4 mr-2" />
                Let's Start Your Project
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-argent text-white leading-tight mb-8">
                Let's Create
                <span className="block bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
                  Something Beautiful
                </span>
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
                Ready to transform your space? Get in touch with us to schedule a consultation 
                and discover how we can bring your vision to life.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                  >
                    <info.icon className="w-6 h-6 text-white mb-2 mx-auto" />
                    <h3 className="font-argent text-white text-sm mb-1">{info.title}</h3>
                    <p className="text-white/80 text-xs">{info.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-32 bg-gradient-to-b from-white to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              <div>
                <h2 className="text-3xl lg:text-4xl font-argent text-secondary mb-6">
                  Get In Touch
                </h2>
                <p className="text-lg text-secondary/70 leading-relaxed mb-8">
                  Every exceptional space begins with a conversation. We'd love to hear about 
                  your vision and explore how we can make it a reality.
                </p>
              </div>

              <div className="space-y-8">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-primary/10">
                      <div className="p-3 bg-gradient-to-br from-amber-800 to-orange-900 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <info.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-secondary mb-1 text-lg">{info.title}</h3>
                        <p className="text-secondary font-medium mb-2">{info.content}</p>
                        <p className="text-secondary/60 text-sm">{info.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Why Choose Us */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8"
              >
                <h3 className="text-xl font-argent text-secondary mb-6 flex items-center">
                  <Award className="w-6 h-6 mr-3 text-amber-800" />
                  Why Choose Zeez?
                </h3>
                <div className="space-y-4">
                  {[
                    "Personalized design consultations",
                    "Expert craftsmanship & attention to detail",
                    "Local Kigali expertise & understanding",
                    "Comprehensive project management"
                  ].map((benefit, index) => (
                    <div key={benefit} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-amber-800 rounded-full"></div>
                      <span className="text-secondary/80">{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 border border-primary/10">
                <div className="mb-8">
                  <h3 className="text-2xl font-argent text-secondary mb-4">
                    Start Your Project
                  </h3>
                  <p className="text-secondary/70">
                    Fill out the form below and we'll generate a personalized message 
                    for you to send via WhatsApp.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-secondary mb-3">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-4 rounded-xl border border-secondary/20 focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent transition-all duration-300 bg-primary/5"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-semibold text-secondary mb-3">
                      Service of Interest *
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-4 rounded-xl border border-secondary/20 focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent transition-all duration-300 bg-primary/5"
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
                    <label htmlFor="message" className="block text-sm font-semibold text-secondary mb-3">
                      Message Preview
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-4 rounded-xl border border-secondary/20 focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent transition-all duration-300 bg-primary/5 resize-none"
                      placeholder="Your message will appear here automatically..."
                      required
                    />
                    <p className="text-xs text-secondary/60 mt-2">
                      This message will be automatically generated based on your selections above.
                    </p>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-800 to-orange-900 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 transform"
                  >
                    <MessageCircle className="mr-2" size={20} />
                    Send via WhatsApp
                    <Send className="ml-2" size={20} />
                  </motion.button>
                </form>
              </div>

              {/* Background decoration */}
              <div className="absolute -top-6 -right-6 -z-10">
                <div className="w-32 h-32 bg-gradient-to-br from-amber-800/20 to-orange-900/20 rounded-full blur-2xl"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-24 bg-gradient-to-r from-secondary via-secondary/95 to-secondary relative overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage
            src={ContactWine}
            alt="Luxury wine storage"
            className="w-full h-full object-cover opacity-10"
            lazy={false}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="bg-black/30 backdrop-blur-lg rounded-2xl p-12 border border-white/20">
              <Clock className="w-12 h-12 text-white mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-argent text-white mb-6">
                Ready to Begin?
              </h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
                We typically respond within 24 hours. Let's discuss your project and 
                bring your design dreams to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/+250791702562"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 bg-white text-secondary font-semibold rounded-full hover:bg-primary transition-all duration-300 transform hover:scale-105"
                >
                  <MessageCircle className="mr-2" size={20} />
                  WhatsApp Us Now
                </a>
                <a
                  href="mailto:zscreation45@gmail.com"
                  className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-secondary transition-all duration-300"
                >
                  <Mail className="mr-2" size={20} />
                  Send Email
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Contact;