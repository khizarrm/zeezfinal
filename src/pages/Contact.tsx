import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

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
              Let's Create Something Beautiful
            </h1>
            <p className="text-lg text-secondary/70 mb-8 text-balance">
              Ready to transform your space? Get in touch with us to schedule a
              consultation or learn more about our services.
            </p>
            <p className="text-lg text-secondary/70 mb-8 text-balance">
              Simply enter your name and service in the field below. 
              We'll generate an automated message which you can then send to our WhatsApp. 
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-argent text-secondary mb-8">
                Contact Information
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-accent-terra mr-4 mt-1" />
                  <div>
                    <h3 className="font-medium text-secondary mb-1">Email</h3>
                    <p className="text-secondary/70">zscreation45@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-accent-terra mr-4 mt-1" />
                  <div>
                    <h3 className="font-medium text-secondary mb-1">Phone</h3>
                    <p className="text-secondary/70">+250 791702562</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-accent-terra mr-4 mt-1" />
                  <div>
                    <h3 className="font-medium text-secondary mb-1">Studio</h3>
                    <p className="text-secondary/70">
                      Kibagabaga,<br />
                      Kigali, Rwanda
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-secondary mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-secondary/20 focus:outline-none focus:ring-2 focus:ring-accent-terra focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-secondary mb-2">
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-secondary/20 focus:outline-none focus:ring-2 focus:ring-accent-terra focus:border-transparent"
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
                  <label htmlFor="message" className="block text-sm font-medium text-secondary mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-secondary/20 focus:outline-none focus:ring-2 focus:ring-accent-terra focus:border-transparent"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center px-6 py-3 bg-secondary text-primary font-medium rounded-full hover:bg-secondary/90 transition-colors"
                >
                  Send Message via WhatsApp
                  <Send className="ml-2" size={20} />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;