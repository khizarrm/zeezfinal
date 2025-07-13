import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Eye } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import ProjectLightbox from '../components/ProjectLightBox';
import OptimizedImage from '../components/OptimizedImage';

//urbankParkHotel
const urbanParkImports = import.meta.glob('./project-photos/urban-park/*.jpeg') as Record<string, () => Promise<{ default: string }>>;
const urbanParkImagePaths = Object.keys(urbanParkImports).sort();

//balcony 
const balconyImports = import.meta.glob('./project-photos/balcony-makeover/*.jpg') as Record<string, () => Promise<{ default: string }>>;
const balconyImagePaths = Object.keys(balconyImports).sort();

//trays,coasters and placemats
const trayImports = import.meta.glob('./project-photos/trays-coasters-placemats/*.jpg') as Record<string, () => Promise<{ default: string }>>;
const trayImagePaths = Object.keys(trayImports).sort();

//tables
const tableImports = import.meta.glob('./project-photos/tables/*.jpg') as Record<string, () => Promise<{ default: string }>>;
const tableImagePaths = Object.keys(tableImports).sort();

//vases
const vaseImports = import.meta.glob('./project-photos/candle-holders/*.jpg') as Record<string, () => Promise<{ default: string }>>;
const vaseImagePaths = Object.keys(vaseImports).sort();

//refurbished tables
const refurbishedTableImports = import.meta.glob('./project-photos/refurbished-tables/*.jpg') as Record<string, () => Promise<{ default: string }>>;
const refurbishedTableImagePaths = Object.keys(refurbishedTableImports).sort();

//rebero mansion
const reberoMansionImports = import.meta.glob('./project-photos/rebero-mansion/*.jpg') as Record<string, () => Promise<{ default: string }>>;
const reberoMansionImagePaths = Object.keys(reberoMansionImports).sort();

// Helper function to load images dynamically
const loadImages = async (paths: string[], imports: Record<string, () => Promise<{ default: string }>>) => {
  const imagePromises = paths.map(async (path) => {
    const module = await imports[path]();
    return module.default;
  });
  return Promise.all(imagePromises);
};
    
