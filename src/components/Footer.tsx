import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Linkedin, Mail } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-secondary text-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-argent text-2xl">Zeez Creations</h3>
            <p className="text-primary/80 text-sm">
              Creating timeless spaces that inspire and elevate everyday living.
            </p>
          </div>

          <div>
            <h4 className="font-argent text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-primary/80 hover:text-primary text-sm">About Us</Link></li>
              <li><Link to="/services" className="text-primary/80 hover:text-primary text-sm">Services</Link></li>
              <li><Link to="/portfolio" className="text-primary/80 hover:text-primary text-sm">Portfolio</Link></li>
              <li><Link to="/contact" className="text-primary/80 hover:text-primary text-sm">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-argent text-lg mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-primary/80 hover:text-primary text-sm">Interior Design</Link></li>
              <li><Link to="/services" className="text-primary/80 hover:text-primary text-sm">Home Decor</Link></li>
              <li><Link to="/services" className="text-primary/80 hover:text-primary text-sm">Furniture Refurbishing</Link></li>
              <li><Link to="/services" className="text-primary/80 hover:text-primary text-sm">Consultation</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-argent text-lg mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/zeezcreationskigali/" target="_blank" className="text-primary/80 hover:text-primary">
                <Instagram size={20} />
              </a>
              <a href="https://www.facebook.com/p/Zeez-Creations-100089067046265/?locale=et_EE" target="_blank" className="text-primary/80 hover:text-primary">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-primary/80 hover:text-primary">
                <Linkedin size={20} />
              </a>
              <a href="mailto:zscreation45@gmail.com" target="_blank" className="text-primary/80 hover:text-primary">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary/20 text-center text-sm text-primary/60">
          <p>&copy; {new Date().getFullYear()} Zeez Creations. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;