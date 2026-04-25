import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { applyWatermark } from '../utils/watermark';
import logo from '../images/logo.png';

type ImportMap = Record<string, () => Promise<{ default: string }>>;

const reberoRooftopImports = import.meta.glob('./project-photos/rebero-rooftop/*.jpg') as ImportMap;
const iwaveImports = import.meta.glob('./project-photos/iwave-office/*.jpg') as ImportMap;
const golfViewImports = import.meta.glob('./project-photos/golf-view/*.jpg') as ImportMap;
const kingFaysalImports = import.meta.glob('./project-photos/king-faysal-view/*.jpg') as ImportMap;
const mrFishImports = import.meta.glob('./project-photos/mr-fish/*.jpg') as ImportMap;

const seedsOneBedImports = import.meta.glob('./project-photos/seeds-residences/one-bedroom/*.jpg') as ImportMap;
const seedsPenthouseImports = import.meta.glob('./project-photos/seeds-residences/penthouse/*.jpg') as ImportMap;
const seedsTwoBedImports = import.meta.glob('./project-photos/seeds-residences/two-bedroom/*.jpg') as ImportMap;
const seedsThreeBedImports = import.meta.glob('./project-photos/seeds-residences/three-bedroom/*.jpg') as ImportMap;

const trayImports = import.meta.glob('./project-photos/trays-coasters-placemats/*.jpg') as ImportMap;
const tableImports = import.meta.glob('./project-photos/tables/*.jpg') as ImportMap;
const vaseImports = import.meta.glob('./project-photos/candle-holders/*.jpg') as ImportMap;
const refurbishedTableImports = import.meta.glob('./project-photos/refurbished-tables/*.jpg') as ImportMap;

const sortedKeys = (m: ImportMap) => Object.keys(m).sort();

type Category = 'Interior Design' | 'Handmade Decor' | 'Furniture Refurbishing';

interface Unit {
  label: string;
  imagePaths: string[];
  imports: ImportMap;
}

interface Project {
  id: number;
  title: string;
  category: Category;
  imageUrl: string;
  units?: Unit[];
  imagePaths?: string[];
  imports?: ImportMap;
}

const loadImages = async (paths: string[], imports: ImportMap) => {
  const arr = await Promise.all(paths.map(async (p) => (await imports[p]()).default));
  return arr;
};

