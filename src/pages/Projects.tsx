import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { applyWatermark } from '../utils/watermark';
import logo from '../images/logo.png';
import { PROJECTS, ProjectMeta } from './projectsData';

function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectMeta | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [watermarkCache, setWatermarkCache] = useState<Record<number, string[]>>({});

  const handleOpenProject = async (project: ProjectMeta) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    setGalleryImages(project.images);

    if (watermarkCache[project.id]) {
      setGalleryImages(watermarkCache[project.id]);
      return;
    }

    const watermarked = await Promise.all(
      project.images.map((img) =>
        applyWatermark(img, {
          text: 'ZEEZ CREATIONS',
          opacity: 0.12,
          fontSize: 20,
          color: '#ffffff',
          rotate: -25,
          tile: true,
        }),
      ),
    );
    setWatermarkCache((prev) => ({ ...prev, [project.id]: watermarked }));
    setGalleryImages(watermarked);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setGalleryImages([]);
    setCurrentImageIndex(0);
  };

  const goToPrevious = () => {
    if (!galleryImages.length) return;
    setCurrentImageIndex((p) => (p === 0 ? galleryImages.length - 1 : p - 1));
  };
  const goToNext = () => {
    if (!galleryImages.length) return;
    setCurrentImageIndex((p) => (p === galleryImages.length - 1 ? 0 : p + 1));
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!selectedProject) return;
      if (e.key === 'Escape') handleCloseModal();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedProject, galleryImages]);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedProject]);

  return (
    <div className="min-h-screen bg-secondary">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 sm:px-8 py-6">
        <div className="flex items-center gap-8">
          <Link to="/about" className="text-sm tracking-[0.15em] uppercase text-primary/70 hover:text-primary transition-colors font-outfit">About</Link>
          <Link to="/projects" className="text-sm tracking-[0.15em] uppercase text-primary hover:text-primary transition-colors font-outfit">Portfolio</Link>
        </div>
        <Link to="/" className="absolute left-1/2 -translate-x-1/2">
          <img src={logo} alt="Zeez Creations" className="h-16 sm:h-20 w-auto" />
        </Link>
        <div className="flex items-center gap-8">
          <Link to="/services" className="text-sm tracking-[0.15em] uppercase text-primary/70 hover:text-primary transition-colors font-outfit">Services</Link>
          <Link to="/contact" className="text-sm tracking-[0.15em] uppercase text-primary/70 hover:text-primary transition-colors font-outfit">Contact</Link>
        </div>
      </nav>

      {/* Page Header */}
      <div className="text-center pt-6 pb-6 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-argent text-3xl sm:text-4xl text-primary mb-2"
        >
          Portfolio
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-outfit text-primary/50 text-sm sm:text-base"
        >
          A curated collection of our work
        </motion.p>
      </div>

      <div className="mb-10" />

      {/* Projects Grid */}
      <section className="px-6 sm:px-8 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-12">
          <AnimatePresence mode="popLayout">
            {PROJECTS.map((project, index) => {
              const totalImages = project.images.length;
              return (
                <motion.button
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  onClick={() => handleOpenProject(project)}
                  className="group text-left"
                >
                  <div className="overflow-hidden mb-3 bg-primary/5">
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full aspect-[4/5] object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    />
                  </div>
                  <p className="font-outfit text-[10px] text-primary/40 uppercase tracking-[0.18em] mb-1">
                    {project.category}
                  </p>
                  <p className="font-outfit text-sm font-medium text-primary">
                    {project.title}
                  </p>
                  <p className="font-outfit text-xs text-primary/40 mt-0.5">
                    {totalImages} {totalImages === 1 ? 'photo' : 'photos'}
                  </p>
                </motion.button>
              );
            })}
          </AnimatePresence>
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
          <p className="font-outfit text-xs text-primary/30">Kibagabaga, Kigali</p>
        </div>
      </footer>

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
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative bg-secondary rounded-xl overflow-hidden max-w-5xl w-full h-[88vh] shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 z-20 p-2 bg-secondary/80 backdrop-blur-sm rounded-full text-primary/60 hover:text-primary transition-colors"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              <div className="relative flex-1 min-h-0 bg-primary/5 overflow-hidden">
                <AnimatePresence mode="wait">
                  {galleryImages.length > 0 ? (
                    <motion.img
                      key={currentImageIndex}
                      src={galleryImages[currentImageIndex]}
                      alt={`${selectedProject.title} — ${currentImageIndex + 1}`}
                      className="absolute inset-0 w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="font-outfit text-xs text-primary/40 tracking-wider uppercase">Loading…</div>
                    </div>
                  )}
                </AnimatePresence>

                {galleryImages.length > 1 && (
                  <>
                    <button
                      onClick={goToPrevious}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-secondary/80 backdrop-blur-sm rounded-full text-primary/60 hover:text-primary transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={goToNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-secondary/80 backdrop-blur-sm rounded-full text-primary/60 hover:text-primary transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight size={20} />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-secondary/80 backdrop-blur-sm rounded-full text-xs text-primary/60 font-outfit">
                      {currentImageIndex + 1} / {galleryImages.length}
                    </div>
                  </>
                )}
              </div>

              <div className="flex-shrink-0 px-5 sm:px-6 py-4 border-t border-primary/10 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-outfit text-[10px] text-primary/40 uppercase tracking-[0.18em] mb-0.5 truncate">
                    {selectedProject.category}
                  </p>
                  <h2 className="font-argent text-base sm:text-lg text-primary truncate">
                    {selectedProject.title}
                  </h2>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Projects;
