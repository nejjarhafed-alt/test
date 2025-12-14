import { Document, Category, Source } from '../types';

const STORAGE_KEY = 'iscae_annales_db_v2'; // Changed key to force refresh of data structure
const STATS_KEY = 'iscae_annales_stats_v1';

// Initial Mock Data to populate the site if empty
const INITIAL_DATA: Document[] = [
  {
    id: '1',
    title: 'Concours ISCAE - Épreuve de Mathématiques',
    category: Category.MATHS,
    source: Source.ECT,
    year: 2023,
    url: '#',
    addedBy: 'Admin',
    dateAdded: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Épreuve de Gestion - Cas Pratique',
    category: Category.GESTION,
    source: Source.ECT,
    year: 2022,
    url: '#',
    addedBy: 'Admin',
    dateAdded: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Gestion et Management des Entreprises',
    category: Category.GESTION,
    source: Source.ECS,
    year: 2024,
    url: '#',
    addedBy: 'Admin',
    dateAdded: new Date().toISOString()
  }
];

export const getDocuments = (): Document[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
      return INITIAL_DATA;
    }
    return JSON.parse(stored);
  } catch (e) {
    console.error("Failed to load documents", e);
    return [];
  }
};

export const addDocument = (doc: Omit<Document, 'id' | 'dateAdded'>): Document => {
  const docs = getDocuments();
  const newDoc: Document = {
    ...doc,
    id: crypto.randomUUID(),
    dateAdded: new Date().toISOString()
  };
  const updatedDocs = [newDoc, ...docs];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDocs));
  return newDoc;
};

export const updateDocument = (id: string, updatedFields: Partial<Document>): void => {
  const docs = getDocuments();
  const index = docs.findIndex(d => d.id === id);
  if (index !== -1) {
    docs[index] = { ...docs[index], ...updatedFields };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(docs));
  }
};

export const deleteDocument = (id: string): void => {
  const docs = getDocuments();
  const updatedDocs = docs.filter(d => d.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDocs));
};

// --- Stats Management ---

interface Stats {
  visitors: number;
  downloads: number;
}

export const getStats = (): Stats => {
  try {
    const stored = localStorage.getItem(STATS_KEY);
    if (!stored) {
      const initialStats = { visitors: 1240, downloads: 580 }; // Arbitrary starting stats
      localStorage.setItem(STATS_KEY, JSON.stringify(initialStats));
      return initialStats;
    }
    return JSON.parse(stored);
  } catch {
    return { visitors: 0, downloads: 0 };
  }
};

export const incrementVisitors = (): void => {
  const stats = getStats();
  stats.visitors += 1;
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
};

export const incrementDownloads = (): void => {
  const stats = getStats();
  stats.downloads += 1;
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
};