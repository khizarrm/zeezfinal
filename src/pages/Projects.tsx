import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProjectLightbox from '../components/ProjectLightBox';

function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState<typeof projects>([]);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  
  // Categories for filtering
  const categories = [
    'All',
    'Interior Design',
    'Handmade Decor',
    'Furniture Refurbishing'
  ];
  
  // Project data with multiple images
  const projects = [
    {
      id: 1,
      title: "Modern Minimalist Living Room",
      category: "Interior Design",
      description: "A complete redesign of a living space focusing on clean lines and functional elements.",
      imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1618219944342-824e40a13285?q=80&w=800&auto=format&fit=crop"
      ],
      featured: true
    },
    {
      id: 2,
      title: "Rustic Dining Table Restoration",
      category: "Furniture Refurbishing",
      description: "Bringing new life to an antique dining table with careful restoration techniques.",
      imageUrl: "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?q=80&w=800&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1533090368676-1fd25485db88?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1597072689227-8882273e8f6a?q=80&w=800&auto=format&fit=crop"
      ],
      featured: false
    },
    {
      id: 3,
      title: "Handcrafted Ceramic Vases",
      category: "Handmade Decor",
      description: "Custom designed and created ceramic pieces for a modern apartment.",
      imageUrl: "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?q=80&w=800&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1526066900882-01217e9b151f?q=80&w=800&auto=format&fit=crop"
      ],
      featured: false
    },
    {
      id: 4,
      title: "Bohemian Bedroom Makeover",
      category: "Interior Design",
      description: "A complete transformation of a bedroom into a bohemian retreat.",
      imageUrl: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1610727899747-e883fbd5d15a?q=80&w=800&auto=format&fit=crop"
      ],
      featured: true
    },
    {
      id: 5,
      title: "Custom Wooden Shelving",
      category: "Handmade Decor",
      description: "Bespoke shelving units designed to maximize space and aesthetics.",
      imageUrl: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=800&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1531882287584-375084a9e7a1?q=80&w=800&auto=format&fit=crop"
      ],
      featured: false
    },
    {
      id: 6,
      title: "Mid-Century Chair Reupholstery",
      category: "Furniture Refurbishing",
      description: "Breathing new life into classic mid-century chairs with premium fabrics.",
      imageUrl: "https://images.unsplash.com/photo-1567016432779-094069958ea5?q=80&w=800&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1567016432779-094069958ea5?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1579656592043-a20e25a4aa4b?q=80&w=800&auto=format&fit=crop"
      ],
      featured: false
    }
  ];
  
  // Filter projects when category changes
  useEffect(() => {
    setFilteredProjects(
      selectedCategory === 'All'
        ? projects
        : projects.filter(project => project.category === selectedCategory)
    );
  }, [selectedCategory]);
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl text-secondary font-argent mb-6">
              Our Portfolio
            </h1>
            <p className="text-lg text-secondary/70 max-w-2xl mx-auto mb-8 text-balance">
              Explore our collection of projects showcasing our dedication to 
              creating beautiful, functional spaces and decor.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-secondary text-white'
                    : 'bg-primary/50 text-secondary hover:bg-primary'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative overflow-hidden h-64">
                    {project.featured && (
                      <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-xs font-medium text-secondary z-10">
                        Featured
                      </div>
                    )}
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => {
                          setSelectedProject(project);
                          setLightboxOpen(true);
                        }}
                        className="bg-white text-secondary p-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform"
                        aria-label={`View ${project.title} images`}
                      >
                        <Eye size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-2">
                      <span className="text-xs font-medium text-secondary/60">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-argent text-secondary mb-2">
                      {project.title}
                    </h3>
                    <p className="text-secondary/70 text-sm mb-4">
                      {project.description}
                    </p>
                    <button
                      onClick={() => {
                        setSelectedProject(project);
                        setLightboxOpen(true);
                      }}
                      className="inline-flex items-center text-secondary hover:text-secondary/80 transition-colors text-sm font-medium"
                    >
                      View Gallery
                      <ArrowRight className="ml-2" size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-argent text-secondary mb-4">
                Ready to Transform Your Space?
              </h2>
              <p className="text-secondary/70 max-w-2xl mx-auto mb-8">
                Let's collaborate to create a space that reflects your style and meets your needs.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 bg-secondary text-white font-medium rounded-full hover:bg-secondary/90 transition-colors"
              >
                Book a Consultation
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Lightbox for project images */}
      <ProjectLightbox 
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        project={selectedProject}
      />
    </div>
  );
}

export default Portfolio;