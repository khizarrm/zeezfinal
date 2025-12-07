import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import OptimizedImage from '../components/OptimizedImage';
import { applyWatermark } from '../utils/watermark';

const urbanParkImports = import.meta.glob('./project-photos/urban-park/*.jpeg') as Record<string, () => Promise<{ default: string }>>;
const urbanParkImagePaths = Object.keys(urbanParkImports).sort();

const balconyImports = import.meta.glob('./project-photos/balcony-makeover/*.jpg') as Record<string, () => Promise<{ default: string }>>;
const balconyImagePaths = Object.keys(balconyImports).sort();

const trayImports = import.meta.glob('./project-photos/trays-coasters-placemats/*.jpg') as Record<string, () => Promise<{ default: string }>>;
const trayImagePaths = Object.keys(trayImports).sort();

const tableImports = import.meta.glob('./project-photos/tables/*.jpg') as Record<string, () => Promise<{ default: string }>>;
const tableImagePaths = Object.keys(tableImports).sort();

const vaseImports = import.meta.glob('./project-photos/candle-holders/*.jpg') as Record<string, () => Promise<{ default: string }>>;
const vaseImagePaths = Object.keys(vaseImports).sort();

const refurbishedTableImports = import.meta.glob('./project-photos/refurbished-tables/*.jpg') as Record<string, () => Promise<{ default: string }>>;
const refurbishedTableImagePaths = Object.keys(refurbishedTableImports).sort();

const reberoMansionImports = import.meta.glob('./project-photos/rebero-mansion/*.jpg') as Record<string, () => Promise<{ default: string }>>;
const reberoMansionImagePaths = Object.keys(reberoMansionImports).sort();

const golfViewImports = import.meta.glob('../images/golfview-apartments/*.jpeg') as Record<string, () => Promise<{ default: string }>>;
const golfViewImagePaths = Object.keys(golfViewImports).sort();

const seedsPenthouseImports = import.meta.glob('../images/seeds-penthouse/*.jpeg') as Record<string, () => Promise<{ default: string }>>;
const seedsPenthouseImagePaths = Object.keys(seedsPenthouseImports).sort();

const kibagabagaImports = import.meta.glob('../images/kibagabaga-residential-space/*.jpeg') as Record<string, () => Promise<{ default: string }>>;
const kibagabagaImagePaths = Object.keys(kibagabagaImports).sort();

const realEstateOfficeImports = import.meta.glob('../images/residential-office/*.jpeg') as Record<string, () => Promise<{ default: string }>>;
const realEstateOfficeImagePaths = Object.keys(realEstateOfficeImports).sort();

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  imagePaths: string[];
  imports: Record<string, () => Promise<{ default: string }>>;
}

