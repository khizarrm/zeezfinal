import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProjectLightbox from '../components/ProjectLightBox';
import OptimizedImage from '../components/OptimizedImage';

//urbankParkHotel
const urbanParkImports = import.meta.glob('./project-photos/urban-park/*.jpeg', { eager: true }) as Record<string, { default: string }>;
const urbanParkImages = Object.entries(urbanParkImports)
  .sort(([a], [b]) => a.localeCompare(b)) // optional: sort alphabetically
  .map(([, mod]) => mod.default);


//balcony 
const balconyImports = import.meta.glob('./project-photos/balcony-makeover/*.jpg', { eager: true }) as Record<string, { default: string }>;
const balconyImages = Object.entries(balconyImports)
  .sort(([a], [b]) => a.localeCompare(b)) // optional: sort alphabetically
  .map(([, mod]) => mod.default);

//trays,coasters and placemats
const trayImports = import.meta.glob('./project-photos/trays-coasters-placemats/*.jpg', { eager: true }) as Record<string, { default: string }>;
const trayImages = Object.entries(trayImports)
  .sort(([a], [b]) => a.localeCompare(b)) // optional: sort alphabetically
  .map(([, mod]) => mod.default);

//tables
const tableImports = import.meta.glob('./project-photos/tables/*.jpg', { eager: true }) as Record<string, { default: string }>;
const tableImages = Object.entries(tableImports)
  .sort(([a], [b]) => a.localeCompare(b)) // optional: sort alphabetically
  .map(([, mod]) => mod.default);


//vases
const vaseImports = import.meta.glob('./project-photos/candle-holders/*.jpg', { eager: true }) as Record<string, { default: string }>;
const vaseImages = Object.entries(vaseImports)
  .sort(([a], [b]) => a.localeCompare(b)) // optional: sort alphabetically
  .map(([, mod]) => mod.default);

//refurbished tables
const refurbishedTableImports = import.meta.glob('./project-photos/refurbished-tables/*.jpg', { eager: true }) as Record<string, { default: string }>;
const refurbishedTableImages = Object.entries(refurbishedTableImports)
  .sort(([a], [b]) => a.localeCompare(b)) // optional: sort alphabetically
  .map(([, mod]) => mod.default);
    
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
      title: "Urban Park Suites Hotel",
      category: "Interior Design",
      description: "A complete redesign of a hotel space focusing on clean lines and functional elements.",
      imageUrl: urbanParkImages[0],
      images: urbanParkImages,
      featured: true
    },
    {
      id: 2,
      title: "Residential Balcony",
      category: "Interior Design",
      description: "Bringing new life to an old balcony for a Kigali resident.",
      imageUrl: balconyImages[0],
      images: balconyImages,
      featured: false
    },
    {
      id: 3,
      title: "Trays, Coasters, Placemats",
      category: "Handmade Decor",
      description: "Highest quality handmade table decor.",
      imageUrl: trayImages[6],
      images: trayImages,
      featured: false
    },
    {
      id: 4,
      title: "Butler Tables",
      category: "Handmade Decor",
      description: "A collection of our handmade butler tables.",
      imageUrl: tableImages[2],
      images: tableImages,
      featured: true
    },
    {
      id: 5,
      title: "Vases & Holders",
      category: "Handmade Decor",
      description: "Artful objects that bring warmth, texture, and soul to your space.",
      imageUrl: vaseImages[5],
      images: vaseImages,
      featured: false
    },
    {
      id: 6,
      title: "Refurbished Tables",
      category: "Furniture Refurbishing",
      description: "Revived and reimagined tables, each with a story and a new life.",
      imageUrl: refurbishedTableImages[2],
      images: refurbishedTableImages,
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
      <div className="absolute inset-0">
        <OptimizedImage
          src={balconyImages[2]}
          alt="Background"
          className="w-full h-full object-cover blur-lg opacity-20"
          lazy={false}
        />
      </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl text-secondary font-argent mb-6 mt-6 p-8">
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
                    <OptimizedImage
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      height={256}
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