interface ResolvedSelection {
  images: string[];
  unitLabels?: string[];
  unitRanges?: { label: string; start: number; end: number }[];
}

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState<'All' | Category>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [unitRanges, setUnitRanges] = useState<{ label: string; start: number; end: number }[] | null>(null);
  const [activeUnitIdx, setActiveUnitIdx] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [watermarkCache, setWatermarkCache] = useState<Record<number, string[]>>({});

  useEffect(() => {
    const init = async () => {
      try {
        const reberoPaths = sortedKeys(reberoRooftopImports);
        const iwavePaths = sortedKeys(iwaveImports);
        const golfPaths = sortedKeys(golfViewImports);
        const faysalPaths = sortedKeys(kingFaysalImports);
        const mrFishPaths = sortedKeys(mrFishImports);
        const seedsOneBed = sortedKeys(seedsOneBedImports);
        const seedsPenthouse = sortedKeys(seedsPenthouseImports);
        const seedsTwoBed = sortedKeys(seedsTwoBedImports);
        const seedsThreeBed = sortedKeys(seedsThreeBedImports);
        const trayPaths = sortedKeys(trayImports);
        const tablePaths = sortedKeys(tableImports);
        const vasePaths = sortedKeys(vaseImports);
        const refurbPaths = sortedKeys(refurbishedTableImports);

        const firstOf = (paths: string[], imports: ImportMap) =>
          paths.length ? imports[paths[0]]() : Promise.resolve({ default: '' });

        const [
          reberoFirst, iwaveFirst, seedsFirst, golfFirst, faysalFirst, mrFishFirst,
          trayFirst, tableFirst, vaseFirst, refurbFirst,
        ] = await Promise.all([
          firstOf(reberoPaths, reberoRooftopImports),
          firstOf(iwavePaths, iwaveImports),
          firstOf(seedsPenthouse, seedsPenthouseImports),
          firstOf(golfPaths, golfViewImports),
          firstOf(faysalPaths, kingFaysalImports),
          firstOf(mrFishPaths, mrFishImports),
          trayPaths.length > 6 ? trayImports[trayPaths[6]]() : firstOf(trayPaths, trayImports),
          tablePaths.length > 2 ? tableImports[tablePaths[2]]() : firstOf(tablePaths, tableImports),
          vasePaths.length > 5 ? vaseImports[vasePaths[5]]() : firstOf(vasePaths, vaseImports),
          refurbPaths.length > 2 ? refurbishedTableImports[refurbPaths[2]]() : firstOf(refurbPaths, refurbishedTableImports),
        ]);

        const list: Project[] = [
          { id: 1, title: 'Rebero Mansion Rooftop', category: 'Interior Design', imageUrl: reberoFirst.default, imagePaths: reberoPaths, imports: reberoRooftopImports },
          { id: 2, title: 'Iwave Real Estate Office', category: 'Interior Design', imageUrl: iwaveFirst.default, imagePaths: iwavePaths, imports: iwaveImports },
          {
            id: 3,
            title: 'Seeds Residences',
            category: 'Interior Design',
            imageUrl: seedsFirst.default,
            units: [
              { label: 'One Bedroom', imagePaths: seedsOneBed, imports: seedsOneBedImports },
              { label: 'Penthouse', imagePaths: seedsPenthouse, imports: seedsPenthouseImports },
              { label: 'Two Bedroom', imagePaths: seedsTwoBed, imports: seedsTwoBedImports },
              { label: 'Three Bedroom', imagePaths: seedsThreeBed, imports: seedsThreeBedImports },
            ],
          },
          { id: 4, title: 'Golf View Apartment', category: 'Interior Design', imageUrl: golfFirst.default, imagePaths: golfPaths, imports: golfViewImports },
          { id: 5, title: 'King Faysal View Apartment', category: 'Interior Design', imageUrl: faysalFirst.default, imagePaths: faysalPaths, imports: kingFaysalImports },
          { id: 6, title: 'Mr. Fish Restaurant', category: 'Interior Design', imageUrl: mrFishFirst.default, imagePaths: mrFishPaths, imports: mrFishImports },
          { id: 9, title: 'Trays, Coasters, Placemats', category: 'Handmade Decor', imageUrl: trayFirst.default, imagePaths: trayPaths, imports: trayImports },
          { id: 10, title: 'Butler Tables', category: 'Handmade Decor', imageUrl: tableFirst.default, imagePaths: tablePaths, imports: tableImports },
          { id: 11, title: 'Vases & Holders', category: 'Handmade Decor', imageUrl: vaseFirst.default, imagePaths: vasePaths, imports: vaseImports },
          { id: 12, title: 'Refurbished Tables', category: 'Furniture Refurbishing', imageUrl: refurbFirst.default, imagePaths: refurbPaths, imports: refurbishedTableImports },
        ];

        setProjects(list);
      } catch (err) {
        console.error('Error loading project images:', err);
      }
    };
    init();
  }, []);

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  const categories: ('All' | Category)[] = ['All', 'Interior Design', 'Handmade Decor', 'Furniture Refurbishing'];

  const resolveSelection = async (project: Project): Promise<ResolvedSelection> => {
    if (project.units && project.units.length) {
      const ranges: { label: string; start: number; end: number }[] = [];
      const all: string[] = [];
      for (const u of project.units) {
        const imgs = await loadImages(u.imagePaths, u.imports);
        ranges.push({ label: u.label, start: all.length, end: all.length + imgs.length });
        all.push(...imgs);
      }
      return { images: all, unitRanges: ranges };
    }
    const imgs = await loadImages(project.imagePaths || [], project.imports || {});
    return { images: imgs };
  };

  const handleOpenProject = async (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    setActiveUnitIdx(0);
    setGalleryImages([]);
    setUnitRanges(null);

    const sel = await resolveSelection(project);
    setGalleryImages(sel.images);
    setUnitRanges(sel.unitRanges || null);

    if (watermarkCache[project.id]) {
      setGalleryImages(watermarkCache[project.id]);
      return;
    }

    const watermarked = await Promise.all(
      sel.images.map((img) =>
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
    setUnitRanges(null);
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

  // When on a tabbed project, jump to first image of selected unit
  const handleSelectUnit = (idx: number) => {
    if (!unitRanges) return;
    setActiveUnitIdx(idx);
    setCurrentImageIndex(unitRanges[idx].start);
  };

  // Keep activeUnitIdx in sync with current image when navigating arrows
  useEffect(() => {
    if (!unitRanges) return;
    const i = unitRanges.findIndex((r) => currentImageIndex >= r.start && currentImageIndex < r.end);
    if (i >= 0 && i !== activeUnitIdx) setActiveUnitIdx(i);
  }, [currentImageIndex, unitRanges]);

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

      {/* Category Filter */}
      <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 px-6 mb-10">
        {categories.map((c) => {
          const isActive = activeCategory === c;
          return (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`font-outfit text-[10px] sm:text-xs tracking-[0.14em] uppercase px-3 py-1.5 rounded-full border transition-colors ${
                isActive
                  ? 'border-primary bg-primary text-secondary'
                  : 'border-primary/20 text-primary/60 hover:text-primary hover:border-primary/50'
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <section className="px-6 sm:px-8 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-12">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => {
              const totalImages = project.units
                ? project.units.reduce((sum, u) => sum + u.imagePaths.length, 0)
                : project.imagePaths?.length || 0;
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
                      src={project.imageUrl}
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
                    {project.units ? ` · ${project.units.length} units` : ''}
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
              {/* Close */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 z-20 p-2 bg-secondary/80 backdrop-blur-sm rounded-full text-primary/60 hover:text-primary transition-colors"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              {/* Image */}
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

              {/* Details */}
              <div className="flex-shrink-0 px-5 sm:px-6 py-4 border-t border-primary/10 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-outfit text-[10px] text-primary/40 uppercase tracking-[0.18em] mb-0.5 truncate">
                    {selectedProject.category}
                  </p>
                  <h2 className="font-argent text-base sm:text-lg text-primary truncate">
                    {selectedProject.title}
                  </h2>
                </div>

                {/* Unit Tabs (Seeds) */}
                {unitRanges && unitRanges.length > 1 && (
                  <div className="flex flex-wrap gap-1.5 justify-end">
                    {unitRanges.map((u, idx) => {
                      const active = idx === activeUnitIdx;
                      return (
                        <button
                          key={u.label}
                          onClick={() => handleSelectUnit(idx)}
                          className={`font-outfit text-[10px] tracking-[0.14em] uppercase px-2.5 py-1 rounded-full border transition-colors ${
                            active
                              ? 'border-primary bg-primary text-secondary'
                              : 'border-primary/20 text-primary/60 hover:text-primary hover:border-primary/50'
                          }`}
                        >
                          {u.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Projects;