const loadImages = async (paths: string[], imports: Record<string, () => Promise<{ default: string }>>) => {
  const imagePromises = paths.map(async (path) => {
    const module = await imports[path]();
    return module.default;
  });
  return Promise.all(imagePromises);
};

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<(Project & { images: string[] }) | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<number, string[]>>({});
  const [watermarkedImages, setWatermarkedImages] = useState<Record<number, string[]>>({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const initializeProjects = async () => {
      try {
        const [
          reberoFirst,
          urbanParkFirst,
          balconyFirst,
          trayFirst,
          tableFirst,
          vaseFirst,
          refurbishedFirst,
          golfViewFirst,
          seedsPenthouseFirst,
          kibagabagaFirst,
          realEstateOfficeFirst
        ] = await Promise.all([
          reberoMansionImports[reberoMansionImagePaths[0]](),
          urbanParkImports[urbanParkImagePaths[0]](),
          balconyImports[balconyImagePaths[0]](),
          trayImports[trayImagePaths[6] || trayImagePaths[0]](),
          tableImports[tableImagePaths[2] || tableImagePaths[0]](),
          vaseImports[vaseImagePaths[5] || vaseImagePaths[0]](),
          refurbishedTableImports[refurbishedTableImagePaths[2] || refurbishedTableImagePaths[0]](),
          golfViewImports[golfViewImagePaths[0]](),
          seedsPenthouseImports[seedsPenthouseImagePaths[0]](),
          kibagabagaImports[kibagabagaImagePaths[0]](),
          realEstateOfficeImports[realEstateOfficeImagePaths[0]]()
        ]);

        const initialProjects: Project[] = [
          {
            id: 1,
            title: 'Rebero Mansion',
            category: 'Interior Design',
            description: 'A luxurious residential mansion design featuring contemporary architecture and elegant interior spaces in Rebero, Kigali.',
            imageUrl: reberoFirst.default,
            imagePaths: reberoMansionImagePaths,
            imports: reberoMansionImports
          },
          {
            id: 2,
            title: 'Golf View Apartments',
            category: 'Interior Design',
            description: 'Modern apartment interiors with stunning views, blending comfort and sophistication for contemporary urban living.',
            imageUrl: golfViewFirst.default,
            imagePaths: golfViewImagePaths,
            imports: golfViewImports
          },
          {
            id: 3,
            title: 'Seeds Penthouse',
            category: 'Interior Design',
            description: 'An elegant penthouse design featuring luxurious finishes and thoughtful spatial arrangements for elevated living.',
            imageUrl: seedsPenthouseFirst.default,
            imagePaths: seedsPenthouseImagePaths,
            imports: seedsPenthouseImports
          },
          {
            id: 4,
            title: 'Kibagabaga Residential Space',
            category: 'Interior Design',
            description: 'A warm and inviting residential interior designed for comfort and modern family living in Kibagabaga.',
            imageUrl: kibagabagaFirst.default,
            imagePaths: kibagabagaImagePaths,
            imports: kibagabagaImports
          },
          {
            id: 5,
            title: 'Real Estate Office',
            category: 'Interior Design',
            description: 'A professional office space designed to impress clients while maintaining functionality and brand identity.',
            imageUrl: realEstateOfficeFirst.default,
            imagePaths: realEstateOfficeImagePaths,
            imports: realEstateOfficeImports
          },
          {
            id: 6,
            title: 'Urban Park Suites Hotel',
            category: 'Interior Design',
            description: 'A complete redesign of a hotel space focusing on clean lines and functional elements.',
            imageUrl: urbanParkFirst.default,
            imagePaths: urbanParkImagePaths,
            imports: urbanParkImports
          },
          {
            id: 8,
            title: 'Residential Balcony',
            category: 'Interior Design',
            description: 'Bringing new life to an old balcony for a Kigali resident.',
            imageUrl: balconyFirst.default,
            imagePaths: balconyImagePaths,
            imports: balconyImports
          },
          {
            id: 9,
            title: 'Trays, Coasters, Placemats',
            category: 'Handmade Decor',
            description: 'Highest quality handmade table decor.',
            imageUrl: trayFirst.default,
            imagePaths: trayImagePaths,
            imports: trayImports
          },
          {
            id: 10,
            title: 'Butler Tables',
            category: 'Handmade Decor',
            description: 'A collection of our handmade butler tables.',
            imageUrl: tableFirst.default,
            imagePaths: tableImagePaths,
            imports: tableImports
          },
          {
            id: 11,
            title: 'Vases & Holders',
            category: 'Handmade Decor',
            description: 'Artful objects that bring warmth, texture, and soul to your space.',
            imageUrl: vaseFirst.default,
            imagePaths: vaseImagePaths,
            imports: vaseImports
          },
          {
            id: 12,
            title: 'Refurbished Tables',
            category: 'Furniture Refurbishing',
            description: 'Revived and reimagined tables, each with a story and a new life.',
            imageUrl: refurbishedFirst.default,
            imagePaths: refurbishedTableImagePaths,
            imports: refurbishedTableImports
          }
        ];

        setProjects(initialProjects);
      } catch (error) {
        console.error('Error loading project images:', error);
      }
    };

    initializeProjects();
  }, []);

  const loadProjectImages = async (project: Project) => {
    if (loadedImages[project.id]) {
      return loadedImages[project.id];
    }

    try {
      const images = await loadImages(project.imagePaths, project.imports);
      setLoadedImages(prev => ({ ...prev, [project.id]: images }));
      return images;
    } catch (error) {
      console.error('Error loading project gallery:', error);
      return [];
    }
  };

  const applyWatermarksToImages = async (projectId: number, images: string[]) => {
    if (watermarkedImages[projectId]) {
      return watermarkedImages[projectId];
    }

    try {
      const watermarked = await Promise.all(
        images.map(img => applyWatermark(img, {
          text: 'ZEEZ CREATIONS',
          opacity: 0.12,
          fontSize: 20,
          color: '#ffffff',
          rotate: -25,
          tile: true,
        }))
      );
      setWatermarkedImages(prev => ({ ...prev, [projectId]: watermarked }));
      return watermarked;
    } catch (error) {
      console.error('Error applying watermarks:', error);
      return images;
    }
  };

  const handleOpenModal = async (project: Project) => {
    const images = await loadProjectImages(project);
    setSelectedProject({ ...project, images });
    setCurrentImageIndex(0);
    
    applyWatermarksToImages(project.id, images).then(watermarked => {
      setSelectedProject(prev => prev ? { ...prev, images: watermarked } : null);
    });
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const goToPrevious = () => {
    if (!selectedProject) return;
    setCurrentImageIndex(prev =>
      prev === 0 ? selectedProject.images.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    if (!selectedProject) return;
    setCurrentImageIndex(prev =>
      prev === selectedProject.images.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProject) return;
      if (e.key === 'Escape') handleCloseModal();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedProject]);

  return (
    <div className="h-screen bg-primary flex flex-col p-6 sm:p-8">
      {/* Back Link */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-secondary/50 hover:text-secondary transition-colors text-sm"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back
        </Link>
      </div>

      {/* Projects Grid - fills remaining space */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-7xl">
          <h1 className="font-argent text-secondary text-3xl sm:text-4xl text-center mb-3">
            Portfolio
          </h1>
          <p className="text-secondary/50 text-lg sm:text-xl text-center mb-10 font-light tracking-wide">
            A curated collection of our work
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {projects.map((project, index) => (
              <motion.button
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => handleOpenModal(project)}
                className="group text-left"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-primary shadow-md hover:shadow-xl transition-shadow duration-300">
                  <OptimizedImage
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-secondary/60 text-xs uppercase tracking-wider mb-1">
                      {project.category}
                    </p>
                    <h3 className="font-argent text-base sm:text-lg text-secondary">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/70 backdrop-blur-sm"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative bg-secondary/90 backdrop-blur-xl rounded-2xl overflow-hidden max-w-5xl w-full max-h-[90vh] shadow-2xl border border-secondary/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 z-20 p-2.5 bg-primary/20 backdrop-blur-sm rounded-full text-primary hover:bg-primary/30 transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              {/* Image Gallery */}
              <div className="relative aspect-[16/9] bg-primary/30">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={selectedProject.images[currentImageIndex]}
                    alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-contain"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </AnimatePresence>

                {/* Navigation Arrows */}
                {selectedProject.images.length > 1 && (
                  <>
                    <button
                      onClick={goToPrevious}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 bg-secondary/80 backdrop-blur-sm rounded-full text-primary hover:bg-secondary transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={22} />
                    </button>
                    <button
                      onClick={goToNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 bg-secondary/80 backdrop-blur-sm rounded-full text-primary hover:bg-secondary transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight size={22} />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                {selectedProject.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-secondary/80 backdrop-blur-sm rounded-full text-sm text-primary font-medium">
                    {currentImageIndex + 1} / {selectedProject.images.length}
                  </div>
                )}
              </div>

              {/* Project Details */}
              <div className="p-6 sm:p-8">
                <p className="text-xs text-primary/50 uppercase tracking-wider mb-2">
                  {selectedProject.category}
                </p>
                <h2 className="font-argent text-2xl sm:text-3xl text-primary mb-3">
                  {selectedProject.title}
                </h2>
                <p className="text-primary/70 leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Projects;
