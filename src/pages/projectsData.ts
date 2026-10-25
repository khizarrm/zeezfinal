export type Category = 'Interior Design' | 'Handmade Decor' | 'Furniture Refurbishing';

export interface ProjectMeta {
  id: string;
  title: string;
  category: Category;
  images: string[];
}

// Each project lives in src/content/projects/<slug>/ as an index.json plus its photos.
// These files are edited through the admin page at /admin (see public/admin/config.yml).
interface ProjectEntry {
  title: string;
  category: Category;
  order?: number;
  visible?: boolean;
  images?: string[];
}

const entries = import.meta.glob('../content/projects/*/index.json', { eager: true, import: 'default' }) as Record<string, ProjectEntry>;
const photos = import.meta.glob('../content/projects/*/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true, import: 'default' }) as Record<string, string>;

export const PROJECTS: ProjectMeta[] = Object.entries(entries)
  .map(([path, entry]) => {
    const dir = path.slice(0, -'index.json'.length);
    return {
      entry,
      project: {
        id: dir.split('/').slice(-2, -1)[0],
        title: entry.title,
        category: entry.category,
        images: (entry.images ?? []).map((file) => photos[dir + file]).filter(Boolean),
      },
    };
  })
  .filter(({ entry, project }) => entry.visible !== false && project.images.length > 0)
  .sort((a, b) => (a.entry.order ?? Infinity) - (b.entry.order ?? Infinity))
  .map(({ project }) => project);