function Portfolio() {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Record<string, string[]>>({});
  const [projects, setProjects] = useState<any[]>([]);
  const [heroBackgroundImage, setHeroBackgroundImage] = useState<string>('');
  
  // Categories for filtering
  const categories = [
    'All',
    'Interior Design',
    'Handmade Decor',
    'Furniture Refurbishing'
  ];

  // Load images and initialize projects
  useEffect(() => {
    const initializeProjects = async () => {
      try {
        // Load only the first image of each project for thumbnails
        const [
          reberoFirst,
          urbanParkFirst,
          balconyFirst,
          trayFirst,
          tableFirst,
          vaseFirst,
          refurbishedFirst
        ] = await Promise.all([
          reberoMansionImports[reberoMansionImagePaths[0]](),
          urbanParkImports[urbanParkImagePaths[0]](),
          balconyImports[balconyImagePaths[0]](),
          trayImports[trayImagePaths[6] || trayImagePaths[0]](),
          tableImports[tableImagePaths[2] || tableImagePaths[0]](),
          vaseImports[vaseImagePaths[5] || vaseImagePaths[0]](),
          refurbishedTableImports[refurbishedTableImagePaths[2] || refurbishedTableImagePaths[0]]()
        ]);

        const initialProjects = [
          {
            id: 1,
            title: "Rebero Mansion",
            category: "Interior Design",
            description: "A luxurious residential mansion design featuring contemporary architecture and elegant interior spaces in Rebero, Kigali.",
            imageUrl: reberoFirst.default,
            imagePaths: reberoMansionImagePaths,
            imports: reberoMansionImports,
            featured: true,
            tag: "New"
          },
          {
            id: 2,
            title: "Urban Park Suites Hotel",
            category: "Interior Design",
            description: "A complete redesign of a hotel space focusing on clean lines and functional elements.",
            imageUrl: urbanParkFirst.default,
            imagePaths: urbanParkImagePaths,
            imports: urbanParkImports,
            featured: true
          },
          {
            id: 3,
            title: "Residential Balcony",
            category: "Interior Design",
            description: "Bringing new life to an old balcony for a Kigali resident.",
            imageUrl: balconyFirst.default,
            imagePaths: balconyImagePaths,
            imports: balconyImports,
            featured: false
          },
          {
            id: 4,
            title: "Trays, Coasters, Placemats",
            category: "Handmade Decor",
            description: "Highest quality handmade table decor.",
            imageUrl: trayFirst.default,
            imagePaths: trayImagePaths,
            imports: trayImports,
            featured: false
          },
          {
            id: 5,
            title: "Butler Tables",
            category: "Handmade Decor",
            description: "A collection of our handmade butler tables.",
            imageUrl: tableFirst.default,
            imagePaths: tableImagePaths,
            imports: tableImports,
            featured: true
          },
          {
            id: 6,
            title: "Vases & Holders",
            category: "Handmade Decor",
            description: "Artful objects that bring warmth, texture, and soul to your space.",
            imageUrl: vaseFirst.default,
            imagePaths: vaseImagePaths,
            imports: vaseImports,
            featured: false
          },
          {
            id: 7,
            title: "Refurbished Tables",
            category: "Furniture Refurbishing",
            description: "Revived and reimagined tables, each with a story and a new life.",
            imageUrl: refurbishedFirst.default,
            imagePaths: refurbishedTableImagePaths,
            imports: refurbishedTableImports,
            featured: false
          }
        ];

        setProjects(initialProjects);
        
        // Set hero background image (balcony image)
        if (balconyImagePaths.length > 2) {
          const heroImage = await balconyImports[balconyImagePaths[2]]();
          setHeroBackgroundImage(heroImage.default);
        }
      } catch (error) {
        console.error('Error loading project images:', error);
      }
    };

    initializeProjects();
  }, []);

  // Handle URL parameter to open specific project
  useEffect(() => {
    const projectParam = searchParams.get('project');
    if (projectParam === 'rebero-mansion' && projects.length > 0) {
      const reberoProject = projects.find(p => p.title === 'Rebero Mansion');
      if (reberoProject) {
        handleViewGallery(reberoProject);
      }
    }
  }, [projects, searchParams]);
  
  // Filter projects when category changes
  useEffect(() => {
    setFilteredProjects(
      selectedCategory === 'All'
        ? projects
        : projects.filter(project => project.category === selectedCategory)
    );
  }, [selectedCategory, projects]);

  // Load all images for a project (for lightbox)
  const loadProjectImages = async (project: any) => {
    if (loadedImages[project.id]) {
      return loadedImages[project.id];
    }

    try {
      const images = await loadImages(project.imagePaths, project.imports);
      setLoadedImages(prev => ({
        ...prev,
        [project.id]: images
      }));
      return images;
    } catch (error) {
      console.error('Error loading project gallery:', error);
      return [];
    }
  };

  // Handle lightbox opening
  const handleViewGallery = async (project: any) => {
    const images = await loadProjectImages(project);
    setSelectedProject({
      ...project,
      images
    });
    setLightboxOpen(true);
  };
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary">
      {heroBackgroundImage && (
        <div className="absolute inset-0">
          <OptimizedImage
            src={heroBackgroundImage}
            alt="Background"
            className="w-full h-full object-cover blur-lg opacity-20"
            lazy={false}
          />
        </div>
      )}

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
                    <div className="absolute top-4 right-4 flex gap-2 z-10">
                      {project.tag && (
                        <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                          {project.tag}
                        </div>
                      )}
                      {project.featured && (
                        <div className="bg-white px-3 py-1 rounded-full text-xs font-medium text-secondary">
                          Featured
                        </div>
                      )}
                    </div>
                    <OptimizedImage
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      height={256}
                    />
                    <div className="absolute inset-0 bg-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => handleViewGallery(project)}
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
                      onClick={() => handleViewGallery(project)}
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