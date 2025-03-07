import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Project {
  title: string;
  category: string;
  images: string[];
}

interface ProjectLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

function ProjectLightbox({ isOpen, onClose, project }: ProjectLightboxProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Close lightbox when escape key is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);
  
  // Stop scrolling when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Navigate to previous image
  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) => 
      project ? (prevIndex === 0 ? project.images.length - 1 : prevIndex - 1) : prevIndex
    );
  };

  // Navigate to next image
  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => 
      project ? (prevIndex === project.images.length - 1 ? 0 : prevIndex + 1) : prevIndex
    );
  };
  
  if (!isOpen || !project) return null;
  
  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-secondary/90 backdrop-blur-sm p-4 md:p-6"
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full text-secondary hover:bg-primary transition-colors"
          aria-label="Close lightbox"
        >
          <X size={24} />
        </button>
        
        <div className="relative w-full max-w-5xl">
          {/* Project info */}
          <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-4 md:p-6">
            <h3 className="text-xl md:text-2xl font-argent text-secondary">{project.title}</h3>
            <p className="text-sm text-secondary/70 mt-1">{project.category}</p>
          </div>
          
          {/* Image */}
          <div className="relative aspect-[4/3] bg-black/20 overflow-hidden rounded-lg">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={project.images[currentImageIndex]}
                alt={`${project.title} image ${currentImageIndex + 1}`}
                className="w-full h-full object-contain"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>
            
            {/* Image counter */}
            <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-secondary">
              {currentImageIndex + 1} / {project.images.length}
            </div>
          </div>
          
          {/* Navigation buttons */}
          {project.images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full text-secondary hover:bg-primary transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full text-secondary hover:bg-primary transition-colors"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ProjectLightbox;