export type Category = 'Interior Design' | 'Handmade Decor' | 'Furniture Refurbishing';

export interface ProjectMeta {
  id: number;
  title: string;
  category: Category;
  images: string[];
}

const eagerSorted = (m: Record<string, string>) =>
  Object.keys(m).sort().map((k) => m[k]);

const reberoRooftop = eagerSorted(import.meta.glob('./project-photos/rebero-rooftop/*.jpg', { eager: true, import: 'default' }) as Record<string, string>);
const iwave = eagerSorted(import.meta.glob('./project-photos/iwave-office/*.jpg', { eager: true, import: 'default' }) as Record<string, string>);
const golfView = eagerSorted(import.meta.glob('./project-photos/golf-view/*.jpg', { eager: true, import: 'default' }) as Record<string, string>);
const kingFaysal = eagerSorted(import.meta.glob('./project-photos/king-faysal-view/*.jpg', { eager: true, import: 'default' }) as Record<string, string>);
const kibagabaga = eagerSorted(import.meta.glob('./project-photos/mr-fish/*.jpg', { eager: true, import: 'default' }) as Record<string, string>);
const urbanPark = eagerSorted(import.meta.glob('./project-photos/urban-park-suites/*.jpeg', { eager: true, import: 'default' }) as Record<string, string>);
const balcony = eagerSorted(import.meta.glob('./project-photos/residential-balcony/*.jpg', { eager: true, import: 'default' }) as Record<string, string>);
const seedsOneBed = eagerSorted(import.meta.glob('./project-photos/seeds-residences/one-bedroom/*.jpg', { eager: true, import: 'default' }) as Record<string, string>);
const seedsPenthouse = eagerSorted(import.meta.glob('./project-photos/seeds-residences/penthouse/*.jpg', { eager: true, import: 'default' }) as Record<string, string>);
const seedsTwoBed = eagerSorted(import.meta.glob('./project-photos/seeds-residences/two-bedroom/*.jpg', { eager: true, import: 'default' }) as Record<string, string>);
const seedsThreeBed = eagerSorted(import.meta.glob('./project-photos/seeds-residences/three-bedroom/*.jpg', { eager: true, import: 'default' }) as Record<string, string>);
const theNest = eagerSorted(import.meta.glob('./project-photos/the-nest/*.jpg', { eager: true, import: 'default' }) as Record<string, string>);

// const trays = eagerSorted(import.meta.glob('./project-photos/trays-coasters-placemats/*.jpg', { eager: true, import: 'default' }) as Record<string, string>);
// const tables = eagerSorted(import.meta.glob('./project-photos/tables/*.jpg', { eager: true, import: 'default' }) as Record<string, string>);
// const vases = eagerSorted(import.meta.glob('./project-photos/candle-holders/*.jpg', { eager: true, import: 'default' }) as Record<string, string>);
// const refurbished = eagerSorted(import.meta.glob('./project-photos/refurbished-tables/*.jpg', { eager: true, import: 'default' }) as Record<string, string>);

export const PROJECTS: ProjectMeta[] = [
  { id: 1, title: 'Rebero Mansion Rooftop', category: 'Interior Design', images: reberoRooftop },
  { id: 2, title: 'Iwave Real Estate Office', category: 'Interior Design', images: iwave },
  { id: 3, title: 'Seeds: Penthouse', category: 'Interior Design', images: seedsPenthouse },
  { id: 13, title: 'Seeds: 1 Bedroom', category: 'Interior Design', images: seedsOneBed },
  { id: 14, title: 'Seeds: 2 Bedroom', category: 'Interior Design', images: seedsTwoBed },
  { id: 15, title: 'Seeds: 3 Bedroom', category: 'Interior Design', images: seedsThreeBed },
  { id: 4, title: 'Golf View Apartment', category: 'Interior Design', images: golfView },
  { id: 5, title: 'King Faysal View Apartment', category: 'Interior Design', images: kingFaysal },
  { id: 6, title: 'Kibagabaga Residence', category: 'Interior Design', images: kibagabaga },
  { id: 7, title: 'Urban Park Suites Hotel', category: 'Interior Design', images: urbanPark },
  { id: 8, title: 'Residential Balcony', category: 'Interior Design', images: balcony },
  { id: 16, title: 'The Nest', category: 'Interior Design', images: theNest },
  // { id: 9, title: 'Trays, Coasters, Placemats', category: 'Handmade Decor', images: trays },
  // { id: 10, title: 'Butler Tables', category: 'Handmade Decor', images: tables },
  // { id: 11, title: 'Vases & Holders', category: 'Handmade Decor', images: vases },
  // { id: 12, title: 'Refurbished Tables', category: 'Furniture Refurbishing', images: refurbished },
];
